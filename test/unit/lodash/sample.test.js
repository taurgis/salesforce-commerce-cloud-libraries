var assert = require('assert');
var sample = require('../../../cartridges/lodash/sample');
var includes = require('../../../cartridges/lodash/includes');
var map = require('../../../cartridges/lodash/map');
var transform = require('../../../cartridges/lodash/transform');
var { empties, noop } = require('../helpers/stubs');

describe('sample', function () {
    var array = [1, 2, 3];

    it('should return a random element', function () {
        var actual = sample(array);
        assert.ok(includes(array, actual));
    });

    it('should return `undefined` when sampling empty collections', function () {
        var expected = map(empties, noop);

        var actual = transform(empties, function (result, value) {
            try {
                result.push(sample(value));
            } catch (e) {
                // DO NOTHING
            }
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should sample an object', function () {
        var object = { 'a': 1, 'b': 2, 'c': 3 };
        var actual = sample(object);

        assert.ok(includes(array, actual));
    });
});
