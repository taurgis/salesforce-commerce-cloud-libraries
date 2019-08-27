var assert = require('assert');
var endsWith = require('../../../cartridges/lodash/endsWith');
var isArray = require('../../../cartridges/lodash/isArray');
var forEach = require('../../../cartridges/lodash/forEach');
var baseEach = require('../../../cartridges/lodash/internal/baseEach');
var forEachRight = require('../../../cartridges/lodash/forEachRight');
var transform = require('../../../cartridges/lodash/transform');
var each = require('../../../cartridges/lodash/each');

describe('exit early', function () {
    each(['_baseEach', 'forEach', 'forEachRight', 'forIn', 'forInRight', 'forOwn', 'forOwnRight', 'transform'], function (methodName) {
        var func = (function () {
            switch (methodName) {
                case '_baseEach': return baseEach;
                case 'forEach': return forEach;
                case 'forEachRight': return forEachRight;
                // TODO: case 'forOwn': return forOwn;
                // TODO: case 'forOwnRight': return forOwnRight;
                // TODO: case 'forIn': return forIn;
                case 'transform' : return transform;
                default: return null;
            }
        }());

        it('`_.' + methodName + '` can exit early when iterating arrays', function () {
            if (func) {
                var array = [1, 2, 3];
                var values = [];

                func(array, function (value, other) {
                    values.push(isArray(value) ? other : value);
                    return false;
                });

                assert.deepStrictEqual(values, [endsWith(methodName, 'Right') ? 3 : 1]);
            }
        });

        it('`_.' + methodName + '` can exit early when iterating objects', function () {
            if (func) {
                var object = { 'a': 1, 'b': 2, 'c': 3 };
                var values = [];

                func(object, function (value, other) {
                    values.push(isArray(value) ? other : value);
                    return false;
                });

                assert.strictEqual(values.length, 1);
            }
        });
    });
});
