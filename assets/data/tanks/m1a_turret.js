define({
  image: {
    id: 'assets/sprites/m1a_turret.png',
    path: 'assets/sprites/m1a_turret.png',
    anchorX: 16,
    anchorY: 9,
    width: 47,
    height: 19,
    barrelEndX: 46,
    barrelEndY: 9
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
      min: 7, //This is degrees
      max:19
    },
    aimingSpeed: 0.03,
    reloadTime: 4000,
    penetration:{
      max: 150,
      min: 110
    },
    damage: {
      max: 120,
      min: 90
    }
  }
});