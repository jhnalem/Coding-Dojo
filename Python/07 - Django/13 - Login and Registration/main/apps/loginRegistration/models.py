from __future__ import unicode_literals
from django.db import models
from django.contrib import messages
import re, bcrypt

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')

# Create your models here.
class UserManager(models.Manager):
    def register(self, fname, lname, email, passw, cpass):
        print fname, lname, email, passw, cpass
        errors = []
        successes = []

        valid = True

        if len(email) < 1:
            errors.append("An email must be provided.")
            valid = False
        elif not EMAIL_REGEX.match(email):
            errors.append("Invalid email provided.")
            valid = False
        elif User.objects.filter(email=email).exists():
            errors.append("Email is already in use. Please log in or try another email.")
            valid = False

        if len(fname) < 2:
            errors.append("First name must be atleast two characters long.")
            valid = False
        elif re.search(r'[0-9]', fname):
            errors.append("First name cannot contain a number.")
            valid = False
        elif not fname.isalpha():
            errors.append("First name can only have letters.")
            valid = False

        if len(lname) < 2:
            errors.append("Last name must be atleast two characters long.")
            valid = False
        elif re.search(r'[0-9]', lname):
            errors.append("Last name cannot contain a number.")
            valid = False
        elif not lname.isalpha():
            errors.append("Last name can only have letters.")
            valid = False

        if len(passw) < 1:
            errors.append("Password cannot be empty.")
            valid = False
        elif len(passw) < 8:
            errors.append("Password must be longer than 8 characters.")
            valid = False

        if len(cpass) < 1:
            errors.append("Confirm password cannot be empty.")
            valid = False
        elif passw != cpass:
            errors.append("Passwords must match.")
            valid = False

        if valid:
            passw_enc = bcrypt.hashpw(passw.encode(), bcrypt.gensalt())
            data = {
                'first_name': fname,
                'last_name': lname,
                'email': email,
                'password': passw_enc
            }
            User.objects.create(**data)

            successes.append("Account successfully created. Please log in now.")

        return (valid, errors, successes)

    def login(self, email, passw):
        if not email or not passw:
            return (False, "Both email and password fields are required to login.")

        data = User.objects.get(email=email)
        hashed = data.password.encode()

        if bcrypt.hashpw(passw.encode(), hashed) == hashed:
            return (True, "Successful login!", data)
        else:
            return (False, "Incorrect password or email. Please try again.")


class User(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    email = models.EmailField()
    password = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()
