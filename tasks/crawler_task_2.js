module.exports = (function() {

  "use strict";

  const Nodal = require('nodal');
  const Resource = Nodal.require('app/models/resource.js');
  const request = require('request');
  const cheerio = require('cheerio');

  function generateResource(resource, tagText) {

  }

  class CrawlerTask2 extends Nodal.Task {

    exec(app, args, callback) {

      const baseUrl = 'https://github.com/dmytroyarmak/frontend-dev-resources';

      request(baseUrl, function(err, resp, body) {

        if (err) return callback(err);

        let $ = cheerio.load(body);

        $('.entry-content h2').each(function() {

          let sectionTitle = $(this).text();

          if (sectionTitle == 'Podcasts' ||
            sectionTitle == 'Free Online Books' ||
            sectionTitle == 'Newsletters' ||
            sectionTitle == 'Other Resources') {

            $(this).next().children('li').each(function() {

              let newResource = {};
              newResource.collection_id = 2;
              newResource.title = $(this).children().first().text().trim();
              newResource.description = '';
              newResource.url = $(this).children().first().attr('href');
              newResource.source = 'dmytroyarmak GitHub Resources List';

              if(sectionTitle == 'Free Online Books') {
                newResource.tags = 'Books';
              } else if(sectionTitle == 'Other Resources') {
                newResource.tags = 'Other';
              } else {
                newResource.tags = sectionTitle;
              }

              Resource.create(newResource, (err, model) => {
                console.log((err || model));
              });

            });
          }
        });
      });

      console.log('CrawlerTask2 task executed');
      callback();

    }

  }

  return CrawlerTask2;

})();
