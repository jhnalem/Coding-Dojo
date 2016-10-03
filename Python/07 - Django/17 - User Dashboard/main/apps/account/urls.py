from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^register$', views.register, name='register'),
    url(r'^signin$', views.login, name='login'),
    url(r'^process_register$', views.process_register, name='process_register'),
    url(r'^process_signin$', views.process_login, name='process_login'),
    url(r'^signout$', views.logout, name='logout'),
]
