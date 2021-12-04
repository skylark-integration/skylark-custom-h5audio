/**
 * skylark-domx-noder - The skylark html node library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-domx-browser","./noder"],function(e,n){return n.fullscreen=function(n){return!1===n?e.exitFullscreen.apply(document):n?n[e.support.fullscreen.requestFullscreen]():document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement}});
//# sourceMappingURL=sourcemaps/fullscreen.js.map
