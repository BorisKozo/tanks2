define(['Phaser', 'app/game.js', 'app/global.js'], function (Phaser, game, global) {

  var title;
  var titleFont = "64px Arial";

  function onNextClick() {

  }

  function onPrevClick() {

  }

  var menu = {

    preload: function () {
      game.load.spritesheet('assets/images/buttons.png', 'assets/images/buttons.png', 154, 64);
    },

    create: function () {
      title = game.add.text(game.width / 2, 100, "Tank Selection", {
        font: titleFont,
        fill: "#00FF44",
        align: "center"
      });
      title.anchor.setTo(0.5, 0.5);
      retryButton = game.add.button(60, 500, 'assets/images/buttons.png', onNextClick, this, 5, 4, 5);
      menuButton = game.add.button(580, 500, 'assets/images/buttons.png', onPrevClick, this, 7, 6, 7);
    },

    update: function () {
    }
  };

  return menu;
});