/**
 * skylark-domx-noder - The skylark html node library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./noder","./_enhance_place_content","./_ensure_nodes"],function(n,e,r){return n.append=function(n,t,d){t=e(t,n);for(var o=n,a=r(t,d),c=0;c<a.length;c++)o.appendChild(a[c]);return this}});
//# sourceMappingURL=sourcemaps/append.js.map
