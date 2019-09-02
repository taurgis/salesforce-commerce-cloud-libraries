var assert = require('assert');
var upperFirst = require('../../../cartridges/lodash/upperFirst');

describe('upperFirst', function () {
    it('should uppercase only the first character', function () {
        assert.strictEqual(upperFirst('fred'), 'Fred');
        assert.strictEqual(upperFirst('Fred'), 'Fred');
        assert.strictEqual(upperFirst('FRED'), 'FRED');
    });
});
