var assert = require('assert');
var add = require('../helpers/add');
var square = require('../helpers/square');
var noop = require('../helpers/stubs').noop;
var identity = require('../../../cartridges/lodash/identity');
var times = require('../../../cartridges/lodash/times');
var each = require('../../../cartridges/lodash/each');
var flow = require('../../../cartridges/lodash/flow');
var flowRight = require('../../../cartridges/lodash/flowRight');
var _ = require('../../../cartridges/lodash/wrapperLodash');

describe('flow methods', function () {
    each(['flow', 'flowRight'], function (methodName) {
        var func = (function () {
            switch (methodName) {
                case 'flow': return flow;
                case 'flowRight': return flowRight;
                default: return null;
            }
        }());
        var isFlow = methodName === 'flow';

        it('`_.' + methodName + '` should supply each function with the return value of the previous', function () {
            var fixed = function (n) { return n.toFixed(1); };
            var combined = isFlow ? func(add, square, fixed) : func(fixed, square, add);

            assert.strictEqual(combined(1, 2), '9.0');
        });

        it('`_.' + methodName + '` should return a new function', function () {
            assert.notStrictEqual(func(noop), noop);
        });

        it('`_.' + methodName + '` should return an identity function when no arguments are given', function () {
            times(2, function (index) {
                try {
                    var combined = index ? func([]) : func();
                    assert.strictEqual(combined('a'), 'a');
                } catch (e) {
                    assert.ok(false, e.message);
                }
                assert.strictEqual(combined.length, 0);
                assert.notStrictEqual(combined, identity);
            });
        });

        it('`_.' + methodName + '` should return a wrapped value when chaining', function () {
            var wrapped = _(noop)[methodName]();
            assert.ok(wrapped instanceof _);
        });
    });
});
