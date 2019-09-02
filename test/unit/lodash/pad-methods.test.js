var assert = require('assert');
var padEnd = require('../../../cartridges/lodash/padEnd');
var pad = require('../../../cartridges/lodash/pad');
var padStart = require('../../../cartridges/lodash/padStart');
var map = require('../../../cartridges/lodash/map');
var each = require('../../../cartridges/lodash/each');
var constant = require('../../../cartridges/lodash/constant');

describe('pad methods', function () {
    each(['pad', 'padStart', 'padEnd'], function (methodName) {
        var func = (function () {
            switch (methodName) {
                case 'pad': return pad;
                case 'padStart': return padStart;
                case 'padEnd': return padEnd;

                default: return null;
            }
        }());
        var isPad = methodName === 'pad';
        var isStart = methodName === 'padStart';
        var string = 'abc';

        it('`_.' + methodName + '` should not pad if string is >= `length`', function () {
            assert.strictEqual(func(string, 2), string);
            assert.strictEqual(func(string, 3), string);
        });

        it('`_.' + methodName + '` should treat negative `length` as `0`', function () {
            each([0, -2], function (length) {
                assert.strictEqual(func(string, length), string);
            });
        });

        it('`_.' + methodName + '` should coerce `length` to a number', function () {
            each(['', '4'], function (length) {
                var actual = length ? (isStart ? ' abc' : 'abc ') : string; // eslint-disable-line
                assert.strictEqual(func(string, length), actual);
            });
        });

        it('`_.' + methodName + '` should treat nullish values as empty strings', function () {
            each([undefined, '_-'], function (chars) {
                var expected = chars ? (isPad ? '__' : chars) : '  '; // eslint-disable-line
                assert.strictEqual(func(null, 2, chars), expected);
                assert.strictEqual(func(undefined, 2, chars), expected);
                assert.strictEqual(func('', 2, chars), expected);
            });
        });

        it('`_.' + methodName + '` should return `string` when `chars` coerces to an empty string', function () {
            var values = ['', Object('')];
            var expected = map(values, constant(string));

            var actual = map(values, function (value) {
                return pad(string, 6, value);
            });

            assert.deepStrictEqual(actual, expected);
        });
    });
});
