'use strict';

var test = require('tape');
var stringify = require('../');

test('nested', function (t) {
    t.plan(1);
    var obj = { c: 8, b: [{z:6,y:5,x:4},7], a: 3 };
    t.equal(stringify(obj), '{"a":3,"b":[{"x":4,"y":5,"z":6},7],"c":8}');
});

test('cyclic (default)', function (t) {
    t.plan(1);
    var one = { a: 1 };
    var two = { a: 2, one: one };
    one.two = two;
    try {
        stringify(one);
    } catch (ex) {
        t.equal(ex.toString(), 'TypeError: Converting circular structure to JSON');
    }
});

test('cyclic (specifically allowed)', function (t) {
    t.plan(1);
    var one = { a: 1 };
    var two = { a: 2, one: one };
    one.two = two;
    t.equal(stringify(one, {cycles:true}), '{"a":1,"two":{"a":2,"one":"__cycle__"}}');
});

test('repeated non-cyclic value', function(t) {
    t.plan(1);
    var one = { x: 1 };
    var two = { a: one, b: one };
    t.equal(stringify(two), '{"a":{"x":1},"b":{"x":1}}');
});

test('acyclic but with reused obj-property pointers', function (t) {
    t.plan(1);
    var x = { a: 1 };
    var y = { b: x, c: x };
    t.equal(stringify(y), '{"b":{"a":1},"c":{"a":1}}');
});

test('cyclic array (default)', function (t) {
    t.plan(1);
    var array = [];
    array.push(array);
    t.throws(function () { stringify(array); }, TypeError);
});

test('cyclic array (specifically allowed)', function (t) {
    t.plan(1);
    var array = [];
    array.push(array);
    t.equal(stringify(array, {cycles:true}), '["__cycle__"]');
});

test('mutually cyclic arrays', function (t) {
    t.plan(2);
    var one = [];
    var two = [one];
    one.push(two);
    t.throws(function () { stringify(one); }, TypeError);
    t.equal(stringify(one, {cycles:true}), '[["__cycle__"]]');
});

test('array cycle through an object', function (t) {
    t.plan(1);
    var array = [];
    array.push({array:array});
    t.equal(stringify(array, {cycles:true}), '[{"array":"__cycle__"}]');
});

test('repeated non-cyclic arrays', function (t) {
    t.plan(2);
    var array = [1, {b:2, a:3}];
    var expected = '{"a":[1,{"a":3,"b":2}],"b":[1,{"a":3,"b":2}]}';
    t.equal(stringify({a:array, b:array}), expected);
    t.equal(stringify({a:array, b:array}, {cycles:true}), expected);
});
