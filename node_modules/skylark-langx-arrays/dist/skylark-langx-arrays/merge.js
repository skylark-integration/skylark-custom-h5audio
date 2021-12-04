/**
 * skylark-langx-arrays - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./arrays"],function(e){return e.merge=function(e,n){var r=n.length,t=e.length,f=0;if("number"==typeof r)for(;f<r;f++)e[t++]=n[f];else for(;void 0!==n[f];)e[t++]=n[f++];return e.length=t,e}});
//# sourceMappingURL=sourcemaps/merge.js.map
