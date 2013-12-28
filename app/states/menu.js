define(['Phaser', 'app/math.js','app/game.js', 'app/global.js', 'app/tanks_data.js','./../sprites/tank.js'], function (Phaser, math, game, global, tanksData, Tank) {

  var title;
  var nextButton;
  var prevButton;
  var battleButton;
  var titleFont = "64px Arial";
  var tanks = [];
  var currentTank = null;
  var currentTankIndex = 0;

  function removeCurrentTank() {
    tanks[currentTankIndex].destroy();
  }

  function showCurrentTank() {
    tanks[currentTankIndex].create(50, game.height / 2);
  }

  function onNextClick() {
    removeCurrentTank();
    currentTankIndex++;
    if (currentTankIndex === tanks.length)
      currentTankIndex = 0;
    showCurrentTank();
  }

  function onPrevClick() {
    removeCurrentTank();
    currentTankIndex--;
    if (currentTankIndex === -1)
      currentTankIndex = tanks.length - 1;
    showCurrentTank();
  }

  function onBattleClick() {
    global.battle.tankId = tanks[currentTankIndex].id;
    global.battle.tankData = tanksData[tanks[currentTankIndex].id];
    game.state.start('Battle');
  }

  for (var tankId in tanksData) {
    tanks.push(new Tank(tankId, game, tanksData[tankId]))
  }

  var menu = {

    preload: function () {
      var i;
      game.load.spritesheet('assets/images/buttons.png', 'assets/images/buttons.png', 154, 64);
      for (i = 0; i < tanks.length; i++) {
        tanks[i].preload();
      }
    },

    create: function () {
      title = game.add.text(game.width / 2, 100, "Tank Selection", {
        font: titleFont,
        fill: "#00FF44",
        align: "center"
      });
      title.anchor.setTo(0.5, 0.5);
      prevButton = game.add.button(60, 500, 'assets/images/buttons.png', onPrevClick, this, 7, 6, 7);
      nextButton = game.add.button(580, 500, 'assets/images/buttons.png', onNextClick, this, 5, 4, 5);
      battleButton = game.add.button(game.width / 2, 540, 'assets/images/buttons.png', onBattleClick, this, 9, 8, 9);
      battleButton.anchor.setTo(0.5, 0.5);

      showCurrentTank();
      
    },

    update: function () {
    }
  };

  return menu;
});