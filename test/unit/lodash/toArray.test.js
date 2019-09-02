var assert = require('assert');
var toArray = require('../../../cartridges/lodash/toArray');
var range = require('../../../cartridges/lodash/range');
var zipObject = require('../../../cartridges/lodash/zipObject');
var times = require('../../../cartridges/lodash/times');
var _ = require('../../../cartridges/lodash/wrapperLodash');
var mapLodash = require('../../../cartridges/lodash/map');
var arrayProto = Array.prototype;
var LARGE_ARRAY_SIZE = require('../helpers/largeArraySize');


describe('toArray', function () {
    it('should convert objects to arrays', function () {
        assert.deepStrictEqual(toArray({ 'a': 1, 'b': 2 }), [1, 2]);
    });

    it('should convert iterables to arrays', function () {
        if (Symbol && Symbol.iterator) {
            var object = { '0': 'a', 'length': 1 };
            object[Symbol.iterator] = arrayProto[Symbol.iterator];

            assert.deepStrictEqual(toArray(object), ['a']);
        }
    });

    it('should convert maps to arrays', function () {
        if (Map) {
            var map = new Map();
            map.set('a', 1);
            map.set('b', 2);
            assert.deepStrictEqual(toArray(map), [['a', 1], ['b', 2]]);
        }
    });

    it('should convert strings to arrays', function () {
        assert.deepStrictEqual(toArray(''), []);
        assert.deepStrictEqual(toArray('ab'), ['a', 'b']);
        assert.deepStrictEqual(toArray(Object('ab')), ['a', 'b']);
    });

    it('should work in a lazy sequence', function () {
        var array = range(LARGE_ARRAY_SIZE + 1);

        var object = zipObject(times(LARGE_ARRAY_SIZE, function (index) {
            return ['key' + index, index];
        }));

        var actual = _(array).slice(1).map(String).toArray()
            .value();
        assert.deepEqual(actual, mapLodash(array.slice(1), String));

        actual = _(object).toArray().slice(1).map(String)
            .value();
        assert.deepEqual(actual, mapLodash(toArray(object).slice(1), String));
    });
});
