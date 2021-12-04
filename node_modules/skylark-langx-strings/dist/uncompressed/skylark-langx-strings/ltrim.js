define([
	"./strings"
],function(strings){

    function ltrim(str) {
        return str.replace(/^\s+/, '');
    }
	
	return strings.ltrim = ltrim;
});