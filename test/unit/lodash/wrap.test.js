var assert = require('assert');
var noop = require('../helpers/stubs').noop;
var stubA = require('../helpers/stubs').stubA;
var slice = Array.prototype.slice;
var wrap = require('../../../cartridges/lodash/wrap');
var map = require('../../../cartridges/lodash/map');

describe('wrap', function () {
    it('should create a wrapped function', function () {
        var p = wrap(escape, function (func, text) {
            return '<p>' + func(text) + '</p>';
        });

        assert.strictEqual(p('fred, barney, & pebbles'), '<p>fred%2C%20barney%2C%20%26%20pebbles</p>');
    });

    it('should provide correct `wrapper` arguments', function () {
        var args;

        var wrapped = wrap(noop, function () {
            args || (args = slice.call(arguments)); // eslint-disable-line
        });

        wrapped(1, 2, 3);
        assert.deepStrictEqual(args, [noop, 1, 2, 3]);
    });

    it('should use `_.identity` when `wrapper` is nullish', function () {
        var values = [, null, undefined]; // eslint-disable-line
        var expected = map(values, stubA);

        var actual = map(values, function (value, index) {
            var wrapped = index ? wrap('a', value) : wrap('a');
            return wrapped('b', 'c');
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should use `this` binding of function', function () {
        var p = wrap(escape, function (func) {
            return '<p>' + func(this.text) + '</p>';
        });

        var object = { 'p': p, 'text': 'fred, barney, & pebbles' };
        assert.strictEqual(object.p(), '<p>fred%2C%20barney%2C%20%26%20pebbles</p>');
    });
});
