define(['Phaser', './game.js', './sprites/tank.js','./tanks_data.js'], function (Phaser, game, Tank, tankData) {
  var tank = new Tank(game, tankData.t72);

  return {
    preload: function () {
      tank.preload();
    },
    create: function () {
      tank.create(100, 100);
    },
    update: function () {
      
      tank.rotate(0.01);
    }

  }
});