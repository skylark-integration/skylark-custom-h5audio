/**
 * skylark-domx-noder - The skylark html node library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
(function(factory,globals) {
  var define = globals.define,
      require = globals.require,
      isAmd = (typeof define === 'function' && define.amd),
      isCmd = (!isAmd && typeof exports !== 'undefined');

  if (!isAmd && !define) {
    var map = {};
    function absolute(relative, base) {
        if (relative[0]!==".") {
          return relative;
        }
        var stack = base.split("/"),
            parts = relative.split("/");
        stack.pop(); 
        for (var i=0; i<parts.length; i++) {
            if (parts[i] == ".")
                continue;
            if (parts[i] == "..")
                stack.pop();
            else
                stack.push(parts[i]);
        }
        return stack.join("/");
    }
    define = globals.define = function(id, deps, factory) {
        if (typeof factory == 'function') {
            map[id] = {
                factory: factory,
                deps: deps.map(function(dep){
                  return absolute(dep,id);
                }),
                resolved: false,
                exports: null
            };
            require(id);
        } else {
            map[id] = {
                factory : null,
                resolved : true,
                exports : factory
            };
        }
    };
    require = globals.require = function(id) {
        if (!map.hasOwnProperty(id)) {
            throw new Error('Module ' + id + ' has not been defined');
        }
        var module = map[id];
        if (!module.resolved) {
            var args = [];

            module.deps.forEach(function(dep){
                args.push(require(dep));
            })

            module.exports = module.factory.apply(globals, args) || null;
            module.resolved = true;
        }
        return module.exports;
    };
  }
  
  if (!define) {
     throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");
  }

  factory(define,require);

  if (!isAmd) {
    var skylarkjs = require("skylark-langx-ns");

    if (isCmd) {
      module.exports = skylarkjs;
    } else {
      globals.skylarkjs  = skylarkjs;
    }
  }

})(function(define,require) {

define('skylark-domx-noder/noder',[
    "skylark-langx-ns",
    "skylark-langx-types",
    "skylark-langx-arrays",
    "skylark-langx-strings",
    "skylark-langx-scripter",
    "skylark-domx-browser"
], function(skylark, types, arrays, strings,scripter,browser) {
    var  
        map = Array.prototype.map,
        slice = Array.prototype.slice;


    /**
     * Generate id
     * @param   {HTMLElement} el
     * @returns {String}
     * @private
     */
    function generateId(el) {
        var str = el.tagName + el.className + el.src + el.href + el.textContent,
            i = str.length,
            sum = 0;

        while (i--) {
            sum += str.charCodeAt(i);
        }

        return sum.toString(36);
    }


    function noder() {
        return noder;
    }

    Object.assign(noder, {


        blur : function(el) {
            el.blur();
        },


        generateId
    });

    return skylark.attach("domx.noder" , noder);
});
define('skylark-domx-noder/active',[
	"./noder"
],function(noder){

    function activeElement(doc) {
        doc = doc || document;
        var el;

        // Support: IE 9 only
        // IE9 throws an "Unspecified error" accessing document.activeElement from an <iframe>
        try {
            el = doc.activeElement;
        } catch ( error ) {
            el = doc.body;
        }

        // Support: IE 9 - 11 only
        // IE may return null instead of an element
        // Interestingly, this only seems to occur when NOT in an iframe
        if ( !el ) {
            el = doc.body;
        }

        // Support: IE 11 only
        // IE11 returns a seemingly empty object in some cases when accessing
        // document.activeElement from an <iframe>
        if ( !el.nodeName ) {
            el = doc.body;
        }

        return el;
    };
	return noder.active = activeElement;
});
define('skylark-domx-noder/_enhance_place_content',[
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
define('skylark-domx-noder/is-element',[
	"./noder"
],function(noder){
 
    function isElement(node) {
        return node && node.nodeType === 1;
    }

	
	return noder.isElement = isElement;
});
define('skylark-domx-noder/is-text-node',[
	"./noder"
],function(noder){
 
    function isTextNode(node) {
        return node && node.nodeType === 3;
    }

	
	return noder.isTextNode = isTextNode;
});
define('skylark-domx-noder/is-fragment',[
	"./noder"
],function(noder){
 
    function isFragment(node) {
        return node && node.nodeType === 11;
    }

	return noder.isFragment = isFragment;
});
define('skylark-domx-noder/_normalize_content',[
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
define('skylark-domx-noder/_ensure_nodes',[
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
define('skylark-domx-noder/after',[
	"./noder",
    "./_enhance_place_content",
    "./_ensure_nodes"
],function(noder,enhancePlaceContent,ensureNodes){
 
    function after(node, placing, copyByClone) {
        placing = enhancePlaceContent(placing,node);
        var refNode = node,
            parent = refNode.parentNode;
        if (parent) {
            var nodes = ensureNodes(placing, copyByClone),
                refNode = refNode.nextSibling;

            for (var i = 0; i < nodes.length; i++) {
                if (refNode) {
                    parent.insertBefore(nodes[i], refNode);
                } else {
                    parent.appendChild(nodes[i]);
                }
            }
        }
        return this;
    }

	
	return noder.after = after;
});
define('skylark-domx-noder/append',[
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
define('skylark-domx-noder/before',[
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
define('skylark-domx-noder/body',[
	"./noder"
],function(noder){
	function body() {
		return  document.body;
	}
	
	return noder.body = body;
});
define('skylark-domx-noder/clone',[
	"./noder"
],function(noder){
 
    /*   
     * Create a deep copy of the set of matched elements.
     * @param {HTMLElement} node
     * @param {Boolean} deep
     */
    function clone(node, deep) {
        return node.cloneNode(deep);
    }

	
	return noder.clone = clone;
});
define('skylark-domx-noder/is-child-of',[
	"./noder"
],function(noder){
    /*   
     * Check to see if a dom node is a descendant of another dom node.
     * @param {Node} node
     * @param {Node} parent
     * @param {Node} directly
     */
    function isChildOf(node, parent, directly) {
        if (directly) {
            return node.parentNode === parent;
        }
        if (document.documentElement.contains) {
            return parent.contains(node);
        }
        while (node) {
            if (parent === node) {
                return true;
            }

            node = node.parentNode;
        }

        return false;
    }
	
	return noder.isChildOf = isChildOf;
});
define('skylark-domx-noder/contains',[
	"./noder",
    "./is-child-of"
],function(noder,isChildOf){
 
    /*   
     * Check to see if a dom node is a descendant of another dom node .
     * @param {String} node
     * @param {Node} child
     */
    function contains(node, child) {
        return isChildOf(child, node);
    }
	
	return noder.contains = contains;
});
define('skylark-domx-noder/create-element',[
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
define('skylark-domx-noder/create-fragment',[
    "skylark-langx-strings",
	"./noder",
    "./create-element"
],function(strings,noder,createElement){
    var fragmentRE = /^\s*<(\w+|!)[^>]*>/,
        singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        div = document.createElement("div"),
        table = document.createElement('table'),
        tableBody = document.createElement('tbody'),
        tableRow = document.createElement('tr'),
        containers = {
            'tr': tableBody,
            'tbody': table,
            'thead': table,
            'tfoot': table,
            'td': tableRow,
            'th': tableRow,
            '*': div
        },
        slice = Array.prototype.slice;


    function removeSelfClosingTags(xml) {
        var split = xml.split("/>");
        var newXml = "";
        for (var i = 0; i < split.length - 1;i++) {
            var edsplit = split[i].split("<");
            newXml += split[i] + "></" + edsplit[edsplit.length - 1].split(" ")[0] + ">";
        }
        return newXml + split[split.length-1];
    }


    /*   
     * Create a DocumentFragment from the HTML fragment.
     * @param {String} html
     */
    function createFragment(html) {
        // A special case optimization for a single tag
        html = strings.trim(html);
        if (singleTagRE.test(html)) {
            return [createElement(RegExp.$1)];
        }

        var name = fragmentRE.test(html) && RegExp.$1
        if (!(name in containers)) {
            name = "*"
        }
        var container = containers[name];
        container.innerHTML = removeSelfClosingTags("" + html);
        dom = slice.call(container.childNodes);

        dom.forEach(function(node) {
            container.removeChild(node);
        })

        return dom;
    }

	
	return noder.createFragment = createFragment;
});
define('skylark-domx-noder/create-text-node',[
	"./noder"
],function(noder){
 
    /*   
     * Create a new Text node.
     * @param {String} text
     * @param {Node} child
     */
    function createTextNode(text) {
        return document.createTextNode(text);
    }


	return noder.createTextNode = createTextNode;
});
define('skylark-domx-noder/doc',[
	"./noder"
],function(noder){
 
    /*   
     * Get the current document object.
     */
    function doc() {
        return document;
    }

	return noder.doc = doc;
});
define('skylark-domx-noder/empty',[
	"./noder"
],function(noder){
 
    /*   
     * Remove all child nodes of the set of matched elements from the DOM.
     * @param {Object} node
     */
    function empty(node) {
        while (node.hasChildNodes()) {
            var child = node.firstChild;
            node.removeChild(child);
        }
        return this;
    }
	
	return noder.empty = empty;
});
define('skylark-domx-noder/focusable',[
	"./noder"
],function(noder){
 
    // Selectors
    function focusable( element, hasTabindex ) {
        var map, mapName, img, focusableIfVisible, fieldset,
            nodeName = element.nodeName.toLowerCase();

        if ( "area" === nodeName ) {
            map = element.parentNode;
            mapName = map.name;
            if ( !element.href || !mapName || map.nodeName.toLowerCase() !== "map" ) {
                return false;
            }
            img = $( "img[usemap='#" + mapName + "']" );
            return img.length > 0 && img.is( ":visible" );
        }

        if ( /^(input|select|textarea|button|object)$/.test( nodeName ) ) {
            focusableIfVisible = !element.disabled;

            if ( focusableIfVisible ) {

                // Form controls within a disabled fieldset are disabled.
                // However, controls within the fieldset's legend do not get disabled.
                // Since controls generally aren't placed inside legends, we skip
                // this portion of the check.
                fieldset = $( element ).closest( "fieldset" )[ 0 ];
                if ( fieldset ) {
                    focusableIfVisible = !fieldset.disabled;
                }
            }
        } else if ( "a" === nodeName ) {
            focusableIfVisible = element.href || hasTabindex;
        } else {
            focusableIfVisible = hasTabindex;
        }

        return focusableIfVisible && $( element ).is( ":visible" ) && visible( $( element ) );
    };
	
	return noder.focusable = focusable;
});
define('skylark-domx-noder/from-point',[
	"./noder"
],function(noder){

    function fromPoint(x,y) {
        return document.elementFromPoint(x,y);
    }

	
	return noder.fromPoint = fromPoint;
});
define('skylark-domx-noder/fullscreen',[
    "skylark-domx-browser",
	"./noder"
],function(browser,noder){

    var fulledEl = null;

    function fullscreen(el) {
        if (el === false) {
            return browser.exitFullscreen.apply(document);
        } else if (el) {
            return el[browser.support.fullscreen.requestFullscreen]();
            fulledEl = el;
        } else {
            return (
                document.fullscreenElement ||
                document.webkitFullscreenElement ||
                document.mozFullScreenElement ||
                document.msFullscreenElement
            )
        }
    }
	
	return noder.fullscreen = fullscreen;
});
define('skylark-domx-noder/html',[
    "skylark-langx-types",
    "skylark-langx-scripter",
	"./noder",
    "./empty"
],function(types,scripter,noder,empty){
 
   var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
       rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );

    /*   
     * Get the HTML contents of the first element in the set of matched elements.
     * @param {HTMLElement} node
     * @param {String} html
     */
    function _html(node, html) {
        if (html === undefined) {
            return node.innerHTML;
        } else {
            empty(node);
            html = html || "";
            if (types.isString(html)) {
                html = html.replace( rxhtmlTag, "<$1></$2>" );
            }
            if (types.isString(html) || types.isNumber(html)) {               
                node.innerHTML = html;
            } else if (types.isArrayLike(html)) {
                for (var i = 0; i < html.length; i++) {
                    node.appendChild(html[i]);
                }
            } else {
                node.appendChild(html);
            }

            return this;
        }
    }


    function html(node,value) {
        var result = _html(node,value);

        if (value !== undefined) {
            var scripts = node.querySelectorAll('script');

            for (var i =0; i<scripts.length; i++) {
                var node1 = scripts[i];
                if (rscriptType.test( node1.type || "" ) ) {
                  scripter.evaluate(node1.textContent,node1);
                }
            }       
            return this;         
        } else {
            return result;
        }
    }


	return noder.html = html;
});
define('skylark-domx-noder/is-active',[
	"./noder"
],function(noder){
    function isActive (elem) {
            return elem === document.activeElement && (elem.type || elem.href);
    }

	
	return noder.isActive = isActive;
});
define('skylark-domx-noder/is-block-node',[
	"./noder"
],function(noder){

    var blockNodes = ["div", "p", "ul", "ol", "li", "blockquote", "hr", "pre", "h1", "h2", "h3", "h4", "h5", "table"];

    function isBlockNode(node) {
        if (!node || node.nodeType === 3) {
          return false;
        }
        return new RegExp("^(" + (blockNodes.join('|')) + ")$").test(node.nodeName.toLowerCase());
    }


	
	return noder.isBlockNode = isBlockNode;
});
define('skylark-domx-noder/is-doc',[
	"./noder"
],function(noder){
    /*   
     * Check to see if a dom node is a document.
     * @param {Node} node
     */
    function isDocument(node) {
        return node != null && node.nodeType == node.DOCUMENT_NODE
    }

	
	return noder.isDoc = isDocument;
});
define('skylark-domx-noder/is-editable',[
	"./noder"
],function(noder){
 
    function isEditable (el) {
      if (!el) { return false; } // no parents were editable
      if (el.contentEditable === 'false') { return false; } // stop the lookup
      if (el.contentEditable === 'true') { return true; } // found a contentEditable element in the chain
      return isEditable(el.parentNode); // contentEditable is set to 'inherit'
    }

	
	return noder.isEditable = isEditable;
});
define('skylark-domx-noder/is-fullscreen',[
	"./noder",
    "./fullscreen"
],function(noder,fullscreen){
 
    function isFullscreen(el) {
        return fullscreen() === el;
    }
	
	return noder.isFullscreen = isFullscreen;
});
define('skylark-domx-noder/is-in-document',[
	"./noder"
],function(noder){
    /*   
     * Check to see if a dom node is in the document
     * @param {Node} node
     */
    function isInDocument(node) {
      return (node === document.body) ? true : document.body.contains(node);
    }     

	
	return noder.isInDocument = isInDocument;
});
define('skylark-domx-noder/is-in-frame',[
	"./noder"
],function(noder){
     function isInFrame() {
        try {
            return window.parent !== window.self;
        } catch (x) {
            return true;
        }
    }
	
	return noder.isInFrame = isInFrame;
});
define('skylark-domx-noder/is-input',[
	"./noder",
    "./is-editable"
],function(noder,isEditable){
 
    function isInput (el) { 
        return el.tagName === 'INPUT' || 
               el.tagName === 'TEXTAREA' || 
               el.tagName === 'SELECT' || 
               isEditable(el); 
    }
	
	return noder.isInput = isInput;
});
define('skylark-domx-noder/is-window',[
    "skylark-langx-types",
    "./noder"
],function(types,noder){
   
    return noder.isWindow = types.isWindow;
	
});
define('skylark-domx-noder/node-name',[
	"./noder"
],function(noder){
 
    function nodeName(elm, chkName) {
        var name = elm.nodeName && elm.nodeName.toLowerCase();
        if (chkName !== undefined) {
            return name === chkName.toLowerCase();
        }
        return name;
    };
	
	return noder.nodeName = nodeName;
});
define('skylark-domx-noder/offset-parent',[
	"./noder"
],function(noder){
 
    var  rootNodeRE = /^(?:body|html)$/i;
    
    /*   
     *
     * @param {Node} elm
     */
    function offsetParent(elm) {
        var parent = elm.offsetParent || document.body;
        while (parent && !rootNodeRE.test(parent.nodeName) && document.defaultView.getComputedStyle(parent).position == "static") {
            parent = parent.offsetParent;
        }
        return parent;
    }
	
	return noder.offsetParent = offsetParent;
});
define('skylark-domx-noder/overlay',[
	"skylark-domx-styler",
	"./noder"
],function(styler,noder){
    /*   
     *
     * @param {Node} elm
     * @param {Node} params
     */
    function overlay(elm, params) {
        var overlayDiv = noder.createElement("div", params);
        styler.css(overlayDiv, {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0x7FFFFFFF,
            opacity: 0.7
        });
        elm.appendChild(overlayDiv);
        return overlayDiv;

    }

    return noder.overlay = overlay;
 });
define('skylark-domx-noder/owner-doc',[
	"./noder"
],function(noder){
 
    /*   
     * Get the owner document object for the specified element.
     * @param {Node} elm
     */
    function ownerDoc(elm) {
        if (!elm) {
            return document;
        }

        if (elm.nodeType == 9) {
            return elm;
        }

        return elm.ownerDocument;
    }

	
	return noder.ownerDoc = ownerDoc;
});
define('skylark-domx-noder/owner-window',[
	"./noder",
    "./owner-doc"
],function(noder,ownerDoc){
 
    /*   
     *
     * @param {Node} elm
     */
    function ownerWindow(elm) {
        var doc = ownerDoc(elm);
        return doc.defaultView || doc.parentWindow;
    }

	return noder.ownerWindow = ownerWindow;
});
define('skylark-domx-noder/prepend',[
    "./noder",
    "./_enhance_place_content",
    "./_ensure_nodes"
],function(noder,enhancePlaceContent,ensureNodes){

    /*   
     * insert one or more nodes as the first children of the specified node.
     * @param {Node} node
     * @param {Node or ArrayLike} placing
     * @param {Boolean Optional} copyByClone
     */
    function prepend(node, placing, copyByClone) {
        var parentNode = node,
            refNode = parentNode.firstChild,
            nodes = ensureNodes(placing, copyByClone);
        for (var i = 0; i < nodes.length; i++) {
            if (refNode) {
                parentNode.insertBefore(nodes[i], refNode);
            } else {
                parentNode.appendChild(nodes[i]);
            }
        }
        return this;
    }

	
	return noder.prepend = prepend;
});
define('skylark-domx-noder/reflow',[
	"./noder"
],function(noder){
 
    function reflow(elm) {
        if (!elm) {
          elm = document;
        }
        elm.offsetHeight;

        return this;      
    }
	
	return noder.reflow = reflow;
});
define('skylark-domx-noder/remove-child',[
    "skylark-langx-types",
	"./noder"
],function(types,noder){
 

    function removeChild(node,children) {
        if (!types.isArrayLike(children)) {
            children = [children];
        }
        for (var i=0;i<children.length;i++) {
            node.removeChild(children[i]);
        }

        return this;
    }

	
	return noder.removeChild = removeChild;
});
define('skylark-domx-noder/remove',[
	"./noder"
],function(noder){
 
    /*   
     * Remove the set of matched elements from the DOM.
     * @param {Node} node
     */
    function remove(node) {
        if (node && node.parentNode) {
            try {
                node.parentNode.removeChild(node);
            } catch (e) {
                console.warn("The node is already removed", e);
            }
        }
        return this;
    }
	
	return noder.remove = remove;
});
define('skylark-domx-noder/replace',[
	"./noder"
],function(noder){
     /*   
     * Replace an old node with the specified node.
     * @param {Node} node
     * @param {Node} oldNode
     */
    function replace(node, oldNode) {
        oldNode.parentNode.replaceChild(node, oldNode);
        return this;
    }

	return noder.replace = replace;
});
define('skylark-domx-noder/reverse',[
	"./noder"
],function(noder){
    /*   
     *
     * @param {Node} node
     */
    function reverse(node) {
        var firstChild = node.firstChild;
        for (var i = node.children.length - 1; i > 0; i--) {
            if (i > 0) {
                var child = node.children[i];
                node.insertBefore(child, firstChild);
            }
        }
    }
	
	return noder.reverse = reverse;
});
define('skylark-domx-noder/root',[
	"./noder"
],function(noder){
	function root() {
		return  document.documentElement;
	}
	
	return noder.root = root;
});
define('skylark-domx-noder/scrolling-element',[
	"./noder"
],function(noder){
	function scrollingElement() {
		return document.scrollingElement || document.documentElement;
	}
	
	return noder.scrollingElement = scrollingElement;
});
define('skylark-domx-noder/selectable',[
	"./noder"
],function(noder){
 

    function selectable(elem, selectable) {
        if (elem === undefined || elem.style === undefined)
            return;
        elem.onselectstart = selectable ? function () {
            return false;
        } : function () {
        };
        elem.style.MozUserSelect = selectable ? 'auto' : 'none';
        elem.style.KhtmlUserSelect = selectable ? 'auto' : 'none';
        elem.unselectable = selectable ? 'on' : 'off';
    }

	
	return noder.selectable = selectable;
});
define('skylark-domx-noder/throb',[
    "skylark-langx/langx",
    "skylark-domx-styler",
    "./noder"
],function(langx,styler,noder) {

    
    /*   
     * Replace an old node with the specified node.
     * @param {HTMLElement} elm
     * @param {Node} params
     */
    function throb(elm, params) {
        params = params || {};

        var self = this,
            text = params.text,
            style = params.style,
            time = params.time,
            callback = params.callback,
            timer,

            throbber = noder.createElement("div", {
                "className": params.className || "throbber"
            }),
            //_overlay = overlay(throbber, {
            //    "class": 'overlay fade'
            //}),
            remove = function() {
                if (timer) {
                    clearTimeout(timer);
                    timer = null;
                }
                if (throbber) {
                    noder.remove(throbber);
                    throbber = null;
                }
            },
            update = function(params) {
                if (params && params.text && throbber) {
                    textNode.nodeValue = params.text;
                }
            };

        if (params.style) {
            styler.css(throbber,params.style);
        }

        //throb = noder.createElement("div", {
        //   "class": params.throb && params.throb.className || "throb"
        //}),
        //textNode = noder.createTextNode(text || ""),
 
        var content = params.content ||  '<span class="throb"></span>';

        //throb.appendChild(textNode);
        //throbber.appendChild(throb);

        noder.html(throbber,content);
        
        elm.appendChild(throbber);

        var end = function() {
            remove();
            if (callback) callback();
        };
        if (time) {
            timer = setTimeout(end, time);
        }

        return {
            throbber : throbber,
            remove: remove,
            update: update
        };
    }

    return noder.throb = throb;
});
define('skylark-domx-noder/traverse',[
	"./noder"
],function(noder){
 
    /*   
     * traverse the specified node and its descendants, perform the callback function on each
     * @param {Node} node
     * @param {Function} fn
     */
    function traverse(node, fn) {
        fn(node)
        for (var i = 0, len = node.childNodes.length; i < len; i++) {
            traverse(node.childNodes[i], fn);
        }
        return this;
    }
	
	return noder.traverse = traverse;
});
define('skylark-domx-noder/unwrap',[
	"./noder",
    "./is-doc"
],function(noder,isDoc){

    /*   
     * Remove the parents of the set of matched elements from the DOM, leaving the matched
     * @param {Node} node
     */
    function unwrap(node) {
        var child, parent = node.parentNode;
        if (parent) {
            if (isDoc(parent.parentNode)) return;
            parent.parentNode.insertBefore(node, parent);
        }
    }

	return noder.unwrap = unwrap;
});
define('skylark-domx-noder/wrapper-inner',[
	"./noder"
],function(noder){
    var  slice = Array.prototype.slice;

    /*   
     * Wrap an HTML structure around the content of each element in the set of matched
     * @param {Node} node
     * @param {Node} wrapperNode
     */
    function wrapperInner(node, wrapperNode) {
        var childNodes = slice.call(node.childNodes);
        node.appendChild(wrapperNode);
        for (var i = 0; i < childNodes.length; i++) {
            wrapperNode.appendChild(childNodes[i]);
        }
        return this;
    }

	
	return noder.wrapperInner = wrapperInner;
});
define('skylark-domx-noder/wrapper',[
	"./noder"
],function(noder){
 
    /*   
     * Wrap an HTML structure around each element in the set of matched elements.
     * @param {Node} node
     * @param {Node} wrapperNode
     */
    function wrapper(node, wrapperNode) {
        if (types.isString(wrapperNode)) {
            wrapperNode = this.createFragment(wrapperNode).firstChild;
        }
        node.parentNode.insertBefore(wrapperNode, node);
        wrapperNode.appendChild(node);
    }
	
	return noder.wrapper = wrapper;
});
define('skylark-domx-noder/main',[
	"./noder",
	"./active",
	"./after",
	"./append",
	"./before",
	"./body",
	"./clone",
	"./contains",
	"./create-element",
	"./create-fragment",
	"./create-text-node",
	"./doc",
	"./empty",
	"./focusable",
	"./from-point",
	"./fullscreen",
	"./html",
	"./is-active",
	"./is-block-node",
	"./is-child-of",
	"./is-doc",
	"./is-editable",
	"./is-element",
	"./is-fragment",
	"./is-fullscreen",
	"./is-in-document",
	"./is-in-frame",
	"./is-input",
	"./is-text-node",
	"./is-window",
	"./node-name",
	"./offset-parent",
	"./overlay",
	"./owner-doc",
	"./owner-window",
	"./prepend",
	"./reflow",
	"./remove-child",
	"./remove",
	"./replace",
	"./reverse",
	"./root",
	"./scrolling-element",
	"./selectable",
	"./throb",
	"./traverse",
	"./unwrap",
	"./wrapper-inner",
	"./wrapper",
	"./throb"
],function(noder){
	return noder;
});
define('skylark-domx-noder', ['skylark-domx-noder/main'], function (main) { return main; });


},this);
//# sourceMappingURL=sourcemaps/skylark-domx-noder.js.map
