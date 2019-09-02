var assert = require('assert');
var startsWith = require('../../../cartridges/lodash/startsWith');
var each = require('../../../cartridges/lodash/each');
var map = require('../../../cartridges/lodash/map');
var { MAX_SAFE_INTEGER } = require('../helpers/max');
var { falsey, stubTrue } = require('../helpers/stubs');

describe('startsWith', function () {
    var string = 'abc';

    it('should return `true` if a string starts with `target`', function () {
        assert.strictEqual(startsWith(string, 'a'), true);
    });

    it('should return `false` if a string does not start with `target`', function () {
        assert.strictEqual(startsWith(string, 'b'), false);
    });

    it('should work with a `position`', function () {
        assert.strictEqual(startsWith(string, 'b', 1), true);
    });

    it('should work with `position` >= `length`', function () {
        each([3, 5, MAX_SAFE_INTEGER, Infinity], function (position) {
            assert.strictEqual(startsWith(string, 'a', position), false);
        });
    });

    it('should treat falsey `position` values as `0`', function () {
        var expected = map(falsey, stubTrue);

        var actual = map(falsey, function (position) {
            return startsWith(string, 'a', position);
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should treat a negative `position` as `0`', function () {
        each([-1, -3, -Infinity], function (position) {
            assert.strictEqual(startsWith(string, 'a', position), true);
            assert.strictEqual(startsWith(string, 'b', position), false);
        });
    });

    it('should coerce `position` to an integer', function () {
        assert.strictEqual(startsWith(string, 'bc', 1.2), true);
    });
});
