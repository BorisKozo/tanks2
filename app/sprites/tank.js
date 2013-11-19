define(['Phaser', './../math.js'], function (Phaser, math) {

  var aimingGuideLength = 200;

  function rotateHull(angle) {
    this.hull.rotation += angle;
    this.dispersion = math.incMax(this.dispersion,this.tankData.hull.spec.rotationDispersion, this.tankData.turret.spec.dispersion.max);
    rotateTurret.call(this, angle, true);
  }

  function rotateTurret(angle, avoidDispersion) {
    this.turret.rotation += angle;
    if (!avoidDispersion) {
      this.dispersion = math.incMax(this.dispersion, this.tankData.turret.spec.rotationDispersion, this.tankData.turret.spec.dispersion.max);
    }
    this.aimingGuide.rotation += angle;
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
    var delta = this.game.physics.velocityFromRotation(this.hull.rotation, direction * this.tankData.hull.spec.speed);
    this.hull.x += delta.x;
    this.hull.y += delta.y;

    this.turret.x += delta.x;
    this.turret.y += delta.y;

    this.aimingGuide.x += delta.x;
    this.aimingGuide.y += delta.y;

    this.dispersion = math.incMax(this.dispersion, this.tankData.hull.spec.movementDispersion, this.tankData.turret.spec.dispersion.max);
  }

  function moveBackward() {
    move.call(this, -1);
  }

  function moveForward() {
    move.call(this, 1);
  }

  function getBarrelEnd() {
    var point = new Phaser.Point(this.tankData.turret.image.barrelEndX, this.tankData.turret.image.barrelEndY);
    point = point.rotate(this.tankData.turret.image.anchorX, this.tankData.turret.image.anchorY, this.turret.angle, true);
    var x = this.turret.x + point.x - this.tankData.turret.image.anchorX;
    var y = this.turret.y + point.y - this.tankData.turret.image.anchorY;
    return { x: x, y: y };
  }

  function fire() {
    if (this.reloadCounter >= this.tankData.turret.spec.reloadTime) {
      //The +-1 is to compensate for the width and height of the shell when anchoring in to 0.5,0.5
      var barrelEndPoint = getBarrelEnd.call(this);
      var shell = this.game.add.sprite(barrelEndPoint.x, barrelEndPoint.y, 'assets/sprites/shell.png');
      shell.anchor.setTo(0.5, 0.5);
      shell.outOfBoundsKill = true;
      shell.rotation = this.turret.rotation;
      shell.body.immovable = true;
      shell.tag = {
        penetration: math.randomInRange(this.tankData.turret.spec.penetration.min, this.tankData.turret.spec.penetration.max), 
        damage: math.randomInRange(this.tankData.turret.spec.damage.min, this.tankData.turret.spec.damage.max) 
      };
      shell.angle = math.randomNormal(shell.angle, this.dispersion * 0.6);
      shell.collisionType = "shell";
      this.game.physics.velocityFromAngle(shell.angle, 500, shell.body.velocity);
      this.gunFire.play();
      this.reloadCounter = 0;
      this.dispersion = this.tankData.turret.spec.dispersion.max;
      return shell;
    }
  }


  function preload() {
    this.game.load.image(this.tankData.hull.image.id, this.tankData.hull.image.path);
    this.game.load.image(this.tankData.turret.image.id, this.tankData.turret.image.path);
    this.game.load.audio(this.tankData.turret.sound.gunFire.id, [this.tankData.turret.sound.gunFire.path]);
  }

  function calculateAimingGuide() {

    this.aimingGuide.clear();
    this.aimingGuide.beginFill(0xFF0000);
    this.aimingGuide.lineStyle(1, 0xFF0000, 1);

    var aimingGuideX = this.tankData.turret.image.barrelEndX - this.turret.width * this.turret.anchor.x;
    var aimingGuideY = this.tankData.turret.image.barrelEndY - this.turret.height * this.turret.anchor.y;
    var deltaX = aimingGuideLength * Math.cos(Phaser.Math.degToRad(this.dispersion));
    var deltaY = aimingGuideLength * Math.sin(Phaser.Math.degToRad(this.dispersion));
    this.aimingGuide.moveTo(aimingGuideX, aimingGuideY);
    this.aimingGuide.lineTo(aimingGuideX + deltaX, aimingGuideY + deltaY);
    this.aimingGuide.moveTo(aimingGuideX, aimingGuideY);
    this.aimingGuide.lineTo(aimingGuideX + deltaX, aimingGuideY - deltaY);

    this.aimingGuide.endFill();

  }

  function create(x, y) {

    var hull = this.tankData.hull;
    var turret = this.tankData.turret;

    this.hull = this.game.add.sprite(x, y, hull.image.id);
    this.hull.anchor.setTo(hull.image.anchorX / hull.image.width, hull.image.anchorY / hull.image.height);

    this.turret = this.game.add.sprite(x, y, turret.image.id);
    this.turret.anchor.setTo(turret.image.anchorX / turret.image.width, turret.image.anchorY / turret.image.height);

    this.dispersion = this.tankData.turret.spec.dispersion.max;
    this.aimingGuide = this.game.add.graphics(x, y);
    calculateAimingGuide.call(this);
    this.reloadCounter = this.tankData.turret.spec.reloadTime;

    this.gunFire = this.game.add.audio(this.tankData.turret.sound.gunFire.id);
  }

  function update(time) {
    if (this.reloadCounter < this.tankData.turret.spec.reloadTime) {
      this.reloadCounter += this.game.time.elapsed;
    }

    this.dispersion = math.incMin(this.dispersion, - this.tankData.turret.spec.aimingSpeed, this.tankData.turret.spec.dispersion.min);
    calculateAimingGuide.call(this);

    //console.log(this.turret.angle);
    //console.log(this.turret.rotation);

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