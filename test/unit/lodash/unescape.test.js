var assert = require('assert');
var unescape = require('../../../cartridges/lodash/unescape');
var escape = require('../../../cartridges/lodash/escape');
var each = require('../../../cartridges/lodash/each');

describe('unescape', function () {
    var escaped = '&amp;&lt;&gt;&quot;&#39;/';
    var unescaped = '&<>"\'/';

    escaped += escaped;
    unescaped += unescaped;

    it('should unescape entities in order', function () {
        assert.strictEqual(unescape('&amp;lt;'), '&lt;');
    });

    it('should unescape the proper entities', function () {
        assert.strictEqual(unescape(escaped), unescaped);
    });

    it('should handle strings with nothing to unescape', function () {
        assert.strictEqual(unescape('abc'), 'abc');
    });

    it('should unescape the same characters escaped by `_.escape`', function () {
        assert.strictEqual(unescape(escape(unescaped)), unescaped);
    });

    each(['&#96;', '&#x2F;'], function (entity) {
        it('should not unescape the "' + entity + '" entity', function () {
            assert.strictEqual(unescape(entity), entity);
        });
    });
});
