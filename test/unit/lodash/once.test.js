var assert = require('assert');
var once = require('../../../cartridges/lodash/once');

describe('once', function () {
    it('should invoke `func` once', function () {
        var count = 0;
        var onceFn = once(function () { return ++count; });

        onceFn();
        assert.strictEqual(onceFn(), 1);
        assert.strictEqual(count, 1);
    });

    it('should ignore recursive calls', function () {
        var count = 0;

        var onceFn = once(function () {
            onceFn();
            return ++count;
        });

        assert.strictEqual(onceFn(), 1);
        assert.strictEqual(count, 1);
    });

    it('should not throw more than once', function () {
        var onceFn = once(function () {
            throw new Error();
        });

        assert.throws(onceFn);

        onceFn();
        assert.ok(true);
    });
});
