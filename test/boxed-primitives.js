'use strict';

var test = require('tape');
var stringify = require('../');

test('boxed String is unwrapped like JSON.stringify', function (t) {
    t.plan(1);
    var obj = { a: new String('hello') };
    t.equal(stringify(obj), JSON.stringify(obj));
});

test('boxed Number is unwrapped like JSON.stringify', function (t) {
    t.plan(1);
    var obj = { a: new Number(5) };
    t.equal(stringify(obj), JSON.stringify(obj));
});

test('boxed Boolean true is unwrapped like JSON.stringify', function (t) {
    t.plan(1);
    var obj = { a: new Boolean(true) };
    t.equal(stringify(obj), JSON.stringify(obj));
});

test('boxed Boolean false is unwrapped like JSON.stringify', function (t) {
    t.plan(1);
    var obj = { a: new Boolean(false) };
    t.equal(stringify(obj), JSON.stringify(obj));
});

test('boxed primitives inside an array', function (t) {
    t.plan(1);
    var arr = [new String('x'), new Number(2), new Boolean(false)];
    t.equal(stringify(arr), JSON.stringify(arr));
});

test('boxed primitive at the top level', function (t) {
    t.plan(1);
    var value = new String('top-level');
    t.equal(stringify(value), JSON.stringify(value));
});
