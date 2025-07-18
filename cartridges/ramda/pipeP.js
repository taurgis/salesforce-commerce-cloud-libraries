'use strict';

var _arity = require('./internal/_arity');
var _pipeP = require('./internal/_pipeP');
var reduce = require('./reduce');
var tail = require('./tail');

/**
 * Performs left-to-right composition of one or more Promise-returning
 * functions. The first argument may have any arity; the remaining arguments
 * must be unary.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Function
 * @sig ((a -> Promise b), (b -> Promise c), ..., (y -> Promise z)) -> (a -> Promise z)
 * @param {...Function} functions
 * @return {Function}
 * @see R.composeP
 * @deprecated since v0.26.0
 * @example
 *
 *      //  followersForUser :: String -> Promise [User]
 *      const followersForUser = R.pipeP(db.getUserById, db.getFollowers);
 */
module.exports = function pipeP() {
    if (arguments.length === 0) {
        throw new Error('pipeP requires at least one argument');
    }
    return _arity(
        arguments[0].length,
        reduce(_pipeP, arguments[0], tail(arguments))
    );
};
