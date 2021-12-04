define([
    "skylark-langx-types",
	"./noder",
    "./is-element",
    "./is-text-node",
    "./is-fragment"
],function(types,noder,isElement,isTextNode,isFragment){
    var  
        map = Array.prototype.map;
        
    function normalizeContent(content) {
        if (typeof content === 'function') {
            content = content();
        }
        return map.call(types.isArrayLike(content) ? content : [content],value => {
            if (typeof value === 'function') {
                value = value();
            }
            if (isElement(value) || isTextNode(value) || isFragment(value)) {
                return value;
            }
            if (typeof value === 'string' && /\S/.test(value)) {
                return document.createTextNode(value);
            }
        }).filter(value => value);
    }

	return normalizeContent;
});