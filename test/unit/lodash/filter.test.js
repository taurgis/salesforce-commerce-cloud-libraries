var assert = require('assert');
var isEven = require('../helpers/isEven');
var filter = require('../../../cartridges/lodash/filter');

describe('filter', function () {
    var array = [1, 2, 3];

    it('should return elements `predicate` returns truthy for', function () {
        assert.deepStrictEqual(filter(array, isEven), [2]);
    });
});
