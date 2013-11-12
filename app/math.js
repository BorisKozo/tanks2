define([], function () {
    var twoPi = Math.PI * 2;
    var rd = Math.PI / 180;
    var dr = 180 / Math.PI;

    function randomSeed() {
        return (Math.random() * 2 - 1) + (Math.random() * 2 - 1) + (Math.random() * 2 - 1);
    }

    var math = {
        // Returns the distance between the point at (x1,y1) to the point at (x2,y2)
        distance: function (x1, y1, x2, y2) {
            return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
        },
        withinDistance: function (x1, y1, x2, y2, distance) {
            return Math.pow(distance, 2) > (Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
        },
        randomInRange: function (min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },
        twoPI: twoPi,
        radToDeg: function (rad) {
            return rad * dr;
        },
        degToRad: function (deg) {
            return deg * rd;
        },
        randomBm: function () {  //this is from here: http://www.protonfish.com/jslib/boxmuller.shtml
            var x = 0, y = 0, rds, c;

            // Get two random numbers from -1 to 1.
            // If the radius is zero or greater than 1, throw them out and pick two new ones
            // Rejection sampling throws away about 20% of the pairs.
            do {
                x = Math.random() * 2 - 1;
                y = Math.random() * 2 - 1;
                rds = x * x + y * y;
            }
            while (rds === 0 || rds > 1);

            // This magic is the Box-Muller Transform
            c = Math.sqrt(-2 * Math.log(rds) / rds);

            // It always creates a pair of numbers. I'll return them in an array. 
            // This function is quite efficient so don't be afraid to throw one away if you don't need both.
            return [x * c, y * c];
        },
        randomNormal: function (mean, stdev) {
            return Math.round(randomSeed() * stdev + mean);
        },
        randomNormalInRange: function (stdev, min, max) {
            var result = math.randomNormal((max + min) / 2, stdev);
            return Math.min(Math.max(result, min), max);
        },

        //Increases the value by delta modulo mod
        incMod: function (value, delta, mod) {
            return (value + delta) % mod;
        },

        //Increases the value by delta but it cannot be less than min
        incMin: function (value, delta, min) {
            return Math.max(value + delta, min);
        },

        //Increases the value by delta but it cannot be more than max
        incMax: function (value, delta, max) {
            return Math.min(value + delta, max);
        }


    };

    return math;
});