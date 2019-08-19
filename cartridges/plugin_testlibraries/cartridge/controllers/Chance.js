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
            areaCode: timeFunction(require('chance/areacode')),
            city: timeFunction(require('chance/city')),
            coordinates: timeFunction(require('chance/coordinates')),
            country: timeFunction(require('chance/country'), { full: true }),
            depth: timeFunction(require('chance/depth'), { min: -1000 }),
            geohash: timeFunction(require('chance/geohash')),
            locale: timeFunction(require('chance/locale'), { region: true }),
            phone: timeFunction(require('chance/phone')),
            postal: timeFunction(require('chance/postal')),
            postcode: timeFunction(require('chance/postcode')),
            province: timeFunction(require('chance/province'), { country: 'it', full: true }),
            state: timeFunction(require('chance/state')),
            zip: timeFunction(require('chance/zip')),
            ampm: timeFunction(require('chance/ampm')),
            date: timeFunction(require('chance/date')),
            hammertime: timeFunction(require('chance/hammertime')),
            timestamp: timeFunction(require('chance/timestamp')),
            timezone: timeFunction(require('chance/timezone')),
            weekday: timeFunction(require('chance/weekday')),
            cc: timeFunction(require('chance/cc'), { type: 'Mastercard' }),
            currency: timeFunction(require('chance/currency')),
            currencypair: timeFunction(require('chance/currency_pair')),
            dollar: timeFunction(require('chance/dollar')),
            euro: timeFunction(require('chance/euro')),
            coin: timeFunction(require('chance/coin')),
            dice: timeFunction(require('chance/dice')),
            normal: timeFunction(require('chance/normal'), { mean: 100, dev: 15 }),
            radio: timeFunction(require('chance/radio')),
            rpg: timeFunction(require('chance/rpg'), '5d6')
        });

    next();
});

module.exports = server.exports();
