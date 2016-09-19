from django.shortcuts import render, redirect
from django.core.urlresolvers import reverse
from django.db.models import Count

from .models import Courses, Comments
from ..loginRegistration.models import User

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

    return redirect(reverse('courses:index'))


def user_course(request):
    all_users = User.objects.all()
    all_courses = Courses.objects.all().annotate(count=Count('users__id'))

    context = {
        'users': all_users,
        'courses': all_courses,
    }

    return render(request, 'courses/courses.html', context)


def user_course_add(request):
    if request.method == 'POST':
        user_id = request.POST['user']
        course_id = request.POST['course']

        user = User.objects.get(id=user_id)
        course = Courses.objects.get(id=course_id)

        course.users.add(user)

    return redirect(reverse('courses:user_course'))


def comment(request, id):
    context = {
        'course': Courses.objects.get(id=id)
    }

    return render(request, 'courses/comments.html', context)

def add_comment(request, id):
    if request.method == 'POST':
        course = Courses.objects.get(id=id)
        user   = User.objects.get(id=request.session['user_id'])

        Comments.objects.create(comment=request.POST['comment'], course=course, user=user)

    return redirect(reverse('courses:comment', kwargs={'id':id}))

def remove(request, id):
    context = {
        'course': Courses.objects.get(id=id)
    }

    return render(request, 'courses/remove.html', context)

def remove_course(request, id):
    if request.method == 'POST':
        Courses.objects.get(id=id).delete()

    return redirect(reverse('courses:index'))
