var MersenneTwister = require('./mersenneTwister');

module.exports = function (seed) {
    return new MersenneTwister(seed).random();
};
