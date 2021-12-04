define([
	"./noder"
],function(noder){
 
    function isElement(node) {
        return node && node.nodeType === 1;
    }

	
	return noder.isElement = isElement;
});