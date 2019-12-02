// Combined /shared/jslib/prototype1.7.js
var Prototype = {
    Version: "1.7",
    Browser: (function() {
        var b = navigator.userAgent;
        var a = Object.prototype.toString.call(window.opera) == "[object Opera]";
        return {
            IE: !!window.attachEvent && !a,
            Opera: a,
            WebKit: b.indexOf("AppleWebKit/") > -1,
            Gecko: b.indexOf("Gecko") > -1 && b.indexOf("KHTML") === -1,
            MobileSafari: /Apple.*Mobile/.test(b)
        }
    })(),
    BrowserFeatures: {
        XPath: !!document.evaluate,
        SelectorsAPI: !!document.querySelector,
        ElementExtensions: (function() {
            var a = window.Element || window.HTMLElement;
            return !!(a && a.prototype)
        })(),
        SpecificElementExtensions: (function() {
            if (typeof window.HTMLDivElement !== "undefined") {
                return true
            }
            var c = document.createElement("div"),
                b = document.createElement("form"),
                a = false;
            if (c.__proto__ && (c.__proto__ !== b.__proto__)) {
                a = true
            }
            c = b = null;
            return a
        })()
    },
    ScriptFragment: "<script[^>]*>([\\S\\s]*?)<\/script>",
    JSONFilter: /^\/\*-secure-([\s\S]*)\*\/\s*$/,
    emptyFunction: function() {},
    K: function(a) {
        return a
    }
};
if (Prototype.Browser.MobileSafari) {
    Prototype.BrowserFeatures.SpecificElementExtensions = false
}
var Abstract = {};
var Try = {
    these: function() {
        var c;
        for (var b = 0, d = arguments.length; b < d; b++) {
            var a = arguments[b];
            try {
                c = a();
                break
            } catch (f) {}
        }
        return c
    }
};
var Class = (function() {
    var d = (function() {
        for (var e in {
                toString: 1
            }) {
            if (e === "toString") {
                return false
            }
        }
        return true
    })();

    function a() {}

    function b() {
        var h = null,
            g = $A(arguments);
        if (Object.isFunction(g[0])) {
            h = g.shift()
        }

        function e() {
            this.initialize.apply(this, arguments)
        }
        Object.extend(e, Class.Methods);
        e.superclass = h;
        e.subclasses = [];
        if (h) {
            a.prototype = h.prototype;
            e.prototype = new a;
            h.subclasses.push(e)
        }
        for (var f = 0, j = g.length; f < j; f++) {
            e.addMethods(g[f])
        }
        if (!e.prototype.initialize) {
            e.prototype.initialize = Prototype.emptyFunction
        }
        e.prototype.constructor = e;
        return e
    }

    function c(l) {
        var g = this.superclass && this.superclass.prototype,
            f = Object.keys(l);
        if (d) {
            if (l.toString != Object.prototype.toString) {
                f.push("toString")
            }
            if (l.valueOf != Object.prototype.valueOf) {
                f.push("valueOf")
            }
        }
        for (var e = 0, h = f.length; e < h; e++) {
            var k = f[e],
                j = l[k];
            if (g && Object.isFunction(j) && j.argumentNames()[0] == "$super") {
                var m = j;
                j = (function(i) {
                    return function() {
                        return g[i].apply(this, arguments)
                    }
                })(k).wrap(m);
                j.valueOf = m.valueOf.bind(m);
                j.toString = m.toString.bind(m)
            }
            this.prototype[k] = j
        }
        return this
    }
    return {
        create: b,
        Methods: {
            addMethods: c
        }
    }
})();
(function() {
    var C = Object.prototype.toString,
        B = "Null",
        o = "Undefined",
        v = "Boolean",
        f = "Number",
        s = "String",
        H = "Object",
        t = "[object Function]",
        y = "[object Boolean]",
        g = "[object Number]",
        l = "[object String]",
        h = "[object Array]",
        x = "[object Date]",
        i = window.JSON && typeof JSON.stringify === "function" && JSON.stringify(0) === "0" && typeof JSON.stringify(Prototype.K) === "undefined";

    function k(J) {
        switch (J) {
            case null:
                return B;
            case (void 0):
                return o
        }
        var I = typeof J;
        switch (I) {
            case "boolean":
                return v;
            case "number":
                return f;
            case "string":
                return s
        }
        return H
    }

    function z(I, K) {
        for (var J in K) {
            I[J] = K[J]
        }
        return I
    }

    function G(I) {
        try {
            if (c(I)) {
                return "undefined"
            }
            if (I === null) {
                return "null"
            }
            return I.inspect ? I.inspect() : String(I)
        } catch (J) {
            if (J instanceof RangeError) {
                return "..."
            }
            throw J
        }
    }

    function D(I) {
        return F("", {
            "": I
        }, [])
    }

    function F(R, O, P) {
        var Q = O[R],
            N = typeof Q;
        if (k(Q) === H && typeof Q.toJSON === "function") {
            Q = Q.toJSON(R)
        }
        var K = C.call(Q);
        switch (K) {
            case g:
            case y:
            case l:
                Q = Q.valueOf()
        }
        switch (Q) {
            case null:
                return "null";
            case true:
                return "true";
            case false:
                return "false"
        }
        N = typeof Q;
        switch (N) {
            case "string":
                return Q.inspect(true);
            case "number":
                return isFinite(Q) ? String(Q) : "null";
            case "object":
                for (var J = 0, I = P.length; J < I; J++) {
                    if (P[J] === Q) {
                        throw new TypeError()
                    }
                }
                P.push(Q);
                var M = [];
                if (K === h) {
                    for (var J = 0, I = Q.length; J < I; J++) {
                        var L = F(J, Q, P);
                        M.push(typeof L === "undefined" ? "null" : L)
                    }
                    M = "[" + M.join(",") + "]"
                } else {
                    var S = Object.keys(Q);
                    for (var J = 0, I = S.length; J < I; J++) {
                        var R = S[J],
                            L = F(R, Q, P);
                        if (typeof L !== "undefined") {
                            M.push(R.inspect(true) + ":" + L)
                        }
                    }
                    M = "{" + M.join(",") + "}"
                }
                P.pop();
                return M
        }
    }

    function w(I) {
        return JSON.stringify(I)
    }

    function j(I) {
        return $H(I).toQueryString()
    }

    function p(I) {
        return I && I.toHTML ? I.toHTML() : String.interpret(I)
    }

    function r(I) {
        if (k(I) !== H) {
            throw new TypeError()
        }
        var J = [];
        for (var K in I) {
            if (I.hasOwnProperty(K)) {
                J.push(K)
            }
        }
        return J
    }

    function d(I) {
        var J = [];
        for (var K in I) {
            J.push(I[K])
        }
        return J
    }

    function A(I) {
        return z({}, I)
    }

    function u(I) {
        return !!(I && I.nodeType == 1)
    }

    function m(I) {
        return C.call(I) === h
    }
    var b = (typeof Array.isArray == "function") && Array.isArray([]) && !Array.isArray({});
    if (b) {
        m = Array.isArray
    }

    function e(I) {
        return I instanceof Hash
    }

    function a(I) {
        return C.call(I) === t
    }

    function n(I) {
        return C.call(I) === l
    }

    function q(I) {
        return C.call(I) === g
    }

    function E(I) {
        return C.call(I) === x
    }

    function c(I) {
        return typeof I === "undefined"
    }
    z(Object, {
        extend: z,
        inspect: G,
        toJSON: i ? w : D,
        toQueryString: j,
        toHTML: p,
        keys: Object.keys || r,
        values: d,
        clone: A,
        isElement: u,
        isArray: m,
        isHash: e,
        isFunction: a,
        isString: n,
        isNumber: q,
        isDate: E,
        isUndefined: c
    })
})();
Object.extend(Function.prototype, (function() {
    var k = Array.prototype.slice;

    function d(o, l) {
        var n = o.length,
            m = l.length;
        while (m--) {
            o[n + m] = l[m]
        }
        return o
    }

    function i(m, l) {
        m = k.call(m, 0);
        return d(m, l)
    }

    function g() {
        var l = this.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1].replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, "").replace(/\s+/g, "").split(",");
        return l.length == 1 && !l[0] ? [] : l
    }

    function h(n) {
        if (arguments.length < 2 && Object.isUndefined(arguments[0])) {
            return this
        }
        var l = this,
            m = k.call(arguments, 1);
        return function() {
            var o = i(m, arguments);
            return l.apply(n, o)
        }
    }

    function f(n) {
        var l = this,
            m = k.call(arguments, 1);
        return function(p) {
            var o = d([p || window.event], m);
            return l.apply(n, o)
        }
    }

    function j() {
        if (!arguments.length) {
            return this
        }
        var l = this,
            m = k.call(arguments, 0);
        return function() {
            var n = i(m, arguments);
            return l.apply(this, n)
        }
    }

    function e(n) {
        var l = this,
            m = k.call(arguments, 1);
        n = n * 1000;
        return window.setTimeout(function() {
            return l.apply(l, m)
        }, n)
    }

    function a() {
        var l = d([0.01], arguments);
        return this.delay.apply(this, l)
    }

    function c(m) {
        var l = this;
        return function() {
            var n = d([l.bind(this)], arguments);
            return m.apply(this, n)
        }
    }

    function b() {
        if (this._methodized) {
            return this._methodized
        }
        var l = this;
        return this._methodized = function() {
            var m = d([this], arguments);
            return l.apply(null, m)
        }
    }
    return {
        argumentNames: g,
        bind: h,
        bindAsEventListener: f,
        curry: j,
        delay: e,
        defer: a,
        wrap: c,
        methodize: b
    }
})());
(function(c) {
    function b() {
        return this.getUTCFullYear() + "-" + (this.getUTCMonth() + 1).toPaddedString(2) + "-" + this.getUTCDate().toPaddedString(2) + "T" + this.getUTCHours().toPaddedString(2) + ":" + this.getUTCMinutes().toPaddedString(2) + ":" + this.getUTCSeconds().toPaddedString(2) + "Z"
    }

    function a() {
        return this.toISOString()
    }
    if (!c.toISOString) {
        c.toISOString = b
    }
    if (!c.toJSON) {
        c.toJSON = a
    }
})(Date.prototype);
RegExp.prototype.match = RegExp.prototype.test;
RegExp.escape = function(a) {
    return String(a).replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1")
};
var PeriodicalExecuter = Class.create({
    initialize: function(b, a) {
        this.callback = b;
        this.frequency = a;
        this.currentlyExecuting = false;
        this.registerCallback()
    },
    registerCallback: function() {
        this.timer = setInterval(this.onTimerEvent.bind(this), this.frequency * 1000)
    },
    execute: function() {
        this.callback(this)
    },
    stop: function() {
        if (!this.timer) {
            return
        }
        clearInterval(this.timer);
        this.timer = null
    },
    onTimerEvent: function() {
        if (!this.currentlyExecuting) {
            try {
                this.currentlyExecuting = true;
                this.execute();
                this.currentlyExecuting = false
            } catch (a) {
                this.currentlyExecuting = false;
                throw a
            }
        }
    }
});
Object.extend(String, {
    interpret: function(a) {
        return a == null ? "" : String(a)
    },
    specialChar: {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        "\\": "\\\\"
    }
});
Object.extend(String.prototype, (function() {
    var NATIVE_JSON_PARSE_SUPPORT = window.JSON && typeof JSON.parse === "function" && JSON.parse('{"test": true}').test;

    function prepareReplacement(replacement) {
        if (Object.isFunction(replacement)) {
            return replacement
        }
        var template = new Template(replacement);
        return function(match) {
            return template.evaluate(match)
        }
    }

    function gsub(pattern, replacement) {
        var result = "",
            source = this,
            match;
        replacement = prepareReplacement(replacement);
        if (Object.isString(pattern)) {
            pattern = RegExp.escape(pattern)
        }
        if (!(pattern.length || pattern.source)) {
            replacement = replacement("");
            return replacement + source.split("").join(replacement) + replacement
        }
        while (source.length > 0) {
            if (match = source.match(pattern)) {
                result += source.slice(0, match.index);
                result += String.interpret(replacement(match));
                source = source.slice(match.index + match[0].length)
            } else {
                result += source, source = ""
            }
        }
        return result
    }

    function sub(pattern, replacement, count) {
        replacement = prepareReplacement(replacement);
        count = Object.isUndefined(count) ? 1 : count;
        return this.gsub(pattern, function(match) {
            if (--count < 0) {
                return match[0]
            }
            return replacement(match)
        })
    }

    function scan(pattern, iterator) {
        this.gsub(pattern, iterator);
        return String(this)
    }

    function truncate(length, truncation) {
        length = length || 30;
        truncation = Object.isUndefined(truncation) ? "..." : truncation;
        return this.length > length ? this.slice(0, length - truncation.length) + truncation : String(this)
    }

    function strip() {
        return this.replace(/^\s+/, "").replace(/\s+$/, "")
    }

    function stripTags() {
        return this.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, "")
    }

    function stripScripts() {
        return this.replace(new RegExp(Prototype.ScriptFragment, "img"), "")
    }

    function extractScripts() {
        var matchAll = new RegExp(Prototype.ScriptFragment, "img"),
            matchOne = new RegExp(Prototype.ScriptFragment, "im");
        return (this.match(matchAll) || []).map(function(scriptTag) {
            return (scriptTag.match(matchOne) || ["", ""])[1]
        })
    }

    function evalScripts() {
        return this.extractScripts().map(function(script) {
            return eval(script)
        })
    }

    function escapeHTML() {
        return this.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    }

    function unescapeHTML() {
        return this.stripTags().replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&")
    }

    function toQueryParams(separator) {
        var match = this.strip().match(/([^?#]*)(#.*)?$/);
        if (!match) {
            return {}
        }
        return match[1].split(separator || "&").inject({}, function(hash, pair) {
            if ((pair = pair.split("="))[0]) {
                var key = decodeURIComponent(pair.shift()),
                    value = pair.length > 1 ? pair.join("=") : pair[0];
                if (value != undefined) {
                    value = decodeURIComponent(value)
                }
                if (key in hash) {
                    if (!Object.isArray(hash[key])) {
                        hash[key] = [hash[key]]
                    }
                    hash[key].push(value)
                } else {
                    hash[key] = value
                }
            }
            return hash
        })
    }

    function toArray() {
        return this.split("")
    }

    function succ() {
        return this.slice(0, this.length - 1) + String.fromCharCode(this.charCodeAt(this.length - 1) + 1)
    }

    function times(count) {
        return count < 1 ? "" : new Array(count + 1).join(this)
    }

    function camelize() {
        return this.replace(/-+(.)?/g, function(match, chr) {
            return chr ? chr.toUpperCase() : ""
        })
    }

    function capitalize() {
        return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase()
    }

    function underscore() {
        return this.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/-/g, "_").toLowerCase()
    }

    function dasherize() {
        return this.replace(/_/g, "-")
    }

    function inspect(useDoubleQuotes) {
        var escapedString = this.replace(/[\x00-\x1f\\]/g, function(character) {
            if (character in String.specialChar) {
                return String.specialChar[character]
            }
            return "\\u00" + character.charCodeAt().toPaddedString(2, 16)
        });
        if (useDoubleQuotes) {
            return '"' + escapedString.replace(/"/g, '\\"') + '"'
        }
        return "'" + escapedString.replace(/'/g, "\\'") + "'"
    }

    function unfilterJSON(filter) {
        return this.replace(filter || Prototype.JSONFilter, "$1")
    }

    function isJSON() {
        var str = this;
        if (str.blank()) {
            return false
        }
        str = str.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@");
        str = str.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]");
        str = str.replace(/(?:^|:|,)(?:\s*\[)+/g, "");
        return (/^[\],:{}\s]*$/).test(str)
    }

    function evalJSON(sanitize) {
        var json = this.unfilterJSON(),
            cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        if (cx.test(json)) {
            json = json.replace(cx, function(a) {
                return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
            })
        }
        try {
            if (!sanitize || json.isJSON()) {
                return eval("(" + json + ")")
            }
        } catch (e) {}
        throw new SyntaxError("Badly formed JSON string: " + this.inspect())
    }

    function parseJSON() {
        var json = this.unfilterJSON();
        return JSON.parse(json)
    }

    function include(pattern) {
        return this.indexOf(pattern) > -1
    }

    function startsWith(pattern) {
        return this.lastIndexOf(pattern, 0) === 0
    }

    function endsWith(pattern) {
        var d = this.length - pattern.length;
        return d >= 0 && this.indexOf(pattern, d) === d
    }

    function empty() {
        return this == ""
    }

    function blank() {
        return /^\s*$/.test(this)
    }

    function interpolate(object, pattern) {
        return new Template(this, pattern).evaluate(object)
    }
    return {
        gsub: gsub,
        sub: sub,
        scan: scan,
        truncate: truncate,
        strip: String.prototype.trim || strip,
        stripTags: stripTags,
        stripScripts: stripScripts,
        extractScripts: extractScripts,
        evalScripts: evalScripts,
        escapeHTML: escapeHTML,
        unescapeHTML: unescapeHTML,
        toQueryParams: toQueryParams,
        parseQuery: toQueryParams,
        toArray: toArray,
        succ: succ,
        times: times,
        camelize: camelize,
        capitalize: capitalize,
        underscore: underscore,
        dasherize: dasherize,
        inspect: inspect,
        unfilterJSON: unfilterJSON,
        isJSON: isJSON,
        evalJSON: NATIVE_JSON_PARSE_SUPPORT ? parseJSON : evalJSON,
        include: include,
        startsWith: startsWith,
        endsWith: endsWith,
        empty: empty,
        blank: blank,
        interpolate: interpolate
    }
})());
var Template = Class.create({
    initialize: function(a, b) {
        this.template = a.toString();
        this.pattern = b || Template.Pattern
    },
    evaluate: function(a) {
        if (a && Object.isFunction(a.toTemplateReplacements)) {
            a = a.toTemplateReplacements()
        }
        return this.template.gsub(this.pattern, function(d) {
            if (a == null) {
                return (d[1] + "")
            }
            var f = d[1] || "";
            if (f == "\\") {
                return d[2]
            }
            var b = a,
                g = d[3],
                e = /^([^.[]+|\[((?:.*?[^\\])?)\])(\.|\[|$)/;
            d = e.exec(g);
            if (d == null) {
                return f
            }
            while (d != null) {
                var c = d[1].startsWith("[") ? d[2].replace(/\\\\]/g, "]") : d[1];
                b = b[c];
                if (null == b || "" == d[3]) {
                    break
                }
                g = g.substring("[" == d[3] ? d[1].length : d[0].length);
                d = e.exec(g)
            }
            return f + String.interpret(b)
        })
    }
});
Template.Pattern = /(^|.|\r|\n)(#\{(.*?)\})/;
var $break = {};
var Enumerable = (function() {
    function c(y, x) {
        var w = 0;
        try {
            this._each(function(A) {
                y.call(x, A, w++)
            })
        } catch (z) {
            if (z != $break) {
                throw z
            }
        }
        return this
    }

    function r(z, y, x) {
        var w = -z,
            A = [],
            B = this.toArray();
        if (z < 1) {
            return B
        }
        while ((w += z) < B.length) {
            A.push(B.slice(w, w + z))
        }
        return A.collect(y, x)
    }

    function b(y, x) {
        y = y || Prototype.K;
        var w = true;
        this.each(function(A, z) {
            w = w && !!y.call(x, A, z);
            if (!w) {
                throw $break
            }
        });
        return w
    }

    function i(y, x) {
        y = y || Prototype.K;
        var w = false;
        this.each(function(A, z) {
            if (w = !!y.call(x, A, z)) {
                throw $break
            }
        });
        return w
    }

    function j(y, x) {
        y = y || Prototype.K;
        var w = [];
        this.each(function(A, z) {
            w.push(y.call(x, A, z))
        });
        return w
    }

    function t(y, x) {
        var w;
        this.each(function(A, z) {
            if (y.call(x, A, z)) {
                w = A;
                throw $break
            }
        });
        return w
    }

    function h(y, x) {
        var w = [];
        this.each(function(A, z) {
            if (y.call(x, A, z)) {
                w.push(A)
            }
        });
        return w
    }

    function g(z, y, x) {
        y = y || Prototype.K;
        var w = [];
        if (Object.isString(z)) {
            z = new RegExp(RegExp.escape(z))
        }
        this.each(function(B, A) {
            if (z.match(B)) {
                w.push(y.call(x, B, A))
            }
        });
        return w
    }

    function a(w) {
        if (Object.isFunction(this.indexOf)) {
            if (this.indexOf(w) != -1) {
                return true
            }
        }
        var x = false;
        this.each(function(y) {
            if (y == w) {
                x = true;
                throw $break
            }
        });
        return x
    }

    function q(x, w) {
        w = Object.isUndefined(w) ? null : w;
        return this.eachSlice(x, function(y) {
            while (y.length < x) {
                y.push(w)
            }
            return y
        })
    }

    function l(w, y, x) {
        this.each(function(A, z) {
            w = y.call(x, w, A, z)
        });
        return w
    }

    function v(x) {
        var w = $A(arguments).slice(1);
        return this.map(function(y) {
            return y[x].apply(y, w)
        })
    }

    function p(y, x) {
        y = y || Prototype.K;
        var w;
        this.each(function(A, z) {
            A = y.call(x, A, z);
            if (w == null || A >= w) {
                w = A
            }
        });
        return w
    }

    function n(y, x) {
        y = y || Prototype.K;
        var w;
        this.each(function(A, z) {
            A = y.call(x, A, z);
            if (w == null || A < w) {
                w = A
            }
        });
        return w
    }

    function e(z, x) {
        z = z || Prototype.K;
        var y = [],
            w = [];
        this.each(function(B, A) {
            (z.call(x, B, A) ? y : w).push(B)
        });
        return [y, w]
    }

    function f(x) {
        var w = [];
        this.each(function(y) {
            w.push(y[x])
        });
        return w
    }

    function d(y, x) {
        var w = [];
        this.each(function(A, z) {
            if (!y.call(x, A, z)) {
                w.push(A)
            }
        });
        return w
    }

    function m(x, w) {
        return this.map(function(z, y) {
            return {
                value: z,
                criteria: x.call(w, z, y)
            }
        }).sort(function(B, A) {
            var z = B.criteria,
                y = A.criteria;
            return z < y ? -1 : z > y ? 1 : 0
        }).pluck("value")
    }

    function o() {
        return this.map()
    }

    function s() {
        var x = Prototype.K,
            w = $A(arguments);
        if (Object.isFunction(w.last())) {
            x = w.pop()
        }
        var y = [this].concat(w).map($A);
        return this.map(function(A, z) {
            return x(y.pluck(z))
        })
    }

    function k() {
        return this.toArray().length
    }

    function u() {
        return "#<Enumerable:" + this.toArray().inspect() + ">"
    }
    return {
        each: c,
        eachSlice: r,
        all: b,
        every: b,
        any: i,
        some: i,
        collect: j,
        map: j,
        detect: t,
        findAll: h,
        select: h,
        filter: h,
        grep: g,
        include: a,
        member: a,
        inGroupsOf: q,
        inject: l,
        invoke: v,
        max: p,
        min: n,
        partition: e,
        pluck: f,
        reject: d,
        sortBy: m,
        toArray: o,
        entries: o,
        zip: s,
        size: k,
        inspect: u,
        find: t
    }
})();

function $A(c) {
    if (!c) {
        return []
    }
    if ("toArray" in Object(c)) {
        return c.toArray()
    }
    var b = c.length || 0,
        a = new Array(b);
    while (b--) {
        a[b] = c[b]
    }
    return a
}

function $w(a) {
    if (!Object.isString(a)) {
        return []
    }
    a = a.strip();
    return a ? a.split(/\s+/) : []
}
Array.from = $A;
(function() {
    var r = Array.prototype,
        m = r.slice,
        o = r.forEach;

    function b(w, v) {
        for (var u = 0, x = this.length >>> 0; u < x; u++) {
            if (u in this) {
                w.call(v, this[u], u, this)
            }
        }
    }
    if (!o) {
        o = b
    }

    function l() {
        this.length = 0;
        return this
    }

    function d() {
        return this[0]
    }

    function g() {
        return this[this.length - 1]
    }

    function i() {
        return this.select(function(u) {
            return u != null
        })
    }

    function t() {
        return this.inject([], function(v, u) {
            if (Object.isArray(u)) {
                return v.concat(u.flatten())
            }
            v.push(u);
            return v
        })
    }

    function h() {
        var u = m.call(arguments, 0);
        return this.select(function(v) {
            return !u.include(v)
        })
    }

    function f(u) {
        return (u === false ? this.toArray() : this)._reverse()
    }

    function k(u) {
        return this.inject([], function(x, w, v) {
            if (0 == v || (u ? x.last() != w : !x.include(w))) {
                x.push(w)
            }
            return x
        })
    }

    function p(u) {
        return this.uniq().findAll(function(v) {
            return u.detect(function(w) {
                return v === w
            })
        })
    }

    function q() {
        return m.call(this, 0)
    }

    function j() {
        return this.length
    }

    function s() {
        return "[" + this.map(Object.inspect).join(", ") + "]"
    }

    function a(w, u) {
        u || (u = 0);
        var v = this.length;
        if (u < 0) {
            u = v + u
        }
        for (; u < v; u++) {
            if (this[u] === w) {
                return u
            }
        }
        return -1
    }

    function n(v, u) {
        u = isNaN(u) ? this.length : (u < 0 ? this.length + u : u) + 1;
        var w = this.slice(0, u).reverse().indexOf(v);
        return (w < 0) ? w : u - w - 1
    }

    function c() {
        var z = m.call(this, 0),
            x;
        for (var v = 0, w = arguments.length; v < w; v++) {
            x = arguments[v];
            if (Object.isArray(x) && !("callee" in x)) {
                for (var u = 0, y = x.length; u < y; u++) {
                    z.push(x[u])
                }
            } else {
                z.push(x)
            }
        }
        return z
    }
    Object.extend(r, Enumerable);
    if (!r._reverse) {
        r._reverse = r.reverse
    }
    Object.extend(r, {
        _each: o,
        clear: l,
        first: d,
        last: g,
        compact: i,
        flatten: t,
        without: h,
        reverse: f,
        uniq: k,
        intersect: p,
        clone: q,
        toArray: q,
        size: j,
        inspect: s
    });
    var e = (function() {
        return [].concat(arguments)[0][0] !== 1
    })(1, 2);
    if (e) {
        r.concat = c
    }
    if (!r.indexOf) {
        r.indexOf = a
    }
    if (!r.lastIndexOf) {
        r.lastIndexOf = n
    }
})();

function $H(a) {
    return new Hash(a)
}
var Hash = Class.create(Enumerable, (function() {
    function e(p) {
        this._object = Object.isHash(p) ? p.toObject() : Object.clone(p)
    }

    function f(q) {
        for (var p in this._object) {
            var r = this._object[p],
                s = [p, r];
            s.key = p;
            s.value = r;
            q(s)
        }
    }

    function j(p, q) {
        return this._object[p] = q
    }

    function c(p) {
        if (this._object[p] !== Object.prototype[p]) {
            return this._object[p]
        }
    }

    function m(p) {
        var q = this._object[p];
        delete this._object[p];
        return q
    }

    function o() {
        return Object.clone(this._object)
    }

    function n() {
        return this.pluck("key")
    }

    function l() {
        return this.pluck("value")
    }

    function g(q) {
        var p = this.detect(function(r) {
            return r.value === q
        });
        return p && p.key
    }

    function i(p) {
        return this.clone().update(p)
    }

    function d(p) {
        return new Hash(p).inject(this, function(q, r) {
            q.set(r.key, r.value);
            return q
        })
    }

    function b(p, q) {
        if (Object.isUndefined(q)) {
            return p
        }
        return p + "=" + encodeURIComponent(String.interpret(q))
    }

    function a() {
        return this.inject([], function(t, w) {
            var s = encodeURIComponent(w.key),
                q = w.value;
            if (q && typeof q == "object") {
                if (Object.isArray(q)) {
                    var v = [];
                    for (var r = 0, p = q.length, u; r < p; r++) {
                        u = q[r];
                        v.push(b(s, u))
                    }
                    return t.concat(v)
                }
            } else {
                t.push(b(s, q))
            }
            return t
        }).join("&")
    }

    function k() {
        return "#<Hash:{" + this.map(function(p) {
            return p.map(Object.inspect).join(": ")
        }).join(", ") + "}>"
    }

    function h() {
        return new Hash(this)
    }
    return {
        initialize: e,
        _each: f,
        set: j,
        get: c,
        unset: m,
        toObject: o,
        toTemplateReplacements: o,
        keys: n,
        values: l,
        index: g,
        merge: i,
        update: d,
        toQueryString: a,
        inspect: k,
        toJSON: o,
        clone: h
    }
})());
Hash.from = $H;
Object.extend(Number.prototype, (function() {
    function d() {
        return this.toPaddedString(2, 16)
    }

    function b() {
        return this + 1
    }

    function h(j, i) {
        $R(0, this, true).each(j, i);
        return this
    }

    function g(k, j) {
        var i = this.toString(j || 10);
        return "0".times(k - i.length) + i
    }

    function a() {
        return Math.abs(this)
    }

    function c() {
        return Math.round(this)
    }

    function e() {
        return Math.ceil(this)
    }

    function f() {
        return Math.floor(this)
    }
    return {
        toColorPart: d,
        succ: b,
        times: h,
        toPaddedString: g,
        abs: a,
        round: c,
        ceil: e,
        floor: f
    }
})());

function $R(c, a, b) {
    return new ObjectRange(c, a, b)
}
var ObjectRange = Class.create(Enumerable, (function() {
    function b(f, d, e) {
        this.start = f;
        this.end = d;
        this.exclusive = e
    }

    function c(d) {
        var e = this.start;
        while (this.include(e)) {
            d(e);
            e = e.succ()
        }
    }

    function a(d) {
        if (d < this.start) {
            return false
        }
        if (this.exclusive) {
            return d < this.end
        }
        return d <= this.end
    }
    return {
        initialize: b,
        _each: c,
        include: a
    }
})());
var Ajax = {
    getTransport: function() {
        return Try.these(function() {
            return new XMLHttpRequest()
        }, function() {
            return new ActiveXObject("Msxml2.XMLHTTP")
        }, function() {
            return new ActiveXObject("Microsoft.XMLHTTP")
        }) || false
    },
    activeRequestCount: 0
};
Ajax.Responders = {
    responders: [],
    _each: function(a) {
        this.responders._each(a)
    },
    register: function(a) {
        if (!this.include(a)) {
            this.responders.push(a)
        }
    },
    unregister: function(a) {
        this.responders = this.responders.without(a)
    },
    dispatch: function(d, b, c, a) {
        this.each(function(f) {
            if (Object.isFunction(f[d])) {
                try {
                    f[d].apply(f, [b, c, a])
                } catch (g) {}
            }
        })
    }
};
Object.extend(Ajax.Responders, Enumerable);
Ajax.Responders.register({
    onCreate: function() {
        Ajax.activeRequestCount++
    },
    onComplete: function() {
        Ajax.activeRequestCount--
    }
});
Ajax.Base = Class.create({
    initialize: function(a) {
        this.options = {
            method: "post",
            asynchronous: true,
            contentType: "application/x-www-form-urlencoded",
            encoding: "UTF-8",
            parameters: "",
            evalJSON: true,
            evalJS: true
        };
        Object.extend(this.options, a || {});
        this.options.method = this.options.method.toLowerCase();
        if (Object.isHash(this.options.parameters)) {
            this.options.parameters = this.options.parameters.toObject()
        }
    }
});
Ajax.Request = Class.create(Ajax.Base, {
    _complete: false,
    initialize: function($super, b, a) {
        $super(a);
        this.transport = Ajax.getTransport();
        this.request(b)
    },
    request: function(b) {
        this.url = b;
        this.method = this.options.method;
        var d = Object.isString(this.options.parameters) ? this.options.parameters : Object.toQueryString(this.options.parameters);
        if (!["get", "post"].include(this.method)) {
            d += (d ? "&" : "") + "_method=" + this.method;
            this.method = "post"
        }
        if (d && this.method === "get") {
            this.url += (this.url.include("?") ? "&" : "?") + d
        }
        this.parameters = d.toQueryParams();
        try {
            var a = new Ajax.Response(this);
            if (this.options.onCreate) {
                this.options.onCreate(a)
            }
            Ajax.Responders.dispatch("onCreate", this, a);
            this.transport.open(this.method.toUpperCase(), this.url, this.options.asynchronous);
            if (this.options.asynchronous) {
                this.respondToReadyState.bind(this).defer(1)
            }
            this.transport.onreadystatechange = this.onStateChange.bind(this);
            this.setRequestHeaders();
            this.body = this.method == "post" ? (this.options.postBody || d) : null;
            this.transport.send(this.body);
            if (!this.options.asynchronous && this.transport.overrideMimeType) {
                this.onStateChange()
            }
        } catch (c) {
            this.dispatchException(c)
        }
    },
    onStateChange: function() {
        var a = this.transport.readyState;
        if (a > 1 && !((a == 4) && this._complete)) {
            this.respondToReadyState(this.transport.readyState)
        }
    },
    setRequestHeaders: function() {
        var e = {
            "X-Requested-With": "XMLHttpRequest",
            "X-Prototype-Version": Prototype.Version,
            Accept: "text/javascript, text/html, application/xml, text/xml, */*"
        };
        if (this.method == "post") {
            e["Content-type"] = this.options.contentType + (this.options.encoding ? "; charset=" + this.options.encoding : "");
            if (this.transport.overrideMimeType && (navigator.userAgent.match(/Gecko\/(\d{4})/) || [0, 2005])[1] < 2005) {
                e.Connection = "close"
            }
        }
        if (typeof this.options.requestHeaders == "object") {
            var c = this.options.requestHeaders;
            if (Object.isFunction(c.push)) {
                for (var b = 0, d = c.length; b < d; b += 2) {
                    e[c[b]] = c[b + 1]
                }
            } else {
                $H(c).each(function(f) {
                    e[f.key] = f.value
                })
            }
        }
        for (var a in e) {
            this.transport.setRequestHeader(a, e[a])
        }
    },
    success: function() {
        var a = this.getStatus();
        return !a || (a >= 200 && a < 300) || a == 304
    },
    getStatus: function() {
        try {
            if (this.transport.status === 1223) {
                return 204
            }
            return this.transport.status || 0
        } catch (a) {
            return 0
        }
    },
    respondToReadyState: function(a) {
        var c = Ajax.Request.Events[a],
            b = new Ajax.Response(this);
        if (c == "Complete") {
            try {
                this._complete = true;
                (this.options["on" + b.status] || this.options["on" + (this.success() ? "Success" : "Failure")] || Prototype.emptyFunction)(b, b.headerJSON)
            } catch (d) {
                this.dispatchException(d)
            }
            var f = b.getHeader("Content-type");
            if (this.options.evalJS == "force" || (this.options.evalJS && this.isSameOrigin() && f && f.match(/^\s*(text|application)\/(x-)?(java|ecma)script(;.*)?\s*$/i))) {
                this.evalResponse()
            }
        }
        try {
            (this.options["on" + c] || Prototype.emptyFunction)(b, b.headerJSON);
            Ajax.Responders.dispatch("on" + c, this, b, b.headerJSON)
        } catch (d) {
            this.dispatchException(d)
        }
        if (c == "Complete") {
            this.transport.onreadystatechange = Prototype.emptyFunction
        }
    },
    isSameOrigin: function() {
        var a = this.url.match(/^\s*https?:\/\/[^\/]*/);
        return !a || (a[0] == "#{protocol}//#{domain}#{port}".interpolate({
            protocol: location.protocol,
            domain: document.domain,
            port: location.port ? ":" + location.port : ""
        }))
    },
    getHeader: function(a) {
        try {
            return this.transport.getResponseHeader(a) || null
        } catch (b) {
            return null
        }
    },
    evalResponse: function() {
        try {
            return eval((this.transport.responseText || "").unfilterJSON())
        } catch (e) {
            this.dispatchException(e)
        }
    },
    dispatchException: function(a) {
        (this.options.onException || Prototype.emptyFunction)(this, a);
        Ajax.Responders.dispatch("onException", this, a)
    }
});
Ajax.Request.Events = ["Uninitialized", "Loading", "Loaded", "Interactive", "Complete"];
Ajax.Response = Class.create({
    initialize: function(c) {
        this.request = c;
        var d = this.transport = c.transport,
            a = this.readyState = d.readyState;
        if ((a > 2 && !Prototype.Browser.IE) || a == 4) {
            this.status = this.getStatus();
            this.statusText = this.getStatusText();
            this.responseText = String.interpret(d.responseText);
            this.headerJSON = this._getHeaderJSON()
        }
        if (a == 4) {
            var b = d.responseXML;
            this.responseXML = Object.isUndefined(b) ? null : b;
            this.responseJSON = this._getResponseJSON()
        }
    },
    status: 0,
    statusText: "",
    getStatus: Ajax.Request.prototype.getStatus,
    getStatusText: function() {
        try {
            return this.transport.statusText || ""
        } catch (a) {
            return ""
        }
    },
    getHeader: Ajax.Request.prototype.getHeader,
    getAllHeaders: function() {
        try {
            return this.getAllResponseHeaders()
        } catch (a) {
            return null
        }
    },
    getResponseHeader: function(a) {
        return this.transport.getResponseHeader(a)
    },
    getAllResponseHeaders: function() {
        return this.transport.getAllResponseHeaders()
    },
    _getHeaderJSON: function() {
        var a = this.getHeader("X-JSON");
        if (!a) {
            return null
        }
        a = decodeURIComponent(escape(a));
        try {
            return a.evalJSON(this.request.options.sanitizeJSON || !this.request.isSameOrigin())
        } catch (b) {
            this.request.dispatchException(b)
        }
    },
    _getResponseJSON: function() {
        var a = this.request.options;
        if (!a.evalJSON || (a.evalJSON != "force" && !(this.getHeader("Content-type") || "").include("application/json")) || this.responseText.blank()) {
            return null
        }
        try {
            return this.responseText.evalJSON(a.sanitizeJSON || !this.request.isSameOrigin())
        } catch (b) {
            this.request.dispatchException(b)
        }
    }
});
Ajax.Updater = Class.create(Ajax.Request, {
    initialize: function($super, a, c, b) {
        this.container = {
            success: (a.success || a),
            failure: (a.failure || (a.success ? null : a))
        };
        b = Object.clone(b);
        var d = b.onComplete;
        b.onComplete = (function(e, f) {
            this.updateContent(e.responseText);
            if (Object.isFunction(d)) {
                d(e, f)
            }
        }).bind(this);
        $super(c, b)
    },
    updateContent: function(d) {
        var c = this.container[this.success() ? "success" : "failure"],
            a = this.options;
        if (!a.evalScripts) {
            d = d.stripScripts()
        }
        if (c = $(c)) {
            if (a.insertion) {
                if (Object.isString(a.insertion)) {
                    var b = {};
                    b[a.insertion] = d;
                    c.insert(b)
                } else {
                    a.insertion(c, d)
                }
            } else {
                c.update(d)
            }
        }
    }
});
Ajax.PeriodicalUpdater = Class.create(Ajax.Base, {
    initialize: function($super, a, c, b) {
        $super(b);
        this.onComplete = this.options.onComplete;
        this.frequency = (this.options.frequency || 2);
        this.decay = (this.options.decay || 1);
        this.updater = {};
        this.container = a;
        this.url = c;
        this.start()
    },
    start: function() {
        this.options.onComplete = this.updateComplete.bind(this);
        this.onTimerEvent()
    },
    stop: function() {
        this.updater.options.onComplete = undefined;
        clearTimeout(this.timer);
        (this.onComplete || Prototype.emptyFunction).apply(this, arguments)
    },
    updateComplete: function(a) {
        if (this.options.decay) {
            this.decay = (a.responseText == this.lastText ? this.decay * this.options.decay : 1);
            this.lastText = a.responseText
        }
        this.timer = this.onTimerEvent.bind(this).delay(this.decay * this.frequency)
    },
    onTimerEvent: function() {
        this.updater = new Ajax.Updater(this.container, this.url, this.options)
    }
});

function $(b) {
    if (arguments.length > 1) {
        for (var a = 0, d = [], c = arguments.length; a < c; a++) {
            d.push($(arguments[a]))
        }
        return d
    }
    if (Object.isString(b)) {
        b = document.getElementById(b)
    }
    return Element.extend(b)
}
if (Prototype.BrowserFeatures.XPath) {
    document._getElementsByXPath = function(f, a) {
        var c = [];
        var e = document.evaluate(f, $(a) || document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var b = 0, d = e.snapshotLength; b < d; b++) {
            c.push(Element.extend(e.snapshotItem(b)))
        }
        return c
    }
}
if (!Node) {
    var Node = {}
}
if (!Node.ELEMENT_NODE) {
    Object.extend(Node, {
        ELEMENT_NODE: 1,
        ATTRIBUTE_NODE: 2,
        TEXT_NODE: 3,
        CDATA_SECTION_NODE: 4,
        ENTITY_REFERENCE_NODE: 5,
        ENTITY_NODE: 6,
        PROCESSING_INSTRUCTION_NODE: 7,
        COMMENT_NODE: 8,
        DOCUMENT_NODE: 9,
        DOCUMENT_TYPE_NODE: 10,
        DOCUMENT_FRAGMENT_NODE: 11,
        NOTATION_NODE: 12
    })
}(function(c) {
    function d(f, e) {
        if (f === "select") {
            return false
        }
        if ("type" in e) {
            return false
        }
        return true
    }
    var b = (function() {
        try {
            var e = document.createElement('<input name="x">');
            return e.tagName.toLowerCase() === "input" && e.name === "x"
        } catch (f) {
            return false
        }
    })();
    var a = c.Element;
    c.Element = function(g, f) {
        f = f || {};
        g = g.toLowerCase();
        var e = Element.cache;
        if (b && f.name) {
            g = "<" + g + ' name="' + f.name + '">';
            delete f.name;
            return Element.writeAttribute(document.createElement(g), f)
        }
        if (!e[g]) {
            e[g] = Element.extend(document.createElement(g))
        }
        var h = d(g, f) ? e[g].cloneNode(false) : document.createElement(g);
        return Element.writeAttribute(h, f)
    };
    Object.extend(c.Element, a || {});
    if (a) {
        c.Element.prototype = a.prototype
    }
})(this);
Element.idCounter = 1;
Element.cache = {};
Element._purgeElement = function(b) {
    var a = b._prototypeUID;
    if (a) {
        Element.stopObserving(b);
        b._prototypeUID = void 0;
        delete Element.Storage[a]
    }
};
Element.Methods = {
    visible: function(a) {
        return $(a).style.display != "none"
    },
    toggle: function(a) {
        a = $(a);
        Element[Element.visible(a) ? "hide" : "show"](a);
        return a
    },
    hide: function(a) {
        a = $(a);
        a.style.display = "none";
        return a
    },
    show: function(a) {
        a = $(a);
        a.style.display = "";
        return a
    },
    remove: function(a) {
        a = $(a);
        a.parentNode.removeChild(a);
        return a
    },
    update: (function() {
        var d = (function() {
            var g = document.createElement("select"),
                h = true;
            g.innerHTML = '<option value="test">test</option>';
            if (g.options && g.options[0]) {
                h = g.options[0].nodeName.toUpperCase() !== "OPTION"
            }
            g = null;
            return h
        })();
        var b = (function() {
            try {
                var g = document.createElement("table");
                if (g && g.tBodies) {
                    g.innerHTML = "<tbody><tr><td>test</td></tr></tbody>";
                    var i = typeof g.tBodies[0] == "undefined";
                    g = null;
                    return i
                }
            } catch (h) {
                return true
            }
        })();
        var a = (function() {
            try {
                var g = document.createElement("div");
                g.innerHTML = "<link>";
                var i = (g.childNodes.length === 0);
                g = null;
                return i
            } catch (h) {
                return true
            }
        })();
        var c = d || b || a;
        var f = (function() {
            var g = document.createElement("script"),
                i = false;
            try {
                g.appendChild(document.createTextNode(""));
                i = !g.firstChild || g.firstChild && g.firstChild.nodeType !== 3
            } catch (h) {
                i = true
            }
            g = null;
            return i
        })();

        function e(l, m) {
            l = $(l);
            var g = Element._purgeElement;
            var n = l.getElementsByTagName("*"),
                k = n.length;
            while (k--) {
                g(n[k])
            }
            if (m && m.toElement) {
                m = m.toElement()
            }
            if (Object.isElement(m)) {
                return l.update().insert(m)
            }
            m = Object.toHTML(m);
            var j = l.tagName.toUpperCase();
            if (j === "SCRIPT" && f) {
                l.text = m;
                return l
            }
            if (c) {
                if (j in Element._insertionTranslations.tags) {
                    while (l.firstChild) {
                        l.removeChild(l.firstChild)
                    }
                    Element._getContentFromAnonymousElement(j, m.stripScripts()).each(function(i) {
                        l.appendChild(i)
                    })
                } else {
                    if (a && Object.isString(m) && m.indexOf("<link") > -1) {
                        while (l.firstChild) {
                            l.removeChild(l.firstChild)
                        }
                        var h = Element._getContentFromAnonymousElement(j, m.stripScripts(), true);
                        h.each(function(i) {
                            l.appendChild(i)
                        })
                    } else {
                        l.innerHTML = m.stripScripts()
                    }
                }
            } else {
                l.innerHTML = m.stripScripts()
            }
            m.evalScripts.bind(m).defer();
            return l
        }
        return e
    })(),
    replace: function(b, c) {
        b = $(b);
        if (c && c.toElement) {
            c = c.toElement()
        } else {
            if (!Object.isElement(c)) {
                c = Object.toHTML(c);
                var a = b.ownerDocument.createRange();
                a.selectNode(b);
                c.evalScripts.bind(c).defer();
                c = a.createContextualFragment(c.stripScripts())
            }
        }
        b.parentNode.replaceChild(c, b);
        return b
    },
    insert: function(c, e) {
        c = $(c);
        if (Object.isString(e) || Object.isNumber(e) || Object.isElement(e) || (e && (e.toElement || e.toHTML))) {
            e = {
                bottom: e
            }
        }
        var d, f, b, g;
        for (var a in e) {
            d = e[a];
            a = a.toLowerCase();
            f = Element._insertionTranslations[a];
            if (d && d.toElement) {
                d = d.toElement()
            }
            if (Object.isElement(d)) {
                f(c, d);
                continue
            }
            d = Object.toHTML(d);
            b = ((a == "before" || a == "after") ? c.parentNode : c).tagName.toUpperCase();
            g = Element._getContentFromAnonymousElement(b, d.stripScripts());
            if (a == "top" || a == "after") {
                g.reverse()
            }
            g.each(f.curry(c));
            d.evalScripts.bind(d).defer()
        }
        return c
    },
    wrap: function(b, c, a) {
        b = $(b);
        if (Object.isElement(c)) {
            $(c).writeAttribute(a || {})
        } else {
            if (Object.isString(c)) {
                c = new Element(c, a)
            } else {
                c = new Element("div", c)
            }
        }
        if (b.parentNode) {
            b.parentNode.replaceChild(c, b)
        }
        c.appendChild(b);
        return c
    },
    inspect: function(b) {
        b = $(b);
        var a = "<" + b.tagName.toLowerCase();
        $H({
            id: "id",
            className: "class"
        }).each(function(f) {
            var e = f.first(),
                c = f.last(),
                d = (b[e] || "").toString();
            if (d) {
                a += " " + c + "=" + d.inspect(true)
            }
        });
        return a + ">"
    },
    recursivelyCollect: function(a, c, d) {
        a = $(a);
        d = d || -1;
        var b = [];
        while (a = a[c]) {
            if (a.nodeType == 1) {
                b.push(Element.extend(a))
            }
            if (b.length == d) {
                break
            }
        }
        return b
    },
    ancestors: function(a) {
        return Element.recursivelyCollect(a, "parentNode")
    },
    descendants: function(a) {
        return Element.select(a, "*")
    },
    firstDescendant: function(a) {
        a = $(a).firstChild;
        while (a && a.nodeType != 1) {
            a = a.nextSibling
        }
        return $(a)
    },
    immediateDescendants: function(b) {
        var a = [],
            c = $(b).firstChild;
        while (c) {
            if (c.nodeType === 1) {
                a.push(Element.extend(c))
            }
            c = c.nextSibling
        }
        return a
    },
    previousSiblings: function(a, b) {
        return Element.recursivelyCollect(a, "previousSibling")
    },
    nextSiblings: function(a) {
        return Element.recursivelyCollect(a, "nextSibling")
    },
    siblings: function(a) {
        a = $(a);
        return Element.previousSiblings(a).reverse().concat(Element.nextSiblings(a))
    },
    match: function(b, a) {
        b = $(b);
        if (Object.isString(a)) {
            return Prototype.Selector.match(b, a)
        }
        return a.match(b)
    },
    up: function(b, d, a) {
        b = $(b);
        if (arguments.length == 1) {
            return $(b.parentNode)
        }
        var c = Element.ancestors(b);
        return Object.isNumber(d) ? c[d] : Prototype.Selector.find(c, d, a)
    },
    down: function(b, c, a) {
        b = $(b);
        if (arguments.length == 1) {
            return Element.firstDescendant(b)
        }
        return Object.isNumber(c) ? Element.descendants(b)[c] : Element.select(b, c)[a || 0]
    },
    previous: function(b, c, a) {
        b = $(b);
        if (Object.isNumber(c)) {
            a = c, c = false
        }
        if (!Object.isNumber(a)) {
            a = 0
        }
        if (c) {
            return Prototype.Selector.find(b.previousSiblings(), c, a)
        } else {
            return b.recursivelyCollect("previousSibling", a + 1)[a]
        }
    },
    next: function(b, d, a) {
        b = $(b);
        if (Object.isNumber(d)) {
            a = d, d = false
        }
        if (!Object.isNumber(a)) {
            a = 0
        }
        if (d) {
            return Prototype.Selector.find(b.nextSiblings(), d, a)
        } else {
            var c = Object.isNumber(a) ? a + 1 : 1;
            return b.recursivelyCollect("nextSibling", a + 1)[a]
        }
    },
    select: function(a) {
        a = $(a);
        var b = Array.prototype.slice.call(arguments, 1).join(", ");
        return Prototype.Selector.select(b, a)
    },
    adjacent: function(a) {
        a = $(a);
        var b = Array.prototype.slice.call(arguments, 1).join(", ");
        return Prototype.Selector.select(b, a.parentNode).without(a)
    },
    identify: function(a) {
        a = $(a);
        var b = Element.readAttribute(a, "id");
        if (b) {
            return b
        }
        do {
            b = "anonymous_element_" + Element.idCounter++
        } while ($(b));
        Element.writeAttribute(a, "id", b);
        return b
    },
    readAttribute: function(c, a) {
        c = $(c);
        if (Prototype.Browser.IE) {
            var b = Element._attributeTranslations.read;
            if (b.values[a]) {
                return b.values[a](c, a)
            }
            if (b.names[a]) {
                a = b.names[a]
            }
            if (a.include(":")) {
                return (!c.attributes || !c.attributes[a]) ? null : c.attributes[a].value
            }
        }
        return c.getAttribute(a)
    },
    writeAttribute: function(e, c, f) {
        e = $(e);
        var b = {},
            d = Element._attributeTranslations.write;
        if (typeof c == "object") {
            b = c
        } else {
            b[c] = Object.isUndefined(f) ? true : f
        }
        for (var a in b) {
            c = d.names[a] || a;
            f = b[a];
            if (d.values[a]) {
                c = d.values[a](e, f)
            }
            if (f === false || f === null) {
                e.removeAttribute(c)
            } else {
                if (f === true) {
                    e.setAttribute(c, c)
                } else {
                    e.setAttribute(c, f)
                }
            }
        }
        return e
    },
    getHeight: function(a) {
        return Element.getDimensions(a).height
    },
    getWidth: function(a) {
        return Element.getDimensions(a).width
    },
    classNames: function(a) {
        return new Element.ClassNames(a)
    },
    hasClassName: function(a, b) {
        if (!(a = $(a))) {
            return
        }
        var c = a.className;
        return (c.length > 0 && (c == b || new RegExp("(^|\\s)" + b + "(\\s|$)").test(c)))
    },
    addClassName: function(a, b) {
        if (!(a = $(a))) {
            return
        }
        if (!Element.hasClassName(a, b)) {
            a.className += (a.className ? " " : "") + b
        }
        return a
    },
    removeClassName: function(a, b) {
        if (!(a = $(a))) {
            return
        }
        a.className = a.className.replace(new RegExp("(^|\\s+)" + b + "(\\s+|$)"), " ").strip();
        return a
    },
    toggleClassName: function(a, b) {
        if (!(a = $(a))) {
            return
        }
        return Element[Element.hasClassName(a, b) ? "removeClassName" : "addClassName"](a, b)
    },
    cleanWhitespace: function(b) {
        b = $(b);
        var c = b.firstChild;
        while (c) {
            var a = c.nextSibling;
            if (c.nodeType == 3 && !/\S/.test(c.nodeValue)) {
                b.removeChild(c)
            }
            c = a
        }
        return b
    },
    empty: function(a) {
        return $(a).innerHTML.blank()
    },
    descendantOf: function(b, a) {
        b = $(b), a = $(a);
        if (b.compareDocumentPosition) {
            return (b.compareDocumentPosition(a) & 8) === 8
        }
        if (a.contains) {
            return a.contains(b) && a !== b
        }
        while (b = b.parentNode) {
            if (b == a) {
                return true
            }
        }
        return false
    },
    scrollTo: function(a) {
        a = $(a);
        var b = Element.cumulativeOffset(a);
        window.scrollTo(b[0], b[1]);
        return a
    },
    getStyle: function(b, c) {
        b = $(b);
        c = c == "float" ? "cssFloat" : c.camelize();
        var d = b.style[c];
        if (!d || d == "auto") {
            var a = document.defaultView.getComputedStyle(b, null);
            d = a ? a[c] : null
        }
        if (c == "opacity") {
            return d ? parseFloat(d) : 1
        }
        return d == "auto" ? null : d
    },
    getOpacity: function(a) {
        return $(a).getStyle("opacity")
    },
    setStyle: function(b, c) {
        b = $(b);
        var e = b.style,
            a;
        if (Object.isString(c)) {
            b.style.cssText += ";" + c;
            return c.include("opacity") ? b.setOpacity(c.match(/opacity:\s*(\d?\.?\d*)/)[1]) : b
        }
        for (var d in c) {
            if (d == "opacity") {
                b.setOpacity(c[d])
            } else {
                e[(d == "float" || d == "cssFloat") ? (Object.isUndefined(e.styleFloat) ? "cssFloat" : "styleFloat") : d] = c[d]
            }
        }
        return b
    },
    setOpacity: function(a, b) {
        a = $(a);
        a.style.opacity = (b == 1 || b === "") ? "" : (b < 0.00001) ? 0 : b;
        return a
    },
    makePositioned: function(a) {
        a = $(a);
        var b = Element.getStyle(a, "position");
        if (b == "static" || !b) {
            a._madePositioned = true;
            a.style.position = "relative";
            if (Prototype.Browser.Opera) {
                a.style.top = 0;
                a.style.left = 0
            }
        }
        return a
    },
    undoPositioned: function(a) {
        a = $(a);
        if (a._madePositioned) {
            a._madePositioned = undefined;
            a.style.position = a.style.top = a.style.left = a.style.bottom = a.style.right = ""
        }
        return a
    },
    makeClipping: function(a) {
        a = $(a);
        if (a._overflow) {
            return a
        }
        a._overflow = Element.getStyle(a, "overflow") || "auto";
        if (a._overflow !== "hidden") {
            a.style.overflow = "hidden"
        }
        return a
    },
    undoClipping: function(a) {
        a = $(a);
        if (!a._overflow) {
            return a
        }
        a.style.overflow = a._overflow == "auto" ? "" : a._overflow;
        a._overflow = null;
        return a
    },
    clonePosition: function(b, d) {
        var a = Object.extend({
            setLeft: true,
            setTop: true,
            setWidth: true,
            setHeight: true,
            offsetTop: 0,
            offsetLeft: 0
        }, arguments[2] || {});
        d = $(d);
        var e = Element.viewportOffset(d),
            f = [0, 0],
            c = null;
        b = $(b);
        if (Element.getStyle(b, "position") == "absolute") {
            c = Element.getOffsetParent(b);
            f = Element.viewportOffset(c)
        }
        if (c == document.body) {
            f[0] -= document.body.offsetLeft;
            f[1] -= document.body.offsetTop
        }
        if (a.setLeft) {
            b.style.left = (e[0] - f[0] + a.offsetLeft) + "px"
        }
        if (a.setTop) {
            b.style.top = (e[1] - f[1] + a.offsetTop) + "px"
        }
        if (a.setWidth) {
            b.style.width = d.offsetWidth + "px"
        }
        if (a.setHeight) {
            b.style.height = d.offsetHeight + "px"
        }
        return b
    }
};
Object.extend(Element.Methods, {
    getElementsBySelector: Element.Methods.select,
    childElements: Element.Methods.immediateDescendants
});
Element._attributeTranslations = {
    write: {
        names: {
            className: "class",
            htmlFor: "for"
        },
        values: {}
    }
};
if (Prototype.Browser.Opera) {
    Element.Methods.getStyle = Element.Methods.getStyle.wrap(function(d, b, c) {
        switch (c) {
            case "height":
            case "width":
                if (!Element.visible(b)) {
                    return null
                }
                var e = parseInt(d(b, c), 10);
                if (e !== b["offset" + c.capitalize()]) {
                    return e + "px"
                }
                var a;
                if (c === "height") {
                    a = ["border-top-width", "padding-top", "padding-bottom", "border-bottom-width"]
                } else {
                    a = ["border-left-width", "padding-left", "padding-right", "border-right-width"]
                }
                return a.inject(e, function(f, g) {
                    var h = d(b, g);
                    return h === null ? f : f - parseInt(h, 10)
                }) + "px";
            default:
                return d(b, c)
        }
    });
    Element.Methods.readAttribute = Element.Methods.readAttribute.wrap(function(c, a, b) {
        if (b === "title") {
            return a.title
        }
        return c(a, b)
    })
} else {
    if (Prototype.Browser.IE) {
        Element.Methods.getStyle = function(a, b) {
            a = $(a);
            b = (b == "float" || b == "cssFloat") ? "styleFloat" : b.camelize();
            var c = a.style[b];
            if (!c && a.currentStyle) {
                c = a.currentStyle[b]
            }
            if (b == "opacity") {
                if (c = (a.getStyle("filter") || "").match(/alpha\(opacity=(.*)\)/)) {
                    if (c[1]) {
                        return parseFloat(c[1]) / 100
                    }
                }
                return 1
            }
            if (c == "auto") {
                if ((b == "width" || b == "height") && (a.getStyle("display") != "none")) {
                    return a["offset" + b.capitalize()] + "px"
                }
                return null
            }
            return c
        };
        Element.Methods.setOpacity = function(b, e) {
            function f(g) {
                return g.replace(/alpha\([^\)]*\)/gi, "")
            }
            b = $(b);
            var a = b.currentStyle;
            if ((a && !a.hasLayout) || (!a && b.style.zoom == "normal")) {
                b.style.zoom = 1
            }
            var d = b.getStyle("filter"),
                c = b.style;
            if (e == 1 || e === "") {
                (d = f(d)) ? c.filter = d: c.removeAttribute("filter");
                return b
            } else {
                if (e < 0.00001) {
                    e = 0
                }
            }
            c.filter = f(d) + "alpha(opacity=" + (e * 100) + ")";
            return b
        };
        Element._attributeTranslations = (function() {
            var b = "className",
                a = "for",
                c = document.createElement("div");
            c.setAttribute(b, "x");
            if (c.className !== "x") {
                c.setAttribute("class", "x");
                if (c.className === "x") {
                    b = "class"
                }
            }
            c = null;
            c = document.createElement("label");
            c.setAttribute(a, "x");
            if (c.htmlFor !== "x") {
                c.setAttribute("htmlFor", "x");
                if (c.htmlFor === "x") {
                    a = "htmlFor"
                }
            }
            c = null;
            return {
                read: {
                    names: {
                        "class": b,
                        className: b,
                        "for": a,
                        htmlFor: a
                    },
                    values: {
                        _getAttr: function(d, e) {
                            return d.getAttribute(e)
                        },
                        _getAttr2: function(d, e) {
                            return d.getAttribute(e, 2)
                        },
                        _getAttrNode: function(d, f) {
                            var e = d.getAttributeNode(f);
                            return e ? e.value : ""
                        },
                        _getEv: (function() {
                            var d = document.createElement("div"),
                                g;
                            d.onclick = Prototype.emptyFunction;
                            var e = d.getAttribute("onclick");
                            if (String(e).indexOf("{") > -1) {
                                g = function(f, h) {
                                    h = f.getAttribute(h);
                                    if (!h) {
                                        return null
                                    }
                                    h = h.toString();
                                    h = h.split("{")[1];
                                    h = h.split("}")[0];
                                    return h.strip()
                                }
                            } else {
                                if (e === "") {
                                    g = function(f, h) {
                                        h = f.getAttribute(h);
                                        if (!h) {
                                            return null
                                        }
                                        return h.strip()
                                    }
                                }
                            }
                            d = null;
                            return g
                        })(),
                        _flag: function(d, e) {
                            return $(d).hasAttribute(e) ? e : null
                        },
                        style: function(d) {
                            return d.style.cssText.toLowerCase()
                        },
                        title: function(d) {
                            return d.title
                        }
                    }
                }
            }
        })();
        Element._attributeTranslations.write = {
            names: Object.extend({
                cellpadding: "cellPadding",
                cellspacing: "cellSpacing"
            }, Element._attributeTranslations.read.names),
            values: {
                checked: function(a, b) {
                    a.checked = !!b
                },
                style: function(a, b) {
                    a.style.cssText = b ? b : ""
                }
            }
        };
        Element._attributeTranslations.has = {};
        $w("colSpan rowSpan vAlign dateTime accessKey tabIndex encType maxLength readOnly longDesc frameBorder").each(function(a) {
            Element._attributeTranslations.write.names[a.toLowerCase()] = a;
            Element._attributeTranslations.has[a.toLowerCase()] = a
        });
        (function(a) {
            Object.extend(a, {
                href: a._getAttr2,
                src: a._getAttr2,
                type: a._getAttr,
                action: a._getAttrNode,
                disabled: a._flag,
                checked: a._flag,
                readonly: a._flag,
                multiple: a._flag,
                onload: a._getEv,
                onunload: a._getEv,
                onclick: a._getEv,
                ondblclick: a._getEv,
                onmousedown: a._getEv,
                onmouseup: a._getEv,
                onmouseover: a._getEv,
                onmousemove: a._getEv,
                onmouseout: a._getEv,
                onfocus: a._getEv,
                onblur: a._getEv,
                onkeypress: a._getEv,
                onkeydown: a._getEv,
                onkeyup: a._getEv,
                onsubmit: a._getEv,
                onreset: a._getEv,
                onselect: a._getEv,
                onchange: a._getEv
            })
        })(Element._attributeTranslations.read.values);
        if (Prototype.BrowserFeatures.ElementExtensions) {
            (function() {
                function a(e) {
                    var b = e.getElementsByTagName("*"),
                        d = [];
                    for (var c = 0, f; f = b[c]; c++) {
                        if (f.tagName !== "!") {
                            d.push(f)
                        }
                    }
                    return d
                }
                Element.Methods.down = function(c, d, b) {
                    c = $(c);
                    if (arguments.length == 1) {
                        return c.firstDescendant()
                    }
                    return Object.isNumber(d) ? a(c)[d] : Element.select(c, d)[b || 0]
                }
            })()
        }
    } else {
        if (Prototype.Browser.Gecko && /rv:1\.8\.0/.test(navigator.userAgent)) {
            Element.Methods.setOpacity = function(a, b) {
                a = $(a);
                a.style.opacity = (b == 1) ? 0.999999 : (b === "") ? "" : (b < 0.00001) ? 0 : b;
                return a
            }
        } else {
            if (Prototype.Browser.WebKit) {
                Element.Methods.setOpacity = function(a, b) {
                    a = $(a);
                    a.style.opacity = (b == 1 || b === "") ? "" : (b < 0.00001) ? 0 : b;
                    if (b == 1) {
                        if (a.tagName.toUpperCase() == "IMG" && a.width) {
                            a.width++;
                            a.width--
                        } else {
                            try {
                                var d = document.createTextNode(" ");
                                a.appendChild(d);
                                a.removeChild(d)
                            } catch (c) {}
                        }
                    }
                    return a
                }
            }
        }
    }
}
if ("outerHTML" in document.documentElement) {
    Element.Methods.replace = function(c, e) {
        c = $(c);
        if (e && e.toElement) {
            e = e.toElement()
        }
        if (Object.isElement(e)) {
            c.parentNode.replaceChild(e, c);
            return c
        }
        e = Object.toHTML(e);
        var d = c.parentNode,
            b = d.tagName.toUpperCase();
        if (Element._insertionTranslations.tags[b]) {
            var f = c.next(),
                a = Element._getContentFromAnonymousElement(b, e.stripScripts());
            d.removeChild(c);
            if (f) {
                a.each(function(g) {
                    d.insertBefore(g, f)
                })
            } else {
                a.each(function(g) {
                    d.appendChild(g)
                })
            }
        } else {
            c.outerHTML = e.stripScripts()
        }
        e.evalScripts.bind(e).defer();
        return c
    }
}
Element._returnOffset = function(b, c) {
    var a = [b, c];
    a.left = b;
    a.top = c;
    return a
};
Element._getContentFromAnonymousElement = function(e, d, f) {
    var g = new Element("div"),
        c = Element._insertionTranslations.tags[e];
    var a = false;
    if (c) {
        a = true
    } else {
        if (f) {
            a = true;
            c = ["", "", 0]
        }
    }
    if (a) {
        g.innerHTML = "&nbsp;" + c[0] + d + c[1];
        g.removeChild(g.firstChild);
        for (var b = c[2]; b--;) {
            g = g.firstChild
        }
    } else {
        g.innerHTML = d
    }
    return $A(g.childNodes)
};
Element._insertionTranslations = {
    before: function(a, b) {
        a.parentNode.insertBefore(b, a)
    },
    top: function(a, b) {
        a.insertBefore(b, a.firstChild)
    },
    bottom: function(a, b) {
        a.appendChild(b)
    },
    after: function(a, b) {
        a.parentNode.insertBefore(b, a.nextSibling)
    },
    tags: {
        TABLE: ["<table>", "</table>", 1],
        TBODY: ["<table><tbody>", "</tbody></table>", 2],
        TR: ["<table><tbody><tr>", "</tr></tbody></table>", 3],
        TD: ["<table><tbody><tr><td>", "</td></tr></tbody></table>", 4],
        SELECT: ["<select>", "</select>", 1]
    }
};
(function() {
    var a = Element._insertionTranslations.tags;
    Object.extend(a, {
        THEAD: a.TBODY,
        TFOOT: a.TBODY,
        TH: a.TD
    })
})();
Element.Methods.Simulated = {
    hasAttribute: function(a, c) {
        c = Element._attributeTranslations.has[c] || c;
        var b = $(a).getAttributeNode(c);
        return !!(b && b.specified)
    }
};
Element.Methods.ByTag = {};
Object.extend(Element, Element.Methods);
(function(a) {
    if (!Prototype.BrowserFeatures.ElementExtensions && a.__proto__) {
        window.HTMLElement = {};
        window.HTMLElement.prototype = a.__proto__;
        Prototype.BrowserFeatures.ElementExtensions = true
    }
    a = null
})(document.createElement("div"));
Element.extend = (function() {
    function c(g) {
        if (typeof window.Element != "undefined") {
            var i = window.Element.prototype;
            if (i) {
                var k = "_" + (Math.random() + "").slice(2),
                    h = document.createElement(g);
                i[k] = "x";
                var j = (h[k] !== "x");
                delete i[k];
                h = null;
                return j
            }
        }
        return false
    }

    function b(h, g) {
        for (var j in g) {
            var i = g[j];
            if (Object.isFunction(i) && !(j in h)) {
                h[j] = i.methodize()
            }
        }
    }
    var d = c("object");
    if (Prototype.BrowserFeatures.SpecificElementExtensions) {
        if (d) {
            return function(h) {
                if (h && typeof h._extendedByPrototype == "undefined") {
                    var g = h.tagName;
                    if (g && (/^(?:object|applet|embed)$/i.test(g))) {
                        b(h, Element.Methods);
                        b(h, Element.Methods.Simulated);
                        b(h, Element.Methods.ByTag[g.toUpperCase()])
                    }
                }
                return h
            }
        }
        return Prototype.K
    }
    var a = {},
        e = Element.Methods.ByTag;
    var f = Object.extend(function(i) {
        if (!i || typeof i._extendedByPrototype != "undefined" || i.nodeType != 1 || i == window) {
            return i
        }
        var g = Object.clone(a),
            h = i.tagName.toUpperCase();
        if (e[h]) {
            Object.extend(g, e[h])
        }
        b(i, g);
        i._extendedByPrototype = Prototype.emptyFunction;
        return i
    }, {
        refresh: function() {
            if (!Prototype.BrowserFeatures.ElementExtensions) {
                Object.extend(a, Element.Methods);
                Object.extend(a, Element.Methods.Simulated)
            }
        }
    });
    f.refresh();
    return f
})();
if (document.documentElement.hasAttribute) {
    Element.hasAttribute = function(a, b) {
        return a.hasAttribute(b)
    }
} else {
    Element.hasAttribute = Element.Methods.Simulated.hasAttribute
}
Element.addMethods = function(c) {
    var i = Prototype.BrowserFeatures,
        d = Element.Methods.ByTag;
    if (!c) {
        Object.extend(Form, Form.Methods);
        Object.extend(Form.Element, Form.Element.Methods);
        Object.extend(Element.Methods.ByTag, {
            FORM: Object.clone(Form.Methods),
            INPUT: Object.clone(Form.Element.Methods),
            SELECT: Object.clone(Form.Element.Methods),
            TEXTAREA: Object.clone(Form.Element.Methods),
            BUTTON: Object.clone(Form.Element.Methods)
        })
    }
    if (arguments.length == 2) {
        var b = c;
        c = arguments[1]
    }
    if (!b) {
        Object.extend(Element.Methods, c || {})
    } else {
        if (Object.isArray(b)) {
            b.each(g)
        } else {
            g(b)
        }
    }

    function g(k) {
        k = k.toUpperCase();
        if (!Element.Methods.ByTag[k]) {
            Element.Methods.ByTag[k] = {}
        }
        Object.extend(Element.Methods.ByTag[k], c)
    }

    function a(m, l, k) {
        k = k || false;
        for (var o in m) {
            var n = m[o];
            if (!Object.isFunction(n)) {
                continue
            }
            if (!k || !(o in l)) {
                l[o] = n.methodize()
            }
        }
    }

    function e(n) {
        var k;
        var m = {
            OPTGROUP: "OptGroup",
            TEXTAREA: "TextArea",
            P: "Paragraph",
            FIELDSET: "FieldSet",
            UL: "UList",
            OL: "OList",
            DL: "DList",
            DIR: "Directory",
            H1: "Heading",
            H2: "Heading",
            H3: "Heading",
            H4: "Heading",
            H5: "Heading",
            H6: "Heading",
            Q: "Quote",
            INS: "Mod",
            DEL: "Mod",
            A: "Anchor",
            IMG: "Image",
            CAPTION: "TableCaption",
            COL: "TableCol",
            COLGROUP: "TableCol",
            THEAD: "TableSection",
            TFOOT: "TableSection",
            TBODY: "TableSection",
            TR: "TableRow",
            TH: "TableCell",
            TD: "TableCell",
            FRAMESET: "FrameSet",
            IFRAME: "IFrame"
        };
        if (m[n]) {
            k = "HTML" + m[n] + "Element"
        }
        if (window[k]) {
            return window[k]
        }
        k = "HTML" + n + "Element";
        if (window[k]) {
            return window[k]
        }
        k = "HTML" + n.capitalize() + "Element";
        if (window[k]) {
            return window[k]
        }
        var l = document.createElement(n),
            o = l.__proto__ || l.constructor.prototype;
        l = null;
        return o
    }
    var h = window.HTMLElement ? HTMLElement.prototype : Element.prototype;
    if (i.ElementExtensions) {
        a(Element.Methods, h);
        a(Element.Methods.Simulated, h, true)
    }
    if (i.SpecificElementExtensions) {
        for (var j in Element.Methods.ByTag) {
            var f = e(j);
            if (Object.isUndefined(f)) {
                continue
            }
            a(d[j], f.prototype)
        }
    }
    Object.extend(Element, Element.Methods);
    delete Element.ByTag;
    if (Element.extend.refresh) {
        Element.extend.refresh()
    }
    Element.cache = {}
};
document.viewport = {
    getDimensions: function() {
        return {
            width: this.getWidth(),
            height: this.getHeight()
        }
    },
    getScrollOffsets: function() {
        return Element._returnOffset(window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft, window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop)
    }
};
(function(b) {
    var g = Prototype.Browser,
        e = document,
        c, d = {};

    function a() {
        if (g.WebKit && !e.evaluate) {
            return document
        }
        if (g.Opera && window.parseFloat(window.opera.version()) < 9.5) {
            return document.body
        }
        return document.documentElement
    }

    function f(h) {
        if (!c) {
            c = a()
        }
        d[h] = "client" + h;
        b["get" + h] = function() {
            return c[d[h]]
        };
        return b["get" + h]()
    }
    b.getWidth = f.curry("Width");
    b.getHeight = f.curry("Height")
})(document.viewport);
Element.Storage = {
    UID: 1
};
Element.addMethods({
    getStorage: function(b) {
        if (!(b = $(b))) {
            return
        }
        var a;
        if (b === window) {
            a = 0
        } else {
            if (typeof b._prototypeUID === "undefined") {
                b._prototypeUID = Element.Storage.UID++
            }
            a = b._prototypeUID
        }
        if (!Element.Storage[a]) {
            Element.Storage[a] = $H()
        }
        return Element.Storage[a]
    },
    store: function(b, a, c) {
        if (!(b = $(b))) {
            return
        }
        if (arguments.length === 2) {
            Element.getStorage(b).update(a)
        } else {
            Element.getStorage(b).set(a, c)
        }
        return b
    },
    retrieve: function(c, b, a) {
        if (!(c = $(c))) {
            return
        }
        var e = Element.getStorage(c),
            d = e.get(b);
        if (Object.isUndefined(d)) {
            e.set(b, a);
            d = a
        }
        return d
    },
    clone: function(c, a) {
        if (!(c = $(c))) {
            return
        }
        var e = c.cloneNode(a);
        e._prototypeUID = void 0;
        if (a) {
            var d = Element.select(e, "*"),
                b = d.length;
            while (b--) {
                d[b]._prototypeUID = void 0
            }
        }
        return Element.extend(e)
    },
    purge: function(c) {
        if (!(c = $(c))) {
            return
        }
        var a = Element._purgeElement;
        a(c);
        var d = c.getElementsByTagName("*"),
            b = d.length;
        while (b--) {
            a(d[b])
        }
        return null
    }
});
(function() {
    function h(v) {
        var u = v.match(/^(\d+)%?$/i);
        if (!u) {
            return null
        }
        return (Number(u[1]) / 100)
    }

    function o(F, G, v) {
        var y = null;
        if (Object.isElement(F)) {
            y = F;
            F = y.getStyle(G)
        }
        if (F === null) {
            return null
        }
        if ((/^(?:-)?\d+(\.\d+)?(px)?$/i).test(F)) {
            return window.parseFloat(F)
        }
        var A = F.include("%"),
            w = (v === document.viewport);
        if (/\d/.test(F) && y && y.runtimeStyle && !(A && w)) {
            var u = y.style.left,
                E = y.runtimeStyle.left;
            y.runtimeStyle.left = y.currentStyle.left;
            y.style.left = F || 0;
            F = y.style.pixelLeft;
            y.style.left = u;
            y.runtimeStyle.left = E;
            return F
        }
        if (y && A) {
            v = v || y.parentNode;
            var x = h(F);
            var B = null;
            var z = y.getStyle("position");
            var D = G.include("left") || G.include("right") || G.include("width");
            var C = G.include("top") || G.include("bottom") || G.include("height");
            if (v === document.viewport) {
                if (D) {
                    B = document.viewport.getWidth()
                } else {
                    if (C) {
                        B = document.viewport.getHeight()
                    }
                }
            } else {
                if (D) {
                    B = $(v).measure("width")
                } else {
                    if (C) {
                        B = $(v).measure("height")
                    }
                }
            }
            return (B === null) ? 0 : B * x
        }
        return 0
    }

    function g(u) {
        if (Object.isString(u) && u.endsWith("px")) {
            return u
        }
        return u + "px"
    }

    function j(v) {
        var u = v;
        while (v && v.parentNode) {
            var w = v.getStyle("display");
            if (w === "none") {
                return false
            }
            v = $(v.parentNode)
        }
        return true
    }
    var d = Prototype.K;
    if ("currentStyle" in document.documentElement) {
        d = function(u) {
            if (!u.currentStyle.hasLayout) {
                u.style.zoom = 1
            }
            return u
        }
    }

    function f(u) {
        if (u.include("border")) {
            u = u + "-width"
        }
        return u.camelize()
    }
    Element.Layout = Class.create(Hash, {
        initialize: function($super, v, u) {
            $super();
            this.element = $(v);
            Element.Layout.PROPERTIES.each(function(w) {
                this._set(w, null)
            }, this);
            if (u) {
                this._preComputing = true;
                this._begin();
                Element.Layout.PROPERTIES.each(this._compute, this);
                this._end();
                this._preComputing = false
            }
        },
        _set: function(v, u) {
            return Hash.prototype.set.call(this, v, u)
        },
        set: function(v, u) {
            throw "Properties of Element.Layout are read-only."
        },
        get: function($super, v) {
            var u = $super(v);
            return u === null ? this._compute(v) : u
        },
        _begin: function() {
            if (this._prepared) {
                return
            }
            var y = this.element;
            if (j(y)) {
                this._prepared = true;
                return
            }
            var A = {
                position: y.style.position || "",
                width: y.style.width || "",
                visibility: y.style.visibility || "",
                display: y.style.display || ""
            };
            y.store("prototype_original_styles", A);
            var B = y.getStyle("position"),
                u = y.getStyle("width");
            if (u === "0px" || u === null) {
                y.style.display = "block";
                u = y.getStyle("width")
            }
            var v = (B === "fixed") ? document.viewport : y.parentNode;
            y.setStyle({
                position: "absolute",
                visibility: "hidden",
                display: "block"
            });
            var w = y.getStyle("width");
            var x;
            if (u && (w === u)) {
                x = o(y, "width", v)
            } else {
                if (B === "absolute" || B === "fixed") {
                    x = o(y, "width", v)
                } else {
                    var C = y.parentNode,
                        z = $(C).getLayout();
                    x = z.get("width") - this.get("margin-left") - this.get("border-left") - this.get("padding-left") - this.get("padding-right") - this.get("border-right") - this.get("margin-right")
                }
            }
            y.setStyle({
                width: x + "px"
            });
            this._prepared = true
        },
        _end: function() {
            var v = this.element;
            var u = v.retrieve("prototype_original_styles");
            v.store("prototype_original_styles", null);
            v.setStyle(u);
            this._prepared = false
        },
        _compute: function(v) {
            var u = Element.Layout.COMPUTATIONS;
            if (!(v in u)) {
                throw "Property not found."
            }
            return this._set(v, u[v].call(this, this.element))
        },
        toObject: function() {
            var u = $A(arguments);
            var v = (u.length === 0) ? Element.Layout.PROPERTIES : u.join(" ").split(" ");
            var w = {};
            v.each(function(x) {
                if (!Element.Layout.PROPERTIES.include(x)) {
                    return
                }
                var y = this.get(x);
                if (y != null) {
                    w[x] = y
                }
            }, this);
            return w
        },
        toHash: function() {
            var u = this.toObject.apply(this, arguments);
            return new Hash(u)
        },
        toCSS: function() {
            var u = $A(arguments);
            var w = (u.length === 0) ? Element.Layout.PROPERTIES : u.join(" ").split(" ");
            var v = {};
            w.each(function(x) {
                if (!Element.Layout.PROPERTIES.include(x)) {
                    return
                }
                if (Element.Layout.COMPOSITE_PROPERTIES.include(x)) {
                    return
                }
                var y = this.get(x);
                if (y != null) {
                    v[f(x)] = y + "px"
                }
            }, this);
            return v
        },
        inspect: function() {
            return "#<Element.Layout>"
        }
    });
    Object.extend(Element.Layout, {
        PROPERTIES: $w("height width top left right bottom border-left border-right border-top border-bottom padding-left padding-right padding-top padding-bottom margin-top margin-bottom margin-left margin-right padding-box-width padding-box-height border-box-width border-box-height margin-box-width margin-box-height"),
        COMPOSITE_PROPERTIES: $w("padding-box-width padding-box-height margin-box-width margin-box-height border-box-width border-box-height"),
        COMPUTATIONS: {
            height: function(w) {
                if (!this._preComputing) {
                    this._begin()
                }
                var u = this.get("border-box-height");
                if (u <= 0) {
                    if (!this._preComputing) {
                        this._end()
                    }
                    return 0
                }
                var x = this.get("border-top"),
                    v = this.get("border-bottom");
                var z = this.get("padding-top"),
                    y = this.get("padding-bottom");
                if (!this._preComputing) {
                    this._end()
                }
                return u - x - v - z - y
            },
            width: function(w) {
                if (!this._preComputing) {
                    this._begin()
                }
                var v = this.get("border-box-width");
                if (v <= 0) {
                    if (!this._preComputing) {
                        this._end()
                    }
                    return 0
                }
                var z = this.get("border-left"),
                    u = this.get("border-right");
                var x = this.get("padding-left"),
                    y = this.get("padding-right");
                if (!this._preComputing) {
                    this._end()
                }
                return v - z - u - x - y
            },
            "padding-box-height": function(v) {
                var u = this.get("height"),
                    x = this.get("padding-top"),
                    w = this.get("padding-bottom");
                return u + x + w
            },
            "padding-box-width": function(u) {
                var v = this.get("width"),
                    w = this.get("padding-left"),
                    x = this.get("padding-right");
                return v + w + x
            },
            "border-box-height": function(v) {
                if (!this._preComputing) {
                    this._begin()
                }
                var u = v.offsetHeight;
                if (!this._preComputing) {
                    this._end()
                }
                return u
            },
            "border-box-width": function(u) {
                if (!this._preComputing) {
                    this._begin()
                }
                var v = u.offsetWidth;
                if (!this._preComputing) {
                    this._end()
                }
                return v
            },
            "margin-box-height": function(v) {
                var u = this.get("border-box-height"),
                    w = this.get("margin-top"),
                    x = this.get("margin-bottom");
                if (u <= 0) {
                    return 0
                }
                return u + w + x
            },
            "margin-box-width": function(w) {
                var v = this.get("border-box-width"),
                    x = this.get("margin-left"),
                    u = this.get("margin-right");
                if (v <= 0) {
                    return 0
                }
                return v + x + u
            },
            top: function(u) {
                var v = u.positionedOffset();
                return v.top
            },
            bottom: function(u) {
                var x = u.positionedOffset(),
                    v = u.getOffsetParent(),
                    w = v.measure("height");
                var y = this.get("border-box-height");
                return w - y - x.top
            },
            left: function(u) {
                var v = u.positionedOffset();
                return v.left
            },
            right: function(w) {
                var y = w.positionedOffset(),
                    x = w.getOffsetParent(),
                    u = x.measure("width");
                var v = this.get("border-box-width");
                return u - v - y.left
            },
            "padding-top": function(u) {
                return o(u, "paddingTop")
            },
            "padding-bottom": function(u) {
                return o(u, "paddingBottom")
            },
            "padding-left": function(u) {
                return o(u, "paddingLeft")
            },
            "padding-right": function(u) {
                return o(u, "paddingRight")
            },
            "border-top": function(u) {
                return o(u, "borderTopWidth")
            },
            "border-bottom": function(u) {
                return o(u, "borderBottomWidth")
            },
            "border-left": function(u) {
                return o(u, "borderLeftWidth")
            },
            "border-right": function(u) {
                return o(u, "borderRightWidth")
            },
            "margin-top": function(u) {
                return o(u, "marginTop")
            },
            "margin-bottom": function(u) {
                return o(u, "marginBottom")
            },
            "margin-left": function(u) {
                return o(u, "marginLeft")
            },
            "margin-right": function(u) {
                return o(u, "marginRight")
            }
        }
    });
    if ("getBoundingClientRect" in document.documentElement) {
        Object.extend(Element.Layout.COMPUTATIONS, {
            right: function(v) {
                var w = d(v.getOffsetParent());
                var x = v.getBoundingClientRect(),
                    u = w.getBoundingClientRect();
                return (u.right - x.right).round()
            },
            bottom: function(v) {
                var w = d(v.getOffsetParent());
                var x = v.getBoundingClientRect(),
                    u = w.getBoundingClientRect();
                return (u.bottom - x.bottom).round()
            }
        })
    }
    Element.Offset = Class.create({
        initialize: function(v, u) {
            this.left = v.round();
            this.top = u.round();
            this[0] = this.left;
            this[1] = this.top
        },
        relativeTo: function(u) {
            return new Element.Offset(this.left - u.left, this.top - u.top)
        },
        inspect: function() {
            return "#<Element.Offset left: #{left} top: #{top}>".interpolate(this)
        },
        toString: function() {
            return "[#{left}, #{top}]".interpolate(this)
        },
        toArray: function() {
            return [this.left, this.top]
        }
    });

    function r(v, u) {
        return new Element.Layout(v, u)
    }

    function b(u, v) {
        return $(u).getLayout().get(v)
    }

    function n(v) {
        v = $(v);
        var z = Element.getStyle(v, "display");
        if (z && z !== "none") {
            return {
                width: v.offsetWidth,
                height: v.offsetHeight
            }
        }
        var w = v.style;
        var u = {
            visibility: w.visibility,
            position: w.position,
            display: w.display
        };
        var y = {
            visibility: "hidden",
            display: "block"
        };
        if (u.position !== "fixed") {
            y.position = "absolute"
        }
        Element.setStyle(v, y);
        var x = {
            width: v.offsetWidth,
            height: v.offsetHeight
        };
        Element.setStyle(v, u);
        return x
    }

    function l(u) {
        u = $(u);
        if (e(u) || c(u) || m(u) || k(u)) {
            return $(document.body)
        }
        var v = (Element.getStyle(u, "display") === "inline");
        if (!v && u.offsetParent) {
            return $(u.offsetParent)
        }
        while ((u = u.parentNode) && u !== document.body) {
            if (Element.getStyle(u, "position") !== "static") {
                return k(u) ? $(document.body) : $(u)
            }
        }
        return $(document.body)
    }

    function t(v) {
        v = $(v);
        var u = 0,
            w = 0;
        if (v.parentNode) {
            do {
                u += v.offsetTop || 0;
                w += v.offsetLeft || 0;
                v = v.offsetParent
            } while (v)
        }
        return new Element.Offset(w, u)
    }

    function p(v) {
        v = $(v);
        var w = v.getLayout();
        var u = 0,
            y = 0;
        do {
            u += v.offsetTop || 0;
            y += v.offsetLeft || 0;
            v = v.offsetParent;
            if (v) {
                if (m(v)) {
                    break
                }
                var x = Element.getStyle(v, "position");
                if (x !== "static") {
                    break
                }
            }
        } while (v);
        y -= w.get("margin-top");
        u -= w.get("margin-left");
        return new Element.Offset(y, u)
    }

    function a(v) {
        var u = 0,
            w = 0;
        do {
            u += v.scrollTop || 0;
            w += v.scrollLeft || 0;
            v = v.parentNode
        } while (v);
        return new Element.Offset(w, u)
    }

    function s(y) {
        v = $(v);
        var u = 0,
            x = 0,
            w = document.body;
        var v = y;
        do {
            u += v.offsetTop || 0;
            x += v.offsetLeft || 0;
            if (v.offsetParent == w && Element.getStyle(v, "position") == "absolute") {
                break
            }
        } while (v = v.offsetParent);
        v = y;
        do {
            if (v != w) {
                u -= v.scrollTop || 0;
                x -= v.scrollLeft || 0
            }
        } while (v = v.parentNode);
        return new Element.Offset(x, u)
    }

    function q(u) {
        u = $(u);
        if (Element.getStyle(u, "position") === "absolute") {
            return u
        }
        var y = l(u);
        var x = u.viewportOffset(),
            v = y.viewportOffset();
        var z = x.relativeTo(v);
        var w = u.getLayout();
        u.store("prototype_absolutize_original_styles", {
            left: u.getStyle("left"),
            top: u.getStyle("top"),
            width: u.getStyle("width"),
            height: u.getStyle("height")
        });
        u.setStyle({
            position: "absolute",
            top: z.top + "px",
            left: z.left + "px",
            width: w.get("width") + "px",
            height: w.get("height") + "px"
        });
        return u
    }

    function i(v) {
        v = $(v);
        if (Element.getStyle(v, "position") === "relative") {
            return v
        }
        var u = v.retrieve("prototype_absolutize_original_styles");
        if (u) {
            v.setStyle(u)
        }
        return v
    }
    if (Prototype.Browser.IE) {
        l = l.wrap(function(w, v) {
            v = $(v);
            if (e(v) || c(v) || m(v) || k(v)) {
                return $(document.body)
            }
            var u = v.getStyle("position");
            if (u !== "static") {
                return w(v)
            }
            v.setStyle({
                position: "relative"
            });
            var x = w(v);
            v.setStyle({
                position: u
            });
            return x
        });
        p = p.wrap(function(x, v) {
            v = $(v);
            if (!v.parentNode) {
                return new Element.Offset(0, 0)
            }
            var u = v.getStyle("position");
            if (u !== "static") {
                return x(v)
            }
            var w = v.getOffsetParent();
            if (w && w.getStyle("position") === "fixed") {
                d(w)
            }
            v.setStyle({
                position: "relative"
            });
            var y = x(v);
            v.setStyle({
                position: u
            });
            return y
        })
    } else {
        if (Prototype.Browser.Webkit) {
            t = function(v) {
                v = $(v);
                var u = 0,
                    w = 0;
                do {
                    u += v.offsetTop || 0;
                    w += v.offsetLeft || 0;
                    if (v.offsetParent == document.body) {
                        if (Element.getStyle(v, "position") == "absolute") {
                            break
                        }
                    }
                    v = v.offsetParent
                } while (v);
                return new Element.Offset(w, u)
            }
        }
    }
    Element.addMethods({
        getLayout: r,
        measure: b,
        getDimensions: n,
        getOffsetParent: l,
        cumulativeOffset: t,
        positionedOffset: p,
        cumulativeScrollOffset: a,
        viewportOffset: s,
        absolutize: q,
        relativize: i
    });

    function m(u) {
        return u.nodeName.toUpperCase() === "BODY"
    }

    function k(u) {
        return u.nodeName.toUpperCase() === "HTML"
    }

    function e(u) {
        return u.nodeType === Node.DOCUMENT_NODE
    }

    function c(u) {
        return u !== document.body && !Element.descendantOf(u, document.body)
    }
    if ("getBoundingClientRect" in document.documentElement) {
        Element.addMethods({
            viewportOffset: function(u) {
                u = $(u);
                if (c(u)) {
                    return new Element.Offset(0, 0)
                }
                var v = u.getBoundingClientRect(),
                    w = document.documentElement;
                return new Element.Offset(v.left - w.clientLeft, v.top - w.clientTop)
            }
        })
    }
})();
window.$$ = function() {
    var a = $A(arguments).join(", ");
    return Prototype.Selector.select(a, document)
};
Prototype.Selector = (function() {
    function a() {
        throw new Error('Method "Prototype.Selector.select" must be defined.')
    }

    function c() {
        throw new Error('Method "Prototype.Selector.match" must be defined.')
    }

    function d(l, m, h) {
        h = h || 0;
        var g = Prototype.Selector.match,
            k = l.length,
            f = 0,
            j;
        for (j = 0; j < k; j++) {
            if (g(l[j], m) && h == f++) {
                return Element.extend(l[j])
            }
        }
    }

    function e(h) {
        for (var f = 0, g = h.length; f < g; f++) {
            Element.extend(h[f])
        }
        return h
    }
    var b = Prototype.K;
    return {
        select: a,
        match: c,
        find: d,
        extendElements: (Element.extend === b) ? b : e,
        extendElement: Element.extend
    }
})();
Prototype._original_property = window.Sizzle;
/*
 * Sizzle CSS Selector Engine - v1.0
 *  Copyright 2009, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function() {
    var q = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
        j = 0,
        d = Object.prototype.toString,
        o = false,
        i = true;
    [0, 0].sort(function() {
        i = false;
        return 0
    });
    var b = function(E, u, B, w) {
        B = B || [];
        var e = u = u || document;
        if (u.nodeType !== 1 && u.nodeType !== 9) {
            return []
        }
        if (!E || typeof E !== "string") {
            return B
        }
        var C = [],
            D, z, I, H, A, t, s = true,
            x = p(u),
            G = E;
        while ((q.exec(""), D = q.exec(G)) !== null) {
            G = D[3];
            C.push(D[1]);
            if (D[2]) {
                t = D[3];
                break
            }
        }
        if (C.length > 1 && k.exec(E)) {
            if (C.length === 2 && f.relative[C[0]]) {
                z = g(C[0] + C[1], u)
            } else {
                z = f.relative[C[0]] ? [u] : b(C.shift(), u);
                while (C.length) {
                    E = C.shift();
                    if (f.relative[E]) {
                        E += C.shift()
                    }
                    z = g(E, z)
                }
            }
        } else {
            if (!w && C.length > 1 && u.nodeType === 9 && !x && f.match.ID.test(C[0]) && !f.match.ID.test(C[C.length - 1])) {
                var J = b.find(C.shift(), u, x);
                u = J.expr ? b.filter(J.expr, J.set)[0] : J.set[0]
            }
            if (u) {
                var J = w ? {
                    expr: C.pop(),
                    set: a(w)
                } : b.find(C.pop(), C.length === 1 && (C[0] === "~" || C[0] === "+") && u.parentNode ? u.parentNode : u, x);
                z = J.expr ? b.filter(J.expr, J.set) : J.set;
                if (C.length > 0) {
                    I = a(z)
                } else {
                    s = false
                }
                while (C.length) {
                    var v = C.pop(),
                        y = v;
                    if (!f.relative[v]) {
                        v = ""
                    } else {
                        y = C.pop()
                    }
                    if (y == null) {
                        y = u
                    }
                    f.relative[v](I, y, x)
                }
            } else {
                I = C = []
            }
        }
        if (!I) {
            I = z
        }
        if (!I) {
            throw "Syntax error, unrecognized expression: " + (v || E)
        }
        if (d.call(I) === "[object Array]") {
            if (!s) {
                B.push.apply(B, I)
            } else {
                if (u && u.nodeType === 1) {
                    for (var F = 0; I[F] != null; F++) {
                        if (I[F] && (I[F] === true || I[F].nodeType === 1 && h(u, I[F]))) {
                            B.push(z[F])
                        }
                    }
                } else {
                    for (var F = 0; I[F] != null; F++) {
                        if (I[F] && I[F].nodeType === 1) {
                            B.push(z[F])
                        }
                    }
                }
            }
        } else {
            a(I, B)
        }
        if (t) {
            b(t, e, B, w);
            b.uniqueSort(B)
        }
        return B
    };
    b.uniqueSort = function(s) {
        if (c) {
            o = i;
            s.sort(c);
            if (o) {
                for (var e = 1; e < s.length; e++) {
                    if (s[e] === s[e - 1]) {
                        s.splice(e--, 1)
                    }
                }
            }
        }
        return s
    };
    b.matches = function(e, s) {
        return b(e, null, null, s)
    };
    b.find = function(y, e, z) {
        var x, v;
        if (!y) {
            return []
        }
        for (var u = 0, t = f.order.length; u < t; u++) {
            var w = f.order[u],
                v;
            if ((v = f.leftMatch[w].exec(y))) {
                var s = v[1];
                v.splice(1, 1);
                if (s.substr(s.length - 1) !== "\\") {
                    v[1] = (v[1] || "").replace(/\\/g, "");
                    x = f.find[w](v, e, z);
                    if (x != null) {
                        y = y.replace(f.match[w], "");
                        break
                    }
                }
            }
        }
        if (!x) {
            x = e.getElementsByTagName("*")
        }
        return {
            set: x,
            expr: y
        }
    };
    b.filter = function(B, A, E, u) {
        var t = B,
            G = [],
            y = A,
            w, e, x = A && A[0] && p(A[0]);
        while (B && A.length) {
            for (var z in f.filter) {
                if ((w = f.match[z].exec(B)) != null) {
                    var s = f.filter[z],
                        F, D;
                    e = false;
                    if (y == G) {
                        G = []
                    }
                    if (f.preFilter[z]) {
                        w = f.preFilter[z](w, y, E, G, u, x);
                        if (!w) {
                            e = F = true
                        } else {
                            if (w === true) {
                                continue
                            }
                        }
                    }
                    if (w) {
                        for (var v = 0;
                            (D = y[v]) != null; v++) {
                            if (D) {
                                F = s(D, w, v, y);
                                var C = u ^ !!F;
                                if (E && F != null) {
                                    if (C) {
                                        e = true
                                    } else {
                                        y[v] = false
                                    }
                                } else {
                                    if (C) {
                                        G.push(D);
                                        e = true
                                    }
                                }
                            }
                        }
                    }
                    if (F !== undefined) {
                        if (!E) {
                            y = G
                        }
                        B = B.replace(f.match[z], "");
                        if (!e) {
                            return []
                        }
                        break
                    }
                }
            }
            if (B == t) {
                if (e == null) {
                    throw "Syntax error, unrecognized expression: " + B
                } else {
                    break
                }
            }
            t = B
        }
        return y
    };
    var f = b.selectors = {
        order: ["ID", "NAME", "TAG"],
        match: {
            ID: /#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
            CLASS: /\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
            NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,
            ATTR: /\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
            TAG: /^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,
            CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,
            POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,
            PSEUDO: /:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/
        },
        leftMatch: {},
        attrMap: {
            "class": "className",
            "for": "htmlFor"
        },
        attrHandle: {
            href: function(e) {
                return e.getAttribute("href")
            }
        },
        relative: {
            "+": function(y, e, x) {
                var v = typeof e === "string",
                    z = v && !/\W/.test(e),
                    w = v && !z;
                if (z && !x) {
                    e = e.toUpperCase()
                }
                for (var u = 0, t = y.length, s; u < t; u++) {
                    if ((s = y[u])) {
                        while ((s = s.previousSibling) && s.nodeType !== 1) {}
                        y[u] = w || s && s.nodeName === e ? s || false : s === e
                    }
                }
                if (w) {
                    b.filter(e, y, true)
                }
            },
            ">": function(x, s, y) {
                var v = typeof s === "string";
                if (v && !/\W/.test(s)) {
                    s = y ? s : s.toUpperCase();
                    for (var t = 0, e = x.length; t < e; t++) {
                        var w = x[t];
                        if (w) {
                            var u = w.parentNode;
                            x[t] = u.nodeName === s ? u : false
                        }
                    }
                } else {
                    for (var t = 0, e = x.length; t < e; t++) {
                        var w = x[t];
                        if (w) {
                            x[t] = v ? w.parentNode : w.parentNode === s
                        }
                    }
                    if (v) {
                        b.filter(s, x, true)
                    }
                }
            },
            "": function(u, s, w) {
                var t = j++,
                    e = r;
                if (!/\W/.test(s)) {
                    var v = s = w ? s : s.toUpperCase();
                    e = n
                }
                e("parentNode", s, t, u, v, w)
            },
            "~": function(u, s, w) {
                var t = j++,
                    e = r;
                if (typeof s === "string" && !/\W/.test(s)) {
                    var v = s = w ? s : s.toUpperCase();
                    e = n
                }
                e("previousSibling", s, t, u, v, w)
            }
        },
        find: {
            ID: function(s, t, u) {
                if (typeof t.getElementById !== "undefined" && !u) {
                    var e = t.getElementById(s[1]);
                    return e ? [e] : []
                }
            },
            NAME: function(t, w, x) {
                if (typeof w.getElementsByName !== "undefined") {
                    var s = [],
                        v = w.getElementsByName(t[1]);
                    for (var u = 0, e = v.length; u < e; u++) {
                        if (v[u].getAttribute("name") === t[1]) {
                            s.push(v[u])
                        }
                    }
                    return s.length === 0 ? null : s
                }
            },
            TAG: function(e, s) {
                return s.getElementsByTagName(e[1])
            }
        },
        preFilter: {
            CLASS: function(u, s, t, e, x, y) {
                u = " " + u[1].replace(/\\/g, "") + " ";
                if (y) {
                    return u
                }
                for (var v = 0, w;
                    (w = s[v]) != null; v++) {
                    if (w) {
                        if (x ^ (w.className && (" " + w.className + " ").indexOf(u) >= 0)) {
                            if (!t) {
                                e.push(w)
                            }
                        } else {
                            if (t) {
                                s[v] = false
                            }
                        }
                    }
                }
                return false
            },
            ID: function(e) {
                return e[1].replace(/\\/g, "")
            },
            TAG: function(s, e) {
                for (var t = 0; e[t] === false; t++) {}
                return e[t] && p(e[t]) ? s[1] : s[1].toUpperCase()
            },
            CHILD: function(e) {
                if (e[1] == "nth") {
                    var s = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(e[2] == "even" && "2n" || e[2] == "odd" && "2n+1" || !/\D/.test(e[2]) && "0n+" + e[2] || e[2]);
                    e[2] = (s[1] + (s[2] || 1)) - 0;
                    e[3] = s[3] - 0
                }
                e[0] = j++;
                return e
            },
            ATTR: function(v, s, t, e, w, x) {
                var u = v[1].replace(/\\/g, "");
                if (!x && f.attrMap[u]) {
                    v[1] = f.attrMap[u]
                }
                if (v[2] === "~=") {
                    v[4] = " " + v[4] + " "
                }
                return v
            },
            PSEUDO: function(v, s, t, e, w) {
                if (v[1] === "not") {
                    if ((q.exec(v[3]) || "").length > 1 || /^\w/.test(v[3])) {
                        v[3] = b(v[3], null, null, s)
                    } else {
                        var u = b.filter(v[3], s, t, true ^ w);
                        if (!t) {
                            e.push.apply(e, u)
                        }
                        return false
                    }
                } else {
                    if (f.match.POS.test(v[0]) || f.match.CHILD.test(v[0])) {
                        return true
                    }
                }
                return v
            },
            POS: function(e) {
                e.unshift(true);
                return e
            }
        },
        filters: {
            enabled: function(e) {
                return e.disabled === false && e.type !== "hidden"
            },
            disabled: function(e) {
                return e.disabled === true
            },
            checked: function(e) {
                return e.checked === true
            },
            selected: function(e) {
                e.parentNode.selectedIndex;
                return e.selected === true
            },
            parent: function(e) {
                return !!e.firstChild
            },
            empty: function(e) {
                return !e.firstChild
            },
            has: function(t, s, e) {
                return !!b(e[3], t).length
            },
            header: function(e) {
                return /h\d/i.test(e.nodeName)
            },
            text: function(e) {
                return "text" === e.type
            },
            radio: function(e) {
                return "radio" === e.type
            },
            checkbox: function(e) {
                return "checkbox" === e.type
            },
            file: function(e) {
                return "file" === e.type
            },
            password: function(e) {
                return "password" === e.type
            },
            submit: function(e) {
                return "submit" === e.type
            },
            image: function(e) {
                return "image" === e.type
            },
            reset: function(e) {
                return "reset" === e.type
            },
            button: function(e) {
                return "button" === e.type || e.nodeName.toUpperCase() === "BUTTON"
            },
            input: function(e) {
                return /input|select|textarea|button/i.test(e.nodeName)
            }
        },
        setFilters: {
            first: function(s, e) {
                return e === 0
            },
            last: function(t, s, e, u) {
                return s === u.length - 1
            },
            even: function(s, e) {
                return e % 2 === 0
            },
            odd: function(s, e) {
                return e % 2 === 1
            },
            lt: function(t, s, e) {
                return s < e[3] - 0
            },
            gt: function(t, s, e) {
                return s > e[3] - 0
            },
            nth: function(t, s, e) {
                return e[3] - 0 == s
            },
            eq: function(t, s, e) {
                return e[3] - 0 == s
            }
        },
        filter: {
            PSEUDO: function(x, t, u, y) {
                var s = t[1],
                    v = f.filters[s];
                if (v) {
                    return v(x, u, t, y)
                } else {
                    if (s === "contains") {
                        return (x.textContent || x.innerText || "").indexOf(t[3]) >= 0
                    } else {
                        if (s === "not") {
                            var w = t[3];
                            for (var u = 0, e = w.length; u < e; u++) {
                                if (w[u] === x) {
                                    return false
                                }
                            }
                            return true
                        }
                    }
                }
            },
            CHILD: function(e, u) {
                var x = u[1],
                    s = e;
                switch (x) {
                    case "only":
                    case "first":
                        while ((s = s.previousSibling)) {
                            if (s.nodeType === 1) {
                                return false
                            }
                        }
                        if (x == "first") {
                            return true
                        }
                        s = e;
                    case "last":
                        while ((s = s.nextSibling)) {
                            if (s.nodeType === 1) {
                                return false
                            }
                        }
                        return true;
                    case "nth":
                        var t = u[2],
                            A = u[3];
                        if (t == 1 && A == 0) {
                            return true
                        }
                        var w = u[0],
                            z = e.parentNode;
                        if (z && (z.sizcache !== w || !e.nodeIndex)) {
                            var v = 0;
                            for (s = z.firstChild; s; s = s.nextSibling) {
                                if (s.nodeType === 1) {
                                    s.nodeIndex = ++v
                                }
                            }
                            z.sizcache = w
                        }
                        var y = e.nodeIndex - A;
                        if (t == 0) {
                            return y == 0
                        } else {
                            return (y % t == 0 && y / t >= 0)
                        }
                }
            },
            ID: function(s, e) {
                return s.nodeType === 1 && s.getAttribute("id") === e
            },
            TAG: function(s, e) {
                return (e === "*" && s.nodeType === 1) || s.nodeName === e
            },
            CLASS: function(s, e) {
                return (" " + (s.className || s.getAttribute("class")) + " ").indexOf(e) > -1
            },
            ATTR: function(w, u) {
                var t = u[1],
                    e = f.attrHandle[t] ? f.attrHandle[t](w) : w[t] != null ? w[t] : w.getAttribute(t),
                    x = e + "",
                    v = u[2],
                    s = u[4];
                return e == null ? v === "!=" : v === "=" ? x === s : v === "*=" ? x.indexOf(s) >= 0 : v === "~=" ? (" " + x + " ").indexOf(s) >= 0 : !s ? x && e !== false : v === "!=" ? x != s : v === "^=" ? x.indexOf(s) === 0 : v === "$=" ? x.substr(x.length - s.length) === s : v === "|=" ? x === s || x.substr(0, s.length + 1) === s + "-" : false
            },
            POS: function(v, s, t, w) {
                var e = s[2],
                    u = f.setFilters[e];
                if (u) {
                    return u(v, t, s, w)
                }
            }
        }
    };
    var k = f.match.POS;
    for (var m in f.match) {
        f.match[m] = new RegExp(f.match[m].source + /(?![^\[]*\])(?![^\(]*\))/.source);
        f.leftMatch[m] = new RegExp(/(^(?:.|\r|\n)*?)/.source + f.match[m].source)
    }
    var a = function(s, e) {
        s = Array.prototype.slice.call(s, 0);
        if (e) {
            e.push.apply(e, s);
            return e
        }
        return s
    };
    try {
        Array.prototype.slice.call(document.documentElement.childNodes, 0)
    } catch (l) {
        a = function(v, u) {
            var s = u || [];
            if (d.call(v) === "[object Array]") {
                Array.prototype.push.apply(s, v)
            } else {
                if (typeof v.length === "number") {
                    for (var t = 0, e = v.length; t < e; t++) {
                        s.push(v[t])
                    }
                } else {
                    for (var t = 0; v[t]; t++) {
                        s.push(v[t])
                    }
                }
            }
            return s
        }
    }
    var c;
    if (document.documentElement.compareDocumentPosition) {
        c = function(s, e) {
            if (!s.compareDocumentPosition || !e.compareDocumentPosition) {
                if (s == e) {
                    o = true
                }
                return 0
            }
            var t = s.compareDocumentPosition(e) & 4 ? -1 : s === e ? 0 : 1;
            if (t === 0) {
                o = true
            }
            return t
        }
    } else {
        if ("sourceIndex" in document.documentElement) {
            c = function(s, e) {
                if (!s.sourceIndex || !e.sourceIndex) {
                    if (s == e) {
                        o = true
                    }
                    return 0
                }
                var t = s.sourceIndex - e.sourceIndex;
                if (t === 0) {
                    o = true
                }
                return t
            }
        } else {
            if (document.createRange) {
                c = function(u, s) {
                    if (!u.ownerDocument || !s.ownerDocument) {
                        if (u == s) {
                            o = true
                        }
                        return 0
                    }
                    var t = u.ownerDocument.createRange(),
                        e = s.ownerDocument.createRange();
                    t.setStart(u, 0);
                    t.setEnd(u, 0);
                    e.setStart(s, 0);
                    e.setEnd(s, 0);
                    var v = t.compareBoundaryPoints(Range.START_TO_END, e);
                    if (v === 0) {
                        o = true
                    }
                    return v
                }
            }
        }
    }(function() {
        var s = document.createElement("div"),
            t = "script" + (new Date).getTime();
        s.innerHTML = "<a name='" + t + "'/>";
        var e = document.documentElement;
        e.insertBefore(s, e.firstChild);
        if (!!document.getElementById(t)) {
            f.find.ID = function(v, w, x) {
                if (typeof w.getElementById !== "undefined" && !x) {
                    var u = w.getElementById(v[1]);
                    return u ? u.id === v[1] || typeof u.getAttributeNode !== "undefined" && u.getAttributeNode("id").nodeValue === v[1] ? [u] : undefined : []
                }
            };
            f.filter.ID = function(w, u) {
                var v = typeof w.getAttributeNode !== "undefined" && w.getAttributeNode("id");
                return w.nodeType === 1 && v && v.nodeValue === u
            }
        }
        e.removeChild(s);
        e = s = null
    })();
    (function() {
        var e = document.createElement("div");
        e.appendChild(document.createComment(""));
        if (e.getElementsByTagName("*").length > 0) {
            f.find.TAG = function(s, w) {
                var v = w.getElementsByTagName(s[1]);
                if (s[1] === "*") {
                    var u = [];
                    for (var t = 0; v[t]; t++) {
                        if (v[t].nodeType === 1) {
                            u.push(v[t])
                        }
                    }
                    v = u
                }
                return v
            }
        }
        e.innerHTML = "<a href='#'></a>";
        if (e.firstChild && typeof e.firstChild.getAttribute !== "undefined" && e.firstChild.getAttribute("href") !== "#") {
            f.attrHandle.href = function(s) {
                return s.getAttribute("href", 2)
            }
        }
        e = null
    })();
    if (document.querySelectorAll) {
        (function() {
            var e = b,
                t = document.createElement("div");
            t.innerHTML = "<p class='TEST'></p>";
            if (t.querySelectorAll && t.querySelectorAll(".TEST").length === 0) {
                return
            }
            b = function(x, w, u, v) {
                w = w || document;
                if (!v && w.nodeType === 9 && !p(w)) {
                    try {
                        return a(w.querySelectorAll(x), u)
                    } catch (y) {}
                }
                return e(x, w, u, v)
            };
            for (var s in e) {
                b[s] = e[s]
            }
            t = null
        })()
    }
    if (document.getElementsByClassName && document.documentElement.getElementsByClassName) {
        (function() {
            var e = document.createElement("div");
            e.innerHTML = "<div class='test e'></div><div class='test'></div>";
            if (e.getElementsByClassName("e").length === 0) {
                return
            }
            e.lastChild.className = "e";
            if (e.getElementsByClassName("e").length === 1) {
                return
            }
            f.order.splice(1, 0, "CLASS");
            f.find.CLASS = function(s, t, u) {
                if (typeof t.getElementsByClassName !== "undefined" && !u) {
                    return t.getElementsByClassName(s[1])
                }
            };
            e = null
        })()
    }

    function n(s, x, w, B, y, A) {
        var z = s == "previousSibling" && !A;
        for (var u = 0, t = B.length; u < t; u++) {
            var e = B[u];
            if (e) {
                if (z && e.nodeType === 1) {
                    e.sizcache = w;
                    e.sizset = u
                }
                e = e[s];
                var v = false;
                while (e) {
                    if (e.sizcache === w) {
                        v = B[e.sizset];
                        break
                    }
                    if (e.nodeType === 1 && !A) {
                        e.sizcache = w;
                        e.sizset = u
                    }
                    if (e.nodeName === x) {
                        v = e;
                        break
                    }
                    e = e[s]
                }
                B[u] = v
            }
        }
    }

    function r(s, x, w, B, y, A) {
        var z = s == "previousSibling" && !A;
        for (var u = 0, t = B.length; u < t; u++) {
            var e = B[u];
            if (e) {
                if (z && e.nodeType === 1) {
                    e.sizcache = w;
                    e.sizset = u
                }
                e = e[s];
                var v = false;
                while (e) {
                    if (e.sizcache === w) {
                        v = B[e.sizset];
                        break
                    }
                    if (e.nodeType === 1) {
                        if (!A) {
                            e.sizcache = w;
                            e.sizset = u
                        }
                        if (typeof x !== "string") {
                            if (e === x) {
                                v = true;
                                break
                            }
                        } else {
                            if (b.filter(x, [e]).length > 0) {
                                v = e;
                                break
                            }
                        }
                    }
                    e = e[s]
                }
                B[u] = v
            }
        }
    }
    var h = document.compareDocumentPosition ? function(s, e) {
        return s.compareDocumentPosition(e) & 16
    } : function(s, e) {
        return s !== e && (s.contains ? s.contains(e) : true)
    };
    var p = function(e) {
        return e.nodeType === 9 && e.documentElement.nodeName !== "HTML" || !!e.ownerDocument && e.ownerDocument.documentElement.nodeName !== "HTML"
    };
    var g = function(e, y) {
        var u = [],
            v = "",
            w, t = y.nodeType ? [y] : y;
        while ((w = f.match.PSEUDO.exec(e))) {
            v += w[0];
            e = e.replace(f.match.PSEUDO, "")
        }
        e = f.relative[e] ? e + "*" : e;
        for (var x = 0, s = t.length; x < s; x++) {
            b(e, t[x], u)
        }
        return b.filter(v, u)
    };
    window.Sizzle = b
})();
(function(c) {
    var d = Prototype.Selector.extendElements;

    function a(e, f) {
        return d(c(e, f || document))
    }

    function b(f, e) {
        return c.matches(e, [f]).length == 1
    }
    Prototype.Selector.engine = c;
    Prototype.Selector.select = a;
    Prototype.Selector.match = b
})(Sizzle);
window.Sizzle = Prototype._original_property;
delete Prototype._original_property;
var Form = {
    reset: function(a) {
        a = $(a);
        a.reset();
        return a
    },
    serializeElements: function(h, d) {
        if (typeof d != "object") {
            d = {
                hash: !!d
            }
        } else {
            if (Object.isUndefined(d.hash)) {
                d.hash = true
            }
        }
        var e, g, a = false,
            f = d.submit,
            b, c;
        if (d.hash) {
            c = {};
            b = function(i, j, k) {
                if (j in i) {
                    if (!Object.isArray(i[j])) {
                        i[j] = [i[j]]
                    }
                    i[j].push(k)
                } else {
                    i[j] = k
                }
                return i
            }
        } else {
            c = "";
            b = function(i, j, k) {
                return i + (i ? "&" : "") + encodeURIComponent(j) + "=" + encodeURIComponent(k)
            }
        }
        return h.inject(c, function(i, j) {
            if (!j.disabled && j.name) {
                e = j.name;
                g = $(j).getValue();
                if (g != null && j.type != "file" && (j.type != "submit" || (!a && f !== false && (!f || e == f) && (a = true)))) {
                    i = b(i, e, g)
                }
            }
            return i
        })
    }
};
Form.Methods = {
    serialize: function(b, a) {
        return Form.serializeElements(Form.getElements(b), a)
    },
    getElements: function(e) {
        var f = $(e).getElementsByTagName("*"),
            d, a = [],
            c = Form.Element.Serializers;
        for (var b = 0; d = f[b]; b++) {
            a.push(d)
        }
        return a.inject([], function(g, h) {
            if (c[h.tagName.toLowerCase()]) {
                g.push(Element.extend(h))
            }
            return g
        })
    },
    getInputs: function(g, c, d) {
        g = $(g);
        var a = g.getElementsByTagName("input");
        if (!c && !d) {
            return $A(a).map(Element.extend)
        }
        for (var e = 0, h = [], f = a.length; e < f; e++) {
            var b = a[e];
            if ((c && b.type != c) || (d && b.name != d)) {
                continue
            }
            h.push(Element.extend(b))
        }
        return h
    },
    disable: function(a) {
        a = $(a);
        Form.getElements(a).invoke("disable");
        return a
    },
    enable: function(a) {
        a = $(a);
        Form.getElements(a).invoke("enable");
        return a
    },
    findFirstElement: function(b) {
        var c = $(b).getElements().findAll(function(d) {
            return "hidden" != d.type && !d.disabled
        });
        var a = c.findAll(function(d) {
            return d.hasAttribute("tabIndex") && d.tabIndex >= 0
        }).sortBy(function(d) {
            return d.tabIndex
        }).first();
        return a ? a : c.find(function(d) {
            return /^(?:input|select|textarea)$/i.test(d.tagName)
        })
    },
    focusFirstElement: function(b) {
        b = $(b);
        var a = b.findFirstElement();
        if (a) {
            a.activate()
        }
        return b
    },
    request: function(b, a) {
        b = $(b), a = Object.clone(a || {});
        var d = a.parameters,
            c = b.readAttribute("action") || "";
        if (c.blank()) {
            c = window.location.href
        }
        a.parameters = b.serialize(true);
        if (d) {
            if (Object.isString(d)) {
                d = d.toQueryParams()
            }
            Object.extend(a.parameters, d)
        }
        if (b.hasAttribute("method") && !a.method) {
            a.method = b.method
        }
        return new Ajax.Request(c, a)
    }
};
Form.Element = {
    focus: function(a) {
        $(a).focus();
        return a
    },
    select: function(a) {
        $(a).select();
        return a
    }
};
Form.Element.Methods = {
    serialize: function(a) {
        a = $(a);
        if (!a.disabled && a.name) {
            var b = a.getValue();
            if (b != undefined) {
                var c = {};
                c[a.name] = b;
                return Object.toQueryString(c)
            }
        }
        return ""
    },
    getValue: function(a) {
        a = $(a);
        var b = a.tagName.toLowerCase();
        return Form.Element.Serializers[b](a)
    },
    setValue: function(a, b) {
        a = $(a);
        var c = a.tagName.toLowerCase();
        Form.Element.Serializers[c](a, b);
        return a
    },
    clear: function(a) {
        $(a).value = "";
        return a
    },
    present: function(a) {
        return $(a).value != ""
    },
    activate: function(a) {
        a = $(a);
        try {
            a.focus();
            if (a.select && (a.tagName.toLowerCase() != "input" || !(/^(?:button|reset|submit)$/i.test(a.type)))) {
                a.select()
            }
        } catch (b) {}
        return a
    },
    disable: function(a) {
        a = $(a);
        a.disabled = true;
        return a
    },
    enable: function(a) {
        a = $(a);
        a.disabled = false;
        return a
    }
};
var Field = Form.Element;
var $F = Form.Element.Methods.getValue;
Form.Element.Serializers = (function() {
    function b(h, i) {
        switch (h.type.toLowerCase()) {
            case "checkbox":
            case "radio":
                return f(h, i);
            default:
                return e(h, i)
        }
    }

    function f(h, i) {
        if (Object.isUndefined(i)) {
            return h.checked ? h.value : null
        } else {
            h.checked = !!i
        }
    }

    function e(h, i) {
        if (Object.isUndefined(i)) {
            return h.value
        } else {
            h.value = i
        }
    }

    function a(k, n) {
        if (Object.isUndefined(n)) {
            return (k.type === "select-one" ? c : d)(k)
        }
        var j, l, o = !Object.isArray(n);
        for (var h = 0, m = k.length; h < m; h++) {
            j = k.options[h];
            l = this.optionValue(j);
            if (o) {
                if (l == n) {
                    j.selected = true;
                    return
                }
            } else {
                j.selected = n.include(l)
            }
        }
    }

    function c(i) {
        var h = i.selectedIndex;
        return h >= 0 ? g(i.options[h]) : null
    }

    function d(l) {
        var h, m = l.length;
        if (!m) {
            return null
        }
        for (var k = 0, h = []; k < m; k++) {
            var j = l.options[k];
            if (j.selected) {
                h.push(g(j))
            }
        }
        return h
    }

    function g(h) {
        return Element.hasAttribute(h, "value") ? h.value : h.text
    }
    return {
        input: b,
        inputSelector: f,
        textarea: e,
        select: a,
        selectOne: c,
        selectMany: d,
        optionValue: g,
        button: e
    }
})();
Abstract.TimedObserver = Class.create(PeriodicalExecuter, {
    initialize: function($super, a, b, c) {
        $super(c, b);
        this.element = $(a);
        this.lastValue = this.getValue()
    },
    execute: function() {
        var a = this.getValue();
        if (Object.isString(this.lastValue) && Object.isString(a) ? this.lastValue != a : String(this.lastValue) != String(a)) {
            this.callback(this.element, a);
            this.lastValue = a
        }
    }
});
Form.Element.Observer = Class.create(Abstract.TimedObserver, {
    getValue: function() {
        return Form.Element.getValue(this.element)
    }
});
Form.Observer = Class.create(Abstract.TimedObserver, {
    getValue: function() {
        return Form.serialize(this.element)
    }
});
Abstract.EventObserver = Class.create({
    initialize: function(a, b) {
        this.element = $(a);
        this.callback = b;
        this.lastValue = this.getValue();
        if (this.element.tagName.toLowerCase() == "form") {
            this.registerFormCallbacks()
        } else {
            this.registerCallback(this.element)
        }
    },
    onElementEvent: function() {
        var a = this.getValue();
        if (this.lastValue != a) {
            this.callback(this.element, a);
            this.lastValue = a
        }
    },
    registerFormCallbacks: function() {
        Form.getElements(this.element).each(this.registerCallback, this)
    },
    registerCallback: function(a) {
        if (a.type) {
            switch (a.type.toLowerCase()) {
                case "checkbox":
                case "radio":
                    Event.observe(a, "click", this.onElementEvent.bind(this));
                    break;
                default:
                    Event.observe(a, "change", this.onElementEvent.bind(this));
                    break
            }
        }
    }
});
Form.Element.EventObserver = Class.create(Abstract.EventObserver, {
    getValue: function() {
        return Form.Element.getValue(this.element)
    }
});
Form.EventObserver = Class.create(Abstract.EventObserver, {
    getValue: function() {
        return Form.serialize(this.element)
    }
});
(function() {
    var C = {
        KEY_BACKSPACE: 8,
        KEY_TAB: 9,
        KEY_RETURN: 13,
        KEY_ESC: 27,
        KEY_LEFT: 37,
        KEY_UP: 38,
        KEY_RIGHT: 39,
        KEY_DOWN: 40,
        KEY_DELETE: 46,
        KEY_HOME: 36,
        KEY_END: 35,
        KEY_PAGEUP: 33,
        KEY_PAGEDOWN: 34,
        KEY_INSERT: 45,
        cache: {}
    };
    var f = document.documentElement;
    var D = "onmouseenter" in f && "onmouseleave" in f;
    var a = function(E) {
        return false
    };
    if (window.attachEvent) {
        if (window.addEventListener) {
            a = function(E) {
                return !(E instanceof window.Event)
            }
        } else {
            a = function(E) {
                return true
            }
        }
    }
    var r;

    function A(F, E) {
        return F.which ? (F.which === E + 1) : (F.button === E)
    }
    var o = {
        0: 1,
        1: 4,
        2: 2
    };

    function y(F, E) {
        return F.button === o[E]
    }

    function B(F, E) {
        switch (E) {
            case 0:
                return F.which == 1 && !F.metaKey;
            case 1:
                return F.which == 2 || (F.which == 1 && F.metaKey);
            case 2:
                return F.which == 3;
            default:
                return false
        }
    }
    if (window.attachEvent) {
        if (!window.addEventListener) {
            r = y
        } else {
            r = function(F, E) {
                return a(F) ? y(F, E) : A(F, E)
            }
        }
    } else {
        if (Prototype.Browser.WebKit) {
            r = B
        } else {
            r = A
        }
    }

    function v(E) {
        return r(E, 0)
    }

    function t(E) {
        return r(E, 1)
    }

    function n(E) {
        return r(E, 2)
    }

    function d(G) {
        G = C.extend(G);
        var F = G.target,
            E = G.type,
            H = G.currentTarget;
        if (H && H.tagName) {
            if (E === "load" || E === "error" || (E === "click" && H.tagName.toLowerCase() === "input" && H.type === "radio")) {
                F = H
            }
        }
        if (F.nodeType == Node.TEXT_NODE) {
            F = F.parentNode
        }
        return Element.extend(F)
    }

    function p(F, G) {
        var E = C.element(F);
        if (!G) {
            return E
        }
        while (E) {
            if (Object.isElement(E) && Prototype.Selector.match(E, G)) {
                return Element.extend(E)
            }
            E = E.parentNode
        }
    }

    function s(E) {
        return {
            x: c(E),
            y: b(E)
        }
    }

    function c(G) {
        var F = document.documentElement,
            E = document.body || {
                scrollLeft: 0
            };
        return G.pageX || (G.clientX + (F.scrollLeft || E.scrollLeft) - (F.clientLeft || 0))
    }

    function b(G) {
        var F = document.documentElement,
            E = document.body || {
                scrollTop: 0
            };
        return G.pageY || (G.clientY + (F.scrollTop || E.scrollTop) - (F.clientTop || 0))
    }

    function q(E) {
        C.extend(E);
        E.preventDefault();
        E.stopPropagation();
        E.stopped = true
    }
    C.Methods = {
        isLeftClick: v,
        isMiddleClick: t,
        isRightClick: n,
        element: d,
        findElement: p,
        pointer: s,
        pointerX: c,
        pointerY: b,
        stop: q
    };
    var x = Object.keys(C.Methods).inject({}, function(E, F) {
        E[F] = C.Methods[F].methodize();
        return E
    });
    if (window.attachEvent) {
        function i(F) {
            var E;
            switch (F.type) {
                case "mouseover":
                case "mouseenter":
                    E = F.fromElement;
                    break;
                case "mouseout":
                case "mouseleave":
                    E = F.toElement;
                    break;
                default:
                    return null
            }
            return Element.extend(E)
        }
        var u = {
            stopPropagation: function() {
                this.cancelBubble = true
            },
            preventDefault: function() {
                this.returnValue = false
            },
            inspect: function() {
                return "[object Event]"
            }
        };
        C.extend = function(F, E) {
            if (!F) {
                return false
            }
            if (!a(F)) {
                return F
            }
            if (F._extendedByPrototype) {
                return F
            }
            F._extendedByPrototype = Prototype.emptyFunction;
            var G = C.pointer(F);
            Object.extend(F, {
                target: F.srcElement || E,
                relatedTarget: i(F),
                pageX: G.x,
                pageY: G.y
            });
            Object.extend(F, x);
            Object.extend(F, u);
            return F
        }
    } else {
        C.extend = Prototype.K
    }
    if (window.addEventListener) {
        C.prototype = window.Event.prototype || document.createEvent("HTMLEvents").__proto__;
        Object.extend(C.prototype, x)
    }

    function m(I, H, J) {
        var G = Element.retrieve(I, "prototype_event_registry");
        if (Object.isUndefined(G)) {
            e.push(I);
            G = Element.retrieve(I, "prototype_event_registry", $H())
        }
        var E = G.get(H);
        if (Object.isUndefined(E)) {
            E = [];
            G.set(H, E)
        }
        if (E.pluck("handler").include(J)) {
            return false
        }
        var F;
        if (H.include(":")) {
            F = function(K) {
                if (Object.isUndefined(K.eventName)) {
                    return false
                }
                if (K.eventName !== H) {
                    return false
                }
                C.extend(K, I);
                J.call(I, K)
            }
        } else {
            if (!D && (H === "mouseenter" || H === "mouseleave")) {
                if (H === "mouseenter" || H === "mouseleave") {
                    F = function(L) {
                        C.extend(L, I);
                        var K = L.relatedTarget;
                        while (K && K !== I) {
                            try {
                                K = K.parentNode
                            } catch (M) {
                                K = I
                            }
                        }
                        if (K === I) {
                            return
                        }
                        J.call(I, L)
                    }
                }
            } else {
                F = function(K) {
                    C.extend(K, I);
                    J.call(I, K)
                }
            }
        }
        F.handler = J;
        E.push(F);
        return F
    }

    function h() {
        for (var E = 0, F = e.length; E < F; E++) {
            C.stopObserving(e[E]);
            e[E] = null
        }
    }
    var e = [];
    if (Prototype.Browser.IE) {
        window.attachEvent("onunload", h)
    }
    if (Prototype.Browser.WebKit) {
        window.addEventListener("unload", Prototype.emptyFunction, false)
    }
    var l = Prototype.K,
        g = {
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        };
    if (!D) {
        l = function(E) {
            return (g[E] || E)
        }
    }

    function w(H, G, I) {
        H = $(H);
        var F = m(H, G, I);
        if (!F) {
            return H
        }
        if (G.include(":")) {
            if (H.addEventListener) {
                H.addEventListener("dataavailable", F, false)
            } else {
                H.attachEvent("ondataavailable", F);
                H.attachEvent("onlosecapture", F)
            }
        } else {
            var E = l(G);
            if (H.addEventListener) {
                H.addEventListener(E, F, false)
            } else {
                H.attachEvent("on" + E, F)
            }
        }
        return H
    }

    function k(K, H, L) {
        K = $(K);
        var G = Element.retrieve(K, "prototype_event_registry");
        if (!G) {
            return K
        }
        if (!H) {
            G.each(function(N) {
                var M = N.key;
                k(K, M)
            });
            return K
        }
        var I = G.get(H);
        if (!I) {
            return K
        }
        if (!L) {
            I.each(function(M) {
                k(K, H, M.handler)
            });
            return K
        }
        var J = I.length,
            F;
        while (J--) {
            if (I[J].handler === L) {
                F = I[J];
                break
            }
        }
        if (!F) {
            return K
        }
        if (H.include(":")) {
            if (K.removeEventListener) {
                K.removeEventListener("dataavailable", F, false)
            } else {
                K.detachEvent("ondataavailable", F);
                K.detachEvent("onlosecapture", F)
            }
        } else {
            var E = l(H);
            if (K.removeEventListener) {
                K.removeEventListener(E, F, false)
            } else {
                K.detachEvent("on" + E, F)
            }
        }
        G.set(H, I.without(F));
        return K
    }

    function z(H, G, F, E) {
        H = $(H);
        if (Object.isUndefined(E)) {
            E = true
        }
        if (H == document && document.createEvent && !H.dispatchEvent) {
            H = document.documentElement
        }
        var I;
        if (document.createEvent) {
            I = document.createEvent("HTMLEvents");
            I.initEvent("dataavailable", E, true)
        } else {
            I = document.createEventObject();
            I.eventType = E ? "ondataavailable" : "onlosecapture"
        }
        I.eventName = G;
        I.memo = F || {};
        if (document.createEvent) {
            H.dispatchEvent(I)
        } else {
            H.fireEvent(I.eventType, I)
        }
        return C.extend(I)
    }
    C.Handler = Class.create({
        initialize: function(G, F, E, H) {
            this.element = $(G);
            this.eventName = F;
            this.selector = E;
            this.callback = H;
            this.handler = this.handleEvent.bind(this)
        },
        start: function() {
            C.observe(this.element, this.eventName, this.handler);
            return this
        },
        stop: function() {
            C.stopObserving(this.element, this.eventName, this.handler);
            return this
        },
        handleEvent: function(F) {
            var E = C.findElement(F, this.selector);
            if (E) {
                this.callback.call(this.element, F, E)
            }
        }
    });

    function j(G, F, E, H) {
        G = $(G);
        if (Object.isFunction(E) && Object.isUndefined(H)) {
            H = E, E = null
        }
        return new C.Handler(G, F, E, H).start()
    }
    Object.extend(C, C.Methods);
    Object.extend(C, {
        fire: z,
        observe: w,
        stopObserving: k,
        on: j
    });
    Element.addMethods({
        fire: z,
        observe: w,
        stopObserving: k,
        on: j
    });
    Object.extend(document, {
        fire: z.methodize(),
        observe: w.methodize(),
        stopObserving: k.methodize(),
        on: j.methodize(),
        loaded: false
    });
    if (window.Event) {
        Object.extend(window.Event, C)
    } else {
        window.Event = C
    }
})();
(function() {
    var d;

    function a() {
        if (document.loaded) {
            return
        }
        if (d) {
            window.clearTimeout(d)
        }
        document.loaded = true;
        document.fire("dom:loaded")
    }

    function c() {
        if (document.readyState === "complete") {
            document.stopObserving("readystatechange", c);
            a()
        }
    }

    function b() {
        try {
            document.documentElement.doScroll("left")
        } catch (f) {
            d = b.defer();
            return
        }
        a()
    }
    if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", a, false)
    } else {
        document.observe("readystatechange", c);
        if (window == top) {
            d = b.defer()
        }
    }
    Event.observe(window, "load", a)
})();
Element.addMethods();
Hash.toQueryString = Object.toQueryString;
var Toggle = {
    display: Element.toggle
};
Element.Methods.childOf = Element.Methods.descendantOf;
var Insertion = {
    Before: function(a, b) {
        return Element.insert(a, {
            before: b
        })
    },
    Top: function(a, b) {
        return Element.insert(a, {
            top: b
        })
    },
    Bottom: function(a, b) {
        return Element.insert(a, {
            bottom: b
        })
    },
    After: function(a, b) {
        return Element.insert(a, {
            after: b
        })
    }
};
var $continue = new Error('"throw $continue" is deprecated, use "return" instead');
var Position = {
    includeScrollOffsets: false,
    prepare: function() {
        this.deltaX = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
        this.deltaY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    },
    within: function(b, a, c) {
        if (this.includeScrollOffsets) {
            return this.withinIncludingScrolloffsets(b, a, c)
        }
        this.xcomp = a;
        this.ycomp = c;
        this.offset = Element.cumulativeOffset(b);
        return (c >= this.offset[1] && c < this.offset[1] + b.offsetHeight && a >= this.offset[0] && a < this.offset[0] + b.offsetWidth)
    },
    withinIncludingScrolloffsets: function(b, a, d) {
        var c = Element.cumulativeScrollOffset(b);
        this.xcomp = a + c[0] - this.deltaX;
        this.ycomp = d + c[1] - this.deltaY;
        this.offset = Element.cumulativeOffset(b);
        return (this.ycomp >= this.offset[1] && this.ycomp < this.offset[1] + b.offsetHeight && this.xcomp >= this.offset[0] && this.xcomp < this.offset[0] + b.offsetWidth)
    },
    overlap: function(b, a) {
        if (!b) {
            return 0
        }
        if (b == "vertical") {
            return ((this.offset[1] + a.offsetHeight) - this.ycomp) / a.offsetHeight
        }
        if (b == "horizontal") {
            return ((this.offset[0] + a.offsetWidth) - this.xcomp) / a.offsetWidth
        }
    },
    cumulativeOffset: Element.Methods.cumulativeOffset,
    positionedOffset: Element.Methods.positionedOffset,
    absolutize: function(a) {
        Position.prepare();
        return Element.absolutize(a)
    },
    relativize: function(a) {
        Position.prepare();
        return Element.relativize(a)
    },
    realOffset: Element.Methods.cumulativeScrollOffset,
    offsetParent: Element.Methods.getOffsetParent,
    page: Element.Methods.viewportOffset,
    clone: function(b, c, a) {
        a = a || {};
        return Element.clonePosition(c, b, a)
    }
};
if (!document.getElementsByClassName) {
    document.getElementsByClassName = function(b) {
        function a(c) {
            return c.blank() ? null : "[contains(concat(' ', @class, ' '), ' " + c + " ')]"
        }
        b.getElementsByClassName = Prototype.BrowserFeatures.XPath ? function(c, e) {
            e = e.toString().strip();
            var d = /\s/.test(e) ? $w(e).map(a).join("") : a(e);
            return d ? document._getElementsByXPath(".//*" + d, c) : []
        } : function(e, f) {
            f = f.toString().strip();
            var g = [],
                h = (/\s/.test(f) ? $w(f) : null);
            if (!h && !f) {
                return g
            }
            var c = $(e).getElementsByTagName("*");
            f = " " + f + " ";
            for (var d = 0, k, j; k = c[d]; d++) {
                if (k.className && (j = " " + k.className + " ") && (j.include(f) || (h && h.all(function(i) {
                        return !i.toString().blank() && j.include(" " + i + " ")
                    })))) {
                    g.push(Element.extend(k))
                }
            }
            return g
        };
        return function(d, c) {
            return $(c || document.body).getElementsByClassName(d)
        }
    }(Element.Methods)
}
Element.ClassNames = Class.create();
Element.ClassNames.prototype = {
    initialize: function(a) {
        this.element = $(a)
    },
    _each: function(a) {
        this.element.className.split(/\s+/).select(function(b) {
            return b.length > 0
        })._each(a)
    },
    set: function(a) {
        this.element.className = a
    },
    add: function(a) {
        if (this.include(a)) {
            return
        }
        this.set($A(this).concat(a).join(" "))
    },
    remove: function(a) {
        if (!this.include(a)) {
            return
        }
        this.set($A(this).without(a).join(" "))
    },
    toString: function() {
        return $A(this).join(" ")
    }
};
Object.extend(Element.ClassNames.prototype, Enumerable);
(function() {
    window.Selector = Class.create({
        initialize: function(a) {
            this.expression = a.strip()
        },
        findElements: function(a) {
            return Prototype.Selector.select(this.expression, a)
        },
        match: function(a) {
            return Prototype.Selector.match(a, this.expression)
        },
        toString: function() {
            return this.expression
        },
        inspect: function() {
            return "#<Selector: " + this.expression + ">"
        }
    });
    Object.extend(Selector, {
        matchElements: function(f, g) {
            var a = Prototype.Selector.match,
                d = [];
            for (var c = 0, e = f.length; c < e; c++) {
                var b = f[c];
                if (a(b, g)) {
                    d.push(Element.extend(b))
                }
            }
            return d
        },
        findElement: function(f, g, b) {
            b = b || 0;
            var a = 0,
                d;
            for (var c = 0, e = f.length; c < e; c++) {
                d = f[c];
                if (Prototype.Selector.match(d, g) && b === a++) {
                    return Element.extend(d)
                }
            }
        },
        findChildElements: function(b, c) {
            var a = c.toArray().join(", ");
            return Prototype.Selector.select(a, b || document)
        }
    })
})();
// Combined /shared/jslib/flotr/flotr.js
var Flotr = {
    version: "%version%",
    author: "Bas Wenneker",
    website: "http://www.solutoire.com",
    isIphone: /iphone/i.test(navigator.userAgent),
    isIE9: document.documentMode == 9,
    graphTypes: {},
    plugins: {},
    addType: function(a, b) {
        Flotr.graphTypes[a] = b;
        Flotr.defaultOptions[a] = b.options || {};
        Flotr.defaultOptions.defaultType = Flotr.defaultOptions.defaultType || a
    },
    addPlugin: function(a, b) {
        Flotr.plugins[a] = b;
        Flotr.defaultOptions[a] = b.options || {}
    },
    draw: function(b, c, a, d) {
        d = d || Flotr.Graph;
        return new d(b, c, a)
    },
    getSeries: function(a) {
        return a.collect(function(c) {
            c = (c.data) ? Object.clone(c) : {
                data: c
            };
            for (var b = c.data.length - 1; b > -1; --b) {
                c.data[b][1] = (c.data[b][1] === null ? null : parseFloat(c.data[b][1]))
            }
            return c
        })
    },
    merge: function(e, c) {
        var d, b, a = c || {};
        for (d in e) {
            b = e[d];
            a[d] = (b && typeof(b) === "object" && !(b.constructor === Array || b.constructor === RegExp) && !Object.isElement(b)) ? Flotr.merge(b, c[d]) : a[d] = b
        }
        return a
    },
    clone: function(b) {
        var c, a, d = {};
        for (c in b) {
            a = b[c];
            d[c] = (a && typeof(a) === "object" && !(a.constructor === Array || a.constructor === RegExp) && !Object.isElement(a)) ? Flotr.clone(a) : a
        }
        return d
    },
    getTickSize: function(e, d, a, b) {
        var h = (a - d) / e,
            g = Flotr.getMagnitude(h),
            f = 10,
            c = h / g;
        if (c < 1.5) {
            f = 1
        } else {
            if (c < 2.25) {
                f = 2
            } else {
                if (c < 3) {
                    f = ((b == 0) ? 2 : 2.5)
                } else {
                    if (c < 7.5) {
                        f = 5
                    }
                }
            }
        }
        return f * g
    },
    defaultTickFormatter: function(a) {
        return a + ""
    },
    defaultTrackFormatter: function(a) {
        return "(" + a.x + ", " + a.y + ")"
    },
    engineeringNotation: function(e, a, d) {
        var c = ["Y", "Z", "E", "P", "T", "G", "M", "k", ""],
            f = ["y", "z", "a", "f", "p", "n", "ï¿½", "m", ""],
            b = c.length;
        d = d || 1000;
        a = Math.pow(10, a || 2);
        if (e == 0) {
            return 0
        }
        if (e > 1) {
            while (b-- && (e >= d)) {
                e /= d
            }
        } else {
            c = f;
            b = c.length;
            while (b-- && (e < 1)) {
                e *= d
            }
        }
        return (Math.round(e * a) / a) + c[b]
    },
    getMagnitude: function(a) {
        return Math.pow(10, Math.floor(Math.log(a) / Math.LN10))
    },
    toPixel: function(a) {
        return Math.floor(a) + 0.5
    },
    toRad: function(a) {
        return -a * (Math.PI / 180)
    },
    floorInBase: function(b, a) {
        return a * Math.floor(b / a)
    },
    drawText: function(b, d, a, e, c) {
        if (!b.fillText || Flotr.isIphone) {
            b.drawText(d, a, e, c);
            return
        }
        c = Object.extend({
            size: "10px",
            color: "#000000",
            textAlign: "left",
            textBaseline: "bottom",
            weight: 1,
            angle: 0
        }, c);
        b.save();
        b.translate(a, e);
        b.rotate(c.angle);
        b.fillStyle = c.color;
        b.font = (c.weight > 1 ? "bold " : "") + (c.size * 1.3) + "px sans-serif";
        b.textAlign = c.textAlign;
        b.textBaseline = c.textBaseline;
        b.fillText(d, 0, 0);
        b.restore()
    },
    measureText: function(a, d, c) {
        if (!a.fillText || Flotr.isIphone) {
            return {
                width: a.measure(d, c)
            }
        }
        c = Object.extend({
            size: "10px",
            weight: 1,
            angle: 0
        }, c);
        a.save();
        a.rotate(c.angle);
        a.font = (c.weight > 1 ? "bold " : "") + (c.size * 1.3) + "px sans-serif";
        var b = a.measureText(d);
        a.restore();
        return b
    },
    getBestTextAlign: function(b, a) {
        a = a || {
            textAlign: "center",
            textBaseline: "middle"
        };
        b += Flotr.getTextAngleFromAlign(a);
        if (Math.abs(Math.cos(b)) > 0.01) {
            a.textAlign = (Math.cos(b) > 0 ? "right" : "left")
        }
        if (Math.abs(Math.sin(b)) > 0.01) {
            a.textBaseline = (Math.sin(b) > 0 ? "top" : "bottom")
        }
        return a
    },
    alignTable: {
        "right middle": 0,
        "right top": Math.PI / 4,
        "center top": Math.PI / 2,
        "left top": 3 * (Math.PI / 4),
        "left middle": Math.PI,
        "left bottom": -3 * (Math.PI / 4),
        "center bottom": -Math.PI / 2,
        "right bottom": -Math.PI / 4,
        "center middle": 0
    },
    getTextAngleFromAlign: function(a) {
        return Flotr.alignTable[a.textAlign + " " + a.textBaseline] || 0
    }
};
Flotr.defaultOptions = {
    colors: ["#00A8F0", "#C0D800", "#CB4B4B", "#4DA74D", "#9440ED"],
    title: null,
    subtitle: null,
    shadowSize: 4,
    defaultType: null,
    HtmlText: true,
    fontSize: 7.5,
    resolution: 1,
    legend: {
        show: true,
        noColumns: 1,
        labelFormatter: function(a) {
            return a
        },
        labelBoxBorderColor: "#CCCCCC",
        labelBoxWidth: 14,
        labelBoxHeight: 10,
        labelBoxMargin: 5,
        container: null,
        position: "nw",
        margin: 5,
        backgroundColor: null,
        backgroundOpacity: 0.85
    },
    xaxis: {
        ticks: null,
        showLabels: true,
        labelsAngle: 0,
        title: null,
        titleAngle: 0,
        noTicks: 5,
        tickFormatter: Flotr.defaultTickFormatter,
        tickDecimals: null,
        min: null,
        max: null,
        autoscaleMargin: 0,
        color: null,
        mode: "normal",
        timeFormat: null,
        scaling: "linear",
        base: Math.E
    },
    x2axis: {},
    yaxis: {
        ticks: null,
        showLabels: true,
        labelsAngle: 0,
        title: null,
        titleAngle: 90,
        noTicks: 5,
        tickFormatter: Flotr.defaultTickFormatter,
        tickDecimals: null,
        min: null,
        max: null,
        autoscaleMargin: 0,
        color: null,
        scaling: "linear",
        base: Math.E
    },
    y2axis: {
        titleAngle: 270
    },
    grid: {
        color: "#545454",
        backgroundColor: null,
        tickColor: "#DDDDDD",
        labelMargin: 3,
        verticalLines: true,
        horizontalLines: true,
        outlineWidth: 2,
        circular: false
    },
    selection: {
        mode: null,
        color: "#B6D9FF",
        fps: 20
    },
    crosshair: {
        mode: null,
        color: "#FF0000",
        hideCursor: true
    },
    mouse: {
        track: false,
        trackAll: false,
        position: "se",
        relative: false,
        trackFormatter: Flotr.defaultTrackFormatter,
        margin: 5,
        lineColor: "#FF3F19",
        trackDecimals: 1,
        sensibility: 2,
        radius: 3,
        fillColor: null,
        fillOpacity: 0.4
    }
};
Flotr.Graph = Class.create({
    initialize: function(c, d, a) {
        try {
            this.el = $(c);
            if (!this.el) {
                throw "The target container doesn't exist"
            }
            if (!this.el.clientWidth) {
                throw "The target container must be visible"
            }
            this.registerPlugins();
            this.el.fire("flotr:beforeinit", [this]);
            this.el.graph = this;
            this.data = d;
            this.lastMousePos = {
                pageX: null,
                pageY: null
            };
            this.selection = {
                first: {
                    x: -1,
                    y: -1
                },
                second: {
                    x: -1,
                    y: -1
                }
            };
            this.plotOffset = {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            };
            this.prevSelection = null;
            this.selectionInterval = null;
            this.ignoreClick = false;
            this.prevHit = null;
            this.series = Flotr.getSeries(d);
            this.setOptions(a);
            var b, g;
            for (b in Flotr.graphTypes) {
                this[b] = Object.clone(Flotr.graphTypes[b]);
                for (g in this[b]) {
                    if (Object.isFunction(this[b][g])) {
                        this[b][g] = this[b][g].bind(this)
                    }
                }
            }
            this.constructCanvas();
            this.el.fire("flotr:afterconstruct", [this]);
            this.initEvents();
            this.findDataRanges();
            this.calculateTicks(this.axes.x);
            this.calculateTicks(this.axes.x2);
            this.calculateTicks(this.axes.y);
            this.calculateTicks(this.axes.y2);
            this.calculateSpacing();
            this.setupAxes();
            this.draw();
            this.insertLegend();
            this.el.fire("flotr:afterinit", [this])
        } catch (f) {
            try {
                console.error(f)
            } catch (f) {}
        }
    },
    setOptions: function(b) {
        var v = Flotr.clone(Flotr.defaultOptions);
        v.x2axis = Object.extend(Object.clone(v.xaxis), v.x2axis);
        v.y2axis = Object.extend(Object.clone(v.yaxis), v.y2axis);
        this.options = Flotr.merge(b || {}, v);
        this.axes = {
            x: {
                options: this.options.xaxis,
                n: 1
            },
            x2: {
                options: this.options.x2axis,
                n: 2
            },
            y: {
                options: this.options.yaxis,
                n: 1
            },
            y2: {
                options: this.options.y2axis,
                n: 2
            }
        };
        var h = [],
            d = [],
            m = this.series.length,
            q = this.series.length,
            e = this.options.colors,
            a = [],
            g = 0,
            o, l, k, u;
        for (l = q - 1; l > -1; --l) {
            o = this.series[l].color;
            if (o) {
                --q;
                if (Object.isNumber(o)) {
                    h.push(o)
                } else {
                    a.push(Flotr.Color.parse(o))
                }
            }
        }
        for (l = h.length - 1; l > -1; --l) {
            q = Math.max(q, h[l] + 1)
        }
        for (l = 0; d.length < q;) {
            o = (e.length == l) ? new Flotr.Color(100, 100, 100) : Flotr.Color.parse(e[l]);
            var f = g % 2 == 1 ? -1 : 1,
                n = 1 + f * Math.ceil(g / 2) * 0.2;
            o.scale(n, n, n);
            d.push(o);
            if (++l >= e.length) {
                l = 0;
                ++g
            }
        }
        for (l = 0, k = 0; l < m; ++l) {
            u = this.series[l];
            if (u.color == null) {
                u.color = d[k++].toString()
            } else {
                if (Object.isNumber(u.color)) {
                    u.color = d[u.color].toString()
                }
            }
            if (!u.xaxis) {
                u.xaxis = this.axes.x
            }
            if (u.xaxis == 1) {
                u.xaxis = this.axes.x
            } else {
                if (u.xaxis == 2) {
                    u.xaxis = this.axes.x2
                }
            }
            if (!u.yaxis) {
                u.yaxis = this.axes.y
            }
            if (u.yaxis == 1) {
                u.yaxis = this.axes.y
            } else {
                if (u.yaxis == 2) {
                    u.yaxis = this.axes.y2
                }
            }
            for (var r in Flotr.graphTypes) {
                u[r] = Object.extend(Object.clone(this.options[r]), u[r])
            }
            u.mouse = Object.extend(Object.clone(this.options.mouse), u.mouse);
            if (u.shadowSize == null) {
                u.shadowSize = this.options.shadowSize
            }
        }
    },
    setupAxes: function() {
        function b(d, e) {
            if (e.scaling === "logarithmic") {
                d = Math.log(Math.max(d, Number.MIN_VALUE));
                if (e.base !== Math.E) {
                    d /= Math.log(e.base)
                }
            }
            return d
        }

        function a(d, e) {
            if (e.scaling === "logarithmic") {
                d = (e.base === Math.E) ? Math.exp(d) : Math.pow(e.base, d)
            }
            return d
        }
        this.axes.x.d2p = this.axes.x2.d2p = function(d) {
            return (b(d, this.options) - this.min) * this.scale
        };
        this.axes.x.p2d = this.axes.x2.p2d = function(d) {
            return (a(d, this.options) / this.scale + this.min)
        };
        var c = this.plotHeight;
        this.axes.y.d2p = this.axes.y2.d2p = function(d) {
            return c - (b(d, this.options) - this.min) * this.scale
        };
        this.axes.y.p2d = this.axes.y2.p2d = function(d) {
            return a(this.max - d / this.scale, this.options)
        }
    },
    constructCanvas: function() {
        var e = this.el,
            b, g, a;
        this.canvas = e.select(".flotr-canvas")[0];
        this.overlay = e.select(".flotr-overlay")[0];
        e.descendants().invoke("remove");
        e.style.position = "relative";
        e.style.cursor = e.style.cursor || "default";
        b = e.getDimensions();
        this.canvasWidth = b.width;
        this.canvasHeight = b.height;
        var d = {
            width: b.width + "px",
            height: b.height + "px"
        };
        var f = this.options;
        b.width *= f.resolution;
        b.height *= f.resolution;
        if (this.canvasWidth <= 0 || this.canvasHeight <= 0) {
            throw "Invalid dimensions for plot, width = " + this.canvasWidth + ", height = " + this.canvasHeight
        }
        if (!this.canvas) {
            g = this.canvas = $(document.createElement("canvas"));
            g.className = "flotr-canvas";
            g.style.cssText = "position:absolute;left:0px;top:0px;"
        }
        g = this.canvas.writeAttribute(b).show().setStyle(d);
        g.context_ = null;
        e.insert(g);
        if (!this.overlay) {
            a = this.overlay = $(document.createElement("canvas"));
            a.className = "flotr-overlay";
            a.style.cssText = "position:absolute;left:0px;top:0px;"
        }
        a = this.overlay.writeAttribute(b).show().setStyle(d);
        a.context_ = null;
        e.insert(a);
        if (window.G_vmlCanvasManager) {
            window.G_vmlCanvasManager.initElement(g);
            window.G_vmlCanvasManager.initElement(a)
        }
        this.ctx = g.getContext("2d");
        this.octx = a.getContext("2d");
        if (!window.G_vmlCanvasManager) {
            this.ctx.scale(f.resolution, f.resolution);
            this.octx.scale(f.resolution, f.resolution)
        }
        this.textEnabled = !!this.ctx.drawText
    },
    processColor: function(a, b) {
        if (!a) {
            return "rgba(0, 0, 0, 0)"
        }
        b = Object.extend({
            x1: 0,
            y1: 0,
            x2: this.plotWidth,
            y2: this.plotHeight,
            opacity: 1,
            ctx: this.ctx
        }, b);
        if (a instanceof Flotr.Color) {
            return a.adjust(null, null, null, b.opacity).toString()
        }
        if (Object.isString(a)) {
            return Flotr.Color.parse(a).scale(null, null, null, b.opacity).toString()
        }
        var h = a.colors ? a : {
            colors: a
        };
        if (!b.ctx) {
            if (!Object.isArray(h.colors)) {
                return "rgba(0, 0, 0, 0)"
            }
            return Flotr.Color.parse(Object.isArray(h.colors[0]) ? h.colors[0][1] : h.colors[0]).scale(null, null, null, b.opacity).toString()
        }
        h = Object.extend({
            start: "top",
            end: "bottom"
        }, h);
        if (/top/i.test(h.start)) {
            b.x1 = 0
        }
        if (/left/i.test(h.start)) {
            b.y1 = 0
        }
        if (/bottom/i.test(h.end)) {
            b.x2 = 0
        }
        if (/right/i.test(h.end)) {
            b.y2 = 0
        }
        var e, g, d, f = b.ctx.createLinearGradient(b.x1, b.y1, b.x2, b.y2);
        for (e = 0; e < h.colors.length; e++) {
            g = h.colors[e];
            if (Object.isArray(g)) {
                d = g[0];
                g = g[1]
            } else {
                d = e / (h.colors.length - 1)
            }
            f.addColorStop(d, Flotr.Color.parse(g).scale(null, null, null, b.opacity))
        }
        return f
    },
    registerPlugins: function() {
        var a, b, d;
        for (a in Flotr.plugins) {
            b = Flotr.plugins[a];
            for (d in b.callbacks) {
                this.el.observe(d, b.callbacks[d].bindAsEventListener(this))
            }
            this[a] = Object.clone(b);
            for (p in this[a]) {
                if (Object.isFunction(this[a][p])) {
                    this[a][p] = this[a][p].bind(this)
                }
            }
        }
    },
    getTextDimensions: function(g, c, b, d) {
        if (!g) {
            return {
                width: 0,
                height: 0
            }
        }
        if (!this.options.HtmlText && this.textEnabled) {
            var e = this.ctx.getTextBounds(g, c);
            return {
                width: e.width + 2,
                height: e.height + 6
            }
        } else {
            var a = this.el.insert('<div style="position:absolute;top:-10000px;' + b + '" class="' + d + ' flotr-dummy-div">' + g + "</div>").select(".flotr-dummy-div")[0],
                f = a.getDimensions();
            a.remove();
            return f
        }
    },
    loadDataGrid: function() {
        if (this.seriesData) {
            return this.seriesData
        }
        var a = this.series,
            b = [];
        for (i = 0; i < a.length; ++i) {
            a[i].data.each(function(d) {
                var c = d[0],
                    g = d[1],
                    f = b.find(function(h) {
                        return h[0] == c
                    });
                if (f) {
                    f[i + 1] = g
                } else {
                    var e = [];
                    e[0] = c;
                    e[i + 1] = g;
                    b.push(e)
                }
            })
        }
        return this.seriesData = b.sortBy(function(c) {
            return c[0]
        })
    },
    initEvents: function() {
        this.overlay.stopObserving().observe("mousedown", this.mouseDownHandler.bindAsEventListener(this)).observe("mousemove", this.mouseMoveHandler.bindAsEventListener(this)).observe("mouseout", this.clearHit.bindAsEventListener(this)).observe("click", this.clickHandler.bindAsEventListener(this))
    },
    findDataRanges: function() {
        var n = this.series,
            k = this.axes;
        k.x.datamin = k.x2.datamin = k.y.datamin = k.y2.datamin = Number.MAX_VALUE;
        k.x.datamax = k.x2.datamax = k.y.datamax = k.y2.datamax = -Number.MAX_VALUE;
        if (n.length > 0) {
            var d, b, e, l, g, c, m, f;
            for (d = 0; d < n.length; ++d) {
                c = n[d].data, m = n[d].xaxis, f = n[d].yaxis;
                if (c.length > 0 && !n[d].hide) {
                    if (!m.used) {
                        m.datamin = m.datamax = c[0][0]
                    }
                    if (!f.used) {
                        f.datamin = f.datamax = c[0][1]
                    }
                    m.used = true;
                    f.used = true;
                    for (e = c.length - 1; e > -1; --e) {
                        l = c[e][0];
                        if (l < m.datamin) {
                            m.datamin = l
                        } else {
                            if (l > m.datamax) {
                                m.datamax = l
                            }
                        }
                        for (b = 1; b < c[e].length; b++) {
                            g = c[e][b];
                            if (g < f.datamin) {
                                f.datamin = g
                            } else {
                                if (g > f.datamax) {
                                    f.datamax = g
                                }
                            }
                        }
                    }
                }
            }
        }
        this.findXAxesValues();
        this.calculateRange(k.x, "x");
        if (k.x2.used) {
            this.calculateRange(k.x2, "x")
        }
        this.calculateRange(k.y, "y");
        if (k.y2.used) {
            this.calculateRange(k.y2, "y")
        }
    },
    extendRange: function(c, b) {
        var d = (b === "y") ? "extendYRange" : "extendXRange";
        for (var a in Flotr.graphTypes) {
            if (this[a][d]) {
                this[a][d](c)
            }
        }
    },
    calculateRange: function(e, d) {
        var g = e.options,
            c = g.min != null ? g.min : e.datamin,
            a = g.max != null ? g.max : e.datamax,
            f = g.autoscaleMargin;
        if (a - c == 0) {
            var b = (a == 0) ? 1 : 0.01;
            c -= b;
            a += b
        }
        e.tickSize = Flotr.getTickSize(g.noTicks, c, a, g.tickDecimals);
        if (g.min == null && f != 0) {
            c -= e.tickSize * f;
            if (c < 0 && e.datamin >= 0) {
                c = 0
            }
            c = e.tickSize * Math.floor(c / e.tickSize)
        }
        if (g.max == null && f != 0) {
            a += e.tickSize * f;
            if (a > 0 && e.datamax <= 0 && e.datamax != e.datamin) {
                a = 0
            }
            a = e.tickSize * Math.ceil(a / e.tickSize)
        }
        if (c == a) {
            a = c + 1
        }
        e.min = c;
        e.max = a;
        this.extendRange(e, d)
    },
    findXAxesValues: function() {
        var b, a, c;
        for (b = this.series.length - 1; b > -1; --b) {
            c = this.series[b];
            c.xaxis.values = c.xaxis.values || {};
            for (a = c.data.length - 1; a > -1; --a) {
                c.xaxis.values[c.data[a][0] + ""] = {}
            }
        }
    },
    calculateTicks: function(e) {
        var b = e.options,
            f, n;
        e.ticks = [];
        if (b.ticks) {
            var l = b.ticks,
                r, j;
            if (Object.isFunction(l)) {
                l = l({
                    min: e.min,
                    max: e.max
                })
            }
            for (f = 0; f < l.length; ++f) {
                r = l[f];
                if (typeof(r) == "object") {
                    n = r[0];
                    j = (r.length > 1) ? r[1] : b.tickFormatter(n)
                } else {
                    n = r;
                    j = b.tickFormatter(n)
                }
                e.ticks[f] = {
                    v: n,
                    label: j
                }
            }
        } else {
            if (b.mode == "time") {
                var g = Flotr.Date.timeUnits,
                    q = Flotr.Date.spec,
                    m = (e.max - e.min) / e.options.noTicks,
                    u, k;
                for (f = 0; f < q.length - 1; ++f) {
                    var h = q[f][0] * g[q[f][1]];
                    if (m < (h + q[f + 1][0] * g[q[f + 1][1]]) / 2 && h >= e.tickSize) {
                        break
                    }
                }
                u = q[f][0];
                k = q[f][1];
                if (k == "year") {
                    u = Flotr.getTickSize(e.options.noTicks * g.year, e.min, e.max, 0)
                }
                e.tickSize = u;
                e.tickUnit = k;
                e.ticks = Flotr.Date.generator(e)
            } else {
                var a = e.tickSize * Math.ceil(e.min / e.tickSize),
                    c;
                for (f = 0; a + f * e.tickSize <= e.max; ++f) {
                    n = a + f * e.tickSize;
                    c = b.tickDecimals;
                    if (c == null) {
                        c = 1 - Math.floor(Math.log(e.tickSize) / Math.LN10)
                    }
                    if (c < 0) {
                        c = 0
                    }
                    n = n.toFixed(c);
                    e.ticks.push({
                        v: n,
                        label: b.tickFormatter(n)
                    })
                }
            }
        }
    },
    calculateSpacing: function() {
        var q = this.axes,
            t = this.options,
            k = this.series,
            e = t.grid.labelMargin,
            r = q.x,
            b = q.x2,
            n = q.y,
            o = q.y2,
            g = 2,
            h, f, d, m;
        [r, b, n, o].each(function(j) {
            var a = "";
            if (j.options.showLabels) {
                for (h = 0; h < j.ticks.length; ++h) {
                    d = j.ticks[h].label.length;
                    if (d > a.length) {
                        a = j.ticks[h].label
                    }
                }
            }
            j.maxLabel = this.getTextDimensions(a, {
                size: t.fontSize,
                angle: Flotr.toRad(j.options.labelsAngle)
            }, "font-size:smaller;", "flotr-grid-label");
            j.titleSize = this.getTextDimensions(j.options.title, {
                size: t.fontSize * 1.2,
                angle: Flotr.toRad(j.options.titleAngle)
            }, "font-weight:bold;", "flotr-axis-title")
        }, this);
        m = this.getTextDimensions(t.title, {
            size: t.fontSize * 1.5
        }, "font-size:1em;font-weight:bold;", "flotr-title");
        this.titleHeight = m.height;
        m = this.getTextDimensions(t.subtitle, {
            size: t.fontSize
        }, "font-size:smaller;", "flotr-subtitle");
        this.subtitleHeight = m.height;
        if (t.show) {
            g = Math.max(g, t.points.radius + t.points.lineWidth / 2)
        }
        for (f = 0; f < t.length; ++f) {
            if (k[f].points.show) {
                g = Math.max(g, k[f].points.radius + k[f].points.lineWidth / 2)
            }
        }
        var c = this.plotOffset;
        c.bottom += (t.grid.circular ? 0 : (r.options.showLabels ? (r.maxLabel.height + e) : 0)) + (r.options.title ? (r.titleSize.height + e) : 0) + g;
        c.top += (t.grid.circular ? 0 : (b.options.showLabels ? (b.maxLabel.height + e) : 0)) + (b.options.title ? (b.titleSize.height + e) : 0) + this.subtitleHeight + this.titleHeight + g;
        c.left += (t.grid.circular ? 0 : (n.options.showLabels ? (n.maxLabel.width + e) : 0)) + (n.options.title ? (n.titleSize.width + e) : 0) + g;
        c.right += (t.grid.circular ? 0 : (o.options.showLabels ? (o.maxLabel.width + e) : 0)) + (o.options.title ? (o.titleSize.width + e) : 0) + g;
        c.top = Math.floor(c.top);
        this.plotWidth = this.canvasWidth - c.left - c.right;
        this.plotHeight = this.canvasHeight - c.bottom - c.top;
        r.scale = this.plotWidth / (r.max - r.min);
        b.scale = this.plotWidth / (b.max - b.min);
        n.scale = this.plotHeight / (n.max - n.min);
        o.scale = this.plotHeight / (o.max - o.min)
    },
    draw: function() {
        this.drawGrid();
        this.drawLabels();
        this.drawTitles();
        if (this.series.length) {
            this.el.fire("flotr:beforedraw", [this.series, this]);
            for (var a = 0; a < this.series.length; a++) {
                if (!this.series[a].hide) {
                    this.drawSeries(this.series[a])
                }
            }
        }
        this.drawOutline();
        this.el.fire("flotr:afterdraw", [this.series, this])
    },
    drawGrid: function() {
        var m, b = this.options,
            n = this.ctx,
            l;
        if (b.grid.verticalLines || b.grid.horizontalLines) {
            this.el.fire("flotr:beforegrid", [this.axes.x, this.axes.y, b, this])
        }
        n.save();
        n.lineWidth = 1;
        n.strokeStyle = b.grid.tickColor;
        if (b.grid.circular) {
            n.translate(this.plotOffset.left + this.plotWidth / 2, this.plotOffset.top + this.plotHeight / 2);
            var h = Math.min(this.plotHeight, this.plotWidth) * b.radar.radiusRatio / 2,
                c = this.axes.x.ticks.length,
                g = 2 * (Math.PI / c),
                d = -Math.PI / 2;
            n.beginPath();
            if (b.grid.horizontalLines) {
                l = this.axes.y;
                for (var f = 0; f < l.ticks.length; ++f) {
                    m = l.ticks[f].v;
                    var k = m / l.max;
                    for (var e = 0; e <= c; ++e) {
                        n[e == 0 ? "moveTo" : "lineTo"](Math.cos(e * g + d) * h * k, Math.sin(e * g + d) * h * k)
                    }
                }
            }
            if (b.grid.verticalLines) {
                for (var f = 0; f < c; ++f) {
                    n.moveTo(0, 0);
                    n.lineTo(Math.cos(f * g + d) * h, Math.sin(f * g + d) * h)
                }
            }
            n.stroke()
        } else {
            n.translate(this.plotOffset.left, this.plotOffset.top);
            if (b.grid.backgroundColor != null) {
                n.fillStyle = this.processColor(b.grid.backgroundColor, {
                    x1: 0,
                    y1: 0,
                    x2: this.plotWidth,
                    y2: this.plotHeight
                });
                n.fillRect(0, 0, this.plotWidth, this.plotHeight)
            }
            n.beginPath();
            if (b.grid.verticalLines) {
                l = this.axes.x;
                for (var f = 0; f < l.ticks.length; ++f) {
                    m = l.ticks[f].v;
                    if ((m <= l.min || m >= l.max) || (m == l.min || m == l.max) && b.grid.outlineWidth != 0) {
                        continue
                    }
                    n.moveTo(Math.floor(l.d2p(m)) + n.lineWidth / 2, 0);
                    n.lineTo(Math.floor(l.d2p(m)) + n.lineWidth / 2, this.plotHeight)
                }
            }
            if (b.grid.horizontalLines) {
                l = this.axes.y;
                for (var e = 0; e < l.ticks.length; ++e) {
                    m = l.ticks[e].v;
                    if ((m <= l.min || m >= l.max) || (m == l.min || m == l.max) && b.grid.outlineWidth != 0) {
                        continue
                    }
                    n.moveTo(0, Math.floor(l.d2p(m)) + n.lineWidth / 2);
                    n.lineTo(this.plotWidth, Math.floor(l.d2p(m)) + n.lineWidth / 2)
                }
            }
            n.stroke()
        }
        n.restore();
        if (b.grid.verticalLines || b.grid.horizontalLines) {
            this.el.fire("flotr:aftergrid", [this.axes.x, this.axes.y, b, this])
        }
    },
    drawOutline: function() {
        var j, a = this.options,
            k = this.ctx;
        if (a.grid.outlineWidth == 0) {
            return
        }
        k.save();
        if (a.grid.circular) {
            k.translate(this.plotOffset.left + this.plotWidth / 2, this.plotOffset.top + this.plotHeight / 2);
            var g = Math.min(this.plotHeight, this.plotWidth) * a.radar.radiusRatio / 2,
                b = this.axes.x.ticks.length,
                f = 2 * (Math.PI / b),
                d = -Math.PI / 2;
            k.beginPath();
            k.lineWidth = a.grid.outlineWidth;
            k.strokeStyle = a.grid.color;
            k.lineJoin = "round";
            for (var e = 0; e <= b; ++e) {
                k[e == 0 ? "moveTo" : "lineTo"](Math.cos(e * f + d) * g, Math.sin(e * f + d) * g)
            }
            k.stroke()
        } else {
            k.translate(this.plotOffset.left, this.plotOffset.top);
            var c = a.grid.outlineWidth,
                h = 0.5 - c + ((c + 1) % 2 / 2);
            k.lineWidth = c;
            k.strokeStyle = a.grid.color;
            k.lineJoin = "miter";
            k.strokeRect(h, h, this.plotWidth, this.plotHeight)
        }
        k.restore()
    },
    drawLabels: function() {
        var c = 0,
            d, m, o, k, q, g, l, e = this.options,
            n = this.ctx,
            v = this.axes;
        for (o = 0; o < v.x.ticks.length; ++o) {
            if (v.x.ticks[o].label) {
                ++c
            }
        }
        m = this.plotWidth / c;
        if (e.grid.circular) {
            n.save();
            n.translate(this.plotOffset.left + this.plotWidth / 2, this.plotOffset.top + this.plotHeight / 2);
            var f = this.plotHeight * e.radar.radiusRatio / 2 + e.fontSize,
                u = this.axes.x.ticks.length,
                b = 2 * (Math.PI / u),
                t = -Math.PI / 2;
            var r = {
                size: e.fontSize
            };
            d = v.x;
            r.color = d.options.color || e.grid.color;
            for (o = 0; o < d.ticks.length && d.options.showLabels; ++o) {
                q = d.ticks[o];
                q.label += "";
                if (!q.label || q.label.length == 0) {
                    continue
                }
                var j = Math.cos(o * b + t) * f,
                    h = Math.sin(o * b + t) * f;
                r.angle = Flotr.toRad(d.options.labelsAngle);
                r.textBaseline = "middle";
                r.textAlign = (Math.abs(j) < 0.1 ? "center" : (j < 0 ? "right" : "left"));
                Flotr.drawText(n, q.label, j, h, r)
            }
            d = v.y;
            r.color = d.options.color || e.grid.color;
            for (o = 0; o < d.ticks.length && d.options.showLabels; ++o) {
                q = d.ticks[o];
                q.label += "";
                if (!q.label || q.label.length == 0) {
                    continue
                }
                r.angle = Flotr.toRad(d.options.labelsAngle);
                r.textBaseline = "middle";
                r.textAlign = "left";
                Flotr.drawText(n, q.label, 3, -(d.ticks[o].v / d.max) * (f - e.fontSize), r)
            }
            n.restore();
            return
        }
        if (!e.HtmlText && this.textEnabled) {
            var r = {
                size: e.fontSize
            };
            d = v.x;
            r.color = d.options.color || e.grid.color;
            for (o = 0; o < d.ticks.length && d.options.showLabels && d.used; ++o) {
                q = d.ticks[o];
                if (!q.label || q.label.length == 0) {
                    continue
                }
                g = d.d2p(q.v);
                if (g < 0 || g > this.plotWidth) {
                    continue
                }
                r.angle = Flotr.toRad(d.options.labelsAngle);
                r.textAlign = "center";
                r.textBaseline = "top";
                r = Flotr.getBestTextAlign(r.angle, r);
                Flotr.drawText(n, q.label, this.plotOffset.left + g, this.plotOffset.top + this.plotHeight + e.grid.labelMargin, r)
            }
            d = v.x2;
            r.color = d.options.color || e.grid.color;
            for (o = 0; o < d.ticks.length && d.options.showLabels && d.used; ++o) {
                q = d.ticks[o];
                if (!q.label || q.label.length == 0) {
                    continue
                }
                g = d.d2p(q.v);
                if (g < 0 || g > this.plotWidth) {
                    continue
                }
                r.angle = Flotr.toRad(d.options.labelsAngle);
                r.textAlign = "center";
                r.textBaseline = "bottom";
                r = Flotr.getBestTextAlign(r.angle, r);
                Flotr.drawText(n, q.label, this.plotOffset.left + g, this.plotOffset.top + e.grid.labelMargin, r)
            }
            d = v.y;
            r.color = d.options.color || e.grid.color;
            for (o = 0; o < d.ticks.length && d.options.showLabels && d.used; ++o) {
                q = d.ticks[o];
                if (!q.label || q.label.length == 0) {
                    continue
                }
                l = d.d2p(q.v);
                if (l < 0 || l > this.plotHeight) {
                    continue
                }
                r.angle = Flotr.toRad(d.options.labelsAngle);
                r.textAlign = "right";
                r.textBaseline = "middle";
                r = Flotr.getBestTextAlign(r.angle, r);
                Flotr.drawText(n, q.label, this.plotOffset.left - e.grid.labelMargin, this.plotOffset.top + l, r)
            }
            d = v.y2;
            r.color = d.options.color || e.grid.color;
            for (o = 0; o < d.ticks.length && d.options.showLabels && d.used; ++o) {
                q = d.ticks[o];
                if (!q.label || q.label.length == 0) {
                    continue
                }
                l = d.d2p(q.v);
                if (l < 0 || l > this.plotHeight) {
                    continue
                }
                r.angle = Flotr.toRad(d.options.labelsAngle);
                r.textAlign = "left";
                r.textBaseline = "middle";
                r = Flotr.getBestTextAlign(r.angle, r);
                Flotr.drawText(n, q.label, this.plotOffset.left + this.plotWidth + e.grid.labelMargin, this.plotOffset.top + l, r);
                n.save();
                n.strokeStyle = r.color;
                n.beginPath();
                n.moveTo(this.plotOffset.left + this.plotWidth - 8, this.plotOffset.top + d.d2p(q.v));
                n.lineTo(this.plotOffset.left + this.plotWidth, this.plotOffset.top + d.d2p(q.v));
                n.stroke();
                n.restore()
            }
        } else {
            if (v.x.options.showLabels || v.x2.options.showLabels || v.y.options.showLabels || v.y2.options.showLabels) {
                k = ['<div style="font-size:smaller;color:' + e.grid.color + ';" class="flotr-labels">'];
                d = v.x;
                if (d.options.showLabels) {
                    for (o = 0; o < d.ticks.length; ++o) {
                        q = d.ticks[o];
                        if (q.v < d.min || q.v > d.max) {
                            continue
                        }
                        if (!q.label || q.label.length == 0 || (this.plotOffset.left + d.d2p(q.v) < 0) || (this.plotOffset.left + d.d2p(q.v) > this.canvasWidth)) {
                            continue
                        }
                        k.push('<div style="position:absolute;top:', (this.plotOffset.top + this.plotHeight + e.grid.labelMargin), "px;left:", (this.plotOffset.left + d.d2p(q.v) - m / 2), "px;width:", m, "px;text-align:center;", (d.options.color ? ("color:" + d.options.color + ";") : ""), '" class="flotr-grid-label">', q.label, "</div>")
                    }
                }
                d = v.x2;
                if (d.options.showLabels && d.used) {
                    for (o = 0; o < d.ticks.length; ++o) {
                        q = d.ticks[o];
                        if (!q.label || q.label.length == 0 || (this.plotOffset.left + d.d2p(q.v) < 0) || (this.plotOffset.left + d.d2p(q.v) > this.canvasWidth)) {
                            continue
                        }
                        k.push('<div style="position:absolute;top:', (this.plotOffset.top - e.grid.labelMargin - d.maxLabel.height), "px;left:", (this.plotOffset.left + d.d2p(q.v) - m / 2), "px;width:", m, "px;text-align:center;", (d.options.color ? ("color:" + d.options.color + ";") : ""), '" class="flotr-grid-label">', q.label, "</div>")
                    }
                }
                d = v.y;
                if (d.options.showLabels) {
                    for (o = 0; o < d.ticks.length; ++o) {
                        q = d.ticks[o];
                        if (!q.label || q.label.length == 0 || (this.plotOffset.top + d.d2p(q.v) < 0) || (this.plotOffset.top + d.d2p(q.v) > this.canvasHeight)) {
                            continue
                        }
                        k.push('<div style="position:absolute;top:', (this.plotOffset.top + d.d2p(q.v) - d.maxLabel.height / 2), "px;left:0;width:", (this.plotOffset.left - e.grid.labelMargin), "px;text-align:right;", (d.options.color ? ("color:" + d.options.color + ";") : ""), '" class="flotr-grid-label flotr-grid-label-y">', q.label, "</div>")
                    }
                }
                d = v.y2;
                if (d.options.showLabels && d.used) {
                    n.save();
                    n.strokeStyle = d.options.color || e.grid.color;
                    n.beginPath();
                    for (o = 0; o < d.ticks.length; ++o) {
                        q = d.ticks[o];
                        if (!q.label || q.label.length == 0 || (this.plotOffset.top + d.d2p(q.v) < 0) || (this.plotOffset.top + d.d2p(q.v) > this.canvasHeight)) {
                            continue
                        }
                        k.push('<div style="position:absolute;top:', (this.plotOffset.top + d.d2p(q.v) - d.maxLabel.height / 2), "px;right:0;width:", (this.plotOffset.right - e.grid.labelMargin), "px;text-align:left;", (d.options.color ? ("color:" + d.options.color + ";") : ""), '" class="flotr-grid-label flotr-grid-label-y">', q.label, "</div>");
                        n.moveTo(this.plotOffset.left + this.plotWidth - 8, this.plotOffset.top + d.d2p(q.v));
                        n.lineTo(this.plotOffset.left + this.plotWidth, this.plotOffset.top + d.d2p(q.v))
                    }
                    n.stroke();
                    n.restore()
                }
                k.push("</div>");
                this.el.insert(k.join(""))
            }
        }
    },
    drawTitles: function() {
        var e, d = this.options,
            g = d.grid.labelMargin,
            c = this.ctx,
            b = this.axes;
        if (!d.HtmlText && this.textEnabled) {
            var f = {
                size: d.fontSize,
                color: d.grid.color,
                textAlign: "center"
            };
            if (d.subtitle) {
                Flotr.drawText(c, d.subtitle, this.plotOffset.left + this.plotWidth / 2, this.titleHeight + this.subtitleHeight - 2, f)
            }
            f.weight = 1.5;
            f.size *= 1.5;
            if (d.title) {
                Flotr.drawText(c, d.title, this.plotOffset.left + this.plotWidth / 2, this.titleHeight - 2, f)
            }
            f.weight = 1.8;
            f.size *= 0.8;
            if (b.x.options.title && b.x.used) {
                f.textAlign = "center";
                f.textBaseline = "top";
                f.angle = Flotr.toRad(b.x.options.titleAngle);
                f = Flotr.getBestTextAlign(f.angle, f);
                Flotr.drawText(c, b.x.options.title, this.plotOffset.left + this.plotWidth / 2, this.plotOffset.top + b.x.maxLabel.height + this.plotHeight + 2 * g, f)
            }
            if (b.x2.options.title && b.x2.used) {
                f.textAlign = "center";
                f.textBaseline = "bottom";
                f.angle = Flotr.toRad(b.x2.options.titleAngle);
                f = Flotr.getBestTextAlign(f.angle, f);
                Flotr.drawText(c, b.x2.options.title, this.plotOffset.left + this.plotWidth / 2, this.plotOffset.top - b.x2.maxLabel.height - 2 * g, f)
            }
            if (b.y.options.title && b.y.used) {
                f.textAlign = "right";
                f.textBaseline = "middle";
                f.angle = Flotr.toRad(b.y.options.titleAngle);
                f = Flotr.getBestTextAlign(f.angle, f);
                Flotr.drawText(c, b.y.options.title, this.plotOffset.left - b.y.maxLabel.width - 2 * g, this.plotOffset.top + this.plotHeight / 2, f)
            }
            if (b.y2.options.title && b.y2.used) {
                f.textAlign = "left";
                f.textBaseline = "middle";
                f.angle = Flotr.toRad(b.y2.options.titleAngle);
                f = Flotr.getBestTextAlign(f.angle, f);
                Flotr.drawText(c, b.y2.options.title, this.plotOffset.left + this.plotWidth + b.y2.maxLabel.width + 2 * g, this.plotOffset.top + this.plotHeight / 2, f)
            }
        } else {
            e = ['<div style="color:' + d.grid.color + ';" class="flotr-titles">'];
            if (d.title) {
                e.push('<div style="position:absolute;top:0;left:', this.plotOffset.left, "px;font-size:1em;font-weight:bold;text-align:center;width:", this.plotWidth, 'px;" class="flotr-title">', d.title, "</div>")
            }
            if (d.subtitle) {
                e.push('<div style="position:absolute;top:', this.titleHeight, "px;left:", this.plotOffset.left, "px;font-size:smaller;text-align:center;width:", this.plotWidth, 'px;" class="flotr-subtitle">', d.subtitle, "</div>")
            }
            e.push("</div>");
            e.push('<div class="flotr-axis-title" style="font-weight:bold;">');
            if (b.x.options.title && b.x.used) {
                e.push('<div style="position:absolute;top:', (this.plotOffset.top + this.plotHeight + d.grid.labelMargin + b.x.titleSize.height), "px;left:", this.plotOffset.left, "px;width:", this.plotWidth, 'px;text-align:center;" class="flotr-axis-title">', b.x.options.title, "</div>")
            }
            if (b.x2.options.title && b.x2.used) {
                e.push('<div style="position:absolute;top:0;left:', this.plotOffset.left, "px;width:", this.plotWidth, 'px;text-align:center;" class="flotr-axis-title">', b.x2.options.title, "</div>")
            }
            if (b.y.options.title && b.y.used) {
                e.push('<div style="position:absolute;top:', (this.plotOffset.top + this.plotHeight / 2 - b.y.titleSize.height / 2), 'px;left:0;text-align:right;" class="flotr-axis-title">', b.y.options.title, "</div>")
            }
            if (b.y2.options.title && b.y2.used) {
                e.push('<div style="position:absolute;top:', (this.plotOffset.top + this.plotHeight / 2 - b.y.titleSize.height / 2), 'px;right:0;text-align:right;" class="flotr-axis-title">', b.y2.options.title, "</div>")
            }
            e.push("</div>");
            this.el.insert(e.join(""))
        }
    },
    drawSeries: function(a) {
        a = a || this.series;
        var b = false;
        for (type in Flotr.graphTypes) {
            if (a[type] && a[type].show) {
                b = true;
                this[type].draw(a)
            }
        }
        if (!b) {
            this[this.options.defaultType].draw(a)
        }
    },
    insertLegend: function() {
        if (!this.options.legend.show) {
            return
        }
        var o = this.series,
            q = this.plotOffset,
            e = this.options,
            a = e.legend,
            N = [],
            b = false,
            A = this.ctx,
            D;
        var C = o.findAll(function(c) {
            return (c.label && !c.hide)
        }).length;
        if (C) {
            if (!e.HtmlText && this.textEnabled && !$(a.container)) {
                var F = {
                    size: e.fontSize * 1.1,
                    color: e.grid.color
                };
                var w = a.position,
                    z = a.margin,
                    v = a.labelBoxWidth,
                    M = a.labelBoxHeight,
                    E = a.labelBoxMargin,
                    I = q.left + z,
                    G = q.top + z;
                var L = 0;
                for (D = o.length - 1; D > -1; --D) {
                    if (!o[D].label || o[D].hide) {
                        continue
                    }
                    var j = a.labelFormatter(o[D].label);
                    L = Math.max(L, Flotr.measureText(A, j, F).width)
                }
                var u = Math.round(v + E * 3 + L),
                    f = Math.round(C * (E + M) + E);
                if (w.charAt(0) == "s") {
                    G = q.top + this.plotHeight - (z + f)
                }
                if (w.charAt(1) == "e") {
                    I = q.left + this.plotWidth - (z + u)
                }
                var B = this.processColor(e.legend.backgroundColor || "rgb(240,240,240)", {
                    opacity: e.legend.backgroundOpacity || 0.1
                });
                A.fillStyle = B;
                A.fillRect(I, G, u, f);
                A.strokeStyle = e.legend.labelBoxBorderColor;
                A.strokeRect(Flotr.toPixel(I), Flotr.toPixel(G), u, f);
                var n = I + E;
                var l = G + E;
                for (D = 0; D < o.length; D++) {
                    if (!o[D].label || o[D].hide) {
                        continue
                    }
                    var j = a.labelFormatter(o[D].label);
                    A.fillStyle = o[D].color;
                    A.fillRect(n, l, v - 1, M - 1);
                    A.strokeStyle = a.labelBoxBorderColor;
                    A.lineWidth = 1;
                    A.strokeRect(Math.ceil(n) - 1.5, Math.ceil(l) - 1.5, v + 2, M + 2);
                    Flotr.drawText(A, j, n + v + E, l + (M + F.size - A.fontDescent(F)) / 2, F);
                    l += M + E
                }
            } else {
                for (D = 0; D < o.length; ++D) {
                    if (!o[D].label || o[D].hide) {
                        continue
                    }
                    if (D % e.legend.noColumns == 0) {
                        N.push(b ? "</tr><tr>" : "<tr>");
                        b = true
                    }
                    var t = o[D],
                        j = a.labelFormatter(t.label),
                        k = a.labelBoxWidth,
                        h = a.labelBoxHeight,
                        d = "opacity:" + t.bars.fillOpacity + ";filter:alpha(opacity=" + t.bars.fillOpacity * 100 + ");",
                        B = "background-color:" + ((t.bars.show && t.bars.fillColor && t.bars.fill) ? t.bars.fillColor : t.color) + ";";
                    N.push('<td class="flotr-legend-color-box">', '<div style="border:1px solid ', a.labelBoxBorderColor, ';padding:1px">', '<div style="width:', (k - 1), "px;height:", (h - 1), "px;border:1px solid ", o[D].color, '">', '<div style="width:', k, "px;height:", h, "px;", d, B, '"></div>', "</div>", "</div>", "</td>", '<td class="flotr-legend-label">', j, "</td>")
                }
                if (b) {
                    N.push("</tr>")
                }
                if (N.length > 0) {
                    var H = '<table style="font-size:smaller;color:' + e.grid.color + '">' + N.join("") + "</table>";
                    if (e.legend.container != null) {
                        $(e.legend.container).innerHTML = H
                    } else {
                        var g = "",
                            w = e.legend.position,
                            z = e.legend.margin;
                        if (w.charAt(0) == "n") {
                            g += "top:" + (z + q.top) + "px;bottom:auto;"
                        } else {
                            if (w.charAt(0) == "s") {
                                g += "bottom:" + (z + q.bottom) + "px;top:auto;"
                            }
                        }
                        if (w.charAt(1) == "e") {
                            g += "right:" + (z + q.right) + "px;left:auto;"
                        } else {
                            if (w.charAt(1) == "w") {
                                g += "left:" + (z + q.left) + "px;right:auto;"
                            }
                        }
                        var r = this.el.insert('<div class="flotr-legend" style="position:absolute;z-index:2;' + g + '">' + H + "</div>").select("div.flotr-legend")[0];
                        if (e.legend.backgroundOpacity != 0) {
                            var K = e.legend.backgroundColor;
                            if (K == null) {
                                var J = (e.grid.backgroundColor != null) ? e.grid.backgroundColor : Flotr.Color.extract(r);
                                K = this.processColor(J, null, {
                                    opacity: 1
                                })
                            }
                            this.el.insert('<div class="flotr-legend-bg" style="position:absolute;width:' + r.getWidth() + "px;height:" + r.getHeight() + "px;" + g + "background-color:" + K + ';"> </div>').select("div.flotr-legend-bg")[0].setOpacity(e.legend.backgroundOpacity)
                        }
                    }
                }
            }
        }
    },
    getEventPosition: function(a) {
        var e = this.overlay.cumulativeOffset(),
            d = Event.pointer(a),
            c = (d.x - e.left - this.plotOffset.left),
            b = (d.y - e.top - this.plotOffset.top);
        return {
            x: this.axes.x.p2d(c),
            x2: this.axes.x2.p2d(c),
            y: this.axes.y.p2d(b),
            y2: this.axes.y2.p2d(b),
            relX: c,
            relY: b,
            absX: d.x,
            absY: d.y
        }
    },
    clickHandler: function(a) {
        if (this.ignoreClick) {
            return this.ignoreClick = false
        }
        this.el.fire("flotr:click", [this.getEventPosition(a), this])
    },
    mouseMoveHandler: function(a) {
        var b = this.getEventPosition(a);
        this.lastMousePos.pageX = b.absX;
        this.lastMousePos.pageY = b.absY;
        if (this.options.crosshair.mode) {
            this.clearCrosshair()
        }
        if (this.selectionInterval == null && (this.options.mouse.track || this.series.any(function(c) {
                return c.mouse && c.mouse.track
            }))) {
            this.hit(b)
        }
        if (this.options.crosshair.mode) {
            this.drawCrosshair(b)
        }
        this.el.fire("flotr:mousemove", [a, b, this])
    },
    mouseDownHandler: function(c) {
        if (c.isRightClick()) {
            c.stop();
            var b = this.overlay;
            b.hide();

            function a() {
                b.show();
                document.stopObserving("mousemove", a)
            }
            document.observe("mousemove", a);
            return
        }
        if (!this.options.selection.mode || !c.isLeftClick()) {
            return
        }
        this.setSelectionPos(this.selection.first, c);
        if (this.selectionInterval != null) {
            clearInterval(this.selectionInterval)
        }
        this.lastMousePos.pageX = null;
        this.selectionInterval = setInterval(this.updateSelection.bindAsEventListener(this), 1000 / this.options.selection.fps);
        this.mouseUpHandler = this.mouseUpHandler.bindAsEventListener(this);
        document.observe("mouseup", this.mouseUpHandler)
    },
    fireSelectEvent: function() {
        var b = this.axes,
            g = this.selection,
            d, c, f, e;
        d = b.x.p2d(g.first.x);
        c = b.x.p2d(g.second.x);
        f = b.y.p2d(g.first.y);
        e = b.y.p2d(g.second.y);
        this.el.fire("flotr:select", [{
            x1: Math.min(d, c),
            y1: Math.min(f, e),
            x2: Math.max(d, c),
            y2: Math.max(f, e),
            xfirst: d,
            xsecond: c,
            yfirst: f,
            ysecond: e
        }, this])
    },
    mouseUpHandler: function(a) {
        document.stopObserving("mouseup", this.mouseUpHandler);
        a.stop();
        if (this.selectionInterval != null) {
            clearInterval(this.selectionInterval);
            this.selectionInterval = null
        }
        this.setSelectionPos(this.selection.second, a);
        this.clearSelection();
        if (this.selectionIsSane()) {
            this.drawSelection();
            this.fireSelectEvent();
            this.ignoreClick = true
        }
    },
    setSelectionPos: function(d, b) {
        var a = this.options,
            c = this.overlay.cumulativeOffset();
        if (a.selection.mode.indexOf("x") == -1) {
            d.x = (d == this.selection.first) ? 0 : this.plotWidth
        } else {
            d.x = b.pageX - c.left - this.plotOffset.left;
            d.x = Math.min(Math.max(0, d.x), this.plotWidth)
        }
        if (a.selection.mode.indexOf("y") == -1) {
            d.y = (d == this.selection.first) ? 0 : this.plotHeight
        } else {
            d.y = b.pageY - c.top - this.plotOffset.top;
            d.y = Math.min(Math.max(0, d.y), this.plotHeight)
        }
    },
    updateSelection: function() {
        if (this.lastMousePos.pageX == null) {
            return
        }
        this.setSelectionPos(this.selection.second, this.lastMousePos);
        this.clearSelection();
        if (this.selectionIsSane()) {
            this.drawSelection()
        }
    },
    clearSelection: function() {
        if (this.prevSelection == null) {
            return
        }
        var g = this.prevSelection,
            e = this.octx.lineWidth,
            c = this.plotOffset,
            a = Math.min(g.first.x, g.second.x),
            f = Math.min(g.first.y, g.second.y),
            b = Math.abs(g.second.x - g.first.x),
            d = Math.abs(g.second.y - g.first.y);
        this.octx.clearRect(a + c.left - e / 2 + 0.5, f + c.top - e / 2 + 0.5, b + e, d + e);
        this.prevSelection = null
    },
    setSelection: function(b, g) {
        var j = this.options,
            a = this.axes.x,
            f = this.axes.y,
            c = f.scale,
            h = a.scale,
            e = j.selection.mode.indexOf("x") != -1,
            d = j.selection.mode.indexOf("y") != -1;
        this.clearSelection();
        this.selection.first.y = (e && !d) ? 0 : (f.max - b.y1) * c;
        this.selection.second.y = (e && !d) ? this.plotHeight : (f.max - b.y2) * c;
        this.selection.first.x = (d && !e) ? 0 : (b.x1 - a.min) * h;
        this.selection.second.x = (d && !e) ? this.plotWidth : (b.x2 - a.min) * h;
        this.drawSelection();
        if (!g) {
            this.fireSelectEvent()
        }
    },
    drawSelection: function() {
        var c = this.prevSelection,
            j = this.selection,
            g = this.octx,
            k = this.options,
            a = this.plotOffset;
        if (c != null && j.first.x == c.first.x && j.first.y == c.first.y && j.second.x == c.second.x && j.second.y == c.second.y) {
            return
        }
        g.save();
        g.strokeStyle = this.processColor(k.selection.color, {
            opacity: 0.8
        });
        g.lineWidth = 1;
        g.lineJoin = "miter";
        g.fillStyle = this.processColor(k.selection.color, {
            opacity: 0.4
        });
        this.prevSelection = {
            first: {
                x: j.first.x,
                y: j.first.y
            },
            second: {
                x: j.second.x,
                y: j.second.y
            }
        };
        var e = Math.min(j.first.x, j.second.x),
            d = Math.min(j.first.y, j.second.y),
            f = Math.abs(j.second.x - j.first.x),
            b = Math.abs(j.second.y - j.first.y);
        g.fillRect(e + a.left + 0.5, d + a.top + 0.5, f, b);
        g.strokeRect(e + a.left + 0.5, d + a.top + 0.5, f, b);
        g.restore()
    },
    drawCrosshair: function(f) {
        var d = this.octx,
            c = this.options,
            b = this.plotOffset,
            a = b.left + f.relX + 0.5,
            e = b.top + f.relY + 0.5;
        if (f.relX < 0 || f.relY < 0 || f.relX > this.plotWidth || f.relY > this.plotHeight) {
            this.el.style.cursor = null;
            this.el.removeClassName("flotr-crosshair");
            return
        }
        this.lastMousePos.relX = null;
        this.lastMousePos.relY = null;
        if (c.crosshair.hideCursor) {
            this.el.style.cursor = Prototype.Browser.Gecko ? "none" : "url(blank.cur),crosshair";
            this.el.addClassName("flotr-crosshair")
        }
        d.save();
        d.strokeStyle = c.crosshair.color;
        d.lineWidth = 1;
        d.beginPath();
        if (c.crosshair.mode.indexOf("x") != -1) {
            d.moveTo(a, b.top);
            d.lineTo(a, b.top + this.plotHeight);
            this.lastMousePos.relX = a
        }
        if (c.crosshair.mode.indexOf("y") != -1) {
            d.moveTo(b.left, e);
            d.lineTo(b.left + this.plotWidth, e);
            this.lastMousePos.relY = e
        }
        d.stroke();
        d.restore()
    },
    clearCrosshair: function() {
        if (this.lastMousePos.relX != null) {
            this.octx.clearRect(this.lastMousePos.relX - 0.5, this.plotOffset.top, 1, this.plotHeight + 1)
        }
        if (this.lastMousePos.relY != null) {
            this.octx.clearRect(this.plotOffset.left, this.lastMousePos.relY - 0.5, this.plotWidth + 1, 1)
        }
    },
    selectionIsSane: function() {
        return Math.abs(this.selection.second.x - this.selection.first.x) >= 5 && Math.abs(this.selection.second.y - this.selection.first.y) >= 5
    },
    clearHit: function() {
        if (!this.prevHit) {
            return
        }
        var f = this.prevHit,
            b = this.plotOffset,
            c = f.series,
            e = c.bars.lineWidth,
            h = f.xaxis,
            a = f.yaxis;
        if (!c.bars.show) {
            var d = c.points.radius;
            this.octx.clearRect(h.d2p(f.x) + b.left - d * 2, a.d2p(f.y) + b.top - d * 2, d * 3 + c.points.lineWidth * 3, d * 3 + c.points.lineWidth * 3)
        } else {
            var g = c.bars.barWidth;
            this.octx.clearRect(h.d2p(f.x - g / 2) + b.left - e, a.d2p(f.y >= 0 ? f.y : 0) + b.top - e, h.d2p(g) + e * 2, a.d2p(f.y < 0 ? f.y : 0) + e * 2)
        }
    },
    drawHit: function(f) {
        var c = this.octx,
            b = f.series,
            e = f.xaxis,
            a = f.yaxis;
        if (b.mouse.lineColor != null) {
            c.save();
            c.lineWidth = b.points.lineWidth;
            c.strokeStyle = b.mouse.lineColor;
            c.fillStyle = this.processColor(b.mouse.fillColor || "#ffffff", {
                opacity: b.mouse.fillOpacity
            });
            if (!b.bars.show) {
                c.translate(this.plotOffset.left, this.plotOffset.top);
                c.beginPath();
                c.arc(e.d2p(f.x), a.d2p(f.y), b.mouse.radius, 0, 2 * Math.PI, true);
                c.fill();
                c.stroke();
                c.closePath()
            } else {
                c.save();
                c.translate(this.plotOffset.left, this.plotOffset.top);
                c.beginPath();
                if (b.mouse.trackAll) {
                    c.moveTo(e.d2p(f.x), a.d2p(0));
                    c.lineTo(e.d2p(f.x), a.d2p(f.yaxis.max))
                } else {
                    var d = b.bars.barWidth;
                    c.moveTo(e.d2p(f.x - (d / 2)), a.d2p(0));
                    c.lineTo(e.d2p(f.x - (d / 2)), a.d2p(f.y));
                    c.lineTo(e.d2p(f.x + (d / 2)), a.d2p(f.y));
                    c.lineTo(e.d2p(f.x + (d / 2)), a.d2p(0));
                    if (b.mouse.fillColor) {
                        c.fill()
                    }
                }
                c.stroke();
                c.closePath();
                c.restore()
            }
            c.restore()
        }
        this.prevHit = f
    },
    newHit: function(d) {
        var f = this.series,
            c = this.options,
            a, b;
        for (var e = f.length - 1; e > -1; --e) {
            s = f[e];
            if (!s.mouse.track) {
                continue
            }
            for (var j in Flotr.graphTypes) {
                if (!this[j].getHit) {
                    continue
                }
                var g = this[j].getHit(s, d);
                if (g.index !== undefined) {
                    a = s.mouse.trackDecimals;
                    if (a == null || a < 0) {
                        a = 0
                    }
                    b = s.mouse.trackFormatter(g);
                    this.drawTooltip(b, g.x, g.y, s.mouse);
                    this.mouseTrack.fire("flotr:hit", [g, this])
                }
            }
        }
    },
    hit: function(t) {
        var q = this.series,
            f = this.options,
            I = this.prevHit,
            r = this.plotOffset,
            h = this.octx,
            K, M, a, D, o, l, J, c, w, u, H, C = {
                dist: Number.MAX_VALUE,
                x: null,
                y: null,
                relX: t.relX,
                relY: t.relY,
                absX: t.absX,
                absY: t.absY,
                mouse: null,
                xaxis: null,
                yaxis: null,
                series: null,
                index: null,
                seriesIndex: null
            };
        if (f.mouse.trackAll) {
            for (H = 0; H < q.length; H++) {
                v = q[0];
                K = v.data;
                J = v.xaxis;
                c = v.yaxis;
                a = (2 * f.points.lineWidth) / J.scale * v.mouse.sensibility;
                w = J.p2d(t.relX);
                u = c.p2d(t.relY);
                for (var G = 0; G < K.length; G++) {
                    o = K[G][0];
                    l = K[G][1];
                    if (l === null || J.min > o || J.max < o || c.min > l || c.max < l || w < J.min || w > J.max || u < c.min || u > c.max) {
                        continue
                    }
                    var z = Math.abs(o - w);
                    if ((!v.bars.show && z < a) || (v.bars.show && z < v.bars.barWidth / 2) || (l < 0 && u < 0 && u > l)) {
                        var e = z;
                        if (e < C.dist) {
                            C.dist = e;
                            C.x = o;
                            C.y = l;
                            C.xaxis = J;
                            C.yaxis = c;
                            C.mouse = v.mouse;
                            C.series = v;
                            C.allSeries = q;
                            C.index = G
                        }
                    }
                }
            }
        } else {
            for (H = 0; H < q.length; H++) {
                v = q[H];
                if (!v.mouse.track) {
                    continue
                }
                K = v.data;
                J = v.xaxis;
                c = v.yaxis;
                M = 2 * f.points.lineWidth * v.mouse.sensibility;
                a = M / J.scale;
                D = M / c.scale;
                w = J.p2d(t.relX);
                u = c.p2d(t.relY);
                for (var G = 0, b, g; G < K.length; G++) {
                    o = K[G][0];
                    l = K[G][1];
                    if (l === null || J.min > o || J.max < o || c.min > l || c.max < l) {
                        continue
                    }
                    var z = Math.abs(o - w),
                        d = Math.abs(l - u);
                    if (((!v.bars.show) && z < a && d < D) || (v.bars.show && z < v.bars.barWidth / 2 && ((l > 0 && u > 0 && u < l) || (l < 0 && u < 0 && u > l)))) {
                        var e = Math.sqrt(z * z + d * d);
                        if (e < C.dist) {
                            C.dist = e;
                            C.x = o;
                            C.y = l;
                            C.xaxis = J;
                            C.yaxis = c;
                            C.mouse = v.mouse;
                            C.series = v;
                            C.allSeries = q;
                            C.index = G;
                            C.seriesIndex = H
                        }
                    }
                }
            }
        }
        if (C.series && (C.mouse && C.mouse.track && !I || (I))) {
            var B = this.mouseTrack,
                k = "",
                v = C.series,
                A = C.mouse.position,
                E = C.mouse.margin,
                F = "opacity:0.7;background-color:#000;color:#fff;display:none;position:absolute;padding:2px 8px;-moz-border-radius:4px;border-radius:4px;white-space:nowrap;";
            if (!C.mouse.relative) {
                if (A.charAt(0) == "n") {
                    k += "top:" + (E + r.top) + "px;bottom:auto;"
                } else {
                    if (A.charAt(0) == "s") {
                        k += "bottom:" + (E + r.bottom) + "px;top:auto;"
                    }
                }
                if (A.charAt(1) == "e") {
                    k += "right:" + (E + r.right) + "px;left:auto;"
                } else {
                    if (A.charAt(1) == "w") {
                        k += "left:" + (E + r.left) + "px;right:auto;"
                    }
                }
            } else {
                if (!v.bars.show) {
                    if (A.charAt(0) == "n") {
                        k += "bottom:" + (E - r.top - C.yaxis.d2p(C.y) + this.canvasHeight) + "px;top:auto;"
                    } else {
                        if (A.charAt(0) == "s") {
                            k += "top:" + (E + r.top + C.yaxis.d2p(C.y)) + "px;bottom:auto;"
                        }
                    }
                    if (A.charAt(1) == "e") {
                        k += "left:" + (E + r.left + C.xaxis.d2p(C.x)) + "px;right:auto;"
                    } else {
                        if (A.charAt(1) == "w") {
                            k += "right:" + (E - r.left - C.xaxis.d2p(C.x) + this.canvasWidth) + "px;left:auto;"
                        }
                    }
                } else {
                    k += "bottom:" + (E - r.top - C.yaxis.d2p(C.y / 2) + this.canvasHeight) + "px;top:auto;";
                    k += "left:" + (E + r.left + C.xaxis.d2p(C.x - f.bars.barWidth / 2)) + "px;right:auto;"
                }
            }
            F += k;
            if (!B) {
                this.el.insert('<div class="flotr-mouse-value" style="' + F + '"></div>');
                B = this.mouseTrack = this.el.select(".flotr-mouse-value")[0]
            } else {
                B.style.cssText = F;
                this.mouseTrack = B
            }
            if (C.x !== null && C.y !== null) {
                B.show();
                this.clearHit();
                this.drawHit(C);
                var L = C.mouse.trackDecimals;
                if (L == null || L < 0) {
                    L = 0
                }
                B.innerHTML = C.mouse.trackFormatter({
                    x: C.x.toFixed(L),
                    y: C.y.toFixed(L),
                    series: C.series,
                    index: C.index,
                    nearest: C
                });
                B.fire("flotr:hit", [C, this])
            } else {
                if (I) {
                    B.hide();
                    this.clearHit()
                }
            }
        } else {
            if (this.prevHit) {
                this.mouseTrack.hide();
                this.clearHit()
            }
        }
    },
    drawTooltip: function(f, h, g, j) {
        var a = this.mouseTrack,
            b = "opacity:0.7;background-color:#000;color:#fff;display:none;position:absolute;padding:2px 8px;-moz-border-radius:4px;border-radius:4px;white-space:nowrap;",
            c = j.position,
            e = j.margin,
            d = this.plotOffset;
        if (!a) {
            this.el.insert('<div class="flotr-mouse-value"></div>');
            a = this.mouseTrack = this.el.select(".flotr-mouse-value")[0]
        }
        if (h !== null && g !== null) {
            if (!j.relative) {
                if (c.charAt(0) == "n") {
                    b += "top:" + (e + d.top) + "px;bottom:auto;"
                } else {
                    if (c.charAt(0) == "s") {
                        b += "bottom:" + (e + d.bottom) + "px;top:auto;"
                    }
                }
                if (c.charAt(1) == "e") {
                    b += "right:" + (e + d.right) + "px;left:auto;"
                } else {
                    if (c.charAt(1) == "w") {
                        b += "left:" + (e + d.left) + "px;right:auto;"
                    }
                }
            } else {
                if (c.charAt(0) == "n") {
                    b += "bottom:" + (e - d.top - g + this.canvasHeight) + "px;top:auto;"
                } else {
                    if (c.charAt(0) == "s") {
                        b += "top:" + (e + d.top + g) + "px;bottom:auto;"
                    }
                }
                if (c.charAt(1) == "e") {
                    b += "left:" + (e + d.left + h) + "px;right:auto;"
                } else {
                    if (c.charAt(1) == "w") {
                        b += "right:" + (e - d.left - h + this.canvasWidth) + "px;left:auto;"
                    }
                }
            }
            a.style.cssText = b;
            a.update(f).show()
        } else {
            a.hide()
        }
    },
    saveImage: function(d, c, a, b) {
        var e = null;
        if (!Prototype.Browser.IE || Flotr.isIE9) {
            e = "<html><body>" + this.canvas.firstChild.innerHTML + "</body></html>";
            return window.open().document.write(e)
        }
        switch (d) {
            case "jpeg":
            case "jpg":
                e = Canvas2Image.saveAsJPEG(this.canvas, b, c, a);
                break;
            default:
            case "png":
                e = Canvas2Image.saveAsPNG(this.canvas, b, c, a);
                break;
            case "bmp":
                e = Canvas2Image.saveAsBMP(this.canvas, b, c, a);
                break
        }
        if (Object.isElement(e) && b) {
            this.restoreCanvas();
            this.canvas.hide();
            this.overlay.hide();
            this.el.insert(e.setStyle({
                position: "absolute"
            }))
        }
    },
    restoreCanvas: function() {
        this.canvas.show();
        this.overlay.show();
        this.el.select("img").invoke("remove")
    }
});
Flotr.Color = Class.create({
    initialize: function(h, f, d, e) {
        this.rgba = ["r", "g", "b", "a"];
        var c = 4;
        while (-1 < --c) {
            this[this.rgba[c]] = arguments[c] || ((c == 3) ? 1 : 0)
        }
        this.normalize()
    },
    adjust: function(d, c, e, b) {
        var a = 4;
        while (-1 < --a) {
            if (arguments[a] != null) {
                this[this.rgba[a]] += arguments[a]
            }
        }
        return this.normalize()
    },
    scale: function(d, c, e, b) {
        var a = 4;
        while (-1 < --a) {
            if (arguments[a] != null) {
                this[this.rgba[a]] *= arguments[a]
            }
        }
        return this.normalize()
    },
    clone: function() {
        return new Flotr.Color(this.r, this.b, this.g, this.a)
    },
    limit: function(b, a, c) {
        return Math.max(Math.min(b, c), a)
    },
    normalize: function() {
        var a = this.limit;
        this.r = a(parseInt(this.r), 0, 255);
        this.g = a(parseInt(this.g), 0, 255);
        this.b = a(parseInt(this.b), 0, 255);
        this.a = a(this.a, 0, 1);
        return this
    },
    distance: function(b) {
        if (!b) {
            return
        }
        b = new Flotr.Color.parse(b);
        var c = 0,
            a = 3;
        while (-1 < --a) {
            c += Math.abs(this[this.rgba[a]] - b[this.rgba[a]])
        }
        return c
    },
    toString: function() {
        return (this.a >= 1) ? "rgb(" + [this.r, this.g, this.b].join(",") + ")" : "rgba(" + [this.r, this.g, this.b, this.a].join(",") + ")"
    }
});
Object.extend(Flotr.Color, {
    parse: function(b) {
        if (b instanceof Flotr.Color) {
            return b
        }
        var a, d = Flotr.Color;
        if ((a = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(b))) {
            return new d(parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16))
        }
        if ((a = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(b))) {
            return new d(parseInt(a[1]), parseInt(a[2]), parseInt(a[3]))
        }
        if ((a = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(b))) {
            return new d(parseInt(a[1] + a[1], 16), parseInt(a[2] + a[2], 16), parseInt(a[3] + a[3], 16))
        }
        if ((a = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(b))) {
            return new d(parseInt(a[1]), parseInt(a[2]), parseInt(a[3]), parseFloat(a[4]))
        }
        if ((a = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(b))) {
            return new d(parseFloat(a[1]) * 2.55, parseFloat(a[2]) * 2.55, parseFloat(a[3]) * 2.55)
        }
        if ((a = /rgba\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(b))) {
            return new d(parseFloat(a[1]) * 2.55, parseFloat(a[2]) * 2.55, parseFloat(a[3]) * 2.55, parseFloat(a[4]))
        }
        var c = (b + "").strip().toLowerCase();
        if (c == "transparent") {
            return new d(255, 255, 255, 0)
        }
        return (a = d.names[c]) ? new d(a[0], a[1], a[2]) : new d(0, 0, 0, 0)
    },
    extract: function(b) {
        var a;
        do {
            a = b.getStyle("background-color").toLowerCase();
            if (!(a == "" || a == "transparent")) {
                break
            }
            b = b.up()
        } while (!b.nodeName.match(/^body$/i));
        return new Flotr.Color(a == "rgba(0, 0, 0, 0)" ? "transparent" : a)
    },
    names: {
        aqua: [0, 255, 255],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        black: [0, 0, 0],
        blue: [0, 0, 255],
        brown: [165, 42, 42],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgrey: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkviolet: [148, 0, 211],
        fuchsia: [255, 0, 255],
        gold: [255, 215, 0],
        green: [0, 128, 0],
        indigo: [75, 0, 130],
        khaki: [240, 230, 140],
        lightblue: [173, 216, 230],
        lightcyan: [224, 255, 255],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        navy: [0, 0, 128],
        olive: [128, 128, 0],
        orange: [255, 165, 0],
        pink: [255, 192, 203],
        purple: [128, 0, 128],
        violet: [128, 0, 128],
        red: [255, 0, 0],
        silver: [192, 192, 192],
        white: [255, 255, 255],
        yellow: [255, 255, 0]
    }
});
Flotr.Date = {
    format: function(j, h) {
        if (!j) {
            return
        }
        var g = {
            h: j.getUTCHours().toString(),
            H: a(j.getUTCHours()),
            M: a(j.getUTCMinutes()),
            S: a(j.getUTCSeconds()),
            s: j.getUTCMilliseconds(),
            d: j.getUTCDate().toString(),
            m: (j.getUTCMonth() + 1).toString(),
            y: j.getUTCFullYear().toString(),
            b: Flotr.Date.monthNames[j.getUTCMonth()]
        };

        function a(c) {
            c += "";
            return c.length == 1 ? "0" + c : c
        }
        var f = [],
            k, e = false;
        for (var b = 0; b < h.length; ++b) {
            k = h.charAt(b);
            if (e) {
                f.push(g[k] || k);
                e = false
            } else {
                if (k == "%") {
                    e = true
                } else {
                    f.push(k)
                }
            }
        }
        return f.join("")
    },
    getFormat: function(c, b) {
        var a = Flotr.Date.timeUnits;
        if (c < a.second) {
            return "%h:%M:%S.%s"
        } else {
            if (c < a.minute) {
                return "%h:%M:%S"
            } else {
                if (c < a.day) {
                    return (b < 2 * a.day) ? "%h:%M" : "%b %d %h:%M"
                } else {
                    if (c < a.month) {
                        return "%b %d"
                    } else {
                        if (c < a.year) {
                            return (b < a.year) ? "%b" : "%b %y"
                        } else {
                            return "%y"
                        }
                    }
                }
            }
        }
    },
    formatter: function(a, e) {
        var f = new Date(a);
        if (e.options.timeFormat != null) {
            return Flotr.Date.format(f, e.options.timeFormat)
        }
        var c = e.max - e.min,
            b = e.tickSize * Flotr.Date.timeUnits[e.tickUnit];
        return Flotr.Date.format(f, Flotr.Date.getFormat(b, c))
    },
    generator: function(c) {
        var j = [],
            h = new Date(c.min),
            g = Flotr.Date.timeUnits;
        var b = c.tickSize * g[c.tickUnit];
        switch (c.tickUnit) {
            case "millisecond":
                h.setUTCMilliseconds(Flotr.floorInBase(h.getUTCMilliseconds(), c.tickSize));
                break;
            case "second":
                h.setUTCSeconds(Flotr.floorInBase(h.getUTCSeconds(), c.tickSize));
                break;
            case "minute":
                h.setUTCMinutes(Flotr.floorInBase(h.getUTCMinutes(), c.tickSize));
                break;
            case "hour":
                h.setUTCHours(Flotr.floorInBase(h.getUTCHours(), c.tickSize));
                break;
            case "month":
                h.setUTCMonth(Flotr.floorInBase(h.getUTCMonth(), c.tickSize));
                break;
            case "year":
                h.setUTCFullYear(Flotr.floorInBase(h.getUTCFullYear(), c.tickSize));
                break
        }
        if (b >= g.second) {
            h.setUTCMilliseconds(0)
        }
        if (b >= g.minute) {
            h.setUTCSeconds(0)
        }
        if (b >= g.hour) {
            h.setUTCMinutes(0)
        }
        if (b >= g.day) {
            h.setUTCHours(0)
        }
        if (b >= g.day * 4) {
            h.setUTCDate(1)
        }
        if (b >= g.year) {
            h.setUTCMonth(0)
        }
        var l = 0,
            k = Number.NaN,
            e;
        do {
            e = k;
            k = h.getTime();
            j.push({
                v: k,
                label: Flotr.Date.formatter(k, c)
            });
            if (c.tickUnit == "month") {
                if (c.tickSize < 1) {
                    h.setUTCDate(1);
                    var a = h.getTime();
                    h.setUTCMonth(h.getUTCMonth() + 1);
                    var f = h.getTime();
                    h.setTime(k + l * g.hour + (f - a) * c.tickSize);
                    l = h.getUTCHours();
                    h.setUTCHours(0)
                } else {
                    h.setUTCMonth(h.getUTCMonth() + c.tickSize)
                }
            } else {
                if (c.tickUnit == "year") {
                    h.setUTCFullYear(h.getUTCFullYear() + c.tickSize)
                } else {
                    h.setTime(k + b)
                }
            }
        } while (k < c.max && k != e);
        return j
    },
    timeUnits: {
        millisecond: 1,
        second: 1000,
        minute: 1000 * 60,
        hour: 1000 * 60 * 60,
        day: 1000 * 60 * 60 * 24,
        month: 1000 * 60 * 60 * 24 * 30,
        year: 1000 * 60 * 60 * 24 * 365.2425
    },
    spec: [
        [1, "millisecond"],
        [20, "millisecond"],
        [50, "millisecond"],
        [100, "millisecond"],
        [200, "millisecond"],
        [500, "millisecond"],
        [1, "second"],
        [2, "second"],
        [5, "second"],
        [10, "second"],
        [30, "second"],
        [1, "minute"],
        [2, "minute"],
        [5, "minute"],
        [10, "minute"],
        [30, "minute"],
        [1, "hour"],
        [2, "hour"],
        [4, "hour"],
        [8, "hour"],
        [12, "hour"],
        [1, "day"],
        [2, "day"],
        [3, "day"],
        [0.25, "month"],
        [0.5, "month"],
        [1, "month"],
        [2, "month"],
        [3, "month"],
        [6, "month"],
        [1, "year"]
    ],
    monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
};
Flotr.addType("lines", {
    options: {
        show: false,
        lineWidth: 2,
        fill: false,
        fillColor: null,
        fillOpacity: 0.4
    },
    draw: function(c) {
        c = c || this.series;
        var b = this.ctx;
        b.save();
        b.translate(this.plotOffset.left, this.plotOffset.top);
        b.lineJoin = "round";
        var d = c.lines.lineWidth;
        var a = c.shadowSize;
        if (a > 0) {
            b.lineWidth = a / 2;
            var e = d / 2 + b.lineWidth / 2;
            b.strokeStyle = "rgba(0,0,0,0.1)";
            this.lines.plot(c, e + a / 2);
            b.strokeStyle = "rgba(0,0,0,0.2)";
            this.lines.plot(c, e);
            if (c.lines.fill) {
                b.fillStyle = "rgba(0,0,0,0.05)";
                this.lines.plotArea(c, e + a / 2)
            }
        }
        b.lineWidth = d;
        b.strokeStyle = c.color;
        if (c.lines.fill) {
            b.fillStyle = this.processColor(c.lines.fillColor || c.color, {
                opacity: c.lines.fillOpacity
            });
            this.lines.plotArea(c, 0)
        }
        this.lines.plot(c, 0);
        b.restore()
    },
    plot: function(j, g) {
        var o = this.ctx,
            a = j.xaxis,
            l = j.yaxis,
            h = j.data,
            e = h.length - 1,
            k;
        if (h.length < 2) {
            return
        }
        var f = a.d2p(h[0][0]),
            d = l.d2p(h[0][1]) + g;
        o.beginPath();
        o.moveTo(f, d);
        for (k = 0; k < e; ++k) {
            var c = h[k][0],
                n = h[k][1],
                b = h[k + 1][0],
                m = h[k + 1][1];
            if (n === null || m === null) {
                continue
            }
            if (n <= m && n < l.min) {
                if (m < l.min) {
                    continue
                }
                c = (l.min - n) / (m - n) * (b - c) + c;
                n = l.min
            } else {
                if (m <= n && m < l.min) {
                    if (n < l.min) {
                        continue
                    }
                    b = (l.min - n) / (m - n) * (b - c) + c;
                    m = l.min
                }
            }
            if (n >= m && n > l.max) {
                if (m > l.max) {
                    continue
                }
                c = (l.max - n) / (m - n) * (b - c) + c;
                n = l.max
            } else {
                if (m >= n && m > l.max) {
                    if (n > l.max) {
                        continue
                    }
                    b = (l.max - n) / (m - n) * (b - c) + c;
                    m = l.max
                }
            }
            if (c <= b && c < a.min) {
                if (b < a.min) {
                    continue
                }
                n = (a.min - c) / (b - c) * (m - n) + n;
                c = a.min
            } else {
                if (b <= c && b < a.min) {
                    if (c < a.min) {
                        continue
                    }
                    m = (a.min - c) / (b - c) * (m - n) + n;
                    b = a.min
                }
            }
            if (c >= b && c > a.max) {
                if (b > a.max) {
                    continue
                }
                n = (a.max - c) / (b - c) * (m - n) + n;
                c = a.max
            } else {
                if (b >= c && b > a.max) {
                    if (c > a.max) {
                        continue
                    }
                    m = (a.max - c) / (b - c) * (m - n) + n;
                    b = a.max
                }
            }
            if (f != a.d2p(c) || d != l.d2p(n) + g) {
                o.moveTo(a.d2p(c), l.d2p(n) + g)
            }
            f = a.d2p(b);
            d = l.d2p(m) + g;
            o.lineTo(f, d)
        }
        o.stroke();
        o.closePath()
    },
    plotArea: function(k, e) {
        var n = this.ctx,
            r = k.xaxis,
            b = k.yaxis,
            u = k.data,
            d = u.length - 1,
            m, h = Math.min(Math.max(0, b.min), b.max),
            g = 0,
            f = true;
        if (u.length < 2) {
            return
        }
        n.beginPath();
        for (var o = 0; o < d; ++o) {
            var t = u[o][0],
                c = u[o][1],
                q = u[o + 1][0],
                a = u[o + 1][1];
            if (t <= q && t < r.min) {
                if (q < r.min) {
                    continue
                }
                c = (r.min - t) / (q - t) * (a - c) + c;
                t = r.min
            } else {
                if (q <= t && q < r.min) {
                    if (t < r.min) {
                        continue
                    }
                    a = (r.min - t) / (q - t) * (a - c) + c;
                    q = r.min
                }
            }
            if (t >= q && t > r.max) {
                if (q > r.max) {
                    continue
                }
                c = (r.max - t) / (q - t) * (a - c) + c;
                t = r.max
            } else {
                if (q >= t && q > r.max) {
                    if (t > r.max) {
                        continue
                    }
                    a = (r.max - t) / (q - t) * (a - c) + c;
                    q = r.max
                }
            }
            if (f) {
                n.moveTo(r.d2p(t), b.d2p(h) + e);
                f = false
            }
            if (c >= b.max && a >= b.max) {
                n.lineTo(r.d2p(t), b.d2p(b.max) + e);
                n.lineTo(r.d2p(q), b.d2p(b.max) + e);
                continue
            } else {
                if (c <= b.min && a <= b.min) {
                    n.lineTo(r.d2p(t), b.d2p(b.min) + e);
                    n.lineTo(r.d2p(q), b.d2p(b.min) + e);
                    continue
                }
            }
            var j = t,
                l = q;
            if (c <= a && c < b.min && a >= b.min) {
                t = (b.min - c) / (a - c) * (q - t) + t;
                c = b.min
            } else {
                if (a <= c && a < b.min && c >= b.min) {
                    q = (b.min - c) / (a - c) * (q - t) + t;
                    a = b.min
                }
            }
            if (c >= a && c > b.max && a <= b.max) {
                t = (b.max - c) / (a - c) * (q - t) + t;
                c = b.max
            } else {
                if (a >= c && a > b.max && c <= b.max) {
                    q = (b.max - c) / (a - c) * (q - t) + t;
                    a = b.max
                }
            }
            if (t != j) {
                m = (c <= b.min) ? m = b.min : b.max;
                n.lineTo(r.d2p(j), b.d2p(m) + e);
                n.lineTo(r.d2p(t), b.d2p(m) + e)
            }
            n.lineTo(r.d2p(t), b.d2p(c) + e);
            n.lineTo(r.d2p(q), b.d2p(a) + e);
            if (q != l) {
                m = (a <= b.min) ? b.min : b.max;
                n.lineTo(r.d2p(l), b.d2p(m) + e);
                n.lineTo(r.d2p(q), b.d2p(m) + e)
            }
            g = Math.max(q, l)
        }
        n.lineTo(r.d2p(r.max), b.d2p(h) + e);
        n.closePath();
        n.fill()
    }
});
Flotr.addType("bars", {
    options: {
        show: false,
        lineWidth: 2,
        barWidth: 1,
        fill: true,
        fillColor: null,
        fillOpacity: 0.4,
        horizontal: false,
        stacked: false,
        centered: true
    },
    draw: function(c) {
        var a = this.ctx,
            e = c.bars.barWidth,
            d = Math.min(c.bars.lineWidth, e);
        a.save();
        a.translate(this.plotOffset.left, this.plotOffset.top);
        a.lineJoin = "miter";
        a.lineWidth = d;
        a.strokeStyle = c.color;
        a.save();
        this.bars.plotShadows(c, e, 0, c.bars.fill);
        a.restore();
        if (c.bars.fill) {
            var b = c.bars.fillColor || c.color;
            a.fillStyle = this.processColor(b, {
                opacity: c.bars.fillOpacity
            })
        }
        this.bars.plot(c, e, 0, c.bars.fill);
        a.restore()
    },
    plot: function(k, n, d, q) {
        var v = k.data;
        if (v.length < 1) {
            return
        }
        var t = k.xaxis,
            b = k.yaxis,
            o = this.ctx,
            r;
        for (r = 0; r < v.length; r++) {
            var j = v[r][0],
                h = v[r][1],
                e = true,
                l = true,
                a = true;
            if (h === null) {
                continue
            }
            var g = 0;
            if (k.bars.stacked) {
                $H(t.values).each(function(w) {
                    if (w.key == j) {
                        g = w.value.stack || 0;
                        w.value.stack = g + h
                    }
                })
            }
            if (k.bars.horizontal) {
                var c = g,
                    u = j + g,
                    f = h,
                    m = h + n
            } else {
                var c = j - (k.bars.centered ? n / 2 : 0),
                    u = j + n - (k.bars.centered ? n / 2 : 0),
                    f = g,
                    m = h + g
            }
            if (u < t.min || c > t.max || m < b.min || f > b.max) {
                continue
            }
            if (c < t.min) {
                c = t.min;
                e = false
            }
            if (u > t.max) {
                u = t.max;
                if (t.lastSerie != k && k.bars.horizontal) {
                    l = false
                }
            }
            if (f < b.min) {
                f = b.min
            }
            if (m > b.max) {
                m = b.max;
                if (b.lastSerie != k && !k.bars.horizontal) {
                    l = false
                }
            }
            if (q) {
                o.beginPath();
                o.moveTo(t.d2p(c), b.d2p(f) + d);
                o.lineTo(t.d2p(c), b.d2p(m) + d);
                o.lineTo(t.d2p(u), b.d2p(m) + d);
                o.lineTo(t.d2p(u), b.d2p(f) + d);
                o.fill();
                o.closePath()
            }
            if (k.bars.lineWidth != 0 && (e || a || l)) {
                o.beginPath();
                o.moveTo(t.d2p(c), b.d2p(f) + d);
                o[e ? "lineTo" : "moveTo"](t.d2p(c), b.d2p(m) + d);
                o[l ? "lineTo" : "moveTo"](t.d2p(u), b.d2p(m) + d);
                o[a ? "lineTo" : "moveTo"](t.d2p(u), b.d2p(f) + d);
                o.stroke();
                o.closePath()
            }
        }
    },
    plotShadows: function(h, j, c) {
        var u = h.data;
        if (u.length < 1) {
            return
        }
        var q, g, f, r = h.xaxis,
            a = h.yaxis,
            o = this.ctx,
            m = this.options.shadowSize;
        for (q = 0; q < u.length; q++) {
            g = u[q][0];
            f = u[q][1];
            if (f === null) {
                continue
            }
            var d = 0;
            if (h.bars.stacked) {
                $H(r.values).each(function(v) {
                    if (v.key == g) {
                        d = v.value.stackShadow || 0;
                        v.value.stackShadow = d + f
                    }
                })
            }
            if (h.bars.horizontal) {
                var b = d,
                    t = g + d,
                    e = f,
                    k = f + j
            } else {
                var b = g - (h.bars.centered ? j / 2 : 0),
                    t = g + j - (h.bars.centered ? j / 2 : 0),
                    e = d,
                    k = f + d
            }
            if (t < r.min || b > r.max || k < a.min || e > a.max) {
                continue
            }
            if (b < r.min) {
                b = r.min
            }
            if (t > r.max) {
                t = r.max
            }
            if (e < a.min) {
                e = a.min
            }
            if (k > a.max) {
                k = a.max
            }
            var n = r.d2p(t) - r.d2p(b) - ((r.d2p(t) + m <= this.plotWidth) ? 0 : m);
            var l = Math.max(0, a.d2p(e) - a.d2p(k) - ((a.d2p(e) + m <= this.plotHeight) ? 0 : m));
            o.fillStyle = "rgba(0,0,0,0.05)";
            o.fillRect(Math.min(r.d2p(b) + m, this.plotWidth), Math.min(a.d2p(k) + m, this.plotWidth), n, l)
        }
    },
    extendXRange: function(a) {
        if (a.options.max == null) {
            var c = a.min,
                g = a.max,
                e, d, k, m, h, l = [],
                f = null;
            for (e = 0; e < this.series.length; ++e) {
                m = this.series[e];
                h = m.bars;
                if (h.show && m.xaxis == a) {
                    if (h.centered) {
                        g = Math.max(a.datamax + 0.5, g);
                        c = Math.min(a.datamin - 0.5, c)
                    }
                    if (!h.horizontal && (h.barWidth + a.datamax > g)) {
                        g = a.max + (h.centered ? h.barWidth / 2 : h.barWidth)
                    }
                    if (h.stacked && h.horizontal) {
                        for (d = 0; d < m.data.length; d++) {
                            if (h.show && h.stacked) {
                                k = m.data[d][0] + "";
                                l[k] = (l[k] || 0) + m.data[d][1];
                                f = m
                            }
                        }
                        for (d in l) {
                            g = Math.max(l[d], g)
                        }
                    }
                }
            }
            a.lastSerie = f;
            a.max = g;
            a.min = c
        }
    },
    extendYRange: function(a) {
        if (a.options.max == null) {
            var f = a.max,
                h, d, c, l, g, k = {},
                e = null;
            for (d = 0; d < this.series.length; ++d) {
                l = this.series[d];
                g = l.bars;
                if (g.show && !l.hide && l.yaxis == a) {
                    if (g.horizontal && (g.barWidth + a.datamax > f)) {
                        f = a.max + g.barWidth
                    }
                    if (g.stacked && !g.horizontal) {
                        for (c = 0; c < l.data.length; c++) {
                            if (l.bars.show && l.bars.stacked) {
                                h = l.data[c][0] + "";
                                k[h] = (k[h] || 0) + l.data[c][1];
                                e = l
                            }
                        }
                        for (c in k) {
                            f = Math.max(k[c], f)
                        }
                    }
                }
            }
            a.lastSerie = e;
            a.max = f
        }
    }
});
Flotr.addType("points", {
    options: {
        show: false,
        radius: 3,
        lineWidth: 2,
        fill: true,
        fillColor: "#FFFFFF",
        fillOpacity: 0.4
    },
    draw: function(c) {
        var b = this.ctx,
            d = c.lines.lineWidth,
            a = c.shadowSize;
        b.save();
        b.translate(this.plotOffset.left, this.plotOffset.top);
        if (a > 0) {
            b.lineWidth = a / 2;
            b.strokeStyle = "rgba(0,0,0,0.1)";
            this.points.plotShadows(c, a / 2 + b.lineWidth / 2, c.points.radius);
            b.strokeStyle = "rgba(0,0,0,0.2)";
            this.points.plotShadows(c, b.lineWidth / 2, c.points.radius)
        }
        b.lineWidth = c.points.lineWidth;
        b.strokeStyle = c.color;
        b.fillStyle = c.points.fillColor != null ? c.points.fillColor : c.color;
        this.points.plot(c, c.points.radius, c.points.fill);
        b.restore()
    },
    plot: function(c, e, h) {
        var a = c.xaxis,
            f = c.yaxis,
            j = this.ctx,
            d, g, b = c.data;
        for (d = b.length - 1; d > -1; --d) {
            g = b[d][0], y = b[d][1];
            if (y === null || g < a.min || g > a.max || y < f.min || y > f.max) {
                continue
            }
            j.beginPath();
            j.arc(a.d2p(g), f.d2p(y), e, 0, 2 * Math.PI, true);
            if (h) {
                j.fill()
            }
            j.stroke();
            j.closePath()
        }
    },
    plotShadows: function(d, b, f) {
        var a = d.xaxis,
            g = d.yaxis,
            j = this.ctx,
            e, h, c = d.data;
        for (e = c.length - 1; e > -1; --e) {
            h = c[e][0], y = c[e][1];
            if (y === null || h < a.min || h > a.max || y < g.min || y > g.max) {
                continue
            }
            j.beginPath();
            j.arc(a.d2p(h), g.d2p(y) + b, f, 0, Math.PI, false);
            j.stroke();
            j.closePath()
        }
    },
    getHit: function(g, n) {
        var e, c, h, j, l, q, m, b = g.points,
            f = g.data,
            k = g.mouse.sensibility * (b.lineWidth + b.radius),
            a = {
                index: null,
                series: g,
                distance: Number.MAX_VALUE,
                x: null,
                y: null,
                precision: 1
            };
        for (h = f.length - 1; h > -1; --h) {
            j = f[h];
            q = g.xaxis.d2p(j[0]);
            m = g.yaxis.d2p(j[1]);
            e = q - n.relX;
            c = m - n.relY;
            l = Math.sqrt(e * e + c * c);
            if (l < k && l < a.distance) {
                a = {
                    index: h,
                    series: g,
                    distance: l,
                    data: j,
                    x: q,
                    y: m,
                    precision: 1
                }
            }
        }
        return a
    },
    drawHit: function(b, a) {},
    clearHit: function(b, a) {}
});
Flotr.defaultPieLabelFormatter = function(a) {
    return (a.fraction * 100).toFixed(2) + "%"
};
Flotr.addType("pie", {
    options: {
        show: false,
        lineWidth: 1,
        fill: true,
        fillColor: null,
        fillOpacity: 0.6,
        explode: 6,
        sizeRatio: 0.6,
        startAngle: Math.PI / 4,
        labelFormatter: Flotr.defaultPieLabelFormatter,
        pie3D: false,
        pie3DviewAngle: (Math.PI / 2 * 0.8),
        pie3DspliceThickness: 20
    },
    draw: function(g) {
        if (this.options.pie.drawn) {
            return
        }
        var m = this.ctx,
            c = this.options,
            e = g.pie.lineWidth,
            k = g.shadowSize,
            v = g.data,
            h = this.plotOffset,
            d = (Math.min(this.canvasWidth, this.canvasHeight) * g.pie.sizeRatio) / 2,
            j = [],
            n = 1,
            t = Math.sin(g.pie.viewAngle) * g.pie.spliceThickness / n,
            o = {
                size: c.fontSize * 1.2,
                color: c.grid.color,
                weight: 1.5
            },
            u = {
                x: h.left + (this.plotWidth) / 2,
                y: h.top + (this.plotHeight) / 2
            },
            r = this.series.collect(function(x, w) {
                if (x.pie.show && x.data[0][1] !== null) {
                    return {
                        name: (x.label || x.data[0][1]),
                        value: [w, x.data[0][1]],
                        options: x.pie,
                        series: x
                    }
                }
            }),
            b = r.pluck("value").pluck(1).inject(0, function(w, x) {
                return w + x
            }),
            f = 0,
            q = g.pie.startAngle,
            l = 0;
        var a = r.collect(function(w) {
            q += f;
            l = parseFloat(w.value[1]);
            f = l / b;
            return {
                name: w.name,
                fraction: f,
                x: w.value[0],
                y: l,
                value: l,
                options: w.options,
                series: w.series,
                startAngle: 2 * q * Math.PI,
                endAngle: 2 * (q + f) * Math.PI
            }
        });
        m.save();
        if (k > 0) {
            a.each(function(A) {
                if (A.startAngle == A.endAngle) {
                    return
                }
                var w = (A.startAngle + A.endAngle) / 2,
                    x = u.x + Math.cos(w) * A.options.explode + k,
                    z = u.y + Math.sin(w) * A.options.explode + k;
                this.pie.plotSlice(x, z, d, A.startAngle, A.endAngle, false, n);
                if (g.pie.fill) {
                    m.fillStyle = "rgba(0,0,0,0.1)";
                    m.fill()
                }
            }, this)
        }
        if (c.HtmlText || !this.textEnabled) {
            j = ['<div style="color:' + this.options.grid.color + '" class="flotr-labels">']
        }
        a.each(function(J, E) {
            if (J.startAngle == J.endAngle) {
                return
            }
            var D = (J.startAngle + J.endAngle) / 2,
                C = J.series.color,
                x = J.options.fillColor || C,
                F = u.x + Math.cos(D) * J.options.explode,
                A = u.y + Math.sin(D) * J.options.explode;
            this.pie.plotSlice(F, A, d, J.startAngle, J.endAngle, false, n);
            if (g.pie.fill) {
                m.fillStyle = this.processColor(x, {
                    opacity: g.pie.fillOpacity
                });
                m.fill()
            }
            m.lineWidth = e;
            m.strokeStyle = C;
            m.stroke();
            var I = c.pie.labelFormatter(J),
                w = (Math.cos(D) < 0),
                K = (Math.sin(D) > 0),
                B = (J.options.explode || g.pie.explode) + d + 4,
                H = u.x + Math.cos(D) * B,
                G = u.y + Math.sin(D) * B;
            if (J.fraction && I) {
                if (c.HtmlText || !this.textEnabled) {
                    var z = "position:absolute;top:" + (G - 5) + "px;";
                    if (w) {
                        z += "right:" + (this.canvasWidth - H) + "px;text-align:right;"
                    } else {
                        z += "left:" + H + "px;text-align:left;"
                    }
                    j.push('<div style="', z, '" class="flotr-grid-label">', I, "</div>")
                } else {
                    o.textAlign = w ? "right" : "left";
                    o.textBaseline = K ? "top" : "bottom";
                    Flotr.drawText(m, I, H, G, o)
                }
            }
        }, this);
        if (c.HtmlText || !this.textEnabled) {
            j.push("</div>");
            this.el.insert(j.join(""))
        }
        m.restore();
        c.pie.drawn = true
    },
    plotSlice: function(b, h, a, e, d, f, g) {
        var c = this.ctx;
        g = g || 1;
        c.scale(1, g);
        c.beginPath();
        c.moveTo(b, h);
        c.arc(b, h, a, e, d, f);
        c.lineTo(b, h);
        c.closePath()
    }
});
Flotr.addType("candles", {
    options: {
        show: false,
        lineWidth: 1,
        wickLineWidth: 1,
        candleWidth: 0.6,
        fill: true,
        upFillColor: "#00A8F0",
        downFillColor: "#CB4B4B",
        fillOpacity: 0.5,
        barcharts: false
    },
    draw: function(b) {
        var a = this.ctx,
            c = b.candles.candleWidth;
        a.save();
        a.translate(this.plotOffset.left, this.plotOffset.top);
        a.lineJoin = "miter";
        a.lineWidth = b.candles.lineWidth;
        this.candles.plotShadows(b, c / 2);
        this.candles.plot(b, c / 2);
        a.restore()
    },
    plot: function(l, e) {
        var A = l.data;
        if (A.length < 1) {
            return
        }
        var v = l.xaxis,
            b = l.yaxis,
            q = this.ctx;
        for (var u = 0; u < A.length; u++) {
            var w = A[u],
                k = w[0],
                m = w[1],
                j = w[2],
                B = w[3],
                n = w[4];
            var c = k - l.candles.candleWidth / 2,
                z = k + l.candles.candleWidth / 2,
                g = Math.max(b.min, B),
                o = Math.min(b.max, j),
                a = Math.max(b.min, Math.min(m, n)),
                t = Math.min(b.max, Math.max(m, n));
            if (z < v.min || c > v.max || o < b.min || g > b.max) {
                continue
            }
            var r = l.candles[m > n ? "downFillColor" : "upFillColor"];
            if (l.candles.fill && !l.candles.barcharts) {
                q.fillStyle = this.processColor(r, {
                    opacity: l.candles.fillOpacity
                });
                q.fillRect(v.d2p(c), b.d2p(t) + e, v.d2p(z) - v.d2p(c), b.d2p(a) - b.d2p(t))
            }
            if (l.candles.lineWidth || l.candles.wickLineWidth) {
                var k, h, f = (l.candles.wickLineWidth % 2) / 2;
                k = Math.floor(v.d2p((c + z) / 2)) + f;
                q.save();
                q.strokeStyle = r;
                q.lineWidth = l.candles.wickLineWidth;
                q.lineCap = "butt";
                if (l.candles.barcharts) {
                    q.beginPath();
                    q.moveTo(k, Math.floor(b.d2p(o) + e));
                    q.lineTo(k, Math.floor(b.d2p(g) + e));
                    h = Math.floor(b.d2p(m) + e) + 0.5;
                    q.moveTo(Math.floor(v.d2p(c)) + f, h);
                    q.lineTo(k, h);
                    h = Math.floor(b.d2p(n) + e) + 0.5;
                    q.moveTo(Math.floor(v.d2p(z)) + f, h);
                    q.lineTo(k, h)
                } else {
                    q.strokeRect(v.d2p(c), b.d2p(t) + e, v.d2p(z) - v.d2p(c), b.d2p(a) - b.d2p(t));
                    q.beginPath();
                    q.moveTo(k, Math.floor(b.d2p(t) + e));
                    q.lineTo(k, Math.floor(b.d2p(o) + e));
                    q.moveTo(k, Math.floor(b.d2p(a) + e));
                    q.lineTo(k, Math.floor(b.d2p(g) + e))
                }
                q.stroke();
                q.closePath();
                q.restore()
            }
        }
    },
    plotShadows: function(h, c) {
        var v = h.data;
        if (v.length < 1 || h.candles.barcharts) {
            return
        }
        var r = h.xaxis,
            a = h.yaxis,
            n = this.options.shadowSize;
        for (var q = 0; q < v.length; q++) {
            var t = v[q],
                g = t[0],
                j = t[1],
                f = t[2],
                w = t[3],
                k = t[4];
            var b = g - h.candles.candleWidth / 2,
                u = g + h.candles.candleWidth / 2,
                e = Math.max(a.min, Math.min(j, k)),
                l = Math.min(a.max, Math.max(j, k));
            if (u < r.min || b > r.max || l < a.min || e > a.max) {
                continue
            }
            var o = r.d2p(u) - r.d2p(b) - ((r.d2p(u) + n <= this.plotWidth) ? 0 : n);
            var m = Math.max(0, a.d2p(e) - a.d2p(l) - ((a.d2p(e) + n <= this.plotHeight) ? 0 : n));
            this.ctx.fillStyle = "rgba(0,0,0,0.05)";
            this.ctx.fillRect(Math.min(r.d2p(b) + n, this.plotWidth), Math.min(a.d2p(l) + n, this.plotWidth), o, m)
        }
    },
    extendXRange: function(d) {
        if (d.options.max == null) {
            var a = d.min,
                e = d.max,
                b, f;
            for (b = 0; b < this.series.length; ++b) {
                f = this.series[b].candles;
                if (f.show && this.series[b].xaxis == d) {
                    e = Math.max(d.datamax + 0.5, e);
                    a = Math.min(d.datamin - 0.5, a)
                }
            }
            d.max = e;
            d.min = a
        }
    }
});
Flotr.defaultMarkerFormatter = function(a) {
    return (Math.round(a.y * 100) / 100) + ""
};
Flotr.addType("markers", {
    options: {
        show: false,
        lineWidth: 1,
        fill: false,
        fillColor: "#FFFFFF",
        fillOpacity: 0.4,
        stroke: false,
        position: "ct",
        labelFormatter: Flotr.defaultMarkerFormatter
    },
    draw: function(d) {
        d = d || this.series;
        var l = this.ctx,
            a = d.xaxis,
            g = d.yaxis,
            m = d.markers,
            c = d.data;
        l.save();
        l.translate(this.plotOffset.left, this.plotOffset.top);
        l.lineJoin = "round";
        l.lineWidth = m.lineWidth;
        l.strokeStyle = "rgba(0,0,0,0.5)";
        l.fillStyle = this.processColor(m.fillColor, {
            opacity: m.fillOpacity
        });
        for (var e = 0; e < c.length; ++e) {
            var k = c[e][0],
                f = a.d2p(k),
                h = c[e][1],
                b = g.d2p(h),
                j = m.labelFormatter({
                    x: k,
                    y: h,
                    index: e,
                    data: c
                });
            this.markers.plot(f, b, j, m)
        }
        l.restore()
    },
    plot: function(g, e, f, j) {
        var h = this.ctx,
            c = this.getTextDimensions(f, null, null),
            b = 2,
            a = g,
            d = e;
        c.width = Math.floor(c.width + b * 2);
        c.height = Math.floor(c.height + b * 2);
        if (j.position.indexOf("c") != -1) {
            a -= c.width / 2 + b
        } else {
            if (j.position.indexOf("l") != -1) {
                a -= c.width
            }
        }
        if (j.position.indexOf("m") != -1) {
            d -= c.height / 2 + b
        } else {
            if (j.position.indexOf("t") != -1) {
                d -= c.height
            }
        }
        a = Math.floor(a) + 0.5;
        d = Math.floor(d) + 0.5;
        if (j.fill) {
            h.fillRect(a, d, c.width, c.height)
        }
        if (j.stroke) {
            h.strokeRect(a, d, c.width, c.height)
        }
        Flotr.drawText(h, f, a + b, d + b, {
            textBaseline: "top",
            textAlign: "left"
        })
    }
});
Flotr.addType("radar", {
    options: {
        show: false,
        lineWidth: 2,
        fill: true,
        fillOpacity: 0.4,
        radiusRatio: 0.9
    },
    draw: function(c) {
        var a = this.ctx,
            b = this.options;
        a.save();
        a.translate(this.plotOffset.left + this.plotWidth / 2, this.plotOffset.top + this.plotHeight / 2);
        a.lineWidth = c.radar.lineWidth;
        a.fillStyle = "rgba(0,0,0,0.05)";
        a.strokeStyle = "rgba(0,0,0,0.05)";
        this.radar.plot(c, c.shadowSize / 2);
        a.strokeStyle = "rgba(0,0,0,0.1)";
        this.radar.plot(c, c.shadowSize / 4);
        a.strokeStyle = c.color;
        a.fillStyle = this.processColor(c.color, {
            opacity: c.radar.fillOpacity
        });
        this.radar.plot(c);
        a.restore()
    },
    plot: function(e, b) {
        var l = this.ctx,
            m = this.options,
            d = e.data,
            g = Math.min(this.plotHeight, this.plotWidth) * m.radar.radiusRatio / 2,
            f = 2 * (Math.PI / d.length),
            a = -Math.PI / 2;
        b = b || 0;
        l.beginPath();
        for (var c = 0; c < d.length; ++c) {
            var k = d[c][0],
                j = d[c][1],
                h = j / this.axes.y.max;
            l[c == 0 ? "moveTo" : "lineTo"](Math.cos(c * f + a) * g * h + b, Math.sin(c * f + a) * g * h + b)
        }
        l.closePath();
        if (e.radar.fill) {
            l.fill()
        }
        l.stroke()
    }
});
Flotr.addType("bubbles", {
    options: {
        show: false,
        lineWidth: 2,
        fill: true,
        fillOpacity: 0.4,
        baseRadius: 2
    },
    draw: function(c) {
        var a = this.ctx,
            b = this.options;
        a.save();
        a.translate(this.plotOffset.left, this.plotOffset.top);
        a.lineWidth = c.bubbles.lineWidth;
        a.fillStyle = "rgba(0,0,0,0.05)";
        a.strokeStyle = "rgba(0,0,0,0.05)";
        this.bubbles.plot(c, c.shadowSize / 2);
        a.strokeStyle = "rgba(0,0,0,0.1)";
        this.bubbles.plot(c, c.shadowSize / 4);
        a.strokeStyle = c.color;
        a.fillStyle = this.processColor(c.color, {
            opacity: c.radar.fillOpacity
        });
        this.bubbles.plot(c);
        a.restore()
    },
    plot: function(c, a) {
        var j = this.ctx,
            k = this.options,
            b = c.data,
            e = k.bubbles.baseRadius;
        a = a || 0;
        for (var d = 0; d < b.length; ++d) {
            var h = b[d][0],
                g = b[d][1],
                f = b[d][2];
            j.beginPath();
            j.arc(c.xaxis.d2p(h) + a, c.yaxis.d2p(g) + a, e * f, 0, Math.PI * 2, true);
            j.stroke();
            if (c.bubbles.fill) {
                j.fill()
            }
            j.closePath()
        }
    }
});
Flotr.addPlugin("spreadsheet", {
    options: {
        show: false,
        tabGraphLabel: "Graph",
        tabDataLabel: "Data",
        toolbarDownload: "Download CSV",
        toolbarSelectAll: "Select all",
        csvFileSeparator: ",",
        decimalSeparator: ".",
        tickFormatter: null
    },
    callbacks: {
        "flotr:afterconstruct": function() {
            this.el.select(".flotr-tabs-group,.flotr-datagrid-container").invoke("remove");
            if (!this.options.spreadsheet.show) {
                return
            }
            var a = this.spreadsheet;
            a.tabsContainer = new Element("div", {
                style: "position:absolute;left:0px;width:" + this.canvasWidth + "px"
            }).addClassName("flotr-tabs-group");
            a.tabs = {
                graph: new Element("div", {
                    style: "float:left"
                }).addClassName("flotr-tab selected").update(this.options.spreadsheet.tabGraphLabel),
                data: new Element("div", {
                    style: "float:left"
                }).addClassName("flotr-tab").update(this.options.spreadsheet.tabDataLabel)
            };
            a.tabsContainer.insert(a.tabs.graph).insert(a.tabs.data);
            this.el.insert({
                bottom: a.tabsContainer
            });
            var b = a.tabs.data.getHeight() + 2;
            this.plotOffset.bottom += b;
            a.tabsContainer.setStyle({
                top: this.canvasHeight - b + "px"
            });
            a.tabs.graph.observe("click", function() {
                a.showTab("graph")
            });
            a.tabs.data.observe("click", function() {
                a.showTab("data")
            })
        }
    },
    constructDataGrid: function() {
        if (this.spreadsheet.datagrid) {
            return this.spreadsheet.datagrid
        }
        var d, b, n = this.series,
            l = this.loadDataGrid(),
            m = this.spreadsheet.datagrid = new Element("table").addClassName("flotr-datagrid"),
            c = ["<colgroup><col />"];
        var f = ['<tr class="first-row">'];
        f.push("<th>&nbsp;</th>");
        for (d = 0; d < n.length; ++d) {
            f.push('<th scope="col">' + (n[d].label || String.fromCharCode(65 + d)) + "</th>");
            c.push("<col />")
        }
        f.push("</tr>");
        for (b = 0; b < l.length; ++b) {
            f.push("<tr>");
            for (d = 0; d < n.length + 1; ++d) {
                var o = "td",
                    g = (l[b][d] != null ? Math.round(l[b][d] * 100000) / 100000 : "");
                if (d == 0) {
                    o = "th";
                    var k;
                    if (this.options.xaxis.ticks) {
                        var e = this.options.xaxis.ticks.find(function(j) {
                            return j[0] == l[b][d]
                        });
                        if (e) {
                            k = e[1]
                        }
                    } else {
                        if (this.options.spreadsheet.tickFormatter) {
                            k = this.options.spreadsheet.tickFormatter(g)
                        } else {
                            k = this.options.xaxis.tickFormatter(g)
                        }
                    }
                    if (k) {
                        g = k
                    }
                }
                f.push("<" + o + (o == "th" ? ' scope="row"' : "") + ">" + g + "</" + o + ">")
            }
            f.push("</tr>")
        }
        c.push("</colgroup>");
        m.update(c.join("") + f.join(""));
        if (!Prototype.Browser.IE || Flotr.isIE9) {
            m.select("td").each(function(j) {
                j.observe("mouseover", function(q) {
                    j = q.element();
                    var r = j.previousSiblings();
                    m.select("th[scope=col]")[r.length - 1].addClassName("hover");
                    m.select("colgroup col")[r.length].addClassName("hover")
                }).observe("mouseout", function() {
                    m.select("colgroup col.hover, th.hover").invoke("removeClassName", "hover")
                })
            })
        }
        var h = new Element("div").addClassName("flotr-datagrid-toolbar").insert(new Element("button", {
            type: "button"
        }).addClassName("flotr-datagrid-toolbar-button").update(this.options.spreadsheet.toolbarDownload).observe("click", this.spreadsheet.downloadCSV.bindAsEventListener(this))).insert(new Element("button", {
            type: "button"
        }).addClassName("flotr-datagrid-toolbar-button").update(this.options.spreadsheet.toolbarSelectAll).observe("click", this.spreadsheet.selectAllData.bindAsEventListener(this)));
        var a = new Element("div", {
            style: "left:0px;top:0px;width:" + this.canvasWidth + "px;height:" + (this.canvasHeight - this.spreadsheet.tabsContainer.getHeight() - 2) + "px;overflow:auto;"
        }).addClassName("flotr-datagrid-container");
        a.insert(h);
        m.wrap(a.hide());
        this.el.insert(a);
        return m
    },
    showTab: function(b) {
        var a = "canvas, .flotr-labels, .flotr-legend, .flotr-legend-bg, .flotr-title, .flotr-subtitle";
        switch (b) {
            case "graph":
                if (this.spreadsheet.datagrid) {
                    this.spreadsheet.datagrid.up().hide()
                }
                this.el.select(a).invoke("show");
                this.spreadsheet.tabs.data.removeClassName("selected");
                this.spreadsheet.tabs.graph.addClassName("selected");
                break;
            case "data":
                this.spreadsheet.constructDataGrid();
                this.spreadsheet.datagrid.up().show();
                this.el.select(a).invoke("hide");
                this.spreadsheet.tabs.data.addClassName("selected");
                this.spreadsheet.tabs.graph.removeClassName("selected");
                break
        }
    },
    selectAllData: function() {
        if (this.spreadsheet.tabs) {
            var b, a, e, d, c = this.spreadsheet.constructDataGrid();
            this.spreadsheet.showTab("data");
            setTimeout(function() {
                if ((e = c.ownerDocument) && (d = e.defaultView) && d.getSelection && e.createRange && (b = window.getSelection()) && b.removeAllRanges) {
                    a = e.createRange();
                    a.selectNode(c);
                    b.removeAllRanges();
                    b.addRange(a)
                } else {
                    if (document.body && document.body.createTextRange && (a = document.body.createTextRange())) {
                        a.moveToElementText(c);
                        a.select()
                    }
                }
            }, 0);
            return true
        } else {
            return false
        }
    },
    downloadCSV: function() {
        var b, a = "",
            c = this.series,
            j = this.options,
            f = this.loadDataGrid(),
            d = encodeURIComponent(j.spreadsheet.csvFileSeparator);
        if (j.spreadsheet.decimalSeparator === j.spreadsheet.csvFileSeparator) {
            throw "The decimal separator is the same as the column separator (" + j.spreadsheet.decimalSeparator + ")"
        }
        for (b = 0; b < c.length; ++b) {
            a += d + '"' + (c[b].label || String.fromCharCode(65 + b)).replace(/\"/g, '\\"') + '"'
        }
        a += "%0D%0A";
        for (b = 0; b < f.length; ++b) {
            var h = "";
            if (j.xaxis.ticks) {
                var e = j.xaxis.ticks.find(function(k) {
                    return k[0] == f[b][0]
                });
                if (e) {
                    h = e[1]
                }
            } else {
                if (j.spreadsheet.tickFormatter) {
                    h = j.spreadsheet.tickFormatter(f[b][0])
                } else {
                    h = j.xaxis.tickFormatter(f[b][0])
                }
            }
            h = '"' + (h + "").replace(/\"/g, '\\"') + '"';
            var g = f[b].slice(1).join(d);
            if (j.spreadsheet.decimalSeparator !== ".") {
                g = g.replace(/\./g, j.spreadsheet.decimalSeparator)
            }
            a += h + d + g + "%0D%0A"
        }
        if (Prototype.Browser.IE && !Flotr.isIE9) {
            a = a.replace(new RegExp(d, "g"), decodeURIComponent(d)).replace(/%0A/g, "\n").replace(/%0D/g, "\r");
            window.open().document.write(a)
        } else {
            window.open("data:text/csv," + a)
        }
    }
});
// Combined /shared/jslib/scriptaculous1.9.0/effects.js
String.prototype.parseColor = function() {
    var a = "#";
    if (this.slice(0, 4) == "rgb(") {
        var c = this.slice(4, this.length - 1).split(",");
        var b = 0;
        do {
            a += parseInt(c[b]).toColorPart()
        } while (++b < 3)
    } else {
        if (this.slice(0, 1) == "#") {
            if (this.length == 4) {
                for (var b = 1; b < 4; b++) {
                    a += (this.charAt(b) + this.charAt(b)).toLowerCase()
                }
            }
            if (this.length == 7) {
                a = this.toLowerCase()
            }
        }
    }
    return (a.length == 7 ? a : (arguments[0] || this))
};
Element.collectTextNodes = function(a) {
    return $A($(a).childNodes).collect(function(b) {
        return (b.nodeType == 3 ? b.nodeValue : (b.hasChildNodes() ? Element.collectTextNodes(b) : ""))
    }).flatten().join("")
};
Element.collectTextNodesIgnoreClass = function(a, b) {
    return $A($(a).childNodes).collect(function(c) {
        return (c.nodeType == 3 ? c.nodeValue : ((c.hasChildNodes() && !Element.hasClassName(c, b)) ? Element.collectTextNodesIgnoreClass(c, b) : ""))
    }).flatten().join("")
};
Element.setContentZoom = function(a, b) {
    a = $(a);
    a.setStyle({
        fontSize: (b / 100) + "em"
    });
    if (Prototype.Browser.WebKit) {
        window.scrollBy(0, 0)
    }
    return a
};
Element.getInlineOpacity = function(a) {
    return $(a).style.opacity || ""
};
Element.forceRerendering = function(a) {
    try {
        a = $(a);
        var c = document.createTextNode(" ");
        a.appendChild(c);
        a.removeChild(c)
    } catch (b) {}
};
var Effect = {
    _elementDoesNotExistError: {
        name: "ElementDoesNotExistError",
        message: "The specified DOM element does not exist, but is required for this effect to operate"
    },
    Transitions: {
        linear: Prototype.K,
        sinoidal: function(a) {
            return (-Math.cos(a * Math.PI) / 2) + 0.5
        },
        reverse: function(a) {
            return 1 - a
        },
        flicker: function(a) {
            var a = ((-Math.cos(a * Math.PI) / 4) + 0.75) + Math.random() / 4;
            return a > 1 ? 1 : a
        },
        wobble: function(a) {
            return (-Math.cos(a * Math.PI * (9 * a)) / 2) + 0.5
        },
        pulse: function(b, a) {
            return (-Math.cos((b * ((a || 5) - 0.5) * 2) * Math.PI) / 2) + 0.5
        },
        spring: function(a) {
            return 1 - (Math.cos(a * 4.5 * Math.PI) * Math.exp(-a * 6))
        },
        none: function(a) {
            return 0
        },
        full: function(a) {
            return 1
        }
    },
    DefaultOptions: {
        duration: 1,
        fps: 100,
        sync: false,
        from: 0,
        to: 1,
        delay: 0,
        queue: "parallel"
    },
    tagifyText: function(a) {
        var b = "position:relative";
        if (Prototype.Browser.IE) {
            b += ";zoom:1"
        }
        a = $(a);
        $A(a.childNodes).each(function(c) {
            if (c.nodeType == 3) {
                c.nodeValue.toArray().each(function(d) {
                    a.insertBefore(new Element("span", {
                        style: b
                    }).update(d == " " ? String.fromCharCode(160) : d), c)
                });
                Element.remove(c)
            }
        })
    },
    multiple: function(b, c) {
        var e;
        if (((typeof b == "object") || Object.isFunction(b)) && (b.length)) {
            e = b
        } else {
            e = $(b).childNodes
        }
        var a = Object.extend({
            speed: 0.1,
            delay: 0
        }, arguments[2] || {});
        var d = a.delay;
        $A(e).each(function(g, f) {
            new c(g, Object.extend(a, {
                delay: f * a.speed + d
            }))
        })
    },
    PAIRS: {
        slide: ["SlideDown", "SlideUp"],
        blind: ["BlindDown", "BlindUp"],
        appear: ["Appear", "Fade"]
    },
    toggle: function(b, c, a) {
        b = $(b);
        c = (c || "appear").toLowerCase();
        return Effect[Effect.PAIRS[c][b.visible() ? 1 : 0]](b, Object.extend({
            queue: {
                position: "end",
                scope: (b.id || "global"),
                limit: 1
            }
        }, a || {}))
    }
};
Effect.DefaultOptions.transition = Effect.Transitions.sinoidal;
Effect.ScopedQueue = Class.create(Enumerable, {
    initialize: function() {
        this.effects = [];
        this.interval = null
    },
    _each: function(a) {
        this.effects._each(a)
    },
    add: function(b) {
        var c = new Date().getTime();
        var a = Object.isString(b.options.queue) ? b.options.queue : b.options.queue.position;
        switch (a) {
            case "front":
                this.effects.findAll(function(d) {
                    return d.state == "idle"
                }).each(function(d) {
                    d.startOn += b.finishOn;
                    d.finishOn += b.finishOn
                });
                break;
            case "with-last":
                c = this.effects.pluck("startOn").max() || c;
                break;
            case "end":
                c = this.effects.pluck("finishOn").max() || c;
                break
        }
        b.startOn += c;
        b.finishOn += c;
        if (!b.options.queue.limit || (this.effects.length < b.options.queue.limit)) {
            this.effects.push(b)
        }
        if (!this.interval) {
            this.interval = setInterval(this.loop.bind(this), 15)
        }
    },
    remove: function(a) {
        this.effects = this.effects.reject(function(b) {
            return b == a
        });
        if (this.effects.length == 0) {
            clearInterval(this.interval);
            this.interval = null
        }
    },
    loop: function() {
        var c = new Date().getTime();
        for (var b = 0, a = this.effects.length; b < a; b++) {
            this.effects[b] && this.effects[b].loop(c)
        }
    }
});
Effect.Queues = {
    instances: $H(),
    get: function(a) {
        if (!Object.isString(a)) {
            return a
        }
        return this.instances.get(a) || this.instances.set(a, new Effect.ScopedQueue())
    }
};
Effect.Queue = Effect.Queues.get("global");
Effect.Base = Class.create({
    position: null,
    start: function(a) {
        if (a && a.transition === false) {
            a.transition = Effect.Transitions.linear
        }
        this.options = Object.extend(Object.extend({}, Effect.DefaultOptions), a || {});
        this.currentFrame = 0;
        this.state = "idle";
        this.startOn = this.options.delay * 1000;
        this.finishOn = this.startOn + (this.options.duration * 1000);
        this.fromToDelta = this.options.to - this.options.from;
        this.totalTime = this.finishOn - this.startOn;
        this.totalFrames = this.options.fps * this.options.duration;
        this.render = (function() {
            function b(d, c) {
                if (d.options[c + "Internal"]) {
                    d.options[c + "Internal"](d)
                }
                if (d.options[c]) {
                    d.options[c](d)
                }
            }
            return function(c) {
                if (this.state === "idle") {
                    this.state = "running";
                    b(this, "beforeSetup");
                    if (this.setup) {
                        this.setup()
                    }
                    b(this, "afterSetup")
                }
                if (this.state === "running") {
                    c = (this.options.transition(c) * this.fromToDelta) + this.options.from;
                    this.position = c;
                    b(this, "beforeUpdate");
                    if (this.update) {
                        this.update(c)
                    }
                    b(this, "afterUpdate")
                }
            }
        })();
        this.event("beforeStart");
        if (!this.options.sync) {
            Effect.Queues.get(Object.isString(this.options.queue) ? "global" : this.options.queue.scope).add(this)
        }
    },
    loop: function(c) {
        if (c >= this.startOn) {
            if (c >= this.finishOn) {
                this.render(1);
                this.cancel();
                this.event("beforeFinish");
                if (this.finish) {
                    this.finish()
                }
                this.event("afterFinish");
                return
            }
            var b = (c - this.startOn) / this.totalTime,
                a = (b * this.totalFrames).round();
            if (a > this.currentFrame) {
                this.render(b);
                this.currentFrame = a
            }
        }
    },
    cancel: function() {
        if (!this.options.sync) {
            Effect.Queues.get(Object.isString(this.options.queue) ? "global" : this.options.queue.scope).remove(this)
        }
        this.state = "finished"
    },
    event: function(a) {
        if (this.options[a + "Internal"]) {
            this.options[a + "Internal"](this)
        }
        if (this.options[a]) {
            this.options[a](this)
        }
    },
    inspect: function() {
        var a = $H();
        for (property in this) {
            if (!Object.isFunction(this[property])) {
                a.set(property, this[property])
            }
        }
        return "#<Effect:" + a.inspect() + ",options:" + $H(this.options).inspect() + ">"
    }
});
Effect.Parallel = Class.create(Effect.Base, {
    initialize: function(a) {
        this.effects = a || [];
        this.start(arguments[1])
    },
    update: function(a) {
        this.effects.invoke("render", a)
    },
    finish: function(a) {
        this.effects.each(function(b) {
            b.render(1);
            b.cancel();
            b.event("beforeFinish");
            if (b.finish) {
                b.finish(a)
            }
            b.event("afterFinish")
        })
    }
});
Effect.Tween = Class.create(Effect.Base, {
    initialize: function(c, f, e) {
        c = Object.isString(c) ? $(c) : c;
        var b = $A(arguments),
            d = b.last(),
            a = b.length == 5 ? b[3] : null;
        this.method = Object.isFunction(d) ? d.bind(c) : Object.isFunction(c[d]) ? c[d].bind(c) : function(g) {
            c[d] = g
        };
        this.start(Object.extend({
            from: f,
            to: e
        }, a || {}))
    },
    update: function(a) {
        this.method(a)
    }
});
Effect.Event = Class.create(Effect.Base, {
    initialize: function() {
        this.start(Object.extend({
            duration: 0
        }, arguments[0] || {}))
    },
    update: Prototype.emptyFunction
});
Effect.Opacity = Class.create(Effect.Base, {
    initialize: function(b) {
        this.element = $(b);
        if (!this.element) {
            throw (Effect._elementDoesNotExistError)
        }
        if (Prototype.Browser.IE && (!this.element.currentStyle.hasLayout)) {
            this.element.setStyle({
                zoom: 1
            })
        }
        var a = Object.extend({
            from: this.element.getOpacity() || 0,
            to: 1
        }, arguments[1] || {});
        this.start(a)
    },
    update: function(a) {
        this.element.setOpacity(a)
    }
});
Effect.Move = Class.create(Effect.Base, {
    initialize: function(b) {
        this.element = $(b);
        if (!this.element) {
            throw (Effect._elementDoesNotExistError)
        }
        var a = Object.extend({
            x: 0,
            y: 0,
            mode: "relative"
        }, arguments[1] || {});
        this.start(a)
    },
    setup: function() {
        this.element.makePositioned();
        this.originalLeft = parseFloat(this.element.getStyle("left") || "0");
        this.originalTop = parseFloat(this.element.getStyle("top") || "0");
        if (this.options.mode == "absolute") {
            this.options.x = this.options.x - this.originalLeft;
            this.options.y = this.options.y - this.originalTop
        }
    },
    update: function(a) {
        this.element.setStyle({
            left: (this.options.x * a + this.originalLeft).round() + "px",
            top: (this.options.y * a + this.originalTop).round() + "px"
        })
    }
});
Effect.MoveBy = function(b, a, c) {
    return new Effect.Move(b, Object.extend({
        x: c,
        y: a
    }, arguments[3] || {}))
};
Effect.Scale = Class.create(Effect.Base, {
    initialize: function(b, c) {
        this.element = $(b);
        if (!this.element) {
            throw (Effect._elementDoesNotExistError)
        }
        var a = Object.extend({
            scaleX: true,
            scaleY: true,
            scaleContent: true,
            scaleFromCenter: false,
            scaleMode: "box",
            scaleFrom: 100,
            scaleTo: c
        }, arguments[2] || {});
        this.start(a)
    },
    setup: function() {
        this.restoreAfterFinish = this.options.restoreAfterFinish || false;
        this.elementPositioning = this.element.getStyle("position");
        this.originalStyle = {};
        ["top", "left", "width", "height", "fontSize"].each(function(b) {
            this.originalStyle[b] = this.element.style[b]
        }.bind(this));
        this.originalTop = this.element.offsetTop;
        this.originalLeft = this.element.offsetLeft;
        var a = this.element.getStyle("font-size") || "100%";
        ["em", "px", "%", "pt"].each(function(b) {
            if (a.indexOf(b) > 0) {
                this.fontSize = parseFloat(a);
                this.fontSizeType = b
            }
        }.bind(this));
        this.factor = (this.options.scaleTo - this.options.scaleFrom) / 100;
        this.dims = null;
        if (this.options.scaleMode == "box") {
            this.dims = [this.element.offsetHeight, this.element.offsetWidth]
        }
        if (/^content/.test(this.options.scaleMode)) {
            this.dims = [this.element.scrollHeight, this.element.scrollWidth]
        }
        if (!this.dims) {
            this.dims = [this.options.scaleMode.originalHeight, this.options.scaleMode.originalWidth]
        }
    },
    update: function(a) {
        var b = (this.options.scaleFrom / 100) + (this.factor * a);
        if (this.options.scaleContent && this.fontSize) {
            this.element.setStyle({
                fontSize: this.fontSize * b + this.fontSizeType
            })
        }
        this.setDimensions(this.dims[0] * b, this.dims[1] * b)
    },
    finish: function(a) {
        if (this.restoreAfterFinish) {
            this.element.setStyle(this.originalStyle)
        }
    },
    setDimensions: function(a, e) {
        var f = {};
        if (this.options.scaleX) {
            f.width = e.round() + "px"
        }
        if (this.options.scaleY) {
            f.height = a.round() + "px"
        }
        if (this.options.scaleFromCenter) {
            var c = (a - this.dims[0]) / 2;
            var b = (e - this.dims[1]) / 2;
            if (this.elementPositioning == "absolute") {
                if (this.options.scaleY) {
                    f.top = this.originalTop - c + "px"
                }
                if (this.options.scaleX) {
                    f.left = this.originalLeft - b + "px"
                }
            } else {
                if (this.options.scaleY) {
                    f.top = -c + "px"
                }
                if (this.options.scaleX) {
                    f.left = -b + "px"
                }
            }
        }
        this.element.setStyle(f)
    }
});
Effect.Highlight = Class.create(Effect.Base, {
    initialize: function(b) {
        this.element = $(b);
        if (!this.element) {
            throw (Effect._elementDoesNotExistError)
        }
        var a = Object.extend({
            startcolor: "#ffff99"
        }, arguments[1] || {});
        this.start(a)
    },
    setup: function() {
        if (this.element.getStyle("display") == "none") {
            this.cancel();
            return
        }
        this.oldStyle = {};
        if (!this.options.keepBackgroundImage) {
            this.oldStyle.backgroundImage = this.element.getStyle("background-image");
            this.element.setStyle({
                backgroundImage: "none"
            })
        }
        if (!this.options.endcolor) {
            this.options.endcolor = this.element.getStyle("background-color").parseColor("#ffffff")
        }
        if (!this.options.restorecolor) {
            this.options.restorecolor = this.element.getStyle("background-color")
        }
        this._base = $R(0, 2).map(function(a) {
            return parseInt(this.options.startcolor.slice(a * 2 + 1, a * 2 + 3), 16)
        }.bind(this));
        this._delta = $R(0, 2).map(function(a) {
            return parseInt(this.options.endcolor.slice(a * 2 + 1, a * 2 + 3), 16) - this._base[a]
        }.bind(this))
    },
    update: function(a) {
        this.element.setStyle({
            backgroundColor: $R(0, 2).inject("#", function(b, c, d) {
                return b + ((this._base[d] + (this._delta[d] * a)).round().toColorPart())
            }.bind(this))
        })
    },
    finish: function() {
        this.element.setStyle(Object.extend(this.oldStyle, {
            backgroundColor: this.options.restorecolor
        }))
    }
});
Effect.ScrollTo = function(c) {
    var b = arguments[1] || {},
        a = document.viewport.getScrollOffsets(),
        d = $(c).cumulativeOffset();
    if (b.offset) {
        d[1] += b.offset
    }
    return new Effect.Tween(null, a.top, d[1], b, function(e) {
        scrollTo(a.left, e.round())
    })
};
Effect.Fade = function(c) {
    c = $(c);
    var a = c.getInlineOpacity();
    var b = Object.extend({
        from: c.getOpacity() || 1,
        to: 0,
        afterFinishInternal: function(d) {
            if (d.options.to != 0) {
                return
            }
            d.element.hide().setStyle({
                opacity: a
            })
        }
    }, arguments[1] || {});
    return new Effect.Opacity(c, b)
};
Effect.Appear = function(b) {
    b = $(b);
    var a = Object.extend({
        from: (b.getStyle("display") == "none" ? 0 : b.getOpacity() || 0),
        to: 1,
        afterFinishInternal: function(c) {
            c.element.forceRerendering()
        },
        beforeSetup: function(c) {
            c.element.setOpacity(c.options.from).show()
        }
    }, arguments[1] || {});
    return new Effect.Opacity(b, a)
};
Effect.Puff = function(b) {
    b = $(b);
    var a = {
        opacity: b.getInlineOpacity(),
        position: b.getStyle("position"),
        top: b.style.top,
        left: b.style.left,
        width: b.style.width,
        height: b.style.height
    };
    return new Effect.Parallel([new Effect.Scale(b, 200, {
        sync: true,
        scaleFromCenter: true,
        scaleContent: true,
        restoreAfterFinish: true
    }), new Effect.Opacity(b, {
        sync: true,
        to: 0
    })], Object.extend({
        duration: 1,
        beforeSetupInternal: function(c) {
            Position.absolutize(c.effects[0].element)
        },
        afterFinishInternal: function(c) {
            c.effects[0].element.hide().setStyle(a)
        }
    }, arguments[1] || {}))
};
Effect.BlindUp = function(a) {
    a = $(a);
    a.makeClipping();
    return new Effect.Scale(a, 0, Object.extend({
        scaleContent: false,
        scaleX: false,
        restoreAfterFinish: true,
        afterFinishInternal: function(b) {
            b.element.hide().undoClipping()
        }
    }, arguments[1] || {}))
};
Effect.BlindDown = function(b) {
    b = $(b);
    var a = b.getDimensions();
    return new Effect.Scale(b, 100, Object.extend({
        scaleContent: false,
        scaleX: false,
        scaleFrom: 0,
        scaleMode: {
            originalHeight: a.height,
            originalWidth: a.width
        },
        restoreAfterFinish: true,
        afterSetup: function(c) {
            c.element.makeClipping().setStyle({
                height: "0px"
            }).show()
        },
        afterFinishInternal: function(c) {
            c.element.undoClipping()
        }
    }, arguments[1] || {}))
};
Effect.SwitchOff = function(b) {
    b = $(b);
    var a = b.getInlineOpacity();
    return new Effect.Appear(b, Object.extend({
        duration: 0.4,
        from: 0,
        transition: Effect.Transitions.flicker,
        afterFinishInternal: function(c) {
            new Effect.Scale(c.element, 1, {
                duration: 0.3,
                scaleFromCenter: true,
                scaleX: false,
                scaleContent: false,
                restoreAfterFinish: true,
                beforeSetup: function(d) {
                    d.element.makePositioned().makeClipping()
                },
                afterFinishInternal: function(d) {
                    d.element.hide().undoClipping().undoPositioned().setStyle({
                        opacity: a
                    })
                }
            })
        }
    }, arguments[1] || {}))
};
Effect.DropOut = function(b) {
    b = $(b);
    var a = {
        top: b.getStyle("top"),
        left: b.getStyle("left"),
        opacity: b.getInlineOpacity()
    };
    return new Effect.Parallel([new Effect.Move(b, {
        x: 0,
        y: 100,
        sync: true
    }), new Effect.Opacity(b, {
        sync: true,
        to: 0
    })], Object.extend({
        duration: 0.5,
        beforeSetup: function(c) {
            c.effects[0].element.makePositioned()
        },
        afterFinishInternal: function(c) {
            c.effects[0].element.hide().undoPositioned().setStyle(a)
        }
    }, arguments[1] || {}))
};
Effect.Shake = function(d) {
    d = $(d);
    var b = Object.extend({
        distance: 20,
        duration: 0.5
    }, arguments[1] || {});
    var e = parseFloat(b.distance);
    var c = parseFloat(b.duration) / 10;
    var a = {
        top: d.getStyle("top"),
        left: d.getStyle("left")
    };
    return new Effect.Move(d, {
        x: e,
        y: 0,
        duration: c,
        afterFinishInternal: function(f) {
            new Effect.Move(f.element, {
                x: -e * 2,
                y: 0,
                duration: c * 2,
                afterFinishInternal: function(g) {
                    new Effect.Move(g.element, {
                        x: e * 2,
                        y: 0,
                        duration: c * 2,
                        afterFinishInternal: function(h) {
                            new Effect.Move(h.element, {
                                x: -e * 2,
                                y: 0,
                                duration: c * 2,
                                afterFinishInternal: function(i) {
                                    new Effect.Move(i.element, {
                                        x: e * 2,
                                        y: 0,
                                        duration: c * 2,
                                        afterFinishInternal: function(j) {
                                            new Effect.Move(j.element, {
                                                x: -e,
                                                y: 0,
                                                duration: c,
                                                afterFinishInternal: function(k) {
                                                    k.element.undoPositioned().setStyle(a)
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
};
Effect.SlideDown = function(c) {
    c = $(c).cleanWhitespace();
    var a = c.down().getStyle("bottom");
    var b = c.getDimensions();
    return new Effect.Scale(c, 100, Object.extend({
        scaleContent: false,
        scaleX: false,
        scaleFrom: window.opera ? 0 : 1,
        scaleMode: {
            originalHeight: b.height,
            originalWidth: b.width
        },
        restoreAfterFinish: true,
        afterSetup: function(d) {
            d.element.makePositioned();
            d.element.down().makePositioned();
            if (window.opera) {
                d.element.setStyle({
                    top: ""
                })
            }
            d.element.makeClipping().setStyle({
                height: "0px"
            }).show()
        },
        afterUpdateInternal: function(d) {
            d.element.down().setStyle({
                bottom: (d.dims[0] - d.element.clientHeight) + "px"
            })
        },
        afterFinishInternal: function(d) {
            d.element.undoClipping().undoPositioned();
            d.element.down().undoPositioned().setStyle({
                bottom: a
            })
        }
    }, arguments[1] || {}))
};
Effect.SlideUp = function(c) {
    c = $(c).cleanWhitespace();
    var a = c.down().getStyle("bottom");
    var b = c.getDimensions();
    return new Effect.Scale(c, window.opera ? 0 : 1, Object.extend({
        scaleContent: false,
        scaleX: false,
        scaleMode: "box",
        scaleFrom: 100,
        scaleMode: {
            originalHeight: b.height,
            originalWidth: b.width
        },
        restoreAfterFinish: true,
        afterSetup: function(d) {
            d.element.makePositioned();
            d.element.down().makePositioned();
            if (window.opera) {
                d.element.setStyle({
                    top: ""
                })
            }
            d.element.makeClipping().show()
        },
        afterUpdateInternal: function(d) {
            d.element.down().setStyle({
                bottom: (d.dims[0] - d.element.clientHeight) + "px"
            })
        },
        afterFinishInternal: function(d) {
            d.element.hide().undoClipping().undoPositioned();
            d.element.down().undoPositioned().setStyle({
                bottom: a
            })
        }
    }, arguments[1] || {}))
};
Effect.Squish = function(a) {
    return new Effect.Scale(a, window.opera ? 1 : 0, {
        restoreAfterFinish: true,
        beforeSetup: function(b) {
            b.element.makeClipping()
        },
        afterFinishInternal: function(b) {
            b.element.hide().undoClipping()
        }
    })
};
Effect.Grow = function(c) {
    c = $(c);
    var b = Object.extend({
        direction: "center",
        moveTransition: Effect.Transitions.sinoidal,
        scaleTransition: Effect.Transitions.sinoidal,
        opacityTransition: Effect.Transitions.full
    }, arguments[1] || {});
    var a = {
        top: c.style.top,
        left: c.style.left,
        height: c.style.height,
        width: c.style.width,
        opacity: c.getInlineOpacity()
    };
    var g = c.getDimensions();
    var h, f;
    var e, d;
    switch (b.direction) {
        case "top-left":
            h = f = e = d = 0;
            break;
        case "top-right":
            h = g.width;
            f = d = 0;
            e = -g.width;
            break;
        case "bottom-left":
            h = e = 0;
            f = g.height;
            d = -g.height;
            break;
        case "bottom-right":
            h = g.width;
            f = g.height;
            e = -g.width;
            d = -g.height;
            break;
        case "center":
            h = g.width / 2;
            f = g.height / 2;
            e = -g.width / 2;
            d = -g.height / 2;
            break
    }
    return new Effect.Move(c, {
        x: h,
        y: f,
        duration: 0.01,
        beforeSetup: function(i) {
            i.element.hide().makeClipping().makePositioned()
        },
        afterFinishInternal: function(i) {
            new Effect.Parallel([new Effect.Opacity(i.element, {
                sync: true,
                to: 1,
                from: 0,
                transition: b.opacityTransition
            }), new Effect.Move(i.element, {
                x: e,
                y: d,
                sync: true,
                transition: b.moveTransition
            }), new Effect.Scale(i.element, 100, {
                scaleMode: {
                    originalHeight: g.height,
                    originalWidth: g.width
                },
                sync: true,
                scaleFrom: window.opera ? 1 : 0,
                transition: b.scaleTransition,
                restoreAfterFinish: true
            })], Object.extend({
                beforeSetup: function(j) {
                    j.effects[0].element.setStyle({
                        height: "0px"
                    }).show()
                },
                afterFinishInternal: function(j) {
                    j.effects[0].element.undoClipping().undoPositioned().setStyle(a)
                }
            }, b))
        }
    })
};
Effect.Shrink = function(c) {
    c = $(c);
    var b = Object.extend({
        direction: "center",
        moveTransition: Effect.Transitions.sinoidal,
        scaleTransition: Effect.Transitions.sinoidal,
        opacityTransition: Effect.Transitions.none
    }, arguments[1] || {});
    var a = {
        top: c.style.top,
        left: c.style.left,
        height: c.style.height,
        width: c.style.width,
        opacity: c.getInlineOpacity()
    };
    var f = c.getDimensions();
    var e, d;
    switch (b.direction) {
        case "top-left":
            e = d = 0;
            break;
        case "top-right":
            e = f.width;
            d = 0;
            break;
        case "bottom-left":
            e = 0;
            d = f.height;
            break;
        case "bottom-right":
            e = f.width;
            d = f.height;
            break;
        case "center":
            e = f.width / 2;
            d = f.height / 2;
            break
    }
    return new Effect.Parallel([new Effect.Opacity(c, {
        sync: true,
        to: 0,
        from: 1,
        transition: b.opacityTransition
    }), new Effect.Scale(c, window.opera ? 1 : 0, {
        sync: true,
        transition: b.scaleTransition,
        restoreAfterFinish: true
    }), new Effect.Move(c, {
        x: e,
        y: d,
        sync: true,
        transition: b.moveTransition
    })], Object.extend({
        beforeStartInternal: function(g) {
            g.effects[0].element.makePositioned().makeClipping()
        },
        afterFinishInternal: function(g) {
            g.effects[0].element.hide().undoClipping().undoPositioned().setStyle(a)
        }
    }, b))
};
Effect.Pulsate = function(c) {
    c = $(c);
    var b = arguments[1] || {},
        a = c.getInlineOpacity(),
        e = b.transition || Effect.Transitions.linear,
        d = function(f) {
            return 1 - e((-Math.cos((f * (b.pulses || 5) * 2) * Math.PI) / 2) + 0.5)
        };
    return new Effect.Opacity(c, Object.extend(Object.extend({
        duration: 2,
        from: 0,
        afterFinishInternal: function(f) {
            f.element.setStyle({
                opacity: a
            })
        }
    }, b), {
        transition: d
    }))
};
Effect.Fold = function(b) {
    b = $(b);
    var a = {
        top: b.style.top,
        left: b.style.left,
        width: b.style.width,
        height: b.style.height
    };
    b.makeClipping();
    return new Effect.Scale(b, 5, Object.extend({
        scaleContent: false,
        scaleX: false,
        afterFinishInternal: function(c) {
            new Effect.Scale(b, 1, {
                scaleContent: false,
                scaleY: false,
                afterFinishInternal: function(d) {
                    d.element.hide().undoClipping().setStyle(a)
                }
            })
        }
    }, arguments[1] || {}))
};
Effect.Morph = Class.create(Effect.Base, {
    initialize: function(c) {
        this.element = $(c);
        if (!this.element) {
            throw (Effect._elementDoesNotExistError)
        }
        var a = Object.extend({
            style: {}
        }, arguments[1] || {});
        if (!Object.isString(a.style)) {
            this.style = $H(a.style)
        } else {
            if (a.style.include(":")) {
                this.style = a.style.parseStyle()
            } else {
                this.element.addClassName(a.style);
                this.style = $H(this.element.getStyles());
                this.element.removeClassName(a.style);
                var b = this.element.getStyles();
                this.style = this.style.reject(function(d) {
                    return d.value == b[d.key]
                });
                a.afterFinishInternal = function(d) {
                    d.element.addClassName(d.options.style);
                    d.transforms.each(function(e) {
                        d.element.style[e.style] = ""
                    })
                }
            }
        }
        this.start(a)
    },
    setup: function() {
        function a(b) {
            if (!b || ["rgba(0, 0, 0, 0)", "transparent"].include(b)) {
                b = "#ffffff"
            }
            b = b.parseColor();
            return $R(0, 2).map(function(c) {
                return parseInt(b.slice(c * 2 + 1, c * 2 + 3), 16)
            })
        }
        this.transforms = this.style.map(function(g) {
            var f = g[0],
                e = g[1],
                d = null;
            if (e.parseColor("#zzzzzz") != "#zzzzzz") {
                e = e.parseColor();
                d = "color"
            } else {
                if (f == "opacity") {
                    e = parseFloat(e);
                    if (Prototype.Browser.IE && (!this.element.currentStyle.hasLayout)) {
                        this.element.setStyle({
                            zoom: 1
                        })
                    }
                } else {
                    if (Element.CSS_LENGTH.test(e)) {
                        var c = e.match(/^([\+\-]?[0-9\.]+)(.*)$/);
                        e = parseFloat(c[1]);
                        d = (c.length == 3) ? c[2] : null
                    }
                }
            }
            var b = this.element.getStyle(f);
            return {
                style: f.camelize(),
                originalValue: d == "color" ? a(b) : parseFloat(b || 0),
                targetValue: d == "color" ? a(e) : e,
                unit: d
            }
        }.bind(this)).reject(function(b) {
            return ((b.originalValue == b.targetValue) || (b.unit != "color" && (isNaN(b.originalValue) || isNaN(b.targetValue))))
        })
    },
    update: function(a) {
        var d = {},
            b, c = this.transforms.length;
        while (c--) {
            d[(b = this.transforms[c]).style] = b.unit == "color" ? "#" + (Math.round(b.originalValue[0] + (b.targetValue[0] - b.originalValue[0]) * a)).toColorPart() + (Math.round(b.originalValue[1] + (b.targetValue[1] - b.originalValue[1]) * a)).toColorPart() + (Math.round(b.originalValue[2] + (b.targetValue[2] - b.originalValue[2]) * a)).toColorPart() : (b.originalValue + (b.targetValue - b.originalValue) * a).toFixed(3) + (b.unit === null ? "" : b.unit)
        }
        this.element.setStyle(d, true)
    }
});
Effect.Transform = Class.create({
    initialize: function(a) {
        this.tracks = [];
        this.options = arguments[1] || {};
        this.addTracks(a)
    },
    addTracks: function(a) {
        a.each(function(b) {
            b = $H(b);
            var c = b.values().first();
            this.tracks.push($H({
                ids: b.keys().first(),
                effect: Effect.Morph,
                options: {
                    style: c
                }
            }))
        }.bind(this));
        return this
    },
    play: function() {
        return new Effect.Parallel(this.tracks.map(function(a) {
            var d = a.get("ids"),
                c = a.get("effect"),
                b = a.get("options");
            var e = [$(d) || $$(d)].flatten();
            return e.map(function(f) {
                return new c(f, Object.extend({
                    sync: true
                }, b))
            })
        }).flatten(), this.options)
    }
});
Element.CSS_PROPERTIES = $w("backgroundColor backgroundPosition borderBottomColor borderBottomStyle borderBottomWidth borderLeftColor borderLeftStyle borderLeftWidth borderRightColor borderRightStyle borderRightWidth borderSpacing borderTopColor borderTopStyle borderTopWidth bottom clip color fontSize fontWeight height left letterSpacing lineHeight marginBottom marginLeft marginRight marginTop markerOffset maxHeight maxWidth minHeight minWidth opacity outlineColor outlineOffset outlineWidth paddingBottom paddingLeft paddingRight paddingTop right textIndent top width wordSpacing zIndex");
Element.CSS_LENGTH = /^(([\+\-]?[0-9\.]+)(em|ex|px|in|cm|mm|pt|pc|\%))|0$/;
String.__parseStyleElement = document.createElement("div");
String.prototype.parseStyle = function() {
    var b, a = $H();
    if (Prototype.Browser.WebKit) {
        b = new Element("div", {
            style: this
        }).style
    } else {
        String.__parseStyleElement.innerHTML = '<div style="' + this + '"></div>';
        b = String.__parseStyleElement.childNodes[0].style
    }
    Element.CSS_PROPERTIES.each(function(c) {
        if (b[c]) {
            a.set(c, b[c])
        }
    });
    if (Prototype.Browser.IE && this.include("opacity")) {
        a.set("opacity", this.match(/opacity:\s*((?:0|1)?(?:\.\d*)?)/)[1])
    }
    return a
};
if (document.defaultView && document.defaultView.getComputedStyle) {
    Element.getStyles = function(b) {
        var a = document.defaultView.getComputedStyle($(b), null);
        return Element.CSS_PROPERTIES.inject({}, function(c, d) {
            c[d] = a[d];
            return c
        })
    }
} else {
    Element.getStyles = function(b) {
        b = $(b);
        var a = b.currentStyle,
            c;
        c = Element.CSS_PROPERTIES.inject({}, function(d, e) {
            d[e] = a[e];
            return d
        });
        if (!c.opacity) {
            c.opacity = b.getOpacity()
        }
        return c
    }
}
Effect.Methods = {
    morph: function(a, b) {
        a = $(a);
        new Effect.Morph(a, Object.extend({
            style: b
        }, arguments[2] || {}));
        return a
    },
    visualEffect: function(c, e, b) {
        c = $(c);
        var d = e.dasherize().camelize(),
            a = d.charAt(0).toUpperCase() + d.substring(1);
        new Effect[a](c, b);
        return c
    },
    highlight: function(b, a) {
        b = $(b);
        new Effect.Highlight(b, a);
        return b
    }
};
$w("fade appear grow shrink fold blindUp blindDown slideUp slideDown pulsate shake puff squish switchOff dropOut").each(function(a) {
    Effect.Methods[a] = function(c, b) {
        c = $(c);
        Effect[a.charAt(0).toUpperCase() + a.substring(1)](c, b);
        return c
    }
});
$w("getInlineOpacity forceRerendering setContentZoom collectTextNodes collectTextNodesIgnoreClass getStyles").each(function(a) {
    Effect.Methods[a] = Element[a]
});
Element.addMethods(Effect.Methods);
// Combined /shared/jslib/scriptaculous1.9.0/slider.js
if (!Control) {
    var Control = {}
}
Control.Slider = Class.create({
    initialize: function(d, a, b) {
        var c = this;
        if (Object.isArray(d)) {
            this.handles = d.collect(function(f) {
                return $(f)
            })
        } else {
            this.handles = [$(d)]
        }
        this.track = $(a);
        this.options = b || {};
        this.axis = this.options.axis || "horizontal";
        this.increment = this.options.increment || 1;
        this.step = parseInt(this.options.step || "1");
        this.range = this.options.range || $R(0, 1);
        this.value = 0;
        this.values = this.handles.map(function() {
            return 0
        });
        this.spans = this.options.spans ? this.options.spans.map(function(e) {
            return $(e)
        }) : false;
        this.options.startSpan = $(this.options.startSpan || null);
        this.options.endSpan = $(this.options.endSpan || null);
        this.restricted = this.options.restricted || false;
        this.maximum = this.options.maximum || this.range.end;
        this.minimum = this.options.minimum || this.range.start;
        this.alignX = parseInt(this.options.alignX || "0");
        this.alignY = parseInt(this.options.alignY || "0");
        this.trackLength = this.maximumOffset() - this.minimumOffset();
        this.handleLength = this.isVertical() ? (this.handles[0].offsetHeight != 0 ? this.handles[0].offsetHeight : this.handles[0].style.height.replace(/px$/, "")) : (this.handles[0].offsetWidth != 0 ? this.handles[0].offsetWidth : this.handles[0].style.width.replace(/px$/, ""));
        this.active = false;
        this.dragging = false;
        this.disabled = false;
        if (this.options.disabled) {
            this.setDisabled()
        }
        this.allowedValues = this.options.values ? this.options.values.sortBy(Prototype.K) : false;
        if (this.allowedValues) {
            this.minimum = this.allowedValues.min();
            this.maximum = this.allowedValues.max()
        }
        this.eventMouseDown = this.startDrag.bindAsEventListener(this);
        this.eventMouseUp = this.endDrag.bindAsEventListener(this);
        this.eventMouseMove = this.update.bindAsEventListener(this);
        this.handles.each(function(f, e) {
            e = c.handles.length - 1 - e;
            c.setValue(parseFloat((Object.isArray(c.options.sliderValue) ? c.options.sliderValue[e] : c.options.sliderValue) || c.range.start), e);
            f.makePositioned().observe("mousedown", c.eventMouseDown)
        });
        this.track.observe("mousedown", this.eventMouseDown);
        document.observe("mouseup", this.eventMouseUp);
        document.observe("mousemove", this.eventMouseMove);
        this.initialized = true
    },
    dispose: function() {
        var a = this;
        Event.stopObserving(this.track, "mousedown", this.eventMouseDown);
        Event.stopObserving(document, "mouseup", this.eventMouseUp);
        Event.stopObserving(document, "mousemove", this.eventMouseMove);
        this.handles.each(function(b) {
            Event.stopObserving(b, "mousedown", a.eventMouseDown)
        })
    },
    setDisabled: function() {
        this.disabled = true
    },
    setEnabled: function() {
        this.disabled = false
    },
    getNearestValue: function(a) {
        if (this.allowedValues) {
            if (a >= this.allowedValues.max()) {
                return (this.allowedValues.max())
            }
            if (a <= this.allowedValues.min()) {
                return (this.allowedValues.min())
            }
            var c = Math.abs(this.allowedValues[0] - a);
            var b = this.allowedValues[0];
            this.allowedValues.each(function(d) {
                var e = Math.abs(d - a);
                if (e <= c) {
                    b = d;
                    c = e
                }
            });
            return b
        }
        if (a > this.range.end) {
            return this.range.end
        }
        if (a < this.range.start) {
            return this.range.start
        }
        return a
    },
    setValue: function(b, a) {
        if (!this.active) {
            this.activeHandleIdx = a || 0;
            this.activeHandle = this.handles[this.activeHandleIdx];
            this.updateStyles()
        }
        a = a || this.activeHandleIdx || 0;
        if (this.initialized && this.restricted) {
            if ((a > 0) && (b < this.values[a - 1])) {
                b = this.values[a - 1]
            }
            if ((a < (this.handles.length - 1)) && (b > this.values[a + 1])) {
                b = this.values[a + 1]
            }
        }
        b = this.getNearestValue(b);
        this.values[a] = b;
        this.value = this.values[0];
        this.handles[a].style[this.isVertical() ? "top" : "left"] = this.translateToPx(b);
        this.drawSpans();
        if (!this.dragging || !this.event) {
            this.updateFinished()
        }
    },
    setValueBy: function(b, a) {
        this.setValue(this.values[a || this.activeHandleIdx || 0] + b, a || this.activeHandleIdx || 0)
    },
    translateToPx: function(a) {
        return Math.round(((this.trackLength - this.handleLength) / (this.range.end - this.range.start)) * (a - this.range.start)) + "px"
    },
    translateToValue: function(a) {
        return ((a / (this.trackLength - this.handleLength) * (this.range.end - this.range.start)) + this.range.start)
    },
    getRange: function(b) {
        var a = this.values.sortBy(Prototype.K);
        b = b || 0;
        return $R(a[b], a[b + 1])
    },
    minimumOffset: function() {
        return (this.isVertical() ? this.alignY : this.alignX)
    },
    maximumOffset: function() {
        return (this.isVertical() ? (this.track.offsetHeight != 0 ? this.track.offsetHeight : this.track.style.height.replace(/px$/, "")) - this.alignY : (this.track.offsetWidth != 0 ? this.track.offsetWidth : this.track.style.width.replace(/px$/, "")) - this.alignX)
    },
    isVertical: function() {
        return (this.axis == "vertical")
    },
    drawSpans: function() {
        var a = this;
        if (this.spans) {
            $R(0, this.spans.length - 1).each(function(b) {
                a.setSpan(a.spans[b], a.getRange(b))
            })
        }
        if (this.options.startSpan) {
            this.setSpan(this.options.startSpan, $R(0, this.values.length > 1 ? this.getRange(0).min() : this.value))
        }
        if (this.options.endSpan) {
            this.setSpan(this.options.endSpan, $R(this.values.length > 1 ? this.getRange(this.spans.length - 1).max() : this.value, this.maximum))
        }
    },
    setSpan: function(b, a) {
        if (this.isVertical()) {
            b.style.top = this.translateToPx(a.start);
            b.style.height = this.translateToPx(a.end - a.start + this.range.start)
        } else {
            b.style.left = this.translateToPx(a.start);
            b.style.width = this.translateToPx(a.end - a.start + this.range.start)
        }
    },
    updateStyles: function() {
        this.handles.each(function(a) {
            Element.removeClassName(a, "selected")
        });
        Element.addClassName(this.activeHandle, "selected")
    },
    startDrag: function(c) {
        if (Event.isLeftClick(c)) {
            if (!this.disabled) {
                this.active = true;
                var d = Event.element(c);
                var e = [Event.pointerX(c), Event.pointerY(c)];
                var a = d;
                if (a == this.track) {
                    var b = this.track.cumulativeOffset();
                    this.event = c;
                    this.setValue(this.translateToValue((this.isVertical() ? e[1] - b[1] : e[0] - b[0]) - (this.handleLength / 2)));
                    var b = this.activeHandle.cumulativeOffset();
                    this.offsetX = (e[0] - b[0]);
                    this.offsetY = (e[1] - b[1])
                } else {
                    while ((this.handles.indexOf(d) == -1) && d.parentNode) {
                        d = d.parentNode
                    }
                    if (this.handles.indexOf(d) != -1) {
                        this.activeHandle = d;
                        this.activeHandleIdx = this.handles.indexOf(this.activeHandle);
                        this.updateStyles();
                        var b = this.activeHandle.cumulativeOffset();
                        this.offsetX = (e[0] - b[0]);
                        this.offsetY = (e[1] - b[1])
                    }
                }
            }
            Event.stop(c)
        }
    },
    update: function(a) {
        if (this.active) {
            if (!this.dragging) {
                this.dragging = true
            }
            this.draw(a);
            if (Prototype.Browser.WebKit) {
                window.scrollBy(0, 0)
            }
            Event.stop(a)
        }
    },
    draw: function(b) {
        var c = [Event.pointerX(b), Event.pointerY(b)];
        var a = this.track.cumulativeOffset();
        c[0] -= this.offsetX + a[0];
        c[1] -= this.offsetY + a[1];
        this.event = b;
        this.setValue(this.translateToValue(this.isVertical() ? c[1] : c[0]));
        if (this.initialized && this.options.onSlide) {
            this.options.onSlide(this.values.length > 1 ? this.values : this.value, this)
        }
    },
    endDrag: function(a) {
        if (this.active && this.dragging) {
            this.finishDrag(a, true);
            Event.stop(a)
        }
        this.active = false;
        this.dragging = false
    },
    finishDrag: function(a, b) {
        this.active = false;
        this.dragging = false;
        this.updateFinished()
    },
    updateFinished: function() {
        if (this.initialized && this.options.onChange) {
            this.options.onChange(this.values.length > 1 ? this.values : this.value, this)
        }
        this.event = null
    }
});
// Combined /jslib/converter/Base.js
function clone(b) {
    for (var a in b) {
        if (b.hasOwnProperty(a)) {
            this[a] = b[a]
        }
    }
}

function index_of(b, d) {
    for (var c = 0; c < b.length; c++) {
        if (b[c] === d) {
            return c
        }
    }
    return -1
}

function contains(b, c) {
    if (index_of(b, c) > -1) {
        return true
    }
    return false
}

function uniq(b) {
    var d = [];
    for (var c = 0; c < b.length; c++) {
        if (!contains(d, b[c])) {
            d.push(b[c])
        }
    }
    return d
}

function Currency(c, b, a, d) {
    this.isoCode = c;
    this.name = b || c;
    this.lendRate = parseFloat(a || 1);
    this.borrowRate = parseFloat(d || 1)
}

function CurrencyPair(d, a, b) {
    this.base = d;
    this.quote = a;
    this.sellRate = null;
    this.buyRate = null;
    this.direction = null;
    this.inverted = false;
    this.composition = [];
    b = b || {};
    for (var c in b) {
        this[c] = b[c]
    }
    this.getSellRate = function() {
        return this.getCurrencyRate("sellRate")
    };
    this.getBuyRate = function() {
        return this.getCurrencyRate("buyRate")
    };
    this.getCurrencyRate = function(f) {
        if (this.composition.length === 0) {
            return this[f]
        } else {
            var g = 1;
            for (var e = 0; e < this.composition.length; e++) {
                g = g * this.composition[e].getCurrencyRate(f)
            }
            return g
        }
    };
    this.setDirection = function(e) {
        var g = e.toUpperCase();
        if (g != "LONG" && g != "SHORT") {
            throw "Invalid Direction"
        }
        this.direction = g;
        for (var f = 0; f < this.composition.length; f++) {
            this.composition[f].setDirection(g)
        }
        return this
    };
    this.setAmount = function(h, l, k) {
        var g = h.toUpperCase();
        var e = Math.abs(l);
        if (this.direction === null) {
            throw "cannot set amount without setting direction"
        }
        if (g == this.base.isoCode && this.direction == "LONG") {
            this.base.amount = e;
            this.quote.amount = e * this.getBuyRate()
        } else {
            if (g == this.base.isoCode && this.direction == "SHORT") {
                this.base.amount = e;
                this.quote.amount = e * this.getSellRate()
            } else {
                if (g == this.quote.isoCode && this.direction == "SHORT") {
                    this.quote.amount = e;
                    this.base.amount = e / this.getSellRate()
                } else {
                    if (g == this.quote.isoCode && this.direction == "LONG") {
                        this.quote.amount = e;
                        this.base.amount = e / this.getBuyRate()
                    } else {
                        throw "Invalid currency code or amount"
                    }
                }
            }
        }
        var f = {
            currency: this.base.isoCode,
            amount: this.base.amount
        };
        for (var j = 0; j < this.composition.length; j++) {
            f = this.composition[j].setAmount(f.currency, f.amount, "composition")
        }
        if (k == "composition") {
            return {
                currency: this.quote.isoCode,
                amount: this.quote.amount
            }
        } else {
            return this
        }
    };
    this.convert = function(e, f) {
        this.setAmount(e, f);
        if (e == this.base.isoCode) {
            return this.quote.amount
        } else {
            return this.base.amount
        }
    };
    this.getUnits = function() {
        return Math.floor(this.base.amount)
    };
    this.getSpread = function() {
        return Math.abs(this.getBuyRate() - this.getSellRate())
    };
    this.toString = function() {
        var e = this.base.isoCode + "/" + this.quote.isoCode + " at " + this.getSellRate() + "/" + this.getBuyRate();
        if (this.direction !== null) {
            e += " " + this.direction
        }
        if (this.base.amount !== null) {
            e += "   " + this.base.amount + "/" + this.quote.amount
        }
        return e
    };
    this.getName = function() {
        return this.base.isoCode + "/" + this.quote.isoCode
    }
}

function PairFactory(a) {
    this.currencies = null;
    this.loadData = function() {
        this.currencies = {};
        if (this.rawData.currencies === undefined) {
            var d = [];
            for (var c = 0; c < this.rawData.pairs.length; c++) {
                d.push(this.rawData.pairs[c].split("/")[0]);
                d.push(this.rawData.pairs[c].split("/")[1])
            }
            var b = uniq(d);
            this.rawData.currencies = [];
            for (var e = 0; e < b.length; e++) {
                this.rawData.currencies[e] = {
                    isoCode: b[e]
                }
            }
        }
        if (this.rawData.selectPairs === undefined) {
            this.rawData.selectPairs = this.rawData.pairs
        }
        for (var g = 0; g < this.rawData.currencies.length; g++) {
            var f = this.rawData.currencies[g];
            this.currencies[f.isoCode] = new Currency(f.isoCode, f.name, f.lendRate, f.borrowRate)
        }
    };
    if (typeof(a) == "function") {
        this.getNewData(a)
    } else {
        this.rawData = a;
        this.loadData()
    }
    this.createPair = function() {
        var g, c;
        if (arguments.length == 1) {
            g = arguments[0].split("/")[0].toUpperCase();
            c = arguments[0].split("/")[1].toUpperCase()
        } else {
            if (arguments.length == 2) {
                g = arguments[0];
                c = arguments[1]
            } else {
                throw "Invalid currency pair specified"
            }
        }
        var h = g + "/" + c;
        var b = c + "/" + g;
        var d, j, f;
        for (var e = 0; e < this.rawData.selectPairs.length; e++) {
            if (g == c) {
                return new CurrencyPair(new clone(this.currencies[g]), new clone(this.currencies[c]), {
                    buyRate: 1,
                    sellRate: 1
                })
            } else {
                if (h == this.rawData.selectPairs[e]) {
                    d = index_of(this.rawData.pairs, h);
                    j = this.rawData.bidRates[d];
                    f = this.rawData.askRates[d];
                    return new CurrencyPair(new clone(this.currencies[g]), new clone(this.currencies[c]), {
                        buyRate: f,
                        sellRate: j
                    })
                } else {
                    if (b == this.rawData.selectPairs[e]) {
                        d = index_of(this.rawData.pairs, b);
                        j = this.rawData.bidRates[d];
                        f = this.rawData.askRates[d];
                        return new CurrencyPair(new clone(this.currencies[g]), new clone(this.currencies[c]), {
                            buyRate: (1 / j),
                            sellRate: (1 / f),
                            inverted: true
                        })
                    }
                }
            }
        }
        return new CurrencyPair(new clone(this.currencies[g]), new clone(this.currencies[c]), {
            buyRate: 0,
            sellRate: 0,
            composition: this.generateComposition(g, c)
        })
    };
    this.generateComposition = function(c, b) {
        var d = function(f, e) {
            return (index_of(this.rawData.selectPairs, e + "/" + f) != -1 || index_of(this.rawData.selectPairs, f + "/" + e) != -1)
        };
        if (d.apply(this, [c, "USD"]) && d.apply(this, [b, "USD"])) {
            return [this.createPair(c + "/USD"), this.createPair("USD/" + b)]
        } else {
            if (d.apply(this, [c, "EUR"]) && d.apply(this, [b, "EUR"])) {
                return [this.createPair(c + "/EUR"), this.createPair("EUR/" + b)]
            } else {
                if (d.apply(this, [c, "EUR"]) && d.apply(this, [b, "USD"])) {
                    return [this.createPair(c + "/EUR"), this.createPair("EUR/USD"), this.createPair("USD/" + b)]
                } else {
                    if (d.apply(this, [c, "USD"]) && d.apply(this, [b, "EUR"])) {
                        return [this.createPair(c + "/USD"), this.createPair("USD/EUR"), this.createPair("EUR/" + b)]
                    } else {
                        throw "invalid composition!"
                    }
                }
            }
        }
    }
};
// Combined /jslib/converter/4box-cc.js
function CurrencyConverter(b, d, e, a, c, f) {
    this.baseAmountInput = d;
    this.baseCurrencyInput = e;
    this.quoteAmountInput = a;
    this.quoteCurrencyInput = c;
    this.lastAction = null;
    this.currencyFormatter = f;
    this.direction = "SHORT";
    if (b) {
        this.converter = new PairFactory(b)
    }
    this.recalculate = function(i) {
        if (i !== undefined && i !== null) {
            this.lastAction = i
        }
        var h = this.baseCurrencyInput.value;
        var g = this.quoteCurrencyInput.value;
        if (h === "" || g === "") {
            return
        }
        if (this.lastAction === "base") {
            this.updateAmount(h, g, h, g, this.baseAmountInput, this.quoteAmountInput)
        } else {
            this.updateAmount(h, g, g, h, this.quoteAmountInput, this.baseAmountInput)
        }
    };
    this.updateAmount = function(l, h, k, n, j, g) {
        var i = j.value;
        i = this.currencyFormatter.parse(j.value);
        if (isNaN(i) || i == Infinity) {
            g.value = ("-");
            return
        }
        var m = this.getBankRate();
        i = this.calculate(i, k, m, l, h);
        this.verifyAmount(i);
        i = this.currencyFormatter.roundCurrency(i, n);
        g.value = i
    };
    this.getBankRate = function() {
        return 0
    };
    this.verifyAmount = function(g) {}, this.calculate = function(i, k, h, j, g) {
        if (this.lastAction === "base") {
            i = i / (1 - h / 100)
        } else {
            i = i * (1 - h / 100)
        }
        var l = this.converter.createPair(j + "/" + g);
        l = l.setDirection(this.direction);
        i = l.convert(k, i);
        return i
    }
};
// Combined /shared/jslib/oanda/dropdown/scroller.js
OANDA.Scroller = function(a) {
    this.outerBox = a;
    this.decorate()
};
OANDA.Scroller.ids = {};
OANDA.Scroller.i = 0;
OANDA.Scroller.prototype.decorate = function() {
    $(this.outerBox).makePositioned();
    OANDA.Scroller.i = OANDA.Scroller.i + 1;
    this.myIndex = OANDA.Scroller.i;
    this.innerBox = document.createElement("DIV");
    this.innerBox.className = "scroll-innerBox";
    $(this.innerBox).makePositioned();
    this.innerBox.style.cssFloat = this.innerBox.style.styleFloat = "left";
    this.innerBox.id = "scroll-innerBox-" + OANDA.Scroller.i;
    this.innerBox.style.top = "0px";
    while (this.outerBox.hasChildNodes()) {
        this.innerBox.appendChild(this.outerBox.firstChild)
    }
    this.innerBox.style.overflow = "hidden";
    this.outerBox.style.overflow = "hidden";
    this.track = document.createElement("div");
    this.track.className = "scroll-track";
    $(this.track).makePositioned();
    this.track.style.cssFloat = this.track.style.styleFloat = "left";
    this.track.id = "scroll-track-" + OANDA.Scroller.i;
    this.track.appendChild(document.createComment(""));
    this.tracktop = document.createElement("div");
    this.tracktop.className = "scroll-track-top";
    $(this.tracktop).makePositioned();
    this.tracktop.style.cssFloat = this.tracktop.style.styleFloat = "left";
    this.tracktop.id = "scroll-track-top-" + OANDA.Scroller.i;
    this.tracktop.appendChild(document.createComment(""));
    this.trackbot = document.createElement("div");
    this.trackbot.className = "scroll-track-bot";
    $(this.trackbot).makePositioned();
    this.trackbot.style.cssFloat = this.trackbot.style.styleFloat = "left";
    this.trackbot.id = "scroll-track-bot-" + OANDA.Scroller.i;
    this.trackbot.appendChild(document.createComment(""));
    this.handle = document.createElement("div");
    this.handle.className = "scroll-handle-container";
    this.handle.id = "scroll-handle-container" + OANDA.Scroller.i;
    this.handle_middle = document.createElement("div");
    this.handle_middle.className = "scroll-handle";
    $(this.handle_middle).makePositioned();
    this.handle_middle.id = "scroll-handle-" + OANDA.Scroller.i;
    this.handle_middle.appendChild(document.createComment(""));
    this.handletop = document.createElement("div");
    this.handletop.className = "scroll-handle-top";
    $(this.handletop).makePositioned();
    this.handletop.id = "scroll-handle-top-" + OANDA.Scroller.i;
    this.handletop.appendChild(document.createComment(""));
    this.handlebot = document.createElement("div");
    this.handlebot.className = "scroll-handle-bot";
    $(this.handlebot).makePositioned();
    this.handlebot.id = "scroll-handle-bot-" + OANDA.Scroller.i;
    this.handlebot.appendChild(document.createComment(""));
    this.track.hide();
    this.tracktop.hide();
    this.trackbot.hide();
    this.outerBox.appendChild(this.innerBox);
    this.outerBox.appendChild(this.tracktop);
    this.handle.appendChild(this.handletop);
    this.handle.appendChild(this.handle_middle);
    this.handle.appendChild(this.handlebot);
    this.track.appendChild(this.handle);
    this.outerBox.appendChild(this.track);
    this.outerBox.appendChild(this.trackbot);
    this.slider = new Control.Slider($(this.handle).id, $(this.track).id, {
        axis: "vertical",
        minimum: 0,
        maximum: $(this.outerBox).clientHeight
    });
    this.slider.options.onSlide = this.slider.options.onChange = this.onChange.bind(this);
    window.setTimeout(this.resetScrollbar.bind(this, false), 10);
    this.domMouseCB = this.MouseWheelEvent.bindAsEventListener(this, this.slider);
    this.mouseWheelCB = this.MouseWheelEvent.bindAsEventListener(this, this.slider);
    this.trackTopCB = this.tracktopEvent.bindAsEventListener(this, this.slider);
    this.trackBotCB = this.trackbotEvent.bindAsEventListener(this, this.slider);
    $(this.outerBox).observe("DOMMouseScroll", this.domMouseCB);
    $(this.outerBox).observe("mousewheel", this.mouseWheelCB);
    $(this.tracktop).observe("mousedown", this.trackTopCB);
    $(this.trackbot).observe("mousedown", this.trackBotCB)
};
OANDA.Scroller.prototype.release = function() {
    $(this.outerBox).stopObserving("DOMMouseScroll", this.domMouseCB);
    $(this.outerBox).stopObserving("mousewheel", this.mouseWheelCB);
    $(this.tracktop).stopObserving("mousedown", this.trackTopCB);
    $(this.trackbot).stopObserving("mousedown", this.trackBotCB)
};
OANDA.Scroller.prototype.resetScrollbar = function(b, e, h, c, d, i, l) {
    var g, f, k, a, j;
    this.track.hide();
    this.tracktop.hide();
    this.trackbot.hide();
    this.enableScroll = false;
    this.innerHeight = e === undefined ? $(this.outerBox).clientHeight : e;
    this.innerBox.style.height = this.innerHeight + "px";
    g = h === undefined ? $(this.outerBox).clientWidth : h;
    j = c === undefined ? this.innerBox.scrollHeight : c;
    f = d === undefined ? Element.getStyle(this.tracktop, "height") : d;
    if (f) {
        f = f.replace("px", "")
    } else {
        f = 0
    }
    k = i === undefined ? Element.getStyle(this.handletop, "height") : i;
    if (k) {
        k = k.replace("px", "")
    } else {
        k = 0
    }
    if (this.innerHeight < j) {
        this.viewportHeight = this.innerHeight - f * 2;
        this.scrollPercent = this.viewportHeight / j;
        this.slider.trackLength = this.viewportHeight;
        this.track.style.height = this.viewportHeight + "px";
        this.handleHeight = Math.round(this.viewportHeight * this.innerHeight / j);
        if (this.handleHeight < (k * 2)) {
            this.handleHeight = (k * 2)
        }
        if (this.handleHeight < 10) {
            this.handleHeight = 10
        }
        this.handle.style.height = this.handleHeight + "px";
        this.handle_middle.style.height = this.handleHeight - k * 2 + "px";
        this.handletop.style.height = k + "px";
        this.slider.handleLength = this.handleHeight;
        this.track.style.display = "inline";
        this.tracktop.style.display = "inline";
        this.trackbot.style.display = "inline";
        this.ieDecreaseBy = 1;
        if (this.outerBox.currentStyle) {
            a = this.outerBox.currentStyle.borderWidth.replace("px", "");
            if (!isNaN(a)) {
                this.ieDecreaseBy = (a) * 2
            }
        }
        var m = l === undefined ? $(this.track).clientWidth : l;
        g = (g - m - this.ieDecreaseBy);
        g = g - 1;
        this.enableScroll = true
    }
    if (b) {
        window.setTimeout(this.resetScrollbar.bind(this, false), 10)
    }
};
OANDA.Scroller.prototype.MouseWheelEvent = function(b, a) {
    var c = 0;
    if (!b) {
        b = window.event
    }
    if (b.wheelDelta) {
        c = b.wheelDelta / 120
    } else {
        if (b.detail) {
            c = -b.detail / 3
        }
    }
    if (c) {
        a.setValueBy(-c / (this.innerBox.scrollHeight - this.innerBox.offsetHeight) * 40)
    }
    Event.stop(b)
};
OANDA.Scroller.prototype.trackbotEvent = function(b, a) {
    if (Event.isLeftClick(b)) {
        a.setValueBy(this.scrollPercent);
        Event.stop(b)
    }
};
OANDA.Scroller.prototype.tracktopEvent = function(b, a) {
    if (Event.isLeftClick(b)) {
        a.setValueBy(-this.scrollPercent);
        Event.stop(b)
    }
};
OANDA.Scroller.prototype.onChange = function(a) {
    if (this.enableScroll) {
        this.innerBox.scrollTop = Math.round(a * (this.innerBox.scrollHeight - this.innerBox.offsetHeight))
    }
};
OANDA.Scroller.prototype.setAll = function() {
    $$(".makeScroll").each(function(a) {
        Scroller.ids[a.id] = new Scroller(a)
    })
};
OANDA.Scroller.prototype.reset = function(a) {
    if ($(a).className.match(new RegExp("(^|\\s)makeScroll(\\s|$)"))) {
        if (Scroller.ids[a]) {
            Scroller.ids[a].release()
        }
        Scroller.ids[a] = new Scroller($(a))
    }
};
OANDA.Scroller.prototype.updateAll = function() {
    $H(Scroller.ids).each(function(a) {
        Scroller.ids[a.key].resetScrollbar(true)
    })
};
// Combined /shared/jslib/oanda/dropdown/HTMLCombo.js
OANDA.HTMLCombo = function(a) {
    if (typeof(a) == "undefined") {
        return
    }
    this.comboElement = a.comboElement;
    this.displayElement = a.displayElement;
    this.formElement = a.formElement;
    this.listItems = a.listItems;
    this.itemRenderer = a.itemRenderer;
    this.displayRenderer = a.displayRenderer;
    this.highlightRenderer = a.highlightRenderer;
    this.fitToContent = a.fitToContent;
    this.selectedIndex = 0;
    this.scrollToTop = false;
    this.listContainer = this.createContainer(this.comboElement, a.containerAttributes, a.insertInto);
    this.renderedItems = this.renderListItems(this.listItems, a.itemRenderer, this.listContainer);
    if (a.fitToContent) {
        this.fitListContainerToContent()
    }
    this.setupEventHandlers()
};
OANDA.HTMLCombo.prototype.fitListContainerToContent = function() {
    if (this.calculatedHeight === null) {
        this.calculatedHeight = 0;
        for (var a = 0; a < this.renderedItems.length; a = a + 1) {
            this.calculatedHeight += this.renderedItems[a].getHeight()
        }
        Element.setStyle(this.listContainer, {
            height: this.calculatedHeight + "px"
        })
    }
};
OANDA.HTMLCombo.prototype.getValue = function() {
    return this.formElement.getValue()
};
OANDA.HTMLCombo.prototype.setValue = function(c) {
    var b, a;
    for (a = 0; a < this.listItems.length; a = a + 1) {
        b = this.listItems[a];
        if (b.value == c) {
            this.highlightRenderer(this.renderedItems[this.selectedIndex], false);
            this.selectedIndex = a;
            this.formElement.setValue(b.value);
            this.displayRenderer(this, b);
            break
        }
    }
};
OANDA.HTMLCombo.prototype.getDisplayValue = function() {
    return this.displayElement.getValue()
};
OANDA.HTMLCombo.prototype.setDisplayValue = function(a) {
    if (this.displayElement.setValue) {
        this.displayElement.setValue(a)
    } else {
        this.displayElement.update(a)
    }
};
OANDA.HTMLCombo.prototype.selectListElement = function() {
    var a, b;
    this.displayRenderer(this, this.listItems[this.selectedIndex]);
    a = this.formElement.getValue();
    b = this.listItems[this.selectedIndex].value;
    if (b === undefined) {
        this.hideContainer();
        this.displayElement.focus();
        return
    }
    this.formElement.setValue(b);
    this.hideContainer();
    this.displayElement.focus();
    if (a !== b) {
        this.onChange()
    }
};
OANDA.HTMLCombo.prototype.setContainerPosition = function(a, b) {
    if (a === "left") {
        this.listContainer.setStyle({
            left: b + "px"
        })
    } else {
        if (a === "top") {
            this.listContainer.setStyle({
                top: b + "px"
            })
        }
    }
};
OANDA.HTMLCombo.prototype.setSelectedIndex = function(a) {
    this.selectedIndex = a
};
OANDA.HTMLCombo.prototype.getSelectedIndex = function() {
    return this.selectedIndex
};
OANDA.HTMLCombo.prototype.onChange = function() {};
OANDA.HTMLCombo.prototype.setScrollToTop = function(a) {
    this.scrollToTop = a
};
OANDA.HTMLCombo.prototype.updateListItems = function(a) {
    this.listItems = a;
    this.listContainer.childElements().each(function(b) {
        b.remove()
    });
    this.renderedItems = this.renderListItems(this.listItems, this.itemRenderer, this.listContainer.firstDescendant())
};
OANDA.HTMLCombo.prototype.insertListItem = function(a, b) {
    this.listItems.splice(a, 0, b);
    var c = this.itemRenderer(this, b, a);
    this.renderedItems.splice(a, 0, c);
    this.listContainer.childElements()[a].insert({
        before: c
    })
};
OANDA.HTMLCombo.prototype.removeListItem = function(a) {
    this.listItems.splice(a, 1);
    this.renderedItems.splice(a, 1);
    this.listContainer.childElements()[a].remove()
};
OANDA.HTMLCombo.prototype.renderListItems = function(c, b, e) {
    var a, d;
    a = 0;
    d = [];
    this.listItems.each(function(f) {
        var g = b(this, f, a);
        if (g.style.display === "") {
            g.fastVisible = true
        } else {
            g.fastVisible = false
        }
        d.push(g);
        e.appendChild(g);
        a = a + 1
    }.bind(this));
    return d
};
OANDA.HTMLCombo.prototype.createContainer = function(e, d, b) {
    var a, c;
    a = e.positionedOffset()[0];
    c = e.positionedOffset()[1] + e.offsetHeight - 1;
    d.id = e.id + "_list_container";
    d.style = "display: none; position: absolute; top: " + c + "px; left: " + a + "px;";
    if (!b) {
        b = $$("body")[0]
    }
    b.insert({
        top: new Element("div", d)
    });
    return $(d.id)
};
OANDA.HTMLCombo.prototype.showContainer = function() {
    var b = this.comboElement.positionedOffset()[0];
    var a = this.comboElement.positionedOffset()[1] + this.comboElement.offsetHeight - 1;
    this.listContainer.style.left = b + "px";
    this.listContainer.style.top = a + "px";
    this.listContainer.show();
    if (this.selectedIndex !== null) {
        this.highlightRenderer(this.renderedItems[this.selectedIndex], true)
    }
    if (this.scrollToTop || this.selectedIndex === null) {
        this.updateScrollTop(0);
        this.scrollToTop = false
    } else {
        this.updateScrollTop(this.renderedItems[this.selectedIndex].offsetTop - this.renderedItems[this.selectedIndex].offsetHeight)
    }
};
OANDA.HTMLCombo.prototype.hideContainer = function() {
    if (this.listContainer.visible()) {
        this.listContainer.hide();
        this.displayElement.focus()
    }
};
OANDA.HTMLCombo.prototype.keyUpHandler = function(a) {
    if (this.listContainer.visible() || a.findElement() === this.displayElement) {
        switch (a.keyCode) {
            case Event.KEY_TAB:
                this.showContainer();
                break;
            case Event.KEY_ESC:
                this.hideContainer();
                break;
            case Event.KEY_PAGEDOWN:
                Event.stop(a);
                break;
            case Event.KEY_PAGEUP:
                Event.stop(a);
                break
        }
    }
};
OANDA.HTMLCombo.prototype.keyDownHandler = function(a) {
    if (this.listContainer.visible() || a.findElement() === this.displayElement) {
        switch (a.keyCode) {
            case Event.KEY_RETURN:
                this.selectListElement();
                this.displayElement.fire("htmlCombo:key_return");
                break;
            case Event.KEY_TAB:
                this.selectListElement();
                break;
            case Event.KEY_UP:
                this.move("single", "up");
                Event.stop(a);
                break;
            case Event.KEY_DOWN:
                this.move("single", "down");
                Event.stop(a);
                break;
            case Event.KEY_PAGEUP:
                this.move("page", "up");
                Event.stop(a);
                break;
            case Event.KEY_PAGEDOWN:
                this.move("page", "down");
                Event.stop(a);
                break;
            case Event.KEY_HOME:
                this.move("max", "up");
                Event.stop(a);
                break;
            case Event.KEY_END:
                this.move("max", "down");
                Event.stop(a);
                break
        }
    }
};
OANDA.HTMLCombo.prototype.handlesKeysLikeIE = function() {
    return Prototype.Browser.IE || (Prototype.Browser.WebKit && this.getWebKitVersion() >= 525)
};
OANDA.HTMLCombo.prototype.getWebKitVersion = function() {
    var a = /AppleWebKit\/([\d.]+)/.exec(navigator.userAgent);
    if (a) {
        return parseFloat(a[1])
    }
    return 0
};
OANDA.HTMLCombo.prototype.keyPressHandler = function(a) {
    if (this.listContainer.visible() || a.findElement() === this.displayElement) {
        if (this.handlesKeysLikeIE()) {
            return
        }
        switch (a.keyCode) {
            case Event.KEY_UP:
            case Event.KEY_DOWN:
            case Event.KEY_PAGEUP:
            case Event.KEY_PAGEDOWN:
            case Event.KEY_HOME:
            case Event.KEY_END:
                Event.stop(a)
        }
    }
};
OANDA.HTMLCombo.prototype.move = function(a, b) {
    if (!this.listContainer.visible()) {
        this.showContainer();
        if (this.selectedIndex !== null) {
            this.highlightRenderer(this.renderedItems[this.selectedIndex], true)
        }
        return
    }
    if (this.selectedIndex !== null) {
        this.highlightRenderer(this.renderedItems[this.selectedIndex], false)
    }
    this.selectedIndex = this.getNextPosition(a, b);
    if (this.selectedIndex !== null) {
        this.highlightRenderer(this.renderedItems[this.selectedIndex], true)
    }
    if (b === "down") {
        this.scrollToSelectedPosition("bottom")
    } else {
        this.scrollToSelectedPosition("top")
    }
};
OANDA.HTMLCombo.prototype.getNextPosition = function(b, d) {
    var a, c;
    a = this.getVisibleListItems(b, d);
    if (a.length === 0) {
        return null
    }
    if (this.selectedIndex === null) {
        c = 0
    } else {
        if (b === "single") {
            c = 1
        } else {
            if (b === "page") {
                c = Math.round((this.listContainer.offsetHeight / this.renderedItems[a[0]].offsetHeight)) || 0
            } else {
                c = a.length - 1
            }
        }
    }
    if (c >= a.length) {
        c = a.length - 1
    }
    return a[c]
};
OANDA.HTMLCombo.prototype.getVisibleListItems = function(b, e) {
    var a, d, c;
    a = [];
    d = (b === "single");
    if (this.selectedIndex === null) {
        for (c = 0; c < this.renderedItems.length; c = c + 1) {
            if (this.renderedItems[c].style.display === "" && this.listItems[c].value !== undefined) {
                a.push(c);
                if (d && a.length > 1) {
                    break
                }
            }
        }
    } else {
        if (e === "down") {
            for (c = this.selectedIndex; c < this.renderedItems.length; c = c + 1) {
                if (this.renderedItems[c].style.display === "" && this.listItems[c].value !== undefined) {
                    a.push(c);
                    if (d && a.length > 1) {
                        break
                    }
                }
            }
        } else {
            for (c = this.selectedIndex; c >= 0; c = c - 1) {
                if (this.renderedItems[c].style.display === "" && this.listItems[c].value !== undefined) {
                    a.push(c);
                    if (d && a.length > 1) {
                        break
                    }
                }
            }
        }
    }
    return a
};
OANDA.HTMLCombo.prototype.scrollToSelectedPosition = function(d) {
    var f, e, g, b, a, c;
    if (this.selectedIndex !== null) {
        f = this.renderedItems[this.selectedIndex];
        e = f.offsetTop;
        g = e + f.offsetHeight;
        b = this.listContainer.offsetHeight;
        a = this.getScrollableComponent().scrollTop;
        c = a + b;
        if (d === "top") {
            if (e < a || e > c) {
                this.updateScrollTop(e)
            }
        } else {
            if (g < a || g > c) {
                this.updateScrollTop(g - b)
            }
        }
    }
};
OANDA.HTMLCombo.prototype.updateScrollTop = function(a) {
    this.listContainer.scrollTop = a
};
OANDA.HTMLCombo.prototype.getScrollableComponent = function() {
    return this.listContainer
};
OANDA.HTMLCombo.prototype.mouseOver = function(a) {
    if (this.selectedIndex !== null) {
        this.highlightRenderer(this.renderedItems[this.selectedIndex], false)
    }
    this.highlightRenderer(this.renderedItems[a], true);
    this.selectedIndex = a
};
OANDA.HTMLCombo.prototype.setupEventHandlers = function() {
    this.comboElement.observe("mousedown", function(a) {
        if (!this.listContainer.visible()) {
            this.showContainer();
            this.showingContainer = true
        } else {
            this.hideContainer()
        }
    }.bindAsEventListener(this));
    Event.observe(document, "keyup", this.keyUpHandler.bindAsEventListener(this));
    Event.observe(document, "keydown", this.keyDownHandler.bindAsEventListener(this));
    Event.observe(document, "keypress", this.keyPressHandler.bindAsEventListener(this));
    Event.observe(document, "mousedown", function(a) {
        if (this.showingContainer || !this.listContainer.visible()) {
            this.showingContainer = false;
            return
        }
        var b = a.findElement();
        if (b !== this.listContainer && !b.descendantOf(this.listContainer) && !b.descendantOf(this.comboElement)) {
            this.hideContainer()
        }
    }.bind(this))
};
OANDA.HTMLCombo.prototype.setVisible = function(a, b) {
    this.renderedItems[a].style.display = b ? "block" : "none";
    this.listItems[a].visible = b;
    if (!b && this.selectedIndex === a) {
        this.highlightRenderer(this.renderedItems[a], false);
        this.selectedIndex = 0
    }
};
// Combined /shared/jslib/oanda/dropdown/RateHTMLCombo.js
OANDA.RateHTMLCombo = function(a) {
    OANDA.HTMLCombo.apply(this, [a]);
    this.locale = a.locale;
    this.currencyFormatter = new OANDA.CurrencyFormatter(a.locale);
    this.currencyFormatter.DEFAULT_DECIMALS = 1;
    this.isTyping = false;
    a.comboElement.observe("mouseup", function(b) {
        this.displayElement.select()
    }.bind(this));
    a.comboElement.observe("keydown", function(b) {
        if (b.keyCode === Event.KEY_UP || b.keyCode === Event.KEY_DOWN || b.keyCode === Event.KEY_PAGEUP || b.keyCode === Event.KEY_PAGEDOWN || b.keyCode === Event.KEY_HOME || b.keyCode === Event.KEY_END || b.keyCode === Event.KEY_RETURN || b.keyCode === Event.KEY_ESC || b.keyCode === Event.KEY_TAB || b.keyCode === 16) {
            return
        }
        if (!this.isTyping) {
            this.displayElement.focus();
            this.displayElement.setValue("")
        }
        this.isTyping = true
    }.bind(this))
};
OANDA.RateHTMLCombo.prototype = new OANDA.HTMLCombo();
OANDA.RateHTMLCombo.prototype.constructor = OANDA.RateHTMLCombo;
OANDA.RateHTMLCombo.prototype.setValue = function(a) {
    this.displayElement.setValue(this.formatRate())
};
OANDA.RateHTMLCombo.prototype.showContainer = function() {
    this.isTyping = false;
    OANDA.HTMLCombo.prototype.showContainer.call(this)
};
OANDA.RateHTMLCombo.prototype.formatRate = function() {
    var b = this.formElement.getValue();
    var a = "%";
    if (this.locale.getLanguage() === "fr") {
        a = " %"
    }
    return this.currencyFormatter.formatNumber(b) + a
};
OANDA.RateHTMLCombo.prototype.hideContainer = function() {
    if (this.isTyping && !this.hiding) {
        this.hiding = true;
        this.selectListElement();
        return
    }
    OANDA.HTMLCombo.prototype.hideContainer.call(this);
    if (this.isTyping) {
        this.displayElement.setValue(this.formatRate())
    } else {
        this.setValue(this.formElement.getValue())
    }
    this.hiding = false
};
OANDA.RateHTMLCombo.prototype.selectListElement = function() {
    var c, a;
    c = a = this.formElement.getValue();
    if (this.isTyping) {
        var b = this.displayElement.getValue().replace("%", "").replace(" ", "");
        c = this.currencyFormatter.parse(b);
        if (c !== "" && !isNaN(c)) {
            if (c >= 100) {
                c = 99.99
            } else {
                if (c <= 0) {
                    c = 0
                } else {
                    c = this.currencyFormatter.round(c, 2)
                }
            }
        }
    } else {
        c = this.listItems[this.selectedIndex].value
    }
    this.formElement.setValue(c);
    this.hideContainer();
    this.displayElement.focus();
    if (a != c) {
        this.onChange()
    }
};
OANDA.RateHTMLCombo.prototype.findDisplayValue = function(c) {
    var b, a;
    c = c || this.getValue();
    for (a = 0; a < this.listItems.length; a = a + 1) {
        b = this.listItems[a];
        if (b.value == c) {
            return b.display
        }
    }
    return this.formatRate()
};
// Combined /shared/jslib/oanda/dropdown/SearchHTMLCombo.js
OANDA.SearchHTMLCombo = function(a) {
    if (typeof(a) == "undefined") {
        return
    }
    OANDA.HTMLCombo.apply(this, [a]);
    this.searchCallback = a.searchCallback;
    this.escape_deselects = false;
    a.comboElement.observe("mouseup", function(b) {
        this.displayElement.select()
    }.bind(this))
};
OANDA.SearchHTMLCombo.prototype = new OANDA.HTMLCombo();
OANDA.SearchHTMLCombo.prototype.constructor = OANDA.SearchHTMLCombo;
OANDA.SearchHTMLCombo.prototype.KEY = {
    SHIFT: 16,
    CAPSLOCK: 20,
    CTRL: 17,
    ALT: 18,
    BREAK: 19,
    NUMLOCK: 144,
    SCRLOCK: 145,
    LWIN: 91,
    RWIN: 92,
    SEL: 93,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123
};
OANDA.SearchHTMLCombo.prototype.keyUpHandler = function(b) {
    if (this.listContainer.visible() || b.findElement() === this.displayElement) {
        var a = this.KEY;
        switch (b.keyCode) {
            case Event.KEY_TAB:
                this.showContainer();
                break;
            case Event.KEY_ESC:
                if (this.escape_deselects) {
                    this.selectedIndex = null
                }
                this.hideContainer();
                break;
            case Event.KEY_UP:
            case Event.KEY_DOWN:
            case Event.KEY_RETURN:
            case Event.KEY_HOME:
            case Event.KEY_END:
            case Event.KEY_LEFT:
            case Event.KEY_RIGHT:
            case Event.KEY_PAGEUP:
            case Event.KEY_PAGEDOWN:
            case Event.KEY_INSERT:
            case a.SHIFT:
            case a.CAPSLOCK:
            case a.NUMLOCK:
            case a.SCRLOCK:
            case a.CTRL:
            case a.ALT:
            case a.BREAK:
            case a.LWIN:
            case a.RWIN:
            case a.SEL:
            case a.F1:
            case a.F2:
            case a.F3:
            case a.F4:
            case a.F5:
            case a.F6:
            case a.F7:
            case a.F8:
            case a.F9:
            case a.F10:
            case a.F11:
            case a.F12:
                break;
            default:
                if (b.findElement() !== this.displayElement) {
                    break
                }
                this.filterListElements();
                break
        }
    }
};
OANDA.SearchHTMLCombo.prototype.keyDownHandler = function(b) {
    if (this.listContainer.visible() || b.findElement() === this.displayElement) {
        var a = this.KEY;
        switch (b.keyCode) {
            case Event.KEY_RETURN:
                this.selectListElement();
                this.displayElement.fire("htmlCombo:key_return");
                Event.stop(b);
                break;
            case Event.KEY_TAB:
                this.selectListElement();
                break;
            case Event.KEY_UP:
                this.move("single", "up");
                Event.stop(b);
                break;
            case Event.KEY_DOWN:
                this.move("single", "down");
                Event.stop(b);
                break;
            case Event.KEY_PAGEUP:
                this.move("page", "up");
                Event.stop(b);
                break;
            case Event.KEY_PAGEDOWN:
                this.move("page", "down");
                Event.stop(b);
                break;
            case Event.KEY_HOME:
                this.move("max", "up");
                Event.stop(b);
                break;
            case Event.KEY_END:
                this.move("max", "down");
                Event.stop(b);
                break;
            case a.SHIFT:
            case a.CAPSLOCK:
            case a.NUMLOCK:
            case a.SCRLOCK:
            case a.CTRL:
            case a.ALT:
            case a.BREAK:
            case a.LWIN:
            case a.RWIN:
            case a.SEL:
            case a.F1:
            case a.F2:
            case a.F3:
            case a.F4:
            case a.F5:
            case a.F6:
            case a.F7:
            case a.F8:
            case a.F9:
            case a.F10:
            case a.F11:
            case a.F12:
                break;
            default:
                this.displayElement.fire("searchHtmlCombo:keyInput")
        }
    }
};
OANDA.SearchHTMLCombo.prototype.filterListElements = function() {
    if (!this.listContainer.visible()) {
        this.showContainer()
    }
    if (this.selectedIndex !== null) {
        this.highlightRenderer(this.renderedItems[this.selectedIndex], false)
    }
    this.updateScrollTop(0);
    this.searchCallback(this);
    this.displayElement.fire("searchHtmlCombo:filtered")
};
OANDA.SearchHTMLCombo.prototype.resetRenderedItemsVisiblity = function() {
    var a;
    this.renderedItems.each(function(b) {
        a = b.fastVisible === undefined ? b.style.display !== "none" : b.fastVisible;
        if (!a) {
            b.style.display = "";
            b.fastVisible = true
        }
    }.bind(this))
};
OANDA.SearchHTMLCombo.prototype.showContainer = function() {
    this.resetRenderedItemsVisiblity();
    OANDA.HTMLCombo.prototype.showContainer.call(this);
    this.displayElement.fire("searchHtmlCombo:showContainer")
};
OANDA.SearchHTMLCombo.prototype.hideContainer = function() {
    if (!this.listContainer.visible()) {
        return
    }
    this.highlightRenderer(this.renderedItems[this.selectedIndex], false);
    OANDA.HTMLCombo.prototype.hideContainer.call(this);
    this.setValue(this.formElement.getValue());
    this.displayElement.fire("searchHtmlCombo:hideContainer")
};
// Combined /shared/jslib/oanda/dropdown/ScrollerHTMLCombo.js
OANDA.ScrollerHTMLCombo = function(a) {
    OANDA.HTMLCombo.apply(this, [a]);
    this.scroller = new OANDA.Scroller(this.listContainer);
    this.containerDimensions = this.listContainer.getDimensions()
};
OANDA.ScrollerHTMLCombo.prototype = new OANDA.HTMLCombo();
OANDA.ScrollerHTMLCombo.prototype.constructor = OANDA.ScrollerHTMLCombo;
OANDA.ScrollerHTMLCombo.prototype.showContainer = function() {
    if (this.containerDimensions.width === 0) {
        this.containerDimensions = this.listContainer.getDimensions()
    }
    OANDA.HTMLCombo.showContainer.call(this);
    this.scroller.resetScrollbar(false, this.containerDimensions.height, this.containerDimensions.width, this.calculateScrollableHeight(), this.fastTth, this.fastHth, this.fastTrackWidth)
};
OANDA.ScrollerHTMLCombo.prototype.getScrollableComponent = function() {
    return this.scroller.innerBox
};
OANDA.ScrollerHTMLCombo.prototype.calculateScrollableHeight = function() {
    var c = 0;
    for (var b = 0; b < this.renderedItems.length; b++) {
        var d = this.renderedItems[b].fastVisible;
        if (d === undefined) {
            d = this.renderedItems[b].style.display === ""
        }
        if (d) {
            var a = this.renderedItems[b].fastHeight;
            if (a === undefined || a === "") {
                a = this.renderedItems[b].getHeight()
            }
            c += a
        }
    }
    return c
};
OANDA.ScrollerHTMLCombo.prototype.updateScrollTop = function(b) {
    var a = this.calculateScrollableHeight() - this.containerDimensions.height;
    if (a > 0) {
        this.scroller.slider.setValue(b / (a))
    }
};
OANDA.ScrollerHTMLCombo.prototype.updateListItems = function(a) {
    this.listItems = a;
    this.listContainer.firstDescendant().childElements().each(function(b) {
        b.remove()
    });
    this.renderedItems = this.renderListItems(this.listItems, this.itemRenderer, this.listContainer.firstDescendant())
};
OANDA.ScrollerHTMLCombo.prototype.insertListItem = function(a, b) {
    this.listItems.splice(a, 0, b);
    var c = this.itemRenderer(this, b, a);
    this.renderedItems.splice(a, 0, c);
    this.listContainer.firstDescendant().childElements()[a].insert({
        before: c
    })
};
OANDA.ScrollerHTMLCombo.prototype.removeListItem = function(a) {
    this.listItems.splice(a, 1);
    this.renderedItems.splice(a, 1);
    this.listContainer.firstDescendant().childElements()[a].remove()
};
// Combined /shared/jslib/oanda/dropdown/ScrollerSearchHTMLCombo.js
OANDA.ScrollerSearchHTMLCombo = function(a) {
    OANDA.SearchHTMLCombo.apply(this, [a]);
    this.scroller = new OANDA.Scroller(this.listContainer);
    this.containerDimensions = this.listContainer.getDimensions();
    this.displayElement.observe("searchHtmlCombo:filtered", function() {
        this.scroller.resetScrollbar(false, this.containerDimensions.height, this.containerDimensions.width, this.calculateScrollableHeight(), this.fastTth, this.fastHth, this.fastTrackWidth)
    }.bind(this))
};
OANDA.ScrollerSearchHTMLCombo.prototype = new OANDA.SearchHTMLCombo();
OANDA.ScrollerSearchHTMLCombo.prototype.constructor = OANDA.ScrollerSearchHTMLCombo;
OANDA.ScrollerSearchHTMLCombo.prototype.calculateScrollableHeight = function() {
    var c = 0;
    for (var b = 0; b < this.renderedItems.length; b++) {
        var d = this.renderedItems[b].fastVisible;
        if (d === undefined) {
            d = this.renderedItems[b].style.display === ""
        }
        if (d) {
            var a = this.renderedItems[b].fastHeight;
            if (a === undefined || a === "") {
                a = Element.getHeight(this.renderedItems[b])
            }
            c += a
        }
    }
    return c
};
OANDA.ScrollerSearchHTMLCombo.prototype.showContainer = function() {
    if (this.containerDimensions.width === 0) {
        this.containerDimensions = this.listContainer.getDimensions()
    }
    OANDA.SearchHTMLCombo.prototype.showContainer.call(this);
    this.scroller.resetScrollbar(false, this.containerDimensions.height, this.containerDimensions.width, this.calculateScrollableHeight(), this.fastTth, this.fastHth, this.fastTrackWidth)
};
OANDA.ScrollerSearchHTMLCombo.prototype.getScrollableComponent = function() {
    return this.scroller.innerBox
};
OANDA.ScrollerSearchHTMLCombo.prototype.updateScrollTop = function(b) {
    var a = this.calculateScrollableHeight() - this.containerDimensions.height;
    if (a > 0) {
        this.scroller.slider.setValue(b / (a))
    }
};
OANDA.ScrollerSearchHTMLCombo.prototype.updateListItems = function(a) {
    this.listItems = a;
    this.listContainer.firstDescendant().childElements().each(function(b) {
        b.remove()
    });
    this.renderedItems = this.renderListItems(this.listItems, this.itemRenderer, this.listContainer.firstDescendant())
};
OANDA.ScrollerSearchHTMLCombo.prototype.insertListItem = function(a, b) {
    this.listItems.splice(a, 0, b);
    var c = this.itemRenderer(this, b, a);
    this.renderedItems.splice(a, 0, c);
    this.listContainer.firstDescendant().childElements()[a].insert({
        before: c
    })
};
OANDA.ScrollerSearchHTMLCombo.prototype.removeListItem = function(a) {
    this.listItems.splice(a, 1);
    this.renderedItems.splice(a, 1);
    this.listContainer.firstDescendant().childElements()[a].remove()
};
// Combined /shared/jslib/oanda/locale/locales/ar.js
window.OANDA.lang.ar = {
    rtlLanguage: true,
    shortMonthName: ["ÙŠÙ†Ø§ÙŠØ±", "ÙØ¨Ø±Ø§ÙŠØ±", "Ù…Ø§Ø±Ø³", "Ø£Ø¨Ø±ÙŠÙ„", "Ù…Ø§ÙŠÙˆ", "ÙŠÙˆÙ†ÙŠÙˆ", "ÙŠÙˆÙ„ÙŠÙˆ", "Ø£ØºØ³Ø·Ø³", "Ø³Ø¨ØªÙ…Ø¨Ø±", "Ø£ÙƒØªÙˆØ¨Ø±", "Ù†ÙˆÙÙ…Ø¨Ø±", "Ø¯ÙŠØ³Ù…Ø¨Ø±"],
    monthName: ["ÙŠÙ†Ø§ÙŠØ±", "ÙØ¨Ø±Ø§ÙŠØ±", "Ù…Ø§Ø±Ø³", "Ø£Ø¨Ø±ÙŠÙ„", "Ù…Ø§ÙŠÙˆ", "ÙŠÙˆÙ†ÙŠÙˆ", "ÙŠÙˆÙ„ÙŠÙˆ", "Ø£ØºØ³Ø·Ø³", "Ø³Ø¨ØªÙ…Ø¨Ø±", "Ø£ÙƒØªÙˆØ¨Ø±", "Ù†ÙˆÙÙ…Ø¨Ø±", "Ø¯ÙŠØ³Ù…Ø¨Ø±"],
    narrowDayName: ["Ø­", "Ù†", "Ø«", "Ø±", "Ø®", "Ø¬", "Ø³"],
    dayName: ["Ø§Ù„Ø£Ø­Ø¯", "Ø§Ù„Ø§Ø«Ù†ÙŠÙ†", "Ø§Ù„Ø«Ù„Ø§Ø«Ø§Ø¡", "Ø§Ù„Ø£Ø±Ø¨Ø¹Ø§Ø¡", "Ø§Ù„Ø®Ù…ÙŠØ³", "Ø§Ù„Ø¬Ù…Ø¹Ø©", "Ø§Ù„Ø³Ø¨Øª"],
    monthYearFormat: "_MMM _yyyy",
    monthYearFormatFull: "_MMMM _yyyy",
    dayMonthFormat: "_d _MMM",
    dayMonthYearFormatFull: "_d _MMM _yyyy",
    dayMonthYearFormat: "_yyyy/_M/_d",
    dateTimeFormatFull: "_EEEEØŒ _d _MMMØŒ _yyyy _v _HH:_mm",
    dateFormatFull: "_EEEEØŒ _d _MMMØŒ _yyyy",
    timeFormatFull: "_v _HH:_mm",
    decimalSeparator: "Ù«",
    thousandSeparator: "Ù¬",
    today: "Ø§Ù„ÙŠÙˆÙ…",
    currencySymbol: ""
};
// Combined /shared/jslib/oanda/locale/locales/cns.js
window.OANDA.lang.cns = {
    shortMonthName: ["1æœˆ", "2æœˆ", "3æœˆ", "4æœˆ", "5æœˆ", "6æœˆ", "7æœˆ", "8æœˆ", "9æœˆ", "10æœˆ", "11æœˆ", "12æœˆ"],
    monthName: ["1æœˆ", "2æœˆ", "3æœˆ", "4æœˆ", "5æœˆ", "6æœˆ", "7æœˆ", "8æœˆ", "9æœˆ", "10æœˆ", "11æœˆ", "12æœˆ"],
    narrowDayName: ["æ—¥", "ä¸€", "äºŒ", "ä¸‰", "å››", "äº”", "å…­"],
    dayName: ["æ˜ŸæœŸæ—¥", "æ˜ŸæœŸä¸€", "æ˜ŸæœŸäºŒ", "æ˜ŸæœŸä¸‰", "æ˜ŸæœŸå››", "æ˜ŸæœŸäº”", "æ˜ŸæœŸå…­"],
    monthYearFormat: "_MMM _yyyy",
    monthYearFormatFull: "_MMMM _yyyy",
    dayMonthFormat: "_MMM _dæ—¥",
    dayMonthYearFormatFull: "_yyyy _MMM _d",
    dayMonthYearFormat: "_yyyy-_M-_d",
    dateTimeFormatFull: "_yyyyå¹´_Mæœˆ_dæ—¥_EEEE _HHæ—¶_mmåˆ†_v",
    dateFormatFull: "_yyyyå¹´_Mæœˆ_dæ—¥_EEEE",
    timeFormatFull: "_HHæ—¶_mmåˆ†_v",
    decimalSeparator: ".",
    thousandSeparator: ",",
    today: "ä»Šæ—¥",
    currencySymbol: ""
};
// Combined /shared/jslib/oanda/locale/locales/cnt.js
window.OANDA.lang.cnt = {
    shortMonthName: ["1æœˆ", "2æœˆ", "3æœˆ", "4æœˆ", "5æœˆ", "6æœˆ", "7æœˆ", "8æœˆ", "9æœˆ", "10æœˆ", "11æœˆ", "12æœˆ"],
    monthName: ["1æœˆ", "2æœˆ", "3æœˆ", "4æœˆ", "5æœˆ", "6æœˆ", "7æœˆ", "8æœˆ", "9æœˆ", "10æœˆ", "11æœˆ", "12æœˆ"],
    narrowDayName: ["æ—¥", "ä¸€", "äºŒ", "ä¸‰", "å››", "äº”", "å…­"],
    dayName: ["æ˜ŸæœŸæ—¥", "æ˜ŸæœŸä¸€", "æ˜ŸæœŸäºŒ", "æ˜ŸæœŸä¸‰", "æ˜ŸæœŸå››", "æ˜ŸæœŸäº”", "æ˜ŸæœŸå…­"],
    monthYearFormat: "_MMM _yyyy",
    monthYearFormatFull: "_MMMM _yyyy",
    dayMonthFormat: "_MMM _dæ—¥",
    dayMonthYearFormatFull: "_yyyy _MMM _d",
    dayMonthYearFormat: "_yyyy-_M-_d",
    dateTimeFormatFull: "_yyyyå¹´_Mæœˆ_dæ—¥_EEEE _HHæ—¶_mmåˆ†_v",
    dateFormatFull: "_yyyyå¹´_Mæœˆ_dæ—¥_EEEE",
    timeFormatFull: "_HHæ—¶_mmåˆ†_v",
    decimalSeparator: ".",
    thousandSeparator: ",",
    today: "ä»Šæ—¥",
    currencySymbol: ""
};
// Combined /shared/jslib/oanda/locale/locales/de.js
window.OANDA.lang.de = {
    shortMonthName: ["Jan", "Feb", "Mrz", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
    monthName: ["Januar", "Februar", "MÃ¤rz", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
    narrowDayName: ["S", "M", "D", "M", "D", "F", "S"],
    dayName: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
    monthYearFormat: "_MMM _yyyy",
    monthYearFormatFull: "_MMMM _yyyy",
    dayMonthFormat: "_d. _MMM",
    dayMonthYearFormatFull: "_dd _MMM _yyyy",
    dayMonthYearFormat: "_d._M._yyyy",
    dateTimeFormatFull: "_EEEE, _d. _MMM _yyyy _HH:_mm _v",
    dateFormatFull: "_EEEE, _d. _MMM _yyyy",
    timeFormatFull: "_HH:_mm _v",
    decimalSeparator: ",",
    thousandSeparator: ".",
    today: "Heute",
    currencySymbol: ""
};
// Combined /shared/jslib/oanda/locale/locales/en.js
window.OANDA.lang.en = {
    shortMonthName: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    monthName: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    narrowDayName: ["S", "M", "T", "W", "T", "F", "S"],
    dayName: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    monthYearFormat: "_MMM _yyyy",
    monthYearFormatFull: "_MMMM _yyyy",
    dayMonthFormat: "_MMM _d",
    dayMonthYearFormatFull: "_MMM _d, _yyyy",
    dayMonthYearFormat: "_MM/_dd/_yyyy",
    dateTimeFormatFull: "_EEEE, _MMM _d, _yyyy _HH:_mm _v",
    dateFormatFull: "_EEEE, _MMM _d, _yyyy",
    timeFormatFull: "_HH:_mm _v",
    decimalSeparator: ".",
    thousandSeparator: ",",
    today: "Today",
    currencySymbol: "$"
};
// Combined /shared/jslib/oanda/locale/locales/es.js
window.OANDA.lang.es = {
    shortMonthName: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
    monthName: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
    narrowDayName: ["D", "L", "M", "M", "J", "V", "S"],
    dayName: ["domingo", "lunes", "martes", "miÃ©rcoles", "jueves", "viernes", "sÃ¡bado"],
    monthYearFormat: "_MMM _yyyy",
    monthYearFormatFull: "_MMMM _yyyy",
    dayMonthFormat: "_d _MMM",
    dayMonthYearFormatFull: "_dd _MMM _yyyy",
    dayMonthYearFormat: "_dd/_MM/_yyyy",
    dateTimeFormatFull: "_EEEE _d de _MMM de _yyyy _HH:_mm _v",
    dateFormatFull: "_EEEE _d de _MMM de _yyyy",
    timeFormatFull: "_HH:_mm _v",
    decimalSeparator: ",",
    thousandSeparator: ".",
    today: "Hoy",
    currencySymbol: ""
};
// Combined /shared/jslib/oanda/locale/locales/fr.js
window.OANDA.lang.fr = {
    shortMonthName: ["janv.", "fÃ©vr.", "mars", "avr.", "mai", "juin", "juil.", "aoÃ»t", "sept.", "oct.", "nov.", "dÃ©c."],
    monthName: ["janvier", "fÃ©vrier", "mars", "avril", "mai", "juin", "juillet", "aoÃ»t", "septembre", "octobre", "novembre", "dÃ©cembre"],
    narrowDayName: ["D", "L", "M", "M", "J", "V", "S"],
    dayName: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
    monthYearFormat: "_MMM _yyyy",
    monthYearFormatFull: "_MMMM _yyyy",
    dayMonthFormat: "_d _MMM",
    dayMonthYearFormatFull: "_d _MMM _yyyy",
    dayMonthYearFormat: "_dd/_MM/_yyyy",
    dateTimeFormatFull: "_EEEE le _d _MMM _yyyy _HH:_mm _v",
    dateFormatFull: "_EEEE _d _MMM _yyyy",
    timeFormatFull: "_HH:_mm _v",
    decimalSeparator: ",",
    thousandSeparator: ".",
    today: "Aujourd'hui",
    currencySymbol: ""
};
// Combined /shared/jslib/oanda/locale/locales/it.js
window.OANDA.lang.it = {
    shortMonthName: ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"],
    monthName: ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"],
    narrowDayName: ["D", "L", "M", "M", "G", "V", "S"],
    dayName: ["domenica", "lunedÃ¬", "martedÃ¬", "mercoledÃ¬", "giovedÃ¬", "venerdÃ¬", "sabato"],
    monthYearFormat: "_MMM _yyyy",
    monthYearFormatFull: "_MMMM _yyyy",
    dayMonthFormat: "_d _MMM",
    dayMonthYearFormatFull: "_dd _MMM _yyyy",
    dayMonthYearFormat: "_dd/_MM/_yyyy",
    dateTimeFormatFull: "_EEEE _d _MMM _yyyy _HH._mm _v",
    dateFormatFull: "_EEEE _d _MMM _yyyy",
    timeFormatFull: "_HH._mm _v",
    decimalSeparator: ",",
    thousandSeparator: ".",
    today: "Oggi",
    currencySymbol: ""
};
// Combined /shared/jslib/oanda/locale/locales/ja.js
window.OANDA.lang.ja = {
    shortMonthName: ["1æœˆ", "2æœˆ", "3æœˆ", "4æœˆ", "5æœˆ", "6æœˆ", "7æœˆ", "8æœˆ", "9æœˆ", "10æœˆ", "11æœˆ", "12æœˆ"],
    monthName: ["1æœˆ", "2æœˆ", "3æœˆ", "4æœˆ", "5æœˆ", "6æœˆ", "7æœˆ", "8æœˆ", "9æœˆ", "10æœˆ", "11æœˆ", "12æœˆ"],
    narrowDayName: ["æ—¥", "æœˆ", "ç«", "æ°´", "æœ¨", "é‡‘", "åœŸ"],
    dayName: ["æ—¥æ›œæ—¥", "æœˆæ›œæ—¥", "ç«æ›œæ—¥", "æ°´æ›œæ—¥", "æœ¨æ›œæ—¥", "é‡‘æ›œæ—¥", "åœŸæ›œæ—¥"],
    monthYearFormat: "_yyyyå¹´_Mæœˆ",
    monthYearFormatFull: "_yyyyå¹´_MMM",
    dayMonthFormat: "_Mæœˆ _dæ—¥",
    dayMonthYearFormatFull: "_yyyy _MMM _dd",
    dayMonthYearFormat: "_yyyy/_M/_d",
    dateTimeFormatFull: "_yyyyå¹´_Mæœˆ_dæ—¥_EEEE _HHæ™‚_mmåˆ†_v",
    dateFormatFull: "_yyyyå¹´_Mæœˆ_dæ—¥_EEEE",
    timeFormatFull: "_HHæ™‚_mmåˆ†_v",
    decimalSeparator: ".",
    thousandSeparator: ",",
    today: "ä»Šæ—¥",
    currencySymbol: "Â¥"
};
// Combined /shared/jslib/oanda/locale/locales/ko.js
window.OANDA.lang.ko = {
    shortMonthName: ["1ì›”", "2ì›”", "3ì›”", "4ì›”", "5ì›”", "6ì›”", "7ì›”", "8ì›”", "9ì›”", "10ì›”", "11ì›”", "12ì›”"],
    monthName: ["1ì›”", "2ì›”", "3ì›”", "4ì›”", "5ì›”", "6ì›”", "7ì›”", "8ì›”", "9ì›”", "10ì›”", "11ì›”", "12ì›”"],
    narrowDayName: ["ì¼", "ì›”", "í™”", "ìˆ˜", "ëª©", "ê¸ˆ", "í† "],
    dayName: ["ì¼ìš”ì¼", "ì›”ìš”ì¼", "í™”ìš”ì¼", "ìˆ˜ìš”ì¼", "ëª©ìš”ì¼", "ê¸ˆìš”ì¼", "í† ìš”ì¼"],
    monthYearFormat: "_yyyyë…„ _MMM",
    monthYearFormatFull: "_yyyyë…„ _MMMM",
    dayMonthFormat: "_MMM _dì¼",
    dayMonthYearFormatFull: "_yyyy _MMM _d",
    dayMonthYearFormat: "_yyyy/_MM/_dd",
    dateTimeFormatFull: "_yyyyë…„ _Mì›” _dì¼ _EEEE _HHì‹œ _mmë¶„  _v",
    dateFormatFull: "_yyyyë…„ _Mì›” _dì¼ _EEEE",
    timeFormatFull: "_HHì‹œ _mmë¶„  _v",
    decimalSeparator: ".",
    thousandSeparator: ",",
    today: "ì˜¤ëŠ˜",
    currencySymbol: ""
};
// Combined /shared/jslib/oanda/locale/locales/pt.js
window.OANDA.lang.pt = {
    shortMonthName: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
    monthName: ["janeiro", "fevereiro", "marÃ§o", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"],
    narrowDayName: ["D", "S", "T", "Q", "Q", "S", "S"],
    dayName: ["domingo", "segunda-feira", "terÃ§a-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sÃ¡bado"],
    monthYearFormat: "_MMM de _yyyy",
    monthYearFormatFull: "_MMMM de _yyyy",
    dayMonthFormat: "_d _MMM",
    dayMonthYearFormatFull: "_dd _MMM _yyyy",
    dayMonthYearFormat: "_dd/_MM/_yyyy",
    dateTimeFormatFull: "_EEEE, _d de _MMM de _yyyy _HHh_mmmin _v",
    dateFormatFull: "_EEEE, _d de _MMM de _yyyy",
    timeFormatFull: "_HHh_mmmin _v",
    decimalSeparator: ",",
    thousandSeparator: ".",
    today: "Hoje",
    currencySymbol: ""
};
// Combined /shared/jslib/oanda/locale/locales/ru.js
window.OANDA.lang.ru = {
    shortMonthName: ["Ð¯Ð½Ð²", "Ð¤ÐµÐ²", "ÐœÐ°Ñ€", "ÐÐ¿Ñ€", "ÐœÐ°Ð¹", "Ð˜ÑŽÐ½", "Ð˜ÑŽÐ»", "ÐÐ²Ð³", "Ð¡ÐµÐ½", "ÐžÐºÑ‚", "ÐÐ¾Ñ", "Ð”ÐµÐº"],
    monthName: ["ÑÐ½Ð²Ð°Ñ€Ñ", "Ñ„ÐµÐ²Ñ€Ð°Ð»Ñ", "Ð¼Ð°Ñ€Ñ‚Ð°", "Ð°Ð¿Ñ€ÐµÐ»Ñ", "Ð¼Ð°Ñ", "Ð¸ÑŽÐ½Ñ", "Ð¸ÑŽÐ»Ñ", "Ð°Ð²Ð³ÑƒÑÑ‚Ð°", "ÑÐµÐ½Ñ‚ÑÐ±Ñ€Ñ", "Ð¾ÐºÑ‚ÑÐ±Ñ€Ñ", "Ð½Ð¾ÑÐ±Ñ€Ñ", "Ð´ÐµÐºÐ°Ð±Ñ€Ñ"],
    narrowDayName: ["Ð’", "ÐŸ", "Ð’", "Ð¡", "Ð§", "ÐŸ", "Ð¡"],
    dayName: ["Ð²Ð¾ÑÐºÑ€ÐµÑÐµÐ½ÑŒÐµ", "Ð¿Ð¾Ð½ÐµÐ´ÐµÐ»ÑŒÐ½Ð¸Ðº", "Ð²Ñ‚Ð¾Ñ€Ð½Ð¸Ðº", "ÑÑ€ÐµÐ´Ð°", "Ñ‡ÐµÑ‚Ð²ÐµÑ€Ð³", "Ð¿ÑÑ‚Ð½Ð¸Ñ†Ð°", "ÑÑƒÐ±Ð±Ð¾Ñ‚Ð°"],
    monthYearFormat: "_MMM _yyyy",
    monthYearFormatFull: "_MMMM _yyyy",
    dayMonthFormat: "_d _MMM",
    dayMonthYearFormatFull: "_dd _MMM _yyyy",
    dayMonthYearFormat: "_dd._MM._yyyy",
    dateTimeFormatFull: "_EEEE, _d _MMM _yyyy Ð³. _HH:_mm _v",
    dateFormatFull: "_EEEE, _d _MMM _yyyy Ð³.",
    timeFormatFull: "_HH:_mm _v",
    decimalSeparator: ",",
    thousandSeparator: " ",
    today: "Ð¡ÐµÐ³Ð¾Ð´Ð½Ñ",
    currencySymbol: ""
};
// Combined /shared/jslib/oanda/locale/locales/sv.js
window.OANDA.lang.sv = {
    shortMonthName: ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "aug", "sep", "okt", "nov", "dec"],
    monthName: ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december"],
    narrowDayName: ["S", "M", "T", "O", "T", "F", "L"],
    dayName: ["sÃ¶ndag", "mÃ¥ndag", "tisdag", "onsdag", "torsdag", "fredag", "lÃ¶rdag"],
    monthYearFormat: "_yyyy _MMM",
    monthYearFormat: "_yyyy _MMMM",
    dayMonthFormat: "_d _MMM",
    dayMonthYearFormatFull: "_d _MMM _yyyy",
    dayMonthYearFormat: "_yyyy-_MM-_dd",
    dateTimeFormatFull: "_EEEE den _d _MMM _yyyy kl. _HH._mm _v",
    dateFormatFull: "_EEEE den _d _MMM _yyyy",
    timeFormatFull: "_HH._mm _v",
    decimalSeparator: ",",
    thousandSeparator: ".",
    today: "I dag",
    currencySymbol: ""
};
// Combined /shared/jslib/oanda/locale/Locale.js
OANDA.Locale = function(a) {
    this.language = a
};
OANDA.Locale.prototype.rtlLanguage = {};
OANDA.Locale.prototype.shortMonthName = {};
OANDA.Locale.prototype.monthName = {};
OANDA.Locale.prototype.narrowDayName = {};
OANDA.Locale.prototype.dayName = {};
OANDA.Locale.prototype.monthYearFormat = {};
OANDA.Locale.prototype.monthYearFormatFull = {};
OANDA.Locale.prototype.dayMonthFormat = {};
OANDA.Locale.prototype.dayMonthYearFormatFull = {};
OANDA.Locale.prototype.dayMonthYearFormat = {};
OANDA.Locale.prototype.dateTimeFormatFull = {};
OANDA.Locale.prototype.dateFormatFull = {};
OANDA.Locale.prototype.timeFormatFull = {};
OANDA.Locale.prototype.decimalSeparator = {};
OANDA.Locale.prototype.thousandSeparator = {};
OANDA.Locale.prototype.today = {};
OANDA.Locale.prototype.strings = {};
OANDA.Locale.prototype.currencySymbol = {};
OANDA.Locale.prototype.getLanguage = function() {
    return this.language
};
OANDA.Locale.prototype.getTextDirection = function() {
    if (this.rtlLanguage[this.language] === undefined) {
        return "ltr"
    }
    return "rtl"
};
OANDA.Locale.prototype.getShortMonthNames = function() {
    return this.shortMonthName[this.language]
};
OANDA.Locale.prototype.getMonthNames = function() {
    return this.monthName[this.language]
};
OANDA.Locale.prototype.getNarrowDayNames = function() {
    return this.narrowDayName[this.language]
};
OANDA.Locale.prototype.getDayNames = function() {
    return this.dayName[this.language]
};
OANDA.Locale.prototype.getMonthYearFormat = function() {
    return this.monthYearFormat[this.language]
};
OANDA.Locale.prototype.getMonthYearFormatFull = function() {
    return this.monthYearFormatFull[this.language]
};
OANDA.Locale.prototype.getDayMonthFormat = function() {
    return this.dayMonthFormat[this.language]
};
OANDA.Locale.prototype.getDayMonthYearFormatFull = function() {
    return this.dayMonthYearFormatFull[this.language]
};
OANDA.Locale.prototype.getDayMonthYearFormat = function() {
    return this.dayMonthYearFormat[this.language]
};
OANDA.Locale.prototype.getDateTimeFormatFull = function() {
    return this.dateTimeFormatFull[this.language]
};
OANDA.Locale.prototype.getDateFormatFull = function() {
    return this.dateFormatFull[this.language]
};
OANDA.Locale.prototype.getTimeFormatFull = function() {
    return this.timeFormatFull[this.language]
};
OANDA.Locale.prototype.getDecimalSeparator = function() {
    return this.decimalSeparator[this.language]
};
OANDA.Locale.prototype.getThousandSeparator = function() {
    return this.thousandSeparator[this.language]
};
OANDA.Locale.prototype.getToday = function() {
    return this.today[this.language]
};
OANDA.Locale.prototype.getCurrencySymbol = function() {
    return this.currencySymbol[this.language]
};
OANDA.Locale.prototype.localize = function(e, b, a) {
    var c = this.strings[this.language][e];
    if (b === undefined) {
        b = []
    }
    for (var d = 0; d < b.length; d++) {
        var f = new RegExp("\\[_" + (d + 1) + "\\]", "g");
        c = c.replace(f, b[d])
    }
    if (a) {
        return c
    }
    return c.escapeHTML()
};
OANDA.Locale.loadLangPack = function(c, b) {
    if (b === undefined) {
        b = window.OANDA.lang[c]
    }
    for (var a in b) {
        if (OANDA.Locale.prototype[a] === undefined) {
            continue
        }
        OANDA.Locale.prototype[a][c] = b[a]
    }
};
for (var language in window.OANDA.lang) {
    OANDA.Locale.loadLangPack(language)
};
// Combined /shared/jslib/oanda/cookies.js
function getCookie(c) {
    var d = document.cookie.indexOf(c + "=");
    var a = d + c.length + 1;
    if ((!d) && (c != document.cookie.substring(0, c.length))) {
        return null
    }
    if (d == -1) {
        return null
    }
    var b = document.cookie.indexOf(";", a);
    if (b == -1) {
        b = document.cookie.length
    }
    return unescape(document.cookie.substring(a, b))
}

function setCookie(c, e, a, h, d, g) {
    var b = new Date();
    b.setTime(b.getTime());
    if (a) {
        a = a * 1000 * 60 * 60 * 24
    }
    var f = new Date(b.getTime() + (a));
    document.cookie = c + "=" + escape(e) + ((a) ? ";expires=" + f.toGMTString() : "") + ((h) ? ";path=" + h : "") + ((d) ? ";domain=" + d : "") + ((g) ? ";secure" : "")
}

function deleteCookie(a, c, b) {
    if (getCookie(a)) {
        document.cookie = a + "=" + ((c) ? ";path=" + c : "") + ((b) ? ";domain=" + b : "") + ";expires=Thu, 01-Jan-1970 00:00:01 GMT"
    }
};
// Combined /jslib/currency/converter/CookieManager.js
(function(a) {
    a.namespace("ncc").CookieManager = function() {
        var c = location.pathname;
        var b = new RegExp("/[^/]*/$");
        this.path = c.replace(b, "/");
        document.observe("ncc:dateUpdate", this.quoteDateUpdate.bindAsEventListener(this));
        document.observe("ncc:rateUpdate", this.rateUpdate.bindAsEventListener(this));
        document.observe("ncc:currencyUpdate", this.currencyUpdate.bindAsEventListener(this))
    };
    a.ncc.CookieManager.prototype.quoteDateUpdate = function(b) {
        setCookie("end_date", b.memo, 0, this.path)
    };
    a.ncc.CookieManager.prototype.rateUpdate = function(b) {
        setCookie("rate", b.memo.rate, 90, this.path)
    };
    a.ncc.CookieManager.prototype.currencyUpdate = function(b) {
        setCookie("base_currency_0", b.memo.base, 90, this.path);
        setCookie("quote_currency", b.memo.quote, 90, this.path)
    }
})(jOanda);
// Combined /shared/jslib/oanda/locale/NumberTranslator.js
OANDA.NumberTranslator = function(a) {
    this.locale = a || new OANDA.Locale("en")
};
OANDA.NumberTranslator.prototype.numerals = {
    to: {
        ar: {
            0: "Ù ",
            1: "Ù¡",
            2: "Ù¢",
            3: "Ù£",
            4: "Ù¤",
            5: "Ù¥",
            6: "Ù¦",
            7: "Ù§",
            8: "Ù¨",
            9: "Ù©"
        },
        hi: {
            0: "à¥¦",
            1: "à¥§",
            2: "à¥¨",
            3: "à¥©",
            4: "à¥ª",
            5: "à¥«",
            6: "à¥¬",
            7: "à¥­",
            8: "à¥®",
            9: "à¥¯"
        }
    },
    from: {
        ar: {
            "Ù ": 0,
            "Ù¡": 1,
            "Ù¢": 2,
            "Ù£": 3,
            "Ù¤": 4,
            "Ù¥": 5,
            "Ù¦": 6,
            "Ù§": 7,
            "Ù¨": 8,
            "Ù©": 9
        },
        hi: {
            "à¥¦": 0,
            "à¥§": 1,
            "à¥¨": 2,
            "à¥©": 3,
            "à¥ª": 4,
            "à¥«": 5,
            "à¥¬": 6,
            "à¥­": 7,
            "à¥®": 8,
            "à¥¯": 9
        }
    }
};
OANDA.NumberTranslator.prototype.parse = function(d) {
    var b, f;
    if (d === undefined || d === null) {
        return d
    }
    d = d.toString();
    f = this.numerals.from[this.locale.getLanguage()];
    if (f === undefined) {
        return d
    }
    b = "";
    for (var c = 0; c < d.length; c++) {
        var e = d.charAt(c);
        var a = f[e];
        b = b + (a === undefined ? e : a)
    }
    return b
};
OANDA.NumberTranslator.prototype.format = function(c) {
    var e, f;
    if (c === undefined || c === null) {
        return c
    }
    c = c.toString();
    f = this.numerals.to[this.locale.getLanguage()];
    if (f === undefined) {
        return c
    }
    e = "";
    for (var b = 0; b < c.length; b++) {
        var d = c.charAt(b);
        var a = f[d];
        e = e + (a === undefined ? d : a)
    }
    return e
};
// Combined /shared/jslib/oanda/currency/CurrencyFormatter.js
OANDA.CurrencyFormatter = function(a, b) {
    this.locale = a;
    this.numberTranslator = b || new OANDA.NumberTranslator();
    this.isocode = "USD";
    this.refreshLocale()
};
OANDA.CurrencyFormatter.prototype.ISO_CURRENCY_SYMBOL = {
    AUD: "$",
    CAD: "$",
    CHF: "F",
    EUR: "â‚¬",
    GBP: "Â£",
    HKD: "$",
    JPY: "Â¥",
    SGD: "$",
    USD: "$"
};
OANDA.CurrencyFormatter.prototype.MAX_LENGTH = 12;
OANDA.CurrencyFormatter.prototype.DEFAULT_DECIMALS = 5;
OANDA.CurrencyFormatter.prototype.roundingExceptions = {
    ZWD: 0,
    JPY: 2
};
OANDA.CurrencyFormatter.prototype.decimalStr = ",";
OANDA.CurrencyFormatter.prototype.thousandStr = ".";
OANDA.CurrencyFormatter.prototype.setCurrencyIsoCode = function(a) {
    this.isocode = a
};
OANDA.CurrencyFormatter.prototype.getSymbol = function(a) {
    a = a || this.isocode;
    return this.ISO_CURRENCY_SYMBOL[a] || ""
};
OANDA.CurrencyFormatter.prototype.refreshLocale = function(a) {
    if (a !== undefined) {
        this.locale = a
    }
    this.decimalStr = this.locale.getDecimalSeparator();
    this.thousandStr = this.locale.getThousandSeparator();
    if (this.decimalStr == ".") {
        this.decimalRegex = "\\."
    } else {
        this.decimalRegex = this.decimalStr
    }
    if (this.thousandStr == ".") {
        this.thousandRegex = "\\."
    } else {
        this.thousandRegex = this.thousandStr
    }
};
OANDA.CurrencyFormatter.prototype.roundCurrency = function(d, c) {
    d = Number(d);
    if (isNaN(d) || d == Infinity) {
        return "-"
    }
    var b = this.DEFAULT_DECIMALS;
    if (this.roundingExceptions[c] !== undefined) {
        b = this.roundingExceptions[c]
    }
    var a = this.round(d, b, 6);
    return this.formatNumber(this.stringify(a))
};
OANDA.CurrencyFormatter.prototype.round = function(f, c, b) {
    f = Number(f);
    if (b === undefined) {
        b = 6
    }
    var a = f.toPrecision(b);
    a = this.stringify(a);
    var d = false;
    if (a.substring(0, 1) === "-") {
        d = true;
        a = a.substring(1)
    }
    var e = 0;
    if (a.indexOf(".") > -1) {
        e = a.length - a.indexOf(".") - 1
    }
    if (e > c) {
        a = this.toFixed(a * 1, Math.min(c, e))
    }
    a = this.stringify(a);
    if (d) {
        a = "-" + a
    }
    return a
};
OANDA.CurrencyFormatter.prototype.stringify = function(c) {
    var e, b, a, g;
    var f = /([0-9]+)\.([0-9]*)e([\-+])(.*)$/.exec(c);
    if (f) {
        e = f[1];
        b = f[2];
        a = f[3];
        g = f[4]
    } else {
        f = /([0-9]+)e([\-+])(.*)$/.exec(c);
        if (f) {
            e = f[1];
            b = "";
            a = f[2];
            g = f[3]
        }
    }
    var d;
    if (e) {
        c = e + b;
        if (a === "-") {
            for (d = 0; d < g - 1; d++) {
                c = "0" + c
            }
            c = "0." + c
        } else {
            for (d = 0; d < g - b.length; d++) {
                c = c + "0"
            }
        }
    } else {
        c += ""
    }
    return c
};
OANDA.CurrencyFormatter.prototype.formatNumber = function(d) {
    var c = d.split(".");
    var b = c[0];
    var a = c.length > 1 ? this.decimalStr + c[1] : "";
    var e = /(\d+)(\d{3})/;
    while (b.match(e)) {
        b = b.replace(e, "$1" + this.thousandStr + "$2")
    }
    return this.numberTranslator.format(b + a, "ar")
};
OANDA.CurrencyFormatter.prototype.parse = function(d) {
    d = this.numberTranslator.parse(d);
    var c = d.split(this.decimalStr);
    var b = c[0];
    var a = c.length > 1 ? "." + c[1] : "";
    var e = new RegExp(this.thousandRegex, "g");
    b = b.replace(e, "");
    return b + a
};
OANDA.CurrencyFormatter.prototype.toFixed = function(d, b) {
    if (isNaN(d)) {
        return "NaN"
    }
    var c = false;
    if (d < 0) {
        c = true;
        d = -d
    }
    rounded = Math.round(d * Math.pow(10, b)) + "";
    while (rounded.length < 1 + b) {
        rounded = "0" + rounded
    }
    var e = (rounded.length - b);
    var f = rounded.substring(0, e);
    var a = rounded.substring(e);
    if (f === "0" && a === "") {
        return "0"
    }
    if (a !== "") {
        a = "." + a
    }
    if (c) {
        f = "-" + f
    }
    return f + a
};
// Combined /jslib/currency/converter/widget/Converter.js
(function(a) {
    a.namespace("ncc").Converter = function(b) {
        this.baseAmountInput = b.baseAmountInput;
        this.baseCurrencyInput = b.baseCurrencyInput;
        this.quoteAmountInput = b.quoteAmountInput;
        this.quoteCurrencyInput = b.quoteCurrencyInput;
        this.rateInput = b.rateInput;
        this.lastAction = a.ncc.Elem.lastActionInput.getValue();
        this.locale = b.locale;
        this.currencyFormatter = new OANDA.CurrencyFormatter(b.locale);
        this.dateFormatter = new OANDA.DateFormatter(b.locale);
        this.direction = "LONG";
        this.converter = new PairFactory(b.data);
        this.annotater = b.annotater;
        this.quoteDate = b.quoteDate
    };
    a.ncc.Converter.prototype = new CurrencyConverter();
    a.ncc.Converter.prototype.constructor = a.ncc.Converter;
    a.ncc.Converter.prototype.setCurrencyData = function(c, b) {
        this.converter = new PairFactory(c);
        this.quoteDate = b;
        this.recalculate()
    };
    a.ncc.Converter.prototype.getBankRate = function() {
        return this.rateInput.getValue()
    };
    a.ncc.Converter.prototype.verifyAmount = function(c) {
        if (isNaN(c) || c == Infinity) {
            var b = this.dateFormatter.format(this.quoteDate, this.locale.getDateFormatFull());
            var d = this.locale.localize("noData", [this.quoteCurrencyInput.getValue(), this.baseCurrencyInput.getValue(), b]);
            this.annotater.displayDateInvalidMessage(d)
        } else {
            this.annotater.displayDateInvalidMessage("")
        }
        a.ncc.Elem.lastActionInput.setValue(this.lastAction)
    }
})(jOanda);
// Combined /jslib/currency/converter/widget/CurrencyAnnotater.js
(function(a) {
    a.namespace("ncc").CurrencyAnnotater = function(b) {
        this.baseCurrencyCombo = b.baseCurrencyCombo;
        this.quoteCurrencyCombo = b.quoteCurrencyCombo;
        this.annotations = b.annotations;
        this.baseAnnotation = b.baseAnnotation;
        this.quoteAnnotation = b.quoteAnnotation;
        this.dateAnnotation = b.dateAnnotation;
        this.baseClose = this.baseAnnotation.getElementsBySelector(".annotation_close")[0];
        this.quoteClose = this.quoteAnnotation.getElementsBySelector(".annotation_close")[0];
        this.dateClose = this.dateAnnotation.getElementsBySelector(".annotation_close")[0];
        this.baseContent = this.baseAnnotation.getElementsBySelector("p")[0];
        this.quoteContent = this.quoteAnnotation.getElementsBySelector("p")[0];
        this.dateContent = this.dateAnnotation.getElementsBySelector("p")[0];
        this.baseCurrencyElement = b.baseCurrencyElement;
        this.quoteCurrencyElement = b.quoteCurrencyElement;
        this.dateElement = b.dateElement;
        this.baseClose.observe("click", function() {
            this.baseAnnotation.hide()
        }.bind(this));
        this.quoteClose.observe("click", function() {
            this.quoteAnnotation.hide()
        }.bind(this));
        this.dateClose.observe("click", function() {
            this.dateAnnotation.hide()
        }.bind(this));
        this.recheck()
    };
    a.ncc.CurrencyAnnotater.prototype.recheck = function(c) {
        var g = this.baseCurrencyCombo.getValue();
        var b = this.quoteCurrencyCombo.getValue();
        var k = $H(this.annotations).keys();
        var e = "";
        var h = "";
        for (var f = 0; f < k.length; f++) {
            var l = this.annotations[k[f]].CURRENCIES;
            for (var d = 0; d < l.length; d++) {
                if (!this.annotations[k[f]].SEEN) {
                    this.annotations[k[f]].SEEN = {}
                }
                if (this.annotations[k[f]].SEEN[d]) {
                    continue
                }
                var m = this.annotations[k[f]].MESSAGE;
                if (c != "quote" && l[d] == g) {
                    m = m.replace(/\[_1\]/g, g.escapeHTML());
                    m = m.replace(/\[_2\]/g, this.baseCurrencyCombo.getDisplayValue().replace(/[*]$/, "").escapeHTML());
                    e += m + "\n";
                    this.annotations[k[f]].SEEN[d] = true
                }
                if (c != "base" && l[d] == b) {
                    m = m.replace(/\[_1\]/g, b.escapeHTML());
                    m = m.replace(/\[_2\]/g, this.quoteCurrencyCombo.getDisplayValue().replace(/[*]$/, "").escapeHTML());
                    h += m + "\n";
                    this.annotations[k[f]].SEEN[d] = true
                }
            }
        }
        if (c != "quote" && e.length > 0) {
            this.baseContent.update(e);
            this.baseAnnotation.style.left = this.baseCurrencyElement.positionedOffset()[0] + "px";
            this.baseAnnotation.style.top = this.baseCurrencyElement.positionedOffset()[1] - this.baseAnnotation.getHeight() + 4 + "px";
            this.baseAnnotation.show()
        } else {
            if (c != "quote") {
                this.baseAnnotation.hide()
            }
        }
        if (c != "base" && h.length > 0) {
            this.quoteContent.update(h);
            this.quoteAnnotation.style.left = this.quoteCurrencyElement.positionedOffset()[0] + "px";
            this.quoteAnnotation.style.top = this.quoteCurrencyElement.positionedOffset()[1] - this.quoteAnnotation.getHeight() + 4 + "px";
            this.quoteAnnotation.show()
        } else {
            if (c !== "base") {
                this.quoteAnnotation.hide()
            }
        }
    };
    a.ncc.CurrencyAnnotater.prototype.displayDateInvalidMessage = function(b) {
        if (b !== "") {
            this.dateContent.update(b);
            this.dateAnnotation.style.left = this.dateElement.positionedOffset()[0] - 260 + "px";
            this.dateAnnotation.style.top = this.dateElement.positionedOffset()[1] - this.dateAnnotation.getHeight() + 4 + "px";
            this.dateAnnotation.show()
        } else {
            this.dateAnnotation.hide()
        }
    }
})(jOanda);
// Combined /shared/jslib/oanda/date/DateFormatter.js
OANDA.DateFormatter = function(a, b) {
    this.locale = a || new OANDA.Locale("en");
    this.numberTranslator = b || new OANDA.NumberTranslator()
};
OANDA.DateFormatter.prototype.format = function(c, o, j) {
    if (!o || o === "") {
        o = this.locale.getDayMonthYearFormat()
    }
    if (j) {
        var e = c.getUTCFullYear();
        var k = c.getUTCMonth() + 1;
        var n = c.getUTCDate();
        var d = c.getUTCDay();
        var g = c.getUTCHours();
        var f = c.getUTCMinutes();
        var b = c.getUTCSeconds()
    } else {
        var e = c.getFullYear();
        var k = c.getMonth() + 1;
        var n = c.getDate();
        var d = c.getDay();
        var g = c.getHours();
        var f = c.getMinutes();
        var b = c.getSeconds()
    }
    var i = n < 10 ? "0" + n : n;
    o = o.replace(/_dd/g, this.numberTranslator.format(i));
    o = o.replace(/_d/g, this.numberTranslator.format(n));
    var h = k < 10 ? "0" + k : k;
    o = o.replace(/_MM(?!M)/g, this.numberTranslator.format(h));
    o = o.replace(/_M(?!M)/g, this.numberTranslator.format(k));
    o = o.replace(/_yyyy/g, this.numberTranslator.format(e));
    o = o.replace(/_v/g, "UTC");
    o = o.replace(/_EEEE/g, this.locale.getDayNames()[d]);
    o = o.replace(/_MMMM/g, this.locale.getMonthNames()[k - 1]);
    o = o.replace(/_MMM/g, this.locale.getShortMonthNames()[k - 1]);
    var l = g < 10 ? "0" + g : g;
    o = o.replace(/_HH/g, this.numberTranslator.format(l));
    o = o.replace(/_H/g, this.numberTranslator.format(g));
    var a = f < 10 ? "0" + f : f;
    o = o.replace(/_mm/g, this.numberTranslator.format(a));
    var m = b < 10 ? "0" + b : b;
    o = o.replace(/_SS/g, this.numberTranslator.format(m));
    return o
};
OANDA.DateFormatter.prototype.parse = function(g, l) {
    if (!l || l === "") {
        l = this.locale.getDayMonthYearFormat()
    }
    var d = new RegExp("[ /.-]");
    var k = g.split(d);
    var a = l.split(d);
    try {
        if (k.length != 3) {
            throw Error
        }
        var j;
        var e;
        var h;
        for (var c = 0; c < a.length; c++) {
            if (a[c].indexOf("d") > -1) {
                j = Number(this.numberTranslator.parse(k[c]))
            }
            if (a[c].indexOf("M") > -1) {
                e = Number(this.numberTranslator.parse(k[c]))
            }
            if (a[c].indexOf("y") > -1) {
                h = Number(this.numberTranslator.parse(k[c]))
            }
        }
        var b = new Date(h, e - 1, j);
        if (b == "Invalid Date" || b == "NaN") {
            throw Error
        }
        return b
    } catch (f) {
        return
    }
};
OANDA.DateFormatter.prototype.smartParse = function(h) {
    var k;
    var f;
    var l;
    try {
        var d;
        h = h.toLowerCase();
        var e = new RegExp("[,/ .-]+", "g");
        h = h.replace(e, " ");
        h = h.trim();
        var n = h.split(" ");
        if (n.length != 3) {
            throw Error
        }
        var m = [false, false, false];
        var a = this.locale.getMonthNames();
        done: for (d = 0; d < a.length; d++) {
            for (var c = 0; c < n.length; c++) {
                if (a[d].toLowerCase().match("^" + n[c])) {
                    f = d;
                    m[c] = true;
                    break done
                }
            }
        }
        if (f === undefined) {
            throw Error
        }
        for (d = 0; d < n.length; d++) {
            if (m[d]) {
                continue
            }
            if (n[d].match(/[0-9]{4}/)) {
                k = Number(n[d]);
                m[d] = true;
                break
            }
        }
        for (d = 0; d < n.length; d++) {
            if (m[d]) {
                continue
            }
            if (n[d].match(/[0-9]{1,2}/)) {
                l = Number(n[d]);
                m[d] = true;
                break
            }
        }
        var b = new Date(k, f, l);
        if (b == "Invalid Date") {
            throw Error
        }
        return b
    } catch (g) {
        return
    }
};
// Combined /jslib/currency/converter/builders/InterbankComboBuilder.js
(function(a) {
    a.namespace("ncc").InterbankComboBuilder = function() {
        this.interbankListContainerAttributes = {
            "class": "rates_dropdown"
        }
    };
    a.ncc.InterbankComboBuilder.prototype.create = function(e, d, c, i, b, f) {
        this.interbankListContainerAttributes.dir = b.getTextDirection();
        var h = function(n, l, k) {
            var o = document.createElement("div");
            o.className = "list_item";
            var m = document.createElement("span");
            var j = document.createTextNode(l.display);
            if (b.getTextDirection() === "rtl") {
                m.className = "right"
            } else {
                m.className = "left"
            }
            m.appendChild(j);
            o.appendChild(m);
            o.onmouseover = function() {
                n.mouseOver(k)
            };
            o.onclick = function() {
                n.selectListElement()
            };
            return o
        };
        var g = new OANDA.RateHTMLCombo({
            comboElement: d,
            displayElement: c,
            formElement: i,
            listItems: e,
            containerAttributes: this.interbankListContainerAttributes,
            itemRenderer: h,
            displayRenderer: this.itemSelectedDisplayHandler,
            highlightRenderer: this.itemHighlightDisplayHandler,
            fitToContent: false,
            insertInto: f,
            locale: b
        });
        return g
    };
    a.ncc.InterbankComboBuilder.prototype.itemSelectedDisplayHandler = function(c, b) {
        if (c && b) {
            c.setDisplayValue(b.display)
        } else {
            c.setDisplayValue("")
        }
    };
    a.ncc.InterbankComboBuilder.prototype.itemHighlightDisplayHandler = function(c, b) {
        if (b) {
            Element.addClassName(c, "list_item_hover")
        } else {
            Element.removeClassName(c, "list_item_hover")
        }
    }
})(jOanda);
// Combined /jslib/currency/converter/builders/CurrencyComboBuilder.js
(function(a) {
    a.namespace("ncc").CurrencyComboBuilder = function(b) {
        this.locale = b.locale;
        this.currencyListContainerAttributes = {
            "class": "currency_dropdown"
        }
    };
    a.ncc.CurrencyComboBuilder.prototype.create = function(f, k, i, l, g, b, e, j, h) {
        this.currencyListContainerAttributes.dir = j.getTextDirection();
        var c = function(x, n, t) {
            var q = document.createElement("div");
            q.fastVisible = true;
            if (n.label == "yes") {
                var s = document.createElement("span");
                var r = document.createTextNode(n.display);
                if (j.getTextDirection() === "ltr") {
                    q.className = "ltr_list_label";
                    s.className = "left"
                } else {
                    q.className = "rtl_list_label";
                    s.className = "right"
                }
                s.appendChild(r);
                q.appendChild(s);
                if (t === 0) {
                    q.style.marginTop = "0px";
                    q.fastHeight = 20
                } else {
                    q.fastHeight = 32
                }
                return q
            }
            var v, m, w, p, u, o;
            if (j.getTextDirection() === "ltr") {
                q.className = "ltr_list_item";
                v = document.createElement("span");
                v.className = n.value + " left_flag left";
                m = document.createElement("span");
                o = document.createTextNode(n.display);
                m.className = "left name";
                m.appendChild(o);
                p = document.createElement("span");
                u = document.createTextNode(n.value);
                p.className = "code_right";
                p.appendChild(u);
                q.appendChild(v);
                q.appendChild(m);
                q.appendChild(p)
            } else {
                q.className = "rtl_list_item";
                v = document.createElement("span");
                v.className = n.value + " right_flag right";
                m = document.createElement("span");
                o = document.createTextNode(n.display);
                m.className = "right name";
                m.appendChild(o);
                p = document.createElement("span");
                u = document.createTextNode(n.value);
                p.className = "code_left";
                p.appendChild(u);
                q.appendChild(p);
                q.appendChild(v);
                q.appendChild(m)
            }
            q.onmouseover = function() {
                x.mouseOver(t)
            };
            q.onclick = function() {
                x.selectListElement()
            };
            q.fastHeight = 25;
            return q
        };
        var d = new OANDA.ScrollerSearchHTMLCombo({
            comboElement: k,
            displayElement: i,
            formElement: l,
            listItems: f,
            containerAttributes: this.currencyListContainerAttributes,
            itemRenderer: c,
            displayRenderer: this.itemSelectedDisplayHandler,
            highlightRenderer: this.itemHighlightDisplayHandler,
            searchCallback: this.searchCallback,
            fitToContent: false,
            insertInto: h
        });
        d.setScrollToTop(true);
        d.fastTth = "20px";
        d.fastHth = "0px";
        d.fastTrackWidth = 15;
        d.locale = j;
        d.currencyFlag = g;
        d.currencyCode = b;
        d.beforeSearch = true;
        i.observe("searchHtmlCombo:showContainer", function() {
            if (d.beforeSearch) {
                i.value = this.locale.localize("searchHelp", []);
                i.addClassName("search");
                i.select()
            }
            g.hide();
            b.hide();
            e.addClassName("glass")
        }.bind(this));
        i.observe("searchHtmlCombo:keyInput", function() {
            if (d.beforeSearch) {
                i.focus();
                i.setValue("");
                i.removeClassName("search");
                d.beforeSearch = false
            }
        }.bind(this));
        i.observe("searchHtmlCombo:hideContainer", function() {
            d.beforeSearch = true;
            i.removeClassName("search");
            g.show();
            b.show();
            e.removeClassName("glass")
        }.bind(this));
        return d
    };
    a.ncc.CurrencyComboBuilder.prototype.itemSelectedDisplayHandler = function(c, b) {
        if (c && b) {
            this.currencyFlag.className = b.value.escapeHTML() + " flag";
            this.currencyCode.update(b.value.escapeHTML());
            c.setDisplayValue(b.display);
            this.currencyFlag.show();
            this.currencyCode.show()
        } else {
            this.currencyFlag.className = "";
            this.currencyCode.update("");
            c.setDisplayValue("")
        }
    };
    a.ncc.CurrencyComboBuilder.prototype.itemHighlightDisplayHandler = function(c, b) {
        if (b) {
            Element.addClassName(c, "list_item_hover")
        } else {
            Element.removeClassName(c, "list_item_hover")
        }
    };
    a.ncc.CurrencyComboBuilder.prototype.searchCallback = function(d) {
        if (d.beforeSearch) {
            return
        }
        var b = 0;
        var e = false;
        var c = d.displayElement.getValue().toLowerCase();
        c = c.replace(/^[ ]*/, "");
        c = c.replace(/[ ]*$/, "");
        d.listItems.each(function(h) {
            var g = h.search.toLowerCase();
            g = g.split(",");
            var j = false;
            for (var f = 0; f < g.length; f++) {
                if (g[f].indexOf(c) >= 0) {
                    j = true;
                    break
                }
            }
            if (!j) {
                d.renderedItems[b].style.display = "none";
                d.renderedItems[b].fastVisible = false
            } else {
                d.renderedItems[b].style.display = "";
                d.renderedItems[b].fastVisible = true;
                if (!e && h.value !== undefined) {
                    e = true;
                    d.selectedIndex = b;
                    d.highlightRenderer(d.renderedItems[d.selectedIndex], true)
                }
            }
            b++
        })
    }
})(jOanda);
// Combined /shared/jslib/oanda/date/Calendar.js
OANDA.Calendar = function(a) {
    a = a || {};
    this.locale = a.locale || new OANDA.Locale("en");
    this.minDate = a.minDate;
    this.maxDate = a.maxDate;
    this.date = a.date || new Date();
    this.showToday = a.showToday || false;
    this.date = this.isValidDate(this.date)["date"];
    this.selectedDate = this.date;
    this.numberTranslator = new OANDA.NumberTranslator();
    this.dateFormatter = new OANDA.DateFormatter(this.locale, this.numberTranslator);
    var c = a.left || 0;
    var b = a.top || 0;
    this.container = new Element("div", {
        "class": "calendarContainer"
    });
    this.container.style.top = b + "px";
    this.container.style.left = c + "px";
    this.container.id = a.id || "";
    this.parent = a.parent || document.body;
    this.parent.appendChild(this.container);
    this.generateCalendar();
    this.container.observe("mousedown", function(d) {
        Event.stop(d)
    });
    this.handler = this.checkDestroy.bindAsEventListener(this);
    window.setTimeout(function() {
        Event.observe(document, "click", this.handler)
    }.bind(this), 1);
    document.observe("oanda:closeCalendar_" + this.container.id, function(d) {
        this.destroyCalendar()
    }.bind(this));
    document.observe("oanda:dateChangedCalendar_" + this.container.id, function(d) {
        this.date = this.isValidDate(d.memo)["date"];
        this.selectedDate = this.date;
        this.generateCalendar()
    }.bind(this))
};
OANDA.Calendar.prototype.generateCalendar = function() {
    var d;
    this.container.descendants().invoke("remove");
    var b = new Element("div", {
        "class": "closeCalendar"
    });
    b.observe("click", this.destroyCalendar.bind(this));
    this.container.insert(b);
    this.generateHeader();
    var g = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
    var c = new Element("tbody");
    var e = new Element("tr", {
        "class": "calendarWeekHeading"
    });
    for (d = 0; d < 7; d++) {
        e.insert(new Element("td").insert(this.locale.getNarrowDayNames()[d]))
    }
    c.insert(e);
    for (d = 1; d <= this.daysInMonth(); d++) {
        g.setDate(d);
        if (g.getDay() === 0 || d == 1) {
            c.insert(this.generateWeek(g))
        }
    }
    this.container.insert(new Element("table", {
        "class": "calendarTable",
        cellspacing: "0"
    }).insert(c));
    if (this.showToday) {
        var f = new Element("span", {
            "class": "calendarToday"
        });
        var a = this.maxDate;
        f.observe("mousedown", this.selectDate.bind(this, a));
        f.insert(this.locale.getToday() + ': <span style="text-decoration: underline">' + this.dateFormatter.format(a, this.locale.getDayMonthYearFormatFull()) + "</span>");
        this.container.insert(f)
    }
};
OANDA.Calendar.prototype.generateHeader = function() {
    var c;
    var d = this.date.getFullYear();
    var f = this.date.getMonth();
    var h = new Element("div", {
        "class": "calendarHeader"
    });
    var e = this.dateFormatter.format(this.date, this.locale.getMonthYearFormat()).toUpperCase();
    var b = new Element("span", {}).insert(e);
    var g = new Element("div", {
        "class": "calendarMonthDisplay"
    }).insert(b);
    var a = [this.generateNavButton("navLastYear", new Date(d - 1, f, 1)), this.generateNavButton("navLastMonth", new Date(d, f - 1, 1)), g, this.generateNavButton("navNextMonth", new Date(d, f + 1, 1)), this.generateNavButton("navNextYear", new Date(d + 1, f, 1))];
    for (c = 0; c < a.length; c++) {
        this.container.insert(h.insert(a[c]))
    }
};
OANDA.Calendar.prototype.generateNavButton = function(c, b) {
    var a = new Element("a", {
        "class": "calendarNavButton " + c,
        dir: "ltr"
    });
    if (this.minDate) {
        if (b <= this.minDate) {
            if (this.date.getMonth() === this.minDate.getMonth() && this.date.getFullYear() === this.minDate.getFullYear()) {
                a.style.visibility = "hidden";
                a.style.cursor = "default"
            }
            b = this.minDate
        }
    }
    if (this.maxDate) {
        if (b >= this.maxDate) {
            if (this.date.getMonth() === this.maxDate.getMonth() && this.date.getFullYear() === this.maxDate.getFullYear()) {
                a.style.visibility = "hidden";
                a.style.cursor = "default"
            }
            b = this.maxDate
        }
    }
    a.observe("mousedown", function(d) {
        this.date = b;
        this.generateCalendar();
        Event.stop(d)
    }.bind(this));
    return a
};
OANDA.Calendar.prototype.generateWeek = function(d) {
    var b = new Element("tr");
    var c, a;
    for (c = d.getDay(); c > 0; c--) {
        a = this.generateDay(new Date(d.getFullYear(), d.getMonth(), d.getDate() - c)).addClassName("calendarPrevMonth");
        b.insert(a)
    }
    for (c = 0; c <= 6 - d.getDay(); c++) {
        a = this.generateDay(new Date(d.getFullYear(), d.getMonth(), d.getDate() + c));
        if (d.getDate() + c > this.daysInMonth(d.getMonth(), d.getFullYear())) {
            a.addClassName("calendarNextMonth")
        }
        b.insert(a)
    }
    return b
};
OANDA.Calendar.prototype.generateDay = function(d) {
    var b = new Element("td");
    var a = new Date();
    if (a.getTime() > this.maxDate.getTime()) {
        a = this.maxDate
    }
    if (a.getFullYear() == d.getFullYear() && a.getMonth() == d.getMonth() && a.getDate() == d.getDate()) {
        b.addClassName("calendarCurrentDay")
    } else {
        if (this.selectedDate.getFullYear() == d.getFullYear() && this.selectedDate.getMonth() == d.getMonth() && this.selectedDate.getDate() == d.getDate()) {
            b.addClassName("calendarSelectedDay")
        }
    }
    var c = this.isValidDate(d)["valid"];
    if (d.getDay() === 0 || d.getDay() == 6) {
        b.addClassName(c ? "calendarWeekend" : "calendarWeekendInvalid")
    } else {
        b.addClassName(c ? "calendarDay" : "calendarDayInvalid")
    }
    b.innerHTML = this.numberTranslator.format(d.getDate().toString());
    if (c) {
        b.observe("mousedown", this.selectDate.bind(this, d))
    }
    return b
};
OANDA.Calendar.prototype.isValidDate = function(a) {
    if (this.maxDate) {
        if (a > this.maxDate) {
            return {
                valid: false,
                date: this.maxDate
            }
        }
    }
    if (this.minDate) {
        if (a < this.minDate) {
            return {
                valid: false,
                date: this.minDate
            }
        }
    }
    return {
        valid: true,
        date: a
    }
};
OANDA.Calendar.prototype.selectDate = function(a) {
    this.date = a;
    this.destroyCalendar();
    this.parent.fire("oanda:calendar_" + this.container.id + ":selectDate", {
        date: a
    })
};
OANDA.Calendar.prototype.daysInMonth = function(c, b) {
    var a = this.date.getMonth();
    var d = this.date.getFullYear();
    if (arguments.length == 2) {
        a = c;
        d = b
    }
    return this.getDaysInMonth(a, d)
};
OANDA.Calendar.prototype.getDaysInMonth = function(b, a) {
    if (b < 0) {
        b += 12
    }
    return [31, ((!(a % 4) && ((a % 100) || !(a % 400))) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][b]
};
OANDA.Calendar.prototype.checkDestroy = function(a) {
    if (a.target != this.container && !Element.descendantOf(a.target, this.container.up())) {
        this.destroyCalendar()
    }
};
OANDA.Calendar.prototype.destroyCalendar = function() {
    if (this.container.ancestors().size() > 0) {
        this.parent.removeChild(this.container)
    }
    Event.stopObserving(document, "click", this.handler);
    Event.stopObserving(document, "oanda:closeCalendar_" + this.container.id);
    Event.stopObserving(document, "oanda:dateChangedCalendar_" + this.container.id)
};
// Combined /jslib/currency/converter/widget/DateHandler.js
(function(a) {
    a.namespace("ncc").DateHandler = function(b) {
        this.dateInputBox = b.dateInputBox;
        this.dateFormInput = b.dateFormInput;
        this.quoteDate = b.quoteDate;
        this.dateLeftArrow = b.dateLeftArrow;
        this.dateRightArrow = b.dateRightArrow;
        this.dateFormatter = b.dateFormatter;
        this.dateInputBox.setValue(this.formatDate(b.quoteDate));
        this.checkArrow()
    };
    a.ncc.DateHandler.prototype.getDate = function() {
        return this.quoteDate
    };
    a.ncc.DateHandler.prototype.setDate = function(b) {
        var c = this.dateFormatter.parse(b);
        if (!c) {
            return false
        }
        c = this.constrainDate(c);
        c.setHours(this.quoteDate.getHours());
        c.setMinutes(this.quoteDate.getMinutes());
        this.quoteDate = c;
        this.dateInputBox.setValue(this.formatDate(this.quoteDate));
        this.dateFormInput.setValue(this.quoteDate.getFullYear() + "-" + (this.quoteDate.getMonth() + 1) + "-" + this.quoteDate.getDate());
        this.checkArrow();
        return true
    };
    a.ncc.DateHandler.prototype.addDay = function() {
        var b = new Date();
        b = new Date(b.getUTCFullYear(), b.getUTCMonth(), b.getUTCDate());
        if (this.quoteDate < b) {
            this.quoteDate.setDate(this.quoteDate.getDate() + 1);
            this.dateInputBox.setValue(this.formatDate(this.quoteDate));
            this.dateFormInput.setValue(this.quoteDate.getFullYear() + "-" + (this.quoteDate.getMonth() + 1) + "-" + this.quoteDate.getDate());
            this.checkArrow();
            return true
        }
        return false
    };
    a.ncc.DateHandler.prototype.subtractDay = function() {
        var b = new Date(1990, 0, 2);
        if (this.quoteDate > b) {
            this.quoteDate.setDate(this.quoteDate.getDate() - 1);
            this.dateInputBox.setValue(this.formatDate(this.quoteDate));
            this.dateFormInput.setValue(this.quoteDate.getFullYear() + "-" + (this.quoteDate.getMonth() + 1) + "-" + this.quoteDate.getDate());
            this.checkArrow();
            return true
        }
        return false
    };
    a.ncc.DateHandler.prototype.checkArrow = function() {
        var b = new Date();
        b = new Date(b.getUTCFullYear(), b.getUTCMonth(), b.getUTCDate());
        if (this.quoteDate < b) {
            Element.removeClassName(this.dateRightArrow, "disabled")
        } else {
            Element.addClassName(this.dateRightArrow, "disabled")
        }
        var c = new Date(1990, 0, 2);
        if (this.quoteDate < c) {
            Element.addClassName(this.dateLeftArrow, "disabled")
        } else {
            Element.removeClassName(this.dateLeftArrow, "disabled")
        }
    };
    a.ncc.DateHandler.prototype.constrainDate = function(c) {
        var b = new Date();
        b = new Date(b.getUTCFullYear(), b.getUTCMonth(), b.getUTCDate());
        if (c > b) {
            return b
        }
        if (c < new Date(1990, 0, 1)) {
            return new Date(1990, 0, 1)
        }
        return c
    };
    a.ncc.DateHandler.prototype.formatDate = function(b) {
        return this.dateFormatter.format(b, this.dateFormatter.locale.getDayMonthYearFormatFull())
    }
})(jOanda);
// Combined /jslib/currency/converter/Elem.js
(function(a) {
    a.namespace("ncc").Elem = {
        insertElement: $("insertInto"),
        flipper: $("flipper"),
        preloader: $("preloader"),
        languageFormInput: $("form_language_hidden"),
        rate_selector: $("rate_selector"),
        rates: $("interbank_rate"),
        ratesInput: $("interbank_rates_input"),
        ratesFormInput: $("form_interbank_rates_hidden"),
        quoteCurrencySelector: $("quote_currency_selector"),
        quoteCurrency: $("quote_currency"),
        quoteCurrencyInput: $("quote_currency_input"),
        quoteCurrencyFormInput: $("form_quote_currency_hidden"),
        quoteCurrencyFlag: $("quote_currency_flag"),
        quoteCurrencyCode: $("quote_currency_code"),
        quoteAmountInput: $("quote_amount_input"),
        quoteAmountFormInput: $("form_quote_amount_input_hidden"),
        quoteAnnotation: $("quote_annotation"),
        quoteCurrencyImage: $("quote_currency_image"),
        baseCurrencySelector: $("base_currency_selector"),
        baseCurrency: $("base_currency"),
        baseCurrencyInput: $("base_currency_input"),
        baseCurrencyFormInput: $("form_base_currency_hidden"),
        baseCurrencyFlag: $("base_currency_flag"),
        baseCurrencyCode: $("base_currency_code"),
        baseAmountInput: $("base_amount_input"),
        baseAmountFormInput: $("form_base_amount_input_hidden"),
        baseAnnotation: $("base_annotation"),
        baseCurrencyImage: $("base_currency_image"),
        quoteDate: $("date_control"),
        quoteDateInput: $("end_date_input"),
        quoteDateFormInput: $("form_end_date_hidden"),
        quoteDateRewind: $("date_rewind"),
        quoteDateForward: $("date_forward"),
        dateAnnotation: $("date_annotation"),
        lastActionInput: $("form_last_action_hidden"),
        viewFormInput: $("form_view_hidden"),
        currencyChartCanvas: "currency_chart_canvas",
        chartSubtitle: "chartSubtitle",
        infoDetails: "infoDetails",
        atDateAndRate: "atDateAndRate",
        estimatedPrice: "estimatedPrice",
        buyMyCurrency: "buyMyCurrency",
        buyMyCurrencyCost: "buyMyCurrencyCost",
        sellMyCurrency: "sellMyCurrency",
        sellMyCurrencyGet: "sellMyCurrencyGet",
        bidAskSubtitle: "bidAskSubtitle",
        bidAskDate: "bidAskDate",
        bidAskTime: "bidAskTime",
        bidAskSell1: "bidAskSell1",
        bidAskBuy1: "bidAskBuy1",
        bidAskBidMin: "bidAskBidMin",
        bidAskBidAvg: "bidAskBidAvg",
        bidAskBidMax: "bidAskBidMax",
        bidAskAskMin: "bidAskAskMin",
        bidAskAskAvg: "bidAskAskAvg",
        bidAskAskMax: "bidAskAskMax",
        range30: "range30",
        range60: "range60",
        range90: "range90",
        calendarButton: $("end_date_button"),
        detailForm: $("ncc_detail_form"),
        widget: $("widget"),
        cheatsheet: "cheatsheet",
        ccExplanation: $("cc_explanation"),
        csExplanation: $("cs_explanation"),
        viewDetails: $("view_details"),
        viewCheatsheet: $("view_cheatsheet"),
        popupWarning: $("popup_blocked")
    }
})(jOanda);
// Combined /jslib/currency/converter/Model.js
(function(a) {
    a.namespace("ncc").Model = function(b) {
        this.updateUrl = b.updateUrl;
        this.view = b.view;
        this.numCalls = 0;
        this.reqId = 0;
        b.data.rate_data = this.verify(b.data.rate_data);
        b.data.chart_data = this.verify(b.data.chart_data);
        b.data.bid_ask_data = this.verify(b.data.bid_ask_data);
        this.data = b.data;
        this.htmlWidgets = b.htmlWidgets;
        this.locale = new OANDA.Locale(b.language);
        b.locale = this.locale;
        this.converterWidget = new a.ncc.ConverterWidget(b);
        this.dirty = true;
        if (this.view === "details") {
            this.viewWidget = new a.ncc.RateDetails({
                locale: this.locale
            })
        } else {
            if (this.view === "cheatsheet") {
                this.viewWidget = new a.ncc.Cheatsheet({
                    locale: this.locale
                })
            }
        }
        this.viewWidget.update({
            baseCurrency: this.converterWidget.baseCurrencyCombo.getValue(),
            quoteCurrency: this.converterWidget.quoteCurrencyCombo.getValue(),
            quoteDate: this.converterWidget.dateHandler.getDate(),
            data: this.data,
            rate: this.converterWidget.interbankRatesCombo.getValue(),
            rateDisplay: this.converterWidget.interbankRatesCombo.findDisplayValue(),
            baseAmount: a.ncc.Elem.baseAmountInput.getValue(),
            quoteAmount: a.ncc.Elem.quoteAmountInput.getValue()
        });
        this.viewWidget.redraw();
        document.observe("ncc:currencyUpdate", function() {
            if (this.view === "cheatsheet") {
                this.dirty = true
            }
        }.bind(this));
        document.observe("ncc:dateUpdate", function() {
            if (this.view === "cheatsheet") {
                this.dirty = true
            }
        }.bind(this));
        document.observe("ncc:changeView", this.changeView.bindAsEventListener(this));
        document.observe("ncc:ajax", function(c) {
            this.doAjax(this.updateWidget.bind(this), c.memo)
        }.bindAsEventListener(this))
    };
    a.ncc.Model.prototype.updateWidget = function() {
        this.viewWidget.update({
            baseCurrency: this.converterWidget.baseCurrencyCombo.getValue(),
            quoteCurrency: this.converterWidget.quoteCurrencyCombo.getValue(),
            quoteDate: this.converterWidget.dateHandler.getDate(),
            data: this.data,
            rate: this.converterWidget.interbankRatesCombo.getValue(),
            rateDisplay: this.converterWidget.interbankRatesCombo.findDisplayValue(),
            baseAmount: a.ncc.Elem.baseAmountInput.getValue(),
            quoteAmount: a.ncc.Elem.quoteAmountInput.getValue()
        });
        this.viewWidget.redraw()
    };
    a.ncc.Model.prototype.changeView = function(b) {
        if (this.view === b.memo.view) {
            return
        }
        this.view = b.memo.view;
        var c = function() {
            this.viewWidget.unload();
            this.viewWidget = null;
            a.ncc.Elem.viewFormInput.setValue(this.view);
            a.ncc.Elem.widget.update(this.htmlWidgets[this.view]);
            if (this.view === "details") {
                var d = function() {
                    this.viewWidget = new a.ncc.RateDetails({
                        locale: this.locale
                    });
                    this.updateWidget();
                    this.dirty = false
                }.bind(this);
                if (this.dirty) {
                    this.doAjax(d, "C")
                } else {
                    d()
                }
            } else {
                if (this.view === "cheatsheet") {
                    this.dirty = false;
                    this.viewWidget = new a.ncc.Cheatsheet({
                        locale: this.locale
                    });
                    this.updateWidget()
                }
            }
            if (typeof(Effect) !== "undefined") {
                Effect.Appear(a.ncc.Elem.widget, {
                    duration: 0.25,
                    afterFinish: function() {
                        this.redrawing = false
                    }.bind(this)
                })
            }
        }.bind(this);
        this.redrawing = true;
        if (typeof(Effect) === "undefined") {
            c()
        } else {
            Effect.Fade(a.ncc.Elem.widget, {
                duration: 0.25,
                to: 0.01,
                afterFinish: c
            })
        }
    };
    a.ncc.Model.prototype.doAjax = function(e, d) {
        a.ncc.Elem.preloader.show();
        this.reqId++;
        var b = window.location.protocol + "//" + window.location.host + this.updateUrl + "?";
        var c = this.getParameters();
        c.action = d;
        $H(c).each(function(f) {
            b += escape(f.key) + "=" + escape(f.value) + "&"
        });
        new Ajax.Request(b, {
            method: "get",
            onSuccess: function(g) {
                var f = g.responseText || "error";
                if (f == "error") {
                    return
                }
                f = this.verify(f);
                if (f.id < this.reqId) {
                    return
                }
                if (f.data.bid_ask_data) {
                    this.data.bid_ask_data = f.data.bid_ask_data
                }
                if (f.data.chart_data) {
                    this.data.chart_data = f.data.chart_data
                }
                if (f.data.rate_data) {
                    this.data.rate_data = f.data.rate_data
                }
                this.converterWidget.update(this.data);
                if (e !== undefined) {
                    e()
                }
                a.ncc.Elem.preloader.hide();
                this.numCalls++
            }.bind(this),
            onFailure: function() {}
        })
    };
    a.ncc.Model.prototype.getParameters = function() {
        return {
            base_currency_0: this.converterWidget.baseCurrencyCombo.getValue(),
            quote_currency: this.converterWidget.quoteCurrencyCombo.getValue(),
            end_date: a.ncc.Elem.quoteDateFormInput.getValue(),
            view: this.view,
            id: this.reqId
        }
    };
    a.ncc.Model.prototype.verify = function(b) {
        if (typeof(b) === "string") {
            return b.evalJSON()
        }
        return b
    }
})(jOanda);
// Combined /jslib/currency/converter/widget/ConverterWidget.js
(function(a) {
    a.namespace("ncc").ConverterWidget = function(c) {
        this.locale = c.locale;
        this.updateUrl = c.updateUrl;
        this.mruHandler = new a.ncc.MRUHandler({
            locale: this.locale,
            currencyList: c.currencies
        });
        this.interbankRatesCombo = new a.ncc.InterbankComboBuilder().create(c.rateItems, a.ncc.Elem.rates, a.ncc.Elem.ratesInput, a.ncc.Elem.ratesFormInput, this.locale, a.ncc.Elem.rate_selector);
        var b = this.mruHandler.setupMRU(c.currencies);
        this.quoteCurrencyCombo = new a.ncc.CurrencyComboBuilder({
            locale: this.locale
        }).create(b.quote, a.ncc.Elem.quoteCurrency, a.ncc.Elem.quoteCurrencyInput, a.ncc.Elem.quoteCurrencyFormInput, a.ncc.Elem.quoteCurrencyFlag, a.ncc.Elem.quoteCurrencyCode, a.ncc.Elem.quoteCurrencyImage, this.locale, a.ncc.Elem.quoteCurrencySelector);
        this.baseCurrencyCombo = new a.ncc.CurrencyComboBuilder({
            locale: this.locale
        }).create(b.base, a.ncc.Elem.baseCurrency, a.ncc.Elem.baseCurrencyInput, a.ncc.Elem.baseCurrencyFormInput, a.ncc.Elem.baseCurrencyFlag, a.ncc.Elem.baseCurrencyCode, a.ncc.Elem.baseCurrencyImage, this.locale, a.ncc.Elem.baseCurrencySelector);
        this.mruHandler.setCombos({
            baseCurrencyCombo: this.baseCurrencyCombo,
            quoteCurrencyCombo: this.quoteCurrencyCombo
        });
        this.quoteCurrencyCombo.setValue(c.quoteCurrency);
        this.baseCurrencyCombo.setValue(c.baseCurrency);
        this.annotater = new a.ncc.CurrencyAnnotater({
            baseAnnotation: a.ncc.Elem.baseAnnotation,
            quoteAnnotation: a.ncc.Elem.quoteAnnotation,
            dateAnnotation: a.ncc.Elem.dateAnnotation,
            baseCurrencyElement: a.ncc.Elem.baseCurrency,
            quoteCurrencyElement: a.ncc.Elem.quoteCurrency,
            dateElement: a.ncc.Elem.quoteDate,
            baseCurrencyCombo: this.baseCurrencyCombo,
            quoteCurrencyCombo: this.quoteCurrencyCombo,
            annotations: c.annotations
        });
        this.currencyFormatter = new OANDA.CurrencyFormatter(this.locale);
        this.dateFormatter = new OANDA.DateFormatter(this.locale);
        this.converter = new a.ncc.Converter({
            data: c.data.rate_data,
            baseAmountInput: a.ncc.Elem.baseAmountInput,
            quoteAmountInput: a.ncc.Elem.quoteAmountInput,
            baseCurrencyInput: a.ncc.Elem.baseCurrencyFormInput,
            quoteCurrencyInput: a.ncc.Elem.quoteCurrencyFormInput,
            rateInput: this.interbankRatesCombo,
            annotater: this.annotater,
            quoteDate: c.quoteDate,
            locale: this.locale
        });
        this.converter.recalculate();
        this.dateHandler = new a.ncc.DateHandler({
            dateInputBox: a.ncc.Elem.quoteDateInput,
            dateFormInput: a.ncc.Elem.quoteDateFormInput,
            quoteDate: c.quoteDate,
            dateLeftArrow: a.ncc.Elem.quoteDateRewind,
            dateRightArrow: a.ncc.Elem.quoteDateForward,
            dateFormatter: this.dateFormatter
        });
        this.registerEvents();
        this.formatElementValue(a.ncc.Elem.baseAmountInput, a.ncc.Elem.baseAmountFormInput);
        this.formatElementValue(a.ncc.Elem.quoteAmountInput, a.ncc.Elem.quoteAmountFormInput);
        a.ncc.Elem.quoteCurrencyInput.select()
    };
    a.ncc.ConverterWidget.prototype.formatElementValue = function(d, c) {
        var b = this.currencyFormatter.parse(d.getValue());
        d.setValue(this.currencyFormatter.formatNumber(b));
        if (c) {
            c.setValue(this.currencyFormatter.formatNumber(b))
        }
    };
    a.ncc.ConverterWidget.prototype.registerEvents = function() {
        a.ncc.Elem.baseAmountInput.observe("keyup", this.amountUpdate.bindAsEventListener(this, "base"));
        a.ncc.Elem.quoteAmountInput.observe("keyup", this.amountUpdate.bindAsEventListener(this, "quote"));
        a.ncc.Elem.baseAmountInput.observe("keydown", function(e) {
            if (e.keyCode == Event.KEY_RETURN) {
                Event.stop(e)
            }
        }.bindAsEventListener(this));
        a.ncc.Elem.quoteAmountInput.observe("keydown", function(e) {
            if (e.keyCode == Event.KEY_RETURN) {
                Event.stop(e)
            }
        }.bindAsEventListener(this));
        a.ncc.Elem.baseAmountInput.observe("focus", this.focusAmount.bindAsEventListener(this));
        a.ncc.Elem.quoteAmountInput.observe("focus", this.focusAmount.bindAsEventListener(this));
        a.ncc.Elem.baseAmountInput.observe("blur", this.blurAmount.bindAsEventListener(this));
        a.ncc.Elem.quoteAmountInput.observe("blur", this.blurAmount.bindAsEventListener(this));
        this.interbankRatesCombo.onChange = function() {
            this.ratesUpdate()
        }.bind(this);
        this.quoteCurrencyCombo.onChange = function() {
            this.currencyUpdate("quote")
        }.bind(this);
        a.ncc.Elem.quoteCurrencyInput.observe("htmlCombo:key_return", function() {
            a.ncc.Elem.baseCurrencyInput.select()
        });
        this.baseCurrencyCombo.onChange = function() {
            this.currencyUpdate("base")
        }.bind(this);
        a.ncc.Elem.baseCurrencyInput.observe("htmlCombo:key_return", function() {
            a.ncc.Elem.quoteAmountInput.select()
        });
        a.ncc.Elem.quoteDateRewind.observe("click", function() {
            if (!a.ncc.Elem.quoteDateRewind.hasClassName("left_disabled")) {
                if (this.dateHandler.subtractDay()) {
                    this.scheduleDateUpdate(500)
                }
            }
        }.bind(this));
        a.ncc.Elem.quoteDateForward.observe("click", function() {
            if (!a.ncc.Elem.quoteDateForward.hasClassName("right_disabled")) {
                if (this.dateHandler.addDay()) {
                    this.scheduleDateUpdate(500)
                }
            }
        }.bind(this));
        a.ncc.Elem.quoteDateInput.observe("keyup", function() {
            return false
        });
        a.ncc.Elem.quoteDateInput.observe("keydown", function(e) {
            if (e.keyCode == Event.KEY_RETURN) {
                a.ncc.Elem.quoteDateInput.blur();
                Event.stop(e)
            }
        }.bindAsEventListener(this));
        a.ncc.Elem.quoteDateInput.observe("mouseup", function(e) {
            Event.stop(e)
        }.bindAsEventListener(this));
        a.ncc.Elem.quoteDateInput.observe("focus", function() {
            var e = this.dateHandler.getDate();
            a.ncc.Elem.quoteDateInput.setValue(this.dateFormatter.format(e));
            a.ncc.Elem.quoteDateInput.select();
            document.fire("ncc:showCalendar")
        }.bind(this));
        a.ncc.Elem.quoteDateInput.observe("keydown", function(e) {
            if (e.keyCode === Event.KEY_TAB || e.keyCode === Event.KEY_RETURN) {
                document.fire("oanda:closeCalendar_")
            }
        }.bind(this));
        a.ncc.Elem.quoteDateInput.observe("blur", function(g) {
            var e = this.dateHandler.getDate();
            this.dateHandler.setDate(a.ncc.Elem.quoteDateInput.getValue());
            var f = this.dateHandler.getDate();
            a.ncc.Elem.quoteDateInput.setValue(this.dateFormatter.format(f, this.locale.getDayMonthYearFormatFull()));
            if (e.getTime() !== f.getTime()) {
                this.scheduleDateUpdate(1)
            }
        }.bind(this));
        var b = new Date();
        b = new Date(b.getUTCFullYear(), b.getUTCMonth(), b.getUTCDate());
        var c = a.ncc.Elem.calendarButton.up();
        var d = c.getWidth() / 2 - 160 / 2;
        a.ncc.Elem.calendarButton.observe("click", function() {
            document.fire("ncc:showCalendar")
        });
        document.observe("ncc:showCalendar", function() {
            var e = this.dateHandler.getDate();
            var f = c.getHeight() + 5;
            new OANDA.Calendar({
                locale: this.locale,
                date: e,
                minDate: new Date(1990, 0, 1),
                maxDate: new Date(b.getFullYear(), b.getMonth(), b.getDate()),
                parent: c,
                left: d,
                top: f,
                showToday: true
            })
        }.bind(this));
        c.observe("oanda:calendar_:selectDate", function(e) {
            if (this.dateHandler.setDate(this.dateFormatter.format(e.memo.date))) {
                this.dateUpdate()
            }
        }.bind(this));
        a.ncc.Elem.flipper.observe("click", this.flipCurrencies.bindAsEventListener(this));
        a.ncc.Elem.flipper.observe("mouseover", Element.addClassName.bind(this, a.ncc.Elem.flipper, "flipper_arrows_highlight"));
        a.ncc.Elem.flipper.observe("mouseout", Element.removeClassName.bind(this, a.ncc.Elem.flipper, "flipper_arrows_highlight"))
    };
    a.ncc.ConverterWidget.prototype.focusAmount = function(b) {
        if (b.target == a.ncc.Elem.baseAmountInput) {
            Element.addClassName(a.ncc.Elem.baseAmountInput, "focus")
        } else {
            Element.addClassName(a.ncc.Elem.quoteAmountInput, "focus")
        }
    };
    a.ncc.ConverterWidget.prototype.blurAmount = function(b) {
        if (b.target == a.ncc.Elem.baseAmountInput) {
            Element.removeClassName(a.ncc.Elem.baseAmountInput, "focus");
            this.formatElementValue(a.ncc.Elem.baseAmountInput, a.ncc.Elem.baseAmountFormInput)
        } else {
            Element.removeClassName(a.ncc.Elem.quoteAmountInput, "focus");
            this.formatElementValue(a.ncc.Elem.quoteAmountInput, a.ncc.Elem.quoteAmountFormInput)
        }
    };
    a.ncc.ConverterWidget.prototype.ratesUpdate = function() {
        this.converter.recalculate();
        document.fire("ncc:rateUpdate", {
            baseAmount: a.ncc.Elem.baseAmountInput.getValue(),
            quoteAmount: a.ncc.Elem.quoteAmountInput.getValue(),
            rate: this.interbankRatesCombo.getValue(),
            rateDisplay: this.interbankRatesCombo.findDisplayValue()
        })
    };
    a.ncc.ConverterWidget.prototype.currencyUpdate = function(b) {
        this.annotater.recheck(b);
        window.setTimeout(this.mruHandler.updateMRU.bind(this.mruHandler), 1, b);
        document.fire("ncc:currencyUpdate", {
            base: this.baseCurrencyCombo.getValue(),
            quote: this.quoteCurrencyCombo.getValue()
        });
        document.fire("ncc:ajax", "C")
    };
    a.ncc.ConverterWidget.prototype.amountUpdate = function(c, d) {
        var b = {
            SHIFT: 16,
            CAPSLOCK: 20,
            CTRL: 17,
            ALT: 18,
            BREAK: 19,
            NUMLOCK: 144,
            SCRLOCK: 145,
            LWIN: 91,
            RWIN: 92,
            SEL: 93,
            F1: 112,
            F2: 113,
            F3: 114,
            F4: 115,
            F5: 116,
            F6: 117,
            F7: 118,
            F8: 119,
            F9: 120,
            F10: 121,
            F11: 122,
            F12: 123
        };
        switch (c.keyCode) {
            case Event.KEY_TAB:
            case Event.KEY_ESC:
            case Event.KEY_UP:
            case Event.KEY_DOWN:
            case Event.KEY_RETURN:
            case Event.KEY_HOME:
            case Event.KEY_END:
            case Event.KEY_LEFT:
            case Event.KEY_RIGHT:
            case Event.KEY_PAGEUP:
            case Event.KEY_PAGEDOWN:
            case Event.KEY_INSERT:
            case b.SHIFT:
            case b.CAPSLOCK:
            case b.NUMLOCK:
            case b.SCRLOCK:
            case b.CTRL:
            case b.ALT:
            case b.BREAK:
            case b.LWIN:
            case b.RWIN:
            case b.SEL:
            case b.F1:
            case b.F2:
            case b.F3:
            case b.F4:
            case b.F5:
            case b.F6:
            case b.F7:
            case b.F8:
            case b.F9:
            case b.F10:
            case b.F11:
            case b.F12:
                break;
            default:
                this.converter.recalculate(d);
                document.fire("ncc:amountUpdate", {
                    baseAmount: a.ncc.Elem.baseAmountInput.getValue(),
                    quoteAmount: a.ncc.Elem.quoteAmountInput.getValue()
                });
                break
        }
    };
    a.ncc.ConverterWidget.prototype.scheduleDateUpdate = function(b) {
        if (this.pendingUpdate) {
            window.clearTimeout(this.pendingUpdate)
        }
        this.pendingUpdate = window.setTimeout(this.dateUpdate.bind(this), b)
    };
    a.ncc.ConverterWidget.prototype.dateUpdate = function() {
        document.fire("ncc:dateUpdate", a.ncc.Elem.quoteDateFormInput.getValue());
        document.fire("oanda:dateChangedCalendar_", this.dateHandler.getDate());
        document.fire("ncc:ajax", "D")
    };
    a.ncc.ConverterWidget.prototype.flipCurrencies = function() {
        var c = this.baseCurrencyCombo.getValue();
        var b = this.quoteCurrencyCombo.getValue();
        this.baseCurrencyCombo.setValue(b);
        this.quoteCurrencyCombo.setValue(c);
        this.currencyUpdate()
    };
    a.ncc.ConverterWidget.prototype.update = function(b) {
        this.converter.setCurrencyData(b.rate_data, this.dateHandler.getDate())
    }
})(jOanda);
// Combined /jslib/currency/converter/Print.js
(function(a) {
    a.namespace("ncc").Print = function(e) {
        var i = a.ncc.Elem.baseCurrencyFormInput.getValue();
        var l = a.ncc.Elem.baseAmountInput.getValue();
        var d = a.ncc.Elem.quoteCurrencyFormInput.getValue();
        var c = a.ncc.Elem.quoteAmountInput.getValue();
        var g = a.ncc.Elem.ratesFormInput.getValue();
        var f = a.ncc.Elem.quoteDateFormInput.getValue();
        var k = a.ncc.Elem.viewFormInput.getValue();
        var b = ["?printing=1", "&base_currency=", i, "&base_amount=", l, "&quote_currency=", d, "&quote_amount=", c, "&end_date=", f, "&rate=", g, "&view=", k].join("");
        var j = window.open(window.location.pathname + b, "PrintFriendly", "width=800, location=0, scrollbars=1, resizable=1");
        var h = navigator.userAgent.toLowerCase().indexOf("chrome") > -1;
        if (h) {
            j.parent.blur();
            j.focus()
        }
        return false
    }
})(jOanda);
// Combined /jslib/currency/converter/HccLink.js
(function(a) {
    a.namespace("ncc").HccLink = function(j) {
        var i = a.ncc.Elem.baseCurrencyFormInput.getValue();
        var f = a.ncc.Elem.quoteCurrencyFormInput.getValue();
        var g;
        var e = $(a.ncc.Elem.range30).checked;
        var d = $(a.ncc.Elem.range60).checked;
        var c = $(a.ncc.Elem.range90).checked;
        if (e) {
            g = $(a.ncc.Elem.range30).value
        } else {
            if (d) {
                g = $(a.ncc.Elem.range60).value
            } else {
                if (c) {
                    g = $(a.ncc.Elem.range90).value
                }
            }
        }
        var h = j.dataset.url || j.getAttribute("data-url");
        var b = ["?view=graph", "&base=", f, "&quote=", i, "&duration=", g].join("");
        window.open(h + b, "_blank");
        return false
    }
})(jOanda);
// Combined /jslib/currency/converter/tabs/Cheatsheet.js
(function(a) {
    a.namespace("ncc").Cheatsheet = function(b) {
        this.locale = b.locale;
        this.quoteCurrencyFormatter = new OANDA.CurrencyFormatter(this.locale);
        this.quoteCurrencyFormatter.DEFAULT_DECIMALS = 0;
        this.quoteCurrencyFormatter.roundingExceptions = {
            ZWD: 0,
            JPY: 0
        };
        this.baseCurrencyFormatter = new OANDA.CurrencyFormatter(this.locale);
        this.baseCurrencyFormatter.DEFAULT_DECIMALS = 2;
        this.baseCurrencyFormatter.roundingExceptions = {
            ZWD: 0,
            JPY: 0
        };
        this.dateFormatter = new OANDA.DateFormatter(this.locale);
        this.boundRateUpdate = this._rateUpdate.bindAsEventListener(this);
        this.boundCurrencyUpdate = this._currencyUpdate.bindAsEventListener(this);
        document.observe("ncc:rateUpdate", this.boundRateUpdate);
        document.observe("ncc:currencyUpdate", this.boundCurrencyUpdate);
        if (a.ncc.Elem.csExplanation) {
            a.ncc.Elem.ccExplanation.hide();
            a.ncc.Elem.csExplanation.show()
        }
    };
    a.ncc.Cheatsheet.prototype.unload = function() {
        document.stopObserving("ncc:rateUpdate", this.boundRateUpdate);
        document.stopObserving("ncc:currencyUpdate", this.boundCurrencyUpdate)
    };
    a.ncc.Cheatsheet.prototype.update = function(b) {
        this.baseCurrency = b.baseCurrency;
        this.quoteCurrency = b.quoteCurrency;
        this.rate = b.rate;
        this.rateDisplay = b.rateDisplay;
        if (this.rateDisplay.substring(0, 1) !== "+") {
            this.rateDisplay = "+/- " + this.rateDisplay
        }
        if (this.locale.getLanguage() === "en") {
            this.rateDisplay = "Interbank Rate " + this.rateDisplay
        }
        this.quoteDate = b.quoteDate;
        if (b.data.rate_data) {
            this.currencyConverter = new PairFactory(b.data.rate_data)
        }
    };
    a.ncc.Cheatsheet.prototype._rateUpdate = function(b) {
        this.rate = b.memo.rate;
        this.rateDisplay = b.memo.rateDisplay;
        if (this.rateDisplay.substring(0, 1) !== "+") {
            this.rateDisplay = "+/- " + this.rateDisplay
        }
        if (this.locale.getLanguage() === "en") {
            this.rateDisplay = "Interbank Rate " + this.rateDisplay
        }
        this.redraw()
    };
    a.ncc.Cheatsheet.prototype._currencyUpdate = function(b) {
        this.baseCurrency = b.memo.base;
        this.quoteCurrency = b.memo.quote
    };
    a.ncc.Cheatsheet.prototype.redraw = function() {
        var c = this._computeDenominations(this.quoteCurrency, this.baseCurrency);
        var g = c.left;
        var b = c.right;
        if (g[0] >= 100000 || b[0] >= 100000) {
            this.textClass = "smallest"
        } else {
            if (g[0] >= 1000 || b[0] >= 1000) {
                this.textClass = "small"
            } else {
                this.textClass = "normal"
            }
        }
        var f = this._renderTable(g, "ccleft", this.baseCurrency, this.quoteCurrency);
        var e = this._createSpacer();
        var d = this._renderTable(b, "ccright", this.quoteCurrency, this.baseCurrency);
        $(a.ncc.Elem.cheatsheet).update(f);
        $(a.ncc.Elem.cheatsheet).appendChild(e);
        $(a.ncc.Elem.cheatsheet).appendChild(d)
    };
    a.ncc.Cheatsheet.prototype._computeDenominations = function(j, b) {
        var e = [1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 100, 250, 500, 1000];
        var c = e.slice();
        var d = this.currencyConverter.createPair(j + "/" + b).setDirection("LONG");
        var g = d.convert(j, 1);
        var k = 0,
            h = 0;
        if (g > 10) {
            h = Math.floor(Math.log(g) / Math.LN10)
        }
        if (g < 0.1) {
            k = Math.floor(Math.log(1 / g) / Math.LN10)
        }
        if (k > 0) {
            for (var f = 0; f < e.length; f++) {
                e[f] *= Math.pow(10, k)
            }
        }
        if (h > 0) {
            for (var f = 0; f < c.length; f++) {
                c[f] *= Math.pow(10, h)
            }
        }
        return {
            left: e,
            right: c
        }
    };
    a.ncc.Cheatsheet.prototype._renderTable = function(f, g, i, d) {
        var j = document.createElement("table");
        j.className = g;
        this._renderTableHeader(j, i, d);
        this._renderCurrencyHeaders(j, i, d);
        var e = this.currencyConverter.createPair(i + "/" + d);
        e = e.setDirection("LONG");
        for (var b = 0; b < 6; b++) {
            var k = j.insertRow(j.rows.length);
            k.className = b % 2 == 0 ? "even" : "odd";
            for (var h = 0; h < 3; h++) {
                this._renderEntry(k, h, g, e, f[b + h * 6], i, d)
            }
        }
        return j
    };
    a.ncc.Cheatsheet.prototype._renderEntry = function(l, e, i, g, h, j, f) {
        var c = document.createElement("td");
        if (e != 0) {
            c.className = "source sborder " + this.textClass
        } else {
            c.className = "source " + this.textClass
        }
        c.innerHTML = this.quoteCurrencyFormatter.roundCurrency(h, f).replace(/ /g, "&nbsp;");
        var b = document.createElement("td");
        b.className = "equals";
        b.appendChild(this._createArrow());
        var k = document.createElement("td");
        if (e != 2) {
            k.className = "target tborder " + this.textClass
        } else {
            k.className = "target " + this.textClass
        }
        if (i === "left") {
            h = h * (1 - this.rate / 100)
        } else {
            h = h / (1 - this.rate / 100)
        }
        var d = g.convert(f, h);
        k.innerHTML = this.baseCurrencyFormatter.roundCurrency(d, j).replace(/ /g, "&nbsp;");
        l.appendChild(c);
        l.appendChild(b);
        l.appendChild(k)
    };
    a.ncc.Cheatsheet.prototype._renderTableHeader = function(g, e, c) {
        var d = g.insertRow(g.rows.length);
        d.className = "top";
        var b = d.insertCell(0);
        b.colSpan = 9;
        b.className = "tableHeader";
        var f = ['<div style="width: 100%">', '<span class="subheader">', this.locale.localize("curToCur", [c, e]), "</span>", this._createLogo(), '<br class="clear"/></div><span class="text">', this.rateDisplay, "<br/>", this.dateFormatter.format(this.quoteDate, this.locale.getDayMonthYearFormatFull())];
        b.innerHTML = f.join("")
    };
    a.ncc.Cheatsheet.prototype._renderCurrencyHeaders = function(h, g, c) {
        var f = h.insertRow(h.rows.length);
        f.className = "header";
        for (var e = 0; e < 3; e++) {
            var b = f.insertCell(e * 3);
            b.innerHTML = c;
            b.className = "header_source";
            f.insertCell(e * 3 + 1);
            var d = f.insertCell(e * 3 + 2);
            d.innerHTML = g;
            d.className = "header_target"
        }
    };
    a.ncc.Cheatsheet.prototype._createLogo = function() {
        return '<div class="logo logo_bg"></div>'
    };
    a.ncc.Cheatsheet.prototype._createSpacer = function() {
        var b = document.createElement("div");
        b.className = "spacer spacer_bg";
        return b
    };
    a.ncc.Cheatsheet.prototype._createArrow = function() {
        var b = document.createElement("img");
        b.height = 7;
        b.width = 4;
        b.src = "/wandacache/1x1.gif";
        b.className = "arrow";
        return b
    }
})(jOanda);
// Combined /jslib/currency/converter/tabs/ratedetails/CurrencyChart.js
(function(a) {
    a.namespace("ncc").CurrencyChart = function(b) {
        this.elements = b.elements;
        this.locale = b.locale;
        this.currencyFormatter = new OANDA.CurrencyFormatter(this.locale);
        this.currencyFormatter.DEFAULT_DECIMALS = 4;
        this.dateFormatter = new OANDA.DateFormatter(this.locale);
        b.options = b.options || {};
        this.options = {};
        this.options.numXTicks = 3;
        this.options.numYTicks = 5;
        this.options.lineColor = b.lineColor || "#b1cd48";
        this.options.selectColor = "#fd9a00";
        this.options.useOverlay = true;
        this.options.useCrosshair = !b.noCrosshair;
        this.boundClickRange = function(c) {
            document.fire("ncc:rangeUpdate", c)
        };
        if (this.elements.range30) {
            if (this.elements.range60.checked) {
                this.range = 60
            } else {
                if (this.elements.range90.checked) {
                    this.range = 89
                } else {
                    this.range = 30
                }
            }
            this.elements.range30.observe("click", this.boundClickRange.bind(this, 30));
            this.elements.range60.observe("click", this.boundClickRange.bind(this, 60));
            this.elements.range90.observe("click", this.boundClickRange.bind(this, 89))
        } else {
            this.range = 89
        }
        this.boundRangeUpdate = function(c) {
            this.range = c.memo;
            this.redraw()
        }.bindAsEventListener(this);
        document.observe("ncc:rangeUpdate", this.boundRangeUpdate);
        document.observe("flotr:aftergrid", this.drawExtraGrid);
        document.observe("flotr:hit", function(d) {
            var e = d.memo[0],
                c = d.memo[1];
            c.mouseTrack.style.cssText = ""
        });
        document.observe("ncc:disableChartInteraction", this.disableInteraction.bind(this));
        Flotr.Graph.prototype.clearHit = function() {
            this.octx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
        };
        Flotr.Graph.prototype.drawCrosshair = function(h) {
            var f = this.octx,
                e = this.options,
                d = this.plotOffset,
                c = d.left + h.relX + 0.5,
                g = d.top + h.relY + 0.5;
            this.lastMousePos.relX = null;
            this.lastMousePos.relY = null;
            if (h.relX < 0 || h.relX > this.plotWidth) {
                return
            }
            if (e.crosshair.hideCursor) {
                this.el.style.cursor = Prototype.Browser.Gecko ? "none" : "url(blank.cur),crosshair";
                this.el.addClassName("flotr-crosshair")
            }
            f.save();
            f.strokeStyle = e.crosshair.color;
            f.lineWidth = 1;
            f.beginPath();
            if (e.crosshair.mode.indexOf("x") != -1) {
                f.moveTo(c, d.top);
                f.lineTo(c, d.top + this.plotHeight);
                this.lastMousePos.relX = c
            }
            if (e.crosshair.mode.indexOf("y") != -1) {
                f.moveTo(d.left, g);
                f.lineTo(d.left + this.plotWidth, g);
                this.lastMousePos.relY = g
            }
            f.stroke();
            f.restore()
        };
        Flotr.Graph.prototype.hit = function(u) {
            var r = this.series,
                g = this.options,
                I = this.prevHit,
                t = this.plotOffset,
                k = this.octx,
                K, M, c, D, q, o, J, e, z, v, H, C = {
                    dist: Number.MAX_VALUE,
                    x: null,
                    y: null,
                    relX: u.relX,
                    relY: u.relY,
                    absX: u.absX,
                    absY: u.absY,
                    mouse: null,
                    xaxis: null,
                    yaxis: null,
                    series: null,
                    index: null,
                    seriesIndex: null
                };
            for (H = 0; H < r.length; H++) {
                w = r[H];
                if (!w.mouse.track) {
                    continue
                }
                K = w.data;
                J = w.xaxis;
                e = w.yaxis;
                M = 2 * g.points.lineWidth * w.mouse.sensibility;
                c = M / J.scale;
                D = M / e.scale;
                z = J.p2d(u.relX);
                v = e.p2d(u.relY);
                for (var G = 0, d, h; G < K.length; G++) {
                    q = K[G][0];
                    o = K[G][1];
                    if (o === null || J.min > q || J.max < q || e.min > o || e.max < o) {
                        continue
                    }
                    var f = Math.abs(q - z);
                    if (f < C.dist) {
                        C.dist = f;
                        C.x = q;
                        C.y = o;
                        C.xaxis = J;
                        C.yaxis = e;
                        C.mouse = w.mouse;
                        C.series = w;
                        C.allSeries = r;
                        C.index = 91 - K.length + G;
                        C.seriesIndex = H
                    }
                }
            }
            if (C.series && (C.mouse && C.mouse.track && !I || (I))) {
                var B = this.mouseTrack,
                    l = "",
                    w = C.series,
                    A = C.mouse.position,
                    E = C.mouse.margin,
                    F = "opacity:0.7;background-color:#000;color:#fff;display:none;position:absolute;padding:2px 8px;-moz-border-radius:4px;border-radius:4px;white-space:nowrap;";
                if (!C.mouse.relative) {
                    if (A.charAt(0) == "n") {
                        l += "top:" + (E + t.top) + "px;bottom:auto;"
                    } else {
                        if (A.charAt(0) == "s") {
                            l += "bottom:" + (E + t.bottom) + "px;top:auto;"
                        }
                    }
                    if (A.charAt(1) == "e") {
                        l += "right:" + (E + t.right) + "px;left:auto;"
                    } else {
                        if (A.charAt(1) == "w") {
                            l += "left:" + (E + t.left) + "px;right:auto;"
                        }
                    }
                } else {
                    if (!w.bars.show) {
                        if (A.charAt(0) == "n") {
                            l += "bottom:" + (E - t.top - C.yaxis.d2p(C.y) + this.canvasHeight) + "px;top:auto;"
                        } else {
                            if (A.charAt(0) == "s") {
                                l += "top:" + (E + t.top + C.yaxis.d2p(C.y)) + "px;bottom:auto;"
                            }
                        }
                        if (A.charAt(1) == "e") {
                            l += "left:" + (E + t.left + C.xaxis.d2p(C.x)) + "px;right:auto;"
                        } else {
                            if (A.charAt(1) == "w") {
                                l += "right:" + (E - t.left - C.xaxis.d2p(C.x) + this.canvasWidth) + "px;left:auto;"
                            }
                        }
                    } else {
                        l += "bottom:" + (E - t.top - C.yaxis.d2p(C.y / 2) + this.canvasHeight) + "px;top:auto;";
                        l += "left:" + (E + t.left + C.xaxis.d2p(C.x - g.bars.barWidth / 2)) + "px;right:auto;"
                    }
                }
                F += l;
                if (!B) {
                    this.el.insert('<div class="flotr-mouse-value" style="' + F + '"></div>');
                    B = this.mouseTrack = this.el.select(".flotr-mouse-value")[0]
                } else {
                    B.style.cssText = F;
                    this.mouseTrack = B
                }
                if (C.x !== null && C.y !== null) {
                    B.show();
                    this.clearHit();
                    this.drawHit(C);
                    var L = C.mouse.trackDecimals;
                    if (L == null || L < 0) {
                        L = 0
                    }
                    B.innerHTML = C.mouse.trackFormatter({
                        x: C.x.toFixed(L),
                        y: C.y.toFixed(L),
                        series: C.series,
                        index: C.index,
                        nearest: C
                    });
                    B.fire("flotr:hit", [C, this])
                } else {
                    if (I) {
                        B.hide();
                        this.clearHit()
                    }
                }
            } else {
                if (this.prevHit) {
                    this.mouseTrack.hide();
                    this.clearHit()
                }
            }
        }
    };
    a.ncc.CurrencyChart.prototype.disableInteraction = function() {
        this.flotr.overlay.stopObserving()
    };
    a.ncc.CurrencyChart.prototype.drawExtraGrid = function(h) {
        var g = h.memo[3];
        var d, k = g.options,
            c = g.ctx,
            b;
        c.save();
        c.lineWidth = 1;
        c.strokeStyle = "#CCCCCC";
        c.translate(g.plotOffset.left, g.plotOffset.top);
        c.beginPath();
        if (k.grid.horizontalLines) {
            b = h.memo[1];
            for (var e = 1; e < b.ticks.length - 1; ++e) {
                d = b.ticks[e].v;
                c.moveTo(-7, Math.floor(b.d2p(d)) + c.lineWidth / 2);
                c.lineTo(0, Math.floor(b.d2p(d)) + c.lineWidth / 2)
            }
        }
        if (k.grid.verticalLines) {
            b = h.memo[0];
            for (var f = 1; f < b.ticks.length - 1; ++f) {
                d = b.ticks[f].v;
                c.moveTo(Math.floor(b.d2p(d)) + c.lineWidth / 2, g.plotHeight + 1);
                c.lineTo(Math.floor(b.d2p(d)) + c.lineWidth / 2, g.plotHeight + 8)
            }
        }
        c.stroke();
        c.lineWidth = 2;
        c.beginPath();
        c.moveTo(0, 0);
        c.lineTo(0, g.plotHeight + 7);
        c.moveTo(-7, g.plotHeight);
        c.lineTo(g.plotWidth + 1, g.plotHeight);
        c.moveTo(-7, 0);
        c.lineTo(g.plotWidth + 1, 0);
        c.moveTo(g.plotWidth, 0);
        c.lineTo(g.plotWidth, g.plotHeight + 7);
        c.stroke();
        c.restore()
    };
    a.ncc.CurrencyChart.prototype.update = function(b) {
        this.baseCurrency = b.baseCurrency || this.baseCurrency;
        this.quoteCurrency = b.quoteCurrency || this.quoteCurrency;
        this.data = (b.data && b.data.chart_data) || this.data
    };
    a.ncc.CurrencyChart.prototype.redraw = function() {
        this.elements.subtitle.update(this.locale.localize("chartSubtitle", [this.quoteCurrency + "/" + this.baseCurrency]));
        this._generatePoints();
        this.flotr = window.Flotr.draw(this.elements.canvas, this.points, this.chartOptions)
    };
    a.ncc.CurrencyChart.prototype.unload = function() {
        this.flotr.overlay.stopObserving();
        document.stopObserving("ncc:rangeUpdate", this.boundRangeUpdate);
        this.elements.range30.stopObserving("click", this.boundClickRange);
        this.elements.range60.stopObserving("click", this.boundClickRange);
        this.elements.range90.stopObserving("click", this.boundClickRange);
        document.stopObserving("flotr:aftergrid");
        document.stopObserving("flotr:hit")
    };
    a.ncc.CurrencyChart.prototype._getMaxRange = function() {
        return Math.min(this.range, this.data.length)
    };
    a.ncc.CurrencyChart.prototype._generatePoints = function() {
        var g = Math.round(this._getMaxRange() / (this.options.numXTicks));
        var c = [];
        this.options.xTicks = [];
        var j = this.data.length - this._getMaxRange() - 1;
        var k = 0;
        var l = Number.MAX_VALUE;
        var e = 0;
        for (var h = j; h < this.data.length; h++) {
            if (k % g === 0) {
                this._addXTick(k, h)
            }
            var b = this.data[h][3];
            c[k] = [k, b];
            k++;
            if (b > e) {
                e = b
            }
            if (b < l) {
                l = b
            }
        }
        var d = (e - l) / (this.options.numYTicks - 1);
        this.options.yTicks = [];
        for (var f = 0; f < this.options.numYTicks; f++) {
            this._addYTick(l + f * d)
        }
        this.points = [{
            label: "",
            color: this.options.lineColor,
            xaxis: 1,
            yaxis: 1,
            data: c
        }];
        this.chartOptions = {
            xaxis: {
                ticks: this.options.xTicks
            },
            yaxis: {
                min: l,
                max: e,
                ticks: this.options.yTicks
            },
            defaultType: "lines",
            subtitle: null,
            lines: {
                show: true,
                fill: false,
                fillOpacity: "1",
                lineWidth: 3
            },
            grid: {
                tickColor: "#dcdcdc",
                labelMargin: 10,
                outlineWidth: 0,
                horizontalLines: true,
                verticalLines: true
            },
            mouse: {
                track: true,
                lineColor: this.options.selectColor,
                fillColor: this.options.selectColor,
                fillOpacity: 1,
                radius: 4,
                sensibility: 100,
                trackFormatter: function(m) {
                    var i = ['<span class="date">', this._getDateYearString(this.data.length - this._getMaxRange() - 2 + Math.round(m.x)).escapeHTML(), ': </span><span class="amount">', this.currencyFormatter.roundCurrency(this.data[m.index][3], this.baseCurrency).escapeHTML(), "</span>"].join("");
                    return i
                }.bind(this)
            },
            crosshair: {
                mode: this.options.useCrosshair ? "x" : "",
                hideCursor: false,
                color: this.options.selectColor
            },
            shadowSize: 0
        }
    };
    a.ncc.CurrencyChart.prototype._addXTick = function(b, c) {
        this.options.xTicks[this.options.xTicks.length] = [b, this._getDateString(c)]
    };
    a.ncc.CurrencyChart.prototype._addYTick = function(c) {
        var b = this.currencyFormatter.roundCurrency(c, this.baseCurrency);
        this.options.yTicks[this.options.yTicks.length] = [c, b]
    };
    a.ncc.CurrencyChart.prototype._getDateString = function(c) {
        var d = this.data[c][1];
        var b = this.data[c][2];
        return this.dateFormatter.format(new Date(2000, d, b), this.locale.getDayMonthFormat()).replace(" ", " <br/>")
    };
    a.ncc.CurrencyChart.prototype._getDateYearString = function(c) {
        var d = this.data[c][0];
        var e = this.data[c][1];
        var b = this.data[c][2];
        return this.dateFormatter.format(new Date(d, e, b), this.locale.getDayMonthYearFormatFull())
    }
})(jOanda);
// Combined /jslib/currency/converter/tabs/ratedetails/BidAskTable.js
(function(a) {
    a.namespace("ncc").BidAskTable = function(b) {
        this.elements = b.elements;
        this.locale = b.locale;
        this.currencyFormatter = new OANDA.CurrencyFormatter(this.locale);
        this.dateFormatter = new OANDA.DateFormatter(this.locale)
    };
    a.ncc.BidAskTable.prototype.update = function(b) {
        this.baseCurrency = b.baseCurrency || this.baseCurrency;
        this.quoteCurrency = b.quoteCurrency || this.quoteCurrency;
        this.quoteDate = b.quoteDate || this.quoteDate;
        this.data = (b.data && b.data.bid_ask_data) || this.data
    };
    a.ncc.BidAskTable.prototype.unload = function() {};
    a.ncc.BidAskTable.prototype.redraw = function() {
        var d = this.elements;
        var b = this.locale;
        var g = this.data;
        d.subtitle.update(b.localize("bidAskSubtitle", [this.quoteCurrency + "/" + this.baseCurrency]));
        var e = new Date(this.quoteDate);
        e.setDate(e.getDate() - 1);
        var c = this.dateFormatter.format(e, b.getDateFormatFull());
        var f = this.dateFormatter.format(e, b.getTimeFormatFull());
        d.date.update(c.escapeHTML());
        d.time.update(f.escapeHTML());
        d.sellOne.update(b.localize("bidAskSell1", [this.quoteCurrency.escapeHTML()], true));
        d.buyOne.update(b.localize("bidAskBuy1", [this.quoteCurrency.escapeHTML()], true));
        if (g.min_bid !== 0) {
            d.bidMin.update(this.currencyFormatter.roundCurrency(g.min_bid, this.baseCurrency).escapeHTML())
        } else {
            d.bidMin.update("-")
        }
        if (g.bid !== 0) {
            d.bidAvg.update(this.currencyFormatter.roundCurrency(g.bid, this.baseCurrency).escapeHTML())
        } else {
            d.bidAvg.update("-")
        }
        if (g.max_bid !== 0) {
            d.bidMax.update(this.currencyFormatter.roundCurrency(g.max_bid, this.baseCurrency).escapeHTML())
        } else {
            d.bidMax.update("-")
        }
        if (g.min_ask !== 0) {
            d.askMin.update(this.currencyFormatter.roundCurrency(g.min_ask, this.baseCurrency).escapeHTML())
        } else {
            d.askMin.update("-")
        }
        if (g.ask !== 0) {
            d.askAvg.update(this.currencyFormatter.roundCurrency(g.ask, this.baseCurrency).escapeHTML())
        } else {
            d.askAvg.update("-")
        }
        if (g.max_ask !== 0) {
            d.askMax.update(this.currencyFormatter.roundCurrency(g.max_ask, this.baseCurrency).escapeHTML())
        } else {
            d.askMax.update("-")
        }
    }
})(jOanda);
// Combined /jslib/currency/converter/tabs/ratedetails/InfoPane.js
(function(a) {
    a.namespace("ncc").InfoPane = function(b) {
        this.elements = b.elements;
        this.locale = b.locale;
        this.dateFormatter = new OANDA.DateFormatter(this.locale);
        this.currencyFormatter = new OANDA.CurrencyFormatter(this.locale);
        document.observe("ncc:amountUpdate", this._amountUpdate.bindAsEventListener(this));
        document.observe("ncc:rateUpdate", this._rateUpdate.bindAsEventListener(this))
    };
    a.ncc.InfoPane.prototype.update = function(b) {
        this.baseCurrency = b.baseCurrency || this.baseCurrency;
        this.quoteCurrency = b.quoteCurrency || this.quoteCurrency;
        this.quoteDate = b.quoteDate || this.quoteDate;
        this.rate = b.rate || this.rate;
        this.rateDisplay = b.rateDisplay || this.rateDisplay;
        this.data = (b.data && b.data.rate_data) || this.data;
        this.currencyConverter = new PairFactory(this.data);
        this.baseAmount = b.baseAmount ? this.currencyFormatter.parse(b.baseAmount) : this.baseAmount;
        this.quoteAmount = b.quoteAmount ? this.currencyFormatter.parse(b.quoteAmount) : this.quoteAmount
    };
    a.ncc.InfoPane.prototype.unload = function() {
        document.stopObserving("ncc:amountUpdate", this._amountUpdate);
        document.stopObserving("ncc:rateUpdate", this._rateUpdate)
    };
    a.ncc.InfoPane.prototype._amountUpdate = function(b) {
        this.baseAmount = this.currencyFormatter.parse(b.memo.baseAmount);
        this.quoteAmount = this.currencyFormatter.parse(b.memo.quoteAmount);
        this.redraw()
    };
    a.ncc.InfoPane.prototype._rateUpdate = function(b) {
        this.baseAmount = this.currencyFormatter.parse(b.memo.baseAmount);
        this.quoteAmount = this.currencyFormatter.parse(b.memo.quoteAmount);
        this.rate = b.memo.rate;
        this.rateDisplay = b.memo.rateDisplay;
        this.redraw()
    };
    a.ncc.InfoPane.prototype.redraw = function() {
        var c = this.elements;
        var j = this.currencyConverter.createPair(this.baseCurrency + "/" + this.quoteCurrency);
        var p = 1 - this.rate / 100;
        j.setDirection("SHORT");
        var e = this.currencyFormatter.roundCurrency(j.convert(this.quoteCurrency, this.quoteAmount / p), this.baseCurrency);
        j.setDirection("SHORT");
        var f = this.currencyFormatter.roundCurrency(j.convert(this.baseCurrency, this.baseAmount * p), this.quoteCurrency);
        var q = this.currencyFormatter.roundCurrency(this.baseAmount, this.baseCurrency);
        var g = this.currencyFormatter.roundCurrency(this.quoteAmount, this.quoteCurrency);
        var i = this.locale.localize("spreadDetails", [this.quoteCurrency + "/" + this.baseCurrency]);
        c.detail.update(i);
        if (j.composition.length > 0) {
            var d = "";
            if (j.composition.length == 2) {
                d = j.composition[0].quote.isoCode
            }
            if (j.composition.length == 3) {
                d = j.composition[1].base.isoCode + ", " + j.composition[1].quote.isoCode
            }
            c.estimated.update(this.locale.localize("spreadEstimated", [d]));
            c.estimated.show()
        } else {
            c.estimated.hide()
        }
        var h = this.locale.localize("spreadBuying", [g.escapeHTML() + ' <span class="currency">' + this.quoteCurrency.escapeHTML() + "</span>"], true);
        var m = this.locale.localize("spreadYouPay", [e.escapeHTML() + ' <span class="currency">' + this.baseCurrency.escapeHTML() + "</span>"], true);
        var n = this.locale.localize("spreadSelling", [g.escapeHTML() + ' <span class="currency">' + this.quoteCurrency.escapeHTML() + "</span>"], true);
        var b = this.locale.localize("spreadYouGet", [q.escapeHTML() + ' <span class="currency">' + this.baseCurrency.escapeHTML() + "</span>"], true);
        var k = new Date(this.quoteDate);
        k.setDate(k.getDate() - 1);
        var l = this.dateFormatter.format(k, this.locale.getDateFormatFull());
        var o = this.dateFormatter.format(k, this.locale.getTimeFormatFull());
        c.dateAndRate.update(this.locale.localize("spreadSubtitle", [this.quoteCurrency.escapeHTML(), this.baseCurrency.escapeHTML(), l.escapeHTML(), o.escapeHTML(), this.rateDisplay.escapeHTML()], true));
        c.buyBase.update(h);
        c.buyBaseCost.update(m);
        c.sellBase.update(n);
        c.sellBaseGet.update(b)
    }
})(jOanda);
// Combined /jslib/currency/converter/tabs/ratedetails/RateDetails.js
(function(a) {
    a.namespace("ncc").RateDetails = function(b) {
        this.table = new a.ncc.BidAskTable({
            elements: {
                subtitle: $(a.ncc.Elem.bidAskSubtitle),
                date: $(a.ncc.Elem.bidAskDate),
                time: $(a.ncc.Elem.bidAskTime),
                buyOne: $(a.ncc.Elem.bidAskBuy1),
                sellOne: $(a.ncc.Elem.bidAskSell1),
                bidMin: $(a.ncc.Elem.bidAskBidMin),
                bidAvg: $(a.ncc.Elem.bidAskBidAvg),
                bidMax: $(a.ncc.Elem.bidAskBidMax),
                askMin: $(a.ncc.Elem.bidAskAskMin),
                askAvg: $(a.ncc.Elem.bidAskAskAvg),
                askMax: $(a.ncc.Elem.bidAskAskMax)
            },
            locale: b.locale
        });
        this.graph = new a.ncc.CurrencyChart({
            elements: {
                canvas: $(a.ncc.Elem.currencyChartCanvas),
                subtitle: $(a.ncc.Elem.chartSubtitle),
                range30: $(a.ncc.Elem.range30),
                range60: $(a.ncc.Elem.range60),
                range90: $(a.ncc.Elem.range90)
            },
            noCrosshair: b.noCrosshair,
            locale: b.locale,
            lineColor: b.lineColor
        });
        this.spread = new a.ncc.InfoPane({
            elements: {
                detail: $(a.ncc.Elem.infoDetails),
                estimated: $(a.ncc.Elem.estimatedPrice),
                dateAndRate: $(a.ncc.Elem.atDateAndRate),
                buyBase: $(a.ncc.Elem.buyMyCurrency),
                buyBaseCost: $(a.ncc.Elem.buyMyCurrencyCost),
                sellBase: $(a.ncc.Elem.sellMyCurrency),
                sellBaseGet: $(a.ncc.Elem.sellMyCurrencyGet),
                buyQuote: $(a.ncc.Elem.buyOtherCurrency),
                buyQuoteCost: $(a.ncc.Elem.buyOtherCurrencyCost),
                sellQuote: $(a.ncc.Elem.sellOtherCurrency),
                sellQuoteGet: $(a.ncc.Elem.sellOtherCurrencyGet)
            },
            locale: b.locale
        });
        this._boundAjax = function() {
            document.fire("ncc:ajax", "C")
        };
        document.observe("ncc:currencyUpdate", this._boundAjax);
        if (a.ncc.Elem.csExplanation) {
            a.ncc.Elem.csExplanation.hide();
            a.ncc.Elem.ccExplanation.show()
        }
    };
    a.ncc.RateDetails.prototype.unload = function() {
        document.stopObserving("ncc:currencyUpdate", this._boundAjax);
        this.table.unload();
        this.graph.unload();
        this.spread.unload()
    };
    a.ncc.RateDetails.prototype.update = function(b) {
        this.table.update(b);
        this.graph.update(b);
        this.spread.update(b)
    };
    a.ncc.RateDetails.prototype.redraw = function() {
        this.table.redraw();
        this.graph.redraw();
        this.spread.redraw()
    }
})(jOanda);
// Combined /jslib/currency/converter/widget/MRUHandler.js
(function(a) {
    a.namespace("ncc").MRUHandler = function(d) {
        this.locale = d.locale;
        this.currencyList = d.currencyList;
        var c = location.pathname;
        var b = new RegExp("/[^/]*/$");
        this.path = c.replace(b, "/")
    };
    a.ncc.MRUHandler.prototype.setCombos = function(b) {
        this.baseCurrencyCombo = b.baseCurrencyCombo;
        this.quoteCurrencyCombo = b.quoteCurrencyCombo
    };
    a.ncc.MRUHandler.prototype.setupMRU = function() {
        var b = getCookie("mru_base");
        var e = getCookie("mru_quote");
        if (e !== null) {
            deleteCookie("mru_quote");
            setCookie("mru_quote", e, 90, this.path)
        }
        if (b !== null) {
            deleteCookie("mru_base");
            setCookie("mru_base0", b, 90, this.path)
        } else {
            b = getCookie("mru_base0")
        }
        if (b === null) {
            b = ["EUR", "USD", "GBP", "CAD", "AUD"];
            setCookie("mru_base0", b.join(","), 90, this.path)
        } else {
            b = b.split(",")
        }
        if (e === null) {
            e = ["EUR", "USD", "GBP", "CAD", "AUD"];
            setCookie("mru_quote", e.join(","), 90, this.path)
        } else {
            e = e.split(",")
        }
        var d = this._generateMRUListItems(b).concat(this.currencyList.slice());
        var c = this._generateMRUListItems(e).concat(this.currencyList.slice());
        return {
            quote: c,
            base: d
        }
    };
    a.ncc.MRUHandler.prototype._generateMRUListItems = function(e) {
        var c = this.currencyList;
        var f = [];
        e.each(function(h) {
            for (var g = 0; g < c.length; g++) {
                if (c[g].value === h) {
                    f.push(c[g].display);
                    break
                }
            }
        });
        var b = [];
        b.push({
            label: "yes",
            search: "",
            display: this.locale.localize("mruLabel", [])
        });
        for (var d = 0; d < e.length; d++) {
            b.push({
                value: e[d],
                search: "",
                display: f[d]
            })
        }
        return b
    };
    a.ncc.MRUHandler.prototype.updateMRU = function(e) {
        if (!e) {
            this.updateMRU("base0");
            this.updateMRU("quote");
            return
        }
        var j = "mru_" + e;
        if (j === "mru_base") {
            j = "mru_base0"
        }
        var g = getCookie(j).split(",");
        var h, d;
        if (e === "base" || e === "base0") {
            h = this.baseCurrencyCombo.getValue();
            d = this.baseCurrencyCombo
        } else {
            h = this.quoteCurrencyCombo.getValue();
            d = this.quoteCurrencyCombo
        }
        var c = g.length - 1;
        var f;
        for (f = 0; f < g.length; f++) {
            if (g[f] === h) {
                c = f;
                g.splice(f, 1);
                break
            }
        }
        g.unshift(h);
        if (g.length > 5) {
            g.pop()
        }
        setCookie(j, g.join(","), 90, this.path);
        var b = this._generateMRUListItems([g[0]])[1];
        d.removeListItem(c + 1);
        d.insertListItem(1, b);
        var k = function(i) {
            return function() {
                d.mouseOver(i)
            }
        };
        for (f = 2; f <= g.length; f++) {
            d.renderedItems[f].onmouseover = k(f)
        }
        d.setSelectedIndex(1)
    }
})(jOanda);