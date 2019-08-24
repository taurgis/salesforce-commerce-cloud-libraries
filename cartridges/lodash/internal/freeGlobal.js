'use strict';

/** Detect free variable `global`= require(Node.js. */
var freeGlobal = typeof global == 'object' && global !== null && global.Object === Object && global;

module.exports = freeGlobal;
