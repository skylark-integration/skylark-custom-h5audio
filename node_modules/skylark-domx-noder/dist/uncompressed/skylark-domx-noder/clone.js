define([
	"./noder"
],function(noder){
 
    /*   
     * Create a deep copy of the set of matched elements.
     * @param {HTMLElement} node
     * @param {Boolean} deep
     */
    function clone(node, deep) {
        return node.cloneNode(deep);
    }

	
	return noder.clone = clone;
});