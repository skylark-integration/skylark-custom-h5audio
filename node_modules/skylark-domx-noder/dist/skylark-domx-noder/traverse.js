/**
 * skylark-domx-noder - The skylark html node library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./noder"],function(e){return e.traverse=function e(n,r){r(n);for(var t=0,d=n.childNodes.length;t<d;t++)e(n.childNodes[t],r);return this}});
//# sourceMappingURL=sourcemaps/traverse.js.map
