var assert = require('assert');
var sortedIndexOf = require('../../../cartridges/lodash/sortedIndexBy');
var sortedLastIndexOf = require('../../../cartridges/lodash/sortedLastIndexBy');
var each = require('../../../cartridges/lodash/each');

describe('sortedIndexOf methods', function () {
    each(['sortedIndexOf', 'sortedLastIndexOf'], function (methodName) {
        var func = (methodName === 'sortedIndexOf') ? sortedIndexOf : sortedLastIndexOf;
        var isSortedIndexOf = methodName === 'sortedIndexOf';

        it('`_.' + methodName + '` should perform a binary search', function () {
            var sorted = [4, 4, 5, 5, 6, 6];
            assert.deepStrictEqual(func(sorted, 5), isSortedIndexOf ? 2 : 4);
        });
    });
});
