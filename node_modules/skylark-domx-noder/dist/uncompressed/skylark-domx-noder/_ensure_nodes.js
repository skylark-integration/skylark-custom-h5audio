define([
    "skylark-langx-arrays",
	"./noder",
    "./_normalize_content"
],function(arrays,noder,normalizeContent){
    var  
        map = Array.prototype.map;

    function ensureNodes(content, copyByClone) {
        var nodes = normalizeContent(content);


        //if (!types.isArrayLike(nodes)) {
        //    nodes = [nodes];
        //}
        if (copyByClone) {
            nodes = map.call(nodes, function(node) {
                return node.cloneNode(true);
            });
        }
        return arrays.flatten(nodes);
    }

	return ensureNodes;
});