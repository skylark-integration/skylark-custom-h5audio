/**
 * skylark-langx-arrays - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./arrays","./base-find-index"],function(n,r){function e(n){return n!=n}return n.baseIndexOf=function(n,f,t){if(f!=f)return r(n,e,t);for(var i=t-1,u=n.length;++i<u;)if(n[i]===f)return i;return-1}});
//# sourceMappingURL=sourcemaps/base-indexof.js.map
