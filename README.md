A server that watches files for changes and notifies long-polling clients.

## Basic setup

See the basic app in `examples/`.  To put in your own app:

    var autoreload = require('connect-autoreload')
    var config = {
      watch_dirs: 'js html css/compiled thirdparty/frontend',
      ignore_regex: /\.sw[poax]$/,
    };
    app.use(autoreload(config));

This will set up the default endpoint, `waitForReload/`.

If you are not using express to serve your content, then you can run the `example/` server by itself.

It's recommend to start the node app from your project's root directory.  That way, `watch_dirs` will correctly work with relative paths.  `./start.sh` is a shorthand for this if you use git.

Include `js/autoreload.js` on your page and it will reload the page when the server detects changes.  To start watching for changes, run `AutoReload.watch('http://localhost:8080')` (or whichever port your server is running on).

## https setup

If your web server requires an https connection, your connect app must either have a valid cert, or you can proxy via Apache or nginx.

Example Apache config using ProxyPass:

    ProxyPass /waitForReload http://localhost:60000/waitForReload

Example nginx config:

    location /waitForReload {
      proxy_pass      http://localhost:60000/waitForReload
    }
