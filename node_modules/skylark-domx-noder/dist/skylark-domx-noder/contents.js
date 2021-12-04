/**
 * skylark-domx-noder - The skylark html node library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./noder","./node-name"],function(n,e){return n.contents=function(n){return e(n,"iframe")?n.contentDocument:n.childNodes}});
//# sourceMappingURL=sourcemaps/contents.js.map
