var assert = require('assert');
var forOwn = require('../../../cartridges/lodash/forOwn');
var forOwnRight = require('../../../cartridges/lodash/forOwnRight');
var each = require('../../../cartridges/lodash/each');

describe('forOwn methods', function () {
    each(['forOwn', 'forOwnRight'], function (methodName) {
        var func = (function () {
            switch (methodName) {
                case 'forOwn': return forOwn;
                case 'forOwnRight': return forOwnRight;
                default: return null;
            }
        }());

        it('`_.' + methodName + '` should iterate over `length` properties', function () {
            var object = { '0': 'zero', '1': 'one', 'length': 2 };
            var props = [];

            func(object, function (value, prop) { props.push(prop); });
            assert.deepStrictEqual(props.sort(), ['0', '1', 'length']);
        });
    });
});
