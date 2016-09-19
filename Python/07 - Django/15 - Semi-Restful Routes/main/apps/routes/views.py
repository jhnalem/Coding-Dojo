from django.shortcuts import render, redirect
from django.core.urlresolvers import reverse
from django.contrib import messages

from .models import Product

# Create your views here.
def index(request):
    products = Product.objects.all()

    context = { 'products': products }

    return render(request, 'routes/index.html', context)


def show(request, id):
    product = Product.objects.get(id=id)

    return render(request, 'routes/show.html', {'product': product})


def new(request):

    return render(request, 'routes/new.html')


def edit(request, id):
    product = Product.objects.get(id=id)

    return render(request, 'routes/edit.html', {'product': product})


def create(request): # POST
    if request.method == 'POST':
        name = request.POST['name']
        desc = request.POST['description']
        price = request.POST['price']

        response = Product.objects.create(name=name, description=desc, price=price)

        messages.success(request, name + " has been successfully created!")

    return redirect(reverse('routes:index'))


def update(request, id): # POST
    print "*"*50
    if request.method == 'POST':
        product = Product.objects.get(id=id)

        name = request.POST['name']
        desc = request.POST['description']
        price = request.POST['price']

        product.name = name
        product.description = desc
        product.price = price

        print "*"*50
        print name, desc, price
        print "*"*50

        product.save()
        messages.success(request, name + " has been successfully updated!")

    return redirect(reverse('routes:index'))


def destroy(request, id):
    Product.objects.get(id=id).delete()

    return redirect(reverse('routes:index'))
