var assert = require('assert');
var falsey = require('../helpers/falsey');
var castArray = require('../../../cartridges/lodash/castArray');
var map = require('../../../cartridges/lodash/map');

describe('castArray', function () {
    it('should wrap non-array items in an array', function () {
        var values = falsey.concat(true, 1, 'a', { 'a': 1 });
        var expected = map(values, function (value) { return [value]; });
        var actual = map(values, castArray);

        assert.deepStrictEqual(actual, expected);
    });

    it('should return array values by reference', function () {
        var array = [1];
        assert.strictEqual(castArray(array), array);
    });

    it('should return an empty array when no arguments are given', function () {
        assert.deepStrictEqual(castArray(), []);
    });
});
