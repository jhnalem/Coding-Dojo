(function() {
    'use strict';

    class Vehicle {
        constructor(name, wheels, passengers) {
            this.name = name;
            this.wheels = wheels || 4;
            this.passengers = passengers || 0;
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
        addPeople(num) {
            this.passengers += num;

            return this;
        }
    }

    var sedan = new Vehicle('sedan');
    sedan.makeNoise("Honk Honk!");

    var bus = new Bus('schoolbus', 10, 0);
    console.log(bus.addPeople(5).addPeople(10).passengers)
})()
