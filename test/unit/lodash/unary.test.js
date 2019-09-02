var assert = require('assert');
var unary = require('../../../cartridges/lodash/unary');
var map = require('../../../cartridges/lodash/map');
var slice = Array.prototype.slice;

describe('unary', function () {
    function fn() {
        return slice.call(arguments);
    }

    it('should cap the number of arguments provided to `func`', function () {
        var actual = map(['6', '8', '10'], unary(parseInt));
        assert.deepStrictEqual(actual, [6, 8, 10]);
    });

    it('should not force a minimum argument count', function () {
        var capped = unary(fn);
        assert.deepStrictEqual(capped(), []);
    });

    it('should use `this` binding of function', function () {
        var capped = unary(function () { return this; });
        var object = { 'capped': capped };

        assert.strictEqual(object.capped(), object);
    });
});
