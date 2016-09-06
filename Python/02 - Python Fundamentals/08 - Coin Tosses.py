import random

heads = tails = 0

for i in xrange(0, 5000):
    if random.random() < 0.5:
        heads += 1
        face = 'head'
    else:
        tails += 1
        face = 'tail'

    print "Attempt %d: Throwing a coin... It's a %s! ... Got %d head(s) so far and %d tail(s) so far" % (i + 1, face, heads, tails)

print "Ending the program, thank you!"
