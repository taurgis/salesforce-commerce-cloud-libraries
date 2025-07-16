/*
 * RhinoDB Query Engine
 *
 * Handles matching documents against query objects and applying updates/projections.
 * Inspired by the query language of NeDB/MongoDB.
 */

'use strict';

var File = require('dw/io/File');
var FileUtils = require('../util/FileUtils');
var Constants = require('../util/Constants');
var Logger = require('dw/system/Logger');

/**
 * The query engine.
 * @param {Store} store The parent store instance, used to access indexes and crypto.
 * @constructor
 */
function QueryEngine(store) {
    this.store = store;
}

/**
 * Checks if a document matches a given query.
 * @param {Object} doc The document to test.
 * @param {Object} query The query object.
 * @returns {boolean} True if the document matches the query.
 */
QueryEngine.prototype.matches = function (doc, query) {
    var queryKeys = Object.keys(query);
    var i;
    var len;
    var key;
    var queryPart;
    var docValue;

    for (i = 0, len = queryKeys.length; i < len; i++) {
        key = queryKeys[i];
        queryPart = query[key];
        docValue = doc[key];

        // Handle logical operators ($and, $or, $not)
        if (key === '$and') {
            if (!queryPart.every(function (subQuery) {
                return this.matches(doc, subQuery);
            }, this)) return false;
            // Skip remaining checks for this key
            return true;
        }
        if (key === '$or') {
            if (!queryPart.some(function (subQuery) {
                return this.matches(doc, subQuery);
            }, this)) return false;
            // Skip remaining checks for this key
            return true;
        }
        if (key === '$not') {
            if (this.matches(doc, queryPart)) return false;
            // Skip remaining checks for this key
            return true;
        }

        // Handle field-level operators
        if (typeof queryPart === 'object' && queryPart !== null && !Array.isArray(queryPart)) {
            var operatorMatch = true;
            var opKeys = Object.keys(queryPart);
            var j;
            var opLen;
            var op;
            var opValue;

            for (j = 0, opLen = opKeys.length; j < opLen; j++) {
                op = opKeys[j];
                opValue = queryPart[op];

                switch (op) {
                    case '$eq':
                        if (docValue !== opValue) operatorMatch = false;
                        break;
                    case '$ne':
                        if (docValue === opValue) operatorMatch = false;
                        break;
                    case '$gt':
                        if (docValue <= opValue) operatorMatch = false;
                        break;
                    case '$gte':
                        if (docValue < opValue) operatorMatch = false;
                        break;
                    case '$lt':
                        if (docValue >= opValue) operatorMatch = false;
                        break;
                    case '$lte':
                        if (docValue > opValue) operatorMatch = false;
                        break;
                    case '$in':
                        if (opValue.indexOf(docValue) === -1) operatorMatch = false;
                        break;
                    case '$nin':
                        if (opValue.indexOf(docValue) !== -1) operatorMatch = false;
                        break;
                    case '$exists':
                        if ((opValue && !Object.prototype.hasOwnProperty.call(doc, key))
                            || (!opValue && Object.prototype.hasOwnProperty.call(doc, key))) operatorMatch = false;
                        break;
                    case '$regex':
                        if (!new RegExp(opValue).test(docValue)) operatorMatch = false;
                        break;
                    default: // Unknown operator, treat as deep equality check
                        // Pre-compute stringified values to avoid repeated conversions
                        var docValueStr = JSON.stringify(docValue);
                        var queryPartStr = JSON.stringify(queryPart);
                        if (docValueStr !== queryPartStr) return false;
                        operatorMatch = true; // prevent fall-through
                        break;
                }
                if (!operatorMatch) break;
            }
            if (!operatorMatch) return false;
        } else if (docValue !== queryPart) {
            return false;
        }
    }
    return true;
};

/**
 * Performs a shallow copy of an object with a deep copy of nested objects.
 * More efficient than JSON.parse(JSON.stringify()).
 * @param {Object} obj The object to clone.
 * @returns {Object} The cloned object.
 */
