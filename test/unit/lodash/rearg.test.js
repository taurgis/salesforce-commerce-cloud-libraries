var assert = require('assert');
var rearg = require('../../../cartridges/lodash/rearg');
var isArray = require('../../../cartridges/lodash/isArray');
var constant = require('../../../cartridges/lodash/constant');
var map = require('../../../cartridges/lodash/map');
var reject = require('../../../cartridges/lodash/reject');
var { empties } = require('../helpers/stubs');
var slice = Array.prototype.slice;

describe('rearg', function () {
    function fn() {
        return slice.call(arguments);
    }

    it('should reorder arguments provided to `func`', function () {
        var rearged = rearg(fn, [2, 0, 1]);
        assert.deepStrictEqual(rearged('b', 'c', 'a'), ['a', 'b', 'c']);
    });

    it('should work with repeated indexes', function () {
        var rearged = rearg(fn, [1, 1, 1]);
        assert.deepStrictEqual(rearged('c', 'a', 'b'), ['a', 'a', 'a']);
    });

    it('should use `undefined` for nonexistent indexes', function () {
        var rearged = rearg(fn, [1, 4]);
        assert.deepStrictEqual(rearged('b', 'a', 'c'), ['a', undefined, 'c']);
    });

    it('should use `undefined` for non-index values', function () {
        var values = reject(empties, function (value) {
            return (value === 0) || isArray(value);
        }).concat(-1, 1.1);

        var expected = map(values, constant([undefined, 'b', 'c']));

        var actual = map(values, function (value) {
            var rearged = rearg(fn, [value]);
            return rearged('a', 'b', 'c');
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should not rearrange arguments when no indexes are given', function () {
        var rearged = rearg(fn);
        assert.deepStrictEqual(rearged('a', 'b', 'c'), ['a', 'b', 'c']);

        rearged = rearg(fn, [], []);
        assert.deepStrictEqual(rearged('a', 'b', 'c'), ['a', 'b', 'c']);
    });

    it('should accept multiple index arguments', function () {
        var rearged = rearg(fn, 2, 0, 1);
        assert.deepStrictEqual(rearged('b', 'c', 'a'), ['a', 'b', 'c']);
    });

    it('should accept multiple arrays of indexes', function () {
        var rearged = rearg(fn, [2], [0, 1]);
        assert.deepStrictEqual(rearged('b', 'c', 'a'), ['a', 'b', 'c']);
    });

    it('should work with fewer indexes than arguments', function () {
        var rearged = rearg(fn, [1, 0]);
        assert.deepStrictEqual(rearged('b', 'a', 'c'), ['a', 'b', 'c']);
    });

    it('should work on functions that have been rearged', function () {
        var rearged1 = rearg(fn, 2, 1, 0);
        var rearged2 = rearg(rearged1, 1, 0, 2);

        assert.deepStrictEqual(rearged2('b', 'c', 'a'), ['a', 'b', 'c']);
    });
});
