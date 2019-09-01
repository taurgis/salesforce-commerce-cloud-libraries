var assert = require('assert');
var matchesProperty = require('../../../cartridges/lodash/matchesProperty');
var cloneDeep = require('../../../cartridges/lodash/cloneDeep');
var each = require('../../../cartridges/lodash/each');
var map = require('../../../cartridges/lodash/map');
var times = require('../../../cartridges/lodash/times');
var filter = require('../../../cartridges/lodash/filter');
var constant = require('../../../cartridges/lodash/constant');
var assign = require('../../../cartridges/lodash/assign');
var { stubTrue, stubFalse, noop } = require('../helpers/stubs');
var numberProto = Number.prototype;

describe('matchesProperty', function () {
    it('should create a function that performs a deep comparison between a property value and `srcValue`', function () {
        var object = { 'a': 1, 'b': 2, 'c': 3 };
        var matches = matchesProperty('a', 1);

        assert.strictEqual(matches.length, 1);
        assert.strictEqual(matches(object), true);

        matches = matchesProperty('b', 3);
        assert.strictEqual(matches(object), false);

        matches = matchesProperty('a', { 'a': 1, 'c': 3 });
        assert.strictEqual(matches({ 'a': object }), true);

        matches = matchesProperty('a', { 'c': 3, 'd': 4 });
        assert.strictEqual(matches(object), false);

        object = { 'a': { 'b': { 'c': 1, 'd': 2 }, 'e': 3 }, 'f': 4 };
        matches = matchesProperty('a', { 'b': { 'c': 1 } });

        assert.strictEqual(matches(object), true);
    });

    it('should support deep paths', function () {
        var object = { 'a': { 'b': 2 } };

        each(['a.b', ['a', 'b']], function (path) {
            var matches = matchesProperty(path, 2);
            assert.strictEqual(matches(object), true);
        });
    });

    it('should work with a non-string `path`', function () {
        var array = [1, 2, 3];

        each([1, [1]], function (path) {
            var matches = matchesProperty(path, 2);
            assert.strictEqual(matches(array), true);
        });
    });

    it('should preserve the sign of `0`', function () {
        var object1 = { '-0': 'a' };
        var object2 = { '0': 'b' };
        var pairs = [[object1, object2], [object1, object2], [object2, object1], [object2, object1]];
        var props = [-0, Object(-0), 0, Object(0)];
        var values = ['a', 'a', 'b', 'b'];
        var expected = map(props, constant([true, false]));

        var actual = map(props, function (key, index) {
            var matches = matchesProperty(key, values[index]);
            var pair = pairs[index];

            return [matches(pair[0]), matches(pair[1])];
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should coerce `path` to a string', function () {
        function fn() {}
        fn.toString = constant('fn');

        var object = { 'null': 1, 'undefined': 2, 'fn': 3, '[object Object]': 4 };
        var paths = [null, undefined, fn, {}];
        var expected = map(paths, stubTrue);

        times(2, function (index) {
            var actual = map(paths, function (path) {
                var matches = matchesProperty(index ? [path] : path, object[path]);
                return matches(object);
            });

            assert.deepStrictEqual(actual, expected);
        });
    });

    it('should match a key over a path', function () {
        var object = { 'a.b': 1, 'a': { 'b': 2 } };

        each(['a.b', ['a.b']], function (path) {
            var matches = matchesProperty(path, 1);
            assert.strictEqual(matches(object), true);
        });
    });

    it('should return `false` when `object` is nullish', function () {
        var values = [, null, undefined];
        var expected = map(values, stubFalse);

        each(['constructor', ['constructor']], function (path) {
            var matches = matchesProperty(path, 1);

            var actual = map(values, function (value, index) {
                try {
                    return index ? matches(value) : matches();
                } catch (e) {
                    // DO NOTHING
                }
            });

            assert.deepStrictEqual(actual, expected);
        });
    });

    it('should return `false` for deep paths when `object` is nullish', function () {
        var values = [, null, undefined];
        var expected = map(values, stubFalse);

        each(['constructor.prototype.valueOf', ['constructor', 'prototype', 'valueOf']], function (path) {
            var matches = matchesProperty(path, 1);

            var actual = map(values, function (value, index) {
                try {
                    return index ? matches(value) : matches();
                } catch (e) {
                    // DO NOTHING
                }
            });

            assert.deepStrictEqual(actual, expected);
        });
    });

    it('should return `false` if parts of `path` are missing', function () {
        var object = {};

        each(['a', 'a[1].b.c', ['a'], ['a', '1', 'b', 'c']], function (path) {
            var matches = matchesProperty(path, 1);
            assert.strictEqual(matches(object), false);
        });
    });

    it('should match inherited string keyed `srcValue` properties', function () {
        function Foo() {}
        Foo.prototype.b = 2;

        var object = { 'a': new Foo() };

        each(['a', ['a']], function (path) {
            var matches = matchesProperty(path, { 'b': 2 });
            assert.strictEqual(matches(object), true);
        });
    });

    it('should not match by inherited `srcValue` properties', function () {
        function Foo() {
            this.a = 1;
        }
        Foo.prototype.b = 2;

        var objects = [{ 'a': { 'a': 1 } }, { 'a': { 'a': 1, 'b': 2 } }];
        var expected = map(objects, stubTrue);

        each(['a', ['a']], function (path) {
            assert.deepStrictEqual(map(objects, matchesProperty(path, new Foo())), expected);
        });
    });

    it('should compare a variety of values', function () {
        var object1 = { 'a': false, 'b': true, 'c': '3', 'd': 4, 'e': [5], 'f': { 'g': 6 } };
        var object2 = { 'a': 0, 'b': 1, 'c': 3, 'd': '4', 'e': ['5'], 'f': { 'g': '6' } };
        var matches = matchesProperty('a', object1);

        assert.strictEqual(matches({ 'a': object1 }), true);
        assert.strictEqual(matches({ 'a': object2 }), false);
    });

    it('should match `-0` as `0`', function () {
        var matches = matchesProperty('a', -0);
        assert.strictEqual(matches({ 'a': 0 }), true);

        matches = matchesProperty('a', 0);
        assert.strictEqual(matches({ 'a': -0 }), true);
    });

    it('should compare functions by reference', function () {
        var object1 = { 'a': require('../../../cartridges/lodash/noop') };
        var object2 = { 'a': noop };
        var object3 = { 'a': {} };
        var matches = matchesProperty('a', object1);

        assert.strictEqual(matches({ 'a': object1 }), true);
        assert.strictEqual(matches({ 'a': object2 }), false);
        assert.strictEqual(matches({ 'a': object3 }), false);
    });

    it('should work with a function for `srcValue`', function () {
        function Foo() {}
        Foo.a = 1;
        Foo.b = function () {};
        Foo.c = 3;

        var objects = [{ 'a': { 'a': 1 } }, { 'a': { 'a': 1, 'b': Foo.b, 'c': 3 } }];
        var actual = map(objects, matchesProperty('a', Foo));

        assert.deepStrictEqual(actual, [false, true]);
    });

    it('should work with a non-plain `srcValue`', function () {
        function Foo(object) { assign(this, object); }

        var object = new Foo({ 'a': new Foo({ 'b': 1, 'c': 2 }) });
        var matches = matchesProperty('a', { 'b': 1 });

        assert.strictEqual(matches(object), true);
    });

    it('should partial match arrays', function () {
        var objects = [{ 'a': ['b'] }, { 'a': ['c', 'd'] }];
        var actual = filter(objects, matchesProperty('a', ['d']));

        assert.deepStrictEqual(actual, [objects[1]]);

        actual = filter(objects, matchesProperty('a', ['b', 'd']));
        assert.deepStrictEqual(actual, []);

        actual = filter(objects, matchesProperty('a', ['d', 'b']));
        assert.deepStrictEqual(actual, []);
    });

    it('should partial match arrays with duplicate values', function () {
        var objects = [{ 'a': [1, 2] }, { 'a': [2, 2] }];
        var actual = filter(objects, matchesProperty('a', [2, 2]));

        assert.deepStrictEqual(actual, [objects[1]]);
    });

    it('should partial match arrays of objects', function () {
        var objects = [
            { 'a': [{ 'a': 1, 'b': 2 }, { 'a': 4, 'b': 5, 'c': 6 }] },
            { 'a': [{ 'a': 1, 'b': 2 }, { 'a': 4, 'b': 6, 'c': 7 }] }
        ];

        var actual = filter(objects, matchesProperty('a', [{ 'a': 1 }, { 'a': 4, 'b': 5 }]));
        assert.deepStrictEqual(actual, [objects[0]]);
    });

    it('should partial match sets', function () {
        if (Set) {
            var objects = [{ 'a': new Set() }, { 'a': new Set() }];
            objects[0].a.add(1);
            objects[1].a.add(1);
            objects[1].a.add(2);

            var set = new Set();
            set.add(2);
            var actual = filter(objects, matchesProperty('a', set));

            assert.deepStrictEqual(actual, [objects[1]]);

            set.delete(2);
            actual = filter(objects, matchesProperty('a', set));

            assert.deepStrictEqual(actual, objects);

            set.add(3);
            actual = filter(objects, matchesProperty('a', set));

            assert.deepStrictEqual(actual, []);
        }
    });

    it('should match `undefined` values', function () {
        var objects = [{ 'a': 1 }, { 'a': 1, 'b': 1 }, { 'a': 1, 'b': undefined }];
        var actual = map(objects, matchesProperty('b', undefined));
        var expected = [false, false, true];

        assert.deepStrictEqual(actual, expected);

        objects = [{ 'a': { 'a': 1 } }, { 'a': { 'a': 1, 'b': 1 } }, { 'a': { 'a': 1, 'b': undefined } }];
        actual = map(objects, matchesProperty('a', { 'b': undefined }));

        assert.deepStrictEqual(actual, expected);
    });

    it('should match `undefined` values of nested objects', function () {
        var object = { 'a': { 'b': undefined } };

        each(['a.b', ['a', 'b']], function (path) {
            var matches = matchesProperty(path, undefined);
            assert.strictEqual(matches(object), true);
        });

        each(['a.a', ['a', 'a']], function (path) {
            var matches = matchesProperty(path, undefined);
            assert.strictEqual(matches(object), false);
        });
    });

    it('should match `undefined` values on primitives', function () {
        numberProto.a = 1;
        numberProto.b = undefined;

        try {
            var matches = matchesProperty('b', undefined);
            assert.strictEqual(matches(1), true);
        } catch (e) {
            assert.ok(false, e.message);
        }
        numberProto.a = { 'b': 1, 'c': undefined };
        try {
            matches = matchesProperty('a', { 'c': undefined });
            assert.strictEqual(matches(1), true);
        } catch (e) {
            assert.ok(false, e.message);
        }
        delete numberProto.a;
        delete numberProto.b;
    });

    it('should return `true` when comparing a `srcValue` of empty arrays and objects', function () {
        var objects = [{ 'a': [1], 'b': { 'c': 1 } }, { 'a': [2, 3], 'b': { 'd': 2 } }];
        var matches = matchesProperty('a', { 'a': [], 'b': {} });

        var actual = filter(objects, function (object) {
            return matches({ 'a': object });
        });

        assert.deepStrictEqual(actual, objects);
    });

    it('should not change behavior if `srcValue` is modified', function () {
        each([{ 'a': { 'b': 2, 'c': 3 } }, { 'a': 1, 'b': 2 }, { 'a': 1 }], function (source, index) {
            var object = cloneDeep(source);
            var matches = matchesProperty('a', source);

            assert.strictEqual(matches({ 'a': object }), true);

            if (index) {
                source.a = 2;
                source.b = 1;
                source.c = 3;
            } else {
                source.a.b = 1;
                source.a.c = 2;
                source.a.d = 3;
            }
            assert.strictEqual(matches({ 'a': object }), true);
            assert.strictEqual(matches({ 'a': source }), false);
        });
    });
});
