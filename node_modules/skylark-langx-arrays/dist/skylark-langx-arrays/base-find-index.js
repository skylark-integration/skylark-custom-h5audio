/**
 * skylark-langx-arrays - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./arrays"],function(n){return n.baseFindIndex=function(n,r,e,t){for(var f=n.length,i=e+(t?1:-1);t?i--:++i<f;)if(r(n[i],i,n))return i;return-1}});
//# sourceMappingURL=sourcemaps/base-find-index.js.map
