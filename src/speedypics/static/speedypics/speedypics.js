/**
 * TODO:
 *
 *  - Transitions
 *
 */
!(function(document, window, exportName) {

  function loadXMLDoc(url, options) {
    var xmlhttp;
    var defaults = {
      method: 'GET',
      success: function() {},
      failure: function() {},
      complete: function() {}
    };

    // Update the options with any that are missing
    for (var key in defaults) {
      if (!options.hasOwnProperty(key)) {
        options[key] = defaults[key];
      }
    }

    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == xmlhttp.DONE) {
        if(xmlhttp.status >= 200 && xmlhttp.status < 300) {
          options.success(xmlhttp);
        }  else {
          options.failure(xmlhttp);
        }
        options.complete(xmlhttp);
      }
    }

    xmlhttp.open(options.method, url, true);
    xmlhttp.send();
  };

  /**
   * Intantiate a speedypic object
   * @param {[type]} element [description]
   */
  function Speedypic(element, options) {
    this.element = element;
    this.options = options;

    if (this.options.autoLoad) {
      this.load();
    }

    return this;
  };

  /**
   * Fetch an image and replace the background
   */
  Speedypic.prototype.load = function() {
    var _this = this;
    var src = this.element.dataset.src;

    loadXMLDoc(
      src,
      {
        success: function() {
          // As we've finished loading this URL the image will be in
          // cache, sneakily update the src to use it
          _this.element.src = src;
        },
        failure: function() {
          console.log(a);
        }
      }
    );
  };

  window[exportName] = Speedypic
})(document, window, 'Speedypic');
