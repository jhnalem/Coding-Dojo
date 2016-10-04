(function() {
    'use strict';

    let map = new WeakMap();
    let internal = function(obj) {
        if( !map.has(obj) ) {
            map.set(obj, {});
        }
        return map.get(obj);
    }

    class Vehicle {
        constructor(name, wheels, passengers, speed) {
            this.name = name || 'unicycle';
            this.wheels = wheels || 2;
            this.passengers = passengers || 1;
            this.speed = speed;
            this.vin = (function() {
                var chars = "0123456789ABCEDGHIJKLMNOPQRSTUVWXYZ";

                var vin = '';
                for (var i = 0; i < 17; i+=1 ){
                    // Use Math.floor and Math.random to generate random index to access character from char string
                    vin += chars[Math.floor(Math.random()*35)];
                }

                return vin;
            })();

            internal(this).distance_travelled  = 0;
            internal(this).updateDistanceTravelled = function() {
                internal(this).distance_travelled += this.speed;
            };
        }

        move() {
            internal(this).updateDistanceTravelled.call(this);
            this.makeNoise();

            return this;
        }

        checkMiles() {
            console.log(internal(this).distance_travelled);

            return this;
        }

        makeNoise(noise) {
            console.log(noise || "Vroom!");

            return this;
        }
    }

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
