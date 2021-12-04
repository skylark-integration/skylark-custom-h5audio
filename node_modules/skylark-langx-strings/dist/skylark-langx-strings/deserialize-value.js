/**
 * skylark-langx-strings - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./strings"],function(e){return e.deserializeValue=function(e){try{return e?"true"==e||"false"!=e&&("null"==e?null:+e+""==e?+e:/^[\[\{]/.test(e)?JSON.parse(e):e):e}catch(n){return e}}});
//# sourceMappingURL=sourcemaps/deserialize-value.js.map
