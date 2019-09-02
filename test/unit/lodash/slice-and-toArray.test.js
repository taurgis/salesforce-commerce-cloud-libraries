var assert = require('assert');
var slice = require('../../../cartridges/lodash/slice');
var toArray = require('../../../cartridges/lodash/toArray');
var each = require('../../../cartridges/lodash/each');
var args = require('../helpers/args');

describe('slice and toArray', function () {
    each(['slice', 'toArray'], function (methodName) {
        var array = [1, 2, 3];
        var func = (methodName === 'slice') ? slice : toArray;

        it('`_.' + methodName + '` should treat array-like objects like arrays', function () {
            var object = { '0': 'a', 'length': 1 };
            assert.deepStrictEqual(func(object), ['a']);
            assert.deepStrictEqual(func(args), array);
        });

        it('`_.' + methodName + '` should return a shallow clone of arrays', function () {
            var actual = func(array);
            assert.deepStrictEqual(actual, array);
            assert.notStrictEqual(actual, array);
        });
    });
});
