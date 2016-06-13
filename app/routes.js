

  
module.exports = function(app, config, passport) {
  var path='../controllers/', _=require('underscore');

  var api       = require(path+'api');



  function nocached(req, res, next) {
    res.setHeader('Cache-Control', 'public, max-age=0');
    return next();
  }


  function cached(req, res, next) {
    res.setHeader('Cache-Control', 'public, max-age=120');
    return next();
  }
	
  function longcached(req, res, next) {
    res.setHeader('Cache-Control', 'public, max-age=120000');
    return next();
  }
  
	

  //
  // sitemap & robots
  app.get ('/robots.txt', nocached, api.robots);
  app.get ('/seo/robots.txt', nocached, api.robots);


  //
  // CRUD application by example
  // "/v1/bears"     GET     Get all the bears.
  // "/v1/bears"     POST    Create a bear.
  // "/v1/bears/:id" GET     Get a single bear.
  // "/v1/bears/:id" PUT     Update a bear with new info.
  // "/v1/bears/:id" DELETE  Delete a bear.  

  
  //
  // CRUD for documents
  // app.get ('/v1/documents', auth.ensureAuthenticated, docs.findByOwner);
  // app.get ('/v1/documents/category/:category', docs.findByCategory);
  // app.get ('/v1/documents/:slug', docs.get);
  //
  // documents update/create
  // app.put ('/v1/documents/:slug', auth.ensureAuthenticated, docs.ensureOwnerOrAdmin,docs.update);
  // app.post('/v1/documents', auth.ensureAuthenticated,docs.create);



  //
  // common api
  app.get ('/v1/config', nocached, api.config);
  // app.post('/v1/config', auth.ensureAdmin, api.saveConfig);
  app.post('/v1/trace/:key', api.trace);
  app.post('/v1/github/webhook',api.github)


};
