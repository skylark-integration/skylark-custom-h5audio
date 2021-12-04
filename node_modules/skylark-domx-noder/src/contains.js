define([
	"./noder",
    "./is-child-of"
],function(noder,isChildOf){
 
    /*   
     * Check to see if a dom node is a descendant of another dom node .
     * @param {String} node
     * @param {Node} child
     */
    function contains(node, child) {
        return isChildOf(child, node);
    }
	
	return noder.contains = contains;
});