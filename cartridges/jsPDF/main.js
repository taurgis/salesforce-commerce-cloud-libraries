var jsPDF = require('./jsPDF');
require('./plugins/addImage')(jsPDF.API);
require('./plugins/total_pages')(jsPDF.API);
require('./plugins/javascript')(jsPDF.API);

module.exports = jsPDF;
