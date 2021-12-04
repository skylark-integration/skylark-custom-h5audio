define([
    "./noder",
    "./_enhance_place_content",
    "./_ensure_nodes"
],function(noder,enhancePlaceContent,ensureNodes){
 

    function before(node, placing, copyByClone) {
        placing = enhancePlaceContent(placing,node);
        var refNode = node,
            parent = refNode.parentNode;
        if (parent) {
            var nodes = ensureNodes(placing, copyByClone);
            for (var i = 0; i < nodes.length; i++) {
                parent.insertBefore(nodes[i], refNode);
            }
        }
        return this;
    }

	
	return noder.before = before;
});