var assert = require('assert');
var isArguments = require('../../../cartridges/lodash/isArguments');
var _ = require('../../../cartridges/lodash/wrapperLodash');
var map = require('../../../cartridges/lodash/map');
var stubFalse = require('../helpers/stubs').stubFalse;
var noop = require('../helpers/stubs').noop;
var args = require('../helpers/args');
var falsey = require('../helpers/falsey');
var strictArgs = require('../helpers/strictArgs');
var slice = Array.prototype.slice;

describe('isArguments', function () {
    it('should return `true` for `arguments` objects', function () {
        assert.strictEqual(isArguments(args), true);
        assert.strictEqual(isArguments(strictArgs), true);
    });

    it('should return `false` for non `arguments` objects', function () {
        var expected = [false, false, false, false, false, false, false];

        var actual = map(falsey, function (value, index) {
            return index ? isArguments(value) : isArguments();
        });

        assert.deepStrictEqual(actual, expected);

        assert.strictEqual(isArguments([1, 2, 3]), false);
        assert.strictEqual(isArguments(true), false);
        assert.strictEqual(isArguments(new Date()), false);
        assert.strictEqual(isArguments(new Error()), false);
        assert.strictEqual(isArguments(_), false);
        assert.strictEqual(isArguments(slice), false);
        assert.strictEqual(isArguments({ '0': 1, 'callee': noop, 'length': 1 }), false);
        assert.strictEqual(isArguments(1), false);
        assert.strictEqual(isArguments(/x/), false);
        assert.strictEqual(isArguments('a'), false);
    });
});
