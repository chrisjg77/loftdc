var app = require('cantina')
  , fs = require('fs')
  , Flickr = require('flickrapi')
  ;

app.boot(function(err) {
  if (err) throw err;

  require('cantina-web');
  require('cantina-log');

  // Logging
  if (!app.conf.get('test')) {
    app.log.replaceConsole();
  }

  // Error handler.
  app.on('error', function (err) {
    if (err.stack) {
      app.log.error(err.stack);
    }
    else {
      app.log.error(err);
    }
  });

  app.Handlebars.registerHelper('ifCond', function(v1, v2, options) {
    if(v1 === v2) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  app.Handlebars.registerHelper('section', function (name, ctx, hash) {
    var cache = false;
    if(cache) {
      var ps = app.Handlebars.partials;
      if(ps[name] != undefined) {
        return ps[name](ctx,hash);
      }
    }
    var template = null;
    var file = app.root + '/views/sections/' + name + '.hbs';
    try {
      fs.statSync(file);
      var data = fs.readFileSync(file, {encoding: 'utf8'});
    } catch(err) {
      return app.log(err.toString());
    }
    template = app.Handlebars.compile(data);
    if(cache) ps[name] = template;
    return template(ctx, hash);
  });


  // Flickr Setup
  app.flickrPhotos = [];  //global variable containing image data from flickr.  updated based on setInterval below
  var conf = app.conf.get();
  app.flickrOptions = {
    api_key: conf.flickrOptions.key,
    secret: conf.flickrOptions.secret,
    user_id: conf.flickrOptions.user_id,
    access_token: conf.flickrOptions.access_token,
    access_token_secret: conf.flickrOptions.access_token_secret
  };

  setInterval(refreshPhotos, 3600000);
  refreshPhotos();
  // end Flickr

  app.start();
});



function refreshPhotos() {
  Flickr.authenticate(app.flickrOptions, function (err, flickr) {
    flickr.photos.search({
      user_id: flickr.options.user_id,
      page: 1,
      per_page: 500
    }, function (err, result) {
      app.flickrPhotos = result.photos.photo;
      app.log("Flickr update was run.");
    });
  });
}
