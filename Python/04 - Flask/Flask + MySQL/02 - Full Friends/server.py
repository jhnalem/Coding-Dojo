from flask import Flask, render_template, redirect, request, session, flash
from mysqlconnection import MySQLConnector
import re

app = Flask(__name__)
app.secret_key = 'secret_key'

mysql = MySQLConnector(app, 'full_friends')


@app.route('/')
def index():
    query = 'SELECT * FROM friends'
    friends = mysql.query_db(query)

    return render_template('index.html', all_friends=friends)


@app.route('/friends', methods=['POST'])
def create():
    fname = request.form['fname']
    lname = request.form['lname']
    email = request.form['email']

    if len(fname) < 1 or len(lname) < 1 or len(email) < 1:
        flash("You must fill out every field.", 'error')
        return redirect('/')

    query = '''INSERT INTO friends (first_name, last_name, email, created_at, updated_at)
               VALUES (:first_name, :last_name, :email, NOW(), NOW())'''
    data  = {
        'first_name': fname,
        'last_name': lname,
        'email': email
    }
    mysql.query_db(query, data)

    return redirect('/')


@app.route('/friends/<int:id>/edit')
def edit(id):
    query = 'SELECT * FROM friends WHERE id=:id'
    data  = { 'id': id }
    user  = mysql.query_db(query, data)

    fname = user[0]['first_name']
    lname = user[0]['last_name']
    email = user[0]['email']
    created = user[0]['created_at']
    modified = user[0]['updated_at']

    return render_template('edit.html', id=id, fname=fname, lname=lname, email=email, created=created, modified=modified)


@app.route('/friends/<int:id>', methods=['POST'])
def update(id):
    fname = request.form['fname']
    lname = request.form['lname']
    email = request.form['email']

    if len(fname) < 1 or len(lname) < 1 or len(email) < 1:
        flash("Every field must have a value.", 'error')
        return redirect('/friends/%d/edit' % id)

    query = '''UPDATE friends SET first_name="%s", last_name="%s", email="%s", updated_at=NOW() WHERE id=:id''' % (fname, lname, email)
    data  = { 'id': id }
    user  = mysql.query_db(query, data)

    return redirect('/')


@app.route('/friends/<id>/delete', methods=['GET', 'POST'])
def destroy(id):
    query = 'DELETE FROM friends WHERE id = :id'
    data = {'id': id}
    mysql.query_db(query, data)

    return redirect('/')


app.run(debug=True)
