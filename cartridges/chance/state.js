'use strict';

var initOptions = require('./lib/initOptions');
var usStates = require('./lib/states');
var territories = require('./lib/territories');
var armedForces = require('./lib/armedForces');
var countryRegions = require('./lib/countryRegions');
var counties = require('./lib/counties');
var pick = require('./lib/pickOne');

/**
 * Return a random state value.
 *
 * @param {Object} options - Possible options for state
 * @returns {string} - A random state value
 *
 * @example
 *      state({ territories: true, full: true }) => 'Guam'
 */
module.exports = function (options) {
    var stateOptions = initOptions(options, { country: 'us', us_states_and_dc: true });

    var states;

    switch (stateOptions.country.toLowerCase()) {
        case 'us':
            states = [];

            if (stateOptions.us_states_and_dc) {
                states = states.concat(usStates);
            }
            if (stateOptions.territories) {
                states = states.concat(territories);
            }
            if (stateOptions.armed_forces) {
                states = states.concat(armedForces);
            }
            break;
        case 'it':
        case 'mx':
            states = countryRegions[stateOptions.country.toLowerCase()];
            break;
        case 'uk':
        default:
            states = counties[stateOptions.country.toLowerCase()];
            break;
    }

    return (stateOptions && stateOptions.full) ?
        pick(states).name :
        pick(states).abbreviation;
};
