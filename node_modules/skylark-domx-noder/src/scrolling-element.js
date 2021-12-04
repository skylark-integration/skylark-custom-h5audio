define([
	"./noder"
],function(noder){
	function scrollingElement() {
		return document.scrollingElement || document.documentElement;
	}
	
	return noder.scrollingElement = scrollingElement;
});