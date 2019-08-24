module.exports = {
    array: function () { return []; },
    true: function () { return true; },
    false: function () { return false; },
    stubA: function () { return 'a'; },
    stubB: function () { return 'b'; },
    stubC: function () { return 'c'; },
    empties: [[], {}].concat(require('./falsey').slice(1)),
    stubObject: function () { return {}; },
    stubString: function () { return ''; }
};
