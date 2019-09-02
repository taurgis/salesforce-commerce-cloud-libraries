var assert = require('assert');
var uniq = require('../../../cartridges/lodash/uniq');
var map = require('../../../cartridges/lodash/map');

describe('uniq', function () {
    it('should perform an unsorted uniq when used as an iteratee for methods like `_.map`', function () {
        var array = [[2, 1, 2], [1, 2, 1]];
        var actual = map(array, uniq);

        assert.deepStrictEqual(actual, [[2, 1], [1, 2]]);
    });
});
