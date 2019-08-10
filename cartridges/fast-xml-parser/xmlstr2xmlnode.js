'use strict';

var util = require('./util');
var buildOptions = require('./util').buildOptions;
var XmlNode = require('./xmlNode');
var TagType = { OPENING: 1, CLOSING: 2, SELF: 3, CDATA: 4 };
let regx =
  '<((!\\[CDATA\\[([\\s\\S]*?)(]]>))|(([\\w:\\-._]*:)?([\\w:\\-._]+))([^>]*)>|((\\/)(([\\w:\\-._]*:)?([\\w:\\-._]+))\\s*>))([^<]*)';

// var tagsRegx = new RegExp("<(\\/?[\\w:\\-\._]+)([^>]*)>(\\s*"+cdataRegx+")*([^<]+)?","g");
// var tagsRegx = new RegExp("<(\\/?)((\\w*:)?([\\w:\\-\._]+))([^>]*)>([^<]*)("+cdataRegx+"([^<]*))*([^<]+)?","g");


var defaultOptions = {
    attributeNamePrefix: '@_',
    attrNodeName: false,
    textNodeName: '#text',
    ignoreAttributes: true,
    ignoreNameSpace: false,
    allowBooleanAttributes: false, // a tag can have attributes without any value
    // ignoreRootElement : false,
    parseNodeValue: true,
    parseAttributeValue: false,
    arrayMode: false,
    trimValues: true, // Trim string values of tag and attributes
    cdataTagName: false,
    cdataPositionChar: '\\c',
    localeRange: '',
    tagValueProcessor: function (a) {
        return a;
    },
    attrValueProcessor: function (a) {
        return a;
    },
    stopNodes: []
    // decodeStrict: false,
};

exports.defaultOptions = defaultOptions;

var props = [
    'attributeNamePrefix',
    'attrNodeName',
    'textNodeName',
    'ignoreAttributes',
    'ignoreNameSpace',
    'allowBooleanAttributes',
    'parseNodeValue',
    'parseAttributeValue',
    'arrayMode',
    'trimValues',
    'cdataTagName',
    'cdataPositionChar',
    'localeRange',
    'tagValueProcessor',
    'attrValueProcessor',
    'parseTrueNumberOnly',
    'stopNodes'
];
exports.props = props;

