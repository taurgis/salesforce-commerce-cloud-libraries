/* eslint-disable */
'use strict';

var server = require('server');

/** Just an example controlle to test moment functions */
server.get('Test', function (req, res, next) {
    var _ = require('lodash/lodash');
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
            trim: _.trim('     test     '),
            add: require('lodash/add')(2, 2),
            after: afterTest,
            at: require('lodash/at')(atTestObject, ['a[0].b.c', 'a[1]']),
            attempt: require('lodash/attempt')(attemptTest),
            camelCase: require('lodash/camelCase')('__FOO_BAR__TEST'),
            capitalize: require('lodash/capitalize')('fRED'),
            castArray: require('lodash/castArray')('abc'),
            ceil: require('lodash/ceil')(6.004, 2),
            chunk: require('lodash/chunk')(['a', 'b', 'c', 'd'], 2),
            calmp: require('lodash/clamp')(10, -5, 5),
            compact: require('lodash/compact')([0, 1, false, 2, '', 3]),
            cond: conditionalFunct({ a: '1', b: '2' }),
            countBy: require('lodash/countBy')([
                { user: 'barney', active: true },
                { user: 'betty', active: true },
                { user: 'fred', active: false }
            ], 'active'),
            deburr: require('lodash/deburr')('téstêrûÜ'),
            defaultTo: require('lodash/defaultTo')(null, 2),
            defaultToAny: require('lodash/defaultToAny')(undefined, [null, undefined, 20, 40]),
            defaults: require('lodash/defaults')({ a: 1 }, [{ b: 2 }, { a: 3 }]),
            difference: require('lodash/difference')([2, 1], [2, 3]),
            differenceBy: require('lodash/differenceBy')([2.1, 1.2], [[2.3, 3.4], Math.floor]),
            divide: require('lodash/divide')(6, 3),
            last: require('lodash/last')(['test1', 'test2']),
            drop: require('lodash/drop')([1, 2, 3], 2),
            dropRight: require('lodash/dropRight')([1, 2, 3], 2),
            dropRightWhile: require('lodash/dropRightWhile')([
                { user: 'barney', active: false },
                { user: 'fred', active: true },
                { user: 'pebbles', active: true }
            ], function ({ active }) { return active; }),
            dropWhile: require('lodash/dropWhile')([
                { user: 'barney', active: true },
                { user: 'fred', active: true },
                { user: 'pebbles', active: false }
            ], function ({ active }) { return active; }),
            forEach: forEachTest,
            endsWith: require('lodash/endsWith')('abc', 'b'),
            eq: require('lodash/eq')('a', Object('a')),
            // eqDeep: require('lodash/eqDeep')({ a: 1 }, { a: 1 }),
            escape: require('lodash/escape')('fred, barney, & pebbles'),
            escapeRegex: require('lodash/escapeRegExp')('[lodash](https://lodash.com/)'),
            every: require('lodash/every')([true, 1, null, 'yes'], Boolean),
            everyValue: require('lodash/everyValue')({ a: 0, b: 'yes', c: false }, Boolean),
            filter: require('lodash/filter')([{ user: 'barney', active: true },
                { user: 'fred', active: false }], function (value) { return value.active; }),
            filterObject: require('lodash/filterObject')({ a: 5, b: 8, c: 10 }, function (n) { return !(n % 5); }),
            findKey: require('lodash/findKey')({
                barney: { age: 36, active: true },
                fred: { age: 40, active: false },
                pebbles: { age: 1, active: true }
            }, function ({ age }) { return age < 40; }),
            findLast: require('lodash/findLast')([1, 2, 3, 4], function (n) { return n % 2 === 1; }),
            findLastKey: require('lodash/findLastKey')({
                barney: { age: 36, active: true },
                fred: { age: 40, active: false },
                pebbles: { age: 1, active: true }
            }, function ({ age }) { return age < 40; }),
            first: require('lodash/first')([1, 2, 3]),
            flatMap: require('lodash/flatMap')([1, 2], function duplicate(n) {
                return [n, n];
            }),
            flatMapDepth: require('lodash/flatMapDepth')([1, 2], function duplicate(n) {
                return [[[n, n]]];
            }, 2),
            flatten: require('lodash/flatten')([1, [2, [3, [4]], 5]]),
            flattenDeep: require('lodash/flattenDeep')([1, [2, [3, [4]], 5]]),
            floor: require('lodash/floor')(4060, -2),
            fromEntries: require('lodash/fromEntries')([['a', 1], ['b', 2]]),
            groupBy: require('lodash/groupBy')([6.1, 4.2, 6.3], Math.floor),
            gt: require('lodash/gt')(1, 3),
            gte: require('lodash/gte')(3, 3),
            has: require('lodash/has')({ a: { b: 2 } }, 'a'),
            hasPath: require('lodash/hasPath')({ a: { b: 2 } }, 'a.c'),
            hasPathIn: require('lodash/hasPathIn')({ a: { c: 2 } }, 'a.b'),
            head: require('lodash/head')([1, 2, 3]),
            indexOf: require('lodash/indexOf')([1, 2, 1, 2], 2, 2),
            initial: require('lodash/initial')([1, 2, 3]),
            inRange: require('lodash/inRange')(-3, -2, -6),
            intersection: require('lodash/intersection')([2, 1], [2, 3]),
            intersectionBy: require('lodash/intersectionBy')([2.1, 1.2], [2.3, 3.4], Math.floor),
            invert: require('lodash/invert')({ a: 1, b: 2, c: 1 }),
            invertBy: require('lodash/invertBy')({ a: 1, b: 2, c: 1 }, function (value) { return 'group' + value; }),
            invoke: require('lodash/invoke')({ a: [{ b: { c: [1, 2, 3, 4] } }] }, 'a[0].b.c.slice', [1, 3]),
            invokeMap: require('lodash/invokeMap')([[5, 1, 7], [3, 2, 1]], 'sort'),
            isArguments: require('lodash/isArguments')(function () { return arguments; }()),
            isArrayLike: require('lodash/isArrayLike')([1, 2, 3]),
            isArrayLikeObject: require('lodash/isArrayLikeObject')([1, 2, 3]),
            isBoolean: require('lodash/isBoolean')(null),
            isBuffer: require('lodash/isBuffer')('test'),
            isDate: require('lodash/isDate')('test'),
            isEmpty: require('lodash/isEmpty')([1, 2, 3]),
            isEqualWith: require('lodash/isEqualWith')(array, other, customizer),
            isError: require('lodash/isError')(new Error()),
            isFunction: require('lodash/isFunction')(CustomerMgr.getCustomerByLogin),
            isLength: require('lodash/isLength')(3),
            isMatch: require('lodash/isMatch')({ a: 1, b: 2 }, { b: 2 }),
            isNative: require('lodash/isNative')(Array.prototype.push),
            isNil: require('lodash/isNil')(null),
            isNull: require('lodash/isNull')(null),
            isNumber: require('lodash/isNumber')('3'),
            isObject: require('lodash/isObject')('{}'),
            isObjectLike: require('lodash/isObjectLike')([1, 2, 3]),
            isPlainObject: require('lodash/isPlainObject')(request),
            // isRegExp: require('lodash/isRegExp')(/abc/),
            isString: require('lodash/isString')('abc'),
            isUndefined: require('lodash/isUndefined')(undefined),
            kebabCase: require('lodash/kebabCase')('fooBar'),
            keyBy: require('lodash/keyBy')([{ dir: 'left', code: 97 }, { dir: 'right', code: 100 }], function ({ code }) { return String.fromCharCode(code); }),
            keys: require('lodash/keys')({ a: 1, b: 2 }),
            lastIndexOf: require('lodash/lastIndexOf')([1, 2, 1, 2], 2),
            lowerCase: require('lodash/lowerCase')('--Foo-Bar--'),
            lowerFirst: require('lodash/lowerFirst')('Fred'),
            lt: require('lodash/lt')(2, 3),
            lte: require('lodash/lte')(3, 3),
            map: require('lodash/map')([4, 8], function square(n) { return n * n; }),
            mapKey: require('lodash/mapKey')({ a: 1, b: 2 }, function (value, key) { return key + value; }),
            mapObject: require('lodash/mapObject')({ a: 4, b: 8 }, function square(n) {
                return n * n;
            }),
            mapValue: require('lodash/mapValue')({
                fred: { user: 'fred', age: 40 },
                pebbles: { user: 'pebbles', age: 1 }
            }, function ({ age }) { return age; }),
            matches: require('lodash/filter')([
                { a: 1, b: 2, c: 3 },
                { a: 4, b: 5, c: 6 }
            ], require('lodash/matches')({ a: 4, c: 6 })),
            maxBy: require('lodash/maxBy')([{ n: 1 }, { n: 2 }], function ({ n }) { return n; }),
            mean: require('lodash/mean')([4, 2, 8, 6]),
            meanBy: require('lodash/meanBy')([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], function ({ n }) { return n; }),
            // merge: require('lodash/merge')({ a: [{ b: 2 }, { d: 4 }] }, { a: [{ c: 3 }, { e: 5 }] })
            minBy: require('lodash/minBy')([{ n: 1 }, { n: 2 }], function ({ n }) { return n; }),
            multiply: require('lodash/multiply')(6, 4),
            negate: require('lodash/filter')([1, 2, 3, 4, 5, 6], require('lodash/negate')(function (n) { return n % 2 == 0; })),
            nth: require('lodash/nth')(['a', 'b', 'c', 'd'], -1),
            /* orderBy: require('lodash/orderBy')([
                { user: 'fred', age: 48 },
                { user: 'barney', age: 34 },
                { user: 'fred', age: 40 },
                { user: 'barney', age: 36 }
            ], ['user', 'age'], ['asc', 'desc']) */
            over: require('lodash/over')([Math.max, Math.min])(1, 2, 3, 4),
            overEvery: require('lodash/overEvery')([Boolean, isFinite])(null),
            overSome: require('lodash/overSome')([Boolean, isFinite])(null),
            pad: require('lodash/pad')('abc', 8),
            padEnd: require('lodash/padEnd')('abc', 8),
            padStart: require('lodash/padStart')('abc', 8),
            parseInt: require('lodash/parseInt')('08'),
            partition: require('lodash/partition')([
                { user: 'barney', age: 36, active: false },
                { user: 'fred', age: 40, active: true },
                { user: 'pebbles', age: 1, active: false }
            ], function ({ active }) { return active; }),
            pick: require('lodash/pick')({ a: 1, b: '2', c: 3 }, ['a', 'c']),
            pickBy: require('lodash/pickBy')({ a: 1, b: '2', c: '3' }, require('lodash/isNumber')),
            property: require('lodash/map')([
                { a: { b: 2 } },
                { a: { b: 1 } }
            ], require('lodash/property')('a.b')),
            pull: require('lodash/pull')(['a', 'b', 'c', 'a', 'b', 'c'], 'a', 'c'),
            pullAll: require('lodash/pullAll')(['a', 'b', 'c', 'a', 'b', 'c'], ['a', 'c']),
            pullAt: require('lodash/pullAt')(['a', 'b', 'c', 'd'], [1, 3]),
            random: require('lodash/random')(5),
            range: require('lodash/range')(4),
            rangeRight: require('lodash/rangeRight')(4),
            reduce: require('lodash/reduce')({ a: 1, b: 2, c: 1 }, function (result, value, key) {
                (result[value] || (result[value] = [])).push(key);
                return result;
            }, {}),
            reject: require('lodash/reject')([
                { user: 'barney', active: true },
                { user: 'fred', active: false }
            ], function ({ active }) { return active; }),
            remove: require('lodash/remove')([1, 2, 3, 4], function (n) { return n % 2 === 0; }),
            repeat: require('lodash/repeat')('abc', 2),
            replace: require('lodash/replace')('Hi Fred', 'Fred', 'Barney'),
            result: require('lodash/result')({ a: [{ b: { c1: 3, c2: function () { return 4; } } }] }, 'a[0].b.c1'),
            round: require('lodash/round')(4.006, 2),
            sample: require('lodash/sample')([1, 2, 3, 4]),
            sampleSize: require('lodash/sampleSize')([1, 2, 3], 4),
            set: require('lodash/set')({ a: [{ b: { c: 3 } }] }, 'a[0].b.c', 4),
            setWith: require('lodash/setWith')({}, '[0][1]', 'a', Object),
            shuffle: require('lodash/shuffle')([1, 2, 3, 4]),
            size: require('lodash/size')('pebbles'),
            slice: require('lodash/slice')([1, 2, 3, 4], 2),
            snakeCase: require('lodash/snakeCase')('--FOO-BAR--'),
            some: require('lodash/some')([null, 0, 'yes', false], Boolean),
            sortedIndex: require('lodash/sortedIndex')([30, 50], 40),
            sortedIndexOf: require('lodash/sortedIndexOf')([4, 5, 5, 5, 6], 5),
            sortedLastIndexOf: require('lodash/sortedLastIndexOf')([4, 5, 5, 5, 6], 5),
            sortedUniq: require('lodash/sortedUniq')([1, 1, 2]),
            sortedUniqBy: require('lodash/sortedUniqBy')([1.1, 1.2, 2.3, 2.4], Math.floor),
            split: require('lodash/split')('a-b-c', '-', 2),
            startCase: require('lodash/startCase')('fooBar'),
            startsWith: require('lodash/startsWith')('abc', 'a'),
            subtract: require('lodash/subtract')(6, 4),
            sum: require('lodash/sum')([4, 2, 8, 6]),
            tail: require('lodash/tail')([1, 2, 3]),
            take: require('lodash/take')([1, 2, 3], 2),
            takeRight: require('lodash/takeRight')([1, 2, 3], 2),
            takeRightWhile: require('lodash/takeRightWhile')([
                { user: 'barney', active: false },
                { user: 'fred', active: true },
                { user: 'pebbles', active: true }
            ], function ({ active }) { return active; }),
            times: require('lodash/times')(3, String),
            toArray: require('lodash/toArray')({ a: 1, b: 2 }),
            toFinite: require('lodash/toFinite')('3.2'),
            toInteger: require('lodash/toInteger')('3.2'),
            toLength: require('lodash/toLength')('3.2'),
            toNumber: require('lodash/toNumber')('3.2'),
            toPath: require('lodash/toPath')('a[0].b.c'),
            toSafeInteger: require('lodash/toSafeInteger')('3.2'),
            toString: require('lodash/toString')([1, 2, 3]),
            transform: require('lodash/transform')([2, 3, 4], function (result, n) {
                result.push(n *= n);
                return n % 2 == 0;
            }, []),
            trim2: require('lodash/trim')('  abc  '),
            trimEnd: require('lodash/trimEnd')('  abc  '),
            trimStart: require('lodash/trimStart')('  abc  '),
            truncate: require('lodash/truncate')('hi-diddly-ho there, neighborino', {
                length: 24,
                separator: ' '
            }),
            unescape: require('lodash/unescape')('fred, barney, &amp; pebbles'),
            union: require('lodash/union')([2, 3], [1, 2]),
            unionBy: require('lodash/unionBy')([2.1], [1.2, 2.3], Math.floor),
            uniq: require('lodash/uniq')([2, 1, 2]),
            uniqueId: require('lodash/uniqueId')('contact_'),
            unset: require('lodash/unset')({ a: [{ b: { c: 7 } }] }, ['a', '0', 'b', 'c']),
            unzip: require('lodash/unzip')([['a', 1, true], ['b', 2, false]]),
            update: require('lodash/update')({ a: [{ b: { c: 3 } }] }, 'a[0].b.c', function (n) { return n ? n * n : 0; }),
            upperCase: require('lodash/upperCase')('--foo-bar'),
            upperFirst: require('lodash/upperFirst')('fred'),
            // values: require('lodash/values')('hi'),
            without: require('lodash/without')([2, 1, 2, 3], 1, 2),
            words: require('lodash/words')('fred, barney, & pebbles'),
            xor: require('lodash/xor')([2, 1], [2, 3]),
            xorBy: require('lodash/xorBy')([2.1, 1.2], [2.3, 3.4], Math.floor),
            zip: require('lodash/zip')(['a', 'b'], [1, 2], [true, false]),
            zipObject: require('lodash/zipObject')(['a', 'b'], [1, 2]),
            zipObjectDeep: require('lodash/zipObjectDeep')(['a.b[0].c', 'a.b[1].d'], [1, 2]),
            get: require('lodash/get')({ 'a': [{ 'b': { 'c': 3 } }] }, 'a[0].b.c')
        });

    next();
});

module.exports = server.exports();
