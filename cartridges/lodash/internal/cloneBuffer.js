'use strict';

var root= require('./root.js');

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports !== null && !exports.nodeType && exports

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module !== null && !module.nodeType && module

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined, allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined

/**
 * Creates a clone of `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice()
  }
  var length = buffer.length
  var result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length)

  buffer.copy(result)
  return result
}

module.exports = cloneBuffer;
