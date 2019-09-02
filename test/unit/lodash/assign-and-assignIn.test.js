var assert = require('assert');
var assign = require('../../../cartridges/lodash/assign');
var assignIn = require('../../../cartridges/lodash/assignIn');
var constant = require('../../../cartridges/lodash/constant');
var each = require('../../../cartridges/lodash/each');
var { stubOne, noop, stubNaN } = require('../helpers/stubs');
var defineProperty = Object.defineProperty;


describe('assign and assignIn', function () {
    each(['assign', 'assignIn'], function (methodName) {
        var func = (function () {
            switch (methodName) {
                case 'assign': return assign;
                case 'assignIn': return assignIn;
                default: return null;
            }
        }());

        it('`_.' + methodName + '` should assign source properties to `object`', function () {
            assert.deepStrictEqual(func({ 'a': 1 }, { 'b': 2 }), { 'a': 1, 'b': 2 });
        });

        it('`_.' + methodName + '` should accept multiple sources', function () {
            var expected = { 'a': 1, 'b': 2, 'c': 3 };
            assert.deepStrictEqual(func({ 'a': 1 }, { 'b': 2 }, { 'c': 3 }), expected);
            assert.deepStrictEqual(func({ 'a': 1 }, { 'b': 2, 'c': 2 }, { 'c': 3 }), expected);
        });

        it('`_.' + methodName + '` should overwrite destination properties', function () {
            var expected = { 'a': 3, 'b': 2, 'c': 1 };
            assert.deepStrictEqual(func({ 'a': 1, 'b': 2 }, expected), expected);
        });

        it('`_.' + methodName + '` should assign source properties with nullish values', function () {
            var expected = { 'a': null, 'b': undefined, 'c': null };
            assert.deepStrictEqual(func({ 'a': 1, 'b': 2 }, expected), expected);
        });

        it('`_.' + methodName + '` should skip assignments if values are the same', function () {
            var object = {};

            var descriptor = {
                'configurable': true,
                'enumerable': true,
                'set': function () { throw new Error(); }
            };

            var source = {
                'a': 1,
                'b': undefined,
                'c': NaN,
                'd': undefined,
                'constructor': Object,
                'toString': constant('source')
            };

            defineProperty(object, 'a', assign({}, descriptor, {
                'get': stubOne
            }));

            defineProperty(object, 'b', assign({}, descriptor, {
                'get': noop
            }));

            defineProperty(object, 'c', assign({}, descriptor, {
                'get': stubNaN
            }));

            defineProperty(object, 'constructor', assign({}, descriptor, {
                'get': constant(Object)
            }));

            try {
                var actual = func(object, source);
            } catch (e) {
                // DO NOTHING
            }

            assert.deepStrictEqual(actual, source);
        });

        it('`_.' + methodName + '` should treat sparse array sources as dense', function () {
            var array = [1];
            array[2] = 3;

            assert.deepStrictEqual(func({}, array), { '0': 1, '1': undefined, '2': 3 });
        });

        it('`_.' + methodName + '` should assign values of prototype objects', function () {
            function Foo() {}
            Foo.prototype.a = 1;

            assert.deepStrictEqual(func({}, Foo.prototype), { 'a': 1 });
        });

        it('`_.' + methodName + '` should coerce string sources to objects', function () {
            assert.deepStrictEqual(func({}, 'a'), { '0': 'a' });
        });
    });
});
