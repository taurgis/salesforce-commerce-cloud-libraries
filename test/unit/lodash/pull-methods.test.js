var assert = require('assert');
var pullMethod = require('../../../cartridges/lodash/pull');
var pullAll = require('../../../cartridges/lodash/pullAll');
var pullAllWith = require('../../../cartridges/lodash/pullAllWith');
var each = require('../../../cartridges/lodash/each');

describe('pull methods', function () {
    each(['pull', 'pullAll', 'pullAllWith'], function (methodName) {
        var func = (function () {
            switch (methodName) {
                case 'pull': return pullMethod;
                case 'pullAll': return pullAll;
                case 'pullAllWith': return pullAllWith;

                default: return null;
            }
        }());
        var isPull = methodName === 'pull';

        function pull(array, values) {
            return isPull
                ? func.apply(undefined, [array].concat(values))
                : func(array, values);
        }

        it('`_.' + methodName + '` should modify and return the array', function () {
            var array = [1, 2, 3];
            var actual = pull(array, [1, 3]);

            assert.strictEqual(actual, array);
            assert.deepStrictEqual(array, [2]);
        });

        it('`_.' + methodName + '` should preserve holes in arrays', function () {
            var array = [1, 2, 3, 4];
            delete array[1];
            delete array[3];

            pull(array, [1]);
            assert.ok(!('0' in array));
            assert.ok(!('2' in array));
        });

        it('`_.' + methodName + '` should treat holes as `undefined`', function () {
            var array = [1, 2, 3];
            delete array[1];

            pull(array, [undefined]);
            assert.deepStrictEqual(array, [1, 3]);
        });

        it('`_.' + methodName + '` should match `NaN`', function () {
            var array = [1, NaN, 3, NaN];

            pull(array, [NaN]);
            assert.deepStrictEqual(array, [1, 3]);
        });
    });
});
