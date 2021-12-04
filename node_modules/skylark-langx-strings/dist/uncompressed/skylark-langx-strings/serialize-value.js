define([
	"./strings"
],function(strings){
    function serializeValue(value) {
        return JSON.stringify(value)
    }
	
	return strings.serializeValue = serializeValue;
});