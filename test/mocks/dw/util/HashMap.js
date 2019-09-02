module.exports = function (map) {
    // simulate a key-value storage
    var internalMap = map || {};

    return {

        containsKey: function (key) {
            return internalMap.hasOwnProperty(key); // eslint-disable-line
        },

        get: function (key) {
            return internalMap[key];
        },

        put: function (key, value) {
            internalMap[key] = value;
        }
    };
};

exports.PROPERTY_NOT_FOUND = function () {};

exports.EMPTY_MAP = function () {};

exports.PROPERTY_NOT_DECLARED = function () {};
