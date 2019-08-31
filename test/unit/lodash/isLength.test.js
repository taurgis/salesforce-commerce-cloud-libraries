var assert = require('assert');
var { stubTrue, stubFalse } = require('../helpers/stubs');
var { MAX_SAFE_INTEGER } = require('../helpers/max');
var isLength = require('../../../cartridges/lodash/isLength');
var map = require('../../../cartridges/lodash/map');


describe('isLength', function () {
    it('should return `true` for lengths', function () {
        var values = [0, 3, MAX_SAFE_INTEGER];
        var expected = map(values, stubTrue);
        var actual = map(values, isLength);

        assert.deepStrictEqual(actual, expected);
    });

    it('should return `false` for non-lengths', function () {
        var values = [-1, '1', 1.1, MAX_SAFE_INTEGER + 1];
        var expected = map(values, stubFalse);
        var actual = map(values, isLength);

        assert.deepStrictEqual(actual, expected);
    });
});
