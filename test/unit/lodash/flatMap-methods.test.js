var assert = require('assert');
var falsey = require('../helpers/falsey');
var stubArray = require('../helpers/stubs').array;
var identity = require('../../../cartridges/lodash/identity');
var flatMap = require('../../../cartridges/lodash/flatMap');
var flatMapDeep = require('../../../cartridges/lodash/flatMapDeep');
var flatMapDepth = require('../../../cartridges/lodash/flatMapDepth');
var flatten = require('../../../cartridges/lodash/flatten');
var map = require('../../../cartridges/lodash/map');
var each = require('../../../cartridges/lodash/each');
var constant = require('../../../cartridges/lodash/constant');

describe('flatMap methods', function () {
    each(['flatMap', 'flatMapDeep', 'flatMapDepth'], function (methodName) {
        var func = (function () {
            switch (methodName) {
                case 'flatMap': return flatMap;
                case 'flatMapDeep': return flatMapDeep;
                case 'flatMapDepth': return flatMapDepth;
                default: return null;
            }
        }());
        var array = [1, 2, 3, 4];

        function duplicate(n) {
            return [n, n];
        }

        it('`_.' + methodName + '` should map values in `array` to a new flattened array', function () {
            var actual = func(array, duplicate);
            var expected = flatten(map(array, duplicate));

            assert.deepStrictEqual(actual, expected);
        });

        it('`_.' + methodName + '` should work with `_.property` shorthands', function () {
            var objects = [{ 'a': [1, 2] }, { 'a': [3, 4] }];
            assert.deepStrictEqual(func(objects, 'a'), array);
        });

        it('`_.' + methodName + '` should iterate over own string keyed properties of objects', function () {
            function Foo() {
                this.a = [1, 2];
            }
            Foo.prototype.b = [3, 4];

            var actual = func(new Foo(), identity);
            assert.deepStrictEqual(actual, [1, 2]);
        });

        it('`_.' + methodName + '` should use `_.identity` when `iteratee` is nullish', function () {
            array = [[1, 2], [3, 4]];
            var object = { 'a': [1, 2], 'b': [3, 4] };
            var values = [, null, undefined]; // eslint-disable-line
            var expected = map(values, constant([1, 2, 3, 4]));

            each([array, object], function (collection) {
                var actual = map(values, function (value, index) {
                    return index ? func(collection, value) : func(collection);
                });

                assert.deepStrictEqual(actual, expected);
            });
        });

        it('`_.' + methodName + '` should accept a falsey `collection`', function () {
            var expected = map(falsey, stubArray);

            var actual = map(falsey, function (collection, index) { // eslint-disable-line
                try {
                    return index ? func(collection) : func();
                } catch (e) {
                    // DO NOTHING
                }
            });

            assert.deepStrictEqual(actual, expected);
        });

        it('`_.' + methodName + '` should treat number values for `collection` as empty', function () {
            assert.deepStrictEqual(func(1), []);
        });

        it('`_.' + methodName + '` should work with objects with non-number length properties', function () {
            var object = { 'length': [1, 2] };
            assert.deepStrictEqual(func(object, identity), [1, 2]);
        });
    });
});
