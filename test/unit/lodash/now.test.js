var assert = require('assert');
var now = require('../../../cartridges/lodash/now');
var { stubA } = require('../helpers/stubs');

describe('now', function () {
    it('should return the number of milliseconds that have elapsed since the Unix epoch', function (done) {
        var stamp = +new Date();
        var actual = now();

        assert.ok(actual >= stamp);

        setTimeout(function () {
            assert.ok(now() > actual);
            done();
        }, 32);
    });

    it('should work with mocked `Date.now`', function () {
        var nowFn = Date.now;
        Date.now = stubA;

        var actual = now();
        Date.now = nowFn;

        assert.strictEqual(actual, 'a');
    });
});
