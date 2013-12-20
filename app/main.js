/*global requirejs*/
'use strict';

requirejs.config({
  baseUrl:"",
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

require(['app/game.js','app/states/battle.js'], function (game, level) {
  game.state.add('battle', level);
  game.state.start('battle');
});