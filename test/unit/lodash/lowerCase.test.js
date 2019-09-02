var assert = require('assert');
var lowerCase = require('../../../cartridges/lodash/lowerCase');

describe('lowerCase', function () {
    it('should lowercase as space-separated words', function () {
        assert.strictEqual(lowerCase('--Foo-Bar--'), 'foo bar');
        assert.strictEqual(lowerCase('fooBar'), 'foo bar');
        assert.strictEqual(lowerCase('__FOO_BAR__'), 'foo bar');
    });
});
