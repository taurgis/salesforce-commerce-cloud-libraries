'use strict';

var server = require('server');

/** Just an example controlle to test moment functions */
server.get('Test', function (req, res, next) {
    var Chance = require('chance/chance');
    var chance = new Chance();
    res.json(
        {
            bool: require('chance/bool')({ likelihood: 30 }),
            falsy: require('chance/falsy')(),
            integer: require('chance/integer')(),
            natural: require('chance/natural')(),
            character: require('chance/character')({ casing: 'upper' }),
            float: require('chance/floating')(),
            letter: require('chance/letter')(),
            prime: require('chance/prime')({ min: 1, max: 20 }),
            string: require('chance/string')({ pool: 'abcde' }),
            word: chance.word({ syllables: 3 }),
            name: chance.name(),
            birthday: chance.birthday({ type: 'child' }),
            gender: chance.gender(),
            animal: chance.animal({ type: 'zoo' }),
            weekday: chance.weekday(),
            rpg: chance.rpg('3d10'),
            guid: chance.guid()
        });

    next();
});

module.exports = server.exports();
