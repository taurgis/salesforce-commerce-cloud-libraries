var assert = require('assert');
var empties = require('../helpers/stubs').empties;
var LARGE_ARRAY_SIZE = require('../helpers/largeArraySize');
var isEven = require('../helpers/isEven');
var each = require('../../../cartridges/lodash/each');
var find = require('../../../cartridges/lodash/find');
var findIndex = require('../../../cartridges/lodash/findIndex');
var findKey = require('../../../cartridges/lodash/findKey');
var findLast = require('../../../cartridges/lodash/findLast');
var findLastIndex = require('../../../cartridges/lodash/findLastIndex');
var findLastKey = require('../../../cartridges/lodash/findLastKey');
var map = require('../../../cartridges/lodash/map');
var endsWith = require('../../../cartridges/lodash/endsWith');
var constant = require('../../../cartridges/lodash/constant');
var isPlainObject = require('../../../cartridges/lodash/isPlainObject');
var reject = require('../../../cartridges/lodash/reject');
var range = require('../../../cartridges/lodash/range');
var times = require('../../../cartridges/lodash/times');
var filter = require('../../../cartridges/lodash/filter');
var _ = require('../../../cartridges/lodash/wrapperLodash');

describe('find methods', function () {
    each(['find', 'findIndex', 'findKey', 'findLast', 'findLastIndex', 'findLastKey'], function (methodName) {
        var array = [1, 2, 3, 4];
        var func = (function () {
            switch (methodName) {
                case 'find': return find;
                case 'findIndex': return findIndex;
                case 'findKey': return findKey;
                case 'findLast': return findLast;
                case 'findLastIndex': return findLastIndex;
                case 'findLastKey': return findLastKey;

                default: return null;
            }
        }());

        var objects = [
            { 'a': 0, 'b': 0 },
            { 'a': 1, 'b': 1 },
            { 'a': 2, 'b': 2 }
        ];

        var expected = ({
            'find': [objects[1], undefined, objects[2]],
            'findIndex': [1, -1, 2],
            'findKey': ['1', undefined, '2'],
            'findLast': [objects[2], undefined, objects[2]],
            'findLastIndex': [2, -1, 2],
            'findLastKey': ['2', undefined, '2']
        })[methodName];

        it('`_.' + methodName + '` should return the found value', function () {
            assert.strictEqual(func(objects, function (object) { return object.a; }), expected[0]);
        });

        it('`_.' + methodName + '` should return `' + expected[1] + '` if value is not found', function () {
            assert.strictEqual(func(objects, function (object) { return object.a === 3; }), expected[1]);
        });

        it('`_.' + methodName + '` should work with `_.matches` shorthands', function () {
            assert.strictEqual(func(objects, { 'b': 2 }), expected[2]);
        });

        it('`_.' + methodName + '` should work with `_.matchesProperty` shorthands', function () {
            assert.strictEqual(func(objects, ['b', 2]), expected[2]);
        });

        it('`_.' + methodName + '` should work with `_.property` shorthands', function () {
            assert.strictEqual(func(objects, 'b'), expected[0]);
        });

        it('`_.' + methodName + '` should return `' + expected[1] + '` for empty collections', function () {
            var emptyValues = endsWith(methodName, 'Index') ? reject(empties, isPlainObject) : empties;
            var expecting = map(emptyValues, constant(expected[1]));

            var actual = map(emptyValues, function (value) { // eslint-disable-line
                try {
                    return func(value, { 'a': 3 });
                } catch (e) {
                    // DO NOTHING
                }
            });

            assert.deepStrictEqual(actual, expecting);
        });

        it('`_.' + methodName + '` should return an unwrapped value when implicitly chaining', function () {
            expected = ({
                'find': 1,
                'findIndex': 0,
                'findKey': '0',
                'findLast': 4,
                'findLastIndex': 3,
                'findLastKey': '3'
            })[methodName];

            assert.strictEqual(_(array)[methodName]().value(), expected);
        });

        it('`_.' + methodName + '` should return a wrapped value when explicitly chaining', function () {
            assert.ok(_(array).chain()[methodName]() instanceof _);
        });

        it('`_.' + methodName + '` should work in a lazy sequence', function () {
            var largeArray = range(1, LARGE_ARRAY_SIZE + 1);
            var smallArray = array;

            times(2, function (index) {
                array = index ? largeArray : smallArray;
                var wrapped = _(array).filter(isEven);

                assert.strictEqual(wrapped[methodName]().value(), func(filter(array, isEven)));
            });
        });
    });
});
