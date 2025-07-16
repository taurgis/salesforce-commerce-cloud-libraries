'use strict';

var Status = require('dw/system/Status');
var Logger = require('dw/system/Logger');
var dbHelper = require('../db/myAppData');

exports.Run = function (params, jobStepExecution) {
    try {
        var db = dbHelper.getDB();
        var users = db.getCollection('users');

        var newUser = {
            name: params.UserName,
            email: params.UserEmail,
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        // Insert the new document
        var insertedDoc = users.insert(newUser);
        Logger.getLogger('RhinoDB').info('Successfully inserted user with ID: {0}', insertedDoc._id);

        // Update an existing document
        users.update({ email: params.UserEmail }, { $set: { status: 'active' } });

        // Remove a document
        // users.remove({ email: 'olduser@example.com' });

        return new Status(Status.OK, 'OK', 'User processed successfully.');

    } catch (e) {
        Logger.getLogger('RhinoDB').error('Failed to process user: {0} {1}', e.message, e.stack);
        return new Status(Status.ERROR, 'ERROR', 'Job step failed: ' + e.message);
    }
};
