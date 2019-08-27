var assert = require('assert');
var falsey = require('../helpers/falsey');
var args = require('../helpers/args');
var _ = require('../../../cartridges/lodash/wrapperLodash');
var identity = require('../../../cartridges/lodash/identity');
var each = require('../../../cartridges/lodash/each');
var curry = require('../../../cartridges/lodash/curry');
var toArray = require('../../../cartridges/lodash/toArray');
var constant = require('../../../cartridges/lodash/constant');
var includes = require('../../../cartridges/lodash/includes');
var find = require('../../../cartridges/lodash/find');
var map = require('../../../cartridges/lodash/map');
var eq = require('../../../cartridges/lodash/eq');

describe('find and includes', function () {
    each(['includes', 'find'], function (methodName) {
        var func = (function () {
            switch (methodName) {
                case 'includes': return includes;
                case 'find': return find;

                default: return null;
            }
        }());
        var isIncludes = methodName == 'includes';
        var resolve = methodName == 'find' ? curry(eq) : identity;

        each({
            'an `arguments` object': args,
            'an array': [1, 2, 3]
        },
        function (collection, key) {
            var values = toArray(collection);

            it('`_.' + methodName + '` should work with ' + key + ' and a positive `fromIndex`', function () {
                var expected = [
                    isIncludes || values[2],
                    isIncludes ? false : undefined
                ];

                var actual = [
                    func(collection, resolve(values[2]), 2),
                    func(collection, resolve(values[1]), 2)
                ];

                assert.deepStrictEqual(actual, expected);
            });

            it('`_.' + methodName + '` should work with ' + key + ' and a `fromIndex` >= `length`', function () {
                var indexes = [4, 6, Math.pow(2, 32), Infinity];

                var expected = map(indexes, function () {
                    var result = isIncludes ? false : undefined;
                    return [result, result, result];
                });

                var actual = map(indexes, function (fromIndex) {
                    return [
                        func(collection, resolve(1), fromIndex),
                        func(collection, resolve(undefined), fromIndex),
                        func(collection, resolve(''), fromIndex)
                    ];
                });

                assert.deepStrictEqual(actual, expected);
            });

            it('`_.' + methodName + '` should work with ' + key + ' and treat falsey `fromIndex` values as `0`', function () {
                var expected = map(falsey, constant(isIncludes || values[0]));

                var actual = map(falsey, function (fromIndex) {
                    return func(collection, resolve(values[0]), fromIndex);
                });

                assert.deepStrictEqual(actual, expected);
            });

            it('`_.' + methodName + '` should work with ' + key + ' and coerce `fromIndex` to an integer', function () {
                var expected = [
                    isIncludes || values[0],
                    isIncludes || values[0],
                    isIncludes ? false : undefined
                ];

                var actual = [
                    func(collection, resolve(values[0]), 0.1),
                    func(collection, resolve(values[0]), NaN),
                    func(collection, resolve(values[0]), '1')
                ];

                assert.deepStrictEqual(actual, expected);
            });

            it('`_.' + methodName + '` should work with ' + key + ' and a negative `fromIndex`', function () {
                var expected = [
                    isIncludes || values[2],
                    isIncludes ? false : undefined
                ];

                var actual = [
                    func(collection, resolve(values[2]), -1),
                    func(collection, resolve(values[1]), -1)
                ];

                assert.deepStrictEqual(actual, expected);
            });

            it('`_.' + methodName + '` should work with ' + key + ' and a negative `fromIndex` <= `-length`', function () {
                var indexes = [-4, -6, -Infinity];
                var expected = map(indexes, constant(isIncludes || values[0]));

                var actual = map(indexes, function (fromIndex) {
                    return func(collection, resolve(values[0]), fromIndex);
                });

                assert.deepStrictEqual(actual, expected);
            });
        });
    });
});
