var assert = require('assert');
var partial = require('../../../cartridges/lodash/partial');
var partialRight = require('../../../cartridges/lodash/partialRight');
var curry = require('../../../cartridges/lodash/curry');
var placeholder = require('../../../cartridges/lodash/placeholder');
var identity = require('../../../cartridges/lodash/identity');
var each = require('../../../cartridges/lodash/each');
var slice = Array.prototype.slice;

describe('partial methods', function () {
    each(['partial', 'partialRight'], function (methodName) {
        var func = (function () {
            switch (methodName) {
                case 'partial': return partial;
                case 'partialRight': return partialRight;

                default: return null;
            }
        }());
        var isPartial = methodName === 'partial';
        var ph = func.placeholder;

        it('`_.' + methodName + '` partially applies arguments', function () {
            var par = func(identity, 'a');
            assert.strictEqual(par(), 'a');
        });

        it('`_.' + methodName + '` creates a function that can be invoked with additional arguments', function () {
            var fn = function (a, b) { return [a, b]; };
            var par = func(fn, 'a');
            var expected = isPartial ? ['a', 'b'] : ['b', 'a'];

            assert.deepStrictEqual(par('b'), expected);
        });

        it('`_.' + methodName + '` works when there are no partially applied arguments and the created function is invoked without additional arguments', function () {
            var fn = function () { return arguments.length; };
            var par = func(fn);

            assert.strictEqual(par(), 0);
        });

        it('`_.' + methodName + '` works when there are no partially applied arguments and the created function is invoked with additional arguments', function () {
            var par = func(identity);
            assert.strictEqual(par('a'), 'a');
        });

        it('`_.' + methodName + '` should support placeholders', function () {
            var fn = function () { return slice.call(arguments); };
            var par = func(fn, ph, 'b', ph);

            assert.deepStrictEqual(par('a', 'c'), ['a', 'b', 'c']);
            assert.deepStrictEqual(par('a'), ['a', 'b', undefined]);
            assert.deepStrictEqual(par(), [undefined, 'b', undefined]);

            if (isPartial) {
                assert.deepStrictEqual(par('a', 'c', 'd'), ['a', 'b', 'c', 'd']);
            } else {
                par = func(fn, ph, 'c', ph);
                assert.deepStrictEqual(par('a', 'b', 'd'), ['a', 'b', 'c', 'd']);
            }
        });

        it('`_.' + methodName + '` should use `_.placeholder` when set', function () {
            var _ph = placeholder = {};
            var fn = function () { return slice.call(arguments); };
            var par = func(fn, _ph, 'b', ph);
            var expected = isPartial ? [ph, 'b', 'a', 'c'] : ['a', ph, 'b', 'c'];

            assert.deepEqual(par('a', 'c'), expected);
            delete placeholder;
        });

        it('`_.' + methodName + '` creates a function with a `length` of `0`', function () {
            var fn = function () {};
            var par = func(fn, 'a');

            assert.strictEqual(par.length, 0);
        });

        it('`_.' + methodName + '` should ensure `new par` is an instance of `func`', function () {
            function Foo(value) {
                return value && object;
            }

            var object = {};
            var par = func(Foo);

            assert.ok(new par() instanceof Foo);
            assert.strictEqual(new par(true), object);
        });

        it('`_.' + methodName + '` should clone metadata for created functions', function () {
            function greet(greeting, name) {
                return greeting + ' ' + name;
            }

            var par1 = func(greet, 'hi');
            var par2 = func(par1, 'barney');
            var par3 = func(par1, 'pebbles');

            assert.strictEqual(par1('fred'), isPartial ? 'hi fred' : 'fred hi');
            assert.strictEqual(par2(), isPartial ? 'hi barney' : 'barney hi');
            assert.strictEqual(par3(), isPartial ? 'hi pebbles' : 'pebbles hi');
        });

        it('`_.' + methodName + '` should work with curried functions', function () {
            var fn = function (a, b, c) { return a + b + c; };
            var curried = curry(func(fn, 1), 2);

            assert.strictEqual(curried(2, 3), 6);
            assert.strictEqual(curried(2)(3), 6);
        });

        it('should work with placeholders and curried functions', function () {
            var fn = function () { return slice.call(arguments); };
            var curried = curry(fn);
            var par = func(curried, ph, 'b', ph, 'd');

            assert.deepStrictEqual(par('a', 'c'), ['a', 'b', 'c', 'd']);
        });
    });
});
