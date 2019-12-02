// Combined /jslib/joanda.js
var jOanda = (function() {
    if (window.jOanda) {
        return jOanda
    }
    var j = false;
    var i = false;
    var n = [];
    var a = false;
    var g = [];

    function b(p) {
        var o = window.onload;
        window.onload = function() {
            if (o) {
                o()
            }
            p()
        }
    }

    function m() {
        if (window.addEventListener) {
            window.addEventListener("load", d, false)
        } else {
            if (window.attachEvent) {
                window.attachEvent("onload", d)
            } else {
                b(d)
            }
        }
    }

    function e() {
        if (i) {
            return
        }
        i = true;
        if (document.readyState === "complete") {
            k();
            return
        }
        if (document.addEventListener) {
            document.addEventListener("DOMContentLoaded", function() {
                document.removeEventListener("DOMContentLoaded", arguments.callee, false);
                k()
            }, false)
        } else {
            if (document.attachEvent) {
                document.attachEvent("onreadystatechange", function() {
                    if (document.readyState === "complete") {
                        document.detachEvent("onreadystatechange", arguments.callee);
                        k()
                    }
                });
                if (document.documentElement.doScroll && window == window.top) {
                    (function() {
                        if (j) {
                            return
                        }
                        try {
                            document.documentElement.doScroll("left")
                        } catch (o) {
                            setTimeout(arguments.callee, 0);
                            return
                        }
                        k()
                    })()
                }
            } else {
                g.push(func)
            }
        }
    }

    function l(o) {
        e();
        if (j) {
            o.call(document)
        } else {
            n.push(o)
        }
    }

    function f(q) {
        var p, o = 0;
        while ((p = q[o++])) {
            p.call(document)
        }
    }

    function k() {
        if (!j) {
            j = true;
            f(n)
        }
    }

    function d() {
        if (!a) {
            a = true;
            f(g)
        }
    }

    function c() {
        var o;
        var p = window.jOandaOnready || [];
        m();
        for (o = 0; o < p.length; o++) {
            l(p[o])
        }
    }
    c();
    return {
        _id: 0,
        identity: function h() {
            return this._id++
        },
        onload: function(o) {
            if (a) {
                o.call(document)
            } else {
                g.push(o)
            }
        },
        onready: function(o) {
            l(o)
        },
        namespace: function(q) {
            var r = q.split("."),
                s = this,
                o, p;
            for (p = 0; p < r.length; p++) {
                o = r[p];
                if (s[o] === undefined) {
                    s[o] = {}
                }
                if (typeof(s[o]) !== "object") {
                    throw "cannot install namespace " + q
                }
                s = s[o]
            }
            return s
        }
    }
})();
// Combined /jslib/site.js
function print_img(c) {
    var a = "<html><head><title>Print | OANDA</title></head><body onLoad='window.print();'><img src='" + c + "'/></body></html>";
    var b = window.open("", "_blank");
    b.document.open();
    b.document.write(a);
    b.document.close()
}

function chbgc(a, b) {
    a.style.backgroundColor = b
}

