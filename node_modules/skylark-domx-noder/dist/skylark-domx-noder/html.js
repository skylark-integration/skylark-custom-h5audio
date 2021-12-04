/**
 * skylark-domx-noder - The skylark html node library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx-types","skylark-langx-scripter","./noder","./empty"],function(e,r,i,t){var n=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,a=/^$|^module$|\/(?:java|ecma)script/i;return i.html=function(i,l){var s=function(r,i){if(void 0===i)return r.innerHTML;if(t(r),i=i||"",e.isString(i)&&(i=i.replace(n,"<$1></$2>")),e.isString(i)||e.isNumber(i))r.innerHTML=i;else if(e.isArrayLike(i))for(var a=0;a<i.length;a++)r.appendChild(i[a]);else r.appendChild(i);return this}(i,l);if(void 0!==l){for(var p=i.querySelectorAll("script"),u=0;u<p.length;u++){var o=p[u];a.test(o.type||"")&&r.evaluate(o.textContent,o)}return this}return s}});
//# sourceMappingURL=sourcemaps/html.js.map
