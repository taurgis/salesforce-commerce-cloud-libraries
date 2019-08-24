var assert = require('assert');
var slice = Array.prototype.slice;
var errors = require('../helpers/errors');
var attempt = require('../../../cartridges/lodash/attempt');
var stubTrue = require('../helpers/stubs').true;
var map = require('../../../cartridges/lodash/map');
var realm = {};
var CustomError = require('../helpers/customError');

describe('attempt', function () {
    it('should return the result of `func`', function () {
        assert.strictEqual(attempt(() => 'x'), 'x');
    });

    it('should provide additional arguments to `func`', function () {
        var actual = attempt(function () { return slice.call(arguments); }, 1, 2);
        assert.deepStrictEqual(actual, [1, 2]);
    });

    it('should return the caught error', function () {
        var expected = map(errors, stubTrue);

        var actual = map(errors, function (error) {
            return attempt(function () { throw error; }) === error;
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should preserve custom errors', function () {
        var actual = attempt(function () { throw new CustomError('x'); });
        assert.ok(actual instanceof CustomError);
    });

    it('should work with an error object from another realm', function () {
        if (realm.errors) {
            var expected = map(realm.errors, stubTrue);

            var actual = map(realm.errors, function (error) {
                return attempt(function () { throw error; }) === error;
            });

            assert.deepStrictEqual(actual, expected);
        }
    });
});
