/*
 * RhinoDB Public API
 *
 * Main entry point for creating and managing a RhinoDB instance.
 */

'use strict';

var File = require('dw/io/File');
var Logger = require('dw/system/Logger');
var Store = require('./core/Store');
var FileUtils = require('./util/FileUtils');
var Constants = require('./util/Constants');

/**
 * Represents a file-based database instance.
 * @param {Object} options Configuration options for the database.
 * @param {string} options.dbName The name of the database. This will be the main directory name.
 * @param {string} options.rootPath The SFCC root directory ('IMPEX', 'TEMP', 'CATALOGS', etc.).
 * @param {string} options.encryptionKey Base64 encoded key for AES encryption.
 * @param {Array<Object>} [options.indexes] Optional array of index definitions.
 * @param {number} Timeout in milliseconds for acquiring a write lock.
 * @constructor
 */
function RhinoDB(options) {
    if (!options || !options.dbName || !options.rootPath || !options.encryptionKey) {
        throw new Error('RhinoDBError: dbName, rootPath, and encryptionKey are required options.');
    }

    this.options = {
        dbName: options.dbName,
        rootPath: options.rootPath,
        encryptionKey: options.encryptionKey,
        indexes: options.indexes || [],
        lockTimeout: options.lockTimeout || Constants.DEFAULT_LOCK_TIMEOUT_MS
    };

    this.dbRoot = FileUtils.getDatabaseRoot(this.options.rootPath, this.options.dbName);
    this.collections = {};

    Logger.getLogger(Constants.LOG_PREFIX).info('Retrieving db root at {0} with options: {1}', this.dbRoot.fullPath, JSON.stringify(this.options));

    // Perform initial setup and garbage collection
    if (FileUtils.safeMkdirs(this.dbRoot)) {
        Logger.getLogger(Constants.LOG_PREFIX).info('Created new database directory: {0}', this.dbRoot.fullPath);
    }

    if (!FileUtils.isStorefrontContext()) {
        FileUtils.garbageCollect(this.dbRoot);
    }
}

/**
 * Gets a reference to a collection within the database.
 * Creates the collection if it does not exist.
 * @param {string} collectionName The name of the collection.
 * @returns {Store} An instance of the Store for the requested collection.
 */
RhinoDB.prototype.getCollection = function (collectionName) {
    if (!collectionName) {
        throw new Error('RhinoDBError: collectionName is required.');
    }

    if (this.collections[collectionName]) {
        return this.collections[collectionName];
    }

    var collectionRoot = new File(this.dbRoot, collectionName);

    // Ensure the collection directory exists
    if (!collectionRoot.exists()
        && !FileUtils.safeMkdirs(collectionRoot)
    ) {
        throw new Error('RhinoDBError: Could not create collection directory: ' + collectionRoot.fullPath);
    }

    var collectionIndexes = this.options.indexes.filter(function (index) {
        return index.collection === collectionName;
    });

    var store = new Store(collectionRoot, this.options.encryptionKey, this.options.lockTimeout, collectionIndexes);
    this.collections[collectionName] = store;

    return store;
};

/**
 * Deletes the entire database from the file system. This is a destructive operation.
 * This method can only be called from a Job/OCAPI context.
 * @returns {boolean} True if the database was successfully deleted.
 */
RhinoDB.prototype.dropDatabase = function () {
    FileUtils.assertWriteContext('dropDatabase');
    Logger.getLogger(Constants.LOG_PREFIX).warn('Attempting to drop entire database: {0}', this.dbRoot.fullPath);
    return this.dbRoot.remove();
};

module.exports = RhinoDB;
