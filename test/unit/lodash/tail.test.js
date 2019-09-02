var assert = require('assert');
var tail = require('../../../cartridges/lodash/tail');
var map = require('../../../cartridges/lodash/map');
var range = require('../../../cartridges/lodash/range');
var filter = require('../../../cartridges/lodash/filter');
var _ = require('../../../cartridges/lodash/wrapperLodash');
var { falsey } = require('../helpers/stubs');
var LARGE_ARRAY_SIZE = require('../helpers/largeArraySize');
var isEven = require('../helpers/isEven');

describe('tail', function () {
    var array = [1, 2, 3];

    it('should accept a falsey `array`', function () {
        var expected = [[], [], [], [], [], [], []];

        var actual = map(falsey, function (arrayFn, index) {
            try {
                return index ? tail(arrayFn) : tail();
            } catch (e) {
                // DO NOTHING
            }
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should exclude the first element', function () {
        assert.deepStrictEqual(tail(array), [2, 3]);
    });

    it('should return an empty when querying empty arrays', function () {
        assert.deepStrictEqual(tail([]), []);
    });

    it('should work as an iteratee for methods like `_.map`', function () {
        var arrayFn = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
        var actual = map(arrayFn, tail);

        assert.deepStrictEqual(actual, [[2, 3], [5, 6], [8, 9]]);
    });

    it('should work in a lazy sequence', function () {
        var arrayFn = range(LARGE_ARRAY_SIZE);
        var values = [];

        var actual = _(arrayFn).tail().filter(function (value) {
            values.push(value);
            return false;
        })
            .value();

        assert.deepEqual(actual, []);
        assert.deepEqual(values, arrayFn.slice(1));

        values = [];

        actual = _(arrayFn).filter(function (value) {
            values.push(value);
            return isEven(value);
        })
            .tail()
            .value();

        assert.deepEqual(actual, tail(filter(arrayFn, isEven)));
        assert.deepEqual(values, arrayFn);
    });

    it('should not execute subsequent iteratees on an empty array in a lazy sequence', function () {
        var arrayFn = range(LARGE_ARRAY_SIZE);
        var iteratee = function () { pass = false; };
        var pass = true;
        var actual = _(arrayFn).slice(0, 1).tail().map(iteratee)
            .value();

        assert.ok(pass);
        assert.deepEqual(actual, []);

        pass = true;
        actual = _(arrayFn).filter().slice(0, 1).tail()
            .map(iteratee)
            .value();

        assert.ok(pass);
        assert.deepEqual(actual, []);
    });
});
