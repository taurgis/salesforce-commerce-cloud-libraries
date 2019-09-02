var assert = require('assert');
var slice = Array.prototype.slice;
var flip = require('../../../cartridges/lodash/flip');

describe('flip', function () {
    function fn() {
        return slice.call(arguments);
    }

    it('should flip arguments provided to `func`', function () {
        var flipped = flip(fn);
        assert.deepStrictEqual(flipped('a', 'b', 'c', 'd'), ['d', 'c', 'b', 'a']);
    });
});
