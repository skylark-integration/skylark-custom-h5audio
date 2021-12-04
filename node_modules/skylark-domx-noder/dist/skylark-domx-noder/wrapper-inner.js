/**
 * skylark-domx-noder - The skylark html node library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./noder"],function(r){var e=Array.prototype.slice;return r.wrapperInner=function(r,n){var a=e.call(r.childNodes);r.appendChild(n);for(var d=0;d<a.length;d++)n.appendChild(a[d]);return this}});
//# sourceMappingURL=sourcemaps/wrapper-inner.js.map
