# JS Libraries for Salesforce Commerce Cloud B2C #

This repository contains libraries converted and tested to work with the latest version of Salesforce Commerce Cloud B2C (Formerly Demandware).

The libraries converted/tested here are to enhance the developer experience in the back-end and to speed up development.

Certain libraries don't work because of functions that are available in, for example, Node.JS but don't work in Salesforce Commerce Cloud because of slight differences in syntax or the unavailability of certain Objects.

With this project I hope to convert some of these libraries to work with Salesforce Commerce Cloud B2C.

**Converted libraries**

- [Moment.js](#Moment.JS)
- [Lodash](#Lodash)
- [date-fns](#date-fns)
- [fast-xml-parser](#fast-xml-parser)

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

> I will not always be monitoring updates that happen to the original repositories, so pull requests are always happily accepted to keep this repository up to date with new features or new libraries!

### Moment.JS ###
A lightweight JavaScript date library for parsing, validating, manipulating, and formatting dates.

#### Original repository ####
 https://github.com/moment/moment/

#### Version converted ####
2.10.0

#### Conversion notes ####

The entire library is converted into one file and no separate files are available for functions like in Lodash or date-fns.

#### Example code ####

``` javascript
    var moment = require('moment/moment');

    moment('2010-10-18').isAfter('2010-10-19')
```

### Lodash ###
A modern JavaScript utility library delivering modularity, performance, & extras.

#### Original repository ####
https://github.com/lodash/lodash

#### Version converted ####
5.0.0

#### Conversion notes ####

Every function available in the library has it's own *require*. This makes it very performant and easy to use a simple function without having to *require* the entire library.

This library is not 100% converted as some functions behave differently and others are simply not possible within the Salesforce Commerce Cloud B2C environment (e.g. setTimout is not supported).

#### Example code ####

``` javascript
    var camelCase = require('lodash/camelCase');
    var capitalize =  require('lodash/capitalize');

    camelCase('__FOO_BAR__TEST');
    capitalize('fRED');
```

### date-fns ###
date-fns provides the most comprehensive, yet simple and consistent toolset for manipulating JavaScript dates in a browser & Node.js.

#### Original repository ####
https://github.com/date-fns/date-fns

#### Support the library ####
https://opencollective.com/date-fns

#### Version converted ####
v2.0.0-beta.4

#### Conversion notes ####

Every function available in the library has it's own *require*. This makes it very performant and easy to use a simple function without having to *require* the entire library.

This library was converted from the latest BETA release, so it may contain bugs. Feel free to make pull requests to keep this library up to date!

#### Example code ####

``` javascript
    var addDays = require('date-fns/addDays');
    var startOfYear = require('date-fns/startOfYear');

    addDays(new Date(), 5);
    startOfYear(new Date());
```

### fast-xml-parser ###
Validate XML or Parse XML to JS/JSON very fast without C/C++ based libraries

#### Original repository ####
https://github.com/NaturalIntelligence/fast-xml-parser

#### Version converted ####
3.12.16

#### Conversion notes ####

Basic tests have been performed to parse XML to a JSON object, more complex XML's could cause issues. So if you find any, please make a pull request to resolve this issue!

#### Example code ####

``` javascript
    var parser = require('fast-xml-parser/parser');

    var jsonObject = parser.parse('<note><to>Tove</to></note>');
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
