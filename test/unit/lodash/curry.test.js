var assert = require('assert');
var stubArray = require('../helpers/stubs').array;
var slice = Array.prototype.slice;
var map = require('../../../cartridges/lodash/map');
var curry = require('../../../cartridges/lodash/curry');

describe('curry', function () {
    var fn = function () {
        return slice.call(arguments);
    };

    it('should curry based on the number of arguments given', function () {
        var curried = curry(fn, 4);
        var expected = [1, 2, 3, 4];

        assert.deepStrictEqual(curried(1)(2)(3)(4), expected);
        assert.deepStrictEqual(curried(1, 2)(3, 4), expected);
        assert.deepStrictEqual(curried(1, 2, 3, 4), expected);
    });

    it('should allow specifying `arity`', function () {
        var curried = curry(fn, 3);
        var expected = [1, 2, 3];

        assert.deepStrictEqual(curried(1)(2, 3), expected);
        assert.deepStrictEqual(curried(1, 2)(3), expected);
        assert.deepStrictEqual(curried(1, 2, 3), expected);
    });

    it('should coerce `arity` to an integer', function () {
        var values = ['0', 0.6, 'xyz'];
        var expected = map(values, stubArray);

        var actual = map(values, function (arity) {
            return curry(fn, arity)();
        });

        assert.deepStrictEqual(actual, expected);
        assert.deepStrictEqual(curry(fn, '2')(1)(2), [1, 2]);
    });

    it('should provide additional arguments after reaching the target arity', function () {
        var curried = curry(fn, 3);
        assert.deepStrictEqual(curried(1)(2, 3, 4), [1, 2, 3, 4]);
        assert.deepStrictEqual(curried(1, 2)(3, 4, 5), [1, 2, 3, 4, 5]);
        assert.deepStrictEqual(curried(1, 2, 3, 4, 5, 6), [1, 2, 3, 4, 5, 6]);
    });


    it('should ensure `new curried` is an instance of `func`', function () {
        var object = {};

        function Foo(value) {
            return value && object;
        }

        var curried = curry(Foo);

        assert.ok(new curried(false) instanceof Foo);
        assert.strictEqual(new curried(true), object);
    });
});
