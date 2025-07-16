var assert = require('assert');
var isEqual = require('../../../cartridges/lodash/isEqual');
var map = require('../../../cartridges/lodash/map');
var each = require('../../../cartridges/lodash/each');
var every = require('../../../cartridges/lodash/every');
var constant = require('../../../cartridges/lodash/constant');
var partial = require('../../../cartridges/lodash/partial');
var _ = require('../../../cartridges/lodash/wrapperLodash');
var args = require('../helpers/args');
var noop = require('../helpers/stubs').noop;
var create = Object.create;

describe('isEqual', function () {
    it('should compare primitives', function () {
        var pairs = [
            [1, 1, true], [1, Object(1), true], [1, '1', false], [1, 2, false],
            [-0, -0, true], [0, 0, true], [0, Object(0), true], [Object(0), Object(0), true], [-0, 0, true], [0, '0', false], [0, null, false],
            [NaN, NaN, true], [NaN, Object(NaN), true], [Object(NaN), Object(NaN), true], [NaN, 'a', false], [NaN, Infinity, false],
            ['a', 'a', true], ['a', Object('a'), true], [Object('a'), Object('a'), true], ['a', 'b', false], ['a', ['a'], false],
            [true, true, true], [true, Object(true), true], [Object(true), Object(true), true], [true, 1, false], [true, 'a', false],
            [false, false, true], [false, Object(false), true], [Object(false), Object(false), true], [false, 0, false], [false, '', false],
            [null, null, true], [null, undefined, false], [null, {}, false], [null, '', false],
            [undefined, undefined, true], [undefined, null, false], [undefined, '', false]
        ];

        var expected = map(pairs, function (pair) {
            return pair[2];
        });

        var actual = map(pairs, function (pair) {
            return isEqual(pair[0], pair[1]);
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should compare arrays', function () {
        var array1 = [true, null, 1, 'a', undefined];
        var array2 = [true, null, 1, 'a', undefined];

        assert.strictEqual(isEqual(array1, array2), true);

        array1 = [[1, 2, 3], new Date(2012, 4, 23), /x/, { 'e': 1 }];
        array2 = [[1, 2, 3], new Date(2012, 4, 23), /x/, { 'e': 1 }];

        assert.strictEqual(isEqual(array1, array2), true);

        array1 = [1];
        array1[2] = 3;

        array2 = [1];
        array2[1] = undefined;
        array2[2] = 3;

        assert.strictEqual(isEqual(array1, array2), true);

        array1 = [Object(1), false, Object('a'), /x/, new Date(2012, 4, 23), ['a', 'b', [Object('c')]], { 'a': 1 }];
        array2 = [1, Object(false), 'a', /x/, new Date(2012, 4, 23), ['a', Object('b'), ['c']], { 'a': 1 }];

        assert.strictEqual(isEqual(array1, array2), true);

        array1 = [1, 2, 3];
        array2 = [3, 2, 1];

        assert.strictEqual(isEqual(array1, array2), false);

        array1 = [1, 2];
        array2 = [1, 2, 3];

        assert.strictEqual(isEqual(array1, array2), false);
    });

    it('should treat arrays with identical values but different non-index properties as equal', function () {
        var array1 = [1, 2, 3];
        var array2 = [1, 2, 3];

        array1.every = array1.filter = array1.forEach =
    array1.indexOf = array1.lastIndexOf = array1.map =
    array1.some = array1.reduce = array1.reduceRight = null;

        array2.concat = array2.join = array2.pop =
    array2.reverse = array2.shift = array2.slice =
    array2.sort = array2.splice = array2.unshift = null;

        assert.strictEqual(isEqual(array1, array2), true);

        array1 = [1, 2, 3];
        array1.a = 1;

        array2 = [1, 2, 3];
        array2.b = 1;

        assert.strictEqual(isEqual(array1, array2), true);

        array1 = /c/.exec('abcde');
        array2 = ['c'];

        assert.strictEqual(isEqual(array1, array2), true);
    });

    it('should compare sparse arrays', function () {
        var array = Array(1);

        assert.strictEqual(isEqual(array, Array(1)), true);
        assert.strictEqual(isEqual(array, [undefined]), true);
        assert.strictEqual(isEqual(array, Array(2)), false);
    });

    it('should compare plain objects', function () {
        var object1 = { 'a': true, 'b': null, 'c': 1, 'd': 'a', 'e': undefined };
        var object2 = { 'a': true, 'b': null, 'c': 1, 'd': 'a', 'e': undefined };

        assert.strictEqual(isEqual(object1, object2), true);

        object1 = { 'a': [1, 2, 3], 'b': new Date(2012, 4, 23), 'c': /x/, 'd': { 'e': 1 } };
        object2 = { 'a': [1, 2, 3], 'b': new Date(2012, 4, 23), 'c': /x/, 'd': { 'e': 1 } };

        assert.strictEqual(isEqual(object1, object2), true);

        object1 = { 'a': 1, 'b': 2, 'c': 3 };
        object2 = { 'a': 3, 'b': 2, 'c': 1 };

        assert.strictEqual(isEqual(object1, object2), false);

        object1 = { 'a': 1, 'b': 2, 'c': 3 };
        object2 = { 'd': 1, 'e': 2, 'f': 3 };

        assert.strictEqual(isEqual(object1, object2), false);

        object1 = { 'a': 1, 'b': 2 };
        object2 = { 'a': 1, 'b': 2, 'c': 3 };

        assert.strictEqual(isEqual(object1, object2), false);
    });

    it('should compare objects regardless of key order', function () {
        var object1 = { 'a': 1, 'b': 2, 'c': 3 };
        var object2 = { 'c': 3, 'a': 1, 'b': 2 };

        assert.strictEqual(isEqual(object1, object2), true);
    });

    it('should compare nested objects', function () {
        var object1 = {
            'a': [1, 2, 3],
            'b': true,
            'c': Object(1),
            'd': 'a',
            'e': {
                'f': ['a', Object('b'), 'c'],
                'g': Object(false),
                'h': new Date(2012, 4, 23),
                'i': noop,
                'j': 'a'
            }
        };

        var object2 = {
            'a': [1, Object(2), 3],
            'b': Object(true),
            'c': 1,
            'd': Object('a'),
            'e': {
                'f': ['a', 'b', 'c'],
                'g': false,
                'h': new Date(2012, 4, 23),
                'i': noop,
                'j': 'a'
            }
        };

        assert.strictEqual(isEqual(object1, object2), true);
    });

    it('should compare object instances', function () {
        function Foo() {
            this.a = 1;
        }
        Foo.prototype.a = 1;

        function Bar() {
            this.a = 1;
        }
        Bar.prototype.a = 2;

        assert.strictEqual(isEqual(new Foo(), new Foo()), true);
        assert.strictEqual(isEqual(new Foo(), new Bar()), false);
        assert.strictEqual(isEqual({ 'a': 1 }, new Foo()), false);
        assert.strictEqual(isEqual({ 'a': 2 }, new Bar()), false);
    });

    it('should compare objects with constructor properties', function () {
        assert.strictEqual(isEqual({ 'constructor': 1 }, { 'constructor': 1 }), true);
        assert.strictEqual(isEqual({ 'constructor': 1 }, { 'constructor': '1' }), false);
        assert.strictEqual(isEqual({ 'constructor': [1] }, { 'constructor': [1] }), true);
        assert.strictEqual(isEqual({ 'constructor': [1] }, { 'constructor': ['1'] }), false);
        assert.strictEqual(isEqual({ 'constructor': Object }, {}), false);
    });

    it('should compare arrays with circular references', function () {
        var array1 = [];
        var array2 = [];

        array1.push(array1);
        array2.push(array2);

        assert.strictEqual(isEqual(array1, array2), true);

        array1.push('b');
        array2.push('b');

        assert.strictEqual(isEqual(array1, array2), true);

        array1.push('c');
        array2.push('d');

        assert.strictEqual(isEqual(array1, array2), false);

        array1 = ['a', 'b', 'c'];
        array1[1] = array1;
        array2 = ['a', ['a', 'b', 'c'], 'c'];

        assert.strictEqual(isEqual(array1, array2), false);
    });

    it('should have transitive equivalence for circular references of arrays', function () {
        var array1 = [];
        var array2 = [array1];
        var array3 = [array2];

        array1[0] = array1;

        assert.strictEqual(isEqual(array1, array2), true);
        assert.strictEqual(isEqual(array2, array3), true);
        assert.strictEqual(isEqual(array1, array3), true);
    });

    it('should compare objects with circular references', function () {
        var object1 = {};
        var object2 = {};

        object1.a = object1;
        object2.a = object2;

        assert.strictEqual(isEqual(object1, object2), true);

        object1.b = 0;
        object2.b = Object(0);

        assert.strictEqual(isEqual(object1, object2), true);

        object1.c = Object(1);
        object2.c = Object(2);

        assert.strictEqual(isEqual(object1, object2), false);

        object1 = { 'a': 1, 'b': 2, 'c': 3 };
        object1.b = object1;
        object2 = { 'a': 1, 'b': { 'a': 1, 'b': 2, 'c': 3 }, 'c': 3 };

        assert.strictEqual(isEqual(object1, object2), false);
    });

    it('should have transitive equivalence for circular references of objects', function () {
        var object1 = {};
        var object2 = { 'a': object1 };
        var object3 = { 'a': object2 };

        object1.a = object1;

        assert.strictEqual(isEqual(object1, object2), true);
        assert.strictEqual(isEqual(object2, object3), true);
        assert.strictEqual(isEqual(object1, object3), true);
    });

    it('should compare objects with multiple circular references', function () {
        var array1 = [{}];
        var array2 = [{}];

        (array1[0].a = array1).push(array1);
        (array2[0].a = array2).push(array2);

        assert.strictEqual(isEqual(array1, array2), true);

        array1[0].b = 0;
        array2[0].b = Object(0);

        assert.strictEqual(isEqual(array1, array2), true);

        array1[0].c = Object(1);
        array2[0].c = Object(2);

        assert.strictEqual(isEqual(array1, array2), false);
    });

    it('should compare objects with complex circular references', function () {
        var object1 = {
            'foo': { 'b': { 'c': { 'd': {} } } },
            'bar': { 'a': 2 }
        };

        var object2 = {
            'foo': { 'b': { 'c': { 'd': {} } } },
            'bar': { 'a': 2 }
        };

        object1.foo.b.c.d = object1;
        object1.bar.b = object1.foo.b;

        object2.foo.b.c.d = object2;
        object2.bar.b = object2.foo.b;

        assert.strictEqual(isEqual(object1, object2), true);
    });

    it('should compare objects with shared property values', function () {
        var object1 = {
            'a': [1, 2]
        };

        var object2 = {
            'a': [1, 2],
            'b': [1, 2]
        };

        object1.b = object1.a;

        assert.strictEqual(isEqual(object1, object2), true);
    });

    it('should treat objects created by `Object.create(null)` like plain objects', function () {
        function Foo() {
            this.a = 1;
        }
        Foo.prototype.constructor = null;

        var object1 = create(null);
        object1.a = 1;

        var object2 = { 'a': 1 };

        assert.strictEqual(isEqual(object1, object2), true);
        assert.strictEqual(isEqual(new Foo(), object2), false);
    });

    it('should avoid common type coercions', function () {
        assert.strictEqual(isEqual(true, Object(false)), false);
        assert.strictEqual(isEqual(Object(false), Object(0)), false);
        assert.strictEqual(isEqual(false, Object('')), false);
        assert.strictEqual(isEqual(Object(36), Object('36')), false);
        assert.strictEqual(isEqual(0, ''), false);
        assert.strictEqual(isEqual(1, true), false);
        assert.strictEqual(isEqual(1337756400000, new Date(2012, 4, 23)), false);
        assert.strictEqual(isEqual('36', 36), false);
        assert.strictEqual(isEqual(36, '36'), false);
    });

    it('should compare `arguments` objects', function () {
        var args1 = (function () { return arguments; }());
        var args2 = (function () { return arguments; }());
        var args3 = (function () { return arguments; }(1, 2));

        assert.strictEqual(isEqual(args1, args2), true);
        assert.strictEqual(isEqual(args1, args3), false);
    });

    it('should treat `arguments` objects like `Object` objects', function () {
        var object = { '0': 1, '1': 2, '2': 3 };

        function Foo() {}
        Foo.prototype = object;

        assert.strictEqual(isEqual(args, object), true);
        assert.strictEqual(isEqual(object, args), true);
        assert.strictEqual(isEqual(args, new Foo()), false);
        assert.strictEqual(isEqual(new Foo(), args), false);
    });

    it('should compare array buffers', function () {
        if (ArrayBuffer) {
            var buffer = new Int8Array([-1]).buffer;

            assert.strictEqual(isEqual(buffer, new Uint8Array([255]).buffer), true);
            assert.strictEqual(isEqual(buffer, new ArrayBuffer(1)), false);
        }
    });

    it('should compare buffers', function () {
        if (Buffer) {
            var buffer = new Buffer([1]);

            assert.strictEqual(isEqual(buffer, new Buffer([1])), true);
            assert.strictEqual(isEqual(buffer, new Buffer([2])), false);
            assert.strictEqual(isEqual(buffer, new Uint8Array([1])), false);
        }
    });

    it('should compare date objects', function () {
        var date = new Date(2012, 4, 23);

        assert.strictEqual(isEqual(date, new Date(2012, 4, 23)), true);
        assert.strictEqual(isEqual(new Date('a'), new Date('b')), true);
        assert.strictEqual(isEqual(date, new Date(2013, 3, 25)), false);
        assert.strictEqual(isEqual(date, { 'getTime': constant(+date) }), false);
    });

    it('should compare error objects', function () {
        var pairs = map([
            'Error',
            'EvalError',
            'RangeError',
            'ReferenceError',
            'SyntaxError',
            'TypeError',
            'URIError'
        ], function (type, index, errorTypes) {
            var otherType = errorTypes[++index % errorTypes.length]; // eslint-disable-line
            var root = globalThis || window || this; // eslint-disable-line
            var CtorA = root[type]; // eslint-disable-line
            var CtorB = root[otherType]; // eslint-disable-line

            return [new CtorA('a'), new CtorA('a'), new CtorB('a'), new CtorB('b')];
        });

        var expected = map(pairs, constant([true, false, false]));

        var actual = map(pairs, function (pair) {
            return [isEqual(pair[0], pair[1]), isEqual(pair[0], pair[2]), isEqual(pair[2], pair[3])];
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should compare functions', function () {
        function a() { return 1 + 2; }
        function b() { return 1 + 2; }

        assert.strictEqual(isEqual(a, a), true);
        assert.strictEqual(isEqual(a, b), false);
    });

    it('should compare regexes', function () {
        assert.strictEqual(isEqual(/x/gim, /x/gim), true);
        assert.strictEqual(isEqual(/x/gim, /x/mgi), true);
        assert.strictEqual(isEqual(/x/gi, /x/g), false);
        assert.strictEqual(isEqual(/x/, /y/), false);
        assert.strictEqual(isEqual(/x/g, { 'global': true, 'ignoreCase': false, 'multiline': false, 'source': 'x' }), false);
    });

    it('should compare wrapped values', function () {
        var stamp = +new Date();

        var values = [
            [[1, 2], [1, 2], [1, 2, 3]],
            [true, true, false],
            [new Date(stamp), new Date(stamp), new Date(stamp - 100)],
            [{ 'a': 1, 'b': 2 }, { 'a': 1, 'b': 2 }, { 'a': 1, 'b': 1 }],
            [1, 1, 2],
            [NaN, NaN, Infinity],
            [/x/, /x/, /x/i],
            ['a', 'a', 'A']
        ];

        each(values, function (vals) {
            var wrapped1 = _(vals[0]);
            var wrapped2 = _(vals[1]);
            var actual = wrapped1.isEqual(wrapped2);

            assert.strictEqual(actual.value(), true);
            assert.strictEqual(isEqual(_(actual), _(true)), true);

            wrapped1 = _(vals[0]);
            wrapped2 = _(vals[2]);

            actual = wrapped1.isEqual(wrapped2);
            assert.strictEqual(actual.value(), false);
            assert.strictEqual(isEqual(_(actual), _(false)), true);
        });
    });

    it('should compare wrapped and non-wrapped values', function () {
        var object1 = _({ 'a': 1, 'b': 2 });
        var object2 = { 'a': 1, 'b': 2 };

        assert.strictEqual(object1.isEqual(object2).value(), true);
        assert.strictEqual(isEqual(object1, object2), true);

        object1 = _({ 'a': 1, 'b': 2 });
        object2 = { 'a': 1, 'b': 1 };

        assert.strictEqual(object1.isEqual(object2).value(), false);
        assert.strictEqual(isEqual(object1, object2), false);
    });

    it('should work as an iteratee for `_.every`', function () {
        var actual = every([1, 1, 1], partial(isEqual, 1));
        assert.ok(actual);
    });

    it('should return `false` for objects with custom `toString` methods', function () {
        var primitive;
        var object = { 'toString': function () { return primitive; } };
        var values = [true, null, 1, 'a', undefined];
        var expected = [false, false, false, false, false];

        var actual = map(values, function (value) {
            primitive = value;
            return isEqual(object, value);
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should return an unwrapped value when implicitly chaining', function () {
        assert.strictEqual(_('a').isEqual('a').value(), true);
    });

    it('should return a wrapped value when explicitly chaining', function () {
        assert.ok(_('a').chain().isEqual('a') instanceof _);
    });
});
