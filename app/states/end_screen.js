define(['Phaser', 'app/game.js','app/global.js'], function (Phaser, game,global) {

  var title;
  var score;
  var retryButton;
  var menuButton;

  var font = "64px Arial";

  global.endScreen = {};

  function onRetryClick() {
    game.state.start("Battle");
  };

  function onMenuClick() {
    game.state.start("MainMenu");
  };

  var state = {

    preload: function () {
      game.load.spritesheet('assets/images/buttons.png', 'assets/images/buttons.png',154,64);
    },

    create: function () {
      title = game.add.text(game.width/2, 100, "Final Score", {
        font: font,
        fill: "#00FF44",
        align: "center"
      });
      title.anchor.setTo(0.5, 0.5);

      score = game.add.text(game.width / 2, 300, global.endScreen.score.toString(), {
        font: font,
        fill: "#00FF44",
        align: "center"
      });
      score.anchor.setTo(0.5, 0.5);

      retryButton = game.add.button(60, 500, 'assets/images/buttons.png', onRetryClick, this, 1, 0, 1);
      menuButton = game.add.button(580, 500, 'assets/images/buttons.png', onMenuClick, this, 3, 2, 3);
    },

    update: function () {
    }
  };

  return state;
});