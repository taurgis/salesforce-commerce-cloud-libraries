'use strict';

var server = require('server');

/** Just an example controlle to test moment functions */
server.get('Test', function (req, res, next) {
    var doc = new jsPDF()

    doc.setFontSize(25)
    doc.text(35, 5, 'Forward loves jsPDF')
   // Filled square
    doc.rect(40, 20, 10, 10, 'F')
    
    // Empty red square
    doc.setDrawColor(255, 0, 0)
    doc.rect(60, 20, 10, 10)
    
    // Filled square with red borders
    doc.setDrawColor(255, 0, 0)
    doc.rect(80, 20, 10, 10, 'FD')
    
    // Filled red square
    doc.setDrawColor(0)
    doc.setFillColor(255, 0, 0)
    doc.rect(100, 20, 10, 10, 'F')
    
    // I know the proper spelling is colour ;)
    doc.setTextColor(100)
    doc.text(20, 120, 'This is gray.')
    
    doc.setTextColor(150)
    doc.text(20, 130, 'This is light gray.')
    
    doc.setTextColor(255, 0, 0)
    doc.text(20, 140, 'This is red.')
    
    doc.setTextColor(0, 255, 0)
    doc.text(20, 150, 'This is green.')
    
    doc.setTextColor(0, 0, 255)
    doc.text(20, 160, 'This is blue.')
    
    response.setContentType('application/pdf');

    response.writer.print(doc.output())
});

module.exports = server.exports();
