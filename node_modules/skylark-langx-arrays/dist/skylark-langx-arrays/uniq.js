/**
 * skylark-langx-arrays - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./arrays","./filter"],function(n,r){return n.uniq=function(n){return r.call(n,function(r,e){return n.indexOf(r)==e})}});
//# sourceMappingURL=sourcemaps/uniq.js.map
