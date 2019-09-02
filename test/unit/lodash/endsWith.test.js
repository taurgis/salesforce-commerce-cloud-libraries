var assert = require('assert');
var MAX_SAFE_INTEGER = require('../helpers/max').MAX_SAFE_INTEGER;
var endsWith = require('../../../cartridges/lodash/endsWith');
var each = require('../../../cartridges/lodash/each');
var every = require('../../../cartridges/lodash/every');

describe('endsWith', function () {
    var string = 'abc';

    it('should return `true` if a string ends with `target`', function () {
        assert.strictEqual(endsWith(string, 'c'), true);
    });

    it('should return `false` if a string does not end with `target`', function () {
        assert.strictEqual(endsWith(string, 'b'), false);
    });

    it('should work with a `position`', function () {
        assert.strictEqual(endsWith(string, 'b', 2), true);
    });

    it('should work with `position` >= `length`', function () {
        each([3, 5, MAX_SAFE_INTEGER, Infinity], function (position) {
            assert.strictEqual(endsWith(string, 'c', position), true);
        });
    });

    it('should treat a negative `position` as `0`', function () {
        each([-1, -3, -Infinity], function (position) {
            assert.ok(every(string, function (chr) {
                return !endsWith(string, chr, position);
            }));
            assert.strictEqual(endsWith(string, '', position), true);
        });
    });

    it('should coerce `position` to an integer', function () {
        assert.strictEqual(endsWith(string, 'ab', 2.2), true);
    });
});
