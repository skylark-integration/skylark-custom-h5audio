define([
	"./noder",
    "./is-doc"
],function(noder,isDoc){

    /*   
     * Remove the parents of the set of matched elements from the DOM, leaving the matched
     * @param {Node} node
     */
    function unwrap(node) {
        var child, parent = node.parentNode;
        if (parent) {
            if (isDoc(parent.parentNode)) return;
            parent.parentNode.insertBefore(node, parent);
        }
    }

	return noder.unwrap = unwrap;
});