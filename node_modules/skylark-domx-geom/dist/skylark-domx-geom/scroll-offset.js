/**
 * skylark-domx-geom - The skylark geom library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx","skylark-domx-noder","./geom"],function(e,o,r){return r.scrollOffset=function(e){var o=0,r=0,l=noder.scrollingElement();if(e)do{o+=e.scrollLeft,r+=e.scrollTop}while(e!==l&&(e=e.parentNode));return{offsetLeft:o,offsetTop:r}}});
//# sourceMappingURL=sourcemaps/scroll-offset.js.map
