var express = require('express')
  , autoreload = require('connect-autoreload')
  , config = require('./autoreload-config.js')

var app = module.exports = express();
app.use(autoreload(config));
app.listen(config.port, null);
