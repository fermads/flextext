/* TO-DO: should have a way to recalc the size with the original text */
(function($) {
  'use strict';

  var fitted, config;

  function init(e, options) {
    fitted = false;

    config = $.extend({
      letterSpacing: 0.5,
      fontSize: 90,
      cutText: '\u2026',
      dataAttr: 'flexText',
      addTitle: true,
      verbose: false
    }, options);

    run(e, config);
  }

  function run(e) {
    var text = e.data(config.dataAttr);

    if(text)
      e.text(text);
    else
      e.data(config.dataAttr, e.text());

    for (var method in config) {
      if(config[method] !== false && fitted === false) {
        var value = config[method];
        if(method == 'letterSpacing')
          letterSpacing(e, value);
        else if(method == 'fontSize')
          fontSize(e, value);
        else if(method == 'cutText')
          cutText(e, value);
      }
    }
  }

  function log(msg) {
    if(config.verbose)
      console.log(msg);
  }

  function letterSpacing(e, v) {
    var le = e.css('letterSpacing') || 0;
    var value = v || 0.5, tmp;

    for (var px = -0.1; px >= -value; px -= 0.1) {
      if(fit(e))
        return (fitted = true);

      tmp = (le - px).toFixed(1)
      e.css('letterSpacing', '-'+ tmp +'px');
      log('changing letterSpacing to -'+ tmp +'px');
    }
  }

  function fontSize(e, v) {
    var value = v || 90;

    for (var p = 99; p >= value; p-=2) {
      if(fit(e))
        return (fitted = true);

      e.css('fontSize', p +'%');
      log('changing fontSize to '+ p +'%');
    }
  }

  function cutText(e, value) {
    var text = e.data(config.dataAttr), cut;

    if(config.addTitle)
      e.attr('title', text);

    for (var t = text.length; t > 0; t--) {
      if(fit(e))
        return (fitted = true);

      text = e.text();
      cut = text.length - (2 + value.length);
      e.text($.trim(text.substr(0, cut)) + value);
      log('cutting text to '+ cut +' chars');
    }
  }

  function fit(e) {
    var height = e.height()
        + (Math.ceil(parseInt(e.css('line-height'), 10)) / 10);

    return (e.get(0).scrollHeight > height) ? false : true;
  }

  $.fn.flexText = function(options){
    return this.each(function(){
      init($(this), options);
    });
  };

})(jQuery);