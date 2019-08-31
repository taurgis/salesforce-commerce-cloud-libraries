var assert = require('assert');
var { noop, stubTrue } = require('../helpers/stubs');
var { MAX_SAFE_INTEGER } = require('../helpers/max');
var each = require('../../../cartridges/lodash/each');
var map = require('../../../cartridges/lodash/map');
var includes = require('../../../cartridges/lodash/includes');
var difference = require('../../../cartridges/lodash/difference');
var union = require('../../../cartridges/lodash/union');
var _ = require('../../../cartridges/lodash/wrapperLodash');
var slice = Array.prototype.slice;

describe('iteration methods', function () {
    var methods = [
        'internal/baseEach',
        'countBy',
        'every',
        'filter',
        'find',
        'findIndex',
        'findKey',
        'findLast',
        'findLastIndex',
        'findLastKey',
        'forEach',
        'forEachRight',
        'forIn',
        'forInRight',
        'forOwn',
        'forOwnRight',
        'groupBy',
        'keyBy',
        'map',
        'mapKeys',
        'mapValues',
        'maxBy',
        'minBy',
        'omitBy',
        'partition',
        'pickBy',
        'reject'
    ];

    var arrayMethods = [
        'findIndex',
        'findLastIndex',
        'maxBy',
        'minBy'
    ];

    var collectionMethods = [
        'internal/baseEach',
        'countBy',
        'every',
        'filter',
        'find',
        'findLast',
        'forEach',
        'forEachRight',
        'groupBy',
        'keyBy',
        'map',
        'partition',
        'reduce',
        'reduceRight',
        'reject'
    ];

    var forInMethods = [
        'forIn',
        'forInRight',
        'omitBy',
        'pickBy'
    ];

    var iterationMethods = [
        'internal/baseEach',
        'forEach',
        'forEachRight',
        'forIn',
        'forInRight',
        'forOwn',
        'forOwnRight'
    ];

    var objectMethods = [
        'findKey',
        'findLastKey',
        'forIn',
        'forInRight',
        'forOwn',
        'forOwnRight',
        'mapKeys',
        'mapValues',
        'omitBy',
        'pickBy'
    ];

    var rightMethods = [
        'findLast',
        'findLastIndex',
        'findLastKey',
        'forEachRight',
        'forInRight',
        'forOwnRight'
    ];

    var unwrappedMethods = [
        'each',
        'eachRight',
        'every',
        'find',
        'findIndex',
        'findKey',
        'findLast',
        'findLastIndex',
        'findLastKey',
        'forEach',
        'forEachRight',
        'forIn',
        'forInRight',
        'forOwn',
        'forOwnRight',
        'max',
        'maxBy',
        'min',
        'minBy'
    ];

    each(methods, function (methodName) {
        var array = [1, 2, 3];
        var func = require('../../../cartridges/lodash/' + methodName);
        var isBy = /(^partition|By)$/.test(methodName);
        var isOmitPick = /^(?:omit|pick)By$/.test(methodName);

        it('`_.' + methodName + '` should provide correct iteratee arguments', function () {
            if (func) {
                var args;
                var expected = [1, 0, array];

                func(array, function () {
                    args || (args = slice.call(arguments));
                });

                if (includes(rightMethods, methodName)) {
                    expected[0] = 3;
                    expected[1] = 2;
                }
                if (includes(objectMethods, methodName)) {
                    expected[1] += '';
                }
                if (isBy) {
                    expected.length = isOmitPick ? 2 : 1;
                }
                assert.deepStrictEqual(args, expected);
            }
        });
    });

    each(difference(methods, objectMethods), function (methodName) {
        var array = [1, 2, 3];
        var func = require('../../../cartridges/lodash/' + methodName);
        var isEvery = methodName === 'every';

        array.a = 1;

        it('`_.' + methodName + '` should not iterate custom properties on arrays', function () {
            if (func) {
                var keys = [];
                func(array, function (value, key) {
                    keys.push(key);
                    return isEvery;
                });

                assert.ok(!includes(keys, 'a'));
            }
        });
    });

    each(difference(methods, unwrappedMethods), function (methodName) {
        var array = [1, 2, 3];
        var isBaseEach = methodName === 'internal/baseEach';

        it('`_.' + methodName + '` should return a wrapped value when implicitly chaining', function () {
            if (!isBaseEach) {
                var wrapped = _(array)[methodName](noop);
                assert.ok(wrapped instanceof _);
            }
        });
    });

    each(unwrappedMethods, function (methodName) {
        var array = [1, 2, 3];

        it('`_.' + methodName + '` should return a wrapped value when explicitly chaining', function () {
            var wrapped = _(array).chain();
            var actual = wrapped[methodName](noop);

            assert.ok(actual instanceof _);
            assert.notStrictEqual(actual, wrapped);
        });
    });

    each(difference(methods, arrayMethods, forInMethods), function (methodName) {
        var func = require('../../../cartridges/lodash/' + methodName);

        it('`_.' + methodName + '` iterates over own string keyed properties of objects', function () {
            function Foo() {
                this.a = 1;
            }
            Foo.prototype.b = 2;

            if (func) {
                var values = [];
                func(new Foo(), function (value) { values.push(value); });
                assert.deepStrictEqual(values, [1]);
            }
        });
    });

    each(iterationMethods, function (methodName) {
        var array = [1, 2, 3];
        var func = require('../../../cartridges/lodash/' + methodName);

        it('`_.' + methodName + '` should return the collection', function () {
            if (func) {
                assert.strictEqual(func(array, Boolean), array);
            }
        });
    });

    each(collectionMethods, function (methodName) {
        var func = require('../../../cartridges/lodash/' + methodName);

        if (methodName === 'some') {
            return;
        }
        it('`_.' + methodName + '` should use `isArrayLike` to determine whether a value is array-like', function () {
            if (func) {
                var isIteratedAsObject = function (object) {
                    var result = false;
                    func(object, function () { result = true; }, 0);
                    return result;
                };

                var values = [-1, '1', 1.1, Object(1), MAX_SAFE_INTEGER + 1];
                var expected = map(values, stubTrue);

                var actual = map(values, function (length) {
                    return isIteratedAsObject({ 'length': length });
                });

                var Foo = function () {};
                Foo.a = 1;

                assert.deepStrictEqual(actual, expected);
                assert.ok(isIteratedAsObject(Foo));
                assert.ok(!isIteratedAsObject({ 'length': 0 }));
            }
        });
    });

    each(methods, function (methodName) {
        var func = require('../../../cartridges/lodash/' + methodName);
        var isFind = /^find/.test(methodName);
        var isSome = methodName === 'some';
        var isReduce = /^reduce/.test(methodName);

        it('`_.' + methodName + '` should ignore changes to `length`', function () {
            if (func) {
                var count = 0;
                var array = [1];

                func(array, function () {
                    if (++count === 1) {
                        array.push(2);
                    }
                    return !(isFind || isSome);
                }, isReduce ? array : null);

                assert.strictEqual(count, 1);
            }
        });
    });

    each(difference(union(methods, collectionMethods), arrayMethods), function (methodName) {
        var func = require('../../../cartridges/lodash/' + methodName);
        var isFind = /^find/.test(methodName);
        var isSome = methodName === 'some';
        var isReduce = /^reduce/.test(methodName);

        if (methodName === 'omitBy' || methodName === 'pickBy') {
            return;
        }

        it('`_.' + methodName + '` should ignore added `object` properties', function () {
            if (func) {
                var count = 0;
                var object = { 'a': 1 };

                func(object, function () {
                    if (++count === 1) {
                        object.b = 2;
                    }
                    return !(isFind || isSome);
                }, isReduce ? object : null);

                assert.strictEqual(count, 1);
            }
        });
    });
});
