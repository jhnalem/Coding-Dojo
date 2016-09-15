from django.shortcuts import render

ninja_colors = {
    'blue': 'leonardo',
    'orange': 'michelangelo',
    'red': 'raphael',
    'purple': 'donatello'
}

def index(request):

    return render(request, 'ninjas/index.html')

def ninjas(request):


    return render(request, 'ninjas/index.html', {'color': 'all'})
def ninja(request, color):
    if color in ninja_colors:
        color = ninja_colors[color]
    else:
        color = 'notapril'

    return render(request, 'ninjas/index.html', {'color': color})
