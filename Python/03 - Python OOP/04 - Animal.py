class Animal( object ):
    def __init__( self, name = 'Animal', health = 100 ):
        self.name = name
        self.health = health

    def walk( self ):
        self.health -= 1

        return self

    def run( self ):
        self.health -= 5

        return self

    def displayHealth( self ):
        print self.name + ': ' + str(self.health)

        return self

class Dog( Animal ):
    def __init__( self, name = 'Dog', health = 150 ):
        super(Dog, self).__init__(name, health)

    def pet( self ):
        self.health += 5

        return self

class Dragon( Animal ):
    def __init__( self, name = 'Dragon', health = 170 ):
        super(Dragon, self).__init__(name, health)

    def fly( self ):
        self.health -= 10

        return self

    def displayHealth( self ):
        print 'this is a dragon!'

        super(Dragon, self).displayHealth()

        return self


pikachu = Animal( 'Pikachu' )
pikachu.walk().walk().walk().run().displayHealth()

otis = Dog('Otis')
otis.walk().walk().walk().run().run().pet().displayHealth()

falkor = Dragon('Falkor')
falkor.walk().walk().walk().run().run().fly().fly().displayHealth()

# pikachu.pet()
# pikachu.fly()
# otis.fly()
