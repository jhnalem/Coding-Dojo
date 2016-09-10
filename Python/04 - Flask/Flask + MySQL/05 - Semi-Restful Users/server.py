from flask import Flask, render_template, redirect, request, session, flash
from mysqlconnection import MySQLConnector
import datetime
import re

app = Flask(__name__)
app.secret_key = 'secret_key'

mysql = MySQLConnector(app, 'semi-restful_users')

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')


@app.route('/')
@app.route('/users')
def index():
    query = 'SELECT * FROM users'
    users = mysql.query_db(query)

    return render_template('index.html', all_users=users)


@app.route('/users/new')
def new():

    return render_template('new.html')


@app.route('/users/create', methods=['POST'])
def create():
    fname = request.form['fname']
    lname = request.form['lname']
    email = request.form['email']

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

    if boo is True:
        query = '''INSERT INTO users (first_name, last_name, email, created_at, updated_at)
                   VALUES (:first_name, :last_name, :email, NOW(), NOW())'''
        data  = {
            'first_name': fname,
            'last_name': lname,
            'email': email
        }
        new_id = mysql.query_db(query, data)

        flash("Account successfully created. Please log in now.", 'success')

        return redirect('/users/%d' % new_id)

    else:
        return redirect('/users/new')


@app.route('/users/<int:id>')
def show(id):
    query = 'SELECT * FROM users WHERE id=:id'
    data  = { 'id': id }
    result = mysql.query_db(query, data)

    return render_template('show.html', data=result[0])


@app.route('/users/<int:id>/edit')
def edit(id):
    query = 'SELECT * FROM users WHERE id=:id'
    data  = { 'id': id }
    result = mysql.query_db(query, data)

    return render_template('edit.html', data=result[0])


@app.route('/users/<int:id>/destroy')
def destroy(id):
    query = 'DELETE FROM users WHERE id = :id'
    data = {'id': id}
    mysql.query_db(query, data)

    return redirect('/users')


@app.route('/users/<int:id>', methods=['POST'])
def update(id):
    fname = request.form['fname']
    lname = request.form['lname']
    email = request.form['email']

    if len(fname) < 1 or len(lname) < 1 or len(email) < 1:
        flash("Every field must have a value.", 'error')
        return redirect('/users/%d/edit' % id)

    query = '''UPDATE users SET first_name="%s", last_name="%s", email="%s", updated_at=NOW() WHERE id=:id''' % (fname, lname, email)
    data  = { 'id': id }
    user  = mysql.query_db(query, data)

    return redirect('/users/%d' % id)

app.run(debug=True)
