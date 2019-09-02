var assert = require('assert');
var size = require('../../../cartridges/lodash/size');
var map = require('../../../cartridges/lodash/map');
var { falsey, stubZero } = require('../helpers/stubs');
var { MAX_SAFE_INTEGER } = require('../helpers/max');
var arrayProto = Array.prototype;
var args = require('../helpers/args');
var push = Array.prototype.push;

describe('size', function () {
    var array = [1, 2, 3];

    it('should return the number of own enumerable string keyed properties of an object', function () {
        assert.strictEqual(size({ 'one': 1, 'two': 2, 'three': 3 }), 3);
    });

    it('should return the length of an array', function () {
        assert.strictEqual(size(array), 3);
    });

    it('should accept a falsey `object`', function () {
        var expected = map(falsey, stubZero);

        var actual = map(falsey, function (object, index) {
            try {
                return index ? size(object) : size();
            } catch (e) {
                // DO NOTHING
            }
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should work with `arguments` objects', function () {
        assert.strictEqual(size(args), 3);
    });

    it('should work with jQuery/MooTools DOM query collections', function () {
        function Foo(elements) {
            push.apply(this, elements);
        }
        Foo.prototype = { 'length': 0, 'splice': arrayProto.splice };

        assert.strictEqual(size(new Foo(array)), 3);
    });

    it('should not treat objects with negative lengths as array-like', function () {
        assert.strictEqual(size({ 'length': -1 }), 1);
    });

    it('should not treat objects with lengths larger than `MAX_SAFE_INTEGER` as array-like', function () {
        assert.strictEqual(size({ 'length': MAX_SAFE_INTEGER + 1 }), 1);
    });

    it('should not treat objects with non-number lengths as array-like', function () {
        assert.strictEqual(size({ 'length': '0' }), 1);
    });
});
