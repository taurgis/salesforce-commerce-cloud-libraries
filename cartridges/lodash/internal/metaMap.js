'use strict';

var MetaMap;

if (typeof WeakMap === 'undefined') {
    /**
     * Since WeakMap does not exist on the DW server we proxy it to look like one,
     * but in reality it is a Hashmap.
    */
    var HashMap = require('dw/util/HashMap');

    MetaMap = function () {
        this.hashMap = new HashMap();
    };

    MetaMap.prototype.set = function (key, value) {
        this.hashMap.put(key, value);
    };

    MetaMap.prototype.get = function (key) {
        this.hashMap.get(key);
    };
} else {
    MetaMap = WeakMap;
}

module.exports = new MetaMap();
