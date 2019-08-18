'use strict';

var server = require('server');
var timeFunction = require('../scripts/util/timeFunction');


/** Just an example controlle to test moment functions */
server.get('Test', function (req, res, next) {
    res.json(
        {
            bool: timeFunction(require('chance/bool'), { likelihood: 30 }),
            falsy: timeFunction(require('chance/falsy')),
            integer: timeFunction(require('chance/integer')),
            natural: timeFunction(require('chance/natural')),
            character: timeFunction(require('chance/character'), { casing: 'upper' }),
            float: timeFunction(require('chance/floating')),
            letter: timeFunction(require('chance/letter')),
            prime: timeFunction(require('chance/prime'), { min: 1, max: 20 }),
            string: timeFunction(require('chance/string'), { pool: 'abcde' }),
            // paragraph: require('chance/paragraph') --> this one really slows down the page load
            age: timeFunction(require('chance/age')),
            birthday: timeFunction(require('chance/birthday'), { type: 'child', string: true }),
            cf: timeFunction(require('chance/cf')),
            first: timeFunction(require('chance/first')),
            last: timeFunction(require('chance/last')),
            cpf: timeFunction(require('chance/cpf')),
            gender: timeFunction(require('chance/gender')),
            prefix: timeFunction(require('chance/prefix')),
            suffix: timeFunction(require('chance/suffix')),
            name: timeFunction(require('chance/name'), { prefix: true, suffix: true, middle: true }),
            ssn: timeFunction(require('chance/ssn')),
            animal: timeFunction(require('chance/animal')),
            androidId: timeFunction(require('chance/androidId')),
            appleToken: timeFunction(require('chance/appleToken')),
            bbpin: timeFunction(require('chance/bbPin')),
            hash: timeFunction(require('chance/hash')),
            wp7ANID: timeFunction(require('chance/wp7ANID')),
            wp8ANID2: timeFunction(require('chance/wp8ANID2')),
            avatar: timeFunction(require('chance/avatar')),
            email: timeFunction(require('chance/email')),
            color: timeFunction(require('chance/color')),
            company: timeFunction(require('chance/company')),
            fbid: timeFunction(require('chance/fbid')),
            ga: timeFunction(require('chance/googleAnalytics')),
            hashtag: timeFunction(require('chance/hashtag')),
            ip: timeFunction(require('chance/ip')),
            ipv6: timeFunction(require('chance/ipv6')),
            klout: timeFunction(require('chance/klout')),
            profession: timeFunction(require('chance/profession')),
            twitter: timeFunction(require('chance/twitter')),
            url: timeFunction(require('chance/url')),
            address: timeFunction(require('chance/address')),
            altitude: timeFunction(require('chance/altitude'), { fixed: 7 }),
            areaCode: timeFunction(require('chance/areacode'))
        });

    next();
});

module.exports = server.exports();
