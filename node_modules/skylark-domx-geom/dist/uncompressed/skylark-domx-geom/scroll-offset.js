define([
    "skylark-langx",
    "skylark-domx-noder",
    "./geom"
],function(langx,styler,geom) {

	/**
	 * Returns the scroll offset of the given element, added with all the scroll offsets of parent elements.
	 * The value is returned in real pixels.
	 * @param  {HTMLElement} el
	 * @return {Array}             Offsets in the format of [left, top]
	 */
	function scrollOffset(el) {
		var offsetLeft = 0,
			offsetTop = 0,
			winScroller = noder.scrollingElement();

		if (el) {
			do {
				/*
				var matrix = transforms.matrix(el),
					scaleX = matrix.a,
					scaleY = matrix.d;

				offsetLeft += el.scrollLeft * scaleX;
				offsetTop += el.scrollTop * scaleY;
				*/
				offsetLeft += el.scrollLeft;
				offsetTop += el.scrollTop;
			} while (el !== winScroller && (el = el.parentNode));
		}

		return {
			offsetLeft, 
			offsetTop
		};
	}	

	return geom.scrollOffset = scrollOffset;
});