'use strict';

module.exports = function initOptions(options, defaults) {
    var combinedOptions = options || {};

    if (defaults) {
        Object.keys(defaults).forEach(function (key) {
            if (!options || !options.hasOwnProperty(key)) {
                combinedOptions[key] = defaults[key];
            }
        });
    }

    return combinedOptions;
};
