/**
 * skylark-domx-noder - The skylark html node library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./noder","./is-doc"],function(e,n){return e.unwrap=function(e){var r=e.parentNode;if(r){if(n(r.parentNode))return;r.parentNode.insertBefore(e,r)}}});
//# sourceMappingURL=sourcemaps/unwrap.js.map
