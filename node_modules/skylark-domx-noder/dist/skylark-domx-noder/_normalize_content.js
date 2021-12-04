/**
 * skylark-domx-noder - The skylark html node library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx-types","./noder","./is-element","./is-text-node","./is-fragment"],function(e,t,n,r,o){var i=Array.prototype.map;return function(t){return"function"==typeof t&&(t=t()),i.call(e.isArrayLike(t)?t:[t],e=>("function"==typeof e&&(e=e()),n(e)||r(e)||o(e)?e:"string"==typeof e&&/\S/.test(e)?document.createTextNode(e):void 0)).filter(e=>e)}});
//# sourceMappingURL=sourcemaps/_normalize_content.js.map
