var assert = require('assert');
var map = require('../../../cartridges/lodash/map');
var mapKeys = require('../../../cartridges/lodash/mapKeys');
var mapValues = require('../../../cartridges/lodash/mapValues');
var each = require('../../../cartridges/lodash/each');
var _ = require('../../../cartridges/lodash/wrapperLodash');
var { falsey, noop, stubObject } = require('../helpers/stubs');

describe('mapKeys and mapValues', function () {
    each(['mapKeys', 'mapValues'], function (methodName) {
        var func = (function () {
            switch (methodName) {
                case 'mapKeys': return mapKeys;
                case 'mapValues': return mapValues;

                default: return null;
            }
        }());
        var object = { 'a': 1, 'b': 2 };

        it('`_.' + methodName + '` should iterate over own string keyed properties of objects', function () {
            function Foo() {
                this.a = 'a';
            }
            Foo.prototype.b = 'b';

            var actual = func(new Foo(), function (value, key) { return key; });
            assert.deepStrictEqual(actual, { 'a': 'a' });
        });

        it('`_.' + methodName + '` should accept a falsey `object`', function () {
            var expected = map(falsey, stubObject);

            var actual = map(falsey, function (objectMap, index) {
                try {
                    return index ? func(objectMap) : func();
                } catch (e) {
                    // DO NOTHING
                }
            });

            assert.deepStrictEqual(actual, expected);
        });

        it('`_.' + methodName + '` should return a wrapped value when chaining', function () {
            assert.ok(_(object)[methodName](noop) instanceof _);
        });
    });
});
