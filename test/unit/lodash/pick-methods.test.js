var assert = require('assert');
var pickBy = require('../../../cartridges/lodash/pickBy');
var pick = require('../../../cartridges/lodash/pick');
var each = require('../../../cartridges/lodash/each');
var nthArg = require('../../../cartridges/lodash/nthArg');
var castArray = require('../../../cartridges/lodash/castArray');
var isSymbol = require('../../../cartridges/lodash/isSymbol');
var toString = require('../../../cartridges/lodash/toString');
var some = require('../../../cartridges/lodash/some');
var map = require('../../../cartridges/lodash/map');

describe('pick methods', function () {
    each(['pick', 'pickBy'], function (methodName) {
        var expected = { 'a': 1, 'c': 3 };
        var func = (methodName === 'pick') ? pick : pickBy;
        var object = { 'a': 1, 'b': 2, 'c': 3, 'd': 4 };
        var resolve = nthArg(1);

        if (methodName === 'pickBy') {
            resolve = function (objectFn, props) {
                props = castArray(props);
                return function (value) {
                    return some(props, function (key) {
                        key = isSymbol(key) ? key : toString(key);
                        return objectFn[key] === value;
                    });
                };
            };
        }
        it('`_.' + methodName + '` should create an object of picked string keyed properties', function () {
            assert.deepStrictEqual(func(object, resolve(object, 'a')), { 'a': 1 });
            assert.deepStrictEqual(func(object, resolve(object, ['a', 'c'])), expected);
        });

        it('`_.' + methodName + '` should pick inherited string keyed properties', function () {
            function Foo() {}
            Foo.prototype = object;

            var foo = new Foo();
            assert.deepStrictEqual(func(foo, resolve(foo, ['a', 'c'])), expected);
        });

        it('`_.' + methodName + '` should preserve the sign of `0`', function () {
            var objectFn = { '-0': 'a', '0': 'b' };
            var props = [-0, Object(-0), 0, Object(0)];
            var expectedFn = [{ '-0': 'a' }, { '-0': 'a' }, { '0': 'b' }, { '0': 'b' }];

            var actual = map(props, function (key) {
                return func(objectFn, resolve(objectFn, key));
            });

            assert.deepStrictEqual(actual, expectedFn);
        });

        it('`_.' + methodName + '` should work with an array `object`', function () {
            var array = [1, 2, 3];
            assert.deepStrictEqual(func(array, resolve(array, '1')), { '1': 2 });
        });
    });
});
