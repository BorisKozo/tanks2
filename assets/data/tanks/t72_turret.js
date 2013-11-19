define({
  image: {
    id: 'assets/sprites/t72_turret.png',
    path: 'assets/sprites/t72_turret.png',
    anchorX: 7,
    anchorY: 7,
    width: 28,
    height: 15,
    barrelEndX: 27,
    barrelEndY: 7
  },
  sound: {
    gunFire: {
      path: 'assets/sounds/tank_firing_1.ogg',
      id: 'assets/sounds/tank_firing_1.ogg'
    }
  },
  spec: {
    rotation: 0.005,
    rotationDispersion: 0.2,
    dispersion:{
      min: 5, //This is degrees
      max:15
    },
    aimingSpeed: 0.05,
    reloadTime: 3000,
    penetration:{
      max: 120,
      min: 95
    },
    damage: {
      max: 100,
      min: 60
    }
  }
});