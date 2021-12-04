define([
  "./arrays"
],function(arrays){

    function indexOf(array,item) {
      return array.indexOf(item);
    }

    return arrays.indexOf = indexOf;
});