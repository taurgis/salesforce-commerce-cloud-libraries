var assert = require('assert');
var each = require('../../../cartridges/lodash/each');
var map = require('../../../cartridges/lodash/map');
var { stubString } = require('../helpers/stubs');

describe('"Strings" category methods', function () {
    var stringMethods = [
        'camelCase',
        'capitalize',
        'escape',
        'kebabCase',
        'lowerCase',
        'lowerFirst',
        'pad',
        'padEnd',
        'padStart',
        'repeat',
        'snakeCase',
        'toLower',
        'toUpper',
        'trim',
        'trimEnd',
        'trimStart',
        'truncate',
        'unescape',
        'upperCase',
        'upperFirst'
    ];

    each(stringMethods, function (methodName) {
        var func = require('../../../cartridges/lodash/' + methodName);

        it('`_.' + methodName + '` should return an empty string for empty values', function () {
            var values = [, null, undefined, ''];
            var expected = map(values, stubString);

            var actual = map(values, function (value, index) {
                return index ? func(value) : func();
            });

            assert.deepStrictEqual(actual, expected);
        });
    });
});
