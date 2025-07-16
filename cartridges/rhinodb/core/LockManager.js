/*
 * RhinoDB Lock Manager
 *
 * Implements a cooperative file-based mutex for serializing write operations.
 */

'use strict';

var File = require('dw/io/File');
var Logger = require('dw/system/Logger');
var Constants = require('../util/Constants');

/**
 * Manages locking for a collection.
 * @param {dw.io.File} collectionRoot The root directory of the collection.
 * @param {number} timeout Milliseconds to wait for a lock.
 * @constructor
 */
function LockManager(collectionRoot, timeout) {
    this.lockFile = new File(collectionRoot, Constants.LOCK_FILE_NAME);
    this.timeout = timeout;
}

/**
 * Acquires a lock for the collection, waiting if necessary.
 */
LockManager.prototype.acquire = function () {
    var startTime = Date.now();
    var acquired = false;

    while (Date.now() - startTime < this.timeout) {
        try {
            if (this.lockFile.createNewFile()) {
                acquired = true;
                break;
            }
        } catch (e) {
            // Potentially a file system error, re-throw
            Logger.getLogger(Constants.LOG_PREFIX).error('Error acquiring lock: {0}', e.message);
            throw e;
        }


    }

    if (!acquired) {
        throw new Error('RhinoDBError: LockTimeoutException: Could not acquire lock for ' + this.lockFile.fullPath + ' within ' + this.timeout + 'ms.');
    }
};

/**
 * Releases the lock.
 */
LockManager.prototype.release = function () {
    if (this.lockFile.exists()) {
        this.lockFile.remove();
    }
};

module.exports = LockManager;
