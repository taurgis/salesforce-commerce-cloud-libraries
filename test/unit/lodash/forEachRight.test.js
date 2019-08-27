var assert = require('assert');
var eachRight = require('../../../cartridges/lodash/eachRight');
var forEachRight = require('../../../cartridges/lodash/forEachRight');


describe('forEachRight', function () {
    it('should be aliased', function () {
        assert.strictEqual(eachRight, forEachRight);
    });
});
