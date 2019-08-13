'use strict';

module.exports = function _isTransformer(obj) {
    return obj != null && typeof obj['@@transducer/step'] === 'function';
};
