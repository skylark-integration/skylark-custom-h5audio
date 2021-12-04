/**
 * skylark-domx-noder - The skylark html node library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./noder"],function(e){return e.isEditable=function e(n){return!!n&&"false"!==n.contentEditable&&("true"===n.contentEditable||e(n.parentNode))}});
//# sourceMappingURL=sourcemaps/is-editable.js.map
