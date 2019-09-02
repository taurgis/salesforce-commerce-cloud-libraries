var assert = require('assert');
var replace = require('../../../cartridges/lodash/replace');

describe('replace', function () {
    it('should replace the matched pattern', function () {
        var string = 'abcde';
        assert.strictEqual(replace(string, 'de', '123'), 'abc123');
        assert.strictEqual(replace(string, /[bd]/g, '-'), 'a-c-e');
    });
});
