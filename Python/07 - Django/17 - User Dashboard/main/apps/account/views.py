from django.shortcuts import render, redirect
from django.contrib import messages
from django.urls import reverse
from .models import User

# Create your views here.
def index(request):

    return render(request, 'account/index.html')

def register(request):
    if 'user_id' in request.session:
        return redirect(reverse('dashboard:index'))
    return render(request, 'account/register.html')

def login(request):
    if 'user_id' in request.session:
        return redirect(reverse(''))
    return render(request, 'account/login.html')


def process_register(request):
    if request.method == 'POST':
        response = User.objects.register(request.POST)

        if response[0]:
            messages.success(request, response[1])

        else:
            for msg in response[1]:
                messages.error(request, msg)


    return redirect('/')


def process_login(request):
    if request.method == 'POST':
        response = User.objects.login(request.POST)

        if response[0]:
            request.session['user_id'] = response[2].id
            request.session['user_name'] = response[2].first_name + ' ' + response[2].last_name
            messages.success(request, response[1])

        else:
            messages.error(request, response[1])

    return redirect('/')


def logout(request):
    if 'user_id' in request.session:
        request.session.pop('user_id')
        request.session.pop('user_name')
        messages.success(request, "You have successfully logged out!")

    return redirect('/')
