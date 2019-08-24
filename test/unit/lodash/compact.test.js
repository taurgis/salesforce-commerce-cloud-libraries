var assert = require('assert');
var compact = require('../../../cartridges/lodash/compact');
var slice = require('../../../cartridges/lodash/slice');
var range = require('../../../cartridges/lodash/range');
var isEqual = require('../../../cartridges/lodash/isEqual');
var identity = require('../../../cartridges/lodash/identity');
var thru = require('../../../cartridges/lodash/thru');
var take = require('../../../cartridges/lodash/take');
var _ = require('../../../cartridges/lodash/chain');
var falsey = require('../helpers/falsey');
var LARGE_ARRAY_SIZE = require('../helpers/largeArraySize');

describe('compact', function () {
    var largeArray = range(LARGE_ARRAY_SIZE).concat(null);

    it('should filter falsey values', function () {
        var array = ['0', '1', '2'];
        assert.deepStrictEqual(compact(falsey.concat(array)), array);
    });

    it('should work when in-between lazy operators', function () {
        var actual = _(falsey).thru(slice).compact().thru(slice)
            .value();
        assert.deepEqual(actual, []);

        actual = _(falsey).thru(slice).push(true, 1).compact()
            .push('a')
            .value();
        assert.deepEqual(actual, [true, 1, 'a']);
    });

    it('should work in a lazy sequence', function () {
        var actual = _(largeArray).slice(1).compact().reverse()
            .take()
            .value();
        assert.deepEqual(actual, take(compact(slice(largeArray, 1)).reverse()));
    });


    it('should work in a lazy sequence with a custom `_.iteratee`', function () {
        var iteratee = _.iteratee;
        var pass = false;

        _.iteratee = identity;

        try {
            var actual = _(largeArray).slice(1).compact().value();
            pass = isEqual(actual, compact(slice(largeArray, 1)));
        } catch (e) { console.log(e); }

        assert.ok(pass);
        _.iteratee = iteratee;
    });
});
