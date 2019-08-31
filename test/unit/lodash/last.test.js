var assert = require('assert');
var last = require('../../../cartridges/lodash/last');
var range = require('../../../cartridges/lodash/range');
var times = require('../../../cartridges/lodash/times');
var filter = require('../../../cartridges/lodash/filter');
var _ = require('../../../cartridges/lodash/wrapperLodash');
var isEven = require('../helpers/iseven');
var LARGE_ARRAY_SIZE = require('../helpers/largeArraySize');

describe('last', function () {
    it('should return the last element', function () {
        var array = [1, 2, 3, 4];
        assert.strictEqual(last(array), 4);
    });

    it('should return `undefined` when querying empty arrays', function () {
        var array = [];
        array['-1'] = 1;

        assert.strictEqual(last([]), undefined);
    });

    it('should return an unwrapped value when implicitly chaining', function () {
        var array = [1, 2, 3, 4];
        assert.strictEqual(_(array).last().value(), 4);
    });

    it('should return a wrapped value when explicitly chaining', function () {
        var array = [1, 2, 3, 4];
        assert.ok(_(array).chain().last() instanceof _);
    });

    it('should work in a lazy sequence', function () {
        var array = [1, 2, 3, 4];
        var largeArray = range(LARGE_ARRAY_SIZE);
        var smallArray = array;

        times(2, function (index) {
            array = index ? largeArray : smallArray;
            var wrapped = _(array).filter(isEven);

            assert.strictEqual(wrapped.last().value(), last(filter(array, isEven)));
        });
    });
});
