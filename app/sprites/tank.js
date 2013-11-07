define(['Phaser'], function (Phaser, game) {

  function rotateHull(angle) {
    this.hull.rotation += angle;
    this.turret.rotation += angle;
  }

  function rotateTurret(angle) {
    this.turret.rotation += angle;
  }

  //Should be rotateHullCW
  function rotateHullRight() {
    rotateHull.call(this, this.tankData.hull.spec.rotation);
  }

  //Should be rotateHullCCW
  function rotateHullLeft() {
    rotateHull.call(this, -this.tankData.hull.spec.rotation);
  }

  //Should be rotateHullCW
  function rotateTurretRight() {
    rotateTurret.call(this, this.tankData.turret.spec.rotation);
  }

  //Should be rotateHullCCW
  function rotateTurretLeft() {
    rotateTurret.call(this, -this.tankData.turret.spec.rotation);
  }


  function move(direction) {
    var delta = this.game.physics.velocityFromRotation(this.hull.rotation, direction*this.tankData.hull.spec.speed);
    this.hull.x += delta.y;
    this.hull.y -= delta.x;

    this.turret.x += delta.y;
    this.turret.y -= delta.x;
  }

  function moveBackward() {
    move.call(this, -1);
  }

  function moveForward() {
    move.call(this, 1);
  }

  function fire() {

  }


  function create(x,y) {

    var hull = this.tankData.hull;
    var turret = this.tankData.turret;

    this.hull = this.game.add.sprite(x, y, hull.image.id);
    this.hull.anchor.setTo(hull.image.anchorX/hull.image.width, hull.image.anchorY/hull.image.height);

    this.turret = this.game.add.sprite(x, y, turret.image.id);
    this.turret.anchor.setTo(turret.image.anchorX / turret.image.width, turret.image.anchorY / turret.image.height);

  }

  function preload() {
    this.game.load.image(this.tankData.hull.image.id, this.tankData.hull.image.path);
    this.game.load.image(this.tankData.turret.image.id, this.tankData.turret.image.path);

  }

  var Tank = function (game, tankData) {
    this.game = game;
    this.tankData = tankData;

    //functions
    this.preload = preload;
    this.create = create;

    this.rotateHullRight = rotateHullRight;
    this.rotateHullLeft = rotateHullLeft;
    this.rotateTurretRight = rotateTurretRight;
    this.rotateTurretLeft = rotateTurretLeft;

    this.moveForward = moveForward;
    this.moveBackward = moveBackward;

    this.fire = fire;
    ;
  };

  return Tank;
});