/**
 * skylark-domx-noder - The skylark html node library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx-strings","./noder","./create-element"],function(e,t,r){var n=/^\s*<(\w+|!)[^>]*>/,o=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,a=document.createElement("div"),l=document.createElement("table"),c=document.createElement("tbody"),d=document.createElement("tr"),i={tr:c,tbody:l,thead:l,tfoot:l,td:d,th:d,"*":a},m=Array.prototype.slice;return t.createFragment=function(t){if(t=e.trim(t),o.test(t))return[r(RegExp.$1)];var a=n.test(t)&&RegExp.$1;a in i||(a="*");var l=i[a];return l.innerHTML=function(e){for(var t=e.split("/>"),r="",n=0;n<t.length-1;n++){var o=t[n].split("<");r+=t[n]+"></"+o[o.length-1].split(" ")[0]+">"}return r+t[t.length-1]}(""+t),dom=m.call(l.childNodes),dom.forEach(function(e){l.removeChild(e)}),dom}});
//# sourceMappingURL=sourcemaps/create-fragment.js.map
