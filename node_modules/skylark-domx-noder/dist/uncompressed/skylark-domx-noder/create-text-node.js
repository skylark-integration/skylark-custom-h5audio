define([
	"./noder"
],function(noder){
 
    /*   
     * Create a new Text node.
     * @param {String} text
     * @param {Node} child
     */
    function createTextNode(text) {
        return document.createTextNode(text);
    }


	return noder.createTextNode = createTextNode;
});