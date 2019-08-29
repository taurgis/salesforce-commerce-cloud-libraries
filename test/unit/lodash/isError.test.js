var assert = require('assert');
var errors = require('../helpers/errors');
var stubTrue = require('../helpers/stubs').true;
var CustomError = require('../helpers/customError');
var falsey = require('../helpers/falsey');
var stubFalse = require('../helpers/stubs').false;
var args = require('../helpers/args');
var slice = Array.prototype.slice;
var isError = require('../../../cartridges/lodash/isError');
var _ = require('../../../cartridges/lodash/wrapperLodash');
var map = require('../../../cartridges/lodash/map');

describe('isError', function () {
    it('should return `true` for error objects', function () {
        var expected = map(errors, stubTrue);

        var actual = map(errors, function (error) {
            return isError(error) === true;
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should return `true` for subclassed values', function () {
        assert.strictEqual(isError(new CustomError('x')), true);
    });

    it('should return `false` for non error objects', function () {
        var expected = map(falsey, stubFalse);

        var actual = map(falsey, function (value, index) {
            return index ? isError(value) : isError();
        });

        assert.deepStrictEqual(actual, expected);

        assert.strictEqual(isError(args), false);
        assert.strictEqual(isError([1, 2, 3]), false);
        assert.strictEqual(isError(true), false);
        assert.strictEqual(isError(new Date()), false);
        assert.strictEqual(isError(_), false);
        assert.strictEqual(isError(slice), false);
        assert.strictEqual(isError({ 'a': 1 }), false);
        assert.strictEqual(isError(1), false);
        assert.strictEqual(isError(/x/), false);
        assert.strictEqual(isError('a'), false);
    });

    it('should return `false` for plain objects', function () {
        assert.strictEqual(isError({ 'name': 'Error', 'message': '' }), false);
    });
});
