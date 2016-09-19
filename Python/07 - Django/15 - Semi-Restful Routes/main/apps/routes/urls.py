from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    # url(r'^products$', views.index, name='index'),
    url(r'^products/new$', views.new, name='new'),
    url(r'^products$', views.create, name='create'), #POST
    url(r'^products/(?P<id>\d+)$', views.show, name='show'),
    url(r'^products/(?P<id>\d+)/edit$', views.edit, name='edit'),
    url(r'^products/(?P<id>\d+)/update$', views.update, name='update'), #POST
    url(r'^products/(?P<id>\d+)/destroy$', views.destroy, name='destroy'),
]
