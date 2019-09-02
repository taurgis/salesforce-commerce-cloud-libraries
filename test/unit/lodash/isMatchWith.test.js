var assert = require('assert');
var { stubFalse, stubA, falsey, noop } = require('../helpers/stubs');
var isMatchWith = require('../../../cartridges/lodash/isMatchWith');
var isString = require('../../../cartridges/lodash/isString');
var map = require('../../../cartridges/lodash/map');
var each = require('../../../cartridges/lodash/each');
var constant = require('../../../cartridges/lodash/constant');
var partial = require('../../../cartridges/lodash/partial');
var slice = Array.prototype.slice;

describe('isMatchWith', function () {
    it('should provide correct `customizer` arguments', function () {
        var argsList = [];
        var object1 = { 'a': [1, 2], 'b': null };
        var object2 = { 'a': [1, 2], 'b': null };

        object1.b = object2;
        object2.b = object1;

        var expected = [
            [object1.a, object2.a, 'a', object1, object2],
            [object1.a[0], object2.a[0], 0, object1.a, object2.a],
            [object1.a[1], object2.a[1], 1, object1.a, object2.a],
            [object1.b, object2.b, 'b', object1, object2],
            [object1.b.a, object2.b.a, 'a', object1.b, object2.b],
            [object1.b.a[0], object2.b.a[0], 0, object1.b.a, object2.b.a],
            [object1.b.a[1], object2.b.a[1], 1, object1.b.a, object2.b.a],
            [object1.b.b, object2.b.b, 'b', object1.b, object2.b]
        ];

        isMatchWith(object1, object2, function () {
            argsList.push(slice.call(arguments, 0, -1));
        });

        assert.deepStrictEqual(argsList, expected);
    });

    it('should handle comparisons when `customizer` returns `undefined`', function () {
        assert.strictEqual(isMatchWith({ 'a': 1 }, { 'a': 1 }, noop), true);
    });

    it('should not handle comparisons when `customizer` returns `true`', function () {
        var customizer = function (value) {
            return isString(value) || undefined;
        };

        assert.strictEqual(isMatchWith(['a'], ['b'], customizer), true);
        assert.strictEqual(isMatchWith({ '0': 'a' }, { '0': 'b' }, customizer), true);
    });

    it('should not handle comparisons when `customizer` returns `false`', function () {
        var customizer = function (value) {
            return isString(value) ? false : undefined;
        };

        assert.strictEqual(isMatchWith(['a'], ['a'], customizer), false);
        assert.strictEqual(isMatchWith({ '0': 'a' }, { '0': 'a' }, customizer), false);
    });

    it('should return a boolean value even when `customizer` does not', function () {
        var object = { 'a': 1 };
        var actual = isMatchWith(object, { 'a': 1 }, stubA);

        assert.strictEqual(actual, true);

        var expected = map(falsey, stubFalse);

        actual = [];
        each(falsey, function (value) {
            actual.push(isMatchWith(object, { 'a': 2 }, constant(value)));
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should ensure `customizer` is a function', function () {
        var object = { 'a': 1 };
        var matches = partial(isMatchWith, object);
        var actual = map([object, { 'a': 2 }], matches);

        assert.deepStrictEqual(actual, [true, false]);
    });
});
