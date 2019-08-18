'use strict';

var server = require('server');

/**
 * Time library functions
 * @param {Object} functionToCall - The functions to time
 * @param {[Object]} parameters - The functions parameters
 * @returns {Object} - The executed functions with their time to execute
 */
function timeLibraryFunctions(functionToCall, parameters) {
    var startTime = new Date();
    var executed = functionToCall.call(parameters);
    var endTime = new Date();

    return {
        result: executed,
        timeToExecute: (endTime - startTime) + 'ms'
    };
}

/** Just an example controlle to test moment functions */
server.get('Test', function (req, res, next) {
    res.json(
        {
            bool: timeLibraryFunctions(require('chance/bool'), { likelihood: 30 }),
            falsy: timeLibraryFunctions(require('chance/falsy')),
            integer: timeLibraryFunctions(require('chance/integer')),
            natural: timeLibraryFunctions(require('chance/natural')),
            character: timeLibraryFunctions(require('chance/character'), { casing: 'upper' }),
            float: timeLibraryFunctions(require('chance/floating')),
            letter: timeLibraryFunctions(require('chance/letter')),
            prime: timeLibraryFunctions(require('chance/prime'), { min: 1, max: 20 }),
            string: timeLibraryFunctions(require('chance/string'), { pool: 'abcde' }),
            // paragraph: require('chance/paragraph') --> this one really slows down the page load
            age: timeLibraryFunctions(require('chance/age')),
            birthday: timeLibraryFunctions(require('chance/birthday'), { type: 'child', string: true }),
            cf: timeLibraryFunctions(require('chance/cf')),
            first: timeLibraryFunctions(require('chance/first')),
            last: timeLibraryFunctions(require('chance/last')),
            cpf: timeLibraryFunctions(require('chance/cpf')),
            gender: timeLibraryFunctions(require('chance/gender')),
            prefix: timeLibraryFunctions(require('chance/prefix')),
            suffix: timeLibraryFunctions(require('chance/suffix')),
            name: timeLibraryFunctions(require('chance/name'), { prefix: true, suffix: true, middle: true }),
            ssn: timeLibraryFunctions(require('chance/ssn')),
            animal: timeLibraryFunctions(require('chance/animal')),
            androidId: timeLibraryFunctions(require('chance/androidId')),
            appleToken: timeLibraryFunctions(require('chance/appleToken')),
            bbpin: timeLibraryFunctions(require('chance/bbPin')),
            hash: timeLibraryFunctions(require('chance/hash')),
            wp7ANID: timeLibraryFunctions(require('chance/wp7ANID')),
            wp8ANID2: timeLibraryFunctions(require('chance/wp8ANID2')),
            avatar: timeLibraryFunctions(require('chance/avatar')),
            email: timeLibraryFunctions(require('chance/email')),
            color: timeLibraryFunctions(require('chance/color')),
            company: timeLibraryFunctions(require('chance/company')),
            fbid: timeLibraryFunctions(require('chance/fbid')),
            ga: timeLibraryFunctions(require('chance/googleAnalytics')),
            hashtag: timeLibraryFunctions(require('chance/hashtag')),
            ip: timeLibraryFunctions(require('chance/ip')),
            ipv6: timeLibraryFunctions(require('chance/ipv6')),
            klout: timeLibraryFunctions(require('chance/klout')),
            profession: timeLibraryFunctions(require('chance/profession')),
            twitter: timeLibraryFunctions(require('chance/twitter')),
            url: timeLibraryFunctions(require('chance/url'))
        });

    next();
});

module.exports = server.exports();
