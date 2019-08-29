var assert = require('assert');
var { falsey, stubFalse } = require('../helpers/stubs');
var args = require('../helpers/args');
var isRegExp = require('../../../cartridges/lodash/isRegExp');
var map = require('../../../cartridges/lodash/map');
var _ = require('../../../cartridges/lodash/wrapperLodash');
var slice = Array.prototype.slice;

describe('isRegExp', function () {
    it('should return `true` for regexes', function () {
        assert.strictEqual(isRegExp(/x/), true);
        assert.strictEqual(isRegExp(RegExp('x')), true);
    });

    it('should return `false` for non-regexes', function () {
        var expected = map(falsey, stubFalse);

        var actual = map(falsey, function (value, index) {
            return index ? isRegExp(value) : isRegExp();
        });

        assert.deepStrictEqual(actual, expected);

        assert.strictEqual(isRegExp(args), false);
        assert.strictEqual(isRegExp([1, 2, 3]), false);
        assert.strictEqual(isRegExp(true), false);
        assert.strictEqual(isRegExp(new Date()), false);
        assert.strictEqual(isRegExp(new Error()), false);
        assert.strictEqual(isRegExp(_), false);
        assert.strictEqual(isRegExp(slice), false);
        assert.strictEqual(isRegExp({ 'a': 1 }), false);
        assert.strictEqual(isRegExp(1), false);
        assert.strictEqual(isRegExp('a'), false);
    });
});
