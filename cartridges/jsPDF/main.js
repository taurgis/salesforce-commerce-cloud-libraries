var jsPDF = require('./jsPDF');
require('./plugins/addImage')(jsPDF.API);

module.exports = jsPDF;
