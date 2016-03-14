module.exports = (function() {

  'use strict';

  const Nodal = require('nodal');
  const Resource = Nodal.require('app/models/resource.js');

  class V1ResourcesController extends Nodal.Controller {

    index() {

      Resource.query()
        .where(this.params.query)
        //.where('URL_IS_NOT_NULL')
        .orderBy('id', 'ASC')
        .end((err, models) => {

          this.respond(err || models);

        });

    }

    show() {

      Resource.find(this.params.route.id, (err, model) => {

        this.respond(err || model);

      });

    }

    create() {

      Resource.create(this.params.body, (err, model) => {

        this.respond(err || model);

      });

    }

    update() {

      Resource.update(this.params.route.id, this.params.body, (err, model) => {

        this.respond(err || model);

      });

    }

    destroy() {

      Resource.destroy(this.params.route.id, (err, model) => {

        this.respond(err || model);

      });

    }

  }

  return V1ResourcesController;

})();
