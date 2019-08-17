'use strict';

module.exports = function (number, width, pad) {
    // Default pad to 0 if none provided
    var whatToPad = pad || '0';
    // Convert number to a string
    var numberToPad = number + '';

    return numberToPad.length >= width ? numberToPad : new Array(width - numberToPad.length + 1).join(whatToPad) + numberToPad;
};
