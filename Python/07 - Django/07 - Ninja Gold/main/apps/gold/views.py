from django.shortcuts import render, redirect
import random

def index(request):
    if 'gold' not in request.session:
        request.session['gold'] = 0

    if 'activities' not in request.session:
        request.session['activities'] = ''

    return render(request, 'gold/index.html')


def process(request):
    print request
    if request.method == 'POST':
        choice = request.POST['choice']

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

        request.session['gold'] += gold
        request.session['activities'] += text + '\n'

        return redirect('/')

    else:
        return redirect('/')

def reset(request):
    request.session['gold'] = 0
    request.session['activities'] = ''

    return redirect('/')
