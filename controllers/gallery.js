var app = require('cantina')
  , controller = module.exports = app.controller()
  , conf = app.conf.get()
  , Flickr = require('flickrapi')
  ;

controller.get('/gallery', function (req, res) {
  res.vars.title = conf.title;
  res.vars.photos = app.flickrPhotos;
  res.render('gallery', res.vars);
});