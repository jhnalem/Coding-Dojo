import random
arr = random.sample(xrange(1, 101), 100)

def bubble(arr):
    for i in range(len(arr) - 1, 0, -1):
        for j in range(0, i):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

print arr
print bubble(arr)
