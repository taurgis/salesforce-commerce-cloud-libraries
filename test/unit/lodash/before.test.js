var assert = require('assert');
var before = require('../../../cartridges/lodash/before');
var times = require('../../../cartridges/lodash/times');

describe('before', function () {
    function beforeExecuter(n, timesAmount) {
        var count = 0;
        times(timesAmount, before(n, function () { count++; }));
        return count;
    }

    it('should create a function that invokes `func` after `n` calls', function () {
        assert.strictEqual(beforeExecuter(5, 4), 4, 'before(n) should invoke `func` before being called `n` times');
        assert.strictEqual(beforeExecuter(5, 6), 4, 'before(n) should not invoke `func` after being called `n - 1` times');
        assert.strictEqual(beforeExecuter(0, 0), 0, 'before(0) should not invoke `func` immediately');
        assert.strictEqual(beforeExecuter(0, 1), 0, 'before(0) should not invoke `func` when called');
    });

    it('should coerce `n` values of `NaN` to `0`', function () {
        assert.strictEqual(beforeExecuter(NaN, 1), 0);
    });

    it('should use `this` binding of function', function () {
        var beforeFunction = before(2, function () { return ++this.count; });
        var object = { 'before': beforeFunction, 'count': 0 };

        object.before();
        assert.strictEqual(object.before(), 1);
        assert.strictEqual(object.count, 1);
    });
});
