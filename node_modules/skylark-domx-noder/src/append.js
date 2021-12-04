define([
    "./noder",
    "./_enhance_place_content",
    "./_ensure_nodes"
],function(noder,enhancePlaceContent,ensureNodes){
 
    function append(node, placing, copyByClone) {
        placing = enhancePlaceContent(placing,node);
        var parentNode = node,
            nodes = ensureNodes(placing, copyByClone);
        for (var i = 0; i < nodes.length; i++) {
            parentNode.appendChild(nodes[i]);
        }
        return this;
    }
    
    return noder.append = append;
});