var assert = require('assert');
var { falsey, stubFalse } = require('../helpers/stubs');
var isPlainObject = require('../../../cartridges/lodash/isPlainObject');
var create = require('../../../cartridges/lodash/create');
var map = require('../../../cartridges/lodash/map');
var objectProto = Object.prototype;


describe('isPlainObject', function () {
    it('should detect plain objects', function () {
        function Foo() {
            this.a = 1;
        }

        assert.strictEqual(isPlainObject({}), true);
        assert.strictEqual(isPlainObject({ 'a': 1 }), true);
        assert.strictEqual(isPlainObject({ 'constructor': Foo }), true);
        assert.strictEqual(isPlainObject([1, 2, 3]), false);
        assert.strictEqual(isPlainObject(new Foo(1)), false);
    });

    it('should return `true` for objects with a `[[Prototype]]` of `null`', function () {
        var object = create(null);
        assert.strictEqual(isPlainObject(object), true);

        object.constructor = objectProto.constructor;
        assert.strictEqual(isPlainObject(object), true);
    });

    it('should return `true` for objects with a `valueOf` property', function () {
        assert.strictEqual(isPlainObject({ 'valueOf': 0 }), true);
    });

    it('should return `false` for objects with a custom `[[Prototype]]`', function () {
        var object = create({ 'a': 1 });
        assert.strictEqual(isPlainObject(object), false);
    });

    it('should return `false` for non-Object objects', function () {
        assert.strictEqual(isPlainObject(arguments), false);
        assert.strictEqual(isPlainObject(Error), false);
        assert.strictEqual(isPlainObject(Math), false);
    });

    it('should return `false` for non-objects', function () {
        var expected = map(falsey, stubFalse);

        var actual = map(falsey, function (value, index) {
            return index ? isPlainObject(value) : isPlainObject();
        });

        assert.deepStrictEqual(actual, expected);

        assert.strictEqual(isPlainObject(true), false);
        assert.strictEqual(isPlainObject('a'), false);
    });
});
