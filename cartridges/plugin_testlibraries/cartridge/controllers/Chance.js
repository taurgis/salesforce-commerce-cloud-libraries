'use strict';

var server = require('server');

/** Just an example controlle to test moment functions */
server.get('Test', function (req, res, next) {
    var Chance = require('chance/chance');
    var chance = new Chance();
    res.json(
        {
            string: chance.string(),
            bool: chance.bool({ likelihood: 30 }),
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