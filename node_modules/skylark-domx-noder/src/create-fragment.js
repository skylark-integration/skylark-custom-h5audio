define([
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