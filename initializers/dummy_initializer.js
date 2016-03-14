module.exports = (function() {

  'use strict';

  const Nodal = require('nodal');
  const scheduleWorker = Nodal.require('worker.js');

  class DummyInitializer {

    exec(callback) {
      console.log('Initializer Ready');
      callback(null);
    }

  }

  return DummyInitializer;

})();
