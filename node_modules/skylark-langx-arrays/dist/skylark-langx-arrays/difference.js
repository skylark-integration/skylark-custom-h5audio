/**
 * skylark-langx-arrays - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx-funcs","./arrays","./flatten","./filter","./contains"],function(n,r,e,t,f){var u=n.restArguments(function(n,r){return r=e(r,!0,!0),t(n,function(n){return!f(r,n)})});return r.difference=u});
//# sourceMappingURL=sourcemaps/difference.js.map
