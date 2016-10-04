(function() {
    'use strict';

    var Vehicle = function(name, wheels, passengers, speed) {
        var distance_travelled = 0;
        var updateDistanceTravelled = function() {
            distance_travelled += this.speed;
        };

        this.name = name;
        this.wheels = wheels;
        this.passengers = passengers || 4;
        this.speed = speed;

        this.move = function() {
            updateDistanceTravelled.call(this);
            this.makeNoise();

            return this;
        };

        this.checkMiles = function() {
            console.log(distance_travelled);

            return this;
        };
    };

    Vehicle.prototype.makeNoise = function(noise) {
        console.log(noise || "Vroom!");

        return this;
    };


    class Bike extends Vehicle {
        makeNoise() {
            console.log("Ring Ring!");

            return this;
        }
    }

    class Bus extends Vehicle {
        pickUpPassengers(num) {
            this.passengers += num;

            return this;
        }
    }

    var sedan = new Vehicle('sedan');
    sedan.makeNoise("Honk Honk!");

    var bus = new Bus('schoolbus', 10, 0);
    console.log(bus.pickUpPassengers(5).pickUpPassengers(10).passengers);

    var veh = new Vehicle('car', 4, 2, 10);
    veh.move().move().move().checkMiles();
})()
