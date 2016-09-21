from __future__ import unicode_literals
from django.db import models
import re, bcrypt

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')

# Create your models here.
class UserManager(models.Manager):
    def register(self, fname, lname, email, passw, cpass):
        errors = []

        if len(email) < 1:
            errors.append("An email must be provided.")
        elif not EMAIL_REGEX.match(email):
            errors.append("Invalid email provided.")
        elif User.objects.filter(email=email).exists():
            errors.append("Email is already in use. Please log in or try another email.")

        if len(fname) < 2:
            errors.append("First name must be atleast two characters long.")
        elif re.search(r'[0-9]', fname):
            errors.append("First name cannot contain a number.")
        elif not fname.isalpha():
            errors.append("First name can only have letters.")

        if len(lname) < 2:
            errors.append("Last name must be atleast two characters long.")
        elif re.search(r'[0-9]', lname):
            errors.append("Last name cannot contain a number.")
        elif not lname.isalpha():
            errors.append("Last name can only have letters.")

        if len(passw) < 1:
            errors.append("Password cannot be empty.")
        elif len(passw) < 8:
            errors.append("Password must be longer than 8 characters.")

        if len(cpass) < 1:
            errors.append("Confirm password cannot be empty.")
        elif passw != cpass:
            errors.append("Passwords must match.")

        if not errors:
            passw_enc = bcrypt.hashpw(passw.encode(), bcrypt.gensalt())
            data = {
                'first_name': fname,
                'last_name': lname,
                'email': email,
                'password': passw_enc
            }
            User.objects.create(**data)

            return (True, "Account successfully created. Please log in now.")
        else:
            return (False, errors)


    def login(self, email, passw):
        if not email or not passw:
            return (False, "Both email and password fields are required to login.")

        try:
            data = User.objects.get(email=email)
        except:
            return (False, "Email does not exist. Please try another.")

        hashed = data.password.encode()

        if bcrypt.hashpw(passw.encode(), hashed) == hashed:
            return (True, "Successful login!", data)
        else:
            return (False, "Password is incorrect. Please try again.")


class User(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    email = models.EmailField()
    password = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()
