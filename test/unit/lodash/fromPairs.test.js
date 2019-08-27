var assert = require('assert');
var fromPairs = require('../../../cartridges/lodash/fromPairs');
var toPairs = require('../../../cartridges/lodash/toPairs');
var map = require('../../../cartridges/lodash/map');
var times = require('../../../cartridges/lodash/times');
var take = require('../../../cartridges/lodash/take');
var filter = require('../../../cartridges/lodash/filter');
var _ = require('../../../cartridges/lodash/wrapperLodash');
var falsey = require('../helpers/falsey');
var stubObject = require('../helpers/stubs').stubObject;
var LARGE_ARRAY_SIZE = require('../helpers/largeArraySize');
var square = require('../helpers/square');
var isEven = require('../helpers/isEven');

describe('fromPairs', function () {
    it('should accept a two dimensional array', function () {
        var array = [['a', 1], ['b', 2]];
        var object = { 'a': 1, 'b': 2 };
        var actual = fromPairs(array);

        assert.deepStrictEqual(actual, object);
    });

    it('should accept a falsey `array`', function () {
        var expected = map(falsey, stubObject);

        var actual = map(falsey, function (array, index) { // eslint-disable-line
            try {
                return index ? fromPairs(array) : fromPairs();
            } catch (e) {
                // DO NOTHING
            }
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should not support deep paths', function () {
        var actual = fromPairs([['a.b', 1]]);
        assert.deepStrictEqual(actual, { 'a.b': 1 });
    });

    it('should support consuming the return value of `_.toPairs`', function () {
        var object = { 'a.b': 1 };
        assert.deepStrictEqual(fromPairs(toPairs(object)), object);
    });

    it('should work in a lazy sequence', function () {
        var array = times(LARGE_ARRAY_SIZE, function (index) {
            return ['key' + index, index];
        });

        var actual = _(array).fromPairs().map(square).filter(isEven)
            .take()
            .value();

        assert.deepEqual(actual, take(filter(map(fromPairs(array), square), isEven)));
    });
});
