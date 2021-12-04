define([
	"./noder"
],function(noder){
 
    var  rootNodeRE = /^(?:body|html)$/i;
    
    /*   
     *
     * @param {Node} elm
     */
    function offsetParent(elm) {
        var parent = elm.offsetParent || document.body;
        while (parent && !rootNodeRE.test(parent.nodeName) && document.defaultView.getComputedStyle(parent).position == "static") {
            parent = parent.offsetParent;
        }
        return parent;
    }
	
	return noder.offsetParent = offsetParent;
});