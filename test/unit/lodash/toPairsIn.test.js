var assert = require('assert');
var entriesIn = require('../../../cartridges/lodash/entriesIn');
var toPairsIn = require('../../../cartridges/lodash/toPairsIn');

describe('toPairsIn', function () {
    it('should be aliased', function () {
        assert.strictEqual(entriesIn, toPairsIn);
    });
});
