/**
 * skylark-domx-noder - The skylark html node library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./noder"],function(t){var e=/^(?:body|html)$/i;return t.offsetParent=function(t){for(var n=t.offsetParent||document.body;n&&!e.test(n.nodeName)&&"static"==document.defaultView.getComputedStyle(n).position;)n=n.offsetParent;return n}});
//# sourceMappingURL=sourcemaps/offset-parent.js.map
