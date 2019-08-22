'use strict';

var create = require('../../../cartridges/lodash/create');

/**
 * Creates a custom error object.
 *
 * @private
 * @constructor
 * @param {string} message The error message.
 */
function CustomError(message) {
    this.name = 'CustomError';
    this.message = message;
}

CustomError.prototype = create(Error.prototype, {
    'constructor': CustomError
});

module.exports = CustomError;
