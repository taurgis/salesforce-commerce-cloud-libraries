/* eslint-disable */

'use strict';

var server = require('server');
var timeFunction = require('../scripts/util/timeFunction');

/** Just an example controller to test lodash functions */
server.get('Test', function (req, res, next) {
    var conforms = require('lodash/conforms');
    var filter = require('lodash/filter');
    var isEqual = require('lodash/isEqual');
    var flip = require('lodash/flip');
    var constant = require('lodash/constant');
    var toArray = require('lodash/toArray');
    var flow = require('lodash/flow');
    var times = require('lodash/times');
    var flowRight = require('lodash/flowRight');
    var add = require('lodash/add');
    var forIn = require('lodash/forIn');
    var forInRight = require('lodash/forInRight');
    var forOwn = require('lodash/forOwn');
    var forOwnRight = require('lodash/forOwnRight');
    var create = require('lodash/create');
    var HashMap = require('dw/util/HashMap');
    var HashSet = require('dw/util/HashSet');
    var memoize = require('lodash/memoize');
    var partial = require('lodash/partial');
    var partialRight = require('lodash/partialRight');
    var overArgs = require('lodash/overArgs');
    var once = require('lodash/once');
    var rest = require('lodash/rest');
    var initial = require('lodash/initial');
    var size = require('lodash/size');
    var last = require('lodash/last');
    var rearg = require('lodash/rearg');
    var spread = require('lodash/spread');

    var afterTest = '';

    var afterTestFunction = require('lodash/after')(2, function () {
        afterTest = 'after is finished';
    });

    function Foo() {
        this.a = 1;
    }

    function Bar() {
        this.c = 3;
    }

    Foo.prototype.b = 2;
    Bar.prototype.d = 4;
    var attemptTest = function () {
        throw new Error();
    };

    afterTestFunction();
    afterTestFunction();

    var conditionalFunct = require('lodash/cond')([
        [require('lodash/matches')({ 'a': 1 }), require('lodash/constant')('matches A')],
        [require('lodash/conforms')({ 'b': require('lodash/isNumber') }), require('lodash/constant')('matches B')]
    ]);

    var forEachTest = [];

    require('lodash/forEach')([1, 2], function (value) { forEachTest.push(value); });
    require('lodash/forEachRight')([1, 2], function (value) { forEachTest.push(value); });

    function isGreeting(value) {
        return /^h(?:i|ello)$/.test(value);
    }

    function customizerGreeting(objValue, othValue) {
        if (isGreeting(objValue) && isGreeting(othValue)) {
            return true;
        }
    }

    var CustomerMgr = require('dw/customer/CustomerMgr');

    const array = ['hello', 'goodbye'];
    const other = ['hi', 'goodbye'];
    var chained = require('lodash/wrapperLodash')([1, 2, 3]).take(2);

    function customizer(objValue, srcValue) {
        return require('lodash/isUndefined')(objValue) ? srcValue : objValue;
    }

    function customizerAssignWith(objValue, srcValue) {
        return require('lodash/isUndefined')(objValue) ? srcValue : objValue;
    }

    var defaults = require('lodash/partialRight')(require('lodash/assignInWith'), customizer);
    var defaultsAssignWith = require('lodash/partialRight')(require('lodash/assignWith'), customizerAssignWith);

    function greet(greeting, punctuation) {
        return greeting + ' ' + this.user + punctuation;
    }

    var bound = require('lodash/bind')(greet, { 'user': 'fred' }, 'hi')
    var boundKey = require('lodash/bindKey')({
        'user': 'fred',
        'greet': function (greeting, punctuation) {
            return greeting + ' ' + this.user + punctuation;
        }
    }, 'greet', 'hi');

    var objects = [
        { 'a': 2, 'b': 1 },
        { 'a': 1, 'b': 2 }
    ];
    var object = { 'a': 1, 'b': 2 };
    var memoizeValues = memoize(require('lodash/values'));
    var abc = function (a, b, c) {
        return [a, b, c];
    };

    var curried = require('lodash/curry')(abc);
    var curriedRight = require('lodash/curryRight')(abc);
    var objectsDifferenceWith = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];

    function duplicate(n) {
        return [[[n, n]]]
    }

    var flipped = flip(function () {
        return toArray(arguments);
    });

    function square(n) {
        return n * n;
    }

    var addSquare = flow([add, square]);
    var addSquareRight = flowRight([square, add])

    function FooIn() {
        this.a = 1;
        this.b = 2;
    }

    FooIn.prototype.c = 3;
    var forInResult = [];
    forIn(new FooIn, function (value, key) {
        forInResult.push(key);
    });

    forInRight(new FooIn, function (value, key) {
        forInResult.push(key);
    });

    var forOwnResult = [];
    forOwn(new FooIn, function (value, key) {
        forOwnResult.push(key);
    });

    forOwnRight(new FooIn, function (value, key) {
        forOwnResult.push(key);
    });

    function FooFunction() {
        this.a = function () { return 'a'; }
        this.b = function () { return 'b'; }
    }

    function mergeCustomizer(objValue, srcValue) {
        if (Array.isArray(objValue)) {
            return objValue.concat(srcValue)
        }
    }

    var arrayMethodOf = times(3, constant)
    var objectMethodOf = { 'a': arrayMethodOf, 'b': arrayMethodOf, 'c': arrayMethodOf };
    var onlyOnceCount = 0;
    var onlyOnce = once(function () {
        onlyOnceCount++;
    });

    onlyOnce();
    onlyOnce();

    function doubled(n) {
        return n * 2;
    }

    function square(n) {
        return n * n;
    }

    var overArgsFunc = overArgs(function (x, y) {
        return [x, y];
    }, [square, doubled]);

    function greetPartial(greeting, name) {
        return greeting + ' ' + name;
    }

    var sayHelloTo = partial(greetPartial, 'hello')
    var greetFred = partialRight(greetPartial, 'fred');

    var rearged = rearg(function (a, b, c) {
        return [a, b, c];
    }, [2, 0, 1]);


    var say = rest(function (what, names) {
        return what + ' ' + initial(names).join(', ') +
            (size(names) > 1 ? ', & ' : '') + last(names);
    });

    var spreadSay = spread(function (who, what) {
        return who + ' says ' + what;
    });

    var zipped = require('lodash/zip')([1, 2], [10, 20], [100, 200]);
    var p = require('lodash/wrap')(require('lodash/escape'), function (func, text) {
        return '<p>' + func(text) + '</p>';
    });

    res.json(
        {
            wrapped: chained.value(),
            add: timeFunction(require('lodash/add'), 2, 2),
            after: afterTest,
            ary: timeFunction(require('lodash/map'), [6, 8, 10], require('lodash/ary')(parseInt, 1)),
            assign: timeFunction(require('lodash/assign'), { a: 0 }, new Foo(), new Bar()),
            assignIn: timeFunction(require('lodash/assignIn'), { a: 0 }, new Foo(), new Bar()),
            assignInWith: timeFunction(defaults, { a: 1 }, { b: 2 }, { a: 3 }),
            assignWith: timeFunction(defaultsAssignWith, { a: 1 }, { b: 2 }, { a: 3 }),
            at: timeFunction(require('lodash/at'), { a: [{ b: { c: 3 } }, 4] }, ['a[0].b.c', 'a[1]']),
            attempt: timeFunction(require('lodash/attempt'), attemptTest),
            bind: timeFunction(bound, '!'),
            bindKey: timeFunction(boundKey, '!'),
            camelCase: timeFunction(require('lodash/camelCase'), '__FOO_BAR__TEST'),
            capitalize: timeFunction(require('lodash/capitalize'), 'fRED'),
            castArray: timeFunction(require('lodash/castArray'), 'abc'),
            ceil: timeFunction(require('lodash/ceil'), 6.004, 2),
            chunk: timeFunction(require('lodash/chunk'), ['a', 'b', 'c', 'd'], 2),
            clamp: timeFunction(require('lodash/clamp'), 10, -5, 5),
            clone: timeFunction(require('lodash/clone'), [{ 'a': 1 }, { 'b': 2 }]),
            cloneDeep: timeFunction(require('lodash/cloneDeep'), [{ 'a': 1 }, { 'b': 2 }]),
            compact: timeFunction(require('lodash/compact'), [0, 1, false, 2, '', 3]),
            concat: timeFunction(require('lodash/concat'), [1], 2, [3], [[4]]),
            cond: conditionalFunct({ a: 1, b: 2 }),
            conforms: timeFunction(filter, objects, conforms({ 'b': function (n) { return n > 1; } })),
            conformsTo: timeFunction(require('lodash/conformsTo'), object, { 'b': function (n) { return n > 1; } }),
            countBy: timeFunction(require('lodash/countBy'), [
                { user: 'barney', active: true },
                { user: 'betty', active: true },
                { user: 'fred', active: false }
            ], 'active'),
            curry: curried(1)(2)(3),
            curryright: curriedRight(1)(2)(3),
            deburr: timeFunction(require('lodash/deburr'), 'téstêrûÜ'),
            defaults: timeFunction(require('lodash/defaults'), { 'a': 1 }, { 'b': 2 }, { 'a': 3 }),
            defaultsDeep: timeFunction(require('lodash/defaultsDeep'), { 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } }),
            defaultTo: timeFunction(require('lodash/defaultTo'), null, 2),
            defaultToAny: timeFunction(require('lodash/defaultToAny'), undefined, [null, undefined, 20, 40]),
            difference: timeFunction(require('lodash/difference'), [2, 1], [2, 3]),
            differenceBy: timeFunction(require('lodash/differenceBy'), [2.1, 1.2], [2.3, 3.4], Math.floor),
            differenceWith: require('lodash/differenceWith')(objectsDifferenceWith, [{ 'x': 1, 'y': 2 }], isEqual),
            divide: timeFunction(require('lodash/divide'), 6, 3),
            drop: timeFunction(require('lodash/drop'), [1, 2, 3], 2),
            dropRight: timeFunction(require('lodash/dropRight'), [1, 2, 3], 2),
            dropRightWhile: timeFunction(require('lodash/dropRightWhile'), [
                { user: 'barney', active: true },
                { user: 'fred', active: false },
                { user: 'pebbles', active: false }
            ], function (o) { return !o.active; }),
            dropWhile: timeFunction(require('lodash/dropWhile'), [
                { user: 'barney', active: true },
                { user: 'fred', active: true },
                { user: 'pebbles', active: false }
            ], function ({ active }) { return active; }),
            endsWith: timeFunction(require('lodash/endsWith'), 'abc', 'c'),
            eq: timeFunction(require('lodash/eq'), 'a', Object('a')),
            eqDeepNative: { a: 1 } === { a: 1 },
            eqDeep: timeFunction(require('lodash/eqDeep'), { a: 1 }, { a: 1 }),
            escape: timeFunction(require('lodash/escape'), 'fred, barney, & pebbles'),
            escapeRegex: timeFunction(require('lodash/escapeRegExp'), '[lodash](https://lodash.com/)'),
            every: timeFunction(require('lodash/every'), [true, 1, null, 'yes'], Boolean),
            everyValue: timeFunction(require('lodash/everyValue'), { a: 0, b: 'yes', c: false }, Boolean),
            fill: timeFunction(require('lodash/fill'), Array(3), 2),
            filter: timeFunction(require('lodash/filter'), [{ user: 'barney', active: true },
            { user: 'fred', active: false }], function (value) { return value.active; }),
            filterObject: timeFunction(require('lodash/filterObject'), { a: 5, b: 8, c: 10 }, function (n) { return !(n % 5); }),
            find: timeFunction(require('lodash/find'), {
                barney: { age: 36, active: true },
                fred: { age: 40, active: false },
                pebbles: { age: 1, active: true }
            }, function ({ age }) { return age < 40; }),
            findIndex: timeFunction(require('lodash/findIndex'), [
                { 'user': 'barney', age: 50 },
                { 'user': 'fred', age: 41 },
                { 'user': 'pebbles', age: 1 }
            ], function ({ age }) { return age < 40; }),
            findKey: timeFunction(require('lodash/findKey'), {
                barney: { age: 36, active: true },
                fred: { age: 40, active: false },
                pebbles: { age: 1, active: true }
            }, function ({ age }) { return age < 40; }),
            findLast: timeFunction(require('lodash/findLast'), [1, 2, 3, 4], function (n) { return n % 2 === 1; }),
            findLastIndex: timeFunction(require('lodash/findLastIndex'), [
                { 'user': 'barney', age: 50 },
                { 'user': 'fred', age: 41 },
                { 'user': 'pebbles', age: 1 }
            ], function ({ age }) { return age < 40; }),
            findLastKey: timeFunction(require('lodash/findLastKey'), {
                barney: { age: 36, active: true },
                fred: { age: 40, active: false },
                pebbles: { age: 1, active: true }
            }, function ({ age }) { return age < 40; }),
            first: timeFunction(require('lodash/first'), [1, 2, 3]),
            flatMap: timeFunction(require('lodash/flatMap'), [1, 2], function duplicate(n) {
                return [n, n];
            }),
            flatMapDeep: timeFunction(require('lodash/flatMapDeep'), [1, 2], duplicate),
            flatMapDepth: timeFunction(require('lodash/flatMapDepth'), [1, 2], function duplicate(n) {
                return [[[n, n]]];
            }, 2),
            flatten: timeFunction(require('lodash/flatten'), [1, [2, [3, [4]], 5]]),
            flattenDeep: timeFunction(require('lodash/flattenDeep'), [1, [2, [3, [4]], 5]]),
            flattenDepth: timeFunction(require('lodash/flattenDepth'), [1, [2, [3, [4]], 5]], 1),
            flip: timeFunction(flipped, 'a', 'b', 'c', 'd'),
            floor: timeFunction(require('lodash/floor'), 4060, -2),
            flow: timeFunction(addSquare, 1, 2),
            flowRight: timeFunction(addSquareRight, 1, 2),
            forEach: forEachTest,
            forIn: forInResult,
            forOwn: forOwnResult,
            fromEntries: timeFunction(require('lodash/fromEntries'), [['a', 1], ['b', 2]]),
            fromPairs: timeFunction(require('lodash/fromPairs'), [['a', 1], ['b', 2]]),
            functions: timeFunction(require('lodash/functions'), new FooFunction()),
            get: timeFunction(require('lodash/get'), { 'a': [{ 'b': { 'c': 3 } }] }, 'a[0].b.c'),
            groupBy: timeFunction(require('lodash/groupBy'), [6.1, 4.2, 6.3], Math.floor),
            gt: timeFunction(require('lodash/gt'), 1, 3),
            gte: timeFunction(require('lodash/gte'), 3, 3),
            has: timeFunction(require('lodash/has'), { a: { b: 2 } }, 'a'),
            hasIn: timeFunction(require('lodash/hasIn'), create({ 'a': create({ 'b': 2 }) }), 'a.b'),
            hasPath: timeFunction(require('lodash/hasPath'), { a: { b: 2 } }, 'a.c'),
            hasPathIn: timeFunction(require('lodash/hasPathIn'), { a: { b: 2 } }, 'a.b'),
            head: timeFunction(require('lodash/head'), [1, 2, 3]),
            identity: timeFunction(require('lodash/identity'), { 'a': 1 }),
            includes: timeFunction(require('lodash/includes'), { 'a': 1, 'b': 2 }, 1),
            indexOf: timeFunction(require('lodash/indexOf'), [1, 2, 1, 2], 2, 2),
            initial: timeFunction(require('lodash/initial'), [1, 2, 3]),
            inRange: timeFunction(require('lodash/inRange'), -3, -2, -6),
            intersection: timeFunction(require('lodash/intersection'), [2, 1], [2, 3]),
            intersectionBy: timeFunction(require('lodash/intersectionBy'), [2.1, 1.2], [2.3, 3.4], Math.floor),
            intersectionWith: timeFunction(require('lodash/intersectionWith'), [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }], [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }], isEqual),
            invert: timeFunction(require('lodash/invert'), { a: 1, b: 2, c: 1 }),
            invertBy: timeFunction(require('lodash/invertBy'), { a: 1, b: 2, c: 1 }, function (value) { return 'group' + value; }),
            invoke: timeFunction(require('lodash/invoke'), { 'a': [{ 'b': { 'c': [1, 2, 3, 4] } }] }, 'a[0].b.c.slice', 1, 3),
            invokeMap: timeFunction(require('lodash/invokeMap'), [[5, 1, 7], [3, 2, 1]], 'sort'),
            isArguments: timeFunction(require('lodash/isArguments'), (function () { return arguments; }())),
            isArray: timeFunction(require('lodash/isArray'), [1, 2, 3]),
            isArrayLike: timeFunction(require('lodash/isArrayLike'), [1, 2, 3]),
            isArrayLikeObject: timeFunction(require('lodash/isArrayLikeObject'), [1, 2, 3]),
            isBoolean: timeFunction(require('lodash/isBoolean'), null),
            isBuffer: timeFunction(require('lodash/isBuffer'), 'test'),
            isDate: timeFunction(require('lodash/isDate'), new Date()),
            isEmpty: timeFunction(require('lodash/isEmpty'), null),
            isEqual: timeFunction(require('lodash/isEqualWith'), array, other),
            isEqualWith: timeFunction(require('lodash/isEqualWith'), array, other, customizerGreeting),
            isError: timeFunction(require('lodash/isError'), new Error()),
            isFinite: timeFunction(require('lodash/isFinite'), Infinity),
            isFunction: timeFunction(require('lodash/isFunction'), CustomerMgr.getCustomerByLogin),
            isInteger: timeFunction(require('lodash/isInteger'), 3),
            isLength: timeFunction(require('lodash/isLength'), 3),
            isMap: timeFunction(require('lodash/isMap'), new HashMap()),
            isMatch: timeFunction(require('lodash/isMatch'), { a: 1, b: 2 }, { b: 2 }),
            isMatchWith: timeFunction(require('lodash/isMatchWith'), { 'greeting': 'hello' }, { 'greeting': 'hi' }, customizerGreeting),
            isNaN: timeFunction(require('lodash/isNaN'), NaN),
            isNative: timeFunction(require('lodash/isNative'), Array.prototype.push),
            isNil: timeFunction(require('lodash/isNil'), null),
            isNull: timeFunction(require('lodash/isNull'), null),
            isNumber: timeFunction(require('lodash/isNumber'), '3'),
            isObject: timeFunction(require('lodash/isObject'), '{}'),
            isObjectLike: timeFunction(require('lodash/isObjectLike'), [1, 2, 3]),
            isPlainObject: timeFunction(require('lodash/isPlainObject'), request),
            isRegExp: timeFunction(require('lodash/isRegExp'), /abc/),
            isSafeInteger: timeFunction(require('lodash/isSafeInteger'), 3),
            isSet: timeFunction(require('lodash/isSet'), new HashSet()),
            isString: timeFunction(require('lodash/isString'), 'abc'),
            isUndefined: timeFunction(require('lodash/isUndefined'), undefined),
            iteratee: timeFunction(require('lodash/filter'), [
                { 'user': 'barney', 'age': 36, 'active': true },
                { 'user': 'fred', 'age': 40, 'active': false }
            ], require('lodash/iteratee')({ 'user': 'barney', 'active': true })),
            join: timeFunction(require('lodash/join'), [1, 2, 3], '~'),
            kebabCase: timeFunction(require('lodash/kebabCase'), 'fooBar'),
            keyBy: timeFunction(require('lodash/keyBy'), [{ dir: 'left', code: 97 }, { dir: 'right', code: 100 }], function ({ code }) { return String.fromCharCode(code); }),
            keys: timeFunction(require('lodash/keys'), { a: 1, b: 2 }),
            keysIn: timeFunction(require('lodash/keysIn'), new Foo()),
            last: timeFunction(require('lodash/last'), ['test1', 'test2']),
            lastIndexOf: timeFunction(require('lodash/lastIndexOf'), [1, 2, 1, 2], 2),
            lowerCase: timeFunction(require('lodash/lowerCase'), '--Foo-Bar--'),
            lowerFirst: timeFunction(require('lodash/lowerFirst'), 'Fred'),
            lt: timeFunction(require('lodash/lt'), 2, 3),
            lte: timeFunction(require('lodash/lte'), 3, 3),
            map: timeFunction(require('lodash/map'), [4, 8], function square(n) { return n * n; }),
            mapKey: timeFunction(require('lodash/mapKey'), { a: 1, b: 2 }, function (value, key) { return key + value; }),
            mapKeys: timeFunction(require('lodash/mapKeys'), { a: 1, b: 2 }, function (value, key) { return key + value; }),
            mapObject: timeFunction(require('lodash/mapObject'), { a: 4, b: 8 }, function square(n) {
                return n * n;
            }),
            mapValue: timeFunction(require('lodash/mapValue'), {
                fred: { user: 'fred', age: 40 },
                pebbles: { user: 'pebbles', age: 1 }
            }, function ({ age }) { return age; }),
            mapValues: timeFunction(require('lodash/mapValues'), {
                fred: { user: 'fred', age: 40 },
                pebbles: { user: 'pebbles', age: 1 }
            }, function ({ age }) { return age; }),
            matches: timeFunction(require('lodash/filter'), [
                { a: 1, b: 2, c: 3 },
                { a: 4, b: 5, c: 6 }
            ], require('lodash/matches')({ a: 4, c: 6 })),
            matchesProperty: timeFunction(require('lodash/find'), [
                { 'a': 1, 'b': 2, 'c': 3 },
                { 'a': 4, 'b': 5, 'c': 6 }
            ], require('lodash/matchesProperty')('a', 4)),
            max: timeFunction(require('lodash/max'), [4, 2, 8, 6]),
            maxBy: timeFunction(require('lodash/maxBy'), [{ n: 1 }, { n: 2 }], function ({ n }) { return n; }),
            mean: timeFunction(require('lodash/mean'), [4, 2, 8, 6]),
            memoize: memoizeValues(object),
            merge: timeFunction(require('lodash/merge'), { 'a': [{ 'b': 2 }, { 'd': 4 }] }, { 'a': [{ 'c': 3 }, { 'e': 5 }] }),
            mergeWith: timeFunction(require('lodash/mergeWith'), { 'a': [1], 'b': [2] }, { 'a': [3], 'b': [4] }, mergeCustomizer),
            method: timeFunction(require('lodash/map'), [
                { 'a': { 'b': require('lodash/constant')(2) } },
                { 'a': { 'b': require('lodash/constant')(1) } }
            ], require('lodash/method')('a.b')),
            methodOf: timeFunction(require('lodash/map'), ['a[2]', 'c[0]'], require('lodash/methodOf')(objectMethodOf)),
            min: timeFunction(require('lodash/min'), [4, 2, 8, 6]),
            minBy: timeFunction(require('lodash/minBy'), [{ 'n': 1 }, { 'n': 2 }], function ({ n }) { return n; }),
            meanBy: timeFunction(require('lodash/meanBy'), [{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], function ({ n }) { return n; }),
            multiply: timeFunction(require('lodash/multiply'), 6, 4),
            negate: timeFunction(require('lodash/filter'), [1, 2, 3, 4, 5, 6], require('lodash/negate')(function (n) { return n % 2 == 0; })),
            noop: timeFunction(times, 2, require('lodash/noop')),
            now: timeFunction(require('lodash/now')),
            nth: timeFunction(require('lodash/nth'), ['a', 'b', 'c', 'd'], -1),
            nthArg: timeFunction(require('lodash/nthArg')(-1), 'a', 'b', 'c', 'd'),
            omit: timeFunction(require('lodash/omit'), { 'a': 1, 'b': '2', 'c': 3 }, ['a', 'c']),
            omitBy: timeFunction(require('lodash/omitBy'), { 'a': 1, 'b': '2', 'c': 3 }, require('lodash/isNumber')),
            once: onlyOnceCount,
            orderBy: require('lodash/orderBy')([
                { user: 'fred', age: 48 },
                { user: 'barney', age: 34 },
                { user: 'fred', age: 40 },
                { user: 'barney', age: 36 }
            ], ['user', 'age'], ['asc', 'desc']),
            over: require('lodash/over')([Math.max, Math.min])(1, 2, 3, 4),
            overArg: timeFunction(overArgsFunc, 9, 3),
            overEvery: timeFunction(require('lodash/overEvery')([Boolean, isFinite]), '1'),
            overSome: timeFunction(require('lodash/overSome')([Boolean, isFinite]), null),
            pad: timeFunction(require('lodash/pad'), 'abc', 8),
            padEnd: timeFunction(require('lodash/padEnd'), 'abc', 8),
            padStart: timeFunction(require('lodash/padStart'), 'abc', 8),
            parseInt: timeFunction(require('lodash/parseInt'), '08'),
            partial: timeFunction(sayHelloTo, 'fred'),
            partialRight: timeFunction(greetFred, 'hi'),
            partition: timeFunction(require('lodash/partition'), [
                { user: 'barney', age: 36, active: false },
                { user: 'fred', age: 40, active: true },
                { user: 'pebbles', age: 1, active: false }
            ], function ({ active }) { return active; }),
            pick: timeFunction(require('lodash/pick'), { a: 1, b: '2', c: 3 }, ['a', 'c']),
            pickBy: timeFunction(require('lodash/pickBy'), { a: 1, b: '2', c: '3' }, require('lodash/isNumber')),
            property: timeFunction(require('lodash/map'), [
                { a: { b: 2 } },
                { a: { b: 1 } }
            ], require('lodash/property')('a.b')),
            prototype: timeFunction(require('lodash/map'), [
                { 'a': { 'b': 2 } },
                { 'a': { 'b': 1 } }
            ], require('lodash/property')('a.b')),
            propertyOf: timeFunction(require('lodash/map'), [['a', '2'], ['c', '0']],
                require('lodash/propertyOf')({ 'a': [0, 1, 2], 'b': [0, 1, 2], 'c': [0, 1, 2] })),
            pull: timeFunction(require('lodash/pull'), ['a', 'b', 'c', 'a', 'b', 'c'], 'a', 'c'),
            pullAll: timeFunction(require('lodash/pullAll'), ['a', 'b', 'c', 'a', 'b', 'c'], ['a', 'c']),
            pullAllBy: timeFunction(require('lodash/pullAllBy'), [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }], [{ 'x': 1 }, { 'x': 3 }],
                'x'),
            pullAllWith: timeFunction(require('lodash/pullAllWith'), [{ 'x': 1, 'y': 2 }, { 'x': 3, 'y': 4 }, { 'x': 5, 'y': 6 }], [{ 'x': 3, 'y': 4 }], isEqual),
            pullAt: timeFunction(require('lodash/pullAt'), ['a', 'b', 'c', 'd'], [1, 3]),
            random: timeFunction(require('lodash/random'), 0, 5),
            range: timeFunction(require('lodash/range'), 4),
            rangeRight: timeFunction(require('lodash/rangeRight'), 4),
            rearg: timeFunction(rearged, 'b', 'c', 'a'),
            reduce: timeFunction(require('lodash/reduce'), { a: 1, b: 2, c: 1 }, function (result, value, key) {
                (result[value] || (result[value] = [])).push(key);
                return result;
            }, {}),
            reduceRight: timeFunction(require('lodash/reduceRight'), [[0, 1], [2, 3], [4, 5]], function (flattened, other) {
                return flattened.concat(other);
            }, []),
            reject: timeFunction(require('lodash/reject'), [
                { user: 'barney', active: true },
                { user: 'fred', active: false }
            ], function ({ active }) { return active; }),
            remove: timeFunction(require('lodash/remove'), [1, 2, 3, 4], function (n) { return n % 2 === 0; }),
            repeat: timeFunction(require('lodash/repeat'), 'abc', 2),
            replace: timeFunction(require('lodash/replace'), 'Hi Fred', 'Fred', 'Barney'),
            rest: timeFunction(say, 'hello', 'fred', 'barney', 'pebbles'),
            result: timeFunction(require('lodash/result'), { a: [{ b: { c1: 3, c2: function () { return 4; } } }] }, 'a[0].b.c1'),
            reverse: timeFunction(require('lodash/reverse'), [1, 2, 3]),
            round: timeFunction(require('lodash/round'), 4.006, 2),
            sample: timeFunction(require('lodash/sample'), [1, 2, 3, 4]),
            sampleSize: timeFunction(require('lodash/sampleSize'), [1, 2, 3], 4),
            set: timeFunction(require('lodash/set'), { a: [{ b: { c: 3 } }] }, 'a[0].b.c', 4),
            setWith: timeFunction(require('lodash/setWith'), {}, '[0][1]', 'a', Object),
            shuffle: timeFunction(require('lodash/shuffle'), [1, 2, 3, 4]),
            size: timeFunction(require('lodash/size'), 'pebbles'),
            slice: timeFunction(require('lodash/slice'), [1, 2, 3, 4], 2),
            snakeCase: timeFunction(require('lodash/snakeCase'), '--FOO-BAR--'),
            some: timeFunction(require('lodash/some'), [null, 0, 'yes', false], Boolean),
            someValues: timeFunction(require('lodash/someValues'), { 'a': 0, 'b': 'yes', 'c': false }, Boolean),
            sortBy: timeFunction(require('lodash/sortBy'), [
                { 'user': 'fred', 'age': 48 },
                { 'user': 'barney', 'age': 36 },
                { 'user': 'fred', 'age': 40 },
                { 'user': 'barney', 'age': 34 }
            ], [function (o) { return o.user; }]),
            sortedIndex: timeFunction(require('lodash/sortedIndex'), [30, 50], 40),
            sortedIndexBy: timeFunction(require('lodash/sortedIndexBy'), [{ 'x': 4 }, { 'x': 5 }], { 'x': 4 }, function (o) { return o.x; }),
            sortedIndexOf: timeFunction(require('lodash/sortedIndexOf'), [4, 5, 5, 5, 6], 5),
            sortedLastIndexBy: timeFunction(require('lodash/sortedLastIndexBy'), [{ 'x': 4 }, { 'x': 5 }], { 'x': 4 }, 'x'),
            sortedLastIndexOf: timeFunction(require('lodash/sortedLastIndexOf'), [4, 5, 5, 5, 6], 5),
            sortedUniq: timeFunction(require('lodash/sortedUniq'), [1, 1, 2]),
            sortedUniqBy: timeFunction(require('lodash/sortedUniqBy'), [1.1, 1.2, 2.3, 2.4], Math.floor),
            split: timeFunction(require('lodash/split'), 'a-b-c', '-', 2),
            spread: timeFunction(spreadSay, ['fred', 'hello']),
            startCase: timeFunction(require('lodash/startCase'), 'fooBar'),
            startsWith: timeFunction(require('lodash/startsWith'), 'abc', 'a'),
            subtract: timeFunction(require('lodash/subtract'), 6, 4),
            sum: timeFunction(require('lodash/sum'), [4, 2, 8, 6]),
            sumBy: timeFunction(require('lodash/sumBy'), [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }], 'n'),
            tail: timeFunction(require('lodash/tail'), [1, 2, 3]),
            take: timeFunction(require('lodash/take'), [1, 2, 3], 2),
            takeRight: timeFunction(require('lodash/takeRight'), [1, 2, 3], 2),
            takeRightWhile: timeFunction(require('lodash/takeRightWhile'), [
                { user: 'barney', active: false },
                { user: 'fred', active: true },
                { user: 'pebbles', active: true }
            ], function ({ active }) { return active; }),
            takeWhile: timeFunction(require('lodash/takeWhile'), [
                { 'user': 'barney', 'active': false },
                { 'user': 'fred', 'active': false },
                { 'user': 'pebbles', 'active': true }
            ], ['active', false]),
            template: require('lodash/template')('hello <%= user %>!')({ 'user': 'fred' }),
            times: timeFunction(require('lodash/times'), 3, String),
            toArray: timeFunction(require('lodash/toArray'), { a: 1, b: 2 }),
            toFinite: timeFunction(require('lodash/toFinite'), '3.2'),
            toInteger: timeFunction(require('lodash/toInteger'), '3.2'),
            toLength: timeFunction(require('lodash/toLength'), '3.2'),
            toLower: timeFunction(require('lodash/toLower'), '--Foo-Bar--'),
            toNumber: timeFunction(require('lodash/toNumber'), '3.2'),
            toPairs: timeFunction(require('lodash/toPairs'), new Foo),
            toPairsIn: timeFunction(require('lodash/toPairsIn'), new Foo),
            toPath: timeFunction(require('lodash/toPath'), 'a[0].b.c'),
            toPlainObject: timeFunction(require('lodash/assign'), { 'c': 1 }, require('lodash/toPlainObject')(new Foo)),
            toSafeInteger: timeFunction(require('lodash/toSafeInteger'), '3.2'),
            toString: timeFunction(require('lodash/toString'), [1, 2, 3]),
            toUpper: timeFunction(require('lodash/toUpper'), 'fooBar'),
            transform: timeFunction(require('lodash/transform'), [2, 3, 4], function (result, n) {
                result.push(n *= n);
                return n % 2 == 0;
            }, []),
            trim: timeFunction(require('lodash/trim'), '  abc  '),
            trimEnd: timeFunction(require('lodash/trimEnd'), '  abc  '),
            trimStart: timeFunction(require('lodash/trimStart'), '  abc  '),
            truncate: timeFunction(require('lodash/truncate'), 'hi-diddly-ho there, neighborino', {
                length: 24,
                separator: ' '
            }),
            unary: timeFunction(require('lodash/map'), ['6', '8', '10'], require('lodash/unary')(parseInt)),
            unescape: timeFunction(require('lodash/unescape'), 'fred, barney, &amp; pebbles'),
            union: timeFunction(require('lodash/union'), [2, 3], [1, 2]),
            unionBy: timeFunction(require('lodash/unionBy'), [2.1], [1.2, 2.3], Math.floor),
            unionWith: timeFunction(require('lodash/unionWith'), [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }], [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }], isEqual),
            uniq: timeFunction(require('lodash/uniq'), [2, 1, 2]),
            uniqBy: timeFunction(require('lodash/uniqBy'), [2.1, 1.2, 2.3], Math.floor),
            uniqueId: timeFunction(require('lodash/uniqueId'), 'contact_'),
            uniqWith: timeFunction(require('lodash/uniqWith'), [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 2 }], isEqual),
            unset: timeFunction(require('lodash/unset'), { a: [{ b: { c: 7 } }] }, ['a', '0', 'b', 'c']),
            unzip: timeFunction(require('lodash/unzip'), [['a', 1, true], ['b', 2, false]]),
            unzipWith: timeFunction(require('lodash/unzipWith'), zipped, require('lodash/add')),
            update: timeFunction(require('lodash/update'), { a: [{ b: { c: 3 } }] }, 'a[0].b.c', function (n) { return n ? n * n : 0; }),
            updateWith: timeFunction(require('lodash/updateWith'), {}, '[0][1]', function () { return 'a'; }, Object),
            upperCase: timeFunction(require('lodash/upperCase'), '--foo-bar'),
            upperFirst: timeFunction(require('lodash/upperFirst'), 'fred'),
            values: timeFunction(require('lodash/values'), new Foo()),
            valuesIn: timeFunction(require('lodash/valuesIn'), new Foo()),
            without: timeFunction(require('lodash/without'), [2, 1, 2, 3], 1, 2),
            words: timeFunction(require('lodash/words'), 'fred, barney, & pebbles'),
            wrap: timeFunction(p, 'fred, barney, & pebbles'),
            xor: timeFunction(require('lodash/xor'), [2, 1], [2, 3]),
            xorBy: timeFunction(require('lodash/xorBy'), [2.1, 1.2], [2.3, 3.4], Math.floor),
            xorWith: timeFunction(require('lodash/xorWith'), [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }], [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }], isEqual),
            zip: timeFunction(require('lodash/zip'), ['a', 'b'], [1, 2], [true, false]),
            zipObject: timeFunction(require('lodash/zipObject'), ['a', 'b'], [1, 2]),
            zipObjectDeep: timeFunction(require('lodash/zipObjectDeep'), ['a.b[0].c', 'a.b[1].d'], [1, 2]),
            zipWith: timeFunction(require('lodash/zipWith'), [1, 2], [10, 20], [100, 200], function(a, b, c) { return a + b + c; })
        });

    next();
});

module.exports = server.exports();
