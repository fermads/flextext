var expect = chai.expect;

var $el, text;
$('#text-holder').hide();

function reset() {
  $('.text').remove();
  $('body').append('<div id="text1" class="text"></div>');
  $el = $('.text');
  $el.text($('#text-holder').text());

  text = $el.text();
}

describe('Initialization', function(){

  before(function() {
    reset();
    $('.text').flexText();
  });

  it('.data("flexText") should be equal .text()', function() {
    expect($el.data('flexText')).to.be.equal(text);
  });

  it('should get original text from data attribute', function() {
    $('.text').text(''); // remove text
    $('.text').flexText(); // text should come from dataAttribute
    expect($el.data('flexText')).to.be.equal(text);
  });

  it('text should be cut and have ...', function() {
    expect($el.text()).to.contain($el.data('flexTextConfig').cutText);
  });

  it('should throw if max-height is not defined', function() {
    var mx = $el.css('max-height');
    try {
      $el.css('max-height', 0);
      $('.text').flexText();
    }
    catch(e) {
      expect(e).to.be.an.instanceOf(Error);
    }
    $el.css('max-height', mx);
  });
});

describe('Configuration (default values)', function(){
  before(function() {
    reset();
    $('.text').flexText();
  });

  it('letterSpacing', function() {
    expect($el.css('letterSpacing')).to.be.equal('-0.5px');
  });

  it('fontSize', function() {
    expect(parseInt($el.css('fontSize')), 10).to.be.equal(14);
  });

  it('cutText', function() {
    expect($el.data('flexTextConfig').cutText).to.be.equal('\u2026');
  });

  it('dataAttr', function() {
   expect( $el.data('flexText')).to.be.equal(text);
  });

  it('addTitle', function() {
    expect($el.attr('title')).to.be.equal(text);
    expect($el.data('flexTextConfig').addTitle).to.be.true;
  });

  it('verbose', function() {
   expect( $el.data('flexTextConfig').verbose).to.be.false;
  });

});

describe('Configuration (non-default values)', function(){
  before(function(){
    reset();
    $('.text').flexText({
      letterSpacing:1,
      fontSize: 70,
      cutText:'...',
      dataAttr: 'flexy',
      addTitle: false,
      verbose: true
    });
  });

  it('letterSpacing', function() {
   expect( $el.css('letterSpacing')).to.be.equal('-1px');
  });

  it('fontSize', function() {
    expect(parseInt($el.css('fontSize'), 10)).to.be.equal(11);
  });

  it('cutText', function() {
    expect($el.data('flexTextConfig').cutText).to.be.equal('...');
  });

  it('dataAttr', function() {
   expect( $el.data('flexy')).to.be.equal(text);
  });

  it('addTitle', function() {
    expect($el.attr('title')).to.be.undefined;
   expect( $el.data('flexTextConfig').addTitle).to.be.false;
  });

  it('verbose', function() {
    expect($el.data('flexTextConfig').verbose).to.be.true;
  });
});

describe('Text fit strategy', function(){
  it('Should fit only by reducing letterSpacing '+
      '(no font size change or text cutting)', function() {
    reset();
    $('.text').text($('.text').text().substring(0,70));
    $('.text').flexText({
      letterSpacing:2,
      fontSize: 70,
      cutText:'...',
      dataAttr: 'flexy',
      addTitle: false,
      verbose: true
    });
   expect( $el.text().indexOf('...')).to.be.equal(-1);
   expect( $el.css('fontSize')).to.be.equal('16px');
  });

  it('Should fit only by reducing font size '+
      '(no letter spacing change or text cutting)', function() {
    reset();
    $('.text').text($('.text').text().substring(0,70));
    $('.text').flexText({
      letterSpacing:false,
      fontSize: 70,
      cutText:'...',
      dataAttr: 'flexy',
      addTitle: false,
      verbose: true
    });
   expect( $el.text().indexOf('...')).to.be.equal(-1);
   expect( parseInt($el.css('fontSize'))).to.be.equal(14);
  });

  it('Should fit only by cutting the text '+
      '(no letter spacing or font size changes)', function() {
    reset();
    $('.text').text($('.text').text().substring(0,70));
    $('.text').flexText({
      letterSpacing:false,
      fontSize: false,
      cutText:'...',
      dataAttr: 'flexy',
      addTitle: false,
      verbose: true
    });
   expect( $el.text().indexOf('...')).to.be.not.equal(-1);
  });


});
