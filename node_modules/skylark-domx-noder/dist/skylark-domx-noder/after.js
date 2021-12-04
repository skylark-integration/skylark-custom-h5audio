/**
 * skylark-domx-noder - The skylark html node library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./noder","./_enhance_place_content","./_ensure_nodes"],function(e,n,r){return e.after=function(e,t,i){t=n(t,e);var o=(f=e).parentNode;if(o)for(var a=r(t,i),f=f.nextSibling,d=0;d<a.length;d++)f?o.insertBefore(a[d],f):o.appendChild(a[d]);return this}});
//# sourceMappingURL=sourcemaps/after.js.map
