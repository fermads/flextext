/* global jQuery */
(function($) {

	function init(e) {
		console.log(e)
		if(!fit(e))
			letterSpacing(e)
		else
			console.log('text ok')
	}

	function letterSpacing(e) {
		var fitted = false
		var le = e.style.letterSpacing || 0
		
		for (var px = -0.1; px >= -0.5; px -= 0.1) {
			e.style.letterSpacing = '-'+ (le - px) +'px'
			console.log(e.style.letterSpacing)
			if(fit(e)) {
				fitted = true
				break
			}
		}

		if(!fitted)
			fontSize(e)
	}

	function fontSize(e) {
		var fitted = false
		for (var p = 99; p >= 90; p--) {
			e.style.fontSize = p +'%'
			console.log(e.style.fontSize)
			if(fit(e)) {
				fitted = true
				break
			}
		}

		if(!fitted)
			cutText(e)
	}

	function cutText(e) { // &#133;
		var fitted = false
		var tl = e.innerText.length
		for (var t = tl; t > 0; t--) {
			var text = e.innerText
			console.log(text.length)
			e.innerText = text.substr(0, text.length-2)

			if(fit(e)) {
				e.innerText = e.innerText.substring(0, text.length-5) +'...'
				fitted = true
				break
			}
		}
		console.log('CUT!')
	}

	function fit(e) {
		//console.log(e.scrollHeight, $(e).height(), e.offsetHeight)
		return (e.scrollHeight > $(e).height()) ? false : true
	}

    $.fn.ninjatext = function(){
		return this.each(function(){
			init(this)
		})
    }

})(jQuery)