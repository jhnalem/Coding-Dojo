from flask import Flask, render_template, redirect, request, session, flash
from mysqlconnection import MySQLConnector
from flask_bcrypt import Bcrypt
import datetime
import re

app = Flask(__name__)
app.secret_key = 'secret_key'

mysql = MySQLConnector(app, 'wall')

bcrypt = Bcrypt(app)

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')


@app.route('/')
def index():

    return render_template('index.html')


@app.route('/login')
def login():

    return render_template('login.html')


@app.route('/process', methods=['POST'])
def process():
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
        flash("Successfully logged in!", 'welcome')
        session['user'] = user['id']
        session['name'] = user['first_name']
        return redirect('/')

    else:
        flash("Email or password is incorrect. Please try again.", 'error')
        return redirect('/login')


@app.route('/register')
def register():

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
    if 'user' in session:
        session.pop('user')

    if 'name' in session:
        session.pop('name')

    flash("You are now logged out!", 'welcome')
    return redirect('/')


@app.route('/wall')
def wall():
    if 'user' not in session:
        flash("You must be logged in to view this page.", 'error')
        return redirect('/')

    query = '''SELECT u.first_name, u.last_name, m.id, m.message, m.created_at
               FROM messages AS m
               JOIN users AS u ON u.id=m.user_id
               ORDER BY m.id DESC'''
    msgs  = mysql.query_db(query)

    query = '''SELECT u.first_name, u.last_name, c.id, c.user_id, c.message_id, c.comment, c.created_at
               FROM comments AS c
               JOIN users AS u ON u.id=c.user_id
               ORDER BY c.id ASC'''
    comments = mysql.query_db(query)

    for c in comments:
        if c['user_id'] == session['user']:
            print c['created_at'], datetime.datetime.now() - datetime.timedelta(minutes = 30)
            if c['created_at'] > datetime.datetime.now() - datetime.timedelta(minutes = 30):
                c['removeable'] = True

        for m in msgs:
            if c['message_id'] == m['id']:
                if 'comments' not in m:
                    m['comments'] = []
                m['comments'].append(c)

    return render_template('wall.html', all_messages=msgs)


@app.route('/submit_message', methods=['POST'])
def submit_message():
    query = '''INSERT INTO messages (user_id, message, created_at, updated_at)
               VALUES (:id, :msg, NOW(), NOW())'''
    data = {
        'id': session['user'],
        'msg': request.form['message']
    }
    mysql.query_db(query, data)

    return redirect('/wall')


@app.route('/submit_comment', methods=['POST'])
def submit_comment():
    query = '''INSERT INTO comments (message_id, user_id, comment, created_at, updated_at)
               VALUES (:msg_id, :user_id, :comment, NOW(), NOW())'''
    data = {
        'msg_id': request.form['message_id'],
        'user_id': session['user'],
        'comment': request.form['comment']
    }
    mysql.query_db(query, data)

    return redirect('/wall')


@app.route('/remove_comment/<id>')
def remove_comment(id):
    query = 'SELECT user_id FROM comments WHERE id=:id'
    data  = { 'id': id }
    result = mysql.query_db(query, data)

    if session['user'] == result[0]['user_id']:
        query = 'DELETE FROM comments WHERE id=:id'
        data = { 'id': id }
        mysql.query_db(query, data)
        flash("Comment successfully deleted.", 'success')
    else:
        flash("You do not have permission to remove this comment.", 'error')

    return redirect('/wall')


app.run(debug=True)
