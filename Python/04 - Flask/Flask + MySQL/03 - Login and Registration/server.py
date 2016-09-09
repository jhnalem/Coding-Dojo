from flask import Flask, render_template, redirect, request, session, flash
from mysqlconnection import MySQLConnector
from flask.ext.bcrypt import Bcrypt
import re

app = Flask(__name__)
app.secret_key = 'secret_key'

mysql = MySQLConnector(app, 'login_registration')

bcrypt = Bcrypt(app)

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')


@app.route('/')
def index():
    if 'user' in session:
        query = 'SELECT * FROM users WHERE id=:id'
        data  = { 'id': session['user'] }
        user = mysql.query_db(query, data)
        first = user[0]['first_name']
        last = user[0]['last_name']
    else:
        first = ''
        last = ''

    return render_template('index.html', first=first, last=last)


@app.route('/login')
def login():

    return render_template('login.html')


@app.route('/process', methods=['POST'])
def attempt():
    email = request.form['email']
    passw = request.form['pass']

    if len(email) < 1 or len(passw) < 1:
        flash("Please enter both fields", 'error')
        return redirect('/login')

    query = 'SELECT * FROM users WHERE email=:email'
    data  = { 'email': email }
    user = mysql.query_db(query, data)
    user = user[0]

    if bcrypt.check_password_hash(user['password'], passw):
        # successful
        flash("Successfully logged in!", 'welcome')
        session['user'] = user['id']
        return redirect('/')

    else:
        flash("Email or password is incorrect. Please try again.", 'error')
        return redirect('/login')



@app.route('/register')
def registration():

    return render_template('register.html')


@app.route('/create', methods=['POST'])
def create():
    fname = request.form['fname']
    lname = request.form['lname']
    email = request.form['email']
    passw = request.form['pass']
    cpass = request.form['cpass']

    boo = True

    if len(email) < 1:
        flash("Email cannot be empty.", 'error')
        boo = False
    elif not EMAIL_REGEX.match(email):
        flash("Invalid email address.", 'error')
        boo = False
    elif len(mysql.query_db('SELECT * FROM users WHERE email=:email', { 'email': email })) > 1:
        flash("Email already in use. Please try another.", 'error')
        boo = False

    if len(fname) < 2:
        flash("First name must be atleast two characters long.", 'error')
        boo = False
    elif re.search(r'[0-9]', fname):
        flash("First name cannot contain a number.", 'error')
        boo = False
    elif re.search(r'[^a-zA-Z]', fname):
        flash("First name can only have letters.", 'error')
        boo = False

    if len(lname) < 2:
        flash("Last name must be atleast two characters long.", 'error')
        boo = False
    elif re.search(r'[0-9]', lname):
        flash("Last name cannot contain a number.", 'error')
        boo = False
    elif re.search(r'[^a-zA-Z]', lname):
        flash("Last name can only have letters.", 'error')
        boo = False

    if len(passw) < 1:
        flash("Password cannot be empty.", 'error')
        boo = False
    elif len(passw) < 8:
        flash("Password must be longer than 8 characters.", 'error')
        boo = False
    # elif not re.search(r'[A-Z]', password):
    #     flash("Passwords require atleast one uppercase.", 'error')
    # elif not re.search(r'[0-9]', password):
    #     flash("Password require atleast one number.", 'error')

    if len(cpass) < 1:
        flash("Confirm password cannot be empty.", 'error')
        boo = False
    elif passw != cpass:
        flash("Passwords must match.", 'error')
        boo = False

    if boo is True:
        passw = bcrypt.generate_password_hash(passw)

        query = '''INSERT INTO users (first_name, last_name, email, password, created_at, updated_at)
                   VALUES (:first_name, :last_name, :email, :passw, NOW(), NOW())'''
        data  = {
            'first_name': fname,
            'last_name': lname,
            'email': email,
            'passw': passw
        }
        mysql.query_db(query, data)

        flash("Account successfully created. Please log in now.", 'success')

        return redirect('/login')
    else:
        return redirect('/register')


@app.route('/logout')
def logout():
    flash("You are now logged out!", 'welcome')
    session.pop('user')
    return redirect('/')

app.run(debug=True)
