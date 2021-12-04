define([
	"./strings"
],function(strings){
    function rtrim(str) {
        return str.replace(/\s+$/, '');
    }
	
	return strings.rtrim = rtrim;
});