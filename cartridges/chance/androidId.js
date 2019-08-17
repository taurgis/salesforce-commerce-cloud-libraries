'use strict';

var string = require('./string');

/**
 * Return a random Android id value.
 *
 * @param {Object} options - Possible options for Android id
 * @returns {string} - A random Android id value
 *
 * @example
 *      android_id() => 'APA91HHQyPlWqV2Nu61LRs41eE4vrR4bHLKTs0-Dh5nDLopcWZotLw77NEoJyADNJiq6cwY0jMM02y8aacLs6fe2_ynweFjZJVVevKON-32826v-EFoayyThU3-42YEUY9pCScU_n73yRNSOlTk5W6iPtrDkQ3a6_BvOxRbSYi3E6QEY0ZuIQF0'
 */
module.exports = function androidId() {
    return 'APA91' + string({ pool: '0123456789abcefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_', length: 178 });
};
