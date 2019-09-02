var assert = require('assert');
var parseInt = require('../../../cartridges/lodash/parseInt');
var map = require('../../../cartridges/lodash/map');
var range = require('../../../cartridges/lodash/range');
var each = require('../../../cartridges/lodash/each');
var times = require('../../../cartridges/lodash/times');
var whitespace = require('../helpers/whitespace');
var { stubZero } = require('../helpers/stubs');

describe('parseInt', function () {
    it('should accept a `radix`', function () {
        var expected = range(2, 37);

        var actual = map(expected, function (radix) {
            return parseInt('10', radix);
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should use a radix of `10`, for non-hexadecimals, if `radix` is `undefined` or `0`', function () {
        assert.strictEqual(parseInt('10'), 10);
        assert.strictEqual(parseInt('10', 0), 10);
        assert.strictEqual(parseInt('10', 10), 10);
        assert.strictEqual(parseInt('10', undefined), 10);
    });

    it('should use a radix of `16`, for hexadecimals, if `radix` is `undefined` or `0`', function () {
        each(['0x20', '0X20'], function (string) {
            assert.strictEqual(parseInt(string), 32);
            assert.strictEqual(parseInt(string, 0), 32);
            assert.strictEqual(parseInt(string, 16), 32);
            assert.strictEqual(parseInt(string, undefined), 32);
        });
    });

    it('should use a radix of `10` for string with leading zeros', function () {
        assert.strictEqual(parseInt('08'), 8);
        assert.strictEqual(parseInt('08', 10), 8);
    });

    it('should parse strings with leading whitespace', function () {
        var expected = [8, 8, 10, 10, 32, 32, 32, 32];

        times(2, function () {
            var actual = [];
            var func = parseInt;

            if (func) {
                times(2, function (otherIndex) {
                    var string = otherIndex ? '10' : '08';
                    actual.push(
                        func(whitespace + string, 10),
                        func(whitespace + string)
                    );
                });

                each(['0x20', '0X20'], function (string) {
                    actual.push(
                        func(whitespace + string),
                        func(whitespace + string, 16)
                    );
                });

                assert.deepStrictEqual(actual, expected);
            }
        });
    });

    it('should coerce `radix` to a number', function () {
        var object = { 'valueOf': stubZero };
        assert.strictEqual(parseInt('08', object), 8);
        assert.strictEqual(parseInt('0x20', object), 32);
    });

    it('should work as an iteratee for methods like `_.map`', function () {
        var strings = map(['6', '08', '10'], Object);
        var actual = map(strings, parseInt);

        assert.deepStrictEqual(actual, [6, 8, 10]);

        actual = map('123', parseInt);
        assert.deepStrictEqual(actual, [1, 2, 3]);
    });
});
