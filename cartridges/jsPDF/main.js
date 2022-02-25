var jsPDF = require('./jsPDF');

require('./plugins/addImage')(jsPDF.API);
require('./plugins/total_pages')(jsPDF.API);
require('./plugins/javascript')(jsPDF.API);
require('./plugins/autoprint')(jsPDF.API);
require('./plugins/viewerpreferences')(jsPDF.API);
require('./plugins/standard_fonts_metrics')(jsPDF.API);
require('./plugins/setlanguage')(jsPDF.API);
require('./plugins/annotations')(jsPDF.API);
require('./plugins/arabic')(jsPDF.API);
require('./plugins/cell')(jsPDF.API);

module.exports = jsPDF;
