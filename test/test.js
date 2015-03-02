var should = chai.should()
var expect = chai.expect

var $el, text

function reset() {
  $('#text1').remove()
  $('body').append('<div id="text1" class="text"></div>')
  $el = $('#text1')
  $el.text($('#original').text())
  text = $el.text()
}

describe('Plugin initialization', function(){

  before(function() {
    reset()
    $('#text1').flexText()
  })

  it('.data("flexText") should be equal .text()', function() {
    $el.data('flexText').should.be.equal(text);

  })
})

describe('Config (default values)', function(){
  before(function() {
    reset()
    $('#text1').flexText()
  })

  it('letterSpacing', function() {
    $el.css('letterSpacing').should.be.equal('-0.5px');
  })

  it('fontSize', function() {
    parseInt($el.css('fontSize'), 10).should.be.equal(12);
  })

  it('cutText', function() {
    $el.data('flexTextConfig').cutText.should.be.equal('\u2026');
  })

  it('dataAttr', function() {
    $el.data('flexText').should.be.equal(text);
  })

  it('addTitle', function() {
    $el.attr('title').should.be.equal(text);
    $el.data('flexTextConfig').addTitle.should.be.true;
  })

  it('verbose', function() {
    $el.data('flexTextConfig').verbose.should.be.false;
  })

})

describe('Config (non-default values)', function(){
  before(function(){
    reset()
    $('#text1').flexText({
      letterSpacing:1,
      fontSize: 70,
      cutText:'...',
      dataAttr: 'flexy',
      addTitle: false,
      verbose: false
    })
  })

  it('letterSpacing', function() {
    $el.css('letterSpacing').should.be.equal('-1px');
  })

  it('fontSize', function() {
    parseInt($el.css('fontSize'), 10).should.be.equal(9);
  })

  it('cutText', function() {
    $el.data('flexTextConfig').cutText.should.be.equal('...');
  })

  it('dataAttr', function() {
    $el.data('flexy').should.be.equal(text);
  })

  it('addTitle', function() {
    //$el.attr('title').should.be.undefined;
    //should.not.exist($el.attr('title'))
    expect($el.attr('title')).to.be.undefined
    $el.data('flexTextConfig').addTitle.should.be.false;
  })

  it('verbose', function() {
    $el.data('flexTextConfig').verbose.should.be.false;
  })
})

