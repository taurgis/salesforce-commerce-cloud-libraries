/* eslint-disable */
'use strict';

var server = require('server');
var dbHelper = require('~/cartridge/scripts/db/myAppData');

/** Just an example controlle to test moment functions */
server.get('Test', function (req, res, next) {
    var db = dbHelper.getDB();
    var users = db.getCollection('users2');
    var customerEmail = 'bickezejiasaohi@example.com';

    var start  = new Date().getTime();
    var userData =  users.findOne({ email: { $eq: customerEmail }});
    var end = new Date().getTime();
    var userDataViaIndex = users.findOne({ email: 'bickezejiasaohi@example.com' });
    var endIndex = new Date().getTime();
    // Query for multiple documents with status pending and name starting with 'D'
    var recentUsers = users.find({ email: { $regex: '^d' }});
    var endRecent = new Date().getTime();

    res.json({
        userData: userData,
        userDataViaIndex: userDataViaIndex,
        recentUsers: recentUsers,
        timings: {
            findOne: {
                timeSingle: end - start,
                timeSingleViaIndex: endIndex - end,
                timeBulkRegexSearch: endRecent - endIndex
            }
        }
    });

    next();
});

module.exports = server.exports();
