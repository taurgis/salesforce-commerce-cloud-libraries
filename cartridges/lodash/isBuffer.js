'use strict';

var root = require('./internal/root.js');

/** Detect free variable `exports`. */
var freeExports = typeof exports === 'object' && exports !== null && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module === 'object' && module !== null && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * isBuffer(new Buffer(2))
 * // => true
 *
 * isBuffer(new Uint8Array(2))
 * // => false
 */
var isBuffer = nativeIsBuffer || (function () { return false; });

module.exports = isBuffer;
