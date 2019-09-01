var push = Array.prototype.push;

/**
 * Extracts the unwrapped value from its wrapper.
 *
 * @private
 * @param {Object} wrapper The wrapper to unwrap.
 * @returns {*} Returns the unwrapped value.
 */
function getUnwrappedValue(wrapper) {
    var index = -1;
    var actions = wrapper.__actions__;
    var length = actions.length;
    var result = wrapper.__wrapped__;

    while (++index < length) {
        var args = [result];
        var action = actions[index];

        push.apply(args, action.args);
        result = action.func.apply(action.thisArg, args);
    }
    return result;
}

module.exports = getUnwrappedValue;
