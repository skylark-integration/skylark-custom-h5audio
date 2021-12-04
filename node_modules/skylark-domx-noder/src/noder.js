define([
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