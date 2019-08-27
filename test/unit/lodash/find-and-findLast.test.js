var assert = require('assert');
var LARGE_ARRAY_SIZE = require('../helpers/largeArraySize');
var square = require('../helpers/square');
var isEven = require('../helpers/isEven');
var _ = require('../../../cartridges/lodash/wrapperLodash');
var each = require('../../../cartridges/lodash/each');
var range = require('../../../cartridges/lodash/range');

describe('find and findLast', function () {
    each(['find', 'findLast'], function (methodName) {
        var isFind = methodName === 'find';

        it('`_.' + methodName + '` should support shortcut fusion', function () {
            var findCount = 0;

            var array = range(1, LARGE_ARRAY_SIZE + 1);
            var iteratee = function (value) { return square(value); };
            var predicate = function (value) { findCount++; return isEven(value); };
            var actual = _(array).map(iteratee)[methodName](predicate).value();

            assert.strictEqual(findCount, isFind ? 2 : 1);
            assert.strictEqual(actual, isFind ? 4 : square(LARGE_ARRAY_SIZE));
        });
    });
});
