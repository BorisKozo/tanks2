define({
  image: {
    id: 'assets/sprites/t72_turret.png',
    path: 'assets/sprites/t72_turret.png',
    anchorX: 8,
    anchorY: 7,
    width: 40,
    height: 13,
    barrelEndX: 40,
    barrelEndY: 7
  },
  sound: {
    gunFire: {
      path: 'assets/sounds/tank_firing_1.ogg',
      id: 'assets/sounds/tank_firing_1.ogg'
    }
  },
  spec: {
    rotation: 0.02,
    rotationDispersion: 0,
    dispersion:{
      min: 1, //This is degrees
      max:1
    },
    aimingSpeed: 0.05,
    reloadTime: 300,
    penetration:{
      max: 1000,
      min: 1000
    },
    damage: {
      max: 1000,
      min: 1000
    }
  }
});