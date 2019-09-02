var assert = require('assert');
var subtract = require('../../../cartridges/lodash/subtract');

describe('subtract', function () {
    it('should subtract two numbers', function () {
        assert.strictEqual(subtract(6, 4), 2);
        assert.strictEqual(subtract(-6, 4), -10);
        assert.strictEqual(subtract(-6, -4), -2);
    });

    it('should coerce arguments to numbers', function () {
        assert.strictEqual(subtract('6', '4'), 2);
        assert.deepStrictEqual(subtract('x', 'y'), NaN);
    });
});
