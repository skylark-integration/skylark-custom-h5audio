define([
    "skylark-langx-types",
	"./noder"
],function(types,noder){
 
    /*   
     * Create a element and set attributes on it.
     * @param {HTMLElement} tag
     * @param {attrs} attrs
     * @param } parent
     */
    function createElement(tag, props,attrs, parent) {
        var node;

        if (/svg/i.test(tag)) {
            node = document.createElementNS("http://www.w3.org/2000/svg", tag)
        } else {
            node = document.createElement(tag);
        }

        if (types.isHtmlNode(props)) {
            parent = props;
            props = null;
            attrs = null;
        } else if (types.isHtmlNode(attrs)){
            parent = attrs;
            attrs = null;
        }

        if (props) {
            for (var name in props) {
                node[name] = props[name];
            }
        }

        if (attrs) {
            for (var name in attrs) {
                node.setAttribute(name, attrs[name]);
            }
        }
        if (parent) {
            noder.append(parent, node);
        }
        return node;
    }

	
	return noder.createElement = createElement;
});