var assert = require('assert');
var multiply = require('../../../cartridges/lodash/multiply');

describe('multiply', function () {
    it('should multiply two numbers', function () {
        assert.strictEqual(multiply(6, 4), 24);
        assert.strictEqual(multiply(-6, 4), -24);
        assert.strictEqual(multiply(-6, -4), 24);
    });

    it('should coerce arguments to numbers', function () {
        assert.strictEqual(multiply('6', '4'), 24);
        assert.deepStrictEqual(multiply('x', 'y'), NaN);
    });
});
