/**
 * skylark-domx-noder - The skylark html node library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./noder","./_enhance_place_content","./_ensure_nodes"],function(e,n,r){return e.before=function(e,t,o){t=n(t,e);var f=e,i=f.parentNode;if(i)for(var a=r(t,o),c=0;c<a.length;c++)i.insertBefore(a[c],f);return this}});
//# sourceMappingURL=sourcemaps/before.js.map
