
var attempt = require('../../../cartridges/lodash/attempt');

module.exports = {
    asyncFunc: attempt(function () {
        return Function('return async () => {}'); // eslint-disable-line
    }),

    /** Used to test generator functions. */
    genFunc: attempt(function () {
        return Function('return function*(){}'); // eslint-disable-line
    })
};
