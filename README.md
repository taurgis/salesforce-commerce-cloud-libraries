# JS Libraries for Salesforce Commerce Cloud B2C #

This repository contains libraries converted and tested to work with the latest version of Salesforce Commerce Cloud B2C (Formerly Demandware).

The libraries converted/tested here are to enhance the developer experience in the back-end and to speed up development.

Certain libraries don't work because of functions that are available in, for example, Node.JS but don't work in Salesforce Commerce Cloud because of slight differences in syntax or the unavailability of certain Objects.

With this project I hope to convert some of these libraries to work with Salesforce Commerce Cloud B2C.

**Converted libraries**

- Moment.js
- Lodash
- date-fns
- fast-xml-parser
- chance
- ramda
- jsPDF

## Setting up the libraries in your project ##

* Download and unpack repo content
* Copy the library folders in the "*cartridges*" to your project (this to get Intellisense since the "*require*" syntax is different from the official library in most cases.)
* Upload it to the dev boxes, demo, staging, development & production

> **Note**: You do not need to add the libraries to the cartridge path if you put them on the same level as the other cartridges.
>
> You can write code like this:
>
>```javascript
>  var first = require('lodash/first');
>
>  first([1, 2, 3]);
>````

## Converted libraries ##
First of all, I want to thank the creators of the libraries for all the work they have done. All I have done is rewrite the code to work with Salesforce Commerce Cloud B2C, in some cases new functions will be added to the repository that is not in the original. So the documentation will start to differentiate after some time.

> *I will not always be monitoring updates that happen to the original repositories, so pull requests are always happily accepted to keep this repository up to date with new features or new libraries!*
>
> **!!!** *Please note that not all scenario's have been tested and some functions may have not been converted fully. If you find any bugs, please report them with an example so we can see if it is possible to resolve.* **!!!**

_____

| Library | Repository | Version | Notes |
|-|-|-| -|
| Moment.js | https://github.com/moment/moment/ |  2.10.0 |  A lightweight JavaScript date library for parsing, validating, manipulating, and formatting dates.
| lodash | https://github.com/lodash/lodash | 5.0.0 | A modern JavaScript utility library delivering modularity, performance, & extras.
| date-fns | https://github.com/date-fns/date-fns | v2.0.0-beta.4 | date-fns provides the most comprehensive, yet simple and consistent toolset for manipulating JavaScript dates in a browser & Node.js.
| fast-xml-parser | https://github.com/NaturalIntelligence/fast-xml-parser | 3.12.16 | Validate XML or Parse XML to JS/JSON very fast without C/C++ based libraries
| chance | https://github.com/chancejs/chancejs | 1.1.0 | Utility library to generate anything random
| ramda | https://github.com/ramda/ramda | 0.26.1 | A practical functional library for JavaScript programmers.
| jsPDF | https://github.com/parallax/jsPDF | 1.5.3 | A library to generate PDFs in JavaScript.

### Example code ###

``` javascript
var moment = require('moment/moment');

moment('2010-10-18').isAfter('2010-10-19')
```

___


``` javascript
var camelCase = require('lodash/camelCase');
var capitalize =  require('lodash/capitalize');

camelCase('__FOO_BAR__TEST');
capitalize('fRED');
```
___

``` javascript
var addDays = require('date-fns/addDays');
var startOfYear = require('date-fns/startOfYear');

addDays(new Date(), 5);
startOfYear(new Date());
```
___

``` javascript
var parser = require('fast-xml-parser/parser');

var jsonObject = parser.parse('<note><to>Tove</to></note>');
```
___
``` javascript
var parser = require('chance/chance');

chance.guid();
```
___

``` javascript
var add = require('ramda/add');

add(4)(6)
```
___

``` javascript
    var jsPDF = require('jsPDF')

    var doc = new jsPDF()

    doc.setFontSize(25)
    doc.text(35, 5, 'Forward loves jsPDF')

    response.setContentType('application/pdf; charset=iso-8859-1');
    response.writer.print(doc.output())
```
# Linting
Currently the same setup is used as SFRA. You can run a linting test with:

```
 npm run lint
```

# Contributing
I am always looking for more interesting libraries that we could use in Commerce Cloud but require testing or need migration.

If you yourself are unable to convert a library and want met to have a look, feel free to mail me at thomas.theunen@forward.eu.

If you want to contribute code feel free to read the
[contributing](./CONTRIBUTING.md) readme.
