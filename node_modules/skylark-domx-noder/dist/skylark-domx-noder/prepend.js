/**
 * skylark-domx-noder - The skylark html node library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./noder","./_enhance_place_content","./_ensure_nodes"],function(e,n,r){return e.prepend=function(e,n,t){for(var i=e,d=i.firstChild,o=r(n,t),f=0;f<o.length;f++)d?i.insertBefore(o[f],d):i.appendChild(o[f]);return this}});
//# sourceMappingURL=sourcemaps/prepend.js.map
