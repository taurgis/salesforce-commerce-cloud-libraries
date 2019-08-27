var assert = require('assert');
var each = require('../../../cartridges/lodash/each');
var forEach = require('../../../cartridges/lodash/forEach');

describe('forEach', function () {
    it('should be aliased', function () {
        assert.strictEqual(each, forEach);
    });
});
