var assert = require('assert');
var partialRight = require('../../../cartridges/lodash/partialRight');
var isObject = require('../../../cartridges/lodash/isObject');
var mergeWith = require('../../../cartridges/lodash/mergeWith');

describe('partialRight', function () {
    it('should work as a deep `_.defaults`', function () {
        var object = { 'a': { 'b': 2 } };
        var source = { 'a': { 'b': 3, 'c': 3 } };
        var expected = { 'a': { 'b': 2, 'c': 3 } };

        var defaultsDeep = partialRight(mergeWith, function deep(value, other) {
            return isObject(value) ? mergeWith(value, other, deep) : value;
        });

        assert.deepStrictEqual(defaultsDeep(object, source), expected);
    });
});
