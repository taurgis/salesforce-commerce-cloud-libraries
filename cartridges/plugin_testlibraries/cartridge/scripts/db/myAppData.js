// in cartridge/scripts/helpers/myAppData.js

var RhinoDB = require('rhinodb/db');
var Site = require('dw/system/Site');

var dbInstance = null;

/**
 * Gets the singleton instance of RhinoDB.
 * If it does not exist, it initializes a new instance with the configuration
 * @returns {RhinoDB|*}
 */
function getDB() {
    if (dbInstance) {
        return dbInstance;
    }

    // It is a best practice to store sensitive keys in Site Preferences
    var encryptionKey = 'myApp.encryptionKey'; // Replace with your actual key name
    if (!encryptionKey) {
        throw new Error('FATAL: RhinoDB encryption key is not configured in site preferences.');
    }

    var db = new RhinoDB({
        dbName: 'my_application_data',
        rootPath: 'TEMP', // Use IMPEX for persistent data, TEMP for transient
        encryptionKey: encryptionKey,
        indexes: [
            { collection: 'users', field: 'email', unique: true },
            { collection: 'products', field: 'category' }
        ],
        lockTimeout: 60000 // 60 second timeout for job operations
    });

    dbInstance = db;
    return dbInstance;
}

module.exports = {
    getDB: getDB
};
