/**
 * skylark-langx-arrays - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx-types","./arrays"],function(r,e){return e.flatten=function(e){if(r.isArrayLike(e)){for(var n=[],a=0;a<e.length;a++){var t=e[a];if(r.isArrayLike(t))for(var i=0;i<t.length;i++)n.push(t[i]);else n.push(t)}return n}return e}});
//# sourceMappingURL=sourcemaps/flatten.js.map
