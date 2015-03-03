var should = chai.should();
var expect = chai.expect;

var $el, text;
$('#original, #original2').hide();

function reset() {
  $('#text1').remove();
  $('body').append('<div id="text1" class="text"></div>');
  $el = $('#text1');
  $el.text($('#original').text());

  text = $el.text();
}

describe('Initialization', function(){

  before(function() {
    reset();
    $('#text1').flexText();
  });

  it('.data("flexText") should be equal .text()', function() {
    $el.data('flexText').should.be.equal(text);
  });

  it('should get original text from data attribute', function() {
    $('#text1').text(''); // remove text
    $('#text1').flexText(); // text should come from dataAttribute
    $el.data('flexText').should.be.equal(text);
  });

  it('text should be cut and have ...', function() {
    $el.text().should.contain($el.data('flexTextConfig').cutText);
  });

  it('should throw if max-height is not defined', function() {
    var mx = $el.css('max-height');
    try {
      $el.css('max-height', 0);
      $('#text1').flexText();
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
    $('#text1').flexText();
  });

  it('letterSpacing', function() {
    $el.css('letterSpacing').should.be.equal('-0.5px');
  });

  it('fontSize', function() {
    parseInt($el.css('fontSize'), 10).should.be.equal(12);
  });

  it('cutText', function() {
    $el.data('flexTextConfig').cutText.should.be.equal('\u2026');
  });

  it('dataAttr', function() {
    $el.data('flexText').should.be.equal(text);
  });

  it('addTitle', function() {
    $el.attr('title').should.be.equal(text);
    $el.data('flexTextConfig').addTitle.should.be.true;
  });

  it('verbose', function() {
    $el.data('flexTextConfig').verbose.should.be.false;
  });

});

describe('Configuration (non-default values)', function(){
  before(function(){
    reset();
    $('#text1').flexText({
      letterSpacing:1,
      fontSize: 70,
      cutText:'...',
      dataAttr: 'flexy',
      addTitle: false,
      verbose: false
    });
  });

  it('letterSpacing', function() {
    $el.css('letterSpacing').should.be.equal('-1px');
  });

  it('fontSize', function() {
    parseInt($el.css('fontSize'), 10).should.be.equal(9);
  });

  it('cutText', function() {
    $el.data('flexTextConfig').cutText.should.be.equal('...');
  });

  it('dataAttr', function() {
    $el.data('flexy').should.be.equal(text);
  });

  it('addTitle', function() {
    expect($el.attr('title')).to.be.undefined;
    $el.data('flexTextConfig').addTitle.should.be.false;
  });

  it('verbose', function() {
    $el.data('flexTextConfig').verbose.should.be.false;
  });
});
