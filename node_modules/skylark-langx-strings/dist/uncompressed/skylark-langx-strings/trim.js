define([
	"./strings"
],function(strings){
    function trim(str) {
        return str == null ? "" : String.prototype.trim.call(str);
    }
	
	return strings.trim = trim;
});