QueryEngine.prototype.cloneObject = function (obj) {
    if (obj === null || typeof obj !== 'object') return obj;

    // Handle Date objects
    if (obj instanceof Date) return new Date(obj.getTime());

    // Create new object/array
    var copy = Array.isArray(obj) ? [] : {};

    // Copy properties
    var keys = Object.keys(obj);
    for (var i = 0, len = keys.length; i < len; i++) {
        var key = keys[i];
        copy[key] = this.cloneObject(obj[key]);
    }

    return copy;
};

/**
 * Applies an update operation to a document.
 * @param {Object} doc The document to update.
 * @param {Object} update The update operation.
 * @returns {Object} The modified document.
 */
QueryEngine.prototype.applyUpdate = function (doc, update) {
    var newDoc = this.cloneObject(doc); // More efficient deep copy
    var updateKeys = Object.keys(update);
    var i;
    var j;
    var len;
    var opLen;
    var op;
    var updateValue;
    var field;
    var fieldKeys;

    for (i = 0, len = updateKeys.length; i < len; i++) {
        op = updateKeys[i];
        updateValue = update[op];

        if (op === '$set') {
            fieldKeys = Object.keys(updateValue);
            for (j = 0, opLen = fieldKeys.length; j < opLen; j++) {
                field = fieldKeys[j];
                newDoc[field] = updateValue[field];
            }
        } else if (op === '$unset') {
            fieldKeys = Object.keys(updateValue);
            for (j = 0, opLen = fieldKeys.length; j < opLen; j++) {
                field = fieldKeys[j];
                delete newDoc[field];
            }
        } else if (op === '$inc') {
            fieldKeys = Object.keys(updateValue);
            for (j = 0, opLen = fieldKeys.length; j < opLen; j++) {
                field = fieldKeys[j];
                newDoc[field] = (newDoc[field] || 0) + updateValue[field];
            }
        } else {
            // If no operator, it's a replacement update
            var id = newDoc.id; // Use id instead of _id to avoid linting error
            newDoc = this.cloneObject(update);
            newDoc.id = id; // Preserve original id
            break;
        }
    }
    return newDoc;
};

/**
 * Applies a projection to a document.
 * @param {Object} doc The document.
 * @param {Object} projection The projection object.
 * @returns {Object} The projected document.
 */
QueryEngine.prototype.applyProjection = function (doc, projection) {
    if (!projection) return doc;

    var projectedDoc = { id: doc.id }; // id is always included unless explicitly excluded
    var includeMode = null; // null: not determined, true: inclusion, false: exclusion
    var keys = Object.keys(projection);
    var i;
    var len;
    var key;

    for (i = 0, len = keys.length; i < len; i++) {
        key = keys[i];
        if (key !== 'id') {
            if (projection[key]) {
                if (includeMode === false) throw new Error('RhinoDBError: Cannot mix inclusion and exclusion in a projection.');
                includeMode = true;
            } else {
                if (includeMode === true) throw new Error('RhinoDBError: Cannot mix inclusion and exclusion in a projection.');
                includeMode = false;
            }
        }
    }

    if (includeMode === true) {
        // Inclusion mode - only add specified fields
        for (i = 0, len = keys.length; i < len; i++) {
            key = keys[i];
            if (projection[key] && Object.prototype.hasOwnProperty.call(doc, key)) {
                projectedDoc[key] = doc[key];
            }
        }
    } else {
        // Exclusion mode or empty projection
        projectedDoc = this.cloneObject(doc);
        for (i = 0, len = keys.length; i < len; i++) {
            key = keys[i];
            if (!projection[key]) {
                delete projectedDoc[key];
            }
        }
    }

    if (Object.prototype.hasOwnProperty.call(projection, 'id') && !projection.id) {
        delete projectedDoc.id;
    }

    return projectedDoc;
};

