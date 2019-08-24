var assert = require('assert');
var args = require('../helpers/args');
var strictArgs = require('../helpers/strictArgs');
var each = require('../../../cartridges/lodash/each');
var map = require('../../../cartridges/lodash/map');
var values = require('../../../cartridges/lodash/values');
var valuesIn = require('../../../cartridges/lodash/valuesIn');

describe('values methods', function () {
    each(['values', 'valuesIn'], function (methodName) {
        var func = (function () {
            switch (methodName) {
                case 'values': return values;
                case 'valuesIn': return valuesIn;
                default: return null;
            }
        }());

        var isValues = methodName === 'values';

        it('`_.' + methodName + '` should get string keyed values of `object`', function () {
            var object = { 'a': 1, 'b': 2 };
            var actual = func(object).sort();

            assert.deepStrictEqual(actual, [1, 2]);
        });

        it('`_.' + methodName + '` should work with an object that has a `length` property', function () {
            var object = { '0': 'a', '1': 'b', 'length': 2 };
            var actual = func(object).sort();

            assert.deepStrictEqual(actual, [2, 'a', 'b']);
        });

        it('`_.' + methodName + '` should ' + (isValues ? 'not ' : '') + 'include inherited string keyed property values', function () {
            function Foo() {
                this.a = 1;
            }
            Foo.prototype.b = 2;

            var expected = isValues ? [1] : [1, 2];
            var actual = func(new Foo()).sort();

            assert.deepStrictEqual(actual, expected);
        });

        it('`_.' + methodName + '` should work with `arguments` objects', function () {
            var values = [args, strictArgs];
            var expected = map(values, () => [1, 2, 3]);

            var actual = map(values, function (value) {
                return func(value).sort();
            });

            assert.deepStrictEqual(actual, expected);
        });
    });
});
