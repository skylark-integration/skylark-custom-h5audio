/**
 * skylark-domx-noder - The skylark html node library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./noder"],function(n){return n.isChildOf=function(n,e,r){if(r)return n.parentNode===e;if(document.documentElement.contains)return e.contains(n);for(;n;){if(e===n)return!0;n=n.parentNode}return!1}});
//# sourceMappingURL=sourcemaps/is-child-of.js.map
