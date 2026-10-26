'use strict';

var test = require('tape');
var stringify = require('../');

test('toJSON function', function (t) {
    t.plan(1);
    var obj = { one: 1, two: 2, toJSON: function() { return { one: 1 }; } };
    t.equal(stringify(obj), '{"one":1}' );
});

test('toJSON returns string', function (t) {
    t.plan(1);
    var obj = { one: 1, two: 2, toJSON: function() { return 'one'; } };
    t.equal(stringify(obj), '"one"');
});

test('toJSON returns array', function (t) {
    t.plan(1);
    var obj = { one: 1, two: 2, toJSON: function() { return ['one']; } };
    t.equal(stringify(obj), '["one"]');
});

test('toJSON receives the root and property keys', function (t) {
    t.plan(3);
    var obj = { toJSON: function (key) { return key; } };
    t.equal(stringify(obj), JSON.stringify(obj));
    t.equal(stringify({ item: obj }), JSON.stringify({ item: obj }));
    t.equal(stringify({ '': obj }), JSON.stringify({ '': obj }));
});

test('toJSON receives array indices as strings', function (t) {
    t.plan(1);
    var obj = { toJSON: function (key) { return typeof key + ':' + key; } };
    var array = [obj, obj];
    t.equal(stringify(array), JSON.stringify(array));
});

test('toJSON preserves its receiver in nested results', function (t) {
    t.plan(1);
    var child = {
        value: 'child',
        toJSON: function (key) { return key + ':' + this.value; }
    };
    var parent = { toJSON: function () { return { item: [child] }; } };
    t.equal(stringify(parent), JSON.stringify(parent));
});
