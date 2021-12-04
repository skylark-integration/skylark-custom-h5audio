define([
  "./arrays"
],function(arrays){

    function forEach (arr, fn) {
      if (arr.forEach) return arr.forEach(fn)
      for (var i = 0; i < arr.length; i++) fn(arr[i], i);
    }

	return arrays.forEach = forEach;
});