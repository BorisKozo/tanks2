define(['require', 'Phaser', './game.js', 'app/states/battle.js', 'app/states/end_screen.js'], function (require, Phaser, game) {
  var battleState = require('app/states/battle.js');
  var endScreenState = require('app/states/end_screen.js');

  var loader = {
    start: function () {
      game.state.add('Battle', battleState);
      game.state.add('EndScreen', endScreenState);
      game.state.start('EndScreen');
    }
  };

  return loader;

});