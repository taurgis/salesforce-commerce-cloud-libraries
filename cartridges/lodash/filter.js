/**
 * Iterates over elements of `array`, returning an array of all elements
 * `predicate` returns truthy for. The predicate is invoked with three
 * arguments: (value, index, array).
 *
 * **Note:** Unlike `remove`, this method returns a new array.
 *
 * @since 5.0.0
 * @category Array
 * @param {Array} array The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 * @see pull, pullAll, pullAllBy, pullAllWith, pullAt, remove, reject
 * @example
 *
 * var users = [
    *   { 'user': 'barney', 'active': true },
    *   { 'user': 'fred',   'active': false }
    * ]
    *
    * filter(users, ({ active }) => active)
    * // => objects for ['barney']
    */
function filter(array, predicate) {
    let index = -1;
    let resIndex = 0;
    var length = array == null ? 0 : array.length;
    var result = [];

    while (++index < length) {
        var value = array[index];
        if (predicate(value, index, array)) {
            result[resIndex++] = value;
        }
    }
    return result;
}

module.exports = filter;
