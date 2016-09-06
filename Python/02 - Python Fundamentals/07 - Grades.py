for i in range(0, 10):
    grade = ''
    letter = ''

    while not grade:
        grade = int(raw_input('Enter a grade between 0 and 100: '))

        if( grade > 100 or grade < 0 ):
            grade = ''

    if( grade >= 90 ):
        letter = 'A'

    elif( grade >= 80 ):
        letter = 'B'

    elif( grade >= 70 ):
        letter = 'C'

    elif( grade >= 60 ):
        letter = 'D'

    else:
        letter = 'F'

    print 'Score: ' + str(grade) + '; Your grade is ' + letter

print 'End of the program. Bye!'
