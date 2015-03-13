# flexText

jQuery plugin for multi-line `overflow:ellipsis` with the following
strategy to make text fit:

1. make letter spacing smaller by steps of 0.1px (optional)
2. make font size smaller by steps of 2% (optional)
3. cut text and add ellipsis

CSS `overflow:ellipsis` only work for 1 line of text. For multiple lines
-webkit-line-clamp is needed, but it is not supported (as of 02/03/2015)
on non-webkit browsers.

## Instalation

  Download `dist/flextext-[version].min.js` and add it to your html
  after jQuery

## Usage

1. add `max-height` to an element that holds some text

    .selector { max-height: 200px; }

2. call flexText

    $('.selector').flexText([options]);

*[options] object with the following optional properties:*

- **letterSpacing** (value in px | false): how many subpixels can the text
  be crunched to try to fit. Steps of 0.1px. Set to false to disable
- **fontSize** (value in % | false): how far it can resize font to try
  to fit text. Steps of 2%. Set to false to disable
- **cutText** (string | false): used when the text is cut.
  Usually \u2026 (ellipsis) or "..."
- **addTitle** (true | false): also add text to the
  $('.selector').attr('title')
- **verbose** (true | false): console.log everything that is happening

## Default options
```json
{
  "letterSpacing": 0.5,
  "fontSize": 90,
  "cutText": "\u2026",
  "addTitle": true,
  "verbose": false
}
```

## FAQ

##### How to access the original text?
    $('.selector').data('flexText');

##### How to access current config?
    $('.selector').data('flexTextConfig').cutText;

##### Why there is some other css on the selector?
Some CSS is required for flexText to work and will be set automatically
```css
{
  overflow-y: hidden,
  line-height: 1em,
  height: auto,
  padding-top: 0,
  padding-bottom: 2px
}
```