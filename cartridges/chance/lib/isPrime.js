'use strict';

module.exports = function (n) {
    if (n % 1 || n < 2) {
        return false;
    }
    if (n % 2 === 0) {
        return n === 2;
    }
    if (n % 3 === 0) {
        return n === 3;
    }
    var m = Math.sqrt(n);
    for (var i = 5; i <= m; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) {
            return false;
        }
    }
    return true;
};
