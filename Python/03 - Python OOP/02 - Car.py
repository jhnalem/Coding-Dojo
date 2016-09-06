class Bike(object):
    def __init__( self, price = 0, speed = '0mph', fuel = 'Empty', mileage = '0mpg' ):
        self.price   = price
        self.speed   = speed
        self.fuel    = fuel
        self.mileage = mileage
        self.tax     = 0.12 if price <= 10000 else 0.15

    def display_all( self ):
        print 'Price: ' + str(self.price)
        print 'Speed: ' + self.speed
        print 'Fuel: ' + self.fuel
        print 'Mileage: ' + self.mileage
        print 'Tax: ' + str(self.tax)
        print '\n'


bike1 = Bike(2000, '35mph', 'Full', '15mpg')
bike2 = Bike(2000, '5mph', 'Not Full', '105mpg')
bike3 = Bike(2000, '15mph', 'Kind of Full', '95mpg')
bike4 = Bike(2000, '25mph', 'Full', '25mpg')
bike5 = Bike(2000, '45mph', 'Empty', '25mpg')
bike6 = Bike(200000, '35mph', 'Empty', '15mpg')

bike1.display_all()
bike2.display_all()
bike3.display_all()
bike4.display_all()
bike5.display_all()
bike6.display_all()
