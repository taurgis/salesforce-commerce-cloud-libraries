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

LodashWrapper.prototype.unshift = function() {
    Array.prototype.unshift.apply(this.__wrapped__, arguments)

    return new LodashWrapper(this.__wrapped__);
}

LodashWrapper.prototype.slice = function() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift(this.__wrapped__);
    return new LodashWrapper(require('../slice').apply(this, args));
}

LodashWrapper.prototype.map = function() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift(this.__wrapped__);
    return new LodashWrapper(require('../map').apply(this, args));
}

LodashWrapper.prototype.filter = function() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift(this.__wrapped__);
    return new LodashWrapper(require('../filter').apply(this, args));
}

LodashWrapper.prototype.tap = function() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift(this.__wrapped__);
    return new LodashWrapper(require('../tap').apply(this, args));
}

LodashWrapper.prototype.reduce = function() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift(this.__wrapped__);
    return new LodashWrapper(require('../reduce').apply(this, args));
}

LodashWrapper.prototype.concat = function() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift(this.__wrapped__);
    return new LodashWrapper(require('../concat').apply(this, args));
}

LodashWrapper.prototype.reject = function() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift(this.__wrapped__);
    return new LodashWrapper(require('../reject').apply(this, args));
}

LodashWrapper.prototype.reverse = function() {
    return new LodashWrapper(require('../reverse').apply(this, [this.__wrapped__]));
}

LodashWrapper.prototype.isArray = function() {
    return new LodashWrapper(require('../isArray').apply(this, [this.__wrapped__]));
}


LodashWrapper.prototype.flatten = function() {
    return new LodashWrapper(require('../flatten').apply(this, [this.__wrapped__]));
}

LodashWrapper.prototype.head = function() {
    return new LodashWrapper(require('../head').apply(this, [this.__wrapped__]));
}

LodashWrapper.prototype.chain = function() {
    return this;
}

LodashWrapper.prototype.sortBy = function() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift(this.__wrapped__);
    return new LodashWrapper(require('../sortBy').apply(this, args));
}

LodashWrapper.prototype.take = function() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift(this.__wrapped__);
    return new LodashWrapper(require('../take').apply(this, args));
}

module.exports = LodashWrapper;
