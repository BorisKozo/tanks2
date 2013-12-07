define(['Phaser', './math.js', './game.js', './collision_manager.js', './sprites/tank.js', './sprites/barrel.js', './tanks_data.js', './targets_data.js'], function (Phaser, math, game, CollisionManager, Tank, Barrel, tanksData, targertsData) {
  var levelData = { //This needs to come from the level selector
    time: 3
  };
  var selectedTankData = tanksData.t72;
  var tank = new Tank(game, selectedTankData);
  var barrel = new Barrel(game, targertsData.barrel);
  var shells;
  var controls;
  var score;
  var timer;
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
      score.meta.value += barrel.maxHp;
      score.setText("Score : " + score.meta.value);
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
      this.game.load.image('sand_background', 'assets/images/beach_sand_background.jpg');

      tank.preload();
      barrel.preload();
    },

    create: function () {

      game.add.sprite(0, 0, 'sand_background');
      shells = game.add.group();

      controls = game.input.keyboard.createCursorKeys();
      controls.turretLeft = game.input.keyboard.addKey(Phaser.Keyboard.A);
      controls.turretRight = game.input.keyboard.addKey(Phaser.Keyboard.D);
      controls.fire = game.input.keyboard.addKey(Phaser.Keyboard.S);
      score = game.add.text(10, 10, "Score : 0", {
        font: "28px Arial",
        fill: "#ff0044",
        align: "left"
      });
      score.meta = { value: 0 };

      timer = game.add.text(game.width - 10, 10, "Time : " + levelData.time, { 
        font: "28px Arial",
        fill: "#ff0044",
        align: "right"
      });
      timer.anchor.setTo(1, 0);
      timer.meta = { time: levelData.time };

      tank.create(100, 100);
      barrel.create(400, 100);
    },

    update: function () {
      timer.meta.time -= game.time.elapsed/1000;
      timer.setText("Time : " + Math.ceil(timer.meta.time));
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
      barrel.update();
    }

  };

  return level;
});