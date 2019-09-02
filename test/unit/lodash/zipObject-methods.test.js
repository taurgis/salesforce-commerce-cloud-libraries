var assert = require('assert');
var zipObject = require('../../../cartridges/lodash/zipObject');
var zipObjectDeep = require('../../../cartridges/lodash/zipObjectDeep');
var each = require('../../../cartridges/lodash/each');
var range = require('../../../cartridges/lodash/range');
var filter = require('../../../cartridges/lodash/filter');
var take = require('../../../cartridges/lodash/take');
var map = require('../../../cartridges/lodash/map');
var _ = require('../../../cartridges/lodash/wrapperLodash');
var LARGE_ARRAY_SIZE = require('../helpers/largeArraySize');
var square = require('../helpers/square');
var isEven = require('../helpers/isEven');

describe('zipObject methods', function () {
    each(['zipObject', 'zipObjectDeep'], function (methodName) {
        var func = (methodName === 'zipObject') ? zipObject : zipObjectDeep;
        var object = { 'barney': 36, 'fred': 40 };
        var isDeep = methodName === 'zipObjectDeep';

        it('`_.' + methodName + '` should zip together key/value arrays into an object', function () {
            var actual = func(['barney', 'fred'], [36, 40]);
            assert.deepStrictEqual(actual, object);
        });

        it('`_.' + methodName + '` should ignore extra `values`', function () {
            assert.deepStrictEqual(func(['a'], [1, 2]), { 'a': 1 });
        });

        it('`_.' + methodName + '` should assign `undefined` values for extra `keys`', function () {
            assert.deepStrictEqual(func(['a', 'b'], [1]), { 'a': 1, 'b': undefined });
        });

        it('`_.' + methodName + '` should ' + (isDeep ? '' : 'not ') + 'support deep paths', function () {
            each(['a.b.c', ['a', 'b', 'c']], function (path, index) {
                var expected = isDeep ? ({ 'a': { 'b': { 'c': 1 } } }) : (index ? { 'a,b,c': 1 } : { 'a.b.c': 1 });
                assert.deepStrictEqual(func([path], [1]), expected);
            });
        });

        it('`_.' + methodName + '` should work in a lazy sequence', function () {
            var values = range(LARGE_ARRAY_SIZE);
            var props = map(values, function (value) { return 'key' + value; });
            var actual = _(props)[methodName](values).map(square).filter(isEven)
                .take()
                .value();

            assert.deepEqual(actual, take(filter(map(func(props, values), square), isEven)));
        });
    });
});
