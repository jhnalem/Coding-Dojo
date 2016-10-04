(function() {
    "use strict";

    function Circle(cx, cy, html_id, size) {
        var html_id = html_id;
        this.info = { id:html_id, cx: cx,  cy: cy, r:(size || 10) };

        //private function that generates a random number
        var randomNumberBetween = function(min, max){
            return Math.random()*(max-min) + min;
        }

        this.initialize = function(){
            //give a random velocity for the circle
            this.info.velocity = {
                x: randomNumberBetween(-3,3),
                y: randomNumberBetween(-3,3)
            }

            //create a circle
            var circle = makeSVG('circle', {
                cx: this.info.cx,
                cy: this.info.cy,
                r:  size || 10,
                id: html_id,
                style: "fill: black"
            });

            document.getElementById('svg').appendChild(circle);
        }

        this.update = function(time) {
            var el = document.getElementById(html_id);
            if( !el ) return;
            var domRect = el.getBoundingClientRect();

            var w = domRect.width,
                h = domRect.height;

            //see if the circle is going outside the browser. if it is, reverse the velocity
            if( this.info.cx > document.body.clientWidth - (w / 2) || this.info.cx < (w / 2)) {
                this.info.velocity.x = this.info.velocity.x * -1;
            }

            if( this.info.cy > document.body.clientHeight - (h / 2) || this.info.cy < (h / 2)) {
                this.info.velocity.y = this.info.velocity.y * -1;
            }

            this.info.cx = this.info.cx + this.info.velocity.x * time;
            this.info.cy = this.info.cy + this.info.velocity.y * time;

            el.setAttribute("cx", this.info.cx);
            el.setAttribute("cy", this.info.cy);
        }

        //creates the SVG element and returns it
        var makeSVG = function(tag, attrs) {
            var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
            for (var k in attrs) {
                el.setAttribute(k, attrs[k]);
            }
            return el;
        }

        this.initialize();
    }

    function PlayGround() {
        var counter = 0;  //counts the number of circles created
        var circles = []; //array that will hold all the circles created in the app

        //a loop that updates the circle's position on the screen
        this.loop = function(){
            for( var circle in circles ) {
                if( !circles[circle] ) return;
                circles[circle].update(1);

                for( var test in circles ) {
                    if( !circles[test] ) return;

                    var ov = detectOverlap(circles[test], circles[circle]);
                    if( ov ) {
                        /**
                         * Remove the circles
                         */
                        var id1 = circles[test].info.id,
                            id2 = circles[circle].info.id;

                        delete circles[test];
                        delete circles[circle];
                        console.log(circles);

                        var el1 = document.getElementById(id1);
                        el1.parentNode.removeChild(el1);

                        var el2 = document.getElementById(id2);
                        el2.parentNode.removeChild(el2);
                    }
                }
            }
        }

        this.createNewCircle = function(x, y, size){
            var new_circle = new Circle(x, y, counter++, size);
            circles.push(new_circle);
        }

        //create one circle when the game starts
        this.createNewCircle(document.body.clientWidth/2, document.body.clientHeight/2);
    }

    function detectOverlap(circleA, circleB) {
        if( !circleA || !circleB ) return;
        if (circleA.info.id == circleB.info.id) // If true, circleA and circleB are the same circle.
            return false;

        var deltaX = circleA.info.cx - circleB.info.cx;
        var deltaY = circleA.info.cy - circleB.info.cy;
        var distance = Math.sqrt( (deltaX*deltaX) + (deltaY*deltaY) ); // The classic distance-between-two-points formula.
        var radiusA = circleA.info.r; // The radius of circle A.
        var radiusB = circleB.info.r; // The radius of circle B.

        return distance <= (radiusA + radiusB);
    }

    var playground = new PlayGround();
    setInterval(playground.loop, 15);

    var svg = document.getElementById('svg');

    var mousedown_time;

    document.onmousedown = function(e){
        mousedown_time = (new Date()).getTime();
    }

    document.onmouseup = function(e){
        var time_pressed = (new Date()).getTime() - mousedown_time;
        playground.createNewCircle(e.clientX, e.clientY, 10 + Math.floor(time_pressed / 10));
    }

    window.onresize = function(e) {
        svg.style.width = window.innerWidth + 'px';
        svg.style.height = window.innerHeight + 'px';
    }

    svg.style.width = window.innerWidth + 'px';
    svg.style.height = window.innerHeight + 'px';



})();
