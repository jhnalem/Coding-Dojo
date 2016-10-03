from django.shortcuts import render

# Create your views here.
def index(request):
    # list all users in a table
    pass

def admin(request):
    # list all users & edit/delete
    pass

def wall(request):
    # user's profile and wall of comments
    pass

def wall_post(request):
    # post for wall post
    pass

def wall_comment(request):
    # post for wall comment
    pass

def new_user(request):
    # allow admins to add users
    pass

def new_user_process(request):
    # post for new_user
    pass


def edit_user(request):
    # allow logged in user to edit their profile
    pass

def edit_user_process(request):
    #post for edit user
    pass

def edit_user_admin(request):
    # allow admin to edit a user's information
    pass
