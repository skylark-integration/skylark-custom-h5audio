define([
	"./noder"
],function(noder){
	function root() {
		return  document.documentElement;
	}
	
	return noder.root = root;
});