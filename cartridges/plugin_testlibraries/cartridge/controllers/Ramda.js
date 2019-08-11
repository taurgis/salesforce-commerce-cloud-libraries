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
            findIndexBy: R.findIndex(R.propEq('a', 2))(xs)
        });

    next();
});

module.exports = server.exports();
