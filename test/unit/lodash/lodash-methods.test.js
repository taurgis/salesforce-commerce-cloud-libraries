var assert = require('assert');
var bind = require('../../../cartridges/lodash/bind');
var map = require('../../../cartridges/lodash/map');
var includes = require('../../../cartridges/lodash/includes');
var each = require('../../../cartridges/lodash/each');
var isArray = require('../../../cartridges/lodash/isArray');
var { falsey, stubTrue } = require('../helpers/stubs');

describe('lodash methods', function () {
    var checkFuncs = [
        'after',
        'ary',
        'before',
        'bind',
        'curry',
        'curryRight',
        'flip',
        'flow',
        'flowRight',
        'memoize',
        'negate',
        'once',
        'partial',
        'partialRight',
        'rearg',
        'rest',
        'spread',
        'unary'
    ];

    var noBinding = [
        'flip',
        'memoize',
        'negate',
        'once',
        'overArgs',
        'partial',
        'partialRight',
        'rearg',
        'rest',
        'spread'
    ];

    var rejectFalsey = [
        'tap',
        'thru'
    ].concat(checkFuncs);

    var returnArrays = [
        'at',
        'chunk',
        'compact',
        'difference',
        'drop',
        'filter',
        'flatten',
        'functions',
        'initial',
        'intersection',
        'invokeMap',
        'keys',
        'map',
        'orderBy',
        'pull',
        'pullAll',
        'pullAt',
        'range',
        'rangeRight',
        'reject',
        'remove',
        'shuffle',
        'sortBy',
        'tail',
        'take',
        'times',
        'toArray',
        'toPairs',
        'toPairsIn',
        'union',
        'uniq',
        'values',
        'without',
        'xor',
        'zip'
    ];


    it('should return an array', function () {
        var array = [1, 2, 3];

        each(returnArrays, function (methodName) {
            var actual;
            var func = require('../../../cartridges/lodash/' + methodName);

            switch (methodName) {
                case 'invokeMap':
                    actual = func(array, 'toFixed');
                    break;
                case 'sample':
                    actual = func(array, 1);
                    break;
                default:
                    actual = func(array);
            }
            assert.ok(isArray(actual), '_.' + methodName + ' returns an array');

            var isPull = methodName === 'pull' || methodName === 'pullAll';
            assert.strictEqual(actual === array, isPull, '_.' + methodName + ' should ' + (isPull ? '' : 'not ') + 'return the given array');
        });
    });

    it('should throw an error for falsey arguments', function () {
        each(rejectFalsey, function (methodName) {
            var expected = map(falsey, stubTrue);
            var func = require('../../../cartridges/lodash/' + methodName);

            var actual = map(falsey, function (value, index) {
                var pass = !index && /^(?:backflow|compose|cond|flow(Right)?|over(?:Every|Some)?)$/.test(methodName);

                try {
                    index ? func(value) : func();
                } catch (e) {
                    pass = !pass && (e instanceof TypeError) &&
            (!includes(checkFuncs, methodName) || (e.message === 'Expected a function'));
                }
                return pass;
            });

            assert.deepStrictEqual(actual, expected, '`_.' + methodName + '` rejects falsey arguments');
        });
    });

    it('should use `this` binding of function', function () {
        each(noBinding, function (methodName) {
            var fn = function () { return this.a; };
            var func = require('../../../cartridges/lodash/' + methodName);
            var isNegate = methodName === 'negate';
            var object = { 'a': 1 };
            var expected = isNegate ? false : 1;

            var wrapper = func(bind(fn, object));
            assert.strictEqual(wrapper(), expected, '`_.' + methodName + '` can consume a bound function');

            wrapper = bind(func(fn), object);
            assert.strictEqual(wrapper(), expected, '`_.' + methodName + '` can be bound');

            object.wrapper = func(fn);
            assert.strictEqual(object.wrapper(), expected, '`_.' + methodName + '` uses the `this` of its parent object');
        });
    });
});
