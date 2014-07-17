var app = require('cantina')
  , controller = module.exports = app.controller()
  , conf = app.conf.get('site')
  ;

controller.get(['/'], index);

function index (req, res, next) {
  res.vars.title = conf.title;
  res.vars.sections = conf.sections;
  res.vars.typekit = conf.typekit;
  res.vars.css = conf.css;
  res.vars.js = conf.js;
  res.vars.user = req.user;

  res.render('layout', res.vars);
}
