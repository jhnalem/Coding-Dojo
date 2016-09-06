def bubbleSort(ls):
    for i in range(len(ls) - 1, 0, -1):
        for j in range(i):
            if ls[j] > ls[j+1]:
                ls[j], ls[j+1] = ls[j+1], ls[j]
    return ls

print bubbleSort([1, 3])
print bubbleSort([3, 2, 1])
print bubbleSort([1,2,3,4,5,6,7,8,9])
print bubbleSort([9,8,7,6,5,4,3,2,1])
print bubbleSort([1,9,2,8,3,7,4,6,5])
