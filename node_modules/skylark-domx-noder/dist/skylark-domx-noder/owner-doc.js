/**
 * skylark-domx-noder - The skylark html node library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./noder"],function(n){return n.ownerDoc=function(n){return n?9==n.nodeType?n:n.ownerDocument:document}});
//# sourceMappingURL=sourcemaps/owner-doc.js.map
