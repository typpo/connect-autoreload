//
// Connect middleware for autoreload
//

var chokidar = require('chokidar')
  , path = require('path')

module.exports = function(config) {
  var waiting = [];

  function startWatch(dir) {
    var watcher = chokidar.watch(dir, {
        ignored: config.ignore_regex,
        persistent: true,
    });

    watcher.on('change', function(path) {
      console.log('Change detected in', path);
      waiting.map(function(qtuple) {
        var callback_str = qtuple[0]
          , res = qtuple[1]

        if (callback_str) {
          // jsonp response
          console.log('jsonp calling', callback_str);
          res.end(callback_str + '(' + (+new Date())+')');
        } else {
          // regular response
          res.end((+new Date())+'');
        }
      });
      waiting = [];
      console.log('Reset waiting queue');
    })
  }

  var watch_dirs = config.watch_dirs.split(' ');
  watch_dirs.map(function(dir) {
    try {
      startWatch(dir);
    } catch (e) {}
  });

  return function(req, res, next) {
    if (req.path === '/waitForReload') {
      // Clients long poll for a change
      waiting.push([req.query.callback, res]);
      console.log('New client waiting.', waiting.length, 'total.');
    } else if (req.path === '/autoreload.js' && res.sendfile) {
      res.sendfile(path.resolve(__dirname, '../js/autoreload.js'));
    } else {
      next();
    }
  }
}
