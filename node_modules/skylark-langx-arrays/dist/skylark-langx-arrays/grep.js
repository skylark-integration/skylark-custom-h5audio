/**
 * skylark-langx-arrays - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx-objects","./arrays"],function(n,r){return r.grep=function(r,e){var a=[];return n.each(r,function(n,r){e(r,n)&&a.push(r)}),a}});
//# sourceMappingURL=sourcemaps/grep.js.map
