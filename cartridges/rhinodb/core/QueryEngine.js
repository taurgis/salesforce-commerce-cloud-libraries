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
    for (var key in query) {
        if (query.hasOwnProperty(key)) {
            var queryPart = query[key];
            var docValue = doc[key];

            // Handle logical operators ($and, $or, $not)
            if (key === '$and') {
                if (!queryPart.every(this.matches.bind(this, doc))) return false;
                continue;
            }
            if (key === '$or') {
                if (!queryPart.some(this.matches.bind(this, doc))) return false;
                continue;
            }
            if (key === '$not') {
                if (this.matches(doc, queryPart)) return false;
                continue;
            }

            // Handle field-level operators
            if (typeof queryPart === 'object' && queryPart!== null &&!Array.isArray(queryPart)) {
                var operatorMatch = true;
                for (var op in queryPart) {
                    if (queryPart.hasOwnProperty(op)) {
                        var opValue = queryPart[op];
                        switch (op) {
                            case '$eq':   if (docValue!== opValue) operatorMatch = false; break;
                            case '$ne':   if (docValue === opValue) operatorMatch = false; break;
                            case '$gt':   if (docValue <= opValue) operatorMatch = false; break;
                            case '$gte':  if (docValue < opValue) operatorMatch = false; break;
                            case '$lt':   if (docValue >= opValue) operatorMatch = false; break;
                            case '$lte':  if (docValue > opValue) operatorMatch = false; break;
                            case '$in':   if (opValue.indexOf(docValue) === -1) operatorMatch = false; break;
                            case '$nin':  if (opValue.indexOf(docValue)!== -1) operatorMatch = false; break;
                            case '$exists': if ((opValue &&!doc.hasOwnProperty(key)) || (!opValue && doc.hasOwnProperty(key))) operatorMatch = false; break;
                            case '$regex': if (new RegExp(opValue).test(docValue) === false) operatorMatch = false; break;
                            default: // Unknown operator, treat as deep equality check
                                if (JSON.stringify(docValue)!== JSON.stringify(queryPart)) return false;
                                operatorMatch = true; // prevent fall-through
                                break;
                        }
                        if (!operatorMatch) break;
                    }
                }
                if (!operatorMatch) return false;
            } else {
                // Simple equality check
                if (docValue!== queryPart) {
                    return false;
                }
            }
        }
    }
    return true;
};

/**
 * Applies an update operation to a document.
 * @param {Object} doc The document to update.
 * @param {Object} update The update operation.
 * @returns {Object} The modified document.
 */
QueryEngine.prototype.applyUpdate = function (doc, update) {
    var newDoc = JSON.parse(JSON.stringify(doc)); // Deep copy to avoid modifying original

    for (var op in update) {
        if (update.hasOwnProperty(op)) {
            var updateValue = update[op];
            if (op === '$set') {
                for (var field in updateValue) {
                    if (updateValue.hasOwnProperty(field)) {
                        newDoc[field] = updateValue[field];
                    }
                }
            } else if (op === '$unset') {
                for (var field in updateValue) {
                    if (updateValue.hasOwnProperty(field)) {
                        delete newDoc[field];
                    }
                }
            } else if (op === '$inc') {
                for (var field in updateValue) {
                    if (updateValue.hasOwnProperty(field)) {
                        newDoc[field] = (newDoc[field] || 0) + updateValue[field];
                    }
                }
            } else {
                // If no operator, it's a replacement update
                var id = newDoc._id;
                newDoc = JSON.parse(JSON.stringify(update));
                newDoc._id = id; // Preserve original _id
                break;
            }
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

    var projectedDoc = { _id: doc._id }; // _id is always included unless explicitly excluded
    var includeMode = null; // null: not determined, true: inclusion, false: exclusion

    for (var key in projection) {
        if (projection.hasOwnProperty(key) && key!== '_id') {
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
        for (var key in projection) {
            if (projection.hasOwnProperty(key) && projection[key] && doc.hasOwnProperty(key)) {
                projectedDoc[key] = doc[key];
            }
        }
    } else { // Exclusion mode or empty projection
        projectedDoc = JSON.parse(JSON.stringify(doc)); // Start with a full copy
        for (var key in projection) {
            if (projection.hasOwnProperty(key) &&!projection[key]) {
                delete projectedDoc[key];
            }
        }
    }

    if (projection.hasOwnProperty('_id') &&!projection._id) {
        delete projectedDoc._id;
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
    var results = [];
    var docIdsToLoad = null;

    // --- Index Optimization ---
    if (!opts.skipIndex) {
        for (var i = 0; i < this.store.indexes.length; i++) {
            var indexDef = this.store.indexes[i];
            var field = indexDef.field;

            // Check if query can use this index (simple equality)
            if (Object.prototype.hasOwnProperty.call(query, field) && typeof query[field] !== 'object') {
                var indexFile = new File(this.store.root, Constants.INDEX_FILE_PREFIX + field + Constants.FILE_EXTENSION);
                var indexData = JSON.parse(this.store.crypto.decrypt(FileUtils.safeRead(indexFile)));

                Logger.error('QueryEngine: Using index for field ' + field + ' with data read');

                var value = query[field];

                Logger.error('QueryEngine: Query value for field ' + field + ' is ' + value);

                if (Object.prototype.hasOwnProperty.call(indexData, value)) {
                    // If index exists, load document IDs from index
                    docIdsToLoad = [indexData[value]];
                    Logger.error('QueryEngine: Found ' + docIdsToLoad.length + ' documents in index for value ' + value);
                    if (docIdsToLoad.length === 0) {
                        return []; // No results possible
                    }
                } else {
                    // eslint-disable-next-line consistent-return
                    return; // Value not in index, no results possible
                }
                break; // Use the first matching index found
            }
        }
    }

    // --- Document Loading ---
    var filesToScan = [];

    if (docIdsToLoad) {
        // Load specific documents from index result
        docIdsToLoad.forEach(function(id) {
            filesToScan.push(FileUtils.getDocFile(self.store.root, id));
        });
    } else {
        // Full scan: list all document files
        filesToScan = FileUtils.listDocFiles(this.store.root);
    }

    // --- Filtering, Sorting, Paging ---
    for (var j = 0; j < filesToScan.length; j++) {
        var file = filesToScan[j];
        if (file.isFile()) {
            var doc = JSON.parse(this.store.crypto.decrypt(FileUtils.safeRead(file)));
            if (this.matches(doc, query)) {
                results.push(doc);
            }
        }
    }

    // Apply sorting
    if (opts.sort) {
        var sortField = Object.keys(opts.sort);
        var sortDir = opts.sort[sortField];
        results.sort(function (a, b) {
            if (a[sortField] < b[sortField]) return -1 * sortDir;
            if (a[sortField] > b[sortField]) return 1 * sortDir;
            return 0;
        });
    }

    // Apply skip and limit
    var finalResults = results.slice(opts.skip || 0);
    if (opts.limit) {
        finalResults = finalResults.slice(0, opts.limit);
    }

    // Apply projection
    return finalResults.map(function (docItem) {
        return self.applyProjection(docItem, projection);
    });
};

module.exports = QueryEngine;
