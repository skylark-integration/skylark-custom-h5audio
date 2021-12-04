/**
 * skylark-domx-noder - The skylark html node library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx-types","./noder"],function(e,t){return t.createElement=function(n,r,l,i){var o;if(o=/svg/i.test(n)?document.createElementNS("http://www.w3.org/2000/svg",n):document.createElement(n),e.isHtmlNode(r)?(i=r,r=null,l=null):e.isHtmlNode(l)&&(i=l,l=null),r)for(var u in r)o[u]=r[u];if(l)for(var u in l)o.setAttribute(u,l[u]);return i&&t.append(i,o),o}});
//# sourceMappingURL=sourcemaps/create-element.js.map
