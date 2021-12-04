/**
 * skylark-langx-strings - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./strings"],function(f){const u="\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",d=`[${u}]`,x="[\\u2700-\\u27bf]",e="[a-z\\xdf-\\xf6\\xf8-\\xff]",n=`[^\\ud800-\\udfff${u+"\\d\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde"}]`,t="(?:\\ud83c[\\udde6-\\uddff]){2}",$="[\\ud800-\\udbff][\\udc00-\\udfff]",a="[A-Z\\xc0-\\xd6\\xd8-\\xde]",r=`(?:${e}|${n})`,c=`(?:${a}|${n})`,b="(?:[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff\\u1ab0-\\u1aff\\u1dc0-\\u1dff]|\\ud83c[\\udffb-\\udfff])?",o="[\\ufe0e\\ufe0f]?"+b+`(?:\\u200d(?:${["[^\\ud800-\\udfff]",t,$].join("|")})${"[\\ufe0e\\ufe0f]?"+b})*`,i=`(?:${[x,t,$].join("|")})${o}`,s=RegExp([`${a}?${e}+(?:['’](?:d|ll|m|re|s|t|ve))?(?=${[d,a,"$"].join("|")})`,`${c}+(?:['’](?:D|LL|M|RE|S|T|VE))?(?=${[d,a+r,"$"].join("|")})`,`${a}?${r}+(?:['’](?:d|ll|m|re|s|t|ve))?`,`${a}+(?:['’](?:D|LL|M|RE|S|T|VE))?`,"\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])","\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])","\\d+",i].join("|"),"g");const z=RegExp.prototype.test.bind(/[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/),A=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;return f.words=function(f,u){if(void 0===u)return(z(f)?function(f){return f.match(s)}(f):function(f){return f.match(A)}(f))||[];return f.match(u)||[]}});
//# sourceMappingURL=sourcemaps/words.js.map
