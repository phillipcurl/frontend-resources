module.exports = (function() {

  "use strict";

  const Nodal = require('nodal');

  class CreateResource extends Nodal.Migration {

    constructor(db) {
      super(db);
      this.id = 2016030501234028;
    }

    up() {

      return [
        this.createTable("resources", [{"name":"collection_id","type":"int"},{"name":"title","type":"string"},{"name":"description","type":"string"},{"name":"url","type":"string"},{"name":"source","type":"string"},{"name":"tags","type":"string"}])
      ];

    }

    down() {

      return [
        this.dropTable("resources")
      ];

    }

  }

  return CreateResource;

})();
