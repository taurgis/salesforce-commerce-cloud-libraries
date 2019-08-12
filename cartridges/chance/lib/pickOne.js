var natural = require('../natural');

module.exports = function (arr) {
    if (arr.length === 0) {
        throw new RangeError('Chance: Cannot pickone() from an empty array');
    }
    return arr[natural({ max: arr.length - 1 })];
};