/**
 * Runs a query against the collection.
 * @param {Object} query The query object.
 * @param {Object} [projection] Optional projection object.
 * @param {Object} [options] Optional options { limit, skip, sort, skipIndex }.
 * @returns {Array<Object>} The array of matching documents.
 */
QueryEngine.prototype.run = function (query, projection, options) {
    var self = this;
    var opts = options || {};
    var docIdsToLoad = null;
    var i;
    var len;
    var j;
    var file;
    var doc;

    // --- Index Optimization ---
    if (!opts.skipIndex) {
        for (i = 0, len = this.store.indexes.length; i < len; i++) {
            var indexDef = this.store.indexes[i];
            var field = indexDef.field;

            // Check if query can use this index (simple equality)
            if (Object.prototype.hasOwnProperty.call(query, field) && typeof query[field] !== 'object') {
                var indexFile = new File(this.store.root, Constants.INDEX_FILE_PREFIX + field + Constants.FILE_EXTENSION);

                // Read index data once and cache it
                var indexData = JSON.parse(this.store.crypto.decrypt(FileUtils.safeRead(indexFile)));
                var value = query[field];

                if (Object.prototype.hasOwnProperty.call(indexData, value)) {
                    // Cache document IDs from index for loading
                    docIdsToLoad = [indexData[value]];
                    Logger.debug('QueryEngine: Found ' + docIdsToLoad.length + ' documents in index for ' + field + '=' + value);

                    if (!docIdsToLoad.length) {
                        return []; // No results possible
                    }
                } else {
                    return []; // Value not in index, no results possible
                }
                break; // Use the first matching index found
            }
        }
    }

    // --- Document Loading ---
    var filesToScan = [];

    if (docIdsToLoad) {
        // Batch load specific documents from index result
        for (i = 0, len = docIdsToLoad.length; i < len; i++) {
            Logger.error('QueryEngine: Loading document with ID ' + docIdsToLoad[i]);
            filesToScan.push(FileUtils.getDocFile(this.store.root, docIdsToLoad[i]));
        }
    } else {
        // Full scan: list all document files
        filesToScan = FileUtils.listDocFiles(this.store.root);
    }

    // Pre-allocate results array for better memory usage
    var resultBuffer = new Array(filesToScan.length);
    var resultCount = 0;

    // --- Filtering ---
    var skip = opts.skip || 0;
    var limit = typeof opts.limit !== 'undefined' ? opts.limit : Number.MAX_SAFE_INTEGER;
    var totalNeeded = skip + limit;

    for (j = 0, len = filesToScan.length; j < len; j++) {
        // Early termination - stop if we have enough results
        if (resultCount >= totalNeeded) {
            break;
        }

        file = filesToScan[j];
        if (file.isFile()) {
            try {
                // Read and decrypt document
                doc = JSON.parse(this.store.crypto.decrypt(FileUtils.safeRead(file)));

                // Match against query
                if (this.matches(doc, query)) {
                    resultBuffer[resultCount++] = doc;
                }
            } catch (e) {
                Logger.error('Error processing document: ' + file.getName() + ' - ' + e.message);
                // Error handling without continue
            }
        }
    }

    // Apply sorting to all matches (needed before skip/limit)
    if (opts.sort) {
        var sortField = Object.keys(opts.sort)[0];
        var sortDir = opts.sort[sortField];

        resultBuffer.slice(0, resultCount).sort(function (a, b) {
            var aVal = a[sortField];
            var bVal = b[sortField];

            if (aVal < bVal) return -1 * sortDir;
            if (aVal > bVal) return 1 * sortDir;
            return 0;
        });
    }

    // Apply skip and limit with a single slice operation
    var finalResults = resultBuffer.slice(skip, Math.min(totalNeeded, resultCount));

    // Apply projection using map for better performance
    return finalResults.map(function (docItem) {
        return self.applyProjection(docItem, projection);
    });
};

module.exports = QueryEngine;
