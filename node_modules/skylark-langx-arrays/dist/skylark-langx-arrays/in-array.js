/**
 * skylark-langx-arrays - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./arrays"],function(r){return r.inArray=function(r,n){if(!n)return-1;var e;if(n.indexOf)return n.indexOf(r);for(e=n.length;e--;)if(n[e]===r)return e;return-1}});
//# sourceMappingURL=sourcemaps/in-array.js.map
