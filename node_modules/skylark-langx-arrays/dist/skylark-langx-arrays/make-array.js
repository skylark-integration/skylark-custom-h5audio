/**
 * skylark-langx-arrays - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx-types","./arrays"],function(r,a){return a.makeArray=function(a,e,n){return r.isArrayLike(a)?(n||[]).concat(Array.prototype.slice.call(a,e||0)):[a]}});
//# sourceMappingURL=sourcemaps/make-array.js.map
