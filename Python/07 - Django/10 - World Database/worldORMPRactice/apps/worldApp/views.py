from django.shortcuts import render
from . import models
from django.db.models import Count

def index(req):
    countries = models.Countries.objects.values('region').annotate(count=Count('region')).order_by('-count')

    # prints the queries
    print (50*"*")
    print countries.query
    print (50*"*")
    return render(req, 'worldApp/index.html', context={'countries':countries})

# 1)
# languages = models.Languages.objects.filter(language='slovene').order_by('-percentage')
# {% for language in languages %}
#     {{ language.country.name }} {{ language.language }} {{ language.percentage }}
# {% endfor %}
#
# 2)
# countries = models.Countries.objects.annotate(num_cities=Count('citytocountry__country_id')).order_by('-num_cities')
# {% for country in countries  %}
#     <div>{{ country.name }} {{ country.num_cities }}</div>
# {% endfor %}
#
# 3)
# countries = models.Cities.objects.filter(population__gte='500000', country__name='Mexico').order_by('population')
# {% for country in countries  %}
#     <div>{{ country.name }} {{ country.population }}</div>
# {% endfor %}
#
# 4)
# languages = models.Languages.objects.filter(percentage__gt=89).order_by('-percentage')
# {% for lang in languages  %}
#     <div>{{ lang.language }} {{ lang.percentage }}</div>
# {% endfor %}
#
# 5)
# countries = models.Countries.objects.filter(population__gte=100000, surface_area__lt=501).order_by('population')
# {% for country in countries  %}
#     <div>{{ country.name }} {{ country.surface_area }} {{ country.population }}</div>
# {% endfor %}
#
# 6)
# countries = models.Countries.objects.filter(government_form='Constitutional Monarchy', capital__gt=200, life_expectancy__gt=75)
# {% for country in countries  %}
#     <div>{{ country.name }} {{ country.government_form }} {{ country.capital }} {{ coutry.life_expectancy }}</div>
# {% endfor %}
#
# 7)
# cities = models.Cities.objects.filter(country__name='Argentina', district='Buenos Aires', population__gt=500000)
# {% for city in cities  %}
#     <div>{{ country.name }} {{ city.name }} {{ city.district }} {{ city.population }}</div>
# {% endfor %}
#
# 8)
# countries = models.Countries.objects.values('region').annotate(count=Count('region')).order_by('-count')
# {% for country in countries  %}
#     <div>{{ country.region }} {{ country.count }}</div>
# {% endfor %}
#
