define([
	"./noder"
],function(noder){
 
    function nodeName(elm, chkName) {
        var name = elm.nodeName && elm.nodeName.toLowerCase();
        if (chkName !== undefined) {
            return name === chkName.toLowerCase();
        }
        return name;
    };
	
	return noder.nodeName = nodeName;
});