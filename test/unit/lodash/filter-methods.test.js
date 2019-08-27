var assert = require('assert');
var isEven = require('../helpers/isEven');
var range = require('../../../cartridges/lodash/range');
var map = require('../../../cartridges/lodash/map');
var each = require('../../../cartridges/lodash/each');
var filter = require('../../../cartridges/lodash/filter');
var reject = require('../../../cartridges/lodash/reject');
var zipObject = require('../../../cartridges/lodash/zipObject');
var times = require('../../../cartridges/lodash/times');
var mapValues = require('../../../cartridges/lodash/mapValues');
var _ = require('../../../cartridges/lodash/wrapperLodash');
var LARGE_ARRAY_SIZE = require('../helpers/largeArraySize');
var square = require('../helpers/square');
var slice = Array.prototype.slice;

describe('filter methods', function () {
    each(['filter', 'reject'], function (methodName) {
        var array = [1, 2, 3, 4];
        var func = (function () {
            switch (methodName) {
                case 'filter': return filter;
                case 'reject': return reject;

                default: return null;
            }
        }());
        var isFilter = methodName === 'filter';
        var objects = [{ 'a': 0 }, { 'a': 1 }];

        it('`_.' + methodName + '` should not modify the resulting value from within `predicate`', function () {
            var actual = func([0], function (value, index, funcArray) {
                funcArray[index] = 1; // eslint-disable-line
                return isFilter;
            });

            assert.deepStrictEqual(actual, [0]);
        });

        it('`_.' + methodName + '` should work with `_.property` shorthands', function () {
            assert.deepStrictEqual(func(objects, 'a'), [objects[isFilter ? 1 : 0]]);
        });

        it('`_.' + methodName + '` should work with `_.matches` shorthands', function () {
            assert.deepStrictEqual(func(objects, objects[1]), [objects[isFilter ? 1 : 0]]);
        });

        it('`_.' + methodName + '` should not modify wrapped values', function () {
            var wrapped = _(array);

            var actual = wrapped[methodName](function (n) {
                return n < 3;
            });

            assert.deepEqual(actual.value(), isFilter ? [1, 2] : [3, 4]);

            actual = wrapped[methodName](function (n) {
                return n > 2;
            });

            assert.deepEqual(actual.value(), isFilter ? [3, 4] : [1, 2]);
        });

        it('`_.' + methodName + '` should work in a lazy sequence', function () {
            array = range(LARGE_ARRAY_SIZE + 1);
            var predicate = function (value) { return isFilter ? isEven(value) : !isEven(value); };

            var object = zipObject(times(LARGE_ARRAY_SIZE, function (index) {
                return ['key' + index, index];
            }));

            var actual = _(array).slice(1).map(square)[methodName](predicate)
                .value();
            assert.deepEqual(actual, func(map(array.slice(1), square), predicate));

            actual = _(object).mapValues(square)[methodName](predicate).value();
            assert.deepEqual(actual, func(mapValues(object, square), predicate));
        });
    });
});
