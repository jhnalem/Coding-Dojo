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


class MathDojo2( object ):
    def __init__( self ):
        self.result = 0

    def _math( self, args ):
        x = 0
        for i in args:
            if type(i) in [list, tuple]:
                val = sum(i)
            else:
                val = i
            x += val

        return x

    def add( self, *args ):
        self.result += self._math(args)

        return self

    def subtract( self, *args ):
        self.result -= self._math(args)

        return self

print  MathDojo2().add([1],3,4).add([3, 5, 7, 8], [2, 4.3, 1.25]).subtract(2, [2,3], [1.1, 2.3]).results
