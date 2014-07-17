var app = require('cantina')
  , controller = module.exports = app.controller();

controller.add(function (req, res, next) {
  res.vars.title = app.conf.get("app:title");
  res.renderStatus(404);
});
controller.weight = 9999;