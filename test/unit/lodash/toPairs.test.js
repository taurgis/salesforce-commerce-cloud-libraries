var assert = require('assert');
var entries = require('../../../cartridges/lodash/entries');
var toPairs = require('../../../cartridges/lodash/toPairs');

describe('toPairs', function () {
    it('should be aliased', function () {
        assert.strictEqual(entries, toPairs);
    });
});
