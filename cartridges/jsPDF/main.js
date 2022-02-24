var jsPDF = require('./jsPDF');
require('./plugins/addImage')(jsPDF.API);
require('./plugins/total_pages')(jsPDF.API);

module.exports = jsPDF;
