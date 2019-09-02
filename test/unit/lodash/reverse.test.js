var assert = require('assert');
var reverse = require('../../../cartridges/lodash/reverse');
var compact = require('../../../cartridges/lodash/compact');
var head = require('../../../cartridges/lodash/head');
var range = require('../../../cartridges/lodash/range');
var identity = require('../../../cartridges/lodash/identity');
var times = require('../../../cartridges/lodash/times');
var each = require('../../../cartridges/lodash/each');
var _ = require('../../../cartridges/lodash/wrapperLodash');
var LARGE_ARRAY_SIZE = require('../helpers/largeArraySize');

describe('reverse', function () {
    var largeArray = range(LARGE_ARRAY_SIZE).concat(null);
    var smallArray = [0, 1, 2, null];

    it('should reverse `array`', function () {
        var array = [1, 2, 3];
        var actual = reverse(array);

        assert.strictEqual(actual, array);
        assert.deepStrictEqual(array, [3, 2, 1]);
    });

    it('should return the wrapped reversed `array`', function () {
        times(2, function (index) {
            var array = (index ? largeArray : smallArray).slice();
            var clone = array.slice();
            var wrapped = _(array).reverse();
            var actual = wrapped.value();

            assert.ok(wrapped instanceof _);
            assert.strictEqual(actual, array);
            assert.deepStrictEqual(actual, clone.slice().reverse());
        });
    });

    it('should work in a lazy sequence', function () {
        times(2, function (index) {
            var array = (index ? largeArray : smallArray).slice();
            var expected = array.slice();
            var actual = _(array).slice(1).reverse().value();

            assert.deepStrictEqual(actual, expected.slice(1).reverse());
            assert.deepStrictEqual(array, expected);
        });
    });

    it('should work in a hybrid sequence', function () {
        times(2, function (index) {
            var clone = (index ? largeArray : smallArray).slice();

            each(['map', 'filter'], function (methodName) {
                var array = clone.slice();
                var expected = clone.slice(1, -1).reverse();
                var actual = _(array)[methodName](identity).thru(compact).reverse()
                    .value();

                assert.deepStrictEqual(actual, expected);

                array = clone.slice();
                actual = _(array).thru(compact)[methodName](identity).pull(1)
                    .push(3)
                    .reverse()
                    .value();

                assert.deepStrictEqual(actual, [3].concat(expected.slice(0, -1)));
            });
        });
    });

    it('should track the `__chain__` value of a wrapper', function () {
        times(2, function (index) {
            var array = (index ? largeArray : smallArray).slice();
            var expected = array.slice().reverse();
            var wrapped = _(array).chain().reverse().head();

            assert.ok(wrapped instanceof _);
            assert.strictEqual(wrapped.value(), head(expected));
            assert.deepStrictEqual(array, expected);
        });
    });
});
