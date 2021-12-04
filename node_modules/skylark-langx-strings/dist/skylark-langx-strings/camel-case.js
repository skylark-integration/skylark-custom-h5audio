/**
 * skylark-langx-strings - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./strings"],function(e){return e.camelCase=function(e){return e.replace(/-([\da-z])/g,function(e){return e.toUpperCase().replace("-","")})}});
//# sourceMappingURL=sourcemaps/camel-case.js.map
