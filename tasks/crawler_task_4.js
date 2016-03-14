module.exports = (function() {

  "use strict";

  const Nodal = require('nodal');
  const Resource = Nodal.require('app/models/resource.js');
  const request = require('request');
  const cheerio = require('cheerio');

  class CrawlerTask3 extends Nodal.Task {

    exec(app, args, callback) {

      const baseUrl = 'http://html5weekly.com/issues/';

      for(let i = 229; i>228; i--) {

        let currentUrl = baseUrl + i;

        request(currentUrl, function(err, resp, body) {

          if (err) return callback(err);
          let $ = cheerio.load(body);

          console.log(body);

          // $('.newsletter-article').each(function() {
          //
          //   //let sectionParent = $(this).parent();
          //   let sectionTitle = $(this).parent().find('.section-title').text().trim();
          //
          //   if(sectionTitle !== 'From Our Sponsor') {
          //
          //     let headerAnchor = $(this).find('.article-title').children().first();
          //
          //     let newResource = {};
          //     newResource.collection_id = 3;
          //     newResource.title = $(headerAnchor).text().trim();
          //     newResource.description = $(this).find('p').first().text().trim();
          //     newResource.url = $(headerAnchor).attr('href');
          //     newResource.source = 'CSS Weekly';
          //     newResource.tags = 'CSS';
          //
          //     Resource.create(newResource, (err, model) => {
          //       console.log((err || model));
          //     });
          //
          //   }
          // });
        });
      }

      console.log('CrawlerTask task executed');
      callback();

    }

  }

  return CrawlerTask3;

})();
