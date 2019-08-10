'use strict';
var char = function (a) {
    return String.fromCharCode(a);
};

var chars = {
    nilChar: char(176),
    missingChar: char(201),
    nilPremitive: char(175),
    missingPremitive: char(200),

    emptyChar: char(178),
    emptyValue: char(177), // empty Premitive

    boundryChar: char(179),

    objStart: char(198),
    arrStart: char(204),
    arrayEnd: char(185)
};

var charsArr = [
    chars.nilChar,
    chars.nilPremitive,
    chars.missingChar,
    chars.missingPremitive,
    chars.boundryChar,
    chars.emptyChar,
    chars.emptyValue,
    chars.arrayEnd,
    chars.objStart,
    chars.arrStart
];

var _e = function (node, e_schema, options) {
    if (typeof e_schema === 'string') {
    // premitive
        if (node && node[0] && node[0].val !== undefined) {
            return getValue(node[0].val, e_schema);
        }
        return getValue(node, e_schema);
    }
    var hasValidData = hasData(node);
    if (hasValidData === true) {
        let str = '';
        if (Array.isArray(e_schema)) {
        // attributes can't be repeated. hence check in children tags only
            str += chars.arrStart;
            var itemSchema = e_schema[0];
            // var itemSchemaType = itemSchema;
            var arr_len = node.length;

            if (typeof itemSchema === 'string') {
                for (let arr_i = 0; arr_i < arr_len; arr_i++) {
                    var rString = getValue(node[arr_i].val, itemSchema);
                    str = processValue(str, rString);
                }
            } else {
                for (let arr_i = 0; arr_i < arr_len; arr_i++) {
                    var r = _e(node[arr_i], itemSchema, options);
                    str = processValue(str, r);
                }
            }
            str += chars.arrayEnd; // indicates that next item is not array item
        } else {
        // object
            str += chars.objStart;
            var keys = Object.keys(e_schema);
            if (Array.isArray(node)) {
                node = node[0];
            }
            for (let i in keys) {
                var key = keys[i];
                // a property defined in schema can be present either in attrsMap or children tags
                // options.textNodeName will not present in both maps, take it's value from val
                // options.attrNodeName will be present in attrsMap
                var rObject;
                if (!options.ignoreAttributes && node.attrsMap && node.attrsMap[key]) {
                    rObject = _e(node.attrsMap[key], e_schema[key], options);
                } else if (key === options.textNodeName) {
                    rObject = _e(node.val, e_schema[key], options);
                } else {
                    rObject = _e(node.child[key], e_schema[key], options);
                }
                str = processValue(str, rObject);
            }
        }
        return str;
    }
    return hasValidData;
};

var getValue = function (a /* , type*/) {
    switch (a) {
        case undefined:
            return chars.missingPremitive;
        case null:
            return chars.nilPremitive;
        case '':
            return chars.emptyValue;
        default:
            return a;
    }
};

var processValue = function (str, r) {
    if (!isAppChar(r[0]) && !isAppChar(str[str.length - 1])) {
        str += chars.boundryChar;
    }
    return str + r;
};

var isAppChar = function (ch) {
    return charsArr.indexOf(ch) !== -1;
};

function hasData(jObj) {
    if (jObj === undefined) {
        return chars.missingChar;
    } else if (jObj === null) {
        return chars.nilChar;
    } else if (
        jObj.child &&
    Object.keys(jObj.child).length === 0 &&
    (!jObj.attrsMap || Object.keys(jObj.attrsMap).length === 0)
    ) {
        return chars.emptyChar;
    }
    return true;
}

var x2j = require('./xmlstr2xmlnode');
var buildOptions = require('./util').buildOptions;

var convert2nimn = function (node, e_schema, options) {
    options = buildOptions(options, x2j.defaultOptions, x2j.props);
    return _e(node, e_schema, options);
};

exports.convert2nimn = convert2nimn;
