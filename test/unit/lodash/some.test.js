var assert = require('assert');
var some = require('../../../cartridges/lodash/some');
var map = require('../../../cartridges/lodash/map');
var identity = require('../../../cartridges/lodash/identity');
var { empties, stubFalse } = require('../helpers/stubs');

describe('some', function () {
    it('should return `true` if `predicate` returns truthy for any element', function () {
        assert.strictEqual(some([false, 1, ''], identity), true);
        assert.strictEqual(some([null, 'a', 0], identity), true);
    });

    it('should return `false` for empty collections', function () {
        var expected = map(empties, stubFalse);

        var actual = map(empties, function (value) {
            try {
                return some(value, identity);
            } catch (e) {
                // DO NOTHING
            }
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should return `true` as soon as `predicate` returns truthy', function () {
        var count = 0;

        assert.strictEqual(some([null, true, null], function (value) {
            count++;
            return value;
        }), true);

        assert.strictEqual(count, 2);
    });

    it('should return `false` if `predicate` returns falsey for all elements', function () {
        assert.strictEqual(some([false, false, false], identity), false);
        assert.strictEqual(some([null, 0, ''], identity), false);
    });
});
