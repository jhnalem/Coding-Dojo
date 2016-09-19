from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name="index"),
    url(r'^add$', views.add, name="add"),
    url(r'^users_courses$', views.user_course, name="user_course"),
    url(r'^users_courses_add$', views.user_course_add, name="user_course_add"),
    url(r'^comments/(?P<id>\d+)$', views.comment, name="comment"),
    url(r'^comments/(?P<id>\d+)/add$', views.add_comment, name="comment_add"),
    url(r'^remove/(?P<id>\d+)$', views.remove, name="remove"),
    url(r'^remove/(?P<id>\d+)/process$', views.remove_course, name="remove_course"),
]
