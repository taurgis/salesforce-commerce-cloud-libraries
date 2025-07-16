/*
 * RhinoDB File Utility
 *
 * Provides abstracted and safe file I/O operations.
 */

'use strict';

var File = require('dw/io/File');
var FileWriter = require('dw/io/FileWriter');
var FileReader = require('dw/io/FileReader');
var SecureRandom = require('dw/crypto/SecureRandom');
var Encoding = require('dw/crypto/Encoding');
var Constants = require('./Constants');

var FileUtils = {
    /**
     * Asserts that the current execution context allows for write operations.
     * @param {string} operationName The name of the operation being attempted.
     */
    assertWriteContext: function (operationName) {
        // In SFCC, job contexts are not easily distinguishable from storefront contexts
        // via a simple API call. The most reliable check is to attempt a prohibited operation
        // in a try/catch, but that is inefficient. The primary guard is the API quota system.
        // This check serves as a developer reminder and a potential future-proofing point.
        // A simple check is that storefront requests have a 'currentRequest' global variable.
        if (typeof request !== 'undefined' && request !== null && request.session.customer) {
            // This is likely a storefront context. While jobs can be triggered by controllers,
            // a direct file write in a controller is the primary concern.
            // Note: This is not foolproof. The ultimate enforcement is the platform quota.
            throw new Error('RhinoDBError: Write operation "' + operationName + '" is not permitted in a storefront context.');
        }
    },

    /**
     * Generates a cryptographically-strong random 16-character alphanumeric ID.
     * @returns {string} The generated ID.
     */
    generateId: function () {
        var random = new SecureRandom();
        var bytes = random.nextBytes(12);
        return Encoding.toBase64(bytes).replace(/[+/=]/g, '').substring(0, 16);
    },

    /**
     * Gets the root directory for the database.
     * @param {string} rootDirType The SFCC root directory type.
     * @param {string} dbName The database name.
     * @returns {dw.io.File} The file object for the database root.
     */
    getDatabaseRoot: function(rootDirType, dbName) {
        var root = File.getRootDirectory(rootDirType);
        return new File(root, dbName);
    },

    /**
     * Calculates the sharded file path for a document ID.
     * @param {dw.io.File} collectionRoot The collection's root directory.
     * @param {string} id The document ID.
     * @returns {dw.io.File} The file object for the document.
     */
    getDocFile: function (collectionRoot, id) {
        var shard1 = id.substring(0, 2);
        var shard2 = id.substring(2, 4);
        var shard1Dir = new File(collectionRoot, shard1);
        FileUtils.safeMkdirs(shard1Dir); // Ensure directory exists
        var shardDir = new File(shard1Dir, shard2);
        FileUtils.safeMkdirs(shardDir); // Ensure directory exists
        return new File(shardDir, id + Constants.FILE_EXTENSION);
    },

    /**
     * Atomically writes content to a file.
     * @param {dw.io.File} file The destination file.
     * @param {string} content The content to write.
     * @param {Crypto} crypto The crypto instance for temporary file name generation.
     */
    atomicWrite: function (file, content, crypto) {
        this.assertWriteContext('atomicWrite');
        var tempFile = new File(file.fullPath + Constants.TEMP_FILE_SUFFIX + '.' + FileUtils.generateId());
        var writer = null;
        try {
            writer = new FileWriter(tempFile, 'UTF-8');
            writer.write(content);
        } finally {
            if (writer) {
                writer.close();
            }
        }

        if (!tempFile.renameTo(file)) {
            tempFile.remove(); // Clean up if rename fails
            throw new Error('RhinoDBError: Atomic rename failed for ' + file.fullPath);
        }
    },

    /**
     * Safely reads content from a file.
     * @param {dw.io.File} file The file to read.
     * @returns {string} The file content.
     */
    safeRead: function (file) {
        if (!file.exists()) return '';
        var reader = null;
        try {
            reader = new FileReader(file, 'UTF-8');
            return reader.readString();
        } finally {
            if (reader) {
                reader.close();
            }
        }
    },

    /**
     * Lists all document files in a collection, traversing sharded directories.
     * @param {dw.io.File} collectionRoot The collection's root directory.
     * @returns {Array<dw.io.File>} An array of file objects.
     */
    listDocFiles: function (collectionRoot) {
        var allFiles = [];
        var topLevelDirs = collectionRoot.listFiles();
        if (!topLevelDirs) return allFiles;

        for (var i = 0; i < topLevelDirs.length; i++) {
            var dir1 = topLevelDirs[i];
            if (dir1.isDirectory()) {
                var secondLevelDirs = dir1.listFiles();
                if (secondLevelDirs) {
                    for (var j = 0; j < secondLevelDirs.length; j++) {
                        var dir2 = secondLevelDirs[j];
                        if (dir2.isDirectory()) {
                            var docFiles = dir2.listFiles(function(f) { return f.isFile() && f.name.endsWith(Constants.FILE_EXTENSION); });
                            if (docFiles) {
                                allFiles.push.apply(allFiles, docFiles.toArray());
                            }
                        }
                    }
                }
            }
        }
        return allFiles;
    },

    /**
     * Cleans up stale lock and temp files.
     * @param {dw.io.File} dir The directory to clean.
     */
    garbageCollect: function (dir) {
        this.assertWriteContext('garbageCollect');
        var staleTime = Date.now() - Constants.STALE_FILE_THRESHOLD_MS;
        var files = dir.listFiles();

        if (!files) return;

        files.toArray().forEach(function (file) {
            var isStale = file.lastModified() < staleTime;
            var isGarbage = file.name.endsWith(Constants.LOCK_FILE_NAME) || file.name.indexOf(Constants.TEMP_FILE_SUFFIX) > -1;

            if (isStale && isGarbage) {
                file.remove();
            }
        });
    },

    /**
     * Safely does the mkdirs operation, avoid it in storefront contexts.
     *
     * @param {dw.io.File} file The directory to create.
     *
     * @returns {boolean} True if the directory was created or already exists.
     */
    safeMkdirs: function (file) {
        if (typeof request !== 'undefined' && request !== null && request.session.customer) {
            return true; // No-op in storefront context
        }

        if (!file.exists()) {
            if (!file.mkdirs()) {
                throw new Error('RhinoDBError: Failed to create directory ' + file.fullPath);
            }
        }

        return true;
    },

    isStorefrontContext: function () {
        // This is a simple check to determine if the current context is a storefront context.
        // In SFCC, storefront requests have a 'request' global variable.
        return typeof request !== 'undefined' && request !== null && request.session && request.session.customer;
    }
};

module.exports = FileUtils;
