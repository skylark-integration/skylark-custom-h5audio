/**
 * skylark-langx-funcs - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./funcs","./rest-arguments"],function(n,r){return n.bindAll=r(function(n,r){var e=r.length;if(e<1)throw new Error("bindAll must be passed function names");for(;e--;){var t=r[e];n[t]=n[t].bind(n)}})});
//# sourceMappingURL=sourcemaps/bind-all.js.map