function rtrPopUpWindow() {
    wPage = "/rtrates";
    wName = "rtrates";
    wParam = "status=yes,resizable=yes,scrollbars=yes,width=730,height=620";
    window.open(wPage, wName, wParam)
};
// Combined /jslib/uberdw.js
if (typeof(jOanda) !== "undefined") {
    jOanda.onload(function() {
        var a = document.getElementById("ADZ");
        if (a) {
            document.write = document.writeln = function(d) {
                if (!d) {
                    return
                }
                var c = /[<]script.+?src\s*=\s*"(\S+?)"/i.exec(d);
                if (c) {
                    var b = document.createElement("script");
                    b.type = "text/javascript";
                    b.src = c[1];
                    a.appendChild(b)
                } else {
                    a.innerHTML += d
                }
            }
        }
    })
};
// Combined /jslib/client_config.js
var OANDAClientConfig = (function() {
    var f;
    var k = [];
    var g = [];
    var j = false;
    var i = false;
    var m = false;
    var b = false;

    function d(q) {
        for (var r in q) {
            if (q.hasOwnProperty(r)) {
                return false
            }
        }
        return true
    }

    function h(q) {
        if (typeof(console) !== "undefined" && typeof(console.log) !== "undefined" && false) {
            console.log(q)
        }
        return
    }

    function p() {
        if (!k) {
            return
        }
        var r, q = 0;
        while ((r = k[q++])) {
            r(f)
        }
        k = null
    }

    function o(q) {
        if (i) {
            return
        }
        i = true;
        f = q;
        if (typeof(f) === "undefined" || d(f)) {
            h("no client config params");
            window.CT_X_cc_timer_fired = 1
        }
        p();
        return
    }

    function a(q) {
        if (typeof(q) === undefined || q.length < 1) {
            return
        }
        document.write('<script src="' + q + '" type="text/javascript"><\/script>');
        return
    }

    function e() {
        if (m) {
            return
        }
        h("switching to synchronous mode");
        m = true;
        if (j) {
            h("switching to synchronous mode when already running");
            l()
        }
    }

    function l() {
        if (g.length === 0) {
            return
        }
        var q, r = 0;
        while ((q = g[r++])) {
            if (m) {
                a(q)
            } else {
                var s = document.createElement("script");
                s.type = "text/javascript";
                s.src = q;
                document.body.appendChild(s)
            }
        }
        g = [];
        b = false;
        return
    }

    function n(q) {
        g.push(q);
        if (!m && typeof(jOanda) === "undefined") {
            h("jOanda is undefined so fallback to synchronous mode");
            m = true
        }
        if (m) {
            h("writing script tag " + q);
            l()
        } else {
            h("appending child " + q);
            if (!b) {
                b = true;
                jOanda.onready(function() {
                    l()
                })
            }
        }
    }

    function c() {
        if (j) {
            return
        }
        j = true;
        var q = "/client_config/OANDAClientConfig.load.js?src=/" + window.location.toString().split("/").slice(3).join("/");
        n(q);
        setTimeout(function() {
            o({})
        }, 10000);
        return
    }
    return {
        add_callback: function(q) {
            if (k) {
                k.push(q);
                if (!i) {
                    c()
                }
            } else {
                q(f)
            }
        },
        load: function(q) {
            o(q);
            return
        },
        get_params: function() {
            return f
        },
        jsonp: function(q) {
            n(q);
            return
        },
        execute_before_domready: function() {
            e();
            return
        }
    }
})();
// Combined /jslib/xdc.js
var OANDAOPC = (function() {
    var e = "opc";
    var a;
    var g = false;
    var h = false;
    var i = [];

    function d(m) {
        for (var n in m) {
            if (m.hasOwnProperty(n)) {
                return false
            }
        }
        return true
    }

    function f(m) {
        if (typeof(console) !== "undefined" && typeof(console.log) !== "undefined" && false) {
            console.log(m)
        }
        return
    }

    function l() {
        if (!i) {
            return
        }
        var n, m = 0;
        while ((n = i[m++])) {
            n()
        }
        i = null
    }

    function c(n) {
        var p = n + "=";
        var m = document.cookie.split(";");
        for (var o = 0; o < m.length; o++) {
            var q = m[o];
            while (q.charAt(0) === " ") {
                q = q.substring(1, q.length)
            }
            if (q.indexOf(p) === 0) {
                return q.substring(p.length, q.length)
            }
        }
        return null
    }

    function j(o, r, s, q) {
        var m = "";
        var p = "";
        if (s) {
            var n = new Date();
            n.setTime(s * 1000);
            m = "; expires=" + n.toGMTString()
        }
        p = o + "=" + r + m + "; path=/";
        if (q) {
            p += "; domain=" + q
        }
        document.cookie = p;
        return
    }

    function k(p) {
        if (g) {
            return
        }
        g = true;
        a = p;
        if (typeof(a) === "undefined" || d(a) || typeof(a.opc_token) === "undefined" || typeof(a.expires) === "undefined") {
            f("no params");
            window.CT_X_xdc_timer_fired = 1;
            l();
            return
        }
        f("setting cookie");
        window.CT_X_xdc_opc_set = 1;
        j(e, a.opc_token, parseInt(a.expires, 10));
        data = a.data;
        var n = location.hostname;
        var m = n.lastIndexOf(".oanda.");
        var q = n.substr(m);
        for (var o in data) {
            f("setting " + o);
            value = data[o];
            j(o, value, parseInt(a.expires, 10), q)
        }
        window.CT_X_xdc_dc = document.cookie;
        l();
        return
    }

    function b() {
        if (h) {
            return
        }
        h = true;
        var m = c(e);
        var n = /^(?:[A-F0-9]+-){4}(?:[A-F0-9]+)$/i;
        if (m && (m.length != 36 || !n.test(m))) {
            f("bad token: " + m + "(" + m.length + ")")
        }
        if (!c("tc")) {
            j("tc", "1");
            if (!c("tc")) {
                g = true;
                l();
                f("cookies not on");
                window.CT_X_xdc_cookies_disabled = 1;
                return
            }
        }
        if (typeof(OANDAClientConfig) === "undefined") {
            g = true;
            f("OANDAClientConfig not found");
            l();
            return
        }
        OANDAClientConfig.add_callback(function(o) {
            if (typeof(o) === "undefined" || typeof(o.cookie_server) === "undefined") {
                f("json empty");
                window.CT_X_xdc_cc_empty = 1;
                l()
            } else {
                f("call to cookie server");
                var p = window.location.protocol + "//" + o.cookie_server + "/OANDAOPC.load.js?new_opc=" + c("opc") + "&new_opc_id=" + c("opc_id");
                var q = c("oanda_lang");
                if (q) {
                    p += "&oanda_lang=" + q
                }
                OANDAClientConfig.jsonp(p)
            }
            return
        });
        setTimeout(function() {
            k({})
        }, 10000);
        return
    }
    return {
        add_callback: function(m) {
            if (i) {
                i.push(m);
                if (!g) {
                    b()
                }
            } else {
                m.call()
            }
            return
        },
        run: function() {
            if (!g) {
                b()
            }
            return
        },
        load: function(m) {
            k(m);
            return
        }
    }
})();
OANDAOPC.run();
// Combined /jslib/bb_detect.js
var isBlackberryBrowser = (function() {
    if (navigator.platform === "Blackberry") {
        return true
    } else {
        return false
    }
})();
// Combined /jslib/perf/log_end_time.js
jOanda.onload(function() {
    window.CT_X_onload_duration = new Date() - window.start_time
});
jOanda.onready(function() {
    window.CT_X_onready_duration = new Date() - window.start_time
});
// Combined /jslib/header_search.js
if (document.getElementById('query')) {
    document.getElementById('query').onfocus = function() {
        if (this.value == "" || this.value == this.getAttribute('default')) {
            this.value = "";
        }
        this.style.color = "#000000";
    };

    document.getElementById('query').onblur = function() {
        if (this.value == "" || this.value == this.getAttribute('default')) {
            this.value = this.getAttribute('default');
        }
        this.style.color = "#cbcbcb";
    };
}

