var assert = require('assert');
var falsey = require('../helpers/falsey');
var stubArray = require('../helpers/stubs').array;
var chunk = require('../../../cartridges/lodash/chunk');
var map = require('../../../cartridges/lodash/map');
var isUndefined = require('../../../cartridges/lodash/isUndefined');
var reject = require('../../../cartridges/lodash/reject');

describe('chunk', function () {
    var array = [0, 1, 2, 3, 4, 5];

    it('should return chunked arrays', function () {
        var actual = chunk(array, 3);
        assert.deepStrictEqual(actual, [[0, 1, 2], [3, 4, 5]]);
    });

    it('should return the last chunk as remaining elements', function () {
        var actual = chunk(array, 4);
        assert.deepStrictEqual(actual, [[0, 1, 2, 3], [4, 5]]);
    });

    it('should treat falsey `size` values, except `undefined`, as `0`', function () {
        var expected = map(falsey, function (value) {
            return value === undefined ? [[0], [1], [2], [3], [4], [5]] : [];
        });

        var actual = map(falsey, function (size, index) {
            return index ? chunk(array, size) : chunk(array);
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should ensure the minimum `size` is `0`', function () {
        var values = reject(falsey, isUndefined).concat(-1, -Infinity);
        var expected = map(values, stubArray);

        var actual = map(values, function (n) {
            return chunk(array, n);
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should coerce `size` to an integer', function () {
        assert.deepStrictEqual(chunk(array, array.length / 4), [[0], [1], [2], [3], [4], [5]]);
    });
});
