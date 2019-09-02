var assert = require('assert');
var updateWith = require('../../../cartridges/lodash/updateWith');
var isObject = require('../../../cartridges/lodash/isObject');
var { stubThree, stubFour, noop } = require('../helpers/stubs');

describe('updateWith', function () {
    it('should work with a `customizer` callback', function () {
        var actual = updateWith({ '0': {} }, '[0][1][2]', stubThree, function (value) {
            return isObject(value) ? undefined : {};
        });

        assert.deepStrictEqual(actual, { '0': { '1': { '2': 3 } } });
    });

    it('should work with a `customizer` that returns `undefined`', function () {
        var actual = updateWith({}, 'a[0].b.c', stubFour, noop);
        assert.deepStrictEqual(actual, { 'a': [{ 'b': { 'c': 4 } }] });
    });
});
