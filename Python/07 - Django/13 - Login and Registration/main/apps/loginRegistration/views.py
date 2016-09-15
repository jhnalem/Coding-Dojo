from django.shortcuts import render, redirect
from django.contrib import messages
from .models import User

# Create your views here.
def index(request):

    return render(request, 'loginRegistration/index.html')

def register(request):
    if request.method == 'POST':
        post = request.POST

        data = {
            'fname': post['fname'],
            'lname': post['lname'],
            'email': post['email'],
            'passw': post['pass'],
            'cpass': post['cpass'],
        }

        response = User.objects.register(**data)

        for i in response[1]:
            messages.error(request, i)

        for i in response[2]:
            messages.success(request, i)

    return redirect('/')

def login(request):
    if request.method == 'POST':
        data = {
            'email': request.POST['email'],
            'passw': request.POST['pass'],
        }

        response = User.objects.login(**data)

        if response[0]:
            messages.success(request, response[1])
            request.session['user_id'] = response[2].id
            request.session['user_name'] = response[2].first_name + ' ' + response[2].last_name
        else:
            messages.error(request, response[1])

    return redirect('/')

def logout(request):
    if 'user_id' in request.session:
        request.session.pop('user_id')
        request.session.pop('user_name')
        messages.success(request, "You have successfully logged out!")

    return redirect('/')
