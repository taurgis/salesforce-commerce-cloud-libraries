var assert = require('assert');
var functions = require('../../../cartridges/lodash/functions');
var identity = require('../../../cartridges/lodash/identity');
var noop = require('../helpers/stubs').noop;

describe('functions', function () {
    it('should return the function names of an object', function () {
        var object = { 'a': 'a', 'b': identity, 'c': /x/, 'd': noop };
        var actual = functions(object).sort();

        assert.deepStrictEqual(actual, ['b', 'd']);
    });

    it('should not include inherited functions', function () {
        function Foo() {
            this.a = identity;
            this.b = 'b';
        }
        Foo.prototype.c = noop;

        assert.deepStrictEqual(functions(new Foo()), ['a']);
    });
});
