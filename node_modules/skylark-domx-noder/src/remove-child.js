define([
    "skylark-langx-types",
	"./noder"
],function(types,noder){
 

    function removeChild(node,children) {
        if (!types.isArrayLike(children)) {
            children = [children];
        }
        for (var i=0;i<children.length;i++) {
            node.removeChild(children[i]);
        }

        return this;
    }

	
	return noder.removeChild = removeChild;
});