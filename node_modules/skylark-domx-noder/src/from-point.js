define([
	"./noder"
],function(noder){

    function fromPoint(x,y) {
        return document.elementFromPoint(x,y);
    }

	
	return noder.fromPoint = fromPoint;
});