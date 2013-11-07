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
    this.hull.x += delta.x;
    this.hull.y += delta.y;

    this.turret.x += delta.x;
    this.turret.y += delta.y;
  }

  function moveBackward() {
    move.call(this, -1);
  }

  function moveForward() {
    move.call(this, 1);
  }

  function fire() {
    if (this.reloadCounter >= this.tankData.turret.spec.reloadTime) {
      //The +-1 is to compensate for the width and height of the shell when anchoring in to 0.5,0.5
      var point = new Phaser.Point(this.tankData.turret.image.barrelEndX,this.tankData.turret.image.barrelEndY);
      point = point.rotate(this.tankData.turret.image.anchorX, this.tankData.turret.image.anchorY, this.turret.angle, true);
      var x = this.turret.x + point.x- this.tankData.turret.image.anchorX;
      var y = this.turret.y + point.y - this.tankData.turret.image.anchorY;
      var shell = this.game.add.sprite(x, y, 'shell');
      shell.anchor.setTo(0.5, 0.5);
      this.game.physics.velocityFromAngle(this.turret.angle, 500,shell.body.velocity);
      
      this.reloadCounter = 0;
    }
    
  }


  function create(x,y) {

    var hull = this.tankData.hull;
    var turret = this.tankData.turret;

    this.hull = this.game.add.sprite(x, y, hull.image.id);
    this.hull.anchor.setTo(hull.image.anchorX/hull.image.width, hull.image.anchorY/hull.image.height);

    this.turret = this.game.add.sprite(x, y, turret.image.id);
    this.turret.anchor.setTo(turret.image.anchorX / turret.image.width, turret.image.anchorY / turret.image.height);

    this.reloadCounter = this.tankData.turret.spec.reloadTime;
  }

  function preload() {
    this.game.load.image(this.tankData.hull.image.id, this.tankData.hull.image.path);
    this.game.load.image(this.tankData.turret.image.id, this.tankData.turret.image.path);
  }

  function update(time) {
    if (this.reloadCounter < this.tankData.turret.spec.reloadTime) {
      this.reloadCounter += this.game.time.elapsed;
    } 
  }

  var Tank = function (game, tankData) {
    this.game = game;
    this.tankData = tankData;

    //functions
    this.preload = preload;
    this.create = create;
    this.update = update;

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