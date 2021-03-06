'use strict';

var arraySample = require('./arraySample');
var values = require('../values');

/**
* The base implementation of `_.sample`.
*
* @private
* @param {Array|Object} collection The collection to sample.
* @returns {*} Returns the random element.
*/
function baseSample(collection) {
    return arraySample(values(collection));
}

module.exports = baseSample;
