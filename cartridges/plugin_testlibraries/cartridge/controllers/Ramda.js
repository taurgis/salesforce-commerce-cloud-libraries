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
            cond: fn(0)
        });

    next();
});

module.exports = server.exports();
