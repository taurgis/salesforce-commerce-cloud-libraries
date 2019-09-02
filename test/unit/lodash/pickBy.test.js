var assert = require('assert');
var pickBy = require('../../../cartridges/lodash/pickBy');
var { stubTrue } = require('../helpers/stubs');

describe('pickBy', function () {
    it('should work with a predicate argument', function () {
        var object = { 'a': 1, 'b': 2, 'c': 3, 'd': 4 };

        var actual = pickBy(object, function (n) {
            return n === 1 || n === 3;
        });

        assert.deepStrictEqual(actual, { 'a': 1, 'c': 3 });
    });

    it('should not treat keys with dots as deep paths', function () {
        var object = { 'a.b.c': 1 };
        var actual = pickBy(object, stubTrue);

        assert.deepStrictEqual(actual, { 'a.b.c': 1 });
    });
});
