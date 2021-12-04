define([
	"./noder",
    "./node-name"
],function(noder,nodeName){
 
    /*   
     * Get the children of the specified node, including text and comment nodes.
     * @param {HTMLElement} elm
     */
    function contents(elm) {
        if (nodeName(elm, "iframe")) {
            return elm.contentDocument;
        }
        return elm.childNodes;
    }
	
	return noder.contents = contents;
});