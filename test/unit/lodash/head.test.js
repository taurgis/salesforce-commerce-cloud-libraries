var assert = require('assert');
var LARGE_ARRAY_SIZE = require('../helpers/largeArraySize');
var arrayProto = Array.prototype;
var isEven = require('../helpers/isEven');
var map = require('../../../cartridges/lodash/map');
var each = require('../../../cartridges/lodash/each');
var times = require('../../../cartridges/lodash/times');
var first = require('../../../cartridges/lodash/first');
var head = require('../../../cartridges/lodash/head');
var range = require('../../../cartridges/lodash/range');
var filter = require('../../../cartridges/lodash/filter');
var _ = require('../../../cartridges/lodash/wrapperLodash');

describe('head', function () {
    var array = [1, 2, 3, 4];

    it('should return the first element', function () {
        assert.strictEqual(head(array), 1);
    });

    it('should return `undefined` when querying empty arrays', function () {
        arrayProto[0] = 1;
        assert.strictEqual(head([]), undefined);
        arrayProto.length = 0;
    });

    it('should work as an iteratee for methods like `_.map`', function () {
        var mapArray = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
        var actual = map(mapArray, head);

        assert.deepStrictEqual(actual, [1, 4, 7]);
    });

    it('should be aliased', function () {
        assert.strictEqual(first, head);
    });

    it('should return an unwrapped value when implicitly chaining', function () {
        var wrapped = _(array);
        assert.strictEqual(wrapped.head().value(), 1);
        assert.strictEqual(wrapped.first().value(), 1);
    });

    it('should return a wrapped value when explicitly chaining', function () {
        var wrapped = _(array).chain();
        assert.ok(wrapped.head() instanceof _);
        assert.ok(wrapped.first() instanceof _);
    });

    it('should work in a lazy sequence', function () {
        var largeArray = range(LARGE_ARRAY_SIZE);
        var smallArray = array;

        each(['head', 'first'], function (methodName) {
            times(2, function (index) {
                var func = (function () {
                    switch (methodName) {
                        case 'head': return head;
                        case 'first': return first;
                        default: return null;
                    }
                }());
                var lazyArray = index ? largeArray : smallArray;
                var actual = _(lazyArray).filter(isEven)[methodName]();

                assert.strictEqual(actual.value(), func(filter(lazyArray, isEven)));
            });
        });
    });
});
