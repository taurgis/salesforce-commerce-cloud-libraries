var assert = require('assert');
var each = require('../../../cartridges/lodash/each');
var map = require('../../../cartridges/lodash/map');
var keys = require('../../../cartridges/lodash/keys');
var keysIn = require('../../../cartridges/lodash/keysIn');
var constant = require('../../../cartridges/lodash/constant');
var args = require('../helpers/args');
var strictArgs = require('../helpers/strictArgs');
var primitives = require('../helpers/primitives');
var arrayProto = Array.prototype;
var objectProto = Object.prototype;
var stringProto = String.prototype;
var numberProto = Number.prototype;
var stubArray = require('../helpers/stubs').array;

describe('keys methods', function () {
    each(['keys', 'keysIn'], function (methodName) {
        var func = (function () {
            switch (methodName) {
                case 'keys': return keys;
                case 'keysIn': return keysIn;

                default: return null;
            }
        }());
        var isKeys = methodName === 'keys';

        it('`_.' + methodName + '` should return the string keyed property names of `object`', function () {
            var actual = func({ 'a': 1, 'b': 1 }).sort();

            assert.deepStrictEqual(actual, ['a', 'b']);
        });

        it('`_.' + methodName + '` should ' + (isKeys ? 'not ' : '') + 'include inherited string keyed properties', function () {
            function Foo() {
                this.a = 1;
            }
            Foo.prototype.b = 2;

            var expected = isKeys ? ['a'] : ['a', 'b'];
            var actual = func(new Foo()).sort();

            assert.deepStrictEqual(actual, expected);
        });

        it('`_.' + methodName + '` should treat sparse arrays as dense', function () {
            var array = [1];
            array[2] = 3;

            var actual = func(array).sort();

            assert.deepStrictEqual(actual, ['0', '1', '2']);
        });

        it('`_.' + methodName + '` should return keys for custom properties on arrays', function () {
            var array = [1];
            array.a = 1;

            var actual = func(array).sort();

            assert.deepStrictEqual(actual, ['0', 'a']);
        });

        it('`_.' + methodName + '` should ' + (isKeys ? 'not ' : '') + 'include inherited string keyed properties of arrays', function () {
            arrayProto.a = 1;

            var expected = ['0'];
            var actual = func([1]).sort();

            assert.deepStrictEqual(actual, expected);

            delete arrayProto.a;
        });

        it('`_.' + methodName + '` should work with `arguments` objects', function () {
            var values = [args, strictArgs];
            var expected = map(values, constant(['0', '1', '2']));

            var actual = map(values, function (value) {
                return func(value).sort();
            });

            assert.deepStrictEqual(actual, expected);
        });

        it('`_.' + methodName + '` should return keys for custom properties on `arguments` objects', function () {
            var values = [args, strictArgs];
            var expected = map(values, constant(['0', '1', '2', 'a']));

            var actual = map(values, function (value) {
                value.a = 1;
                var result = func(value).sort();
                delete value.a;
                return result;
            });

            assert.deepStrictEqual(actual, expected);
        });

        it('`_.' + methodName + '` should ' + (isKeys ? 'not ' : '') + 'include inherited string keyed properties of `arguments` objects', function () {
            var values = [args, strictArgs];
            var expected = map(values, constant(isKeys ? ['0', '1', '2'] : ['0', '1', '2', 'a']));

            var actual = map(values, function (value) {
                objectProto.a = 1;
                var result = func(value).sort();
                delete objectProto.a;
                return result;
            });

            assert.deepStrictEqual(actual, expected);
        });

        it('`_.' + methodName + '` should work with string objects', function () {
            var actual = func(Object('abc')).sort();

            assert.deepStrictEqual(actual, ['0', '1', '2']);
        });

        it('`_.' + methodName + '` should return keys for custom properties on string objects', function () {
            var object = Object('a');
            object.a = 1;

            var actual = func(object).sort();

            assert.deepStrictEqual(actual, ['0', 'a']);
        });

        it('`_.' + methodName + '` should ' + (isKeys ? 'not ' : '') + 'include inherited string keyed properties of string objects', function () {
            stringProto.a = 1;

            var expected = isKeys ? ['0'] : ['0', 'a'];
            var actual = func(Object('a')).sort();

            assert.deepStrictEqual(actual, expected);

            delete stringProto.a;
        });

        it('`_.' + methodName + '` should work with array-like objects', function () {
            var object = { '0': 'a', 'length': 1 };
            var actual = func(object).sort();

            assert.deepStrictEqual(actual, ['0', 'length']);
        });

        it('`_.' + methodName + '` should coerce primitives to objects (test in IE 9)', function () {
            var expected = map(primitives, function (value) {
                return typeof value === 'string' ? ['0'] : [];
            });

            var actual = map(primitives, func);
            assert.deepStrictEqual(actual, expected);

            // IE 9 doesn't box numbers in for-in loops.
            numberProto.a = 1;
            assert.deepStrictEqual(func(0), isKeys ? [] : ['a']);
            delete numberProto.a;
        });

        it('`_.' + methodName + '` skips the `constructor` property on prototype objects', function () {
            function Foo() {}
            Foo.prototype.a = 1;

            var expected = ['a'];
            assert.deepStrictEqual(func(Foo.prototype), expected);

            var Fake = { 'prototype': {} };
            Fake.prototype.constructor = Fake;
            assert.deepStrictEqual(func(Fake.prototype), ['constructor']);
        });

        it('`_.' + methodName + '` should return an empty array when `object` is nullish', function () {
            var values = [, null, undefined];
            var expected = map(values, stubArray);

            var actual = map(values, function (value, index) {
                objectProto.a = 1;
                var result = index ? func(value) : func();
                delete objectProto.a;
                return result;
            });

            assert.deepStrictEqual(actual, expected);
        });
    });
});
