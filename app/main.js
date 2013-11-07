/*global requirejs*/
'use strict';

requirejs.config({
  waitSeconds: 3000,
  shim: {
    'Phaser': {
      exports: 'Phaser'
    }

  },
  paths: {
    'Phaser': '../lib/phaser'
  }
});

require(['app/game.js','app/level.js'], function (game, level) {
  game.state.add('level', level);
  game.state.start('level');
});