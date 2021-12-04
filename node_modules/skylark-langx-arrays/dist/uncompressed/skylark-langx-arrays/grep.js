define([
  "skylark-langx-objects",
  "./arrays"
],function(objects,arrays){
    function grep(array, callback) {
        var out = [];

        objects.each(array, function(i, item) {
            if (callback(item, i)) {
                out.push(item);
            }
        });

        return out;
    }

    return arrays.grep = grep;
});