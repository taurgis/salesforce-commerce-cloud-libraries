var jsPDF = require('./jsPDF');

require('./plugins/addImage')(jsPDF.API);
require('./plugins/total_pages')(jsPDF.API);
require('./plugins/javascript')(jsPDF.API);
require('./plugins/autoprint')(jsPDF.API);
require('./plugins/viewerpreferences')(jsPDF.API);
require('./plugins/standard_fonts_metrics')(jsPDF.API);

module.exports = jsPDF;
