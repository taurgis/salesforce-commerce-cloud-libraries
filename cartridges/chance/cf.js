'use strict';

var gender = require('./gender');
var first = require('./first');
var birthday = require('./birthday');
var pickOne = require('./lib/pickOne');
var pad = require('./lib/pad');
var last = require('./last');
var natural = require('./natural');


var nameGenerator = function (name, isLast) {
    var temp;
    var returnValue = [];

    if (name.length < 3) {
        returnValue = name.split('').concat('XXX'.split('')).splice(0, 3);
    } else {
        temp = name.toUpperCase().split('').map(function (c) {
            return ('BCDFGHJKLMNPRSTVWZ'.indexOf(c) !== -1) ? c : undefined;
        }).join('');
        if (temp.length > 3) {
            if (isLast) {
                temp = temp.substr(0, 3);
            } else {
                temp = temp[0] + temp.substr(2, 2);
            }
        }
        if (temp.length < 3) {
            returnValue = temp;
            temp = name.toUpperCase().split('').map(function (c) {
                return ('AEIOU'.indexOf(c) !== -1) ? c : undefined;
            }).join('')
                .substr(0, 3 - returnValue.length);
        }
        returnValue += temp;
    }

    return returnValue;
};

var dateGenerator = function (birthdayForDate, genderForDate, that) {
    var lettermonths = ['A', 'B', 'C', 'D', 'E', 'H', 'L', 'M', 'P', 'R', 'S', 'T'];

    return birthdayForDate.getFullYear().toString().substr(2) +
                lettermonths[birthdayForDate.getMonth()] +
                that.pad(birthdayForDate.getDate() + ((genderForDate.toLowerCase() === 'female') ? 40 : 0), 2);
};

var checkDigitGenerator = function (cf) {
    var range1 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var range2 = 'ABCDEFGHIJABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var evens = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var odds = 'BAKPLCQDREVOSFTGUHMINJWZYX';
    var digit = 0;


    for (var i = 0; i < 15; i++) {
        if (i % 2 !== 0) {
            digit += evens.indexOf(range2[range1.indexOf(cf[i])]);
        } else {
            digit += odds.indexOf(range2[range1.indexOf(cf[i])]);
        }
    }
    return evens[digit % 26];
};

/**
 * Return a random Italian social security number (Codice Fiscale) value.
 *
 * @param {Object} options - Possible options for cf
 * @returns {string} - A random cf value
 *
 * @example
 *      cf({first: 'Sergio', last: 'Leone'}); => 'LNESRG93P28F067V'
 */
module.exports = function codeFiscale(options) {
    var cfOptions = options || {};
    var genderOption = cfOptions.gender ? cfOptions.gender : gender();
    var firstOption = cfOptions.first ? cfOptions.first : first({ gender: genderOption, nationality: 'it' });
    var lastOption = cfOptions.last ? cfOptions.last : last({ nationality: 'it' });
    var birthdayOption = cfOptions.birthday ? cfOptions.birthday : birthday();
    var city = cfOptions.city ? cfOptions.city : pickOne(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'L', 'M', 'Z']) + pad(natural({ max: 999 }), 3);
    var cf = [];


    cf = cf.concat(nameGenerator(lastOption, true), nameGenerator(firstOption), dateGenerator(birthdayOption, genderOption, this), city.toUpperCase().split('')).join('');
    cf += checkDigitGenerator(cf.toUpperCase(), this);

    return cf.toUpperCase();
};
