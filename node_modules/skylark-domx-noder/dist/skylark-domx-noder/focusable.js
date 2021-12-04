/**
 * skylark-domx-noder - The skylark html node library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./noder"],function(e){return e.focusable=function(e,t){var a,i,s,n,o,r=e.nodeName.toLowerCase();return"area"===r?(i=(a=e.parentNode).name,!(!e.href||!i||"map"!==a.nodeName.toLowerCase())&&(s=$("img[usemap='#"+i+"']")).length>0&&s.is(":visible")):(/^(input|select|textarea|button|object)$/.test(r)?(n=!e.disabled)&&(o=$(e).closest("fieldset")[0])&&(n=!o.disabled):n="a"===r&&e.href||t,n&&$(e).is(":visible")&&visible($(e)))}});
//# sourceMappingURL=sourcemaps/focusable.js.map
