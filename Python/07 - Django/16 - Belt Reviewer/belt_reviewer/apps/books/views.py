from django.shortcuts import render, redirect
from django.core.urlresolvers import reverse

from .models import Book, Review, Author
from ..account.models import User

# Create your views here.
def index(request):
    context = {
        'books': Book.objects.all(),
        'reviews': Review.objects.all().order_by('-id')[:3],
    }

    return render(request, 'books/index.html', context)


def new_book(request):
    context = {
        'authors': Author.objects.all(),
    }

    return render(request, 'books/add_book.html', context)


def create_book(request):
    if request.method == 'POST':
        post = request.POST

        if 'author-input' in post:
            author = Author.objects.create(name=post['author-input'])
        else:
            author = Author.objects.get(id=post['author-select'])


        new_book = Book.objects.create(title=post['title'], author=author)

        data = {
            'user': User.objects.get(id=request.session['user_id']),
            'book': new_book,
            'rating': post['rating'],
            'text': post['review'],
        }

        new_review = Review.objects.create(**data)

        return redirect(reverse('books:show_book', kwargs={'id':new_review.book.id}))


def create_review(request, id):
    if request.method == 'POST':
        post = request.POST

        data = {
            'user': User.objects.get(id=request.session['user_id']),
            'book': Book.objects.get(id=id),
            'rating': post['rating'],
            'text': post['text'],
        }

        new_review = Review.objects.create(**data)

        return redirect(reverse('books:show_book', kwargs={'id':new_review.book.id}))


def destroy_review(request, id):
    review = Review.objects.get(id=id)
    book = review.book.id

    if review.user.id == request.session['user_id']:
        review.delete()

    return redirect(reverse('books:show_book', kwargs={'id':book}))


def show_book(request, id):
    context = {
        'book': Book.objects.get(id=id),
        'reviews': Review.objects.filter(book__id=id)
    }

    return render(request, 'books/show.html', context)

