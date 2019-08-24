var assert = require('assert');
var constant = require('../../../cartridges/lodash/constant');
var map = require('../../../cartridges/lodash/map');
var every = require('../../../cartridges/lodash/every');
var empties = require('../helpers/stubs').empties;
var stubTrue = require('../helpers/stubs').true;
var falsey = require('../helpers/falsey').true;
var _ = require('../../../cartridges/lodash/wrapperLodash');

describe('constant', function () {
    it('should create a function that returns `value`', function () {
        var object = { 'a': 1 };
        var values = Array(2).concat(empties, true, 1, 'a');
        var constantFunction = constant(object);

        var results = map(values, function (value, index) {
            if (index < 2) {
                return index ? constantFunction.call({}) : constantFunction();
            }
            return constantFunction(value);
        });

        assert.ok(every(results, function (result) {
            return result === object;
        }));
    });

    it('should work with falsey values', function () {
        var expected = map(falsey, stubTrue);

        var actual = map(falsey, function (value, index) {
            var constantFunction = index ? constant(value) : constant();
            var result = constantFunction();

            return (result === value) || (result !== result && value !== value); // eslint-disable-line
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should return a wrapped value when chaining', function () {
        var wrapped = _(true).constant();
        assert.ok(wrapped instanceof _);
    });
});
