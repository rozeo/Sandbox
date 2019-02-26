window.addEventListener('load', function () {
    var nodelist = document.querySelectorAll('*[href]');
    Array.prototype.slice.call(nodelist, 0).forEach(function (e, i) {
        e.addEventListener('click', function (evt) {
            if (e.getAttribute('_blank') !== null) {
                window.open(e.getAttribute('href'), '_blank');
            } else {
                location.href = e.getAttribute('href');
            }
            return false;
        });
    });
});

Number.prototype.zeroFill = function (digits) { return String(this).zeroFill(digits); }
Number.prototype.spaceFill = function (digits) { return String(this).spaceFill(digits); }
Number.prototype.anyFill = function (digits, filler) { return String(this).anyFill(digits, filler); }

String.prototype.zeroFill = function (digits) {
    if (typeof digits === 'undefined') return this;

    var s = '';
    for (var i = 0; i < digits; i++) s += '0';
    return (s + this).slice(-digits);
}

String.prototype.spaceFill = function (digits) {
    if (typeof digits === 'undefined') return this;

    var s = '';
    for (var i = 0; i < digits; i++) s += ' ';
    return (s + this).slice(-digits);
}

String.prototype.anyFill = function (digits, filler) {
    if (typeof digits === 'undefined' || typeof fillter === 'undefined') return this;

    var s = '';
    for (var i = 0; i < digits; i++) s += filler;
    return (s + this).slice(-digits);
}

function build_qstring(arr) {
    if (typeof arr !== 'object') return '';

    var s = [];

    var keys = Object.keys(arr);

    for (var i in keys) {
        if (typeof keys[i] !== 'string') continue;
        s.push(encodeURIComponent(keys[i]) + '=' + encodeURIComponent(arr[keys[i]]));
    }
    return s.join('&');
}

// Object.prototype.getQueryStringWithMap = function () { return build_qstring(this); }

function build_timestamp(dt, str) {
    if (typeof dt.getFullYear === 'undefined') {
        return '';
    }

    // ex. 2000/09/01 01:02:03
    var map = {
        yyyy: dt.getFullYear(),                 // 2000
        yy: String(dt.getFullYear()).substr(2), // 00
        MM: dt.getMonth().zeroFill(2),          // 01
        M: dt.getMonth(),                       // 9
        dd: dt.getDate().zeroFill(2),           // 01
        d: dt.getDate(),                        // 1
        hh: dt.getHours().zeroFill(2),          // 01
        h: dt.getHours(),                       // 1
        mm: dt.getMinutes().zeroFill(2),        // 02
        m: dt.getMinutes(),                     // 2
        ss: dt.getSeconds().zeroFill(2),        // 03
        s: dt.getSeconds()                      // 3
    };

    for (var k in map) {
        str = str.replace(new RegExp(k), map[k]);
    }
    return str;
}

Date.prototype.getTimestamp = function (format) { return build_timestamp(this, format); }

var hex_table = '0123456789abcdef';
function rgb2hex(s_rgb) {
    if (typeof s_rgb === 'undefined') return '';

    var m = s_rgb.match(/(\d+),\s*(\d+),\s*(\d+)/);
    if (!m) return '';

    var r = parseInt(m[1]);
    var g = parseInt(m[2]);
    var b = parseInt(m[3]);

    return hex_table[Math.floor(r / 16)] + hex_table[r % 16] +
           hex_table[Math.floor(g / 16)] + hex_table[g % 16] +
           hex_table[Math.floor(b / 16)] + hex_table[b % 16];
}

function ExistsURLCheck(url, callback_map, optional_data) {
    var xhr = new XMLHttpRequest();
    var qstring = "";
    if (typeof optional_data !== 'undefined') {
        qstring = '?' + build_qstring(optional_data);
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE) {
            if (typeof callback_map[xhr.status] === 'function') {
                callback_map[xhr.status]();
            } else if (typeof callback_map.default === 'function') {
                callback_map.default();
            }
        }
    }

    xhr.open('HEAD', url + qstring, true);
    xhr.send(null);
}