module.exports = (function() {

  'use strict';

  const Nodal = require('nodal');
  const doT = require('dot');
  const Trianglify = require('trianglify');
  const Resource = Nodal.require('app/models/resource.js');
  const fs = require('fs');
  require.extensions['.html'] = function(module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
  };
  const resourcesTemplate = Nodal.require('app/templates/resources.html');

  /**
   * TODO: Figure out a way to compile all templates using the commented method
   * below without throwing the server into an infinite loop. It detects a change
   * and restarts. This may be a dev-only issue.
   */
  //const dots = require('dot').process({ path: "app/templates"});
  const tempFn = doT.template(resourcesTemplate);

  class IndexController extends Nodal.Controller {

    get() {
      Resource.query()
        .where(this.params.query)
        .orderBy('created_at', 'ASC')
        .limit(100)
        .end((err, models) => {
          /**
           * TODO: This should not throw a 404. Instead it should render a template
           * that lets the user know the data was not retrieved
           */
          if (err) {
            this.status(404);
            this.render(Nodal.Template.generate('error/404.html').render(this.params));
          }
          let resourcesMarkup = getRenderedResources(models);
          this.render(
            Nodal.Template.generate('layout.html', 'index.html').render(
              this.params, {
                test: this.params.query.test,
                name: 'Front-End Resources',
                resources: resourcesMarkup
              }
            )
          );
        });
    }
  }

  function getRenderedResources(resources) {
    let renderedResources = '';
    let keys = Object.keys(resources).forEach(function(key, i) {
      let currentResource = resources[key];
      if (!currentResource._data) {
        console.log('item does not have a _data object');
      } else {
        if (currentResource._data.title) {
          renderedResources += tempFn(currentResource._data);
        }
      }
    });
    return renderedResources;
  }

  return IndexController;

})();
