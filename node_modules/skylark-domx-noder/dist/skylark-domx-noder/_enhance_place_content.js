/**
 * skylark-domx-noder - The skylark html node library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx-types","skylark-langx-arrays","./noder"],function(n,r,i){return function(i,a){if(n.isFunction(i))return i.apply(a,[]);if(n.isArrayLike(i)){for(var e,t=0;t<i.length;t++)n.isFunction(i[t])&&(i[t]=i[t].apply(a,[]),n.isArrayLike(i[t])&&(e=!0));e&&(i=r.flatten(i))}return i}});
//# sourceMappingURL=sourcemaps/_enhance_place_content.js.map
