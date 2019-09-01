var assert = require('assert');
var slice = Array.prototype.slice;
var push = Array.prototype.push;
var HOT_COUNT = 150;
var each = require('../../../cartridges/lodash/each');
var times = require('../../../cartridges/lodash/times');
var bind = require('../../../cartridges/lodash/bind');
var bindKey = require('../../../cartridges/lodash/bindKey');
var partial = require('../../../cartridges/lodash/partial');
var curry = require('../../../cartridges/lodash/curry');
var curryRight = require('../../../cartridges/lodash/curryRight');
var partialRight = require('../../../cartridges/lodash/partialRight');
var last = require('../../../cartridges/lodash/last');

describe('methods using `createWrapper`', function () {
    function fn() {
        return slice.call(arguments);
    }

    var ph1 = bind.placeholder;
    var ph2 = bindKey.placeholder;
    var ph3 = partial.placeholder;
    var ph4 = partialRight.placeholder;

    it('should work with combinations of partial functions', function () {
        var a = partial(fn);
        var b = partialRight(a, 3);
        var c = partial(b, 1);

        assert.deepStrictEqual(c(2), [1, 2, 3]);
    });

    it('should work with combinations of bound and partial functions', function () {
        var fnLocal = function () {
            var result = [this.a];
            push.apply(result, arguments);
            return result;
        };

        var expected = [1, 2, 3, 4];
        var object = { 'a': 1, 'fn': fnLocal };

        var a = bindKey(object, 'fn');
        var b = partialRight(a, 4);
        var c = partial(b, 2);

        assert.deepStrictEqual(c(3), expected);

        a = bind(fnLocal, object);
        b = partialRight(a, 4);
        c = partial(b, 2);

        assert.deepStrictEqual(c(3), expected);

        a = partial(fnLocal, 2);
        b = bind(a, object);
        c = partialRight(b, 4);

        assert.deepStrictEqual(c(3), expected);
    });

    it('should ensure `new combo` is an instance of `func`', function () {
        var object = {};

        function Foo(a, b) {
            return b === 0 && object;
        }

        var combo = partial(partialRight(Foo, 3), 1);


        assert.ok(new combo(2) instanceof Foo);
        assert.strictEqual(new combo(0), object);
    });

    it('should work with combinations of functions with placeholders', function () {
        var expected = [1, 2, 3, 4, 5, 6];
        var object = { 'fn': fn };

        var a = bindKey(object, 'fn', ph2, 2);
        var b = partialRight(a, ph4, 6);
        var c = partial(b, 1, ph3, 4);

        assert.deepStrictEqual(c(3, 5), expected);

        a = bind(fn, object, ph1, 2);
        b = partialRight(a, ph4, 6);
        c = partial(b, 1, ph3, 4);

        assert.deepStrictEqual(c(3, 5), expected);

        a = partial(fn, ph3, 2);
        b = bind(a, object, 1, ph1, 4);
        c = partialRight(b, ph4, 6);

        assert.deepStrictEqual(c(3, 5), expected);
    });

    it('should work with combinations of functions with overlapping placeholders', function () {
        var expected = [1, 2, 3, 4];
        var object = { 'fn': fn };

        var a = bindKey(object, 'fn', ph2, 2);
        var b = partialRight(a, ph4, 4);
        var c = partial(b, ph3, 3);

        assert.deepStrictEqual(c(1), expected);

        a = bind(fn, object, ph1, 2);
        b = partialRight(a, ph4, 4);
        c = partial(b, ph3, 3);

        assert.deepStrictEqual(c(1), expected);

        a = partial(fn, ph3, 2);
        b = bind(a, object, ph1, 3);
        c = partialRight(b, ph4, 4);

        assert.deepStrictEqual(c(1), expected);
    });

    it('should work with recursively bound functions', function () {
        var fnLocal = function () {
            return this.a;
        };

        var a = bind(fnLocal, { 'a': 1 });
        var b = bind(a, { 'a': 2 });
        var c = bind(b, { 'a': 3 });

        assert.strictEqual(c(), 1);
    });

    it('should work when hot', function () {
        times(2, function (index) {
            var fnLocal = function () {
                var result = [this];
                push.apply(result, arguments);
                return result;
            };

            var object = {};
            var bound1 = index ? bind(fnLocal, object, 1) : bind(fnLocal, object);
            var expected = [object, 1, 2, 3];

            var actual = last(times(HOT_COUNT, function () {
                var bound2 = index ? bind(bound1, null, 2) : bind(bound1);
                return index ? bound2(3) : bound2(1, 2, 3);
            }));

            assert.deepStrictEqual(actual, expected);

            actual = last(times(HOT_COUNT, function () {
                var bound1Local = index ? bind(fnLocal, object, 1) : bind(fnLocal, object);
                var bound2 = index ? bind(bound1Local, null, 2) : bind(bound1Local);

                return index ? bound2(3) : bound2(1, 2, 3);
            }));

            assert.deepStrictEqual(actual, expected);
        });

        each(['curry', 'curryRight'], function (methodName, index) {
            var func = methodName === 'curry' ? curry : curryRight;
            var fnLocal = function (a, b, c) { return [a, b, c]; };
            var curried = func(fnLocal);
            var expected = index ? [3, 2, 1] : [1, 2, 3];

            var actual = last(times(HOT_COUNT, function () {
                return curried(1)(2)(3);
            }));

            assert.deepStrictEqual(actual, expected);

            actual = last(times(HOT_COUNT, function () {
                var curriedLocal = func(fnLocal);
                return curriedLocal(1)(2)(3);
            }));

            assert.deepStrictEqual(actual, expected);
        });

        each(['partial', 'partialRight'], function (methodName, index) {
            var func = methodName === 'partial' ? partial : partialRight;
            var fnLocal = function () { return slice.call(arguments); };
            var par1 = func(fnLocal, 1);
            var expected = index ? [3, 2, 1] : [1, 2, 3];

            var actual = last(times(HOT_COUNT, function () {
                var par2 = func(par1, 2);
                return par2(3);
            }));

            assert.deepStrictEqual(actual, expected);

            actual = last(times(HOT_COUNT, function () {
                var par1Local = func(fnLocal, 1);
                var par2 = func(par1Local, 2);

                return par2(3);
            }));

            assert.deepStrictEqual(actual, expected);
        });
    });
});
