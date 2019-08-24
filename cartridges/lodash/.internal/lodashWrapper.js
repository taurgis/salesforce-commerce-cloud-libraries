var baseCreate = require('./baseCreate');
var baseLodash = require('./baseLodash');

/**
 * The base constructor for creating `lodash` wrapper objects.
 *
 * @private
 * @param {*} value The value to wrap.
 * @param {boolean} [chainAll] Enable explicit method chain sequences.
 */
function LodashWrapper(value, chainAll) {
    this.__wrapped__ = value;
    this.__actions__ = [];
    this.__chain__ = !!chainAll;
    this.__index__ = 0;
    this.__values__ = undefined;
}

LodashWrapper.prototype = baseCreate(baseLodash.prototype);
LodashWrapper.prototype.constructor = LodashWrapper;

LodashWrapper.prototype.value = function() {
    return this.__wrapped__;
}

LodashWrapper.prototype.thru = function() {
    return new LodashWrapper(require('../thru')(this.__wrapped__, arguments[0]));
}

LodashWrapper.prototype.compact = function() {
    return new LodashWrapper(require('../compact').apply(this, [this.__wrapped__]));
}

LodashWrapper.prototype.push = function() {
    Array.prototype.push.apply(this.__wrapped__, arguments)

    return new LodashWrapper(this.__wrapped__);
}

LodashWrapper.prototype.slice = function() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift(this.__wrapped__);
    return new LodashWrapper(require('../slice').apply(this, args));
}

LodashWrapper.prototype.reverse = function() {
    return new LodashWrapper(require('../reverse').apply(this, [this.__wrapped__]));
}

LodashWrapper.prototype.take = function() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift(this.__wrapped__);
    return new LodashWrapper(require('../take').apply(this, args));
}

module.exports = LodashWrapper;
