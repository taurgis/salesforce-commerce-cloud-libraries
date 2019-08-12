module.exports = function initOptions(options, defaults) {
    var combinedOptions = options || {};

    if (defaults) {
        Object.keys(defaults).forEach(function (key) {
            if (typeof options[key] === 'undefined') {
                combinedOptions[key] = defaults[key];
            }
        });
    }

    return combinedOptions;
};
