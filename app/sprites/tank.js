define(['Phaser', './../math.js'], function (Phaser, math) {

  var aimingGuideLength = 200;

  function rotateHull(angle) {
    this.sprites.rotation += angle;
    this.dispersion = math.incMax(this.dispersion,this.tankData.hull.spec.rotationDispersion, this.tankData.turret.spec.dispersion.max);
    //rotateTurret.call(this, angle, true);
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
    var delta = this.game.physics.velocityFromRotation(this.sprites.rotation, direction * this.tankData.hull.spec.speed);
    this.sprites.x += delta.x;
    this.sprites.y += delta.y;

    this.dispersion = math.incMax(this.dispersion, this.tankData.hull.spec.movementDispersion, this.tankData.turret.spec.dispersion.max);
  }

  function moveBackward() {
    move.call(this, -1);
  }

  function moveForward() {
    move.call(this, 1);
  }

  function getBarrelEnd() {
    var hull = this.tankData.hull;
    var turret = this.tankData.turret;
    var barrelEnd = new Phaser.Point(turret.image.barrelEndX, turret.image.barrelEndY);
    barrelEnd.rotate(turret.image.anchorX, turret.image.anchorY, this.turret.rotation + this.sprites.rotation);
    var x = this.turret.worldTransform[2] + barrelEnd.x - turret.image.anchorX;
    var y = this.turret.worldTransform[5] + barrelEnd.y - turret.image.anchorY;
    return { x: x, y: y };
  }

  function fire() {
    if (this.reloadCounter >= this.tankData.turret.spec.reloadTime) {
      //The +-1 is to compensate for the width and height of the shell when anchoring in to 0.5,0.5
      var barrelEndPoint = getBarrelEnd.call(this);
      var shell = this.game.add.sprite(barrelEndPoint.x, barrelEndPoint.y, 'assets/sprites/shell.png');
      shell.anchor.setTo(0.5, 0.5);
      shell.outOfBoundsKill = true;
      shell.rotation = this.turret.rotation+this.sprites.rotation;
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
    this.aimingGuide.beginFill(0xFFD800);
    this.aimingGuide.lineStyle(2, 0xFFD800, 0.2);

    var aimingGuideX = this.tankData.turret.image.barrelEndX - this.tankData.turret.image.anchorX;
    var aimingGuideY = this.tankData.turret.image.barrelEndY - this.tankData.turret.image.anchorY;
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
    this.sprites = this.game.add.group();
    this.sprites.x = x;
    this.sprites.y = y;
    this.hull = this.game.add.sprite(0, 0, hull.image.id);
    this.hull.anchor.setTo(hull.image.centerX / hull.image.width, hull.image.centerY / hull.image.height);
    
    this.sprites.add(this.hull);

    this.turret = this.game.add.sprite(hull.image.anchorX - hull.image.centerX, hull.image.anchorY - hull.image.centerY, turret.image.id);
    this.turret.anchor.setTo(turret.image.anchorX / turret.image.width, turret.image.anchorY / turret.image.height);
    this.sprites.add(this.turret);

    this.dispersion = turret.spec.dispersion.max;
    this.aimingGuide = this.game.add.graphics(this.turret.x, this.turret.y);
    this.sprites.add(this.aimingGuide);
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
    
  };

  return Tank;
});