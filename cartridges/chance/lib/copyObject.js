var ohasOwnProperty = Object.prototype.hasOwnProperty;

var oKeys = (Object.keys || function (obj) {
    var result = [];
    Object.keys(obj).forEach(function (key) {
        if (ohasOwnProperty.call(obj, key)) {
            result.push(key);
        }
    });

    return result;
});


/**
 * Copies an object
 *
 * @param {Array} source - The source
 * @param {Array} target - The target
 */
function copyBaseObject(source, target) {
    var keys = oKeys(source);
    var key;

    for (var i = 0, l = keys.length; i < l; i++) {
        key = keys[i];

        target[key] = source[key] || target[key]; // eslint-disable-line no-param-reassign
    }
}

/**
 * Copies an array
 *
 * @param {Array} source - The source
 * @param {Array} target - The target
 */
function copyArray(source, target) {
    for (var i = 0, l = source.length; i < l; i++) {
        target[i] = source[i]; // eslint-disable-line no-param-reassign
    }
}

module.exports = function copyObject(source, _target) {
    var isArray = Array.isArray(source);
    var target = _target || (isArray ? new Array(source.length) : {});

    if (isArray) {
        copyArray(source, target);
    } else {
        copyBaseObject(source, target);
    }

    return target;
};
