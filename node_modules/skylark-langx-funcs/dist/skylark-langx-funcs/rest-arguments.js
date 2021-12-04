/**
 * skylark-langx-funcs - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./funcs"],function(r){return r.restArguments=function(r,t){return t=null==t?r.length-1:+t,function(){for(var n=Math.max(arguments.length-t,0),e=Array(n),a=0;a<n;a++)e[a]=arguments[a+t];switch(t){case 0:return r.call(this,e);case 1:return r.call(this,arguments[0],e);case 2:return r.call(this,arguments[0],arguments[1],e)}var u=Array(t+1);for(a=0;a<t;a++)u[a]=arguments[a];return u[t]=e,r.apply(this,u)}}});
//# sourceMappingURL=sourcemaps/rest-arguments.js.map
