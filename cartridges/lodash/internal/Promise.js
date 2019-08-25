'use strict';

var getNative = require('./getNative');
var root = require('./root');

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

module.exports = Promise;
