var assert = require('assert');
var identity = require('../../../cartridges/lodash/identity');

describe('identity', function () {
    it('should return the first argument given', function () {
        var object = { 'name': 'fred' };
        assert.strictEqual(identity(object), object);
    });
});
