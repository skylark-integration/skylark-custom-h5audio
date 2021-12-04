/**
 * skylark-langx-arrays - The skylark JavaScript language extension library.
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

define('skylark-langx-arrays/arrays',[
  "skylark-langx-ns"
],function(skylark){
    return skylark.attach("langx.arrays");
});
define('skylark-langx-arrays/base-find-index',[
  "./arrays"
],function(arrays){
    /**
     * The base implementation of `_.findIndex` and `_.findLastIndex` without
     * support for iteratee shorthands.
     *
     * @param {Array} array The array to inspect.
     * @param {Function} predicate The function invoked per iteration.
     * @param {number} fromIndex The index to search from.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */
    function baseFindIndex(array, predicate, fromIndex, fromRight) {
      var length = array.length,
          index = fromIndex + (fromRight ? 1 : -1);

      while ((fromRight ? index-- : ++index < length)) {
        if (predicate(array[index], index, array)) {
          return index;
        }
      }
      return -1;
    }

    return arrays.baseFindIndex = baseFindIndex;
});
define('skylark-langx-arrays/base-indexof',[
  "./arrays",
  "./base-find-index"
],function(arrays,baseFindIndex){

    /**
     * The base implementation of `isNaN` without support for number objects.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
     */
    function baseIsNaN(value) {
      return value !== value;
    }

    /**
     * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
     *
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @param {number} fromIndex The index to search from.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */
    function baseIndexOf(array, value, fromIndex) {
      if (value !== value) {
        return baseFindIndex(array, baseIsNaN, fromIndex);
      }
      var index = fromIndex - 1,
          length = array.length;

      while (++index < length) {
        if (array[index] === value) {
          return index;
        }
      }
      return -1;
    }
	
	return arrays.baseIndexOf = baseIndexOf;
});
define('skylark-langx-arrays/filter',[
  "./arrays"
],function(arrays){
   var _filter = Array.prototype.filter;
 
    function filter(array,func) {
      return _filter.call(array,func);
    }

    return arrays.filter = filter;
	
});
define('skylark-langx-arrays/compact',[
  "./arrays",
  "./filter"
],function(arrays,filter){

    function compact(array) {
        return filter(array, function(item) {
            return item != null;
        });
    }

    return arrays.compact = compact;
});
define('skylark-langx-arrays/in-array',[
  "./arrays"
],function(arrays){
    function inArray(item, array) {
        if (!array) {
            return -1;
        }
        var i;

        if (array.indexOf) {
            return array.indexOf(item);
        }

        i = array.length;
        while (i--) {
            if (array[i] === item) {
                return i;
            }
        }

        return -1;
    }

    return arrays.inArray = inArray;
	
});
define('skylark-langx-arrays/contains',[
  "./arrays",
  "./in-array"
],function(arrays,inArray){

    function contains(array,item) {
      return inArray(item,array);
    }
	
	return arrays.contains = contains;
});
define('skylark-langx-arrays/flatten',[
  "skylark-langx-types",
  "./arrays"
],function(types,arrays){

    function flatten(array) {
        if (types.isArrayLike(array)) {
            var result = [];
            for (var i = 0; i < array.length; i++) {
                var item = array[i];
                if (types.isArrayLike(item)) {
                    for (var j = 0; j < item.length; j++) {
                        result.push(item[j]);
                    }
                } else {
                    result.push(item);
                }
            }
            return result;
        } else {
            return array;
        }
        //return array.length > 0 ? concat.apply([], array) : array;
    }

    return arrays.flatten = flatten;
});
define('skylark-langx-arrays/difference',[
  "skylark-langx-funcs",
  "./arrays",
  "./flatten",
  "./filter",
  "./contains"
],function(funcs,arrays,flatten,filter,contains){
   // Take the difference between one array and a number of other arrays.
    // Only the elements present in just the first array will remain.
    var difference  = funcs.restArguments(function(array, rest) {
      rest = flatten(rest, true, true);
      return filter(array, function(value){
        return !contains(rest, value);
      });
    });

    return arrays.difference = difference;
	
});
define('skylark-langx-arrays/find',[
  "./arrays"
],function(arrays){
    var _find = Array.prototype.find;

    function find(array,func) {
      return _find.call(array,func);
    }

    return arrays.find = find;
});
define('skylark-langx-arrays/first',[
  "./arrays"
],function(arrays){
    function first(items,n) {
      if (n) {
          return items.slice(0,n);
      } else {
          return items[0];
      }
    }

    return arrays.first = first;
});
define('skylark-langx-arrays/grep',[
  "skylark-langx-objects",
  "./arrays"
],function(objects,arrays){
    function grep(array, callback) {
        var out = [];

        objects.each(array, function(i, item) {
            if (callback(item, i)) {
                out.push(item);
            }
        });

        return out;
    }

    return arrays.grep = grep;
});
define('skylark-langx-arrays/indexof',[
  "./arrays"
],function(arrays){

    function indexOf(array,item) {
      return array.indexOf(item);
    }

    return arrays.indexOf = indexOf;
});
define('skylark-langx-arrays/last',[
  "./arrays"
],function(arrays){
    // Get the last element of an array. 
    function last(arr) {
        return arr[arr.length - 1];     
    }

    return arrays.last = last;
});
define('skylark-langx-arrays/make-array',[
	"skylark-langx-types",
 	"./arrays"
],function(types,arrays){
    function makeArray(obj, offset, startWith) {
       if (types.isArrayLike(obj) ) {
        return (startWith || []).concat(Array.prototype.slice.call(obj, offset || 0));
      }

      // array of single index
      return [ obj ];             
    }

	return arrays.makeArray = makeArray;	
});
define('skylark-langx-arrays/map',[
	"skylark-langx-types",
  	"./arrays",
  	"./flatten"
],function(types,arrays,flatten){
    function map(elements, callback) {
        var value, values = [],
            i, key
        if (types.isArrayLike(elements))
            for (i = 0; i < elements.length; i++) {
                value = callback.call(elements[i], elements[i], i);
                if (value != null) values.push(value)
            }
        else
            for (key in elements) {
                value = callback.call(elements[key], elements[key], key);
                if (value != null) values.push(value)
            }
        return flatten(values)
    }

    return arrays.map = map;
});
define('skylark-langx-arrays/merge',[
  "./arrays"
],function(arrays){

    function merge( first, second ) {
      var l = second.length,
          i = first.length,
          j = 0;

      if ( typeof l === "number" ) {
        for ( ; j < l; j++ ) {
          first[ i++ ] = second[ j ];
        }
      } else {
        while ( second[j] !== undefined ) {
          first[ i++ ] = second[ j++ ];
        }
      }

      first.length = i;

      return first;
    }

    return arrays.merge = merge;
	
});
define('skylark-langx-arrays/pull-at',[
  "skylark-langx-types",
  "skylark-langx-objects",
  "./arrays"
],function(types,objects,arrays){

	/**
	 * Removes elements from `array` corresponding to `indexes` and returns an
	 * array of removed elements.
	 *
	 * **Note:** Unlike `at`, this method mutates `array`.
	 *
	 * @category Array
	 * @param {Array} array The array to modify.
	 * @param {...(number|number[])} [indexes] The indexes of elements to remove.
	 * @returns {Array} Returns the new array of removed elements.
	 * @see pull, pullAll, pullAllBy, pullAllWith, remove, reject
	 * @example
	 *
	 * const array = ['a', 'b', 'c', 'd']
	 * const pulled = pullAt(array, [1, 3])
	 *
	 * console.log(array)
	 * // => ['a', 'c']
	 *
	 * console.log(pulled)
	 * // => ['b', 'd']
	 */
	function pullAt(array, ...indexes) {
	  const length = array == null ? 0 : array.length
	  const result = objects.baseAt(array, indexes)

	  indexes.sort(function(a, b) {
  		return a - b;
	  });

	  for (let i= indexes.length-1;i>=0;i--) {
	  	array.slice(indexes[i],1);
	  }

	  return result
	}

	return arrays.pullAt = pullAt;
});

