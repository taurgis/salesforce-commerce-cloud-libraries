'use strict';

var initOptions = require('./lib/initOptions');
var pick = require('./lib/pickOne');
var natural = require('./natural');
var floating = require('./floating');
var pad = require('./lib/pad');
var colorNames = require('./lib/colorNames');
/**
 * Return a random color value.
 *
 * @param {Object} options - Possible options for color
 * @returns {string} - A random color value
 *
 * @example
 *      color({format: 'rgb'}) => 'rgb(110,52,164)'
 */
module.exports = function (options) {
    var colorOptions = initOptions(options, {
        format: pick([
            // TODO 'hex', --> max stack error in SFCC
            // TODO 'shorthex', --> full on crash in SFCC
            'rgb', 'rgba',
            // TODO '0x', full on crash in SFCC
            'name']),
        grayscale: false,
        casing: 'lower',
        min: 0,
        max: 255,
        min_red: undefined,
        max_red: undefined,
        min_green: undefined,
        max_green: undefined,
        min_blue: undefined,
        max_blue: undefined,
        min_alpha: 0,
        max_alpha: 1
    });

    var isGrayscale = colorOptions.grayscale;
    var minRgb = colorOptions.min;
    var maxRgb = colorOptions.max;
    var minRed = colorOptions.min_red;
    var maxRed = colorOptions.max_red;
    var minGreen = colorOptions.min_green;
    var maxGreen = colorOptions.max_green;
    var minBlue = colorOptions.min_blue;
    var maxBlue = colorOptions.max_blue;
    var minAlpha = colorOptions.min_alpha;
    var maxAlpha = colorOptions.max_alpha;
    if (colorOptions.min_red === undefined) { minRed = minRgb; }
    if (colorOptions.max_red === undefined) { maxRed = maxRgb; }
    if (colorOptions.min_green === undefined) { minGreen = minRgb; }
    if (colorOptions.max_green === undefined) { maxGreen = maxRgb; }
    if (colorOptions.min_blue === undefined) { minBlue = minRgb; }
    if (colorOptions.max_blue === undefined) { maxBlue = maxRgb; }
    if (colorOptions.min_alpha === undefined) { minAlpha = 0; }
    if (colorOptions.max_alpha === undefined) { maxAlpha = 1; }
    if (isGrayscale && minRgb === 0 && maxRgb === 255 && minRed !== undefined && maxRed !== undefined) {
        minRgb = ((minRed + minGreen + minBlue) / 3);
        maxRgb = ((maxRed + maxGreen + maxBlue) / 3);
    }

    /**
     * TODO: Add JSDOC
     * @param {string} value -
     * @param {string} delimiter -
     * @returns {string} -
     */
    function gray(value, delimiter) {
        return [value, value, value].join(delimiter || '');
    }

    /**
     * TODO: Add JSDOC
     * @param {boolean} hasAlpha -
     * @returns {string} -
     */
    function rgb(hasAlpha) {
        var rgbValue = (hasAlpha) ? 'rgba' : 'rgb';
        var alphaChannel = (hasAlpha) ? (',' + floating({ min: minAlpha, max: maxAlpha })) : '';
        var colorValue = (isGrayscale) ? (gray(natural({ min: minRgb, max: maxRgb }), ',')) : (natural({ min: minGreen, max: maxGreen }) + ',' + natural({ min: minBlue, max: maxBlue }) + ',' + natural({ max: 255 }));
        return rgbValue + '(' + colorValue + alphaChannel + ')';
    }

    /**
     * TODO: Add JSDOC
     * @param {string} start -
     * @param {string} end -
     * @param {boolean} withHash -
     * @returns {string} -
     */
    function hex(start, end, withHash) {
        var symbol = (withHash) ? '#' : '';
        var hexstring = '';

        if (isGrayscale) {
            hexstring = gray(pad(hex({ min: minRgb, max: maxRgb }), 2));
            if (colorOptions.format === 'shorthex') {
                hexstring = gray(hex({ min: 0, max: 15 }));
            }
        } else if (colorOptions.format === 'shorthex') {
            hexstring = pad(hex({ min: Math.floor(minRed / 16), max: Math.floor(maxRed / 16) }), 1) + pad(hex({ min: Math.floor(minGreen / 16), max: Math.floor(maxGreen / 16) }), 1) + pad(hex({ min: Math.floor(minBlue / 16), max: Math.floor(maxBlue / 16) }), 1);
        } else if (minRed !== undefined || maxRed !== undefined || minGreen !== undefined || maxGreen !== undefined || minBlue !== undefined || maxBlue !== undefined) {
            hexstring = pad(hex({ min: minRed, max: maxRed }), 2) + pad(hex({ min: minGreen, max: maxGreen }), 2) + pad(hex({ min: minBlue, max: maxBlue }), 2);
        } else {
            hexstring = pad(hex({ min: minRgb, max: maxRgb }), 2) + pad(hex({ min: minRgb, max: maxRgb }), 2) + pad(hex({ min: minRgb, max: maxRgb }), 2);
        }

        return symbol + hexstring;
    }

    var colorValue;

    if (colorOptions.format === 'hex') {
        colorValue = hex.call(this, 2, 6, true);
    } else if (colorOptions.format === 'shorthex') {
        colorValue = hex.call(this, 1, 3, true);
    } else if (colorOptions.format === 'rgb') {
        colorValue = rgb.call(this, false);
    } else if (colorOptions.format === 'rgba') {
        colorValue = rgb.call(this, true);
    } else if (colorOptions.format === '0x') {
        colorValue = '0x' + hex.call(this, 2, 6);
    } else if (colorOptions.format === 'name') {
        return pick(colorNames);
    } else {
        throw new RangeError('Invalid format provided. Please provide one of "hex", "shorthex", "rgb", "rgba", "0x" or "name".');
    }

    if (colorOptions.casing === 'upper') {
        colorValue = colorValue.toUpperCase();
    }

    return colorValue;
};
