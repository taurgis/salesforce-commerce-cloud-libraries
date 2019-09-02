var assert = require('assert');
var trim = require('../../../cartridges/lodash/trim');
var trimStart = require('../../../cartridges/lodash/trimStart');
var trimEnd = require('../../../cartridges/lodash/trimEnd');
var each = require('../../../cartridges/lodash/each');
var constant = require('../../../cartridges/lodash/constant');
var map = require('../../../cartridges/lodash/map');
var _ = require('../../../cartridges/lodash/wrapperLodash');
var whitespace = require('../helpers/whitespace');

describe('trim methods', function () {
    each(['trim', 'trimStart', 'trimEnd'], function (methodName, index) {
        var func = (function () {
            switch (methodName) {
                case 'trim': return trim;
                case 'trimStart': return trimStart;
                case 'trimEnd': return trimEnd;

                default: return null;
            }
        }());
        var parts = [];

        if (index !== 2) {
            parts.push('leading');
        }
        if (index !== 1) {
            parts.push('trailing');
        }
        parts = parts.join(' and ');

        it('`_.' + methodName + '` should remove ' + parts + ' whitespace', function () {
            var string = whitespace + 'a b c' + whitespace;
            var expected = (index === 2 ? whitespace : '') + 'a b c' + (index === 1 ? whitespace : '');

            assert.strictEqual(func(string), expected);
        });

        it('`_.' + methodName + '` should coerce `string` to a string', function () {
            var object = { 'toString': constant(whitespace + 'a b c' + whitespace) };
            var expected = (index === 2 ? whitespace : '') + 'a b c' + (index === 1 ? whitespace : '');

            assert.strictEqual(func(object), expected);
        });

        it('`_.' + methodName + '` should remove ' + parts + ' `chars`', function () {
            var string = '-_-a-b-c-_-';
            var expected = (index === 2 ? '-_-' : '') + 'a-b-c' + (index === 1 ? '-_-' : '');

            assert.strictEqual(func(string, '_-'), expected);
        });

        it('`_.' + methodName + '` should coerce `chars` to a string', function () {
            var object = { 'toString': constant('_-') };
            var string = '-_-a-b-c-_-';
            var expected = (index === 2 ? '-_-' : '') + 'a-b-c' + (index === 1 ? '-_-' : '');

            assert.strictEqual(func(string, object), expected);
        });

        it('`_.' + methodName + '` should return an empty string for empty values and `chars`', function () {
            each([null, '_-'], function (chars) {
                assert.strictEqual(func(null, chars), '');
                assert.strictEqual(func(undefined, chars), '');
                assert.strictEqual(func('', chars), '');
            });
        });

        it('`_.' + methodName + '` should work with `undefined` or empty string values for `chars`', function () {
            var string = whitespace + 'a b c' + whitespace;
            var expected = (index === 2 ? whitespace : '') + 'a b c' + (index === 1 ? whitespace : '');

            assert.strictEqual(func(string, undefined), expected);
            assert.strictEqual(func(string, ''), string);
        });

        it('`_.' + methodName + '` should work as an iteratee for methods like `_.map`', function () {
            var string = Object(whitespace + 'a b c' + whitespace);
            var trimmed = (index === 2 ? whitespace : '') + 'a b c' + (index === 1 ? whitespace : '');
            var actual = map([string, string, string], func);

            assert.deepStrictEqual(actual, [trimmed, trimmed, trimmed]);
        });

        it('`_.' + methodName + '` should return an unwrapped value when implicitly chaining', function () {
            var string = whitespace + 'a b c' + whitespace;
            var expected = (index === 2 ? whitespace : '') + 'a b c' + (index === 1 ? whitespace : '');

            assert.strictEqual(_(string)[methodName]().value(), expected);
        });

        it('`_.' + methodName + '` should return a wrapped value when explicitly chaining', function () {
            var string = whitespace + 'a b c' + whitespace;
            assert.ok(_(string).chain()[methodName]() instanceof _);
        });
    });
});
