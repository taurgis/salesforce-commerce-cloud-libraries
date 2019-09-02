var assert = require('assert');
var sortedUniq = require('../../../cartridges/lodash/sortedUniq');
var each = require('../../../cartridges/lodash/each');


describe('sortedUniq', function () {
    it('should return unique values of a sorted array', function () {
        var expected = [1, 2, 3];

        each([[1, 2, 3], [1, 1, 2, 2, 3], [1, 2, 3, 3, 3, 3, 3]], function (array) {
            assert.deepStrictEqual(sortedUniq(array), expected);
        });
    });
});
