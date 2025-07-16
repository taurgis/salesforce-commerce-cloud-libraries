/*
 * RhinoDB Store
 *
 * Manages a single collection (a directory of documents).
 * Implements all public CRUD and query methods.
 */

'use strict';

var File = require('dw/io/File');
var Logger = require('dw/system/Logger');
var Crypto = require('../util/Crypto');
var FileUtils = require('../util/FileUtils');
var LockManager = require('./LockManager');
var QueryEngine = require('./QueryEngine');
var Constants = require('../util/Constants');

/**
 * Represents a single collection store.
 * @param {dw.io.File} collectionRoot The root directory for this collection.
 * @param {string} encryptionKey The encryption key.
 * @param {number} lockTimeout The lock timeout.
 * @param {Array<Object>} indexes The index definitions for this collection.
 * @constructor
 */
function Store(collectionRoot, encryptionKey, lockTimeout, indexes) {
    this.root = collectionRoot;
    this.crypto = new Crypto(encryptionKey);
    this.lockManager = new LockManager(this.root, lockTimeout);
    this.indexes = indexes || [];
    this.queryEngine = new QueryEngine(this);

    if (FileUtils.safeMkdirs(this.root)) {
        Logger.getLogger(Constants.LOG_PREFIX).info('Created new collection directory: {0}', this.root.fullPath);
        this.createIndexFiles();
    }
}

// --- Private Helper Methods ---

/**
 * Creates empty index files for the collection based on configuration.
 * @private
 */
Store.prototype.createIndexFiles = function () {
    var self = this;
    this.indexes.forEach(function (indexDef) {
        var indexFile = new File(self.root, Constants.INDEX_FILE_PREFIX + indexDef.field + Constants.FILE_EXTENSION);
        if (!indexFile.exists()) {
            FileUtils.atomicWrite(indexFile, self.crypto.encrypt('{}'), self.crypto);
        }
    });
};

/**
 * Updates all relevant indexes for a given document.
 * @param {Object} doc The document being added, updated, or removed.
 * @param {string} operation 'add', 'remove'
 * @private
 */
Store.prototype.updateIndexes = function (doc, operation) {
    var self = this;
    this.indexes.forEach(function (indexDef) {
        var field = indexDef.field;
        if (Object.prototype.hasOwnProperty.call(doc, field)) {
            var indexFile = new File(self.root, Constants.INDEX_FILE_PREFIX + field + Constants.FILE_EXTENSION);
            var readData = self.crypto.decrypt(FileUtils.safeRead(indexFile));

            if (!readData || readData === '') {
                readData = '{}'; // Ensure we have a valid JSON object
            }

            var indexData = JSON.parse(readData);
            var key = doc[field];

            if (operation === 'add') {
                if (indexDef.unique && Object.prototype.hasOwnProperty.call(indexData, key)) {
                    throw new Error('RhinoDBError: Unique index violation on field "' + field + '" for value "' + key + '"');
                }
                indexData[key] = doc.id;
            } else if (operation === 'remove') {
                delete indexData[key];
            }

            FileUtils.atomicWrite(indexFile, self.crypto.encrypt(JSON.stringify(indexData)), self.crypto);
        }
    });
};

// --- Public API Methods ---

/**
 * Inserts a new document or an array of documents.
 * @param {Object|Array<Object>} docOrDocs The document or documents to insert.
 * @returns {Object|Array<Object>} The inserted document(s) with id.
 */
Store.prototype.insert = function (docOrDocs) {
    FileUtils.assertWriteContext('insert');
    var isArray = Array.isArray(docOrDocs);
    var docs = isArray ? docOrDocs : [docOrDocs];
    var insertedDocs = [];

    this.lockManager.acquire();
    try {
        for (var i = 0; i < docs.length; i++) {
            var doc = docs[i];
            doc.id = doc.id || FileUtils.generateId();

            var docFile = FileUtils.getDocFile(this.root, doc.id);

            if (docFile.exists()) {
                throw new Error('RhinoDBError: Document with id ' + doc.id + ' already exists.');
            }

            // Write document first, then update indexes
            FileUtils.atomicWrite(docFile, this.crypto.encrypt(JSON.stringify(doc)), this.crypto);
            this.updateIndexes(doc, 'add');
            insertedDocs.push(doc);
        }
    } finally {
        this.lockManager.release();
    }

    return isArray ? insertedDocs : insertedDocs[0];
};

/**
 * Finds documents matching a query.
 * @param {Object} query The query object.
 * @param {Object} [projection] Optional projection object.
 * @returns {Array<Object>} An array of matching documents.
 */
Store.prototype.find = function (query, projection) {
    return this.queryEngine.run(query, projection);
};

/**
 * Finds the first document matching a query.
 * @param {Object} query The query object.
 * @param {Object} [projection] Optional projection object.
 * @returns {Object|null} The first matching document or null.
 */
