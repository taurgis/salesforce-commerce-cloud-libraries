'use strict';

/**
 * Overwritten because this does not exist on the SFCC side.
 * @static
 * @return {boolean} - Always false
 *
 * @implNote This is not supported by Salesforce Commerce Cloud
 */
function isSymbol() {
    return false;
}

module.exports = isSymbol;
