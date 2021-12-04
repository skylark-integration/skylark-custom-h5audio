define([
	"./noder"
],function(noder){
    function isActive (elem) {
            return elem === document.activeElement && (elem.type || elem.href);
    }

	
	return noder.isActive = isActive;
});