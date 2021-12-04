define([
	"skylark-langx-funcs",
  "./arrays",
  "./difference"
],function(funcs,arrays,difference){

    // Return a version of the array that does not contain the specified value(s).
    var without = funcs.restArguments(function(array, otherArrays) {
      return difference(array, otherArrays);
    });

    return arrays.without = without;
});