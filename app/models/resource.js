module.exports = (function() {

  'use strict';

  const Nodal = require('nodal');

  class Resource extends Nodal.Model {

    // beforeSave() {
    //   let domain = '';
    //   //find & remove protocol (http, ftp, etc.) and get domain
    //   if (Resource.url.indexOf("://") > -1) {
    //     domain = Resource.url.split('/')[2];
    //   } else {
    //     domain = Resource.url.split('/')[0];
    //   }
    //   //find & remove port number
    //   domain = domain.split(':')[0];
    //   Resource.source = domain;
    // }

  }

  Resource.setDatabase(Nodal.require('db/main.js'));
  Resource.setSchema(Nodal.my.Schema.models.Resource);

  return Resource;

})();
