var assert = require('assert');
var stubTrue = require('../helpers/stubs').true;
var stubFalse = require('../helpers/stubs').false;
var args = require('../helpers/args');
var isFinite = require('../../../cartridges/lodash/isFinite');
var map = require('../../../cartridges/lodash/map');

describe('isFinite', function () {
    it('should return `true` for finite values', function () {
        var values = [0, 1, 3.14, -1];
        var expected = map(values, stubTrue);
        var actual = map(values, isFinite);

        assert.deepStrictEqual(actual, expected);
    });

    it('should return `false` for non-finite values', function () {
        var values = [NaN, Infinity, -Infinity, Object(1)];
        var expected = map(values, stubFalse);
        var actual = map(values, isFinite);

        assert.deepStrictEqual(actual, expected);
    });

    it('should return `false` for non-numeric values', function () {
        var values = [undefined, [], true, '', ' ', '2px'];
        var expected = map(values, stubFalse);
        var actual = map(values, isFinite);

        assert.deepStrictEqual(actual, expected);

        assert.strictEqual(isFinite(args), false);
        assert.strictEqual(isFinite([1, 2, 3]), false);
        assert.strictEqual(isFinite(true), false);
        assert.strictEqual(isFinite(new Date()), false);
        assert.strictEqual(isFinite(new Error()), false);
        assert.strictEqual(isFinite({ 'a': 1 }), false);
        assert.strictEqual(isFinite(/x/), false);
        assert.strictEqual(isFinite('a'), false);
    });

    it('should return `false` for numeric string values', function () {
        var values = ['2', '0', '08'];
        var expected = map(values, stubFalse);
        var actual = map(values, isFinite);

        assert.deepStrictEqual(actual, expected);
    });
});
