/**
 * skylark-langx-strings - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./strings"],function(e){function t(e,t){var r,n,c,a,i,l,s,h=arguments.callee;return h.cache[e]||(h.cache[e]=(r=e,n=/^[\w\-]+$/.test(e)?h.get(e):(r="template(string)",e),c=1,a=("try { "+(h.variable?"var "+h.variable+" = this.stash;":"with (this.stash) { ")+"this.ret += '"+n.replace(/<%/g,"").replace(/%>/g,"").replace(/'(?![^\x11\x13]+?\x13)/g,"\\x27").replace(/^\s*|\s*$/g,"").replace(/\n|\r\n/g,function(){return"';\nthis.line = "+ ++c+"; this.ret += '\\n"}).replace(/\x11=raw(.+?)\x13/g,"' + ($1) + '").replace(/\x11=(.+?)\x13/g,"' + this.escapeHTML($1) + '").replace(/\x11(.+?)\x13/g,"'; $1; this.ret += '")+"'; "+(h.variable?"":"}")+"return this.ret;} catch (e) { throw 'TemplateError: ' + e + ' (on "+r+"' + ' line ' + this.line + ')'; } //@ sourceURL="+r+"\n").replace(/this\.ret \+= '';/g,""),i=new Function(a),l={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&#x22;","'":"&#x27;"},s=function(e){return(""+e).replace(/[&<>\'\"]/g,function(e){return l[e]})},function(e){return i.call(h.context={escapeHTML:s,line:1,ret:"",stash:e})})),t?h.cache[e](t):h.cache[e]}return t.cache={},t.get=function(e){return document.getElementById(e).innerHTML},e.template=t});
//# sourceMappingURL=sourcemaps/template.js.map
