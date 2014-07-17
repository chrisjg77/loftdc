var app = require('cantina')
  , controller = module.exports = app.controller()
  , conf = app.conf.get('app')
  ;

controller.get(function (req, res, next) {
  // res.vars.js = [ "/vendor/jquery-1.8.3.min.js", "//use.typekit.net/mvw7mfc.js" ];
  // res.vars.css = [ "/css/style.css" ];

  next();
});

controller.weight = 850;
