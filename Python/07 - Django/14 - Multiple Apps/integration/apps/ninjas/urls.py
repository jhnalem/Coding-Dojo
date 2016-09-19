from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^ninjas$', views.ninjas, name='all'),
    url(r'^ninjas/(?P<color>[a-zA-Z]+)$', views.ninja, name='ninja-color')
    # url(r'^ninjas(?:/(?P<color_a>[a-zA-Z]+))?(?:/(?P<color_b>[a-zA-Z]+))?(?:/(?P<color_c>[a-zA-Z]+))?(?:/(?P<color_d>[a-zA-Z]+))?/$', views.ninjas)
]
