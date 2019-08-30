var assert = require('assert');
var lowerFirst = require('../../../cartridges/lodash/lowerFirst');

describe('lowerFirst', function () {
    it('should lowercase only the first character', function () {
        assert.strictEqual(lowerFirst('fred'), 'fred');
        assert.strictEqual(lowerFirst('Fred'), 'fred');
        assert.strictEqual(lowerFirst('FRED'), 'fRED');
    });
});
