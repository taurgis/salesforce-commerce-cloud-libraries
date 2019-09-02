var assert = require('assert');
var startsWith = require('../../../cartridges/lodash/startsWith');
var endsWith = require('../../../cartridges/lodash/endsWith');
var each = require('../../../cartridges/lodash/each');
var constant = require('../../../cartridges/lodash/constant');
var every = require('../../../cartridges/lodash/every');
var { MAX_SAFE_INTEGER } = require('../helpers/max');

describe('startsWith and endsWith', function () {
    each(['startsWith', 'endsWith'], function (methodName) {
        var func = methodName === 'startsWith' ? startsWith : endsWith;
        var isStartsWith = methodName === 'startsWith';

        var string = 'abc';
        var chr = isStartsWith ? 'a' : 'c';

        it('`_.' + methodName + '` should coerce `string` to a string', function () {
            assert.strictEqual(func(Object(string), chr), true);
            assert.strictEqual(func({ 'toString': constant(string) }, chr), true);
        });

        it('`_.' + methodName + '` should coerce `target` to a string', function () {
            assert.strictEqual(func(string, Object(chr)), true);
            assert.strictEqual(func(string, { 'toString': constant(chr) }), true);
        });

        it('`_.' + methodName + '` should coerce `position` to a number', function () {
            var position = isStartsWith ? 1 : 2;

            assert.strictEqual(func(string, 'b', Object(position)), true);
            assert.strictEqual(func(string, 'b', { 'toString': constant(String(position)) }), true);
        });

        it('should return `true` when `target` is an empty string regardless of `position`', function () {
            var positions = [-Infinity, NaN, -3, -1, 0, 1, 2, 3, 5, MAX_SAFE_INTEGER, Infinity];

            assert.ok(every(positions, function (position) {
                return func(string, '', position);
            }));
        });
    });
});
