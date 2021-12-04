define([
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