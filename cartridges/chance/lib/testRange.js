module.exports = function testRange(test, errorMessage) {
    if (test) {
        throw new RangeError(errorMessage);
    }
};
