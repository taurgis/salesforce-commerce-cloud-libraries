var assert = require('assert');
var reduce = require('../../../cartridges/lodash/reduce');
var reduceRight = require('../../../cartridges/lodash/reduceRight');
var map = require('../../../cartridges/lodash/map');
var each = require('../../../cartridges/lodash/each');
var constant = require('../../../cartridges/lodash/constant');
var _ = require('../../../cartridges/lodash/wrapperLodash');
var { empties, noop } = require('../helpers/stubs');
var add = require('../helpers/add');

describe('reduce methods', function () {
    each(['reduce', 'reduceRight'], function (methodName) {
        var func = (methodName === 'reduce') ? reduce : reduceRight;
        var array = [1, 2, 3];
        var isReduce = methodName === 'reduce';

        it('`_.' + methodName + '` should reduce a collection to a single value', function () {
            var actual = func(['a', 'b', 'c'], function (accumulator, value) {
                return accumulator + value;
            }, '');

            assert.strictEqual(actual, isReduce ? 'abc' : 'cba');
        });

        it('`_.' + methodName + '` should support empty collections without an initial `accumulator` value', function () {
            var actual = [];
            var expected = map(empties, noop);

            each(empties, function (value) {
                try {
                    actual.push(func(value, noop));
                } catch (e) {
                    // DO NOTHING
                }
            });

            assert.deepStrictEqual(actual, expected);
        });

        it('`_.' + methodName + '` should support empty collections with an initial `accumulator` value', function () {
            var expected = map(empties, constant('x'));

            var actual = map(empties, function (value) {
                try {
                    return func(value, noop, 'x');
                } catch (e) {
                    // DO NOTHING
                }
            });

            assert.deepStrictEqual(actual, expected);
        });

        it('`_.' + methodName + '` should handle an initial `accumulator` value of `undefined`', function () {
            var actual = func([], noop, undefined);
            assert.strictEqual(actual, undefined);
        });

        it('`_.' + methodName + '` should return an unwrapped value when implicitly chaining', function () {
            assert.strictEqual(_(array)[methodName](add).value(), 6);
        });

        it('`_.' + methodName + '` should return a wrapped value when explicitly chaining', function () {
            assert.ok(_(array).chain()[methodName](add) instanceof _);
        });
    });
});
