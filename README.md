connect-autoreload
-----------------

connect-autoreload supports a basic javascript client that reloads the page whenever files are changed.  This is useful if you're a frontend developer and you're sick of manually refreshing the page to reflect your changes.

## Installation

`npm install connect-autoreload`, or add connected-autoreload to your package.json.

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

`<script src="http://localhost:60000/autoreload.js"></script>` or include `js/autoreload.js` on your page.

To start reloading the page when changes happen, call `AutoReload.watch('http://localhost:8080')` (change the port to whichever the autocomplete server is running on).

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


## MIT License

```
Copyright (c) 2013 Ian Webster/Room 77, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
