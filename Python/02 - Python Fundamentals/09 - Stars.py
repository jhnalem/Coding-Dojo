# Part I
def draw_stars(ls):
    for i in ls:
        string = ''

        for j in range(0, i):
            string += '*'

        print string

draw_stars([4,6,1,3,5,7,25])

# Part II
def draw_stars2(ls):
    for i in ls:
        string = ''
        char = '*' if isinstance(i, int) else i[0].lower()
        leng = i if isinstance(i, int) else len(i)
        for j in range(0, leng):
            string += char

        print string

draw_stars2([4, "Tom", 1, "Michael", 5, 7, "Jimmy Smith"])
