var assert = require('assert');
var omit = require('../../../cartridges/lodash/omit');
var omitBy = require('../../../cartridges/lodash/omitBy');
var nthArg = require('../../../cartridges/lodash/nthArg');
var each = require('../../../cartridges/lodash/each');
var castArray = require('../../../cartridges/lodash/castArray');
var isSymbol = require('../../../cartridges/lodash/isSymbol');
var some = require('../../../cartridges/lodash/some');
var map = require('../../../cartridges/lodash/map');

describe('omit methods', function () {
    each(['omit'], function (methodName) {
        var expected = { 'b': 2, 'd': 4 };
        var func = (function () {
            switch (methodName) {
                case 'omit': return omit;
                case 'omitBy': return omitBy;


                default: return null;
            }
        }());
        var object = { 'a': 1, 'b': 2, 'c': 3, 'd': 4 };
        var resolve = nthArg(1);

        if (methodName === 'omitBy') {
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
        it('`_.' + methodName + '` should create an object with omitted string keyed properties', function () {
            assert.deepStrictEqual(func(object, resolve(object, 'a')), { 'b': 2, 'c': 3, 'd': 4 });
            assert.deepStrictEqual(func(object, resolve(object, ['a', 'c'])), expected);
        });

        it('`_.' + methodName + '` should include inherited string keyed properties', function () {
            function Foo() {}
            Foo.prototype = object;

            assert.deepStrictEqual(func(new Foo(), resolve(object, ['a', 'c'])), expected);
        });

        it('`_.' + methodName + '` should preserve the sign of `0`', function () {
            var objectFn = { '-0': 'a', '0': 'b' };
            var props = [-0, Object(-0), 0, Object(0)];
            var expectedFn = [{ '0': 'b' }, { '0': 'b' }, { '-0': 'a' }, { '-0': 'a' }];

            var actual = map(props, function (key) {
                return func(objectFn, resolve(objectFn, key));
            });

            assert.deepStrictEqual(actual, expectedFn);
        });

        it('`_.' + methodName + '` should work with an array `object`', function () {
            var array = [1, 2, 3];
            assert.deepStrictEqual(func(array, resolve(array, ['0', '2'])), { '1': 2 });
        });
    });
});
