var assert = require('assert');
var update = require('../../../cartridges/lodash/update');
var updateWith = require('../../../cartridges/lodash/updateWith');
var each = require('../../../cartridges/lodash/each');

describe('update methods', function () {
    each(['update', 'updateWith'], function (methodName) {
        var func = methodName === update ? update : updateWith;
        var oldValue = 1;

        it('`_.' + methodName + '` should invoke `updater` with the value on `path` of `object`', function () {
            var object = { 'a': [{ 'b': { 'c': oldValue } }] };
            var expected = oldValue + 1;

            each(['a[0].b.c', ['a', '0', 'b', 'c']], function (path) {
                func(object, path, function (n) {
                    assert.strictEqual(n, oldValue);
                    return ++n;
                });

                assert.strictEqual(object.a[0].b.c, expected);
                object.a[0].b.c = oldValue;
            });
        });
    });
});
