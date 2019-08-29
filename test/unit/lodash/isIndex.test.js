var assert = require('assert');
var { stubTrue, stubFalse } = require('../helpers/stubs');
var { MAX_SAFE_INTEGER } = require('../helpers/max');
var _isIndex = require('../../../cartridges/lodash/isIndex');
var map = require('../../../cartridges/lodash/map');


describe('isIndex', function () {
    var func = _isIndex;

    it('should return `true` for indexes', function () {
        if (func) {
            var values = [[0], ['0'], ['1'], [3, 4], [MAX_SAFE_INTEGER - 1]];
            var expected = map(values, stubTrue);

            var actual = map(values, function (args) {
                return func.apply(undefined, args);
            });

            assert.deepStrictEqual(actual, expected);
        }
    });

    it('should return `false` for non-indexes', function () {
        if (func) {
            var values = [['1abc'], ['07'], ['0001'], [-1], [3, 3], [1.1], [MAX_SAFE_INTEGER]];
            var expected = map(values, stubFalse);

            var actual = map(values, function (args) {
                return func.apply(undefined, args);
            });

            assert.deepStrictEqual(actual, expected);
        }
    });
});
