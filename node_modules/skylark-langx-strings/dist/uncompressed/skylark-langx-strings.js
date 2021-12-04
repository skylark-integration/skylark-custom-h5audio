/**
 * skylark-langx-strings - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
(function(factory,globals) {
  var define = globals.define,
      require = globals.require,
      isAmd = (typeof define === 'function' && define.amd),
      isCmd = (!isAmd && typeof exports !== 'undefined');

  if (!isAmd && !define) {
    var map = {};
    function absolute(relative, base) {
        if (relative[0]!==".") {
          return relative;
        }
        var stack = base.split("/"),
            parts = relative.split("/");
        stack.pop(); 
        for (var i=0; i<parts.length; i++) {
            if (parts[i] == ".")
                continue;
            if (parts[i] == "..")
                stack.pop();
            else
                stack.push(parts[i]);
        }
        return stack.join("/");
    }
    define = globals.define = function(id, deps, factory) {
        if (typeof factory == 'function') {
            map[id] = {
                factory: factory,
                deps: deps.map(function(dep){
                  return absolute(dep,id);
                }),
                resolved: false,
                exports: null
            };
            require(id);
        } else {
            map[id] = {
                factory : null,
                resolved : true,
                exports : factory
            };
        }
    };
    require = globals.require = function(id) {
        if (!map.hasOwnProperty(id)) {
            throw new Error('Module ' + id + ' has not been defined');
        }
        var module = map[id];
        if (!module.resolved) {
            var args = [];

            module.deps.forEach(function(dep){
                args.push(require(dep));
            })

            module.exports = module.factory.apply(globals, args) || null;
            module.resolved = true;
        }
        return module.exports;
    };
  }
  
  if (!define) {
     throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");
  }

  factory(define,require);

  if (!isAmd) {
    var skylarkjs = require("skylark-langx-ns");

    if (isCmd) {
      module.exports = skylarkjs;
    } else {
      globals.skylarkjs  = skylarkjs;
    }
  }

})(function(define,require) {

define('skylark-langx-strings/strings',[
    "skylark-langx-ns"
],function(skylark){
    return skylark.attach("langx.strings");
});
define('skylark-langx-strings/base64',[
	"./strings"
],function(strings) {

	// private property
	const _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

	// private method for UTF-8 encoding
	function _utf8_encode(string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";

		for (var n = 0; n < string.length; n++) {

			var c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}

		return utftext;
	}

	// private method for UTF-8 decoding
	function _utf8_decode(utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;

		while ( i < utftext.length ) {

			c = utftext.charCodeAt(i);

			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}

		}

		return string;
	}

	// public method for encoding
	function encode(input, binary) {
		binary = (binary != null) ? binary : false;
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;

		if (!binary)
		{
			input = _utf8_encode(input);
		}

		while (i < input.length) {

			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);

			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;

			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}

			output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

		}

		return output;
	}

	// public method for decoding
	function decode(input, binary) {
		binary = (binary != null) ? binary : false;
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;

		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

		while (i < input.length) {

			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));

			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;

			output = output + String.fromCharCode(chr1);

			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}

		}

		if (!binary) {
			output = _utf8_decode(output);
		}

		return output;

	}


	return strings.base64 = {
		decode,
		encode
	};
	
});
define('skylark-langx-strings/camel-case',[
	"./strings"
],function(strings){
    function camelCase(str) {
        return str.replace(/-([\da-z])/g, function(a) {
            return a.toUpperCase().replace('-', '');
        });
    }

	
	return strings.camelCase = camelCase;
});
define('skylark-langx-strings/dasherize',[
	"./strings"
],function(strings){
     /*
     * Converts camel case into dashes.
     * @param {String} str
     * @return {String}
     * @exapmle marginTop -> margin-top
     */
    function dasherize(str) {
        return str.replace(/::/g, '/')
            .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
            .replace(/([a-z\d])([A-Z])/g, '$1_$2')
            .replace(/_/g, '-')
            .toLowerCase();
    }

	
	return strings.dasherize = dasherize;
});
define('skylark-langx-strings/deserialize-value',[
	"./strings"
],function(strings){
    function deserializeValue(value) {
        try {
            return value ?
                value == "true" ||
                (value == "false" ? false :
                    value == "null" ? null :
                    +value + "" == value ? +value :
                    /^[\[\{]/.test(value) ? JSON.parse(value) :
                    value) : value;
        } catch (e) {
            return value;
        }
    }



	
	return strings.deserializeValue = deserializeValue;
});
define('skylark-langx-strings/escape-html',[
	"./strings"
],function(strings){
    // add default escape function for escaping HTML entities
    var escapeCharMap = Object.freeze({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '`': '&#x60;',
        '=': '&#x3D;',
    });
    function replaceChar(c) {
        return escapeCharMap[c];
    }
    var escapeChars = /[&<>"'`=]/g;

    function escapeHTML(str) {
        if (str == null) {
            return '';
        }
        if (!str) {
            return String(str);
        }

        return str.toString().replace(escapeChars, replaceChar);
    }

	
	return strings.escapeHTML = escapeHTML;
});
define('skylark-langx-strings/generate-uuid',[
	"./strings"
],function(strings){
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0;
            var v = c === 'x' ? r : ((r & 0x3) | 0x8);
            return v.toString(16);
        });
    }

	return strings.generateUUID = generateUUID;
});
define('skylark-langx-strings/lower-first',[
	"./strings"
],function(strings){
    function lowerFirst(str) {
        return str.charAt(0).toLowerCase() + str.slice(1);
    }
	
	return strings.lowerFirst = lowerFirst;
});
define('skylark-langx-strings/ltrim',[
	"./strings"
],function(strings){

    function ltrim(str) {
        return str.replace(/^\s+/, '');
    }
	
	return strings.ltrim = ltrim;
});
define('skylark-langx-strings/rtrim',[
	"./strings"
],function(strings){
    function rtrim(str) {
        return str.replace(/\s+$/, '');
    }
	
	return strings.rtrim = rtrim;
});
define('skylark-langx-strings/serialize-value',[
	"./strings"
],function(strings){
    function serializeValue(value) {
        return JSON.stringify(value)
    }
	
	return strings.serializeValue = serializeValue;
});
define('skylark-langx-strings/slugify',[
	"./strings"
],function(strings){
    // Slugify a string
    function slugify(str) {
        str = str.replace(/^\s+|\s+$/g, '');

        // Make the string lowercase
        str = str.toLowerCase();

        // Remove accents, swap ñ for n, etc
        var from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;";
        var to   = "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";
        for (var i=0, l=from.length ; i<l ; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }

        // Remove invalid chars
        //str = str.replace(/[^a-z0-9 -]/g, '') 
        // Collapse whitespace and replace by -
        str = str.replace(/\s+/g, '-') 
        // Collapse dashes
        .replace(/-+/g, '-'); 

        return str;
    }    

	return strings.slugify = slugify;
});
define('skylark-langx-strings/substitute',[
	"./strings"
],function(strings){
    function substitute( /*String*/ template,
        /*Object|Array*/
        map,
        /*Function?*/
        transform,
        /*Object?*/
        thisObject) {
        // summary:
        //    Performs parameterized substitutions on a string. Throws an
        //    exception if any parameter is unmatched.
        // template:
        //    a string with expressions in the form `${key}` to be replaced or
        //    `${key:format}` which specifies a format function. keys are case-sensitive.
        // map:
        //    hash to search for substitutions
        // transform:
        //    a function to process all parameters before substitution takes


        thisObject = thisObject || window;
        transform = transform ?
            proxy(thisObject, transform) : function(v) {
                return v;
            };

        function getObject(key, map) {
            if (key.match(/\./)) {
                var retVal,
                    getValue = function(keys, obj) {
                        var _k = keys.pop();
                        if (_k) {
                            if (!obj[_k]) return null;
                            return getValue(keys, retVal = obj[_k]);
                        } else {
                            return retVal;
                        }
                    };
                return getValue(key.split(".").reverse(), map);
            } else {
                return map[key];
            }
        }

        return template.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,
            function(match, key, format) {
                var value = getObject(key, map);
                if (format) {
                    value = getObject(format, thisObject).call(thisObject, value, key);
                }
                return transform(value, key).toString();
            }); // String
    }

	return strings.substitute = substitute;
});
define('skylark-langx-strings/trim-null',[
	"./strings"
],function(strings){
    const NullCharactersRegExp = /\x00/g;

    /**
     * @param {string} str
     */
    function trimNull(str) {
      if (typeof str !== "string") {
        warn("The argument for removeNullCharacters must be a string.");
        return str;
      }
      return str.replace(NullCharactersRegExp, "");
    }

	
	return strings.trimNull = trimNull;
});
define('skylark-langx-strings/unique-id',[
	"./strings"
],function(strings){

    var idCounter = 0;
    function uniqueId (prefix) {
        var id = ++idCounter + '';
        return prefix ? prefix + id : id;
    }

	return strings.uniqueId = uniqueId;
});
define('skylark-langx-strings/upper-first',[
	"./strings"
],function(strings){

    function upperFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
	
	return strings.upperFirst = upperFirst;
});
define('skylark-langx-strings/words',[
	"./strings"
],function(strings){
	/** Used to compose unicode character classes. */
	const rsAstralRange = '\\ud800-\\udfff'
	const rsComboMarksRange = '\\u0300-\\u036f'
	const reComboHalfMarksRange = '\\ufe20-\\ufe2f'
	const rsComboSymbolsRange = '\\u20d0-\\u20ff'
	const rsComboMarksExtendedRange = '\\u1ab0-\\u1aff'
	const rsComboMarksSupplementRange = '\\u1dc0-\\u1dff'
	const rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange + rsComboMarksExtendedRange + rsComboMarksSupplementRange
	const rsDingbatRange = '\\u2700-\\u27bf'
	const rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff'
	const rsMathOpRange = '\\xac\\xb1\\xd7\\xf7'
	const rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf'
	const rsPunctuationRange = '\\u2000-\\u206f'
	const rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000'
	const rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde'
	const rsVarRange = '\\ufe0e\\ufe0f'
	const rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange

	/** Used to compose unicode capture groups. */
	const rsApos = "['\u2019]"
	const rsBreak = `[${rsBreakRange}]`
	const rsCombo = `[${rsComboRange}]`
	const rsDigit = '\\d'
	const rsDingbat = `[${rsDingbatRange}]`
	const rsLower = `[${rsLowerRange}]`
	const rsMisc = `[^${rsAstralRange}${rsBreakRange + rsDigit + rsDingbatRange + rsLowerRange + rsUpperRange}]`
	const rsFitz = '\\ud83c[\\udffb-\\udfff]'
	const rsModifier = `(?:${rsCombo}|${rsFitz})`
	const rsNonAstral = `[^${rsAstralRange}]`
	const rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}'
	const rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]'
	const rsUpper = `[${rsUpperRange}]`
	const rsZWJ = '\\u200d'

	/** Used to compose unicode regexes. */
	const rsMiscLower = `(?:${rsLower}|${rsMisc})`
	const rsMiscUpper = `(?:${rsUpper}|${rsMisc})`
	const rsOptContrLower = `(?:${rsApos}(?:d|ll|m|re|s|t|ve))?`
	const rsOptContrUpper = `(?:${rsApos}(?:D|LL|M|RE|S|T|VE))?`
	const reOptMod = `${rsModifier}?`
	const rsOptVar = `[${rsVarRange}]?`
	const rsOptJoin = `(?:${rsZWJ}(?:${[rsNonAstral, rsRegional, rsSurrPair].join('|')})${rsOptVar + reOptMod})*`
	const rsOrdLower = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])'
	const rsOrdUpper = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])'
	const rsSeq = rsOptVar + reOptMod + rsOptJoin
	const rsEmoji = `(?:${[rsDingbat, rsRegional, rsSurrPair].join('|')})${rsSeq}`

	const reUnicodeWords = RegExp([
	  `${rsUpper}?${rsLower}+${rsOptContrLower}(?=${[rsBreak, rsUpper, '$'].join('|')})`,
	  `${rsMiscUpper}+${rsOptContrUpper}(?=${[rsBreak, rsUpper + rsMiscLower, '$'].join('|')})`,
	  `${rsUpper}?${rsMiscLower}+${rsOptContrLower}`,
	  `${rsUpper}+${rsOptContrUpper}`,
	  rsOrdUpper,
	  rsOrdLower,
	  `${rsDigit}+`,
	  rsEmoji
	].join('|'), 'g')

	/**
	 * Splits a Unicode `string` into an array of its words.
	 *
	 * @private
	 * @param {string} The string to inspect.
	 * @returns {Array} Returns the words of `string`.
	 */
	function unicodeWords(string) {
	  return string.match(reUnicodeWords)
	}


	const hasUnicodeWord = RegExp.prototype.test.bind(
	  /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/
	)

	/** Used to match words composed of alphanumeric characters. */
	const reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g

	function asciiWords(string) {
	  return string.match(reAsciiWord)
	}

	/**
	 * Splits `string` into an array of its words.
	 *
	 * @since 3.0.0
	 * @category String
	 * @param {string} [string=''] The string to inspect.
	 * @param {RegExp|string} [pattern] The pattern to match words.
	 * @returns {Array} Returns the words of `string`.
	 * @example
	 *
	 * words('fred, barney, & pebbles')
	 * // => ['fred', 'barney', 'pebbles']
	 *
	 * words('fred, barney, & pebbles', /[^, ]+/g)
	 * // => ['fred', 'barney', '&', 'pebbles']
	 */
	function words(string, pattern) {
	  if (pattern === undefined) {
	    const result = hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string)
	    return result || []
	  }
	  return string.match(pattern) || []
	}

	
	return strings.words = words;
});
define('skylark-langx-strings/main',[
	"./strings",
	"./base64",
	"./camel-case",
	"./dasherize",
	"./deserialize-value",
	"./escape-html",
	"./generate-uuid",
	"./lower-first",
	"./ltrim",
	"./rtrim",
	"./serialize-value",
	"./slugify",
	"./substitute",
	"./trim-null",
	"./unique-id",
	"./upper-first",
	"./words"
],function(strings){
	return strings;
});
define('skylark-langx-strings', ['skylark-langx-strings/main'], function (main) { return main; });


},this);
//# sourceMappingURL=sourcemaps/skylark-langx-strings.js.map
