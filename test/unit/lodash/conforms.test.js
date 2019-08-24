var assert = require('assert');
var conforms = require('../../../cartridges/lodash/conforms');

describe('conforms', function () {
    it('should not change behavior if `source` is modified', function () {
        var object = { 'a': 2 };
        var source = { 'a': function (value) { return value > 1; } };
        var par = conforms(source);

        assert.strictEqual(par(object), true);

        source.a = function (value) { return value < 2; };
        assert.strictEqual(par(object), true);
    });
});
