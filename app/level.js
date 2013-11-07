define(['Phaser', './game.js', './sprites/tank.js', './tanks_data.js'], function (Phaser, game, Tank, tankData) {
  var selectedTankData = tankData.t72
  var tank = new Tank(game, selectedTankData);
  var controls;

  return {
    preload: function () {

      this.game.load.image('shell', 'assets/sprites/shell.png');

      tank.preload();
    },

    create: function () {
      controls = game.input.keyboard.createCursorKeys()
      controls.turretLeft = game.input.keyboard.addKey(Phaser.Keyboard.A);
      controls.turretRight = game.input.keyboard.addKey(Phaser.Keyboard.D);
      controls.fire = game.input.keyboard.addKey(Phaser.Keyboard.S);
      tank.create(100, 100);
    },

    update: function () {
      if (controls.right.isDown) {
        tank.rotateHullRight();
      } else {
        if (controls.left.isDown) {
          tank.rotateHullLeft();
        }
      }

      if (controls.up.isDown) {
        tank.moveForward();
      } else {
        if (controls.down.isDown) {
          tank.moveBackward();
        }
      }

      if (controls.turretLeft.isDown) {
        tank.rotateTurretLeft();
      } else {
        if (controls.turretRight.isDown) {
          tank.rotateTurretRight();
        }
      }

      if (controls.fire.isDown) {
        tank.fire();
      }

      tank.update();

      
    }

  }
});