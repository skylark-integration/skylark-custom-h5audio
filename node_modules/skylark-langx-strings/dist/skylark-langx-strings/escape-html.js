/**
 * skylark-langx-strings - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./strings"],function(n){var t=Object.freeze({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;","=":"&#x3D;"});function e(n){return t[n]}var r=/[&<>"'`=]/g;return n.escapeHTML=function(n){return null==n?"":n?n.toString().replace(r,e):String(n)}});
//# sourceMappingURL=sourcemaps/escape-html.js.map
