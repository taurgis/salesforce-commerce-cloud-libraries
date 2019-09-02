var assert = require('assert');
var { stubFalse } = require('../helpers/stubs');
var push = Array.prototype.push;
var cloneDeep = require('../../../cartridges/lodash/cloneDeep');
var map = require('../../../cartridges/lodash/map');
var partial = require('../../../cartridges/lodash/partial');
var partialRight = require('../../../cartridges/lodash/partialRight');
var identity = require('../../../cartridges/lodash/identity');
var constant = require('../../../cartridges/lodash/constant');
var iteratee = require('../../../cartridges/lodash/iteratee');
var each = require('../../../cartridges/lodash/each');
var slice = Array.prototype.slice;

describe('iteratee', function () {
    it('should provide arguments to `func`', function () {
        var fn = function () { return slice.call(arguments); };
        var iterateeFn = iteratee(fn);
        var actual = iterateeFn('a', 'b', 'c', 'd', 'e', 'f');

        assert.deepStrictEqual(actual, ['a', 'b', 'c', 'd', 'e', 'f']);
    });

    it('should return `_.identity` when `func` is nullish', function () {
        var object = {};
        var values = [, null, undefined];
        var expected = map(values, constant([identity, object]));

        var actual = map(values, function (value, index) {
            var identityIteratee = index ? iteratee(value) : iteratee();
            return [identityIteratee, identityIteratee(object)];
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should return an iteratee created by `_.matches` when `func` is an object', function () {
        var matches = iteratee({ 'a': 1, 'b': 2 });
        assert.strictEqual(matches({ 'a': 1, 'b': 2, 'c': 3 }), true);
        assert.strictEqual(matches({ 'b': 2 }), false);
    });

    it('should not change `_.matches` behavior if `source` is modified', function () {
        var sources = [
            { 'a': { 'b': 2, 'c': 3 } },
            { 'a': 1, 'b': 2 },
            { 'a': 1 }
        ];

        each(sources, function (source, index) {
            var object = cloneDeep(source);
            var matches = iteratee(source);

            assert.strictEqual(matches(object), true);

            if (index) {
                source.a = 2;
                source.b = 1;
                source.c = 3;
            } else {
                source.a.b = 1;
                source.a.c = 2;
                source.a.d = 3;
            }
            assert.strictEqual(matches(object), true);
            assert.strictEqual(matches(source), false);
        });
    });

    it('should return an iteratee created by `_.matchesProperty` when `func` is an array', function () {
        var array = ['a', undefined];
        var matches = iteratee([0, 'a']);

        assert.strictEqual(matches(array), true);

        matches = iteratee(['0', 'a']);
        assert.strictEqual(matches(array), true);

        matches = iteratee([1, undefined]);
        assert.strictEqual(matches(array), true);
    });

    it('should support deep paths for `_.matchesProperty` shorthands', function () {
        var object = { 'a': { 'b': { 'c': 1, 'd': 2 } } };
        var matches = iteratee(['a.b', { 'c': 1 }]);

        assert.strictEqual(matches(object), true);
    });

    it('should not change `_.matchesProperty` behavior if `source` is modified', function () {
        var sources = [
            { 'a': { 'b': 2, 'c': 3 } },
            { 'a': 1, 'b': 2 },
            { 'a': 1 }
        ];

        each(sources, function (source, index) {
            var object = { 'a': cloneDeep(source) };
            var matches = iteratee(['a', source]);

            assert.strictEqual(matches(object), true);

            if (index) {
                source.a = 2;
                source.b = 1;
                source.c = 3;
            } else {
                source.a.b = 1;
                source.a.c = 2;
                source.a.d = 3;
            }
            assert.strictEqual(matches(object), true);
            assert.strictEqual(matches({ 'a': source }), false);
        });
    });

    it('should return an iteratee created by `_.property` when `func` is a number or string', function () {
        var array = ['a'];
        var prop = iteratee(0);

        assert.strictEqual(prop(array), 'a');

        prop = iteratee('0');
        assert.strictEqual(prop(array), 'a');
    });

    it('should support deep paths for `_.property` shorthands', function () {
        var object = { 'a': { 'b': 2 } };
        var prop = iteratee('a.b');

        assert.strictEqual(prop(object), 2);
    });

    it('should work with functions created by `_.partial` and `_.partialRight`', function () {
        var fn = function () {
            var result = [this.a];
            push.apply(result, arguments);
            return result;
        };

        var expected = [1, 2, 3];
        var object = { 'a': 1, 'iteratee': iteratee(partial(fn, 2)) };

        assert.deepStrictEqual(object.iteratee(3), expected);

        object.iteratee = iteratee(partialRight(fn, 3));
        assert.deepStrictEqual(object.iteratee(2), expected);
    });


    it('should work as an iteratee for methods like `_.map`', function () {
        var fn = function () { return this instanceof Number; };
        var array = [fn, fn, fn];
        var iteratees = map(array, iteratee);
        var expected = map(array, stubFalse);

        var actual = map(iteratees, function (iterateeFn) {
            return iterateeFn();
        });

        assert.deepStrictEqual(actual, expected);
    });
});
