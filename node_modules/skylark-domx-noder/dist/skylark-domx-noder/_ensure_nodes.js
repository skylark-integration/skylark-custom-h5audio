/**
 * skylark-domx-noder - The skylark html node library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx-arrays","./noder","./_normalize_content"],function(n,r,e){var t=Array.prototype.map;return function(r,a){var o=e(r);return a&&(o=t.call(o,function(n){return n.cloneNode(!0)})),n.flatten(o)}});
//# sourceMappingURL=sourcemaps/_ensure_nodes.js.map
