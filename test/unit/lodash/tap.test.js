var assert = require('assert');
var tap = require('../../../cartridges/lodash/tap');
var _ = require('../../../cartridges/lodash/wrapperLodash');

describe('tap', function () {
    it('should intercept and return the given value', function () {
        var intercepted;
        var array = [1, 2, 3];

        var actual = tap(array, function (value) {
            intercepted = value;
        });

        assert.strictEqual(actual, array);
        assert.strictEqual(intercepted, array);
    });

    it('should intercept unwrapped values and return wrapped values when chaining', function () {
        var intercepted;
        var array = [1, 2, 3];

        var wrapped = _(array).tap(function (value) {
            intercepted = value;
            value.pop();
        });

        assert.ok(wrapped instanceof _);

        wrapped.value();
        assert.strictEqual(intercepted, array);
    });
});
