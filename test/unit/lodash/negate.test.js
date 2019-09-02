var assert = require('assert');
var negate = require('../../../cartridges/lodash/negate');
var times = require('../../../cartridges/lodash/times');
var { stubTrue } = require('../helpers/stubs');
var isEven = require('../helpers/isEven');

describe('negate', function () {
    it('should create a function that negates the result of `func`', function () {
        var negateFn = negate(isEven);

        assert.strictEqual(negateFn(1), true);
        assert.strictEqual(negateFn(2), false);
    });

    it('should create a function that negates the result of `func`', function () {
        var negateFn = negate(isEven);

        assert.strictEqual(negateFn(1), true);
        assert.strictEqual(negateFn(2), false);
    });

    it('should create a function that accepts multiple arguments', function () {
        var argCount;
        var count = 5;
        var negateFn = negate(function () { argCount = arguments.length; });
        var expected = times(count, stubTrue);

        var actual = times(count, function (index) {
            switch (index) {
                case 0: negateFn(); break;
                case 1: negateFn(1); break;
                case 2: negateFn(1, 2); break;
                case 3: negateFn(1, 2, 3); break;
                case 4: negateFn(1, 2, 3, 4); break;
                default:
                    break;
            }
            return argCount === index;
        });

        assert.deepStrictEqual(actual, expected);
    });
});
