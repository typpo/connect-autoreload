connect-autoreload
-----------------

connect-autoreload supports a basic javascript client that reloads the page whenever files are changed.  This is useful if you're a frontend developer and you're sick of manually refreshing the page to reflect your changes.

## Setup

See the standalone app in `example/`.  Edit the config, start the server (`node path/to/app.js`), drop in the js, and you're good to go.

### Adding autoreload to an existing server

If you already have an express app, it's easy to add autoreload middleware:

    var autoreload = require('connect-autoreload')
    
    var config = {
      watch_dirs: 'js html css/compiled thirdparty/frontend',
      ignore_regex: /\.sw[poax]$/,
    };
    
    app.use(autoreload(config));

This will set up the default endpoint, `waitForReload/`.

It's recommend to start the node app from your project's root directory.  That way, `watch_dirs` will correctly work with relative paths.  `examples/start.sh` is a shorthand for this if you use git.

### Including the Javascript client

Include `js/autoreload.js` on your page.  To start listening and reload the page when changes happen, call `AutoReload.watch('http://localhost:8080')` (change the port to whichever the autocomplete server is running on).

You can call `AutoReload.stop()` at any point to cancel the refresh-on-change behavior.

## https setup

If your web server requires an https connection, your connect app must have a valid cert or your browser will choke.

If you are running a separate web server, it might be annoying to set up the dummy autoreload node app with your cert.  Instead, you can proxy via Apache or nginx -

Example Apache config using ProxyPass:

    ProxyPass /waitForReload http://localhost:60000/waitForReload

Example nginx config:

    location /waitForReload {
      proxy_pass      http://localhost:60000/waitForReload
    }
