define([
	"./noder",
    "./fullscreen"
],function(noder,fullscreen){
 
    function isFullscreen(el) {
        return fullscreen() === el;
    }
	
	return noder.isFullscreen = isFullscreen;
});