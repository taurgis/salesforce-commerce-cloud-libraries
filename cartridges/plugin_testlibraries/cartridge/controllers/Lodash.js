/* eslint-disable */
'use strict';

var server = require('server');
var timeFunction = require('../scripts/util/timeFunction');
/** Just an example controlle to test moment functions */
server.get('Test', function (req, res, next) {
    var afterTest = '';

    var afterTestFunction = require('lodash/after')(2, function () {
        afterTest = 'after is finished';
    });

    var atTestObject = { a: [{ b: { c: 3 } }, 4] };
    var attemptTest = function () {
        throw new Error();
    };

    afterTestFunction();
    afterTestFunction();

    var conditionalFunct = require('lodash/cond')([
        [function () { return true; }, function () { return 'no match'; }]
    ]);

    var forEachTest = [];

    require('lodash/forEach')([1, 2], function (value) { forEachTest.push(value); });
    require('lodash/forEachRight')([1, 2], function (value) { forEachTest.push(value); });

    function isGreeting(value) {
        return /^h(?:i|ello)$/.test(value);
    }

    function customizer(objValue, othValue) {
        if (isGreeting(objValue) && isGreeting(othValue)) {
            return true;
        }
    }

    var CustomerMgr = require('dw/customer/CustomerMgr');

    const array = ['hello', 'goodbye'];
    const other = ['hi', 'goodbye'];

    res.json(
        {
            add: timeFunction(require('lodash/add'), 2, 2),
            after: afterTest,
            at: timeFunction(require('lodash/at'), atTestObject, ['a[0].b.c', 'a[1]']),
            attempt: timeFunction(require('lodash/attempt'), attemptTest),
            camelCase: timeFunction(require('lodash/camelCase'), '__FOO_BAR__TEST'),
            capitalize: timeFunction(require('lodash/capitalize'), 'fRED'),
            castArray: timeFunction(require('lodash/castArray'), 'abc'),
            ceil: timeFunction(require('lodash/ceil'), 6.004, 2),
            chunk: timeFunction(require('lodash/chunk'), ['a', 'b', 'c', 'd'], 2),
            calmp: timeFunction(require('lodash/clamp'), 10, -5, 5),
            compact: timeFunction(require('lodash/compact'), [0, 1, false, 2, '', 3]),
            cond: conditionalFunct({ a: '1', b: '2' }),
            countBy: timeFunction(require('lodash/countBy'), [
                { user: 'barney', active: true },
                { user: 'betty', active: true },
                { user: 'fred', active: false }
            ], 'active'),
            deburr: timeFunction(require('lodash/deburr'), 'téstêrûÜ'),
            defaultTo: timeFunction(require('lodash/defaultTo'), null, 2),
            defaultToAny: timeFunction(require('lodash/defaultToAny'), undefined, [null, undefined, 20, 40]),
            defaults: timeFunction(require('lodash/defaults'), { a: 1 }, [{ b: 2 }, { a: 3 }]),
            difference: timeFunction(require('lodash/difference'), [2, 1], [2, 3]),
            differenceBy: timeFunction(require('lodash/differenceBy'), [2.1, 1.2], [[2.3, 3.4], Math.floor]),
            divide: timeFunction(require('lodash/divide'), 6, 3),
            last: timeFunction(require('lodash/last'), ['test1', 'test2']),
            drop: timeFunction(require('lodash/drop'), [1, 2, 3], 2),
            dropRight: timeFunction(require('lodash/dropRight'), [1, 2, 3], 2),
            dropRightWhile: timeFunction(require('lodash/dropRightWhile'), [
                { user: 'barney', active: false },
                { user: 'fred', active: true },
                { user: 'pebbles', active: true }
            ], function ({ active }) { return active; }),
            dropWhile: timeFunction(require('lodash/dropWhile'), [
                { user: 'barney', active: true },
                { user: 'fred', active: true },
                { user: 'pebbles', active: false }
            ], function ({ active }) { return active; }),
            forEach: forEachTest,
            endsWith: timeFunction(require('lodash/endsWith'), 'abc', 'b'),
            eq: timeFunction(require('lodash/eq'), 'a', Object('a')),
            // eqDeep: require('lodash/eqDeep')({ a: 1 }, { a: 1 }),
            escape: timeFunction(require('lodash/escape'), 'fred, barney, & pebbles'),
            escapeRegex: timeFunction(require('lodash/escapeRegExp'), '[lodash](https://lodash.com/)'),
            every: timeFunction(require('lodash/every'), [true, 1, null, 'yes'], Boolean),
            everyValue: timeFunction(require('lodash/everyValue'), { a: 0, b: 'yes', c: false }, Boolean),
            filter: timeFunction(require('lodash/filter'), [{ user: 'barney', active: true },
            { user: 'fred', active: false }], function (value) { return value.active; }),
            filterObject: timeFunction(require('lodash/filterObject'), { a: 5, b: 8, c: 10 }, function (n) { return !(n % 5); }),
            findKey: timeFunction(require('lodash/findKey'), {
                barney: { age: 36, active: true },
                fred: { age: 40, active: false },
                pebbles: { age: 1, active: true }
            }, function ({ age }) { return age < 40; }),
            findLast: timeFunction(require('lodash/findLast'), [1, 2, 3, 4], function (n) { return n % 2 === 1; }),
            findLastKey: timeFunction(require('lodash/findLastKey'), {
                barney: { age: 36, active: true },
                fred: { age: 40, active: false },
                pebbles: { age: 1, active: true }
            }, function ({ age }) { return age < 40; }),
            first: timeFunction(require('lodash/first'), [1, 2, 3]),
            flatMap: timeFunction(require('lodash/flatMap'), [1, 2], function duplicate(n) {
                return [n, n];
            }),
            flatMapDepth: timeFunction(require('lodash/flatMapDepth'), [1, 2], function duplicate(n) {
                return [[[n, n]]];
            }, 2),
            flatten: timeFunction(require('lodash/flatten'), [1, [2, [3, [4]], 5]]),
            flattenDeep: timeFunction(require('lodash/flattenDeep'), [1, [2, [3, [4]], 5]]),
            floor: timeFunction(require('lodash/floor'), 4060, -2),
            fromEntries: timeFunction(require('lodash/fromEntries'), [['a', 1], ['b', 2]]),
            groupBy: timeFunction(require('lodash/groupBy'), [6.1, 4.2, 6.3], Math.floor),
            gt: timeFunction(require('lodash/gt'), 1, 3),
            gte: timeFunction(require('lodash/gte'), 3, 3),
            has: timeFunction(require('lodash/has'), { a: { b: 2 } }, 'a'),
            hasPath: timeFunction(require('lodash/hasPath'), { a: { b: 2 } }, 'a.c'),
            hasPathIn: timeFunction(require('lodash/hasPathIn'), { a: { c: 2 } }, 'a.b'),
            head: timeFunction(require('lodash/head'), [1, 2, 3]),
            indexOf: timeFunction(require('lodash/indexOf'), [1, 2, 1, 2], 2, 2),
            initial: timeFunction(require('lodash/initial'), [1, 2, 3]),
            inRange: timeFunction(require('lodash/inRange'), -3, -2, -6),
            intersection: timeFunction(require('lodash/intersection'), [2, 1], [2, 3]),
            intersectionBy: timeFunction(require('lodash/intersectionBy'), [2.1, 1.2], [2.3, 3.4], Math.floor),
            invert: timeFunction(require('lodash/invert'), { a: 1, b: 2, c: 1 }),
            invertBy: timeFunction(require('lodash/invertBy'), { a: 1, b: 2, c: 1 }, function (value) { return 'group' + value; }),
            invoke: timeFunction(require('lodash/invoke'), { a: [{ b: { c: [1, 2, 3, 4] } }] }, 'a[0].b.c.slice', [1, 3]),
            invokeMap: timeFunction(require('lodash/invokeMap'), [[5, 1, 7], [3, 2, 1]], 'sort'),
            isArguments: timeFunction(require('lodash/isArguments'), function () { return arguments; }()),
            isArrayLike: timeFunction(require('lodash/isArrayLike'), [1, 2, 3]),
            isArrayLikeObject: timeFunction(require('lodash/isArrayLikeObject'), [1, 2, 3]),
            isBoolean: timeFunction(require('lodash/isBoolean'), null),
            isBuffer: timeFunction(require('lodash/isBuffer'), 'test'),
            isDate: timeFunction(require('lodash/isDate'), 'test'),
            isEmpty: timeFunction(require('lodash/isEmpty'), [1, 2, 3]),
            isEqualWith: timeFunction(require('lodash/isEqualWith'), array, other, customizer),
            isError: timeFunction(require('lodash/isError'), new Error()),
            isFunction: timeFunction(require('lodash/isFunction'), CustomerMgr.getCustomerByLogin),
            isLength: timeFunction(require('lodash/isLength'), 3),
            isMatch: timeFunction(require('lodash/isMatch'), { a: 1, b: 2 }, { b: 2 }),
            isNative: timeFunction(require('lodash/isNative'), Array.prototype.push),
            isNil: timeFunction(require('lodash/isNil'), null),
            isNull: timeFunction(require('lodash/isNull'), null),
            isNumber: timeFunction(require('lodash/isNumber'), '3'),
            isObject: timeFunction(require('lodash/isObject'), '{}'),
            isObjectLike: timeFunction(require('lodash/isObjectLike'), [1, 2, 3]),
            isPlainObject: timeFunction(require('lodash/isPlainObject'), request),
            // isRegExp: require('lodash/isRegExp')(/abc/),
            isString: timeFunction(require('lodash/isString'), 'abc'),
            isUndefined: timeFunction(require('lodash/isUndefined'), undefined),
            kebabCase: timeFunction(require('lodash/kebabCase'), 'fooBar'),
            keyBy: timeFunction(require('lodash/keyBy'), [{ dir: 'left', code: 97 }, { dir: 'right', code: 100 }], function ({ code }) { return String.fromCharCode(code); }),
            keys: timeFunction(require('lodash/keys'), { a: 1, b: 2 }),
            lastIndexOf: timeFunction(require('lodash/lastIndexOf'), [1, 2, 1, 2], 2),
            lowerCase: timeFunction(require('lodash/lowerCase'), '--Foo-Bar--'),
            lowerFirst: timeFunction(require('lodash/lowerFirst'), 'Fred'),
            lt: timeFunction(require('lodash/lt'), 2, 3),
            lte: timeFunction(require('lodash/lte'), 3, 3),
            map: timeFunction(require('lodash/map'), [4, 8], function square(n) { return n * n; }),
            mapKey: timeFunction(require('lodash/mapKey'), { a: 1, b: 2 }, function (value, key) { return key + value; }),
            mapObject: timeFunction(require('lodash/mapObject'), { a: 4, b: 8 }, function square(n) {
                return n * n;
            }),
            mapValue: timeFunction(require('lodash/mapValue'), {
                fred: { user: 'fred', age: 40 },
                pebbles: { user: 'pebbles', age: 1 }
            }, function ({ age }) { return age; }),
            matches: timeFunction(require('lodash/filter'), [
                { a: 1, b: 2, c: 3 },
                { a: 4, b: 5, c: 6 }
            ], require('lodash/matches')({ a: 4, c: 6 })),
            maxBy: timeFunction(require('lodash/maxBy'), [{ n: 1 }, { n: 2 }], function ({ n }) { return n; }),
            mean: timeFunction(require('lodash/mean'), [4, 2, 8, 6]),
            meanBy: timeFunction(require('lodash/meanBy'), [{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], function ({ n }) { return n; }),
            // merge: require('lodash/merge')({ a: [{ b: 2 }, { d: 4 }] }, { a: [{ c: 3 }, { e: 5 }] })
            minBy: timeFunction(require('lodash/minBy'), [{ n: 1 }, { n: 2 }], function ({ n }) { return n; }),
            multiply: timeFunction(require('lodash/multiply'), 6, 4),
            negate: timeFunction(require('lodash/filter'), [1, 2, 3, 4, 5, 6], require('lodash/negate')(function (n) { return n % 2 == 0; })),
            nth: timeFunction(require('lodash/nth'), ['a', 'b', 'c', 'd'], -1),
            /* orderBy: require('lodash/orderBy')([
                { user: 'fred', age: 48 },
                { user: 'barney', age: 34 },
                { user: 'fred', age: 40 },
                { user: 'barney', age: 36 }
            ], ['user', 'age'], ['asc', 'desc']) */
            over: require('lodash/over')([Math.max, Math.min])(1, 2, 3, 4),
            overEvery: require('lodash/overEvery')([Boolean, isFinite])(null),
            overSome: require('lodash/overSome')([Boolean, isFinite])(null),
            pad: timeFunction(require('lodash/pad'), 'abc', 8),
            padEnd: timeFunction(require('lodash/padEnd'), 'abc', 8),
            padStart: timeFunction(require('lodash/padStart'), 'abc', 8),
            parseInt: timeFunction(require('lodash/parseInt'), '08'),
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
            pull: timeFunction(require('lodash/pull'), ['a', 'b', 'c', 'a', 'b', 'c'], 'a', 'c'),
            pullAll: timeFunction(require('lodash/pullAll'), ['a', 'b', 'c', 'a', 'b', 'c'], ['a', 'c']),
            pullAt: timeFunction(require('lodash/pullAt'), ['a', 'b', 'c', 'd'], [1, 3]),
            random: timeFunction(require('lodash/random'), 5),
            range: timeFunction(require('lodash/range'), 4),
            rangeRight: timeFunction(require('lodash/rangeRight'), 4),
            reduce: timeFunction(require('lodash/reduce'), { a: 1, b: 2, c: 1 }, function (result, value, key) {
                (result[value] || (result[value] = [])).push(key);
                return result;
            }, {}),
            reject: timeFunction(require('lodash/reject'), [
                { user: 'barney', active: true },
                { user: 'fred', active: false }
            ], function ({ active }) { return active; }),
            remove: timeFunction(require('lodash/remove'), [1, 2, 3, 4], function (n) { return n % 2 === 0; }),
            repeat: timeFunction(require('lodash/repeat'), 'abc', 2),
            replace: timeFunction(require('lodash/replace'), 'Hi Fred', 'Fred', 'Barney'),
            result: timeFunction(require('lodash/result'), { a: [{ b: { c1: 3, c2: function () { return 4; } } }] }, 'a[0].b.c1'),
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
            sortedIndex: timeFunction(require('lodash/sortedIndex'), [30, 50], 40),
            sortedIndexOf: timeFunction(require('lodash/sortedIndexOf'), [4, 5, 5, 5, 6], 5),
            sortedLastIndexOf: timeFunction(require('lodash/sortedLastIndexOf'), [4, 5, 5, 5, 6], 5),
            sortedUniq: timeFunction(require('lodash/sortedUniq'), [1, 1, 2]),
            sortedUniqBy: timeFunction(require('lodash/sortedUniqBy'), [1.1, 1.2, 2.3, 2.4], Math.floor),
            split: timeFunction(require('lodash/split'), 'a-b-c', '-', 2),
            startCase: timeFunction(require('lodash/startCase'), 'fooBar'),
            startsWith: timeFunction(require('lodash/startsWith'), 'abc', 'a'),
            subtract: timeFunction(require('lodash/subtract'), 6, 4),
            sum: timeFunction(require('lodash/sum'), [4, 2, 8, 6]),
            tail: timeFunction(require('lodash/tail'), [1, 2, 3]),
            take: timeFunction(require('lodash/take'), [1, 2, 3], 2),
            takeRight: timeFunction(require('lodash/takeRight'), [1, 2, 3], 2),
            takeRightWhile: timeFunction(require('lodash/takeRightWhile'), [
                { user: 'barney', active: false },
                { user: 'fred', active: true },
                { user: 'pebbles', active: true }
            ], function ({ active }) { return active; }),
            times: timeFunction(require('lodash/times'), 3, String),
            toArray: timeFunction(require('lodash/toArray'), { a: 1, b: 2 }),
            toFinite: timeFunction(require('lodash/toFinite'), '3.2'),
            toInteger: timeFunction(require('lodash/toInteger'), '3.2'),
            toLength: timeFunction(require('lodash/toLength'), '3.2'),
            toNumber: timeFunction(require('lodash/toNumber'), '3.2'),
            toPath: timeFunction(require('lodash/toPath'), 'a[0].b.c'),
            toSafeInteger: timeFunction(require('lodash/toSafeInteger'), '3.2'),
            toString: timeFunction(require('lodash/toString'), [1, 2, 3]),
            transform: timeFunction(require('lodash/transform'), [2, 3, 4], function (result, n) {
                result.push(n *= n);
                return n % 2 == 0;
            }, []),
            trim2: timeFunction(require('lodash/trim'), '  abc  '),
            trimEnd: timeFunction(require('lodash/trimEnd'), '  abc  '),
            trimStart: timeFunction(require('lodash/trimStart'), '  abc  '),
            truncate: timeFunction(require('lodash/truncate'), 'hi-diddly-ho there, neighborino', {
                length: 24,
                separator: ' '
            }),
            unescape: timeFunction(require('lodash/unescape'), 'fred, barney, &amp; pebbles'),
            union: timeFunction(require('lodash/union'), [2, 3], [1, 2]),
            unionBy: timeFunction(require('lodash/unionBy'), [2.1], [1.2, 2.3], Math.floor),
            uniq: timeFunction(require('lodash/uniq'), [2, 1, 2]),
            uniqueId: timeFunction(require('lodash/uniqueId'), 'contact_'),
            unset: timeFunction(require('lodash/unset'), { a: [{ b: { c: 7 } }] }, ['a', '0', 'b', 'c']),
            unzip: timeFunction(require('lodash/unzip'), [['a', 1, true], ['b', 2, false]]),
            update: timeFunction(require('lodash/update'), { a: [{ b: { c: 3 } }] }, 'a[0].b.c', function (n) { return n ? n * n : 0; }),
            upperCase: timeFunction(require('lodash/upperCase'), '--foo-bar'),
            upperFirst: timeFunction(require('lodash/upperFirst'), 'fred'),
            // values: require('lodash/values')('hi'),
            without: timeFunction(require('lodash/without'), [2, 1, 2, 3], 1, 2),
            words: timeFunction(require('lodash/words'), 'fred, barney, & pebbles'),
            xor: timeFunction(require('lodash/xor'), [2, 1], [2, 3]),
            xorBy: timeFunction(require('lodash/xorBy'), [2.1, 1.2], [2.3, 3.4], Math.floor),
            zip: timeFunction(require('lodash/zip'), ['a', 'b'], [1, 2], [true, false]),
            zipObject: timeFunction(require('lodash/zipObject'), ['a', 'b'], [1, 2]),
            zipObjectDeep: timeFunction(require('lodash/zipObjectDeep'), ['a.b[0].c', 'a.b[1].d'], [1, 2]),
            get: timeFunction(require('lodash/get'), { 'a': [{ 'b': { 'c': 3 } }] }, 'a[0].b.c')
        });

    next();
});

module.exports = server.exports();
