'use strict';

var test = require('tape');
var stringify = require('../').stringify;

test('simple object', function (t) {
    t.plan(1);
    var obj = { c: 6, b: [4,5], a: 3, z: null };
    t.equal(stringify(obj), '{"a":3,"b":[4,5],"c":6,"z":null}');
});

test('object with null', function (t) {
    t.plan(1);
    var obj = { a: 3, z: null };
    t.equal(stringify(obj), '{"a":3,"z":null}');
});

test('object with empty string', function (t) {
    t.plan(1);
    var obj = { a: 3, z: '' };
    t.equal(stringify(obj), '{"a":3,"z":""}');
});

test('array with empty string', function (t) {
    t.plan(1);
    var obj = [4, '', 6];
    t.equal(stringify(obj), '[4,"",6]');
});
