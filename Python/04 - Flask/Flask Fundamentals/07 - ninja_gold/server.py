from flask import Flask, render_template, redirect, request, session
import random

app = Flask(__name__)
app.secret_key = 'secret_key'


@app.route('/')
def index():
    if( session.get('gold') is None ):
        session['gold'] = 0

    if( session.get('activities') is None ):
        session['activities'] = ''

    print session['gold'], session['activities']

    return render_template('index.html', gold=session['gold'], activities=session['activities'])


@app.route('/process_money', methods=['POST'])
def process():
    choice = request.form['choice']

    if( choice == 'farm' ):
        gold = random.randrange(10, 20)

    elif( choice == 'cave' ):
        gold = random.randrange(5, 11)

    elif( choice == 'house' ):
        gold = random.randrange(2, 6)

    else:
        gold = random.randrange(-50, 51)

    if( gold > 0 ):
        text = 'Earned ' + str(gold) + ' golds from the ' + choice + '!'
    elif( gold < 0 ):
        text = 'Ouch! You entered a ' + choice + ' and lost ' + str(gold) + ' golds!'

    session['gold'] += gold
    session['activities'] += text + '\n'

    return redirect('/')


@app.route('/reset', methods=['POST'])
def reset():
    session.pop('gold')
    session.pop('activities')

    return redirect('/')


app.run(debug=True)
