window.ally_9c2c543086bf34903e33 = function(e) {
    var t = {};

    function n(r) {
        if (t[r]) return t[r].exports;
        var i = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(i.exports, i, i.exports, n), i.l = !0, i.exports
    }
    return n.m = e, n.c = t, n.d = function(e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: r
        })
    }, n.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, n.t = function(e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (n.r(r), Object.defineProperty(r, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var i in e) n.d(r, i, function(t) {
                return e[t]
            }.bind(null, i));
        return r
    }, n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "/", n(n.s = 98)
}([function(e, t, n) {
    "use strict";

    function r(e) {
        return null != e
    }

    function i(e, t) {
        if (void 0 === t && (t = "Failed value assertion"), r(e)) return e;
        throw new Error(t)
    }

    function o(e, t) {
        return r(e) ? e : t
    }

    function a() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        for (var n = 0, i = e; n < i.length; n++) {
            var o = (0, i[n])();
            if (r(o)) return o
        }
        return null
    }

    function s(e) {
        return r(e) ? e : null
    }

    function l(e, t) {
        return r(e) ? t(e) : null
    }
    n.d(t, "c", function() {
        return r
    }), n.d(t, "a", function() {
        return i
    }), n.d(t, "d", function() {
        return o
    }), n.d(t, "b", function() {
        return a
    }), n.d(t, "e", function() {
        return s
    }), n.d(t, "f", function() {
        return l
    })
}, function(e, t, n) {
    var r;
    /*!
     * jQuery JavaScript Library v3.6.0
     * https://jquery.com/
     *
     * Includes Sizzle.js
     * https://sizzlejs.com/
     *
     * Copyright OpenJS Foundation and other contributors
     * Released under the MIT license
     * https://jquery.org/license
     *
     * Date: 2021-03-02T17:08Z
     */
    ! function(t, n) {
        "use strict";
        "object" == typeof e.exports ? e.exports = t.document ? n(t, !0) : function(e) {
            if (!e.document) throw new Error("jQuery requires a window with a document");
            return n(e)
        } : n(t)
    }("undefined" != typeof window ? window : this, function(n, i) {
        "use strict";
        var o = [],
            a = Object.getPrototypeOf,
            s = o.slice,
            l = o.flat ? function(e) {
                return o.flat.call(e)
            } : function(e) {
                return o.concat.apply([], e)
            },
            c = o.push,
            u = o.indexOf,
            d = {},
            f = d.toString,
            p = d.hasOwnProperty,
            h = p.toString,
            m = h.call(Object),
            g = {},
            v = function(e) {
                return "function" == typeof e && "number" != typeof e.nodeType && "function" != typeof e.item
            },
            E = function(e) {
                return null != e && e === e.window
            },
            y = n.document,
            I = {
                type: !0,
                src: !0,
                nonce: !0,
                noModule: !0
            };

        function _(e, t, n) {
            var r, i, o = (n = n || y).createElement("script");
            if (o.text = e, t)
                for (r in I)(i = t[r] || t.getAttribute && t.getAttribute(r)) && o.setAttribute(r, i);
            n.head.appendChild(o).parentNode.removeChild(o)
        }

        function A(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? d[f.call(e)] || "object" : typeof e
        }
        var T = function(e, t) {
            return new T.fn.init(e, t)
        };

        function b(e) {
            var t = !!e && "length" in e && e.length,
                n = A(e);
            return !v(e) && !E(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e)
        }
        T.fn = T.prototype = {
            jquery: "3.6.0",
            constructor: T,
            length: 0,
            toArray: function() {
                return s.call(this)
            },
            get: function(e) {
                return null == e ? s.call(this) : e < 0 ? this[e + this.length] : this[e]
            },
            pushStack: function(e) {
                var t = T.merge(this.constructor(), e);
                return t.prevObject = this, t
            },
            each: function(e) {
                return T.each(this, e)
            },
            map: function(e) {
                return this.pushStack(T.map(this, function(t, n) {
                    return e.call(t, n, t)
                }))
            },
            slice: function() {
                return this.pushStack(s.apply(this, arguments))
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            even: function() {
                return this.pushStack(T.grep(this, function(e, t) {
                    return (t + 1) % 2
                }))
            },
            odd: function() {
                return this.pushStack(T.grep(this, function(e, t) {
                    return t % 2
                }))
            },
            eq: function(e) {
                var t = this.length,
                    n = +e + (e < 0 ? t : 0);
                return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
            },
            end: function() {
                return this.prevObject || this.constructor()
            },
            push: c,
            sort: o.sort,
            splice: o.splice
        }, T.extend = T.fn.extend = function() {
            var e, t, n, r, i, o, a = arguments[0] || {},
                s = 1,
                l = arguments.length,
                c = !1;
            for ("boolean" == typeof a && (c = a, a = arguments[s] || {}, s++), "object" == typeof a || v(a) || (a = {}), s === l && (a = this, s--); s < l; s++)
                if (null != (e = arguments[s]))
                    for (t in e) r = e[t], "__proto__" !== t && a !== r && (c && r && (T.isPlainObject(r) || (i = Array.isArray(r))) ? (n = a[t], o = i && !Array.isArray(n) ? [] : i || T.isPlainObject(n) ? n : {}, i = !1, a[t] = T.extend(c, o, r)) : void 0 !== r && (a[t] = r));
            return a
        }, T.extend({
            expando: "jQuery" + ("3.6.0" + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function(e) {
                throw new Error(e)
            },
            noop: function() {},
            isPlainObject: function(e) {
                var t, n;
                return !(!e || "[object Object]" !== f.call(e)) && (!(t = a(e)) || "function" == typeof(n = p.call(t, "constructor") && t.constructor) && h.call(n) === m)
            },
            isEmptyObject: function(e) {
                var t;
                for (t in e) return !1;
                return !0
            },
            globalEval: function(e, t, n) {
                _(e, {
                    nonce: t && t.nonce
                }, n)
            },
            each: function(e, t) {
                var n, r = 0;
                if (b(e))
                    for (n = e.length; r < n && !1 !== t.call(e[r], r, e[r]); r++);
                else
                    for (r in e)
                        if (!1 === t.call(e[r], r, e[r])) break;
                return e
            },
            makeArray: function(e, t) {
                var n = t || [];
                return null != e && (b(Object(e)) ? T.merge(n, "string" == typeof e ? [e] : e) : c.call(n, e)), n
            },
            inArray: function(e, t, n) {
                return null == t ? -1 : u.call(t, e, n)
            },
            merge: function(e, t) {
                for (var n = +t.length, r = 0, i = e.length; r < n; r++) e[i++] = t[r];
                return e.length = i, e
            },
            grep: function(e, t, n) {
                for (var r = [], i = 0, o = e.length, a = !n; i < o; i++) !t(e[i], i) !== a && r.push(e[i]);
                return r
            },
            map: function(e, t, n) {
                var r, i, o = 0,
                    a = [];
                if (b(e))
                    for (r = e.length; o < r; o++) null != (i = t(e[o], o, n)) && a.push(i);
                else
                    for (o in e) null != (i = t(e[o], o, n)) && a.push(i);
                return l(a)
            },
            guid: 1,
            support: g
        }), "function" == typeof Symbol && (T.fn[Symbol.iterator] = o[Symbol.iterator]), T.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
            d["[object " + t + "]"] = t.toLowerCase()
        });
        var O =
            /*!
             * Sizzle CSS Selector Engine v2.3.6
             * https://sizzlejs.com/
             *
             * Copyright JS Foundation and other contributors
             * Released under the MIT license
             * https://js.foundation/
             *
             * Date: 2021-02-16
             */
            function(e) {
                var t, n, r, i, o, a, s, l, c, u, d, f, p, h, m, g, v, E, y, I = "sizzle" + 1 * new Date,
                    _ = e.document,
                    A = 0,
                    T = 0,
                    b = le(),
                    O = le(),
                    C = le(),
                    L = le(),
                    S = function(e, t) {
                        return e === t && (d = !0), 0
                    },
                    w = {}.hasOwnProperty,
                    N = [],
                    R = N.pop,
                    F = N.push,
                    P = N.push,
                    k = N.slice,
                    D = function(e, t) {
                        for (var n = 0, r = e.length; n < r; n++)
                            if (e[n] === t) return n;
                        return -1
                    },
                    x = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                    M = "[\\x20\\t\\r\\n\\f]",
                    B = "(?:\\\\[\\da-fA-F]{1,6}" + M + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
                    H = "\\[" + M + "*(" + B + ")(?:" + M + "*([*^$|!~]?=)" + M + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + B + "))|)" + M + "*\\]",
                    j = ":(" + B + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + H + ")*)|.*)\\)|)",
                    U = new RegExp(M + "+", "g"),
                    Y = new RegExp("^" + M + "+|((?:^|[^\\\\])(?:\\\\.)*)" + M + "+$", "g"),
                    W = new RegExp("^" + M + "*," + M + "*"),
                    V = new RegExp("^" + M + "*([>+~]|" + M + ")" + M + "*"),
                    G = new RegExp(M + "|>"),
                    K = new RegExp(j),
                    q = new RegExp("^" + B + "$"),
                    z = {
                        ID: new RegExp("^#(" + B + ")"),
                        CLASS: new RegExp("^\\.(" + B + ")"),
                        TAG: new RegExp("^(" + B + "|[*])"),
                        ATTR: new RegExp("^" + H),
                        PSEUDO: new RegExp("^" + j),
                        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + M + "*(even|odd|(([+-]|)(\\d*)n|)" + M + "*(?:([+-]|)" + M + "*(\\d+)|))" + M + "*\\)|)", "i"),
                        bool: new RegExp("^(?:" + x + ")$", "i"),
                        needsContext: new RegExp("^" + M + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + M + "*((?:-\\d)?\\d*)" + M + "*\\)|)(?=[^-]|$)", "i")
                    },
                    $ = /HTML$/i,
                    X = /^(?:input|select|textarea|button)$/i,
                    Z = /^h\d$/i,
                    Q = /^[^{]+\{\s*\[native \w/,
                    J = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                    ee = /[+~]/,
                    te = new RegExp("\\\\[\\da-fA-F]{1,6}" + M + "?|\\\\([^\\r\\n\\f])", "g"),
                    ne = function(e, t) {
                        var n = "0x" + e.slice(1) - 65536;
                        return t || (n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320))
                    },
                    re = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
                    ie = function(e, t) {
                        return t ? "\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
                    },
                    oe = function() {
                        f()
                    },
                    ae = Ie(function(e) {
                        return !0 === e.disabled && "fieldset" === e.nodeName.toLowerCase()
                    }, {
                        dir: "parentNode",
                        next: "legend"
                    });
                try {
                    P.apply(N = k.call(_.childNodes), _.childNodes), N[_.childNodes.length].nodeType
                } catch (e) {
                    P = {
                        apply: N.length ? function(e, t) {
                            F.apply(e, k.call(t))
                        } : function(e, t) {
                            for (var n = e.length, r = 0; e[n++] = t[r++];);
                            e.length = n - 1
                        }
                    }
                }

                function se(e, t, r, i) {
                    var o, s, c, u, d, h, v, E = t && t.ownerDocument,
                        _ = t ? t.nodeType : 9;
                    if (r = r || [], "string" != typeof e || !e || 1 !== _ && 9 !== _ && 11 !== _) return r;
                    if (!i && (f(t), t = t || p, m)) {
                        if (11 !== _ && (d = J.exec(e)))
                            if (o = d[1]) {
                                if (9 === _) {
                                    if (!(c = t.getElementById(o))) return r;
                                    if (c.id === o) return r.push(c), r
                                } else if (E && (c = E.getElementById(o)) && y(t, c) && c.id === o) return r.push(c), r
                            } else {
                                if (d[2]) return P.apply(r, t.getElementsByTagName(e)), r;
                                if ((o = d[3]) && n.getElementsByClassName && t.getElementsByClassName) return P.apply(r, t.getElementsByClassName(o)), r
                            }
                        if (n.qsa && !L[e + " "] && (!g || !g.test(e)) && (1 !== _ || "object" !== t.nodeName.toLowerCase())) {
                            if (v = e, E = t, 1 === _ && (G.test(e) || V.test(e))) {
                                for ((E = ee.test(e) && ve(t.parentNode) || t) === t && n.scope || ((u = t.getAttribute("id")) ? u = u.replace(re, ie) : t.setAttribute("id", u = I)), s = (h = a(e)).length; s--;) h[s] = (u ? "#" + u : ":scope") + " " + ye(h[s]);
                                v = h.join(",")
                            }
                            try {
                                return P.apply(r, E.querySelectorAll(v)), r
                            } catch (t) {
                                L(e, !0)
                            } finally {
                                u === I && t.removeAttribute("id")
                            }
                        }
                    }
                    return l(e.replace(Y, "$1"), t, r, i)
                }

                function le() {
                    var e = [];
                    return function t(n, i) {
                        return e.push(n + " ") > r.cacheLength && delete t[e.shift()], t[n + " "] = i
                    }
                }

                function ce(e) {
                    return e[I] = !0, e
                }

                function ue(e) {
                    var t = p.createElement("fieldset");
                    try {
                        return !!e(t)
                    } catch (e) {
                        return !1
                    } finally {
                        t.parentNode && t.parentNode.removeChild(t), t = null
                    }
                }

                function de(e, t) {
                    for (var n = e.split("|"), i = n.length; i--;) r.attrHandle[n[i]] = t
                }

                function fe(e, t) {
                    var n = t && e,
                        r = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
                    if (r) return r;
                    if (n)
                        for (; n = n.nextSibling;)
                            if (n === t) return -1;
                    return e ? 1 : -1
                }

                function pe(e) {
                    return function(t) {
                        return "input" === t.nodeName.toLowerCase() && t.type === e
                    }
                }

                function he(e) {
                    return function(t) {
                        var n = t.nodeName.toLowerCase();
                        return ("input" === n || "button" === n) && t.type === e
                    }
                }

                function me(e) {
                    return function(t) {
                        return "form" in t ? t.parentNode && !1 === t.disabled ? "label" in t ? "label" in t.parentNode ? t.parentNode.disabled === e : t.disabled === e : t.isDisabled === e || t.isDisabled !== !e && ae(t) === e : t.disabled === e : "label" in t && t.disabled === e
                    }
                }

                function ge(e) {
                    return ce(function(t) {
                        return t = +t, ce(function(n, r) {
                            for (var i, o = e([], n.length, t), a = o.length; a--;) n[i = o[a]] && (n[i] = !(r[i] = n[i]))
                        })
                    })
                }

                function ve(e) {
                    return e && void 0 !== e.getElementsByTagName && e
                }
                for (t in n = se.support = {}, o = se.isXML = function(e) {
                        var t = e && e.namespaceURI,
                            n = e && (e.ownerDocument || e).documentElement;
                        return !$.test(t || n && n.nodeName || "HTML")
                    }, f = se.setDocument = function(e) {
                        var t, i, a = e ? e.ownerDocument || e : _;
                        return a != p && 9 === a.nodeType && a.documentElement ? (h = (p = a).documentElement, m = !o(p), _ != p && (i = p.defaultView) && i.top !== i && (i.addEventListener ? i.addEventListener("unload", oe, !1) : i.attachEvent && i.attachEvent("onunload", oe)), n.scope = ue(function(e) {
                            return h.appendChild(e).appendChild(p.createElement("div")), void 0 !== e.querySelectorAll && !e.querySelectorAll(":scope fieldset div").length
                        }), n.attributes = ue(function(e) {
                            return e.className = "i", !e.getAttribute("className")
                        }), n.getElementsByTagName = ue(function(e) {
                            return e.appendChild(p.createComment("")), !e.getElementsByTagName("*").length
                        }), n.getElementsByClassName = Q.test(p.getElementsByClassName), n.getById = ue(function(e) {
                            return h.appendChild(e).id = I, !p.getElementsByName || !p.getElementsByName(I).length
                        }), n.getById ? (r.filter.ID = function(e) {
                            var t = e.replace(te, ne);
                            return function(e) {
                                return e.getAttribute("id") === t
                            }
                        }, r.find.ID = function(e, t) {
                            if (void 0 !== t.getElementById && m) {
                                var n = t.getElementById(e);
                                return n ? [n] : []
                            }
                        }) : (r.filter.ID = function(e) {
                            var t = e.replace(te, ne);
                            return function(e) {
                                var n = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
                                return n && n.value === t
                            }
                        }, r.find.ID = function(e, t) {
                            if (void 0 !== t.getElementById && m) {
                                var n, r, i, o = t.getElementById(e);
                                if (o) {
                                    if ((n = o.getAttributeNode("id")) && n.value === e) return [o];
                                    for (i = t.getElementsByName(e), r = 0; o = i[r++];)
                                        if ((n = o.getAttributeNode("id")) && n.value === e) return [o]
                                }
                                return []
                            }
                        }), r.find.TAG = n.getElementsByTagName ? function(e, t) {
                            return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : n.qsa ? t.querySelectorAll(e) : void 0
                        } : function(e, t) {
                            var n, r = [],
                                i = 0,
                                o = t.getElementsByTagName(e);
                            if ("*" === e) {
                                for (; n = o[i++];) 1 === n.nodeType && r.push(n);
                                return r
                            }
                            return o
                        }, r.find.CLASS = n.getElementsByClassName && function(e, t) {
                            if (void 0 !== t.getElementsByClassName && m) return t.getElementsByClassName(e)
                        }, v = [], g = [], (n.qsa = Q.test(p.querySelectorAll)) && (ue(function(e) {
                            var t;
                            h.appendChild(e).innerHTML = "<a id='" + I + "'></a><select id='" + I + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && g.push("[*^$]=" + M + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || g.push("\\[" + M + "*(?:value|" + x + ")"), e.querySelectorAll("[id~=" + I + "-]").length || g.push("~="), (t = p.createElement("input")).setAttribute("name", ""), e.appendChild(t), e.querySelectorAll("[name='']").length || g.push("\\[" + M + "*name" + M + "*=" + M + "*(?:''|\"\")"), e.querySelectorAll(":checked").length || g.push(":checked"), e.querySelectorAll("a#" + I + "+*").length || g.push(".#.+[+~]"), e.querySelectorAll("\\\f"), g.push("[\\r\\n\\f]")
                        }), ue(function(e) {
                            e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                            var t = p.createElement("input");
                            t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && g.push("name" + M + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && g.push(":enabled", ":disabled"), h.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && g.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), g.push(",.*:")
                        })), (n.matchesSelector = Q.test(E = h.matches || h.webkitMatchesSelector || h.mozMatchesSelector || h.oMatchesSelector || h.msMatchesSelector)) && ue(function(e) {
                            n.disconnectedMatch = E.call(e, "*"), E.call(e, "[s!='']:x"), v.push("!=", j)
                        }), g = g.length && new RegExp(g.join("|")), v = v.length && new RegExp(v.join("|")), t = Q.test(h.compareDocumentPosition), y = t || Q.test(h.contains) ? function(e, t) {
                            var n = 9 === e.nodeType ? e.documentElement : e,
                                r = t && t.parentNode;
                            return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
                        } : function(e, t) {
                            if (t)
                                for (; t = t.parentNode;)
                                    if (t === e) return !0;
                            return !1
                        }, S = t ? function(e, t) {
                            if (e === t) return d = !0, 0;
                            var r = !e.compareDocumentPosition - !t.compareDocumentPosition;
                            return r || (1 & (r = (e.ownerDocument || e) == (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !n.sortDetached && t.compareDocumentPosition(e) === r ? e == p || e.ownerDocument == _ && y(_, e) ? -1 : t == p || t.ownerDocument == _ && y(_, t) ? 1 : u ? D(u, e) - D(u, t) : 0 : 4 & r ? -1 : 1)
                        } : function(e, t) {
                            if (e === t) return d = !0, 0;
                            var n, r = 0,
                                i = e.parentNode,
                                o = t.parentNode,
                                a = [e],
                                s = [t];
                            if (!i || !o) return e == p ? -1 : t == p ? 1 : i ? -1 : o ? 1 : u ? D(u, e) - D(u, t) : 0;
                            if (i === o) return fe(e, t);
                            for (n = e; n = n.parentNode;) a.unshift(n);
                            for (n = t; n = n.parentNode;) s.unshift(n);
                            for (; a[r] === s[r];) r++;
                            return r ? fe(a[r], s[r]) : a[r] == _ ? -1 : s[r] == _ ? 1 : 0
                        }, p) : p
                    }, se.matches = function(e, t) {
                        return se(e, null, null, t)
                    }, se.matchesSelector = function(e, t) {
                        if (f(e), n.matchesSelector && m && !L[t + " "] && (!v || !v.test(t)) && (!g || !g.test(t))) try {
                            var r = E.call(e, t);
                            if (r || n.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r
                        } catch (e) {
                            L(t, !0)
                        }
                        return se(t, p, null, [e]).length > 0
                    }, se.contains = function(e, t) {
                        return (e.ownerDocument || e) != p && f(e), y(e, t)
                    }, se.attr = function(e, t) {
                        (e.ownerDocument || e) != p && f(e);
                        var i = r.attrHandle[t.toLowerCase()],
                            o = i && w.call(r.attrHandle, t.toLowerCase()) ? i(e, t, !m) : void 0;
                        return void 0 !== o ? o : n.attributes || !m ? e.getAttribute(t) : (o = e.getAttributeNode(t)) && o.specified ? o.value : null
                    }, se.escape = function(e) {
                        return (e + "").replace(re, ie)
                    }, se.error = function(e) {
                        throw new Error("Syntax error, unrecognized expression: " + e)
                    }, se.uniqueSort = function(e) {
                        var t, r = [],
                            i = 0,
                            o = 0;
                        if (d = !n.detectDuplicates, u = !n.sortStable && e.slice(0), e.sort(S), d) {
                            for (; t = e[o++];) t === e[o] && (i = r.push(o));
                            for (; i--;) e.splice(r[i], 1)
                        }
                        return u = null, e
                    }, i = se.getText = function(e) {
                        var t, n = "",
                            r = 0,
                            o = e.nodeType;
                        if (o) {
                            if (1 === o || 9 === o || 11 === o) {
                                if ("string" == typeof e.textContent) return e.textContent;
                                for (e = e.firstChild; e; e = e.nextSibling) n += i(e)
                            } else if (3 === o || 4 === o) return e.nodeValue
                        } else
                            for (; t = e[r++];) n += i(t);
                        return n
                    }, (r = se.selectors = {
                        cacheLength: 50,
                        createPseudo: ce,
                        match: z,
                        attrHandle: {},
                        find: {},
                        relative: {
                            ">": {
                                dir: "parentNode",
                                first: !0
                            },
                            " ": {
                                dir: "parentNode"
                            },
                            "+": {
                                dir: "previousSibling",
                                first: !0
                            },
                            "~": {
                                dir: "previousSibling"
                            }
                        },
                        preFilter: {
                            ATTR: function(e) {
                                return e[1] = e[1].replace(te, ne), e[3] = (e[3] || e[4] || e[5] || "").replace(te, ne), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                            },
                            CHILD: function(e) {
                                return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || se.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && se.error(e[0]), e
                            },
                            PSEUDO: function(e) {
                                var t, n = !e[6] && e[2];
                                return z.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && K.test(n) && (t = a(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                            }
                        },
                        filter: {
                            TAG: function(e) {
                                var t = e.replace(te, ne).toLowerCase();
                                return "*" === e ? function() {
                                    return !0
                                } : function(e) {
                                    return e.nodeName && e.nodeName.toLowerCase() === t
                                }
                            },
                            CLASS: function(e) {
                                var t = b[e + " "];
                                return t || (t = new RegExp("(^|" + M + ")" + e + "(" + M + "|$)")) && b(e, function(e) {
                                    return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "")
                                })
                            },
                            ATTR: function(e, t, n) {
                                return function(r) {
                                    var i = se.attr(r, e);
                                    return null == i ? "!=" === t : !t || (i += "", "=" === t ? i === n : "!=" === t ? i !== n : "^=" === t ? n && 0 === i.indexOf(n) : "*=" === t ? n && i.indexOf(n) > -1 : "$=" === t ? n && i.slice(-n.length) === n : "~=" === t ? (" " + i.replace(U, " ") + " ").indexOf(n) > -1 : "|=" === t && (i === n || i.slice(0, n.length + 1) === n + "-"))
                                }
                            },
                            CHILD: function(e, t, n, r, i) {
                                var o = "nth" !== e.slice(0, 3),
                                    a = "last" !== e.slice(-4),
                                    s = "of-type" === t;
                                return 1 === r && 0 === i ? function(e) {
                                    return !!e.parentNode
                                } : function(t, n, l) {
                                    var c, u, d, f, p, h, m = o !== a ? "nextSibling" : "previousSibling",
                                        g = t.parentNode,
                                        v = s && t.nodeName.toLowerCase(),
                                        E = !l && !s,
                                        y = !1;
                                    if (g) {
                                        if (o) {
                                            for (; m;) {
                                                for (f = t; f = f[m];)
                                                    if (s ? f.nodeName.toLowerCase() === v : 1 === f.nodeType) return !1;
                                                h = m = "only" === e && !h && "nextSibling"
                                            }
                                            return !0
                                        }
                                        if (h = [a ? g.firstChild : g.lastChild], a && E) {
                                            for (y = (p = (c = (u = (d = (f = g)[I] || (f[I] = {}))[f.uniqueID] || (d[f.uniqueID] = {}))[e] || [])[0] === A && c[1]) && c[2], f = p && g.childNodes[p]; f = ++p && f && f[m] || (y = p = 0) || h.pop();)
                                                if (1 === f.nodeType && ++y && f === t) {
                                                    u[e] = [A, p, y];
                                                    break
                                                }
                                        } else if (E && (y = p = (c = (u = (d = (f = t)[I] || (f[I] = {}))[f.uniqueID] || (d[f.uniqueID] = {}))[e] || [])[0] === A && c[1]), !1 === y)
                                            for (;
                                                (f = ++p && f && f[m] || (y = p = 0) || h.pop()) && ((s ? f.nodeName.toLowerCase() !== v : 1 !== f.nodeType) || !++y || (E && ((u = (d = f[I] || (f[I] = {}))[f.uniqueID] || (d[f.uniqueID] = {}))[e] = [A, y]), f !== t)););
                                        return (y -= i) === r || y % r == 0 && y / r >= 0
                                    }
                                }
                            },
                            PSEUDO: function(e, t) {
                                var n, i = r.pseudos[e] || r.setFilters[e.toLowerCase()] || se.error("unsupported pseudo: " + e);
                                return i[I] ? i(t) : i.length > 1 ? (n = [e, e, "", t], r.setFilters.hasOwnProperty(e.toLowerCase()) ? ce(function(e, n) {
                                    for (var r, o = i(e, t), a = o.length; a--;) e[r = D(e, o[a])] = !(n[r] = o[a])
                                }) : function(e) {
                                    return i(e, 0, n)
                                }) : i
                            }
                        },
                        pseudos: {
                            not: ce(function(e) {
                                var t = [],
                                    n = [],
                                    r = s(e.replace(Y, "$1"));
                                return r[I] ? ce(function(e, t, n, i) {
                                    for (var o, a = r(e, null, i, []), s = e.length; s--;)(o = a[s]) && (e[s] = !(t[s] = o))
                                }) : function(e, i, o) {
                                    return t[0] = e, r(t, null, o, n), t[0] = null, !n.pop()
                                }
                            }),
                            has: ce(function(e) {
                                return function(t) {
                                    return se(e, t).length > 0
                                }
                            }),
                            contains: ce(function(e) {
                                return e = e.replace(te, ne),
                                    function(t) {
                                        return (t.textContent || i(t)).indexOf(e) > -1
                                    }
                            }),
                            lang: ce(function(e) {
                                return q.test(e || "") || se.error("unsupported lang: " + e), e = e.replace(te, ne).toLowerCase(),
                                    function(t) {
                                        var n;
                                        do {
                                            if (n = m ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-")
                                        } while ((t = t.parentNode) && 1 === t.nodeType);
                                        return !1
                                    }
                            }),
                            target: function(t) {
                                var n = e.location && e.location.hash;
                                return n && n.slice(1) === t.id
                            },
                            root: function(e) {
                                return e === h
                            },
                            focus: function(e) {
                                return e === p.activeElement && (!p.hasFocus || p.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                            },
                            enabled: me(!1),
                            disabled: me(!0),
                            checked: function(e) {
                                var t = e.nodeName.toLowerCase();
                                return "input" === t && !!e.checked || "option" === t && !!e.selected
                            },
                            selected: function(e) {
                                return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
                            },
                            empty: function(e) {
                                for (e = e.firstChild; e; e = e.nextSibling)
                                    if (e.nodeType < 6) return !1;
                                return !0
                            },
                            parent: function(e) {
                                return !r.pseudos.empty(e)
                            },
                            header: function(e) {
                                return Z.test(e.nodeName)
                            },
                            input: function(e) {
                                return X.test(e.nodeName)
                            },
                            button: function(e) {
                                var t = e.nodeName.toLowerCase();
                                return "input" === t && "button" === e.type || "button" === t
                            },
                            text: function(e) {
                                var t;
                                return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                            },
                            first: ge(function() {
                                return [0]
                            }),
                            last: ge(function(e, t) {
                                return [t - 1]
                            }),
                            eq: ge(function(e, t, n) {
                                return [n < 0 ? n + t : n]
                            }),
                            even: ge(function(e, t) {
                                for (var n = 0; n < t; n += 2) e.push(n);
                                return e
                            }),
                            odd: ge(function(e, t) {
                                for (var n = 1; n < t; n += 2) e.push(n);
                                return e
                            }),
                            lt: ge(function(e, t, n) {
                                for (var r = n < 0 ? n + t : n > t ? t : n; --r >= 0;) e.push(r);
                                return e
                            }),
                            gt: ge(function(e, t, n) {
                                for (var r = n < 0 ? n + t : n; ++r < t;) e.push(r);
                                return e
                            })
                        }
                    }).pseudos.nth = r.pseudos.eq, {
                        radio: !0,
                        checkbox: !0,
                        file: !0,
                        password: !0,
                        image: !0
                    }) r.pseudos[t] = pe(t);
                for (t in {
                        submit: !0,
                        reset: !0
                    }) r.pseudos[t] = he(t);

                function Ee() {}

                function ye(e) {
                    for (var t = 0, n = e.length, r = ""; t < n; t++) r += e[t].value;
                    return r
                }

                function Ie(e, t, n) {
                    var r = t.dir,
                        i = t.next,
                        o = i || r,
                        a = n && "parentNode" === o,
                        s = T++;
                    return t.first ? function(t, n, i) {
                        for (; t = t[r];)
                            if (1 === t.nodeType || a) return e(t, n, i);
                        return !1
                    } : function(t, n, l) {
                        var c, u, d, f = [A, s];
                        if (l) {
                            for (; t = t[r];)
                                if ((1 === t.nodeType || a) && e(t, n, l)) return !0
                        } else
                            for (; t = t[r];)
                                if (1 === t.nodeType || a)
                                    if (u = (d = t[I] || (t[I] = {}))[t.uniqueID] || (d[t.uniqueID] = {}), i && i === t.nodeName.toLowerCase()) t = t[r] || t;
                                    else {
                                        if ((c = u[o]) && c[0] === A && c[1] === s) return f[2] = c[2];
                                        if (u[o] = f, f[2] = e(t, n, l)) return !0
                                    } return !1
                    }
                }

                function _e(e) {
                    return e.length > 1 ? function(t, n, r) {
                        for (var i = e.length; i--;)
                            if (!e[i](t, n, r)) return !1;
                        return !0
                    } : e[0]
                }

                function Ae(e, t, n, r, i) {
                    for (var o, a = [], s = 0, l = e.length, c = null != t; s < l; s++)(o = e[s]) && (n && !n(o, r, i) || (a.push(o), c && t.push(s)));
                    return a
                }

                function Te(e, t, n, r, i, o) {
                    return r && !r[I] && (r = Te(r)), i && !i[I] && (i = Te(i, o)), ce(function(o, a, s, l) {
                        var c, u, d, f = [],
                            p = [],
                            h = a.length,
                            m = o || function(e, t, n) {
                                for (var r = 0, i = t.length; r < i; r++) se(e, t[r], n);
                                return n
                            }(t || "*", s.nodeType ? [s] : s, []),
                            g = !e || !o && t ? m : Ae(m, f, e, s, l),
                            v = n ? i || (o ? e : h || r) ? [] : a : g;
                        if (n && n(g, v, s, l), r)
                            for (c = Ae(v, p), r(c, [], s, l), u = c.length; u--;)(d = c[u]) && (v[p[u]] = !(g[p[u]] = d));
                        if (o) {
                            if (i || e) {
                                if (i) {
                                    for (c = [], u = v.length; u--;)(d = v[u]) && c.push(g[u] = d);
                                    i(null, v = [], c, l)
                                }
                                for (u = v.length; u--;)(d = v[u]) && (c = i ? D(o, d) : f[u]) > -1 && (o[c] = !(a[c] = d))
                            }
                        } else v = Ae(v === a ? v.splice(h, v.length) : v), i ? i(null, a, v, l) : P.apply(a, v)
                    })
                }

                function be(e) {
                    for (var t, n, i, o = e.length, a = r.relative[e[0].type], s = a || r.relative[" "], l = a ? 1 : 0, u = Ie(function(e) {
                            return e === t
                        }, s, !0), d = Ie(function(e) {
                            return D(t, e) > -1
                        }, s, !0), f = [function(e, n, r) {
                            var i = !a && (r || n !== c) || ((t = n).nodeType ? u(e, n, r) : d(e, n, r));
                            return t = null, i
                        }]; l < o; l++)
                        if (n = r.relative[e[l].type]) f = [Ie(_e(f), n)];
                        else {
                            if ((n = r.filter[e[l].type].apply(null, e[l].matches))[I]) {
                                for (i = ++l; i < o && !r.relative[e[i].type]; i++);
                                return Te(l > 1 && _e(f), l > 1 && ye(e.slice(0, l - 1).concat({
                                    value: " " === e[l - 2].type ? "*" : ""
                                })).replace(Y, "$1"), n, l < i && be(e.slice(l, i)), i < o && be(e = e.slice(i)), i < o && ye(e))
                            }
                            f.push(n)
                        }
                    return _e(f)
                }
                return Ee.prototype = r.filters = r.pseudos, r.setFilters = new Ee, a = se.tokenize = function(e, t) {
                    var n, i, o, a, s, l, c, u = O[e + " "];
                    if (u) return t ? 0 : u.slice(0);
                    for (s = e, l = [], c = r.preFilter; s;) {
                        for (a in n && !(i = W.exec(s)) || (i && (s = s.slice(i[0].length) || s), l.push(o = [])), n = !1, (i = V.exec(s)) && (n = i.shift(), o.push({
                                value: n,
                                type: i[0].replace(Y, " ")
                            }), s = s.slice(n.length)), r.filter) !(i = z[a].exec(s)) || c[a] && !(i = c[a](i)) || (n = i.shift(), o.push({
                            value: n,
                            type: a,
                            matches: i
                        }), s = s.slice(n.length));
                        if (!n) break
                    }
                    return t ? s.length : s ? se.error(e) : O(e, l).slice(0)
                }, s = se.compile = function(e, t) {
                    var n, i = [],
                        o = [],
                        s = C[e + " "];
                    if (!s) {
                        for (t || (t = a(e)), n = t.length; n--;)(s = be(t[n]))[I] ? i.push(s) : o.push(s);
                        (s = C(e, function(e, t) {
                            var n = t.length > 0,
                                i = e.length > 0,
                                o = function(o, a, s, l, u) {
                                    var d, h, g, v = 0,
                                        E = "0",
                                        y = o && [],
                                        I = [],
                                        _ = c,
                                        T = o || i && r.find.TAG("*", u),
                                        b = A += null == _ ? 1 : Math.random() || .1,
                                        O = T.length;
                                    for (u && (c = a == p || a || u); E !== O && null != (d = T[E]); E++) {
                                        if (i && d) {
                                            for (h = 0, a || d.ownerDocument == p || (f(d), s = !m); g = e[h++];)
                                                if (g(d, a || p, s)) {
                                                    l.push(d);
                                                    break
                                                }
                                            u && (A = b)
                                        }
                                        n && ((d = !g && d) && v--, o && y.push(d))
                                    }
                                    if (v += E, n && E !== v) {
                                        for (h = 0; g = t[h++];) g(y, I, a, s);
                                        if (o) {
                                            if (v > 0)
                                                for (; E--;) y[E] || I[E] || (I[E] = R.call(l));
                                            I = Ae(I)
                                        }
                                        P.apply(l, I), u && !o && I.length > 0 && v + t.length > 1 && se.uniqueSort(l)
                                    }
                                    return u && (A = b, c = _), y
                                };
                            return n ? ce(o) : o
                        }(o, i))).selector = e
                    }
                    return s
                }, l = se.select = function(e, t, n, i) {
                    var o, l, c, u, d, f = "function" == typeof e && e,
                        p = !i && a(e = f.selector || e);
                    if (n = n || [], 1 === p.length) {
                        if ((l = p[0] = p[0].slice(0)).length > 2 && "ID" === (c = l[0]).type && 9 === t.nodeType && m && r.relative[l[1].type]) {
                            if (!(t = (r.find.ID(c.matches[0].replace(te, ne), t) || [])[0])) return n;
                            f && (t = t.parentNode), e = e.slice(l.shift().value.length)
                        }
                        for (o = z.needsContext.test(e) ? 0 : l.length; o-- && (c = l[o], !r.relative[u = c.type]);)
                            if ((d = r.find[u]) && (i = d(c.matches[0].replace(te, ne), ee.test(l[0].type) && ve(t.parentNode) || t))) {
                                if (l.splice(o, 1), !(e = i.length && ye(l))) return P.apply(n, i), n;
                                break
                            }
                    }
                    return (f || s(e, p))(i, t, !m, n, !t || ee.test(e) && ve(t.parentNode) || t), n
                }, n.sortStable = I.split("").sort(S).join("") === I, n.detectDuplicates = !!d, f(), n.sortDetached = ue(function(e) {
                    return 1 & e.compareDocumentPosition(p.createElement("fieldset"))
                }), ue(function(e) {
                    return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
                }) || de("type|href|height|width", function(e, t, n) {
                    if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
                }), n.attributes && ue(function(e) {
                    return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
                }) || de("value", function(e, t, n) {
                    if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue
                }), ue(function(e) {
                    return null == e.getAttribute("disabled")
                }) || de(x, function(e, t, n) {
                    var r;
                    if (!n) return !0 === e[t] ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
                }), se
            }(n);
        T.find = O, T.expr = O.selectors, T.expr[":"] = T.expr.pseudos, T.uniqueSort = T.unique = O.uniqueSort, T.text = O.getText, T.isXMLDoc = O.isXML, T.contains = O.contains, T.escapeSelector = O.escape;
        var C = function(e, t, n) {
                for (var r = [], i = void 0 !== n;
                    (e = e[t]) && 9 !== e.nodeType;)
                    if (1 === e.nodeType) {
                        if (i && T(e).is(n)) break;
                        r.push(e)
                    }
                return r
            },
            L = function(e, t) {
                for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
                return n
            },
            S = T.expr.match.needsContext;

        function w(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        }
        var N = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

        function R(e, t, n) {
            return v(t) ? T.grep(e, function(e, r) {
                return !!t.call(e, r, e) !== n
            }) : t.nodeType ? T.grep(e, function(e) {
                return e === t !== n
            }) : "string" != typeof t ? T.grep(e, function(e) {
                return u.call(t, e) > -1 !== n
            }) : T.filter(t, e, n)
        }
        T.filter = function(e, t, n) {
            var r = t[0];
            return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? T.find.matchesSelector(r, e) ? [r] : [] : T.find.matches(e, T.grep(t, function(e) {
                return 1 === e.nodeType
            }))
        }, T.fn.extend({
            find: function(e) {
                var t, n, r = this.length,
                    i = this;
                if ("string" != typeof e) return this.pushStack(T(e).filter(function() {
                    for (t = 0; t < r; t++)
                        if (T.contains(i[t], this)) return !0
                }));
                for (n = this.pushStack([]), t = 0; t < r; t++) T.find(e, i[t], n);
                return r > 1 ? T.uniqueSort(n) : n
            },
            filter: function(e) {
                return this.pushStack(R(this, e || [], !1))
            },
            not: function(e) {
                return this.pushStack(R(this, e || [], !0))
            },
            is: function(e) {
                return !!R(this, "string" == typeof e && S.test(e) ? T(e) : e || [], !1).length
            }
        });
        var F, P = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
        (T.fn.init = function(e, t, n) {
            var r, i;
            if (!e) return this;
            if (n = n || F, "string" == typeof e) {
                if (!(r = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : P.exec(e)) || !r[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
                if (r[1]) {
                    if (t = t instanceof T ? t[0] : t, T.merge(this, T.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : y, !0)), N.test(r[1]) && T.isPlainObject(t))
                        for (r in t) v(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                    return this
                }
                return (i = y.getElementById(r[2])) && (this[0] = i, this.length = 1), this
            }
            return e.nodeType ? (this[0] = e, this.length = 1, this) : v(e) ? void 0 !== n.ready ? n.ready(e) : e(T) : T.makeArray(e, this)
        }).prototype = T.fn, F = T(y);
        var k = /^(?:parents|prev(?:Until|All))/,
            D = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };

        function x(e, t) {
            for (;
                (e = e[t]) && 1 !== e.nodeType;);
            return e
        }
        T.fn.extend({
            has: function(e) {
                var t = T(e, this),
                    n = t.length;
                return this.filter(function() {
                    for (var e = 0; e < n; e++)
                        if (T.contains(this, t[e])) return !0
                })
            },
            closest: function(e, t) {
                var n, r = 0,
                    i = this.length,
                    o = [],
                    a = "string" != typeof e && T(e);
                if (!S.test(e))
                    for (; r < i; r++)
                        for (n = this[r]; n && n !== t; n = n.parentNode)
                            if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && T.find.matchesSelector(n, e))) {
                                o.push(n);
                                break
                            }
                return this.pushStack(o.length > 1 ? T.uniqueSort(o) : o)
            },
            index: function(e) {
                return e ? "string" == typeof e ? u.call(T(e), this[0]) : u.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            },
            add: function(e, t) {
                return this.pushStack(T.uniqueSort(T.merge(this.get(), T(e, t))))
            },
            addBack: function(e) {
                return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
            }
        }), T.each({
            parent: function(e) {
                var t = e.parentNode;
                return t && 11 !== t.nodeType ? t : null
            },
            parents: function(e) {
                return C(e, "parentNode")
            },
            parentsUntil: function(e, t, n) {
                return C(e, "parentNode", n)
            },
            next: function(e) {
                return x(e, "nextSibling")
            },
            prev: function(e) {
                return x(e, "previousSibling")
            },
            nextAll: function(e) {
                return C(e, "nextSibling")
            },
            prevAll: function(e) {
                return C(e, "previousSibling")
            },
            nextUntil: function(e, t, n) {
                return C(e, "nextSibling", n)
            },
            prevUntil: function(e, t, n) {
                return C(e, "previousSibling", n)
            },
            siblings: function(e) {
                return L((e.parentNode || {}).firstChild, e)
            },
            children: function(e) {
                return L(e.firstChild)
            },
            contents: function(e) {
                return null != e.contentDocument && a(e.contentDocument) ? e.contentDocument : (w(e, "template") && (e = e.content || e), T.merge([], e.childNodes))
            }
        }, function(e, t) {
            T.fn[e] = function(n, r) {
                var i = T.map(this, t, n);
                return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = T.filter(r, i)), this.length > 1 && (D[e] || T.uniqueSort(i), k.test(e) && i.reverse()), this.pushStack(i)
            }
        });
        var M = /[^\x20\t\r\n\f]+/g;

        function B(e) {
            return e
        }

        function H(e) {
            throw e
        }

        function j(e, t, n, r) {
            var i;
            try {
                e && v(i = e.promise) ? i.call(e).done(t).fail(n) : e && v(i = e.then) ? i.call(e, t, n) : t.apply(void 0, [e].slice(r))
            } catch (e) {
                n.apply(void 0, [e])
            }
        }
        T.Callbacks = function(e) {
            e = "string" == typeof e ? function(e) {
                var t = {};
                return T.each(e.match(M) || [], function(e, n) {
                    t[n] = !0
                }), t
            }(e) : T.extend({}, e);
            var t, n, r, i, o = [],
                a = [],
                s = -1,
                l = function() {
                    for (i = i || e.once, r = t = !0; a.length; s = -1)
                        for (n = a.shift(); ++s < o.length;) !1 === o[s].apply(n[0], n[1]) && e.stopOnFalse && (s = o.length, n = !1);
                    e.memory || (n = !1), t = !1, i && (o = n ? [] : "")
                },
                c = {
                    add: function() {
                        return o && (n && !t && (s = o.length - 1, a.push(n)), function t(n) {
                            T.each(n, function(n, r) {
                                v(r) ? e.unique && c.has(r) || o.push(r) : r && r.length && "string" !== A(r) && t(r)
                            })
                        }(arguments), n && !t && l()), this
                    },
                    remove: function() {
                        return T.each(arguments, function(e, t) {
                            for (var n;
                                (n = T.inArray(t, o, n)) > -1;) o.splice(n, 1), n <= s && s--
                        }), this
                    },
                    has: function(e) {
                        return e ? T.inArray(e, o) > -1 : o.length > 0
                    },
                    empty: function() {
                        return o && (o = []), this
                    },
                    disable: function() {
                        return i = a = [], o = n = "", this
                    },
                    disabled: function() {
                        return !o
                    },
                    lock: function() {
                        return i = a = [], n || t || (o = n = ""), this
                    },
                    locked: function() {
                        return !!i
                    },
                    fireWith: function(e, n) {
                        return i || (n = [e, (n = n || []).slice ? n.slice() : n], a.push(n), t || l()), this
                    },
                    fire: function() {
                        return c.fireWith(this, arguments), this
                    },
                    fired: function() {
                        return !!r
                    }
                };
            return c
        }, T.extend({
            Deferred: function(e) {
                var t = [
                        ["notify", "progress", T.Callbacks("memory"), T.Callbacks("memory"), 2],
                        ["resolve", "done", T.Callbacks("once memory"), T.Callbacks("once memory"), 0, "resolved"],
                        ["reject", "fail", T.Callbacks("once memory"), T.Callbacks("once memory"), 1, "rejected"]
                    ],
                    r = "pending",
                    i = {
                        state: function() {
                            return r
                        },
                        always: function() {
                            return o.done(arguments).fail(arguments), this
                        },
                        catch: function(e) {
                            return i.then(null, e)
                        },
                        pipe: function() {
                            var e = arguments;
                            return T.Deferred(function(n) {
                                T.each(t, function(t, r) {
                                    var i = v(e[r[4]]) && e[r[4]];
                                    o[r[1]](function() {
                                        var e = i && i.apply(this, arguments);
                                        e && v(e.promise) ? e.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[r[0] + "With"](this, i ? [e] : arguments)
                                    })
                                }), e = null
                            }).promise()
                        },
                        then: function(e, r, i) {
                            var o = 0;

                            function a(e, t, r, i) {
                                return function() {
                                    var s = this,
                                        l = arguments,
                                        c = function() {
                                            var n, c;
                                            if (!(e < o)) {
                                                if ((n = r.apply(s, l)) === t.promise()) throw new TypeError("Thenable self-resolution");
                                                c = n && ("object" == typeof n || "function" == typeof n) && n.then, v(c) ? i ? c.call(n, a(o, t, B, i), a(o, t, H, i)) : (o++, c.call(n, a(o, t, B, i), a(o, t, H, i), a(o, t, B, t.notifyWith))) : (r !== B && (s = void 0, l = [n]), (i || t.resolveWith)(s, l))
                                            }
                                        },
                                        u = i ? c : function() {
                                            try {
                                                c()
                                            } catch (n) {
                                                T.Deferred.exceptionHook && T.Deferred.exceptionHook(n, u.stackTrace), e + 1 >= o && (r !== H && (s = void 0, l = [n]), t.rejectWith(s, l))
                                            }
                                        };
                                    e ? u() : (T.Deferred.getStackHook && (u.stackTrace = T.Deferred.getStackHook()), n.setTimeout(u))
                                }
                            }
                            return T.Deferred(function(n) {
                                t[0][3].add(a(0, n, v(i) ? i : B, n.notifyWith)), t[1][3].add(a(0, n, v(e) ? e : B)), t[2][3].add(a(0, n, v(r) ? r : H))
                            }).promise()
                        },
                        promise: function(e) {
                            return null != e ? T.extend(e, i) : i
                        }
                    },
                    o = {};
                return T.each(t, function(e, n) {
                    var a = n[2],
                        s = n[5];
                    i[n[1]] = a.add, s && a.add(function() {
                        r = s
                    }, t[3 - e][2].disable, t[3 - e][3].disable, t[0][2].lock, t[0][3].lock), a.add(n[3].fire), o[n[0]] = function() {
                        return o[n[0] + "With"](this === o ? void 0 : this, arguments), this
                    }, o[n[0] + "With"] = a.fireWith
                }), i.promise(o), e && e.call(o, o), o
            },
            when: function(e) {
                var t = arguments.length,
                    n = t,
                    r = Array(n),
                    i = s.call(arguments),
                    o = T.Deferred(),
                    a = function(e) {
                        return function(n) {
                            r[e] = this, i[e] = arguments.length > 1 ? s.call(arguments) : n, --t || o.resolveWith(r, i)
                        }
                    };
                if (t <= 1 && (j(e, o.done(a(n)).resolve, o.reject, !t), "pending" === o.state() || v(i[n] && i[n].then))) return o.then();
                for (; n--;) j(i[n], a(n), o.reject);
                return o.promise()
            }
        });
        var U = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
        T.Deferred.exceptionHook = function(e, t) {
            n.console && n.console.warn && e && U.test(e.name) && n.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t)
        }, T.readyException = function(e) {
            n.setTimeout(function() {
                throw e
            })
        };
        var Y = T.Deferred();

        function W() {
            y.removeEventListener("DOMContentLoaded", W), n.removeEventListener("load", W), T.ready()
        }
        T.fn.ready = function(e) {
            return Y.then(e).catch(function(e) {
                T.readyException(e)
            }), this
        }, T.extend({
            isReady: !1,
            readyWait: 1,
            ready: function(e) {
                (!0 === e ? --T.readyWait : T.isReady) || (T.isReady = !0, !0 !== e && --T.readyWait > 0 || Y.resolveWith(y, [T]))
            }
        }), T.ready.then = Y.then, "complete" === y.readyState || "loading" !== y.readyState && !y.documentElement.doScroll ? n.setTimeout(T.ready) : (y.addEventListener("DOMContentLoaded", W), n.addEventListener("load", W));
        var V = function(e, t, n, r, i, o, a) {
                var s = 0,
                    l = e.length,
                    c = null == n;
                if ("object" === A(n))
                    for (s in i = !0, n) V(e, t, s, n[s], !0, o, a);
                else if (void 0 !== r && (i = !0, v(r) || (a = !0), c && (a ? (t.call(e, r), t = null) : (c = t, t = function(e, t, n) {
                        return c.call(T(e), n)
                    })), t))
                    for (; s < l; s++) t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
                return i ? e : c ? t.call(e) : l ? t(e[0], n) : o
            },
            G = /^-ms-/,
            K = /-([a-z])/g;

        function q(e, t) {
            return t.toUpperCase()
        }

        function z(e) {
            return e.replace(G, "ms-").replace(K, q)
        }
        var $ = function(e) {
            return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
        };

        function X() {
            this.expando = T.expando + X.uid++
        }
        X.uid = 1, X.prototype = {
            cache: function(e) {
                var t = e[this.expando];
                return t || (t = {}, $(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                    value: t,
                    configurable: !0
                }))), t
            },
            set: function(e, t, n) {
                var r, i = this.cache(e);
                if ("string" == typeof t) i[z(t)] = n;
                else
                    for (r in t) i[z(r)] = t[r];
                return i
            },
            get: function(e, t) {
                return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][z(t)]
            },
            access: function(e, t, n) {
                return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), void 0 !== n ? n : t)
            },
            remove: function(e, t) {
                var n, r = e[this.expando];
                if (void 0 !== r) {
                    if (void 0 !== t) {
                        n = (t = Array.isArray(t) ? t.map(z) : (t = z(t)) in r ? [t] : t.match(M) || []).length;
                        for (; n--;) delete r[t[n]]
                    }(void 0 === t || T.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
                }
            },
            hasData: function(e) {
                var t = e[this.expando];
                return void 0 !== t && !T.isEmptyObject(t)
            }
        };
        var Z = new X,
            Q = new X,
            J = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            ee = /[A-Z]/g;

        function te(e, t, n) {
            var r;
            if (void 0 === n && 1 === e.nodeType)
                if (r = "data-" + t.replace(ee, "-$&").toLowerCase(), "string" == typeof(n = e.getAttribute(r))) {
                    try {
                        n = function(e) {
                            return "true" === e || "false" !== e && ("null" === e ? null : e === +e + "" ? +e : J.test(e) ? JSON.parse(e) : e)
                        }(n)
                    } catch (e) {}
                    Q.set(e, t, n)
                } else n = void 0;
            return n
        }
        T.extend({
            hasData: function(e) {
                return Q.hasData(e) || Z.hasData(e)
            },
            data: function(e, t, n) {
                return Q.access(e, t, n)
            },
            removeData: function(e, t) {
                Q.remove(e, t)
            },
            _data: function(e, t, n) {
                return Z.access(e, t, n)
            },
            _removeData: function(e, t) {
                Z.remove(e, t)
            }
        }), T.fn.extend({
            data: function(e, t) {
                var n, r, i, o = this[0],
                    a = o && o.attributes;
                if (void 0 === e) {
                    if (this.length && (i = Q.get(o), 1 === o.nodeType && !Z.get(o, "hasDataAttrs"))) {
                        for (n = a.length; n--;) a[n] && 0 === (r = a[n].name).indexOf("data-") && (r = z(r.slice(5)), te(o, r, i[r]));
                        Z.set(o, "hasDataAttrs", !0)
                    }
                    return i
                }
                return "object" == typeof e ? this.each(function() {
                    Q.set(this, e)
                }) : V(this, function(t) {
                    var n;
                    if (o && void 0 === t) return void 0 !== (n = Q.get(o, e)) ? n : void 0 !== (n = te(o, e)) ? n : void 0;
                    this.each(function() {
                        Q.set(this, e, t)
                    })
                }, null, t, arguments.length > 1, null, !0)
            },
            removeData: function(e) {
                return this.each(function() {
                    Q.remove(this, e)
                })
            }
        }), T.extend({
            queue: function(e, t, n) {
                var r;
                if (e) return t = (t || "fx") + "queue", r = Z.get(e, t), n && (!r || Array.isArray(n) ? r = Z.access(e, t, T.makeArray(n)) : r.push(n)), r || []
            },
            dequeue: function(e, t) {
                t = t || "fx";
                var n = T.queue(e, t),
                    r = n.length,
                    i = n.shift(),
                    o = T._queueHooks(e, t);
                "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, function() {
                    T.dequeue(e, t)
                }, o)), !r && o && o.empty.fire()
            },
            _queueHooks: function(e, t) {
                var n = t + "queueHooks";
                return Z.get(e, n) || Z.access(e, n, {
                    empty: T.Callbacks("once memory").add(function() {
                        Z.remove(e, [t + "queue", n])
                    })
                })
            }
        }), T.fn.extend({
            queue: function(e, t) {
                var n = 2;
                return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? T.queue(this[0], e) : void 0 === t ? this : this.each(function() {
                    var n = T.queue(this, e, t);
                    T._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && T.dequeue(this, e)
                })
            },
            dequeue: function(e) {
                return this.each(function() {
                    T.dequeue(this, e)
                })
            },
            clearQueue: function(e) {
                return this.queue(e || "fx", [])
            },
            promise: function(e, t) {
                var n, r = 1,
                    i = T.Deferred(),
                    o = this,
                    a = this.length,
                    s = function() {
                        --r || i.resolveWith(o, [o])
                    };
                for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;)(n = Z.get(o[a], e + "queueHooks")) && n.empty && (r++, n.empty.add(s));
                return s(), i.promise(t)
            }
        });
        var ne = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            re = new RegExp("^(?:([+-])=|)(" + ne + ")([a-z%]*)$", "i"),
            ie = ["Top", "Right", "Bottom", "Left"],
            oe = y.documentElement,
            ae = function(e) {
                return T.contains(e.ownerDocument, e)
            },
            se = {
                composed: !0
            };
        oe.getRootNode && (ae = function(e) {
            return T.contains(e.ownerDocument, e) || e.getRootNode(se) === e.ownerDocument
        });
        var le = function(e, t) {
            return "none" === (e = t || e).style.display || "" === e.style.display && ae(e) && "none" === T.css(e, "display")
        };

        function ce(e, t, n, r) {
            var i, o, a = 20,
                s = r ? function() {
                    return r.cur()
                } : function() {
                    return T.css(e, t, "")
                },
                l = s(),
                c = n && n[3] || (T.cssNumber[t] ? "" : "px"),
                u = e.nodeType && (T.cssNumber[t] || "px" !== c && +l) && re.exec(T.css(e, t));
            if (u && u[3] !== c) {
                for (l /= 2, c = c || u[3], u = +l || 1; a--;) T.style(e, t, u + c), (1 - o) * (1 - (o = s() / l || .5)) <= 0 && (a = 0), u /= o;
                u *= 2, T.style(e, t, u + c), n = n || []
            }
            return n && (u = +u || +l || 0, i = n[1] ? u + (n[1] + 1) * n[2] : +n[2], r && (r.unit = c, r.start = u, r.end = i)), i
        }
        var ue = {};

        function de(e) {
            var t, n = e.ownerDocument,
                r = e.nodeName,
                i = ue[r];
            return i || (t = n.body.appendChild(n.createElement(r)), i = T.css(t, "display"), t.parentNode.removeChild(t), "none" === i && (i = "block"), ue[r] = i, i)
        }

        function fe(e, t) {
            for (var n, r, i = [], o = 0, a = e.length; o < a; o++)(r = e[o]).style && (n = r.style.display, t ? ("none" === n && (i[o] = Z.get(r, "display") || null, i[o] || (r.style.display = "")), "" === r.style.display && le(r) && (i[o] = de(r))) : "none" !== n && (i[o] = "none", Z.set(r, "display", n)));
            for (o = 0; o < a; o++) null != i[o] && (e[o].style.display = i[o]);
            return e
        }
        T.fn.extend({
            show: function() {
                return fe(this, !0)
            },
            hide: function() {
                return fe(this)
            },
            toggle: function(e) {
                return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                    le(this) ? T(this).show() : T(this).hide()
                })
            }
        });
        var pe, he, me = /^(?:checkbox|radio)$/i,
            ge = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
            ve = /^$|^module$|\/(?:java|ecma)script/i;
        pe = y.createDocumentFragment().appendChild(y.createElement("div")), (he = y.createElement("input")).setAttribute("type", "radio"), he.setAttribute("checked", "checked"), he.setAttribute("name", "t"), pe.appendChild(he), g.checkClone = pe.cloneNode(!0).cloneNode(!0).lastChild.checked, pe.innerHTML = "<textarea>x</textarea>", g.noCloneChecked = !!pe.cloneNode(!0).lastChild.defaultValue, pe.innerHTML = "<option></option>", g.option = !!pe.lastChild;
        var Ee = {
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };

        function ye(e, t) {
            var n;
            return n = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : [], void 0 === t || t && w(e, t) ? T.merge([e], n) : n
        }

        function Ie(e, t) {
            for (var n = 0, r = e.length; n < r; n++) Z.set(e[n], "globalEval", !t || Z.get(t[n], "globalEval"))
        }
        Ee.tbody = Ee.tfoot = Ee.colgroup = Ee.caption = Ee.thead, Ee.th = Ee.td, g.option || (Ee.optgroup = Ee.option = [1, "<select multiple='multiple'>", "</select>"]);
        var _e = /<|&#?\w+;/;

        function Ae(e, t, n, r, i) {
            for (var o, a, s, l, c, u, d = t.createDocumentFragment(), f = [], p = 0, h = e.length; p < h; p++)
                if ((o = e[p]) || 0 === o)
                    if ("object" === A(o)) T.merge(f, o.nodeType ? [o] : o);
                    else if (_e.test(o)) {
                for (a = a || d.appendChild(t.createElement("div")), s = (ge.exec(o) || ["", ""])[1].toLowerCase(), l = Ee[s] || Ee._default, a.innerHTML = l[1] + T.htmlPrefilter(o) + l[2], u = l[0]; u--;) a = a.lastChild;
                T.merge(f, a.childNodes), (a = d.firstChild).textContent = ""
            } else f.push(t.createTextNode(o));
            for (d.textContent = "", p = 0; o = f[p++];)
                if (r && T.inArray(o, r) > -1) i && i.push(o);
                else if (c = ae(o), a = ye(d.appendChild(o), "script"), c && Ie(a), n)
                for (u = 0; o = a[u++];) ve.test(o.type || "") && n.push(o);
            return d
        }
        var Te = /^([^.]*)(?:\.(.+)|)/;

        function be() {
            return !0
        }

        function Oe() {
            return !1
        }

        function Ce(e, t) {
            return e === function() {
                try {
                    return y.activeElement
                } catch (e) {}
            }() == ("focus" === t)
        }

        function Le(e, t, n, r, i, o) {
            var a, s;
            if ("object" == typeof t) {
                for (s in "string" != typeof n && (r = r || n, n = void 0), t) Le(e, s, n, r, t[s], o);
                return e
            }
            if (null == r && null == i ? (i = n, r = n = void 0) : null == i && ("string" == typeof n ? (i = r, r = void 0) : (i = r, r = n, n = void 0)), !1 === i) i = Oe;
            else if (!i) return e;
            return 1 === o && (a = i, (i = function(e) {
                return T().off(e), a.apply(this, arguments)
            }).guid = a.guid || (a.guid = T.guid++)), e.each(function() {
                T.event.add(this, t, i, r, n)
            })
        }

        function Se(e, t, n) {
            n ? (Z.set(e, t, !1), T.event.add(e, t, {
                namespace: !1,
                handler: function(e) {
                    var r, i, o = Z.get(this, t);
                    if (1 & e.isTrigger && this[t]) {
                        if (o.length)(T.event.special[t] || {}).delegateType && e.stopPropagation();
                        else if (o = s.call(arguments), Z.set(this, t, o), r = n(this, t), this[t](), o !== (i = Z.get(this, t)) || r ? Z.set(this, t, !1) : i = {}, o !== i) return e.stopImmediatePropagation(), e.preventDefault(), i && i.value
                    } else o.length && (Z.set(this, t, {
                        value: T.event.trigger(T.extend(o[0], T.Event.prototype), o.slice(1), this)
                    }), e.stopImmediatePropagation())
                }
            })) : void 0 === Z.get(e, t) && T.event.add(e, t, be)
        }
        T.event = {
            global: {},
            add: function(e, t, n, r, i) {
                var o, a, s, l, c, u, d, f, p, h, m, g = Z.get(e);
                if ($(e))
                    for (n.handler && (n = (o = n).handler, i = o.selector), i && T.find.matchesSelector(oe, i), n.guid || (n.guid = T.guid++), (l = g.events) || (l = g.events = Object.create(null)), (a = g.handle) || (a = g.handle = function(t) {
                            return void 0 !== T && T.event.triggered !== t.type ? T.event.dispatch.apply(e, arguments) : void 0
                        }), c = (t = (t || "").match(M) || [""]).length; c--;) p = m = (s = Te.exec(t[c]) || [])[1], h = (s[2] || "").split(".").sort(), p && (d = T.event.special[p] || {}, p = (i ? d.delegateType : d.bindType) || p, d = T.event.special[p] || {}, u = T.extend({
                        type: p,
                        origType: m,
                        data: r,
                        handler: n,
                        guid: n.guid,
                        selector: i,
                        needsContext: i && T.expr.match.needsContext.test(i),
                        namespace: h.join(".")
                    }, o), (f = l[p]) || ((f = l[p] = []).delegateCount = 0, d.setup && !1 !== d.setup.call(e, r, h, a) || e.addEventListener && e.addEventListener(p, a)), d.add && (d.add.call(e, u), u.handler.guid || (u.handler.guid = n.guid)), i ? f.splice(f.delegateCount++, 0, u) : f.push(u), T.event.global[p] = !0)
            },
            remove: function(e, t, n, r, i) {
                var o, a, s, l, c, u, d, f, p, h, m, g = Z.hasData(e) && Z.get(e);
                if (g && (l = g.events)) {
                    for (c = (t = (t || "").match(M) || [""]).length; c--;)
                        if (p = m = (s = Te.exec(t[c]) || [])[1], h = (s[2] || "").split(".").sort(), p) {
                            for (d = T.event.special[p] || {}, f = l[p = (r ? d.delegateType : d.bindType) || p] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = f.length; o--;) u = f[o], !i && m !== u.origType || n && n.guid !== u.guid || s && !s.test(u.namespace) || r && r !== u.selector && ("**" !== r || !u.selector) || (f.splice(o, 1), u.selector && f.delegateCount--, d.remove && d.remove.call(e, u));
                            a && !f.length && (d.teardown && !1 !== d.teardown.call(e, h, g.handle) || T.removeEvent(e, p, g.handle), delete l[p])
                        } else
                            for (p in l) T.event.remove(e, p + t[c], n, r, !0);
                    T.isEmptyObject(l) && Z.remove(e, "handle events")
                }
            },
            dispatch: function(e) {
                var t, n, r, i, o, a, s = new Array(arguments.length),
                    l = T.event.fix(e),
                    c = (Z.get(this, "events") || Object.create(null))[l.type] || [],
                    u = T.event.special[l.type] || {};
                for (s[0] = l, t = 1; t < arguments.length; t++) s[t] = arguments[t];
                if (l.delegateTarget = this, !u.preDispatch || !1 !== u.preDispatch.call(this, l)) {
                    for (a = T.event.handlers.call(this, l, c), t = 0;
                        (i = a[t++]) && !l.isPropagationStopped();)
                        for (l.currentTarget = i.elem, n = 0;
                            (o = i.handlers[n++]) && !l.isImmediatePropagationStopped();) l.rnamespace && !1 !== o.namespace && !l.rnamespace.test(o.namespace) || (l.handleObj = o, l.data = o.data, void 0 !== (r = ((T.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, s)) && !1 === (l.result = r) && (l.preventDefault(), l.stopPropagation()));
                    return u.postDispatch && u.postDispatch.call(this, l), l.result
                }
            },
            handlers: function(e, t) {
                var n, r, i, o, a, s = [],
                    l = t.delegateCount,
                    c = e.target;
                if (l && c.nodeType && !("click" === e.type && e.button >= 1))
                    for (; c !== this; c = c.parentNode || this)
                        if (1 === c.nodeType && ("click" !== e.type || !0 !== c.disabled)) {
                            for (o = [], a = {}, n = 0; n < l; n++) void 0 === a[i = (r = t[n]).selector + " "] && (a[i] = r.needsContext ? T(i, this).index(c) > -1 : T.find(i, this, null, [c]).length), a[i] && o.push(r);
                            o.length && s.push({
                                elem: c,
                                handlers: o
                            })
                        }
                return c = this, l < t.length && s.push({
                    elem: c,
                    handlers: t.slice(l)
                }), s
            },
            addProp: function(e, t) {
                Object.defineProperty(T.Event.prototype, e, {
                    enumerable: !0,
                    configurable: !0,
                    get: v(t) ? function() {
                        if (this.originalEvent) return t(this.originalEvent)
                    } : function() {
                        if (this.originalEvent) return this.originalEvent[e]
                    },
                    set: function(t) {
                        Object.defineProperty(this, e, {
                            enumerable: !0,
                            configurable: !0,
                            writable: !0,
                            value: t
                        })
                    }
                })
            },
            fix: function(e) {
                return e[T.expando] ? e : new T.Event(e)
            },
            special: {
                load: {
                    noBubble: !0
                },
                click: {
                    setup: function(e) {
                        var t = this || e;
                        return me.test(t.type) && t.click && w(t, "input") && Se(t, "click", be), !1
                    },
                    trigger: function(e) {
                        var t = this || e;
                        return me.test(t.type) && t.click && w(t, "input") && Se(t, "click"), !0
                    },
                    _default: function(e) {
                        var t = e.target;
                        return me.test(t.type) && t.click && w(t, "input") && Z.get(t, "click") || w(t, "a")
                    }
                },
                beforeunload: {
                    postDispatch: function(e) {
                        void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                    }
                }
            }
        }, T.removeEvent = function(e, t, n) {
            e.removeEventListener && e.removeEventListener(t, n)
        }, T.Event = function(e, t) {
            if (!(this instanceof T.Event)) return new T.Event(e, t);
            e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? be : Oe, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && T.extend(this, t), this.timeStamp = e && e.timeStamp || Date.now(), this[T.expando] = !0
        }, T.Event.prototype = {
            constructor: T.Event,
            isDefaultPrevented: Oe,
            isPropagationStopped: Oe,
            isImmediatePropagationStopped: Oe,
            isSimulated: !1,
            preventDefault: function() {
                var e = this.originalEvent;
                this.isDefaultPrevented = be, e && !this.isSimulated && e.preventDefault()
            },
            stopPropagation: function() {
                var e = this.originalEvent;
                this.isPropagationStopped = be, e && !this.isSimulated && e.stopPropagation()
            },
            stopImmediatePropagation: function() {
                var e = this.originalEvent;
                this.isImmediatePropagationStopped = be, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
            }
        }, T.each({
            altKey: !0,
            bubbles: !0,
            cancelable: !0,
            changedTouches: !0,
            ctrlKey: !0,
            detail: !0,
            eventPhase: !0,
            metaKey: !0,
            pageX: !0,
            pageY: !0,
            shiftKey: !0,
            view: !0,
            char: !0,
            code: !0,
            charCode: !0,
            key: !0,
            keyCode: !0,
            button: !0,
            buttons: !0,
            clientX: !0,
            clientY: !0,
            offsetX: !0,
            offsetY: !0,
            pointerId: !0,
            pointerType: !0,
            screenX: !0,
            screenY: !0,
            targetTouches: !0,
            toElement: !0,
            touches: !0,
            which: !0
        }, T.event.addProp), T.each({
            focus: "focusin",
            blur: "focusout"
        }, function(e, t) {
            T.event.special[e] = {
                setup: function() {
                    return Se(this, e, Ce), !1
                },
                trigger: function() {
                    return Se(this, e), !0
                },
                _default: function() {
                    return !0
                },
                delegateType: t
            }
        }), T.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function(e, t) {
            T.event.special[e] = {
                delegateType: t,
                bindType: t,
                handle: function(e) {
                    var n, r = this,
                        i = e.relatedTarget,
                        o = e.handleObj;
                    return i && (i === r || T.contains(r, i)) || (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
                }
            }
        }), T.fn.extend({
            on: function(e, t, n, r) {
                return Le(this, e, t, n, r)
            },
            one: function(e, t, n, r) {
                return Le(this, e, t, n, r, 1)
            },
            off: function(e, t, n) {
                var r, i;
                if (e && e.preventDefault && e.handleObj) return r = e.handleObj, T(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
                if ("object" == typeof e) {
                    for (i in e) this.off(i, t, e[i]);
                    return this
                }
                return !1 !== t && "function" != typeof t || (n = t, t = void 0), !1 === n && (n = Oe), this.each(function() {
                    T.event.remove(this, e, n, t)
                })
            }
        });
        var we = /<script|<style|<link/i,
            Ne = /checked\s*(?:[^=]|=\s*.checked.)/i,
            Re = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

        function Fe(e, t) {
            return w(e, "table") && w(11 !== t.nodeType ? t : t.firstChild, "tr") && T(e).children("tbody")[0] || e
        }

        function Pe(e) {
            return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
        }

        function ke(e) {
            return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"), e
        }

        function De(e, t) {
            var n, r, i, o, a, s;
            if (1 === t.nodeType) {
                if (Z.hasData(e) && (s = Z.get(e).events))
                    for (i in Z.remove(t, "handle events"), s)
                        for (n = 0, r = s[i].length; n < r; n++) T.event.add(t, i, s[i][n]);
                Q.hasData(e) && (o = Q.access(e), a = T.extend({}, o), Q.set(t, a))
            }
        }

        function xe(e, t) {
            var n = t.nodeName.toLowerCase();
            "input" === n && me.test(e.type) ? t.checked = e.checked : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
        }

        function Me(e, t, n, r) {
            t = l(t);
            var i, o, a, s, c, u, d = 0,
                f = e.length,
                p = f - 1,
                h = t[0],
                m = v(h);
            if (m || f > 1 && "string" == typeof h && !g.checkClone && Ne.test(h)) return e.each(function(i) {
                var o = e.eq(i);
                m && (t[0] = h.call(this, i, o.html())), Me(o, t, n, r)
            });
            if (f && (o = (i = Ae(t, e[0].ownerDocument, !1, e, r)).firstChild, 1 === i.childNodes.length && (i = o), o || r)) {
                for (s = (a = T.map(ye(i, "script"), Pe)).length; d < f; d++) c = i, d !== p && (c = T.clone(c, !0, !0), s && T.merge(a, ye(c, "script"))), n.call(e[d], c, d);
                if (s)
                    for (u = a[a.length - 1].ownerDocument, T.map(a, ke), d = 0; d < s; d++) c = a[d], ve.test(c.type || "") && !Z.access(c, "globalEval") && T.contains(u, c) && (c.src && "module" !== (c.type || "").toLowerCase() ? T._evalUrl && !c.noModule && T._evalUrl(c.src, {
                        nonce: c.nonce || c.getAttribute("nonce")
                    }, u) : _(c.textContent.replace(Re, ""), c, u))
            }
            return e
        }

        function Be(e, t, n) {
            for (var r, i = t ? T.filter(t, e) : e, o = 0; null != (r = i[o]); o++) n || 1 !== r.nodeType || T.cleanData(ye(r)), r.parentNode && (n && ae(r) && Ie(ye(r, "script")), r.parentNode.removeChild(r));
            return e
        }
        T.extend({
            htmlPrefilter: function(e) {
                return e
            },
            clone: function(e, t, n) {
                var r, i, o, a, s = e.cloneNode(!0),
                    l = ae(e);
                if (!(g.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || T.isXMLDoc(e)))
                    for (a = ye(s), r = 0, i = (o = ye(e)).length; r < i; r++) xe(o[r], a[r]);
                if (t)
                    if (n)
                        for (o = o || ye(e), a = a || ye(s), r = 0, i = o.length; r < i; r++) De(o[r], a[r]);
                    else De(e, s);
                return (a = ye(s, "script")).length > 0 && Ie(a, !l && ye(e, "script")), s
            },
            cleanData: function(e) {
                for (var t, n, r, i = T.event.special, o = 0; void 0 !== (n = e[o]); o++)
                    if ($(n)) {
                        if (t = n[Z.expando]) {
                            if (t.events)
                                for (r in t.events) i[r] ? T.event.remove(n, r) : T.removeEvent(n, r, t.handle);
                            n[Z.expando] = void 0
                        }
                        n[Q.expando] && (n[Q.expando] = void 0)
                    }
            }
        }), T.fn.extend({
            detach: function(e) {
                return Be(this, e, !0)
            },
            remove: function(e) {
                return Be(this, e)
            },
            text: function(e) {
                return V(this, function(e) {
                    return void 0 === e ? T.text(this) : this.empty().each(function() {
                        1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                    })
                }, null, e, arguments.length)
            },
            append: function() {
                return Me(this, arguments, function(e) {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || Fe(this, e).appendChild(e)
                })
            },
            prepend: function() {
                return Me(this, arguments, function(e) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var t = Fe(this, e);
                        t.insertBefore(e, t.firstChild)
                    }
                })
            },
            before: function() {
                return Me(this, arguments, function(e) {
                    this.parentNode && this.parentNode.insertBefore(e, this)
                })
            },
            after: function() {
                return Me(this, arguments, function(e) {
                    this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                })
            },
            empty: function() {
                for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (T.cleanData(ye(e, !1)), e.textContent = "");
                return this
            },
            clone: function(e, t) {
                return e = null != e && e, t = null == t ? e : t, this.map(function() {
                    return T.clone(this, e, t)
                })
            },
            html: function(e) {
                return V(this, function(e) {
                    var t = this[0] || {},
                        n = 0,
                        r = this.length;
                    if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                    if ("string" == typeof e && !we.test(e) && !Ee[(ge.exec(e) || ["", ""])[1].toLowerCase()]) {
                        e = T.htmlPrefilter(e);
                        try {
                            for (; n < r; n++) 1 === (t = this[n] || {}).nodeType && (T.cleanData(ye(t, !1)), t.innerHTML = e);
                            t = 0
                        } catch (e) {}
                    }
                    t && this.empty().append(e)
                }, null, e, arguments.length)
            },
            replaceWith: function() {
                var e = [];
                return Me(this, arguments, function(t) {
                    var n = this.parentNode;
                    T.inArray(this, e) < 0 && (T.cleanData(ye(this)), n && n.replaceChild(t, this))
                }, e)
            }
        }), T.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(e, t) {
            T.fn[e] = function(e) {
                for (var n, r = [], i = T(e), o = i.length - 1, a = 0; a <= o; a++) n = a === o ? this : this.clone(!0), T(i[a])[t](n), c.apply(r, n.get());
                return this.pushStack(r)
            }
        });
        var He = new RegExp("^(" + ne + ")(?!px)[a-z%]+$", "i"),
            je = function(e) {
                var t = e.ownerDocument.defaultView;
                return t && t.opener || (t = n), t.getComputedStyle(e)
            },
            Ue = function(e, t, n) {
                var r, i, o = {};
                for (i in t) o[i] = e.style[i], e.style[i] = t[i];
                for (i in r = n.call(e), t) e.style[i] = o[i];
                return r
            },
            Ye = new RegExp(ie.join("|"), "i");

        function We(e, t, n) {
            var r, i, o, a, s = e.style;
            return (n = n || je(e)) && ("" !== (a = n.getPropertyValue(t) || n[t]) || ae(e) || (a = T.style(e, t)), !g.pixelBoxStyles() && He.test(a) && Ye.test(t) && (r = s.width, i = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = r, s.minWidth = i, s.maxWidth = o)), void 0 !== a ? a + "" : a
        }

        function Ve(e, t) {
            return {
                get: function() {
                    if (!e()) return (this.get = t).apply(this, arguments);
                    delete this.get
                }
            }
        }! function() {
            function e() {
                if (u) {
                    c.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", u.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", oe.appendChild(c).appendChild(u);
                    var e = n.getComputedStyle(u);
                    r = "1%" !== e.top, l = 12 === t(e.marginLeft), u.style.right = "60%", a = 36 === t(e.right), i = 36 === t(e.width), u.style.position = "absolute", o = 12 === t(u.offsetWidth / 3), oe.removeChild(c), u = null
                }
            }

            function t(e) {
                return Math.round(parseFloat(e))
            }
            var r, i, o, a, s, l, c = y.createElement("div"),
                u = y.createElement("div");
            u.style && (u.style.backgroundClip = "content-box", u.cloneNode(!0).style.backgroundClip = "", g.clearCloneStyle = "content-box" === u.style.backgroundClip, T.extend(g, {
                boxSizingReliable: function() {
                    return e(), i
                },
                pixelBoxStyles: function() {
                    return e(), a
                },
                pixelPosition: function() {
                    return e(), r
                },
                reliableMarginLeft: function() {
                    return e(), l
                },
                scrollboxSize: function() {
                    return e(), o
                },
                reliableTrDimensions: function() {
                    var e, t, r, i;
                    return null == s && (e = y.createElement("table"), t = y.createElement("tr"), r = y.createElement("div"), e.style.cssText = "position:absolute;left:-11111px;border-collapse:separate", t.style.cssText = "border:1px solid", t.style.height = "1px", r.style.height = "9px", r.style.display = "block", oe.appendChild(e).appendChild(t).appendChild(r), i = n.getComputedStyle(t), s = parseInt(i.height, 10) + parseInt(i.borderTopWidth, 10) + parseInt(i.borderBottomWidth, 10) === t.offsetHeight, oe.removeChild(e)), s
                }
            }))
        }();
        var Ge = ["Webkit", "Moz", "ms"],
            Ke = y.createElement("div").style,
            qe = {};

        function ze(e) {
            var t = T.cssProps[e] || qe[e];
            return t || (e in Ke ? e : qe[e] = function(e) {
                for (var t = e[0].toUpperCase() + e.slice(1), n = Ge.length; n--;)
                    if ((e = Ge[n] + t) in Ke) return e
            }(e) || e)
        }
        var $e = /^(none|table(?!-c[ea]).+)/,
            Xe = /^--/,
            Ze = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            Qe = {
                letterSpacing: "0",
                fontWeight: "400"
            };

        function Je(e, t, n) {
            var r = re.exec(t);
            return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t
        }

        function et(e, t, n, r, i, o) {
            var a = "width" === t ? 1 : 0,
                s = 0,
                l = 0;
            if (n === (r ? "border" : "content")) return 0;
            for (; a < 4; a += 2) "margin" === n && (l += T.css(e, n + ie[a], !0, i)), r ? ("content" === n && (l -= T.css(e, "padding" + ie[a], !0, i)), "margin" !== n && (l -= T.css(e, "border" + ie[a] + "Width", !0, i))) : (l += T.css(e, "padding" + ie[a], !0, i), "padding" !== n ? l += T.css(e, "border" + ie[a] + "Width", !0, i) : s += T.css(e, "border" + ie[a] + "Width", !0, i));
            return !r && o >= 0 && (l += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - o - l - s - .5)) || 0), l
        }

        function tt(e, t, n) {
            var r = je(e),
                i = (!g.boxSizingReliable() || n) && "border-box" === T.css(e, "boxSizing", !1, r),
                o = i,
                a = We(e, t, r),
                s = "offset" + t[0].toUpperCase() + t.slice(1);
            if (He.test(a)) {
                if (!n) return a;
                a = "auto"
            }
            return (!g.boxSizingReliable() && i || !g.reliableTrDimensions() && w(e, "tr") || "auto" === a || !parseFloat(a) && "inline" === T.css(e, "display", !1, r)) && e.getClientRects().length && (i = "border-box" === T.css(e, "boxSizing", !1, r), (o = s in e) && (a = e[s])), (a = parseFloat(a) || 0) + et(e, t, n || (i ? "border" : "content"), o, r, a) + "px"
        }

        function nt(e, t, n, r, i) {
            return new nt.prototype.init(e, t, n, r, i)
        }
        T.extend({
            cssHooks: {
                opacity: {
                    get: function(e, t) {
                        if (t) {
                            var n = We(e, "opacity");
                            return "" === n ? "1" : n
                        }
                    }
                }
            },
            cssNumber: {
                animationIterationCount: !0,
                columnCount: !0,
                fillOpacity: !0,
                flexGrow: !0,
                flexShrink: !0,
                fontWeight: !0,
                gridArea: !0,
                gridColumn: !0,
                gridColumnEnd: !0,
                gridColumnStart: !0,
                gridRow: !0,
                gridRowEnd: !0,
                gridRowStart: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {},
            style: function(e, t, n, r) {
                if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                    var i, o, a, s = z(t),
                        l = Xe.test(t),
                        c = e.style;
                    if (l || (t = ze(s)), a = T.cssHooks[t] || T.cssHooks[s], void 0 === n) return a && "get" in a && void 0 !== (i = a.get(e, !1, r)) ? i : c[t];
                    "string" === (o = typeof n) && (i = re.exec(n)) && i[1] && (n = ce(e, t, i), o = "number"), null != n && n == n && ("number" !== o || l || (n += i && i[3] || (T.cssNumber[s] ? "" : "px")), g.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (c[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, r)) || (l ? c.setProperty(t, n) : c[t] = n))
                }
            },
            css: function(e, t, n, r) {
                var i, o, a, s = z(t);
                return Xe.test(t) || (t = ze(s)), (a = T.cssHooks[t] || T.cssHooks[s]) && "get" in a && (i = a.get(e, !0, n)), void 0 === i && (i = We(e, t, r)), "normal" === i && t in Qe && (i = Qe[t]), "" === n || n ? (o = parseFloat(i), !0 === n || isFinite(o) ? o || 0 : i) : i
            }
        }), T.each(["height", "width"], function(e, t) {
            T.cssHooks[t] = {
                get: function(e, n, r) {
                    if (n) return !$e.test(T.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? tt(e, t, r) : Ue(e, Ze, function() {
                        return tt(e, t, r)
                    })
                },
                set: function(e, n, r) {
                    var i, o = je(e),
                        a = !g.scrollboxSize() && "absolute" === o.position,
                        s = (a || r) && "border-box" === T.css(e, "boxSizing", !1, o),
                        l = r ? et(e, t, r, s, o) : 0;
                    return s && a && (l -= Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - parseFloat(o[t]) - et(e, t, "border", !1, o) - .5)), l && (i = re.exec(n)) && "px" !== (i[3] || "px") && (e.style[t] = n, n = T.css(e, t)), Je(0, n, l)
                }
            }
        }), T.cssHooks.marginLeft = Ve(g.reliableMarginLeft, function(e, t) {
            if (t) return (parseFloat(We(e, "marginLeft")) || e.getBoundingClientRect().left - Ue(e, {
                marginLeft: 0
            }, function() {
                return e.getBoundingClientRect().left
            })) + "px"
        }), T.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(e, t) {
            T.cssHooks[e + t] = {
                expand: function(n) {
                    for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; r < 4; r++) i[e + ie[r] + t] = o[r] || o[r - 2] || o[0];
                    return i
                }
            }, "margin" !== e && (T.cssHooks[e + t].set = Je)
        }), T.fn.extend({
            css: function(e, t) {
                return V(this, function(e, t, n) {
                    var r, i, o = {},
                        a = 0;
                    if (Array.isArray(t)) {
                        for (r = je(e), i = t.length; a < i; a++) o[t[a]] = T.css(e, t[a], !1, r);
                        return o
                    }
                    return void 0 !== n ? T.style(e, t, n) : T.css(e, t)
                }, e, t, arguments.length > 1)
            }
        }), T.Tween = nt, nt.prototype = {
            constructor: nt,
            init: function(e, t, n, r, i, o) {
                this.elem = e, this.prop = n, this.easing = i || T.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (T.cssNumber[n] ? "" : "px")
            },
            cur: function() {
                var e = nt.propHooks[this.prop];
                return e && e.get ? e.get(this) : nt.propHooks._default.get(this)
            },
            run: function(e) {
                var t, n = nt.propHooks[this.prop];
                return this.options.duration ? this.pos = t = T.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : nt.propHooks._default.set(this), this
            }
        }, nt.prototype.init.prototype = nt.prototype, nt.propHooks = {
            _default: {
                get: function(e) {
                    var t;
                    return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = T.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0
                },
                set: function(e) {
                    T.fx.step[e.prop] ? T.fx.step[e.prop](e) : 1 !== e.elem.nodeType || !T.cssHooks[e.prop] && null == e.elem.style[ze(e.prop)] ? e.elem[e.prop] = e.now : T.style(e.elem, e.prop, e.now + e.unit)
                }
            }
        }, nt.propHooks.scrollTop = nt.propHooks.scrollLeft = {
            set: function(e) {
                e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
            }
        }, T.easing = {
            linear: function(e) {
                return e
            },
            swing: function(e) {
                return .5 - Math.cos(e * Math.PI) / 2
            },
            _default: "swing"
        }, T.fx = nt.prototype.init, T.fx.step = {};
        var rt, it, ot = /^(?:toggle|show|hide)$/,
            at = /queueHooks$/;

        function st() {
            it && (!1 === y.hidden && n.requestAnimationFrame ? n.requestAnimationFrame(st) : n.setTimeout(st, T.fx.interval), T.fx.tick())
        }

        function lt() {
            return n.setTimeout(function() {
                rt = void 0
            }), rt = Date.now()
        }

        function ct(e, t) {
            var n, r = 0,
                i = {
                    height: e
                };
            for (t = t ? 1 : 0; r < 4; r += 2 - t) i["margin" + (n = ie[r])] = i["padding" + n] = e;
            return t && (i.opacity = i.width = e), i
        }

        function ut(e, t, n) {
            for (var r, i = (dt.tweeners[t] || []).concat(dt.tweeners["*"]), o = 0, a = i.length; o < a; o++)
                if (r = i[o].call(n, t, e)) return r
        }

        function dt(e, t, n) {
            var r, i, o = 0,
                a = dt.prefilters.length,
                s = T.Deferred().always(function() {
                    delete l.elem
                }),
                l = function() {
                    if (i) return !1;
                    for (var t = rt || lt(), n = Math.max(0, c.startTime + c.duration - t), r = 1 - (n / c.duration || 0), o = 0, a = c.tweens.length; o < a; o++) c.tweens[o].run(r);
                    return s.notifyWith(e, [c, r, n]), r < 1 && a ? n : (a || s.notifyWith(e, [c, 1, 0]), s.resolveWith(e, [c]), !1)
                },
                c = s.promise({
                    elem: e,
                    props: T.extend({}, t),
                    opts: T.extend(!0, {
                        specialEasing: {},
                        easing: T.easing._default
                    }, n),
                    originalProperties: t,
                    originalOptions: n,
                    startTime: rt || lt(),
                    duration: n.duration,
                    tweens: [],
                    createTween: function(t, n) {
                        var r = T.Tween(e, c.opts, t, n, c.opts.specialEasing[t] || c.opts.easing);
                        return c.tweens.push(r), r
                    },
                    stop: function(t) {
                        var n = 0,
                            r = t ? c.tweens.length : 0;
                        if (i) return this;
                        for (i = !0; n < r; n++) c.tweens[n].run(1);
                        return t ? (s.notifyWith(e, [c, 1, 0]), s.resolveWith(e, [c, t])) : s.rejectWith(e, [c, t]), this
                    }
                }),
                u = c.props;
            for (! function(e, t) {
                    var n, r, i, o, a;
                    for (n in e)
                        if (i = t[r = z(n)], o = e[n], Array.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), (a = T.cssHooks[r]) && "expand" in a)
                            for (n in o = a.expand(o), delete e[r], o) n in e || (e[n] = o[n], t[n] = i);
                        else t[r] = i
                }(u, c.opts.specialEasing); o < a; o++)
                if (r = dt.prefilters[o].call(c, e, u, c.opts)) return v(r.stop) && (T._queueHooks(c.elem, c.opts.queue).stop = r.stop.bind(r)), r;
            return T.map(u, ut, c), v(c.opts.start) && c.opts.start.call(e, c), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always), T.fx.timer(T.extend(l, {
                elem: e,
                anim: c,
                queue: c.opts.queue
            })), c
        }
        T.Animation = T.extend(dt, {
                tweeners: {
                    "*": [function(e, t) {
                        var n = this.createTween(e, t);
                        return ce(n.elem, e, re.exec(t), n), n
                    }]
                },
                tweener: function(e, t) {
                    v(e) ? (t = e, e = ["*"]) : e = e.match(M);
                    for (var n, r = 0, i = e.length; r < i; r++) n = e[r], dt.tweeners[n] = dt.tweeners[n] || [], dt.tweeners[n].unshift(t)
                },
                prefilters: [function(e, t, n) {
                    var r, i, o, a, s, l, c, u, d = "width" in t || "height" in t,
                        f = this,
                        p = {},
                        h = e.style,
                        m = e.nodeType && le(e),
                        g = Z.get(e, "fxshow");
                    for (r in n.queue || (null == (a = T._queueHooks(e, "fx")).unqueued && (a.unqueued = 0, s = a.empty.fire, a.empty.fire = function() {
                            a.unqueued || s()
                        }), a.unqueued++, f.always(function() {
                            f.always(function() {
                                a.unqueued--, T.queue(e, "fx").length || a.empty.fire()
                            })
                        })), t)
                        if (i = t[r], ot.test(i)) {
                            if (delete t[r], o = o || "toggle" === i, i === (m ? "hide" : "show")) {
                                if ("show" !== i || !g || void 0 === g[r]) continue;
                                m = !0
                            }
                            p[r] = g && g[r] || T.style(e, r)
                        }
                    if ((l = !T.isEmptyObject(t)) || !T.isEmptyObject(p))
                        for (r in d && 1 === e.nodeType && (n.overflow = [h.overflow, h.overflowX, h.overflowY], null == (c = g && g.display) && (c = Z.get(e, "display")), "none" === (u = T.css(e, "display")) && (c ? u = c : (fe([e], !0), c = e.style.display || c, u = T.css(e, "display"), fe([e]))), ("inline" === u || "inline-block" === u && null != c) && "none" === T.css(e, "float") && (l || (f.done(function() {
                                h.display = c
                            }), null == c && (u = h.display, c = "none" === u ? "" : u)), h.display = "inline-block")), n.overflow && (h.overflow = "hidden", f.always(function() {
                                h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2]
                            })), l = !1, p) l || (g ? "hidden" in g && (m = g.hidden) : g = Z.access(e, "fxshow", {
                            display: c
                        }), o && (g.hidden = !m), m && fe([e], !0), f.done(function() {
                            for (r in m || fe([e]), Z.remove(e, "fxshow"), p) T.style(e, r, p[r])
                        })), l = ut(m ? g[r] : 0, r, f), r in g || (g[r] = l.start, m && (l.end = l.start, l.start = 0))
                }],
                prefilter: function(e, t) {
                    t ? dt.prefilters.unshift(e) : dt.prefilters.push(e)
                }
            }), T.speed = function(e, t, n) {
                var r = e && "object" == typeof e ? T.extend({}, e) : {
                    complete: n || !n && t || v(e) && e,
                    duration: e,
                    easing: n && t || t && !v(t) && t
                };
                return T.fx.off ? r.duration = 0 : "number" != typeof r.duration && (r.duration in T.fx.speeds ? r.duration = T.fx.speeds[r.duration] : r.duration = T.fx.speeds._default), null != r.queue && !0 !== r.queue || (r.queue = "fx"), r.old = r.complete, r.complete = function() {
                    v(r.old) && r.old.call(this), r.queue && T.dequeue(this, r.queue)
                }, r
            }, T.fn.extend({
                fadeTo: function(e, t, n, r) {
                    return this.filter(le).css("opacity", 0).show().end().animate({
                        opacity: t
                    }, e, n, r)
                },
                animate: function(e, t, n, r) {
                    var i = T.isEmptyObject(e),
                        o = T.speed(t, n, r),
                        a = function() {
                            var t = dt(this, T.extend({}, e), o);
                            (i || Z.get(this, "finish")) && t.stop(!0)
                        };
                    return a.finish = a, i || !1 === o.queue ? this.each(a) : this.queue(o.queue, a)
                },
                stop: function(e, t, n) {
                    var r = function(e) {
                        var t = e.stop;
                        delete e.stop, t(n)
                    };
                    return "string" != typeof e && (n = t, t = e, e = void 0), t && this.queue(e || "fx", []), this.each(function() {
                        var t = !0,
                            i = null != e && e + "queueHooks",
                            o = T.timers,
                            a = Z.get(this);
                        if (i) a[i] && a[i].stop && r(a[i]);
                        else
                            for (i in a) a[i] && a[i].stop && at.test(i) && r(a[i]);
                        for (i = o.length; i--;) o[i].elem !== this || null != e && o[i].queue !== e || (o[i].anim.stop(n), t = !1, o.splice(i, 1));
                        !t && n || T.dequeue(this, e)
                    })
                },
                finish: function(e) {
                    return !1 !== e && (e = e || "fx"), this.each(function() {
                        var t, n = Z.get(this),
                            r = n[e + "queue"],
                            i = n[e + "queueHooks"],
                            o = T.timers,
                            a = r ? r.length : 0;
                        for (n.finish = !0, T.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                        for (t = 0; t < a; t++) r[t] && r[t].finish && r[t].finish.call(this);
                        delete n.finish
                    })
                }
            }), T.each(["toggle", "show", "hide"], function(e, t) {
                var n = T.fn[t];
                T.fn[t] = function(e, r, i) {
                    return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(ct(t, !0), e, r, i)
                }
            }), T.each({
                slideDown: ct("show"),
                slideUp: ct("hide"),
                slideToggle: ct("toggle"),
                fadeIn: {
                    opacity: "show"
                },
                fadeOut: {
                    opacity: "hide"
                },
                fadeToggle: {
                    opacity: "toggle"
                }
            }, function(e, t) {
                T.fn[e] = function(e, n, r) {
                    return this.animate(t, e, n, r)
                }
            }), T.timers = [], T.fx.tick = function() {
                var e, t = 0,
                    n = T.timers;
                for (rt = Date.now(); t < n.length; t++)(e = n[t])() || n[t] !== e || n.splice(t--, 1);
                n.length || T.fx.stop(), rt = void 0
            }, T.fx.timer = function(e) {
                T.timers.push(e), T.fx.start()
            }, T.fx.interval = 13, T.fx.start = function() {
                it || (it = !0, st())
            }, T.fx.stop = function() {
                it = null
            }, T.fx.speeds = {
                slow: 600,
                fast: 200,
                _default: 400
            }, T.fn.delay = function(e, t) {
                return e = T.fx && T.fx.speeds[e] || e, t = t || "fx", this.queue(t, function(t, r) {
                    var i = n.setTimeout(t, e);
                    r.stop = function() {
                        n.clearTimeout(i)
                    }
                })
            },
            function() {
                var e = y.createElement("input"),
                    t = y.createElement("select").appendChild(y.createElement("option"));
                e.type = "checkbox", g.checkOn = "" !== e.value, g.optSelected = t.selected, (e = y.createElement("input")).value = "t", e.type = "radio", g.radioValue = "t" === e.value
            }();
        var ft, pt = T.expr.attrHandle;
        T.fn.extend({
            attr: function(e, t) {
                return V(this, T.attr, e, t, arguments.length > 1)
            },
            removeAttr: function(e) {
                return this.each(function() {
                    T.removeAttr(this, e)
                })
            }
        }), T.extend({
            attr: function(e, t, n) {
                var r, i, o = e.nodeType;
                if (3 !== o && 8 !== o && 2 !== o) return void 0 === e.getAttribute ? T.prop(e, t, n) : (1 === o && T.isXMLDoc(e) || (i = T.attrHooks[t.toLowerCase()] || (T.expr.match.bool.test(t) ? ft : void 0)), void 0 !== n ? null === n ? void T.removeAttr(e, t) : i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""), n) : i && "get" in i && null !== (r = i.get(e, t)) ? r : null == (r = T.find.attr(e, t)) ? void 0 : r)
            },
            attrHooks: {
                type: {
                    set: function(e, t) {
                        if (!g.radioValue && "radio" === t && w(e, "input")) {
                            var n = e.value;
                            return e.setAttribute("type", t), n && (e.value = n), t
                        }
                    }
                }
            },
            removeAttr: function(e, t) {
                var n, r = 0,
                    i = t && t.match(M);
                if (i && 1 === e.nodeType)
                    for (; n = i[r++];) e.removeAttribute(n)
            }
        }), ft = {
            set: function(e, t, n) {
                return !1 === t ? T.removeAttr(e, n) : e.setAttribute(n, n), n
            }
        }, T.each(T.expr.match.bool.source.match(/\w+/g), function(e, t) {
            var n = pt[t] || T.find.attr;
            pt[t] = function(e, t, r) {
                var i, o, a = t.toLowerCase();
                return r || (o = pt[a], pt[a] = i, i = null != n(e, t, r) ? a : null, pt[a] = o), i
            }
        });
        var ht = /^(?:input|select|textarea|button)$/i,
            mt = /^(?:a|area)$/i;

        function gt(e) {
            return (e.match(M) || []).join(" ")
        }

        function vt(e) {
            return e.getAttribute && e.getAttribute("class") || ""
        }

        function Et(e) {
            return Array.isArray(e) ? e : "string" == typeof e && e.match(M) || []
        }
        T.fn.extend({
            prop: function(e, t) {
                return V(this, T.prop, e, t, arguments.length > 1)
            },
            removeProp: function(e) {
                return this.each(function() {
                    delete this[T.propFix[e] || e]
                })
            }
        }), T.extend({
            prop: function(e, t, n) {
                var r, i, o = e.nodeType;
                if (3 !== o && 8 !== o && 2 !== o) return 1 === o && T.isXMLDoc(e) || (t = T.propFix[t] || t, i = T.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t]
            },
            propHooks: {
                tabIndex: {
                    get: function(e) {
                        var t = T.find.attr(e, "tabindex");
                        return t ? parseInt(t, 10) : ht.test(e.nodeName) || mt.test(e.nodeName) && e.href ? 0 : -1
                    }
                }
            },
            propFix: {
                for: "htmlFor",
                class: "className"
            }
        }), g.optSelected || (T.propHooks.selected = {
            get: function(e) {
                var t = e.parentNode;
                return t && t.parentNode && t.parentNode.selectedIndex, null
            },
            set: function(e) {
                var t = e.parentNode;
                t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
            }
        }), T.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
            T.propFix[this.toLowerCase()] = this
        }), T.fn.extend({
            addClass: function(e) {
                var t, n, r, i, o, a, s, l = 0;
                if (v(e)) return this.each(function(t) {
                    T(this).addClass(e.call(this, t, vt(this)))
                });
                if ((t = Et(e)).length)
                    for (; n = this[l++];)
                        if (i = vt(n), r = 1 === n.nodeType && " " + gt(i) + " ") {
                            for (a = 0; o = t[a++];) r.indexOf(" " + o + " ") < 0 && (r += o + " ");
                            i !== (s = gt(r)) && n.setAttribute("class", s)
                        }
                return this
            },
            removeClass: function(e) {
                var t, n, r, i, o, a, s, l = 0;
                if (v(e)) return this.each(function(t) {
                    T(this).removeClass(e.call(this, t, vt(this)))
                });
                if (!arguments.length) return this.attr("class", "");
                if ((t = Et(e)).length)
                    for (; n = this[l++];)
                        if (i = vt(n), r = 1 === n.nodeType && " " + gt(i) + " ") {
                            for (a = 0; o = t[a++];)
                                for (; r.indexOf(" " + o + " ") > -1;) r = r.replace(" " + o + " ", " ");
                            i !== (s = gt(r)) && n.setAttribute("class", s)
                        }
                return this
            },
            toggleClass: function(e, t) {
                var n = typeof e,
                    r = "string" === n || Array.isArray(e);
                return "boolean" == typeof t && r ? t ? this.addClass(e) : this.removeClass(e) : v(e) ? this.each(function(n) {
                    T(this).toggleClass(e.call(this, n, vt(this), t), t)
                }) : this.each(function() {
                    var t, i, o, a;
                    if (r)
                        for (i = 0, o = T(this), a = Et(e); t = a[i++];) o.hasClass(t) ? o.removeClass(t) : o.addClass(t);
                    else void 0 !== e && "boolean" !== n || ((t = vt(this)) && Z.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || !1 === e ? "" : Z.get(this, "__className__") || ""))
                })
            },
            hasClass: function(e) {
                var t, n, r = 0;
                for (t = " " + e + " "; n = this[r++];)
                    if (1 === n.nodeType && (" " + gt(vt(n)) + " ").indexOf(t) > -1) return !0;
                return !1
            }
        });
        var yt = /\r/g;
        T.fn.extend({
            val: function(e) {
                var t, n, r, i = this[0];
                return arguments.length ? (r = v(e), this.each(function(n) {
                    var i;
                    1 === this.nodeType && (null == (i = r ? e.call(this, n, T(this).val()) : e) ? i = "" : "number" == typeof i ? i += "" : Array.isArray(i) && (i = T.map(i, function(e) {
                        return null == e ? "" : e + ""
                    })), (t = T.valHooks[this.type] || T.valHooks[this.nodeName.toLowerCase()]) && "set" in t && void 0 !== t.set(this, i, "value") || (this.value = i))
                })) : i ? (t = T.valHooks[i.type] || T.valHooks[i.nodeName.toLowerCase()]) && "get" in t && void 0 !== (n = t.get(i, "value")) ? n : "string" == typeof(n = i.value) ? n.replace(yt, "") : null == n ? "" : n : void 0
            }
        }), T.extend({
            valHooks: {
                option: {
                    get: function(e) {
                        var t = T.find.attr(e, "value");
                        return null != t ? t : gt(T.text(e))
                    }
                },
                select: {
                    get: function(e) {
                        var t, n, r, i = e.options,
                            o = e.selectedIndex,
                            a = "select-one" === e.type,
                            s = a ? null : [],
                            l = a ? o + 1 : i.length;
                        for (r = o < 0 ? l : a ? o : 0; r < l; r++)
                            if (((n = i[r]).selected || r === o) && !n.disabled && (!n.parentNode.disabled || !w(n.parentNode, "optgroup"))) {
                                if (t = T(n).val(), a) return t;
                                s.push(t)
                            }
                        return s
                    },
                    set: function(e, t) {
                        for (var n, r, i = e.options, o = T.makeArray(t), a = i.length; a--;)((r = i[a]).selected = T.inArray(T.valHooks.option.get(r), o) > -1) && (n = !0);
                        return n || (e.selectedIndex = -1), o
                    }
                }
            }
        }), T.each(["radio", "checkbox"], function() {
            T.valHooks[this] = {
                set: function(e, t) {
                    if (Array.isArray(t)) return e.checked = T.inArray(T(e).val(), t) > -1
                }
            }, g.checkOn || (T.valHooks[this].get = function(e) {
                return null === e.getAttribute("value") ? "on" : e.value
            })
        }), g.focusin = "onfocusin" in n;
        var It = /^(?:focusinfocus|focusoutblur)$/,
            _t = function(e) {
                e.stopPropagation()
            };
        T.extend(T.event, {
            trigger: function(e, t, r, i) {
                var o, a, s, l, c, u, d, f, h = [r || y],
                    m = p.call(e, "type") ? e.type : e,
                    g = p.call(e, "namespace") ? e.namespace.split(".") : [];
                if (a = f = s = r = r || y, 3 !== r.nodeType && 8 !== r.nodeType && !It.test(m + T.event.triggered) && (m.indexOf(".") > -1 && (g = m.split("."), m = g.shift(), g.sort()), c = m.indexOf(":") < 0 && "on" + m, (e = e[T.expando] ? e : new T.Event(m, "object" == typeof e && e)).isTrigger = i ? 2 : 3, e.namespace = g.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + g.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = r), t = null == t ? [e] : T.makeArray(t, [e]), d = T.event.special[m] || {}, i || !d.trigger || !1 !== d.trigger.apply(r, t))) {
                    if (!i && !d.noBubble && !E(r)) {
                        for (l = d.delegateType || m, It.test(l + m) || (a = a.parentNode); a; a = a.parentNode) h.push(a), s = a;
                        s === (r.ownerDocument || y) && h.push(s.defaultView || s.parentWindow || n)
                    }
                    for (o = 0;
                        (a = h[o++]) && !e.isPropagationStopped();) f = a, e.type = o > 1 ? l : d.bindType || m, (u = (Z.get(a, "events") || Object.create(null))[e.type] && Z.get(a, "handle")) && u.apply(a, t), (u = c && a[c]) && u.apply && $(a) && (e.result = u.apply(a, t), !1 === e.result && e.preventDefault());
                    return e.type = m, i || e.isDefaultPrevented() || d._default && !1 !== d._default.apply(h.pop(), t) || !$(r) || c && v(r[m]) && !E(r) && ((s = r[c]) && (r[c] = null), T.event.triggered = m, e.isPropagationStopped() && f.addEventListener(m, _t), r[m](), e.isPropagationStopped() && f.removeEventListener(m, _t), T.event.triggered = void 0, s && (r[c] = s)), e.result
                }
            },
            simulate: function(e, t, n) {
                var r = T.extend(new T.Event, n, {
                    type: e,
                    isSimulated: !0
                });
                T.event.trigger(r, null, t)
            }
        }), T.fn.extend({
            trigger: function(e, t) {
                return this.each(function() {
                    T.event.trigger(e, t, this)
                })
            },
            triggerHandler: function(e, t) {
                var n = this[0];
                if (n) return T.event.trigger(e, t, n, !0)
            }
        }), g.focusin || T.each({
            focus: "focusin",
            blur: "focusout"
        }, function(e, t) {
            var n = function(e) {
                T.event.simulate(t, e.target, T.event.fix(e))
            };
            T.event.special[t] = {
                setup: function() {
                    var r = this.ownerDocument || this.document || this,
                        i = Z.access(r, t);
                    i || r.addEventListener(e, n, !0), Z.access(r, t, (i || 0) + 1)
                },
                teardown: function() {
                    var r = this.ownerDocument || this.document || this,
                        i = Z.access(r, t) - 1;
                    i ? Z.access(r, t, i) : (r.removeEventListener(e, n, !0), Z.remove(r, t))
                }
            }
        });
        var At = n.location,
            Tt = {
                guid: Date.now()
            },
            bt = /\?/;
        T.parseXML = function(e) {
            var t, r;
            if (!e || "string" != typeof e) return null;
            try {
                t = (new n.DOMParser).parseFromString(e, "text/xml")
            } catch (e) {}
            return r = t && t.getElementsByTagName("parsererror")[0], t && !r || T.error("Invalid XML: " + (r ? T.map(r.childNodes, function(e) {
                return e.textContent
            }).join("\n") : e)), t
        };
        var Ot = /\[\]$/,
            Ct = /\r?\n/g,
            Lt = /^(?:submit|button|image|reset|file)$/i,
            St = /^(?:input|select|textarea|keygen)/i;

        function wt(e, t, n, r) {
            var i;
            if (Array.isArray(t)) T.each(t, function(t, i) {
                n || Ot.test(e) ? r(e, i) : wt(e + "[" + ("object" == typeof i && null != i ? t : "") + "]", i, n, r)
            });
            else if (n || "object" !== A(t)) r(e, t);
            else
                for (i in t) wt(e + "[" + i + "]", t[i], n, r)
        }
        T.param = function(e, t) {
            var n, r = [],
                i = function(e, t) {
                    var n = v(t) ? t() : t;
                    r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n)
                };
            if (null == e) return "";
            if (Array.isArray(e) || e.jquery && !T.isPlainObject(e)) T.each(e, function() {
                i(this.name, this.value)
            });
            else
                for (n in e) wt(n, e[n], t, i);
            return r.join("&")
        }, T.fn.extend({
            serialize: function() {
                return T.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    var e = T.prop(this, "elements");
                    return e ? T.makeArray(e) : this
                }).filter(function() {
                    var e = this.type;
                    return this.name && !T(this).is(":disabled") && St.test(this.nodeName) && !Lt.test(e) && (this.checked || !me.test(e))
                }).map(function(e, t) {
                    var n = T(this).val();
                    return null == n ? null : Array.isArray(n) ? T.map(n, function(e) {
                        return {
                            name: t.name,
                            value: e.replace(Ct, "\r\n")
                        }
                    }) : {
                        name: t.name,
                        value: n.replace(Ct, "\r\n")
                    }
                }).get()
            }
        });
        var Nt = /%20/g,
            Rt = /#.*$/,
            Ft = /([?&])_=[^&]*/,
            Pt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
            kt = /^(?:GET|HEAD)$/,
            Dt = /^\/\//,
            xt = {},
            Mt = {},
            Bt = "*/".concat("*"),
            Ht = y.createElement("a");

        function jt(e) {
            return function(t, n) {
                "string" != typeof t && (n = t, t = "*");
                var r, i = 0,
                    o = t.toLowerCase().match(M) || [];
                if (v(n))
                    for (; r = o[i++];) "+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
            }
        }

        function Ut(e, t, n, r) {
            var i = {},
                o = e === Mt;

            function a(s) {
                var l;
                return i[s] = !0, T.each(e[s] || [], function(e, s) {
                    var c = s(t, n, r);
                    return "string" != typeof c || o || i[c] ? o ? !(l = c) : void 0 : (t.dataTypes.unshift(c), a(c), !1)
                }), l
            }
            return a(t.dataTypes[0]) || !i["*"] && a("*")
        }

        function Yt(e, t) {
            var n, r, i = T.ajaxSettings.flatOptions || {};
            for (n in t) void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
            return r && T.extend(!0, e, r), e
        }
        Ht.href = At.href, T.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: At.href,
                type: "GET",
                isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(At.protocol),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": Bt,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /\bxml\b/,
                    html: /\bhtml/,
                    json: /\bjson\b/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": JSON.parse,
                    "text xml": T.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function(e, t) {
                return t ? Yt(Yt(e, T.ajaxSettings), t) : Yt(T.ajaxSettings, e)
            },
            ajaxPrefilter: jt(xt),
            ajaxTransport: jt(Mt),
            ajax: function(e, t) {
                "object" == typeof e && (t = e, e = void 0), t = t || {};
                var r, i, o, a, s, l, c, u, d, f, p = T.ajaxSetup({}, t),
                    h = p.context || p,
                    m = p.context && (h.nodeType || h.jquery) ? T(h) : T.event,
                    g = T.Deferred(),
                    v = T.Callbacks("once memory"),
                    E = p.statusCode || {},
                    I = {},
                    _ = {},
                    A = "canceled",
                    b = {
                        readyState: 0,
                        getResponseHeader: function(e) {
                            var t;
                            if (c) {
                                if (!a)
                                    for (a = {}; t = Pt.exec(o);) a[t[1].toLowerCase() + " "] = (a[t[1].toLowerCase() + " "] || []).concat(t[2]);
                                t = a[e.toLowerCase() + " "]
                            }
                            return null == t ? null : t.join(", ")
                        },
                        getAllResponseHeaders: function() {
                            return c ? o : null
                        },
                        setRequestHeader: function(e, t) {
                            return null == c && (e = _[e.toLowerCase()] = _[e.toLowerCase()] || e, I[e] = t), this
                        },
                        overrideMimeType: function(e) {
                            return null == c && (p.mimeType = e), this
                        },
                        statusCode: function(e) {
                            var t;
                            if (e)
                                if (c) b.always(e[b.status]);
                                else
                                    for (t in e) E[t] = [E[t], e[t]];
                            return this
                        },
                        abort: function(e) {
                            var t = e || A;
                            return r && r.abort(t), O(0, t), this
                        }
                    };
                if (g.promise(b), p.url = ((e || p.url || At.href) + "").replace(Dt, At.protocol + "//"), p.type = t.method || t.type || p.method || p.type, p.dataTypes = (p.dataType || "*").toLowerCase().match(M) || [""], null == p.crossDomain) {
                    l = y.createElement("a");
                    try {
                        l.href = p.url, l.href = l.href, p.crossDomain = Ht.protocol + "//" + Ht.host != l.protocol + "//" + l.host
                    } catch (e) {
                        p.crossDomain = !0
                    }
                }
                if (p.data && p.processData && "string" != typeof p.data && (p.data = T.param(p.data, p.traditional)), Ut(xt, p, t, b), c) return b;
                for (d in (u = T.event && p.global) && 0 == T.active++ && T.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), p.hasContent = !kt.test(p.type), i = p.url.replace(Rt, ""), p.hasContent ? p.data && p.processData && 0 === (p.contentType || "").indexOf("application/x-www-form-urlencoded") && (p.data = p.data.replace(Nt, "+")) : (f = p.url.slice(i.length), p.data && (p.processData || "string" == typeof p.data) && (i += (bt.test(i) ? "&" : "?") + p.data, delete p.data), !1 === p.cache && (i = i.replace(Ft, "$1"), f = (bt.test(i) ? "&" : "?") + "_=" + Tt.guid++ + f), p.url = i + f), p.ifModified && (T.lastModified[i] && b.setRequestHeader("If-Modified-Since", T.lastModified[i]), T.etag[i] && b.setRequestHeader("If-None-Match", T.etag[i])), (p.data && p.hasContent && !1 !== p.contentType || t.contentType) && b.setRequestHeader("Content-Type", p.contentType), b.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + Bt + "; q=0.01" : "") : p.accepts["*"]), p.headers) b.setRequestHeader(d, p.headers[d]);
                if (p.beforeSend && (!1 === p.beforeSend.call(h, b, p) || c)) return b.abort();
                if (A = "abort", v.add(p.complete), b.done(p.success), b.fail(p.error), r = Ut(Mt, p, t, b)) {
                    if (b.readyState = 1, u && m.trigger("ajaxSend", [b, p]), c) return b;
                    p.async && p.timeout > 0 && (s = n.setTimeout(function() {
                        b.abort("timeout")
                    }, p.timeout));
                    try {
                        c = !1, r.send(I, O)
                    } catch (e) {
                        if (c) throw e;
                        O(-1, e)
                    }
                } else O(-1, "No Transport");

                function O(e, t, a, l) {
                    var d, f, y, I, _, A = t;
                    c || (c = !0, s && n.clearTimeout(s), r = void 0, o = l || "", b.readyState = e > 0 ? 4 : 0, d = e >= 200 && e < 300 || 304 === e, a && (I = function(e, t, n) {
                        for (var r, i, o, a, s = e.contents, l = e.dataTypes;
                            "*" === l[0];) l.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
                        if (r)
                            for (i in s)
                                if (s[i] && s[i].test(r)) {
                                    l.unshift(i);
                                    break
                                }
                        if (l[0] in n) o = l[0];
                        else {
                            for (i in n) {
                                if (!l[0] || e.converters[i + " " + l[0]]) {
                                    o = i;
                                    break
                                }
                                a || (a = i)
                            }
                            o = o || a
                        }
                        if (o) return o !== l[0] && l.unshift(o), n[o]
                    }(p, b, a)), !d && T.inArray("script", p.dataTypes) > -1 && T.inArray("json", p.dataTypes) < 0 && (p.converters["text script"] = function() {}), I = function(e, t, n, r) {
                        var i, o, a, s, l, c = {},
                            u = e.dataTypes.slice();
                        if (u[1])
                            for (a in e.converters) c[a.toLowerCase()] = e.converters[a];
                        for (o = u.shift(); o;)
                            if (e.responseFields[o] && (n[e.responseFields[o]] = t), !l && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = o, o = u.shift())
                                if ("*" === o) o = l;
                                else if ("*" !== l && l !== o) {
                            if (!(a = c[l + " " + o] || c["* " + o]))
                                for (i in c)
                                    if ((s = i.split(" "))[1] === o && (a = c[l + " " + s[0]] || c["* " + s[0]])) {
                                        !0 === a ? a = c[i] : !0 !== c[i] && (o = s[0], u.unshift(s[1]));
                                        break
                                    }
                            if (!0 !== a)
                                if (a && e.throws) t = a(t);
                                else try {
                                    t = a(t)
                                } catch (e) {
                                    return {
                                        state: "parsererror",
                                        error: a ? e : "No conversion from " + l + " to " + o
                                    }
                                }
                        }
                        return {
                            state: "success",
                            data: t
                        }
                    }(p, I, b, d), d ? (p.ifModified && ((_ = b.getResponseHeader("Last-Modified")) && (T.lastModified[i] = _), (_ = b.getResponseHeader("etag")) && (T.etag[i] = _)), 204 === e || "HEAD" === p.type ? A = "nocontent" : 304 === e ? A = "notmodified" : (A = I.state, f = I.data, d = !(y = I.error))) : (y = A, !e && A || (A = "error", e < 0 && (e = 0))), b.status = e, b.statusText = (t || A) + "", d ? g.resolveWith(h, [f, A, b]) : g.rejectWith(h, [b, A, y]), b.statusCode(E), E = void 0, u && m.trigger(d ? "ajaxSuccess" : "ajaxError", [b, p, d ? f : y]), v.fireWith(h, [b, A]), u && (m.trigger("ajaxComplete", [b, p]), --T.active || T.event.trigger("ajaxStop")))
                }
                return b
            },
            getJSON: function(e, t, n) {
                return T.get(e, t, n, "json")
            },
            getScript: function(e, t) {
                return T.get(e, void 0, t, "script")
            }
        }), T.each(["get", "post"], function(e, t) {
            T[t] = function(e, n, r, i) {
                return v(n) && (i = i || r, r = n, n = void 0), T.ajax(T.extend({
                    url: e,
                    type: t,
                    dataType: i,
                    data: n,
                    success: r
                }, T.isPlainObject(e) && e))
            }
        }), T.ajaxPrefilter(function(e) {
            var t;
            for (t in e.headers) "content-type" === t.toLowerCase() && (e.contentType = e.headers[t] || "")
        }), T._evalUrl = function(e, t, n) {
            return T.ajax({
                url: e,
                type: "GET",
                dataType: "script",
                cache: !0,
                async: !1,
                global: !1,
                converters: {
                    "text script": function() {}
                },
                dataFilter: function(e) {
                    T.globalEval(e, t, n)
                }
            })
        }, T.fn.extend({
            wrapAll: function(e) {
                var t;
                return this[0] && (v(e) && (e = e.call(this[0])), t = T(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                    for (var e = this; e.firstElementChild;) e = e.firstElementChild;
                    return e
                }).append(this)), this
            },
            wrapInner: function(e) {
                return v(e) ? this.each(function(t) {
                    T(this).wrapInner(e.call(this, t))
                }) : this.each(function() {
                    var t = T(this),
                        n = t.contents();
                    n.length ? n.wrapAll(e) : t.append(e)
                })
            },
            wrap: function(e) {
                var t = v(e);
                return this.each(function(n) {
                    T(this).wrapAll(t ? e.call(this, n) : e)
                })
            },
            unwrap: function(e) {
                return this.parent(e).not("body").each(function() {
                    T(this).replaceWith(this.childNodes)
                }), this
            }
        }), T.expr.pseudos.hidden = function(e) {
            return !T.expr.pseudos.visible(e)
        }, T.expr.pseudos.visible = function(e) {
            return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
        }, T.ajaxSettings.xhr = function() {
            try {
                return new n.XMLHttpRequest
            } catch (e) {}
        };
        var Wt = {
                0: 200,
                1223: 204
            },
            Vt = T.ajaxSettings.xhr();
        g.cors = !!Vt && "withCredentials" in Vt, g.ajax = Vt = !!Vt, T.ajaxTransport(function(e) {
            var t, r;
            if (g.cors || Vt && !e.crossDomain) return {
                send: function(i, o) {
                    var a, s = e.xhr();
                    if (s.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
                        for (a in e.xhrFields) s[a] = e.xhrFields[a];
                    for (a in e.mimeType && s.overrideMimeType && s.overrideMimeType(e.mimeType), e.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest"), i) s.setRequestHeader(a, i[a]);
                    t = function(e) {
                        return function() {
                            t && (t = r = s.onload = s.onerror = s.onabort = s.ontimeout = s.onreadystatechange = null, "abort" === e ? s.abort() : "error" === e ? "number" != typeof s.status ? o(0, "error") : o(s.status, s.statusText) : o(Wt[s.status] || s.status, s.statusText, "text" !== (s.responseType || "text") || "string" != typeof s.responseText ? {
                                binary: s.response
                            } : {
                                text: s.responseText
                            }, s.getAllResponseHeaders()))
                        }
                    }, s.onload = t(), r = s.onerror = s.ontimeout = t("error"), void 0 !== s.onabort ? s.onabort = r : s.onreadystatechange = function() {
                        4 === s.readyState && n.setTimeout(function() {
                            t && r()
                        })
                    }, t = t("abort");
                    try {
                        s.send(e.hasContent && e.data || null)
                    } catch (e) {
                        if (t) throw e
                    }
                },
                abort: function() {
                    t && t()
                }
            }
        }), T.ajaxPrefilter(function(e) {
            e.crossDomain && (e.contents.script = !1)
        }), T.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /\b(?:java|ecma)script\b/
            },
            converters: {
                "text script": function(e) {
                    return T.globalEval(e), e
                }
            }
        }), T.ajaxPrefilter("script", function(e) {
            void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
        }), T.ajaxTransport("script", function(e) {
            var t, n;
            if (e.crossDomain || e.scriptAttrs) return {
                send: function(r, i) {
                    t = T("<script>").attr(e.scriptAttrs || {}).prop({
                        charset: e.scriptCharset,
                        src: e.url
                    }).on("load error", n = function(e) {
                        t.remove(), n = null, e && i("error" === e.type ? 404 : 200, e.type)
                    }), y.head.appendChild(t[0])
                },
                abort: function() {
                    n && n()
                }
            }
        });
        var Gt, Kt = [],
            qt = /(=)\?(?=&|$)|\?\?/;
        T.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var e = Kt.pop() || T.expando + "_" + Tt.guid++;
                return this[e] = !0, e
            }
        }), T.ajaxPrefilter("json jsonp", function(e, t, r) {
            var i, o, a, s = !1 !== e.jsonp && (qt.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && qt.test(e.data) && "data");
            if (s || "jsonp" === e.dataTypes[0]) return i = e.jsonpCallback = v(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, s ? e[s] = e[s].replace(qt, "$1" + i) : !1 !== e.jsonp && (e.url += (bt.test(e.url) ? "&" : "?") + e.jsonp + "=" + i), e.converters["script json"] = function() {
                return a || T.error(i + " was not called"), a[0]
            }, e.dataTypes[0] = "json", o = n[i], n[i] = function() {
                a = arguments
            }, r.always(function() {
                void 0 === o ? T(n).removeProp(i) : n[i] = o, e[i] && (e.jsonpCallback = t.jsonpCallback, Kt.push(i)), a && v(o) && o(a[0]), a = o = void 0
            }), "script"
        }), g.createHTMLDocument = ((Gt = y.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === Gt.childNodes.length), T.parseHTML = function(e, t, n) {
            return "string" != typeof e ? [] : ("boolean" == typeof t && (n = t, t = !1), t || (g.createHTMLDocument ? ((r = (t = y.implementation.createHTMLDocument("")).createElement("base")).href = y.location.href, t.head.appendChild(r)) : t = y), o = !n && [], (i = N.exec(e)) ? [t.createElement(i[1])] : (i = Ae([e], t, o), o && o.length && T(o).remove(), T.merge([], i.childNodes)));
            var r, i, o
        }, T.fn.load = function(e, t, n) {
            var r, i, o, a = this,
                s = e.indexOf(" ");
            return s > -1 && (r = gt(e.slice(s)), e = e.slice(0, s)), v(t) ? (n = t, t = void 0) : t && "object" == typeof t && (i = "POST"), a.length > 0 && T.ajax({
                url: e,
                type: i || "GET",
                dataType: "html",
                data: t
            }).done(function(e) {
                o = arguments, a.html(r ? T("<div>").append(T.parseHTML(e)).find(r) : e)
            }).always(n && function(e, t) {
                a.each(function() {
                    n.apply(this, o || [e.responseText, t, e])
                })
            }), this
        }, T.expr.pseudos.animated = function(e) {
            return T.grep(T.timers, function(t) {
                return e === t.elem
            }).length
        }, T.offset = {
            setOffset: function(e, t, n) {
                var r, i, o, a, s, l, c = T.css(e, "position"),
                    u = T(e),
                    d = {};
                "static" === c && (e.style.position = "relative"), s = u.offset(), o = T.css(e, "top"), l = T.css(e, "left"), ("absolute" === c || "fixed" === c) && (o + l).indexOf("auto") > -1 ? (a = (r = u.position()).top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(l) || 0), v(t) && (t = t.call(e, n, T.extend({}, s))), null != t.top && (d.top = t.top - s.top + a), null != t.left && (d.left = t.left - s.left + i), "using" in t ? t.using.call(e, d) : u.css(d)
            }
        }, T.fn.extend({
            offset: function(e) {
                if (arguments.length) return void 0 === e ? this : this.each(function(t) {
                    T.offset.setOffset(this, e, t)
                });
                var t, n, r = this[0];
                return r ? r.getClientRects().length ? (t = r.getBoundingClientRect(), n = r.ownerDocument.defaultView, {
                    top: t.top + n.pageYOffset,
                    left: t.left + n.pageXOffset
                }) : {
                    top: 0,
                    left: 0
                } : void 0
            },
            position: function() {
                if (this[0]) {
                    var e, t, n, r = this[0],
                        i = {
                            top: 0,
                            left: 0
                        };
                    if ("fixed" === T.css(r, "position")) t = r.getBoundingClientRect();
                    else {
                        for (t = this.offset(), n = r.ownerDocument, e = r.offsetParent || n.documentElement; e && (e === n.body || e === n.documentElement) && "static" === T.css(e, "position");) e = e.parentNode;
                        e && e !== r && 1 === e.nodeType && ((i = T(e).offset()).top += T.css(e, "borderTopWidth", !0), i.left += T.css(e, "borderLeftWidth", !0))
                    }
                    return {
                        top: t.top - i.top - T.css(r, "marginTop", !0),
                        left: t.left - i.left - T.css(r, "marginLeft", !0)
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var e = this.offsetParent; e && "static" === T.css(e, "position");) e = e.offsetParent;
                    return e || oe
                })
            }
        }), T.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(e, t) {
            var n = "pageYOffset" === t;
            T.fn[e] = function(r) {
                return V(this, function(e, r, i) {
                    var o;
                    if (E(e) ? o = e : 9 === e.nodeType && (o = e.defaultView), void 0 === i) return o ? o[t] : e[r];
                    o ? o.scrollTo(n ? o.pageXOffset : i, n ? i : o.pageYOffset) : e[r] = i
                }, e, r, arguments.length)
            }
        }), T.each(["top", "left"], function(e, t) {
            T.cssHooks[t] = Ve(g.pixelPosition, function(e, n) {
                if (n) return n = We(e, t), He.test(n) ? T(e).position()[t] + "px" : n
            })
        }), T.each({
            Height: "height",
            Width: "width"
        }, function(e, t) {
            T.each({
                padding: "inner" + e,
                content: t,
                "": "outer" + e
            }, function(n, r) {
                T.fn[r] = function(i, o) {
                    var a = arguments.length && (n || "boolean" != typeof i),
                        s = n || (!0 === i || !0 === o ? "margin" : "border");
                    return V(this, function(t, n, i) {
                        var o;
                        return E(t) ? 0 === r.indexOf("outer") ? t["inner" + e] : t.document.documentElement["client" + e] : 9 === t.nodeType ? (o = t.documentElement, Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e])) : void 0 === i ? T.css(t, n, s) : T.style(t, n, i, s)
                    }, t, a ? i : void 0, a)
                }
            })
        }), T.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
            T.fn[t] = function(e) {
                return this.on(t, e)
            }
        }), T.fn.extend({
            bind: function(e, t, n) {
                return this.on(e, null, t, n)
            },
            unbind: function(e, t) {
                return this.off(e, null, t)
            },
            delegate: function(e, t, n, r) {
                return this.on(t, e, n, r)
            },
            undelegate: function(e, t, n) {
                return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
            },
            hover: function(e, t) {
                return this.mouseenter(e).mouseleave(t || e)
            }
        }), T.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(e, t) {
            T.fn[t] = function(e, n) {
                return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
            }
        });
        var zt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        T.proxy = function(e, t) {
            var n, r, i;
            if ("string" == typeof t && (n = e[t], t = e, e = n), v(e)) return r = s.call(arguments, 2), (i = function() {
                return e.apply(t || this, r.concat(s.call(arguments)))
            }).guid = e.guid = e.guid || T.guid++, i
        }, T.holdReady = function(e) {
            e ? T.readyWait++ : T.ready(!0)
        }, T.isArray = Array.isArray, T.parseJSON = JSON.parse, T.nodeName = w, T.isFunction = v, T.isWindow = E, T.camelCase = z, T.type = A, T.now = Date.now, T.isNumeric = function(e) {
            var t = T.type(e);
            return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
        }, T.trim = function(e) {
            return null == e ? "" : (e + "").replace(zt, "")
        }, void 0 === (r = function() {
            return T
        }.apply(t, [])) || (e.exports = r);
        var $t = n.jQuery,
            Xt = n.$;
        return T.noConflict = function(e) {
            return n.$ === T && (n.$ = Xt), e && n.jQuery === T && (n.jQuery = $t), T
        }, void 0 === i && (n.jQuery = n.$ = T), T
    })
}, function(e, t, n) {
    "use strict";
    n.d(t, "c", function() {
        return i
    }), n.d(t, "a", function() {
        return o
    }), n.d(t, "e", function() {
        return a
    }), n.d(t, "b", function() {
        return s
    }), n.d(t, "d", function() {
        return l
    }), n.d(t, "f", function() {
        return c
    });
    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    var r = function(e, t) {
        return (r = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
            })(e, t)
    };

    function i(e, t) {
        function n() {
            this.constructor = e
        }
        r(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    }
    var o = function() {
        return (o = Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++)
                for (var i in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            return e
        }).apply(this, arguments)
    };

    function a(e, t) {
        var n = {};
        for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
        if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
            var i = 0;
            for (r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]])
        }
        return n
    }

    function s(e, t, n, r) {
        return new(n || (n = Promise))(function(i, o) {
            function a(e) {
                try {
                    l(r.next(e))
                } catch (e) {
                    o(e)
                }
            }

            function s(e) {
                try {
                    l(r.throw(e))
                } catch (e) {
                    o(e)
                }
            }

            function l(e) {
                e.done ? i(e.value) : new n(function(t) {
                    t(e.value)
                }).then(a, s)
            }
            l((r = r.apply(e, t || [])).next())
        })
    }

    function l(e, t) {
        var n, r, i, o, a = {
            label: 0,
            sent: function() {
                if (1 & i[0]) throw i[1];
                return i[1]
            },
            trys: [],
            ops: []
        };
        return o = {
            next: s(0),
            throw: s(1),
            return: s(2)
        }, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
            return this
        }), o;

        function s(o) {
            return function(s) {
                return function(o) {
                    if (n) throw new TypeError("Generator is already executing.");
                    for (; a;) try {
                        if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i;
                        switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                            case 0:
                            case 1:
                                i = o;
                                break;
                            case 4:
                                return a.label++, {
                                    value: o[1],
                                    done: !1
                                };
                            case 5:
                                a.label++, r = o[1], o = [0];
                                continue;
                            case 7:
                                o = a.ops.pop(), a.trys.pop();
                                continue;
                            default:
                                if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
                                    a = 0;
                                    continue
                                }
                                if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                    a.label = o[1];
                                    break
                                }
                                if (6 === o[0] && a.label < i[1]) {
                                    a.label = i[1], i = o;
                                    break
                                }
                                if (i && a.label < i[2]) {
                                    a.label = i[2], a.ops.push(o);
                                    break
                                }
                                i[2] && a.ops.pop(), a.trys.pop();
                                continue
                        }
                        o = t.call(e, a)
                    } catch (e) {
                        o = [6, e], r = 0
                    } finally {
                        n = i = 0
                    }
                    if (5 & o[0]) throw o[1];
                    return {
                        value: o[0] ? o[1] : void 0,
                        done: !0
                    }
                }([o, s])
            }
        }
    }

    function c() {
        for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
        var r = Array(e),
            i = 0;
        for (t = 0; t < n; t++)
            for (var o = arguments[t], a = 0, s = o.length; a < s; a++, i++) r[i] = o[a];
        return r
    }
}, function(e, t, n) {
    "use strict";
    var r, i;
    n.d(t, "a", function() {
            return r
        }),
        function(e) {
            e.ApplicationXHtmlFragment = "application/x-html-fragment", e.Document = "document", e.HtmlFragment = "html-fragment", e.HtmlPage = "html-page", e.Image = "image", e.Pdf = "pdf", e.Presentation = "presentation", e.Unknown = "unknown"
        }(r || (r = {})),
        function(e) {
            e.ApplicationXAnnouncement = "application/x-announcement", e.ApplicationXAssignment = "application/x-assignment", e.ApplicationXBook = "application/x-book", e.ApplicationXBookChapter = "application/x-book-chapter", e.ApplicationXDiscussionTopic = "application/x-discussion-topic", e.ApplicationXDocument = "application/x-document", e.ApplicationXFile = "application/x-file", e.ApplicationXFolder = "application/x-folder", e.ApplicationXForum = "application/x-forum", e.ApplicationXGlossary = "application/x-glossary", e.ApplicationXGlossaryEntry = "application/x-glossary-entry", e.ApplicationXHtmlBlock = "application/x-html-block", e.ApplicationXLabel = "application/x-label", e.ApplicationXItem = "application/x-item", e.ApplicationXLearningModule = "application/x-learning-module", e.ApplicationXLesson = "application/x-lesson", e.ApplicationXLessonDescription = "application/x-lesson-description", e.ApplicationXLessonPage = "application/x-lesson-page", e.ApplicationXLinkDiscussionTopic = "application/x-link-discussion-topic", e.ApplicationXLinkWeb = "application/x-link-web", e.ApplicationXLtiLaunch = "application/x-lti-launch", e.ApplicationXModule = "application/x-module", e.ApplicationXPage = "application/x-page", e.ApplicationXPageContent = "application/x-page-content", e.ApplicationXPageIntro = "application/x-page-intro", e.ApplicationXSection = "application/x-section", e.ApplicationXQuiz = "application/x-quiz", e.ApplicationXSyllabus = "application/x-syllabus"
        }(i || (i = {}))
}, function(e, t, n) {
    "use strict";
    n.r(t), n.d(t, "send", function() {
        return o
    }), n.d(t, "sendAndListen", function() {
        return a
    }), n.d(t, "listen", function() {
        return s
    }), n.d(t, "onMessage", function() {
        return l
    });
    var r = !1,
        i = {};

    function o(e, t, n, r) {
        var i = c(t, n, r);
        e.postMessage(JSON.stringify(i), "*")
    }

    function a(e, t, n, r, i) {
        var o = c(t, n),
            a = !1;
        l(function(e) {
            if (!a && e.subject === r && e.responseTo === o.id) return a = !0, i(e.data)
        }), e.postMessage(JSON.stringify(o), "*")
    }

    function s(e, t) {
        r || (r = !0, l(function(e, t) {
            var n = i[e.subject];
            n && n(e.data, e.id, t)
        })), i[e] = t
    }

    function l(e, t) {
        (t = t || window).addEventListener("message", function(t) {
            var n = function(e) {
                var t = null;
                if (e && e.data) try {
                    t = JSON.parse(e.data)
                } catch (e) {}
                return t
            }(t);
            n && e(n, t)
        })
    }

    function c(e, t, n) {
        return t = t || {}, {
            subject: e,
            id: e + "-" + Math.floor(1e6 * Math.random()),
            data: t,
            responseTo: n
        }
    }
}, function(e, t, n) {
    "use strict";
    n.d(t, "b", function() {
        return o
    }), n.d(t, "d", function() {
        return a
    }), n.d(t, "c", function() {
        return s
    }), n.d(t, "a", function() {
        return l
    });
    var r, i = n(0);

    function o(e) {
        var t = [],
            n = [];
        return Object.keys(e).forEach(function(r) {
            t.push(r), n.push(e[r])
        }), [t, n]
    }

    function a(e, t) {
        var n = {};
        return e.forEach(function(e, r) {
            n[e] = t[r]
        }), n
    }

    function s(e) {
        return Object.keys(e).map(function(t) {
            return e[t]
        })
    }

    function l(e) {
        var t = [];
        return e.forEach(function(e) {
            i.c(e) && t.push(e)
        }), t
    }! function(e) {
        e[e.asc = 1] = "asc", e[e.desc = -1] = "desc"
    }(r || (r = {}))
}, function(e, t, n) {
    e.exports = n(44).default
}, function(e, t, n) {
    "use strict";
    n.d(t, "a", function() {
        return i
    });
    var r = n(0),
        i = function() {
            function e(e, t, n, r, i, o, a, s, l, c, u, d, f, p, h, m, g, v) {
                this.id = e, this.type = t, this.mimeType = n, this.size = r, this.isVersioned = i, this.name = o, this.description = a, this.libraryReference = s, this.decorative = l, this.availableAlternativeFormats = c, this.creator = u, this.producer = d, this.seizureRisk = f, this.score = p, this.results = h, this.suggestions = m, this.link = g, this.newAlternativeFormats = v, this.uploadType = "File"
            }
            return e.scoreLabel = function(e) {
                var t = Math.floor(100 * e);
                return t <= 33 ? "low" : t <= 66 ? "medium" : t <= 99 ? "high" : "perfect"
            }, e.fromResponseItem = function(t) {
                var n, i = r.d(t.id, ""),
                    o = r.d(t.type, "other"),
                    a = r.d(t.mimeType, "application/octet-stream"),
                    s = r.d(t.size, 0);
                if ("string" == typeof t.libraryReference) try {
                    n = JSON.parse(t.libraryReference)
                } catch (e) {}
                return new e(i, o, a, s, t.isVersioned, t.name, t.description, n, t.decorative, t.availableAlternativeFormats, t.creator, t.producer, t.seizureRisk, t.score, t.results, t.suggestions, t.link, t.newAlternativeFormats)
            }, e
        }()
}, function(e, t, n) {
    "use strict";
    n.d(t, "a", function() {
        return s
    });
    var r = /[\s!@#$%^&*\(\)_+=-\[\]\{\};':"<>\?,\\.\/-]/g,
        i = /^[a-zA-Z]{1,6}:[/\\][a-zA-Z0-9\-\._~:\\/?#\[\]@!$&'\(\)\*\+,;=% ]*$/g,
        o = /^.*\.[a-zA-Z]{3,4}$/g,
        a = new RegExp("::ally::", "g");
    var s = function() {
        function e() {}
        return e.getAttributeMap = function(t) {
            var n, r, i, o, a = e.splitFragment(t);
            if (void 0 !== a.preFragment && null !== (r = null === (n = a.fragment) || void 0 === n ? void 0 : n.includes("data-ally-user-updated-")) && void 0 !== r && r) {
                var s = null !== (o = null === (i = a.fragment) || void 0 === i ? void 0 : i.split("&amp;")) && void 0 !== o ? o : [];
                return new Map(s.filter(function(e) {
                    return e.includes("data-ally-user-updated-")
                }).map(function(e) {
                    var t = e.split("=");
                    return [t[0].replace("data-ally-user-updated-", ""), t.length > 1 ? decodeURIComponent(t[1]) : ""]
                }))
            }
            return new Map
        }, e.splitFragment = function(e) {
            var t = e.split("&#").join("::ally::").split(/#/).map(function(e) {
                return e.replace(a, "&#")
            });
            return 1 === t.length ? {
                preFragment: t[0]
            } : 2 === t.length ? {
                fragment: t[1],
                preFragment: t[0]
            } : {
                error: "Could not parse fragment"
            }
        }, e.isDefaultDescription = function(e, t) {
            var n = this.normalizeFileName(e).trim(),
                r = this.normalizeFileName(null != t ? t : "").trim(),
                i = this.normalizeFileName(this.baseName(this.sanitize(null != t ? t : ""))).trim();
            return 0 === n.length || this.isUrlToFile(e) || this.isFileName(e) || r === n || i === n
        }, e.normalizeFileName = function(e) {
            return this.sanitize(e.trim().toLowerCase()).replace(r, "")
        }, e.sanitize = function(e) {
            return e.replace(/\u0000/g, "").replace(/\uFEFF/g, "")
        }, e.basePath = function(e) {
            return e.substr(Math.max(e.lastIndexOf("\\"), e.lastIndexOf("/")) + 1)
        }, e.baseName = function(e) {
            var t = this.basePath(e),
                n = t.lastIndexOf(".");
            return -1 === n ? t : t.substring(0, n)
        }, e.isUrlToFile = function(e) {
            return null !== e.trim().match(i)
        }, e.isFileName = function(e) {
            return null !== e.trim().match(o)
        }, e
    }()
}, function(e, t, n) {
    "use strict";
    var r, i = "object" == typeof Reflect ? Reflect : null,
        o = i && "function" == typeof i.apply ? i.apply : function(e, t, n) {
            return Function.prototype.apply.call(e, t, n)
        };
    r = i && "function" == typeof i.ownKeys ? i.ownKeys : Object.getOwnPropertySymbols ? function(e) {
        return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))
    } : function(e) {
        return Object.getOwnPropertyNames(e)
    };
    var a = Number.isNaN || function(e) {
        return e != e
    };

    function s() {
        s.init.call(this)
    }
    e.exports = s, s.EventEmitter = s, s.prototype._events = void 0, s.prototype._eventsCount = 0, s.prototype._maxListeners = void 0;
    var l = 10;

    function c(e) {
        return void 0 === e._maxListeners ? s.defaultMaxListeners : e._maxListeners
    }

    function u(e, t, n, r) {
        var i, o, a, s;
        if ("function" != typeof n) throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof n);
        if (void 0 === (o = e._events) ? (o = e._events = Object.create(null), e._eventsCount = 0) : (void 0 !== o.newListener && (e.emit("newListener", t, n.listener ? n.listener : n), o = e._events), a = o[t]), void 0 === a) a = o[t] = n, ++e._eventsCount;
        else if ("function" == typeof a ? a = o[t] = r ? [n, a] : [a, n] : r ? a.unshift(n) : a.push(n), (i = c(e)) > 0 && a.length > i && !a.warned) {
            a.warned = !0;
            var l = new Error("Possible EventEmitter memory leak detected. " + a.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
            l.name = "MaxListenersExceededWarning", l.emitter = e, l.type = t, l.count = a.length, s = l, console && console.warn && console.warn(s)
        }
        return e
    }

    function d(e, t, n) {
        var r = {
                fired: !1,
                wrapFn: void 0,
                target: e,
                type: t,
                listener: n
            },
            i = function() {
                for (var e = [], t = 0; t < arguments.length; t++) e.push(arguments[t]);
                this.fired || (this.target.removeListener(this.type, this.wrapFn), this.fired = !0, o(this.listener, this.target, e))
            }.bind(r);
        return i.listener = n, r.wrapFn = i, i
    }

    function f(e, t, n) {
        var r = e._events;
        if (void 0 === r) return [];
        var i = r[t];
        return void 0 === i ? [] : "function" == typeof i ? n ? [i.listener || i] : [i] : n ? function(e) {
            for (var t = new Array(e.length), n = 0; n < t.length; ++n) t[n] = e[n].listener || e[n];
            return t
        }(i) : h(i, i.length)
    }

    function p(e) {
        var t = this._events;
        if (void 0 !== t) {
            var n = t[e];
            if ("function" == typeof n) return 1;
            if (void 0 !== n) return n.length
        }
        return 0
    }

    function h(e, t) {
        for (var n = new Array(t), r = 0; r < t; ++r) n[r] = e[r];
        return n
    }
    Object.defineProperty(s, "defaultMaxListeners", {
        enumerable: !0,
        get: function() {
            return l
        },
        set: function(e) {
            if ("number" != typeof e || e < 0 || a(e)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
            l = e
        }
    }), s.init = function() {
        void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0
    }, s.prototype.setMaxListeners = function(e) {
        if ("number" != typeof e || e < 0 || a(e)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
        return this._maxListeners = e, this
    }, s.prototype.getMaxListeners = function() {
        return c(this)
    }, s.prototype.emit = function(e) {
        for (var t = [], n = 1; n < arguments.length; n++) t.push(arguments[n]);
        var r = "error" === e,
            i = this._events;
        if (void 0 !== i) r = r && void 0 === i.error;
        else if (!r) return !1;
        if (r) {
            var a;
            if (t.length > 0 && (a = t[0]), a instanceof Error) throw a;
            var s = new Error("Unhandled error." + (a ? " (" + a.message + ")" : ""));
            throw s.context = a, s
        }
        var l = i[e];
        if (void 0 === l) return !1;
        if ("function" == typeof l) o(l, this, t);
        else {
            var c = l.length,
                u = h(l, c);
            for (n = 0; n < c; ++n) o(u[n], this, t)
        }
        return !0
    }, s.prototype.addListener = function(e, t) {
        return u(this, e, t, !1)
    }, s.prototype.on = s.prototype.addListener, s.prototype.prependListener = function(e, t) {
        return u(this, e, t, !0)
    }, s.prototype.once = function(e, t) {
        if ("function" != typeof t) throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof t);
        return this.on(e, d(this, e, t)), this
    }, s.prototype.prependOnceListener = function(e, t) {
        if ("function" != typeof t) throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof t);
        return this.prependListener(e, d(this, e, t)), this
    }, s.prototype.removeListener = function(e, t) {
        var n, r, i, o, a;
        if ("function" != typeof t) throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof t);
        if (void 0 === (r = this._events)) return this;
        if (void 0 === (n = r[e])) return this;
        if (n === t || n.listener === t) 0 == --this._eventsCount ? this._events = Object.create(null) : (delete r[e], r.removeListener && this.emit("removeListener", e, n.listener || t));
        else if ("function" != typeof n) {
            for (i = -1, o = n.length - 1; o >= 0; o--)
                if (n[o] === t || n[o].listener === t) {
                    a = n[o].listener, i = o;
                    break
                }
            if (i < 0) return this;
            0 === i ? n.shift() : function(e, t) {
                for (; t + 1 < e.length; t++) e[t] = e[t + 1];
                e.pop()
            }(n, i), 1 === n.length && (r[e] = n[0]), void 0 !== r.removeListener && this.emit("removeListener", e, a || t)
        }
        return this
    }, s.prototype.off = s.prototype.removeListener, s.prototype.removeAllListeners = function(e) {
        var t, n, r;
        if (void 0 === (n = this._events)) return this;
        if (void 0 === n.removeListener) return 0 === arguments.length ? (this._events = Object.create(null), this._eventsCount = 0) : void 0 !== n[e] && (0 == --this._eventsCount ? this._events = Object.create(null) : delete n[e]), this;
        if (0 === arguments.length) {
            var i, o = Object.keys(n);
            for (r = 0; r < o.length; ++r) "removeListener" !== (i = o[r]) && this.removeAllListeners(i);
            return this.removeAllListeners("removeListener"), this._events = Object.create(null), this._eventsCount = 0, this
        }
        if ("function" == typeof(t = n[e])) this.removeListener(e, t);
        else if (void 0 !== t)
            for (r = t.length - 1; r >= 0; r--) this.removeListener(e, t[r]);
        return this
    }, s.prototype.listeners = function(e) {
        return f(this, e, !0)
    }, s.prototype.rawListeners = function(e) {
        return f(this, e, !1)
    }, s.listenerCount = function(e, t) {
        return "function" == typeof e.listenerCount ? e.listenerCount(t) : p.call(e, t)
    }, s.prototype.listenerCount = p, s.prototype.eventNames = function() {
        return this._eventsCount > 0 ? r(this._events) : []
    }
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.extend = s, t.indexOf = function(e, t) {
        for (var n = 0, r = e.length; n < r; n++)
            if (e[n] === t) return n;
        return -1
    }, t.escapeExpression = function(e) {
        if ("string" != typeof e) {
            if (e && e.toHTML) return e.toHTML();
            if (null == e) return "";
            if (!e) return e + "";
            e = "" + e
        }
        if (!o.test(e)) return e;
        return e.replace(i, a)
    }, t.isEmpty = function(e) {
        return !e && 0 !== e || !(!u(e) || 0 !== e.length)
    }, t.createFrame = function(e) {
        var t = s({}, e);
        return t._parent = e, t
    }, t.blockParams = function(e, t) {
        return e.path = t, e
    }, t.appendContextPath = function(e, t) {
        return (e ? e + "." : "") + t
    };
    var r = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "`": "&#x60;",
            "=": "&#x3D;"
        },
        i = /[&<>"'`=]/g,
        o = /[&<>"'`=]/;

    function a(e) {
        return r[e]
    }

    function s(e) {
        for (var t = 1; t < arguments.length; t++)
            for (var n in arguments[t]) Object.prototype.hasOwnProperty.call(arguments[t], n) && (e[n] = arguments[t][n]);
        return e
    }
    var l = Object.prototype.toString;
    t.toString = l;
    var c = function(e) {
        return "function" == typeof e
    };
    c(/x/) && (t.isFunction = c = function(e) {
        return "function" == typeof e && "[object Function]" === l.call(e)
    }), t.isFunction = c;
    var u = Array.isArray || function(e) {
        return !(!e || "object" != typeof e) && "[object Array]" === l.call(e)
    };
    t.isArray = u
}, function(e, t, n) {
    var r, i, o;
    i = [n(1)], void 0 === (o = "function" == typeof(r = function(e) {
        return e.ui = e.ui || {}, e.ui.version = "1.12.1"
    }) ? r.apply(t, i) : r) || (e.exports = o)
}, function(e, t, n) {
    "use strict";
    n.d(t, "a", function() {
        return J
    });
    var r, i, o = n(1),
        a = n(0),
        s = function() {
            function e(e, t, n, r, i, s) {
                this.baseUrl = e, this.lmsUrl = r, this.clientId = t, this.auth = i || function() {
                    return Promise.resolve({})
                }, a.c(n) ? this.forceInstructorFeedbackEnabled = n : this.forceInstructorFeedbackEnabled = null, this.jQuery = s || o
            }
            return e.fromConfigObject = function(t) {
                return new e(t.baseUrl, t.clientId, t.forceInstructorFeedbackEnabled, t.lmsUrl, t.auth, t.jQuery)
            }, e
        }(),
        l = n(2);
    ! function(e) {
        e.AlternativeText = "AlternativeText", e.Contrast = "Contrast", e.HeadingsHigherLevel = "HeadingsHigherLevel", e.HeadingsPresence = "HeadingsPresence", e.HeadingsSequential = "HeadingsSequential", e.HeadingsStartAtOne = "HeadingsStartAtOne", e.HtmlBrokenLink = "HtmlBrokenLink", e.HtmlCaption = "HtmlCaption", e.HtmlColorContrast = "HtmlColorContrast", e.HtmlDefinitionList = "HtmlDefinitionList", e.HtmlEmptyHeading = "HtmlEmptyHeading", e.HtmlHasLang = "HtmlHasLang", e.HtmlHeadingOrder = "HtmlHeadingOrder", e.HtmlHeadingsPresence = "HtmlHeadingsPresence", e.HtmlHeadingsStart = "HtmlHeadingsStart", e.HtmlImageAlt = "HtmlImageAlt", e.HtmlImageRedundantAlt = "HtmlImageRedundantAlt", e.HtmlLabel = "HtmlLabel", e.HtmlLinkName = "HtmlLinkName", e.HtmlList = "HtmlList", e.HtmlObjectAlt = "HtmlObjectAlt", e.HtmlTdHasHeader = "HtmlTdHasHeader", e.HtmlEmptyTableHeader = "HtmlEmptyTableHeader", e.HtmlTitle = "HtmlTitle", e.ImageContrast = "ImageContrast", e.ImageDescription = "ImageDescription", e.ImageOcr = "ImageOcr", e.ImageSeizure = "ImageSeizure", e.LanguageCorrect = "LanguageCorrect", e.LanguagePresence = "LanguagePresence", e.Ocred = "Ocred", e.Parsable = "Parsable", e.Scanned = "Scanned", e.Security = "Security", e.TableHeaders = "TableHeaders", e.Tagged = "Tagged", e.Title = "Title"
    }(r || (r = {})),
    function(e) {
        e.Canvas = "Canvas", e.D2l = "D2l", e.Learn = "Learn", e.Moodle = "Moodle", e.Wcm = "Wcm", e.Web = "Web", e.Schoology = "Schoology"
    }(i || (i = {}));
    var c = {
            backgroundColor: "ffffff",
            fontSize: 12,
            headingStart: 1,
            textColor: "000000"
        },
        u = "default";
    var d, f = function() {
        function e(t, n) {
            t = t === u ? n : t, this.r = e.parseSegment(0, t), this.g = e.parseSegment(1, t), this.b = e.parseSegment(2, t)
        }
        return e.parseSegment = function(e, t) {
            return parseInt(3 === t.length ? t.slice(e, 1 + e).repeat(2) : t.slice(2 * e, 2 + 2 * e), 16)
        }, e.prototype.getRelativeLuminance = function() {
            return .2126 * p(this.r) + .7152 * p(this.g) + .0722 * p(this.b)
        }, e
    }();

    function p(e) {
        var t = e / 255;
        return t <= .03928 ? t / 12.92 : Math.pow((t + .055) / 1.055, 2.4)
    }! function(e) {
        e[e.A = 0] = "A", e[e.AA = 1] = "AA", e[e.AAA = 2] = "AAA"
    }(d || (d = {}));
    var h = function() {
        function e(e, t, n, r) {
            this.textColor = e, this.backgroundColor = t, this.fontRatio = n, this.fontWeight = r
        }
        return e.from = function(t) {
            var n = t.split(":"),
                r = n[0],
                i = n[1],
                o = n[2],
                s = n[3];
            if (!(Object(a.c)(r) && Object(a.c)(i) && Object(a.c)(o) && Object(a.c)(s))) throw new Error("Invalid contrast key: " + t);
            var l = parseFloat(o);
            if (isNaN(l)) throw new Error("Invalid fontRatio key: " + t);
            return new e(r, i, l, s)
        }, e.prototype.isWcagAaFailure = function(e) {
            return function(e, t, n, r) {
                var i = e.getRelativeLuminance() + .05,
                    o = t.getRelativeLuminance() + .05,
                    a = Math.max(i, o) / Math.min(i, o),
                    s = n >= 18 || n >= 14 && r;
                if (s && a < 3) return d.AA;
                if (s && a < 4.5) return d.AAA;
                if (a < 4.5) return d.AA;
                if (a < 7) return d.AAA;
                return
            }(new f(this.backgroundColor, e.backgroundColor), new f(this.textColor, e.textColor), e.fontSize * this.fontRatio, "bold" === this.fontWeight) === d.AA
        }, e
    }();
    var m = n(3),
        g = function() {
            this.canPreview = !0
        },
        v = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.name = r.HtmlColorContrast, t.appliesTo = function(e) {
                    return new Set([m.a.HtmlFragment, m.a.HtmlPage])
                }, t
            }
            return Object(l.c)(t, e), t
        }(g),
        E = function() {
            function e(e, t) {
                this.score = e, this.data = t, this.name = new v
            }
            return e.for = function(t, n) {
                var r = 0,
                    i = 0,
                    o = [];
                return Object.entries(t).forEach(function(e) {
                    var t = e[0],
                        a = e[1],
                        s = a.count,
                        c = a.xpaths,
                        u = h.from(t);
                    u.isWcagAaFailure(n) && (c.forEach(function(e) {
                        o.push({
                            details: Object(l.a)({}, u),
                            xpath: e
                        })
                    }), i += s), r += s
                }), new e(0 === r ? 1 : 1 - i / r, {
                    defaultBackgroundColor: n.backgroundColor,
                    defaultTextColor: n.textColor,
                    violations: o
                })
            }, e
        }(),
        y = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.name = r.HtmlHeadingsStart, t.appliesTo = function(e) {
                    switch (e) {
                        case i.Web:
                        case i.Wcm:
                            return new Set;
                        case i.Moodle:
                        case i.Learn:
                        case i.Canvas:
                        case i.D2l:
                        case i.Schoology:
                            return new Set([m.a.HtmlFragment])
                    }
                }, t
            }
            return Object(l.c)(t, e), t
        }(g),
        I = function() {
            function e(e) {
                this.score = e, this.name = new y, this.data = null
            }
            return e.for = function(t, n) {
                var r = n.headingStart,
                    i = Number.parseInt(t[1], 10);
                return isFinite(i) && i === r ? new e(1) : new e(0)
            }, e
        }(),
        _ = function(e, t) {
            this.name = e, this.occurrences = t;
            var n = "violations" in t ? t.violations : {
                    count: 0,
                    xpaths: []
                },
                r = n.count,
                i = n.xpaths,
                o = "passes" in t ? t.passes : 0;
            this.score = o / (r + o), this.data = {
                count: r,
                xpaths: i
            }
        },
        A = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.name = r.HtmlDefinitionList, t.appliesTo = function(e) {
                    return new Set([m.a.HtmlFragment, m.a.HtmlPage])
                }, t
            }
            return Object(l.c)(t, e), t
        }(g),
        T = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.name = r.HtmlEmptyHeading, t.appliesTo = function(e) {
                    return new Set([m.a.HtmlFragment, m.a.HtmlPage])
                }, t
            }
            return Object(l.c)(t, e), t
        }(g),
        b = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.name = r.HtmlEmptyTableHeader, t.appliesTo = function(e) {
                    return new Set([m.a.HtmlFragment, m.a.HtmlPage])
                }, t
            }
            return Object(l.c)(t, e), t
        }(g),
        O = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.name = r.HtmlHasLang, t.appliesTo = function(e) {
                    switch (e) {
                        case i.Web:
                        case i.Wcm:
                            return new Set([m.a.HtmlPage, m.a.HtmlFragment]);
                        case i.Moodle:
                        case i.Learn:
                        case i.Canvas:
                        case i.D2l:
                        case i.Schoology:
                            return new Set([m.a.HtmlPage])
                    }
                }, t
            }
            return Object(l.c)(t, e), t
        }(g),
        C = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.name = r.HtmlHeadingOrder, t.appliesTo = function(e) {
                    return new Set([m.a.HtmlFragment, m.a.HtmlPage])
                }, t
            }
            return Object(l.c)(t, e), t
        }(g),
        L = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.name = r.HtmlHeadingsPresence, t.appliesTo = function(e) {
                    return new Set([m.a.HtmlFragment, m.a.HtmlPage])
                }, t
            }
            return Object(l.c)(t, e), t
        }(g),
        S = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.name = r.HtmlImageAlt, t.appliesTo = function(e) {
                    return new Set([m.a.HtmlFragment, m.a.HtmlPage])
                }, t
            }
            return Object(l.c)(t, e), t
        }(g),
        w = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.name = r.HtmlImageRedundantAlt, t.appliesTo = function(e) {
                    return new Set([m.a.HtmlFragment, m.a.HtmlPage])
                }, t
            }
            return Object(l.c)(t, e), t
        }(g),
        N = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.name = r.HtmlLabel, t.appliesTo = function(e) {
                    return new Set([m.a.HtmlFragment, m.a.HtmlPage])
                }, t
            }
            return Object(l.c)(t, e), t
        }(g),
        R = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.name = r.HtmlLinkName, t.appliesTo = function(e) {
                    return new Set([m.a.HtmlFragment, m.a.HtmlPage])
                }, t
            }
            return Object(l.c)(t, e), t
        }(g),
        F = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.name = r.HtmlList, t.appliesTo = function(e) {
                    return new Set([m.a.HtmlFragment, m.a.HtmlPage])
                }, t
            }
            return Object(l.c)(t, e), t
        }(g),
        P = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.name = r.HtmlObjectAlt, t.appliesTo = function(e) {
                    return new Set([m.a.HtmlFragment, m.a.HtmlPage])
                }, t
            }
            return Object(l.c)(t, e), t
        }(g),
        k = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.name = r.HtmlTdHasHeader, t.appliesTo = function(e) {
                    return new Set([m.a.HtmlFragment, m.a.HtmlPage])
                }, t
            }
            return Object(l.c)(t, e), t
        }(g),
        D = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.name = r.HtmlTitle, t.appliesTo = function(e) {
                    switch (e) {
                        case i.Web:
                        case i.Wcm:
                            return new Set([m.a.HtmlPage, m.a.HtmlFragment]);
                        case i.Moodle:
                        case i.Learn:
                        case i.Canvas:
                        case i.D2l:
                        case i.Schoology:
                            return new Set([m.a.HtmlPage])
                    }
                }, t
            }
            return Object(l.c)(t, e), t
        }(g),
        x = function() {
            function e(e) {
                this.value = e
            }
            return e.prototype.multiply = function(t) {
                return Object(a.c)(this.value) && Object(a.c)(t.value) ? new e(this.value * t.value) : e.NoValue
            }, e.prototype.add = function(t) {
                return Object(a.c)(this.value) && Object(a.c)(t.value) ? new e(this.value + t.value) : e.NoValue
            }, e.NoValue = new e, e
        }();

    function M(e, t) {
        return new Set(Object(l.f)(Array.from(e), Array.from(t)))
    }
    var B = function e(t, n) {
            var r = this;
            void 0 === n && (n = new Set), this.score = t, this.ruleNames = n, this.multiply = function(t) {
                return new e(r.score.multiply(t.score), M(r.ruleNames, t.ruleNames))
            }, this.add = function(t) {
                return new e(r.score.add(t.score), M(r.ruleNames, t.ruleNames))
            }, this.retain = function(t) {
                return new e(t.score, M(r.ruleNames, t.ruleNames))
            }
        },
        H = function() {
            function e(e) {
                this.name = e
            }
            return e.prototype.calculate = function(e) {
                var t = this,
                    n = e.find(function(e) {
                        return e.name === t.name
                    });
                return Object(a.c)(n) ? 1 === n.score ? new B(new x(1)) : new B(new x(n.score), new Set([this.name])) : new B(x.NoValue)
            }, e
        }(),
        j = function() {
            function e(e, t) {
                this.score = e, this.value = t
            }
            return e.fromRuleName = function(t, n) {
                return new e(new H(t), n)
            }, e.prototype.calculate = function(e) {
                var t = this.score.calculate(e);
                return Object(a.c)(t.score.value) ? t : 1 === this.value ? new B(new x(1)) : new B(new x(this.value), t.ruleNames)
            }, e
        }(),
        U = function(e) {
            function t() {
                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                return e.apply(this, Object(l.f)([0], t)) || this
            }
            return Object(l.c)(t, e), t
        }(function() {
            function e(e) {
                for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
                this.fallback = e, this.scores = t
            }
            return e.prototype.calculate = function(e) {
                var t = this.recoveredScores();
                return 0 === t.length ? Object(a.d)(Object(a.f)(this.fallback, function(e) {
                    return new B(new x(e))
                }), new B(x.NoValue)) : t.map(function(t) {
                    return t.calculate(e)
                }).reduce(function(e, t) {
                    return e.multiply(t)
                })
            }, e.prototype.recoveredScores = function() {
                var e = this;
                return Object(a.d)(Object(a.f)(this.fallback, function(t) {
                    return e.scores.map(function(e) {
                        return new j(e, t)
                    })
                }), this.scores)
            }, e
        }()),
        Y = function() {
            function e() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                this.scores = e
            }
            return e.prototype.calculate = function(e) {
                for (var t = [], n = [], r = 0, i = this.scores; r < i.length; r++) {
                    var o = i[r],
                        s = o[0],
                        l = o[1];
                    if (0 === s) n.push(0), t.push(new B(new x(0), l.calculate(e).ruleNames));
                    else {
                        var c = l.calculate(e);
                        Object(a.c)(c.score.value) && (n.push(s), t.push(new B(c.score.multiply(new x(s)), c.ruleNames)))
                    }
                }
                if (0 === t.length && 0 === n.length) return new B(x.NoValue);
                var u = n.reduce(function(e, t) {
                        return e + t
                    }, 0),
                    d = t.reduce(function(e, t) {
                        return e.add(t)
                    });
                return new B(new x(Object(a.d)(Object(a.f)(d.score.value, function(e) {
                    return e / u
                }), void 0)), d.ruleNames)
            }, e
        }(),
        W = new U(j.fromRuleName(r.HtmlColorContrast, 1), j.fromRuleName(r.HtmlBrokenLink, 1), new Y([25, j.fromRuleName(r.HtmlHeadingsPresence, 1)], [6, j.fromRuleName(r.HtmlEmptyHeading, 1)], [2, j.fromRuleName(r.HtmlHeadingsStart, 1)], [2, j.fromRuleName(r.HtmlHeadingOrder, 1)], [25, j.fromRuleName(r.HtmlImageAlt, 1)], [5, j.fromRuleName(r.HtmlObjectAlt, 1)], [5, j.fromRuleName(r.HtmlImageRedundantAlt, 1)], [0, j.fromRuleName(r.HtmlCaption, 1)], [10, j.fromRuleName(r.HtmlTdHasHeader, 1)], [5, j.fromRuleName(r.HtmlEmptyTableHeader, 1)], [5, j.fromRuleName(r.HtmlLinkName, 1)], [4, j.fromRuleName(r.HtmlLabel, 1)], [2, j.fromRuleName(r.HtmlTitle, 1)], [2, j.fromRuleName(r.HtmlHasLang, 1)], [1, j.fromRuleName(r.HtmlList, 1)], [1, j.fromRuleName(r.HtmlDefinitionList, 1)])),
        V = new Map([
            ["definition-list", new A],
            ["document-title", new D],
            ["empty-heading", new T],
            ["heading-order", new C],
            ["html-has-lang", new O],
            ["image-alt", new S],
            ["image-redundant-alt", new w],
            ["label", new N],
            ["link-name", new R],
            ["list", new F],
            ["object-alt", new P],
            ["td-has-header", new k],
            ["empty-table-header", new b],
            ["ally-headings-presence", new L]
        ]);

    function G(e, t, n) {
        var r = function(e, t) {
                switch (t) {
                    case m.a.HtmlFragment:
                    case m.a.HtmlPage:
                        return W;
                    default:
                        throw new Error("Not implemented")
                }
            }(0, t),
            i = r.calculate(n),
            o = {};
        return i.ruleNames.forEach(function(e) {
            o[e] = r.calculate(Object(l.f)(n.filter(function(t) {
                return t.name !== e
            }), [{
                name: e,
                score: 1
            }])).score.value
        }), {
            results: n.reduce(function(e, t) {
                var n = t.name,
                    r = t.score;
                return e[n] = r, e
            }, {}),
            score: i.score.value,
            suggestions: o
        }
    }

    function K(e, t, n) {
        var o = Object.entries(n.resultData).map(function(e) {
                var t = e[0],
                    n = e[1],
                    r = V.get(t),
                    i = "violations" in n ? n.violations.count : 0;
                if (Object(a.c)(r) && 0 !== i) return new _(r, n)
            }).filter(a.c),
            s = function(e) {
                switch (e) {
                    case i.Canvas:
                        return Object(l.a)(Object(l.a)({}, c), {
                            headingStart: 2
                        });
                    case i.Moodle:
                        return Object(l.a)(Object(l.a)({}, c), {
                            headingStart: 3
                        });
                    case i.Learn:
                        return Object(l.a)(Object(l.a)({}, c), {
                            headingStart: 4
                        });
                    default:
                        return c
                }
            }(e);
        Object(a.f)(n.headingTags[0], function(e) {
            return o.push(I.for(e, s))
        }), Object(a.f)(n.contrastData, function(e) {
            return o.push(E.for(e, s))
        });
        for (var u = [], d = Object.values(r).filter(function(e) {
                return e.startsWith("Html")
            }).reduce(function(e, t) {
                var n;
                return Object(l.a)(Object(l.a)({}, e), ((n = {})[t] = null, n))
            }, {}), f = 0, p = o; f < p.length; f++) {
            var h = p[f],
                m = h.name,
                g = h.score,
                v = h.data,
                y = m.name;
            m.appliesTo(e).has(t) && (u.push({
                name: y,
                score: g
            }), d[y] = v)
        }
        return {
            explanationData: d,
            feedback: G(0, t, u)
        }
    }
    var q = function() {
            function e(e, t) {
                this.lmsType = t, this.config = s.fromConfigObject(e), this.jQuery = this.config.jQuery
            }
            return e.prototype.generateAxeFeedback = function(e) {
                return Promise.resolve(K(this.lmsType, m.a.HtmlFragment, e))
            }, e.prototype.getClientInfo = function(e) {
                return Promise.resolve({
                    flags: {
                        ifLaunchFromWysiwyg: !0,
                        nativeWysiwygAxEnabled: !1
                    }
                })
            }, e.prototype.applyWysiwygFix = function(e, t, n) {
                return Promise.reject("Not supported.")
            }, e.prototype.authenticate = function(e) {
                return Promise.reject("Not supported.")
            }, e.prototype.authenticateAndExec = function(e) {
                return Promise.reject("Not supported.")
            }, e.prototype.getFileReports = function(e, t) {
                return Promise.reject("Not supported.")
            }, e.prototype.clearAllFromCache = function() {}, e.prototype.clearFileIdFromCache = function(e) {}, e
        }(),
        z = n(5),
        $ = n(7);
    var X = function(e) {
            function t(t, n) {
                var r = e.call(this, "Unable to execute request. (code=" + t + ", text=" + n + ")") || this;
                return r.code = t, r.responseText = n, r
            }
            return Object(l.c)(t, e), t
        }(Error),
        Z = function() {
            function e(e, t, n, r, i, o, a, s, l, c, u) {
                this.id = e, this.type = t, this.mimeType = n, this.size = r, this.name = i, this.availableAlternativeFormats = o, this.score = a, this.results = s, this.suggestions = l, this.link = c, this.newAlternativeFormats = u, this.uploadType = "RichContent"
            }
            return e.fromResponseItem = function(t) {
                return new e(a.d(t.id, ""), a.d(t.type, "other"), a.d(t.mimeType, "application/octet-stream"), a.d(t.size, 0), t.name, t.availableAlternativeFormats, t.score, t.results, t.suggestions, t.link, t.newAlternativeFormats)
            }, e
        }(),
        Q = function() {
            function e(e, t) {
                this.config = e, this.platformName = t, this.config = e, this.cache = {}, this.jQuery = e.jQuery
            }
            return e.prototype.getFileReports = function(e, t) {
                var n = this,
                    r = this.getCachedFileReports(e, t),
                    i = r[0],
                    o = r[1];
                return 0 === Object.keys(o).length ? Promise.resolve(i) : this.getFileReports0(e, o).then(function(r) {
                    return Object.keys(o).forEach(function(t) {
                        var i = o[t];
                        n.cache[e] = e in n.cache ? n.cache[e] : {}, n.cache[e][n.getUploadReferenceCacheKey(i)] = r[t]
                    }), n.getCachedFileReports(e, t)[0]
                })
            }, e.prototype.generateAxeFeedback = function(e) {
                var t = "/api/v1/" + this.config.clientId + "/content/generateFeedback/axe",
                    n = {
                        contentType: "application/json",
                        data: JSON.stringify(e),
                        method: "POST",
                        url: t
                    };
                return this.authenticateAndExec(n)
            }, e.prototype.applyWysiwygFix = function(e, t, n) {
                var r = encodeURIComponent(t),
                    i = "/api/v1/" + this.config.clientId + "/content/course/" + e + "/applyFix/" + r,
                    o = {
                        contentType: "application/json",
                        data: JSON.stringify(n),
                        method: "POST",
                        url: i
                    };
                return this.authenticateAndExec(o)
            }, e.prototype.getClientInfo = function(e) {
                return a.c(e) ? this.authenticateAndExec({
                    data: {
                        courseId: encodeURIComponent(e)
                    },
                    method: "GET",
                    url: "/api/v1/" + this.config.clientId
                }) : this.authenticateAndExec({
                    method: "GET",
                    url: "/api/v1/" + this.config.clientId
                })
            }, e.prototype.clearFileIdFromCache = function(e) {
                var t = this;
                Object.keys(this.cache).forEach(function(n) {
                    Object.keys(t.cache[n]).forEach(function(r) {
                        t.getExternalIdFromReferenceCacheKey(r) === e && delete t.cache[n][r]
                    })
                })
            }, e.prototype.clearAllFromCache = function() {
                this.cache = {}
            }, e.prototype.authenticateAndExec = function(e) {
                var t = this;
                return this.authenticate(e).then(function(e) {
                    return new Promise(function(n, r) {
                        e.error = function(e) {
                            return r(new X(e.status, e.responseText))
                        }, e.success = n, t.jQuery.ajax(e)
                    })
                })
            }, e.prototype.authenticate = function(e) {
                var t = this;
                return Promise.resolve(this.extractAuthResourceEid(e)).then(function(e) {
                    return t.auth(e)
                }).then(function(n) {
                    var r = Object(l.a)({}, e);
                    return e.headers ? r.headers = Object(l.a)({}, e.headers) : r.headers = {}, r.url = t.getFullUrlFromPath(e.url), a.c(n.bearer) && (r.headers.Authorization = "Bearer " + n.bearer), r
                })
            }, e.prototype.auth = function(e) {
                var t = this;
                return new Promise(function(n, r) {
                    var i = t.config.auth(e, function(e, t) {
                        e ? r(e) : n(a.d(t, {}))
                    });
                    i && (i.then(n), i.catch(r))
                })
            }, e.prototype.getCachedFileReports = function(e, t) {
                var n = this,
                    r = {},
                    i = {};
                return Object.keys(t).forEach(function(o) {
                    var a = t[o],
                        s = n.getUploadReferenceCacheKey(a);
                    e in n.cache && s in n.cache[e] ? r[o] = n.cache[e][s] : i[o] = a
                }), [r, i]
            }, e.prototype.getFileReports0 = function(e, t) {
                return "AaaS" === this.platformName ? this.getAaasFileReports0(t) : this.getLmsFileReports0(e, t)
            }, e.prototype.getLmsFileReports0 = function(e, t) {
                var n = z.b(t),
                    r = n[0],
                    i = n[1],
                    o = ["/api/v1", this.config.clientId, "reports/courses", encodeURIComponent(e), "content"].join("/");
                a.c(this.config.forceInstructorFeedbackEnabled) && (o += "?forceInstructorFeedbackEnabled=" + this.config.forceInstructorFeedbackEnabled);
                var s = {
                    contentType: "application/json",
                    data: JSON.stringify(i),
                    method: "POST",
                    url: o
                };
                return this.authenticateAndExec(s).then(function(e) {
                    var t = e.uploadsReport.map(function(e) {
                        return a.c(e) ? "RichContent" === e.uploadType ? Z.fromResponseItem(e) : $.a.fromResponseItem(e) : null
                    });
                    return z.d(r, t)
                })
            }, e.prototype.getAaasFileReports0 = function(e) {
                var t = z.b(e),
                    n = t[0],
                    r = {
                        references: t[1].map(function(e) {
                            return {
                                hash: e.id
                            }
                        })
                    },
                    i = ["/api/v2/clients", this.config.clientId, "content/batch?formats=true"].join("/"),
                    o = {
                        contentType: "application/json",
                        data: JSON.stringify(r),
                        method: "POST",
                        url: i
                    };
                return this.authenticateAndExec(o).then(function(e) {
                    var t = e.reports.map(function(e) {
                        return a.c(e) ? function(e) {
                            var t, n, r, i, o, s, l, c, u = null === (n = null === (t = e.feedback) || void 0 === t ? void 0 : t.report) || void 0 === n ? void 0 : n.results;
                            return a.c(u) && (c = {}, Object.keys(u).forEach(function(e) {
                                c[e] = u[e].score
                            })), new $.a(e.hash, e.metadata.fileType, e.metadata.mimeType, 0, void 0, e.metadata.name, a.d(e.metadata.description, void 0), a.d(e.metadata.libraryReference, void 0), a.d(e.metadata.decorative, void 0), a.d(null === (r = e.formats) || void 0 === r ? void 0 : r.availableFormats, void 0), void 0, void 0, void 0, null === (o = null === (i = e.feedback) || void 0 === i ? void 0 : i.report) || void 0 === o ? void 0 : o.score, c, null === (l = null === (s = e.feedback) || void 0 === s ? void 0 : s.report) || void 0 === l ? void 0 : l.suggestions, void 0)
                        }(e) : null
                    });
                    return z.d(n, t)
                })
            }, e.prototype.extractAuthResourceEid = function(e) {
                for (var t = e.url, n = 0, r = [/^\/api\/v1\/[\d]+\/formats\/[^\/]+\/([^\/]+)\/[^\/]+$/, /^\/api\/v2\/clients\/[\d]+\/courses\/[\d]+\/files\/([^\/]+)\/report$/, /^\/api\/v2\/clients\/[\d]+\/courses\/[\d]+\/rich-content\/([^\/]+)\/report$/, /^\/api\/v2\/clients\/[\d]+\/content\/((?!batch).*)[\?|$]/]; n < r.length; n++) {
                    var i = r[n].exec(t);
                    if (i) return i[1]
                }
                return /\/api\/v1\/[\d]+\/content\/convert/.test(t) ? this.getAaasContentHashFromContentConvertDownload(e.data) : null
            }, e.prototype.getFullUrlFromPath = function(e) {
                return "" + this.config.baseUrl + e
            }, e.prototype.getAaasContentHashFromContentConvertDownload = function(e) {
                if ("string" == typeof e) try {
                    return JSON.parse(e).download.contentHash
                } catch (e) {
                    return null
                }
                return null
            }, e.prototype.getUploadReferenceCacheKey = function(e) {
                var t = [e.uploadType, e.id];
                return "File" === e.uploadType && a.c(e.embed) && t.push(e.embed.altText), JSON.stringify(t)
            }, e.prototype.getExternalIdFromReferenceCacheKey = function(e) {
                return JSON.parse(e)[1]
            }, e
        }();

    function J(e, t) {
        return void 0 === t && (t = null), e instanceof Q || e instanceof q ? e : new Q(e instanceof s ? e : s.fromConfigObject(e), t)
    }
}, function(e, t, n) {
    "use strict";
    n.r(t), n.d(t, "Firefox96Plus", function() {
        return u
    }), n.d(t, "launch", function() {
        return d
    }), n.d(t, "updateLiveFeedback", function() {
        return f
    }), n.d(t, "updateCarFeedback", function() {
        return p
    }), n.d(t, "closeInstructorFeedback", function() {
        return h
    }), n.d(t, "reset", function() {
        return g
    }), n.d(t, "onLiveFeedbackContent", function() {
        return v
    }), n.d(t, "repositionIframe", function() {
        return y
    }), n.d(t, "resetIframeStyles", function() {
        return I
    }), n.d(t, "isFirefox", function() {
        return T
    });
    var r = n(1),
        i = n(4),
        o = {
            CAR_FEEDBACK: "instructor-feedback-car",
            CLOSE: "instructor-feedback-close",
            FOCUS: "instructor-feedback-focus",
            LIVE_FEEDBACK: "instructor-feedback-livefeedback",
            LIVE_FEEDBACK_CONTENT: "instructor-feedback-ax",
            QUICKFIX_ERROR: "instructor-feedback-quickfix-error",
            SHOW: "instructor-feedback-show"
        },
        a = null,
        s = {
            closed: function() {},
            deleted: function() {},
            eventTracker: function() {},
            updated: function() {},
            replacedFile: function() {}
        },
        l = r("<div />"),
        c = 0,
        u = T(96, 0);

    function d(e, t, n, u, d, f, p, h, g, I) {
        (g = g || {}).locale = g.locale || r("html").attr("lang"), g.target = g.target || "iframe";
        var T = function() {};
        I = I || {}, s.closed = I.closed || T, s.deleted = I.deleted || T, s.updated = I.updated || T, s.replacedFile = I.replacedFile || T, s.fixHtmlIssue = I.fixHtmlIssue || function() {
                return Promise.resolve()
            }, s.eventTracker = I.eventTracker || T,
            function(e) {
                i.listen("init", function(e, t, n) {
                    A(n.source, t)
                }), i.listen("hide", _), i.listen("active", function() {
                    return function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                            t = e.allowFocus,
                            n = void 0 === t ? function() {
                                return !1
                            } : t,
                            i = e.platformName,
                            o = e.target;
                        y(l, c, i, o), l.addClass("ally-iframe-active"), r(document.body).on("focusin.ally", function(e) {
                            n(e.target) || E()
                        }), E(), r("body > *:not(#ally-instructor-feedback-iframe)").each(function(e, t) {
                            var n = r(t),
                                i = n.attr("aria-hidden") || "";
                            n.attr("data-ally-prev-aria-hidden", i), n.attr("aria-hidden", "true")
                        })
                    }(e)
                }), i.listen("close", function(e) {
                    s.closed(e.fileId), s.closed = null
                }), i.listen("replaceFile", function(e) {
                    e.oldFileId && e.newFile ? s.replacedFile(e.oldFileId, e.newFile) : s.updated(e.newFile)
                }), i.listen("deleteFile", function(e) {
                    s.deleted(e.fileId)
                }), i.listen("print", function() {
                    window.print()
                }), i.listen("fixHtmlIssue", function(e) {
                    var t = e.ruleName,
                        n = e.locators,
                        r = e.fixOptions;
                    s.fixHtmlIssue(t, n, r).catch(function(e) {
                        ! function(e) {
                            var t = m();
                            t && i.send(t, o.QUICKFIX_ERROR, {
                                error: e
                            })
                        }(e.message || "Applying a quickfix failed")
                    })
                }), i.listen("liveFeedbackContent", function(e) {
                    v(e)
                }), i.listen("eventTracker", function(e) {
                    var t = e.event,
                        n = e.data;
                    s.eventTracker(t, n)
                })
            }({
                allowFocus: g.allowFocus,
                platformName: n,
                target: g.target
            }), delete g.allowFocus, "window" === g.target ? function(e, t, n, r, i, o, a, s) {
                var l = {
                        fromPageUrl: window.location.href,
                        clientId: r,
                        courseId: i,
                        uploadType: o.uploadType || "File",
                        externalId: o.fileId,
                        altText: o.embed && o.embed.altText,
                        filePreviewUrl: s.filePreviewUrl,
                        issue: s.issue,
                        locale: s.locale,
                        locator_selector: s.locator && s.locator.selector && encodeURIComponent(s.locator.selector),
                        locator_index: s.locator && s.locator.index,
                        platformName: t,
                        platformUi: n,
                        richContentId: s.richContentId,
                        windowTitle: s.windowTitle
                    },
                    c = [];
                Object.keys(l).forEach(function(e) {
                    l[e] && c.push(e + "=" + encodeURIComponent(l[e]))
                });
                var u = e + "/launchinstructorfeedback/?" + c.join("&");
                (s.windowLauncher || window.open).call(null, [u])
            }(e, n, u, d, f, p, 0, g) : function(e, t, n, i, s, u, d, f, p) {
                h = o.SHOW, m = {
                        fromPageUrl: window.location.href,
                        clientId: s,
                        courseId: u,
                        fileReferenceData: d.data(),
                        filePreviewUrl: p.filePreviewUrl,
                        liveFeedback: p.liveFeedback,
                        locator: p.locator,
                        editorBlocks: p.editorBlocks,
                        platformName: n,
                        platformUi: i,
                        richContentId: p.richContentId,
                        issue: p.issue,
                        locale: p.locale,
                        lmsUrl: t
                    }, a = {
                        subject: h,
                        data: m
                    },
                    function(e) {
                        var t = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}).appendTo,
                            n = void 0 === t ? document.body : t,
                            i = r(n).find("#ally-instructor-feedback-iframe");
                        if (0 === i.length) {
                            var o = r(e);
                            o.css({
                                display: "flex"
                            }).hide(), o.find("button").click(function() {
                                _()
                            }), o.find("#ally-instructor-feedback-iframe-start,#ally-instructor-feedback-iframe-end").focus(function() {
                                o.find("button").focus()
                            }), r(n).append(o), l = r(n).find("#ally-instructor-feedback-iframe"), o.fadeIn(300, function() {
                                c = document.documentElement.scrollTop, r(document.body).addClass("ally-instructor-feedback-active")
                            }), o.find("> img").focus()
                        } else {
                            var a = i,
                                s = a.find("iframe");
                            l = i, a.removeClass("ally-iframe-active"), a.fadeIn(300, function() {
                                c = document.documentElement.scrollTop, r(document.body).addClass("ally-instructor-feedback-active")
                            }), a.find("> :not(iframe):not(#ally-instructor-feedback-iframe-start):not(#ally-instructor-feedback-iframe-end)").attr("aria-hidden", "false"), a.find("> img").focus(), A(s[0].contentWindow)
                        }
                        window.dispatchEvent(new Event("resize"))
                    }(f, {
                        appendTo: p.appendTo
                    });
                var h, m
            }(0, t, n, u, d, f, p, h, g)
    }

    function f(e) {
        var t = m();
        t && i.send(t, o.LIVE_FEEDBACK, {
            liveFeedback: e
        })
    }

    function p(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            n = m();
        n && i.send(n, o.CAR_FEEDBACK, {
            content: e,
            forceUpdate: t
        })
    }

    function h() {
        var e = m();
        e && i.send(e, o.CLOSE)
    }

    function m() {
        var e = l.find("iframe")[0];
        return e && e.contentWindow
    }

    function g() {
        l.remove(), l = r("<div />"), r(document.body).removeClass("ally-instructor-feedback-active")
    }

    function v(e) {
        var t = m();
        t && i.send(t, o.LIVE_FEEDBACK_CONTENT, {
            content: e
        })
    }

    function E() {
        r(document.body).find(":focus").trigger("blur"), r("#ally-instructor-feedback-iframe > :not(iframe)").attr("aria-hidden", "true");
        var e = m();
        e && i.send(e, o.FOCUS)
    }

    function y(e, t, n, r) {
        return u && "learn" === n && "iframe" === r && "learn-oe-body" === document.body.id && (e.css("position", "absolute"), e.css("transform", "translateY(".concat(Math.max(0, t - 1), "px)")), e.css("height", "calc(100% + 2px)"), e.find(".ally-iframe").css("position", "absolute")), e
    }

    function I(e) {
        return e.css("position", ""), e.css("transform", ""), e.css("height", ""), e.find(".ally-iframe").css("position", ""), e
    }

    function _() {
        r(document.body).off("focusin.ally"), r(document.body).removeClass("ally-instructor-feedback-active"), l.fadeOut(300, function() {
            I(l)
        }), r("[data-ally-prev-aria-hidden]").each(function(e, t) {
            var n = r(t),
                i = n.attr("data-ally-prev-aria-hidden");
            n.removeAttr("data-ally-prev-aria-hidden"), i ? n.attr("aria-hidden", i) : n.removeAttr("aria-hidden")
        }), window.dispatchEvent(new Event("resize")), s.closed(), s.closed = null
    }

    function A(e, t) {
        a && i.send(e, a.subject, a.data, t)
    }

    function T(e, t) {
        var n = new RegExp(/firefox\/([0-9]+)\.([0-9]+)/g).exec(navigator.userAgent.toLowerCase());
        return !!n && (Number.parseInt(n[1]) >= e && Number.parseInt(n[2]) >= t)
    }
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.ProtoframePubsub = t.ProtoframeSubscriber = t.ProtoframePublisher = void 0;
    var r = n(68);
    Object.defineProperty(t, "ProtoframePublisher", {
        enumerable: !0,
        get: function() {
            return r.ProtoframePublisher
        }
    }), Object.defineProperty(t, "ProtoframeSubscriber", {
        enumerable: !0,
        get: function() {
            return r.ProtoframeSubscriber
        }
    }), Object.defineProperty(t, "ProtoframePubsub", {
        enumerable: !0,
        get: function() {
            return r.ProtoframePubsub
        }
    })
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = ["description", "fileName", "lineNumber", "message", "name", "number", "stack"];

    function i(e, t) {
        var n = t && t.loc,
            o = void 0,
            a = void 0;
        n && (e += " - " + (o = n.start.line) + ":" + (a = n.start.column));
        for (var s = Error.prototype.constructor.call(this, e), l = 0; l < r.length; l++) this[r[l]] = s[r[l]];
        Error.captureStackTrace && Error.captureStackTrace(this, i);
        try {
            n && (this.lineNumber = o, Object.defineProperty ? Object.defineProperty(this, "column", {
                value: a,
                enumerable: !0
            }) : this.column = a)
        } catch (e) {}
    }
    i.prototype = new Error, t.default = i, e.exports = t.default
}, function(e, t, n) {
    e.exports = n.p + "static/integration/img/ally-icon-af-download-logo.f25b92cffd71eaede2d7d3f62c34299d.svg"
}, function(e, t, n) {
    "use strict";
    var r = n(79);

    function i(e) {
        this.message = e
    }
    i.prototype = new Error, i.prototype.name = "InvalidTokenError", e.exports = function(e, t) {
        if ("string" != typeof e) throw new i("Invalid token specified");
        var n = !0 === (t = t || {}).header ? 0 : 1;
        try {
            return JSON.parse(r(e.split(".")[n]))
        } catch (e) {
            throw new i("Invalid token specified: " + e.message)
        }
    }, e.exports.InvalidTokenError = i
}, function(e, t, n) {
    e.exports = n.p + "static/integration/img/ally-icon-indicator-high-circle.f608a8b5a3987a75cfaf1554d59e0192.svg"
}, function(e, t, n) {
    e.exports = n.p + "static/integration/img/ally-icon-indicator-high.739568badd8d10efc6b247bd28f610c8.svg"
}, function(e, t, n) {
    e.exports = n.p + "static/integration/img/ally-icon-indicator-low-circle.5436e07e5830da539e80c55225eb37c9.svg"
}, function(e, t, n) {
    e.exports = n.p + "static/integration/img/ally-icon-indicator-low.237e696b1522cab720d64ac57021b3bc.svg"
}, function(e, t, n) {
    e.exports = n.p + "static/integration/img/ally-icon-indicator-medium-circle.c796ae96b97e7e83a1451c8f277544b5.svg"
}, function(e, t, n) {
    e.exports = n.p + "static/integration/img/ally-icon-indicator-medium.d07e666e8e789c1a95b1bc1384618c51.svg"
}, function(e, t, n) {
    e.exports = n.p + "static/integration/img/ally-icon-indicator-perfect-circle.da75f9949b204ea3e4d94d452fe609f8.svg"
}, function(e, t, n) {
    e.exports = n.p + "static/integration/img/ally-icon-indicator-perfect.1c18279979a6d4145c30b4f8276c4740.svg"
}, function(e, t, n) {
    e.exports = n.p + "static/integration/img/ally-icon-seizure-flag.45a489f91e27ee94736edbac1acf7be8.svg"
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    t.__esModule = !0, t.HandlebarsEnvironment = c;
    var i = n(10),
        o = r(n(15)),
        a = n(45),
        s = n(53),
        l = r(n(55));
    t.VERSION = "4.1.2";
    t.COMPILER_REVISION = 7;
    t.REVISION_CHANGES = {
        1: "<= 1.0.rc.2",
        2: "== 1.0.0-rc.3",
        3: "== 1.0.0-rc.4",
        4: "== 1.x.x",
        5: "== 2.0.0-alpha.x",
        6: ">= 2.0.0-beta.1",
        7: ">= 4.0.0"
    };

    function c(e, t, n) {
        this.helpers = e || {}, this.partials = t || {}, this.decorators = n || {}, a.registerDefaultHelpers(this), s.registerDefaultDecorators(this)
    }
    c.prototype = {
        constructor: c,
        logger: l.default,
        log: l.default.log,
        registerHelper: function(e, t) {
            if ("[object Object]" === i.toString.call(e)) {
                if (t) throw new o.default("Arg not supported with multiple helpers");
                i.extend(this.helpers, e)
            } else this.helpers[e] = t
        },
        unregisterHelper: function(e) {
            delete this.helpers[e]
        },
        registerPartial: function(e, t) {
            if ("[object Object]" === i.toString.call(e)) i.extend(this.partials, e);
            else {
                if (void 0 === t) throw new o.default('Attempting to register a partial called "' + e + '" as undefined');
                this.partials[e] = t
            }
        },
        unregisterPartial: function(e) {
            delete this.partials[e]
        },
        registerDecorator: function(e, t) {
            if ("[object Object]" === i.toString.call(e)) {
                if (t) throw new o.default("Arg not supported with multiple decorators");
                i.extend(this.decorators, e)
            } else this.decorators[e] = t
        },
        unregisterDecorator: function(e) {
            delete this.decorators[e]
        }
    };
    var u = l.default.log;
    t.log = u, t.createFrame = i.createFrame, t.logger = l.default
}, , , , function(e, t, n) {
    var r, i, o;
    /*!
     * jQuery UI Tooltip 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */
    i = [n(1), n(32), n(33), n(34), n(11), n(35)], void 0 === (o = "function" == typeof(r = function(e) {
        return e.widget("ui.tooltip", {
            version: "1.12.1",
            options: {
                classes: {
                    "ui-tooltip": "ui-corner-all ui-widget-shadow"
                },
                content: function() {
                    var t = e(this).attr("title") || "";
                    return e("<a>").text(t).html()
                },
                hide: !0,
                items: "[title]:not([disabled])",
                position: {
                    my: "left top+15",
                    at: "left bottom",
                    collision: "flipfit flip"
                },
                show: !0,
                track: !1,
                close: null,
                open: null
            },
            _addDescribedBy: function(t, n) {
                var r = (t.attr("aria-describedby") || "").split(/\s+/);
                r.push(n), t.data("ui-tooltip-id", n).attr("aria-describedby", e.trim(r.join(" ")))
            },
            _removeDescribedBy: function(t) {
                var n = t.data("ui-tooltip-id"),
                    r = (t.attr("aria-describedby") || "").split(/\s+/),
                    i = e.inArray(n, r); - 1 !== i && r.splice(i, 1), t.removeData("ui-tooltip-id"), (r = e.trim(r.join(" "))) ? t.attr("aria-describedby", r) : t.removeAttr("aria-describedby")
            },
            _create: function() {
                this._on({
                    mouseover: "open",
                    focusin: "open"
                }), this.tooltips = {}, this.parents = {}, this.liveRegion = e("<div>").attr({
                    role: "log",
                    "aria-live": "assertive",
                    "aria-relevant": "additions"
                }).appendTo(this.document[0].body), this._addClass(this.liveRegion, null, "ui-helper-hidden-accessible"), this.disabledTitles = e([])
            },
            _setOption: function(t, n) {
                var r = this;
                this._super(t, n), "content" === t && e.each(this.tooltips, function(e, t) {
                    r._updateContent(t.element)
                })
            },
            _setOptionDisabled: function(e) {
                this[e ? "_disable" : "_enable"]()
            },
            _disable: function() {
                var t = this;
                e.each(this.tooltips, function(n, r) {
                    var i = e.Event("blur");
                    i.target = i.currentTarget = r.element[0], t.close(i, !0)
                }), this.disabledTitles = this.disabledTitles.add(this.element.find(this.options.items).addBack().filter(function() {
                    var t = e(this);
                    if (t.is("[title]")) return t.data("ui-tooltip-title", t.attr("title")).removeAttr("title")
                }))
            },
            _enable: function() {
                this.disabledTitles.each(function() {
                    var t = e(this);
                    t.data("ui-tooltip-title") && t.attr("title", t.data("ui-tooltip-title"))
                }), this.disabledTitles = e([])
            },
            open: function(t) {
                var n = this,
                    r = e(t ? t.target : this.element).closest(this.options.items);
                r.length && !r.data("ui-tooltip-id") && (r.attr("title") && r.data("ui-tooltip-title", r.attr("title")), r.data("ui-tooltip-open", !0), t && "mouseover" === t.type && r.parents().each(function() {
                    var t, r = e(this);
                    r.data("ui-tooltip-open") && ((t = e.Event("blur")).target = t.currentTarget = this, n.close(t, !0)), r.attr("title") && (r.uniqueId(), n.parents[this.id] = {
                        element: this,
                        title: r.attr("title")
                    }, r.attr("title", ""))
                }), this._registerCloseHandlers(t, r), this._updateContent(r, t))
            },
            _updateContent: function(e, t) {
                var n, r = this.options.content,
                    i = this,
                    o = t ? t.type : null;
                if ("string" == typeof r || r.nodeType || r.jquery) return this._open(t, e, r);
                (n = r.call(e[0], function(n) {
                    i._delay(function() {
                        e.data("ui-tooltip-open") && (t && (t.type = o), this._open(t, e, n))
                    })
                })) && this._open(t, e, n)
            },
            _open: function(t, n, r) {
                var i, o, a, s, l = e.extend({}, this.options.position);

                function c(e) {
                    l.of = e, o.is(":hidden") || o.position(l)
                }
                r && ((i = this._find(n)) ? i.tooltip.find(".ui-tooltip-content").html(r) : (n.is("[title]") && (t && "mouseover" === t.type ? n.attr("title", "") : n.removeAttr("title")), i = this._tooltip(n), o = i.tooltip, this._addDescribedBy(n, o.attr("id")), o.find(".ui-tooltip-content").html(r), this.liveRegion.children().hide(), (s = e("<div>").html(o.find(".ui-tooltip-content").html())).removeAttr("name").find("[name]").removeAttr("name"), s.removeAttr("id").find("[id]").removeAttr("id"), s.appendTo(this.liveRegion), this.options.track && t && /^mouse/.test(t.type) ? (this._on(this.document, {
                    mousemove: c
                }), c(t)) : o.position(e.extend({ of: n
                }, this.options.position)), o.hide(), this._show(o, this.options.show), this.options.track && this.options.show && this.options.show.delay && (a = this.delayedShow = setInterval(function() {
                    o.is(":visible") && (c(l.of), clearInterval(a))
                }, e.fx.interval)), this._trigger("open", t, {
                    tooltip: o
                })))
            },
            _registerCloseHandlers: function(t, n) {
                var r = {
                    keyup: function(t) {
                        if (t.keyCode === e.ui.keyCode.ESCAPE) {
                            var r = e.Event(t);
                            r.currentTarget = n[0], this.close(r, !0)
                        }
                    }
                };
                n[0] !== this.element[0] && (r.remove = function() {
                    this._removeTooltip(this._find(n).tooltip)
                }), t && "mouseover" !== t.type || (r.mouseleave = "close"), t && "focusin" !== t.type || (r.focusout = "close"), this._on(!0, n, r)
            },
            close: function(t) {
                var n, r = this,
                    i = e(t ? t.currentTarget : this.element),
                    o = this._find(i);
                o ? (n = o.tooltip, o.closing || (clearInterval(this.delayedShow), i.data("ui-tooltip-title") && !i.attr("title") && i.attr("title", i.data("ui-tooltip-title")), this._removeDescribedBy(i), o.hiding = !0, n.stop(!0), this._hide(n, this.options.hide, function() {
                    r._removeTooltip(e(this))
                }), i.removeData("ui-tooltip-open"), this._off(i, "mouseleave focusout keyup"), i[0] !== this.element[0] && this._off(i, "remove"), this._off(this.document, "mousemove"), t && "mouseleave" === t.type && e.each(this.parents, function(t, n) {
                    e(n.element).attr("title", n.title), delete r.parents[t]
                }), o.closing = !0, this._trigger("close", t, {
                    tooltip: n
                }), o.hiding || (o.closing = !1))) : i.removeData("ui-tooltip-open")
            },
            _tooltip: function(t) {
                var n = e("<div>").attr("role", "tooltip"),
                    r = e("<div>").appendTo(n),
                    i = n.uniqueId().attr("id");
                return this._addClass(r, "ui-tooltip-content"), this._addClass(n, "ui-tooltip", "ui-widget ui-widget-content"), n.appendTo(this._appendTo(t)), this.tooltips[i] = {
                    element: t,
                    tooltip: n
                }
            },
            _find: function(e) {
                var t = e.data("ui-tooltip-id");
                return t ? this.tooltips[t] : null
            },
            _removeTooltip: function(e) {
                e.remove(), delete this.tooltips[e.attr("id")]
            },
            _appendTo: function(e) {
                var t = e.closest(".ui-front, dialog");
                return t.length || (t = this.document[0].body), t
            },
            _destroy: function() {
                var t = this;
                e.each(this.tooltips, function(n, r) {
                    var i = e.Event("blur"),
                        o = r.element;
                    i.target = i.currentTarget = o[0], t.close(i, !0), e("#" + n).remove(), o.data("ui-tooltip-title") && (o.attr("title") || o.attr("title", o.data("ui-tooltip-title")), o.removeData("ui-tooltip-title"))
                }), this.liveRegion.remove()
            }
        }), !1 !== e.uiBackCompat && e.widget("ui.tooltip", e.ui.tooltip, {
            options: {
                tooltipClass: null
            },
            _tooltip: function() {
                var e = this._superApply(arguments);
                return this.options.tooltipClass && e.tooltip.addClass(this.options.tooltipClass), e
            }
        }), e.ui.tooltip
    }) ? r.apply(t, i) : r) || (e.exports = o)
}, function(e, t, n) {
    var r, i, o;
    /*!
     * jQuery UI Keycode 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */
    i = [n(1), n(11)], void 0 === (o = "function" == typeof(r = function(e) {
        return e.ui.keyCode = {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    }) ? r.apply(t, i) : r) || (e.exports = o)
}, function(e, t, n) {
    var r, i, o;
    /*!
     * jQuery UI Position 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/position/
     */
    i = [n(1), n(11)], void 0 === (o = "function" == typeof(r = function(e) {
        return function() {
            var t, n = Math.max,
                r = Math.abs,
                i = /left|center|right/,
                o = /top|center|bottom/,
                a = /[\+\-]\d+(\.[\d]+)?%?/,
                s = /^\w+/,
                l = /%$/,
                c = e.fn.position;

            function u(e, t, n) {
                return [parseFloat(e[0]) * (l.test(e[0]) ? t / 100 : 1), parseFloat(e[1]) * (l.test(e[1]) ? n / 100 : 1)]
            }

            function d(t, n) {
                return parseInt(e.css(t, n), 10) || 0
            }

            function f(t) {
                var n = t[0];
                return 9 === n.nodeType ? {
                    width: t.width(),
                    height: t.height(),
                    offset: {
                        top: 0,
                        left: 0
                    }
                } : e.isWindow(n) ? {
                    width: t.width(),
                    height: t.height(),
                    offset: {
                        top: t.scrollTop(),
                        left: t.scrollLeft()
                    }
                } : n.preventDefault ? {
                    width: 0,
                    height: 0,
                    offset: {
                        top: n.pageY,
                        left: n.pageX
                    }
                } : {
                    width: t.outerWidth(),
                    height: t.outerHeight(),
                    offset: t.offset()
                }
            }
            e.position = {
                scrollbarWidth: function() {
                    if (void 0 !== t) return t;
                    var n, r, i = e("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                        o = i.children()[0];
                    return e("body").append(i), n = o.offsetWidth, i.css("overflow", "scroll"), n === (r = o.offsetWidth) && (r = i[0].clientWidth), i.remove(), t = n - r
                },
                getScrollInfo: function(t) {
                    var n = t.isWindow || t.isDocument ? "" : t.element.css("overflow-x"),
                        r = t.isWindow || t.isDocument ? "" : t.element.css("overflow-y"),
                        i = "scroll" === n || "auto" === n && t.width < t.element[0].scrollWidth;
                    return {
                        width: "scroll" === r || "auto" === r && t.height < t.element[0].scrollHeight ? e.position.scrollbarWidth() : 0,
                        height: i ? e.position.scrollbarWidth() : 0
                    }
                },
                getWithinInfo: function(t) {
                    var n = e(t || window),
                        r = e.isWindow(n[0]),
                        i = !!n[0] && 9 === n[0].nodeType;
                    return {
                        element: n,
                        isWindow: r,
                        isDocument: i,
                        offset: r || i ? {
                            left: 0,
                            top: 0
                        } : e(t).offset(),
                        scrollLeft: n.scrollLeft(),
                        scrollTop: n.scrollTop(),
                        width: n.outerWidth(),
                        height: n.outerHeight()
                    }
                }
            }, e.fn.position = function(t) {
                if (!t || !t.of) return c.apply(this, arguments);
                t = e.extend({}, t);
                var l, p, h, m, g, v, E = e(t.of),
                    y = e.position.getWithinInfo(t.within),
                    I = e.position.getScrollInfo(y),
                    _ = (t.collision || "flip").split(" "),
                    A = {};
                return v = f(E), E[0].preventDefault && (t.at = "left top"), p = v.width, h = v.height, m = v.offset, g = e.extend({}, m), e.each(["my", "at"], function() {
                    var e, n, r = (t[this] || "").split(" ");
                    1 === r.length && (r = i.test(r[0]) ? r.concat(["center"]) : o.test(r[0]) ? ["center"].concat(r) : ["center", "center"]), r[0] = i.test(r[0]) ? r[0] : "center", r[1] = o.test(r[1]) ? r[1] : "center", e = a.exec(r[0]), n = a.exec(r[1]), A[this] = [e ? e[0] : 0, n ? n[0] : 0], t[this] = [s.exec(r[0])[0], s.exec(r[1])[0]]
                }), 1 === _.length && (_[1] = _[0]), "right" === t.at[0] ? g.left += p : "center" === t.at[0] && (g.left += p / 2), "bottom" === t.at[1] ? g.top += h : "center" === t.at[1] && (g.top += h / 2), l = u(A.at, p, h), g.left += l[0], g.top += l[1], this.each(function() {
                    var i, o, a = e(this),
                        s = a.outerWidth(),
                        c = a.outerHeight(),
                        f = d(this, "marginLeft"),
                        v = d(this, "marginTop"),
                        T = s + f + d(this, "marginRight") + I.width,
                        b = c + v + d(this, "marginBottom") + I.height,
                        O = e.extend({}, g),
                        C = u(A.my, a.outerWidth(), a.outerHeight());
                    "right" === t.my[0] ? O.left -= s : "center" === t.my[0] && (O.left -= s / 2), "bottom" === t.my[1] ? O.top -= c : "center" === t.my[1] && (O.top -= c / 2), O.left += C[0], O.top += C[1], i = {
                        marginLeft: f,
                        marginTop: v
                    }, e.each(["left", "top"], function(n, r) {
                        e.ui.position[_[n]] && e.ui.position[_[n]][r](O, {
                            targetWidth: p,
                            targetHeight: h,
                            elemWidth: s,
                            elemHeight: c,
                            collisionPosition: i,
                            collisionWidth: T,
                            collisionHeight: b,
                            offset: [l[0] + C[0], l[1] + C[1]],
                            my: t.my,
                            at: t.at,
                            within: y,
                            elem: a
                        })
                    }), t.using && (o = function(e) {
                        var i = m.left - O.left,
                            o = i + p - s,
                            l = m.top - O.top,
                            u = l + h - c,
                            d = {
                                target: {
                                    element: E,
                                    left: m.left,
                                    top: m.top,
                                    width: p,
                                    height: h
                                },
                                element: {
                                    element: a,
                                    left: O.left,
                                    top: O.top,
                                    width: s,
                                    height: c
                                },
                                horizontal: o < 0 ? "left" : i > 0 ? "right" : "center",
                                vertical: u < 0 ? "top" : l > 0 ? "bottom" : "middle"
                            };
                        p < s && r(i + o) < p && (d.horizontal = "center"), h < c && r(l + u) < h && (d.vertical = "middle"), n(r(i), r(o)) > n(r(l), r(u)) ? d.important = "horizontal" : d.important = "vertical", t.using.call(this, e, d)
                    }), a.offset(e.extend(O, {
                        using: o
                    }))
                })
            }, e.ui.position = {
                fit: {
                    left: function(e, t) {
                        var r, i = t.within,
                            o = i.isWindow ? i.scrollLeft : i.offset.left,
                            a = i.width,
                            s = e.left - t.collisionPosition.marginLeft,
                            l = o - s,
                            c = s + t.collisionWidth - a - o;
                        t.collisionWidth > a ? l > 0 && c <= 0 ? (r = e.left + l + t.collisionWidth - a - o, e.left += l - r) : e.left = c > 0 && l <= 0 ? o : l > c ? o + a - t.collisionWidth : o : l > 0 ? e.left += l : c > 0 ? e.left -= c : e.left = n(e.left - s, e.left)
                    },
                    top: function(e, t) {
                        var r, i = t.within,
                            o = i.isWindow ? i.scrollTop : i.offset.top,
                            a = t.within.height,
                            s = e.top - t.collisionPosition.marginTop,
                            l = o - s,
                            c = s + t.collisionHeight - a - o;
                        t.collisionHeight > a ? l > 0 && c <= 0 ? (r = e.top + l + t.collisionHeight - a - o, e.top += l - r) : e.top = c > 0 && l <= 0 ? o : l > c ? o + a - t.collisionHeight : o : l > 0 ? e.top += l : c > 0 ? e.top -= c : e.top = n(e.top - s, e.top)
                    }
                },
                flip: {
                    left: function(e, t) {
                        var n, i, o = t.within,
                            a = o.offset.left + o.scrollLeft,
                            s = o.width,
                            l = o.isWindow ? o.scrollLeft : o.offset.left,
                            c = e.left - t.collisionPosition.marginLeft,
                            u = c - l,
                            d = c + t.collisionWidth - s - l,
                            f = "left" === t.my[0] ? -t.elemWidth : "right" === t.my[0] ? t.elemWidth : 0,
                            p = "left" === t.at[0] ? t.targetWidth : "right" === t.at[0] ? -t.targetWidth : 0,
                            h = -2 * t.offset[0];
                        u < 0 ? ((n = e.left + f + p + h + t.collisionWidth - s - a) < 0 || n < r(u)) && (e.left += f + p + h) : d > 0 && ((i = e.left - t.collisionPosition.marginLeft + f + p + h - l) > 0 || r(i) < d) && (e.left += f + p + h)
                    },
                    top: function(e, t) {
                        var n, i, o = t.within,
                            a = o.offset.top + o.scrollTop,
                            s = o.height,
                            l = o.isWindow ? o.scrollTop : o.offset.top,
                            c = e.top - t.collisionPosition.marginTop,
                            u = c - l,
                            d = c + t.collisionHeight - s - l,
                            f = "top" === t.my[1] ? -t.elemHeight : "bottom" === t.my[1] ? t.elemHeight : 0,
                            p = "top" === t.at[1] ? t.targetHeight : "bottom" === t.at[1] ? -t.targetHeight : 0,
                            h = -2 * t.offset[1];
                        u < 0 ? ((i = e.top + f + p + h + t.collisionHeight - s - a) < 0 || i < r(u)) && (e.top += f + p + h) : d > 0 && ((n = e.top - t.collisionPosition.marginTop + f + p + h - l) > 0 || r(n) < d) && (e.top += f + p + h)
                    }
                },
                flipfit: {
                    left: function() {
                        e.ui.position.flip.left.apply(this, arguments), e.ui.position.fit.left.apply(this, arguments)
                    },
                    top: function() {
                        e.ui.position.flip.top.apply(this, arguments), e.ui.position.fit.top.apply(this, arguments)
                    }
                }
            }
        }(), e.ui.position
    }) ? r.apply(t, i) : r) || (e.exports = o)
}, function(e, t, n) {
    var r, i, o;
    /*!
     * jQuery UI Unique ID 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */
    i = [n(1), n(11)], void 0 === (o = "function" == typeof(r = function(e) {
        return e.fn.extend({
            uniqueId: (t = 0, function() {
                return this.each(function() {
                    this.id || (this.id = "ui-id-" + ++t)
                })
            }),
            removeUniqueId: function() {
                return this.each(function() {
                    /^ui-id-\d+$/.test(this.id) && e(this).removeAttr("id")
                })
            }
        });
        var t
    }) ? r.apply(t, i) : r) || (e.exports = o)
}, function(e, t, n) {
    var r, i, o;
    /*!
     * jQuery UI Widget 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */
    i = [n(1), n(11)], void 0 === (o = "function" == typeof(r = function(e) {
        var t, n = 0,
            r = Array.prototype.slice;
        return e.cleanData = (t = e.cleanData, function(n) {
            var r, i, o;
            for (o = 0; null != (i = n[o]); o++) try {
                (r = e._data(i, "events")) && r.remove && e(i).triggerHandler("remove")
            } catch (e) {}
            t(n)
        }), e.widget = function(t, n, r) {
            var i, o, a, s = {},
                l = t.split(".")[0],
                c = l + "-" + (t = t.split(".")[1]);
            return r || (r = n, n = e.Widget), e.isArray(r) && (r = e.extend.apply(null, [{}].concat(r))), e.expr[":"][c.toLowerCase()] = function(t) {
                return !!e.data(t, c)
            }, e[l] = e[l] || {}, i = e[l][t], o = e[l][t] = function(e, t) {
                if (!this._createWidget) return new o(e, t);
                arguments.length && this._createWidget(e, t)
            }, e.extend(o, i, {
                version: r.version,
                _proto: e.extend({}, r),
                _childConstructors: []
            }), (a = new n).options = e.widget.extend({}, a.options), e.each(r, function(t, r) {
                e.isFunction(r) ? s[t] = function() {
                    function e() {
                        return n.prototype[t].apply(this, arguments)
                    }

                    function i(e) {
                        return n.prototype[t].apply(this, e)
                    }
                    return function() {
                        var t, n = this._super,
                            o = this._superApply;
                        return this._super = e, this._superApply = i, t = r.apply(this, arguments), this._super = n, this._superApply = o, t
                    }
                }() : s[t] = r
            }), o.prototype = e.widget.extend(a, {
                widgetEventPrefix: i && a.widgetEventPrefix || t
            }, s, {
                constructor: o,
                namespace: l,
                widgetName: t,
                widgetFullName: c
            }), i ? (e.each(i._childConstructors, function(t, n) {
                var r = n.prototype;
                e.widget(r.namespace + "." + r.widgetName, o, n._proto)
            }), delete i._childConstructors) : n._childConstructors.push(o), e.widget.bridge(t, o), o
        }, e.widget.extend = function(t) {
            for (var n, i, o = r.call(arguments, 1), a = 0, s = o.length; a < s; a++)
                for (n in o[a]) i = o[a][n], o[a].hasOwnProperty(n) && void 0 !== i && (e.isPlainObject(i) ? t[n] = e.isPlainObject(t[n]) ? e.widget.extend({}, t[n], i) : e.widget.extend({}, i) : t[n] = i);
            return t
        }, e.widget.bridge = function(t, n) {
            var i = n.prototype.widgetFullName || t;
            e.fn[t] = function(o) {
                var a = "string" == typeof o,
                    s = r.call(arguments, 1),
                    l = this;
                return a ? this.length || "instance" !== o ? this.each(function() {
                    var n, r = e.data(this, i);
                    return "instance" === o ? (l = r, !1) : r ? e.isFunction(r[o]) && "_" !== o.charAt(0) ? (n = r[o].apply(r, s)) !== r && void 0 !== n ? (l = n && n.jquery ? l.pushStack(n.get()) : n, !1) : void 0 : e.error("no such method '" + o + "' for " + t + " widget instance") : e.error("cannot call methods on " + t + " prior to initialization; attempted to call method '" + o + "'")
                }) : l = void 0 : (s.length && (o = e.widget.extend.apply(null, [o].concat(s))), this.each(function() {
                    var t = e.data(this, i);
                    t ? (t.option(o || {}), t._init && t._init()) : e.data(this, i, new n(o, this))
                })), l
            }
        }, e.Widget = function() {}, e.Widget._childConstructors = [], e.Widget.prototype = {
            widgetName: "widget",
            widgetEventPrefix: "",
            defaultElement: "<div>",
            options: {
                classes: {},
                disabled: !1,
                create: null
            },
            _createWidget: function(t, r) {
                r = e(r || this.defaultElement || this)[0], this.element = e(r), this.uuid = n++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = e(), this.hoverable = e(), this.focusable = e(), this.classesElementLookup = {}, r !== this && (e.data(r, this.widgetFullName, this), this._on(!0, this.element, {
                    remove: function(e) {
                        e.target === r && this.destroy()
                    }
                }), this.document = e(r.style ? r.ownerDocument : r.document || r), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), this.options = e.widget.extend({}, this.options, this._getCreateOptions(), t), this._create(), this.options.disabled && this._setOptionDisabled(this.options.disabled), this._trigger("create", null, this._getCreateEventData()), this._init()
            },
            _getCreateOptions: function() {
                return {}
            },
            _getCreateEventData: e.noop,
            _create: e.noop,
            _init: e.noop,
            destroy: function() {
                var t = this;
                this._destroy(), e.each(this.classesElementLookup, function(e, n) {
                    t._removeClass(n, e)
                }), this.element.off(this.eventNamespace).removeData(this.widgetFullName), this.widget().off(this.eventNamespace).removeAttr("aria-disabled"), this.bindings.off(this.eventNamespace)
            },
            _destroy: e.noop,
            widget: function() {
                return this.element
            },
            option: function(t, n) {
                var r, i, o, a = t;
                if (0 === arguments.length) return e.widget.extend({}, this.options);
                if ("string" == typeof t)
                    if (a = {}, r = t.split("."), t = r.shift(), r.length) {
                        for (i = a[t] = e.widget.extend({}, this.options[t]), o = 0; o < r.length - 1; o++) i[r[o]] = i[r[o]] || {}, i = i[r[o]];
                        if (t = r.pop(), 1 === arguments.length) return void 0 === i[t] ? null : i[t];
                        i[t] = n
                    } else {
                        if (1 === arguments.length) return void 0 === this.options[t] ? null : this.options[t];
                        a[t] = n
                    }
                return this._setOptions(a), this
            },
            _setOptions: function(e) {
                var t;
                for (t in e) this._setOption(t, e[t]);
                return this
            },
            _setOption: function(e, t) {
                return "classes" === e && this._setOptionClasses(t), this.options[e] = t, "disabled" === e && this._setOptionDisabled(t), this
            },
            _setOptionClasses: function(t) {
                var n, r, i;
                for (n in t) i = this.classesElementLookup[n], t[n] !== this.options.classes[n] && i && i.length && (r = e(i.get()), this._removeClass(i, n), r.addClass(this._classes({
                    element: r,
                    keys: n,
                    classes: t,
                    add: !0
                })))
            },
            _setOptionDisabled: function(e) {
                this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !!e), e && (this._removeClass(this.hoverable, null, "ui-state-hover"), this._removeClass(this.focusable, null, "ui-state-focus"))
            },
            enable: function() {
                return this._setOptions({
                    disabled: !1
                })
            },
            disable: function() {
                return this._setOptions({
                    disabled: !0
                })
            },
            _classes: function(t) {
                var n = [],
                    r = this;

                function i(i, o) {
                    var a, s;
                    for (s = 0; s < i.length; s++) a = r.classesElementLookup[i[s]] || e(), a = t.add ? e(e.unique(a.get().concat(t.element.get()))) : e(a.not(t.element).get()), r.classesElementLookup[i[s]] = a, n.push(i[s]), o && t.classes[i[s]] && n.push(t.classes[i[s]])
                }
                return t = e.extend({
                    element: this.element,
                    classes: this.options.classes || {}
                }, t), this._on(t.element, {
                    remove: "_untrackClassesElement"
                }), t.keys && i(t.keys.match(/\S+/g) || [], !0), t.extra && i(t.extra.match(/\S+/g) || []), n.join(" ")
            },
            _untrackClassesElement: function(t) {
                var n = this;
                e.each(n.classesElementLookup, function(r, i) {
                    -1 !== e.inArray(t.target, i) && (n.classesElementLookup[r] = e(i.not(t.target).get()))
                })
            },
            _removeClass: function(e, t, n) {
                return this._toggleClass(e, t, n, !1)
            },
            _addClass: function(e, t, n) {
                return this._toggleClass(e, t, n, !0)
            },
            _toggleClass: function(e, t, n, r) {
                r = "boolean" == typeof r ? r : n;
                var i = "string" == typeof e || null === e,
                    o = {
                        extra: i ? t : n,
                        keys: i ? e : t,
                        element: i ? this.element : e,
                        add: r
                    };
                return o.element.toggleClass(this._classes(o), r), this
            },
            _on: function(t, n, r) {
                var i, o = this;
                "boolean" != typeof t && (r = n, n = t, t = !1), r ? (n = i = e(n), this.bindings = this.bindings.add(n)) : (r = n, n = this.element, i = this.widget()), e.each(r, function(r, a) {
                    function s() {
                        if (t || !0 !== o.options.disabled && !e(this).hasClass("ui-state-disabled")) return ("string" == typeof a ? o[a] : a).apply(o, arguments)
                    }
                    "string" != typeof a && (s.guid = a.guid = a.guid || s.guid || e.guid++);
                    var l = r.match(/^([\w:-]*)\s*(.*)$/),
                        c = l[1] + o.eventNamespace,
                        u = l[2];
                    u ? i.on(c, u, s) : n.on(c, s)
                })
            },
            _off: function(t, n) {
                n = (n || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, t.off(n).off(n), this.bindings = e(this.bindings.not(t).get()), this.focusable = e(this.focusable.not(t).get()), this.hoverable = e(this.hoverable.not(t).get())
            },
            _delay: function(e, t) {
                var n = this;
                return setTimeout(function() {
                    return ("string" == typeof e ? n[e] : e).apply(n, arguments)
                }, t || 0)
            },
            _hoverable: function(t) {
                this.hoverable = this.hoverable.add(t), this._on(t, {
                    mouseenter: function(t) {
                        this._addClass(e(t.currentTarget), null, "ui-state-hover")
                    },
                    mouseleave: function(t) {
                        this._removeClass(e(t.currentTarget), null, "ui-state-hover")
                    }
                })
            },
            _focusable: function(t) {
                this.focusable = this.focusable.add(t), this._on(t, {
                    focusin: function(t) {
                        this._addClass(e(t.currentTarget), null, "ui-state-focus")
                    },
                    focusout: function(t) {
                        this._removeClass(e(t.currentTarget), null, "ui-state-focus")
                    }
                })
            },
            _trigger: function(t, n, r) {
                var i, o, a = this.options[t];
                if (r = r || {}, (n = e.Event(n)).type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), n.target = this.element[0], o = n.originalEvent)
                    for (i in o) i in n || (n[i] = o[i]);
                return this.element.trigger(n, r), !(e.isFunction(a) && !1 === a.apply(this.element[0], [n].concat(r)) || n.isDefaultPrevented())
            }
        }, e.each({
            show: "fadeIn",
            hide: "fadeOut"
        }, function(t, n) {
            e.Widget.prototype["_" + t] = function(r, i, o) {
                var a;
                "string" == typeof i && (i = {
                    effect: i
                });
                var s = i ? !0 === i || "number" == typeof i ? n : i.effect || n : t;
                "number" == typeof(i = i || {}) && (i = {
                    duration: i
                }), a = !e.isEmptyObject(i), i.complete = o, i.delay && r.delay(i.delay), a && e.effects && e.effects.effect[s] ? r[t](i) : s !== t && r[s] ? r[s](i.duration, i.easing, o) : r.queue(function(n) {
                    e(this)[t](), o && o.call(r[0]), n()
                })
            }
        }), e.widget
    }) ? r.apply(t, i) : r) || (e.exports = o)
}, function(e, t, n) {
    "use strict";
    n.r(t);
    var r = n(1);
    r.fn.visible = function() {
        var e = r(window).outerWidth(),
            t = r(window).outerHeight(),
            n = this.get(0).getBoundingClientRect(),
            i = n.top >= 0 && n.top < t,
            o = n.bottom > 0 && n.bottom <= t,
            a = n.left >= 0 && n.left < e,
            s = n.right > 0 && n.right <= e;
        return {
            isEntirelyVisible: i && o && a && s,
            topVisible: i,
            bottomVisible: o,
            leftVisible: a,
            rightVisible: s
        }
    }
}, function(e, t, n) {
    "use strict";
    n.r(t), n.d(t, "images", function() {
        return r
    });
    var r = {
        allyIcon: {
            default: n(38),
            white: n(39)
        },
        indicators: {
            high: {
                circle: n(18),
                default: n(19)
            },
            low: {
                circle: n(20),
                default: n(21)
            },
            medium: {
                circle: n(22),
                default: n(23)
            },
            perfect: {
                circle: n(24),
                default: n(25)
            }
        },
        loading: n(40),
        materialIcons: {
            close: n(41),
            dropdown: n(42)
        },
        seizureFlag: n(26)
    }
}, function(e, t, n) {
    e.exports = n.p + "static/integration/img/ally-icon.036281fadcb78861777fac63a39d8eaf.png"
}, function(e, t, n) {
    e.exports = n.p + "static/integration/img/ally-icon-white.5e94c18024419d8f6c3bb718ed9bd08f.png"
}, function(e, t, n) {
    e.exports = n.p + "static/integration/img/loading.cb505bf9ab3f2d612ed49e94d757c3cc.svg"
}, function(e, t, n) {
    e.exports = n.p + "static/integration/img/material-icons/ic_clear_white_24px.7b66831ce156de757d9bc34d4744da93.svg"
}, function(e, t, n) {
    e.exports = n.p + "static/integration/img/material-icons/ic_arrow_drop_down_black_24px.77a0c6cb5e56584ab94976853834b18a.svg"
}, function(e, t, n) {
    var r = n(6);
    e.exports = (r.default || r).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, r, i) {
            var o, a, s = e.escapeExpression,
                l = null != t ? t : e.nullContext || {},
                c = n.helperMissing;
            return '<iframe id="ally-accessible-versions-iframe" title="' + s(e.lambda(null != (o = null != t ? t.i18n : t) ? o.ALTERNATIVE_FORMATS : o, t)) + '" class="ally-iframe" src="' + s("function" == typeof(a = null != (a = n.ALLY_DOMAIN || (null != t ? t.ALLY_DOMAIN : t)) ? a : c) ? a.call(l, {
                name: "ALLY_DOMAIN",
                hash: {},
                data: i
            }) : a) + "/accessibleversions?locale=" + s("function" == typeof(a = null != (a = n.locale || (null != t ? t.locale : t)) ? a : c) ? a.call(l, {
                name: "locale",
                hash: {},
                data: i
            }) : a) + "&platformName=" + s("function" == typeof(a = null != (a = n.platformName || (null != t ? t.platformName : t)) ? a : c) ? a.call(l, {
                name: "platformName",
                hash: {},
                data: i
            }) : a) + "&platformUi=" + s("function" == typeof(a = null != (a = n.platformUi || (null != t ? t.platformUi : t)) ? a : c) ? a.call(l, {
                name: "platformUi",
                hash: {},
                data: i
            }) : a) + '"/>\n'
        },
        useData: !0
    })
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function i(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t.default = e, t
    }
    t.__esModule = !0;
    var o = i(n(27)),
        a = r(n(56)),
        s = r(n(15)),
        l = i(n(10)),
        c = i(n(57)),
        u = r(n(58));

    function d() {
        var e = new o.HandlebarsEnvironment;
        return l.extend(e, o), e.SafeString = a.default, e.Exception = s.default, e.Utils = l, e.escapeExpression = l.escapeExpression, e.VM = c, e.template = function(t) {
            return c.template(t, e)
        }, e
    }
    var f = d();
    f.create = d, u.default(f), f.default = f, t.default = f, e.exports = t.default
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    t.__esModule = !0, t.registerDefaultHelpers = function(e) {
        i.default(e), o.default(e), a.default(e), s.default(e), l.default(e), c.default(e), u.default(e)
    };
    var i = r(n(46)),
        o = r(n(47)),
        a = r(n(48)),
        s = r(n(49)),
        l = r(n(50)),
        c = r(n(51)),
        u = r(n(52))
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(10);
    t.default = function(e) {
        e.registerHelper("blockHelperMissing", function(t, n) {
            var i = n.inverse,
                o = n.fn;
            if (!0 === t) return o(this);
            if (!1 === t || null == t) return i(this);
            if (r.isArray(t)) return t.length > 0 ? (n.ids && (n.ids = [n.name]), e.helpers.each(t, n)) : i(this);
            if (n.data && n.ids) {
                var a = r.createFrame(n.data);
                a.contextPath = r.appendContextPath(n.data.contextPath, n.name), n = {
                    data: a
                }
            }
            return o(t, n)
        })
    }, e.exports = t.default
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r, i = n(10),
        o = n(15),
        a = (r = o) && r.__esModule ? r : {
            default: r
        };
    t.default = function(e) {
        e.registerHelper("each", function(e, t) {
            if (!t) throw new a.default("Must pass iterator to #each");
            var n = t.fn,
                r = t.inverse,
                o = 0,
                s = "",
                l = void 0,
                c = void 0;

            function u(t, r, o) {
                l && (l.key = t, l.index = r, l.first = 0 === r, l.last = !!o, c && (l.contextPath = c + t)), s += n(e[t], {
                    data: l,
                    blockParams: i.blockParams([e[t], t], [c + t, null])
                })
            }
            if (t.data && t.ids && (c = i.appendContextPath(t.data.contextPath, t.ids[0]) + "."), i.isFunction(e) && (e = e.call(this)), t.data && (l = i.createFrame(t.data)), e && "object" == typeof e)
                if (i.isArray(e))
                    for (var d = e.length; o < d; o++) o in e && u(o, o, o === e.length - 1);
                else {
                    var f = void 0;
                    for (var p in e) e.hasOwnProperty(p) && (void 0 !== f && u(f, o - 1), f = p, o++);
                    void 0 !== f && u(f, o - 1, !0)
                }
            return 0 === o && (s = r(this)), s
        })
    }, e.exports = t.default
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r, i = n(15),
        o = (r = i) && r.__esModule ? r : {
            default: r
        };
    t.default = function(e) {
        e.registerHelper("helperMissing", function() {
            if (1 !== arguments.length) throw new o.default('Missing helper: "' + arguments[arguments.length - 1].name + '"')
        })
    }, e.exports = t.default
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(10);
    t.default = function(e) {
        e.registerHelper("if", function(e, t) {
            return r.isFunction(e) && (e = e.call(this)), !t.hash.includeZero && !e || r.isEmpty(e) ? t.inverse(this) : t.fn(this)
        }), e.registerHelper("unless", function(t, n) {
            return e.helpers.if.call(this, t, {
                fn: n.inverse,
                inverse: n.fn,
                hash: n.hash
            })
        })
    }, e.exports = t.default
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = function(e) {
        e.registerHelper("log", function() {
            for (var t = [void 0], n = arguments[arguments.length - 1], r = 0; r < arguments.length - 1; r++) t.push(arguments[r]);
            var i = 1;
            null != n.hash.level ? i = n.hash.level : n.data && null != n.data.level && (i = n.data.level), t[0] = i, e.log.apply(e, t)
        })
    }, e.exports = t.default
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = function(e) {
        e.registerHelper("lookup", function(e, t) {
            return e ? "constructor" !== t || e.propertyIsEnumerable(t) ? e[t] : void 0 : e
        })
    }, e.exports = t.default
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(10);
    t.default = function(e) {
        e.registerHelper("with", function(e, t) {
            r.isFunction(e) && (e = e.call(this));
            var n = t.fn;
            if (r.isEmpty(e)) return t.inverse(this);
            var i = t.data;
            return t.data && t.ids && ((i = r.createFrame(t.data)).contextPath = r.appendContextPath(t.data.contextPath, t.ids[0])), n(e, {
                data: i,
                blockParams: r.blockParams([e], [i && i.contextPath])
            })
        })
    }, e.exports = t.default
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.registerDefaultDecorators = function(e) {
        o.default(e)
    };
    var r, i = n(54),
        o = (r = i) && r.__esModule ? r : {
            default: r
        }
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(10);
    t.default = function(e) {
        e.registerDecorator("inline", function(e, t, n, i) {
            var o = e;
            return t.partials || (t.partials = {}, o = function(i, o) {
                var a = n.partials;
                n.partials = r.extend({}, a, t.partials);
                var s = e(i, o);
                return n.partials = a, s
            }), t.partials[i.args[0]] = i.fn, o
        })
    }, e.exports = t.default
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(10),
        i = {
            methodMap: ["debug", "info", "warn", "error"],
            level: "info",
            lookupLevel: function(e) {
                if ("string" == typeof e) {
                    var t = r.indexOf(i.methodMap, e.toLowerCase());
                    e = t >= 0 ? t : parseInt(e, 10)
                }
                return e
            },
            log: function(e) {
                if (e = i.lookupLevel(e), "undefined" != typeof console && i.lookupLevel(i.level) <= e) {
                    var t = i.methodMap[e];
                    console[t] || (t = "log");
                    for (var n = arguments.length, r = Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++) r[o - 1] = arguments[o];
                    console[t].apply(console, r)
                }
            }
        };
    t.default = i, e.exports = t.default
}, function(e, t, n) {
    "use strict";

    function r(e) {
        this.string = e
    }
    t.__esModule = !0, r.prototype.toString = r.prototype.toHTML = function() {
        return "" + this.string
    }, t.default = r, e.exports = t.default
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.checkRevision = function(e) {
        var t = e && e[0] || 1,
            n = s.COMPILER_REVISION;
        if (t !== n) {
            if (t < n) {
                var r = s.REVISION_CHANGES[n],
                    i = s.REVISION_CHANGES[t];
                throw new a.default("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + r + ") or downgrade your runtime to an older version (" + i + ").")
            }
            throw new a.default("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + e[1] + ").")
        }
    }, t.template = function(e, t) {
        if (!t) throw new a.default("No environment passed to template");
        if (!e || !e.main) throw new a.default("Unknown template object: " + typeof e);
        e.main.decorator = e.main_d, t.VM.checkRevision(e.compiler);
        var n = {
            strict: function(e, t) {
                if (!(t in e)) throw new a.default('"' + t + '" not defined in ' + e);
                return e[t]
            },
            lookup: function(e, t) {
                for (var n = e.length, r = 0; r < n; r++)
                    if (e[r] && null != e[r][t]) return e[r][t]
            },
            lambda: function(e, t) {
                return "function" == typeof e ? e.call(t) : e
            },
            escapeExpression: i.escapeExpression,
            invokePartial: function(n, r, o) {
                o.hash && (r = i.extend({}, r, o.hash), o.ids && (o.ids[0] = !0)), n = t.VM.resolvePartial.call(this, n, r, o);
                var s = t.VM.invokePartial.call(this, n, r, o);
                if (null == s && t.compile && (o.partials[o.name] = t.compile(n, e.compilerOptions, t), s = o.partials[o.name](r, o)), null != s) {
                    if (o.indent) {
                        for (var l = s.split("\n"), c = 0, u = l.length; c < u && (l[c] || c + 1 !== u); c++) l[c] = o.indent + l[c];
                        s = l.join("\n")
                    }
                    return s
                }
                throw new a.default("The partial " + o.name + " could not be compiled when running in runtime-only mode")
            },
            fn: function(t) {
                var n = e[t];
                return n.decorator = e[t + "_d"], n
            },
            programs: [],
            program: function(e, t, n, r, i) {
                var o = this.programs[e],
                    a = this.fn(e);
                return t || i || r || n ? o = l(this, e, a, t, n, r, i) : o || (o = this.programs[e] = l(this, e, a)), o
            },
            data: function(e, t) {
                for (; e && t--;) e = e._parent;
                return e
            },
            merge: function(e, t) {
                var n = e || t;
                return e && t && e !== t && (n = i.extend({}, t, e)), n
            },
            nullContext: Object.seal({}),
            noop: t.VM.noop,
            compilerInfo: e.compiler
        };

        function r(t) {
            var i = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
                o = i.data;
            r._setup(i), !i.partial && e.useData && (o = function(e, t) {
                t && "root" in t || ((t = t ? s.createFrame(t) : {}).root = e);
                return t
            }(t, o));
            var a = void 0,
                l = e.useBlockParams ? [] : void 0;

            function c(t) {
                return "" + e.main(n, t, n.helpers, n.partials, o, l, a)
            }
            return e.useDepths && (a = i.depths ? t != i.depths[0] ? [t].concat(i.depths) : i.depths : [t]), (c = u(e.main, c, n, i.depths || [], o, l))(t, i)
        }
        return r.isTop = !0, r._setup = function(r) {
            r.partial ? (n.helpers = r.helpers, n.partials = r.partials, n.decorators = r.decorators) : (n.helpers = n.merge(r.helpers, t.helpers), e.usePartial && (n.partials = n.merge(r.partials, t.partials)), (e.usePartial || e.useDecorators) && (n.decorators = n.merge(r.decorators, t.decorators)))
        }, r._child = function(t, r, i, o) {
            if (e.useBlockParams && !i) throw new a.default("must pass block params");
            if (e.useDepths && !o) throw new a.default("must pass parent depths");
            return l(n, t, e[t], r, 0, i, o)
        }, r
    }, t.wrapProgram = l, t.resolvePartial = function(e, t, n) {
        e ? e.call || n.name || (n.name = e, e = n.partials[e]) : e = "@partial-block" === n.name ? n.data["partial-block"] : n.partials[n.name];
        return e
    }, t.invokePartial = function(e, t, n) {
        var r = n.data && n.data["partial-block"];
        n.partial = !0, n.ids && (n.data.contextPath = n.ids[0] || n.data.contextPath);
        var o = void 0;
        n.fn && n.fn !== c && function() {
            n.data = s.createFrame(n.data);
            var e = n.fn;
            o = n.data["partial-block"] = function(t) {
                var n = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
                return n.data = s.createFrame(n.data), n.data["partial-block"] = r, e(t, n)
            }, e.partials && (n.partials = i.extend({}, n.partials, e.partials))
        }();
        void 0 === e && o && (e = o);
        if (void 0 === e) throw new a.default("The partial " + n.name + " could not be found");
        if (e instanceof Function) return e(t, n)
    }, t.noop = c;
    var r, i = function(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e)
                for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
            return t.default = e, t
        }(n(10)),
        o = n(15),
        a = (r = o) && r.__esModule ? r : {
            default: r
        },
        s = n(27);

    function l(e, t, n, r, i, o, a) {
        function s(t) {
            var i = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
                s = a;
            return !a || t == a[0] || t === e.nullContext && null === a[0] || (s = [t].concat(a)), n(e, t, e.helpers, e.partials, i.data || r, o && [i.blockParams].concat(o), s)
        }
        return (s = u(n, s, e, a, r, o)).program = t, s.depth = a ? a.length : 0, s.blockParams = i || 0, s
    }

    function c() {
        return ""
    }

    function u(e, t, n, r, o, a) {
        if (e.decorator) {
            var s = {};
            t = e.decorator(t, s, n, r && r[0], o, a, r), i.extend(t, s)
        }
        return t
    }
}, function(e, t, n) {
    "use strict";
    (function(n) {
        t.__esModule = !0, t.default = function(e) {
            var t = void 0 !== n ? n : window,
                r = t.Handlebars;
            e.noConflict = function() {
                return t.Handlebars === e && (t.Handlebars = r), e
            }
        }, e.exports = t.default
    }).call(this, n(59))
}, function(e, t) {
    var n;
    n = function() {
        return this
    }();
    try {
        n = n || new Function("return this")()
    } catch (e) {
        "object" == typeof window && (n = window)
    }
    e.exports = n
}, function(e, t, n) {
    var r = n(6);
    e.exports = (r.default || r).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, r, i) {
            var o, a, s = e.lambda,
                l = e.escapeExpression,
                c = null != t ? t : e.nullContext || {},
                u = n.helperMissing;
            return '<div id="ally-instructor-feedback-iframe" class="ally-iframe-mask" role="dialog"\n     aria-label="' + l(s(null != (o = null != t ? t.i18n : t) ? o.INSTRUCTOR_FEEDBACK : o, t)) + '">\n    <div id="ally-instructor-feedback-iframe-start" tabindex="0" aria-hidden="true"></div>\n    <img tabindex="-1" src="' + l("function" == typeof(a = null != (a = n.ALLY_DOMAIN || (null != t ? t.ALLY_DOMAIN : t)) ? a : u) ? a.call(c, {
                name: "ALLY_DOMAIN",
                hash: {},
                data: i
            }) : a) + l(s(null != (o = null != t ? t.images : t) ? o.loading : o, t)) + '"\n         title="' + l(s(null != (o = null != t ? t.i18n : t) ? o.LOADING_INSTRUCTOR_FEEDBACK_PLEASE_WAIT : o, t)) + '"\n         alt="' + l(s(null != (o = null != t ? t.i18n : t) ? o.LOADING_INSTRUCTOR_FEEDBACK_PLEASE_WAIT : o, t)) + '" />\n    <button class="ally-iframe-close">\n        <img src="' + l("function" == typeof(a = null != (a = n.ALLY_DOMAIN || (null != t ? t.ALLY_DOMAIN : t)) ? a : u) ? a.call(c, {
                name: "ALLY_DOMAIN",
                hash: {},
                data: i
            }) : a) + l(s(null != (o = null != (o = null != t ? t.images : t) ? o.materialIcons : o) ? o.close : o, t)) + '" title="' + l(s(null != (o = null != t ? t.i18n : t) ? o.CANCEL : o, t)) + '"\n             alt="' + l(s(null != (o = null != t ? t.i18n : t) ? o.CANCEL : o, t)) + '" />\n    </button>\n    <div id="ally-instructor-feedback-iframe-end" tabindex="0" aria-hidden="true"></div>\n    <iframe title="' + l(s(null != (o = null != t ? t.i18n : t) ? o.INSTRUCTOR_FEEDBACK : o, t)) + '" class="ally-iframe" src="' + l("function" == typeof(a = null != (a = n.ALLY_DOMAIN || (null != t ? t.ALLY_DOMAIN : t)) ? a : u) ? a.call(c, {
                name: "ALLY_DOMAIN",
                hash: {},
                data: i
            }) : a) + "/instructorfeedback?locale=" + l("function" == typeof(a = null != (a = n.locale || (null != t ? t.locale : t)) ? a : u) ? a.call(c, {
                name: "locale",
                hash: {},
                data: i
            }) : a) + '"></iframe>\n</div>\n'
        },
        useData: !0
    })
}, function(e, t, n) {
    var r = n(6);
    e.exports = (r.default || r).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, r, i) {
            var o, a, s = null != t ? t : e.nullContext || {},
                l = n.helperMissing,
                c = "function",
                u = e.escapeExpression,
                d = e.lambda;
            return '<span\n    data-ally-content-ref="' + u(typeof(a = null != (a = n.contentId || (null != t ? t.contentId : t)) ? a : l) === c ? a.call(s, {
                name: "contentId",
                hash: {},
                data: i
            }) : a) + '"\n    data-ally-show="instructorfeedback"\n    data-ally-show-display="inline-block"\n    data-ally-show-always-show-for-image="' + u(typeof(a = null != (a = n.alwaysShowForImage || (null != t ? t.alwaysShowForImage : t)) ? a : l) === c ? a.call(s, {
                name: "alwaysShowForImage",
                hash: {},
                data: i
            }) : a) + '"\n    class="ally-scoreindicator-container"\n    style="display: none;">\n\n    <button\n        data-ally-content-ref="' + u(typeof(a = null != (a = n.contentId || (null != t ? t.contentId : t)) ? a : l) === c ? a.call(s, {
                name: "contentId",
                hash: {},
                data: i
            }) : a) + '"\n        data-ally-invoke="instructorfeedback"\n        data-ally-show="instructorfeedback-score-perfect"\n        data-ally-show-display="inline-block"\n        data-ally-show-always-show-for-image="' + u(typeof(a = null != (a = n.alwaysShowForImage || (null != t ? t.alwaysShowForImage : t)) ? a : l) === c ? a.call(s, {
                name: "alwaysShowForImage",
                hash: {},
                data: i
            }) : a) + '"\n        data-ally-invoke-prop-target="' + u(typeof(a = null != (a = n.target || (null != t ? t.target : t)) ? a : l) === c ? a.call(s, {
                name: "target",
                hash: {},
                data: i
            }) : a) + '"\n        data-ally-tooltip\n        class="ally-scoreindicator"\n        title="' + u(d(null != (o = null != t ? t.i18n : t) ? o.ACCESSIBILITY_SCORE_PERFECT : o, t)) + '"\n        aria-label="' + u(d(null != (o = null != t ? t.i18n : t) ? o.ACCESSIBILITY_SCORE_PERFECT : o, t)) + '">\n        <img src="' + u(typeof(a = null != (a = n.baseUrl || (null != t ? t.baseUrl : t)) ? a : l) === c ? a.call(s, {
                name: "baseUrl",
                hash: {},
                data: i
            }) : a) + "/" + u(d(null != (o = null != t ? t.icons : t) ? o.perfect : o, t)) + '" alt="" aria-hidden="true" />\n    </button>\n\n    <button\n        data-ally-content-ref="' + u(typeof(a = null != (a = n.contentId || (null != t ? t.contentId : t)) ? a : l) === c ? a.call(s, {
                name: "contentId",
                hash: {},
                data: i
            }) : a) + '"\n        data-ally-invoke="instructorfeedback"\n        data-ally-show="instructorfeedback-score-high"\n        data-ally-show-display="inline-block"\n        data-ally-show-always-show-for-image="' + u(typeof(a = null != (a = n.alwaysShowForImage || (null != t ? t.alwaysShowForImage : t)) ? a : l) === c ? a.call(s, {
                name: "alwaysShowForImage",
                hash: {},
                data: i
            }) : a) + '"\n        data-ally-invoke-prop-target="' + u(typeof(a = null != (a = n.target || (null != t ? t.target : t)) ? a : l) === c ? a.call(s, {
                name: "target",
                hash: {},
                data: i
            }) : a) + '"\n        data-ally-tooltip\n        class="ally-scoreindicator"\n        title="' + u(d(null != (o = null != t ? t.i18n : t) ? o.ACCESSIBILITY_SCORE_HIGH : o, t)) + "&#10;" + u(d(null != (o = null != t ? t.i18n : t) ? o.CLICK_TO_IMPROVE : o, t)) + '"\n        aria-label="' + u(d(null != (o = null != t ? t.i18n : t) ? o.ACCESSIBILITY_SCORE_HIGH : o, t)) + "&#10;" + u(d(null != (o = null != t ? t.i18n : t) ? o.CLICK_TO_IMPROVE : o, t)) + '">\n        <img src="' + u(typeof(a = null != (a = n.baseUrl || (null != t ? t.baseUrl : t)) ? a : l) === c ? a.call(s, {
                name: "baseUrl",
                hash: {},
                data: i
            }) : a) + "/" + u(d(null != (o = null != t ? t.icons : t) ? o.high : o, t)) + '" alt="" aria-hidden="true" />\n    </button>\n\n    <button\n        data-ally-content-ref="' + u(typeof(a = null != (a = n.contentId || (null != t ? t.contentId : t)) ? a : l) === c ? a.call(s, {
                name: "contentId",
                hash: {},
                data: i
            }) : a) + '"\n        data-ally-invoke="instructorfeedback"\n        data-ally-show="instructorfeedback-score-medium"\n        data-ally-show-display="inline-block"\n        data-ally-show-always-show-for-image="' + u(typeof(a = null != (a = n.alwaysShowForImage || (null != t ? t.alwaysShowForImage : t)) ? a : l) === c ? a.call(s, {
                name: "alwaysShowForImage",
                hash: {},
                data: i
            }) : a) + '"\n        data-ally-invoke-prop-target="' + u(typeof(a = null != (a = n.target || (null != t ? t.target : t)) ? a : l) === c ? a.call(s, {
                name: "target",
                hash: {},
                data: i
            }) : a) + '"\n        data-ally-tooltip\n        class="ally-scoreindicator"\n        title="' + u(d(null != (o = null != t ? t.i18n : t) ? o.ACCESSIBILITY_SCORE_MEDIUM : o, t)) + "&#10;" + u(d(null != (o = null != t ? t.i18n : t) ? o.CLICK_TO_IMPROVE : o, t)) + '"\n        aria-label="' + u(d(null != (o = null != t ? t.i18n : t) ? o.ACCESSIBILITY_SCORE_MEDIUM : o, t)) + "&#10;" + u(d(null != (o = null != t ? t.i18n : t) ? o.CLICK_TO_IMPROVE : o, t)) + '">\n        <img src="' + u(typeof(a = null != (a = n.baseUrl || (null != t ? t.baseUrl : t)) ? a : l) === c ? a.call(s, {
                name: "baseUrl",
                hash: {},
                data: i
            }) : a) + "/" + u(d(null != (o = null != t ? t.icons : t) ? o.medium : o, t)) + '" alt="" aria-hidden="true" />\n    </button>\n\n    <button\n        data-ally-content-ref="' + u(typeof(a = null != (a = n.contentId || (null != t ? t.contentId : t)) ? a : l) === c ? a.call(s, {
                name: "contentId",
                hash: {},
                data: i
            }) : a) + '"\n        data-ally-invoke="instructorfeedback"\n        data-ally-show="instructorfeedback-score-low"\n        data-ally-show-display="inline-block"\n        data-ally-show-always-show-for-image="' + u(typeof(a = null != (a = n.alwaysShowForImage || (null != t ? t.alwaysShowForImage : t)) ? a : l) === c ? a.call(s, {
                name: "alwaysShowForImage",
                hash: {},
                data: i
            }) : a) + '"\n        data-ally-invoke-prop-target="' + u(typeof(a = null != (a = n.target || (null != t ? t.target : t)) ? a : l) === c ? a.call(s, {
                name: "target",
                hash: {},
                data: i
            }) : a) + '"\n        data-ally-tooltip\n        class="ally-scoreindicator"\n        title="' + u(d(null != (o = null != t ? t.i18n : t) ? o.ACCESSIBILITY_SCORE_LOW : o, t)) + "&#10;" + u(d(null != (o = null != t ? t.i18n : t) ? o.CLICK_TO_IMPROVE : o, t)) + '"\n        aria-label="' + u(d(null != (o = null != t ? t.i18n : t) ? o.ACCESSIBILITY_SCORE_LOW : o, t)) + "&#10;" + u(d(null != (o = null != t ? t.i18n : t) ? o.CLICK_TO_IMPROVE : o, t)) + '">\n        <img src="' + u(typeof(a = null != (a = n.baseUrl || (null != t ? t.baseUrl : t)) ? a : l) === c ? a.call(s, {
                name: "baseUrl",
                hash: {},
                data: i
            }) : a) + "/" + u(d(null != (o = null != t ? t.icons : t) ? o.low : o, t)) + '" alt="" aria-hidden="true" />\n    </button>\n</span>\n'
        },
        useData: !0
    })
}, function(e, t, n) {
    e.exports = n.p + "static/integration/img/ally-icon-indicator-high-learnUltra.e0e3bd3392a2e45e8ca17c81e764e07f.svg"
}, function(e, t, n) {
    e.exports = n.p + "static/integration/img/ally-icon-indicator-low-learnUltra.a78e78c6f0e59a35fef49e20a1cbe45e.svg"
}, function(e, t, n) {
    e.exports = n.p + "static/integration/img/ally-icon-indicator-medium-learnUltra.8f18c65040f94840495229a08f67ee03.svg"
}, function(e, t, n) {
    e.exports = n.p + "static/integration/img/ally-icon-indicator-perfect-learnUltra.cd4d0bf4d0103256abd2ba724792290f.svg"
}, function(e, t, n) {
    var r = n(6);
    e.exports = (r.default || r).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, r, i) {
            var o, a, s = e.lambda,
                l = e.escapeExpression;
            return '<div class="ally-image-seizure-guard">\n    <button title="' + l(s(null != (o = null != t ? t.i18n : t) ? o.POTENTIALLY_SEIZURE_INDUCING_ANIMATION_PRESS_TO_ENABLE : o, t)) + '">\n        <img src="' + l("function" == typeof(a = null != (a = n.ALLY_DOMAIN || (null != t ? t.ALLY_DOMAIN : t)) ? a : n.helperMissing) ? a.call(null != t ? t : e.nullContext || {}, {
                name: "ALLY_DOMAIN",
                hash: {},
                data: i
            }) : a) + "/" + l(s(null != (o = null != t ? t.icons : t) ? o.seizureFlag : o, t)) + '" />\n    </button>\n</div>\n'
        },
        useData: !0
    })
}, function(e, t, n) {
    "use strict";
    n.r(t), n.d(t, "launch", function() {
        return l
    }), n.d(t, "launchWebpage", function() {
        return c
    }), n.d(t, "launchDirectFileOnWebpage", function() {
        return u
    }), n.d(t, "launchAaasContent", function() {
        return d
    }), n.d(t, "reset", function() {
        return f
    });
    var r = n(1),
        i = n(4),
        o = n(13),
        a = null,
        s = {
            closed: function() {},
            formatGenerated: y,
            openUrl: void 0,
            alternativeFormatAccessed: void 0
        };

    function l(e, t, n, r, i, o, a, l, c, u) {
        c = p(c), u = u || {}, s.closed = u.closed || function() {}, s.formatGenerated = u.formatGenerated || y, s.openUrl = u.openUrl || void 0, s.alternativeFormatAccessed = u.alternativeFormatAccessed || void 0;
        var d = !!u.openUrl;
        (function(e) {
            if (!e) return Promise.resolve(null);
            return Promise.resolve().then(function() {
                return (new TextEncoder).encode(e)
            }).then(function(e) {
                return crypto.subtle.digest("SHA-1", e)
            }).then(function(e) {
                return Array.from(new Uint8Array(e))
            }).then(function(e) {
                return e.map(function(e) {
                    return e.toString(16).padStart(2, "0")
                }).join("")
            }).catch(function(e) {
                return console.error("Ally: Unable to generate a SHA-1 hash of the WYSIWYG content. This might prevent access to items behind conditional release."), console.error(e), null
            })
        })(c.content).then(function(s) {
            h(), I("accessible-versions-show", {
                associatedFiles: c.associatedFiles,
                availableAlternativeFormats: a.availableAlternativeFormats,
                baseUrl: e,
                clientId: r,
                contentHash: s,
                courseId: i,
                contentId: o,
                fileId: a.id,
                fileType: a.type,
                fromPageUrl: window.location.href,
                hasOpenUrlHandler: d,
                opts: c,
                platformName: t,
                platformUi: n,
                richContentId: a.id,
                uploadType: a.uploadType
            }), m(l, c.parentSelector, t)
        })
    }

    function c(e, t, n, r, i, o, a, l, c) {
        l = p(l), c = c || {}, s.closed = c.closed || function() {}, s.formatGenerated = c.formatGenerated || y, s.openUrl = c.openUrl || void 0, s.alternativeFormatAccessed = c.alternativeFormatAccessed || void 0;
        var u = !!c.openUrl;
        h(), I("accessible-versions-show", {
            baseUrl: e,
            clientId: r,
            contentId: i,
            fromPageUrl: window.location.href,
            hasOpenUrlHandler: u,
            opts: l,
            platformName: t,
            platformUi: n,
            webpage: o
        }), m(a, void 0, t)
    }

    function u(e, t, n, r, i, o, a, l, c, u) {
        l = p(l), c = c || {}, s.closed = c.closed || function() {}, s.formatGenerated = c.formatGenerated || y, s.openUrl = c.openUrl || void 0, s.alternativeFormatAccessed = c.alternativeFormatAccessed || void 0;
        var d = !!c.openUrl;
        h(), I("accessible-versions-show", {
            baseUrl: e,
            clientId: r,
            contentId: i,
            directFileInfo: u,
            fromPageUrl: window.location.href,
            hasOpenUrlHandler: d,
            opts: l,
            platformName: t,
            platformUi: n,
            webpage: o
        }), m(a, void 0, t)
    }

    function d(e, t, n, r, i, o, a, l, c) {
        a = p(a), l = l || {}, s.closed = l.closed || function() {}, s.formatGenerated = l.formatGenerated || y, s.openUrl = l.openUrl || void 0, s.alternativeFormatAccessed = l.alternativeFormatAccessed || void 0;
        var u = !!l.openUrl;
        h(), I("accessible-versions-show", {
            baseUrl: e,
            clientId: r,
            contentId: i,
            contentInfo: c,
            fromPageUrl: window.location.href,
            hasOpenUrlHandler: u,
            opts: a,
            platformName: t,
            platformUi: n
        }), m(o, void 0, t)
    }

    function f() {
        r("#ally-accessible-versions-iframe").remove(), r(document.body).removeClass("ally-accessible-versions-active")
    }

    function p(e) {
        return (e = e || {}).locale = e.locale || r("html").attr("lang"), e.closeWhenFormatReady = !1 !== e.closeWhenFormatReady, e.renderAudioOnMobileInline = !1 !== e.renderAudioOnMobileInline, e
    }

    function h() {
        i.listen("init", function(e, t, n) {
            var r, o;
            r = n.source, o = t, a && i.send(r, a.subject, a.data, o)
        }), i.listen("hide", E), i.listen("active", g), i.listen("downloadReady", function(e) {
            s.formatGenerated(e)
        }), i.listen("alternativeFormatAccessed", function(e) {
            var t = s.alternativeFormatAccessed;
            t && t(e)
        }), i.listen("openUrl", function(e) {
            var t;
            t = e.url, s.openUrl && s.openUrl(t)
        })
    }

    function m(e, t, n) {
        (l || t) && f();
        var s = document.documentElement.scrollTop;
        if (0 === r("#ally-accessible-versions-iframe").length) {
            var l = t && r(t)[0];
            r(l || document.body).append(e), Object(o.repositionIframe)(r("#ally-accessible-versions-iframe"), s, n, "iframe").show().focus(), v()
        } else {
            document.activeElement.blur();
            var c = Object(o.repositionIframe)(r("#ally-accessible-versions-iframe"), s, n, "iframe").show().focus();
            v(), i.send(c[0].contentWindow, a.subject, a.data)
        }
        r(document.body).addClass("ally-accessible-versions-active")
    }

    function g() {
        r("#ally-accessible-versions-iframe").focus(), v(), i.send(r("#ally-accessible-versions-iframe")[0].contentWindow, "accessible-versions-focus"), r(document.body).on("focusin.ally", function(e) {
            e.target && "ally-accessible-versions-iframe" !== e.target.id && setTimeout(function() {
                g()
            })
        }), r("body > *:not(#ally-accessible-versions-iframe)").each(function(e, t) {
            var n = r(t),
                i = n.attr("aria-hidden") || "";
            n.attr("data-ally-prev-aria-hidden", i), n.attr("aria-hidden", "true")
        })
    }

    function v() {
        setTimeout(function() {
            void 0 !== r("#ally-accessible-versions-iframe").contentWindow && r("#ally-accessible-versions-iframe h2")[0].focus()
        }, 300)
    }

    function E() {
        Object(o.resetIframeStyles)(r("#ally-accessible-versions-iframe")).hide(), r(document.body).removeClass("ally-accessible-versions-active"), r(document.body).off("focusin.ally"), r("[data-ally-prev-aria-hidden]").each(function(e, t) {
            var n = r(t),
                i = n.attr("data-ally-prev-aria-hidden");
            n.removeAttr("data-ally-prev-aria-hidden"), i ? n.attr("aria-hidden", i) : n.removeAttr("aria-hidden")
        }), s.closed && (s.closed(), s.closed = null)
    }

    function y(e) {
        E(), i.send(r("#ally-accessible-versions-iframe")[0].contentWindow, "accessible-versions-reset"), window.location = e.url
    }

    function I(e, t) {
        a = {
            subject: e,
            data: t
        }
    }
}, function(e, t, n) {
    "use strict";
    var r = this && this.__awaiter || function(e, t, n, r) {
            return new(n || (n = Promise))(function(i, o) {
                function a(e) {
                    try {
                        l(r.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function s(e) {
                    try {
                        l(r.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function l(e) {
                    var t;
                    e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n(function(e) {
                        e(t)
                    })).then(a, s)
                }
                l((r = r.apply(e, t || [])).next())
            })
        },
        i = this && this.__generator || function(e, t) {
            var n, r, i, o, a = {
                label: 0,
                sent: function() {
                    if (1 & i[0]) throw i[1];
                    return i[1]
                },
                trys: [],
                ops: []
            };
            return o = {
                next: s(0),
                throw: s(1),
                return: s(2)
            }, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
                return this
            }), o;

            function s(o) {
                return function(s) {
                    return function(o) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i;
                            switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                                case 0:
                                case 1:
                                    i = o;
                                    break;
                                case 4:
                                    return a.label++, {
                                        value: o[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++, r = o[1], o = [0];
                                    continue;
                                case 7:
                                    o = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                        a.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && a.label < i[1]) {
                                        a.label = i[1], i = o;
                                        break
                                    }
                                    if (i && a.label < i[2]) {
                                        a.label = i[2], a.ops.push(o);
                                        break
                                    }
                                    i[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            o = t.call(e, a)
                        } catch (e) {
                            o = [6, e], r = 0
                        } finally {
                            n = i = 0
                        }
                        if (5 & o[0]) throw o[1];
                        return {
                            value: o[0] ? o[1] : void 0,
                            done: !0
                        }
                    }([o, s])
                }
            }
        };
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.ProtoframePubsub = t.ProtoframePublisher = t.ProtoframeSubscriber = void 0;
    var o = n(69);

    function a(e, t, n) {
        return e.type + "#" + t + "#" + n
    }

    function s(e, t, n, r, i) {
        return {
            body: i,
            id: r,
            type: a(e, t, n)
        }
    }

    function l(e, t, n, r) {
        if (o.hasValue(r)) {
            var i = r.type;
            if (o.hasValue(i) && o.hasValue(r.body)) {
                var a = i.split("#"),
                    s = a[0],
                    l = a[1],
                    c = a[2];
                return s === e.type && l === t && c === n
            }
            return !1
        }
        return !1
    }

    function c(e) {
        e.forEach(function(e) {
            var t = e[0],
                n = e[1];
            return t.removeEventListener("message", n)
        }), e.length = 0
    }

    function u(e, t, n, r) {
        return new Promise(function(i) {
            var a = function(s) {
                var l = s.data;
                (function(e, t, n) {
                    if (o.hasValue(n)) {
                        var r = n.type;
                        if (o.hasValue(r) && o.hasValue(n.response)) {
                            var i = r.split("#"),
                                a = i[0],
                                s = i[1],
                                l = i[2];
                            return a === e.type && "ask" === s && l === t
                        }
                        return !1
                    }
                    return !1
                })(t, n, l) && l.id === r && (e.removeEventListener("message", a), i(l.response))
            };
            e.addEventListener("message", a)
        })
    }

    function d(e, t, n, r) {
        var i = function(e) {
            var i = e.data;
            l(t, "tell", n, i) && r(i.body)
        };
        return e.addEventListener("message", i), [e, i]
    }

    function f(e, t, n, o, s, c) {
        var u = this,
            d = function(e) {
                return r(u, void 0, void 0, function() {
                    var r, u;
                    return i(this, function(i) {
                        switch (i.label) {
                            case 0:
                                return r = e.data, l(n, "ask", o, r) ? [4, c(r.body)] : [3, 2];
                            case 1:
                                u = i.sent(), t.postMessage(function(e, t, n, r) {
                                    return {
                                        id: n,
                                        response: r,
                                        type: a(e, "ask", t)
                                    }
                                }(n, o, r.id, u), s), i.label = 2;
                            case 2:
                                return [2]
                        }
                    })
                })
            };
        return e.addEventListener("message", d), [e, d]
    }

    function p(e, t, n, r, i) {
        var o = Math.random().toString();
        return e.postMessage(s(t, "tell", n, o, r), i)
    }

    function h(e, t, n, o, a, l, c) {
        return r(this, void 0, void 0, function() {
            var d, f, p = this;
            return i(this, function(h) {
                return d = Math.random().toString(), f = new Promise(function(t, a) {
                    return r(p, void 0, void 0, function() {
                        var r, s;
                        return i(this, function(i) {
                            switch (i.label) {
                                case 0:
                                    return r = setTimeout(function() {
                                        return a(new Error("Failed to get response within " + c + "ms"))
                                    }, c), [4, u(e, n, o, d)];
                                case 1:
                                    return s = i.sent(), clearTimeout(r), t(s), [2]
                            }
                        })
                    })
                }), t.postMessage(s(n, "ask", o, d, a), l), [2, f]
            })
        })
    }
    var m = function() {
        function e(e, t) {
            void 0 === t && (t = window), this.protocol = e, this.thisWindow = t, this.listeners = []
        }
        return e.prototype.handleTell = function(e, t) {
            this.listeners.push(d(this.thisWindow, this.protocol, e, t))
        }, e.prototype.destroy = function() {
            c(this.listeners)
        }, e
    }();
    t.ProtoframeSubscriber = m;
    var g = function() {
        function e(e, t, n) {
            void 0 === n && (n = "*"), this.protocol = e, this.targetWindow = t, this.targetOrigin = n, this.listeners = []
        }
        return e.parent = function(t, n, r) {
            var i = n.contentWindow;
            if (o.hasValue(i)) return new e(t, i, r);
            throw new Error("iframe.contentWindow was null")
        }, e.iframe = function(t, n, r) {
            return void 0 === r && (r = window.parent), new e(t, r, n)
        }, e.prototype.tell = function(e, t) {
            p(this.targetWindow, this.protocol, e, t, this.targetOrigin)
        }, e.prototype.destroy = function() {
            c(this.listeners)
        }, e
    }();
    t.ProtoframePublisher = g;
    var v = function() {
        function e(e, t, n, r) {
            void 0 === n && (n = window), void 0 === r && (r = "*"), this.protocol = e, this.targetWindow = t, this.thisWindow = n, this.targetOrigin = r, this.systemProtocol = {
                type: "system|" + this.protocol.type
            }, this.listeners = [], f(n, t, this.systemProtocol, "ping", r, function() {
                return Promise.resolve({})
            })
        }
        return e.connect = function(e, t, n) {
            return void 0 === t && (t = 50), void 0 === n && (n = 500), r(this, void 0, void 0, function() {
                var r;
                return i(this, function(i) {
                    switch (i.label) {
                        case 0:
                            r = 0, i.label = 1;
                        case 1:
                            if (!(r <= t)) return [3, 6];
                            i.label = 2;
                        case 2:
                            return i.trys.push([2, 4, , 5]), [4, e.ping({
                                timeout: n
                            })];
                        case 3:
                            return i.sent(), [2, e];
                        case 4:
                            return i.sent(), [3, 5];
                        case 5:
                            return r++, [3, 1];
                        case 6:
                            throw new Error("Could not connect on protocol " + e.protocol.type + " after " + t * n + "ms")
                    }
                })
            })
        }, e.parent = function(t, n, r, i) {
            void 0 === r && (r = "*"), void 0 === i && (i = window);
            var a = n.contentWindow;
            if (o.hasValue(a)) return new e(t, a, i, r);
            throw new Error("iframe.contentWindow was null")
        }, e.iframe = function(t, n, r) {
            void 0 === n && (n = "*");
            var i = void 0 === r ? {} : r,
                o = i.thisWindow,
                a = void 0 === o ? window : o,
                s = i.targetWindow;
            return new e(t, void 0 === s ? window.parent : s, a, n)
        }, e.prototype.ping = function(e) {
            var t = e.timeout,
                n = void 0 === t ? 1e4 : t;
            return r(this, void 0, void 0, function() {
                return i(this, function(e) {
                    switch (e.label) {
                        case 0:
                            return [4, h(this.thisWindow, this.targetWindow, this.systemProtocol, "ping", {}, this.targetOrigin, n)];
                        case 1:
                            return e.sent(), [2]
                    }
                })
            })
        }, e.prototype.handleTell = function(e, t) {
            this.listeners.push(d(this.thisWindow, this.protocol, e, t))
        }, e.prototype.tell = function(e, t) {
            p(this.targetWindow, this.protocol, e, t, this.targetOrigin)
        }, e.prototype.handleAsk = function(e, t) {
            this.listeners.push(f(this.thisWindow, this.targetWindow, this.protocol, e, this.targetOrigin, t))
        }, e.prototype.ask = function(e, t, n) {
            return void 0 === n && (n = 1e4), h(this.thisWindow, this.targetWindow, this.protocol, e, t, this.targetOrigin, n)
        }, e.prototype.destroy = function() {
            c(this.listeners)
        }, e
    }();
    t.ProtoframePubsub = v
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.hasValue = void 0, t.hasValue = function(e) {
        return null != e
    }
}, function(e, t, n) {
    var r = n(6);
    e.exports = (r.default || r).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, r, i) {
            var o, a = null != t ? t : e.nullContext || {},
                s = n.helperMissing,
                l = e.escapeExpression;
            return '<div class="' + l("function" == typeof(o = null != (o = n.className || (null != t ? t.className : t)) ? o : s) ? o.call(a, {
                name: "className",
                hash: {},
                data: i
            }) : o) + '" contenteditable="false">\n    <span class="ally-preview-selection-content">\n        ' + l("function" == typeof(o = null != (o = n.content || (null != t ? t.content : t)) ? o : s) ? o.call(a, {
                name: "content",
                hash: {},
                data: i
            }) : o) + "\n    </span>\n</div>\n"
        },
        useData: !0
    })
}, function(e, t, n) {
    e.exports = n.p + "static/integration/css/web.76c70cf4cc1a4220d5b7c3ab6e1d258e.css"
}, function(e, t, n) {
    var r, i, o;
    /*!
     * jQuery UI Tabbable 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */
    i = [n(1), n(11), n(73)], void 0 === (o = "function" == typeof(r = function(e) {
        return e.extend(e.expr[":"], {
            tabbable: function(t) {
                var n = e.attr(t, "tabindex"),
                    r = null != n;
                return (!r || n >= 0) && e.ui.focusable(t, r)
            }
        })
    }) ? r.apply(t, i) : r) || (e.exports = o)
}, function(e, t, n) {
    var r, i, o;
    /*!
     * jQuery UI Focusable 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */
    i = [n(1), n(11)], void 0 === (o = "function" == typeof(r = function(e) {
        return e.ui.focusable = function(t, n) {
            var r, i, o, a, s, l = t.nodeName.toLowerCase();
            return "area" === l ? (i = (r = t.parentNode).name, !(!t.href || !i || "map" !== r.nodeName.toLowerCase()) && (o = e("img[usemap='#" + i + "']")).length > 0 && o.is(":visible")) : (/^(input|select|textarea|button|object)$/.test(l) ? (a = !t.disabled) && (s = e(t).closest("fieldset")[0]) && (a = !s.disabled) : a = "a" === l && t.href || n, a && e(t).is(":visible") && function(e) {
                for (var t = e.css("visibility");
                    "inherit" === t;) e = e.parent(), t = e.css("visibility");
                return "hidden" !== t
            }(e(t)))
        }, e.extend(e.expr[":"], {
            focusable: function(t) {
                return e.ui.focusable(t, null != e.attr(t, "tabindex"))
            }
        }), e.ui.focusable
    }) ? r.apply(t, i) : r) || (e.exports = o)
}, function(e, t, n) {
    "use strict";
    n.r(t), n.d(t, "FileReference", function() {
        return i
    });
    var r = n(1);

    function i(e, t, n) {
        this.fileId = e.toString(), this.embed = t, this.uploadType = n || "File"
    }
    i.prototype.id = function() {
        var e = [this.fileId];
        if (this.embed) {
            e.push("embed");
            var t = this.embed.altText;
            "string" === r.type(t) ? e.push(JSON.stringify(t)) : e.push("null")
        }
        return e.join(":")
    }, i.prototype.data = function() {
        return {
            id: this.fileId,
            embed: this.embed,
            uploadType: this.uploadType
        }
    }, i.prototype.isEmbedded = function() {
        return null !== this.embed && void 0 !== this.embed
    }, i.fromAltText = function(e, t) {
        return new i(e, {
            altText: t
        })
    }, i.fromElement = function(e, t, n) {
        if (n = n || {}, "img" === e.prop("tagName").toLowerCase()) {
            var r = e.attr("alt");
            return n.hasOwnProperty("alt") && (r = n.alt), i.fromAltText(t, r)
        }
        return new i(t)
    }, i.fromData = function(e) {
        return new i(e.id, e.embed, e.uploadType)
    }
}, function(e, t, n) {
    e.exports = n.p + "static/integration/learn/ultra.38df02dd9a9a279bc9688933781aa8b0.css"
}, function(e, t, n) {
    "use strict";
    n.r(t), n.d(t, "isAltTextMeaningful", function() {
        return i
    }), n.d(t, "isTextSpecified", function() {
        return o
    }), n.d(t, "isTextAFileName", function() {
        return a
    }), n.d(t, "isTextTheFileName", function() {
        return s
    }), n.d(t, "getRoundedScore", function() {
        return l
    }), n.d(t, "getHighChartFriendlyScore", function() {
        return c
    });
    var r = n(8);

    function i(e, t) {
        var n = o(e),
            r = a(e),
            i = s(e, t);
        return n && !r && !i
    }

    function o(e) {
        return !(!e || !e.trim())
    }

    function a(e) {
        if (e) {
            var t = e.trim().toLowerCase();
            return r.a.isUrlToFile(t) || r.a.isFileName(t)
        }
        return !1
    }

    function s(e, t) {
        if (e && t) {
            var n = r.a.normalizeFileName(e),
                i = r.a.normalizeFileName(t),
                o = r.a.normalizeFileName(r.a.baseName(r.a.sanitize(t))).trim();
            return i === n || o === n
        }
        return !1
    }

    function l(e) {
        return e = e || 0, Math.round(1e3 * e) / 10
    }

    function c(e) {
        const t = l(e);
        return 0 !== t ? t : null
    }
}, function(e, t) {
    var n = {
        __root: {
            ACCESSIBILITY: "Accessibility",
            ACCESSIBILITY_INFORMATION_NOT_AVAILABLE: "Accessibility information not available",
            ACCESSIBILITY_SCORE_HIGH: "Accessibility score: High",
            ACCESSIBILITY_SCORE_LOW: "Accessibility score: Low",
            ACCESSIBILITY_SCORE_MEDIUM: "Accessibility score: Medium",
            ACCESSIBILITY_SCORE_PERCENT: "Accessibility score: {0}",
            ACCESSIBILITY_SCORE_PERFECT: "Accessibility score: Perfect",
            ACTIONS: "Actions",
            ALTERNATIVE_FORMATS: "Alternative formats",
            ATTO_BLOCK_QUOTED: "Quoted",
            ATTO_BLOCK_HEADING_1: "Heading 1",
            ATTO_BLOCK_HEADING_2: "Heading 2",
            ATTO_BLOCK_HEADING_3: "Heading 3",
            ATTO_BLOCK_PLAIN: "Plain",
            ATTO_BLOCK_PRE: "Pre-formatted",
            CANCEL: "Cancel",
            CLICK_TO_IMPROVE: "Select to improve",
            DOWNLOAD: "Download",
            DOWNLOAD_ALTERNATIVE_FORMATS_ELLIPSIS: "Download alternative formats ...",
            DOWNLOAD_OPTIONS: "Download options",
            FILENAME_ALTERNATIVE_FORMAT: "{FILENAME} - Alternative Formats",
            FILE_HAS_BEEN_DELETED: "File has been deleted",
            FILE_TYPE_DOCUMENT: "Document",
            FILE_TYPE_HTML_PAGE: "HTML file",
            FILE_TYPE_IMAGE: "Image",
            FILE_TYPE_OTHER: "Other",
            FILE_TYPE_PDF: "PDF document",
            FILE_TYPE_PRESENTATION: "Presentation",
            FILE_TYPE_SCORE: "{0} - {1}",
            FIX: "Fix",
            INSTRUCTOR_FEEDBACK: "Instructor feedback",
            INSTRUCTOR_FEEDBACK_FOR: "Instructor feedback for {0}",
            LOADING_INSTRUCTOR_FEEDBACK_PLEASE_WAIT: "Loading Instructor Feedback. Please wait.",
            POTENTIALLY_SEIZURE_INDUCING: "Potentially seizure inducing",
            POTENTIALLY_SEIZURE_INDUCING_ANIMATION_PRESS_TO_ENABLE: "Potentially seizure inducing animation. Press to enable.",
            PREVIEW: "Preview",
            SHOW_IMAGE_ANYWAY: "Show image anyway",
            X_OF_Y: "{0} / {1}"
        },
        __ar: {
            ACCESSIBILITY: "إمكانية وصول ذوي الاحتياجات الخاصة",
            ACCESSIBILITY_INFORMATION_NOT_AVAILABLE: "معلومات إمكانية وصول ذوي الاحتياجات الخاصة غير متاحة",
            ACCESSIBILITY_SCORE_HIGH: "درجة إمكانية وصول ذوي الاحتياجات الخاصة: عالية",
            ACCESSIBILITY_SCORE_LOW: "درجة إمكانية وصول ذوي الاحتياجات الخاصة: منخفضة",
            ACCESSIBILITY_SCORE_MEDIUM: "درجة إمكانية وصول ذوي الاحتياجات الخاصة: متوسطة",
            ACCESSIBILITY_SCORE_PERCENT: "درجة إمكانية وصول ذوي الاحتياجات الخاصة: {0}",
            ACCESSIBILITY_SCORE_PERFECT: "درجة إمكانية وصول ذوي الاحتياجات الخاصة: ممتازة",
            ACTIONS: "الإجراءات",
            ALTERNATIVE_FORMATS: "تنسيقات بديلة",
            ATTO_BLOCK_QUOTED: "موضوع بين علامات اقتباس",
            ATTO_BLOCK_HEADING_1: "العنوان 1",
            ATTO_BLOCK_HEADING_2: "العنوان 2",
            ATTO_BLOCK_HEADING_3: "العنوان 3",
            ATTO_BLOCK_PLAIN: "عادي",
            ATTO_BLOCK_PRE: "مُنسَّق مسبقًا",
            CANCEL: "إلغاء الأمر",
            CLICK_TO_IMPROVE: "التحديد للتحسين",
            DOWNLOAD: "تنزيل",
            DOWNLOAD_ALTERNATIVE_FORMATS_ELLIPSIS: "تنزيل تنسيقات بديلة ...",
            DOWNLOAD_OPTIONS: "خيارات التنزيل",
            FILENAME_ALTERNATIVE_FORMAT: "{FILENAME} - التنسيقات البديلة",
            FILE_HAS_BEEN_DELETED: "تم حذف الملف",
            FILE_TYPE_DOCUMENT: "المستند",
            FILE_TYPE_HTML_PAGE: "ملف HTML",
            FILE_TYPE_IMAGE: "الصورة",
            FILE_TYPE_OTHER: "أخرى",
            FILE_TYPE_PDF: "مستند PDF",
            FILE_TYPE_PRESENTATION: "العرض التقديمي",
            FILE_TYPE_SCORE: "{0} - {1}",
            FIX: "إصلاح",
            INSTRUCTOR_FEEDBACK: "ملاحظات المدرس",
            INSTRUCTOR_FEEDBACK_FOR: "ملاحظات المدرس الخاصة بـ {0}",
            LOADING_INSTRUCTOR_FEEDBACK_PLEASE_WAIT: "تحميل ملاحظات المدرس. يرجى الانتظار.",
            POTENTIALLY_SEIZURE_INDUCING: "احتمال حدوث نوبة صرع",
            POTENTIALLY_SEIZURE_INDUCING_ANIMATION_PRESS_TO_ENABLE: "احتمال حدوث نوبة صرع من الرسوم المتحركة. اضغط للتمكين.",
            PREVIEW: "معاينة",
            SHOW_IMAGE_ANYWAY: "إظهار الصورة على أي حال",
            X_OF_Y: "{0} / {1}"
        },
        __ca: {
            ACCESSIBILITY: "Accessibilitat",
            ACCESSIBILITY_INFORMATION_NOT_AVAILABLE: "Informació d'accessibilitat no disponible",
            ACCESSIBILITY_SCORE_HIGH: "Puntuació d'accessibilitat: alta",
            ACCESSIBILITY_SCORE_LOW: "Puntuació d'accessibilitat: baixa",
            ACCESSIBILITY_SCORE_MEDIUM: "Puntuació d'accessibilitat: mitjana",
            ACCESSIBILITY_SCORE_PERCENT: "Puntuació d'accessibilitat: {0}",
            ACCESSIBILITY_SCORE_PERFECT: "Puntuació d'accessibilitat: perfecta",
            ACTIONS: "Accions",
            ALTERNATIVE_FORMATS: "Formats alternatius",
            ATTO_BLOCK_QUOTED: "Entre cometes",
            ATTO_BLOCK_HEADING_1: "Títol 1",
            ATTO_BLOCK_HEADING_2: "Títol 2",
            ATTO_BLOCK_HEADING_3: "Títol 3",
            ATTO_BLOCK_PLAIN: "Sense format",
            ATTO_BLOCK_PRE: "Formatat prèviament",
            CANCEL: "Cancel·la",
            CLICK_TO_IMPROVE: "Seleccioneu per millorar",
            DOWNLOAD: "Descarrega",
            DOWNLOAD_ALTERNATIVE_FORMATS_ELLIPSIS: "Descarrega formats alternatius...",
            DOWNLOAD_OPTIONS: "Opcions de descàrrega",
            FILENAME_ALTERNATIVE_FORMAT: "{FILENAME} - Formats alternatius",
            FILE_HAS_BEEN_DELETED: "S'ha suprimit el fitxer",
            FILE_TYPE_DOCUMENT: "Document",
            FILE_TYPE_HTML_PAGE: "Fitxer HTML",
            FILE_TYPE_IMAGE: "Imatge",
            FILE_TYPE_OTHER: "Altres",
            FILE_TYPE_PDF: "Document PDF",
            FILE_TYPE_PRESENTATION: "Presentació",
            FILE_TYPE_SCORE: "{0} - {1}",
            FIX: "Corregeix",
            INSTRUCTOR_FEEDBACK: "Comentaris de l'instructor",
            INSTRUCTOR_FEEDBACK_FOR: "Comentaris de l'instructor per a {0}",
            LOADING_INSTRUCTOR_FEEDBACK_PLEASE_WAIT: "S'estan carregant els comentaris de l'instructor. Espereu.",
            POTENTIALLY_SEIZURE_INDUCING: "Pot provocar atacs",
            POTENTIALLY_SEIZURE_INDUCING_ANIMATION_PRESS_TO_ENABLE: "Aquesta animació podria provocar atacs. Premeu per activar-la.",
            PREVIEW: "Visualització prèvia",
            SHOW_IMAGE_ANYWAY: "Mostra la imatge de totes maneres",
            X_OF_Y: "{0} / {1}"
        },
        __cy: {
            ACCESSIBILITY: "Hygyrchedd",
            ACCESSIBILITY_INFORMATION_NOT_AVAILABLE: "Gwybodaeth hygyrchedd ddim ar gael",
            ACCESSIBILITY_SCORE_HIGH: "Sgôr hygyrchedd: Uchel",
            ACCESSIBILITY_SCORE_LOW: "Sgôr hygyrchedd: Isel",
            ACCESSIBILITY_SCORE_MEDIUM: "Sgôr hygyrchedd: Canolig",
            ACCESSIBILITY_SCORE_PERCENT: "Sgôr hygyrchedd: {0}",
            ACCESSIBILITY_SCORE_PERFECT: "Sgôr hygyrchedd: Perffaith",
            ACTIONS: "Gweithrediadau",
            ALTERNATIVE_FORMATS: "Fformatau amgen",
            ATTO_BLOCK_QUOTED: "Dyfynnwyd",
            ATTO_BLOCK_HEADING_1: "Pennawd 1",
            ATTO_BLOCK_HEADING_2: "Pennawd 2",
            ATTO_BLOCK_HEADING_3: "Pennawd 3",
            ATTO_BLOCK_PLAIN: "Plaen",
            ATTO_BLOCK_PRE: "Rhagfformatiwyd",
            CANCEL: "Canslo",
            CLICK_TO_IMPROVE: "Dewiswch i'w wella",
            DOWNLOAD: "Lawrlwytho",
            DOWNLOAD_ALTERNATIVE_FORMATS_ELLIPSIS: "Lawrlwytho fformatau amgen ...",
            DOWNLOAD_OPTIONS: "Opsiynau lawrlwytho",
            FILENAME_ALTERNATIVE_FORMAT: "{FILENAME} - Fformatau Amgen",
            FILE_HAS_BEEN_DELETED: "Dilëwyd y ffeil",
            FILE_TYPE_DOCUMENT: "Dogfen",
            FILE_TYPE_HTML_PAGE: "Ffeil HTML",
            FILE_TYPE_IMAGE: "Delwedd",
            FILE_TYPE_OTHER: "Arall",
            FILE_TYPE_PDF: "Dogfen PDF",
            FILE_TYPE_PRESENTATION: "Cyflwyniad",
            FILE_TYPE_SCORE: "{0} - {1}",
            FIX: "Trwsio",
            INSTRUCTOR_FEEDBACK: "Adborth gan yr hyfforddwr",
            INSTRUCTOR_FEEDBACK_FOR: "Adborth hyfforddwr ar gyfer {0}",
            LOADING_INSTRUCTOR_FEEDBACK_PLEASE_WAIT: "Wrthi'n llwytho adborth yr hyfforddwr. Arhoswch.",
            POTENTIALLY_SEIZURE_INDUCING: "Gallai achosi trawiad",
            POTENTIALLY_SEIZURE_INDUCING_ANIMATION_PRESS_TO_ENABLE: "Animeiddiad a allai achosi trawiad. Pwyswch i'w alluogi.",
            PREVIEW: "Rhagolwg",
            SHOW_IMAGE_ANYWAY: "Dangos y ddelwedd beth bynnag",
            X_OF_Y: "{0} / {1}"
        },
        __da: {
            ACCESSIBILITY: "Tilgængelighed",
            ACCESSIBILITY_INFORMATION_NOT_AVAILABLE: "Ingen oplysninger om tilgængelighed",
            ACCESSIBILITY_SCORE_HIGH: "Tilgængelighedsvurdering: Høj",
            ACCESSIBILITY_SCORE_LOW: "Tilgængelighedsvurdering: Lav",
            ACCESSIBILITY_SCORE_MEDIUM: "Tilgængelighedsvurdering: Middel",
            ACCESSIBILITY_SCORE_PERCENT: "Tilgængelighedsvurdering: {0}",
            ACCESSIBILITY_SCORE_PERFECT: "Tilgængelighedsvurdering: Perfekt",
            ACTIONS: "Handlinger",
            ALTERNATIVE_FORMATS: "Alternative formater",
            ATTO_BLOCK_QUOTED: "Citeret",
            ATTO_BLOCK_HEADING_1: "Overskrift 1",
            ATTO_BLOCK_HEADING_2: "Overskrift 2",
            ATTO_BLOCK_HEADING_3: "Overskrift 3",
            ATTO_BLOCK_PLAIN: "Almindelig",
            ATTO_BLOCK_PRE: "Forhåndsformateret",
            CANCEL: "Annuller",
            CLICK_TO_IMPROVE: "Vælg for at forbedre",
            DOWNLOAD: "Download",
            DOWNLOAD_ALTERNATIVE_FORMATS_ELLIPSIS: "Download alternative formater ...",
            DOWNLOAD_OPTIONS: "Indstillinger for download",
            FILENAME_ALTERNATIVE_FORMAT: "{FILENAME} - Alternative formater",
            FILE_HAS_BEEN_DELETED: "Filen blev slettet",
            FILE_TYPE_DOCUMENT: "Dokument",
            FILE_TYPE_HTML_PAGE: "HTML-fil",
            FILE_TYPE_IMAGE: "Billede",
            FILE_TYPE_OTHER: "Andet",
            FILE_TYPE_PDF: "PDF-dokument",
            FILE_TYPE_PRESENTATION: "Præsentation",
            FILE_TYPE_SCORE: "{0} - {1}",
            FIX: "Ret",
            INSTRUCTOR_FEEDBACK: "Undervisers feedback",
            INSTRUCTOR_FEEDBACK_FOR: "Undervisers feedback for {0}",
            LOADING_INSTRUCTOR_FEEDBACK_PLEASE_WAIT: "Indlæser undervisers feedback. Vent venligst.",
            POTENTIALLY_SEIZURE_INDUCING: "Kan fremkalde epileptiske anfald",
            POTENTIALLY_SEIZURE_INDUCING_ANIMATION_PRESS_TO_ENABLE: "Animationen kan fremkalde epileptiske anfald. Tryk for at aktivere.",
            PREVIEW: "Eksempelvisning",
            SHOW_IMAGE_ANYWAY: "Vis billedet alligevel",
            X_OF_Y: "{0}/{1}"
        },
        __de: {
            ACCESSIBILITY: "Zugänglichkeit",
            ACCESSIBILITY_INFORMATION_NOT_AVAILABLE: "Informationen zur Zugänglichkeit nicht verfügbar",
            ACCESSIBILITY_SCORE_HIGH: "Zugänglichkeit: Hoch",
            ACCESSIBILITY_SCORE_LOW: "Zugänglichkeit: Gering",
            ACCESSIBILITY_SCORE_MEDIUM: "Zugänglichkeit: Mittel",
            ACCESSIBILITY_SCORE_PERCENT: "Bewertung der Zugänglichkeit: {0}",
            ACCESSIBILITY_SCORE_PERFECT: "Zugänglichkeit: Perfekt",
            ACTIONS: "Aktionen",
            ALTERNATIVE_FORMATS: "Alternative Formate",
            ATTO_BLOCK_QUOTED: "Zitiert",
            ATTO_BLOCK_HEADING_1: "Überschrift 1",
            ATTO_BLOCK_HEADING_2: "Überschrift 2",
            ATTO_BLOCK_HEADING_3: "Überschrift 3",
            ATTO_BLOCK_PLAIN: "Einfach",
            ATTO_BLOCK_PRE: "Vorformatiert",
            CANCEL: "Abbrechen",
            CLICK_TO_IMPROVE: "Zum Verbessern auswählen",
            DOWNLOAD: "Herunterladen",
            DOWNLOAD_ALTERNATIVE_FORMATS_ELLIPSIS: "Alternative Formate herunterladen ...",
            DOWNLOAD_OPTIONS: "Optionen zum Herunterladen",
            FILENAME_ALTERNATIVE_FORMAT: "{FILENAME} – Alternative Formate",
            FILE_HAS_BEEN_DELETED: "Datei wurde gelöscht",
            FILE_TYPE_DOCUMENT: "Dokument",
            FILE_TYPE_HTML_PAGE: "HTML-Datei",
            FILE_TYPE_IMAGE: "Grafik",
            FILE_TYPE_OTHER: "Andere",
            FILE_TYPE_PDF: "PDF-Dokument",
            FILE_TYPE_PRESENTATION: "Präsentation",
            FILE_TYPE_SCORE: "{0} - {1}",
            FIX: "Beheben",
            INSTRUCTOR_FEEDBACK: "Feedback des Kursleiters",
            INSTRUCTOR_FEEDBACK_FOR: "Feedback des Kursleiters für {0}",
            LOADING_INSTRUCTOR_FEEDBACK_PLEASE_WAIT: "Feedback des Kursleiters wird geladen. Bitte warten.",
            POTENTIALLY_SEIZURE_INDUCING: "Kann Anfälle auslösen",
            POTENTIALLY_SEIZURE_INDUCING_ANIMATION_PRESS_TO_ENABLE: "Animation kann Anfälle auslösen. Zum Aktivieren drücken.",
            PREVIEW: "Vorschau",
            SHOW_IMAGE_ANYWAY: "Grafik dennoch anzeigen",
            X_OF_Y: "{0}/{1}"
        },
        "__en-gb": {
            ACCESSIBILITY: "Accessibility",
            ACCESSIBILITY_INFORMATION_NOT_AVAILABLE: "Accessibility information not available",
            ACCESSIBILITY_SCORE_HIGH: "Accessibility score: High",
            ACCESSIBILITY_SCORE_LOW: "Accessibility score: Low",
            ACCESSIBILITY_SCORE_MEDIUM: "Accessibility score: Medium",
            ACCESSIBILITY_SCORE_PERCENT: "Accessibility score: {0}",
            ACCESSIBILITY_SCORE_PERFECT: "Accessibility score: Perfect",
            ACTIONS: "Actions",
            ALTERNATIVE_FORMATS: "Alternative formats",
            ATTO_BLOCK_QUOTED: "Quoted",
            ATTO_BLOCK_HEADING_1: "Heading 1",
            ATTO_BLOCK_HEADING_2: "Heading 2",
            ATTO_BLOCK_HEADING_3: "Heading 3",
            ATTO_BLOCK_PLAIN: "Plain",
            ATTO_BLOCK_PRE: "Pre-formatted",
            CANCEL: "Cancel",
            CLICK_TO_IMPROVE: "Select to improve",
            DOWNLOAD: "Download",
            DOWNLOAD_ALTERNATIVE_FORMATS_ELLIPSIS: "Download alternative formats ...",
            DOWNLOAD_OPTIONS: "Download options",
            FILENAME_ALTERNATIVE_FORMAT: "{FILENAME} - Alternative Formats",
            FILE_HAS_BEEN_DELETED: "File has been deleted",
            FILE_TYPE_DOCUMENT: "Document",
            FILE_TYPE_HTML_PAGE: "HTML file",
            FILE_TYPE_IMAGE: "Image",
            FILE_TYPE_OTHER: "Other",
            FILE_TYPE_PDF: "PDF document",
            FILE_TYPE_PRESENTATION: "Presentation",
            FILE_TYPE_SCORE: "{0} - {1}",
            FIX: "Fix",
            INSTRUCTOR_FEEDBACK: "Instructor feedback",
            INSTRUCTOR_FEEDBACK_FOR: "Instructor feedback for {0}",
            LOADING_INSTRUCTOR_FEEDBACK_PLEASE_WAIT: "Loading Instructor Feedback. Please wait.",
            POTENTIALLY_SEIZURE_INDUCING: "Potentially seizure-inducing",
            POTENTIALLY_SEIZURE_INDUCING_ANIMATION_PRESS_TO_ENABLE: "Potentially seizure-inducing animation. Press to enable.",
            PREVIEW: "Preview",
            SHOW_IMAGE_ANYWAY: "Show image anyway",
            X_OF_Y: "{0} / {1}"
        },
        "__en-us-pro": {
            ACCESSIBILITY: "Accessibility",
            ACCESSIBILITY_INFORMATION_NOT_AVAILABLE: "Accessibility information not available",
            ACCESSIBILITY_SCORE_HIGH: "Accessibility score: High",
            ACCESSIBILITY_SCORE_LOW: "Accessibility score: Low",
            ACCESSIBILITY_SCORE_MEDIUM: "Accessibility score: Medium",
            ACCESSIBILITY_SCORE_PERCENT: "Accessibility score: {0}",
            ACCESSIBILITY_SCORE_PERFECT: "Accessibility score: Perfect",
            ACTIONS: "Actions",
            ALTERNATIVE_FORMATS: "Alternative formats",
            ATTO_BLOCK_QUOTED: "Quoted",
            ATTO_BLOCK_HEADING_1: "Heading 1",
            ATTO_BLOCK_HEADING_2: "Heading 2",
            ATTO_BLOCK_HEADING_3: "Heading 3",
            ATTO_BLOCK_PLAIN: "Plain",
            ATTO_BLOCK_PRE: "Pre-formatted",
            CANCEL: "Cancel",
            CLICK_TO_IMPROVE: "Select to improve",
            DOWNLOAD: "Download",
            DOWNLOAD_ALTERNATIVE_FORMATS_ELLIPSIS: "Download alternative formats ...",
            DOWNLOAD_OPTIONS: "Download options",
            FILENAME_ALTERNATIVE_FORMAT: "{FILENAME} - Alternative Formats",
            FILE_HAS_BEEN_DELETED: "File has been deleted",
            FILE_TYPE_DOCUMENT: "Document",
            FILE_TYPE_HTML_PAGE: "HTML file",
            FILE_TYPE_IMAGE: "Image",
            FILE_TYPE_OTHER: "Other",
            FILE_TYPE_PDF: "PDF document",
            FILE_TYPE_PRESENTATION: "Presentation",
            FILE_TYPE_SCORE: "{0} - {1}",
            FIX: "Fix",
            INSTRUCTOR_FEEDBACK: "Instructor feedback",
            INSTRUCTOR_FEEDBACK_FOR: "Instructor feedback for {0}",
            LOADING_INSTRUCTOR_FEEDBACK_PLEASE_WAIT: "Loading Instructor Feedback. Please wait.",
            POTENTIALLY_SEIZURE_INDUCING: "Potentially seizure inducing",
            POTENTIALLY_SEIZURE_INDUCING_ANIMATION_PRESS_TO_ENABLE: "Potentially seizure inducing animation. Press to enable.",
            PREVIEW: "Preview",
            SHOW_IMAGE_ANYWAY: "Show image anyway",
            X_OF_Y: "{0} / {1}"
        },
        __es: {
            ACCESSIBILITY: "Accesibilidad",
            ACCESSIBILITY_INFORMATION_NOT_AVAILABLE: "Información de accesibilidad no disponible",
            ACCESSIBILITY_SCORE_HIGH: "Calificación de accesibilidad: alta",
            ACCESSIBILITY_SCORE_LOW: "Calificación de accesibilidad: baja",
            ACCESSIBILITY_SCORE_MEDIUM: "Calificación de accesibilidad: media",
            ACCESSIBILITY_SCORE_PERCENT: "Puntuación de accesibilidad: {0}",
            ACCESSIBILITY_SCORE_PERFECT: "Calificación de accesibilidad: perfecta",
            ACTIONS: "Acciones",
            ALTERNATIVE_FORMATS: "Formatos alternativos",
            ATTO_BLOCK_QUOTED: "Citado",
            ATTO_BLOCK_HEADING_1: "Encabezado 1",
            ATTO_BLOCK_HEADING_2: "Encabezado 2",
            ATTO_BLOCK_HEADING_3: "Encabezado 3",
            ATTO_BLOCK_PLAIN: "Solo texto",
            ATTO_BLOCK_PRE: "Preformateado",
            CANCEL: "Cancelar",
            CLICK_TO_IMPROVE: "Seleccione para mejorar",
            DOWNLOAD: "Descargar",
            DOWNLOAD_ALTERNATIVE_FORMATS_ELLIPSIS: "Descargar formatos alternativos...",
            DOWNLOAD_OPTIONS: "Opciones de descarga",
            FILENAME_ALTERNATIVE_FORMAT: "{FILENAME}: formatos alternativos",
            FILE_HAS_BEEN_DELETED: "Se eliminó el archivo",
            FILE_TYPE_DOCUMENT: "Documento",
            FILE_TYPE_HTML_PAGE: "Archivo HTML",
            FILE_TYPE_IMAGE: "Imagen",
            FILE_TYPE_OTHER: "Otros",
            FILE_TYPE_PDF: "Documento PDF",
            FILE_TYPE_PRESENTATION: "Presentación",
            FILE_TYPE_SCORE: "{0}-{1}",
            FIX: "Corregir",
            INSTRUCTOR_FEEDBACK: "Comentarios del profesor",
            INSTRUCTOR_FEEDBACK_FOR: "Comentarios del profesor para {0}",
            LOADING_INSTRUCTOR_FEEDBACK_PLEASE_WAIT: "Cargando los comentarios del profesor. Aguarde un momento.",
            POTENTIALLY_SEIZURE_INDUCING: "Puede generar convulsiones",
            POTENTIALLY_SEIZURE_INDUCING_ANIMATION_PRESS_TO_ENABLE: "La animación puede generar convulsiones. Presione para permitir.",
            PREVIEW: "Vista previa",
            SHOW_IMAGE_ANYWAY: "Mostrar imagen de todas formas",
            X_OF_Y: "{0} / {1}"
        },
        __eu_ES: {
            ACCESSIBILITY: "Irisgarritasuna",
            ACCESSIBILITY_INFORMATION_NOT_AVAILABLE: "Irisgarritasun-informazioa ez dago eskuragarri",
            ACCESSIBILITY_SCORE_HIGH: "Irisgarritasun-puntuazioa: altua",
            ACCESSIBILITY_SCORE_LOW: "Irisgarritasun-puntuazioa: baxua",
            ACCESSIBILITY_SCORE_MEDIUM: "Irisgarritasun-puntuazioa: ertaina",
            ACCESSIBILITY_SCORE_PERCENT: "Irisgarritasun-puntuazioa: {0}",
            ACCESSIBILITY_SCORE_PERFECT: "Irisgarritasun-puntuazioa: bikaina",
            ACTIONS: "Ekintzak",
            ALTERNATIVE_FORMATS: "Formatu alternatiboak",
            ATTO_BLOCK_QUOTED: "Aipatuta",
            ATTO_BLOCK_HEADING_1: "1. goiburukoa",
            ATTO_BLOCK_HEADING_2: "2. goiburukoa",
            ATTO_BLOCK_HEADING_3: "3. goiburukoa",
            ATTO_BLOCK_PLAIN: "Soila",
            ATTO_BLOCK_PRE: "Formatua aurrez emanda",
            CANCEL: "Utzi",
            CLICK_TO_IMPROVE: "Hautatu hobetzeko",
            DOWNLOAD: "Deskargatu",
            DOWNLOAD_ALTERNATIVE_FORMATS_ELLIPSIS: "Deskargatu formatu alternatiboak ...",
            DOWNLOAD_OPTIONS: "Deskargatu aukerak",
            FILENAME_ALTERNATIVE_FORMAT: "{FILENAME} - Formatu alternatiboak",
            FILE_HAS_BEEN_DELETED: "Fitxategia ezabatu da",
            FILE_TYPE_DOCUMENT: "Dokumentua",
            FILE_TYPE_HTML_PAGE: "HTML fitxategia",
            FILE_TYPE_IMAGE: "Irudia",
            FILE_TYPE_OTHER: "Beste bat",
            FILE_TYPE_PDF: "PDF dokumentua",
            FILE_TYPE_PRESENTATION: "Aurkezpena",
            FILE_TYPE_SCORE: "{0} - {1}",
            FIX: "Konpondu",
            INSTRUCTOR_FEEDBACK: "Irakaslearen iruzkinak",
            INSTRUCTOR_FEEDBACK_FOR: "Irakaslearen iruzkinak {0}(r)i dagokionez",
            LOADING_INSTRUCTOR_FEEDBACK_PLEASE_WAIT: "Irakaslearen iruzkinak kargatzen. Itxaron.",
            POTENTIALLY_SEIZURE_INDUCING: "Baliteke konbultsioak eragitea",
            POTENTIALLY_SEIZURE_INDUCING_ANIMATION_PRESS_TO_ENABLE: "Konbultsioak eragin ditzakeen animazioa. Sakatu hura gaitzeko.",
            PREVIEW: "Aurrebista",
            SHOW_IMAGE_ANYWAY: "Erakutsi irudia hala ere",
            X_OF_Y: "{0} / {1}"
        },
        __fi: {
            ACCESSIBILITY: "Helppokäyttöisyys",
            ACCESSIBILITY_INFORMATION_NOT_AVAILABLE: "Helppokäyttöisyystiedot eivät ole käytettävissä",
            ACCESSIBILITY_SCORE_HIGH: "Helppokäyttöisyysarvo: korkea",
            ACCESSIBILITY_SCORE_LOW: "Helppokäyttöisyysarvo: matala",
            ACCESSIBILITY_SCORE_MEDIUM: "Helppokäyttöisyysarvo: keskitaso",
            ACCESSIBILITY_SCORE_PERCENT: "Helppokäyttöisyysarvo: {0}",
            ACCESSIBILITY_SCORE_PERFECT: "Helppokäyttöisyysarvo: täydellinen",
            ACTIONS: "Toiminnot",
            ALTERNATIVE_FORMATS: "Vaihtoehtoiset muodot",
            ATTO_BLOCK_QUOTED: "Lainattu",
            ATTO_BLOCK_HEADING_1: "Otsikko 1",
            ATTO_BLOCK_HEADING_2: "Otsikko 2",
            ATTO_BLOCK_HEADING_3: "Otsikko 3",
            ATTO_BLOCK_PLAIN: "Tavallinen",
            ATTO_BLOCK_PRE: "Esimuotoiltu",
            CANCEL: "Peruuta",
            CLICK_TO_IMPROVE: "Paranna valitsemalla",
            DOWNLOAD: "Lataa",
            DOWNLOAD_ALTERNATIVE_FORMATS_ELLIPSIS: "Lataa vaihtoehtoiset muodot...",
            DOWNLOAD_OPTIONS: "Latausasetukset",
            FILENAME_ALTERNATIVE_FORMAT: "{FILENAME} - Vaihtoehtoiset tiedostomuodot",
            FILE_HAS_BEEN_DELETED: "Tiedosto on poistettu",
            FILE_TYPE_DOCUMENT: "Asiakirja",
            FILE_TYPE_HTML_PAGE: "HTML-tiedosto",
            FILE_TYPE_IMAGE: "Kuva",
            FILE_TYPE_OTHER: "Muu",
            FILE_TYPE_PDF: "PDF-asiakirja",
            FILE_TYPE_PRESENTATION: "Esitys",
            FILE_TYPE_SCORE: "{0}–{1}",
            FIX: "Korjaa",
            INSTRUCTOR_FEEDBACK: "Ohjaajan palaute",
            INSTRUCTOR_FEEDBACK_FOR: "Ohjaajan palaute kohteelle {0}",
            LOADING_INSTRUCTOR_FEEDBACK_PLEASE_WAIT: "Ladataan ohjaajan palautetta. Odota.",
            POTENTIALLY_SEIZURE_INDUCING: "Voi aiheuttaa epileptisiä kohtauksia",
            POTENTIALLY_SEIZURE_INDUCING_ANIMATION_PRESS_TO_ENABLE: "Animaatio voi aiheuttaa epileptisiä kohtauksia. Ota käyttöön painamalla tätä.",
            PREVIEW: "Esikatsele",
            SHOW_IMAGE_ANYWAY: "Näytä kuva tästä huolimatta",
            X_OF_Y: "{0} / {1}"
        },
        __fr: {
            ACCESSIBILITY: "Accessibilité",
            ACCESSIBILITY_INFORMATION_NOT_AVAILABLE: "Les informations sur l'accessibilité ne sont pas disponibles",
            ACCESSIBILITY_SCORE_HIGH: "Résultat d'accessibilité : élevé",
            ACCESSIBILITY_SCORE_LOW: "Résultat d'accessibilité : faible",
            ACCESSIBILITY_SCORE_MEDIUM: "Résultat d'accessibilité : moyen",
            ACCESSIBILITY_SCORE_PERCENT: "Résultat d'accessibilité : {0}",
            ACCESSIBILITY_SCORE_PERFECT: "Résultat d'accessibilité : parfait",
            ACTIONS: "Actions",
            ALTERNATIVE_FORMATS: "Formats alternatifs",
            ATTO_BLOCK_QUOTED: "Citation",
            ATTO_BLOCK_HEADING_1: "Titre 1",
            ATTO_BLOCK_HEADING_2: "Titre 2",
            ATTO_BLOCK_HEADING_3: "Titre 3",
            ATTO_BLOCK_PLAIN: "Texte brut",
            ATTO_BLOCK_PRE: "Pré-formaté",
            CANCEL: "Annuler",
            CLICK_TO_IMPROVE: "Sélectionnez pour améliorer",
            DOWNLOAD: "Télécharger",
            DOWNLOAD_ALTERNATIVE_FORMATS_ELLIPSIS: "Télécharger des formats alternatifs…",
            DOWNLOAD_OPTIONS: "Options de téléchargement",
            FILENAME_ALTERNATIVE_FORMAT: "{FILENAME} - Formats alternatifs",
            FILE_HAS_BEEN_DELETED: "Le fichier a été supprimé",
            FILE_TYPE_DOCUMENT: "Document",
            FILE_TYPE_HTML_PAGE: "Fichier HTML",
            FILE_TYPE_IMAGE: "Image",
            FILE_TYPE_OTHER: "Autre",
            FILE_TYPE_PDF: "Document PDF",
            FILE_TYPE_PRESENTATION: "Présentation",
            FILE_TYPE_SCORE: "{0} - {1}",
            FIX: "Résoudre",
            INSTRUCTOR_FEEDBACK: "Feed-back du professeur",
            INSTRUCTOR_FEEDBACK_FOR: "Feed-back du professeur pour {0}",
            LOADING_INSTRUCTOR_FEEDBACK_PLEASE_WAIT: "Chargement du feed-back du professeur en cours. Veuillez patienter.",
            POTENTIALLY_SEIZURE_INDUCING: "Risque potentiel de crise d'épilepsie",
            POTENTIALLY_SEIZURE_INDUCING_ANIMATION_PRESS_TO_ENABLE: "Animation susceptible de provoquer une crise d'épilepsie. Appuyez pour activer.",
            PREVIEW: "Aperçu",
            SHOW_IMAGE_ANYWAY: "Afficher quand même l'image",
            X_OF_Y: "{0} / {1}"
        },
        "__fr-ca": {
            ACCESSIBILITY: "Accessibilité",
            ACCESSIBILITY_INFORMATION_NOT_AVAILABLE: "L'information d'accessibilité n'est pas disponible",
            ACCESSIBILITY_SCORE_HIGH: "Score d'accessibilité : Élevé",
            ACCESSIBILITY_SCORE_LOW: "Score d'accessibilité : Bas",
            ACCESSIBILITY_SCORE_MEDIUM: "Score d'accessibilité : Moyen",
            ACCESSIBILITY_SCORE_PERCENT: "Score d'accessibilité : {0}",
            ACCESSIBILITY_SCORE_PERFECT: "Score d'accessibilité : Parfait",
            ACTIONS: "Actions",
            ALTERNATIVE_FORMATS: "Médias adaptés",
            ATTO_BLOCK_QUOTED: "Citation",
            ATTO_BLOCK_HEADING_1: "Titre 1",
            ATTO_BLOCK_HEADING_2: "Titre 2",
            ATTO_BLOCK_HEADING_3: "Titre 3",
            ATTO_BLOCK_PLAIN: "Texte brut",
            ATTO_BLOCK_PRE: "Pré-formaté",
            CANCEL: "Annuler",
            CLICK_TO_IMPROVE: "Sélectionner pour améliorer",
            DOWNLOAD: "Télécharger",
            DOWNLOAD_ALTERNATIVE_FORMATS_ELLIPSIS: "Télécharger d'autres formats...",
            DOWNLOAD_OPTIONS: "Télécharger les options",
            FILENAME_ALTERNATIVE_FORMAT: "{FILENAME} - Autres formats",
            FILE_HAS_BEEN_DELETED: "Le fichier a été supprimé",
            FILE_TYPE_DOCUMENT: "Document",
            FILE_TYPE_HTML_PAGE: "Fichier HTML",
            FILE_TYPE_IMAGE: "Image",
            FILE_TYPE_OTHER: "Autre",
            FILE_TYPE_PDF: "Document PDF",
            FILE_TYPE_PRESENTATION: "Présentation",
            FILE_TYPE_SCORE: "{0} - {1}",
            FIX: "Corriger",
            INSTRUCTOR_FEEDBACK: "Rétroactions de l'instructeur",
            INSTRUCTOR_FEEDBACK_FOR: "Rétroactions de l'instructeur pour {0}",
            LOADING_INSTRUCTOR_FEEDBACK_PLEASE_WAIT: "Chargement des rétroactions de l'instructeur en cours. Veuillez patienter.",
            POTENTIALLY_SEIZURE_INDUCING: "Susceptible de provoquer une crise épileptique",
            POTENTIALLY_SEIZURE_INDUCING_ANIMATION_PRESS_TO_ENABLE: "Cette animation est susceptible de provoquer une crise épileptique. Appuyez pour la lancer.",
            PREVIEW: "Aperçu",
            SHOW_IMAGE_ANYWAY: "Afficher l'image quand même",
            X_OF_Y: "{0}/{1}"
        },
        __ga: {
            ACCESSIBILITY: "Inroctaineacht",
            ACCESSIBILITY_INFORMATION_NOT_AVAILABLE: "Níl eolas inrochtaineachta ar fáil",
            ACCESSIBILITY_SCORE_HIGH: "Inrochtaineacht scór: Ard",
            ACCESSIBILITY_SCORE_LOW: "Inrochtaineacht scór: Íseal",
            ACCESSIBILITY_SCORE_MEDIUM: "Inrochtaineacht scór: Meán",
            ACCESSIBILITY_SCORE_PERCENT: "Scór inrochtaineachta: {0}",
            ACCESSIBILITY_SCORE_PERFECT: "Inrochtaineacht scór: Foirfe",
            ACTIONS: "Gníomhaíochtaí",
            ALTERNATIVE_FORMATS: "Forméidí eile",
            ATTO_BLOCK_QUOTED: "Luaite",
            ATTO_BLOCK_HEADING_1: "Ceannteideal 1",
            ATTO_BLOCK_HEADING_2: "Ceannteideal 2",
            ATTO_BLOCK_HEADING_3: "Ceannteideal 3",
            ATTO_BLOCK_PLAIN: "Simplí",
            ATTO_BLOCK_PRE: "Réamhfhormáidithe",
            CANCEL: "Cealaigh",
            CLICK_TO_IMPROVE: "Roghnaigh chun feabhsú",
            DOWNLOAD: "Íoslódáil",
            DOWNLOAD_ALTERNATIVE_FORMATS_ELLIPSIS: "Íoslódáil formáidí malartacha",
            DOWNLOAD_OPTIONS: "Roghanna íoslodáil",
            FILENAME_ALTERNATIVE_FORMAT: "{FILENAME} - Formáidí Malartacha",
            FILE_HAS_BEEN_DELETED: "Scriosadh an comhad",
            FILE_TYPE_DOCUMENT: "Doiciméad",
            FILE_TYPE_HTML_PAGE: "Comhad HTML",
            FILE_TYPE_IMAGE: "Íomhá",
            FILE_TYPE_OTHER: "Eile",
            FILE_TYPE_PDF: "PDF doiciméid",
            FILE_TYPE_PRESENTATION: "Láithreoireacht",
            FILE_TYPE_SCORE: "{0} - {1}",
            FIX: "Deisigh",
            INSTRUCTOR_FEEDBACK: "Aiseolas ó theagascóirí",
            INSTRUCTOR_FEEDBACK_FOR: "Aiseolas teagascóra do {0}",
            LOADING_INSTRUCTOR_FEEDBACK_PLEASE_WAIT: "Aiseolas do Theagascóirí ag lódáil. Fán le do thoil.",
            POTENTIALLY_SEIZURE_INDUCING: "D'fhéadfadh sé seo taom a spreagadh",
            POTENTIALLY_SEIZURE_INDUCING_ANIMATION_PRESS_TO_ENABLE: "Beochan a d’fhéadfadh urghabháil a dhéanamh. Brúigh chun a chumasú.",
            PREVIEW: "Réamhamharc",
            SHOW_IMAGE_ANYWAY: "Taispeáin íomha ar aon nós",
            X_OF_Y: "{0} / {1}"
        },
        __he: {
            ACCESSIBILITY: "נגישות",
            ACCESSIBILITY_INFORMATION_NOT_AVAILABLE: "מידע על נגישות אינו זמין",
            ACCESSIBILITY_SCORE_HIGH: "ניקוד נגישות: גבוה",
            ACCESSIBILITY_SCORE_LOW: "ניקוד נגישות: נמוך",
            ACCESSIBILITY_SCORE_MEDIUM: "ניקוד נגישות: בינוני",
            ACCESSIBILITY_SCORE_PERCENT: "ניקוד נגישות: {0}",
            ACCESSIBILITY_SCORE_PERFECT: "ניקוד נגישות: מושלם",
            ACTIONS: "פעולות",
            ALTERNATIVE_FORMATS: "תבניות חלופיות",
            ATTO_BLOCK_QUOTED: "מצוטט",
            ATTO_BLOCK_HEADING_1: "כותרת 1",
            ATTO_BLOCK_HEADING_2: "כותרת 2",
            ATTO_BLOCK_HEADING_3: "כותרת 3",
            ATTO_BLOCK_PLAIN: "רגיל",
            ATTO_BLOCK_PRE: "לפני עיצוב",
            CANCEL: "ביטול",
            CLICK_TO_IMPROVE: "בחר כדי לשפר",
            DOWNLOAD: "הורד",
            DOWNLOAD_ALTERNATIVE_FORMATS_ELLIPSIS: "הורד תבניות חלופיות...",
            DOWNLOAD_OPTIONS: "אפשרויות הורדה",
            FILENAME_ALTERNATIVE_FORMAT: "{FILENAME} - תבניות חלופיות",
            FILE_HAS_BEEN_DELETED: "הקובץ נמחק",
            FILE_TYPE_DOCUMENT: "מסמך",
            FILE_TYPE_HTML_PAGE: "קובץ HTML",
            FILE_TYPE_IMAGE: "תמונה",
            FILE_TYPE_OTHER: "אחר",
            FILE_TYPE_PDF: "מסמך PDF",
            FILE_TYPE_PRESENTATION: "מצגת",
            FILE_TYPE_SCORE: "{0} -‏ {1}",
            FIX: "תקין",
            INSTRUCTOR_FEEDBACK: "משוב מהמרצה",
            INSTRUCTOR_FEEDBACK_FOR: "משוב מהמרצה עבור {0}",
            LOADING_INSTRUCTOR_FEEDBACK_PLEASE_WAIT: "טוען משוב מהמרצה. נא המתן.",
            POTENTIALLY_SEIZURE_INDUCING: "עלול לגרום להתקפים",
            POTENTIALLY_SEIZURE_INDUCING_ANIMATION_PRESS_TO_ENABLE: "הנפשה שעלולה לגרום להתקפים. הקש כדי להפעיל.",
            PREVIEW: "תצוגה מקדימה",
            SHOW_IMAGE_ANYWAY: "הצג את התמונה בכל זאת",
            X_OF_Y: "{0} / {1}"
        },
        __it: {
            ACCESSIBILITY: "Accessibilità",
            ACCESSIBILITY_INFORMATION_NOT_AVAILABLE: "Informazioni sull'accessibilità non disponibili",
            ACCESSIBILITY_SCORE_HIGH: "Punteggio di accessibilità: alto",
            ACCESSIBILITY_SCORE_LOW: "Punteggio di accessibilità: basso",
            ACCESSIBILITY_SCORE_MEDIUM: "Punteggio di accessibilità: medio",
            ACCESSIBILITY_SCORE_PERCENT: "Punteggio di accessibilità: {0}",
            ACCESSIBILITY_SCORE_PERFECT: "Punteggio di accessibilità: perfetto",
            ACTIONS: "Azioni",
            ALTERNATIVE_FORMATS: "Formati alternativi",
            ATTO_BLOCK_QUOTED: "Citato",
            ATTO_BLOCK_HEADING_1: "Intestazione 1",
            ATTO_BLOCK_HEADING_2: "Intestazione 2",
            ATTO_BLOCK_HEADING_3: "Intestazione 3",
            ATTO_BLOCK_PLAIN: "Normale",
            ATTO_BLOCK_PRE: "Preformattato",
            CANCEL: "Annulla",
            CLICK_TO_IMPROVE: "Selezionare per migliorare",
            DOWNLOAD: "Scarica",
            DOWNLOAD_ALTERNATIVE_FORMATS_ELLIPSIS: "Scarica formati alternativi ...",
            DOWNLOAD_OPTIONS: "Opzioni di download",
            FILENAME_ALTERNATIVE_FORMAT: "{FILENAME} - Formati alternativi",
            FILE_HAS_BEEN_DELETED: "Il file è stato eliminato",
            FILE_TYPE_DOCUMENT: "Documento",
            FILE_TYPE_HTML_PAGE: "File HTML",
            FILE_TYPE_IMAGE: "Immagine",
            FILE_TYPE_OTHER: "Altro",
            FILE_TYPE_PDF: "Documento PDF",
            FILE_TYPE_PRESENTATION: "Presentazione",
            FILE_TYPE_SCORE: "{0} - {1}",
            FIX: "Correggi",
            INSTRUCTOR_FEEDBACK: "Feedback docenti",
            INSTRUCTOR_FEEDBACK_FOR: "Feedback docenti per {0}",
            LOADING_INSTRUCTOR_FEEDBACK_PLEASE_WAIT: "Caricamento feedback docenti. Attendere.",
            POTENTIALLY_SEIZURE_INDUCING: "Che può provocare una crisi convulsiva",
            POTENTIALLY_SEIZURE_INDUCING_ANIMATION_PRESS_TO_ENABLE: "Animazione che può provocare una crisi convulsiva. Premere per abilitare.",
            PREVIEW: "Anteprima",
            SHOW_IMAGE_ANYWAY: "Mostra immagine comunque",
            X_OF_Y: "{0} / {1}"
        },
        __mi: {
            ACCESSIBILITY: "Whakatapoko",
            ACCESSIBILITY_INFORMATION_NOT_AVAILABLE: "Tē wātea ngā mōhiohio whakatapoko",
            ACCESSIBILITY_SCORE_HIGH: "Whiwhinga whakatapoko: Teitei",
            ACCESSIBILITY_SCORE_LOW: "Whiwhinga whakatapoko: Iti",
            ACCESSIBILITY_SCORE_MEDIUM: "Whiwhinga whakatapoko: Waenga",
            ACCESSIBILITY_SCORE_PERCENT: "Whiwhinga whakatapoko: {0}",
            ACCESSIBILITY_SCORE_PERFECT: "Whiwhinga whakatapoko: Rawe",
            ACTIONS: "Ngā Mahi",
            ALTERNATIVE_FORMATS: "Ngā Hōputu Kē",
            ATTO_BLOCK_QUOTED: "I kīia",
            ATTO_BLOCK_HEADING_1: "Upoko 1",
            ATTO_BLOCK_HEADING_2: "Upoko 2",
            ATTO_BLOCK_HEADING_3: "Upoko 3",
            ATTO_BLOCK_PLAIN: "Tōkau",
            ATTO_BLOCK_PRE: "I whakahōputu tōmuatia",
            CANCEL: "Whakakore",
            CLICK_TO_IMPROVE: "Tīpako ki te whakapai ake",
            DOWNLOAD: "Tikiake",
            DOWNLOAD_ALTERNATIVE_FORMATS_ELLIPSIS: "Tikiake hōputu kē ...",
            DOWNLOAD_OPTIONS: "Tikiake kōwhiringa",
            FILENAME_ALTERNATIVE_FORMAT: "{FILENAME} - Ngā Hōputu Kē",
            FILE_HAS_BEEN_DELETED: "Kua mukua te kōnae",
            FILE_TYPE_DOCUMENT: "Tuhinga",
            FILE_TYPE_HTML_PAGE: "Kōnae HTML",
            FILE_TYPE_IMAGE: "Atahanga",
            FILE_TYPE_OTHER: "Ētahi atu",
            FILE_TYPE_PDF: "Tuhinga PDF",
            FILE_TYPE_PRESENTATION: "Whakaaturanga",
            FILE_TYPE_SCORE: "{0} - {1}",
            FIX: "Whakatika",
            INSTRUCTOR_FEEDBACK: "Urupare kaitohutohu",
            INSTRUCTOR_FEEDBACK_FOR: "Urupare kaitohutohu mō {0}",
            LOADING_INSTRUCTOR_FEEDBACK_PLEASE_WAIT: "Uta Urupare Kaitohutohu Ana. Taihoa.",
            POTENTIALLY_SEIZURE_INDUCING: "Ka whakahūkeke pea",
            POTENTIALLY_SEIZURE_INDUCING_ANIMATION_PRESS_TO_ENABLE: "Hākoritanga ka whakahūkeke pea. Pēhi ki te whakahohe.",
            PREVIEW: "Tiro takamua",
            SHOW_IMAGE_ANYWAY: "Whakaatu atahanga ahakoa te aha",
            X_OF_Y: "{0} / {1}"
        },
        __nb: {
            ACCESSIBILITY: "Tilgjengelighet",
            ACCESSIBILITY_INFORMATION_NOT_AVAILABLE: "Ingen tilgjengelighetsinformasjon er tilgjengelig",
            ACCESSIBILITY_SCORE_HIGH: "Tilgjengelighetsresultat: God",
            ACCESSIBILITY_SCORE_LOW: "Tilgjengelighetsresultat: Dårlig",
            ACCESSIBILITY_SCORE_MEDIUM: "Tilgjengelighetsresultat: Middels",
            ACCESSIBILITY_SCORE_PERCENT: "Tilgjengelighetsresultat: {0}",
            ACCESSIBILITY_SCORE_PERFECT: "Tilgjengelighetsresultat: Perfekt",
            ACTIONS: "Handlinger",
            ALTERNATIVE_FORMATS: "Alternative formater",
            ATTO_BLOCK_QUOTED: "Sitert",
            ATTO_BLOCK_HEADING_1: "Overskrift 1",
            ATTO_BLOCK_HEADING_2: "Overskrift 2",
            ATTO_BLOCK_HEADING_3: "Overskrift 3",
            ATTO_BLOCK_PLAIN: "Ren",
            ATTO_BLOCK_PRE: "Forhåndsformatert",
            CANCEL: "Avbryt",
            CLICK_TO_IMPROVE: "Velg for å forbedre",
            DOWNLOAD: "Last ned",
            DOWNLOAD_ALTERNATIVE_FORMATS_ELLIPSIS: "Last ned alternative formater ...",
            DOWNLOAD_OPTIONS: "Nedlastingsalternativer",
            FILENAME_ALTERNATIVE_FORMAT: "{FILENAME} – alternative formater",
            FILE_HAS_BEEN_DELETED: "Filen er slettet",
            FILE_TYPE_DOCUMENT: "Dokument",
            FILE_TYPE_HTML_PAGE: "HTML-fil",
            FILE_TYPE_IMAGE: "Bilde",
            FILE_TYPE_OTHER: "Annet",
            FILE_TYPE_PDF: "Rediger dokumentet",
            FILE_TYPE_PRESENTATION: "Presentasjon",
            FILE_TYPE_SCORE: "{0}–{1}",
            FIX: "Fiks",
            INSTRUCTOR_FEEDBACK: "Tilbakemelding fra underviseren",
            INSTRUCTOR_FEEDBACK_FOR: "Undervisertilbakemelding for {0}",
            LOADING_INSTRUCTOR_FEEDBACK_PLEASE_WAIT: "Laster inn tilbakemelding fra underviseren. Vent litt.",
            POTENTIALLY_SEIZURE_INDUCING: "Potensielt anfallsfremkallende",
            POTENTIALLY_SEIZURE_INDUCING_ANIMATION_PRESS_TO_ENABLE: "Potensielt anfallsfremkallende animasjon. Trykk for å aktivere den.",
            PREVIEW: "Forhåndsvisning",
            SHOW_IMAGE_ANYWAY: "Vis bildet likevel",
            X_OF_Y: "{0} / {1}"
        },
        __nn: {
            ACCESSIBILITY: "Tilgjenge",
            ACCESSIBILITY_INFORMATION_NOT_AVAILABLE: "Tilgjengeinformasjon ikkje tilgjengeleg",
            ACCESSIBILITY_SCORE_HIGH: "Tilgjengevurdering: Høg",
            ACCESSIBILITY_SCORE_LOW: "Tilgjengevurdering: Låg",
            ACCESSIBILITY_SCORE_MEDIUM: "Tilgjengevurdering: Middels",
            ACCESSIBILITY_SCORE_PERFECT: "Tilgjengevurdering: Perfekt",
            ALTERNATIVE_FORMATS: "Alternative format",
            CANCEL: "Avbryt",
            CLICK_TO_IMPROVE: "Klikk for å betre",
            DOWNLOAD: "Last ned",
            DOWNLOAD_OPTIONS: "Last ned alternativ",
            FILE_HAS_BEEN_DELETED: "Fila er sletta",
            FILE_TYPE_DOCUMENT: "Dokument",
            FILE_TYPE_HTML_PAGE: "HTML-fil",
            FILE_TYPE_IMAGE: "Bilete",
            FILE_TYPE_OTHER: "Anna",
            FILE_TYPE_PDF: "PDF-dokument",
            FILE_TYPE_PRESENTATION: "Presentasjon",
            FILE_TYPE_SCORE: "{0}−{1}",
            FIX: "Reparer",
            INSTRUCTOR_FEEDBACK: "Tilbakemelding frå lærar",
            LOADING_INSTRUCTOR_FEEDBACK_PLEASE_WAIT: "Lastar inn tilbakemelding frå lærar. Vent litt.",
            POTENTIALLY_SEIZURE_INDUCING: "Potensielt åtaksframkallande",
            POTENTIALLY_SEIZURE_INDUCING_ANIMATION_PRESS_TO_ENABLE: "Potensielt åtaksframkallande animasjon. Trykk for å aktivere.",
            PREVIEW: "Førehandsvis",
            SHOW_IMAGE_ANYWAY: "Vis bilete likevel"
        },
        "__nn-no": {
            ACCESSIBILITY: "Tilgjenge",
            ACCESSIBILITY_INFORMATION_NOT_AVAILABLE: "Tilgjengeinformasjon ikkje tilgjengeleg",
            ACCESSIBILITY_SCORE_HIGH: "Tilgjengevurdering: Høg",
            ACCESSIBILITY_SCORE_LOW: "Tilgjengevurdering: Låg",
            ACCESSIBILITY_SCORE_MEDIUM: "Tilgjengevurdering: Middels",
            ACCESSIBILITY_SCORE_PERCENT: "Tilgjengevurdering: {0}",
            ACCESSIBILITY_SCORE_PERFECT: "Tilgjengevurdering: Perfekt",
            ACTIONS: "Handlingar",
            ALTERNATIVE_FORMATS: "Alternative format",
            ATTO_BLOCK_QUOTED: "Mellom hermeteikn",
            ATTO_BLOCK_HEADING_1: "Overskrift 1",
            ATTO_BLOCK_HEADING_2: "Overskrift 2",
            ATTO_BLOCK_HEADING_3: "Overskrift 3",
            ATTO_BLOCK_PLAIN: "Rein",
            ATTO_BLOCK_PRE: "Førehandsformatert",
            CANCEL: "Avbryt",
            CLICK_TO_IMPROVE: "Vel for å betre",
            DOWNLOAD: "Last ned",
            DOWNLOAD_ALTERNATIVE_FORMATS_ELLIPSIS: "Last ned alternative format ...",
            DOWNLOAD_OPTIONS: "Last ned alternativ",
            FILENAME_ALTERNATIVE_FORMAT: "{FILENAME} - Alternative format",
            FILE_HAS_BEEN_DELETED: "Fila er sletta",
            FILE_TYPE_DOCUMENT: "Dokument",
            FILE_TYPE_HTML_PAGE: "HTML-fil",
            FILE_TYPE_IMAGE: "Bilete",
            FILE_TYPE_OTHER: "Anna",
            FILE_TYPE_PDF: "PDF-dokument",
            FILE_TYPE_PRESENTATION: "Presentasjon",
            FILE_TYPE_SCORE: "{0}−{1}",
            FIX: "Reparer",
            INSTRUCTOR_FEEDBACK: "Tilbakemelding frå lærar",
            INSTRUCTOR_FEEDBACK_FOR: "Lærartilbakemelding for {0}",
            LOADING_INSTRUCTOR_FEEDBACK_PLEASE_WAIT: "Lastar inn tilbakemelding frå lærar. Vent litt.",
            POTENTIALLY_SEIZURE_INDUCING: "Potensielt åtaksframkallande",
            POTENTIALLY_SEIZURE_INDUCING_ANIMATION_PRESS_TO_ENABLE: "Potensielt åtaksframkallande animasjon. Trykk for å aktivere.",
            PREVIEW: "Førehandsvis",
            SHOW_IMAGE_ANYWAY: "Vis bilde likevel",
            X_OF_Y: "{0} / {1}"
        },
        __nl: {
            ACCESSIBILITY: "Toegankelijkheid",
            ACCESSIBILITY_INFORMATION_NOT_AVAILABLE: "Toegankelijkheidsinformatie is niet beschikbaar",
            ACCESSIBILITY_SCORE_HIGH: "Toegankelijkheidsscore: hoog",
            ACCESSIBILITY_SCORE_LOW: "Toegankelijkheidsscore: laag",
            ACCESSIBILITY_SCORE_MEDIUM: "Toegankelijkheidsscore: gemiddeld",
            ACCESSIBILITY_SCORE_PERCENT: "Toegankelijkheidsscore: {0}",
            ACCESSIBILITY_SCORE_PERFECT: "Toegankelijkheidsscore: perfect",
            ACTIONS: "Acties",
            ALTERNATIVE_FORMATS: "Alternatieve formaten",
            ATTO_BLOCK_QUOTED: "Geciteerd",
            ATTO_BLOCK_HEADING_1: "Kop 1",
            ATTO_BLOCK_HEADING_2: "Kop 2",
            ATTO_BLOCK_HEADING_3: "Kop 3",
            ATTO_BLOCK_PLAIN: "Zonder opmaak",
            ATTO_BLOCK_PRE: "Voorgeformatteerd",
            CANCEL: "Annuleren",
            CLICK_TO_IMPROVE: "Selecteren om te verbeteren",
            DOWNLOAD: "Downloaden",
            DOWNLOAD_ALTERNATIVE_FORMATS_ELLIPSIS: "Alternatieve formaten downloaden ...",
            DOWNLOAD_OPTIONS: "Downloadopties",
            FILENAME_ALTERNATIVE_FORMAT: "{FILENAME} - Alternatieve formaten",
            FILE_HAS_BEEN_DELETED: "Bestand is verwijderd",
            FILE_TYPE_DOCUMENT: "Document",
            FILE_TYPE_HTML_PAGE: "HTML-bestand",
            FILE_TYPE_IMAGE: "Afbeelding",
            FILE_TYPE_OTHER: "Overige",
            FILE_TYPE_PDF: "PDF-document",
            FILE_TYPE_PRESENTATION: "Presentatie",
            FILE_TYPE_SCORE: "{0} - {1}",
            FIX: "Corrigeren",
            INSTRUCTOR_FEEDBACK: "Feedback cursusleider",
            INSTRUCTOR_FEEDBACK_FOR: "Feedback cursusleider voor {0}",
            LOADING_INSTRUCTOR_FEEDBACK_PLEASE_WAIT: "De feedback van de cursusleider wordt geladen, even geduld aub.",
            POTENTIALLY_SEIZURE_INDUCING: "Potentiële aanval opwekkende",
            POTENTIALLY_SEIZURE_INDUCING_ANIMATION_PRESS_TO_ENABLE: "Potentiële aanval opwekkende animatie. Klik om in te schakelen.",
            PREVIEW: "Voorbeeld",
            SHOW_IMAGE_ANYWAY: "Afbeelding toch tonen",
            X_OF_Y: "{0} / {1}"
        },
        __pl: {
            ACCESSIBILITY: "Ułatwienia dostępu",
            ACCESSIBILITY_INFORMATION_NOT_AVAILABLE: "Informacje o ułatwieniach dostępu są niedostępne",
            ACCESSIBILITY_SCORE_HIGH: "Ocena dostępności: wysoka",
            ACCESSIBILITY_SCORE_LOW: "Ocena dostępności: niska",
            ACCESSIBILITY_SCORE_MEDIUM: "Ocena dostępności: przeciętna",
            ACCESSIBILITY_SCORE_PERCENT: "Ocena dostępności: {0}",
            ACCESSIBILITY_SCORE_PERFECT: "Ocena dostępności: doskonała",
            ACTIONS: "Działania",
            ALTERNATIVE_FORMATS: "Alternatywne formaty",
            ATTO_BLOCK_QUOTED: "Cytat",
            ATTO_BLOCK_HEADING_1: "Nagłówek 1",
            ATTO_BLOCK_HEADING_2: "Nagłówek 2",
            ATTO_BLOCK_HEADING_3: "Nagłówek 3",
            ATTO_BLOCK_PLAIN: "Prosty",
            ATTO_BLOCK_PRE: "Wstępnie sformatowany",
            CANCEL: "Anuluj",
            CLICK_TO_IMPROVE: "Wybierz, aby poprawić",
            DOWNLOAD: "Pobierz",
            DOWNLOAD_ALTERNATIVE_FORMATS_ELLIPSIS: "Pobierz alternatywne formaty...",
            DOWNLOAD_OPTIONS: "Opcje pobierania",
            FILENAME_ALTERNATIVE_FORMAT: "{FILENAME} – alternatywne formaty",
            FILE_HAS_BEEN_DELETED: "Plik został usunięty",
            FILE_TYPE_DOCUMENT: "Dokument",
            FILE_TYPE_HTML_PAGE: "Plik HTML",
            FILE_TYPE_IMAGE: "Obraz",
            FILE_TYPE_OTHER: "Inne",
            FILE_TYPE_PDF: "Dokument PDF",
            FILE_TYPE_PRESENTATION: "Prezentacja",
            FILE_TYPE_SCORE: "{0} — {1}",
            FIX: "Napraw",
            INSTRUCTOR_FEEDBACK: "Uwagi od instruktora",
            INSTRUCTOR_FEEDBACK_FOR: "Uwagi od instruktora dla: {0}",
            LOADING_INSTRUCTOR_FEEDBACK_PLEASE_WAIT: "Ładowanie uwag od instruktora. Proszę czekać.",
            POTENTIALLY_SEIZURE_INDUCING: "Może wywoływać napady padaczkowe",
            POTENTIALLY_SEIZURE_INDUCING_ANIMATION_PRESS_TO_ENABLE: "Animacja, która może wywoływać napady padaczkowe. Naciśnij, aby włączyć.",
            PREVIEW: "Podgląd",
            SHOW_IMAGE_ANYWAY: "Pokaż obraz mimo to",
            X_OF_Y: "{0} / {1}"
        },
        __pt: {
            ACCESSIBILITY: "Acessibilidade",
            ACCESSIBILITY_INFORMATION_NOT_AVAILABLE: "Informação de acessibilidade não disponível",
            ACCESSIBILITY_SCORE_HIGH: "Classificação de acessibilidade: Elevada",
            ACCESSIBILITY_SCORE_LOW: "Classificação de acessibilidade: Reduzida",
            ACCESSIBILITY_SCORE_MEDIUM: "Classificação de acessibilidade: Média",
            ACCESSIBILITY_SCORE_PERCENT: "Classificação de acessibilidade: {0}",
            ACCESSIBILITY_SCORE_PERFECT: "Classificação de acessibilidade: Perfeita",
            ACTIONS: "Ações",
            ALTERNATIVE_FORMATS: "Formatos alternativos",
            ATTO_BLOCK_QUOTED: "Entre aspas",
            ATTO_BLOCK_HEADING_1: "Título 1",
            ATTO_BLOCK_HEADING_2: "Título 2",
            ATTO_BLOCK_HEADING_3: "Título 3",
            ATTO_BLOCK_PLAIN: "Simples",
            ATTO_BLOCK_PRE: "Pré-formatado",
            CANCEL: "Cancelar",
            CLICK_TO_IMPROVE: "Selecione para melhorar",
            DOWNLOAD: "Transferir",
            DOWNLOAD_ALTERNATIVE_FORMATS_ELLIPSIS: "Transferir formatos alternativos ...",
            DOWNLOAD_OPTIONS: "Opções de transferência",
            FILENAME_ALTERNATIVE_FORMAT: "{FILENAME} - Formatos alternativos",
            FILE_HAS_BEEN_DELETED: "O ficheiro foi eliminado",
            FILE_TYPE_DOCUMENT: "Documento",
            FILE_TYPE_HTML_PAGE: "Ficheiro HTML",
            FILE_TYPE_IMAGE: "Imagem",
            FILE_TYPE_OTHER: "Outro",
            FILE_TYPE_PDF: "Documento PDF",
            FILE_TYPE_PRESENTATION: "Apresentação",
            FILE_TYPE_SCORE: "{0} - {1}",
            FIX: "Corrigir",
            INSTRUCTOR_FEEDBACK: "Comentários do formador",
            INSTRUCTOR_FEEDBACK_FOR: "Comentários do formador para {0}",
            LOADING_INSTRUCTOR_FEEDBACK_PLEASE_WAIT: "A carregar os comentários do formador. Aguarde um momento.",
            POTENTIALLY_SEIZURE_INDUCING: "Potencialmente indutor de convulsões",
            POTENTIALLY_SEIZURE_INDUCING_ANIMATION_PRESS_TO_ENABLE: "Animação potencialmente indutora de convulsões. Prima para ativar.",
            PREVIEW: "Pré-visualizar",
            SHOW_IMAGE_ANYWAY: "Mostrar imagem mesmo assim",
            X_OF_Y: "{0} / {1}"
        },
        "__pt-br": {
            ACCESSIBILITY: "Acessibilidade",
            ACCESSIBILITY_INFORMATION_NOT_AVAILABLE: "Não há informações de acessibilidade disponíveis",
            ACCESSIBILITY_SCORE_HIGH: "Pontuação de acessibilidade: alta",
            ACCESSIBILITY_SCORE_LOW: "Pontuação de acessibilidade: baixa",
            ACCESSIBILITY_SCORE_MEDIUM: "Pontuação de acessibilidade: média",
            ACCESSIBILITY_SCORE_PERCENT: "Pontuação de acessibilidade: {0}",
            ACCESSIBILITY_SCORE_PERFECT: "Pontuação de acessibilidade: perfeita",
            ACTIONS: "Ações",
            ALTERNATIVE_FORMATS: "Formatos alternativos",
            ATTO_BLOCK_QUOTED: "Citado",
            ATTO_BLOCK_HEADING_1: "Cabeçalho 1",
            ATTO_BLOCK_HEADING_2: "Cabeçalho 2",
            ATTO_BLOCK_HEADING_3: "Título 3",
            ATTO_BLOCK_PLAIN: "Sem formatação",
            ATTO_BLOCK_PRE: "Pré-formatado",
            CANCEL: "Cancelar",
            CLICK_TO_IMPROVE: "Selecione para melhorar",
            DOWNLOAD: "Fazer download",
            DOWNLOAD_ALTERNATIVE_FORMATS_ELLIPSIS: "Baixar formatos alternativos...",
            DOWNLOAD_OPTIONS: "Opções de download",
            FILENAME_ALTERNATIVE_FORMAT: "{FILENAME} – Formatos alternativos",
            FILE_HAS_BEEN_DELETED: "O arquivo foi excluído",
            FILE_TYPE_DOCUMENT: "Documento",
            FILE_TYPE_HTML_PAGE: "Arquivo HTML",
            FILE_TYPE_IMAGE: "Imagem",
            FILE_TYPE_OTHER: "Outro",
            FILE_TYPE_PDF: "Documento PDF",
            FILE_TYPE_PRESENTATION: "Apresentação",
            FILE_TYPE_SCORE: "{0} - {1}",
            FIX: "Corrigir",
            INSTRUCTOR_FEEDBACK: "Comentários do instrutor",
            INSTRUCTOR_FEEDBACK_FOR: "Comentários do instrutor para {0}",
            LOADING_INSTRUCTOR_FEEDBACK_PLEASE_WAIT: "Carregando os comentários do instrutor. Aguarde.",
            POTENTIALLY_SEIZURE_INDUCING: "Possibilidade de provocar convulsão",
            POTENTIALLY_SEIZURE_INDUCING_ANIMATION_PRESS_TO_ENABLE: "Animação com possibilidade de provocar convulsão. Pressione para habilitar.",
            PREVIEW: "Pré-visualização",
            SHOW_IMAGE_ANYWAY: "Mostrar imagem mesmo assim",
            X_OF_Y: "{0}/{1}"
        },
        __sv: {
            ACCESSIBILITY: "Tillgänglighet",
            ACCESSIBILITY_INFORMATION_NOT_AVAILABLE: "Tillgänglighetsinformation är inte tillgänglig",
            ACCESSIBILITY_SCORE_HIGH: "Tillgänglighetspoäng: hög",
            ACCESSIBILITY_SCORE_LOW: "Tillgänglighetspoäng: låg",
            ACCESSIBILITY_SCORE_MEDIUM: "Tillgänglighetspoäng: mellan",
            ACCESSIBILITY_SCORE_PERCENT: "Tillgänglighetspoäng: {0}",
            ACCESSIBILITY_SCORE_PERFECT: "Tillgänglighetspoäng: perfekt",
            ACTIONS: "Åtgärder",
            ALTERNATIVE_FORMATS: "Alternativa format",
            ATTO_BLOCK_QUOTED: "Citat",
            ATTO_BLOCK_HEADING_1: "Rubrik 1",
            ATTO_BLOCK_HEADING_2: "Rubrik 2",
            ATTO_BLOCK_HEADING_3: "Rubrik 3",
            ATTO_BLOCK_PLAIN: "Oformaterat",
            ATTO_BLOCK_PRE: "Förformaterat",
            CANCEL: "Avbryt",
            CLICK_TO_IMPROVE: "Välj för att förbättra",
            DOWNLOAD: "Ladda ner",
            DOWNLOAD_ALTERNATIVE_FORMATS_ELLIPSIS: "Ladda ner alternativa format ...",
            DOWNLOAD_OPTIONS: "Nerladdningsalternativ",
            FILENAME_ALTERNATIVE_FORMAT: "{FILENAME} – Alternativa format",
            FILE_HAS_BEEN_DELETED: "Filen har raderats",
            FILE_TYPE_DOCUMENT: "Dokument",
            FILE_TYPE_HTML_PAGE: "HTML-fil",
            FILE_TYPE_IMAGE: "Bild",
            FILE_TYPE_OTHER: "Annat",
            FILE_TYPE_PDF: "PDF-dokument",
            FILE_TYPE_PRESENTATION: "Presentation",
            FILE_TYPE_SCORE: "{0}–{1}",
            FIX: "Fixa",
            INSTRUCTOR_FEEDBACK: "Läraråterkoppling",
            INSTRUCTOR_FEEDBACK_FOR: "Läraråterkoppling för {0}",
            LOADING_INSTRUCTOR_FEEDBACK_PLEASE_WAIT: "Laddar läraråterkoppling. Vänta.",
            POTENTIALLY_SEIZURE_INDUCING: "Kan potentiellt framkalla anfall",
            POTENTIALLY_SEIZURE_INDUCING_ANIMATION_PRESS_TO_ENABLE: "Animation som potentiellt kan framkalla anfall. Klicka för att aktivera.",
            PREVIEW: "Förhandsvisning",
            SHOW_IMAGE_ANYWAY: "Visa bilden ändå",
            X_OF_Y: "{0}/{1}"
        },
        __tr: {
            ACCESSIBILITY: "Erişilebilirlik",
            ACCESSIBILITY_INFORMATION_NOT_AVAILABLE: "Erişilebilirlik bilgileri kullanılamıyor",
            ACCESSIBILITY_SCORE_HIGH: "Erişilebilirlik puanı: Yüksek",
            ACCESSIBILITY_SCORE_LOW: "Erişilebilirlik puanı: Düşük",
            ACCESSIBILITY_SCORE_MEDIUM: "Erişilebilirlik puanı: Orta",
            ACCESSIBILITY_SCORE_PERCENT: "Erişilebilirlik puanı: {0}",
            ACCESSIBILITY_SCORE_PERFECT: "Erişilebilirlik puanı: Mükemmel",
            ACTIONS: "Eylemler",
            ALTERNATIVE_FORMATS: "Alternatif biçimler",
            ATTO_BLOCK_QUOTED: "Alıntı Yapılmış",
            ATTO_BLOCK_HEADING_1: "Başlık 1",
            ATTO_BLOCK_HEADING_2: "Başlık 2",
            ATTO_BLOCK_HEADING_3: "Başlık 3",
            ATTO_BLOCK_PLAIN: "Düz",
            ATTO_BLOCK_PRE: "Önceden Biçimlendirilmiş",
            CANCEL: "İptal",
            CLICK_TO_IMPROVE: "İyileştirmek için seçin",
            DOWNLOAD: "İndir",
            DOWNLOAD_ALTERNATIVE_FORMATS_ELLIPSIS: "Alternatif biçimleri indirin...",
            DOWNLOAD_OPTIONS: "İndirme seçenekleri",
            FILENAME_ALTERNATIVE_FORMAT: "{FILENAME} - Alternatif Biçimler",
            FILE_HAS_BEEN_DELETED: "Dosya silindi",
            FILE_TYPE_DOCUMENT: "Belge",
            FILE_TYPE_HTML_PAGE: "HTML dosyası",
            FILE_TYPE_IMAGE: "Görüntü",
            FILE_TYPE_OTHER: "Diğer",
            FILE_TYPE_PDF: "PDF belgesi",
            FILE_TYPE_PRESENTATION: "Sunum",
            FILE_TYPE_SCORE: "{0} - {1}",
            FIX: "Düzelt",
            INSTRUCTOR_FEEDBACK: "Eğitmen geri bildirimi",
            INSTRUCTOR_FEEDBACK_FOR: "{0} için eğitmen geri bildirimi",
            LOADING_INSTRUCTOR_FEEDBACK_PLEASE_WAIT: "Eğitmen Geri Bildirimi yükleniyor. Lütfen bekleyin.",
            POTENTIALLY_SEIZURE_INDUCING: "Nöbete yol açabilir",
            POTENTIALLY_SEIZURE_INDUCING_ANIMATION_PRESS_TO_ENABLE: "Nöbete yol açabilecek animasyon. Etkinleştirmek için basın.",
            PREVIEW: "Ön izleme",
            SHOW_IMAGE_ANYWAY: "Görüntüyü yine de göster",
            X_OF_Y: "{0}/{1}"
        },
        __xh_ZA: {
            ACCESSIBILITY: "Ukufikeleleka",
            ACCESSIBILITY_INFORMATION_NOT_AVAILABLE: "Inkcazelo yofikeleleko ayikho",
            ACCESSIBILITY_SCORE_HIGH: "Inqaku lofikeleleko: Liphezulu",
            ACCESSIBILITY_SCORE_LOW: "Inqaku lofikeleleko: Lisezantsi",
            ACCESSIBILITY_SCORE_MEDIUM: "Inqaku lofikeleleko: Liphakathi",
            ACCESSIBILITY_SCORE_PERCENT: "Inqaku lofikeleleko: {0}",
            ACCESSIBILITY_SCORE_PERFECT: "Inqaku lofikeleleko: Ligqibelele",
            ACTIONS: "Izenzo",
            ALTERNATIVE_FORMATS: "Ezinye iifomathi",
            ATTO_BLOCK_QUOTED: "Ezicatshuliweyo",
            ATTO_BLOCK_HEADING_1: "Umxholo 1",
            ATTO_BLOCK_HEADING_2: "Umxholo 2",
            ATTO_BLOCK_HEADING_3: "Umxholo 3",
            ATTO_BLOCK_PLAIN: "Epleyini",
            ATTO_BLOCK_PRE: "Efomathwe kwangaphambili",
            CANCEL: "Rhoxisa",
            CLICK_TO_IMPROVE: "Khetha ukuze uphucule",
            DOWNLOAD: "Dawnlowuda",
            DOWNLOAD_ALTERNATIVE_FORMATS_ELLIPSIS: "Dawnlowuda ezinye iifomathi ...",
            DOWNLOAD_OPTIONS: "Ukhetho xa udawunlowuda",
            FILENAME_ALTERNATIVE_FORMAT: "{FILENAME} - Ezinye Iifomathi",
            FILE_HAS_BEEN_DELETED: "Ifayile iye yacinywa",
            FILE_TYPE_DOCUMENT: "Uxwebhu",
            FILE_TYPE_HTML_PAGE: "Ifayile yeHTML",
            FILE_TYPE_IMAGE: "Umfanekiso",
            FILE_TYPE_OTHER: "Ezinye",
            FILE_TYPE_PDF: "Uxwebhu lwePDF",
            FILE_TYPE_PRESENTATION: "Iprizenteyishini",
            FILE_TYPE_SCORE: "{0} - {1}",
            FIX: "Lungisa",
            INSTRUCTOR_FEEDBACK: "Uluvo lomhlohli",
            INSTRUCTOR_FEEDBACK_FOR: "Uluvo lomhlohli ku {0}",
            LOADING_INSTRUCTOR_FEEDBACK_PLEASE_WAIT: "Ilowuda Uluvo Lomhlohli. Nceda ulinde.",
            POTENTIALLY_SEIZURE_INDUCING: "Inokubangela kuvuseleleke ukuxhuzula",
            POTENTIALLY_SEIZURE_INDUCING_ANIMATION_PRESS_TO_ENABLE: "Umboniso onokubangela kuvuseleleke ukuxhuzula. Cofa ukuze uvulele.",
            PREVIEW: "Qala uyibone",
            SHOW_IMAGE_ANYWAY: "Wubonise umfanekiso nakubeni kunjalo",
            X_OF_Y: "{0} / {1}"
        },
        __zh_TW: {
            ACCESSIBILITY: "無障礙",
            ACCESSIBILITY_INFORMATION_NOT_AVAILABLE: "未提供無障礙資訊",
            ACCESSIBILITY_SCORE_HIGH: "無障礙分數: 高",
            ACCESSIBILITY_SCORE_LOW: "無障礙分數: 低",
            ACCESSIBILITY_SCORE_MEDIUM: "無障礙分數: 中",
            ACCESSIBILITY_SCORE_PERCENT: "無障礙分數: {0}",
            ACCESSIBILITY_SCORE_PERFECT: "無障礙分數: 理想",
            ACTIONS: "動作",
            ALTERNATIVE_FORMATS: "替代格式",
            ATTO_BLOCK_QUOTED: "加上引號",
            ATTO_BLOCK_HEADING_1: "標題 1",
            ATTO_BLOCK_HEADING_2: "標題 2",
            ATTO_BLOCK_HEADING_3: "標題 3",
            ATTO_BLOCK_PLAIN: "純文字",
            ATTO_BLOCK_PRE: "已預先格式化",
            CANCEL: "取消",
            CLICK_TO_IMPROVE: "選取以改進",
            DOWNLOAD: "下載",
            DOWNLOAD_ALTERNATIVE_FORMATS_ELLIPSIS: "下載替代格式...",
            DOWNLOAD_OPTIONS: "下載選項",
            FILENAME_ALTERNATIVE_FORMAT: "{FILENAME} - 替代格式",
            FILE_HAS_BEEN_DELETED: "已刪除檔案",
            FILE_TYPE_DOCUMENT: "文件",
            FILE_TYPE_HTML_PAGE: "HTML 檔案",
            FILE_TYPE_IMAGE: "影像",
            FILE_TYPE_OTHER: "其他",
            FILE_TYPE_PDF: "PDF 文件",
            FILE_TYPE_PRESENTATION: "簡報",
            FILE_TYPE_SCORE: "{0} - {1}",
            FIX: "修正",
            INSTRUCTOR_FEEDBACK: "講師意見回應",
            INSTRUCTOR_FEEDBACK_FOR: "{0} 的講師意見回應",
            LOADING_INSTRUCTOR_FEEDBACK_PLEASE_WAIT: "正在載入講師意見回應。請稍候。",
            POTENTIALLY_SEIZURE_INDUCING: "可能引發癲癇",
            POTENTIALLY_SEIZURE_INDUCING_ANIMATION_PRESS_TO_ENABLE: "可能引發癲癇的動畫。按下以啟用。",
            PREVIEW: "預覽",
            SHOW_IMAGE_ANYWAY: "仍要顯示影像",
            X_OF_Y: "{0} (共 {1})"
        },
        __zu: {
            ACCESSIBILITY: "Ukufinyeleleka",
            ACCESSIBILITY_INFORMATION_NOT_AVAILABLE: "Imininingwane yokufinyeleleka ayitholakali",
            ACCESSIBILITY_SCORE_HIGH: "Isko sokufinyeleleka: Siphezulu",
            ACCESSIBILITY_SCORE_LOW: "Isko sokufinyeleleka: Siphansi",
            ACCESSIBILITY_SCORE_MEDIUM: "Isko sokufinyeleleka: Siphakathi Nendawo",
            ACCESSIBILITY_SCORE_PERCENT: "Isko sokufinyeleleka: {0}",
            ACCESSIBILITY_SCORE_PERFECT: "Isko sokufinyeleleka: Sihle Kakhulu",
            ACTIONS: "Okungenziwa",
            ALTERNATIVE_FORMATS: "Amanye amafomethi",
            ATTO_BLOCK_QUOTED: "Okucashuniwe",
            ATTO_BLOCK_HEADING_1: "Isihloko 1",
            ATTO_BLOCK_HEADING_2: "Isihloko 2",
            ATTO_BLOCK_HEADING_3: "Isihloko 3",
            ATTO_BLOCK_PLAIN: "Akunalutho",
            ATTO_BLOCK_PRE: "Kufomethwe kakade",
            CANCEL: "Khansela",
            CLICK_TO_IMPROVE: "Khetha uthuthukise",
            DOWNLOAD: "Dawuniloda",
            DOWNLOAD_ALTERNATIVE_FORMATS_ELLIPSIS: "Dawuniloda amanye amafomethi ...",
            DOWNLOAD_OPTIONS: "OngakuDawuniloda",
            FILENAME_ALTERNATIVE_FORMAT: "{FILENAME} - Amanye Amafomethi",
            FILE_HAS_BEEN_DELETED: "Ifayela likhishiwe",
            FILE_TYPE_DOCUMENT: "Idokhumenti",
            FILE_TYPE_HTML_PAGE: "Ifayela le-HTML",
            FILE_TYPE_IMAGE: "Isithombe",
            FILE_TYPE_OTHER: "Okunye",
            FILE_TYPE_PDF: "Idokhumenti ye-PDF",
            FILE_TYPE_PRESENTATION: "Iphrezenteshi",
            FILE_TYPE_SCORE: "{0} - {1}",
            FIX: "Lungisa",
            INSTRUCTOR_FEEDBACK: "Okuphawulwe umfundisi",
            INSTRUCTOR_FEEDBACK_FOR: "Okuphawulwe umfundisi nge-{0}",
            LOADING_INSTRUCTOR_FEEDBACK_PLEASE_WAIT: "Kusalayisha Okuphawulwe Umfundisi. Sicela ulinde.",
            POTENTIALLY_SEIZURE_INDUCING: "Ingase ivuse isifo sokuwa",
            POTENTIALLY_SEIZURE_INDUCING_ANIMATION_PRESS_TO_ENABLE: "Opopayi bangavusa isifo sokuwa. Thinta uvule.",
            PREVIEW: "Buyekeza",
            SHOW_IMAGE_ANYWAY: "Veza isthombe noma kunjalo",
            X_OF_Y: "{0} / {1}"
        },
        init: function(e) {
            e || (e = window._i18n && window._i18n.locale ? window._i18n.locale : document.documentElement.lang ? document.documentElement.lang : "root");
            var t = this["__" + e] || this.__root;
            if (t)
                for (var n in t) this[n] = t[n];
            for (var n in this.__root) void 0 === this[n] && (this[n] = this.__root[n])
        }
    };
    n.init(), e.exports = n
}, function(e, t, n) {
    e.exports = n.p + "static/integration/css/ally.3076e844b51dc74dab2c06b84fe86de1.css"
}, function(e, t, n) {
    var r = n(80);
    e.exports = function(e) {
        var t = e.replace(/-/g, "+").replace(/_/g, "/");
        switch (t.length % 4) {
            case 0:
                break;
            case 2:
                t += "==";
                break;
            case 3:
                t += "=";
                break;
            default:
                throw "Illegal base64url string!"
        }
        try {
            return function(e) {
                return decodeURIComponent(r(e).replace(/(.)/g, function(e, t) {
                    var n = t.charCodeAt(0).toString(16).toUpperCase();
                    return n.length < 2 && (n = "0" + n), "%" + n
                }))
            }(t)
        } catch (e) {
            return r(t)
        }
    }
}, function(e, t) {
    var n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    function r(e) {
        this.message = e
    }
    r.prototype = new Error, r.prototype.name = "InvalidCharacterError", e.exports = "undefined" != typeof window && window.atob && window.atob.bind(window) || function(e) {
        var t = String(e).replace(/=+$/, "");
        if (t.length % 4 == 1) throw new r("'atob' failed: The string to be decoded is not correctly encoded.");
        for (var i, o, a = 0, s = 0, l = ""; o = t.charAt(s++); ~o && (i = a % 4 ? 64 * i + o : o, a++ % 4) ? l += String.fromCharCode(255 & i >> (-2 * a & 6)) : 0) o = n.indexOf(o);
        return l
    }
}, function(e, t, n) {
    var r = n(6);
    e.exports = (r.default || r).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, r, i) {
            var o, a, s = null != t ? t : e.nullContext || {},
                l = n.helperMissing,
                c = e.escapeExpression;
            return '<button\n    class="d2l-button ally-d2l-button button new-unit-btn subtle"\n    data-ally-content-ref="' + c("function" == typeof(a = null != (a = n.contentRef || (null != t ? t.contentRef : t)) ? a : l) ? a.call(s, {
                name: "contentRef",
                hash: {},
                data: i
            }) : a) + '"\n    data-ally-invoke="alternativeformats"\n    data-ally-show="alternativeformats"\n    data-ally-show-display="inline-block"\n    style="display: none">\n    <img src="' + c("function" == typeof(a = null != (a = n.baseUrl || (null != t ? t.baseUrl : t)) ? a : l) ? a.call(s, {
                name: "baseUrl",
                hash: {},
                data: i
            }) : a) + "/" + c("function" == typeof(a = null != (a = n.aafIcon || (null != t ? t.aafIcon : t)) ? a : l) ? a.call(s, {
                name: "aafIcon",
                hash: {},
                data: i
            }) : a) + '" alt="" class="d2l-icon-custom" />' + c(e.lambda(null != (o = null != t ? t.i18n : t) ? o.ALTERNATIVE_FORMATS : o, t)) + "\n</button>\n"
        },
        useData: !0
    })
}, function(e, t, n) {
    var r = n(6);
    e.exports = (r.default || r).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, r, i) {
            var o, a = null != t ? t : e.nullContext || {},
                s = n.helperMissing,
                l = e.escapeExpression;
            return '<span\n    data-ally-content-ref="' + l("function" == typeof(o = null != (o = n.contentRef || (null != t ? t.contentRef : t)) ? o : s) ? o.call(a, {
                name: "contentRef",
                hash: {},
                data: i
            }) : o) + '"\n    data-ally-scoreindicator="custom"\n    data-ally-show="instructorfeedback"\n    data-ally-show-display="inline-block"\n    data-ally-scoreindicator-target="' + l("function" == typeof(o = null != (o = n.target || (null != t ? t.target : t)) ? o : s) ? o.call(a, {
                name: "target",
                hash: {},
                data: i
            }) : o) + '"\n    style="display: none;"\n></span>\n'
        },
        useData: !0
    })
}, function(e, t, n) {
    var r = n(6);
    e.exports = (r.default || r).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, r, i) {
            var o, a, s = null != t ? t : e.nullContext || {},
                l = n.helperMissing,
                c = e.escapeExpression,
                u = e.lambda;
            return '<a\n    class="ally-aaf-link d2l-link"\n    data-ally-content-ref="' + c("function" == typeof(a = null != (a = n.contentRef || (null != t ? t.contentRef : t)) ? a : l) ? a.call(s, {
                name: "contentRef",
                hash: {},
                data: i
            }) : a) + '"\n    data-ally-invoke="alternativeformats"\n    data-ally-show="alternativeformats"\n    data-ally-show-display="inline-block"\n    data-ally-tooltip\n    href="#"\n    style="display: none"\n    title="' + c(u(null != (o = null != t ? t.i18n : t) ? o.ALTERNATIVE_FORMATS : o, t)) + '"\n>\n    <img src="' + c("function" == typeof(a = null != (a = n.baseUrl || (null != t ? t.baseUrl : t)) ? a : l) ? a.call(s, {
                name: "baseUrl",
                hash: {},
                data: i
            }) : a) + "/" + c("function" == typeof(a = null != (a = n.aafIcon || (null != t ? t.aafIcon : t)) ? a : l) ? a.call(s, {
                name: "aafIcon",
                hash: {},
                data: i
            }) : a) + '" alt="' + c(u(null != (o = null != t ? t.i18n : t) ? o.ALTERNATIVE_FORMATS : o, t)) + '" />\n</a>\n'
        },
        useData: !0
    })
}, function(e, t, n) {
    e.exports = n.p + "static/integration/d2l/d2l.81fb7d4e073d705081323442a6c380a1.css"
}, function(e, t, n) {
    e.exports = n.p + "static/integration/d2l/img/ally-icon-indicator-high.4fccb0f18334b56672d171b4dac3f1c4.svg"
}, function(e, t, n) {
    e.exports = n.p + "static/integration/d2l/img/ally-icon-indicator-low.6f607b35ae94f095c20f15d2362d2044.svg"
}, function(e, t, n) {
    e.exports = n.p + "static/integration/d2l/img/ally-icon-indicator-medium.a662f4a26fd5fafb0774e99f9410f9e7.svg"
}, function(e, t, n) {
    e.exports = n.p + "static/integration/d2l/img/ally-icon-indicator-perfect.a287f7db4d0d8bc8338953b0b6ea805a.svg"
}, function(e, t, n) {
    var r = n(6);
    e.exports = (r.default || r).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, r, i) {
            var o, a, s = e.escapeExpression;
            return '<a\n    href="#"\n    data-ally-content-ref="' + s("function" == typeof(a = null != (a = n.contentRef || (null != t ? t.contentRef : t)) ? a : n.helperMissing) ? a.call(null != t ? t : e.nullContext || {}, {
                name: "contentRef",
                hash: {},
                data: i
            }) : a) + '"\n    data-ally-invoke="alternativeformats"\n    data-ally-show="alternativeformats"\n    data-ally-show-display="inline-block"\n    data-ally-tooltip title="' + s(e.lambda(null != (o = null != t ? t.i18n : t) ? o.ALTERNATIVE_FORMATS : o, t)) + '"\n    aria-haspopup="true"\n    class="ally-prominent-af-download-button">\n</a>\n'
        },
        useData: !0
    })
}, function(e, t, n) {
    var r = n(6);
    e.exports = (r.default || r).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, r, i) {
            var o, a = null != t ? t : e.nullContext || {},
                s = n.helperMissing,
                l = e.escapeExpression;
            return '<span data-ally-content-ref="' + l("function" == typeof(o = null != (o = n.contentRef || (null != t ? t.contentRef : t)) ? o : s) ? o.call(a, {
                name: "contentRef",
                hash: {},
                data: i
            }) : o) + '" data-ally-scoreindicator="' + l("function" == typeof(o = null != (o = n.style || (null != t ? t.style : t)) ? o : s) ? o.call(a, {
                name: "style",
                hash: {},
                data: i
            }) : o) + '" data-ally-show="instructorfeedback">\n</span>'
        },
        useData: !0
    })
}, function(e, t, n) {
    e.exports = n.p + "static/integration/moodlerooms/moodlerooms.d2a0fcddcbefc7ec4dc481a928a55df6.css"
}, function(e, t, n) {
    var r = n(6);
    e.exports = (r.default || r).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, r, i) {
            var o, a, s = null != t ? t : e.nullContext || {},
                l = n.helperMissing,
                c = e.escapeExpression,
                u = e.lambda;
            return '<a\n    href="#"\n    data-ally-content-ref="' + c("function" == typeof(a = null != (a = n.contentRef || (null != t ? t.contentRef : t)) ? a : l) ? a.call(s, {
                name: "contentRef",
                hash: {},
                data: i
            }) : a) + '"\n    data-ally-invoke="alternativeformats"\n    data-ally-show="alternativeformats"\n    data-ally-show-display="inline-block"\n    data-ally-tooltip\n    title="' + c(u(null != (o = null != t ? t.i18n : t) ? o.ALTERNATIVE_FORMATS : o, t)) + '"\n    aria-haspopup="true"\n    class="ally-prominent-af-download-button"\n    style="display: none">\n    <img src="' + c("function" == typeof(a = null != (a = n.baseUrl || (null != t ? t.baseUrl : t)) ? a : l) ? a.call(s, {
                name: "baseUrl",
                hash: {},
                data: i
            }) : a) + "/" + c("function" == typeof(a = null != (a = n.aafIcon || (null != t ? t.aafIcon : t)) ? a : l) ? a.call(s, {
                name: "aafIcon",
                hash: {},
                data: i
            }) : a) + '" alt="' + c(u(null != (o = null != t ? t.i18n : t) ? o.ALTERNATIVE_FORMATS : o, t)) + '" />\n</a>\n'
        },
        useData: !0
    })
}, function(e, t, n) {
    var r = n(6);
    e.exports = (r.default || r).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, r, i) {
            var o, a = null != t ? t : e.nullContext || {},
                s = n.helperMissing,
                l = e.escapeExpression;
            return '<span\n    data-ally-content-ref="' + l("function" == typeof(o = null != (o = n.externalId || (null != t ? t.externalId : t)) ? o : s) ? o.call(a, {
                name: "externalId",
                hash: {},
                data: i
            }) : o) + '"\n    data-ally-scoreindicator\n    data-ally-show="instructorfeedback"\n    data-ally-show-display="inline-block"\n    data-ally-show-always-show-for-image="' + l("function" == typeof(o = null != (o = n.alwaysShowForImage || (null != t ? t.alwaysShowForImage : t)) ? o : s) ? o.call(a, {
                name: "alwaysShowForImage",
                hash: {},
                data: i
            }) : o) + '"\n></span>'
        },
        useData: !0
    })
}, function(e, t, n) {
    e.exports = n.p + "static/integration/schoology/schoology.f661325a62b4340ed1be957152b6c626.css"
}, function(e, t, n) {
    var r = n(6);
    e.exports = (r.default || r).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, r, i) {
            var o, a, s = null != t ? t : e.nullContext || {},
                l = n.helperMissing,
                c = "function",
                u = e.escapeExpression;
            return '<div id="ally-af-launcher" class="ally-af-launch-container ally-af-style-' + u(typeof(a = null != (a = n.style || (null != t ? t.style : t)) ? a : l) === c ? a.call(s, {
                name: "style",
                hash: {},
                data: i
            }) : a) + '">\n    <button data-ally-content-ref="' + u(typeof(a = null != (a = n.contentId || (null != t ? t.contentId : t)) ? a : l) === c ? a.call(s, {
                name: "contentId",
                hash: {},
                data: i
            }) : a) + '" data-ally-invoke="alternativeformats">\n        <img class="ally-af-launch-icon-white" src="' + u(typeof(a = null != (a = n.baseUrl || (null != t ? t.baseUrl : t)) ? a : l) === c ? a.call(s, {
                name: "baseUrl",
                hash: {},
                data: i
            }) : a) + "/" + u(typeof(a = null != (a = n.iconWhite || (null != t ? t.iconWhite : t)) ? a : l) === c ? a.call(s, {
                name: "iconWhite",
                hash: {},
                data: i
            }) : a) + '" alt="" aria-hidden="true" />\n        <img class="ally-af-launch-icon-black" src="' + u(typeof(a = null != (a = n.baseUrl || (null != t ? t.baseUrl : t)) ? a : l) === c ? a.call(s, {
                name: "baseUrl",
                hash: {},
                data: i
            }) : a) + "/" + u(typeof(a = null != (a = n.iconBlack || (null != t ? t.iconBlack : t)) ? a : l) === c ? a.call(s, {
                name: "iconBlack",
                hash: {},
                data: i
            }) : a) + '" alt="" aria-hidden="true" />\n        <span>' + u(e.lambda(null != (o = null != t ? t.i18n : t) ? o.DOWNLOAD_ALTERNATIVE_FORMATS_ELLIPSIS : o, t)) + "</span>\n    </button>\n</div>\n"
        },
        useData: !0
    })
}, function(e, t, n) {
    e.exports = n.p + "static/shared/img/icons/iconAllyDownload-IC-Black.edde979ad5266d2085fee7571f1af90f.svg"
}, function(e, t, n) {
    e.exports = n.p + "static/shared/img/icons/iconAllyDownload-IC-White.9750b42d5d7fe4baf2432a3dc743a1a3.svg"
}, function(e, t, n) {
    "use strict";
    n.r(t), n.d(t, "client", function() {
        return Jn
    }), n.d(t, "ui", function() {
        return er
    });
    var r = n(1),
        i = n(0);

    function o() {
        ! function() {
            if (r(document.body).hasClass("ally-tooltips-enabled")) return;
            r(document.body).addClass("ally-tooltips-enabled"), r(window).on("scroll", function() {
                r(".ally-tooltip").fadeOut(400, function() {
                    r(this).remove()
                })
            }), r(document).tooltip((e = {
                content: function() {
                    var e = this,
                        t = i.b(function() {
                            return e.getAttribute("title")
                        }, function() {
                            return e.getAttribute("data-title")
                        }, function() {
                            return e.getAttribute("aria-label")
                        });
                    return i.d(t, "").replace(/\n/g, "<br>")
                },
                items: ".ally-add-tooltip",
                position: {
                    at: "center top",
                    my: "center bottom-15",
                    using: function(e, t) {
                        setTimeout(function() {
                            var e = r(t.element.element).css({
                                    position: "fixed"
                                }),
                                n = i.d(e.outerWidth(), 0),
                                o = i.d(e.outerHeight(), 0),
                                a = r(t.target.element),
                                s = a.find(".ally-tooltip-center");
                            0 !== s.length && (a = s);
                            var l = i.d(a.outerWidth(), 0),
                                c = i.d(a.outerHeight(), 0),
                                u = a[0].getBoundingClientRect(),
                                d = u.left + l / 2,
                                f = u.top + c / 2,
                                p = a.find("img"),
                                h = i.d(p.outerWidth(), l),
                                m = i.d(p.outerHeight(), 0);
                            e.css({
                                left: d - n / 2 + "px",
                                position: "fixed",
                                top: f - o - 25 + "px"
                            });
                            var g = e.visible();
                            if (r("<div>").addClass("ally-arrow").appendTo(e), !g.isEntirelyVisible) {
                                var v = i.d(r(window).outerHeight(), 0);
                                if (u.bottom + 75 < v && g.leftVisible && g.rightVisible) {
                                    var E = f + m / 2 + 25;
                                    e.css({
                                        top: E + "px"
                                    }), r(".ally-arrow").addClass("ally-arrow-bottom")
                                } else if (g.leftVisible) {
                                    var y = d - n - h / 2 - 15;
                                    E = f - o / 2, e.css({
                                        left: y + "px",
                                        top: E + "px"
                                    }), r(".ally-arrow").addClass("ally-arrow-right")
                                } else y = d + h / 2 + 15, E = f - o / 2, e.css({
                                    left: y + "px",
                                    top: E + "px"
                                }), r(".ally-arrow").addClass("ally-arrow-left")
                            }
                            e.css("visibility", "visible")
                        }, 50)
                    }
                },
                open: function(e, t) {
                    a(t.tooltip), a(t.tooltip.find("*"))
                },
                classes: {
                    "ui-tooltip": "ally-tooltip"
                }
            }, e)), r("div.ui-helper-hidden-accessible:last-of-type").removeClass("ui-helper-hidden-accessible").addClass("ally-helper-hidden-accessible");
            var e
        }()
    }

    function a(e) {
        var t = i.d(e.attr("class"), "").split(" ").filter(function(e) {
            return 0 === e.indexOf("ui-")
        }).join(" ");
        e.removeClass(t)
    }
    n(31), n(36);
    var s = n(12),
        l = n(2),
        c = n(5),
        u = n(37).images,
        d = function() {
            function e() {}
            return e.prototype.apply = function(e) {
                return e.images = u, r(this.template(e))
            }, e
        }(),
        f = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.template = n(43), t
            }
            return Object(l.c)(t, e), t
        }(d),
        p = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.template = n(60), t
            }
            return Object(l.c)(t, e), t
        }(d),
        h = function() {
            function e() {}
            return e.isUltra = function(e) {
                return e.location.pathname.toLowerCase().startsWith("/ultra/")
            }, e
        }();

    function m(e) {
        var t = e.config;
        return "learn" === t.platformName && Object(i.d)(Object(i.f)(t.platformUi, function(e) {
            return e.startsWith("ultra")
        }), !1)
    }

    function g(e) {
        var t = e.getId();
        if (t.startsWith("bbml-editor-id")) return 1 === e.$el.parents("bb-file-viewer").find('*[show-alternative-formats-link="true"][content-id="' + t + '"]').length;
        var n = Object(i.f)(e.$el.parents("*[data-bbfile]").attr("data-bbfile"), JSON.parse);
        return !(Object(i.c)(n) && "inlineOnly" === n.render && n.resourceUrl === e.getFilePreviewUrl())
    }
    var v, E = function() {
            function e(e, t, n, r, i, o, a, s, l, c, u, d) {
                this.platformName = e, this.platformUi = t, this.courseId = n, this.role = r, this.locale = i, this.client = o, this.alternativeFormats = a, this.instructorFeedback = s, this.contentRoot = l, this.directives = c, this.macros = u, this.eventTracker = d
            }
            return e.from = function(t, n, r, o) {
                var a = this.resolvePlatformUi(t, n.platformName, n.platformUi),
                    s = e.resolveAlternativeFormats(n.alternativeformats),
                    c = e.resolveInstructorFeedback(n.instructorfeedback),
                    u = n.contentRoot ? n.contentRoot : document.body,
                    d = e.resolveLocale(n.locale),
                    f = Object(i.d)(Object(i.f)(n.eventTracker, function(e) {
                        return function(t, n) {
                            return void 0 === n && (n = {}), e("click", Object(l.a)(Object(l.a)({}, n), {
                                event: t
                            }))
                        }
                    }), void 0);
                return new e(n.platformName, a, i.e(n.courseId), n.role, d, n.client, s, c, u, r, o, f)
            }, e.resolveAlternativeFormats = function(t) {
                return (t = t || {}).callbacks = e.resolveAlternativeFormatsCallbacks(t.callbacks), t.formats = e.resolveAlternativeFormatsFormatsConfig(t.formats), t
            }, e.resolveInstructorFeedback = function(t) {
                return (t = t || {}).callbacks = e.resolveInstructorFeedbackCallbacks(t.callbacks), t
            }, e.resolveLocale = function(e) {
                if ("string" == typeof e) return e;
                var t = r("html").attr("lang");
                return "string" == typeof t ? t : "en-us"
            }, e.resolveAlternativeFormatsCallbacks = function(e) {
                e = e || {};
                var t = function(e) {
                    window.location.href = e.url
                };
                i.c(e.formatGenerated) && (t = e.formatGenerated);
                var n, r, o = function() {};
                return i.c(e.closed) && (o = e.closed), i.c(e.openUrl) && (n = e.openUrl), i.c(e.alternativeFormatAccessed) && (r = e.alternativeFormatAccessed), {
                    alternativeFormatAccessed: r,
                    closed: o,
                    formatGenerated: t,
                    openUrl: n
                }
            }, e.resolveAlternativeFormatsFormatsConfig = function(e) {
                return {
                    closeWhenFormatReady: !i.c(e) || !i.c(e.closeWhenFormatReady) || !1 !== e.closeWhenFormatReady,
                    renderAudioOnMobileInline: !i.c(e) || !i.c(e.renderAudioOnMobileInline) || !1 !== e.renderAudioOnMobileInline
                }
            }, e.resolveInstructorFeedbackCallbacks = function(e) {
                return e = e || {}, Object(l.a)({
                    closed: function() {},
                    deleted: function() {},
                    fixHtmlIssue: function() {
                        return Promise.resolve()
                    },
                    replacedFile: function() {},
                    updated: function() {}
                }, e)
            }, e.resolvePlatformUi = function(e, t, n, r) {
                return void 0 === r && (r = "ultra"), "learn" !== t || i.c(n) ? i.e(n) : h.isUltra(e) ? r : "classic"
            }, e
        }(),
        y = n(13);
    ! function(e) {
        e.Iframe = "iframe", e.Window = "window"
    }(v || (v = {}));
    var I, _ = function() {
        function e() {}
        return e.emitContentDeleted = function(t) {
            Object.keys(e.deleteHandlers).map(function(t) {
                return e.deleteHandlers[t]
            }).forEach(function(e) {
                return e(t)
            }), e.userCallbacks && e.userCallbacks.deleted(t)
        }, e.offContentDeleted = function(t) {
            delete e.deleteHandlers[t]
        }, e.onContentDeleted = function(t, n) {
            e.deleteHandlers[t] = n
        }, e.emitContentReplaced = function(t, n) {
            Object.keys(e.replaceHandlers).map(function(t) {
                return e.replaceHandlers[t]
            }).forEach(function(e) {
                return e(t, n)
            }), e.userCallbacks && e.userCallbacks.replacedFile(t, n)
        }, e.offContentReplaced = function(t) {
            delete e.replaceHandlers[t]
        }, e.onContentReplaced = function(t, n) {
            e.replaceHandlers[t] = n
        }, e.emitContentUpdated = function(t) {
            Object.keys(e.updatedHandlers).map(function(t) {
                return e.updatedHandlers[t]
            }).forEach(function(e) {
                return e(t)
            }), e.userCallbacks && e.userCallbacks.updated(t)
        }, e.offContentUpdated = function(t) {
            delete e.updatedHandlers[t]
        }, e.onContentUpdated = function(t, n) {
            e.updatedHandlers[t] = n
        }, e.launch = function(t, n, r, i, o) {
            var a, s = this,
                c = t.client.config.baseUrl,
                u = t.client.config.lmsUrl,
                d = t.config.platformName,
                f = t.config.platformUi,
                p = t.client.config.clientId,
                h = O.apply({
                    ALLY_DOMAIN: t.client.config.baseUrl,
                    i18n: t.i18n,
                    locale: t.config.locale
                }),
                m = E.resolveInstructorFeedbackCallbacks(o),
                g = e.userCallbacks = {
                    closed: function() {
                        m.closed(), t.config.instructorFeedback.callbacks.closed()
                    },
                    deleted: function(e) {
                        m.deleted(e), t.config.instructorFeedback.callbacks.deleted(e)
                    },
                    fixHtmlIssue: function(e, n, r) {
                        return Object(l.b)(s, void 0, void 0, function() {
                            return Object(l.d)(this, function(i) {
                                switch (i.label) {
                                    case 0:
                                        return [4, m.fixHtmlIssue(e, n, r)];
                                    case 1:
                                        return i.sent(), [4, t.config.instructorFeedback.callbacks.fixHtmlIssue(e, n, r)];
                                    case 2:
                                        return i.sent(), [2]
                                }
                            })
                        })
                    },
                    replacedFile: function(e, n) {
                        m.replacedFile(e, n), t.config.instructorFeedback.callbacks.replacedFile(e, n)
                    },
                    updated: function(e) {
                        m.updated(e), t.config.instructorFeedback.callbacks.updated(e)
                    }
                },
                v = {
                    closed: function() {
                        return g.closed()
                    },
                    deleted: e.emitContentDeleted,
                    eventTracker: t.config.eventTracker,
                    fixHtmlIssue: g.fixHtmlIssue,
                    replacedFile: e.emitContentReplaced,
                    updated: e.emitContentUpdated
                };
            e.previousLaunchArgs = [c, u, d, f, p, n, r, h, i, v], (a = y.launch).call.apply(a, Object(l.f)([null], e.previousLaunchArgs))
        }, e.destroy = function() {
            y.reset(), Object.keys(e.deleteHandlers).forEach(e.offContentDeleted), Object.keys(e.replaceHandlers).forEach(e.offContentReplaced), Object.keys(e.updatedHandlers).forEach(e.offContentUpdated), this.userCallbacks = null
        }, e.userCallbacks = null, e.deleteHandlers = {}, e.replaceHandlers = {}, e.updatedHandlers = {}, e
    }();
    ! function(e) {
        e.circle = "circle", e.custom = "custom", e.learnUltra = "learnUltra", e.standard = "standard"
    }(I || (I = {}));
    var A = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.template = n(61), t.icons = {
                    circle: {
                        high: n(18),
                        low: n(20),
                        medium: n(22),
                        perfect: n(24)
                    },
                    learnUltra: {
                        high: n(62),
                        low: n(63),
                        medium: n(64),
                        perfect: n(65)
                    },
                    standard: {
                        high: n(19),
                        low: n(21),
                        medium: n(23),
                        perfect: n(25)
                    }
                }, t
            }
            return Object(l.c)(t, e), t.prototype.apply = function(e) {
                var t = this.icons.standard;
                e.style === I.custom ? void 0 !== e.customIconSet && (t = e.customIconSet) : t = this.icons[e.style];
                var n = i.d(e.target, v.Iframe),
                    o = Object(l.a)(Object(l.a)({
                        alwaysShowForImage: "false"
                    }, e), {
                        icons: t,
                        target: n
                    });
                return r(this.template(o))
            }, t
        }(d),
        T = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.template = n(66), t.icons = {
                    seizureFlag: n(26)
                }, t
            }
            return Object(l.c)(t, e), t.prototype.apply = function(e) {
                return r(this.template(Object(l.a)(Object(l.a)({}, e), {
                    icons: this.icons
                })))
            }, t
        }(d),
        b = new f,
        O = new p,
        C = new A,
        L = new T,
        S = n(67),
        w = function() {
            function e() {}
            return e.launchFile = function(t, n, r, i, o, a) {
                var s, c = t.client.config.baseUrl,
                    u = t.config.platformName,
                    d = t.config.platformUi,
                    f = t.client.config.clientId,
                    p = b.apply({
                        ALLY_DOMAIN: t.client.config.baseUrl,
                        i18n: t.i18n,
                        locale: t.config.locale,
                        platformName: u,
                        platformUi: d
                    });
                e.previousFileLaunchArgs = [c, u, d, f, n, r, i, p, o, e.resolveCallbacks(t, a)], (s = S.launch).call.apply(s, Object(l.f)([null], e.previousFileLaunchArgs))
            }, e.launchWebpage = function(t, n, r, i, o) {
                var a, s = t.client.config.baseUrl,
                    c = t.i18n,
                    u = t.config.platformName,
                    d = t.config.platformUi,
                    f = t.client.config.clientId,
                    p = b.apply({
                        ALLY_DOMAIN: s,
                        i18n: c,
                        locale: t.config.locale,
                        platformName: u,
                        platformUi: d
                    });
                e.previousWebpageLaunchArgs = [s, u, d, f, n, r.toJson(), p, i, e.resolveCallbacks(t, o)], (a = S.launchWebpage).call.apply(a, Object(l.f)([null], e.previousWebpageLaunchArgs))
            }, e.launchDirectFileOnWebpage = function(t, n, r, i, o, a) {
                var s, c = t.client.config.baseUrl,
                    u = t.i18n,
                    d = t.config.platformName,
                    f = t.config.platformUi,
                    p = t.client.config.clientId,
                    h = b.apply({
                        ALLY_DOMAIN: c,
                        i18n: u,
                        locale: t.config.locale,
                        platformName: d,
                        platformUi: f
                    });
                e.previousWebpageLaunchArgs = [c, d, f, p, n, r.toJson(), h, i, e.resolveCallbacks(t, a), o], (s = S.launchDirectFileOnWebpage).call.apply(s, Object(l.f)([null], e.previousWebpageLaunchArgs))
            }, e.launchAaasContent = function(t, n, r, i, o) {
                var a, s = t.client.config.baseUrl,
                    c = t.i18n,
                    u = t.config.platformName,
                    d = t.config.platformUi,
                    f = t.client.config.clientId,
                    p = b.apply({
                        ALLY_DOMAIN: s,
                        i18n: c,
                        locale: t.config.locale,
                        platformName: u,
                        platformUi: d
                    });
                e.previousAaasLaunchArgs = [s, u, d, f, n, p, r, e.resolveCallbacks(t, o), i], (a = S.launchAaasContent).call.apply(a, Object(l.f)([null], e.previousAaasLaunchArgs))
            }, e.destroy = function() {
                S.reset()
            }, e.resolveCallbacks = function(e, t) {
                var n = {
                    alternativeFormatAccessed: function(n) {
                        i.c(t.alternativeFormatAccessed) && t.alternativeFormatAccessed(n);
                        var r = e.config.alternativeFormats.callbacks.alternativeFormatAccessed;
                        i.c(r)
                    },
                    closed: function() {
                        i.c(t.closed) && t.closed(), e.config.alternativeFormats.callbacks.closed()
                    },
                    formatGenerated: function(n) {
                        i.c(t.formatGenerated) && t.formatGenerated(n), e.config.alternativeFormats.callbacks.formatGenerated(n)
                    },
                    openUrl: void 0
                };
                return (i.c(t.openUrl) || i.c(e.config.alternativeFormats.callbacks.openUrl)) && (n.openUrl = function(n) {
                    i.c(t.openUrl) && t.openUrl(n), i.c(e.config.alternativeFormats.callbacks.openUrl) && e.config.alternativeFormats.callbacks.openUrl(n)
                }), n
            }, e
        }(),
        N = n(9);

    function R(e) {
        var t = e.getBoundingClientRect();
        return {
            width: t.width,
            height: t.height,
            top: t.top,
            right: t.right,
            bottom: t.bottom,
            left: t.left,
            x: t.left,
            y: t.top
        }
    }

    function F(e) {
        if ("[object Window]" !== e.toString()) {
            var t = e.ownerDocument;
            return t ? t.defaultView : window
        }
        return e
    }

    function P(e) {
        var t = F(e);
        return {
            scrollLeft: t.pageXOffset,
            scrollTop: t.pageYOffset
        }
    }

    function k(e) {
        return e instanceof F(e).Element || e instanceof Element
    }

    function D(e) {
        return e instanceof F(e).HTMLElement || e instanceof HTMLElement
    }

    function x(e) {
        return e ? (e.nodeName || "").toLowerCase() : null
    }

    function M(e) {
        return (k(e) ? e.ownerDocument : e.document).documentElement
    }

    function B(e) {
        return R(M(e)).left + P(e).scrollLeft
    }

    function H(e) {
        return F(e).getComputedStyle(e)
    }

    function j(e) {
        var t = H(e),
            n = t.overflow,
            r = t.overflowX,
            i = t.overflowY;
        return /auto|scroll|overlay|hidden/.test(n + i + r)
    }

    function U(e, t, n) {
        void 0 === n && (n = !1);
        var r, i, o = M(t),
            a = R(e),
            s = {
                scrollLeft: 0,
                scrollTop: 0
            },
            l = {
                x: 0,
                y: 0
            };
        return n || (("body" !== x(t) || j(o)) && (s = (r = t) !== F(r) && D(r) ? {
            scrollLeft: (i = r).scrollLeft,
            scrollTop: i.scrollTop
        } : P(r)), D(t) ? ((l = R(t)).x += t.clientLeft, l.y += t.clientTop) : o && (l.x = B(o))), {
            x: a.left + s.scrollLeft - l.x,
            y: a.top + s.scrollTop - l.y,
            width: a.width,
            height: a.height
        }
    }

    function Y(e) {
        return {
            x: e.offsetLeft,
            y: e.offsetTop,
            width: e.offsetWidth,
            height: e.offsetHeight
        }
    }

    function W(e) {
        return "html" === x(e) ? e : e.assignedSlot || e.parentNode || e.host || M(e)
    }

    function V(e, t) {
        void 0 === t && (t = []);
        var n = function e(t) {
                return ["html", "body", "#document"].indexOf(x(t)) >= 0 ? t.ownerDocument.body : D(t) && j(t) ? t : e(W(t))
            }(e),
            r = "body" === x(n),
            i = F(n),
            o = r ? [i].concat(i.visualViewport || [], j(n) ? n : []) : n,
            a = t.concat(o);
        return r ? a : a.concat(V(W(o)))
    }

    function G(e) {
        return ["table", "td", "th"].indexOf(x(e)) >= 0
    }

    function K(e) {
        return D(e) && "fixed" !== H(e).position ? e.offsetParent : null
    }

    function q(e) {
        for (var t = F(e), n = K(e); n && G(n);) n = K(n);
        return n && "body" === x(n) && "static" === H(n).position ? t : n || t
    }
    var z = "top",
        $ = "bottom",
        X = "right",
        Z = "left",
        Q = "auto",
        J = [z, $, X, Z],
        ee = "start",
        te = "end",
        ne = "clippingParents",
        re = "viewport",
        ie = "popper",
        oe = "reference",
        ae = J.reduce(function(e, t) {
            return e.concat([t + "-" + ee, t + "-" + te])
        }, []),
        se = [].concat(J, [Q]).reduce(function(e, t) {
            return e.concat([t, t + "-" + ee, t + "-" + te])
        }, []),
        le = ["beforeRead", "read", "afterRead", "beforeMain", "main", "afterMain", "beforeWrite", "write", "afterWrite"];

    function ce(e) {
        var t = new Map,
            n = new Set,
            r = [];
        return e.forEach(function(e) {
            t.set(e.name, e)
        }), e.forEach(function(e) {
            n.has(e.name) || function e(i) {
                n.add(i.name), [].concat(i.requires || [], i.requiresIfExists || []).forEach(function(r) {
                    if (!n.has(r)) {
                        var i = t.get(r);
                        i && e(i)
                    }
                }), r.push(i)
            }(e)
        }), r
    }
    var ue = {
        placement: "bottom",
        modifiers: [],
        strategy: "absolute"
    };

    function de() {
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
        return !t.some(function(e) {
            return !(e && "function" == typeof e.getBoundingClientRect)
        })
    }

    function fe(e) {
        void 0 === e && (e = {});
        var t = e,
            n = t.defaultModifiers,
            r = void 0 === n ? [] : n,
            i = t.defaultOptions,
            o = void 0 === i ? ue : i;
        return function(e, t, n) {
            void 0 === n && (n = o);
            var i, a, s = {
                    placement: "bottom",
                    orderedModifiers: [],
                    options: Object.assign({}, ue, {}, o),
                    modifiersData: {},
                    elements: {
                        reference: e,
                        popper: t
                    },
                    attributes: {},
                    styles: {}
                },
                l = [],
                c = !1,
                u = {
                    state: s,
                    setOptions: function(n) {
                        d(), s.options = Object.assign({}, o, {}, s.options, {}, n), s.scrollParents = {
                            reference: k(e) ? V(e) : e.contextElement ? V(e.contextElement) : [],
                            popper: V(t)
                        };
                        var i = function(e) {
                            var t = ce(e);
                            return le.reduce(function(e, n) {
                                return e.concat(t.filter(function(e) {
                                    return e.phase === n
                                }))
                            }, [])
                        }(function(e) {
                            var t = e.reduce(function(e, t) {
                                var n = e[t.name];
                                return e[t.name] = n ? Object.assign({}, n, {}, t, {
                                    options: Object.assign({}, n.options, {}, t.options),
                                    data: Object.assign({}, n.data, {}, t.data)
                                }) : t, e
                            }, {});
                            return Object.keys(t).map(function(e) {
                                return t[e]
                            })
                        }([].concat(r, s.options.modifiers)));
                        return s.orderedModifiers = i.filter(function(e) {
                            return e.enabled
                        }), s.orderedModifiers.forEach(function(e) {
                            var t = e.name,
                                n = e.options,
                                r = void 0 === n ? {} : n,
                                i = e.effect;
                            if ("function" == typeof i) {
                                var o = i({
                                    state: s,
                                    name: t,
                                    instance: u,
                                    options: r
                                });
                                l.push(o || function() {})
                            }
                        }), u.update()
                    },
                    forceUpdate: function() {
                        if (!c) {
                            var e = s.elements,
                                t = e.reference,
                                n = e.popper;
                            if (de(t, n)) {
                                s.rects = {
                                    reference: U(t, q(n), "fixed" === s.options.strategy),
                                    popper: Y(n)
                                }, s.reset = !1, s.placement = s.options.placement, s.orderedModifiers.forEach(function(e) {
                                    return s.modifiersData[e.name] = Object.assign({}, e.data)
                                });
                                for (var r = 0; r < s.orderedModifiers.length; r++)
                                    if (!0 !== s.reset) {
                                        var i = s.orderedModifiers[r],
                                            o = i.fn,
                                            a = i.options,
                                            l = void 0 === a ? {} : a,
                                            d = i.name;
                                        "function" == typeof o && (s = o({
                                            state: s,
                                            options: l,
                                            name: d,
                                            instance: u
                                        }) || s)
                                    } else s.reset = !1, r = -1
                            }
                        }
                    },
                    update: (i = function() {
                        return new Promise(function(e) {
                            u.forceUpdate(), e(s)
                        })
                    }, function() {
                        return a || (a = new Promise(function(e) {
                            Promise.resolve().then(function() {
                                a = void 0, e(i())
                            })
                        })), a
                    }),
                    destroy: function() {
                        d(), c = !0
                    }
                };
            if (!de(e, t)) return u;

            function d() {
                l.forEach(function(e) {
                    return e()
                }), l = []
            }
            return u.setOptions(n).then(function(e) {
                !c && n.onFirstUpdate && n.onFirstUpdate(e)
            }), u
        }
    }
    var pe = {
        passive: !0
    };

    function he(e) {
        return e.split("-")[0]
    }

    function me(e) {
        return e.split("-")[1]
    }

    function ge(e) {
        return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y"
    }

    function ve(e) {
        var t, n = e.reference,
            r = e.element,
            i = e.placement,
            o = i ? he(i) : null,
            a = i ? me(i) : null,
            s = n.x + n.width / 2 - r.width / 2,
            l = n.y + n.height / 2 - r.height / 2;
        switch (o) {
            case z:
                t = {
                    x: s,
                    y: n.y - r.height
                };
                break;
            case $:
                t = {
                    x: s,
                    y: n.y + n.height
                };
                break;
            case X:
                t = {
                    x: n.x + n.width,
                    y: l
                };
                break;
            case Z:
                t = {
                    x: n.x - r.width,
                    y: l
                };
                break;
            default:
                t = {
                    x: n.x,
                    y: n.y
                }
        }
        var c = o ? ge(o) : null;
        if (null != c) {
            var u = "y" === c ? "height" : "width";
            switch (a) {
                case ee:
                    t[c] = Math.floor(t[c]) - Math.floor(n[u] / 2 - r[u] / 2);
                    break;
                case te:
                    t[c] = Math.floor(t[c]) + Math.ceil(n[u] / 2 - r[u] / 2)
            }
        }
        return t
    }
    var Ee = {
        top: "auto",
        right: "auto",
        bottom: "auto",
        left: "auto"
    };

    function ye(e) {
        var t, n = e.popper,
            r = e.popperRect,
            i = e.placement,
            o = e.offsets,
            a = e.position,
            s = e.gpuAcceleration,
            l = e.adaptive,
            c = function(e) {
                var t = e.x,
                    n = e.y,
                    r = window.devicePixelRatio || 1;
                return {
                    x: Math.round(t * r) / r || 0,
                    y: Math.round(n * r) / r || 0
                }
            }(o),
            u = c.x,
            d = c.y,
            f = o.hasOwnProperty("x"),
            p = o.hasOwnProperty("y"),
            h = Z,
            m = z,
            g = window;
        if (l) {
            var v = q(n);
            v === F(n) && (v = M(n)), i === z && (m = $, d -= v.clientHeight - r.height, d *= s ? 1 : -1), i === Z && (h = X, u -= v.clientWidth - r.width, u *= s ? 1 : -1)
        }
        var E, y = Object.assign({
            position: a
        }, l && Ee);
        return s ? Object.assign({}, y, ((E = {})[m] = p ? "0" : "", E[h] = f ? "0" : "", E.transform = (g.devicePixelRatio || 1) < 2 ? "translate(" + u + "px, " + d + "px)" : "translate3d(" + u + "px, " + d + "px, 0)", E)) : Object.assign({}, y, ((t = {})[m] = p ? d + "px" : "", t[h] = f ? u + "px" : "", t.transform = "", t))
    }
    var Ie = {
        left: "right",
        right: "left",
        bottom: "top",
        top: "bottom"
    };

    function _e(e) {
        return e.replace(/left|right|bottom|top/g, function(e) {
            return Ie[e]
        })
    }
    var Ae = {
        start: "end",
        end: "start"
    };

    function Te(e) {
        return e.replace(/start|end/g, function(e) {
            return Ae[e]
        })
    }

    function be(e) {
        return parseFloat(e) || 0
    }

    function Oe(e) {
        var t = F(e),
            n = function(e) {
                var t = D(e) ? H(e) : {};
                return {
                    top: be(t.borderTopWidth),
                    right: be(t.borderRightWidth),
                    bottom: be(t.borderBottomWidth),
                    left: be(t.borderLeftWidth)
                }
            }(e),
            r = "html" === x(e),
            i = B(e),
            o = e.clientWidth + n.right,
            a = e.clientHeight + n.bottom;
        return r && t.innerHeight - e.clientHeight > 50 && (a = t.innerHeight - n.bottom), {
            top: r ? 0 : e.clientTop,
            right: e.clientLeft > n.left ? n.right : r ? t.innerWidth - o - i : e.offsetWidth - o,
            bottom: r ? t.innerHeight - a : e.offsetHeight - a,
            left: r ? i : e.clientLeft
        }
    }

    function Ce(e, t) {
        var n = Boolean(t.getRootNode && t.getRootNode().host);
        if (e.contains(t)) return !0;
        if (n) {
            var r = t;
            do {
                if (r && e.isSameNode(r)) return !0;
                r = r.parentNode || r.host
            } while (r)
        }
        return !1
    }

    function Le(e) {
        return Object.assign({}, e, {
            left: e.x,
            top: e.y,
            right: e.x + e.width,
            bottom: e.y + e.height
        })
    }

    function Se(e, t) {
        return t === re ? Le(function(e) {
            var t = F(e),
                n = t.visualViewport,
                r = t.innerWidth,
                i = t.innerHeight;
            return n && /iPhone|iPod|iPad/.test(navigator.platform) && (r = n.width, i = n.height), {
                width: r,
                height: i,
                x: 0,
                y: 0
            }
        }(e)) : D(t) ? R(t) : Le(function(e) {
            var t = F(e),
                n = P(e),
                r = U(M(e), t);
            return r.height = Math.max(r.height, t.innerHeight), r.width = Math.max(r.width, t.innerWidth), r.x = -n.scrollLeft, r.y = -n.scrollTop, r
        }(M(e)))
    }

    function we(e, t, n) {
        var r = "clippingParents" === t ? function(e) {
                var t = V(e),
                    n = ["absolute", "fixed"].indexOf(H(e).position) >= 0 && D(e) ? q(e) : e;
                return k(n) ? t.filter(function(e) {
                    return k(e) && Ce(e, n)
                }) : []
            }(e) : [].concat(t),
            i = [].concat(r, [n]),
            o = i[0],
            a = i.reduce(function(t, n) {
                var r = Se(e, n),
                    i = Oe(D(n) ? n : M(e));
                return t.top = Math.max(r.top + i.top, t.top), t.right = Math.min(r.right - i.right, t.right), t.bottom = Math.min(r.bottom - i.bottom, t.bottom), t.left = Math.max(r.left + i.left, t.left), t
            }, Se(e, o));
        return a.width = a.right - a.left, a.height = a.bottom - a.top, a.x = a.left, a.y = a.top, a
    }

    function Ne(e) {
        return Object.assign({}, {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }, {}, e)
    }

    function Re(e, t) {
        return t.reduce(function(t, n) {
            return t[n] = e, t
        }, {})
    }

    function Fe(e, t) {
        void 0 === t && (t = {});
        var n = t,
            r = n.placement,
            i = void 0 === r ? e.placement : r,
            o = n.boundary,
            a = void 0 === o ? ne : o,
            s = n.rootBoundary,
            l = void 0 === s ? re : s,
            c = n.elementContext,
            u = void 0 === c ? ie : c,
            d = n.altBoundary,
            f = void 0 !== d && d,
            p = n.padding,
            h = void 0 === p ? 0 : p,
            m = Ne("number" != typeof h ? h : Re(h, J)),
            g = u === ie ? oe : ie,
            v = e.elements.reference,
            E = e.rects.popper,
            y = e.elements[f ? g : u],
            I = we(k(y) ? y : y.contextElement || M(e.elements.popper), a, l),
            _ = R(v),
            A = ve({
                reference: _,
                element: E,
                strategy: "absolute",
                placement: i
            }),
            T = Le(Object.assign({}, E, {}, A)),
            b = u === ie ? T : _,
            O = {
                top: I.top - b.top + m.top,
                bottom: b.bottom - I.bottom + m.bottom,
                left: I.left - b.left + m.left,
                right: b.right - I.right + m.right
            },
            C = e.modifiersData.offset;
        if (u === ie && C) {
            var L = C[i];
            Object.keys(O).forEach(function(e) {
                var t = [X, $].indexOf(e) >= 0 ? 1 : -1,
                    n = [z, $].indexOf(e) >= 0 ? "y" : "x";
                O[e] += L[n] * t
            })
        }
        return O
    }

    function Pe(e, t, n) {
        return Math.max(e, Math.min(t, n))
    }

    function ke(e, t, n) {
        return void 0 === n && (n = {
            x: 0,
            y: 0
        }), {
            top: e.top - t.height - n.y,
            right: e.right - t.width + n.x,
            bottom: e.bottom - t.height + n.y,
            left: e.left - t.width - n.x
        }
    }

    function De(e) {
        return [z, X, $, Z].some(function(t) {
            return e[t] >= 0
        })
    }
    var xe = fe({
            defaultModifiers: [{
                name: "eventListeners",
                enabled: !0,
                phase: "write",
                fn: function() {},
                effect: function(e) {
                    var t = e.state,
                        n = e.instance,
                        r = e.options,
                        i = r.scroll,
                        o = void 0 === i || i,
                        a = r.resize,
                        s = void 0 === a || a,
                        l = F(t.elements.popper),
                        c = [].concat(t.scrollParents.reference, t.scrollParents.popper);
                    return o && c.forEach(function(e) {
                            e.addEventListener("scroll", n.update, pe)
                        }), s && l.addEventListener("resize", n.update, pe),
                        function() {
                            o && c.forEach(function(e) {
                                e.removeEventListener("scroll", n.update, pe)
                            }), s && l.removeEventListener("resize", n.update, pe)
                        }
                },
                data: {}
            }, {
                name: "popperOffsets",
                enabled: !0,
                phase: "read",
                fn: function(e) {
                    var t = e.state,
                        n = e.name;
                    t.modifiersData[n] = ve({
                        reference: t.rects.reference,
                        element: t.rects.popper,
                        strategy: "absolute",
                        placement: t.placement
                    })
                },
                data: {}
            }, {
                name: "computeStyles",
                enabled: !0,
                phase: "beforeWrite",
                fn: function(e) {
                    var t = e.state,
                        n = e.options,
                        r = n.gpuAcceleration,
                        i = void 0 === r || r,
                        o = n.adaptive,
                        a = void 0 === o || o,
                        s = {
                            placement: he(t.placement),
                            popper: t.elements.popper,
                            popperRect: t.rects.popper,
                            gpuAcceleration: i
                        };
                    null != t.modifiersData.popperOffsets && (t.styles.popper = Object.assign({}, t.styles.popper, {}, ye(Object.assign({}, s, {
                        offsets: t.modifiersData.popperOffsets,
                        position: t.options.strategy,
                        adaptive: a
                    })))), null != t.modifiersData.arrow && (t.styles.arrow = Object.assign({}, t.styles.arrow, {}, ye(Object.assign({}, s, {
                        offsets: t.modifiersData.arrow,
                        position: "absolute",
                        adaptive: !1
                    })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
                        "data-popper-placement": t.placement
                    })
                },
                data: {}
            }, {
                name: "applyStyles",
                enabled: !0,
                phase: "write",
                fn: function(e) {
                    var t = e.state;
                    Object.keys(t.elements).forEach(function(e) {
                        var n = t.styles[e] || {},
                            r = t.attributes[e] || {},
                            i = t.elements[e];
                        D(i) && x(i) && (Object.assign(i.style, n), Object.keys(r).forEach(function(e) {
                            var t = r[e];
                            !1 === t ? i.removeAttribute(e) : i.setAttribute(e, !0 === t ? "" : t)
                        }))
                    })
                },
                effect: function(e) {
                    var t = e.state,
                        n = {
                            popper: {
                                position: t.options.strategy,
                                left: "0",
                                top: "0",
                                margin: "0"
                            },
                            arrow: {
                                position: "absolute"
                            },
                            reference: {}
                        };
                    return Object.assign(t.elements.popper.style, n.popper), t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow),
                        function() {
                            Object.keys(t.elements).forEach(function(e) {
                                var r = t.elements[e],
                                    i = t.attributes[e] || {},
                                    o = Object.keys(t.styles.hasOwnProperty(e) ? t.styles[e] : n[e]).reduce(function(e, t) {
                                        return e[t] = "", e
                                    }, {});
                                D(r) && x(r) && (Object.assign(r.style, o), Object.keys(i).forEach(function(e) {
                                    r.removeAttribute(e)
                                }))
                            })
                        }
                },
                requires: ["computeStyles"]
            }, {
                name: "offset",
                enabled: !0,
                phase: "main",
                requires: ["popperOffsets"],
                fn: function(e) {
                    var t = e.state,
                        n = e.options,
                        r = e.name,
                        i = n.offset,
                        o = void 0 === i ? [0, 0] : i,
                        a = se.reduce(function(e, n) {
                            return e[n] = function(e, t, n) {
                                var r = he(e),
                                    i = [Z, z].indexOf(r) >= 0 ? -1 : 1,
                                    o = "function" == typeof n ? n(Object.assign({}, t, {
                                        placement: e
                                    })) : n,
                                    a = o[0],
                                    s = o[1];
                                return a = a || 0, s = (s || 0) * i, [Z, X].indexOf(r) >= 0 ? {
                                    x: s,
                                    y: a
                                } : {
                                    x: a,
                                    y: s
                                }
                            }(n, t.rects, o), e
                        }, {}),
                        s = a[t.placement],
                        l = s.x,
                        c = s.y;
                    null != t.modifiersData.popperOffsets && (t.modifiersData.popperOffsets.x += l, t.modifiersData.popperOffsets.y += c), t.modifiersData[r] = a
                }
            }, {
                name: "flip",
                enabled: !0,
                phase: "main",
                fn: function(e) {
                    var t = e.state,
                        n = e.options,
                        r = e.name;
                    if (!t.modifiersData[r]._skip) {
                        for (var i = n.mainAxis, o = void 0 === i || i, a = n.altAxis, s = void 0 === a || a, l = n.fallbackPlacements, c = n.padding, u = n.boundary, d = n.rootBoundary, f = n.altBoundary, p = n.flipVariations, h = void 0 === p || p, m = n.allowedAutoPlacements, g = t.options.placement, v = he(g), E = l || (v === g || !h ? [_e(g)] : function(e) {
                                if (he(e) === Q) return [];
                                var t = _e(e);
                                return [Te(e), t, Te(t)]
                            }(g)), y = [g].concat(E).reduce(function(e, n) {
                                return e.concat(he(n) === Q ? function(e, t) {
                                    void 0 === t && (t = {});
                                    var n = t,
                                        r = n.placement,
                                        i = n.boundary,
                                        o = n.rootBoundary,
                                        a = n.padding,
                                        s = n.flipVariations,
                                        l = n.allowedAutoPlacements,
                                        c = void 0 === l ? se : l,
                                        u = me(r),
                                        d = (u ? s ? ae : ae.filter(function(e) {
                                            return me(e) === u
                                        }) : J).filter(function(e) {
                                            return c.indexOf(e) >= 0
                                        }).reduce(function(t, n) {
                                            return t[n] = Fe(e, {
                                                placement: n,
                                                boundary: i,
                                                rootBoundary: o,
                                                padding: a
                                            })[he(n)], t
                                        }, {});
                                    return Object.keys(d).sort(function(e, t) {
                                        return d[e] - d[t]
                                    })
                                }(t, {
                                    placement: n,
                                    boundary: u,
                                    rootBoundary: d,
                                    padding: c,
                                    flipVariations: h,
                                    allowedAutoPlacements: m
                                }) : n)
                            }, []), I = t.rects.reference, _ = t.rects.popper, A = new Map, T = !0, b = y[0], O = 0; O < y.length; O++) {
                            var C = y[O],
                                L = he(C),
                                S = me(C) === ee,
                                w = [z, $].indexOf(L) >= 0,
                                N = w ? "width" : "height",
                                R = Fe(t, {
                                    placement: C,
                                    boundary: u,
                                    rootBoundary: d,
                                    altBoundary: f,
                                    padding: c
                                }),
                                F = w ? S ? X : Z : S ? $ : z;
                            I[N] > _[N] && (F = _e(F));
                            var P = _e(F),
                                k = [];
                            if (o && k.push(R[L] <= 0), s && k.push(R[F] <= 0, R[P] <= 0), k.every(function(e) {
                                    return e
                                })) {
                                b = C, T = !1;
                                break
                            }
                            A.set(C, k)
                        }
                        if (T)
                            for (var D = function(e) {
                                    var t = y.find(function(t) {
                                        var n = A.get(t);
                                        if (n) return n.slice(0, e).every(function(e) {
                                            return e
                                        })
                                    });
                                    if (t) return b = t, "break"
                                }, x = h ? 3 : 1; x > 0; x--) {
                                if ("break" === D(x)) break
                            }
                        t.placement !== b && (t.modifiersData[r]._skip = !0, t.placement = b, t.reset = !0)
                    }
                },
                requiresIfExists: ["offset"],
                data: {
                    _skip: !1
                }
            }, {
                name: "preventOverflow",
                enabled: !0,
                phase: "main",
                fn: function(e) {
                    var t = e.state,
                        n = e.options,
                        r = e.name,
                        i = n.mainAxis,
                        o = void 0 === i || i,
                        a = n.altAxis,
                        s = void 0 !== a && a,
                        l = n.boundary,
                        c = n.rootBoundary,
                        u = n.altBoundary,
                        d = n.padding,
                        f = n.tether,
                        p = void 0 === f || f,
                        h = n.tetherOffset,
                        m = void 0 === h ? 0 : h,
                        g = Fe(t, {
                            boundary: l,
                            rootBoundary: c,
                            padding: d,
                            altBoundary: u
                        }),
                        v = he(t.placement),
                        E = me(t.placement),
                        y = !E,
                        I = ge(v),
                        _ = "x" === I ? "y" : "x",
                        A = t.modifiersData.popperOffsets,
                        T = t.rects.reference,
                        b = t.rects.popper,
                        O = "function" == typeof m ? m(Object.assign({}, t.rects, {
                            placement: t.placement
                        })) : m,
                        C = {
                            x: 0,
                            y: 0
                        };
                    if (A) {
                        if (o) {
                            var L = "y" === I ? z : Z,
                                S = "y" === I ? $ : X,
                                w = "y" === I ? "height" : "width",
                                N = A[I],
                                R = A[I] + g[L],
                                F = A[I] - g[S],
                                P = p ? -b[w] / 2 : 0,
                                k = E === ee ? T[w] : b[w],
                                D = E === ee ? -b[w] : -T[w],
                                x = t.elements.arrow,
                                M = p && x ? Y(x) : {
                                    width: 0,
                                    height: 0
                                },
                                B = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : {
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0
                                },
                                H = B[L],
                                j = B[S],
                                U = Pe(0, T[w], M[w]),
                                W = y ? T[w] / 2 - P - U - H - O : k - U - H - O,
                                V = y ? -T[w] / 2 + P + U + j + O : D + U + j + O,
                                G = t.elements.arrow && q(t.elements.arrow),
                                K = G ? "y" === I ? G.clientTop || 0 : G.clientLeft || 0 : 0,
                                Q = t.modifiersData.offset ? t.modifiersData.offset[t.placement][I] : 0,
                                J = A[I] + W - Q - K,
                                te = A[I] + V - Q,
                                ne = Pe(p ? Math.min(R, J) : R, N, p ? Math.max(F, te) : F);
                            A[I] = ne, C[I] = ne - N
                        }
                        if (s) {
                            var re = "x" === I ? z : Z,
                                ie = "x" === I ? $ : X,
                                oe = A[_],
                                ae = Pe(oe + g[re], oe, oe - g[ie]);
                            A[_] = ae, C[_] = ae - oe
                        }
                        t.modifiersData[r] = C
                    }
                },
                requiresIfExists: ["offset"]
            }, {
                name: "arrow",
                enabled: !0,
                phase: "main",
                fn: function(e) {
                    var t, n = e.state,
                        r = e.name,
                        i = n.elements.arrow,
                        o = n.modifiersData.popperOffsets,
                        a = he(n.placement),
                        s = ge(a),
                        l = [Z, X].indexOf(a) >= 0 ? "height" : "width";
                    if (i && o) {
                        var c = n.modifiersData[r + "#persistent"].padding,
                            u = Y(i),
                            d = "y" === s ? z : Z,
                            f = "y" === s ? $ : X,
                            p = n.rects.reference[l] + n.rects.reference[s] - o[s] - n.rects.popper[l],
                            h = o[s] - n.rects.reference[s],
                            m = q(i),
                            g = m ? "y" === s ? m.clientHeight || 0 : m.clientWidth || 0 : 0,
                            v = p / 2 - h / 2,
                            E = c[d],
                            y = g - u[l] - c[f],
                            I = g / 2 - u[l] / 2 + v,
                            _ = Pe(E, I, y),
                            A = s;
                        n.modifiersData[r] = ((t = {})[A] = _, t.centerOffset = _ - I, t)
                    }
                },
                effect: function(e) {
                    var t = e.state,
                        n = e.options,
                        r = e.name,
                        i = n.element,
                        o = void 0 === i ? "[data-popper-arrow]" : i,
                        a = n.padding,
                        s = void 0 === a ? 0 : a;
                    null != o && ("string" != typeof o || (o = t.elements.popper.querySelector(o))) && Ce(t.elements.popper, o) && (t.elements.arrow = o, t.modifiersData[r + "#persistent"] = {
                        padding: Ne("number" != typeof s ? s : Re(s, J))
                    })
                },
                requires: ["popperOffsets"],
                requiresIfExists: ["preventOverflow"]
            }, {
                name: "hide",
                enabled: !0,
                phase: "main",
                requiresIfExists: ["preventOverflow"],
                fn: function(e) {
                    var t = e.state,
                        n = e.name,
                        r = t.rects.reference,
                        i = t.rects.popper,
                        o = t.modifiersData.preventOverflow,
                        a = Fe(t, {
                            elementContext: "reference"
                        }),
                        s = Fe(t, {
                            altBoundary: !0
                        }),
                        l = ke(a, r),
                        c = ke(s, i, o),
                        u = De(l),
                        d = De(c);
                    t.modifiersData[n] = {
                        referenceClippingOffsets: l,
                        popperEscapeOffsets: c,
                        isReferenceHidden: u,
                        hasPopperEscaped: d
                    }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
                        "data-popper-reference-hidden": u,
                        "data-popper-escaped": d
                    })
                }
            }]
        }),
        Me = n(14),
        Be = {
            type: "preview-html"
        },
        He = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.template = n(70), t
            }
            return Object(l.c)(t, e), t
        }(d),
        je = n(71);
    n(72);
    var Ue = function() {
        function e(e, t, n, r, o) {
            var a = void 0 === n ? {} : n,
                s = a.contentContainer,
                l = void 0 === s ? document.body : s,
                c = a.indicatorContainer,
                u = a.scrollContainer,
                d = void 0 === u ? l.ownerDocument.defaultView : u;
            void 0 === o && (o = 0), this.baseUrl = e, this.i18n = t, this.beforeSelection = r, this.scrollOffset = o, this.elements = [], this.highlights = [], this.preprocess = [], this.visibility = !0, this.elementSupplier = function() {
                return []
            }, this.contentContainer = l, this.indicatorContainer = i.c(c) ? c : l, this.scrollContainer = d, this.tooltipContainer = "document" in d ? d.document.body : d, this.document = l.ownerDocument
        }
        return e.cleanContainer = function(e) {
            var t = this,
                n = r(e),
                i = Object.values(this.customElementClassNames).map(function(e) {
                    return "." + e
                }).join(","),
                o = Object.values(this.customAttributes);
            n.find(i).remove(), n.find(o.map(function(e) {
                return "[" + e + "]"
            }).join(",")).each(function(e, n) {
                return t.cleanElement(n)
            })
        }, e.cleanElement = function(e) {
            for (var t = 0, n = Object.values(this.customAttributes); t < n.length; t++) {
                var r = n[t];
                e.removeAttribute(r)
            }
        }, e.prototype.start = function(e) {
            var t = this,
                n = void 0 === e ? {} : e,
                o = n.thisWindow,
                a = void 0 === o ? window : o,
                s = n.parentWindow,
                c = void 0 === s ? window.parent : s,
                u = n.preprocessInterval,
                d = void 0 === u ? 500 : u,
                f = n.highlightInterval,
                p = void 0 !== f && f,
                h = {
                    href: this.baseUrl + "/" + je,
                    id: "ally-preview-styles",
                    rel: "stylesheet"
                },
                m = r("<link />", h);
            r("head", this.document).append(m), this.connector = new Me.ProtoframePubsub(Be, c, a, "*"), this.connector.handleTell("init", function(e) {
                t.unHighlightAll(), t.unPreprocessAll(), i.c(t.beforeSelection) && t.beforeSelection().catch(function(e) {
                    return console.error(e)
                }), t.elementSupplier = function() {
                    return i.c(e.locator) ? t.locateElements(e.locator).sort(function(e, t) {
                        return e.element.getBoundingClientRect().top - t.element.getBoundingClientRect().top
                    }) : []
                }, t.elements = t.elementSupplier(), t.preprocessAll(d, p), t.visibility && t.highlightAll()
            }), this.connector.handleAsk("select", function(e) {
                return Object(l.b)(t, void 0, void 0, function() {
                    var t, n, r = e.index;
                    Object(l.e)(e, ["index"]);
                    return Object(l.d)(this, function(e) {
                        switch (e.label) {
                            case 0:
                                return t = !0, r >= 0 ? this.currentSelectionIndex = r : void 0 === this.currentSelectionIndex ? this.currentSelectionIndex = 0 : t = !1, this.visibility ? [4, this.select({
                                    scrollIntoView: t
                                })] : [3, 2];
                            case 1:
                                e.sent(), e.label = 2;
                            case 2:
                                return n = Object(l.a)({}, this.elements[this.currentSelectionIndex]), n.element, [2, {
                                    locator: Object(l.e)(n, ["element"])
                                }]
                        }
                    })
                })
            }), this.connector.handleTell("setVisibility", function(e) {
                var n = e.visibility;
                return Object(l.b)(t, void 0, void 0, function() {
                    return Object(l.d)(this, function(e) {
                        switch (e.label) {
                            case 0:
                                return this.visibility === n ? [3, 3] : (this.visibility = n, n ? (this.highlightAll(), [4, this.select()]) : [3, 2]);
                            case 1:
                                return e.sent(), [3, 3];
                            case 2:
                                this.unHighlightAll(), e.label = 3;
                            case 3:
                                return [2]
                        }
                    })
                })
            })
        }, e.prototype.resetSelection = function() {
            this.deselect(), this.currentSelectionIndex = void 0
        }, e.prototype.destroy = function() {
            r("#ally-preview-styles", this.document).remove(), this.deselect(), this.unHighlightAll(), this.unPreprocessAll(), i.c(this.connector) && this.connector.destroy()
        }, e.prototype.hasProtocol = function(e) {
            return e.includes("https://") || e.includes("http://")
        }, e.prototype.locateElements = function(e) {
            var t = this;
            return "xpaths" in e ? e.xpaths.map(function(e) {
                return {
                    element: t.evaluateXpath(e),
                    xpath: e
                }
            }).filter(function(e) {
                var t = e.element;
                return i.c(t)
            }) : e.links.map(function(e) {
                var n = t.hasProtocol(e) ? t.getUrlKey(e) : t.getUrlKey("http://" + e),
                    i = r("a", t.contentContainer).toArray().filter(function(e) {
                        try {
                            return n === t.getUrlKey(e.href)
                        } catch (e) {
                            return !1
                        }
                    }),
                    o = i.filter(function(e) {
                        return r(e).is(":visible")
                    });
                return {
                    element: (o.length > 0 ? o : i).reverse()[0],
                    link: e
                }
            }).filter(function(e) {
                var t = e.element;
                return i.c(t)
            })
        }, e.prototype.getUrlKey = function(e) {
            var t = new URL(e);
            return (t.hostname.toLowerCase() + ":" + (t.pathname.endsWith("/") ? t.pathname.toLowerCase().slice(0, -1) : t.pathname.toLowerCase()) + ":" + t.search.toLowerCase()).replace(" ", "%20")
        }, e.prototype.isCanvasVideo = function(e) {
            var t = i.d(e.element.getAttribute("src"), "");
            return t.includes("media_objects_iframe") && t.includes("type=video")
        }, e.prototype.highlightElement = function(t) {
            var n, r = t.element.tagName.toLowerCase(),
                o = e.customAttributes.highlight,
                a = t.element;
            return "table" === r ? o = e.customAttributes["outline-outset"] : "tr" === r || "td" === r || "th" === r ? o = e.customAttributes["outline-inset"] : "iframe" === r && this.isCanvasVideo(t) && (o = e.customAttributes.shadow, a = i.d(t.element.parentElement, t.element)), [a, this.applyReversibleUpdate(a, {
                attributes: (n = {}, n[o] = "", n)
            })]
        }, e.prototype.highlightAll = function() {
            var e = this;
            this.highlights = this.elements.map(function(t) {
                return e.highlightElement(t)
            })
        }, e.prototype.preprocessAll = function(e, t) {
            var n = this;
            !1 !== e && (this.preprocessAll0(), this.preprocessTimer = setInterval(function() {
                return n.preprocessAll0()
            }, e)), !1 !== t && (this.highlightTimer = setInterval(function() {
                return n.refreshHighlight()
            }, t))
        }, e.prototype.preprocessAll0 = function() {
            var e, t = this,
                n = r("*:tabbable", this.document).toArray().map(function(e) {
                    return [e, t.applyReversibleUpdate(e, {
                        attributes: {
                            tabindex: "-1"
                        }
                    })]
                });
            (e = this.preprocess).push.apply(e, n)
        }, e.prototype.unPreprocessAll = function() {
            var e = this;
            clearTimeout(this.preprocessTimer), clearTimeout(this.highlightTimer), this.preprocess.forEach(function(t) {
                var n = t[0],
                    r = t[1];
                e.applyReversibleUpdate(n, r)
            }), this.preprocess = []
        }, e.prototype.unHighlightAll = function() {
            var t = this;
            this.deselect(), this.highlights.forEach(function(e) {
                var n = e[0],
                    r = e[1];
                t.applyReversibleUpdate(n, r)
            }), this.highlights = [], e.cleanContainer(this.contentContainer)
        }, e.prototype.deselect = function() {
            i.c(this.currentTooltip) && (this.currentTooltip.remove(), this.currentTooltip = void 0), i.c(this.popper) && (this.popper.destroy(), this.popper = void 0), this.elements.forEach(function(t) {
                return t.element.removeAttribute(e.customAttributes.selected)
            })
        }, e.prototype.select = function(e) {
            var t = (void 0 === e ? {} : e).scrollIntoView,
                n = void 0 === t || t;
            return Object(l.b)(this, void 0, Promise, function() {
                var e, t, r, o, a, s, c = this;
                return Object(l.d)(this, function(l) {
                    switch (l.label) {
                        case 0:
                            return 0 === this.elements.length || void 0 === this.currentSelectionIndex ? [2, void 0] : (e = this.elements[this.currentSelectionIndex], i.c(this.beforeSelection) ? [4, this.beforeSelection(e.element)] : [3, 2]);
                        case 1:
                            l.sent(), l.label = 2;
                        case 2:
                            return this.selectElement(e, this.currentSelectionIndex), n && this.currentTooltip && (t = this.currentTooltip[0], r = "document" in this.scrollContainer ? this.scrollContainer.scrollY : this.scrollContainer.scrollTop, o = e.element.getBoundingClientRect().top, a = Math.round(r + o), s = Math.max(a - this.scrollOffset - 1.5 * t.getBoundingClientRect().height, 0), setTimeout(function() {
                                c.scrollContainer.scrollTo({
                                    behavior: "smooth",
                                    top: s
                                })
                            })), [2, e]
                    }
                })
            })
        }, e.prototype.selectElement = function(t, n) {
            this.deselect(), t.element.setAttribute(e.customAttributes.selected, "");
            var i = (new He).apply({
                ALLY_DOMAIN: this.baseUrl,
                className: e.customElementClassNames.selectionContainer,
                content: this.i18n.X_OF_Y.replace("{0}", (n + 1).toString()).replace("{1}", this.elements.length.toString()),
                i18n: this.i18n
            }).css({
                "scroll-margin": "50px"
            });
            r(this.indicatorContainer).append(i);
            var o = this.isCanvasVideo(t) ? 6 : 0;
            this.popper = xe(t.element, i[0], {
                modifiers: [{
                    name: "flip",
                    options: {
                        boundary: this.tooltipContainer,
                        fallbackPlacements: ["right", "left", "bottom"],
                        rootBoundary: "document"
                    }
                }, {
                    name: "computeStyles",
                    options: {
                        adaptive: !1
                    }
                }, {
                    name: "offset",
                    options: {
                        offset: function(e) {
                            var t = e.placement,
                                n = e.popper,
                                r = e.reference;
                            return t.startsWith("bottom") || t.startsWith("top") ? [n.width / 2 - r.width / 2 - o, o] : [n.height / 2 - r.height / 2, 0]
                        }
                    }
                }],
                placement: "top"
            }), this.currentTooltip = i
        }, e.prototype.refreshHighlight = function() {
            if (0 !== this.highlights.length) {
                for (var t, n = 0; n < this.elements.length; n++)
                    if (!this.contentContainer.contains(this.elements[n].element)) {
                        if (void 0 === t && (t = this.elementSupplier()), this.elements.length !== t.length) return;
                        i.c(t[n]) && (this.elements[n] = t[n], this.highlights[n] = this.highlightElement(this.elements[n]))
                    }
                if (i.c(this.currentSelectionIndex)) {
                    var r = this.elements[this.currentSelectionIndex];
                    i.c(r) && !r.element.hasAttribute(e.customAttributes.selected) && this.selectElement(r, this.currentSelectionIndex)
                }
            }
        }, e.prototype.applyReversibleUpdate = function(e, t) {
            var n = t.attributes,
                r = void 0 === n ? {} : n,
                o = {
                    attributes: {}
                };
            return Object.keys(r).forEach(function(t) {
                var n = r[t];
                o.attributes[t] = e.getAttribute(t), i.c(n) ? e.setAttribute(t, n) : e.removeAttribute(t)
            }), o
        }, e.prototype.evaluateXpath = function(e) {
            return Ye(e, this.document, this.contentContainer)
        }, e.customAttributes = {
            highlight: "data-ally-html-preview-highlight",
            "outline-inset": "data-ally-html-preview-outline-inset",
            "outline-outset": "data-ally-html-preview-outline-outset",
            selected: "data-ally-html-preview-selected",
            shadow: "data-ally-html-preview-highlight-shadow"
        }, e.customElementClassNames = {
            selectionContainer: "ally-preview-selection-container"
        }, e
    }();

    function Ye(e, t, n) {
        try {
            return t.evaluate(e, n, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
        } catch (t) {
            throw console.error('Invalid xpath: "' + e + '"', t), t
        }
    }

    function We(e, t, n, r) {
        return void 0 === n && (n = 10), void 0 === r && (r = ""), Object(l.b)(this, void 0, Promise, function() {
            var i;
            return Object(l.d)(this, function(o) {
                switch (o.label) {
                    case 0:
                        return [4, e().catch(function(e) {
                            console.warn("Failed to retrieve the condition", e)
                        })];
                    case 1:
                        return !0 !== (i = o.sent()) ? [3, 2] : [2, i];
                    case 2:
                        return n <= 0 ? (console.warn("Failed promise at " + r + "!"), [2, Promise.reject("Failed to satisfy condition.")]) : [3, 3];
                    case 3:
                        return [4, Ve(t)];
                    case 4:
                        return o.sent(), [2, We(e, t, n - 1, r)]
                }
            })
        })
    }

    function Ve(e) {
        return Object(l.b)(this, void 0, Promise, function() {
            return Object(l.d)(this, function(t) {
                switch (t.label) {
                    case 0:
                        return [4, new Promise(function(t) {
                            return setTimeout(t, e)
                        })];
                    case 1:
                        return [2, t.sent()]
                }
            })
        })
    }

    function Ge(e) {
        var t = document.createElement("a");
        t.href = e;
        var n = {
            hash: t.hash,
            host: t.host,
            hostname: t.hostname,
            href: t.href,
            origin: t.origin,
            password: t.password,
            pathname: t.pathname,
            port: t.port,
            protocol: t.protocol,
            search: t.search,
            username: t.username
        };
        return n.pathname.length > 0 && "/" !== n.pathname[0] && (n.pathname = "/" + location.pathname), n
    }

    function Ke(e, t, n) {
        try {
            return e.evaluate(n, t, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
        } catch (e) {
            return null
        }
    }

    function qe(e, t, n) {
        var r = t.outerHTML.trim().slice(t.tagName.length + 1, -1 * t.tagName.length - 1);
        e(t).replaceWith("<" + n + r + n + ">")
    }
    var ze = n(8),
        $e = "alt",
        Xe = function(e) {
            var t, n, r = e.getAttribute($e),
                i = (null !== (t = e.getAttribute("data-decorative")) && void 0 !== t ? t : "_ALLY_EMPTY_PLACEHOLDER_").toLowerCase();
            "presentation" === (null !== (n = e.getAttribute("role")) && void 0 !== n ? n : "_ALLY_EMPTY_PLACEHOLDER_").toLowerCase() || "true" === i ? e.setAttribute($e, "") : "" === r ? e.removeAttribute($e) : null !== r && "" !== r && ze.a.isDefaultDescription(r) && e.removeAttribute($e)
        };
    var Ze = function(e) {
        var t, n, r = e.getAttribute($e),
            o = (null !== (t = e.getAttribute("role")) && void 0 !== t ? t : "_ALLY_EMPTY_PLACEHOLDER_").toLowerCase(),
            a = null !== r ? r : o.includes("presentation") ? "" : void 0,
            s = (null !== (n = e.getAttribute("src")) && void 0 !== n ? n : "").trim(),
            l = ze.a.getAttributeMap(s).get("alt");
        i.c(a) && !ze.a.isDefaultDescription(a) || (!i.c(a) && i.c(l) && "_DECORATIVE_" === l ? e.setAttribute($e, "") : !i.c(a) && i.c(l) ? e.setAttribute($e, l) : e.removeAttribute($e))
    };

    function Qe(e, t, n, o) {
        var a = {
            type: t.type
        };
        return Object.keys(t).map(function(e) {
            return [e, t[e]]
        }).filter(function(e) {
            return "object" == typeof e[1]
        }).forEach(function(t) {
            var s = t[0],
                c = t[1],
                u = a[s] = Object(l.a)({}, c),
                d = u.xpaths;
            if (i.c(d) && "HtmlHeadingOrder" === s) {
                delete u.xpaths;
                var f = r("<div></div>").html(n),
                    p = f.find("h1,h2,h3,h4,h5,h6").toArray().map(function(e, t) {
                        return {
                            el: e,
                            i: t,
                            level: parseInt(e.tagName.slice(1), 10)
                        }
                    });
                u.headings = p.map(function(e) {
                    return {
                        level: e.level
                    }
                }), u.violations = d.map(function(t) {
                    var n = Ke(e, f[0], t),
                        r = p.find(function(e) {
                            return e.el === n
                        });
                    return {
                        headingIndex: i.d(r, {
                            i: -1
                        }).i,
                        xpath: t
                    }
                })
            } else if (i.c(d) && -1 !== ["HtmlImageAlt", "HtmlImageRedundantAlt"].indexOf(s)) {
                delete u.xpaths;
                var h = r("<div></div>").html(n);
                u.violations = d.map(function(t) {
                    var n = Ke(e, h[0], t),
                        a = i.c(n) ? r(n) : null,
                        s = function(e, t) {
                            if (!i.c(e) || e.nodeType !== Node.ELEMENT_NODE) return !1;
                            var n = e.cloneNode(!0);
                            switch (t) {
                                case "canvas":
                                    Xe(n);
                                    break;
                                case "learn":
                                    Ze(n)
                            }
                            return "" === n.getAttribute($e)
                        }(n, o);
                    return {
                        metadata: {
                            decorative: s,
                            description: s ? null : i.c(a) ? i.d(a.attr("alt"), null) : null
                        },
                        xpath: t
                    }
                })
            } else i.c(d) && "HtmlObjectAlt" === s ? u.xpaths = d.map(function(e) {
                var t = e.split("/"),
                    n = t.slice(0, -1).join("/"),
                    r = t.pop();
                return i.c(r) && r.startsWith("object") ? n + "/img[contains(@class, 'mce-object-object')]" : i.c(r) && r.startsWith("*[@id=") ? n + "/" + r.replace("@id=", "@data-mce-p-id=") : n + "/" + r
            }) : u.xpaths = d
        }), a
    }

    function Je(e, t, n, o) {
        if ("HtmlColorContrast" === e) t.map(function(e) {
            return Ke(document, o, e)
        }).filter(function(e) {
            return i.c(e)
        }).forEach(function(e) {
            var t = r(e);
            t.css("color", n.color), t.find("*").each(function(e, t) {
                var i = r(t);
                "" !== i.css("color") && i.css("color", n.color)
            })
        });
        else if ("HtmlTdHasHeader" === e) t.map(function(e) {
            return Ke(document, o, e)
        }).filter(function(e) {
            return i.c(e)
        }).forEach(function(e) {
            var t = r(e);
            i.d(n.orientation, []).map(function(e) {
                return "column" === e ? "tr > td:first-child" : "tr:first-child > td"
            }).forEach(function(e) {
                t.find(e).toArray().filter(function(e) {
                    return r(e).closest("table").is(t)
                }).forEach(function(e) {
                    return qe(r, e, "th")
                })
            })
        });
        else if ("HtmlEmptyHeading" === e) t.map(function(e) {
            return Ke(document, o, e)
        }).filter(function(e) {
            return i.c(e)
        }).forEach(function(e) {
            n.remove ? r(e).remove() : i.c(n.replace) && r(e).replaceWith(document.createElement(n.replace))
        });
        else if ("HtmlHeadingOrder" === e) t.map(function(e) {
            return Ke(document, o, e)
        }).filter(function(e) {
            return i.c(e)
        }).forEach(function(e) {
            return qe(r, e, n.tag)
        });
        else if (-1 !== ["HtmlImageAlt", "HtmlImageRedundantAlt"].indexOf(e)) t.map(function(e) {
            return Ke(document, o, e)
        }).filter(function(e) {
            return i.c(e)
        }).forEach(function(e) {
            "save" in n ? (r(e).attr("alt", n.save), rt(e, {
                alternativeText: n.save
            })) : n.decorative ? (r(e).attr("alt", ""), r(e).attr("role", "presentation")) : n.remove && (r(e).removeAttr("alt"), r(e).removeAttr("role"), rt(e, {
                alternativeText: "",
                isDecorative: !1
            }))
        });
        else {
            if ("HtmlLinkName" !== e) return !1;
            t.map(function(e) {
                return Ke(document, o, e)
            }).filter(function(e) {
                return i.c(e)
            }).forEach(function(e) {
                if (n.remove) qe(r, e, "span");
                else {
                    var t = r("<span></span>").text(n.text);
                    r(e).append(t)
                }
            })
        }
        return !0
    }
    var et = ["font-size", "font-weight", "font-family", "font-style", "text-decoration", "text-transform"];

    function tt(e) {
        return Number.parseInt(r.trim(e).substring(1), 10)
    }

    function nt(e) {
        for (var t = e, n = ["th", "tr", "tbody"]; i.c(t) && n.includes(null == t ? void 0 : t.tagName.toLowerCase()) && i.c(t.parentElement);) t = t.parentElement;
        return null == t ? void 0 : t.outerHTML
    }

    function rt(e, t) {
        var n = r(e).parents('[data-bbtype="attachment"][data-bbfile]');
        i.f(n.attr("data-bbfile"), function(e) {
            return n.attr("data-bbfile", JSON.stringify(Object(l.a)(Object(l.a)({}, JSON.parse(e)), t)))
        })
    }
    var it = function(e) {
            return "true" === e.getAttribute("contenteditable")
        },
        ot = [".js-drag-handle", ".panel-editor-controls", ".bb-file-viewer-context-menu", ".file-container-controls"],
        at = function() {
            function e(e, t, n, i) {
                void 0 === i && (i = window.jQuery ? window.jQuery : r), this.baseUrl = e, this.i18n = t, this.container = n, this.jq = i, this.editorBlockTransition = !1, this.emitter = new N.EventEmitter, this.quickFixInProgress = !1, this.blockStyles = [], this.deactivated = !1
            }
            return e.issueContentEditable = function(e) {
                return r(e).parents(".ql-editor").toArray().filter(it).length > 0
            }, e.parseEditorId = function(e) {
                return i.d(/\/\/.*\[@id='(.*)']/g.exec(e), [])[1]
            }, e.prototype.activate = function(e) {
                return Object(l.b)(this, void 0, Promise, function() {
                    var t, n = this;
                    return Object(l.d)(this, function(i) {
                        switch (i.label) {
                            case 0:
                                return t = this, [4, new Promise(function(e) {
                                    return n.getBbDocumentEditor().trigger("api", ["blockStyles", function(t) {
                                        return e(n.parseBlockStyles(t))
                                    }])
                                })];
                            case 1:
                                return t.blockStyles = i.sent(), r(this.container).addClass("ally-wysiwyg-feedback-quill"), this.indicator = e, this.indicator.classList.add("button", "button--secondary", "ally-score-meter-container-quill"), this.addScoreMeter(e), this.observer = new MutationObserver(function() {
                                    n.getBbDocumentEditor().trigger("api", ["getRteBlocks", function(e) {
                                        var t = n.getContent(e);
                                        t !== n.emittedContent && (n.emittedContent = t, n.emitter.emit("content-changed", t))
                                    }])
                                }), this.observer.observe(this.getContentContainer(), {
                                    attributeFilter: ["alt", "class", "style"],
                                    attributes: !0,
                                    characterData: !0,
                                    childList: !0,
                                    subtree: !0
                                }), [2]
                        }
                    })
                })
            }, e.prototype.addScoreMeter = function(e) {
                var t = r(this.container).parents(".panel-content").find(".header-actions-menu");
                0 === t.find("ally-wysiwyg-feedback-quill").length && t.prepend(e)
            }, e.prototype.applyFix = function(t, n, o) {
                var a;
                return Object(l.b)(this, void 0, void 0, function() {
                    var s, c, u, d, f, p, h, m, g, v;
                    return Object(l.d)(this, function(l) {
                        switch (l.label) {
                            case 0:
                                if (this.quickFixInProgress) return [2];
                                s = r(this.container).find(".ql-editor")[0], c = n.reduce(function(t, n) {
                                    var r = e.parseEditorId(n);
                                    return i.c(r) && (r = r.replace(/-rte$/g, ""), t.has(r) || t.set(r, []), t.get(r).push(n)), t
                                }, new Map), l.label = 1;
                            case 1:
                                l.trys.push([1, , 8, 9]), this.quickFixInProgress = !0, this.editorBlockTransition = !0, u = 0, d = Array.from(c.keys()), l.label = 2;
                            case 2:
                                if (!(u < d.length)) return [3, 7];
                                for (f = d[u], p = i.d(c.get(f), []), h = void 0, m = 0, g = p; m < g.length && (v = g[m], h = Ye(v, document, this.getContentContainer()), !i.c(h)); m++);
                                return i.c(h) ? e.issueContentEditable(h) ? [3, 5] : [4, this.closeEditorBlock(!0)] : [3, 6];
                            case 3:
                                return l.sent(), [4, this.openEditorBlock(f)];
                            case 4:
                                l.sent(), l.label = 5;
                            case 5:
                                null === (a = this.previewDriver) || void 0 === a || a.resetSelection(), Je(t, p, o, s), l.label = 6;
                            case 6:
                                return u++, [3, 2];
                            case 7:
                                return [3, 9];
                            case 8:
                                return this.quickFixInProgress = !1, this.editorBlockTransition = !1, [7];
                            case 9:
                                return [2]
                        }
                    })
                })
            }, e.prototype.belongsToEditor = function(e) {
                return r.contains(this.container, e) || r(e).is(".ms-Dialog") || r(e).parents(".ms-Dialog").length > 0
            }, e.prototype.deactivate = function() {
                this.deactivated = !0, this.emitter.removeAllListeners(), this.disableFeedbackMode(), this.getBbDocumentEditor().unbind("api.onRteChange"), i.c(this.indicator) && (this.indicator.remove(), this.indicator = void 0), r(this.container).removeClass("ally-wysiwyg-feedback-quill")
            }, e.prototype.isDeactivated = function() {
                return this.deactivated
            }, e.prototype.disableFeedbackMode = function() {
                var e = this;
                r(this.container).parents(".document-editor-template").removeClass("ally-wysiwyg-feedback-quill-fullscreen"), i.c(this.previewDriver) && (this.previewDriver.destroy(), this.previewDriver = void 0), ot.forEach(function(t) {
                    r(e.container).find(t).toArray().forEach(function(e) {
                        r(e).removeClass("ally-wysiwyg-feedback-list-item-inactive")
                    })
                })
            }, e.prototype.enableFeedbackMode = function(e) {
                var t = this,
                    n = r(this.container).parents(".document-editor-template");
                n.addClass("ally-wysiwyg-feedback-quill-fullscreen"), ot.forEach(function(e) {
                    r(t.container).find(e).toArray().forEach(function(e) {
                        r(e).addClass("ally-wysiwyg-feedback-list-item-inactive")
                    })
                }), this.previewDriver = new Ue(this.baseUrl, this.i18n, {
                    contentContainer: n[0],
                    scrollContainer: n[0]
                }, this.onSelection.bind(this)), this.previewDriver.start({
                    highlightInterval: 500,
                    parentWindow: e,
                    preprocessInterval: !1
                })
            }, e.prototype.getFeedbackContainer = function() {
                return r(this.container).parents(".panel-content")[0]
            }, e.prototype.onContentChange = function(e) {
                this.emitter.on("content-changed", e)
            }, e.prototype.onContentInit = function(e) {
                var t = this;
                this.getBbDocumentEditor().trigger("api", ["getRteBlocks", function(n) {
                    e(t.getContent(n))
                }])
            }, e.prototype.onForceDisableFeedbackMode = function(e) {
                this.emitter.on("force-disable-feedback-mode", e)
            }, e.prototype.getBlocks = function() {
                return this.blockStyles
            }, e.prototype.onSelection = function(t) {
                return Object(l.b)(this, void 0, Promise, function() {
                    var n;
                    return Object(l.d)(this, function(o) {
                        switch (o.label) {
                            case 0:
                                if (this.quickFixInProgress || this.editorBlockTransition || !i.c(t) || e.issueContentEditable(t)) return [3, 6];
                                if (!r.contains(this.container, t)) return console.warn("Issue element is no longer attached to Quill DOM", t), this.emitter.emit("selection-changed", void 0), [2];
                                n = r(t).parents("bb-rich-text-editor").attr("editor-id"), o.label = 1;
                            case 1:
                                return o.trys.push([1, , 5, 6]), this.editorBlockTransition = !0, this.anyContentEditable() ? [4, this.closeEditorBlock(!0)] : [3, 3];
                            case 2:
                                o.sent(), o.label = 3;
                            case 3:
                                return [4, this.openEditorBlock(n.replace(/-rte$/g, ""))];
                            case 4:
                                return o.sent(), [3, 6];
                            case 5:
                                return this.editorBlockTransition = !1, [7];
                            case 6:
                                return this.emitter.emit("selection-changed", nt(t)), [2]
                        }
                    })
                })
            }, e.prototype.onSelectionChange = function(e) {
                this.emitter.on("selection-changed", e)
            }, e.prototype.getContentContainer = function() {
                return r(this.container)[0]
            }, e.prototype.getBbDocumentEditor = function() {
                return this.jq(this.container).parents("bb-document-editor")
            }, e.prototype.getContent = function(e) {
                var t = this;
                return e.map(function(e) {
                    var n = e.id,
                        o = r(t.container).find("#" + n).clone(),
                        a = i.d(o.prop("tagName"), "div").toLowerCase();
                    return Object.values(Ue.customAttributes).forEach(function(e) {
                        return o.find("[" + e + "]").removeAttr(e)
                    }), "<" + a + ' id="' + n + '">' + o.html() + "</" + a + ">"
                }).join()
            }, e.prototype.getEditableEditors = function() {
                return r(this.container).find(".ql-editor").toArray().filter(it)
            }, e.prototype.anyContentEditable = function() {
                return this.getEditableEditors().length > 0
            }, e.prototype.openEditorBlock = function(e) {
                return Object(l.b)(this, void 0, Promise, function() {
                    var t = this;
                    return Object(l.d)(this, function(n) {
                        switch (n.label) {
                            case 0:
                                return [4, We(function() {
                                    return new Promise(function(n) {
                                        return t.getBbDocumentEditor().trigger("api", ["open", e, function() {
                                            return n(t.anyContentEditable())
                                        }])
                                    })
                                }, 250, 20)];
                            case 1:
                                return n.sent(), [2]
                        }
                    })
                })
            }, e.prototype.closeEditorBlock = function(e) {
                return Object(l.b)(this, void 0, Promise, function() {
                    var t = this;
                    return Object(l.d)(this, function(n) {
                        switch (n.label) {
                            case 0:
                                return [4, We(function() {
                                    return new Promise(function(n) {
                                        return t.getBbDocumentEditor().trigger("api", ["closeActive", e, function() {
                                            return n(!t.anyContentEditable())
                                        }])
                                    })
                                }, 250, 20)];
                            case 1:
                                return n.sent(), [2]
                        }
                    })
                })
            }, e.prototype.parseBlockStyles = function(e) {
                var t = this;
                return e.map(function(e) {
                    var n = e.name,
                        o = e.tag,
                        a = e.level,
                        s = e.style,
                        l = void 0 === s ? [] : s,
                        c = e.className,
                        u = {};
                    if (l.length > 0) l.forEach(function(e) {
                        return Object.keys(e).forEach(function(t) {
                            return u[t] = e[t]
                        })
                    });
                    else if (i.c(c)) {
                        var d = r('<ally-mock style="display: none" class="bb-editor-toolbar-button ' + c + '"></ally-mock>');
                        r(t.container).find(".bb-editor-toolbar").prepend(d), et.forEach(function(e) {
                            return u[e] = d.css(e)
                        }), d.detach()
                    }
                    return {
                        level: a,
                        name: n,
                        style: u,
                        tag: o
                    }
                })
            }, e
        }(),
        st = function() {
            function e(e, t, n) {
                var r = void 0 === n ? {} : n,
                    i = r.checkIntervalMs,
                    o = void 0 === i ? 1e3 : i,
                    a = r.root,
                    s = void 0 === a ? document.body : a;
                this.baseUrl = e, this.i18n = t, this.emitter = new N.EventEmitter, this.instances = [], this.checkIntervalMs = o, this.root = s
            }
            return e.prototype.onAddEditor = function(e) {
                this.emitter.on("add-editor", e)
            }, e.prototype.onRemoveEditor = function(e) {
                this.emitter.on("remove-editor", e)
            }, e.prototype.start = function() {
                var e = this;
                this.syncEditors(), this.interval = setInterval(function() {
                    return e.syncEditors()
                }, this.checkIntervalMs)
            }, e.prototype.stop = function() {
                var e = this;
                i.c(this.interval) && (clearInterval(this.interval), this.interval = void 0), this.instances.forEach(function(t) {
                    var n = t.id,
                        r = t.editor;
                    return e.emitter.emit("remove-editor", n, r)
                }), this.instances.length = 0, this.emitter.removeAllListeners()
            }, e.prototype.syncEditors = function() {
                for (var e = r(this.root).find(".bbml-editor").toArray().map(function(e) {
                        return {
                            editable: r(e).find(".ql-editor").toArray().filter(it).length > 0,
                            editor: e
                        }
                    }), t = [], n = function(n) {
                        var r = o.instances[n];
                        r.editor.editorBlockTransition || -1 !== e.filter(function(e) {
                            return e.editable
                        }).findIndex(function(e) {
                            return e.editor === r.container
                        }) || (t.push(n), o.emitter.emit("remove-editor", r.id, r.editor))
                    }, o = this, a = 0; a < this.instances.length; a++) n(a);
                for (var s = 0, l = t; s < l.length; s++) {
                    a = l[s];
                    this.instances.splice(a, 1)
                }
                for (var c = function(e) {
                        if (!i.c(u.instances.find(function(t) {
                                return t.container === e.editor
                            })) && e.editable) {
                            var t = Math.random().toString().slice(2),
                                n = new at(u.baseUrl, u.i18n, e.editor);
                            u.instances.push({
                                id: t,
                                container: e.editor,
                                editor: n
                            }), u.emitter.emit("add-editor", t, n)
                        }
                    }, u = this, d = 0, f = e; d < f.length; d++) {
                    c(f[d])
                }
            }, e
        }(),
        lt = {
            type: "feedback"
        },
        ct = function() {
            function e(e, t, n) {
                this.frameSource = e, this.retries = t, this.timeout = n, this.feedback = Promise.resolve()
            }
            return e.prototype.provide = function(e) {
                var t = this;
                return {
                    feedback: function(n) {
                        var r = function() {
                            return Object(l.b)(t, void 0, void 0, function() {
                                var t, r, i;
                                return Object(l.d)(this, function(o) {
                                    switch (o.label) {
                                        case 0:
                                            return [4, this.pubsubClient()];
                                        case 1:
                                            return t = o.sent(), r = {
                                                payload: n,
                                                preprocess: e.preprocessType
                                            }, [4, t.ask("feedback", r, 3e4)];
                                        case 2:
                                            return i = o.sent(), [2, e.consume(JSON.parse(i.results))]
                                    }
                                })
                            })
                        };
                        return t.feedback = t.feedback.then(r, r), t.feedback
                    }
                }
            }, e.prototype.pubsubClient = function() {
                return Me.ProtoframePubsub.connect(this.lazyInit(), this.retries, this.timeout)
            }, e.prototype.lazyInit = function() {
                if (i.c(this.protoframe)) return this.protoframe;
                if (this.frameSource instanceof Me.ProtoframePubsub) this.protoframe = this.frameSource;
                else {
                    var e = r('\n                    <iframe\n                        id="feedbackframe" style="position: absolute; left: -10000px; top: -10000px;"\n                        src="' + this.frameSource + '">\n                    </iframe>').appendTo("body")[0];
                    this.protoframe = Me.ProtoframePubsub.parent(lt, e)
                }
                return this.protoframe
            }, e
        }(),
        ut = function() {
            function e(e) {
                this.initializer = e, this.instance = null
            }
            return Object.defineProperty(e.prototype, "value", {
                get: function() {
                    return null == this.instance && (this.instance = this.initializer()), this.instance
                },
                enumerable: !0,
                configurable: !0
            }), e
        }(),
        dt = function() {
            function e() {}
            return e.default = function(e) {
                this.custom(this.DEFAULT(e))
            }, e.custom = function(e, t) {
                void 0 === t && (t = !1), i.c(window.ALLY_DI) && !t || (window.ALLY_DI = new ut(e))
            }, e.get = function() {
                if (i.c(window.ALLY_DI)) return window.ALLY_DI.value;
                throw new Error("No Ally DI found.")
            }, e.DEFAULT = function(e) {
                return function() {
                    return {
                        feedbackProviderFactory: new ct(e + "/htmlfeedback/")
                    }
                }
            }, e
        }();
    var ft = function() {
        function e() {}
        return e.prototype.getScoreDisplay = function(e) {
            var t = Math.floor(100 * e) / 100;
            return {
                level: this.getScoreLevel(t),
                percent: t
            }
        }, e.prototype.getScoreDisplayForLevelId = function(e) {
            var t = this.getRepresentativeScore(e);
            return {
                level: this.getScoreLevel(t),
                percent: t
            }
        }, e.prototype.getScoreLevel = function(e) {
            var t = this.getScoreLevelId(e),
                n = this.getScoreLevelColor(t),
                r = this.getScoreLevelIcons(t);
            return {
                color: n,
                i18nKey: this.getScoreLevelI18nKey(t),
                icons: r,
                id: t
            }
        }, e.prototype.getScoreLevelId = function(e) {
            return e <= .33 ? "low" : e <= .66 ? "medium" : 1 === e ? "perfect" : "high"
        }, e.prototype.getRepresentativeScore = function(e) {
            switch (e) {
                case "low":
                    return 0;
                case "medium":
                    return .34;
                case "high":
                    return .67;
                case "perfect":
                    return 1
            }
        }, e.prototype.getScoreLevelColor = function(e) {
            switch (e) {
                case "low":
                    return "#E30100";
                case "medium":
                    return "#DC7C01";
                case "high":
                    return "#71A63E";
                case "perfect":
                    return "#009B02"
            }
        }, e.prototype.getScoreLevelIcons = function(e) {
            switch (e) {
                case "low":
                    return {
                        circle: n(20),
                        standard: n(21)
                    };
                case "medium":
                    return {
                        circle: n(22),
                        standard: n(23)
                    };
                case "high":
                    return {
                        circle: n(18),
                        standard: n(19)
                    };
                case "perfect":
                    return {
                        circle: n(24),
                        standard: n(25)
                    }
            }
        }, e.prototype.getScoreLevelI18nKey = function(e) {
            switch (e) {
                case "low":
                    return "ACCESSIBILITY_SCORE_LOW";
                case "medium":
                    return "ACCESSIBILITY_SCORE_MEDIUM";
                case "high":
                    return "ACCESSIBILITY_SCORE_HIGH";
                case "perfect":
                    return "ACCESSIBILITY_SCORE_PERFECT"
            }
        }, e
    }();
    var pt, ht = function() {
            function e(e, t, n, r, i, o, a) {
                this.baseUrl = e, this.platformName = t, this.locale = n, this.i18n = r, this.listener = i, this.runner = o, this.feedbackContainer = a, this.liveContent = {}, this.liveFeedback = {}, dt.default(this.baseUrl)
            }
            return e.prototype.start = function() {
                var e = this;
                this.listener.onAddEditor(function(t, n) {
                    return e.onAddEditor(t, n)
                }), this.listener.onRemoveEditor(function(t, n) {
                    n.deactivate(), delete e.liveContent[t], delete e.liveFeedback[t], e.activeEditorId = void 0
                }), this.listener.start()
            }, e.prototype.stop = function() {
                this.listener.stop()
            }, e.prototype.addScoreMeter = function(e, t, n) {
                return Object(l.b)(this, void 0, void 0, function() {
                    var o, a, s, c = this;
                    return Object(l.d)(this, function(l) {
                        switch (l.label) {
                            case 0:
                                return o = function(e, t, n) {
                                    var i = 60.5,
                                        o = i + 17,
                                        a = new ft,
                                        s = t.split("-").shift();

                                    function l(e) {
                                        var t = e / 2;
                                        return 2 * Math.PI * i * t + ", " + 2 * Math.PI * i * (1 - t)
                                    }

                                    function c(e) {
                                        return a.getScoreDisplay(e).percent.toLocaleString(s, {
                                            style: "percent"
                                        })
                                    }

                                    function u(e) {
                                        var t = c(e);
                                        return (n.ACCESSIBILITY_SCORE_PERCENT ? n.ACCESSIBILITY_SCORE_PERCENT.replace("{0}", t) : t) + "\n" + n.CLICK_TO_IMPROVE
                                    }
                                    var d = r('\n        <button\n            type="button" class="ally-score-meter-container ally-add-tooltip"\n            aria-label="' + u(e) + '"\n            data-ally-tooltip>\n            <svg class="ally-score-meter" viewBox="0 0 155 77.5">\n                <circle\n                    class="ally-score-meter-background"\n                    cx="' + o + '"\n                    cy="' + o + '"\n                    fill="none"\n                    r="' + i + '"\n                    stroke="#000"\n                    stroke-dasharray="' + l(1) + '"\n                    stroke-dashoffset="0"\n                    stroke-width="34"\n                    transform="rotate(180 ' + o + " " + o + ')"\n                />\n                <circle\n                    class="ally-score-meter-foreground"\n                    cx="' + o + '"\n                    cy="' + o + '"\n                    fill="none"\n                    r="' + i + '"\n                    stroke-dasharray="' + l(0) + '"\n                    stroke-dashoffset="0"\n                    stroke-width="34"\n                    transform="rotate(180 ' + o + " " + o + ')"\n                />\n            </svg>\n            <span class="ally-score-meter-text">' + c(e) + "</span>\n        </button>\n    "),
                                        f = d[0],
                                        p = function(e) {
                                            d.find(".ally-score-meter-foreground").attr("stroke", a.getScoreDisplay(e).level.color), d.find(".ally-score-meter-foreground").attr("stroke-dasharray", l(e)), d.find(".ally-score-meter-text").text(c(e)), d.attr("aria-label", u(e))
                                        };
                                    return setTimeout(function() {
                                        return p(e)
                                    }, 0), {
                                        el: f,
                                        updateScore: p
                                    }
                                }(n.feedback.score, this.locale, this.i18n), a = o.el, s = o.updateScore, [4, t.activate(a)];
                            case 1:
                                return l.sent(), r(a).on("click", function(n) {
                                    n.preventDefault(), n.stopPropagation(), c.activeEditorId = e;
                                    var o = c.liveFeedback[e],
                                        a = i.d(c.feedbackContainer, i.d(t.getFeedbackContainer(), document.body));
                                    c.runner.launchInstructorFeedback({
                                        allowFocus: function(e) {
                                            return t.belongsToEditor(e)
                                        },
                                        appendTo: a,
                                        editorBlocks: t.getBlocks(),
                                        liveFeedback: o
                                    }, {
                                        closed: function() {
                                            return t.disableFeedbackMode()
                                        },
                                        fixHtmlIssue: function(e, n, r) {
                                            return t.applyFix(e, n, r)
                                        }
                                    });
                                    var s = r(a).find(".ally-iframe")[0];
                                    t.enableFeedbackMode(s.contentWindow)
                                }), [2, {
                                    el: a,
                                    updateScore: s
                                }]
                        }
                    })
                })
            }, e.prototype.generateHtmlFeedback = function(e) {
                return Object(l.b)(this, void 0, Promise, function() {
                    var t, n;
                    return Object(l.d)(this, function(r) {
                        switch (r.label) {
                            case 0:
                                return t = this.liveContent[e], i.c(t) ? [4, this.runner.generateHtmlFeedback(t)] : [2];
                            case 1:
                                return n = r.sent(), i.c(n) && (n.explanationData = Qe(document, n.explanationData, t, this.platformName)), this.liveFeedback[e] = n, [2, n]
                        }
                    })
                })
            }, e.prototype.onAddEditor = function(e, t) {
                var n = this;
                t.onContentInit(function(r) {
                    return Object(l.b)(n, void 0, void 0, function() {
                        var n, o, a, s, c = this;
                        return Object(l.d)(this, function(u) {
                            switch (u.label) {
                                case 0:
                                    this.liveContent[e] = r, u.label = 1;
                                case 1:
                                    return u.trys.push([1, 4, , 5]), [4, this.generateHtmlFeedback(e)];
                                case 2:
                                    return n = u.sent(), t.isDeactivated() ? [2] : i.c(n) ? [4, this.addScoreMeter(e, t, n)] : [2, t.deactivate()];
                                case 3:
                                    return o = u.sent().updateScore, a = function(e, t) {
                                        var n = t.onError,
                                            r = t.wait,
                                            i = void 0 === r ? 0 : r,
                                            o = !0,
                                            a = !1,
                                            s = function() {
                                                o ? (o = !1, e().catch(n).then(function() {
                                                    return Ve(i)
                                                }).then(function() {
                                                    o = !0, a && (a = !1, s())
                                                })) : a = !0
                                            };
                                        return s
                                    }(function() {
                                        return Object(l.b)(c, void 0, void 0, function() {
                                            var t;
                                            return Object(l.d)(this, function(n) {
                                                switch (n.label) {
                                                    case 0:
                                                        return [4, this.generateHtmlFeedback(e)];
                                                    case 1:
                                                        return t = n.sent(), i.c(t) ? (o(t.feedback.score), void 0 !== this.activeEditorId && this.activeEditorId !== e || this.runner.updateLiveFeedback(t), [2]) : [2]
                                                }
                                            })
                                        })
                                    }, {
                                        onError: function(t) {
                                            return console.warn("Failed to process WYSIWYG content update " + e + ".", t)
                                        }
                                    }), t.onSelectionChange(function(e) {
                                        return Object(i.f)(c.runner.updateLiveFeedbackContent, function(t) {
                                            return t(e)
                                        })
                                    }), t.onContentChange(function(t) {
                                        c.liveContent[e] = t, a()
                                    }), t.onForceDisableFeedbackMode(function() {
                                        c.activeEditorId = void 0, c.runner.closeInstructorFeedback()
                                    }), [3, 5];
                                case 4:
                                    return s = u.sent(), console.warn("Failed to process WYSIWYG content " + e + ".", s), t.deactivate(), [3, 5];
                                case 5:
                                    return [2]
                            }
                        })
                    })
                })
            }, e
        }(),
        mt = n(74).FileReference,
        gt = n(13),
        vt = function(e) {
            function t(t, n, r) {
                var i = e.call(this, t, n.config.platformName, n.config.locale, n.i18n, r, {
                    closeInstructorFeedback: function() {},
                    generateHtmlFeedback: function(e) {
                        return Object(l.b)(i, void 0, void 0, function() {
                            var t, r;
                            return Object(l.d)(this, function(i) {
                                switch (i.label) {
                                    case 0:
                                        return [4, dt.get()];
                                    case 1:
                                        return t = i.sent(), r = {
                                            consume: function(e) {
                                                return n.client.generateAxeFeedback(e)
                                            },
                                            preprocessType: n.config.platformName
                                        }, [2, t.feedbackProviderFactory.provide(r).feedback(e)]
                                }
                            })
                        })
                    },
                    launchInstructorFeedback: function(e, t) {
                        _.launch(n, n.config.courseId, new mt("content:irrelevant", {}, "RichContent"), e, t)
                    },
                    updateLiveFeedback: function(e) {
                        return gt.updateLiveFeedback(e)
                    },
                    updateLiveFeedbackContent: function(e) {
                        return gt.onLiveFeedbackContent(e)
                    }
                }) || this;
                return i
            }
            return Object(l.c)(t, e), t
        }(ht),
        Et = n(75),
        yt = function() {
            function e() {}
            return e.annotate = function(e, t) {
                return Object(l.b)(this, void 0, void 0, function() {
                    return Object(l.d)(this, function(n) {
                        switch (n.label) {
                            case 0:
                                return h.isUltra(t) ? (Vt.addStylesheet(e.client.config.baseUrl + "/" + Et, "ally-learn-ultra-styles"), [4, e.client.getClientInfo(e.config.courseId)]) : [2];
                            case 1:
                                return n.sent().flags.ifLaunchFromWysiwyg && new vt(e.client.config.baseUrl, e, new st(e.client.config.baseUrl, e.i18n)).start(), [2]
                        }
                    })
                })
            }, e
        }(),
        It = function() {
            function e() {}
            return e.isMeaningful = function(t, n) {
                return "" === t || e.restUtil.isAltTextMeaningful(t, n)
            }, e.getFromFileReport = function(e) {
                return !0 === e.decorative ? "" : null !== e.description && void 0 !== e.description ? e.description : null
            }, e.restUtil = n(76), e
        }(),
        _t = function() {
            function e() {}
            return e.getDataAllyAttrName = function(e) {
                return "data-ally-" + e
            }, e
        }(),
        At = function() {
            function e() {}
            return e.count = function() {
                return Object.keys(e.monitors).length
            }, e.offCoordsChange = function(t) {
                var n = e.monitors[t];
                n && clearInterval(n), delete e.monitors[t]
            }, e.onCoordsChange = function(t, n, r, i) {
                var o = e.findCoords(t);
                if (o) {
                    var a = o;
                    i(a), e.monitors[n] = setInterval(function() {
                        var r = a,
                            o = e.findCoords(t);
                        o ? (a = o, e.coordsEqual(r, o) || i(a)) : (e.offCoordsChange(n), i(null))
                    }, r)
                } else i(null)
            }, e.coordsEqual = function(e, t) {
                return e.bottom === t.bottom && e.left === t.left && e.right === t.right && e.top === t.top
            }, e.findCoords = function(e) {
                if (!r.contains(document.documentElement, e[0])) return null;
                var t = e.offset(),
                    n = e.height(),
                    i = e.width();
                return {
                    bottom: t.top + n,
                    left: t.left,
                    right: t.left + i,
                    top: t.top
                }
            }, e.monitors = {}, e
        }(),
        Tt = function() {
            function e() {}
            return e.create = function(t, n) {
                var r = e.guardId(n),
                    i = L.apply({
                        ALLY_DOMAIN: t.client.config.baseUrl,
                        i18n: t.i18n
                    });
                n.$el.after(i), At.onCoordsChange(n.$el, r, 50, function(r) {
                    r ? (i.offset({
                        left: r.left,
                        top: r.top
                    }), i.width(r.right - r.left), i.height(r.bottom - r.top)) : e.destroy(t, n)
                }), e.guards[r] = i, i.find("button").click(function() {
                    return e.destroy(t, n), !1
                })
            }, e.destroyAll = function() {
                Object.keys(e.guards).forEach(function(t) {
                    return e.destroyByGuardId(t, {
                        fade: !1
                    })
                })
            }, e.destroy = function(t, n, r) {
                var i = (void 0 === r ? {} : r).fade,
                    o = void 0 === i || i,
                    a = e.guardId(n);
                e.destroyByGuardId(a, {
                    fade: o
                })
            }, e.count = function() {
                return Object.keys(e.guards).length
            }, e.destroyByGuardId = function(t, n) {
                if (At.offCoordsChange(t), t in e.guards) {
                    var r = e.guards[t];
                    n.fade ? r.fadeOut(function() {
                        return r.remove()
                    }) : r.remove(), delete e.guards[t]
                }
            }, e.guardId = function(e) {
                return "seizureguard-" + e.getId()
            }, e.guards = {}, e
        }();
    ! function(e) {
        e.aaasContent = "aaasContent", e.file = "file", e.richContent = "richContent", e.unknown = "unknown", e.webpage = "webpage"
    }(pt || (pt = {}));
    var bt = function() {
            function e(t) {
                if (this.$el = t, t.is(e.typeSelector(pt.file)) ? this.type = pt.file : t.is(e.typeSelector(pt.richContent)) ? this.type = pt.richContent : t.is(e.typeSelector(pt.webpage)) ? this.type = pt.webpage : t.is(e.typeSelector(pt.aaasContent)) ? this.type = pt.aaasContent : this.type = pt.unknown, !e.allowedIdRegExp.test(this.getId())) throw new Error("Content Instance ids must match " + e.allowedIdRegExp.toString())
            }
            return e.typeSelector = function(e) {
                var t = _t.getDataAllyAttrName("content-id");
                switch (e) {
                    case pt.file:
                        return "[" + t + "][" + _t.getDataAllyAttrName("file-eid") + "]";
                    case pt.richContent:
                        return "[" + t + "][" + _t.getDataAllyAttrName("richcontent-eid") + "]";
                    case pt.webpage:
                    case pt.webpage:
                        return "[" + t + "][" + _t.getDataAllyAttrName("webpage") + "]";
                    case pt.aaasContent:
                        return "[" + t + "][" + _t.getDataAllyAttrName("aaas-content-hash") + "]";
                    case pt.unknown:
                        return "[" + t + "][" + _t.getDataAllyAttrName("unknown") + "]"
                }
            }, e.fromRoot = function(t) {
                var n = {},
                    i = e.typeSelector(pt.file),
                    o = e.typeSelector(pt.richContent),
                    a = e.typeSelector(pt.webpage),
                    s = e.typeSelector(pt.aaasContent);
                t.find(i).toArray().map(function(t) {
                    return new e(r(t))
                }).forEach(function(e) {
                    return n[e.getId()] = e
                }), t.find(o).toArray().map(function(t) {
                    return new e(r(t))
                }).forEach(function(e) {
                    return n[e.getId()] = e
                }), t.find(s).toArray().map(function(t) {
                    return new e(r(t))
                }).forEach(function(e) {
                    return n[e.getId()] = e
                });
                var l = t.find(a).toArray();
                return t.is(a) && l.push(t[0]), l.map(function(t) {
                    return new e(r(t))
                }).forEach(function(e) {
                    return n[e.getId()] = e
                }), n
            }, e.findContainingRichContent = function(t) {
                var n = t.$el.parents(e.typeSelector(pt.richContent)).first();
                return 1 === n.length ? new e(n) : null
            }, e.findContentInstances = function(e, t) {
                return "*" === t ? Object.keys(e).map(function(t) {
                    return e[t]
                }) : t in e ? [e[t]] : []
            }, e.prototype.getId = function() {
                return this.$el.attr(_t.getDataAllyAttrName("content-id"))
            }, e.prototype.getFileEid = function() {
                var e = this.$el.attr(_t.getDataAllyAttrName("file-eid"));
                return "string" == typeof e ? e : null
            }, e.prototype.getRichContentEid = function() {
                var e = this.$el.attr(_t.getDataAllyAttrName("richcontent-eid"));
                return "string" == typeof e ? e : null
            }, e.prototype.getFilePreviewUrl = function() {
                var e = this.$el.attr(_t.getDataAllyAttrName("file-preview-url"));
                return "string" == typeof e ? e : null
            }, e.prototype.getAaasContentHash = function() {
                var e = this.$el.attr(_t.getDataAllyAttrName("aaas-content-hash"));
                return "string" == typeof e ? e : null
            }, e.prototype.getAaasDownloadUrl = function() {
                var e = this.$el.attr(_t.getDataAllyAttrName("download-url"));
                return "string" == typeof e ? e : null
            }, e.prototype.getFileReference = function() {
                var e = this.getFileEid(),
                    t = this.getRichContentEid(),
                    n = this.getAaasContentHash();
                if (i.c(e)) {
                    var r = this.getAllyWorkAroundSourceValues();
                    return mt.fromElement(this.$el, e, r)
                }
                return i.c(t) ? mt.fromData({
                    id: t,
                    uploadType: "RichContent"
                }) : i.c(n) ? mt.fromData({
                    id: n,
                    uploadType: "File"
                }) : null
            }, e.prototype.getRichContentLocator = function(t) {
                var n = e.findContainingRichContent(this),
                    r = this.getFileReference();
                if (null !== n && null !== r && r.isEmbedded()) {
                    var o = this.$el.prop("tagName").toLowerCase(),
                        a = i.d(this.$el.attr(_t.getDataAllyAttrName("richcontent-selector")), i.d(n.$el.attr(_t.getDataAllyAttrName("richcontent-selector-" + o)), this.getDefaultRichContentSelector())),
                        s = i.d(this.$el.attr(_t.getDataAllyAttrName("richcontent-index")), this.getDefaultRichContentIndex(t, n, a)),
                        l = this.coerceIndex(s);
                    return null !== l ? {
                        index: l,
                        selector: a
                    } : null
                }
                return null
            }, e.prototype.applyAllyWorkArounds = function(e, t) {
                if (t && "IMG" === this.$el[0].tagName) {
                    var n = this.getSourceAttrValue("alt");
                    if (!It.isMeaningful(n, t.name)) {
                        var r = It.getFromFileReport(t);
                        It.isMeaningful(r, t.name) && this.setAllyWorkAroundValue("alt", r)
                    }!0 !== t.seizureRisk || this.$el.is("[" + _t.getDataAllyAttrName("seizureguard-created") + "]") ? !0 !== t.seizureRisk && this.$el.is("[" + _t.getDataAllyAttrName("seizureguard-created") + "]") && Tt.destroy(e, this) : (this.$el.attr(_t.getDataAllyAttrName("seizureguard-created"), ""), Tt.create(e, this))
                }
            }, e.prototype.setAllyWorkAroundValue = function(e, t) {
                var n = _t.getDataAllyAttrName("work-around") + "-" + e,
                    r = i.d(JSON.stringify(this.$el.attr(e)), "null");
                null == t ? this.$el.removeAttr(e) : this.$el.attr(e, t), this.$el.is("[" + n + "]") || this.$el.attr(n, r)
            }, e.prototype.getSourceAttrValue = function(e) {
                var t = _t.getDataAllyAttrName("work-around") + "-" + e;
                if (this.$el.is("[" + t + "]")) {
                    var n = this.$el.attr(t);
                    return JSON.parse(n)
                }
                return this.$el.is("[" + e + "]") ? this.$el.attr(e) : null
            }, e.prototype.getAllyWorkAroundSourceValues = function() {
                var t = this,
                    n = {};
                if (this.$el.length > 0) {
                    var i = this.$el[0];
                    r.each(i.attributes, function(r, i) {
                        if (0 === i.name.indexOf(e.allyWorkAroundAttrPrefix)) {
                            var o = i.name.substring(e.allyWorkAroundAttrPrefix.length + 1);
                            n[o] = t.getSourceAttrValue(o)
                        }
                    })
                }
                return n
            }, e.prototype.getDefaultRichContentSelector = function() {
                return this.$el.prop("tagName").toLowerCase()
            }, e.prototype.getDefaultRichContentIndex = function(e, t, n) {
                var r = t.$el.find(n);
                this.$el.prop("tagName").toLowerCase() === n.toLowerCase() && (r = r.not('[src^="' + e.client.config.baseUrl + '"]'));
                var i = r.index(this.$el);
                return -1 === i ? null : i
            }, e.prototype.coerceIndex = function(e) {
                var t = null;
                return "number" == typeof e ? t = e : "string" == typeof e && (t = parseInt(e, 10)), null === t ? null : isNaN(t) ? null : t
            }, e.allowedIdRegExp = /^[a-zA-Z0-9=_\-:\/\+\.;]+$/, e.allyWorkAroundAttrPrefix = _t.getDataAllyAttrName("work-around"), e
        }(),
        Ot = n(3),
        Ct = function() {
            function e() {}
            return e.run = function(e, t, n, r, i) {
                i.forEach(function(i) {
                    i.isApplicable(e, t, n, r) && i.run(e, t, n, r)
                })
            }, e
        }(),
        Lt = function() {
            function e(e, t, n) {
                this.href = e, this.text = t, this.title = n
            }
            return e.fromEl = function(t) {
                var n = e.resolveNonEmptyHref(t);
                if (i.c(n)) {
                    var r = e.resolveSimpleText(t, n);
                    return new e(n, r, i.e(t.attr("title")))
                }
                return null
            }, e.resolveNonEmptyHref = function(e) {
                var t = e.attr("href");
                if (i.c(t) && "" !== t.trim() && 0 !== t.indexOf("#")) {
                    var n = t.split("#")[0].trim();
                    return "" !== n && 0 !== n.toLowerCase().indexOf("javascript:") ? n : null
                }
                return null
            }, e.resolveSimpleText = function(t, n) {
                if (e.hasStructuralElements(t)) return null;
                var r = t.text().trim();
                return "" === r ? null : r
            }, e.hasStructuralElements = function(e) {
                return e.find("*").filter(function(e, t) {
                    return -1 === i.d(r(t).css("display"), "").indexOf("inline")
                }).length > 0
            }, e.prototype.toJson = function() {
                return {
                    href: this.href,
                    text: this.text,
                    title: this.title
                }
            }, e
        }(),
        St = function() {
            function e(e, t, n) {
                this.title = e, this.url = t, this.links = n
            }
            return e.fromMain = function(t) {
                var n = t.find("a:visible:not([data-ally-af-disabled])").toArray().map(function(e) {
                    return Lt.fromEl(r(e))
                });
                return new e(document.title, window.location.href, c.a(n))
            }, e.prototype.toJson = function() {
                return {
                    links: this.links.map(function(e) {
                        return e.toJson()
                    }),
                    title: this.title,
                    url: this.url
                }
            }, e
        }(),
        wt = n(13).updateCarFeedback,
        Nt = new(function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return Object(l.c)(t, e), t.prototype.isApplicable = function(e, t, n, r) {
                return t.hasDataAllyAttr("invoke")
            }, t.prototype.run = function(e, t, n, o) {
                var a = this,
                    s = n[t.getContentInstanceId()],
                    c = s.getId(),
                    u = o[c],
                    d = t.getDataAllyAttrValue("invoke");
                if ("instructorfeedback" === d) {
                    var f = e.config.courseId,
                        p = e.config.platformName;
                    if (null === f) throw new Error("Cannot attach file instructor feedback without specifying a course id in ally.ui config");
                    if (u && "number" == typeof u.score) {
                        var h = this.resolveIssue(t),
                            E = this.resolveTarget(t),
                            y = this.resolveWindowTitle(e, t, u),
                            I = i.a(s.getFileReference());
                        this.bindClickIfNecessary(t.$el, "ally-instructorfeedback", function(n) {
                            var i = bt.findContainingRichContent(s),
                                o = {
                                    filePreviewUrl: s.getFilePreviewUrl(),
                                    issue: h,
                                    locale: e.config.locale,
                                    locator: s.getRichContentLocator(e),
                                    richContentId: i ? i.getRichContentEid() : null,
                                    target: E,
                                    windowLauncher: e.config.instructorFeedback.windowLauncher,
                                    windowTitle: y
                                },
                                c = {
                                    closed: function() {
                                        return t.$el.focus()
                                    },
                                    fixHtmlIssue: function(t, n, r) {
                                        return Object(l.b)(a, void 0, void 0, function() {
                                            var i, o;
                                            return Object(l.d)(this, function(a) {
                                                switch (a.label) {
                                                    case 0:
                                                        return i = s.type === pt.file && "d2l" === p && u.mimeType === Ot.a.ApplicationXHtmlFragment, s.type === pt.richContent || i ? (o = wt, [4, e.client.applyWysiwygFix(f, I.id(), {
                                                            fixOptions: r,
                                                            locators: n,
                                                            rulename: t
                                                        })]) : [3, 2];
                                                    case 1:
                                                        o.apply(void 0, [a.sent(), i]), a.label = 2;
                                                    case 2:
                                                        return [2]
                                                }
                                            })
                                        })
                                    }
                                };
                            return E === v.Window && r(".ally-tooltip").remove(), _.launch(e, f, I, o, c), !1
                        })
                    } else t.$el.unbind("click.ally-instructorfeedback")
                } else if ("alternativeformats" !== d || s.type !== pt.file && s.type !== pt.richContent)
                    if ("alternativeformats" === d && s.type === pt.aaasContent)
                        if (u && u.availableAlternativeFormats && u.availableAlternativeFormats.length > 0) {
                            var A = s.getAaasDownloadUrl();
                            if (!i.c(A)) throw new Error("Cannot attach file alternative formats without specifying a download url");
                            this.bindClickIfNecessary(t.$el, "ally-alternativeformats", function() {
                                var n = {
                                        closeWhenFormatReady: a.getCloseWhenFormatReady(e.config.alternativeFormats),
                                        locale: e.config.locale,
                                        renderAudioOnMobileInline: a.getRenderAudioOnMobileInline(e.config.alternativeFormats)
                                    },
                                    r = {
                                        contentHash: u.id,
                                        url: A
                                    },
                                    i = a.getDefaultCallerCallbacks(t);
                                return w.launchAaasContent(e, c, n, r, i), !1
                            })
                        } else t.$el.unbind("click.ally-alternativeformats");
                else "alternativeformats" === d && s.type === pt.webpage && this.bindClickIfNecessary(t.$el, "ally-alternativeformats", function() {
                    var n = St.fromMain(s.$el),
                        r = {
                            closeWhenFormatReady: a.getCloseWhenFormatReady(e.config.alternativeFormats),
                            locale: e.config.locale,
                            renderAudioOnMobileInline: a.getRenderAudioOnMobileInline(e.config.alternativeFormats)
                        },
                        o = a.getDefaultCallerCallbacks(t),
                        l = t.getDataAllyAttrValue("invoke-direct-file"),
                        u = Lt.fromEl(t.$el);
                    if (i.c(l) && i.c(u)) {
                        var d = a.resolveFilenameFromUrl(u.href),
                            f = a.resolveMimeAndFileType(d),
                            p = f[0],
                            h = {
                                fileType: f[1],
                                href: u.href,
                                id: "semi-random-link",
                                mimeType: p,
                                text: i.c(u.text) ? u.text : u.href,
                                url: u.href
                            };
                        w.launchDirectFileOnWebpage(e, c, n, r, h, o)
                    } else w.launchWebpage(e, c, n, r, o);
                    return !1
                });
                else {
                    var T = e.config.courseId;
                    if (null === T) throw new Error("Cannot attach file alternative formats without specifying a course id in ally.ui config");
                    u && u.availableAlternativeFormats && u.availableAlternativeFormats.length > 0 ? this.bindClickIfNecessary(t.$el, "ally-alternativeformats", function() {
                        var n = [];
                        s.type === pt.richContent && (n = a.getAssociatedFiles(s, m(e) ? g : function() {
                            return !0
                        }));
                        var r = {
                                associatedFiles: n,
                                closeWhenFormatReady: a.getCloseWhenFormatReady(e.config.alternativeFormats),
                                locale: e.config.locale,
                                renderAudioOnMobileInline: a.getRenderAudioOnMobileInline(e.config.alternativeFormats)
                            },
                            i = a.getDefaultCallerCallbacks(t);
                        return w.launchFile(e, T, c, u, r, i), !1
                    }) : t.$el.unbind("click.ally-alternativeformats")
                }
            }, t.prototype.getAssociatedFiles = function(e, t) {
                var n = this,
                    r = bt.fromRoot(e.$el);
                return Object.values(r).filter(function(e) {
                    return e.type === pt.file
                }).filter(t).map(function(e) {
                    var t = e.getFileEid();
                    if (i.c(t)) {
                        var r = e.$el.text().trim();
                        return i.c(r) && "" !== r ? i.c(r) && 0 === r.indexOf("http") && (r = n.resolveFilenameFromUrl(r)) : r = null, {
                            externalId: t,
                            title: r
                        }
                    }
                }).filter(i.c)
            }, t.prototype.resolveIssue = function(e) {
                var t = e.getDataAllyAttrValue("invoke-prop-issue");
                return null !== t && "" !== t ? t : null
            }, t.prototype.resolveTarget = function(e) {
                return "window" === e.getDataAllyAttrValue("invoke-prop-target") ? v.Window : v.Iframe
            }, t.prototype.resolveWindowTitle = function(e, t, n) {
                var r = t.getDataAllyAttrValue("invoke-prop-window-title");
                return null !== r && "" !== r ? r : n && void 0 !== n.name ? e.i18n.INSTRUCTOR_FEEDBACK_FOR.replace("{0}", n.name) : e.i18n.INSTRUCTOR_FEEDBACK
            }, t.prototype.bindClickIfNecessary = function(e, t, n) {
                var i = r._data(e[0], "events"),
                    o = (i ? i.click.filter(function(e) {
                        return e.namespace === t
                    }) : [])[0];
                (void 0 === o ? null : o) || e.bind("click." + t, n)
            }, t.prototype.getRenderAudioOnMobileInline = function(e) {
                return i.c(e.formats) ? e.formats.renderAudioOnMobileInline : void 0
            }, t.prototype.getCloseWhenFormatReady = function(e) {
                return i.c(e.formats) ? e.formats.closeWhenFormatReady : void 0
            }, t.prototype.getDefaultCallerCallbacks = function(e) {
                return {
                    closed: function() {
                        return e.$el.focus()
                    }
                }
            }, t.prototype.resolveFilenameFromUrl = function(e) {
                var t = Ge(e).pathname.split("/").pop();
                return i.d(t, "unknown")
            }, t.prototype.resolveMimeAndFileType = function(e) {
                var t = e.toLowerCase().split(".").pop();
                return "pdf" === t ? ["application/pdf", "pdf"] : "doc" === t || "docx" === t ? ["application/msword", "document"] : "ppt" === t || "pptx" === t ? ["application/application/vnd.ms-powerpoint", "presentation"] : "html" === t || "htm" === t ? ["text/html", "html-file"] : ["application/octet-stream", "unknown"]
            }, t
        }(Ct)),
        Rt = n(7),
        Ft = new(function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return Object(l.c)(t, e), t.prototype.isApplicable = function(e, t, n, r) {
                return t.hasDataAllyAttr("show")
            }, t.prototype.run = function(e, t, n, r) {
                var o = this,
                    a = t.getContentInstanceId(),
                    s = i.d(t.getDataAllyAttrValue("show"), "").split(" "),
                    l = i.d(t.getDataAllyAttrValue("show-display"), "block");
                bt.findContentInstances(n, a).filter(function(e) {
                    return s.filter(function(n) {
                        return o.shouldShow(t, n, e, r[e.getId()])
                    }).length > 0
                }).length > 0 ? t.$el.css("display", l) : t.$el.hide()
            }, t.prototype.shouldShow = function(e, t, n, r) {
                if (i.c(r)) {
                    if (0 === t.indexOf("instructorfeedback")) {
                        var o = this.shouldShowInstructorFeedback(e, n, r);
                        if (i.c(o)) {
                            var a = o;
                            return "instructorfeedback" === t || t === "instructorfeedback-score-" + Rt.a.scoreLabel(a)
                        }
                        return !1
                    }
                    if ("alternativeformats" === t && (n.type === pt.file || n.type === pt.richContent || n.type === pt.aaasContent) && r.availableAlternativeFormats && r.availableAlternativeFormats.length > 0) return !0;
                    if ("seizureinducing" === t && !0 === r.seizureRisk) return !0
                } else if ("alternativeformats" === t && n.type === pt.webpage) return !0;
                return !1
            }, t.prototype.shouldShowInstructorFeedback = function(e, t, n) {
                return "number" == typeof n.score ? "IMG" !== t.$el[0].tagName ? n.score : !0 === n.seizureRisk ? n.score : "true" === e.getDataAllyAttrValue("show-always-show-for-image") ? n.score : It.isMeaningful(t.getSourceAttrValue("alt"), n.name) ? bt.findContainingRichContent(t) ? n.score : null : n.score : null
            }, t
        }(Ct)),
        Pt = new(function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return Object(l.c)(t, e), t.prototype.isApplicable = function(e, t, n, r) {
                var i = t.$el.is("[title]") || t.$el.is("[aria-label]");
                return t.hasDataAllyAttr("tooltip") && i
            }, t.prototype.run = function(e, t, n, r) {
                o(), t.$el.addClass("ally-add-tooltip")
            }, t
        }(Ct)),
        kt = function() {
            function e() {}
            return e.resolveSupportedLanguage = function(e) {
                return this.hasAllyLanguageSupport(e) ? e : -1 !== e.indexOf("-") ? this.resolveSupportedLanguage(e.split("-").slice(0, -1).join("-")) : e
            }, e.hasAllyLanguageSupport = function(e) {
                return this.allI18n["__" + e]
            }, e.allI18n = n(77), e
        }(),
        Dt = function() {
            function e() {}
            return e.run = function(e, t, n, r, i) {
                i.forEach(function(i) {
                    i.isApplicable(e, t, n, r) && i.run(e, t, n, r)
                })
            }, e
        }(),
        xt = new(function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return Object(l.c)(t, e), t.prototype.isApplicable = function(e, t, n, r) {
                return t.hasDataAllyAttr("scoreindicator") && 0 === t.$el.find("*").length
            }, t.prototype.run = function(e, t, n, r) {
                var o = n[t.getContentInstanceId()],
                    a = i.d(t.getDataAllyAttrValue("scoreindicator"), ""),
                    s = i.d(t.getDataAllyAttrValue("show-always-show-for-image"), "false"),
                    l = C.apply({
                        alwaysShowForImage: s,
                        baseUrl: e.client.config.baseUrl,
                        contentId: o.getId(),
                        customIconSet: e.config.instructorFeedback.customIconSet,
                        i18n: e.i18n,
                        style: this.resolveScoreIndicatorStyle(e, a),
                        target: this.resolveTarget(t)
                    });
                t.$el.attr(_t.getDataAllyAttrName("show"), "instructorfeedback"), t.$el.empty().append(l)
            }, t.prototype.resolveScoreIndicatorStyle = function(e, t) {
                var n = I.standard;
                return "custom" === t ? n = I.custom : "circle" === t ? n = I.circle : "learnUltra" === t && (n = I.learnUltra), n !== I.standard && n !== I.circle || m(e) && (n = I.learnUltra), n
            }, t.prototype.resolveTarget = function(e) {
                var t = e.getDataAllyAttrValue("scoreindicator-target");
                return "window" === t ? v.Window : "iframe" === t ? v.Iframe : void 0
            }, t
        }(Dt)),
        Mt = function() {
            function e(e) {
                this.$el = e
            }
            return e.fromRoot = function(t) {
                return t.find("[" + _t.getDataAllyAttrName("content-ref") + "]").toArray().map(function(t) {
                    return new e(r(t))
                })
            }, e.prototype.getContentInstanceId = function() {
                return this.getDataAllyAttrValue("content-ref")
            }, e.prototype.getDataAllyAttrValue = function(e) {
                var t = this.$el.attr(_t.getDataAllyAttrName(e));
                return void 0 !== t ? t : null
            }, e.prototype.hasDataAllyAttr = function(e) {
                return this.$el.is("[" + _t.getDataAllyAttrName(e) + "]")
            }, e
        }(),
        Bt = function() {
            function e() {}
            return e.$mock = function(e, t, n, r) {
                void 0 === e && (e = {}), void 0 === t && (t = {}), void 0 === r && (r = {});
                var o = /^.*\/api\/v1\/([^\/]+)\/reports\/courses\/([^\/]+)$/,
                    a = /^.*\/api\/v1\/([^\/]+)\/reports\/courses\/([^\/]+)\/content(\?|$)/,
                    s = /^.*\/api\/v2\/clients\/([^\/]+)\/courses\/([^\/]+)\/(files|rich-content)\/([^\/]+)\/report(\?|$)/,
                    l = /^.*\/api\/v1\/([^\/]+)\/courses\/([^\/]+)\/files\/([^/?]+)$/,
                    u = /^.*\/api\/v1\/[0-9]+\/help$/,
                    d = /^.*\/api\/v1\/([^\/]+)\/courses\/([^\/]+)\/files\/([^\/?]+)\/embedInfo$/,
                    f = /^.*\/api\/v1\/([^\/]+)\/content\/generateFeedback\/axe$/,
                    p = /^.*\/api\/v1\/([^\/]+)\/courses\/([^\/]+)\/files\/([^\/?]+)\/help\/sendExpertInstructorFeedbackHelp$/,
                    h = /^.*\/api\/v2\/clients\/([^\/]+)\/courses\/([^\/]+)\/rich-content\/([^\/?]+)\/files$/,
                    m = /^.*\/api\/v2\/clients\/([^\/]+)\/content\/batch(\?|$)/,
                    g = {};
                return {
                    ajax: function(v) {
                        if (void 0 !== g[v.url]) return v.success(g[v.url]);
                        var E = v.url.match(o),
                            y = v.url.match(a),
                            I = v.url.match(d),
                            _ = v.url.match(f),
                            A = v.url.match(s),
                            T = v.url.match(h);
                        if (null !== E && E.length > 0) {
                            var b = E[2],
                                O = r[b];
                            void 0 !== O ? v.success(O) : v.error({
                                responseText: "Not Found",
                                status: 404
                            }, "error", "Not Found")
                        } else if (null !== y && y.length > 0) {
                            var C = y[2],
                                L = {
                                    uploadsReport: JSON.parse(v.data).map(function(t) {
                                        var n = e[C];
                                        if (i.c(n)) {
                                            var r = null;
                                            if ("File" === t.uploadType) r = n.File[t.id];
                                            else if ("RichContent" === t.uploadType) {
                                                var o = n.RichContent[t.id];
                                                i.c(o) && (r = o.report)
                                            }
                                            return r
                                        }
                                        return null
                                    })
                                };
                            v.success(L)
                        } else if (null !== A && A.length > 0) {
                            b = decodeURIComponent(A[2]);
                            var S = "rich-content" === A[3] ? "RichContent" : "File",
                                w = decodeURIComponent(A[4]),
                                N = void 0;
                            N = "RichContent" === S ? e[b].RichContent[w].report : e[b].File[w];
                            var R = c.d(Object.keys(N.results).map(function(e) {
                                    return e
                                }), Object.values(N.results).map(function(e) {
                                    return {
                                        score: e
                                    }
                                })),
                                F = i.d(N.availableAlternativeFormats, []),
                                P = i.d(N.newAlternativeFormats, []),
                                k = {
                                    feedback: {
                                        report: {
                                            results: R,
                                            score: Number(N.score),
                                            suggestions: N.suggestions
                                        }
                                    },
                                    formats: {
                                        available: F.length > 0,
                                        availableFormats: F,
                                        canToggleAvailability: !0,
                                        newAlternativeFormats: P,
                                        visibility: F.length > 0
                                    },
                                    id: N.id,
                                    metadata: {
                                        decorative: N.decorative,
                                        description: N.description,
                                        fileType: N.type,
                                        isSeizureInducing: N.seizureRisk,
                                        isVersioned: Boolean(N.isVersioned),
                                        libraryReference: N.libraryReference,
                                        mimeType: String(N.mimeType),
                                        name: N.name
                                    }
                                };
                            v.success(k)
                        } else if (null !== T && T.length > 0) {
                            b = decodeURIComponent(T[2]), w = decodeURIComponent(T[3]);
                            var D = e[b].RichContent[w].linkedFiles;
                            v.success({
                                results: D
                            })
                        } else if (l.test(v.url)) v.success({
                            alternativeFormatsEnabled: !0,
                            disabledFormats: []
                        });
                        else if (null !== I && I.length > 0) {
                            b = I[2];
                            var x = I[3],
                                M = t[b],
                                B = {
                                    status: "Pending",
                                    urls: {
                                        original: null,
                                        pdf: null
                                    }
                                };
                            i.c(M) && i.c(M[x]) && (B = M[x]), v.success(B)
                        } else if (null !== _ && _.length > 0) {
                            v.success({
                                explanationData: {
                                    type: "Webpage"
                                },
                                feedback: {
                                    score: .11
                                }
                            })
                        } else if (u.test(v.url)) "instructor" === v.data.targetGroup ? v.success(i.c(n) ? n.instructor : null) : "student" === v.data.targetGroup && v.success(i.c(n) ? n.student : null);
                        else if (p.test(v.url)) v.success("OK");
                        else if (m.test(v.url) && i.c(v.data)) {
                            var H = JSON.parse(v.data).references.map(function(t) {
                                return e[0].File[t.hash]
                            }).map(function(e) {
                                if (!i.c(e)) return null;
                                var t = i.d(e.availableAlternativeFormats, []),
                                    n = i.d(e.newAlternativeFormats, []),
                                    r = null,
                                    o = null,
                                    a = i.e(e.suggestions);
                                return i.c(e.results) && (o = c.d(Object.keys(e.results).map(function(e) {
                                    return e
                                }), Object.values(e.results).map(function(e) {
                                    return {
                                        score: e
                                    }
                                }))), i.c(e.score) && i.c(o) && i.c(a) && (r = {
                                    report: {
                                        results: o,
                                        score: e.score,
                                        suggestions: a
                                    },
                                    visibility: Rt.a.scoreLabel(e.score)
                                }), {
                                    feedback: r,
                                    formats: {
                                        available: t.length > 0,
                                        availableFormats: t,
                                        canToggleAvailability: !1,
                                        newAlternativeFormats: n,
                                        visibility: t.length > 0
                                    },
                                    hash: e.id,
                                    metadata: {
                                        decorative: i.e(e.decorative),
                                        description: i.e(e.description),
                                        fileType: e.type,
                                        libraryReference: null,
                                        mimeType: String(e.mimeType),
                                        name: i.d(e.name, "File name")
                                    }
                                }
                            });
                            v.success({
                                reports: H
                            })
                        } else console.log("Unknown URL hitting mock: " + v.url), v.error({
                            code: 404
                        })
                    },
                    hardcodeResponse: function(e, t) {
                        return g[e] = t
                    },
                    set: function(t) {
                        e = t
                    }
                }
            }, e
        }(),
        Ht = n(4),
        jt = n(78),
        Ut = 0,
        Yt = function(e) {
            return Vt.fromConfigObject(window, e, Vt.allDirectives, Vt.allMacros)
        };
    Yt.nextContentId = function() {
        return (++Ut).toString()
    }, Yt.$mock = Bt.$mock;
    var Wt, Vt = function() {
            function e(e) {
                var t = this;
                this.autoUpdates = [], this.domWatches = [], this.onDestroyHandlers = [], this.isListeningOnIframe = !1, this.config = e, this.client = Object(s.a)(e.client, e.platformName), this.i18n = kt.allI18n, this.i18n.init(kt.resolveSupportedLanguage(e.locale)), _.onContentDeleted("ui", function(e) {
                    return t.doAutoUpdate(e)
                }), _.onContentReplaced("ui", function(e, n) {
                    return t.doAutoUpdate(e, n.id)
                }), _.onContentUpdated("ui", function(e) {
                    return t.doAutoUpdate(e.id)
                })
            }
            return e.fromConfigObject = function(t, n, r, i) {
                var o = new e(E.from(t, n, r, i));
                return yt.annotate(o, t), o
            }, e.addStylesheet = function(e, t, n) {
                if (0 === r('.ally-styles[href="' + e + '"]').length) {
                    var o = r("<link />", {
                            class: "ally-styles",
                            href: e,
                            id: t,
                            rel: "stylesheet"
                        }),
                        a = i.d(n, document.head);
                    r(a).append(o)
                }
            }, e.prototype.autoUpdate = function(e) {
                var t = this;
                void 0 === e && (e = {});
                var n = e.el ? e.el : this.config.contentRoot;
                this.autoUpdates.push({
                    el: n
                });
                var r = i.d(e.preHook, function() {
                    return !0
                });
                return (r() ? this.update(n) : Promise.resolve()).then(function() {
                    var o = null;
                    return i.d(e.domWatch, 0) > 0 && (o = setInterval(function() {
                        r() && t.update(n)
                    }, e.domWatch), t.domWatches.push(o)), {
                        intervalHandler: o
                    }
                })
            }, e.prototype.update = function(e) {
                var t = this,
                    n = i.c(e) ? e : this.config.contentRoot,
                    o = bt.fromRoot(r(this.config.contentRoot));
                return this.getFileReportMapIfNecessary(o).then(function(e) {
                    t.initStyles(), t.listenOnIframeIfNecessary(o, e), Object.keys(e).forEach(function(n) {
                        return o[n].applyAllyWorkArounds(t, e[n])
                    }), Mt.fromRoot(r(n)).forEach(function(n) {
                        bt.findContentInstances(o, n.getContentInstanceId()).length > 0 && Dt.run(t, n, o, e, t.config.macros)
                    }), Mt.fromRoot(r(n)).forEach(function(n) {
                        bt.findContentInstances(o, n.getContentInstanceId()).length > 0 && Ct.run(t, n, o, e, t.config.directives)
                    })
                })
            }, e.prototype.destroy = function() {
                var e = this;
                return this.domWatches.forEach(function(e) {
                    return clearInterval(e)
                }), this.domWatches = [], this.autoUpdates = [], _.destroy(), w.destroy(), Tt.destroyAll(), this.runAllSafe(this.onDestroyHandlers).then(function() {
                    return e.onDestroyHandlers = []
                }).then(function() {})
            }, e.prototype.onDestroy = function(e) {
                this.onDestroyHandlers.push(e)
            }, e.prototype.runAllSafe = function(e) {
                var t = this,
                    n = e.shift();
                if (!i.c(n)) return Promise.resolve();
                try {
                    return n().catch(function(e) {
                        return console.error(e)
                    }).then(function() {
                        return t.runAllSafe(e)
                    })
                } catch (t) {
                    return console.error(t), this.runAllSafe(e)
                }
            }, e.prototype.getFileReportMapIfNecessary = function(e) {
                var t = this.config.courseId,
                    n = {};
                return Object.keys(e).forEach(function(t) {
                    var r = e[t].getFileReference();
                    i.c(r) && (n[t] = r.data())
                }), this.isLmsOrWebContext() && i.c(t) ? this.client.getFileReports(t, n) : this.isAaaContext() ? this.client.getFileReports("irrelevant", n) : Promise.resolve({})
            }, e.prototype.isLmsOrWebContext = function() {
                return "AaaS" !== this.config.platformName
            }, e.prototype.isAaaContext = function() {
                return "AaaS" === this.config.platformName
            }, e.prototype.listenOnIframeIfNecessary = function(e, t) {
                this.isActive(e, t) && this.listenOnIframe()
            }, e.prototype.isActive = function(e, t) {
                return 0 !== c.c(e).filter(function(e) {
                    return e.type === pt.webpage
                }).length || c.c(t).length > 0
            }, e.prototype.listenOnIframe = function() {
                var e = this;
                this.isListeningOnIframe || (this.isListeningOnIframe = !0, Ht.listen("http", function(t, n, r) {
                    var i = {
                        crossDomain: !0,
                        data: t.parameters,
                        type: t.method,
                        url: t.path,
                        xhrFields: {
                            withCredentials: !1
                        }
                    };
                    t.opts && t.opts.contentType && (i.contentType = t.opts.contentType), t.opts && t.opts.headers && (i.headers = t.opts.headers), e.client.authenticateAndExec(i).then(function(e) {
                        return Ht.send(r.source, "http-response", {
                            response: e
                        }, n)
                    }).catch(function(e) {
                        return Ht.send(r.source, "http-response", {
                            err: e
                        }, n)
                    })
                }), Ht.listen("sign", function(t, n, r) {
                    var i = {
                        data: t.parameters,
                        url: t.path
                    };
                    e.client.authenticate(i).then(function(e) {
                        var t = e;
                        t.parameters = e.data, Ht.send(r.source, "sign-response", {
                            response: t
                        }, n)
                    }).catch(function(e) {
                        return Ht.send(r.source, "sign-response", {
                            err: e
                        }, n)
                    })
                }), Ht.listen("getDownloadUrl", function(t, n, r) {
                    e.getFileDownloadUrl(t.parameters.fileId).then(function(e) {
                        return Ht.send(r.source, "getDownloadUrl-response", {
                            response: e
                        }, n)
                    }).catch(function(e) {
                        return Ht.send(r.source, "getDownloadUrl-response", {
                            err: e
                        }, n)
                    })
                }), Ht.listen("platformui", function(t, n, r) {
                    Ht.send(r.source, "platformui-response", e.config.platformUi, n)
                }))
            }, e.prototype.getFileDownloadUrl = function(e) {
                var t = this;
                return new Promise(function(n, r) {
                    if (t.config.instructorFeedback.getFileDownloadUrl) {
                        var i = t.config.instructorFeedback.getFileDownloadUrl(e, function(e, t) {
                            e ? r(e) : n(t)
                        });
                        i && (i.then(n), i.catch(r))
                    } else r({
                        code: 501,
                        msg: "File downloads are not supported"
                    })
                })
            }, e.prototype.initStyles = function() {
                e.addStylesheet(this.resourcePath(jt), "ally-styles")
            }, e.prototype.doAutoUpdate = function() {
                for (var e = this, t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                t.forEach(function(t) {
                    return e.client.clearFileIdFromCache(t)
                });
                var r = this.autoUpdates.map(function(t) {
                    return function() {
                        return e.update(t.el)
                    }
                });
                return this.seq(r)
            }, e.prototype.seq = function(e, t) {
                var n = this;
                void 0 === t && (t = []);
                var r = e.shift();
                return r ? r().then(function(r) {
                    return n.seq(e, t.concat(r))
                }) : Promise.resolve(t)
            }, e.prototype.resourcePath = function(e) {
                return this.client.config.baseUrl + "/" + e
            }, e.allMacros = [xt], e.allDirectives = [Nt, Ft, Pt], e
        }(),
        Gt = n(17);
    ! function(e) {
        e[e.NoConfigObjectAvailable = 0] = "NoConfigObjectAvailable", e[e.NotAD2lPlatform = 1] = "NotAD2lPlatform", e[e.NotASupportedPageType = 2] = "NotASupportedPageType"
    }(Wt || (Wt = {}));
    var Kt, qt = /^\/d2l\/le\/content\/\d+\/Home/,
        zt = /^\/d2l\/le\/content\/\d+\/viewContent\/\d+\/View/;
    ! function(e) {
        e[e.TableOfContents = 0] = "TableOfContents", e[e.IndividualContentView = 1] = "IndividualContentView", e[e.NewContentExperienceView = 2] = "NewContentExperienceView"
    }(Kt || (Kt = {}));
    var $t, Xt = function() {
        function e(e, t, n, r, i, o, a, s) {
            this.baseUrl = e, this.clientId = t, this.courseId = n, this.locale = r, this.roles = i, this.jwtToken = o, this.parsedToken = a, this.pageType = s
        }
        return e.fromPage = function(t, n, r) {
            var o = i.d(n.attr("src"), "");
            if ("" !== o && -1 !== o.indexOf("platform-name=d2l")) {
                if (r) {
                    var a = o.split("/").slice(0, 3).join("/"),
                        s = this.parseJwtToken(r.token),
                        l = function(e) {
                            if (qt.test(e.pathname)) return Kt.TableOfContents;
                            if (zt.test(e.pathname)) return Kt.IndividualContentView;
                            if (-1 !== e.pathname.indexOf("/apps/smart-curriculum")) return Kt.NewContentExperienceView;
                            return console.warn("unsupported page type", e.pathname), null
                        }(t);
                    return i.c(l) ? new e(a, r.clientId, s.course_id, s.locale, s.roles.split(","), r.token, s, l) : Wt.NotASupportedPageType
                }
                return Wt.NoConfigObjectAvailable
            }
            return Wt.NotAD2lPlatform
        }, e.parseJwtToken = function(e) {
            return Gt(e)
        }, e
    }();
    ! function(e) {
        e[e.IndividualContentViewItem = 0] = "IndividualContentViewItem", e[e.ContentViewImage = 1] = "ContentViewImage", e[e.TableOfContentsTopicLink = 2] = "TableOfContentsTopicLink", e[e.TableOfContentsModule = 3] = "TableOfContentsModule", e[e.TableOfContentsChildModule = 4] = "TableOfContentsChildModule", e[e.NewContentExperienceView = 5] = "NewContentExperienceView"
    }($t || ($t = {}));
    var Zt = function() {
            function e() {}
            return e.prototype.annotate = function(e, t, n) {
                t.$el.attr("data-ally-file-eid", t.eid), t.$el.attr("data-ally-content-ref", t.id);
                var i = t.$el.attr("src"),
                    o = document.location,
                    a = o.protocol + "//" + o.host + i;
                return r(".d2l-button[data-ally-content-id]").attr("data-ally-file-preview-url", a), !0
            }, e
        }(),
        Qt = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.template = n(81), t.blackAfIcon = n(16), t
            }
            return Object(l.c)(t, e), t.prototype.apply = function(e) {
                return r(this.template(Object(l.a)(Object(l.a)({}, e), {
                    aafIcon: this.blackAfIcon
                })))
            }, t
        }(d),
        Jt = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.template = n(82), t
            }
            return Object(l.c)(t, e), t.prototype.apply = function(e) {
                var t = this.resolveTarget(e),
                    n = Object(l.a)(Object(l.a)({}, e), {
                        target: t
                    });
                return r(this.template(n))
            }, t.prototype.resolveTarget = function(e) {
                return e.target === v.Iframe || e.target === v.Window ? e.target : v.Iframe
            }, t
        }(d),
        en = function() {
            function e() {}
            return e.prototype.annotate = function(e, t, n) {
                var i = !1;
                if (e.parsedToken.can_download_content) {
                    t.$el.attr("data-ally-file-eid", t.eid);
                    var o = t.$el.parent(),
                        a = new Qt,
                        s = r(a.apply({
                            baseUrl: e.baseUrl,
                            contentRef: t.id,
                            i18n: n.i18n
                        }));
                    o.append(s), i = !0
                }
                if (e.parsedToken.can_update_content) {
                    var l = new Jt,
                        c = r(l.apply({
                            contentRef: t.id
                        }));
                    r(".d2l-page-header .d2l-page-header-side > .d2l-inline").first().prepend(c), i = !0
                }
                return i
            }, e
        }(),
        tn = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.template = n(83), t.aafIcon = n(16), t
            }
            return Object(l.c)(t, e), t.prototype.apply = function(e) {
                return r(this.template(Object(l.a)(Object(l.a)({}, e), {
                    aafIcon: this.aafIcon
                })))
            }, t
        }(d),
        nn = function() {
            function e() {}
            return e.prototype.annotate = function(e, t, n) {
                var i = !1,
                    o = t.$el.parents(".content-panel").find("#content-header .header-button-tray"),
                    a = o.find(".ally-container");
                if (0 === a.length ? (a = r('<div class="ally-container" />'), o.prepend(a)) : a.children().remove(), e.parsedToken.can_update_content) {
                    "img" === t.$el[0].tagName.toLowerCase() && (t.$el.attr("data-ally-file-preview-url", t.$el.attr("src")), t.$el.attr("alt", null));
                    var s = new Jt,
                        l = r(s.apply({
                            contentRef: t.id,
                            target: v.Window
                        }));
                    a.prepend(l), i = !0
                }
                if (e.parsedToken.can_download_content) {
                    var c = new tn,
                        u = r(c.apply({
                            baseUrl: e.baseUrl,
                            contentRef: t.id,
                            i18n: n.i18n
                        }));
                    a.prepend(u), i = !0
                }
                return i
            }, e
        }(),
        rn = function() {
            function e() {}
            return e.prototype.annotate = function(e, t, n) {
                t.$el.attr("data-ally-richcontent-eid", t.eid);
                var i = new tn,
                    o = r(i.apply({
                        baseUrl: e.baseUrl,
                        contentRef: t.id,
                        i18n: n.i18n
                    }));
                return t.$el.prepend(o), !0
            }, e
        }(),
        on = function() {
            function e() {}
            return e.prototype.annotate = function(e, t, n) {
                t.$el.attr("data-ally-file-eid", t.eid);
                var i = t.$el.parents(".d2l-topic-view").parent(),
                    o = i.find(".d2l-topic-view");
                o.addClass("ally-d2l-toc-topic-view");
                var a = i.parents("ul.d2l-datalist");
                i.find(".d2l-menuflyout-custom-content").length > 0 && (a.addClass("ally-d2l-toc-with-draft"), i.addClass("ally-d2l-toc-row-with-draft")), this.canViewOnly(e.parsedToken) && a.addClass("ally-d2l-toc-aafs-only");
                var s = r('<div class="ally-d2l-toc-column" />');
                if (e.parsedToken.can_download_content) {
                    var l = new tn,
                        c = r(l.apply({
                            baseUrl: e.baseUrl,
                            contentRef: t.id,
                            i18n: n.i18n
                        }));
                    s.append(c)
                }
                if (e.parsedToken.can_update_content) {
                    var u = new Jt,
                        d = r(u.apply({
                            contentRef: t.id
                        }));
                    s.append(d)
                }
                return s.children().length > 0 && s.insertAfter(o), !0
            }, e.prototype.canViewOnly = function(e) {
                return e.can_download_content && !e.can_update_content && !e.can_delete_content && !e.can_create_content
            }, e
        }();
    var an = /^d2l_content_[\d]+_([\d]+)$/,
        sn = function() {
            function e(e, t, n, r) {
                this.type = e, this.$el = t, this.id = n, this.eid = r
            }
            return e.fromPage = function(t, n) {
                switch (t.pageType) {
                    case Kt.TableOfContents:
                        var o = n.find("ul.d2l-datalist .d2l-topic-view .d2l-link").toArray().map(function(t) {
                                return e.fromElement(r(t), $t.TableOfContentsTopicLink)
                            }),
                            a = n.find(".d2l-htmlblock").toArray().map(function(t) {
                                return e.moduleFromHtmlBlock(r(t))
                            });
                        return c.a(o.concat(a));
                    case Kt.IndividualContentView:
                        var s = n.find("#ContentView").next();
                        i.c(s.attr("id")) || s.attr("id", "d2l_btn_bar");
                        var l = s.find('.d2l-button[id*="d2l_content_"]'),
                            u = e.extractIdsFromElement(l);
                        if (i.c(u)) {
                            var d = u[0],
                                f = u[1],
                                p = [];
                            p.push(new e($t.IndividualContentViewItem, l, d, f));
                            var h = n.find(".d2l-fileviewer-image img.d2l-fileviewer-rendered-image");
                            if (h.length > 0) {
                                var m = "ally_d2l_" + f;
                                h.attr("id", m), p.push(new e($t.ContentViewImage, h, m, f))
                            }
                            return p
                        }
                        return [];
                    case Kt.NewContentExperienceView:
                        var g = r(".content-panel"),
                            v = g.find("a#ally-content-item"),
                            E = e.extractIdsFromElement(g);
                        if (i.c(E)) {
                            d = E[0], f = E[1];
                            var y = v,
                                I = g.find(".vui-fileviewer-image-container img.vui-fileviewer-image");
                            return 1 === I.length ? (y = I, v.remove()) : 0 === v.length && (v = r('<a id="ally-content-item" href="" style="display: none"></a>'), g.append(v), y = v), y.attr("data-ally-file-eid") !== f && (y.attr("data-ally-file-eid", f), y.attr("data-ally-content-id", null)), [new e($t.NewContentExperienceView, y, d, f)]
                        }
                        return v.remove(), g.find(".ally-container").remove(), []
                }
            }, e.fromElement = function(t, n) {
                var r = e.extractIdsFromElement(t);
                return i.c(r) ? new e(n, t, r[0], r[1]) : null
            }, e.extractIdsFromElement = function(e) {
                var t, n, r = e.attr("id");
                if ("string" == typeof r) {
                    var o = (t = 1, (n = an.exec(r)) ? i.e(n[t]) : null);
                    return i.c(o) ? [r, o] : null
                }
                return null
            }, e.moduleFromHtmlBlock = function(t) {
                var n = t.parents(".d2l-datalist").length;
                if (1 === n) {
                    var r = t.parents(".d2l-collapsepane").find(".d2l-expandcollapse").data("key");
                    if (i.c(r)) {
                        var o = "application/x-module:" + r;
                        return new e($t.TableOfContentsModule, t, o, o)
                    }
                    return null
                }
                if (2 === n) {
                    r = t.closest(".d2l-datalist-item-content").find("d2l-dropdown,d2l-dropdown-context-menu").data("placeholderkey");
                    if (i.c(r)) {
                        o = "application/x-module:" + r;
                        return new e($t.TableOfContentsChildModule, t, o, o)
                    }
                    return null
                }
                var a = t.closest(".d2l-form").siblings(".d2l-placeholder").first().attr("id");
                if (i.c(a) && a.startsWith("placeholderid")) {
                    o = "application/x-module:" + (r = a.replace(/^placeholderid/, ""));
                    return new e($t.TableOfContentsChildModule, t, o, o)
                }
                return null
            }, e.prototype.annotate = function(e, t) {
                return !this.$el[0].hasAttribute("data-ally-content-id") && (this.$el.attr("data-ally-content-id", this.id), function(e) {
                    switch (e) {
                        case $t.IndividualContentViewItem:
                            return new en;
                        case $t.ContentViewImage:
                            return new Zt;
                        case $t.TableOfContentsTopicLink:
                            return new on;
                        case $t.NewContentExperienceView:
                            return new nn;
                        case $t.TableOfContentsModule:
                        case $t.TableOfContentsChildModule:
                            return new rn
                    }
                }(this.type).annotate(e, this, t))
            }, e
        }();
    var ln = function() {
            function e(e, t, n, r) {
                this.baseUrl = e, this.i18n = t, this.facade = n, this.hideAccessibilityPlugin = r, this.isFeedbackModeEnabled = !1, this.deactivated = !1, this.emitter = new N.EventEmitter, this.hideAccessibilityPlugin && this.facade.hideAccessibilityPlugin()
            }
            return e.prototype.activate = function(e) {
                return Object(l.b)(this, void 0, Promise, function() {
                    var t;
                    return Object(l.d)(this, function(n) {
                        return this.facade.annotateEditor(), this.hideAccessibilityPlugin && this.facade.hideAccessibilityPlugin(), (t = r('<div class="ally-score-meter-container-toolbar"></div>)')[0]).appendChild(e), this.addScoreMeter(t), this.indicator = t, document.body.classList.add("ally-wysiwyg-feedback-active"), i.f(this.facade.getContainer(), function(e) {
                            return r(e).parents('[data-fieldtype="editor"]').css("overflow", "visible")
                        }), [2]
                    })
                })
            }, e.prototype.addScoreMeter = function(e) {
                var t;
                null === (t = this.facade.getContainer()) || void 0 === t || t.prepend(e)
            }, e.prototype.applyFix = function(e, t, n) {
                var i;
                return Object(l.b)(this, void 0, Promise, function() {
                    var o;
                    return Object(l.d)(this, function(a) {
                        return o = r("<div></div>").html(this.facade.getContent()), null === (i = this.previewDriver) || void 0 === i || i.resetSelection(), Je(e, t, n, o[0]) && this.facade.saveContent(o[0].innerHTML), [2]
                    })
                })
            }, e.prototype.belongsToEditor = function(e) {
                var t = r(e),
                    n = this.facade.getContainer(),
                    o = [".mceListBoxMenu", ".tox", ".tox-menu", ".tox-dialog", '[data-mce-component="true"][role="dialog"]', ".d2l-htmleditor-wc"];
                return !!i.c(n) && (r.contains(n, e) || i.c(o.find(function(e) {
                    return t.is(e)
                })) || i.c(o.find(function(e) {
                    return t.parents(e).length > 0
                })))
            }, e.prototype.deactivate = function() {
                this.deactivated = !0, this.disableFeedbackMode(), this.facade.destroy(), document.body.classList.remove("ally-wysiwyg-feedback-active"), i.c(this.indicator) && (this.indicator.remove(), this.indicator = void 0)
            }, e.prototype.disableFeedbackMode = function() {
                this.facade.ensureNotFullScreen(), this.isFeedbackModeEnabled = !1, i.c(this.previewDriver) && (this.previewDriver.destroy(), this.previewDriver = void 0)
            }, e.prototype.isDeactivated = function() {
                return this.deactivated
            }, e.prototype.enableFeedbackMode = function(e) {
                this.isFeedbackModeEnabled = !0, this.facade.ensureFullScreen();
                var t = this.facade.getDocument();
                this.previewDriver = new Ue(this.baseUrl, this.i18n, {
                    contentContainer: t.body
                }, this.onSelection.bind(this)), this.previewDriver.start({
                    parentWindow: e,
                    preprocessInterval: !1
                })
            }, e.prototype.getFeedbackContainer = function() {
                var e;
                return null === (e = this.facade.getContainer()) || void 0 === e ? void 0 : e.parentElement
            }, e.prototype.onContentChange = function(e) {
                var t = this;
                this.facade.onChange(function() {
                    return e(t.facade.getContent())
                })
            }, e.prototype.onContentInit = function(e) {
                var t = this;
                this.facade.onInit(function() {
                    t.facade.isSupported() && e(t.facade.getContent())
                })
            }, e.prototype.onForceDisableFeedbackMode = function(e) {
                var t = this;
                this.facade.onFullScreenStateChanged(function(n) {
                    t.isFeedbackModeEnabled && !n && e()
                })
            }, e.prototype.getBlocks = function() {
                return this.facade.getBlocks()
            }, e.prototype.onSelection = function(e) {
                return Object(l.b)(this, void 0, Promise, function() {
                    return Object(l.d)(this, function(t) {
                        return this.emitter.emit("selection-changed", nt(e)), [2]
                    })
                })
            }, e.prototype.onSelectionChange = function(e) {
                this.emitter.on("selection-changed", e)
            }, e
        }(),
        cn = "tox-fullscreen";

    function un(e, t, n) {
        var i = r(t),
            o = r(e),
            a = o.find(".tox-editor-container"),
            s = o.find(".tox-editor-header");
        return n(o, i, a, s, [document.body, document.documentElement, e].map(function(e) {
            return r(e)
        }))
    }

    function dn(e, t) {
        var n = {};
        return e.forEach(function(e) {
            if ("width" === e || "height" === e) {
                var r = t[0].style[e];
                Object(i.c)(r) && (n[e] = r)
            } else n[e] = t.css(e)
        }), n
    }

    function fn(e, t) {
        Object.entries(e).forEach(function(e) {
            var n = e[0],
                r = e[1];
            return t.css(n, r)
        })
    }
    var pn, hn = function() {
            function e(t, n, r) {
                var i = this;
                void 0 === n && (n = window.tinymce), void 0 === r && (r = function(e) {
                    return console.error("Failed calling change callback", e)
                }), this.editor = t, this.tinymce = n, this.changeErrorHandler = r, this.changeCallbacks = [], this.currentViewButtonDisplayValue = "", this.doDestroy = function() {};
                var o = function() {
                    var e = i.getContent();
                    e !== i.lastChangeContent && (i.lastChangeContent = e, i.changeCallbacks.forEach(function(e) {
                        try {
                            e()
                        } catch (e) {
                            i.changeErrorHandler(e)
                        }
                    }))
                };
                this.isV3(t) ? (this.addListenerV3(t, t.onChange, o), this.addListenerV3(t, t.onKeyUp, o), this.addListenerV3(t, t.onSetContent, o), this.chainDestroy(function() {
                    return i.changeCallbacks.length = 0
                })) : (t.on("change", o), t.on("keyup", o), t.on("SetContent", o), this.chainDestroy(function() {
                    t.off("change", o), t.off("keyup", o), t.off("SetContent", o), i.changeCallbacks.length = 0
                })), this.onInit(function() {
                    t.serializer.addAttributeFilter(Object.values(Ue.customAttributes).join(","), e.filterAttributes)
                })
            }
            return e.filterAttributes = function(e, t) {
                e.forEach(function(e) {
                    for (var n = 0; n < e.attributes.length; n++)
                        if (e.attributes[n].name === t) {
                            e.attributes.splice(n, 1);
                            break
                        }
                }), delete e.map[t]
            }, e.parseStyles = function(e) {
                var t = {};
                return Object(i.c)(e) && e.split(";").map(function(e) {
                    return e.trim()
                }).filter(function(e) {
                    return e.length > 0
                }).forEach(function(e) {
                    var n = e.split(":")[0];
                    t[n.trim()] = e.substring(n.length + 1).replace(/"/g, "'").trim()
                }), t
            }, e.getEditor = function(e) {
                var t = e.getContainer(),
                    n = e.iframeElement;
                if (Object(i.c)(t) && Object(i.c)(n)) return [t, n]
            }, e.getViewButton = function(e) {
                var t, n, i = ".tox-mbtn:button:contains(" + (null === (n = null === (t = e.settings.menu) || void 0 === t ? void 0 : t.view) || void 0 === n ? void 0 : n.title) + ")";
                return r(i)
            }, e.prototype.annotateEditor = function() {
                Object(i.f)(this.editor.getContainer(), function(e) {
                    return r(e).addClass("ally-wysiwyg-feedback-tinymce")
                })
            }, e.prototype.onInit = function(e) {
                if (this.isV3(this.editor)) this.editor.initialized ? e() : this.addListenerV3(this.editor, this.editor.onInit, e);
                else {
                    var t = this.editor;
                    t.initialized ? e() : (t.on("init", function() {
                        return e()
                    }), this.chainDestroy(function() {
                        return t.off("init", e)
                    }))
                }
            }, e.prototype.onChange = function(e) {
                this.changeCallbacks.push(e)
            }, e.prototype.onPreProcess = function(e) {
                var t = this;
                if (this.isV3(this.editor)) {
                    var n = function() {
                        return e({
                            node: t.editor.getDoc().body
                        })
                    };
                    this.addListenerV3(this.editor, this.editor.onPreProcess, n), this.addListenerV3(this.editor, this.editor.onRedo, n), this.addListenerV3(this.editor, this.editor.onUndo, n)
                } else {
                    var r = this.editor,
                        i = function() {
                            return e({
                                node: r.getDoc().body
                            })
                        };
                    r.on("PreProcess", e), r.on("Redo", i), r.on("Undo", i), this.chainDestroy(function() {
                        r.off("PreProcess", e), r.off("Redo", i), r.off("Undo", i)
                    })
                }
            }, e.prototype.isSupported = function() {
                return !!this.isV3(this.editor) || (Object(i.c)(this.editor.plugins.fullscreen) || Object(i.c)(this.editor.plugins.instructure_fullscreen))
            }, e.prototype.getContainer = function() {
                return this.editor.getContainer()
            }, e.prototype.getDocument = function() {
                return this.editor.getDoc()
            }, e.prototype.getContent = function() {
                return this.editor.getContent({
                    source_view: !0
                })
            }, e.prototype.getBlocks = function() {
                return this.isV3(this.editor) ? this.getBlocksV3(this.editor) : (this.isV4orV5(this.editor), this.getBlocksV4V5V6(this.editor))
            }, e.prototype.saveContent = function(e) {
                this.editor.setContent(e), this.editor.save()
            }, e.prototype.hideAccessibilityPlugin = function() {
                if (!this.isV3(this.editor) && Object(i.c)(this.editor.ui)) {
                    var e = this.getContainer(),
                        t = this.editor.ui.registry.getAll().buttons.a11ycheck;
                    Object(i.c)(t) && Object(i.c)(e) && r(e).find('button[title="' + t.tooltip + '"]').css("display", "none")
                }
                0 === r("#ally-a11y-styles").length && r("head").append('<style id="ally-a11y-styles" type=\'text/css\'>\n/** Hiding the native a11y wysiwyg buttons in Canvas and D2l */\nbody.ally-wysiwyg-feedback-active [data-btn-id="rce-a11y-btn"],\nbody.ally-wysiwyg-feedback-active span > [data-btn-id="rce-a11y-btn"] + span,\nbody.ally-wysiwyg-feedback-active .mce-i-a11y {\n    display: none !important;\n}\n</style>')
            }, e.prototype.ensureFullScreen = function() {
                var e, t;
                this.isV3(this.editor) ? Object(i.f)(this.editor.getContainer(), function(e) {
                    var t = r(e);
                    t.parents("#mce_fullscreen_container").css("position", "static"), t.find(".mce_fullscreen").css("display", "none")
                }) : Object(i.c)(this.editor.plugins.instructure_fullscreen) ? this.enableInstructureFullscreen(this.editor) : Object(i.d)(null === (e = this.editor.plugins.fullscreen) || void 0 === e ? void 0 : e.isFullscreen(), !1) || this.editor.execCommand("mceFullscreen"), null === (t = this.getFullscreenContainer()) || void 0 === t || t.classList.add("ally-wysiwyg-feedback-tinymce-fullscreen")
            }, e.prototype.ensureNotFullScreen = function() {
                var e, t;
                this.isV3(this.editor) ? Object(i.f)(this.editor.getContainer(), function(e) {
                    var t = r(e);
                    t.parents("#mce_fullscreen_container").css("position", "fixed"), t.find(".mce_fullscreen").css("display", "block")
                }) : Object(i.c)(this.editor.plugins.instructure_fullscreen) ? this.disableInstructureFullscreen(this.editor) : Object(i.d)(null === (e = this.editor.plugins.fullscreen) || void 0 === e ? void 0 : e.isFullscreen(), !1) && this.editor.execCommand("mceFullscreen"), null === (t = this.getFullscreenContainer()) || void 0 === t || t.classList.remove("ally-wysiwyg-feedback-tinymce-fullscreen")
            }, e.prototype.onFullScreenStateChanged = function(e) {
                if (!this.isV3(this.editor)) {
                    var t = this.editor,
                        n = function(t) {
                            return e(t.state)
                        };
                    t.on("FullscreenStateChanged", n), this.chainDestroy(function() {
                        return t.off("FullscreenStateChanged", n)
                    })
                }
            }, e.prototype.destroy = function() {
                this.doDestroy(), this.doDestroy = function() {}
            }, e.prototype.getFullscreenContainer = function() {
                return this.editor.getContainer()
            }, e.prototype.addListenerV3 = function(e, t, n) {
                t.listeners.push({
                    cb: n,
                    scope: e
                }), this.chainDestroy(function() {
                    var e = t.listeners.findIndex(function(e) {
                        return e.cb === n
                    });
                    t.listeners.splice(e, 1)
                })
            }, e.prototype.chainDestroy = function(e) {
                var t = this.doDestroy;
                this.doDestroy = function() {
                    t(), e()
                }
            }, e.prototype.isV3 = function(e) {
                return "3" === this.tinymce.majorVersion
            }, e.prototype.isV4orV5 = function(e) {
                return "4" === this.tinymce.majorVersion || "5" === this.tinymce.majorVersion
            }, e.prototype.getBlocksV3 = function(t) {
                if (!Object(i.c)(t.controlManager) || !Object(i.c)(t.controlManager.controls)) return [];
                var n = Object.keys(t.controlManager.controls).find(function(e) {
                    return e.endsWith("_formatselect")
                });
                return Object(i.c)(n) ? Object(i.d)(t.controlManager.controls[n].items, []).map(function(t) {
                    var n;
                    return Object(i.c)(t.style) && "string" == typeof t.style ? n = t.style : Object(i.c)(t.style) && "function" == typeof t.style && (n = t.style()), {
                        level: tt(t.value),
                        name: r.trim(t.title),
                        style: e.parseStyles(n),
                        tag: t.value
                    }
                }) : []
            }, e.prototype.getMenuItems = function(e) {
                var t, n;
                return null === (n = null === (t = e.ui) || void 0 === t ? void 0 : t.registry.getAll()) || void 0 === n ? void 0 : n.menuItems
            }, e.prototype.getBlocksV4V5V6 = function(e) {
                var t, n;
                if (Object(i.c)(e.ui) && Object(i.c)(e.ui.registry)) {
                    var o = this.isV4orV5(e) ? null === (t = this.getMenuItems(e)) || void 0 === t ? void 0 : t.blockformats : null === (n = this.getMenuItems(e)) || void 0 === n ? void 0 : n.blocks;
                    if (Object(i.c)(o)) return Object(i.d)(o.getSubmenuItems(), []).map(function(e) {
                        return {
                            level: tt(e.meta.style.tag),
                            name: r.trim(e.text),
                            style: e.meta.style.styles,
                            tag: e.meta.style.tag
                        }
                    })
                }
                return []
            }, e.prototype.enableInstructureFullscreen = function(t) {
                var n = this;
                Object(i.f)(e.getEditor(t), function(o) {
                    var a = o[0],
                        s = o[1];
                    if (!Object(i.c)(n.fullscreenInfo)) {
                        r("header").addClass("ally-if-canvas-header");
                        var l = e.getViewButton(t);
                        n.currentViewButtonDisplayValue = Object(i.d)(l.css("display"), ""), l.css("display", "none"), n.fullscreenInfo = function(e, t) {
                            return un(e, t, function(e, t, n, r, i) {
                                var o = {
                                    container: dn(["height", "width"], e),
                                    iframe: dn(["height", "width"], t),
                                    windowScrollY: window.scrollY
                                };
                                return e.hasClass("tox-tinymce--toolbar-sticky-on") && (o.editorHeader = dn(["position", "width"], r), o.editorContainer = dn(["padding-top"], n), n.css("padding-top", 0), r.css("position", "inherit"), r.css("width", "auto")), t.css("width", "100%"), t.css("height", "100%"), e.css("width", ""), e.css("height", ""), i.forEach(function(e) {
                                    return e.addClass(cn)
                                }), o
                            })
                        }(a, s)
                    }
                })
            }, e.prototype.disableInstructureFullscreen = function(t) {
                var n = this;
                Object(i.f)(e.getEditor(t), function(o) {
                    var a = o[0],
                        s = o[1];
                    Object(i.f)(n.fullscreenInfo, function(o) {
                        var l;
                        r("header").removeClass("ally-if-canvas-header"), null === (l = e.getViewButton(t)) || void 0 === l || l.css("display", n.currentViewButtonDisplayValue), n.currentViewButtonDisplayValue = "",
                            function(e, t, n) {
                                un(e, t, function(e, t, r, o, a) {
                                    fn(n.iframe, t), fn(n.container, e), Object(i.f)(n.editorHeader, function(e) {
                                        return fn(e, o)
                                    }), Object(i.f)(n.editorContainer, function(e) {
                                        return fn(e, r)
                                    }), setTimeout(function() {
                                        return window.scrollTo(0, n.windowScrollY)
                                    }, 0), a.forEach(function(e) {
                                        return e.removeClass(cn)
                                    })
                                })
                            }(a, s, o)
                    }), n.fullscreenInfo = void 0
                })
            }, e
        }(),
        mn = function() {
            function e(e, t, n, r, i) {
                void 0 === i && (i = {
                    checkIntervalMs: 100
                }), this.baseUrl = e, this.i18n = t, this.global = n, this.hideAccessibilityPlugin = r, this.options = i, this.emitter = new N.EventEmitter, this.instances = []
            }
            return e.prototype.onAddEditor = function(e) {
                this.emitter.on("add-editor", e)
            }, e.prototype.onRemoveEditor = function(e) {
                this.emitter.on("remove-editor", e)
            }, e.prototype.start = function() {
                var e = this;
                this.syncEditors(), this.interval = setInterval(function() {
                    return e.syncEditors()
                }, this.options.checkIntervalMs)
            }, e.prototype.stop = function() {
                var e = this;
                clearInterval(this.interval), this.interval = void 0, this.instances.forEach(function(t) {
                    var n = t.id,
                        r = t.editor;
                    return e.emitter.emit("remove-editor", n, r)
                }), this.instances.length = 0, this.emitter.removeAllListeners()
            }, e.prototype.mkTinyMceEditorController = function(e) {
                var t = new hn(e, this.global.tinymce);
                return new ln(this.baseUrl, this.i18n, t, this.hideAccessibilityPlugin)
            }, e.prototype.getEditors = function() {
                var e = i.d(this.global.tinymce, {}),
                    t = e.editors,
                    n = void 0 === t ? [] : t,
                    r = e.majorVersion,
                    o = e.get;
                return "6" === r ? (void 0 === o ? function() {
                    return []
                } : o)() : n
            }, e.prototype.syncEditors = function() {
                for (var e = this.getEditors(), t = [], n = 0; n < this.instances.length; n++) {
                    var r = this.instances[n]; - 1 === e.indexOf(r.instance) && (t.push(n), this.emitter.emit("remove-editor", r.id, r.editor))
                }
                for (var o = 0, a = t; o < a.length; o++) {
                    n = a[o];
                    this.instances.splice(n, 1)
                }
                for (var s = function(e) {
                        if (!i.c(l.instances.find(function(t) {
                                return t.instance === e
                            }))) {
                            var t = Math.random().toString().slice(2),
                                n = l.mkTinyMceEditorController(e);
                            l.instances.push({
                                editor: n,
                                id: t,
                                instance: e
                            }), l.emitter.emit("add-editor", t, n)
                        }
                    }, l = this, c = 0, u = e; c < u.length; c++) {
                    s(r = u[c])
                }
            }, e
        }(),
        gn = function(e) {
            function t(t, n, i, o, a) {
                var s, l = e.call(this, t, n, i, o) || this;
                if (l.d2lFacade = i, l.isNewLessonsExperience = a, o) {
                    var c = l.d2lFacade.getHtmlEditorToolbar(),
                        u = r('\n                <style type="text/css" class="ally-styles">\n                    [cmd="d2l-allychecker"] {\n                        display: none;\n                    }\n                </style>\n            ');
                    null === (s = null == c ? void 0 : c.shadowRoot) || void 0 === s || s.appendChild(u[0])
                }
                return l
            }
            return Object(l.c)(t, e), t.prototype.activate = function(t) {
                var n;
                return Object(l.b)(this, void 0, Promise, function() {
                    var o, a;
                    return Object(l.d)(this, function(s) {
                        switch (s.label) {
                            case 0:
                                return [4, e.prototype.activate.call(this, t)];
                            case 1:
                                return s.sent(), o = this.d2lFacade.getHtmlEditorComponent(), i.c(o) && (a = r('\n                <style type="text/css" class="ally-styles">\n                    .d2l-htmleditor-container.ally-fullscreen {\n                        height: calc(100vh - 70px) !important;\n                        position: unset !important;\n                    }\n                    .d2l-htmleditor-container.ally-fullscreen > div {\n                        max-width: unset;\n                    }\n                </style>\n            '), null === (n = o.shadowRoot) || void 0 === n || n.appendChild(a[0])), [2]
                        }
                    })
                })
            }, t.prototype.addScoreMeter = function(e) {
                var t;
                this.isNewLessonsExperience ? r(".edit-buttons").append(e) : null === (t = this.getFeedbackContainer()) || void 0 === t || t.appendChild(e)
            }, t.prototype.getFeedbackContainer = function() {
                var e;
                return this.isNewLessonsExperience ? r(".new-html-editor-form")[0] : i.d(null === (e = this.d2lFacade.getHtmlEditorComponent()) || void 0 === e ? void 0 : e.parentElement, void 0)
            }, t
        }(ln),
        vn = function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return Object(l.c)(t, e), t.prototype.isSupported = function() {
                return !0
            }, t.prototype.ensureFullScreen = function() {
                this.getFullscreenContainer().classList.add("ally-wysiwyg-feedback-tinymce-fullscreen"), this.toggleFullScreen(!0)
            }, t.prototype.ensureNotFullScreen = function() {
                this.getFullscreenContainer().classList.remove("ally-wysiwyg-feedback-tinymce-fullscreen"), this.toggleFullScreen(!1)
            }, t.prototype.getBlocks = function() {
                var e, t = this.getHtmlEditorToolbar(),
                    n = null === (e = null == t ? void 0 : t.shadowRoot) || void 0 === e ? void 0 : e.querySelectorAll('d2l-htmleditor-menu-item[cmd="formatBlock"]');
                return i.c(n) ? Array.from(n).map(function(e) {
                    var t, n, o = e.textContent,
                        a = e.getAttribute("value");
                    return {
                        level: tt(i.d(a, "")),
                        name: o,
                        style: (t = r(e).find(a), n = {}, et.forEach(function(e) {
                            var r = t.css(e);
                            i.c(r) && (n[e] = r)
                        }), n),
                        tag: a
                    }
                }).filter(function(e) {
                    return i.c(e.name) && i.c(e.tag)
                }) : []
            }, t.prototype.getHtmlEditorToolbar = function() {
                var e, t = null === (e = this.getHtmlEditorComponent()) || void 0 === e ? void 0 : e.shadowRoot;
                return null == t ? void 0 : t.querySelector("d2l-htmleditor-toolbar-full")
            }, t.prototype.getHtmlEditorComponent = function() {
                var e = this,
                    t = r("d2l-htmleditor");
                t.length > 1 && (t = t.filter(function(t, n) {
                    var r = Array.from(n.shadowRoot.querySelectorAll(".ally-wysiwyg-feedback-tinymce"));
                    return i.c(r.find(function(t) {
                        return t === e.getContainer()
                    }))
                }));
                var n = r("new-html-editor");
                return n.length > 0 && (t = r(n[0].shadowRoot.firstElementChild)), t[0]
            }, t.prototype.getFullscreenContainer = function() {
                return r("new-html-editor").length > 0 ? r("new-html-editor")[0] : this.getHtmlEditorComponent()
            }, t.prototype.toggleFullScreen = function(e) {
                var t, n, r, o = null === (t = this.getHtmlEditorComponent()) || void 0 === t ? void 0 : t.shadowRoot,
                    a = null == o ? void 0 : o.querySelector(".d2l-htmleditor-container");
                if (i.c(a)) {
                    var s = null == o ? void 0 : o.querySelector("d2l-htmleditor-toolbar-full"),
                        l = null === (n = null == s ? void 0 : s.shadowRoot) || void 0 === n ? void 0 : n.querySelector('[cmd="d2l-fullscreen"]');
                    if (e) {
                        if (a.classList.add("ally-fullscreen"), i.c(l)) {
                            var c = null === (r = l.shadowRoot) || void 0 === r ? void 0 : r.querySelector("button");
                            "true" === (null == c ? void 0 : c.getAttribute("aria-pressed")) && (null == c || c.click()), l.style.display = "none"
                        }
                    } else a.classList.remove("ally-fullscreen"), i.c(l) && (l.style.display = "unset")
                }
            }, t
        }(hn),
        En = function(e) {
            function t(t, n, r, i, o, a) {
                var s = e.call(this, t, n, r, i, o) || this;
                return s.isNewLessonsExperience = a, s
            }
            return Object(l.c)(t, e), t.prototype.mkTinyMceEditorController = function(e) {
                var t = new vn(e, this.global.tinymce);
                return new gn(this.baseUrl, this.i18n, t, this.hideAccessibilityPlugin, this.isNewLessonsExperience)
            }, t
        }(mn),
        yn = n(84),
        In = function() {
            function e() {}
            return e.annotate = function(t, n, r, i) {
                return Object(l.b)(this, void 0, Promise, function() {
                    var o, a, s, c, u, d, f, p;
                    return Object(l.d)(this, function(l) {
                        switch (l.label) {
                            case 0:
                                return o = Ge(n), a = window.allyConfig, "number" == typeof(s = Xt.fromPage(o, r, a)) ? [3, 2] : (e.addCss(s), c = e.getUi(s, t[0], r), u = {
                                    domWatch: 500,
                                    preHook: function() {
                                        return e.annotatePage(s, t, c)
                                    }
                                }, d = s.pageType === Kt.NewContentExperienceView, [4, i(c)]);
                            case 1:
                                return (f = l.sent()).flags.ifLaunchFromWysiwyg && (p = new En(s.baseUrl, c.i18n, window, !f.flags.nativeWysiwygAxEnabled, {
                                    checkIntervalMs: 250
                                }, d), new vt(s.baseUrl, c, p).start()), d && this.tweakNewLessonsExperience(), [2, c.autoUpdate(u).then(function() {
                                    return c
                                })];
                            case 2:
                                return [2, Promise.resolve(s)]
                        }
                    })
                })
            }, e.getUi = function(e, t, r) {
                var i, o = this;
                if (void 0 !== r && void 0 !== r.attr("data-ally-mock")) {
                    var a = r.attr("data-ally-mock");
                    void 0 !== a && (i = window[a])
                }
                var s = {
                        auth: function() {
                            return Promise.resolve({
                                bearer: e.jwtToken
                            })
                        },
                        baseUrl: e.baseUrl,
                        clientId: e.clientId,
                        jQuery: i
                    },
                    c = !1,
                    u = Object(l.a)(Object(l.a)({}, E.resolveInstructorFeedbackCallbacks()), {
                        closed: function() {
                            c && window.location.reload()
                        },
                        deleted: function() {
                            return c = !0
                        },
                        fixHtmlIssue: function() {
                            return Object(l.b)(o, void 0, void 0, function() {
                                return Object(l.d)(this, function(e) {
                                    return c = !0, [2]
                                })
                            })
                        },
                        replacedFile: function() {
                            return c = !0
                        }
                    });
                return Yt({
                    client: s,
                    contentRoot: t,
                    courseId: e.courseId.toString(),
                    instructorfeedback: {
                        callbacks: u,
                        customIconSet: {
                            high: n(85),
                            low: n(86),
                            medium: n(87),
                            perfect: n(88)
                        },
                        getFileDownloadUrl: function(t, n) {
                            var r = window.location;
                            return n(null, r.protocol + "//" + r.host + "/d2l/api/le/1.12/" + e.courseId + "/content/topics/" + t + "/file?stream=true")
                        }
                    },
                    platformName: "d2l",
                    role: "anonymous"
                })
            }, e.tweakNewLessonsExperience = function() {
                var e = this,
                    t = r(".edit-buttons");
                if (t.length > 0) {
                    var n = t.css("padding-left");
                    r(".edit-buttons").css("--ally-edit-buttons-padding", n)
                }
                setTimeout(function() {
                    return e.tweakNewLessonsExperience()
                }, 500)
            }, e.annotatePage = function(e, t, n) {
                var r = !1;
                return sn.fromPage(e, t).forEach(function(t) {
                    var i = t.annotate(e, n);
                    r = r || i
                }), this.hasRanAtLeastOneApiUpdateCycle || (r = !0, this.hasRanAtLeastOneApiUpdateCycle = !0), r
            }, e.addCss = function(e) {
                Vt.addStylesheet(e.baseUrl + "/" + yn, "ally-d2l-styles")
            }, e.hasRanAtLeastOneApiUpdateCycle = !1, e
        }(),
        _n = function() {
            function e(e, t, n, i, o) {
                void 0 === o && (o = window.jQuery ? window.jQuery : r), this.baseUrl = e, this.i18n = t, this.container = n, this.hideAccessibilityPlugin = i, this.jq = o, this.emitter = new N.EventEmitter, this.blockStyles = [{
                    level: null,
                    name: this.i18n.ATTO_BLOCK_QUOTED,
                    tag: "blockquote"
                }, {
                    level: 3,
                    name: this.i18n.ATTO_BLOCK_HEADING_1,
                    tag: "h3"
                }, {
                    level: 4,
                    name: this.i18n.ATTO_BLOCK_HEADING_2,
                    tag: "h4"
                }, {
                    level: 5,
                    name: this.i18n.ATTO_BLOCK_HEADING_3,
                    tag: "h5"
                }, {
                    level: null,
                    name: this.i18n.ATTO_BLOCK_PLAIN,
                    tag: "p"
                }, {
                    level: null,
                    name: this.i18n.ATTO_BLOCK_PRE,
                    tag: "pre"
                }], this.deactivated = !1
            }
            return e.prototype.activate = function(t) {
                return Object(l.b)(this, void 0, Promise, function() {
                    var n, i = this;
                    return Object(l.d)(this, function(o) {
                        return this.hideAccessibilityPlugin && this.getEditorContainer().find(".accessibility_group").remove(), (n = r('<div class="ally-score-meter-container-toolbar ally-score-meter-toolbar-atto"></div>)')[0]).appendChild(t), this.addScoreMeter(n), this.indicator = n, document.body.classList.add("ally-wysiwyg-feedback-active"), r(this.container).parents('[data-fieldtype="editor"]').css("overflow", "visible"), e.submitButtonIds.forEach(function(e) {
                            return r(e).on("click", function() {
                                return i.removeHighlightAttributes()
                            })
                        }), [2]
                    })
                })
            }, e.prototype.addScoreMeter = function(e) {
                r(this.container).parents(".fitem").children().eq(1).prepend(e)
            }, e.prototype.applyFix = function(e, t, n) {
                var r;
                return Object(l.b)(this, void 0, void 0, function() {
                    return Object(l.d)(this, function(i) {
                        return null === (r = this.previewDriver) || void 0 === r || r.resetSelection(), Je(e, t, n, this.getAttoDocumentEditor().get(0)), this.forceFormUpdate(), [2]
                    })
                })
            }, e.prototype.belongsToEditor = function(e) {
                return r.contains(this.getEditorContainer().get(0), e) || 1 === this.jq(e).parents(".moodle-dialogue-base").length
            }, e.prototype.deactivate = function() {
                var t;
                this.deactivated = !0, null === (t = this.observer) || void 0 === t || t.disconnect(), this.observer = void 0, this.emitter.removeAllListeners(), this.disableFeedbackMode(), i.c(this.indicator) && (this.indicator.remove(), this.indicator = void 0), document.body.classList.remove("ally-wysiwyg-feedback-active"), e.submitButtonIds.forEach(function(e) {
                    return r(e).unbind("click")
                })
            }, e.prototype.disableFeedbackMode = function() {
                this.getEditorContainer().removeClass("ally-wysiwyg-feedback-atto-fullscreen"), i.c(this.previewDriver) && (this.previewDriver.destroy(), this.previewDriver = void 0)
            }, e.prototype.isDeactivated = function() {
                return this.deactivated
            }, e.prototype.enableFeedbackMode = function(e) {
                var t = this.getEditorContainer();
                t.addClass("ally-wysiwyg-feedback-atto-fullscreen"), this.previewDriver = new Ue(this.baseUrl, this.i18n, {
                    contentContainer: this.container,
                    indicatorContainer: t[0],
                    scrollContainer: this.container
                }, this.onSelection.bind(this), 100), this.previewDriver.start({
                    highlightInterval: 500,
                    parentWindow: e,
                    preprocessInterval: !1
                })
            }, e.prototype.getFeedbackContainer = function() {}, e.prototype.onContentChange = function(e) {
                var t = this.getAttoDocumentEditor();
                this.observer = new MutationObserver(function() {
                    var n = t.html();
                    e(n)
                }), this.observer.observe(t.get()[0], {
                    attributeFilter: ["alt", "class", "style"],
                    attributes: !0,
                    characterData: !0,
                    childList: !0,
                    subtree: !0
                })
            }, e.prototype.onContentInit = function(e) {
                e(this.getAttoDocumentEditor().html())
            }, e.prototype.onForceDisableFeedbackMode = function(e) {
                this.emitter.on("force-disable-feedback-mode", e)
            }, e.prototype.getBlocks = function() {
                var t = i.f(window.M, function(e) {
                    var t;
                    return null === (t = null == e ? void 0 : e.str) || void 0 === t ? void 0 : t.atto_title
                });
                return i.c(t) ? Object.keys(t).filter(function(t) {
                    return !e.formatMetadataFields.includes(t)
                }).map(function(e) {
                    return {
                        level: tt(e),
                        name: t[e],
                        tag: e
                    }
                }) : this.blockStyles
            }, e.prototype.onSelection = function(e) {
                return Object(l.b)(this, void 0, Promise, function() {
                    return Object(l.d)(this, function(t) {
                        return this.emitter.emit("selection-changed", nt(e)), [2]
                    })
                })
            }, e.prototype.onSelectionChange = function(e) {
                this.emitter.on("selection-changed", e)
            }, e.prototype.getAttoDocumentEditor = function() {
                return this.jq(this.container)
            }, e.prototype.getEditorContainer = function() {
                return this.getAttoDocumentEditor().parents(".editor_atto_wrap")
            }, e.prototype.forceFormUpdate = function() {
                return this.getEditorContainer().find("textarea.form-control").val(this.getAttoDocumentEditor().html())
            }, e.prototype.removeHighlightAttributes = function() {
                var e = this;
                Object.values(Ue.customAttributes).map(function(t) {
                    var n = r(e.container).find("*[" + t + "]");
                    return n.removeAttr(t), n.length
                }).reduce(function(e, t) {
                    return e + t
                }, 0) > 0 && this.forceFormUpdate(), this.onSelection().catch(function(e) {
                    return console.error(e)
                })
            }, e.submitButtonIds = ["#id_submitbutton2", "#id_submitbutton"], e.formatMetadataFields = ["privacy:metadata", "pluginname"], e
        }(),
        An = function() {
            function e(e, t, n, r) {
                var i = void 0 === r ? {} : r,
                    o = i.checkIntervalMs,
                    a = void 0 === o ? 1e3 : o,
                    s = i.root,
                    l = void 0 === s ? document.body : s;
                this.baseUrl = e, this.i18n = t, this.hideAccessibilityPlugin = n, this.emitter = new N.EventEmitter, this.instances = [], this.checkIntervalMs = a, this.root = l
            }
            return e.prototype.onAddEditor = function(e) {
                this.emitter.on("add-editor", e)
            }, e.prototype.onRemoveEditor = function(e) {
                this.emitter.on("remove-editor", e)
            }, e.prototype.start = function() {
                var e = this;
                this.syncEditors(), this.interval = setInterval(function() {
                    return e.syncEditors()
                }, this.checkIntervalMs)
            }, e.prototype.stop = function() {
                var e = this;
                i.c(this.interval) && (clearInterval(this.interval), this.interval = void 0), this.instances.forEach(function(t) {
                    var n = t.id,
                        r = t.editor;
                    return e.emitter.emit("remove-editor", n, r)
                }), this.instances.length = 0, this.emitter.removeAllListeners()
            }, e.prototype.syncEditors = function() {
                for (var e = r(this.root).find(".editor_atto_content").toArray().map(function(e) {
                        return {
                            editable: "true" === r(e).attr("contenteditable"),
                            editor: e
                        }
                    }), t = [], n = function(n) {
                        var r = o.instances[n]; - 1 === e.filter(function(e) {
                            return e.editable
                        }).findIndex(function(e) {
                            return e.editor === r.container
                        }) && (t.push(n), o.emitter.emit("remove-editor", r.id, r.editor))
                    }, o = this, a = 0; a < this.instances.length; a++) n(a);
                for (var s = 0, l = t; s < l.length; s++) {
                    a = l[s];
                    this.instances.splice(a, 1)
                }
                for (var c = function(e) {
                        if (!i.c(u.instances.find(function(t) {
                                return t.container === e.editor
                            })) && e.editable) {
                            var t = Math.random().toString().slice(2),
                                n = new _n(u.baseUrl, u.i18n, e.editor, u.hideAccessibilityPlugin);
                            u.instances.push({
                                id: t,
                                container: e.editor,
                                editor: n
                            }), u.emitter.emit("add-editor", t, n)
                        }
                    }, u = this, d = 0, f = e; d < f.length; d++) {
                    c(f[d])
                }
            }, e
        }();
    ! function(e) {
        e[e.NotAMoodlePlatform = 0] = "NotAMoodlePlatform", e[e.MoodleAllyFilterNotFound = 1] = "MoodleAllyFilterNotFound", e[e.NotAMoodleCourse = 2] = "NotAMoodleCourse"
    }(pn || (pn = {}));
    var Tn, bn, On, Cn = function() {
            function e(e, t, n, r, i) {
                this.baseUrl = e, this.clientId = t, this.courseId = n, this.locale = r, this.jwtToken = i
            }
            return e.fromPage = function(t, n) {
                if (-1 === i.d(t.attr("src"), "").indexOf("platform-name=moodle")) return pn.NotAMoodlePlatform;
                var r = this.getCourse(n);
                if (!i.c(r)) return pn.NotAMoodleCourse;
                var o = n.require;
                if ("function" != typeof o) return pn.MoodleAllyFilterNotFound;
                var a = o("filter_ally/ally");
                if (!i.c(a) || "object" != typeof a) return pn.MoodleAllyFilterNotFound;
                var s = a.getAllyBaseUrl(),
                    l = a.config().clientid,
                    c = n.document.documentElement.getAttribute("lang"),
                    u = a.token();
                return new e(s, l, r, i.d(c, "en"), u)
            }, e.getCourse = function(e) {
                var t = i.d(e.document.body.getAttribute("class"), "").split(" ").filter(function(e) {
                    return 0 === e.indexOf("course-")
                }).map(function(e) {
                    return e.split("-")[1]
                })[0];
                if (i.c(t) && "1" !== t) {
                    var n = parseInt(t, 10);
                    return isNaN(n) ? null : n
                }
                return null
            }, e
        }(),
        Ln = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.template = n(89), t
            }
            return Object(l.c)(t, e), t.prototype.apply = function(e) {
                return r(this.template(e))
            }, t
        }(d),
        Sn = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.template = n(90), t
            }
            return Object(l.c)(t, e), t.prototype.apply = function(e) {
                var t = "";
                return !0 === e.asCircle && (t = "circle"), r(this.template(Object(l.a)(Object(l.a)({}, e), {
                    style: t
                })))
            }, t
        }(d),
        wn = n(91),
        Nn = n(99),
        Rn = function() {
            function e() {}
            return e.annotate = function(t, n, i, o) {
                return Object(l.b)(this, void 0, Promise, function() {
                    var a, s, c, u, d;
                    return Object(l.d)(this, function(l) {
                        switch (l.label) {
                            case 0:
                                return "number" == typeof(a = Cn.fromPage(n, i)) ? [3, 2] : (s = e.getUi(a, i, t[0], n), c = {
                                    domWatch: 500,
                                    preHook: function() {
                                        return e.annotateActions(t, s)
                                    }
                                }, Vt.addStylesheet(a.baseUrl + "/" + wn, "ally-moodle-styles"), u = void 0, [4, o(s)]);
                            case 1:
                                return d = l.sent(), void 0 !== i.tinymce ? (Nn.fix("id_summary_editor", ".ally-actions", ".filter-ally-wrapper"), u = new mn(a.baseUrl, s.i18n, i, !d.flags.nativeWysiwygAxEnabled)) : "hidden" !== r(".editor_atto_content_wrap").css("visibility") && (u = new An(a.baseUrl, s.i18n, !d.flags.nativeWysiwygAxEnabled)), d.flags.ifLaunchFromWysiwyg && u && new vt(a.baseUrl, s, u).start(), [2, s.autoUpdate(c).then(function() {
                                    return s
                                })];
                            case 2:
                                return [2, Promise.resolve(a)]
                        }
                    })
                })
            }, e.getUi = function(e, t, n, r) {
                var o;
                if (i.c(r)) {
                    var a = r.attr("data-ally-mock");
                    i.c(a) && (o = t[a])
                }
                var s = {
                        auth: function() {
                            return Promise.resolve({
                                bearer: e.jwtToken
                            })
                        },
                        baseUrl: e.baseUrl,
                        clientId: e.clientId,
                        jQuery: o
                    },
                    c = !1,
                    u = Object(l.a)(Object(l.a)({}, E.resolveInstructorFeedbackCallbacks()), {
                        closed: function() {
                            c && t.location.reload()
                        },
                        deleted: function() {
                            return c = !0
                        },
                        replacedFile: function() {
                            return c = !0
                        }
                    });
                return Yt({
                    client: s,
                    contentRoot: n,
                    courseId: e.courseId.toString(),
                    instructorfeedback: {
                        callbacks: u
                    },
                    platformName: "moodle",
                    role: "anonymous"
                })
            }, e.annotateActions = function(e, t) {
                var n = this,
                    o = !1;
                return e.find(".ally-actions").each(function(e, a) {
                    var s = r(a),
                        l = s.find("[data-file-id]").first().attr("data-file-id"),
                        c = "ally-content-" + l + "-" + e;
                    s.parents("li.snap-resource").length > 0 && s.closest(".ally-actions").addClass("ally-actions-tile");
                    var u = s.siblings("a, img");
                    if (n.isInSnapImageCard(s) && (u = s.parents(".snap-image").find(".filter-ally-wrapper.ally-image-wrapper img")), 1 === u.length && i.c(l)) {
                        var d = s.find(".ally-feedback"),
                            f = s.find(".ally-download");
                        if ((f.length > 0 || d.length > 0) && u.first().attr("data-ally-content-id", c).attr("data-ally-file-eid", l), 1 === f.length) {
                            var p = n.addDownloadIcon(f, c, t);
                            o = o || p, f.addClass("ally-active")
                        }
                        if (1 === d.length && (d.attr("data-ally-content-ref", c), 0 === d.find("[data-ally-scoreindicator]").length)) {
                            var h = new Sn,
                                m = "img" === u.first()[0].tagName.toLowerCase();
                            d.addClass("ally-active").prepend(h.apply({
                                asCircle: m,
                                contentRef: c
                            })), m && d.addClass("ally-score-indicator-embedded"), o = !0
                        }
                    }
                }), e.find("[data-ally-richcontent]").each(function(e, i) {
                    var a = r(i),
                        s = a.attr("data-ally-richcontent");
                    if (n.isSupported(s)) {
                        a.attr("data-ally-richcontent-eid", s), a.attr("data-ally-content-id", s);
                        var l = n.addDownloadIcon(a, s, t);
                        o = o || l
                    }
                }), o
            }, e.addDownloadIcon = function(e, t, n) {
                if (0 === e.children('[data-ally-invoke="alternativeformats"]').length) {
                    var i = new Ln,
                        o = r(i.apply({
                            contentRef: t,
                            i18n: n.i18n
                        }));
                    return e.prepend(o), !0
                }
                return !1
            }, e.isSupported = function(e) {
                return {
                    "assign:assign:intro": !0,
                    "block_html:block_instances:configdata": !0,
                    "book:book:intro": !0,
                    "book:book_chapters:content": !0,
                    "course:course:summary": !0,
                    "course:course_sections:summary": !0,
                    "forum:forum:intro": !0,
                    "forum:forum_posts:message": !0,
                    "glossary:glossary:intro": !0,
                    "glossary:glossary_entries:definition": !0,
                    "label:label:intro": !0,
                    "lesson:lesson:intro": !0,
                    "lesson:lesson_pages:contents": !0,
                    "page:page:content": !0,
                    "page:page:intro": !0
                }[e.split(":").slice(0, -1).join(":")]
            }, e.isInSnapImageCard = function(e) {
                return e.parents(".snap-image").length > 0
            }, e
        }(),
        Fn = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.template = n(92), t.aafIcon = n(16), t
            }
            return Object(l.c)(t, e), t.prototype.apply = function(e) {
                return r(this.template(Object(l.a)(Object(l.a)({}, e), {
                    aafIcon: this.aafIcon
                })))
            }, t
        }(d),
        Pn = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.template = n(93), t
            }
            return Object(l.c)(t, e), t.prototype.apply = function(e) {
                return r(this.template(Object(l.a)({
                    alwaysShowForImage: !1
                }, e)))
            }, t
        }(d);
    ! function(e) {
        e[e.NoConfigObjectAvailable = 0] = "NoConfigObjectAvailable", e[e.NotAschoologyPlatform = 1] = "NotAschoologyPlatform", e[e.NotASupportedPageType = 2] = "NotASupportedPageType", e[e.MissingAllyClientId = 3] = "MissingAllyClientId"
    }(Tn || (Tn = {})),
    function(e) {
        e[e.ListOfMaterials = 0] = "ListOfMaterials", e[e.FileProfile = 1] = "FileProfile", e[e.Page = 2] = "Page", e[e.Discussion = 3] = "Discussion", e[e.Assignment = 4] = "Assignment"
    }(On || (On = {}));
    var kn = ((bn = {})[On.ListOfMaterials] = {
            regex: /^\/course\/\d+\/materials$/,
            richContentType: null
        }, bn[On.FileProfile] = {
            regex: /^\/course\/\d+\/materials\/gp\/(\d+)$/,
            richContentType: null
        }, bn[On.Page] = {
            regex: /^\/page\/(\d+)$/,
            richContentType: "page"
        }, bn[On.Discussion] = {
            regex: /^\/course\/\d+\/materials\/discussion\/view\/(\d+)$/,
            richContentType: "discussion"
        }, bn[On.Assignment] = {
            regex: /^\/assignment\/(\d+)/,
            richContentType: "assignment"
        }, bn),
        Dn = function() {
            function e(e, t, n, r, i, o, a, s) {
                this.baseUrl = e, this.clientId = t, this.courseId = n, this.locale = r, this.roles = i, this.jwtToken = o, this.parsedToken = a, this.pageInfo = s
            }
            return e.fromPage = function(t, n, r) {
                var o = i.d(n.attr("src"), "");
                if ("" !== o && -1 !== o.indexOf("platform-name=schoology")) {
                    if (r) {
                        var a = o.split("/").slice(0, 3).join("/"),
                            s = this.parseJwtToken(r.token),
                            l = xn(t);
                        if (i.c(l)) {
                            var c = this.parseClientId(r);
                            return i.c(c) ? new e(a, c, s.section_id, s.locale, s.roles.split(","), r.token, s, l) : Tn.MissingAllyClientId
                        }
                        return Tn.NotASupportedPageType
                    }
                    return Tn.NoConfigObjectAvailable
                }
                return Tn.NotAschoologyPlatform
            }, e.parseJwtToken = function(e) {
                return Gt(e)
            }, e.parseClientId = function(e) {
                var t = parseInt(e.allyClientId, 10);
                return isNaN(t) ? null : t
            }, e
        }();

    function xn(e) {
        for (var t in On)
            if (!isNaN(parseInt(t, 10))) {
                var n = parseInt(t, 10),
                    r = e.pathname.match(kn[n].regex);
                if (null !== r) return {
                    pageType: n,
                    resourceId: i.e(r[1]),
                    richContentType: kn[n].richContentType
                }
            }
        return null
    }
    var Mn = new Fn,
        Bn = new Pn;

    function Hn(e, t) {
        return function(e) {
            return e.find(".s-js-filtered-view-list").length > 0
        }(e) ? function(e, t) {
            var n = !1,
                o = e.find("div.s-js-materials-body.filtered-view ");
            o.find(".s-common-block_title > a:first-child").each(function(e, o) {
                var a = r(o);
                if (void 0 === a.attr("data-ally-content-id")) {
                    var s = i.d(a.attr("id"), "").split("-")[1];
                    i.c(s) && (! function(e, t, n) {
                        e.attr("data-ally-content-id", t), e.attr("data-ally-file-eid", t);
                        var i = r(Mn.apply({
                                baseUrl: n.baseUrl,
                                contentRef: t,
                                i18n: n.i18n
                            })),
                            o = r(Bn.apply({
                                externalId: t,
                                alwaysShowForImage: !0
                            }));
                        e.parent().append(o), e.parent().append(i)
                    }(a, s, t), n = !0);
                    var l = xn(Ge(a.attr("href")));
                    if (i.c(l) && i.c(l.richContentType)) ! function(e, t, n) {
                        e.attr("data-ally-content-id", t), e.attr("data-ally-richcontent-eid", t);
                        var i = r(Mn.apply({
                            baseUrl: n.baseUrl,
                            contentRef: t,
                            i18n: n.i18n
                        }));
                        e.parent().append(i)
                    }(a, l.richContentType + ":" + l.resourceId, t), n = !0
                }
            }), n && o.addClass("ally-augmented");
            return n
        }(e, t) : function(e, t) {
            var n = !1,
                o = e.find("table#folder-contents-table");
            o.find("tr td .item-info").each(function(e, o) {
                var a = r(o),
                    s = a.find("a.sExtlink-processed").first(),
                    l = s,
                    c = a.parent().find(".attachments-file-image .attachments-file-thumbnail img.imagecache");
                if (1 === c.length && (l = c), 0 !== l.length && void 0 === l.attr("data-ally-content-id")) {
                    var u = function(e, t) {
                        var n = xn(t);
                        if (!n) return null;
                        var r = null;
                        switch (n.pageType) {
                            case On.ListOfMaterials:
                                return null;
                            case On.FileProfile:
                                r = n.resourceId, e.attr("data-ally-file-eid", r);
                                break;
                            case On.Page:
                            case On.Discussion:
                            case On.Assignment:
                                r = n.richContentType + ":" + n.resourceId, e.attr("data-ally-richcontent-eid", r)
                        }
                        return e.attr("data-ally-content-id", r), r
                    }(l, Ge(s.attr("href")));
                    i.c(u) && (i.c(l.attr("data-ally-file-eid")) ? function(e, t, n) {
                        var i = r(Mn.apply({
                                baseUrl: n.baseUrl,
                                contentRef: e,
                                i18n: n.i18n
                            })),
                            o = r(Bn.apply({
                                externalId: e,
                                alwaysShowForImage: !0
                            })),
                            a = t.find(".attachments-file");
                        a.find(".attachments-file-name").append(o), a.append(i)
                    }(u, a, t) : function(e, t, n) {
                        var i = r(Mn.apply({
                            baseUrl: n.baseUrl,
                            contentRef: e,
                            i18n: n.i18n
                        }));
                        t.find(".item-title").append(i)
                    }(u, a, t), n = !0)
                }
            }), n && o.addClass("ally-augmented");
            return n
        }(e, t)
    }
    var jn = new Fn,
        Un = new Pn;

    function Yn(e, t, n, i) {
        if (null === t) return !1;
        var o = function(e, t, n, i) {
                var o = n.find("#main-content-wrapper");
                if (void 0 !== o.attr("data-ally-content-id")) return !1;
                var a = e + ":" + t;
                o.attr("data-ally-content-id", a), o.attr("data-ally-richcontent-eid", a), o.addClass("ally-augmented-richcontent-" + e);
                var s = r(jn.apply({
                    baseUrl: i.baseUrl,
                    contentRef: a,
                    i18n: i.i18n
                }));
                return n.find(".info-container").first().prepend(s), !0
            }(e, t, n, i),
            a = function(e, t, n, i) {
                var o = !1;
                return n.find('.attachments-file-name a.sExtlink-processed[href*="/source/"]').each(function(n, a) {
                    var s = r(a);
                    if (void 0 === s.attr("data-ally-content-id")) {
                        var l = s.attr("href").split("/")[2],
                            c = e + ":" + t + ":" + l;
                        s.attr("data-ally-content-id", c), s.attr("data-ally-file-eid", c);
                        var u = r(jn.apply({
                                baseUrl: i.baseUrl,
                                contentRef: c,
                                i18n: i.i18n
                            })),
                            d = r(Un.apply({
                                externalId: c
                            }));
                        s.closest(".attachments-file").append(d, u), o = !0
                    }
                }), n.find('.attachments-files-images .attachments-file-image img[src*="/attachment/"]').each(function(n, i) {
                    var a = r(i);
                    if (void 0 === a.attr("data-ally-content-id")) {
                        var s = a.attr("src").split("/")[2],
                            l = e + ":" + t + ":" + s;
                        a.attr("data-ally-content-id", l), a.attr("data-ally-file-eid", l);
                        var c = r(Un.apply({
                            externalId: l
                        }));
                        a.closest(".attachments-files-images").append(c), o = !0
                    }
                }), n.find('#lightbox img[src^="/attachment/"]').each(function(n, i) {
                    var a = r(i);
                    if (void 0 === a.attr("data-ally-content-id")) {
                        var s = a.attr("src").split("/")[2],
                            l = e + ":" + t + ":" + s;
                        a.attr("data-ally-content-id", l), a.attr("data-ally-file-eid", l), o = !0
                    }
                }), o
            }(e, t, n, i),
            s = o || a;
        return s && n.find("#main-content-wrapper").addClass("ally-augmented"), s
    }
    var Wn = n(94),
        Vn = function() {
            function e() {}
            return e.annotate = function(t, n, r) {
                var i = Ge(n),
                    o = window.allyConfig,
                    a = Dn.fromPage(i, r, o);
                if ("number" != typeof a) {
                    e.addCss(a);
                    var s = e.getUi(a, t[0], r, i),
                        l = {
                            domWatch: 500,
                            preHook: function() {
                                return e.annotateCurrentPage(a, t, s, n)
                            }
                        };
                    return s.autoUpdate(l).then(function() {
                        return s
                    })
                }
                return Promise.resolve(a)
            }, e.getUi = function(e, t, n, o) {
                var a = this,
                    s = r;
                if (void 0 !== n && void 0 !== n.attr("data-ally-mock")) {
                    var c = n.attr("data-ally-mock");
                    void 0 !== c && (s = window[c])
                }
                var u = {
                        auth: function(t, n) {
                            if (!i.c(t)) return n(null, {
                                bearer: e.jwtToken
                            });
                            var r = decodeURIComponent(t).split(":"),
                                o = r[0],
                                l = r[1];
                            i.c(l) || (l = o, o = "document"), a.getJwtToken(u, e, o, l, function(t, r) {
                                if (i.c(t)) return n(t);
                                s.ajax({
                                    data: {
                                        token: r
                                    },
                                    error: function() {
                                        return n(new Error("Unable to exchange JWT token"))
                                    },
                                    headers: {
                                        Authorization: "Bearer " + e.jwtToken
                                    },
                                    method: "POST",
                                    success: function(e) {
                                        return n(null, {
                                            bearer: e.token
                                        })
                                    },
                                    url: e.baseUrl + "/api/v1/" + e.clientId + "/lms/schoology/token/exchange"
                                })
                            })
                        },
                        baseUrl: e.baseUrl,
                        clientId: e.clientId,
                        jQuery: s
                    },
                    d = !1,
                    f = Object(l.a)(Object(l.a)({}, E.resolveInstructorFeedbackCallbacks()), {
                        closed: function() {
                            d && window.location.reload()
                        },
                        deleted: function() {
                            return d = !0
                        },
                        replacedFile: function() {
                            return d = !0
                        }
                    });
                return Yt({
                    client: u,
                    contentRoot: t,
                    courseId: e.courseId.toString(),
                    instructorfeedback: {
                        callbacks: f,
                        getFileDownloadUrl: function(t, n) {
                            s.ajax({
                                error: function() {
                                    return n({
                                        code: 500,
                                        msg: "Failed to retrieve download path"
                                    }, "")
                                },
                                success: function(e) {
                                    var t = e.attachments.files.file[0].download_path.split("/").slice(3).join("/");
                                    return n(null, o.protocol + "//" + o.hostname + "/" + t)
                                },
                                type: "GET",
                                url: "/v1/sections/" + e.courseId + "/documents/" + t
                            })
                        }
                    },
                    platformName: "schoology",
                    role: "anonymous"
                })
            }, e.annotateCurrentPage = function(e, t, n, i) {
                var o = {
                    baseUrl: e.baseUrl,
                    i18n: n.i18n,
                    locationHref: i
                };
                switch (e.pageInfo.pageType) {
                    case On.ListOfMaterials:
                        return Hn(t, o);
                    case On.FileProfile:
                        return function(e, t) {
                            var n = !1,
                                i = new Fn,
                                o = new Pn;
                            e.find('.attachments-file-name a.sExtlink-processed[href*="/source/"]').each(function(a, s) {
                                var l = r(s);
                                if (void 0 === l.attr("data-ally-content-id")) {
                                    e.find("#main-content-wrapper").addClass("ally-augmented");
                                    var c = Ge(t.locationHref).pathname.split("/").pop();
                                    l.attr("data-ally-content-id", c), l.attr("data-ally-file-eid", c);
                                    var u = r(i.apply({
                                            baseUrl: t.baseUrl,
                                            contentRef: c,
                                            i18n: t.i18n
                                        })),
                                        d = r(o.apply({
                                            externalId: c
                                        }));
                                    e.find(".attachments-file-name").append(d), u.insertAfter(e.find("#center-top h2")), n = !0
                                }
                            });
                            var a = e.find('#content-wrapper img[src^="/attachment/"]');
                            if (1 === a.length && void 0 === a.attr("data-ally-content-id")) {
                                e.find("#main-content-wrapper").addClass("ally-augmented").addClass("ally-augmented-file-image");
                                var s = Ge(t.locationHref).pathname.split("/").pop();
                                a.attr("data-ally-content-id", s), a.attr("data-ally-file-eid", s);
                                var l = r(o.apply({
                                    externalId: s,
                                    alwaysShowForImage: !0
                                }));
                                e.find("h2").append(l), n = !0
                            }
                            return n
                        }(t, o);
                    case On.Page:
                    case On.Discussion:
                    case On.Assignment:
                        return Yn(e.pageInfo.richContentType, e.pageInfo.resourceId, t, o)
                }
            }, e.getJwtToken = function(e, t, n, r, i) {
                e.jQuery.ajax({
                    error: function() {
                        return i(new Error("Unable to retrieve JWT token"))
                    },
                    headers: {
                        Accept: "application/json"
                    },
                    method: "GET",
                    success: function(e) {
                        return i(null, e.jwt)
                    },
                    url: "/v1/sections/" + t.courseId + "/" + n + "s/" + r + "?with_jwt=1&with_attachments=true"
                })
            }, e.addCss = function(e) {
                Vt.addStylesheet(e.baseUrl + "/" + Wn, "ally-schoology-styles")
            }, e
        }(),
        Gn = {};
    try {
        ! function(e, t) {
            if ("+" !== new e("q=%2B").get("q") || "+" !== new e({
                    q: "+"
                }).get("q") || "+" !== new e([
                    ["q", "+"]
                ]).get("q") || "q=%0A" !== new e("q=\n").toString() || "q=+%26" !== new e({
                    q: " &"
                }).toString()) throw e;
            Gn.URLSearchParams = e
        }(URLSearchParams)
    } catch (e) {
        ! function(e, t, n) {
            var r = e.create,
                i = e.defineProperty,
                o = /[!'\(\)~]|%20|%00/g,
                a = /\+/g,
                s = {
                    "!": "%21",
                    "'": "%27",
                    "(": "%28",
                    ")": "%29",
                    "~": "%7E",
                    "%20": "+",
                    "%00": "\0"
                },
                l = {
                    append: function(e, t) {
                        f(this._ungap, e, t)
                    },
                    delete: function(e) {
                        delete this._ungap[e]
                    },
                    get: function(e) {
                        return this.has(e) ? this._ungap[e][0] : null
                    },
                    getAll: function(e) {
                        return this.has(e) ? this._ungap[e].slice(0) : []
                    },
                    has: function(e) {
                        return e in this._ungap
                    },
                    set: function(e, n) {
                        this._ungap[e] = [t(n)]
                    },
                    forEach: function(e, n) {
                        var r = this;
                        for (var i in r._ungap) r._ungap[i].forEach(o, i);

                        function o(o) {
                            e.call(n, o, t(i), r)
                        }
                    },
                    toJSON: function() {
                        return {}
                    },
                    toString: function() {
                        var e = [];
                        for (var t in this._ungap)
                            for (var n = h(t), r = 0, i = this._ungap[t]; r < i.length; r++) e.push(n + "=" + h(i[r]));
                        return e.join("&")
                    }
                };
            for (var c in l) i(u.prototype, c, {
                configurable: !0,
                writable: !0,
                value: l[c]
            });

            function u(e) {
                var t = r(null);
                switch (i(this, "_ungap", {
                    value: t
                }), !0) {
                    case !e:
                        break;
                    case "string" == typeof e:
                        "?" === e.charAt(0) && (e = e.slice(1));
                        for (var o = e.split("&"), a = 0, s = o.length; a < s; a++) {
                            var l = (c = o[a]).indexOf("="); - 1 < l ? f(t, p(c.slice(0, l)), p(c.slice(l + 1))) : c.length && f(t, p(c), "")
                        }
                        break;
                    case n(e):
                        for (a = 0, s = e.length; a < s; a++) {
                            var c;
                            f(t, (c = e[a])[0], c[1])
                        }
                        break;
                    case "forEach" in e:
                        e.forEach(d, t);
                        break;
                    default:
                        for (var u in e) f(t, u, e[u])
                }
            }

            function d(e, t) {
                f(this, t, e)
            }

            function f(e, t, r) {
                var i = n(r) ? r.join(",") : r;
                t in e ? e[t].push(i) : e[t] = [i]
            }

            function p(e) {
                return decodeURIComponent(e.replace(a, " "))
            }

            function h(e) {
                return encodeURIComponent(e).replace(o, m)
            }

            function m(e) {
                return s[e]
            }
            Gn.URLSearchParams = u
        }(Object, String, Array.isArray)
    }! function(e) {
        var t = !1;
        try {
            t = !!Symbol.iterator
        } catch (e) {}

        function n(e, n) {
            var r = [];
            return e.forEach(n, r), t ? r[Symbol.iterator]() : {
                next: function() {
                    var e = r.shift();
                    return {
                        done: void 0 === e,
                        value: e
                    }
                }
            }
        }
        "forEach" in e || (e.forEach = function(e, t) {
                var n = this,
                    r = Object.create(null);
                this.toString().replace(/=[\s\S]*?(?:&|$)/g, "=").split("=").forEach(function(i) {
                    !i.length || i in r || (r[i] = n.getAll(i)).forEach(function(r) {
                        e.call(t, r, i, n)
                    })
                })
            }), "keys" in e || (e.keys = function() {
                return n(this, function(e, t) {
                    this.push(t)
                })
            }), "values" in e || (e.values = function() {
                return n(this, function(e, t) {
                    this.push(e)
                })
            }), "entries" in e || (e.entries = function() {
                return n(this, function(e, t) {
                    this.push([t, e])
                })
            }), !t || Symbol.iterator in e || (e[Symbol.iterator] = e.entries), "sort" in e || (e.sort = function() {
                for (var e, t, n, r = this.entries(), i = r.next(), o = i.done, a = [], s = Object.create(null); !o;) t = (n = i.value)[0], a.push(t), t in s || (s[t] = []), s[t].push(n[1]), o = (i = r.next()).done;
                for (a.sort(), e = 0; e < a.length; e++) this.delete(a[e]);
                for (e = 0; e < a.length; e++) t = a[e], this.append(t, s[t].shift())
            }),
            function(t) {
                var n = t.defineProperty,
                    r = t.getOwnPropertyDescriptor,
                    i = function(t) {
                        var n = t.append;
                        t.append = e.append, URLSearchParams.call(t, t._usp.search.slice(1)), t.append = n
                    },
                    o = function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("'searchParams' accessed on an object that does not implement interface " + t.name)
                    },
                    a = function(a) {
                        var s, l, c = a.prototype,
                            u = r(c, "searchParams"),
                            d = r(c, "href"),
                            f = r(c, "search");
                        !u && f && f.set && (l = function(t) {
                            function r(n, r) {
                                e.append.call(this, n, r), n = this.toString(), t.set.call(this._usp, n ? "?" + n : "")
                            }

                            function i(n) {
                                e.delete.call(this, n), n = this.toString(), t.set.call(this._usp, n ? "?" + n : "")
                            }

                            function o(n, r) {
                                e.set.call(this, n, r), n = this.toString(), t.set.call(this._usp, n ? "?" + n : "")
                            }
                            return function(e, t) {
                                return e.append = r, e.delete = i, e.set = o, n(e, "_usp", {
                                    configurable: !0,
                                    writable: !0,
                                    value: t
                                })
                            }
                        }(f), s = function(e, t) {
                            return n(e, "_searchParams", {
                                configurable: !0,
                                writable: !0,
                                value: l(t, e)
                            }), t
                        }, t.defineProperties(c, {
                            href: {
                                get: function() {
                                    return d.get.call(this)
                                },
                                set: function(e) {
                                    var t = this._searchParams;
                                    d.set.call(this, e), t && i(t)
                                }
                            },
                            search: {
                                get: function() {
                                    return f.get.call(this)
                                },
                                set: function(e) {
                                    var t = this._searchParams;
                                    f.set.call(this, e), t && i(t)
                                }
                            },
                            searchParams: {
                                get: function() {
                                    return o(this, a), this._searchParams || s(this, new URLSearchParams(this.search.slice(1)))
                                },
                                set: function(e) {
                                    o(this, a), s(this, e)
                                }
                            }
                        }))
                    };
                try {
                    a(HTMLAnchorElement), /^function|object$/.test(typeof URL) && URL.prototype && a(URL)
                } catch (e) {}
            }(Object)
    }(Gn.URLSearchParams.prototype, Object);
    Gn.URLSearchParams;
    var Kn = function() {
        function e() {}
        return e.getQueryStringParam = function(e, t) {
            return new URLSearchParams(e).get(t)
        }, e
    }();

    function qn(e) {
        return i.d(e.attr("src"), "").split("/").slice(0, 3).join("/")
    }
    var zn, $n = function() {
            function e() {}
            return e.annotate = function(e, t, n) {
                var r = Kn.getQueryStringParam(e.location.search, "data-ally-platform-name");
                if (i.c(r) && "wcm" === r.toLowerCase() && i.c(Kn.getQueryStringParam(e.location.search, "data-ally-preview"))) {
                    var o = qn(n);
                    new Ue(o, kt.allI18n).start({
                        parentWindow: t,
                        thisWindow: e
                    })
                }
                return Promise.resolve()
            }, e
        }(),
        Xn = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.template = n(95), t.iconBlack = n(96), t.iconWhite = n(97), t
            }
            return Object(l.c)(t, e), t.prototype.apply = function(e) {
                var t = Object(l.a)(Object(l.a)({}, e), {
                    iconBlack: this.iconBlack,
                    iconWhite: this.iconWhite
                });
                return r(this.template(t))
            }, t
        }(d);
    ! function(e) {
        e.BarBottom = "bar_bottom", e.FlagLarge = "flag_large", e.FlagSmall = "flag_small"
    }(zn || (zn = {}));
    var Zn = {
            bar_bottom: zn.BarBottom,
            flag_large: zn.FlagLarge,
            flag_small: zn.FlagSmall
        },
        Qn = function() {
            function e() {}
            return e.annotate = function(t, n, o) {
                var a, s, l, c, u = (a = {}, (s = o[0]) && r.each(s.attributes, function(e, t) {
                    if (0 === t.name.indexOf("data-ally-")) {
                        var n = t.name.slice(10);
                        a[n] = t.value
                    }
                }), a);
                if ("web" === i.d(u["platform-name"], "").toLowerCase()) {
                    var d = (l = u["client-id"], c = parseInt(i.d(l, ""), 10), isNaN(c) ? null : c);
                    if ("number" == typeof d) {
                        var f = qn(o),
                            p = i.d(u["af-style"], "none"),
                            h = p in Zn ? Zn[p] : null,
                            m = e.findEl(u["selector-root"], "body", r("body")),
                            g = e.findEl(u["selector-main"], "main,[role=main]", m),
                            v = u.mock,
                            E = void 0 !== v ? t[v] : void 0,
                            y = Yt({
                                client: {
                                    baseUrl: f,
                                    clientId: d,
                                    jQuery: E
                                },
                                contentRoot: g[0],
                                platformName: "web",
                                role: "anonymous"
                            }),
                            I = y.i18n;
                        if (g.attr("data-ally-content-id", "0").attr("data-ally-webpage", ""), null !== h) {
                            var _ = new Xn;
                            m.append(_.apply({
                                baseUrl: f,
                                contentId: "0",
                                i18n: I,
                                style: h
                            }))
                        }
                        if (i.c(Kn.getQueryStringParam(t.location.search, "data-ally-preview"))) {
                            var A = new Ue(f, y.i18n);
                            return y.onDestroy(function() {
                                return Promise.resolve(A.destroy())
                            }), this.startDriver(A, t, n).then(function() {
                                return y
                            })
                        }
                        return y.update(m[0]).then(function() {
                            return y
                        })
                    }
                    return Promise.reject(new Error("Ally loader script is missing data-ally-client-id attribute. Aborting."))
                }
                return Promise.resolve(null)
            }, e.startDriver = function(e, t, n) {
                return new Promise(function(i) {
                    var o = r("p,span,div,h1,h2,h3,h4,h5,h6").toArray(),
                        a = setInterval(function() {
                            for (var r = 0, s = o; r < s.length; r++) {
                                if (0 !== s[r].getBoundingClientRect().top) return clearInterval(a), e.start({
                                    parentWindow: n,
                                    thisWindow: t
                                }), void i()
                            }
                        }, 500)
                })
            }, e.findEl = function(e, t, n) {
                var o = r(i.d(e, t)).first();
                return o[0] ? o : n
            }, e
        }();

    function Jn(e) {
        return Object(s.a)(e)
    }
    var er = Yt,
        tr = r("script[data-ally-loader]"),
        nr = function(e) {
            return e.client.getClientInfo(e.config.courseId)
        };
    Rn.annotate(r("body"), tr, window, nr), Qn.annotate(window, window.parent, tr), In.annotate(r("body"), location.href, tr, nr), $n.annotate(window, window.parent, tr), Vn.annotate(r("body"), location.href, tr), o()
}, function(e, t, n) {
    "use strict";
    n.r(t), n.d(t, "fix", function() {
        return a
    });
    var r = n(1);

    function i(e) {
        return o(function() {
            return function(e) {
                var t = null;
                if (window.tinymce) {
                    var n = function(e) {
                        if ("string" === r.type(e)) return function(t) {
                            return e === t
                        };
                        if ("regexp" === r.type(e)) return function(t) {
                            return e.test(t)
                        };
                        throw new Error("Unsupported editor id matcher type")
                    }(e);
                    r.each(window.tinymce.editors, function(e, r) {
                        !t && n(r.id) && (t = r)
                    })
                }
                return t
            }(e)
        })
    }

    function o(e, t, n) {
        t = t || 1e3, n = n || r.Deferred();
        var i = e();
        return i ? n.resolve(i) : setTimeout(o, t, e, t, n), n
    }

    function a(e, t, n) {
        i(e).then(function(e) {
            e.settings && !e.settings.paste_preprocess && (e.settings.paste_preprocess = function(e, i) {
                if (i && i.content) {
                    var o = r("<div />").append(i.content);
                    o.find(t).remove(), n && o.find(n).unwrap(), i.content = o.html()
                }
            })
        })
    }
}]);
//# sourceMappingURL=../../../ui.9c2c543086bf34903e33.js.map