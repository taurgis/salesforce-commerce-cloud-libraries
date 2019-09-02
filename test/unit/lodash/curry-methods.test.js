var assert = require('assert');
var each = require('../../../cartridges/lodash/each');
var curry = require('../../../cartridges/lodash/curry');
var curryRight = require('../../../cartridges/lodash/curryRight');

describe('curry methods', function () {
    each(['curry', 'curryRight'], function (methodName) {
        var func = (function () {
            switch (methodName) {
                case 'curry': return curry;
                case 'curryRight': return curryRight;

                default: return null;
            }
        }());

        it('`_.' + methodName + '` should not error on functions with the same name as lodash methods', function () {
            function run(a, b) {
                return a + b;
            }

            var curried = func(run, 2);
            var actual;
            try {
                actual = curried(1)(2);
            } catch (e) {
                // DO NOTHING
            }

            assert.strictEqual(actual, 3);
        });

        it('`_.' + methodName + '` should work for function names that shadow those on `Object.prototype`', function () {
            var curried = curry(function hasOwnProperty(a, b, c) {
                return [a, b, c];
            }, 3);

            var expected = [1, 2, 3];

            assert.deepStrictEqual(curried(1)(2)(3), expected);
        });
    });
});
