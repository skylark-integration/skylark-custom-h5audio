define([
	"./strings"
],function(strings){

    var idCounter = 0;
    function uniqueId (prefix) {
        var id = ++idCounter + '';
        return prefix ? prefix + id : id;
    }

	return strings.uniqueId = uniqueId;
});