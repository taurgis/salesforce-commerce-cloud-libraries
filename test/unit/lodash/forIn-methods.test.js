var assert = require('assert');
var forIn = require('../../../cartridges/lodash/forIn');
var forInRight = require('../../../cartridges/lodash/forInRight');
var each = require('../../../cartridges/lodash/each');

describe('forIn methods', function () {
    each(['forIn', 'forInRight'], function (methodName) {
        var func = (function () {
            switch (methodName) {
                case 'forIn': return forIn;
                case 'forInRight': return forInRight;
                default: return null;
            }
        }());

        it('`_.' + methodName + '` iterates over inherited string keyed properties', function () {
            function Foo() {
                this.a = 1;
            }
            Foo.prototype.b = 2;

            var keys = [];
            func(new Foo(), function (value, key) { keys.push(key); });
            assert.deepStrictEqual(keys.sort(), ['a', 'b']);
        });
    });
});
