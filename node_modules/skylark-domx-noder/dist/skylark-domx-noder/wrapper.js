/**
 * skylark-domx-noder - The skylark html node library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./noder"],function(e){return e.wrapper=function(e,n){types.isString(n)&&(n=this.createFragment(n).firstChild),e.parentNode.insertBefore(n,e),n.appendChild(e)}});
//# sourceMappingURL=sourcemaps/wrapper.js.map
