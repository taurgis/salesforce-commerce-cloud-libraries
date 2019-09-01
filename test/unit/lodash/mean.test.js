var assert = require('assert');
var mean = require('../../../cartridges/lodash/mean');
var map = require('../../../cartridges/lodash/map');
var { empties, stubNaN } = require('../helpers/stubs');

describe('mean', function () {
    it('should return the mean of an array of numbers', function () {
        var array = [4, 2, 8, 6];
        assert.strictEqual(mean(array), 5);
    });

    it('should return `NaN` when passing empty `array` values', function () {
        var expected = map(empties, stubNaN);
        var actual = map(empties, mean);

        assert.deepStrictEqual(actual, expected);
    });
});
