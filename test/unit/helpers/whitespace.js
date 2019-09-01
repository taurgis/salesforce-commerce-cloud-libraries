
var filter = require('../../../cartridges/lodash/filter');

module.exports = filter([
    // Basic whitespace characters.
    ' ', '\t', '\x0b', '\f', '\xa0', '\ufeff',

    // Line terminators.
    '\n', '\r', '\u2028', '\u2029',

    // Unicode category "Zs" space separators.
    '\u1680', '\u180e', '\u2000', '\u2001', '\u2002', '\u2003', '\u2004', '\u2005',
    '\u2006', '\u2007', '\u2008', '\u2009', '\u200a', '\u202f', '\u205f', '\u3000'
],
function (chr) { return /\s/.exec(chr); })
    .join('');
