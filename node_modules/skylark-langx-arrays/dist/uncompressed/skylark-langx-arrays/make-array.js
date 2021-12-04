define([
	"skylark-langx-types",
 	"./arrays"
],function(types,arrays){
    function makeArray(obj, offset, startWith) {
       if (types.isArrayLike(obj) ) {
        return (startWith || []).concat(Array.prototype.slice.call(obj, offset || 0));
      }

      // array of single index
      return [ obj ];             
    }

	return arrays.makeArray = makeArray;	
});