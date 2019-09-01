var assert = require('assert');
var matches = require('../../../cartridges/lodash/matches');
var isMatch = require('../../../cartridges/lodash/isMatch');
var assign = require('../../../cartridges/lodash/assign');
var map = require('../../../cartridges/lodash/map');
var each = require('../../../cartridges/lodash/each');
var filter = require('../../../cartridges/lodash/filter');
var { stubTrue, noop, stubFalse, empties } = require('../helpers/stubs');
var numberProto = Number.prototype;

describe('matches methods', function () {
    each(['matches', 'isMatch'], function (methodName) {
        var isMatches = methodName === 'matches';

        function matchesFn(source) {
            return isMatches ? matches(source) : function (object) {
                return isMatch(object, source);
            };
        }

        it('`_.' + methodName + '` should perform a deep comparison between `source` and `object`', function () {
            var object = { 'a': 1, 'b': 2, 'c': 3 };
            var par = matchesFn({ 'a': 1 });

            assert.strictEqual(par(object), true);

            par = matchesFn({ 'b': 1 });
            assert.strictEqual(par(object), false);

            par = matchesFn({ 'a': 1, 'c': 3 });
            assert.strictEqual(par(object), true);

            par = matchesFn({ 'c': 3, 'd': 4 });
            assert.strictEqual(par(object), false);

            object = { 'a': { 'b': { 'c': 1, 'd': 2 }, 'e': 3 }, 'f': 4 };
            par = matchesFn({ 'a': { 'b': { 'c': 1 } } });

            assert.strictEqual(par(object), true);
        });

        it('`_.' + methodName + '` should match inherited string keyed `object` properties', function () {
            function Foo() {
                this.a = 1;
            }
            Foo.prototype.b = 2;

            var object = { 'a': new Foo() };
            var par = matchesFn({ 'a': { 'b': 2 } });

            assert.strictEqual(par(object), true);
        });

        it('`_.' + methodName + '` should not match by inherited `source` properties', function () {
            function Foo() {
                this.a = 1;
            }
            Foo.prototype.b = 2;

            var objects = [{ 'a': 1 }, { 'a': 1, 'b': 2 }];
            var source = new Foo();
            var actual = map(objects, matchesFn(source));
            var expected = map(objects, stubTrue);

            assert.deepStrictEqual(actual, expected);
        });

        it('`_.' + methodName + '` should compare a variety of `source` property values', function () {
            var object1 = { 'a': false, 'b': true, 'c': '3', 'd': 4, 'e': [5], 'f': { 'g': 6 } };
            var object2 = { 'a': 0, 'b': 1, 'c': 3, 'd': '4', 'e': ['5'], 'f': { 'g': '6' } };
            var par = matchesFn(object1);

            assert.strictEqual(par(object1), true);
            assert.strictEqual(par(object2), false);
        });

        it('`_.' + methodName + '` should match `-0` as `0`', function () {
            var object1 = { 'a': -0 };
            var object2 = { 'a': 0 };
            var par = matchesFn(object1);

            assert.strictEqual(par(object2), true);

            par = matchesFn(object2);
            assert.strictEqual(par(object1), true);
        });

        it('`_.' + methodName + '` should compare functions by reference', function () {
            var object1 = { 'a': noop };
            var object2 = { 'a': require('../../../cartridges/lodash/noop') };
            var object3 = { 'a': {} };
            var par = matchesFn(object1);

            assert.strictEqual(par(object1), true);
            assert.strictEqual(par(object2), false);
            assert.strictEqual(par(object3), false);
        });

        it('`_.' + methodName + '` should work with a function for `object`', function () {
            function Foo() {}
            Foo.a = { 'b': 2, 'c': 3 };

            var par = matchesFn({ 'a': { 'b': 2 } });
            assert.strictEqual(par(Foo), true);
        });

        it('`_.' + methodName + '` should work with a function for `source`', function () {
            function Foo() {}
            Foo.a = 1;
            Foo.b = function () {};
            Foo.c = 3;

            var objects = [{ 'a': 1 }, { 'a': 1, 'b': Foo.b, 'c': 3 }];
            var actual = map(objects, matchesFn(Foo));

            assert.deepStrictEqual(actual, [false, true]);
        });

        it('`_.' + methodName + '` should work with a non-plain `object`', function () {
            function Foo(object) { assign(this, object); }

            var object = new Foo({ 'a': new Foo({ 'b': 2, 'c': 3 }) });
            var par = matchesFn({ 'a': { 'b': 2 } });

            assert.strictEqual(par(object), true);
        });

        it('`_.' + methodName + '` should partial match arrays', function () {
            var objects = [{ 'a': ['b'] }, { 'a': ['c', 'd'] }];
            var actual = filter(objects, matchesFn({ 'a': ['d'] }));

            assert.deepStrictEqual(actual, [objects[1]]);

            actual = filter(objects, matchesFn({ 'a': ['b', 'd'] }));
            assert.deepStrictEqual(actual, []);

            actual = filter(objects, matchesFn({ 'a': ['d', 'b'] }));
            assert.deepStrictEqual(actual, []);
        });

        it('`_.' + methodName + '` should partial match arrays with duplicate values', function () {
            var objects = [{ 'a': [1, 2] }, { 'a': [2, 2] }];
            var actual = filter(objects, matchesFn({ 'a': [2, 2] }));

            assert.deepStrictEqual(actual, [objects[1]]);
        });

        it('should partial match arrays of objects', function () {
            var objects = [
                { 'a': [{ 'b': 1, 'c': 2 }, { 'b': 4, 'c': 5, 'd': 6 }] },
                { 'a': [{ 'b': 1, 'c': 2 }, { 'b': 4, 'c': 6, 'd': 7 }] }
            ];

            var actual = filter(objects, matchesFn({ 'a': [{ 'b': 1 }, { 'b': 4, 'c': 5 }] }));
            assert.deepStrictEqual(actual, [objects[0]]);
        });


        it('`_.' + methodName + '` should match `undefined` values', function () {
            var objects = [{ 'a': 1 }, { 'a': 1, 'b': 1 }, { 'a': 1, 'b': undefined }];
            var actual = map(objects, matchesFn({ 'b': undefined }));
            var expected = [false, false, true];

            assert.deepStrictEqual(actual, expected);

            actual = map(objects, matchesFn({ 'a': 1, 'b': undefined }));

            assert.deepStrictEqual(actual, expected);

            objects = [{ 'a': { 'b': 2 } }, { 'a': { 'b': 2, 'c': 3 } }, { 'a': { 'b': 2, 'c': undefined } }];
            actual = map(objects, matchesFn({ 'a': { 'c': undefined } }));

            assert.deepStrictEqual(actual, expected);
        });

        it('`_.' + methodName + '` should match `undefined` values on primitives', function () {
            numberProto.a = 1;
            numberProto.b = undefined;

            try {
                var par = matchesFn({ 'b': undefined });
                assert.strictEqual(par(1), true);
            } catch (e) {
                assert.ok(false, e.message);
            }
            try {
                par = matchesFn({ 'a': 1, 'b': undefined });
                assert.strictEqual(par(1), true);
            } catch (e) {
                assert.ok(false, e.message);
            }
            numberProto.a = { 'b': 1, 'c': undefined };
            try {
                par = matchesFn({ 'a': { 'c': undefined } });
                assert.strictEqual(par(1), true);
            } catch (e) {
                assert.ok(false, e.message);
            }
            delete numberProto.a;
            delete numberProto.b;
        });

        it('`_.' + methodName + '` should return `false` when `object` is nullish', function () {
            var values = [, null, undefined];
            var expected = map(values, stubFalse);
            var par = matchesFn({ 'a': 1 });

            var actual = map(values, function (value, index) {
                try {
                    return index ? par(value) : par();
                } catch (e) {
                    // DO NOTHING
                }
            });

            assert.deepStrictEqual(actual, expected);
        });

        it('`_.' + methodName + '` should return `true` when comparing an empty `source`', function () {
            var object = { 'a': 1 };
            var expected = map(empties, stubTrue);

            var actual = map(empties, function (value) {
                var par = matchesFn(value);
                return par(object);
            });

            assert.deepStrictEqual(actual, expected);
        });

        it('`_.' + methodName + '` should return `true` when comparing an empty `source` to a nullish `object`', function () {
            var values = [, null, undefined];
            var expected = map(values, stubTrue);
            var par = matchesFn({});

            var actual = map(values, function (value, index) {
                try {
                    return index ? par(value) : par();
                } catch (e) {
                    // DO NOTHING
                }
            });

            assert.deepStrictEqual(actual, expected);
        });

        it('`_.' + methodName + '` should return `true` when comparing a `source` of empty arrays and objects', function () {
            var objects = [{ 'a': [1], 'b': { 'c': 1 } }, { 'a': [2, 3], 'b': { 'd': 2 } }];
            var actual = filter(objects, matchesFn({ 'a': [], 'b': {} }));

            assert.deepStrictEqual(actual, objects);
        });
    });
});
