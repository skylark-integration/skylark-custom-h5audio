define([
	"./noder"
],function(noder){
	function body() {
		return  document.body;
	}
	
	return noder.body = body;
});