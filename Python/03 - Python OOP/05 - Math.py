class MathDojo( object ):
    def __init__( self ):
        self.result = 0

    def add( self, *args ):
        self.result += sum(args)

        return self

    def subtract( self, *args ):
        self.result -= sum(args)

        return self

print MathDojo().add(2).add(2, 5).subtract(3, 2).result
