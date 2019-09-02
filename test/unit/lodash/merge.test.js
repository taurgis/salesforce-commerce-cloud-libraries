var assert = require('assert');
var merge = require('../../../cartridges/lodash/merge');
var isArguments = require('../../../cartridges/lodash/isArguments');
var map = require('../../../cartridges/lodash/map');
var isEqual = require('../../../cartridges/lodash/isEqual');
var isBuffer = require('../../../cartridges/lodash/isBuffer');
var assign = require('../../../cartridges/lodash/assign');
var args = require('../helpers/args');
var { stubTrue } = require('../helpers/stubs');
var defineProperty = Object.defineProperty;

describe('merge', function () {
    it('should merge `source` into `object`', function () {
        var names = {
            'characters': [
                { 'name': 'barney' },
                { 'name': 'fred' }
            ]
        };

        var ages = {
            'characters': [
                { 'age': 36 },
                { 'age': 40 }
            ]
        };

        var heights = {
            'characters': [
                { 'height': '5\'4"' },
                { 'height': '5\'5"' }
            ]
        };

        var expected = {
            'characters': [
                { 'name': 'barney', 'age': 36, 'height': '5\'4"' },
                { 'name': 'fred', 'age': 40, 'height': '5\'5"' }
            ]
        };

        assert.deepStrictEqual(merge(names, ages, heights), expected);
    });

    it('should merge sources containing circular references', function () {
        var object = {
            'foo': { 'a': 1 },
            'bar': { 'a': 2 }
        };

        var source = {
            'foo': { 'b': { 'c': { 'd': {} } } },
            'bar': {}
        };

        source.foo.b.c.d = source;
        source.bar.b = source.foo.b;

        var actual = merge(object, source);

        assert.notStrictEqual(actual.bar.b, actual.foo.b);
        assert.strictEqual(actual.foo.b.c.d, actual.foo.b.c.d.foo.b.c.d);
    });

    it('should work with four arguments', function () {
        var expected = { 'a': 4 };
        var actual = merge({ 'a': 1 }, { 'a': 2 }, { 'a': 3 }, expected);

        assert.deepStrictEqual(actual, expected);
    });

    it('should merge onto function `object` values', function () {
        function Foo() {}

        var source = { 'a': 1 };
        var actual = merge(Foo, source);

        assert.strictEqual(actual, Foo);
        assert.strictEqual(Foo.a, 1);
    });

    it('should merge first source object properties to function', function () {
        var fn = function () {};
        var object = { 'prop': {} };
        var actual = merge({ 'prop': fn }, object);

        assert.deepStrictEqual(actual, object);
    });

    it('should merge first and second source object properties to function', function () {
        var fn = function () {};
        var object = { 'prop': {} };
        var actual = merge({ 'prop': fn }, { 'prop': fn }, object);

        assert.deepStrictEqual(actual, object);
    });

    it('should not merge onto function values of sources', function () {
        var source1 = { 'a': function () {} };
        var source2 = { 'a': { 'b': 2 } };
        var expected = { 'a': { 'b': 2 } };
        var actual = merge({}, source1, source2);

        assert.deepStrictEqual(actual, expected);
        assert.ok(!('b' in source1.a));

        actual = merge(source1, source2);
        assert.deepStrictEqual(actual, expected);
    });

    it('should merge onto non-plain `object` values', function () {
        function Foo() {}

        var object = new Foo();
        var actual = merge(object, { 'a': 1 });

        assert.strictEqual(actual, object);
        assert.strictEqual(object.a, 1);
    });

    it('should treat sparse array sources as dense', function () {
        var array = [1];
        array[2] = 3;

        var actual = merge([], array);
        var expected = array.slice();

        expected[1] = undefined;

        assert.ok('1' in actual);
        assert.deepStrictEqual(actual, expected);
    });

    it('should merge `arguments` objects', function () {
        var object1 = { 'value': args };
        var object2 = { 'value': { '3': 4 } };
        var expected = { '0': 1, '1': 2, '2': 3, '3': 4 };
        var actual = merge(object1, object2);

        assert.ok(!('3' in args));
        assert.ok(!isArguments(actual.value));
        assert.deepStrictEqual(actual.value, expected);
        object1.value = args;

        actual = merge(object2, object1);
        assert.ok(!isArguments(actual.value));
        assert.deepStrictEqual(actual.value, expected);

        expected = { '0': 1, '1': 2, '2': 3 };

        actual = merge({}, object1);
        assert.ok(!isArguments(actual.value));
        assert.deepStrictEqual(actual.value, expected);
    });

    it('should assign `null` values', function () {
        var actual = merge({ 'a': 1 }, { 'a': null });
        assert.strictEqual(actual.a, null);
    });

    it('should assign non array/buffer/typed-array/plain-object source values directly', function () {
        function Foo() {}

        var values = [new Foo(), Boolean(), new Date(), Foo, Number(), String(), new RegExp()];
        var expected = map(values, stubTrue);

        var actual = map(values, function (value) {
            var object = merge({}, { 'a': value, 'b': { 'c': value } });
            return object.a === value && object.b.c === value;
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should clone buffer source values', function () {
        if (Buffer) {
            var buffer = new Buffer([1]);
            var actual = merge({}, { 'value': buffer }).value;

            assert.ok(isBuffer(actual));
            assert.strictEqual(actual[0], buffer[0]);
            assert.notStrictEqual(actual, buffer);
        }
    });

    it('should deep clone array/typed-array/plain-object source values', function () {
        var typedArray = Uint8Array
            ? new Uint8Array([1])
            : { 'buffer': [1] };

        var props = ['0', 'buffer', 'a'];
        var values = [[{ 'a': 1 }], typedArray, { 'a': [1] }];
        var expected = map(values, stubTrue);

        var actual = map(values, function (value, index) {
            var key = props[index];
            var object = merge({}, { 'value': value });
            var subValue = value[key];
            var newValue = object.value;
            var newSubValue = newValue[key];

            return (
                newValue !== value &&
        newSubValue !== subValue &&
        isEqual(newValue, value)
            );
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should not augment source objects', function () {
        var source1 = { 'a': [{ 'a': 1 }] };
        var source2 = { 'a': [{ 'b': 2 }] };
        var actual = merge({}, source1, source2);

        assert.deepStrictEqual(source1.a, [{ 'a': 1 }]);
        assert.deepStrictEqual(source2.a, [{ 'b': 2 }]);
        assert.deepStrictEqual(actual.a, [{ 'a': 1, 'b': 2 }]);

        var source1 = { 'a': [[1, 2, 3]] }; // eslint-disable-line
        var source2 = { 'a': [[3, 4]] }; // eslint-disable-line
        var actual = merge({}, source1, source2); // eslint-disable-line

        assert.deepStrictEqual(source1.a, [[1, 2, 3]]);
        assert.deepStrictEqual(source2.a, [[3, 4]]);
        assert.deepStrictEqual(actual.a, [[3, 4, 3]]);
    });

    it('should merge plain objects onto non-plain objects', function () {
        function Foo(object) {
            assign(this, object);
        }

        var object = { 'a': 1 };
        var actual = merge(new Foo(), object);

        assert.ok(actual instanceof Foo);
        assert.deepStrictEqual(actual, new Foo(object));

        actual = merge([new Foo()], [object]);
        assert.ok(actual[0] instanceof Foo);
        assert.deepStrictEqual(actual, [new Foo(object)]);
    });

    it('should not overwrite existing values with `undefined` values of object sources', function () {
        var actual = merge({ 'a': 1 }, { 'a': undefined, 'b': undefined });
        assert.deepStrictEqual(actual, { 'a': 1, 'b': undefined });
    });

    it('should not overwrite existing values with `undefined` values of array sources', function () {
        var array = [1];
        array[2] = 3;

        var actual = merge([4, 5, 6], array);
        var expected = [1, 5, 3];

        assert.deepStrictEqual(actual, expected);

        array = [1, , 3];
        array[1] = undefined;

        actual = merge([4, 5, 6], array);
        assert.deepStrictEqual(actual, expected);
    });

    it('should skip merging when `object` and `source` are the same value', function () {
        var object = {};
        var pass = true;

        defineProperty(object, 'a', {
            'configurable': true,
            'enumerable': true,
            'get': function () { pass = false; },
            'set': function () { pass = false; }
        });

        merge(object, object);
        assert.ok(pass);
    });

    it('should convert values to arrays when merging arrays of `source`', function () {
        var object = { 'a': { '1': 'y', 'b': 'z', 'length': 2 } };
        var actual = merge(object, { 'a': ['x'] });

        assert.deepStrictEqual(actual, { 'a': ['x', 'y'] });

        actual = merge({ 'a': {} }, { 'a': [] });
        assert.deepStrictEqual(actual, { 'a': [] });
    });

    it('should convert strings to arrays when merging arrays of `source`', function () {
        var object = { 'a': 'abcde' };
        var actual = merge(object, { 'a': ['x', 'y', 'z'] });

        assert.deepStrictEqual(actual, { 'a': ['x', 'y', 'z'] });
    });
});
