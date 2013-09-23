A server that watches files for changes and notifies long-polling clients.

## Basic setup

### Server

See the basic app in `examples/`.  It's easy to add as middleware in your own express app:

    var autoreload = require('connect-autoreload')
    var config = {
      watch_dirs: 'js html css/compiled thirdparty/frontend',
      ignore_regex: /\.sw[poax]$/,
    };
    app.use(autoreload(config));

This will set up the default endpoint, `waitForReload/`.

If you are not using express to serve your content, then you can run the `example/` server by itself - edit `autoreload-config.js` and run `node app.js`.

It's recommend to start the node app from your project's root directory.  That way, `watch_dirs` will correctly work with relative paths.  `examples/start.sh` is a shorthand for this if you use git.

### Client

Include `js/autoreload.js` on your page and it will reload the page when the server detects changes.  To start listening for changes, call `AutoReload.watch('http://localhost:8080')` (change the port to whichever the autocomplete server is running on).

## https setup

If your web server requires an https connection, your connect app must have a valid cert or your browser will choke.

If you are running a separate web server, it might be annoying to set up the dummy autoreload node app with your cert.  Instead, you can proxy via Apache or nginx -

Example Apache config using ProxyPass:

    ProxyPass /waitForReload http://localhost:60000/waitForReload

Example nginx config:

    location /waitForReload {
      proxy_pass      http://localhost:60000/waitForReload
    }
