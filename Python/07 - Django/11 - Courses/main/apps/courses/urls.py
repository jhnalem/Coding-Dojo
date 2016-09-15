from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index),
    url(r'^add$', views.add),
    url(r'^comments/(?P<id>\d+)$', views.comment),
    url(r'^comments/(?P<id>\d+)/add$', views.add_comment),
    url(r'^remove/(?P<id>\d+)$', views.remove),
    url(r'^remove/(?P<id>\d+)/process$', views.remove_course),
]
