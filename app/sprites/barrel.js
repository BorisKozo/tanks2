define(['Phaser', './../math.js'], function (Phaser, math) {


  function preload() {
    this.game.load.image(this.barrelData.image.id, this.barrelData.image.path);
    this.game.load.audio(this.barrelData.sound.ricochet1.id, [this.barrelData.sound.ricochet1.path]);
    this.game.load.audio(this.barrelData.sound.ricochet2.id, [this.barrelData.sound.ricochet2.path]);
    this.game.load.audio(this.barrelData.sound.hit.id, [this.barrelData.sound.hit.path]);
  }

  function create(x, y) {
    this.barrel = this.game.add.sprite(x, y, this.barrelData.image.id);
    this.barrel.anchor.setTo(0.5, 0.5);
    this.barrel.body.immovable = true;
    this.barrel.owner = this;

    this.sounds = {};
    this.sounds.ricochet = [];
    this.sounds.ricochet.push(this.game.add.audio(this.barrelData.sound.ricochet1.id));
    this.sounds.ricochet.push(this.game.add.audio(this.barrelData.sound.ricochet2.id));

    this.sounds.hit = this.game.add.audio(this.barrelData.sound.hit.id);
    this.hp = this.barrelData.spec.hp;
  }

  function hit(shell) {

    var shellTrijectory = math.line.getLineBySlope(math.line.angleToSlope(shell.rotation), shell.x, shell.y);
    var intersection = math.lineCircleIntersection(shellTrijectory, this.barrel.x, this.barrel.y, this.barrel.width / 2);
    if (!intersection.x1) return; //No intersection?
    var dist1 = math.distanceSquared(shell.x, shell.y, intersection.x1, intersection.y1);
    var dist2 = math.distanceSquared(shell.x, shell.y, intersection.x2, intersection.y2);
    var tangent;
    if (dist1 < dist2) {
      tangent = math.circleTangent(intersection.x1, intersection.y1, this.barrel.x, this.barrel.y, this.barrel.width / 2);
    } else {
      tangent = math.circleTangent(intersection.x2, intersection.y2, this.barrel.x, this.barrel.y, this.barrel.width / 2);
    }

    var hitAngle = math.line.angleBetweenLines(shellTrijectory, tangent);

    var armorValue = hitAngle < 0.1 ? Infinity : this.barrelData.spec.armor / Math.sin(hitAngle);

    if (armorValue > shell.tag.penetration) {
      this.sounds.ricochet[math.randomIntInRange(0, this.sounds.ricochet.length - 1)].play();
      return;
    }

    this.hp -= shell.tag.damage;
    if (this.hp <= 0) {
      this.explosion = this.game.add.sprite(this.barrel.x, this.barrel.y, 'assets/sprites/explosion.png');
      this.explosion.anchor.setTo(0.5, 0.5);
      this.explosion.animations.add('explode');
      this.explosion.animations.play('explode', null, false, true);
      var explosion = this.game.add.audio('assets/sounds/explode1.ogg');
      explosion.play();
      this.barrel.kill();
      this.hp = 0;
    } else {
      this.sounds.hit.play();
    }
  }

  function reviveAt(x, y) {
    this.barrel.revive();
    this.barrel.x = x;
    this.barrel.y = y;
    this.hp = this.barrelData.spec.hp;
  }

  var Barrel = function (game, barrelData) {
    this.game = game;
    this.barrelData = barrelData;
    this.preload = preload;
    this.create = create;
    this.reviveAt = reviveAt;
    this.hit = hit;

  }

  Barrel.prototype.collisionType = "barrel";

  return Barrel;
});