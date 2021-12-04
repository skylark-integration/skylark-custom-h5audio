/**
 * skylark-langx-arrays - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./arrays","./filter"],function(n,r){return n.compact=function(n){return r(n,function(n){return null!=n})}});
//# sourceMappingURL=sourcemaps/compact.js.map
