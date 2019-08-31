var assert = require('assert');
var isElement = require('../../../cartridges/lodash/isElement');
var map = require('../../../cartridges/lodash/map');
var _ = require('../../../cartridges/lodash/wrapperLodash');
var args = require('../helpers/args');
var stubFalse = require('../helpers/stubs').false;
var falsey = require('../helpers/falsey');
var slice = Array.prototype.slice;

describe('isElement', function () {
    it('should return `true` for non-plain objects', function () {
        function Foo() {
            this.nodeType = 1;
        }

        assert.strictEqual(isElement(new Foo()), true);
    });

    it('should return `false` for non DOM elements', function () {
        var expected = map(falsey, stubFalse);

        var actual = map(falsey, function (value, index) {
            return index ? isElement(value) : isElement();
        });

        assert.deepStrictEqual(actual, expected);

        assert.strictEqual(isElement(args), false);
        assert.strictEqual(isElement([1, 2, 3]), false);
        assert.strictEqual(isElement(true), false);
        assert.strictEqual(isElement(new Date()), false);
        assert.strictEqual(isElement(new Error()), false);
        assert.strictEqual(isElement(_), false);
        assert.strictEqual(isElement(slice), false);
        assert.strictEqual(isElement({ 'a': 1 }), false);
        assert.strictEqual(isElement(1), false);
        assert.strictEqual(isElement(/x/), false);
        assert.strictEqual(isElement('a'), false);
    });

    it('should return `false` for plain objects', function () {
        assert.strictEqual(isElement({ 'nodeType': 1 }), false);
        assert.strictEqual(isElement({ 'nodeType': Object(1) }), false);
        assert.strictEqual(isElement({ 'nodeType': true }), false);
        assert.strictEqual(isElement({ 'nodeType': [1] }), false);
        assert.strictEqual(isElement({ 'nodeType': '1' }), false);
        assert.strictEqual(isElement({ 'nodeType': '001' }), false);
    });
});
