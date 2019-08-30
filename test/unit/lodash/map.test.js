var assert = require('assert');
var map = require('../../../cartridges/lodash/map');
var constant = require('../../../cartridges/lodash/constant');
var each = require('../../../cartridges/lodash/each');
var identity = require('../../../cartridges/lodash/identity');
var _ = require('../../../cartridges/lodash/wrapperLodash');
var { falsey, noop } = require('../helpers/stubs');


describe('map', function () {
    var array = [1, 2];

    it('should map values in `collection` to a new array', function () {
        var object = { 'a': 1, 'b': 2 };
        var expected = ['1', '2'];

        assert.deepStrictEqual(map(array, String), expected);
        assert.deepStrictEqual(map(object, String), expected);
    });

    it('should work with `_.property` shorthands', function () {
        var objects = [{ 'a': 'x' }, { 'a': 'y' }];
        assert.deepStrictEqual(map(objects, 'a'), ['x', 'y']);
    });

    it('should iterate over own string keyed properties of objects', function () {
        function Foo() {
            this.a = 1;
        }
        Foo.prototype.b = 2;

        var actual = map(new Foo(), identity);
        assert.deepStrictEqual(actual, [1]);
    });

    it('should use `_.identity` when `iteratee` is nullish', function () {
        var object = { 'a': 1, 'b': 2 };
        var values = [, null, undefined];
        var expected = map(values, constant([1, 2]));

        each([array, object], function (collection) {
            var actual = map(values, function (value, index) {
                return index ? map(collection, value) : map(collection);
            });

            assert.deepStrictEqual(actual, expected);
        });
    });

    it('should accept a falsey `collection`', function () {
        var expected = [[], [], [], [], [], [], []];

        var actual = map(falsey, function (collection, index) {
            try {
                return index ? map(collection) : map();
            } catch (e) {
                // DO NOTHING
            }
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should treat number values for `collection` as empty', function () {
        assert.deepStrictEqual(map(1), []);
    });

    it('should work with objects with non-number length properties', function () {
        var value = { 'value': 'x' };
        var object = { 'length': { 'value': 'x' } };

        assert.deepStrictEqual(map(object, identity), [value]);
    });

    it('should return a wrapped value when chaining', function () {
        assert.ok(_(array).map(noop) instanceof _);
    });
});
