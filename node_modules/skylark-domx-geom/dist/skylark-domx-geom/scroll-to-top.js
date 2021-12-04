/**
 * skylark-domx-geom - The skylark geom library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx","skylark-domx-styler","./geom"],function(e,r,n){return n.scrollToTop=function(r,n,l,o){var t=parseInt(r.scrollTop),s=0,a=1e3*l/5,c=parseInt(n),u=setInterval(function(){++s<=a&&(r.scrollTop=(c-t)/a*s+t),s>=a+1&&(clearInterval(u),o&&e.debounce(o,1e3)())},5);return this}});
//# sourceMappingURL=sourcemaps/scroll-to-top.js.map
