/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jshint esnext: true */

// -----------------------------------------------------------------------------

export default function createFormatCache(FormatConstructor) {
    var cache = {};

    return function (a, b, c) {
        var cacheId = getCacheId([a,b,c]);
        var format  = cacheId && cache[cacheId];

        if (!format) {
            format = new FormatConstructor(a, b, c);

            if (cacheId) {
                cache[cacheId] = format;
            }
        }

        return format;
    };
}

// -- Utilities ----------------------------------------------------------------

function getCacheId(inputs) {
    // When JSON is not available in the runtime, we will not create a cache id.
    if (typeof JSON === 'undefined') { return; }

    var cacheId = [];

    var i, len, input;

    for (i = 0; i < inputs.length; i++) {
        input = inputs[i];

        if (input && typeof input === 'object') {
            cacheId[i] = orderedProps(input);
        } else {
            cacheId[i] = input;
        }
    }

    return JSON.stringify(cacheId);
}

function orderedProps(obj) {
    var props = [],
        keys  = [];

    var key, i, len, prop;

    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            keys.push(key);
        }
    }

    var orderedKeys = keys.sort();

    for (i = 0, len = orderedKeys.length; i < len; i += 1) {
        key  = orderedKeys[i];
        prop = {};

        prop[key] = obj[key];
        props[i]  = prop;
    }

    return props;
}
