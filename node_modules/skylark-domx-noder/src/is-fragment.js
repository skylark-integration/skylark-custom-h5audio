define([
	"./noder"
],function(noder){
 
    function isFragment(node) {
        return node && node.nodeType === 11;
    }

	return noder.isFragment = isFragment;
});