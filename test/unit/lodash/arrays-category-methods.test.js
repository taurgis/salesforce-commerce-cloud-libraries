var assert = require('assert');
var toArgs = require('../helpers/toArgs');
var identity = require('../helpers/identity');
var difference = require('../../../cartridges/lodash/difference');
var union = require('../../../cartridges/lodash/union');
var compact = require('../../../cartridges/lodash/compact');
var drop = require('../../../cartridges/lodash/drop');
var dropRight = require('../../../cartridges/lodash/dropRight');
var dropRightWhile = require('../../../cartridges/lodash/dropRightWhile');
var dropWhile = require('../../../cartridges/lodash/dropWhile');
var findLastIndex = require('../../../cartridges/lodash/findLastIndex');
var flatten = require('../../../cartridges/lodash/flatten');
var head = require('../../../cartridges/lodash/head');
var indexOf = require('../../../cartridges/lodash/indexOf');
var initial = require('../../../cartridges/lodash/initial');
var intersection = require('../../../cartridges/lodash/intersection');
var last = require('../../../cartridges/lodash/last');
var lastIndexOf = require('../../../cartridges/lodash/lastIndexOf');
var sortedIndex = require('../../../cartridges/lodash/sortedIndex');
var sortedIndexOf = require('../../../cartridges/lodash/sortedIndexOf');
var sortedLastIndex = require('../../../cartridges/lodash/sortedLastIndex');
var sortedLastIndexOf = require('../../../cartridges/lodash/sortedLastIndexOf');
var tail = require('../../../cartridges/lodash/tail');
var take = require('../../../cartridges/lodash/take');
var takeRight = require('../../../cartridges/lodash/takeRight');
var takeRightWhile = require('../../../cartridges/lodash/takeRightWhile');
var takeWhile = require('../../../cartridges/lodash/takeWhile');
var uniq = require('../../../cartridges/lodash/uniq');
var without = require('../../../cartridges/lodash/without');
var zip = require('../../../cartridges/lodash/zip');
var xor = require('../../../cartridges/lodash/xor');

describe('"Arrays" category methods', function () {
    var args = toArgs([1, null, [3], null, 5]);
    var sortedArgs = toArgs([1, [3], 5, null, null]);
    var array = [1, 2, 3, 4, 5, 6];

    it('should work with `arguments` objects', function () {
        function message(methodName) {
            return '`_.' + methodName + '` should work with `arguments` objects';
        }

        assert.deepStrictEqual(difference(args, [null]), [1, [3], 5], message('difference'));
        assert.deepStrictEqual(difference(array, args), [2, 3, 4, 6], '_.difference should work with `arguments` objects as secondary arguments');

        assert.deepStrictEqual(union(args, [null, 6]), [1, null, [3], 5, 6], message('union'));
        assert.deepStrictEqual(union(array, args), array.concat([null, [3]]), '_.union should work with `arguments` objects as secondary arguments');

        assert.deepStrictEqual(compact(args), [1, [3], 5], message('compact'));
        assert.deepStrictEqual(drop(args, 3), [null, 5], message('drop'));
        assert.deepStrictEqual(dropRight(args, 3), [1, null], message('dropRight'));
        assert.deepStrictEqual(dropRightWhile(args, identity), [1, null, [3], null], message('dropRightWhile'));
        assert.deepStrictEqual(dropWhile(args, identity), [null, [3], null, 5], message('dropWhile'));
        assert.deepStrictEqual(findLastIndex(args, identity), 4, message('findLastIndex'));
        assert.deepStrictEqual(flatten(args), [1, null, 3, null, 5], message('flatten'));
        assert.deepStrictEqual(head(args), 1, message('head'));
        assert.deepStrictEqual(indexOf(args, 5), 4, message('indexOf'));
        assert.deepStrictEqual(initial(args), [1, null, [3], null], message('initial'));
        assert.deepStrictEqual(intersection(args, [1]), [1], message('intersection'));
        assert.deepStrictEqual(last(args), 5, message('last'));
        assert.deepStrictEqual(lastIndexOf(args, 1), 0, message('lastIndexOf'));
        assert.deepStrictEqual(sortedIndex(sortedArgs, 6), 3, message('sortedIndex'));
        assert.deepStrictEqual(sortedIndexOf(sortedArgs, 5), 2, message('sortedIndexOf'));
        assert.deepStrictEqual(sortedLastIndex(sortedArgs, 5), 3, message('sortedLastIndex'));
        assert.deepStrictEqual(sortedLastIndexOf(sortedArgs, 1), 0, message('sortedLastIndexOf'));
        assert.deepStrictEqual(tail(args, 4), [null, [3], null, 5], message('tail'));
        assert.deepStrictEqual(take(args, 2), [1, null], message('take'));
        assert.deepStrictEqual(takeRight(args, 1), [5], message('takeRight'));
        assert.deepStrictEqual(takeRightWhile(args, identity), [5], message('takeRightWhile'));
        assert.deepStrictEqual(takeWhile(args, identity), [1], message('takeWhile'));
        assert.deepStrictEqual(uniq(args), [1, null, [3], 5], message('uniq'));
        assert.deepStrictEqual(without(args, null), [1, [3], 5], message('without'));
        assert.deepStrictEqual(zip(args, args), [[1, 1], [null, null], [[3], [3]], [null, null], [5, 5]], message('zip'));
    });

    it('should accept falsey primary arguments', function () {
        function message(methodName) {
            return '`_.' + methodName + '` should accept falsey primary arguments';
        }

        assert.deepStrictEqual(difference(null, array), [], message('difference'));
        assert.deepStrictEqual(intersection(null, array), [], message('intersection'));
        assert.deepStrictEqual(union(null, array), array, message('union'));
        assert.deepStrictEqual(xor(null, array), array, message('xor'));
    });

    it('should accept falsey secondary arguments', function () {
        function message(methodName) {
            return '`_.' + methodName + '` should accept falsey secondary arguments';
        }

        assert.deepStrictEqual(difference(array, null), array, message('difference'));
        assert.deepStrictEqual(intersection(array, null), [], message('intersection'));
        assert.deepStrictEqual(union(array, null), array, message('union'));
    });
});