define('skylark-langx-arrays/reduce',[
  "./arrays"
],function(arrays){

    function reduce(array,callback,initialValue) {
        return Array.prototype.reduce.call(array,callback,initialValue);
    }

    return arrays.reduce = reduce;	
});
define('skylark-langx-arrays/uniq',[
  "./arrays",
  "./filter"
],function(arrays,filter){

    function uniq(array) {
        return filter.call(array, function(item, idx) {
            return array.indexOf(item) == idx;
        })
    }
	
	return arrays.uniq = uniq;
});
define('skylark-langx-arrays/without',[
	"skylark-langx-funcs",
  "./arrays",
  "./difference"
],function(funcs,arrays,difference){

    // Return a version of the array that does not contain the specified value(s).
    var without = funcs.restArguments(function(array, otherArrays) {
      return difference(array, otherArrays);
    });

    return arrays.without = without;
});
define('skylark-langx-arrays/main',[
	"./arrays",
	"./base-find-index",
	"./base-indexof",
	"./compact",
	"./contains",
	"./difference",
	"./filter",
	"./find",
	"./first",
	"./flatten",
	"./grep",
	"./in-array",
	"./indexof",
	"./last",
	"./make-array",
	"./map",
	"./merge",
	"./pull-at",
	"./reduce",
	"./uniq",
	"./without"
],function(arrays){
	return arrays;
});
define('skylark-langx-arrays', ['skylark-langx-arrays/main'], function (main) { return main; });


},this);
//# sourceMappingURL=sourcemaps/skylark-langx-arrays.js.map
