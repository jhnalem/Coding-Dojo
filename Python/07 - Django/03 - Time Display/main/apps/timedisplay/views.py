from django.shortcuts import render
import datetime

def index(request):
    data = {
        'time': datetime.datetime.now()
    }
    return render(request, 'timedisplay/index.html', data)
