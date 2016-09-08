from flask import Flask, render_template, redirect, request, session, flash
import re
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'secret_key'

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')

months = {
    'January': 1,
    'February': 2,
    'March': 3,
    'April': 4,
    'May': 5,
    'June': 6,
    'July': 7,
    'August': 8,
    'September': 9,
    'October': 10,
    'November': 11,
    'December': 12
}

@app.route('/')
def index():

    return render_template('index.html')


@app.route('/process', methods=['POST'])
def proccess():
    email = request.form['email']
    fname = request.form['fname']
    lname = request.form['lname']
    password = request.form['password']
    confirm_pass = request.form['confirm_pass']
    birthday = request.form['birthday']

    session['email'] = email
    session['fname'] = fname
    session['lname'] = lname
    session['password'] = password
    session['confirm_pass'] = confirm_pass
    session['birthday'] = birthday

    boo = True

    if len(email) < 1:
        flash("Email cannot be empty", "error")
        boo = False
    elif not EMAIL_REGEX.match(email):
        flash("Invalid email address", "error")
        boo = False

    if len(fname) < 1:
        flash("First name cannot be empty", "error")
        boo = False
    elif re.search(r'[0-9]', fname):
        flash("First name should not contain a number", "error")
        boo = False

    if len(lname) < 1:
        flash("Last name cannot be empty", "error")
        boo = False
    elif re.search(r'[0-9]', lname):
        flash("Last name should not contain a number", "error")
        boo = False

    if len(password) < 1:
        flash("Password cannot be empty", "error")
        boo = False
    elif len(password) <= 8:
        flash("Password must be longer than 8 characters.", 'error')
        boo = False
    elif not re.search(r'[A-Z]', password):
        flash("Passwords require atleast one uppercase.", 'error')
    elif not re.search(r'[0-9]', password):
        flash("Password require atleast one number.", 'error')

    if len(confirm_pass) < 1:
        flash("Confirm password cannot be empty", 'error')
        boo = False
    elif password != confirm_pass:
        flash("Passwords must match", 'error')
        boo = False

    if len(birthday) < 1:
        flash("Birthday must be provided", 'error')
        boo = False
    else:
        birthday = birthday.split()

        if datetime(int(birthday[2]), months[birthday[1][:-1]], int(birthday[0])) > datetime.today():
            flash("Are you from the future?", 'error')
            boo = False

    if boo is True:
        flash("Thank you for submitting your information.", 'success')
        session.pop('email')
        session.pop('fname')
        session.pop('lname')
        session.pop('birthday')
        session.pop('password')
        session.pop('confirm_pass')

    return redirect('/')


app.run(debug=True) # run our server
