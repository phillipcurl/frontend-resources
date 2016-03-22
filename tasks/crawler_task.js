module.exports = (function() {

  "use strict";

  const Nodal = require('nodal');
  const Resource = Nodal.require('app/models/resource.js');
  const request = require('request');
  const cheerio = require('cheerio');

  function generateResource(resource, tagText) {
    let newResource = {};
    newResource.collection_id = 1;
    newResource.title = resource.find('.item__title > a').text().trim();
    newResource.description = resource.find('p').text().trim();
    newResource.url = resource.find('.item__footer > a').attr('title');
    newResource.source = 'Front End Newsletter';

    if(tagText.indexOf(' ') > -1) {
      tagText = tagText.substr(0,tagText.indexOf(' '));
    }
    newResource.tags = tagText;

    Resource.create(newResource, (err, model) => {
      console.log((err || model));
    });
  }

  class CrawlerTask extends Nodal.Task {

    exec(app, args, callback) {

      const baseUrl = 'http://frontendnewsletter.com/issues/';

      for(let i = 1; i<8; i++) {

        let currentUrl = baseUrl + '' + i;

        request(currentUrl, function(err, resp, body) {

          if (err) return callback(err);
          let $ = cheerio.load(body);

          $('.category > .i').each(function() {

            let tagTextUnfiltered = $(this).find('.category__title__text').text().trim();

            if( $(this).find('.item--issue').length > 1 ) {

              $(this).find('.item--issue').each(function() {

                generateResource($(this), tagTextUnfiltered);

              });

            } else {

              generateResource($(this), tagTextUnfiltered);

            }
          });
        });
      }

      console.log('CrawlerTask task executed');
      callback();

    }

  }

  return CrawlerTask;

})();
