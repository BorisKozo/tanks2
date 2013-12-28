/*global requirejs*/
'use strict';

requirejs.config({
  baseUrl:"tanks2",
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

require(['app/loader.js'], function (loader) {
  loader.start();
});