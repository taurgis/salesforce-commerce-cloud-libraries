'use strict';

var server = require('server');

/** Just an example controlle to test moment functions */
server.get('Test', function (req, res, next) {
    var add = require('ramda/add');

    res.json(
        {
            add: add(4)(6)
        });

    next();
});

module.exports = server.exports();
