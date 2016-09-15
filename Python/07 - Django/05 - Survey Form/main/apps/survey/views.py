from django.shortcuts import render, redirect
from django.contrib import messages

# Create your views here.
def index(request):

    return render(request, 'survey/index.html')

def process(request):
    if request.method == 'POST':
        post = request.POST

        if 'count' not in request.session:
            request.session['count'] = 0
        request.session['count'] += 1

        data = {
            'name': post['name'],
            'loca': post['location'],
            'lang': post['language'],
            'comm': post['comment']
        }

        request.session['data'] = data

        return redirect('/result')

    else:
        messages.error(request, "Invalid request method!")
        return redirect('/')

def result(request):
    messages.success(request, "Thanks for submitting the form! You submitted this form " + str(request.session['count']) + " times now.")

    test = {"mytuple" : (True,"I love donuts")}

    return render(request, 'survey/result.html', test)
