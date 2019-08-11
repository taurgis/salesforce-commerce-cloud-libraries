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

    //= > false

    res.json(
        {
            add: add(4)(6),
            adjust: adjust(-1, toUpper, ['a', 'b', 'c', 'd']),
            all: all(equals(3))([3, 3, 3, 3, 1]),
            allPass: isQueenOfSpades({ rank: 'Q', suit: '♠︎' })
        });

    next();
});

module.exports = server.exports();
