define([
  "./arrays"
],function(arrays){
   var _filter = Array.prototype.filter;
 
    function filter(array,func) {
      return _filter.call(array,func);
    }

    return arrays.filter = filter;
	
});