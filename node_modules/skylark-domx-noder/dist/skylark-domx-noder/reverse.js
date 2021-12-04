/**
 * skylark-domx-noder - The skylark html node library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./noder"],function(e){return e.reverse=function(e){for(var r=e.firstChild,n=e.children.length-1;n>0;n--)if(n>0){var i=e.children[n];e.insertBefore(i,r)}}});
//# sourceMappingURL=sourcemaps/reverse.js.map
