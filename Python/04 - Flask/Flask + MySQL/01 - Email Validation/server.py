from flask import Flask, render_template, redirect, request, session, flash
from mysqlconnection import MySQLConnector
import re

app = Flask(__name__)
app.secret_key = 'secret_key'

mysql = MySQLConnector(app, 'emails')

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')

@app.route('/')
def index():

    return render_template('index.html')


@app.route('/process', methods=['POST'])
def process():
    email = request.form['email']

    boo = True

    if len(email) < 1:
        boo = False
    elif not EMAIL_REGEX.match(email):
        boo = False

    if( boo is True ):
        session['email'] = email

        query = 'INSERT INTO addresses (email, created_at) VALUES (:email, NOW())'

        data = { 'email': email }

        mysql.query_db(query, data)

        return redirect('/success')

    else:
        flash("Email is not valid!", 'error')
        return redirect('/')


@app.route('/success')
def success():
    if session.has_key('email'):
        last = session['email']
        session.pop('email')
    else:
        last = None

    query = 'SELECT * FROM addresses ORDER BY created_at DESC '
    emails = mysql.query_db(query)

    return render_template('success.html', last=last, all_emails=emails)


@app.route('/remove/<id>')
def remove(id):
    query = 'SELECT email FROM addresses WHERE id=:id'
    data = { 'id': id }
    email = mysql.query_db(query, data)
    flash(email[0]['email'], 'removed')

    query = 'DELETE FROM addresses WHERE id=:id'
    data = { 'id': id }
    mysql.query_db(query, data)

    return redirect('/success')


app.run(debug=True)
