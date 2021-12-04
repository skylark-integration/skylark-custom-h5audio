define([
	"./strings"
],function(strings){
    function camelCase(str) {
        return str.replace(/-([\da-z])/g, function(a) {
            return a.toUpperCase().replace('-', '');
        });
    }

	
	return strings.camelCase = camelCase;
});