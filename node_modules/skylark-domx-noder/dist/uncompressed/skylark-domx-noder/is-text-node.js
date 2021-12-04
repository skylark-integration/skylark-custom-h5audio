define([
	"./noder"
],function(noder){
 
    function isTextNode(node) {
        return node && node.nodeType === 3;
    }

	
	return noder.isTextNode = isTextNode;
});