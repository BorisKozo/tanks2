define(['Phaser'], function (Phaser) {


  function preload() {
    this.game.load.image(this.barrelData.image.id, this.barrelData.image.path);
  }

  function create(x,y) {
    this.barrel = this.game.add.sprite(x, y, this.barrelData.image.id);
    this.barrel.anchor.setTo(0.5, 0.5);
    this.barrel.body.immovable = true;
    this.barrel.owner = this;
    this.hp = this.barrelData.spec.hp;
  }

  function hit(shell) {
    this.hp -= shell.tag.damage;
    if (this.hp <= 0) {
      this.explosion = this.game.add.sprite(this.barrel.x, this.barrel.y, 'explosion');
      this.explosion.anchor.setTo(0.5, 0.5);
      this.explosion.animations.add('explode');
      this.explosion.animations.play('explode',null,false,true);
      this.barrel.kill();
    }
  }

  var Barrel = function (game, barrelData) {
    this.game = game;
    this.barrelData = barrelData;
    this.preload = preload;
    this.create = create;
    this.hit = hit;
  }

  return Barrel;
});