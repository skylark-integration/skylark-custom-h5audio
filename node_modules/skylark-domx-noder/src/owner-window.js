define([
	"./noder",
    "./owner-doc"
],function(noder,ownerDoc){
 
    /*   
     *
     * @param {Node} elm
     */
    function ownerWindow(elm) {
        var doc = ownerDoc(elm);
        return doc.defaultView || doc.parentWindow;
    }

	return noder.ownerWindow = ownerWindow;
});