var assert = require('assert');
var slice = Array.prototype.slice;
var map = require('../../../cartridges/lodash/map');
var each = require('../../../cartridges/lodash/each');
var constant = require('../../../cartridges/lodash/constant');
var isEqualWith = require('../../../cartridges/lodash/isEqualWith');
var isString = require('../../../cartridges/lodash/isString');
var without = require('../../../cartridges/lodash/without');
var partial = require('../../../cartridges/lodash/partial');
var stubC = require('../helpers/stubs').stubC;
var stubFalse = require('../helpers/stubs').false;
var noop = require('../helpers/stubs').noop;
var falsey = require('../helpers/falsey');


describe('isEqualWith', function () {
    it('should provide correct `customizer` arguments', function () {
        var argsList = [];
        var object1 = { 'a': [1, 2], 'b': null };
        var object2 = { 'a': [1, 2], 'b': null };

        object1.b = object2;
        object2.b = object1;

        var expected = [
            [object1, object2],
            [object1.a, object2.a, 'a', object1, object2],
            [object1.a[0], object2.a[0], 0, object1.a, object2.a],
            [object1.a[1], object2.a[1], 1, object1.a, object2.a],
            [object1.b, object2.b, 'b', object1.b, object2.b]
        ];

        isEqualWith(object1, object2, function () {
            var length = arguments.length;
            var args = slice.call(arguments, 0, length - (length > 2 ? 1 : 0));

            argsList.push(args);
        });

        assert.deepStrictEqual(argsList, expected);
    });

    it('should handle comparisons when `customizer` returns `undefined`', function () {
        assert.strictEqual(isEqualWith('a', 'a', noop), true);
        assert.strictEqual(isEqualWith(['a'], ['a'], noop), true);
        assert.strictEqual(isEqualWith({ '0': 'a' }, { '0': 'a' }, noop), true);
    });

    it('should not handle comparisons when `customizer` returns `true`', function () {
        var customizer = function (value) {
            return isString(value) || undefined;
        };

        assert.strictEqual(isEqualWith('a', 'b', customizer), true);
        assert.strictEqual(isEqualWith(['a'], ['b'], customizer), true);
        assert.strictEqual(isEqualWith({ '0': 'a' }, { '0': 'b' }, customizer), true);
    });

    it('should not handle comparisons when `customizer` returns `false`', function () {
        var customizer = function (value) {
            return isString(value) ? false : undefined;
        };

        assert.strictEqual(isEqualWith('a', 'a', customizer), false);
        assert.strictEqual(isEqualWith(['a'], ['a'], customizer), false);
        assert.strictEqual(isEqualWith({ '0': 'a' }, { '0': 'a' }, customizer), false);
    });

    it('should return a boolean value even when `customizer` does not', function () {
        var actual = isEqualWith('a', 'b', stubC);
        assert.strictEqual(actual, true);

        var values = without(falsey, undefined);
        var expected = map(values, stubFalse);

        actual = [];
        each(values, function (value) {
            actual.push(isEqualWith('a', 'a', constant(value)));
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should ensure `customizer` is a function', function () {
        var array = [1, 2, 3];
        var eq = partial(isEqualWith, array);
        var actual = map([array, [1, 0, 3]], eq);

        assert.deepStrictEqual(actual, [true, false]);
    });
});
