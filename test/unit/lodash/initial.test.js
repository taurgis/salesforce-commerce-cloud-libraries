var assert = require('assert');
var falsey = require('../helpers/falsey');
var isEven = require('../helpers/isEven');
var stubArray = require('../helpers/stubs').array;
var LARGE_ARRAY_SIZE = require('../helpers/largeArraySize');
var map = require('../../../cartridges/lodash/map');
var range = require('../../../cartridges/lodash/range');
var initial = require('../../../cartridges/lodash/initial');
var filter = require('../../../cartridges/lodash/filter');
var _ = require('../../../cartridges/lodash/wrapperLodash');

describe('initial', function () {
    var array = [1, 2, 3];

    it('should accept a falsey `array`', function () {
        var expected = map(falsey, stubArray);

        var actual = map(falsey, function (mapArray, index) {
            try {
                return index ? initial(mapArray) : initial();
            } catch (e) {
                // DO NOTHING
            }
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should exclude last element', function () {
        assert.deepStrictEqual(initial(array), [1, 2]);
    });

    it('should return an empty when querying empty arrays', function () {
        assert.deepStrictEqual(initial([]), []);
    });

    it('should work as an iteratee for methods like `_.map`', function () {
        var mapArray = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
        var actual = map(mapArray, initial);

        assert.deepStrictEqual(actual, [[1, 2], [4, 5], [7, 8]]);
    });

    it('should work in a lazy sequence', function () {
        var rangeArray = range(LARGE_ARRAY_SIZE);
        var values = [];

        var actual = _(rangeArray).initial().filter(function (value) {
            values.push(value);
            return false;
        })
            .value();

        assert.deepEqual(actual, []);
        assert.deepEqual(values, initial(rangeArray));

        values = [];

        actual = _(rangeArray).filter(function (value) {
            values.push(value);
            return isEven(value);
        })
            .initial()
            .value();

        assert.deepEqual(actual, initial(filter(rangeArray, isEven)));
        assert.deepEqual(values, rangeArray);
    });
});
