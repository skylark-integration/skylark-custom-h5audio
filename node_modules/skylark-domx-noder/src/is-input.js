define([
	"./noder",
    "./is-editable"
],function(noder,isEditable){
 
    function isInput (el) { 
        return el.tagName === 'INPUT' || 
               el.tagName === 'TEXTAREA' || 
               el.tagName === 'SELECT' || 
               isEditable(el); 
    }
	
	return noder.isInput = isInput;
});