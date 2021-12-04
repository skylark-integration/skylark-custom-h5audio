/**
 * skylark-domx-noder - The skylark html node library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx-ns","skylark-langx-types","skylark-langx-arrays","skylark-langx-strings","skylark-langx-scripter","skylark-domx-browser"],function(r,t,a,n,e,s){Array.prototype.map,Array.prototype.slice;function l(){return l}return Object.assign(l,{blur:function(r){r.blur()},generateId:function(r){for(var t=r.tagName+r.className+r.src+r.href+r.textContent,a=t.length,n=0;a--;)n+=t.charCodeAt(a);return n.toString(36)}}),r.attach("domx.noder",l)});
//# sourceMappingURL=sourcemaps/noder.js.map
