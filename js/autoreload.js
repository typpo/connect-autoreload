// Long polling client for live reload
// @author: ian

;function AutoReload(window, $) {
  var xhr;
  this.Watch = function() {
    (function poll() {
      xhr = $.ajax({
        url: '/waitForReload',
        success: function(data) {
          window.location.reload();
        },
        error: function(jqxhr, textstatus, err) {
          if (err === 'timeout' || err === 'Proxy Error') {
            poll();
          } else {
            console.error('Autoreload unrecoverable error:', err);
          }
          xhr = null;
        },
        timeout: 1000*60*10,
        dataType: 'jsonp'
      });
    })();
  }
  this.Stop = function() {
    if (xhr) xhr.abort();
  }
}
window.AutoReload = new AutoReload(window, jQuery);
