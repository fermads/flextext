(function($) {
  'use strict';

  var fitted, config;

  function init($el, options) {
    fitted = false;

    config = $.extend({
      letterSpacing: 0.5,
      fontSize: 90,
      cutText: '\u2026',
      dataAttr: 'flexText',
      addTitle: true,
      verbose: false
    }, options);

    prepare($el);
    run($el);
  }

  function prepare($el) {
    var css = {
      'overflow-y': 'hidden',
      'line-height': '1em',
      'height': 'auto',
      'padding-top' :0,
      'padding-bottom' :'2px'
    };

    if(!parseInt($el.css('max-height'), 10))
      throw Error('max-height should be defined');

    $el.css(css);

    log('styles added to flexText element: ', JSON.stringify(css));
  }

  function run($el) {
    var text = $el.data(config.dataAttr);

    if(text)
      $el.text(text);
    else
      $el.data(config.dataAttr, $el.text());

    $el.data('flexTextConfig', config);

    for (var method in config) {
      if(config[method] !== false && fitted === false) {
        var value = config[method];
        if(method == 'letterSpacing')
          letterSpacing($el, value);
        else if(method == 'fontSize')
          fontSize($el, value);
        else if(method == 'cutText')
          cutText($el, value);
      }
    }
  }

  function log(msg) {
    if(config.verbose && window.console)
      console.log('[flexText]', msg);
  }

  function letterSpacing($el, v) {
    var le = $el.css('letterSpacing') || 0;
    var value = v || 0.5, tmp;

    for (var px = -0.1; px >= -value; px -= 0.1) {
      if(fit($el))
        return (fitted = true);

      tmp = (le - px).toFixed(1);
      $el.css('letterSpacing', '-'+ tmp +'px');
      log('changing letterSpacing to -'+ tmp +'px');
    }
  }

  function fontSize($el, v) {
    var value = v || 90;

    for (var p = 99; p >= value; p-=2) {
      if(fit($el))
        return (fitted = true);

      $el.css('fontSize', p +'%');
      log('changing fontSize to '+ p +'%');
    }
  }

  function cutText($el, value) {
    var text = $el.data(config.dataAttr), cut;

    if(config.addTitle)
      $el.attr('title', text);

    for (var t = text.length; t > 0; t--) {
      if(fit($el))
        return (fitted = true);

      text = $el.text();
      cut = text.length - (2 + value.length);
      $el.text($.trim(text.substr(0, cut)) + value);
      log('cutting text to '+ cut +' chars');
    }
  }

  function fit($el) {
    var sc = $el.get(0).scrollHeight,
      fs = parseInt($el.css('fontSize')),
      diff = sc % fs;

    return ($el.get(0).scrollHeight > $el.height() + diff) ? false : true;
  }

  $.fn.flexText = function(options){
    return this.each(function(){
      init($(this), options);
    });
  };

})(jQuery);