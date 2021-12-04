define([
	"./noder"
],function(noder){
    /*   
     * Check to see if a dom node is in the document
     * @param {Node} node
     */
    function isInDocument(node) {
      return (node === document.body) ? true : document.body.contains(node);
    }     

	
	return noder.isInDocument = isInDocument;
});