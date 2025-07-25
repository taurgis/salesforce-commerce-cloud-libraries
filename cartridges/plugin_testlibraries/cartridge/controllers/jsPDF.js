'use strict';

var server = require('server');
var JSPDF = require('jsPDF');

/**
 * Encodes a string into a base64 string with an email-safe line width
 *
 * @param {string} str String the string to encode
 * @param {string} characterEncoding String the character encoding (i.e. 'ISO-8859-1')
 *
 * @return {string} The encoded string
 */
function encodeBase64ForEmail(str, characterEncoding) {
    var StringUtils = require('dw/util/StringUtils');
    var StringWriter = require('dw/io/StringWriter');
    var strBase64 = StringUtils.encodeBase64(str, characterEncoding);
    var strBase64LB = '';
    var stringWriter = new StringWriter();

    var offset = 0;
    var length = 76;

    while (offset < strBase64.length) {
        var maxOffset = offset + length;

        if (strBase64.length >= maxOffset) {
            stringWriter.write(strBase64, offset, length);
            stringWriter.write('\n');
        } else {
            stringWriter.write(strBase64, offset, length - (maxOffset - strBase64.length));
        }
        offset += length;
    }

    stringWriter.flush();
    strBase64LB = stringWriter.toString();
    stringWriter.close();

    return strBase64LB;
}

function generatePDF() {
    var jpg = 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABGAAD/4QMtaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OURFMTU0MDM4RUJEMTFFM0FEMkRCRERBRjBENkQwRjgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OURFMTU0MDQ4RUJEMTFFM0FEMkRCRERBRjBENkQwRjgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5REUxNTQwMThFQkQxMUUzQUQyREJEREFGMEQ2RDBGOCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5REUxNTQwMjhFQkQxMUUzQUQyREJEREFGMEQ2RDBGOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEAAQDAwMDAwQDAwQGBAMEBgcF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';

    var doc = new JSPDF();

    doc.setFontSize(25);
    doc.text(35, 10, 'Forward loves jsPDF');
    // Filled square
    doc.rect(40, 20, 10, 10, 'F');

    // Empty red square
    doc.setDrawColor(255, 0, 0);
    doc.rect(60, 20, 10, 10);

    // Filled square with red borders
    doc.setDrawColor(255, 0, 0);
    doc.rect(80, 20, 10, 10, 'FD');

    // Filled red square
    doc.setDrawColor(0);
    doc.setFillColor(255, 0, 0);
    doc.rect(100, 20, 10, 10, 'F');

    doc.setFont('Angin Senja', 'normal');
    // I know the proper spelling is colour ;)
    doc.setTextColor(100);
    doc.text(20, 120, 'This is gray.');

    doc.setTextColor(150);
    doc.text(20, 130, 'This is light gray.');

    doc.setTextColor(255, 0, 0);
    doc.text(20, 140, 'This is red.');

    doc.setFont('broc-webfont', 'normal');

    doc.setTextColor(0, 255, 0);
    doc.text(20, 150, 'This is green.');

    doc.setTextColor(0, 0, 255);
    doc.text(20, 160, 'This is blue.');

    doc.setFont('Open Sans', 'normal');

    doc.setTextColor('#fffff');
    doc.textWithLink('This is link.', 20, 175, { url: 'http://www.google.com' });

    doc.addImage(jpg, 'jpg', 100, 200, 280, 210, undefined, 'none');

    doc.addJS('app.alert("This is injected JS inside of the PDF.", 3);');

    doc.viewerPreferences({
        HideWindowUI: true,
        PrintArea: 'CropBox',
        NumCopies: 10
    });

    doc.setLanguage('nl-BE');

    doc.createAnnotation({
        type: 'text',
        title: 'note',
        bounds: {
            x: 10,
            y: 10,
            w: 200,
            h: 80
        },
        contents: 'This is text annotation (open by default)',
        open: true
    });
    return doc;
}

/**
 * Add files to the attributes to render the mail template.
 *
 * @param {dw.util.Map} mailAttributes - The mail attributes
 */
function addFilesToMailAttributes(mailAttributes) {
    var Map = require('dw/util/HashMap');
    var files = new Map();

    files.put('test.pdf', encodeBase64ForEmail(generatePDF().output(), 'ISO-8859-1'));

    mailAttributes.put('Base64FileMap', files);
}

/**
 * Just an example controller to test sending a mail with attachments
 */
server.get('Mail', function (req, res, next) {
    var Template = require('dw/util/Template');
    var Mail = require('dw/net/Mail');
    var Map = require('dw/util/HashMap');

    // Create the template that we will use to send the email.
    var template = new Template('mail/testMail.isml');

    // Work with a HashMap to pass the data to the template.
    var mailAttributes = new Map();
    mailAttributes.put('EmailMessage', 'Test Message');

    addFilesToMailAttributes(mailAttributes);

    var mail = new Mail();
    // Render the template with the data in the HashMap.
    var content = template.render(mailAttributes);

    mail.addTo('thomas.theunen@forward.eu');
    mail.setFrom('info@forward.eu');
    mail.setSubject('Example Email');
    mail.setContent(content);

    res.json({
        success: mail.send().message,
        content: content.getText()
    });

    next();
});

/** Just an example controller to test moment functions */
server.get('Test', function () {
    var doc = generatePDF();

    response.setContentType('application/pdf; charset=iso-8859-1');

    response.writer.print(doc.output());
});

module.exports = server.exports();
