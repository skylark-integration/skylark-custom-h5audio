define([
	"./strings"
],function(strings){
    function lowerFirst(str) {
        return str.charAt(0).toLowerCase() + str.slice(1);
    }
	
	return strings.lowerFirst = lowerFirst;
});