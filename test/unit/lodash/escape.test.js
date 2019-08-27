var assert = require('assert');
var escape = require('../../../cartridges/lodash/escape');
var unescape = require('../../../cartridges/lodash/unescape');
var each = require('../../../cartridges/lodash/each');

describe('escape', function () {
    var escaped = '&amp;&lt;&gt;&quot;&#39;/';
    var unescaped = '&<>"\'/';

    escaped += escaped;
    unescaped += unescaped;

    it('should escape values', function () {
        assert.strictEqual(escape(unescaped), escaped);
    });

    it('should handle strings with nothing to escape', function () {
        assert.strictEqual(escape('abc'), 'abc');
    });

    it('should escape the same characters unescaped by `_.unescape`', function () {
        assert.strictEqual(escape(unescape(escaped)), escaped);
    });

    each(['`', '/'], function (chr) {
        it('should not escape the "' + chr + '" character', function () {
            assert.strictEqual(escape(chr), chr);
        });
    });
});
