class Bike(object):
    def __init__( self, price = 0, max_speed = 0 ):
        self.miles = 0
        self.price = price
        self.max_speed = max_speed

    def displayInfo( self ):
        print "Price: $" + str(self.price)
        print "Max Speed: " + self.max_speed
        print "Total miles:", self.miles
        print "\n"

        return self

    def ride( self ):
        print "Riding."
        self.miles += 10

        return self

    def reverse(self):
        if( self.miles >= 5 ):
            print "Reversing."
            self.miles -= 5

        else:
            print "Can't go back anymore."
            self.miles = 0

        return self


bike1 = Bike(200, "25mph")
bike1.ride().ride().ride().reverse().displayInfo()

bike2 = Bike(100, "30mph")
bike2.ride().ride().reverse().reverse().displayInfo()

bike3 = Bike(300, "50mpg")
bike3.reverse().reverse().reverse().displayInfo()
