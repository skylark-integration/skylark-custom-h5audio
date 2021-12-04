define([
	"./noder"
],function(noder){
     function isInFrame() {
        try {
            return window.parent !== window.self;
        } catch (x) {
            return true;
        }
    }
	
	return noder.isInFrame = isInFrame;
});