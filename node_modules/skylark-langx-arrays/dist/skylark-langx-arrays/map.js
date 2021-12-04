/**
 * skylark-langx-arrays - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx-types","./arrays","./flatten"],function(l,n,r){return n.map=function(n,a){var e,t,u,f=[];if(l.isArrayLike(n))for(t=0;t<n.length;t++)null!=(e=a.call(n[t],n[t],t))&&f.push(e);else for(u in n)null!=(e=a.call(n[u],n[u],u))&&f.push(e);return r(f)}});
//# sourceMappingURL=sourcemaps/map.js.map
