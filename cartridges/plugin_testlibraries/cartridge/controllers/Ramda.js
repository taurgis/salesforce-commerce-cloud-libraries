/* eslint-disable */
'use strict';

var server = require('server');

/** Just an example controlle to test moment functions */
server.get('Test', function (req, res, next) {
    var add = require('ramda/add');
    var adjust = require('ramda/adjust');
    var toUpper = require('ramda/toUpper');
    var all = require('ramda/all');
    var equals = require('ramda/equals');

    var R = require('ramda/index');
    const isQueen = R.propEq('rank', 'Q');
    const isSpade = R.propEq('suit', '♠︎');
    const isQueenOfSpades = R.allPass([isQueen, isSpade]);
    const lessThan2 = R.flip(R.lt)(2);
    const nums = [1, 2, 3, -99, 42, 6, 7];

    const byAge = R.ascend(R.prop('age'));
    const people = [
        { name: 'Emma', age: 70 },
        { name: 'Peter', age: 78 },
        { name: 'Mikhail', age: 62 }
    ];
    const duplicate = function (n) { return [n, n]; };
    const isNotNil = R.complement(R.isNil);

    const classyGreeting = function (firstName, lastName) { return "The name's " + lastName + ', ' + firstName + ' ' + lastName; };
    const yellGreeting = R.compose(R.toUpper, classyGreeting);

    const fn = R.cond([
        [R.equals(0), R.always('water freezes at 0°C')],
        [R.equals(100), R.always('water boils at 100°C')],
        [R.T, function (temp) { return 'nothing special happens at ' + temp + '°C'; }]
    ]);

    /**
     * An animal
     * @param {*} kind - The kind
     */
    function Animal(kind) {
        this.kind = kind;
    }
    Animal.prototype.sighting = function () {
        return "It's a " + this.kind + '!';
    };

    const animalConstructor = R.construct(Animal);

    // Notice we no longer need the 'new' keyword:
    animalConstructor('Pig'); //= > {"kind": "Pig", "sighting": function (){...}};

    const animalTypes = ['Lion', 'Tiger', 'Bear'];
    const animalSighting = R.invoker(0, 'sighting');
    const sightNewAnimal = R.compose(animalSighting, animalConstructor);

    const o1 = { a: 1, b: 2, c: 3, d: 4 };
    const o2 = { a: 10, b: 20, c: 3, d: 40 };

    const tomato = { firstName: '  Tomato ', data: { elapsed: 100, remaining: 1400 }, id: 123 };
    const transformations = {
        firstName: R.trim,
        lastName: R.trim, // Will not get invoked.
        data: { elapsed: R.add(1), remaining: R.add(-1) }
    };

    const xs = [{ a: 1 }, { a: 2 }, { a: 3 }];
    const byGrade = R.groupBy(function (student) {
        const score = student.score;
        return score < 65 ? 'F' :
            score < 70 ? 'D' :
                score < 80 ? 'C' :
                    score < 90 ? 'B' : 'A';
    });
    const students = [{ name: 'Abby', score: 84 },
    { name: 'Eddy', score: 85 },
    // ...
    { name: 'Jack', score: 69 }];

    const incCount = R.ifElse(
        R.has('count'),
        R.over(R.lensProp('count'), R.inc),
        R.assoc('count', 1)
    );

    const double = function (x) { return x * 2 };


    const headLens = R.lensIndex(0);

    const abby = {name: 'Abby', age: 7, hair: 'blond', grade: 2};
      const fred = {name: 'Fred', age: 12, hair: 'brown', grade: 7};
         const kids = [abby, fred];
         const isOdd = function(n) { return n % 2 === 1};

         const xLens = R.lensProp('x');

    res.json(
        {
            add: add(4)(6),
            adjust: adjust(-1, toUpper, ['a', 'b', 'c', 'd']),
            all: all(equals(3))([3, 3, 3, 3, 1]),
            allPass: isQueenOfSpades({ rank: 'Q', suit: '♠︎' }),
            always: R.always('Tee')(),
            and: R.and(true, true),
            any: R.any(lessThan2)([1, 2]),
            ap: R.ap([R.multiply(2), R.add(3)], [1, 2, 3]),
            aperture: R.aperture(2, [1, 2, 3, 4, 5]),
            append: R.append('tests', ['write', 'more']),
            apply: R.apply(Math.max, nums),
            ascend: R.sort(byAge, people),
            assoc: R.assoc('c', 3, { a: 1, b: 2 }),
            both: R.both([false, false, 'a'], [11]),
            chain: R.chain(duplicate, [1, 2, 3]),
            clamp: R.clamp(1, 10, -5),
            complement: isNotNil(null),
            compose: yellGreeting('James', 'Bond'),
            concat: R.concat([4, 5, 6], [1, 2, 3]),
            cond: fn(0),
            construct: R.map(sightNewAnimal, animalTypes),
            contains: R.contains(3, [1, 2, 3]),
            countBy: R.countBy(Math.floor)([1.0, 1.1, 1.2, 2.0, 3.0, 2.2]),
            defaultTo: R.defaultTo(42)(null),
            disscoPath: R.dissocPath(['a', 'b', 'c'], { a: { b: { c: 42 } } }),
            divide: R.divide(71, 100),
            drop: R.drop(1, ['foo', 'bar', 'baz']),
            either: R.either([false, false, 'a'], [11]),
            empty: R.empty([1, 2, 3]),
            endsWith: R.endsWith(['c'], ['a', 'b', 'c']),
            eqProps: R.eqProps('c', o1, o2),
            evolve: R.evolve(transformations, tomato),
            findIndexBy: R.findIndex(R.propEq('a', 2))(xs),
            findLast: R.findLast(R.propEq('a', 1))([{ a: 1, b: 0 }, { a: 1, b: 1 }]),
            flatten: R.flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]]),
            fromPairs: R.fromPairs([['a', 1], ['b', 2], ['c', 3]]),
            groupBy: byGrade(students),
            gte: R.gte(2, 1),
            hasPath: R.hasPath(['a', 'b'], { a: { c: 2 } }),
            identical: R.identical(1, '1'),
            ifElse: incCount({}),
            includes: R.includes(3, [1, 2, 3]),
            indexOf: R.indexOf(3, [1, 2, 3, 4]),
            insertAll: R.insertAll(2, ['x', 'y', 'z'], [1, 2, 3, 4]),
            intersperse: R.intersperse('a', ['b', 'n', 'n', 's']),
            invert: R.invert(raceResultsByFirstName = {
                first: 'alice',
                second: 'jake',
                third: 'alice',
            }),
            isEmpty: R.isEmpty([]),
            keys: R.keys({ a: 1, b: 2, c: 3 }),
            lens: R.view(R.lens(R.prop('x'), R.assoc('x')), { x: 1, y: 2 }),
            map: R.map(double, [1, 2, 3]),
            max: R.max(789, 123),
            mean: R.mean([2, 7, 9]),
            medium: R.median([2, 9, 7]),
            merge: R.merge({ 'name': 'fred', 'age': 10 }, { 'age': 40 }),
            mergeDeepLeft: R.mergeDeepLeft({ name: 'fred', age: 10, contact: { email: 'moo@example.com' } },
                { age: 40, contact: { email: 'baa@example.com' } }),
            modulo: R.modulo(-17, 3),
            nth: R.nth(1, ['foo', 'bar', 'baz', 'quux']),
            of: R.of([42]),
            omit: R.omit(['a', 'd'], { a: 1, b: 2, c: 3, d: 4 }),
            //otherwise: recoverFromFailure(12345).then(console.log),
            over: R.over(headLens, R.toUpper, ['foo', 'bar', 'baz']),
            pair: R.pair('foo', 'bar'),
            path: R.path(['a', 'b'], {a: {b: 2}}),
            paths: R.paths([['a', 'b'], ['p', 0, 'q']], {a: {b: 2}, p: [{q: 3}]}),
            pick:  R.pick(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}),
            pipe: R.pipe(Math.pow, R.negate, R.inc)(3,4),
            pluck:  R.pluck(1, [[1, 2], [3, 4]]),
            product: R.product([2,4,6,8,100,1]),
            project:   R.project(['name', 'grade'], kids),
            range: R.range(1, 5),
            reduce:  R.reduce(R.subtract, 0, [1, 2, 3, 4]),
            reject:  R.reject(isOdd, [1, 2, 3, 4]),
            remove: R.remove(2, 3, [1,2,3,4,5,6,7,8]),
            reverse:  R.reverse([1, 2, 3]),
            set: R.set(xLens, 4, {x: 1, y: 2}),
            slice: R.slice(1, 3, ['a', 'b', 'c', 'd']),
            split: R.split('.', 'a.b.c.xyz.d'),
            startsWith: R.startsWith('a', 'abc'),
            symmetricDifference: R.symmetricDifference([1,2,3,4], [7,6,5,4,3]),
            tail:  R.tail([1, 2, 3]),
            take: R.take(1, ['foo', 'bar', 'baz']),
            test: R.test(/^x/, 'xyz'),
            thunkify: R.thunkify(R.identity)(42)(),
            toLower:  R.toLower('XYZ'),
            toPairs: R.toPairs({a: 1, b: 2, c: 3}),
            transpose: R.transpose([[1, 'a'], [2, 'b'], [3, 'c']]),
            trim: R.trim('   xyz  '),
            tryCatch: R.tryCatch(R.prop('x'), R.F)({x: true}),
            type: R.type([]),
            unapply:  R.unapply(JSON.stringify)(1, 2, 3),
            union: R.union([1, 2, 3], [2, 3, 4])
        });

    next();
});

module.exports = server.exports();
