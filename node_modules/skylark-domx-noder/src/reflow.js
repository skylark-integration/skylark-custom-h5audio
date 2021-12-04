define([
	"./noder"
],function(noder){
 
    function reflow(elm) {
        if (!elm) {
          elm = document;
        }
        elm.offsetHeight;

        return this;      
    }
	
	return noder.reflow = reflow;
});