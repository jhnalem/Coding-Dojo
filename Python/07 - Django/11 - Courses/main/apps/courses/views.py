from django.shortcuts import render, redirect
from .models import Courses, Comments

def index(request):
    context = {
        'courses': Courses.objects.all()
    }

    return render(request, 'courses/index.html', context)


def add(request):
    if request.method == 'POST':
        post = request.POST

        name = post['name']
        desc = post['desc']

        Courses.objects.create(title=name, description=desc)

    return redirect('/')

def comment(request, id):
    context = {
        'course': Courses.objects.get(id=id)
    }

    return render(request, 'courses/comments.html', context)

def add_comment(request, id):
    if request.method == 'POST':
        course = Courses.objects.get(id=id)

        Comments.objects.create(comment=request.POST['comment'], course=course)

    return redirect('/comments/' + id)

def remove(request, id):
    context = {
        'course': Courses.objects.get(id=id)
    }

    return render(request, 'courses/remove.html', context)

def remove_course(request, id):
    if request.method == 'POST':
        Courses.objects.get(id=id).delete()

    return redirect('/')
