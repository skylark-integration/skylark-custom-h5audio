/**
 * skylark-langx-strings - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./strings"],function(n){return n.substitute=function(n,r,t,u){function e(n,r){if(n.match(/\./)){var t,u=function(n,r){var e=n.pop();return e?r[e]?u(n,t=r[e]):null:t};return u(n.split(".").reverse(),r)}return r[n]}return u=u||window,t=t?proxy(u,t):function(n){return n},n.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(n,i,o){var c=e(i,r);return o&&(c=e(o,u).call(u,c,i)),t(c,i).toString()})}});
//# sourceMappingURL=sourcemaps/substitute.js.map
