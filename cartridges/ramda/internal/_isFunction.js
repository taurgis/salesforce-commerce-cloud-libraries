'use strict';

module.exports = function _isFunction(x) {
    var type = Object.prototype.toString.call(x);
    return type === '[object Function]'
    || type === '[object AsyncFunction]'
    || type === '[object GeneratorFunction]'
    || type === '[object AsyncGeneratorFunction]';
};
