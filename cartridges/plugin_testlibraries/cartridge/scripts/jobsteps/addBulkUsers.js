'use strict';

var Status = require('dw/system/Status');
var Logger = require('dw/system/Logger');
var dbHelper = require('../db/myAppData');
var email = require('chance/email');
var name = require('chance/name');

exports.Run = function () {
    try {
        var db = dbHelper.getDB();
        var users = db.getCollection('users');

        for (var i = 0; i < 1000; i++) {
            // Create a new user object for each iteration
            var newUser = {
                name: name({ prefix: false, suffix: false, middle: false }),
                email: email({ length: 15, domain: 'example.com' }),
                status: 'pending',
                createdAt: new Date().toISOString()
            };

            // Insert the new document
            var insertedDoc = users.insert(newUser);

            Logger.getLogger('RhinoDB').info('Successfully inserted user with ID: {0}', insertedDoc._id);
        }

        return new Status(Status.OK, 'OK', 'User processed successfully.');

    } catch (e) {
        Logger.getLogger('RhinoDB').error('Failed to process user: {0} {1}', e.message, e.stack);
        return new Status(Status.ERROR, 'ERROR', 'Job step failed: ' + e.message);
    }
};
