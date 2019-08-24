var assert = require('assert');
var camelCase = require('../../../cartridges/lodash/camelCase');
var kebabCase = require('../../../cartridges/lodash/kebabCase');
var lowerCase = require('../../../cartridges/lodash/lowerCase');
var snakeCase = require('../../../cartridges/lodash/snakeCase');
var startCase = require('../../../cartridges/lodash/startCase');
var upperCase = require('../../../cartridges/lodash/upperCase');
var capitalize = require('../../../cartridges/lodash/capitalize');
var reduce = require('../../../cartridges/lodash/reduce');
var each = require('../../../cartridges/lodash/each');
var map = require('../../../cartridges/lodash/map');
var stubTrue = require('../helpers/stubTrue');
var burredLetters = require('../helpers/burredLetters');
var deburredLetters = require('../helpers/deburredLetters');


describe('case methods', function () {
    each(['camel', 'kebab', 'lower', 'snake', 'start', 'upper'], function (caseName) {
        var methodName = caseName + 'Case';
        var func = (function () {
            switch (caseName) {
                case 'camel': return camelCase;
                case 'kebab': return kebabCase;
                case 'lower': return lowerCase;
                case 'snake': return snakeCase;
                case 'start': return startCase;
                case 'upper': return upperCase;
                default: return null;
            }
        }());

        var strings = [
            'foo bar', 'Foo bar', 'foo Bar', 'Foo Bar',
            'FOO BAR', 'fooBar', '--foo-bar--', '__foo_bar__'
        ];

        var converted = (function () {
            switch (caseName) {
                case 'camel': return 'fooBar';
                case 'kebab': return 'foo-bar';
                case 'lower': return 'foo bar';
                case 'snake': return 'foo_bar';
                case 'start': return 'Foo Bar';
                case 'upper': return 'FOO BAR';
                default: return '';
            }
        }());

        it('`_.' + methodName + '` should convert `string` to ' + caseName + ' case', function () {
            var actual = map(strings, function (string) {
                var expected = (caseName === 'start' && string === 'FOO BAR') ? string : converted;
                return func(string) === expected;
            });

            assert.deepStrictEqual(actual, map(strings, stubTrue));
        });

        it('`_.' + methodName + '` should handle double-converting strings', function () {
            var actual = map(strings, function (string) {
                var expected = (caseName === 'start' && string === 'FOO BAR') ? string : converted;
                return func(func(string)) === expected;
            });

            assert.deepStrictEqual(actual, map(strings, stubTrue));
        });

        it('`_.' + methodName + '` should deburr letters', function () {
            var actual = map(burredLetters, function (burred, index) {
                var letter = deburredLetters[index].replace(/['\u2019]/g, '');
                if (caseName === 'start') {
                    letter = letter === 'IJ' ? letter : capitalize(letter);
                } else if (caseName === 'upper') {
                    letter = letter.toUpperCase();
                } else {
                    letter = letter.toLowerCase();
                }
                return func(burred) === letter;
            });

            assert.deepStrictEqual(actual, map(burredLetters, stubTrue));
        });

        it('`_.' + methodName + '` should remove contraction apostrophes', function () {
            var postfixes = ['d', 'll', 'm', 're', 's', 't', 've'];

            each(["'", '\u2019'], function (apos) {
                var actual = map(postfixes, function (postfix) {
                    return func('a b' + apos + postfix + ' c');
                });

                var expected = map(postfixes, function (postfix) {
                    switch (caseName) {
                        case 'camel': return 'aB' + postfix + 'C';
                        case 'kebab': return 'a-b' + postfix + '-c';
                        case 'lower': return 'a b' + postfix + ' c';
                        case 'snake': return 'a_b' + postfix + '_c';
                        case 'start': return 'A B' + postfix + ' C';
                        case 'upper': return 'A B' + postfix.toUpperCase() + ' C';
                        default: return '';
                    }
                });

                assert.deepStrictEqual(actual, expected);
            });
        });

        it('`_.' + methodName + '` should remove Latin mathematical operators', function () {
            var actual = map(['\xd7', '\xf7'], func);
            assert.deepStrictEqual(actual, ['', '']);
        });

        it('`_.' + methodName + '` should coerce `string` to a string', function () {
            var string = 'foo bar';
            assert.strictEqual(func(Object(string)), converted);
            assert.strictEqual(func({ 'toString': () => string }), converted);
        });
    });

    (function () {
        it('should get the original value after cycling through all case methods', function () {
            var funcs = [camelCase, kebabCase, lowerCase, snakeCase, startCase, lowerCase, camelCase];

            var actual = reduce(funcs, function (result, func) {
                return func(result);
            }, 'enable 6h format');

            assert.strictEqual(actual, 'enable6HFormat');
        });
    }());
});
