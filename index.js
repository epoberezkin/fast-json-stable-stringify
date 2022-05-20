'use strict';

var keyList = Object.keys;

var strEscapeSequencesRegExp = /[\u0000-\u001f\u0022\u005c\ud800-\udfff]|[\ud800-\udbff](?![\udc00-\udfff])|(?:[^\ud800-\udbff]|^)[\udc00-\udfff]/;
var strEscapeSequencesReplacer = /[\u0000-\u001f\u0022\u005c\ud800-\udfff]|[\ud800-\udbff](?![\udc00-\udfff])|(?:[^\ud800-\udbff]|^)[\udc00-\udfff]/g;
var meta = [
    '\\u0000', '\\u0001', '\\u0002', '\\u0003', '\\u0004',
    '\\u0005', '\\u0006', '\\u0007', '\\b', '\\t',
    '\\n', '\\u000b', '\\f', '\\r', '\\u000e',
    '\\u000f', '\\u0010', '\\u0011', '\\u0012', '\\u0013',
    '\\u0014', '\\u0015', '\\u0016', '\\u0017', '\\u0018',
    '\\u0019', '\\u001a', '\\u001b', '\\u001c', '\\u001d',
    '\\u001e', '\\u001f', '', '', '\\"',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '\\\\'
];

function esc_ (str) {
    if (str.length === 2)
        return str[0] + '\\u' + str.charCodeAt(1).toString(16);
    var charCode = str.charCodeAt(0);
    return meta.length > charCode
        ? meta[charCode]
        : '\\u' + charCode.toString(16);
}

function esc (str) {
    var point, last = 0, result = '';
    if (str.length < 5000 && !strEscapeSequencesRegExp.test(str)) return str;
    if (str.length > 100) return str.replace(strEscapeSequencesReplacer, esc_);
    for (var i = 0; i < str.length; i++) {
        point = str.charCodeAt(i);
        if (point === 34 || point === 92 || point < 32) {
            result += str.slice(last, i) + meta[point];
            last = i + 1;
        } else if (point >= 0xd800 && point <= 0xdfff) {
            if (point <= 0xdbff && i + 1 < str.length) {
                point = str.charCodeAt(i + 1);
                if (point >= 0xdc00 && point <= 0xdfff) {
                    i++;
                    continue;
                }
            }
            result += str.slice(last, i) + '\\u' + point.toString(16);
            last = i + 1;
        }
    }
    result += str.slice(last);
    return result;
}

function sort (array) {
    var length = array.length;
    if (length > 2e2) return array.sort();
    for (var i = 1; i < length; i++) {
        var currentValue = array[i];
        var position = i;
        while (position !== 0 && array[position - 1] > currentValue) {
            array[position] = array[position - 1];
            position--;
        }
        array[position] = currentValue;
    }
    return array;
}

function stringify(val) {
    var i, max, str, keys, key, propVal;
    switch (typeof val) {
    case 'string': return '"' + esc(val) + '"';
    case 'object':
        if (val instanceof Array) {
            str = '[';
            max = val.length - 1;
            for(i = 0; i < max; i++) str += stringify(val[i]) + ',';
            if (max >= 0) str += stringify(val[i]);
            return str + ']';
        }
        if (val === null) return 'null';
        keys = sort(keyList(val));
        max = keys.length;
        str = '{';
        i = 0;
        while (i < max) {
            key = keys[i];
            propVal = stringify(val[key]);
            if (i && str !== '') str += ',';
            str += '"' + esc(key) + '":' + propVal;
            i++;
        }
        return str + '}';
    default: return String(val);
    }
}

exports.stringify = stringify;
