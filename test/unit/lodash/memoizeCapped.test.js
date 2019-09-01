var assert = require('assert');
var _memoizeCapped = require('../../../cartridges/lodash/internal/memoizeCapped');
var identity = require('../../../cartridges/lodash/identity');
var times = require('../../../cartridges/lodash/times');
var MAX_MEMOIZE_SIZE = 500;

describe('memoizeCapped', function () {
    var func = _memoizeCapped;

    it('should enforce a max cache size of `MAX_MEMOIZE_SIZE`', function () {
        if (func) {
            var memoized = func(identity);
            var cache = memoized.cache;

            times(MAX_MEMOIZE_SIZE, memoized);
            assert.strictEqual(cache.size, MAX_MEMOIZE_SIZE);

            memoized(MAX_MEMOIZE_SIZE);
            assert.strictEqual(cache.size, 1);
        }
    });
});
