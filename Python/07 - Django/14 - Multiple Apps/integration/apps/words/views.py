from django.shortcuts import render, redirect
from django.core.urlresolvers import reverse
import random, string

def index(request):
    if 'attempt' not in request.session:
        request.session['attempt'] = 0

    return render(request, 'words/index.html')


def generate(request):
    request.session['attempt'] += 1
    request.session['word'] = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(14))

    return redirect(reverse('words:index'))
