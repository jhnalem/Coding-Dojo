from django.shortcuts import render
from .models import Users, Friendships

def index(req):
    # users = Users.objects.filter(usersfriend__friend__id=2)
    users = Users.objects.filter(usersfriend__friend__id=1) |  Users.objects.filter(usersfriend__friend__last_name="Hernandez")
    users = users.distinct()

    print users.query

    context = {'users':users}

    return render(req, "friendapp/index.html", context)
