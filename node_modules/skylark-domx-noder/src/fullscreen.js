define([
    "skylark-domx-browser",
	"./noder"
],function(browser,noder){

    var fulledEl = null;

    function fullscreen(el) {
        if (el === false) {
            return browser.exitFullscreen.apply(document);
        } else if (el) {
            return el[browser.support.fullscreen.requestFullscreen]();
            fulledEl = el;
        } else {
            return (
                document.fullscreenElement ||
                document.webkitFullscreenElement ||
                document.mozFullScreenElement ||
                document.msFullscreenElement
            )
        }
    }
	
	return noder.fullscreen = fullscreen;
});