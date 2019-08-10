'use strict';

var server = require('server');

/** Just an example controlle to test moment functions */
server.get('Test', function (req, res, next) {
    var beLocale = require('date-fns/locale/nl/index');
    res.json({
        currentDate: new Date(),
        addBusinessDays: require('date-fns/addBusinessDays')(new Date(), 5),
        isWeekend: require('date-fns/isWeekend')(new Date()),
        addDays: require('date-fns/addDays')(new Date(), 5),
        startOfYear: require('date-fns/startOfYear')(new Date()),
        subYears: require('date-fns/subYears')(new Date(), 2),
        addYears: require('date-fns/addYears')(new Date(), 2),
        subWeeks: require('date-fns/subWeeks')(new Date(), 2),
        addSeconds: require('date-fns/addSeconds')(new Date(), 10),
        addQuarters: require('date-fns/addQuarters')(new Date(), 1),
        addHours: require('date-fns/addHours')(new Date(), 1),
        subMonths: require('date-fns/subMonths')(new Date(), 1),
        addISOWeekYears: require('date-fns/addISOWeekYears')(new Date(), 2),
        setISOWeek: require('date-fns/setISOWeek')(new Date(2004, 7, 7), 53),
        startOfDay: require('date-fns/startOfDay')(new Date()),
        differenceInBusinessDays: require('date-fns/differenceInBusinessDays')(
            new Date(2014, 6, 20),
            new Date(2014, 0, 10)
        ),
        differenceInSeconds: require('date-fns/differenceInSeconds')(
            new Date(2014, 6, 2, 12, 30, 20, 0),
            new Date(2014, 6, 2, 12, 30, 7, 999)
        ),
        differenceInCalendarQuarters: require('date-fns/differenceInCalendarQuarters')(
            new Date(2014, 6, 2),
            new Date(2013, 11, 31)
        ),
        lightFormat: require('date-fns/lightFormat')(new Date(), 'yyyy-MM-dd'),
        closestTo: require('date-fns/closestTo')(new Date(2015, 8, 6), [
            new Date(2000, 0, 1),
            new Date(2030, 0, 1)
        ]),
        setDay: require('date-fns/setDay')(new Date(2014, 8, 1), 0),
        startOfHour: require('date-fns/startOfHour')(new Date(2014, 8, 2, 11, 55)),
        roundToNearestMinutes: require('date-fns/roundToNearestMinutes')(new Date(2014, 6, 10, 12, 12, 34)),
        parseISO: require('date-fns/parseISO')('2016-01-01'),
        parse: require('date-fns/parse')('02/11/2014', 'MM/dd/yyyy', new Date()),
        max: require('date-fns/max')([
            new Date(1989, 6, 10),
            new Date(1987, 1, 11),
            new Date(1995, 6, 2),
            new Date(1990, 0, 1)
        ]),
        isWithinInterval: require('date-fns/isWithinInterval')(new Date(2014, 0, 3), {
            start: new Date(2014, 0, 1),
            end: new Date(2014, 0, 7)
        }),
        getDaysInYear: require('date-fns/getDaysInYear')(new Date(2012, 0, 1)),
        format: require('date-fns/format')(new Date(2014, 6, 2, 15), "h 'o''clock'"),
        formatRelative: require('date-fns/formatRelative')(new Date(2019, 9, 8, 15), new Date(2019, 9, 9, 15)),
        formatDistance: require('date-fns/formatDistance')(
            new Date(1986, 3, 4, 10, 32, 0),
            new Date(1986, 3, 4, 11, 32, 0),
            { addSuffix: true }
        ),
        formatDistanceStrict: require('date-fns/formatDistanceStrict')(
            new Date(1986, 3, 4, 10, 32, 0),
            new Date(1987, 3, 4, 10, 33, 1),
            { unit: 'month' }
        ),
        endOfToday: require('date-fns/endOfToday')(),
        eachWeekendOfYear: require('date-fns/eachWeekendOfYear')(new Date(2020, 1, 1)),
        formatBE: require('date-fns/format')(new Date(2014, 6, 2), 'dd MMMM yyyy', { locale: beLocale })
    });

    next();
});

module.exports = server.exports();
