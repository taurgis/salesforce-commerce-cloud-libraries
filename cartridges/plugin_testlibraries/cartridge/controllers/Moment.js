'use strict';

var server = require('server');

/** Just an example controlle to test moment functions */
server.get('Test', function (req, res, next) {
    var moment = require('moment/moment');

    res.json(
        {
            format: moment().format(),
            now: moment(),
            parse: moment('2019-12-05'),
            parseComplex: moment('2008-09-15T15:53:00+02:00'),
            getUTCFromTimezone: moment('Sat Apr 30 2016 16:59:46 GMT+0100'),
            compareDates: moment('2010-10-18').isAfter('2010-10-19'),
            formatString: moment(new Date()).format('DD/MM/YY hh:mm')
        });

    next();
});

module.exports = server.exports();
