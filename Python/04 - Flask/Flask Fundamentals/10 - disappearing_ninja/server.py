from flask import Flask, render_template, redirect, request, session, flash

app = Flask(__name__)
app.secret_key = 'secret_key'

ninja_colors = {
    'blue': 'leonardo',
    'orange': 'michelangelo',
    'red': 'raphael',
    'purple': 'donatello'
}


@app.route('/')
def index():

    return render_template('index.html')


@app.route('/ninja')
def ninjas():

    return render_template('index.html', color='ninjas')


@app.route('/ninja/<parameter>')
def colors(parameter):
    if parameter in ninja_colors:
        color = ninja_colors[parameter]
    else:
        color = 'notapril'

    return render_template('index.html', color=color)


app.run(debug=True)