function searchRedirect() {
    var search_url = document.location.protocol + "//" + document.location.hostname + "/search?q=";
    var query = document.getElementById('query').value;

    if (query != document.getElementById('query').getAttribute('default')) {
        window.location = search_url + query;
    }
}

function checkSubmit(e) {
    if (e && e.keyCode == 13) {
        searchRedirect();
    }
}

// Combined /jslib/language_dropdown.js
(function() {
    var a = function() {
        var e = document.getElementById("language_dropdown");
        if (e === null) {
            return
        }
        var d = e.getElementsByTagName("a");

        function c() {
            var j = this.id;
            var h = new Date();
            var g = location.hostname;
            var f = g.lastIndexOf(".oanda.");
            var i = g.substr(f);
            h.setTime(h.getTime() + 86400000 * 30);
            document.cookie = "oanda_lang=" + j + "; expires=" + h.toGMTString() + "; path=/; domain=" + i;
            var k = location.pathname + location.search;
            k = k.replace(/^\/lang\/[^\/]+\//, "/");
            k = (j == "en" ? "" : "/lang/" + j) + k;
            window.location = k;
            return false
        }
        for (var b = 0; b < d.length; b++) {
            if (d[b].onclick == null || d[b].onclick == undefined) {
                d[b].onclick = c
            }
        }
    };
    jOanda.onready(a)
})();
// Combined /jslib/expo9ad.js
function Expo9Ad(h, f, g, a, d, b) {
    var e = 20;
    if (g != "de") {
        g = "en"
    }

    function c() {
        var i = ["/expo/", f, "/", d, "x", a, "-", g].join("");
        var k = Math.floor(Math.random() * 99999999999);
        var j = document.getElementById(h);
        j.src = i + "?cb=" + k + "";
        if (b !== 0 && e > 0) {
            setTimeout(c, b);
            e--
        }
    }
    jOanda.onload(c)
};