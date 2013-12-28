define(['require', 'Phaser', './game.js', 'app/states/battle.js', 'app/states/end_screen.js', 'app/states/menu.js'], function (require, Phaser, game) {
  var battleState = require('app/states/battle.js');
  var endScreenState = require('app/states/end_screen.js');
  var menuState = require('app/states/menu.js');

  var loader = {
    start: function () {
      game.state.add('Battle', battleState);
      game.state.add('EndScreen', endScreenState);
      game.state.add('Menu', menuState);
      game.state.start('Menu');
    }
  };

  return loader;

});