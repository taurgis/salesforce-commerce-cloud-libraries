/* eslint-disable no-param-reassign */
/**
 * jsPDF virtual FileSystem functionality
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */

 /**
 * Use the vFS to handle files
 * @param {Object} jsPDFAPI The jsPDF API
 *
 * @name vFS
 * @module
 */
  module.exports = function (jsPDFAPI) {
      'use strict';

      var initializeVFS = function (instance) {
          if (typeof instance === 'undefined') {
              return false;
          }

          if (typeof instance.vFS === 'undefined') {
              instance.vFS = {};
          }
          return true;
      };

    /**
    * Check if the file exists in the vFS
    *
    * @name existsFileInVFS
    * @function
    * @param {string} filename Possible filename in the vFS.
    * @returns {boolean} true if the file exists
    * @example
    * doc.existsFileInVFS("someFile.txt");
    */
      jsPDFAPI.existsFileInVFS = function (filename) {
          if (initializeVFS(this.internal)) {
              return typeof this.internal.vFS[filename] !== 'undefined';
          }
          return false;
      };

    /**
    * Add a file to the vFS
    *
    * @name addFileToVFS
    * @function
    * @param {string} filename The name of the file which should be added.
    * @param {string} filecontent The content of the file.
    * @returns {jsPDF} jsPDF
    * @example
    * doc.addFileToVFS("someFile.txt", "BADFACE1");
    */
      jsPDFAPI.addFileToVFS = function (filename, filecontent) {
          initializeVFS(this.internal);
          this.internal.vFS[filename] = filecontent;
          return this;
      };

    /**
    * Get the file from the vFS
    *
    * @name getFileFromVFS
    * @function
    * @param {string} filename The name of the file which gets requested.
    * @returns {string} the file as a string
    * @example
    * doc.getFileFromVFS("someFile.txt");
    */
      jsPDFAPI.getFileFromVFS = function (filename) {
          initializeVFS(this.internal);

          if (typeof this.internal.vFS[filename] !== 'undefined') {
              return this.internal.vFS[filename];
          }
          return null;
      };
  };
