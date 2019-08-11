var _curry2 = require('./_curry2');
var _flatCat = require('./_flatCat');
var map = require('../map');


var _xchain = _curry2(function _xchain(f, xf) {
  return map(f, _flatCat(xf));
});
module.exports = _xchain;
