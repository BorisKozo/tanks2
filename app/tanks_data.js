define(['require','./../../assets/data/tanks/t72_hull.js','./../../assets/data/tanks/t72_turret.js'],
  function (require) {

    return {
      t72: {
        hull: require('./../../assets/data/tanks/t72_hull.js'),
        turret: require('./../../assets/data/tanks/t72_turret.js')
      }
    }


});