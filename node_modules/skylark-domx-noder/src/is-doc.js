define([
	"./noder"
],function(noder){
    /*   
     * Check to see if a dom node is a document.
     * @param {Node} node
     */
    function isDocument(node) {
        return node != null && node.nodeType == node.DOCUMENT_NODE
    }

	
	return noder.isDoc = isDocument;
});