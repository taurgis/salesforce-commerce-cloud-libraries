var assert = require('assert');
var falsey = require('../helpers/falsey');
var defaultTo = require('../../../cartridges/lodash/defaultTo');
var map = require('../../../cartridges/lodash/map');

describe('defaultTo', function () {
    it('should return a default value if `value` is `NaN` or nullish', function () {
        var expected = map(falsey, function (value) {
            return ((value == null) || (value !== value)) ? 1 : value;
        });

        var actual = map(falsey, function (value) {
            return defaultTo(value, 1);
        });

        assert.deepStrictEqual(actual, expected);
    });
});
