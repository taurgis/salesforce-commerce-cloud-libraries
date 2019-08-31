var assert = require('assert');
var stubFalse = require('../helpers/stubs').false;
var args = require('../helpers/args');
var isFunction = require('../../../cartridges/lodash/isFunction');
var _ = require('../../../cartridges/lodash/wrapperLodash');
var map = require('../../../cartridges/lodash/map');
var slice = Array.prototype.slice;
var falsey = require('../helpers/falsey');
var { asyncFunc, genFunc } = require('../helpers/funcs');


describe('isFunction', function () {
    it('should return `true` for functions', function () {
        assert.strictEqual(isFunction(_), true);
        assert.strictEqual(isFunction(slice), true);
    });

    it('should return `true` for async functions', function () {
        assert.strictEqual(isFunction(asyncFunc), typeof asyncFunc === 'function');
    });

    it('should return `true` for generator functions', function () {
        assert.strictEqual(isFunction(genFunc), typeof genFunc === 'function');
    });

    it('should return `true` for the `Proxy` constructor', function () {
        if (Proxy) {
            assert.strictEqual(isFunction(Proxy), true);
        }
    });


    it('should return `false` for non-functions', function () {
        var expected = map(falsey, stubFalse);

        var actual = map(falsey, function (value, index) {
            return index ? isFunction(value) : isFunction();
        });

        assert.deepStrictEqual(actual, expected);

        assert.strictEqual(isFunction(args), false);
        assert.strictEqual(isFunction([1, 2, 3]), false);
        assert.strictEqual(isFunction(true), false);
        assert.strictEqual(isFunction(new Date()), false);
        assert.strictEqual(isFunction(new Error()), false);
        assert.strictEqual(isFunction({ 'a': 1 }), false);
        assert.strictEqual(isFunction(1), false);
        assert.strictEqual(isFunction(/x/), false);
        assert.strictEqual(isFunction('a'), false);
    });
});
