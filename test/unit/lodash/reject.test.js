var assert = require('assert');
var reject = require('../../../cartridges/lodash/reject');
var isEven = require('../helpers/isEven');

describe('reject', function () {
    var array = [1, 2, 3];

    it('should return elements the `predicate` returns falsey for', function () {
        assert.deepStrictEqual(reject(array, isEven), [1, 3]);
    });
});
