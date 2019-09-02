var assert = require('assert');
var template = require('../../../cartridges/lodash/template');
var map = require('../../../cartridges/lodash/map');
var constant = require('../../../cartridges/lodash/constant');
var assign = require('../../../cartridges/lodash/assign');
var clone = require('../../../cartridges/lodash/clone');
var times = require('../../../cartridges/lodash/times');
var includes = require('../../../cartridges/lodash/includes');
var escape = require('../../../cartridges/lodash/escape');
var forOwn = require('../../../cartridges/lodash/forOwn');
var templateSettings = require('../../../cartridges/lodash/templateSettings');
var { stubString, stubTrue, stubFalse } = require('../helpers/stubs');
var numberTag = '[object Number]';

describe('template', function () {
    it('should escape values in "escape" delimiters', function () {
        var strings = ['<p><%- value %></p>', '<p><%-value%></p>', '<p><%-\nvalue\n%></p>'];
        var expected = map(strings, constant('<p>&amp;&lt;&gt;&quot;&#39;/</p>'));
        var data = { 'value': '&<>"\'/' };

        var actual = map(strings, function (string) {
            return template(string)(data);
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should not reference `_.escape` when "escape" delimiters are not used', function () {
        var compiled = template('<%= typeof __e %>');
        assert.strictEqual(compiled({}), 'undefined');
    });

    it('should evaluate JavaScript in "evaluate" delimiters', function () {
        var compiled = template(
            '<ul><% for (var key in collection) {    %><li><%= collection[key] %></li><%      } %></ul>'
        );

        var data = { 'collection': { 'a': 'A', 'b': 'B' } };
        var actual = compiled(data);

        assert.strictEqual(actual, '<ul><li>A</li><li>B</li></ul>');
    });

    it('should support "evaluate" delimiters with single line comments (test production builds)', function () {
        var compiled = template('<% // A code comment. %><% if (value) { %>yap<% } else { %>nope<% } %>');
        var data = { 'value': true };

        assert.strictEqual(compiled(data), 'yap');
    });

    it('should support referencing variables declared in "evaluate" delimiters from other delimiters', function () {
        var compiled = template('<% var b = a; %><%= b.value %>');
        var data = { 'a': { 'value': 1 } };

        assert.strictEqual(compiled(data), '1');
    });

    it('should interpolate data properties in "interpolate" delimiters', function () {
        var strings = ['<%= a %>BC', '<%=a%>BC', '<%=\na\n%>BC'];
        var expected = map(strings, constant('ABC'));
        var data = { 'a': 'A' };

        var actual = map(strings, function (string) {
            return template(string)(data);
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should support "interpolate" delimiters with escaped values', function () {
        var compiled = template('<%= a ? "a=\\"A\\"" : "" %>');
        var data = { 'a': true };

        assert.strictEqual(compiled(data), 'a="A"');
    });

    it('should support "interpolate" delimiters containing ternary operators', function () {
        var compiled = template('<%= value ? value : "b" %>');
        var data = { 'value': 'a' };

        assert.strictEqual(compiled(data), 'a');
    });

    it('should support "interpolate" delimiters containing global values', function () {
        var compiled = template('<%= typeof Math.abs %>');

        try {
            var actual = compiled();
        } catch (e) {
            // DO NOTHING
        }

        assert.strictEqual(actual, 'function');
    });

    it('should support complex "interpolate" delimiters', function () {
        forOwn({
            '<%= a + b %>': '3',
            '<%= b - a %>': '1',
            '<%= a = b %>': '2',
            '<%= !a %>': 'false',
            '<%= ~a %>': '-2',
            '<%= a * b %>': '2',
            '<%= a / b %>': '0.5',
            '<%= a % b %>': '1',
            '<%= a >> b %>': '0',
            '<%= a << b %>': '4',
            '<%= a & b %>': '0',
            '<%= a ^ b %>': '3',
            '<%= a | b %>': '3',
            '<%= {}.toString.call(0) %>': numberTag,
            '<%= a.toFixed(2) %>': '1.00',
            '<%= obj["a"] %>': '1',
            '<%= delete a %>': 'true',
            '<%= "a" in obj %>': 'true',
            '<%= obj instanceof Object %>': 'true',
            '<%= new Boolean %>': 'false',
            '<%= typeof a %>': 'number',
            '<%= void a %>': ''
        },
        function (value, key) {
            var compiled = template(key);
            var data = { 'a': 1, 'b': 2 };

            assert.strictEqual(compiled(data), value, key);
        });
    });

    it('should support ES6 template delimiters', function () {
        var data = { 'value': 2 };
        assert.strictEqual(template('1${value}3')(data), '123');
        assert.strictEqual(template('${"{" + value + "\\}"}')(data), '{2}');
    });

    it('should support the "imports" option', function () {
        var compiled = template('<%= a %>', { 'imports': { 'a': 1 } });
        assert.strictEqual(compiled({}), '1');
    });

    it('should support the "variable" options', function () {
        var compiled = template(
            '<% each( data.a, function( value ) { %>' +
          '<%= value.valueOf() %>' +
      '<% }) %>', { 'variable': 'data' }
        );

        var data = { 'a': [1, 2, 3] };

        try {
            assert.strictEqual(compiled(data), '123');
        } catch (e) {
            assert.ok(false, e.message);
        }
    });

    it('should support custom delimiters', function () {
        times(2, function (index) {
            var settingsClone = clone(templateSettings);

            var settings = assign(index ? templateSettings : {}, {
                'escape': /\{\{-([\s\S]+?)\}\}/g,
                'evaluate': /\{\{([\s\S]+?)\}\}/g,
                'interpolate': /\{\{=([\s\S]+?)\}\}/g
            });

            var expected = '<ul><li>0: a &amp; A</li><li>1: b &amp; B</li></ul>';
            var compiled = template('<ul>{{ each(collection, function(value, index) {}}<li>{{= index }}: {{- value }}</li>{{}); }}</ul>', index ? null : settings);
            var data = { 'collection': ['a & A', 'b & B'] };

            assert.strictEqual(compiled(data), expected);
            assign(templateSettings, settingsClone);
        });
    });

    it('should support custom delimiters containing special characters', function () {
        times(2, function (index) {
            var settingsClone = clone(templateSettings);

            var settings = assign(index ? templateSettings : {}, {
                'escape': /<\?-([\s\S]+?)\?>/g,
                'evaluate': /<\?([\s\S]+?)\?>/g,
                'interpolate': /<\?=([\s\S]+?)\?>/g
            });

            var expected = '<ul><li>0: a &amp; A</li><li>1: b &amp; B</li></ul>';
            var compiled = template('<ul><? each(collection, function(value, index) { ?><li><?= index ?>: <?- value ?></li><? }); ?></ul>', index ? null : settings);
            var data = { 'collection': ['a & A', 'b & B'] };

            assert.strictEqual(compiled(data), expected);
            assign(templateSettings, settingsClone);
        });
    });

    it('should use a `with` statement by default', function () {
        var compiled = template('<%= index %><%= collection[index] %><% each(collection, function(value, index) { %><%= index %><% }); %>');
        var actual = compiled({ 'index': 1, 'collection': ['a', 'b', 'c'] });

        assert.strictEqual(actual, '1b012');
    });

    it('should use `_.templateSettings.imports._.templateSettings`', function () {
        var lodash = templateSettings.imports._;
        var settingsClone = clone(lodash.templateSettings);

        lodash.templateSettings = assign(lodash.templateSettings, {
            'interpolate': /\{\{=([\s\S]+?)\}\}/g
        });

        var compiled = template('{{= a }}');
        assert.strictEqual(compiled({ 'a': 1 }), '1');

        if (settingsClone) {
            assign(lodash.templateSettings, settingsClone);
        } else {
            delete lodash.templateSettings;
        }
    });

    it('should fallback to `_.templateSettings`', function () {
        var lodash = templateSettings.imports._;
        var delimiter = templateSettings.interpolate;

        templateSettings.imports._ = { 'escape': escape };
        templateSettings.interpolate = /\{\{=([\s\S]+?)\}\}/g;

        var compiled = template('{{= a }}');
        assert.strictEqual(compiled({ 'a': 1 }), '1');

        templateSettings.imports._ = lodash;
        templateSettings.interpolate = delimiter;
    });

    it('should ignore `null` delimiters', function () {
        var delimiter = {
            'escape': /\{\{-([\s\S]+?)\}\}/g,
            'evaluate': /\{\{([\s\S]+?)\}\}/g,
            'interpolate': /\{\{=([\s\S]+?)\}\}/g
        };

        forOwn({
            'escape': '{{- a }}',
            'evaluate': '{{ print(a) }}',
            'interpolate': '{{= a }}'
        },
        function (value, key) {
            var settings = { 'escape': null, 'evaluate': null, 'interpolate': null };
            settings[key] = delimiter[key];

            var expected = '1 <%- a %> <% print(a) %> <%= a %>';
            var compiled = template(value + ' <%- a %> <% print(a) %> <%= a %>', settings);
            var data = { 'a': 1 };

            assert.strictEqual(compiled(data), expected);
        });
    });

    it('should work without delimiters', function () {
        var expected = 'abc';
        assert.strictEqual(template(expected)({}), expected);
    });

    it('should work with `this` references', function () {
        var compiled = template('a<%= this.String("b") %>c');
        assert.strictEqual(compiled(), 'abc');

        var object = { 'b': 'B' };
        object.compiled = template('A<%= this.b %>C', { 'variable': 'obj' });
        assert.strictEqual(object.compiled(), 'ABC');
    });

    it('should work with backslashes', function () {
        var compiled = template('<%= a %> \\b');
        var data = { 'a': 'A' };

        assert.strictEqual(compiled(data), 'A \\b');
    });

    it('should work with escaped characters in string literals', function () {
        var compiled = template('<% print("\'\\n\\r\\t\\u2028\\u2029\\\\") %>');
        assert.strictEqual(compiled(), "'\n\r\t\u2028\u2029\\");

        var data = { 'a': 'A' };
        compiled = template('\'\n\r\t<%= a %>\u2028\u2029\\"');
        assert.strictEqual(compiled(data), '\'\n\r\tA\u2028\u2029\\"');
    });

    it('should handle \\u2028 & \\u2029 characters', function () {
        var compiled = template('\u2028<%= "\\u2028\\u2029" %>\u2029');
        assert.strictEqual(compiled(), '\u2028\u2028\u2029\u2029');
    });

    it('should work with statements containing quotes', function () {
        var compiled = template("<%   if (a == 'A' || a == \"a\") {        %>'a',\"A\"<%      } %>");

        var data = { 'a': 'A' };
        assert.strictEqual(compiled(data), "'a',\"A\"");
    });

    it('should work with templates containing newlines and comments', function () {
        var compiled = template('<%\n      // A code comment.\n      if (value) { value += 3; }\n      %><p><%= value %></p>');

        assert.strictEqual(compiled({ 'value': 3 }), '<p>6</p>');
    });

    it('should tokenize delimiters', function () {
        var compiled = template('<span class="icon-<%= type %>2"></span>');
        var data = { 'type': 1 };

        assert.strictEqual(compiled(data), '<span class="icon-12"></span>');
    });

    it('should evaluate delimiters once', function () {
        var actual = [];
        var compiled = template('<%= func("a") %><%- func("b") %><% func("c") %>');
        var data = { 'func': function (value) { actual.push(value); } };

        compiled(data);
        assert.deepStrictEqual(actual, ['a', 'b', 'c']);
    });

    it('should match delimiters before escaping text', function () {
        var compiled = template('<<\n a \n>>', { 'evaluate': /<<(.*?)>>/g });
        assert.strictEqual(compiled(), '<<\n a \n>>');
    });

    it('should resolve nullish values to an empty string', function () {
        var compiled = template('<%= a %><%- a %>');
        var data = { 'a': null };

        assert.strictEqual(compiled(data), '');

        data = { 'a': undefined };
        assert.strictEqual(compiled(data), '');

        data = { 'a': {} };
        compiled = template('<%= a.b %><%- a.b %>');
        assert.strictEqual(compiled(data), '');
    });

    it('should return an empty string for empty values', function () {
        var values = [, null, undefined, ''];
        var expected = map(values, stubString);
        var data = { 'a': 1 };

        var actual = map(values, function (value, index) {
            var compiled = index ? template(value) : template();
            return compiled(data);
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should parse delimiters without newlines', function () {
        var expected = '<<\nprint("<p>" + (value ? "yes" : "no") + "</p>")\n>>';
        var compiled = template(expected, { 'evaluate': /<<(.+?)>>/g });
        var data = { 'value': true };

        assert.strictEqual(compiled(data), expected);
    });

    it('should coerce `text` to a string', function () {
        var object = { 'toString': constant('<%= a %>') };
        var data = { 'a': 1 };

        assert.strictEqual(template(object)(data), '1');
    });

    it('should not modify the `options` object', function () {
        var options = {};
        template('', options);
        assert.deepStrictEqual(options, {});
    });

    it('should not modify `_.templateSettings` when `options` are given', function () {
        var data = { 'a': 1 };

        assert.ok(!('a' in templateSettings));
        template('', {}, data);
        assert.ok(!('a' in templateSettings));

        delete templateSettings.a;
    });

    it('should not error for non-object `data` and `options` values', function () {
        template('')(1);
        assert.ok(true, '`data` value');

        template('', 1)(1);
        assert.ok(true, '`options` value');
    });

    it('should expose the source on compiled templates', function () {
        var compiled = template('x');
        var values = [String(compiled), compiled.source];
        var expected = map(values, stubTrue);

        var actual = map(values, function (value) {
            return includes(value, '__p');
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should expose the source on SyntaxErrors', function () {
        try {
            template('<% if x %>');
        } catch (e) {
            var source = e.source;
        }
        assert.ok(includes(source, '__p'));
    });

    it('should not include sourceURLs in the source', function () {
        var options = { 'sourceURL': '/a/b/c' };
        var compiled = template('x', options);
        var values = [compiled.source, undefined];

        try {
            template('<% if x %>', options);
        } catch (e) {
            values[1] = e.source;
        }
        var expected = map(values, stubFalse);

        var actual = map(values, function (value) {
            return includes(value, 'sourceURL');
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should work as an iteratee for methods like `_.map`', function () {
        var array = ['<%= a %>', '<%- b %>', '<% print(c) %>'];
        var compiles = map(array, template);
        var data = { 'a': 'one', 'b': '"two"', 'c': 'three' };

        var actual = map(compiles, function (compiled) {
            return compiled(data);
        });

        assert.deepStrictEqual(actual, ['one', '&quot;two&quot;', 'three']);
    });
});
