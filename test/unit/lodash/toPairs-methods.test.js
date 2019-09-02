var assert = require('assert');
var toPairs = require('../../../cartridges/lodash/toPairs');
var toPairsIn = require('../../../cartridges/lodash/toPairsIn');
var each = require('../../../cartridges/lodash/each');
var sortBy = require('../../../cartridges/lodash/sortBy');

describe('toPairs methods', function () {
    each(['toPairs', 'toPairsIn'], function (methodName) {
        var func = methodName === 'toPairs' ? toPairs : toPairsIn;
        var isToPairs = methodName === 'toPairs';

        it('`_.' + methodName + '` should create an array of string keyed-value pairs', function () {
            var object = { 'a': 1, 'b': 2 };
            var actual = sortBy(func(object), 0);

            assert.deepStrictEqual(actual, [['a', 1], ['b', 2]]);
        });

        it('`_.' + methodName + '` should ' + (isToPairs ? 'not ' : '') + 'include inherited string keyed property values', function () {
            function Foo() {
                this.a = 1;
            }
            Foo.prototype.b = 2;

            var expected = isToPairs ? [['a', 1]] : [['a', 1], ['b', 2]];
            var actual = sortBy(func(new Foo()), 0);

            assert.deepStrictEqual(actual, expected);
        });

        it('`_.' + methodName + '` should convert objects with a `length` property', function () {
            var object = { '0': 'a', '1': 'b', 'length': 2 };
            var actual = sortBy(func(object), 0);

            assert.deepStrictEqual(actual, [['0', 'a'], ['1', 'b'], ['length', 2]]);
        });

        it('`_.' + methodName + '` should convert maps', function () {
            if (Map) {
                var map = new Map();
                map.set('a', 1);
                map.set('b', 2);
                assert.deepStrictEqual(func(map), [['a', 1], ['b', 2]]);
            }
        });

        it('`_.' + methodName + '` should convert sets', function () {
            if (Set) {
                var set = new Set();
                set.add(1);
                set.add(2);
                assert.deepStrictEqual(func(set), [[1, 1], [2, 2]]);
            }
        });

        it('`_.' + methodName + '` should convert strings', function () {
            each(['xo', Object('xo')], function (string) {
                var actual = sortBy(func(string), 0);
                assert.deepStrictEqual(actual, [['0', 'x'], ['1', 'o']]);
            });
        });
    });
});
