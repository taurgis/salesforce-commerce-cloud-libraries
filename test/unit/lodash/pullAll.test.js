var assert = require('assert');
var pullAll = require('../../../cartridges/lodash/pullAll');

describe('pullAll', function () {
    it('should work with the same value for `array` and `values`', function () {
        var array = [{ 'a': 1 }, { 'b': 2 }];
        var actual = pullAll(array, array);

        assert.deepStrictEqual(actual, []);
    });
});
