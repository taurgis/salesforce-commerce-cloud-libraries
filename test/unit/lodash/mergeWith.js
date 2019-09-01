var assert = require('assert');
var mergeWith = require('../../../cartridges/lodash/mergeWith');
var identity = require('../../../cartridges/lodash/identity');
var isArray = require('../../../cartridges/lodash/isArray');
var { noop } = require('../helpers/stubs');

describe('mergeWith', function () {
    it('should handle merging when `customizer` returns `undefined`', function () {
        var actual = mergeWith({ 'a': { 'b': [1, 1] } }, { 'a': { 'b': [0] } }, noop);
        assert.deepStrictEqual(actual, { 'a': { 'b': [0, 1] } });

        actual = mergeWith([], [undefined], identity);
        assert.deepStrictEqual(actual, [undefined]);
    });

    it('should clone sources when `customizer` returns `undefined`', function () {
        var source1 = { 'a': { 'b': { 'c': 1 } } };
        var source2 = { 'a': { 'b': { 'd': 2 } } };

        mergeWith({}, source1, source2, noop);
        assert.deepStrictEqual(source1.a.b, { 'c': 1 });
    });

    it('should defer to `customizer` for non `undefined` results', function () {
        var actual = mergeWith({ 'a': { 'b': [0, 1] } }, { 'a': { 'b': [2] } }, function (a, b) {
            return isArray(a) ? a.concat(b) : undefined;
        });

        assert.deepStrictEqual(actual, { 'a': { 'b': [0, 1, 2] } });
    });

    it('should overwrite primitives with source object clones', function () {
        var actual = mergeWith({ 'a': 0 }, { 'a': { 'b': ['c'] } }, function (a, b) {
            return isArray(a) ? a.concat(b) : undefined;
        });

        assert.deepStrictEqual(actual, { 'a': { 'b': ['c'] } });
    });

    it('should pop the stack of sources for each sibling property', function () {
        var array = ['b', 'c'];
        var object = { 'a': ['a'] };
        var source = { 'a': array, 'b': array };

        var actual = mergeWith(object, source, function (a, b) {
            return isArray(a) ? a.concat(b) : undefined;
        });

        assert.deepStrictEqual(actual, { 'a': ['a', 'b', 'c'], 'b': ['b', 'c'] });
    });
});
