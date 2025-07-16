/*
 * RhinoDB Constants
 */

'use strict';

module.exports = {
    LOG_PREFIX: 'RhinoDB',
    FILE_EXTENSION: '.json',
    TEMP_FILE_SUFFIX: '.tmp',
    LOCK_FILE_NAME: 'rhino.lock',
    INDEX_FILE_PREFIX: '_index_',

    DEFAULT_LOCK_TIMEOUT_MS: 30000, // 30 seconds
    LOCK_RETRY_DELAY_MS: 250, // 250 milliseconds
    STALE_FILE_THRESHOLD_MS: 3600000 // 1 hour
};
