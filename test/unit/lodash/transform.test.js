var assert = require('assert');
var transform = require('../../../cartridges/lodash/transform');
var map = require('../../../cartridges/lodash/map');
var constant = require('../../../cartridges/lodash/constant');
var each = require('../../../cartridges/lodash/each');
var isArray = require('../../../cartridges/lodash/isArray');
var isPlainObject = require('../../../cartridges/lodash/isPlainObject');
var every = require('../../../cartridges/lodash/every');
var toPlainObject = require('../../../cartridges/lodash/toPlainObject');
var { stubTrue, noop, stubObject, stubFalse, falsey } = require('../helpers/stubs');
var slice = Array.prototype.slice;
var square = require('../helpers/square');

describe('transform', function () {
    function Foo() {
        this.a = 1;
        this.b = 2;
        this.c = 3;
    }

    it('should create an object with the same `[[Prototype]]` as `object` when `accumulator` is nullish', function () {
        var accumulators = [, null, undefined];
        var object = new Foo();
        var expected = map(accumulators, stubTrue);

        var iteratee = function (result, value, key) {
            result[key] = square(value);
        };

        var mapper = function (accumulator, index) {
            return index ? transform(object, iteratee, accumulator) : transform(object, iteratee);
        };

        var results = map(accumulators, mapper);

        var actual = map(results, function (result) {
            return result instanceof Foo;
        });

        assert.deepStrictEqual(actual, expected);

        expected = map(accumulators, constant({ 'a': 1, 'b': 4, 'c': 9 }));
        actual = map(results, toPlainObject);

        assert.deepStrictEqual(actual, expected);

        object = { 'a': 1, 'b': 2, 'c': 3 };
        actual = map(accumulators, mapper);

        assert.deepStrictEqual(actual, expected);

        object = [1, 2, 3];
        expected = map(accumulators, constant([1, 4, 9]));
        actual = map(accumulators, mapper);

        assert.deepStrictEqual(actual, expected);
    });

    it('should support an `accumulator` value', function () {
        var values = [new Foo(), [1, 2, 3], { 'a': 1, 'b': 2, 'c': 3 }];
        var expectedFn = map(values, constant([1, 4, 9]));

        var actual = map(values, function (value) {
            return transform(value, function (result, valueFn) {
                result.push(square(valueFn));
            }, []);
        });

        assert.deepStrictEqual(actual, expectedFn);

        var object = { 'a': 1, 'b': 4, 'c': 9 };
        expectedFn = [object, { '0': 1, '1': 4, '2': 9 }, object];

        actual = map(values, function (value) {
            return transform(value, function (result, valueFn, key) {
                result[key] = square(valueFn);
            }, {});
        });

        assert.deepStrictEqual(actual, expectedFn);

        each([[], {}], function (accumulator) {
            var actualFn = map(values, function (value) {
                return transform(value, noop, accumulator);
            });

            assert.ok(every(actualFn, function (result) {
                return result === accumulator;
            }));

            assert.strictEqual(transform(null, null, accumulator), accumulator);
        });
    });

    it('should treat sparse arrays as dense', function () {
        var actual = transform(Array(1), function (result, value, index) {
            result[index] = String(value);
        });

        assert.deepStrictEqual(actual, ['undefined']);
    });

    it('should work without an `iteratee`', function () {
        assert.ok(transform(new Foo()) instanceof Foo);
    });

    it('should ensure `object` is an object before using its `[[Prototype]]`', function () {
        var Ctors = [Boolean, Boolean, Number, Number, Number, String, String];
        var values = [false, true, 0, 1, NaN, '', 'a'];
        var expected = map(values, stubObject);

        var results = map(values, function (value) {
            return transform(value);
        });

        assert.deepStrictEqual(results, expected);

        expected = map(values, stubFalse);

        var actual = map(results, function (value, index) {
            return value instanceof Ctors[index];
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should ensure `object` constructor is a function before using its `[[Prototype]]`', function () {
        Foo.prototype.constructor = null;
        assert.ok(!(transform(new Foo()) instanceof Foo));
        Foo.prototype.constructor = Foo;
    });

    it('should create an empty object when given a falsey `object`', function () {
        var expected = map(falsey, stubObject);

        var actual = map(falsey, function (object, index) {
            return index ? transform(object) : transform();
        });

        assert.deepStrictEqual(actual, expected);
    });

    each({
        'array': [1, 2, 3],
        'object': { 'a': 1, 'b': 2, 'c': 3 }
    },
    function (object, key) {
        it('should provide correct `iteratee` arguments when transforming an ' + key, function () {
            var args;

            transform(object, function () {
                args || (args = slice.call(arguments));
            });

            var first = args[0];
            if (key === 'array') {
                assert.ok(first !== object && isArray(first));
                assert.deepStrictEqual(args, [first, 1, 0, object]);
            } else {
                assert.ok(first !== object && isPlainObject(first));
                assert.deepStrictEqual(args, [first, 1, 'a', object]);
            }
        });
    });
});
