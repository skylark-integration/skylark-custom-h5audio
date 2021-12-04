/**
 * skylark-domx-noder - The skylark html node library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./noder"],function(e){var o=["div","p","ul","ol","li","blockquote","hr","pre","h1","h2","h3","h4","h5","table"];return e.isBlockNode=function(e){return!(!e||3===e.nodeType)&&new RegExp("^("+o.join("|")+")$").test(e.nodeName.toLowerCase())}});
//# sourceMappingURL=sourcemaps/is-block-node.js.map
