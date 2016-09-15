from django.shortcuts import render, redirect, HttpResponse
from django.contrib import messages
from .models import Email

def index(request):

    return render(request, 'validation/index.html')

def process(request):
    if request.method == 'POST':
        acc = Email.objects.register(request.POST['email'])
        if acc[0]:
            messages.success(request, "\"" + acc[1].email + "\" has been successfully created!")
            return redirect('/success')

        else:
            messages.error(request, "\"" + request.POST['email'] + "\" is an invalid email. Please try again")

    return redirect('/')

def success(request):
    context = {
        'emails': Email.objects.all()
    }

    return render(request, 'validation/success.html', context)

def remove(request, id):
    email = Email.objects.get(id=id)
    e = email.email
    email.delete()

    messages.info(request, "\"" + e + "\" has been removed.")

    return redirect('/success')
