define([
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