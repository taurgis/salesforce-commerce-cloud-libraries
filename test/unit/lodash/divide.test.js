var assert = require('assert');
var divide = require('../../../cartridges/lodash/divide');

describe('divide', function () {
    it('should divide two numbers', function () {
        assert.strictEqual(divide(6, 4), 1.5);
        assert.strictEqual(divide(-6, 4), -1.5);
        assert.strictEqual(divide(-6, -4), 1.5);
    });

    it('should coerce arguments to numbers', function () {
        assert.strictEqual(divide('6', '4'), 1.5);
        assert.deepStrictEqual(divide('x', 'y'), NaN);
    });
});
