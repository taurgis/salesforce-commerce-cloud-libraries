'use strict';

var util = require('./util');
var buildOptions = require('./util').buildOptions;
var x2j = require('./xmlstr2xmlnode');

// TODO: do it later
var convertToJsonString = function (node, options) {
    options = buildOptions(options, x2j.defaultOptions, x2j.props);

    options.indentBy = options.indentBy || '';
    return _cToJsonStr(node, options, 0);
};

var _cToJsonStr = function (node, options) {
    let jObj = '{';

    // traver through all the children
    var keys = Object.keys(node.child);

    for (let index = 0; index < keys.length; index++) {
        var tagname = keys[index];
        if (node.child[tagname] && node.child[tagname].length > 1) {
            jObj += '"' + tagname + '" : [ ';
            for (var tag in node.child[tagname]) {
                jObj += _cToJsonStr(node.child[tagname][tag], options) + ' , ';
            }
            jObj = jObj.substr(0, jObj.length - 1) + ' ] '; // remove extra comma in last
        } else {
            jObj += '"' + tagname + '" : ' + _cToJsonStr(node.child[tagname][0], options) + ' ,';
        }
    }
    util.merge(jObj, node.attrsMap);
    // add attrsMap as new children
    if (util.isEmptyObject(jObj)) {
        return util.isExist(node.val) ? node.val : '';
    }
    if (util.isExist(node.val)) {
        if (!(typeof node.val === 'string' && (node.val === '' || node.val === options.cdataPositionChar))) {
            jObj += '"' + options.textNodeName + '" : ' + stringval(node.val);
        }
    }

    // add value
    if (jObj[jObj.length - 1] === ',') {
        jObj = jObj.substr(0, jObj.length - 2);
    }
    return jObj + '}';
};

function stringval(v) {
    if (v === true || v === false || !isNaN(v)) {
        return v;
    }
    return '"' + v + '"';
}

exports.convertToJsonString = convertToJsonString;
