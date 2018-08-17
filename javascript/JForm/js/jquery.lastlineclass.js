/*!
* jquery.lastlineclass.js 0.1
*
* Copyright 2016, Caitriona Dwyer http://www.caitriona.net
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Date: Wed Dec 21 12:52:12 GMTST 2016
*/

;(function ( $, window, document, undefined ) {
	$.fn.lastlineclass = function(options) {
	
		// Setup options
		var settings = $.extend({
			'class' : 'last-line-class',
			'wordWrap' : 'span',
			'lastLineWrap' : 'div'
		}, options);
		
		var textblocks = this;
		init();

		// prepare the text content by wrapping each word in the specified tag
		// only need to do once - i.e. not again on window resize
		function init() {
			
			textblocks.each(function() {
				var content = $(this).html();
				content = content.replace(/(\S+)/g, '<'+settings.wordWrap+'>$1</'+settings.wordWrap+'>');
				$(this).html(content);
			});
			
			wrapLastLine();
		}
		
		
		//add the last line wrapper with the specified class to the last line of text
		function wrapLastLine() {
			
			textblocks.each(function() {			
				
				var words = $(this).find(settings.wordWrap); // 'find' not 'children' because there might be a wrapper tag around the last line (if this is not our first render)
				var lastword = words.last();
				var lowestTop = lastword[0].offsetTop;

				// Check each word for its offsetTop to find all the words in the bottom line
				words.each(function(index, word) {
					
					//start fresh - incase resizing
					$(this).unwrap('.'+settings.class);
					$(this).removeClass('last-line-item');
					
					//if it's in the bottom line
					if ($(this)[0].offsetTop == lowestTop) {
						$(this).addClass('last-line-item');
					}
				});
				
				
				// wrap all items identified as being in the last line
				$(this).children('.last-line-item').wrapAll('<'+settings.lastLineWrap+' class="'+settings.class+'">');
				
				//reinsert spaces removed by wrapAll
				var regexp = new RegExp(settings.wordWrap+'><'+settings.wordWrap,"g");
				$(this).html($(this).html().replace(regexp, settings.wordWrap+'> <'+settings.wordWrap));
				
				// Call on resize
				window.addEventListener("resize", wrapLastLine);

			});
				
		}

	}
})( jQuery, window, document );