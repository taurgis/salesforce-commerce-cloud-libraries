var assert = require('assert');
var burredLetters = require('../helpers/burredLetters');
var deburredLetters = require('../helpers/deburredLetters');
var comboMarks = require('../helpers/comboMarks');
var deburr = require('../../../cartridges/lodash/deburr');
var map = require('../../../cartridges/lodash/map');
var constant = require('../../../cartridges/lodash/constant');

describe('deburr', function () {
    it('should convert Latin Unicode letters to basic Latin', function () {
        var actual = map(burredLetters, deburr);
        assert.deepStrictEqual(actual, deburredLetters);
    });

    it('should not deburr Latin mathematical operators', function () {
        var operators = ['\xd7', '\xf7'];
        var actual = map(operators, deburr);

        assert.deepStrictEqual(actual, operators);
    });

    it('should deburr combining diacritical marks', function () {
        var expected = map(comboMarks, constant('ei'));

        var actual = map(comboMarks, function (chr) {
            return deburr('e' + chr + 'i');
        });

        assert.deepStrictEqual(actual, expected);
    });
});
