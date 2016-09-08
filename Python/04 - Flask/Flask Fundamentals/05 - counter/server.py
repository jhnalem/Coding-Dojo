from flask import Flask, render_template, redirect, request, session
app = Flask(__name__)
app.secret_key = 'secret_key'

2
@app.route('/')
def index():
    # if 'times' not in session:
    if not session.has_key('count'):
        session['count'] = 1

    session['count'] += 1

    return render_template('index.html')


@app.route('/ninjas', methods=['POST'])
def ninjas():
    try:
        session['count'] += 1
    except KeyError:
        session['count'] = 1

    return redirect('/')


@app.route('/reset', methods=['POST'])
def reset():
    session['count'] = 0

    return redirect('/')


app.run(debug=True)
