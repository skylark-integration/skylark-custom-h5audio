define([
	"./noder"
],function(noder){
 
    /*   
     * Get the current document object.
     */
    function doc() {
        return document;
    }

	return noder.doc = doc;
});