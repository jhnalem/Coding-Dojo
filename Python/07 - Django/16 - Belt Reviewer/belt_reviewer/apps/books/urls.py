from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^add$', views.new_book, name='new_book'),
    url(r'^create_book$', views.create_book, name='create_book'),
    url(r'^create_review/(?P<id>\d+)$', views.create_review, name='create_review'),
    url(r'^destroy_review/(?P<id>\d+)$', views.destroy_review, name='destroy_review'),
    url(r'^(?P<id>\d+)$', views.show_book, name='show_book'),
]
