define(['Phaser'], function (Phaser, game) {

  function rotate(rad) {
    this.hull.rotation += rad;
    this.turret.rotation += rad;
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
    this.rotate = rotate;
    this.preload = preload;
    this.create = create;
  };

  return Tank;
});