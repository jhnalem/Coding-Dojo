from flask import Flask, render_template, redirect, request, session, flash
from mysqlconnection import MySQLConnector
import re

app = Flask(__name__)
app.secret_key = 'secret_key'

mysql = MySQLConnector(app, 'semi-restful_users')


@app.route('/')
def index():
    mysql.query_db('SELECT * from users')

    return render_template('index.html')



app.run(debug=True)
