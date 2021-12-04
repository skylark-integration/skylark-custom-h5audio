/**
 * skylark-langx-strings - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./strings"],function(r){const e=/\x00/g;return r.trimNull=function(r){return"string"!=typeof r?(warn("The argument for removeNullCharacters must be a string."),r):r.replace(e,"")}});
//# sourceMappingURL=sourcemaps/trim-null.js.map
