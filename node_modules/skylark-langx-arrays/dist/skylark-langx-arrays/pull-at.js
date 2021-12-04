/**
 * skylark-langx-arrays - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx-types","skylark-langx-objects","./arrays"],function(n,t,e){return e.pullAt=function(n,...e){null==n||n.length;const l=t.baseAt(n,e);e.sort(function(n,t){return n-t});for(let t=e.length-1;t>=0;t--)n.slice(e[t],1);return l}});
//# sourceMappingURL=sourcemaps/pull-at.js.map
