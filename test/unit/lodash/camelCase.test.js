var assert = require('assert');
var camelCase = require('../../../cartridges/lodash/camelCase');
var each = require('../../../cartridges/lodash/each');

describe('camelCase', function () {
    it('should work with numbers', function () {
        assert.strictEqual(camelCase('12 feet'), '12Feet');
        assert.strictEqual(camelCase('enable 6h format'), 'enable6HFormat');
        assert.strictEqual(camelCase('enable 24H format'), 'enable24HFormat');
        assert.strictEqual(camelCase('too legit 2 quit'), 'tooLegit2Quit');
        assert.strictEqual(camelCase('walk 500 miles'), 'walk500Miles');
        assert.strictEqual(camelCase('xhr2 request'), 'xhr2Request');
    });

    it('should handle acronyms', function () {
        each(['safe HTML', 'safeHTML'], function (string) {
            assert.strictEqual(camelCase(string), 'safeHtml');
        });

        each(['escape HTML entities', 'escapeHTMLEntities'], function (string) {
            assert.strictEqual(camelCase(string), 'escapeHtmlEntities');
        });

        each(['XMLHttpRequest', 'XmlHTTPRequest'], function (string) {
            assert.strictEqual(camelCase(string), 'xmlHttpRequest');
        });
    });
});
