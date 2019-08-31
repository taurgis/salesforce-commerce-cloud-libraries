var assert = require('assert');
var matches = require('../../../cartridges/lodash/matches');
var cloneDeep = require('../../../cartridges/lodash/cloneDeep');
var each = require('../../../cartridges/lodash/each');

describe('matches', function () {
    it('should not change behavior if `source` is modified', function () {
        var sources = [
            { 'a': { 'b': 2, 'c': 3 } },
            { 'a': 1, 'b': 2 },
            { 'a': 1 }
        ];

        each(sources, function (source, index) {
            var object = cloneDeep(source);
            var par = matches(source);

            assert.strictEqual(par(object), true);

            if (index) {
                source.a = 2;
                source.b = 1;
                source.c = 3;
            } else {
                source.a.b = 1;
                source.a.c = 2;
                source.a.d = 3;
            }
            assert.strictEqual(par(object), true);
            assert.strictEqual(par(source), false);
        });
    });
});
