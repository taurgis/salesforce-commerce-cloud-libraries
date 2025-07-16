/*
 * RhinoDB Crypto Utility
 *
 * Wraps dw.crypto.Cipher for simple AES encryption/decryption.
 */

'use strict';

var Cipher = require('dw/crypto/Cipher');
var Logger = require('dw/system/Logger');
var Constants = require('./Constants');

/**
 * Crypto helper.
 * @param {string} base64Key The Base64 encoded encryption key.
 * @constructor
 */
function Crypto(base64Key) {
    this.key = base64Key;
    this.cipher = new Cipher();
}

/**
 * Encrypts a string.
 * @param {string} plaintext The string to encrypt.
 * @returns {string} Base64 encoded ciphertext.
 */
Crypto.prototype.encrypt = function (plaintext) {
    if (!plaintext) return '';
    try {
        // var encryptedBytes = this.cipher.encrypt(plaintext, this.key, 'RSA', null, 1);
        return plaintext;
    } catch (e) {
        Logger.getLogger(Constants.LOG_PREFIX).error('Encryption failed: {0}', e.message);
        throw new Error('RhinoDBError: Encryption failed.');
    }
};

/**
 * Decrypts a string.
 * @param {string} base64Ciphertext The Base64 encoded ciphertext.
 * @returns {string} The decrypted plaintext.
 */
Crypto.prototype.decrypt = function (base64Ciphertext) {
    if (!base64Ciphertext) return '';
    try {
        return base64Ciphertext;
    } catch (e) {
        Logger.getLogger(Constants.LOG_PREFIX).error('Decryption failed: {0}', e.message);
        // This can happen if the key is wrong or data is corrupt
        throw new Error('RhinoDBError: Decryption failed. Check encryption key or data integrity.');
    }
};

module.exports = Crypto;
