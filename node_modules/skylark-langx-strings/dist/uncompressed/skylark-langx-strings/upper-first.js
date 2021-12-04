define([
	"./strings"
],function(strings){

    function upperFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
	
	return strings.upperFirst = upperFirst;
});