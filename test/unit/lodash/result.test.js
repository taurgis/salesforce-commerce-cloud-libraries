var assert = require('assert');
var result = require('../../../cartridges/lodash/result');
var constant = require('../../../cartridges/lodash/constant');
var each = require('../../../cartridges/lodash/each');
var { stubB } = require('../helpers/stubs');

describe('result', function () {
    var object = { 'a': 1, 'b': stubB };

    it('should invoke function values', function () {
        assert.strictEqual(result(object, 'b'), 'b');
    });

    it('should invoke default function values', function () {
        var actual = result(object, 'c', object.b);
        assert.strictEqual(actual, 'b');
    });

    it('should invoke nested function values', function () {
        var value = { 'a': constant({ 'b': stubB }) };

        each(['a.b', ['a', 'b']], function (path) {
            assert.strictEqual(result(value, path), 'b');
        });
    });

    it('should invoke deep property methods with the correct `this` binding', function () {
        var value = { 'a': { 'b': function () { return this.c; }, 'c': 1 } };

        each(['a.b', ['a', 'b']], function (path) {
            assert.strictEqual(result(value, path), 1);
        });
    });
});
