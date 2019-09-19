'use strict';

module.exports = function _isPlaceholder(a) {
    if (a != null && typeof a === 'object') {
        try {
            return a['@@functional/placeholder'] === true; // A DW java object will raise an exception
        } catch (e) {
            return false;
        }
    } else {
        return false;
    }
};
