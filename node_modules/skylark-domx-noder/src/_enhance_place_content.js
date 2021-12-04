define([
    "skylark-langx-types",
    "skylark-langx-arrays",
	"./noder"
],function(types,arrays,noder){
    function enhancePlaceContent(placing,node) {
        if (types.isFunction(placing)) {
            return placing.apply(node,[]);
        }
        if (types.isArrayLike(placing)) {
            var neddsFlattern;
            for (var i=0;i<placing.length;i++) {
                if (types.isFunction(placing[i])) {
                    placing[i] = placing[i].apply(node,[]);
                    if (types.isArrayLike(placing[i])) {
                        neddsFlattern = true;
                    }
                }
            }
            if (neddsFlattern) {
                placing = arrays.flatten(placing);
            }
        }
        return placing;
    }

	return enhancePlaceContent;
});