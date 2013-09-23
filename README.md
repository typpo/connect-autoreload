A server that watches files for changes and notifies long-polling clients.

## Basic setup

Edit config.js and decide which directories you want to watch.

Let's say your project file structure is:

    js/
      vendor/
      foo/
    sass/
      compiled/
    templates/
    README

Your `watch_dirs` setting may be "js sass/compiled templates".

You can set a regex to ignore certain files or directories.  By default, it ignores changes in vim swap files.

Install dependencies with `npm install`.

Start the node app from your project's root directory.  `./start.sh` is a shorthand for this if you use git.  Then run AutoReload.watch('http://localhost:60000').

## https setup

You either need to add a valid cert to your node app, or proxy via Apache or nginx.

Example Apache config using ProxyPass:

    ProxyPass /waitForReload http://localhost:60000/waitForReload

Example nginx config:

    location /waitForReload {
      proxy_pass      http://localhost:60000/waitForReload
    }
