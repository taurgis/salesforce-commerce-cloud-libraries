'use strict';

var initOptions = require('./lib/initOptions');
var testRange = require('./lib/testRange');
var animals = require('./lib/animals');
var pick = require('./lib/pickOne');

/**
 * Return a random animal value.
 *
 * @param {Object} options - Possible options for animal
 * @returns {string} - A random animal value
 *
 * @example
 *      animal({type: 'zoo'}); => 'Lion'
 */
module.exports = function (options) {
    // returns a random animal
    var animalOptions = initOptions(options);

    if (typeof animalOptions.type !== 'undefined') {
    // if user does not put in a valid animal type, user will get an error
        testRange(
            !animals[animalOptions.type.toLowerCase()],
            'Please pick from desert, ocean, grassland, forest, zoo, pets, farm.'
        );
        // if user does put in valid animal type, will return a random animal of that type
        return pick(animals[animalOptions.type.toLowerCase()]);
    }
    // if user does not put in any animal type, will return a random animal regardless
    var animalTypeArray = ['desert', 'forest', 'ocean', 'zoo', 'farm', 'pet', 'grassland'];
    return pick(animals[pick(animalTypeArray)]);
};
