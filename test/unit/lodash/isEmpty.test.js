var assert = require('assert');
var isEmpty = require('../../../cartridges/lodash/isEmpty');
var map = require('../../../cartridges/lodash/map');
var each = require('../../../cartridges/lodash/each');
var _ = require('../../../cartridges/lodash/wrapperLodash');
var args = require('../helpers/args');
var empties = require('../helpers/stubs').empties;
var MAX_SAFE_INTEGER = require('../helpers/max').MAX_SAFE_INTEGER;
var arrayProto = Array.prototype;
var slice = Array.prototype.slice;
var push = Array.prototype.push;

describe('isEmpty', function () {
    it('should return `true` for empty values', function () {
        var expected = [true, true, true, true, true, true, true, true];
        var actual = map(empties, isEmpty);

        assert.deepStrictEqual(actual, expected);

        assert.strictEqual(isEmpty(true), true);
        assert.strictEqual(isEmpty(slice), true);
        assert.strictEqual(isEmpty(1), true);
        assert.strictEqual(isEmpty(NaN), true);
        assert.strictEqual(isEmpty(/x/), true);
        assert.strictEqual(isEmpty(), true);

        if (Buffer) {
            assert.strictEqual(isEmpty(new Buffer(0)), true);
            assert.strictEqual(isEmpty(new Buffer(1)), false);
        }
    });

    it('should return `false` for non-empty values', function () {
        assert.strictEqual(isEmpty([0]), false);
        assert.strictEqual(isEmpty({ 'a': 0 }), false);
        assert.strictEqual(isEmpty('a'), false);
    });

    it('should work with an object that has a `length` property', function () {
        assert.strictEqual(isEmpty({ 'length': 0 }), false);
    });

    it('should work with `arguments` objects', function () {
        assert.strictEqual(isEmpty(args), false);
    });

    it('should work with prototype objects', function () {
        function Foo() {}
        Foo.prototype = { 'constructor': Foo };

        assert.strictEqual(isEmpty(Foo.prototype), true);

        Foo.prototype.a = 1;
        assert.strictEqual(isEmpty(Foo.prototype), false);
    });

    it('should work with jQuery/MooTools DOM query collections', function () {
        function Foo(elements) {
            push.apply(this, elements);
        }
        Foo.prototype = { 'length': 0, 'splice': arrayProto.splice };

        assert.strictEqual(isEmpty(new Foo([])), true);
    });

    it('should work with maps', function () {
        if (Map) {
            each([new Map()], function (loopMap) {
                assert.strictEqual(isEmpty(loopMap), true);
                loopMap.set('a', 1);
                assert.strictEqual(isEmpty(loopMap), false);
                loopMap.clear();
            });
        }
    });

    it('should work with sets', function () {
        if (Set) {
            each([new Set()], function (set) {
                assert.strictEqual(isEmpty(set), true);
                set.add(1);
                assert.strictEqual(isEmpty(set), false);
                set.clear();
            });
        }
    });

    it('should not treat objects with negative lengths as array-like', function () {
        function Foo() {}
        Foo.prototype.length = -1;

        assert.strictEqual(isEmpty(new Foo()), true);
    });

    it('should not treat objects with lengths larger than `MAX_SAFE_INTEGER` as array-like', function () {
        function Foo() {}
        Foo.prototype.length = MAX_SAFE_INTEGER + 1;

        assert.strictEqual(isEmpty(new Foo()), true);
    });

    it('should not treat objects with non-number lengths as array-like', function () {
        assert.strictEqual(isEmpty({ 'length': '0' }), false);
    });

    it('should return an unwrapped value when implicitly chaining', function () {
        assert.strictEqual(_({}).isEmpty().value(), true);
    });

    it('should return a wrapped value when explicitly chaining', function () {
        assert.ok(_({}).chain().isEmpty() instanceof _);
    });
});
