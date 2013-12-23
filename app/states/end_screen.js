define(['Phaser'], function (Phaser) {

  var title;
  var score;

  var state = {

    preload: function () {
    },

    create: function () {
      score = game.add.text(10, 10, "", {
        font: "28px Arial",
        fill: "#ff0044",
        align: "left"
      });
      score.meta = { value: 0 };
      score.anchor.setTo(0.5, 0.5);
    },

    update: function () {
    }
  };

  return state;
});