var getTraversalObj = function (xmlData, options) {
    options = buildOptions(options, defaultOptions, props);
    // xmlData = xmlData.replace(/\r?\n/g, " ");//make it single line
    xmlData = xmlData.replace(/<!--[\s\S]*?-->/g, ''); // Remove  comments

    var xmlObj = new XmlNode('!xml');
    let currentNode = xmlObj;

    regx = regx.replace(/\[\\w/g, '[' + options.localeRange + '\\w');
    var tagsRegx = new RegExp(regx, 'g');
    let tag = tagsRegx.exec(xmlData);
    let nextTag = tagsRegx.exec(xmlData);
    while (tag) {
        var tagType = checkForTagType(tag);

        if (tagType === TagType.CLOSING) {
            // add parsed data to parent node
            if (currentNode.parent && tag[14]) {
                currentNode.parent.val = util.getValue(currentNode.parent.val) + '' + processTagValue(tag[14], options);
            }
            if (options.stopNodes.length && options.stopNodes.includes(currentNode.tagname)) {
                currentNode.child = [];
                if (currentNode.attrsMap === undefined) { currentNode.attrsMap = {}; }
                currentNode.val = xmlData.substr(currentNode.startIndex + 1, tag.index - currentNode.startIndex - 1);
            }
            currentNode = currentNode.parent;
        } else if (tagType === TagType.CDATA) {
            if (options.cdataTagName) {
                // add cdata node
                var childNodeCdata = new XmlNode(options.cdataTagName, currentNode, tag[3]);
                childNodeCdata.attrsMap = buildAttributesMap(tag[8], options);
                currentNode.addChild(childNodeCdata);
                // for backtracking
                currentNode.val = util.getValue(currentNode.val) + options.cdataPositionChar;
                // add rest value to parent node
                if (tag[14]) {
                    currentNode.val += processTagValue(tag[14], options);
                }
            } else {
                currentNode.val = (currentNode.val || '') + (tag[3] || '') + processTagValue(tag[14], options);
            }
        } else if (tagType === TagType.SELF) {
            if (currentNode && tag[14]) {
                currentNode.val = util.getValue(currentNode.val) + '' + processTagValue(tag[14], options);
            }

            var childNodeSelf = new XmlNode(options.ignoreNameSpace ? tag[7] : tag[5], currentNode, '');
            if (tag[8] && tag[8].length > 0) {
                tag[8] = tag[8].substr(0, tag[8].length - 1);
            }
            childNodeSelf.attrsMap = buildAttributesMap(tag[8], options);
            currentNode.addChild(childNodeSelf);
        } else {
            // TagType.OPENING
            var childNode = new XmlNode(
                options.ignoreNameSpace ? tag[7] : tag[5],
                currentNode,
                processTagValue(tag[14], options)
            );
            if (options.stopNodes.length && options.stopNodes.includes(childNode.tagname)) {
                childNode.startIndex = tag.index + tag[1].length;
            }
            childNode.attrsMap = buildAttributesMap(tag[8], options);
            currentNode.addChild(childNode);
            currentNode = childNode;
        }

        tag = nextTag;
        nextTag = tagsRegx.exec(xmlData);
    }

    return xmlObj;
};

function processTagValue(val, options) {
    if (val) {
        if (options.trimValues) {
            val = val.trim();
        }
        val = options.tagValueProcessor(val);
        val = parseValue(val, options.parseNodeValue, options.parseTrueNumberOnly);
    }

    return val;
}

function checkForTagType(match) {
    if (match[4] === ']]>') {
        return TagType.CDATA;
    } else if (match[10] === '/') {
        return TagType.CLOSING;
    } else if (typeof match[8] !== 'undefined' && match[8].substr(match[8].length - 1) === '/') {
        return TagType.SELF;
    }
    return TagType.OPENING;
}

function resolveNameSpace(tagname, options) {
    if (options.ignoreNameSpace) {
        var tags = tagname.split(':');
        var prefix = tagname.charAt(0) === '/' ? '/' : '';
        if (tags[0] === 'xmlns') {
            return '';
        }
        if (tags.length === 2) {
            tagname = prefix + tags[1];
        }
    }
    return tagname;
}

function parseValue(val, shouldParse, parseTrueNumberOnly) {
    if (shouldParse && typeof val === 'string') {
        let parsed;
        if (val.trim() === '' || isNaN(val)) {
            parsed = val === 'true' ? true : val === 'false' ? false : val;
        } else {
            if (val.indexOf('0x') !== -1) {
                // support hexa decimal
                parsed = Number(val);
            } else if (val.indexOf('.') !== -1) {
                parsed = Number(val);
            } else {
                parsed = Number(val);
            }
            if (parseTrueNumberOnly) {
                parsed = String(parsed) === val ? parsed : val;
            }
        }
        return parsed;
    }
    if (util.isExist(val)) {
        return val;
    }
    return '';
}

// TODO: change regex to capture NS
// var attrsRegx = new RegExp("([\\w\\-\\.\\:]+)\\s*=\\s*(['\"])((.|\n)*?)\\2","gm");
var attrsRegx = new RegExp('([^\\s=]+)\\s*(=\\s*([\'"])(.*?)\\3)?', 'g');

function buildAttributesMap(attrStr, options) {
    if (!options.ignoreAttributes && typeof attrStr === 'string') {
        attrStr = attrStr.replace(/\r?\n/g, ' ');
        // attrStr = attrStr || attrStr.trim();

        var matches = util.getAllMatches(attrStr, attrsRegx);
        var len = matches.length; // don't make it inline
        var attrs = {};
        for (let i = 0; i < len; i++) {
            var attrName = resolveNameSpace(matches[i][1], options);
            if (attrName.length) {
                if (matches[i][4] !== undefined) {
                    if (options.trimValues) {
                        matches[i][4] = matches[i][4].trim();
                    }
                    matches[i][4] = options.attrValueProcessor(matches[i][4]);
                    attrs[options.attributeNamePrefix + attrName] = parseValue(
                        matches[i][4],
                        options.parseAttributeValue,
                        options.parseTrueNumberOnly
                    );
                } else if (options.allowBooleanAttributes) {
                    attrs[options.attributeNamePrefix + attrName] = true;
                }
            }
        }
        if (!Object.keys(attrs).length) {
            return;
        }
        if (options.attrNodeName) {
            var attrCollection = {};
            attrCollection[options.attrNodeName] = attrs;
            return attrCollection;
        }
        return attrs;
    }
}

exports.getTraversalObj = getTraversalObj;
