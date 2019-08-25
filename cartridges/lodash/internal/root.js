'use strict';

var freeGlobal = require('./freeGlobal');

/** Detect free variable `globalThis` */
var freeGlobalThis = typeof globalThis == 'object' && globalThis !== null && globalThis.Object == Object && globalThis; // eslint-disable-line

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self !== null && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobalThis || freeGlobal || freeSelf || Function('return this')(); // eslint-disable-line

module.exports = root;
