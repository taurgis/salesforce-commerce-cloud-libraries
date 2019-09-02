var assert = require('assert');
var xorBy = require('../../../cartridges/lodash/xorBy');
var slice = Array.prototype.slice;

describe('xorBy', function () {
    it('should accept an `iteratee`', function () {
        var actual = xorBy([2.1, 1.2], [2.3, 3.4], Math.floor);
        assert.deepStrictEqual(actual, [1.2, 3.4]);

        actual = xorBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
        assert.deepStrictEqual(actual, [{ 'x': 2 }]);
    });

    it('should provide correct `iteratee` arguments', function () {
        var args;

        xorBy([2.1, 1.2], [2.3, 3.4], function () {
            args || (args = slice.call(arguments));
        });

        assert.deepStrictEqual(args, [2.3]);
    });
});
