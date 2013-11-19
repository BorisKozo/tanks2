define(['Phaser', './math.js', './game.js', './collision_manager.js', './sprites/tank.js', './sprites/barrel.js', './tanks_data.js', './targets_data.js'], function (Phaser, math, game, CollisionManager, Tank, Barrel, tanksData, targertsData) {
  var selectedTankData = tanksData.t72
  var tank = new Tank(game, selectedTankData);
  var barrel = new Barrel(game, targertsData.barrel);
  var shells;
  var controls;
  var collisionManager = new CollisionManager();
  var barrelToShellCollider = {
    test: function (barrel, shell) {
      return CollisionManager.colliders.circleCircle.test(shell, barrel.barrel);
    },
    symetric: false
  };

  function generateBarrel() {
    var marginX = 50;
    var marginY = 50;
    var x = game.rnd.integerInRange(marginX, game.width - marginX);
    var y = game.rnd.integerInRange(marginY, game.height - marginY);
    barrel.reviveAt(x, y);
  }

  function barrelShellCollisionHandler(barrel, shell) {
    barrel.hit(shell);
    shell.kill();
    if (barrel.hp === 0) {
      generateBarrel();
    }
  }

  function checkCollision(barrel, shell) {
    var result = math.withinDistance(barrel.x, barrel.y, shell.x, shell.y, barrel.width / 2);
    return result;
  }

  var level = {
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
      barrel.create(400, 100);
      collisionManager
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

      shells.forEachAlive(function (shell) {
        collisionManager.collide(barrel, shell, barrelToShellCollider, barrelShellCollisionHandler);
      }, this);
      //game.physics.collide(barrel.barrel, shells, barrelShellCollisionHandler, checkCollision, this);

    }

  }

  return level;
});