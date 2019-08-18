'use strict';

var initOptions = require('./lib/initOptions');
var pick = require('./lib/pickOne');
var character = require('./character');
var natural = require('./natural');
var areacode = require('./areacode');

/**
 * Return a random phone value.
 *
 * @param {Object} options - Possible options for phone
 * @returns {string} - A random phone value
 *
 * @example
 *      phone({ country: 'fr' }); => '01 60 44 92 67'
 */
module.exports = function (options) {
    var numPick;
    var ukNum = function (parts) {
        var section = [];
        // fills the section part of the phone number with random numbers.
        parts.sections.forEach(function (n) {
            section.push(self.string({ pool: '0123456789', length: n }));
        });
        return parts.area + section.join(' ');
    };
    var phoneOptions = initOptions(options, {
        formatted: true,
        country: 'us',
        mobile: false
    });
    if (!phoneOptions.formatted) {
        phoneOptions.parens = false;
    }
    var phone;
    switch (phoneOptions.country) {
        case 'fr':
            if (!phoneOptions.mobile) {
                numPick = pick([
                    // Valid zone and département codes.
                    '01' + pick(['30', '34', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '53', '55', '56', '58', '60', '64', '69', '70', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83']) + self.string({ pool: '0123456789', length: 6 }),
                    '02' + pick(['14', '18', '22', '23', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '40', '41', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '56', '57', '61', '62', '69', '72', '76', '77', '78', '85', '90', '96', '97', '98', '99']) + self.string({ pool: '0123456789', length: 6 }),
                    '03' + pick(['10', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '39', '44', '45', '51', '52', '54', '55', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90']) + self.string({ pool: '0123456789', length: 6 }),
                    '04' + pick(['11', '13', '15', '20', '22', '26', '27', '30', '32', '34', '37', '42', '43', '44', '50', '56', '57', '63', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '88', '89', '90', '91', '92', '93', '94', '95', '97', '98']) + self.string({ pool: '0123456789', length: 6 }),
                    '05' + pick(['08', '16', '17', '19', '24', '31', '32', '33', '34', '35', '40', '45', '46', '47', '49', '53', '55', '56', '57', '58', '59', '61', '62', '63', '64', '65', '67', '79', '81', '82', '86', '87', '90', '94']) + self.string({ pool: '0123456789', length: 6 }),
                    '09' + self.string({ pool: '0123456789', length: 8 })
                ]);
                phone = phoneOptions.formatted ? numPick.match(/../g).join(' ') : numPick;
            } else {
                numPick = pick(['06', '07']) + self.string({ pool: '0123456789', length: 8 });
                phone = phoneOptions.formatted ? numPick.match(/../g).join(' ') : numPick;
            }
            break;
        case 'uk':
            if (!phoneOptions.mobile) {
                numPick = pick([
                    // valid area codes of major cities/counties followed by random numbers in required format.

                    { area: '01' + character({ pool: '234569' }) + '1 ', sections: [3, 4] },
                    { area: '020 ' + character({ pool: '378' }), sections: [3, 4] },
                    { area: '023 ' + character({ pool: '89' }), sections: [3, 4] },
                    { area: '024 7', sections: [3, 4] },
                    { area: '028 ' + pick(['25', '28', '37', '71', '82', '90', '92', '95']), sections: [2, 4] },
                    { area: '012' + pick(['04', '08', '54', '76', '97', '98']) + ' ', sections: [6] },
                    { area: '013' + pick(['63', '64', '84', '86']) + ' ', sections: [6] },
                    { area: '014' + pick(['04', '20', '60', '61', '80', '88']) + ' ', sections: [6] },
                    { area: '015' + pick(['24', '27', '62', '66']) + ' ', sections: [6] },
                    { area: '016' + pick(['06', '29', '35', '47', '59', '95']) + ' ', sections: [6] },
                    { area: '017' + pick(['26', '44', '50', '68']) + ' ', sections: [6] },
                    { area: '018' + pick(['27', '37', '84', '97']) + ' ', sections: [6] },
                    { area: '019' + pick(['00', '05', '35', '46', '49', '63', '95']) + ' ', sections: [6] }
                ]);
                phone = phoneOptions.formatted ? ukNum(numPick) : ukNum(numPick).replace(' ', '', 'g');
            } else {
                numPick = pick([
                    { area: '07' + pick(['4', '5', '7', '8', '9']), sections: [2, 6] },
                    { area: '07624 ', sections: [6] }
                ]);
                phone = phoneOptions.formatted ? ukNum(numPick) : ukNum(numPick).replace(' ', '');
            }
            break;
        case 'za':
            if (!phoneOptions.mobile) {
                numPick = pick([
                    '01' + pick(['0', '1', '2', '3', '4', '5', '6', '7', '8']) + self.string({ pool: '0123456789', length: 7 }),
                    '02' + pick(['1', '2', '3', '4', '7', '8']) + self.string({ pool: '0123456789', length: 7 }),
                    '03' + pick(['1', '2', '3', '5', '6', '9']) + self.string({ pool: '0123456789', length: 7 }),
                    '04' + pick(['1', '2', '3', '4', '5', '6', '7', '8', '9']) + self.string({ pool: '0123456789', length: 7 }),
                    '05' + pick(['1', '3', '4', '6', '7', '8']) + self.string({ pool: '0123456789', length: 7 })
                ]);
                phone = phoneOptions.formatted || numPick;
            } else {
                numPick = pick([
                    '060' + pick(['3', '4', '5', '6', '7', '8', '9']) + self.string({ pool: '0123456789', length: 6 }),
                    '061' + pick(['0', '1', '2', '3', '4', '5', '8']) + self.string({ pool: '0123456789', length: 6 }),
                    '06' + self.string({ pool: '0123456789', length: 7 }),
                    '071' + pick(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']) + self.string({ pool: '0123456789', length: 6 }),
                    '07' + pick(['2', '3', '4', '6', '7', '8', '9']) + self.string({ pool: '0123456789', length: 7 }),
                    '08' + pick(['0', '1', '2', '3', '4', '5']) + self.string({ pool: '0123456789', length: 7 })
                ]);
                phone = phoneOptions.formatted || numPick;
            }
            break;
        case 'us':
        default:
            var areacodeResult = areacode(phoneOptions).toString();
            var exchange = natural({ min: 2, max: 9 }).toString() +
                natural({ min: 0, max: 9 }).toString() +
                natural({ min: 0, max: 9 }).toString();
            var subscriber = natural({ min: 1000, max: 9999 }).toString(); // this could be random [0-9]{4}
            phone = phoneOptions.formatted ? areacodeResult + ' ' + exchange + '-' + subscriber : areacodeResult + exchange + subscriber;
            break;
        case 'br':
            var areaCode = pick(['11', '12', '13', '14', '15', '16', '17', '18', '19', '21', '22', '24', '27', '28', '31', '32', '33', '34', '35', '37', '38', '41', '42', '43', '44', '45', '46', '47', '48', '49', '51', '53', '54', '55', '61', '62', '63', '64', '65', '66', '67', '68', '69', '71', '73', '74', '75', '77', '79', '81', '82', '83', '84', '85', '86', '87', '88', '89', '91', '92', '93', '94', '95', '96', '97', '98', '99']);
            var prefix;
            if (phoneOptions.mobile) {
                // Brasilian official reference (mobile): http://www.anatel.gov.br/setorregulado/plano-de-numeracao-brasileiro?id=330
                prefix = '9' + self.string({ pool: '0123456789', length: 4 });
            } else {
                // Brasilian official reference: http://www.anatel.gov.br/setorregulado/plano-de-numeracao-brasileiro?id=331
                prefix = natural({ min: 2000, max: 5999 }).toString();
            }
            var mcdu = self.string({ pool: '0123456789', length: 4 });
            phone = phoneOptions.formatted ? '(' + areaCode + ') ' + prefix + '-' + mcdu : areaCode + prefix + mcdu;
            break;
    }
    return phone;
};
