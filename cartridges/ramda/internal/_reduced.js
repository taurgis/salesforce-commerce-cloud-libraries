'use strict';

module.exports = function _reduced(x) {
    return x && x['@@transducer/reduced'] ? x
        : {
            '@@transducer/value': x,
            '@@transducer/reduced': true
        };
};
