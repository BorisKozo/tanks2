define(['Phaser', './game.js', './sprites/tank.js','./sprites/barrel.js', './tanks_data.js','./targets_data.js'], function (Phaser, game, Tank, Barrel, tanksData, targertsData) {
  var selectedTankData = tanksData.t72
  var tank = new Tank(game, selectedTankData);
  var barrel = new Barrel(game, targertsData.barrel);
  var shells;
  var controls;

  function barrelShellCollisionHandler(barrel, shell) {
    barrel.owner.hit(shell);
    shell.kill();
    if (barrel.hp === 0) {
      this.generateBarrel();
    }
  }

  return {
    preload: function () {

      this.game.load.image('assets/sprites/shell.png', 'assets/sprites/shell.png');
      this.game.load.spritesheet('assets/sprites/explosion.png', 'assets/sprites/explosion.png', 128, 128);
      this.game.load.audio('assets/sounds/explode1.ogg', ['assets/sounds/explode1.ogg']);

      tank.preload();
      barrel.preload();
    },

    create: function () {

      shells = game.add.group();

      controls = game.input.keyboard.createCursorKeys()
      controls.turretLeft = game.input.keyboard.addKey(Phaser.Keyboard.A);
      controls.turretRight = game.input.keyboard.addKey(Phaser.Keyboard.D);
      controls.fire = game.input.keyboard.addKey(Phaser.Keyboard.S);
      tank.create(100, 100);
      barrel.create(620, 100);
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
        var shell = tank.fire();
        if (shell) {
          shells.add(shell);
          //game.physics.quadTree.insert(shell.body);
        }
      }

      tank.update();

      game.physics.collide(barrel.barrel, shells, barrelShellCollisionHandler);
      
    }

  }
});