Store.prototype.findOne = function (query, projection) {
    // A direct lookup by id is the most performant path
    if (query && query.id && Object.keys(query).length === 1) {
        var docFile = FileUtils.getDocFile(this.root, query.id);
        if (docFile.exists()) {
            var doc = JSON.parse(this.crypto.decrypt(FileUtils.safeRead(docFile)));
            return this.queryEngine.applyProjection(doc, projection);
        }
        return null;
    }

    // For other queries, use the full query engine but limit to 1 result
    var results = this.queryEngine.run(query, projection, { limit: 1 });
    return results.length > 0 ? results[0] : null;
};

/**
 * Updates documents matching a query.
 * @param {Object} query The query to find documents to update.
 * @param {Object} update The update operation object (e.g., using $set).
 * @param {Object} [options] Options object. { multi: boolean, upsert: boolean }.
 * @returns {number} The number of documents updated.
 */
Store.prototype.update = function (query, update, options) {
    FileUtils.assertWriteContext('update');
    var opts = options || {};
    var updatedCount = 0;

    this.lockManager.acquire();
    try {
        var docsToUpdate = this.queryEngine.run(query, null, { skipIndex: true }); // Must do a full scan inside a lock

        if (docsToUpdate.length === 0 && opts.upsert) {
            // Handle upsert: create a new document
            var newDoc = this.queryEngine.applyUpdate({}, update); // Apply update to an empty object
            delete newDoc.id; // Ensure a new ID is generated
            this.insert(newDoc);
            updatedCount = 1;
        } else {
            for (var i = 0; i < docsToUpdate.length; i++) {
                var originalDoc = docsToUpdate[i];
                // Must remove old index entries before updating
                this.updateIndexes(originalDoc, 'remove');

                var updatedDoc = this.queryEngine.applyUpdate(originalDoc, update);
                var docFile = FileUtils.getDocFile(this.root, updatedDoc.id);

                // Write updated document and then add new index entries
                FileUtils.atomicWrite(docFile, this.crypto.encrypt(JSON.stringify(updatedDoc)), this.crypto);
                this.updateIndexes(updatedDoc, 'add');

                updatedCount++;
                if (!opts.multi) {
                    break;
                }
            }
        }
    } finally {
        this.lockManager.release();
    }

    return updatedCount;
};

/**
 * Removes documents matching a query.
 * @param {Object} query The query to find documents to remove.
 * @param {Object} [options] Options object. { multi: boolean }.
 * @returns {number} The number of documents removed.
 */
Store.prototype.remove = function (query, options) {
    FileUtils.assertWriteContext('remove');
    var opts = options || {};
    var removedCount = 0;

    this.lockManager.acquire();
    try {
        var docsToRemove = this.queryEngine.run(query, null, { skipIndex: true }); // Must do a full scan inside a lock

        for (var i = 0; i < docsToRemove.length; i++) {
            var doc = docsToRemove[i];
            var docFile = FileUtils.getDocFile(this.root, doc.id);

            if (docFile.remove()) {
                this.updateIndexes(doc, 'remove');
                removedCount++;
            }

            if (!opts.multi) {
                break;
            }
        }
    } finally {
        this.lockManager.release();
    }

    return removedCount;
};

/**
 * Creates an index on a field.
 * This is a helper method and should typically be configured at DB initialization.
 * @param {Object} options Index options { field: string, unique: boolean }.
 */
Store.prototype.ensureIndex = function (options) {
    FileUtils.assertWriteContext('ensureIndex');
    if (!options || !options.field) {
        throw new Error('RhinoDBError: Index options must include a "field" property.');
    }

    // Check if index already exists in memory
    var exists = this.indexes.some(function (idx) {
        return idx.field === options.field;
    });

    if (exists) {
        return;
    }

    this.lockManager.acquire();
    try {
        this.indexes.push(options);
        var indexFile = new File(this.root, Constants.INDEX_FILE_PREFIX + options.field + Constants.FILE_EXTENSION);
        if (!indexFile.exists()) {
            FileUtils.atomicWrite(indexFile, this.crypto.encrypt('{}'), this.crypto);
        }

        // This is a heavy operation: rebuild the index from all documents
        var allDocs = this.queryEngine.run({}, null, { skipIndex: true });
        var indexData = {};
        allDocs.forEach(function (doc) {
            if (Object.prototype.hasOwnProperty.call(doc, options.field)) {
                var key = doc[options.field];
                if (options.unique && Object.prototype.hasOwnProperty.call(indexData, key)) {
                    throw new Error('RhinoDBError: Cannot create unique index. Duplicate value found for field "' + options.field + '".');
                }
                indexData[key] = doc.id;
            }
        });

        FileUtils.atomicWrite(indexFile, this.crypto.encrypt(JSON.stringify(indexData)), this.crypto);
    } finally {
        this.lockManager.release();
    }
};

module.exports = Store;
