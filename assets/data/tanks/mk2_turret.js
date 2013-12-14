define({
  image: {
    id: 'assets/sprites/merkava_turret.png',
    path: 'assets/sprites/merkava_turret.png',
    anchorX: 12,
    anchorY: 7,
    width: 45,
    height: 16,
    barrelEndX: 44,
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
    rotationDispersion: 0.15,
    dispersion:{
      min: 2, //This is degrees
      max:12
    },
    aimingSpeed: 0.08,
    reloadTime: 3000,
    penetration:{
      max: 130,
      min: 95
    },
    damage: {
      max: 100,
      min: 60
    }
  }
});