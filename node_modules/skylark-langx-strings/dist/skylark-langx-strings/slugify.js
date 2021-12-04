/**
 * skylark-langx-strings - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./strings"],function(e){return e.slugify=function(e){e=(e=e.replace(/^\s+|\s+$/g,"")).toLowerCase();for(var a="ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;",r=0,n=a.length;r<n;r++)e=e.replace(new RegExp(a.charAt(r),"g"),"AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------".charAt(r));return e=e.replace(/\s+/g,"-").replace(/-+/g,"-")}});
//# sourceMappingURL=sourcemaps/slugify.js.map
