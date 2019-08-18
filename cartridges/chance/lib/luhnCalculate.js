'use strict';

module.exports = function (num) {
    var digits = num.toString().split('').reverse();
    var sum = 0;
    var digit;

    for (var i = 0, l = digits.length; l > i; ++i) {
        digit = +digits[i];
        if (i % 2 === 0) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        sum += digit;
    }
    return (sum * 9) % 10;
};
