define([
  "./arrays",
  "./filter"
],function(arrays,filter){

    function uniq(array) {
        return filter(array, function(item, idx) {
            return array.indexOf(item) == idx;
        })
    }
	
	return arrays.uniq = uniq;
});