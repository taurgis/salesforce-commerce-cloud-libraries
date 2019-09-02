var assert = require('assert');
var sortedIndexBy = require('../../../cartridges/lodash/sortedIndexBy');
var sortedLastIndexBy = require('../../../cartridges/lodash/sortedLastIndexBy');
var each = require('../../../cartridges/lodash/each');
var slice = Array.prototype.slice;

describe('sortedIndexBy methods', function () {
    each(['sortedIndexBy', 'sortedLastIndexBy'], function (methodName) {
        var func = (methodName === 'sortedIndexBy') ? sortedIndexBy : sortedLastIndexBy;

        it('`_.' + methodName + '` should provide correct `iteratee` arguments', function () {
            var args;

            func([30, 50], 40, function () {
                args || (args = slice.call(arguments));
            });

            assert.deepStrictEqual(args, [40]);
        });

        it('`_.' + methodName + '` should work with `_.property` shorthands', function () {
            var objects = [{ 'x': 30 }, { 'x': 50 }];
            var actual = func(objects, { 'x': 40 }, 'x');

            assert.strictEqual(actual, 1);
        });
    });
});
