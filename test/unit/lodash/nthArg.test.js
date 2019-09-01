var assert = require('assert');
var nthArg = require('../../../cartridges/lodash/nthArg');
var map = require('../../../cartridges/lodash/map');
var range = require('../../../cartridges/lodash/range');
var { falsey, stubA, stubB, noop } = require('../helpers/stubs');

describe('nthArg', function () {
    var args = ['a', 'b', 'c', 'd'];

    it('should create a function that returns its nth argument', function () {
        var actual = map(args, function (value, index) {
            var func = nthArg(index);
            return func.apply(undefined, args);
        });

        assert.deepStrictEqual(actual, args);
    });

    it('should work with a negative `n`', function () {
        var actual = map(range(1, args.length + 1), function (n) {
            var func = nthArg(-n);
            return func.apply(undefined, args);
        });

        assert.deepStrictEqual(actual, ['d', 'c', 'b', 'a']);
    });

    it('should coerce `n` to an integer', function () {
        var values = falsey;
        var expected = map(values, stubA);

        var actual = map(values, function (n) {
            var func = n ? nthArg(n) : nthArg();
            return func.apply(undefined, args);
        });

        assert.deepStrictEqual(actual, expected);

        values = ['1', 1.6];
        expected = map(values, stubB);

        actual = map(values, function (n) {
            var func = nthArg(n);
            return func.apply(undefined, args);
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should return `undefined` for empty arrays', function () {
        var func = nthArg(1);
        assert.strictEqual(func(), undefined);
    });

    it('should return `undefined` for non-indexes', function () {
        var values = [Infinity, args.length];
        var expected = map(values, noop);

        var actual = map(values, function (n) {
            var func = nthArg(n);
            return func.apply(undefined, args);
        });

        assert.deepStrictEqual(actual, expected);
    });
});
