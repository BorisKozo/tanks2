define(['require', 
        'assets/data/tanks/t72_hull.js', 'assets/data/tanks/t72_turret.js',
        'assets/data/tanks/mk2_hull.js', 'assets/data/tanks/mk2_turret.js',
        'assets/data/tanks/m1a_hull.js', 'assets/data/tanks/m1a_turret.js',

        'assets/data/tanks/uber_hull.js', 'assets/data/tanks/uber_turret.js',
],
  function (require) {

    return {
      t72: {
        hull: require('assets/data/tanks/t72_hull.js'),
        turret: require('assets/data/tanks/t72_turret.js')
      },
      mk2: {
        hull: require('assets/data/tanks/mk2_hull.js'),
        turret: require('assets/data/tanks/mk2_turret.js')
      },
      m1a: {
        hull: require('assets/data/tanks/m1a_hull.js'),
        turret: require('assets/data/tanks/m1a_turret.js')
      },
      uber: {
        hull: require('assets/data/tanks/uber_hull.js'),
        turret: require('assets/data/tanks/uber_turret.js')
      }
    }
});