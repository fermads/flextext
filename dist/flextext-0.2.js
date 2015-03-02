(function($) {
  'use strict';

  var
    fitted,
    verbose;

  function init(e, options, verb) {
    var
      method,
      value;

    verbose = verb || false;
    fitted  = false;

    // Guardando o texto original no 'title' do elemento
    if (!e.title) {
      e.title = e.textContent;

    // Recolocando o texto original de volta no elemento
    } else {
      e.textContent = e.title;
    }

    for (method in options) {
      if(options[method] !== false && fit(e) === false) {
        value = options[method];

        cutText(e, value);
      }
    }
  }

  function log(msg) {
    if(verbose) {
      console.log(msg);
    }
  }

  function cutText(e, value) { // &#133;
    var
      tl        = e.textContent.length,
      cutLength = 2,
      text,
      t;

    for (t = tl; t > 0; t--) {
      text = e.textContent;

      e.textContent = $.trim(text.substr(0, text.length - (cutLength + value.length))) + value;
      log('cutting text to '+ (text.length - cutLength) +' chars');

      if(fit(e)) {
        fitted = true;
        break;
      }
    }
  }

  function fit(e) {
    var
      $el    = $(e),
      height = $el.height() + (Math.ceil(parseInt($el.css('line-height'), 10)) / 10);

    return (e.scrollHeight > height) ? false : true;
  }

  $.fn.flexText = function(options, verb) {
    var
      config = $.extend({
        cutText: '\u2026'
      }, options);

    return this.each(function() {
      init(this, config, verb);
    });
  };

})(Backbone.$);

