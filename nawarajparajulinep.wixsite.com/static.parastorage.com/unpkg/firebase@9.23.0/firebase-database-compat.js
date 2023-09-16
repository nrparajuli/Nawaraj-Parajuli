! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(require("@firebase/app-compat"), require("@firebase/app")) : "function" == typeof define && define.amd ? define(["@firebase/app-compat", "@firebase/app"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).firebase, e.firebase.INTERNAL.modularAPIs)
}(this, function(wo, Co) {
    "use strict";
    try {
        !(function() {
            function e(e) {
                return e && "object" == typeof e && "default" in e ? e : {
                    default: e
                }
            }
            var n, t = e(wo);

            function r(t) {
                const n = [];
                let r = 0;
                for (let i = 0; i < t.length; i++) {
                    let e = t.charCodeAt(i);
                    e < 128 ? n[r++] = e : (e < 2048 ? n[r++] = e >> 6 | 192 : (55296 == (64512 & e) && i + 1 < t.length && 56320 == (64512 & t.charCodeAt(i + 1)) ? (e = 65536 + ((1023 & e) << 10) + (1023 & t.charCodeAt(++i)), n[r++] = e >> 18 | 240, n[r++] = e >> 12 & 63 | 128) : n[r++] = e >> 12 | 224, n[r++] = e >> 6 & 63 | 128), n[r++] = 63 & e | 128)
                }
                return n
            }
            const i = {
                    NODE_CLIENT: !1,
                    NODE_ADMIN: !1,
                    SDK_VERSION: "${JSCORE_VERSION}"
                },
                p = function(e, t) {
                    if (!e) throw c(t)
                },
                c = function(e) {
                    return new Error("Firebase Database (" + i.SDK_VERSION + ") INTERNAL ASSERT FAILED: " + e)
                },
                s = {
                    byteToCharMap_: null,
                    charToByteMap_: null,
                    byteToCharMapWebSafe_: null,
                    charToByteMapWebSafe_: null,
                    ENCODED_VALS_BASE: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
                    get ENCODED_VALS() {
                        return this.ENCODED_VALS_BASE + "+/="
                    },
                    get ENCODED_VALS_WEBSAFE() {
                        return this.ENCODED_VALS_BASE + "-_."
                    },
                    HAS_NATIVE_SUPPORT: "function" == typeof atob,
                    encodeByteArray(n, e) {
                        if (!Array.isArray(n)) throw Error("encodeByteArray takes an array as a parameter");
                        this.init_();
                        var r = e ? this.byteToCharMapWebSafe_ : this.byteToCharMap_;
                        const i = [];
                        for (let c = 0; c < n.length; c += 3) {
                            var s = n[c],
                                o = c + 1 < n.length,
                                a = o ? n[c + 1] : 0,
                                l = c + 2 < n.length,
                                h = l ? n[c + 2] : 0;
                            let e = (15 & a) << 2 | h >> 6,
                                t = 63 & h;
                            l || (t = 64, o || (e = 64)), i.push(r[s >> 2], r[(3 & s) << 4 | a >> 4], r[e], r[t])
                        }
                        return i.join("")
                    },
                    encodeString(e, t) {
                        return this.HAS_NATIVE_SUPPORT && !t ? btoa(e) : this.encodeByteArray(r(e), t)
                    },
                    decodeString(e, t) {
                        return this.HAS_NATIVE_SUPPORT && !t ? atob(e) : function(e) {
                            const t = [];
                            let n = 0,
                                r = 0;
                            for (; n < e.length;) {
                                var i, s, o = e[n++];
                                o < 128 ? t[r++] = String.fromCharCode(o) : 191 < o && o < 224 ? (i = e[n++], t[r++] = String.fromCharCode((31 & o) << 6 | 63 & i)) : 239 < o && o < 365 ? (s = ((7 & o) << 18 | (63 & e[n++]) << 12 | (63 & e[n++]) << 6 | 63 & e[n++]) - 65536, t[r++] = String.fromCharCode(55296 + (s >> 10)), t[r++] = String.fromCharCode(56320 + (1023 & s))) : (i = e[n++], s = e[n++], t[r++] = String.fromCharCode((15 & o) << 12 | (63 & i) << 6 | 63 & s))
                            }
                            return t.join("")
                        }(this.decodeStringToByteArray(e, t))
                    },
                    decodeStringToByteArray(e, t) {
                        this.init_();
                        var n = t ? this.charToByteMapWebSafe_ : this.charToByteMap_;
                        const r = [];
                        for (let l = 0; l < e.length;) {
                            var i = n[e.charAt(l++)],
                                s = l < e.length ? n[e.charAt(l)] : 0;
                            ++l;
                            var o = l < e.length ? n[e.charAt(l)] : 64;
                            ++l;
                            var a = l < e.length ? n[e.charAt(l)] : 64;
                            if (++l, null == i || null == s || null == o || null == a) throw new h;
                            r.push(i << 2 | s >> 4), 64 !== o && (r.push(s << 4 & 240 | o >> 2), 64 !== a && r.push(o << 6 & 192 | a))
                        }
                        return r
                    },
                    init_() {
                        if (!this.byteToCharMap_) {
                            this.byteToCharMap_ = {}, this.charToByteMap_ = {}, this.byteToCharMapWebSafe_ = {}, this.charToByteMapWebSafe_ = {};
                            for (let e = 0; e < this.ENCODED_VALS.length; e++) this.byteToCharMap_[e] = this.ENCODED_VALS.charAt(e), this.charToByteMap_[this.byteToCharMap_[e]] = e, this.byteToCharMapWebSafe_[e] = this.ENCODED_VALS_WEBSAFE.charAt(e), this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]] = e, e >= this.ENCODED_VALS_BASE.length && (this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)] = e, this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)] = e)
                        }
                    }
                };
            class h extends Error {
                constructor() {
                    super(...arguments), this.name = "DecodeBase64StringError"
                }
            }

            function o(e) {
                var t = r(e);
                return s.encodeByteArray(t, !0)
            }
            const a = function(e) {
                    return o(e).replace(/\./g, "")
                },
                l = function(e) {
                    try {
                        return s.decodeString(e, !0)
                    } catch (e) {
                        console.error("base64Decode failed: ", e)
                    }
                    return null
                };

            function u(e) {
                return function e(t, n) {
                    if (!(n instanceof Object)) return n;
                    switch (n.constructor) {
                        case Date:
                            const r = n;
                            return new Date(r.getTime());
                        case Object:
                            void 0 === t && (t = {});
                            break;
                        case Array:
                            t = [];
                            break;
                        default:
                            return n
                    }
                    for (const i in n) n.hasOwnProperty(i) && d(i) && (t[i] = e(t[i], n[i]));
                    return t
                }(void 0, e)
            }

            function d(e) {
                return "__proto__" !== e
            }
            class _ {
                constructor() {
                    this.reject = () => {}, this.resolve = () => {}, this.promise = new Promise((e, t) => {
                        this.resolve = e, this.reject = t
                    })
                }
                wrapCallback(n) {
                    return (e, t) => {
                        e ? this.reject(e) : this.resolve(t), "function" == typeof n && (this.promise.catch(() => {}), 1 === n.length ? n(e) : n(e, t))
                    }
                }
            }

            function f() {
                return "undefined" != typeof window && (window.cordova || window.phonegap || window.PhoneGap) && /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test("undefined" != typeof navigator && "string" == typeof navigator.userAgent ? navigator.userAgent : "")
            }

            function g() {
                return !0 === i.NODE_ADMIN
            }

            function m(e) {
                return JSON.parse(e)
            }

            function v(e) {
                return JSON.stringify(e)
            }

            function y(e) {
                let t = {},
                    n = {},
                    r = {},
                    i = "";
                try {
                    var s = e.split(".");
                    t = m(l(s[0]) || ""), n = m(l(s[1]) || ""), i = s[2], r = n.d || {}, delete n.d
                } catch (e) {}
                return {
                    header: t,
                    claims: n,
                    data: r,
                    signature: i
                }
            }

            function w(e, t) {
                return Object.prototype.hasOwnProperty.call(e, t)
            }

            function C(e, t) {
                if (Object.prototype.hasOwnProperty.call(e, t)) return e[t]
            }

            function b(e) {
                for (const t in e)
                    if (Object.prototype.hasOwnProperty.call(e, t)) return !1;
                return !0
            }

            function I(e, t, n) {
                const r = {};
                for (const i in e) Object.prototype.hasOwnProperty.call(e, i) && (r[i] = t.call(n, e[i], i, e));
                return r
            }
            class T {
                constructor() {
                    this.chain_ = [], this.buf_ = [], this.W_ = [], this.pad_ = [], this.inbuf_ = 0, this.total_ = 0, this.blockSize = 64, this.pad_[0] = 128;
                    for (let e = 1; e < this.blockSize; ++e) this.pad_[e] = 0;
                    this.reset()
                }
                reset() {
                    this.chain_[0] = 1732584193, this.chain_[1] = 4023233417, this.chain_[2] = 2562383102, this.chain_[3] = 271733878, this.chain_[4] = 3285377520, this.inbuf_ = 0, this.total_ = 0
                }
                compress_(n, r) {
                    r = r || 0;
                    const i = this.W_;
                    if ("string" == typeof n)
                        for (let e = 0; e < 16; e++) i[e] = n.charCodeAt(r) << 24 | n.charCodeAt(r + 1) << 16 | n.charCodeAt(r + 2) << 8 | n.charCodeAt(r + 3), r += 4;
                    else
                        for (let t = 0; t < 16; t++) i[t] = n[r] << 24 | n[r + 1] << 16 | n[r + 2] << 8 | n[r + 3], r += 4;
                    for (let d = 16; d < 80; d++) {
                        var e = i[d - 3] ^ i[d - 8] ^ i[d - 14] ^ i[d - 16];
                        i[d] = 4294967295 & (e << 1 | e >>> 31)
                    }
                    let t = this.chain_[0],
                        s = this.chain_[1],
                        o = this.chain_[2],
                        a = this.chain_[3],
                        l = this.chain_[4],
                        h, c;
                    for (let _ = 0; _ < 80; _++) {
                        c = _ < 40 ? _ < 20 ? (h = a ^ s & (o ^ a), 1518500249) : (h = s ^ o ^ a, 1859775393) : _ < 60 ? (h = s & o | a & (s | o), 2400959708) : (h = s ^ o ^ a, 3395469782);
                        var u = (t << 5 | t >>> 27) + h + l + c + i[_] & 4294967295;
                        l = a, a = o, o = 4294967295 & (s << 30 | s >>> 2), s = t, t = u
                    }
                    this.chain_[0] = this.chain_[0] + t & 4294967295, this.chain_[1] = this.chain_[1] + s & 4294967295, this.chain_[2] = this.chain_[2] + o & 4294967295, this.chain_[3] = this.chain_[3] + a & 4294967295, this.chain_[4] = this.chain_[4] + l & 4294967295
                }
                update(n, r) {
                    if (null != n) {
                        var i = (r = void 0 === r ? n.length : r) - this.blockSize;
                        let e = 0;
                        const s = this.buf_;
                        let t = this.inbuf_;
                        for (; e < r;) {
                            if (0 === t)
                                for (; e <= i;) this.compress_(n, e), e += this.blockSize;
                            if ("string" == typeof n) {
                                for (; e < r;)
                                    if (s[t] = n.charCodeAt(e), ++t, ++e, t === this.blockSize) {
                                        this.compress_(s), t = 0;
                                        break
                                    }
                            } else
                                for (; e < r;)
                                    if (s[t] = n[e], ++t, ++e, t === this.blockSize) {
                                        this.compress_(s), t = 0;
                                        break
                                    }
                        }
                        this.inbuf_ = t, this.total_ += r
                    }
                }
                digest() {
                    const t = [];
                    let e = 8 * this.total_;
                    this.inbuf_ < 56 ? this.update(this.pad_, 56 - this.inbuf_) : this.update(this.pad_, this.blockSize - (this.inbuf_ - 56));
                    for (let r = this.blockSize - 1; 56 <= r; r--) this.buf_[r] = 255 & e, e /= 256;
                    this.compress_(this.buf_);
                    let n = 0;
                    for (let i = 0; i < 5; i++)
                        for (let e = 24; 0 <= e; e -= 8) t[n] = this.chain_[i] >> e & 255, ++n;
                    return t
                }
            }

            function E(e, t, n, r) {
                let i;
                if (r < t ? i = "at least " + t : n < r && (i = 0 === n ? "none" : "no more than " + n), i) {
                    var s = e + " failed: Was called with " + r + (1 === r ? " argument." : " arguments.") + " Expects " + i + ".";
                    throw new Error(s)
                }
            }

            function S(e, t) {
                return `${e} failed: ${t} argument `
            }

            function k(e, t, n, r) {
                if ((!r || n) && "function" != typeof n) throw new Error(S(e, t) + "must be a valid function.")
            }

            function N(e, t, n, r) {
                if ((!r || n) && ("object" != typeof n || null === n)) throw new Error(S(e, t) + "must be a valid context object.")
            }
            const P = function(e) {
                let t = 0;
                for (let r = 0; r < e.length; r++) {
                    var n = e.charCodeAt(r);
                    n < 128 ? t++ : n < 2048 ? t += 2 : 55296 <= n && n <= 56319 ? (t += 4, r++) : t += 3
                }
                return t
            };

            function R(e) {
                return e && e._delegate ? e._delegate : e
            }
            class x {
                constructor(e, t, n) {
                    this.name = e, this.instanceFactory = t, this.type = n, this.multipleInstances = !1, this.serviceProps = {}, this.instantiationMode = "LAZY", this.onInstanceCreated = null
                }
                setInstantiationMode(e) {
                    return this.instantiationMode = e, this
                }
                setMultipleInstances(e) {
                    return this.multipleInstances = e, this
                }
                setServiceProps(e) {
                    return this.serviceProps = e, this
                }
                setInstanceCreatedCallback(e) {
                    return this.onInstanceCreated = e, this
                }
            }
            const D = "[DEFAULT]";
            class A {
                constructor(e, t) {
                    this.name = e, this.container = t, this.component = null, this.instances = new Map, this.instancesDeferred = new Map, this.instancesOptions = new Map, this.onInitCallbacks = new Map
                }
                get(e) {
                    var t = this.normalizeInstanceIdentifier(e);
                    if (!this.instancesDeferred.has(t)) {
                        const r = new _;
                        if (this.instancesDeferred.set(t, r), this.isInitialized(t) || this.shouldAutoInitialize()) try {
                            var n = this.getOrInitializeService({
                                instanceIdentifier: t
                            });
                            n && r.resolve(n)
                        } catch (e) {}
                    }
                    return this.instancesDeferred.get(t).promise
                }
                getImmediate(e) {
                    var t = this.normalizeInstanceIdentifier(null == e ? void 0 : e.identifier),
                        n = null !== (n = null == e ? void 0 : e.optional) && void 0 !== n && n;
                    if (!this.isInitialized(t) && !this.shouldAutoInitialize()) {
                        if (n) return null;
                        throw Error(`Service ${this.name} is not available`)
                    }
                    try {
                        return this.getOrInitializeService({
                            instanceIdentifier: t
                        })
                    } catch (e) {
                        if (n) return null;
                        throw e
                    }
                }
                getComponent() {
                    return this.component
                }
                setComponent(e) {
                    if (e.name !== this.name) throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);
                    if (this.component) throw Error(`Component for ${this.name} has already been provided`);
                    if (this.component = e, this.shouldAutoInitialize()) {
                        if ("EAGER" === e.instantiationMode) try {
                            this.getOrInitializeService({
                                instanceIdentifier: D
                            })
                        } catch (e) {}
                        for (var [t, n] of this.instancesDeferred.entries()) {
                            t = this.normalizeInstanceIdentifier(t);
                            try {
                                var r = this.getOrInitializeService({
                                    instanceIdentifier: t
                                });
                                n.resolve(r)
                            } catch (e) {}
                        }
                    }
                }
                clearInstance(e = D) {
                    this.instancesDeferred.delete(e), this.instancesOptions.delete(e), this.instances.delete(e)
                }
                async delete() {
                    const e = Array.from(this.instances.values());
                    await Promise.all([...e.filter(e => "INTERNAL" in e).map(e => e.INTERNAL.delete()), ...e.filter(e => "_delete" in e).map(e => e._delete())])
                }
                isComponentSet() {
                    return null != this.component
                }
                isInitialized(e = D) {
                    return this.instances.has(e)
                }
                getOptions(e = D) {
                    return this.instancesOptions.get(e) || {}
                }
                initialize(e = {}) {
                    var {
                        options: t = {}
                    } = e, n = this.normalizeInstanceIdentifier(e.instanceIdentifier);
                    if (this.isInitialized(n)) throw Error(`${this.name}(${n}) has already been initialized`);
                    if (!this.isComponentSet()) throw Error(`Component ${this.name} has not been registered yet`);
                    var r, i, s = this.getOrInitializeService({
                        instanceIdentifier: n,
                        options: t
                    });
                    for ([r, i] of this.instancesDeferred.entries()) n === this.normalizeInstanceIdentifier(r) && i.resolve(s);
                    return s
                }
                onInit(e, t) {
                    var n = this.normalizeInstanceIdentifier(t);
                    const r = null !== (i = this.onInitCallbacks.get(n)) && void 0 !== i ? i : new Set;
                    r.add(e), this.onInitCallbacks.set(n, r);
                    var i = this.instances.get(n);
                    return i && e(i, n), () => {
                        r.delete(e)
                    }
                }
                invokeOnInitCallbacks(e, t) {
                    var n = this.onInitCallbacks.get(t);
                    if (n)
                        for (const r of n) try {
                            r(e, t)
                        } catch (e) {}
                }
                getOrInitializeService({
                    instanceIdentifier: e,
                    options: t = {}
                }) {
                    let n = this.instances.get(e);
                    if (!n && this.component && (n = this.component.instanceFactory(this.container, {
                            instanceIdentifier: (r = e) === D ? void 0 : r,
                            options: t
                        }), this.instances.set(e, n), this.instancesOptions.set(e, t), this.invokeOnInitCallbacks(n, e), this.component.onInstanceCreated)) try {
                        this.component.onInstanceCreated(this.container, e, n)
                    } catch (e) {}
                    var r;
                    return n || null
                }
                normalizeInstanceIdentifier(e = D) {
                    return !this.component || this.component.multipleInstances ? e : D
                }
                shouldAutoInitialize() {
                    return !!this.component && "EXPLICIT" !== this.component.instantiationMode
                }
            }
            class O {
                constructor(e) {
                    this.name = e, this.providers = new Map
                }
                addComponent(e) {
                    const t = this.getProvider(e.name);
                    if (t.isComponentSet()) throw new Error(`Component ${e.name} has already been registered with ${this.name}`);
                    t.setComponent(e)
                }
                addOrOverwriteComponent(e) {
                    const t = this.getProvider(e.name);
                    t.isComponentSet() && this.providers.delete(e.name), this.addComponent(e)
                }
                getProvider(e) {
                    if (this.providers.has(e)) return this.providers.get(e);
                    var t = new A(e, this);
                    return this.providers.set(e, t), t
                }
                getProviders() {
                    return Array.from(this.providers.values())
                }
            }($ = n = n || {})[$.DEBUG = 0] = "DEBUG", $[$.VERBOSE = 1] = "VERBOSE", $[$.INFO = 2] = "INFO", $[$.WARN = 3] = "WARN", $[$.ERROR = 4] = "ERROR", $[$.SILENT = 5] = "SILENT";
            const L = {
                    debug: n.DEBUG,
                    verbose: n.VERBOSE,
                    info: n.INFO,
                    warn: n.WARN,
                    error: n.ERROR,
                    silent: n.SILENT
                },
                M = n.INFO,
                F = {
                    [n.DEBUG]: "log",
                    [n.VERBOSE]: "log",
                    [n.INFO]: "info",
                    [n.WARN]: "warn",
                    [n.ERROR]: "error"
                },
                q = (e, t, ...n) => {
                    if (!(t < e.logLevel)) {
                        var r = (new Date).toISOString(),
                            i = F[t];
                        if (!i) throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);
                        console[i](`[${r}]  ${e.name}:`, ...n)
                    }
                };
            class W {
                constructor(e) {
                    this.name = e, this._logLevel = M, this._logHandler = q, this._userLogHandler = null
                }
                get logLevel() {
                    return this._logLevel
                }
                set logLevel(e) {
                    if (!(e in n)) throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);
                    this._logLevel = e
                }
                setLogLevel(e) {
                    this._logLevel = "string" == typeof e ? L[e] : e
                }
                get logHandler() {
                    return this._logHandler
                }
                set logHandler(e) {
                    if ("function" != typeof e) throw new TypeError("Value assigned to `logHandler` must be a function");
                    this._logHandler = e
                }
                get userLogHandler() {
                    return this._userLogHandler
                }
                set userLogHandler(e) {
                    this._userLogHandler = e
                }
                debug(...e) {
                    this._userLogHandler && this._userLogHandler(this, n.DEBUG, ...e), this._logHandler(this, n.DEBUG, ...e)
                }
                log(...e) {
                    this._userLogHandler && this._userLogHandler(this, n.VERBOSE, ...e), this._logHandler(this, n.VERBOSE, ...e)
                }
                info(...e) {
                    this._userLogHandler && this._userLogHandler(this, n.INFO, ...e), this._logHandler(this, n.INFO, ...e)
                }
                warn(...e) {
                    this._userLogHandler && this._userLogHandler(this, n.WARN, ...e), this._logHandler(this, n.WARN, ...e)
                }
                error(...e) {
                    this._userLogHandler && this._userLogHandler(this, n.ERROR, ...e), this._logHandler(this, n.ERROR, ...e)
                }
            }
            const U = "@firebase/database";
            let B = "";

            function j(e) {
                B = e
            }
            class V {
                constructor(e) {
                    this.domStorage_ = e, this.prefix_ = "firebase:"
                }
                set(e, t) {
                    null == t ? this.domStorage_.removeItem(this.prefixedName_(e)) : this.domStorage_.setItem(this.prefixedName_(e), v(t))
                }
                get(e) {
                    var t = this.domStorage_.getItem(this.prefixedName_(e));
                    return null == t ? null : m(t)
                }
                remove(e) {
                    this.domStorage_.removeItem(this.prefixedName_(e))
                }
                prefixedName_(e) {
                    return this.prefix_ + e
                }
                toString() {
                    return this.domStorage_.toString()
                }
            }
            class z {
                constructor() {
                    this.cache_ = {}, this.isInMemoryStorage = !0
                }
                set(e, t) {
                    null == t ? delete this.cache_[e] : this.cache_[e] = t
                }
                get(e) {
                    return w(this.cache_, e) ? this.cache_[e] : null
                }
                remove(e) {
                    delete this.cache_[e]
                }
            }

            function H(e) {
                try {
                    if ("undefined" != typeof window && void 0 !== window[e]) {
                        const t = window[e];
                        return t.setItem("firebase:sentinel", "cache"), t.removeItem("firebase:sentinel"), new V(t)
                    }
                } catch (e) {}
                return new z
            }
            var Q, Y, K, $, G, J, X;

            function Z(e) {
                var t = function(t) {
                    const n = [];
                    let r = 0;
                    for (let o = 0; o < t.length; o++) {
                        let e = t.charCodeAt(o);
                        var i, s;
                        55296 <= e && e <= 56319 && (i = e - 55296, o++, p(o < t.length, "Surrogate pair missing trail surrogate."), s = t.charCodeAt(o) - 56320, e = 65536 + (i << 10) + s), e < 128 ? n[r++] = e : (e < 2048 ? n[r++] = e >> 6 | 192 : (e < 65536 ? n[r++] = e >> 12 | 224 : (n[r++] = e >> 18 | 240, n[r++] = e >> 12 & 63 | 128), n[r++] = e >> 6 & 63 | 128), n[r++] = 63 & e | 128)
                    }
                    return n
                }(e);
                const n = new T;
                return n.update(t), t = n.digest(), s.encodeByteArray(t)
            }
            const ee = H("localStorage"),
                te = H("sessionStorage"),
                ne = new W("@firebase/database"),
                re = function() {
                    let e = 1;
                    return function() {
                        return e++
                    }
                }(),
                ie = function(...e) {
                    let t = "";
                    for (let r = 0; r < e.length; r++) {
                        var n = e[r];
                        Array.isArray(n) || n && "object" == typeof n && "number" == typeof n.length ? t += ie.apply(null, n) : t += "object" == typeof n ? v(n) : n, t += " "
                    }
                    return t
                };
            let se = null,
                oe = !0;

            function ae(t) {
                return function(...e) {
                    pe(t, ...e)
                }
            }

            function le(...e) {
                var t = "FIREBASE INTERNAL ERROR: " + ie(...e);
                ne.error(t)
            }

            function he(e, t) {
                return e === t ? 0 : e < t ? -1 : 1
            }

            function ce(e, t) {
                if (t && e in t) return t[e];
                throw new Error("Missing required key (" + e + ") in object: " + v(t))
            }

            function ue(e) {
                if ("object" != typeof e || null === e) return v(e);
                const t = [];
                for (const r in e) t.push(r);
                t.sort();
                let n = "{";
                for (let i = 0; i < t.length; i++) 0 !== i && (n += ","), n += v(t[i]), n += ":", n += ue(e[t[i]]);
                return n += "}", n
            }

            function de(e, t) {
                var n = e.length;
                if (n <= t) return [e];
                const r = [];
                for (let i = 0; i < n; i += t) i + t > n ? r.push(e.substring(i, n)) : r.push(e.substring(i, i + t));
                return r
            }
            const _e = function(e, t) {
                    p(!t || !0 === e || !1 === e, "Can't turn on custom loggers persistently."), !0 === e ? (ne.logLevel = n.VERBOSE, se = ne.log.bind(ne), t && te.set("logging_enabled", !0)) : "function" == typeof e ? se = e : (se = null, te.remove("logging_enabled"))
                },
                pe = function(...e) {
                    var t;
                    !0 === oe && (oe = !1, null === se && !0 === te.get("logging_enabled") && _e(!0)), se && (t = ie.apply(null, e), se(t))
                },
                fe = function(...e) {
                    var t = `FIREBASE FATAL ERROR: ${ie(...e)}`;
                    throw ne.error(t), new Error(t)
                },
                ge = function(...e) {
                    var t = "FIREBASE WARNING: " + ie(...e);
                    ne.warn(t)
                },
                me = function() {
                    "undefined" != typeof window && window.location && window.location.protocol && -1 !== window.location.protocol.indexOf("https:") && ge("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")
                },
                ve = function(e) {
                    return "number" == typeof e && (e != e || e === Number.POSITIVE_INFINITY || e === Number.NEGATIVE_INFINITY)
                },
                ye = "[MIN_NAME]",
                we = "[MAX_NAME]",
                Ce = function(e, t) {
                    if (e === t) return 0;
                    if (e === ye || t === we) return -1;
                    if (t === ye || e === we) return 1;
                    var n = Te(e),
                        r = Te(t);
                    return null !== n ? null !== r ? n - r == 0 ? e.length - t.length : n - r : -1 : null === r && e < t ? -1 : 1
                };

            function be(e, t) {
                for (const n in e) e.hasOwnProperty(n) && t(n, e[n])
            }

            function Ie(e) {
                p(!ve(e), "Invalid JSON number");
                let t, n, r, i, s;
                0 === e ? (n = 0, r = 0, t = 1 / e == -1 / 0 ? 1 : 0) : (t = e < 0, e = Math.abs(e), r = e >= Math.pow(2, -1022) ? (i = Math.min(Math.floor(Math.log(e) / Math.LN2), 1023), n = i + 1023, Math.round(e * Math.pow(2, 52 - i) - Math.pow(2, 52))) : (n = 0, Math.round(e / Math.pow(2, -1074))));
                const o = [];
                for (s = 52; s; --s) o.push(r % 2 ? 1 : 0), r = Math.floor(r / 2);
                for (s = 11; s; --s) o.push(n % 2 ? 1 : 0), n = Math.floor(n / 2);
                o.push(t ? 1 : 0), o.reverse();
                const a = o.join("");
                let l = "";
                for (s = 0; s < 64; s += 8) {
                    let e = parseInt(a.substr(s, 8), 2).toString(16);
                    1 === e.length && (e = "0" + e), l += e
                }
                return l.toLowerCase()
            }

            function Te(e) {
                if (Se.test(e)) {
                    var t = Number(e);
                    if (t >= ke && t <= Ne) return t
                }
                return null
            }

            function Ee(e, t) {
                const n = setTimeout(e, t);
                return "number" == typeof n && "undefined" != typeof Deno && Deno.unrefTimer ? Deno.unrefTimer(n) : "object" == typeof n && n.unref && n.unref(), n
            }
            const Se = new RegExp("^-?(0*)\\d{1,10}$"),
                ke = -2147483648,
                Ne = 2147483647,
                Pe = function(e) {
                    try {
                        e()
                    } catch (t) {
                        setTimeout(() => {
                            var e = t.stack || "";
                            throw ge("Exception was thrown by user callback.", e), t
                        }, Math.floor(0))
                    }
                };
            class Re {
                constructor(e, t) {
                    this.appName_ = e, this.appCheckProvider = t, this.appCheck = null == t ? void 0 : t.getImmediate({
                        optional: !0
                    }), this.appCheck || null != t && t.get().then(e => this.appCheck = e)
                }
                getToken(n) {
                    return this.appCheck ? this.appCheck.getToken(n) : new Promise((e, t) => {
                        setTimeout(() => {
                            this.appCheck ? this.getToken(n).then(e, t) : e(null)
                        }, 0)
                    })
                }
                addTokenChangeListener(t) {
                    var e;
                    null !== (e = this.appCheckProvider) && void 0 !== e && e.get().then(e => e.addTokenListener(t))
                }
                notifyForInvalidToken() {
                    ge(`Provided AppCheck credentials for the app named "${this.appName_}" ` + "are invalid. This usually indicates your app was not initialized correctly.")
                }
            }
            class xe {
                constructor(e, t, n) {
                    this.appName_ = e, this.firebaseOptions_ = t, this.authProvider_ = n, this.auth_ = null, this.auth_ = n.getImmediate({
                        optional: !0
                    }), this.auth_ || n.onInit(e => this.auth_ = e)
                }
                getToken(n) {
                    return this.auth_ ? this.auth_.getToken(n).catch(e => e && "auth/token-not-initialized" === e.code ? (pe("Got auth/token-not-initialized error.  Treating as null token."), null) : Promise.reject(e)) : new Promise((e, t) => {
                        setTimeout(() => {
                            this.auth_ ? this.getToken(n).then(e, t) : e(null)
                        }, 0)
                    })
                }
                addTokenChangeListener(t) {
                    this.auth_ ? this.auth_.addAuthTokenListener(t) : this.authProvider_.get().then(e => e.addAuthTokenListener(t))
                }
                removeTokenChangeListener(t) {
                    this.authProvider_.get().then(e => e.removeAuthTokenListener(t))
                }
                notifyForInvalidToken() {
                    let e = 'Provided authentication credentials for the app named "' + this.appName_ + '" are invalid. This usually indicates your app was not initialized correctly. ';
                    "credential" in this.firebaseOptions_ ? e += 'Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.' : "serviceAccount" in this.firebaseOptions_ ? e += 'Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.' : e += 'Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.', ge(e)
                }
            }
            class De {
                constructor(e) {
                    this.accessToken = e
                }
                getToken(e) {
                    return Promise.resolve({
                        accessToken: this.accessToken
                    })
                }
                addTokenChangeListener(e) {
                    e(this.accessToken)
                }
                removeTokenChangeListener(e) {}
                notifyForInvalidToken() {}
            }
            De.OWNER = "owner";
            const Ae = /(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,
                Oe = "websocket",
                Le = "long_polling";
            class Me {
                constructor(e, t, n, r, i = !1, s = "", o = !1, a = !1) {
                    this.secure = t, this.namespace = n, this.webSocketOnly = r, this.nodeAdmin = i, this.persistenceKey = s, this.includeNamespaceInQueryParams = o, this.isUsingEmulator = a, this._host = e.toLowerCase(), this._domain = this._host.substr(this._host.indexOf(".") + 1), this.internalHost = ee.get("host:" + e) || this._host
                }
                isCacheableHost() {
                    return "s-" === this.internalHost.substr(0, 2)
                }
                isCustomHost() {
                    return "firebaseio.com" !== this._domain && "firebaseio-demo.com" !== this._domain
                }
                get host() {
                    return this._host
                }
                set host(e) {
                    e !== this.internalHost && (this.internalHost = e, this.isCacheableHost() && ee.set("host:" + this._host, this.internalHost))
                }
                toString() {
                    let e = this.toURLString();
                    return this.persistenceKey && (e += "<" + this.persistenceKey + ">"), e
                }
                toURLString() {
                    var e = this.secure ? "https://" : "http://",
                        t = this.includeNamespaceInQueryParams ? `?ns=${this.namespace}` : "";
                    return `${e}${this.host}/${t}`
                }
            }

            function Fe(e, t, n) {
                p("string" == typeof t, "typeof type must == string"), p("object" == typeof n, "typeof params must == object");
                let r;
                if (t === Oe) r = (e.secure ? "wss://" : "ws://") + e.internalHost + "/.ws?";
                else {
                    if (t !== Le) throw new Error("Unknown connection type: " + t);
                    r = (e.secure ? "https://" : "http://") + e.internalHost + "/.lp?"
                }((t = e).host !== t.internalHost || t.isCustomHost() || t.includeNamespaceInQueryParams) && (n.ns = e.namespace);
                const i = [];
                return be(n, (e, t) => {
                    i.push(e + "=" + t)
                }), r + i.join("&")
            }
            class qe {
                constructor() {
                    this.counters_ = {}
                }
                incrementCounter(e, t = 1) {
                    w(this.counters_, e) || (this.counters_[e] = 0), this.counters_[e] += t
                }
                get() {
                    return u(this.counters_)
                }
            }
            const We = {},
                Ue = {};

            function Be(e) {
                var t = e.toString();
                return We[t] || (We[t] = new qe), We[t]
            }
            class je {
                constructor(e) {
                    this.onMessage_ = e, this.pendingResponses = [], this.currentResponseNum = 0, this.closeAfterResponse = -1, this.onClose = null
                }
                closeAfter(e, t) {
                    this.closeAfterResponse = e, this.onClose = t, this.closeAfterResponse < this.currentResponseNum && (this.onClose(), this.onClose = null)
                }
                handleResponse(e, t) {
                    for (this.pendingResponses[e] = t; this.pendingResponses[this.currentResponseNum];) {
                        const n = this.pendingResponses[this.currentResponseNum];
                        delete this.pendingResponses[this.currentResponseNum];
                        for (let e = 0; e < n.length; ++e) n[e] && Pe(() => {
                            this.onMessage_(n[e])
                        });
                        if (this.currentResponseNum === this.closeAfterResponse) {
                            this.onClose && (this.onClose(), this.onClose = null);
                            break
                        }
                        this.currentResponseNum++
                    }
                }
            }
            class Ve {
                constructor(e, t, n, r, i, s, o) {
                    this.connId = e, this.repoInfo = t, this.applicationId = n, this.appCheckToken = r, this.authToken = i, this.transportSessionId = s, this.lastSessionId = o, this.bytesSent = 0, this.bytesReceived = 0, this.everConnected_ = !1, this.log_ = ae(e), this.stats_ = Be(t), this.urlFn = e => (this.appCheckToken && (e.ac = this.appCheckToken), Fe(t, Le, e))
                }
                open(e, t) {
                    this.curSegmentNum = 0, this.onDisconnect_ = t, this.myPacketOrderer = new je(e), this.isClosed_ = !1, this.connectTimeoutTimer_ = setTimeout(() => {
                            this.log_("Timed out trying to connect."), this.onClosed_(), this.connectTimeoutTimer_ = null
                        }, Math.floor(3e4)),
                        function(t) {
                            if ("complete" === document.readyState) t();
                            else {
                                let e = !1;
                                const n = function() {
                                    document.body ? e || (e = !0, t()) : setTimeout(n, Math.floor(10))
                                };
                                document.addEventListener ? (document.addEventListener("DOMContentLoaded", n, !1), window.addEventListener("load", n, !1)) : document.attachEvent && (document.attachEvent("onreadystatechange", () => {
                                    "complete" === document.readyState && n()
                                }), window.attachEvent("onload", n))
                            }
                        }(() => {
                            if (!this.isClosed_) {
                                this.scriptTagHolder = new ze((...e) => {
                                    var [t, n, r] = e;
                                    if (this.incrementIncomingBytes_(e), this.scriptTagHolder)
                                        if (this.connectTimeoutTimer_ && (clearTimeout(this.connectTimeoutTimer_), this.connectTimeoutTimer_ = null), this.everConnected_ = !0, "start" === t) this.id = n, this.password = r;
                                        else {
                                            if ("close" !== t) throw new Error("Unrecognized command received: " + t);
                                            n ? (this.scriptTagHolder.sendNewPolls = !1, this.myPacketOrderer.closeAfter(n, () => {
                                                this.onClosed_()
                                            })) : this.onClosed_()
                                        }
                                }, (...e) => {
                                    var [t, n] = e;
                                    this.incrementIncomingBytes_(e), this.myPacketOrderer.handleResponse(t, n)
                                }, () => {
                                    this.onClosed_()
                                }, this.urlFn);
                                const t = {
                                    start: "t"
                                };
                                t.ser = Math.floor(1e8 * Math.random()), this.scriptTagHolder.uniqueCallbackIdentifier && (t.cb = this.scriptTagHolder.uniqueCallbackIdentifier), t.v = "5", this.transportSessionId && (t.s = this.transportSessionId), this.lastSessionId && (t.ls = this.lastSessionId), this.applicationId && (t.p = this.applicationId), this.appCheckToken && (t.ac = this.appCheckToken), "undefined" != typeof location && location.hostname && Ae.test(location.hostname) && (t.r = "f");
                                var e = this.urlFn(t);
                                this.log_("Connecting via long-poll to " + e), this.scriptTagHolder.addTag(e, () => {})
                            }
                        })
                }
                start() {
                    this.scriptTagHolder.startLongPoll(this.id, this.password), this.addDisconnectPingFrame(this.id, this.password)
                }
                static forceAllow() {
                    Ve.forceAllow_ = !0
                }
                static forceDisallow() {
                    Ve.forceDisallow_ = !0
                }
                static isAvailable() {
                    return !!Ve.forceAllow_ || !(Ve.forceDisallow_ || "undefined" == typeof document || null == document.createElement || "object" == typeof window && window.chrome && window.chrome.extension && !/^chrome/.test(window.location.href) || "object" == typeof Windows && "object" == typeof Windows.UI)
                }
                markConnectionHealthy() {}
                shutdown_() {
                    this.isClosed_ = !0, this.scriptTagHolder && (this.scriptTagHolder.close(), this.scriptTagHolder = null), this.myDisconnFrame && (document.body.removeChild(this.myDisconnFrame), this.myDisconnFrame = null), this.connectTimeoutTimer_ && (clearTimeout(this.connectTimeoutTimer_), this.connectTimeoutTimer_ = null)
                }
                onClosed_() {
                    this.isClosed_ || (this.log_("Longpoll is closing itself"), this.shutdown_(), this.onDisconnect_ && (this.onDisconnect_(this.everConnected_), this.onDisconnect_ = null))
                }
                close() {
                    this.isClosed_ || (this.log_("Longpoll is being closed."), this.shutdown_())
                }
                send(e) {
                    var t = v(e);
                    this.bytesSent += t.length, this.stats_.incrementCounter("bytes_sent", t.length);
                    var t = o(t),
                        n = de(t, 1840);
                    for (let r = 0; r < n.length; r++) this.scriptTagHolder.enqueueSegment(this.curSegmentNum, n.length, n[r]), this.curSegmentNum++
                }
                addDisconnectPingFrame(e, t) {
                    this.myDisconnFrame = document.createElement("iframe");
                    const n = {
                        dframe: "t"
                    };
                    n.id = e, n.pw = t, this.myDisconnFrame.src = this.urlFn(n), this.myDisconnFrame.style.display = "none", document.body.appendChild(this.myDisconnFrame)
                }
                incrementIncomingBytes_(e) {
                    var t = v(e).length;
                    this.bytesReceived += t, this.stats_.incrementCounter("bytes_received", t)
                }
            }
            class ze {
                constructor(t, n, e, r) {
                    this.onDisconnect = e, this.urlFn = r, this.outstandingRequests = new Set, this.pendingSegs = [], this.currentSerial = Math.floor(1e8 * Math.random()), this.sendNewPolls = !0; {
                        this.uniqueCallbackIdentifier = re(), window["pLPCommand" + this.uniqueCallbackIdentifier] = t, window["pRTLPCB" + this.uniqueCallbackIdentifier] = n, this.myIFrame = ze.createIFrame_();
                        let e = "";
                        this.myIFrame.src && "javascript:" === this.myIFrame.src.substr(0, "javascript:".length) && (i = document.domain, e = '<script>document.domain="' + i + '";<\/script>');
                        var i = "<html><body>" + e + "</body></html>";
                        try {
                            this.myIFrame.doc.open(), this.myIFrame.doc.write(i), this.myIFrame.doc.close()
                        } catch (e) {
                            pe("frame writing exception"), e.stack && pe(e.stack), pe(e)
                        }
                    }
                }
                static createIFrame_() {
                    const t = document.createElement("iframe");
                    if (t.style.display = "none", !document.body) throw "Document body has not initialized. Wait to initialize Firebase until after the document is ready.";
                    document.body.appendChild(t);
                    try {
                        t.contentWindow.document || pe("No IE domain setting required")
                    } catch (e) {
                        var n = document.domain;
                        t.src = "javascript:void((function(){document.open();document.domain='" + n + "';document.close();})())"
                    }
                    return t.contentDocument ? t.doc = t.contentDocument : t.contentWindow ? t.doc = t.contentWindow.document : t.document && (t.doc = t.document), t
                }
                close() {
                    this.alive = !1, this.myIFrame && (this.myIFrame.doc.body.textContent = "", setTimeout(() => {
                        null !== this.myIFrame && (document.body.removeChild(this.myIFrame), this.myIFrame = null)
                    }, Math.floor(0)));
                    const e = this.onDisconnect;
                    e && (this.onDisconnect = null, e())
                }
                startLongPoll(e, t) {
                    for (this.myID = e, this.myPW = t, this.alive = !0; this.newRequest_(););
                }
                newRequest_() {
                    if (this.alive && this.sendNewPolls && this.outstandingRequests.size < (0 < this.pendingSegs.length ? 2 : 1)) {
                        this.currentSerial++;
                        const i = {};
                        i.id = this.myID, i.pw = this.myPW, i.ser = this.currentSerial;
                        var n = this.urlFn(i);
                        let e = "",
                            t = 0;
                        for (; 0 < this.pendingSegs.length;) {
                            if (!(this.pendingSegs[0].d.length + 30 + e.length <= 1870)) break;
                            var r = this.pendingSegs.shift();
                            e = e + "&seg" + t + "=" + r.seg + "&ts" + t + "=" + r.ts + "&d" + t + "=" + r.d, t++
                        }
                        return n += e, this.addLongPollTag_(n, this.currentSerial), !0
                    }
                    return !1
                }
                enqueueSegment(e, t, n) {
                    this.pendingSegs.push({
                        seg: e,
                        ts: t,
                        d: n
                    }), this.alive && this.newRequest_()
                }
                addLongPollTag_(e, t) {
                    this.outstandingRequests.add(t);
                    const n = () => {
                            this.outstandingRequests.delete(t), this.newRequest_()
                        },
                        r = setTimeout(n, Math.floor(25e3));
                    this.addTag(e, () => {
                        clearTimeout(r), n()
                    })
                }
                addTag(e, n) {
                    setTimeout(() => {
                        try {
                            if (!this.sendNewPolls) return;
                            const t = this.myIFrame.doc.createElement("script");
                            t.type = "text/javascript", t.async = !0, t.src = e, t.onload = t.onreadystatechange = function() {
                                var e = t.readyState;
                                e && "loaded" !== e && "complete" !== e || (t.onload = t.onreadystatechange = null, t.parentNode && t.parentNode.removeChild(t), n())
                            }, t.onerror = () => {
                                pe("Long-poll script failed to load: " + e), this.sendNewPolls = !1, this.close()
                            }, this.myIFrame.doc.body.appendChild(t)
                        } catch (e) {}
                    }, Math.floor(1))
                }
            }
            let He = null;
            "undefined" != typeof MozWebSocket ? He = MozWebSocket : "undefined" != typeof WebSocket && (He = WebSocket);
            class Qe {
                constructor(e, t, n, r, i, s, o) {
                    this.connId = e, this.applicationId = n, this.appCheckToken = r, this.authToken = i, this.keepaliveTimer = null, this.frames = null, this.totalFrames = 0, this.bytesSent = 0, this.bytesReceived = 0, this.log_ = ae(this.connId), this.stats_ = Be(t), this.connURL = Qe.connectionURL_(t, s, o, r, n), this.nodeAdmin = t.nodeAdmin
                }
                static connectionURL_(e, t, n, r, i) {
                    const s = {
                        v: "5"
                    };
                    return "undefined" != typeof location && location.hostname && Ae.test(location.hostname) && (s.r = "f"), t && (s.s = t), n && (s.ls = n), r && (s.ac = r), i && (s.p = i), Fe(e, Oe, s)
                }
                open(e, t) {
                    this.onDisconnect = t, this.onMessage = e, this.log_("Websocket connecting to " + this.connURL), this.everConnected_ = !1, ee.set("previous_websocket_failure", !0);
                    try {
                        g(), this.mySock = new He(this.connURL, [], void 0)
                    } catch (e) {
                        this.log_("Error instantiating WebSocket.");
                        var n = e.message || e.data;
                        return n && this.log_(n), void this.onClosed_()
                    }
                    this.mySock.onopen = () => {
                        this.log_("Websocket connected."), this.everConnected_ = !0
                    }, this.mySock.onclose = () => {
                        this.log_("Websocket connection was disconnected."), this.mySock = null, this.onClosed_()
                    }, this.mySock.onmessage = e => {
                        this.handleIncomingFrame(e)
                    }, this.mySock.onerror = e => {
                        this.log_("WebSocket error.  Closing connection.");
                        var t = e.message || e.data;
                        t && this.log_(t), this.onClosed_()
                    }
                }
                start() {}
                static forceDisallow() {
                    Qe.forceDisallow_ = !0
                }
                static isAvailable() {
                    let e = !1;
                    var t;
                    return "undefined" == typeof navigator || !navigator.userAgent || (t = navigator.userAgent.match(/Android ([0-9]{0,}\.[0-9]{0,})/)) && 1 < t.length && parseFloat(t[1]) < 4.4 && (e = !0), !e && null !== He && !Qe.forceDisallow_
                }
                static previouslyFailed() {
                    return ee.isInMemoryStorage || !0 === ee.get("previous_websocket_failure")
                }
                markConnectionHealthy() {
                    ee.remove("previous_websocket_failure")
                }
                appendFrame_(e) {
                    var t;
                    this.frames.push(e), this.frames.length === this.totalFrames && (t = this.frames.join(""), this.frames = null, t = m(t), this.onMessage(t))
                }
                handleNewFrameCount_(e) {
                    this.totalFrames = e, this.frames = []
                }
                extractFrameCount_(e) {
                    if (p(null === this.frames, "We already have a frame buffer"), e.length <= 6) {
                        var t = Number(e);
                        if (!isNaN(t)) return this.handleNewFrameCount_(t), null
                    }
                    return this.handleNewFrameCount_(1), e
                }
                handleIncomingFrame(e) {
                    var t;
                    null !== this.mySock && (t = e.data, this.bytesReceived += t.length, this.stats_.incrementCounter("bytes_received", t.length), this.resetKeepAlive(), null !== this.frames ? this.appendFrame_(t) : null !== (t = this.extractFrameCount_(t)) && this.appendFrame_(t))
                }
                send(e) {
                    this.resetKeepAlive();
                    var t = v(e);
                    this.bytesSent += t.length, this.stats_.incrementCounter("bytes_sent", t.length);
                    var n = de(t, 16384);
                    1 < n.length && this.sendString_(String(n.length));
                    for (let r = 0; r < n.length; r++) this.sendString_(n[r])
                }
                shutdown_() {
                    this.isClosed_ = !0, this.keepaliveTimer && (clearInterval(this.keepaliveTimer), this.keepaliveTimer = null), this.mySock && (this.mySock.close(), this.mySock = null)
                }
                onClosed_() {
                    this.isClosed_ || (this.log_("WebSocket is closing itself"), this.shutdown_(), this.onDisconnect && (this.onDisconnect(this.everConnected_), this.onDisconnect = null))
                }
                close() {
                    this.isClosed_ || (this.log_("WebSocket is being closed"), this.shutdown_())
                }
                resetKeepAlive() {
                    clearInterval(this.keepaliveTimer), this.keepaliveTimer = setInterval(() => {
                        this.mySock && this.sendString_("0"), this.resetKeepAlive()
                    }, Math.floor(45e3))
                }
                sendString_(e) {
                    try {
                        this.mySock.send(e)
                    } catch (e) {
                        this.log_("Exception thrown from WebSocket.send():", e.message || e.data, "Closing connection."), setTimeout(this.onClosed_.bind(this), 0)
                    }
                }
            }
            Qe.responsesRequiredToBeHealthy = 2, Qe.healthyTimeout = 3e4;
            class Ye {
                constructor(e) {
                    this.initTransports_(e)
                }
                static get ALL_TRANSPORTS() {
                    return [Ve, Qe]
                }
                static get IS_TRANSPORT_INITIALIZED() {
                    return this.globalTransportInitialized_
                }
                initTransports_(e) {
                    var t = Qe && Qe.isAvailable();
                    let n = t && !Qe.previouslyFailed();
                    if (e.webSocketOnly && (t || ge("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."), n = !0), n) this.transports_ = [Qe];
                    else {
                        const r = this.transports_ = [];
                        for (const i of Ye.ALL_TRANSPORTS) i && i.isAvailable() && r.push(i);
                        Ye.globalTransportInitialized_ = !0
                    }
                }
                initialTransport() {
                    if (0 < this.transports_.length) return this.transports_[0];
                    throw new Error("No transports available")
                }
                upgradeTransport() {
                    return 1 < this.transports_.length ? this.transports_[1] : null
                }
            }
            Ye.globalTransportInitialized_ = !1;
            class Ke {
                constructor(e, t, n, r, i, s, o, a, l, h) {
                    this.id = e, this.repoInfo_ = t, this.applicationId_ = n, this.appCheckToken_ = r, this.authToken_ = i, this.onMessage_ = s, this.onReady_ = o, this.onDisconnect_ = a, this.onKill_ = l, this.lastSessionId = h, this.connectionCount = 0, this.pendingDataMessages = [], this.state_ = 0, this.log_ = ae("c:" + this.id + ":"), this.transportManager_ = new Ye(t), this.log_("Connection created"), this.start_()
                }
                start_() {
                    const e = this.transportManager_.initialTransport();
                    this.conn_ = new e(this.nextTransportId_(), this.repoInfo_, this.applicationId_, this.appCheckToken_, this.authToken_, null, this.lastSessionId), this.primaryResponsesRequired_ = e.responsesRequiredToBeHealthy || 0;
                    const t = this.connReceiver_(this.conn_),
                        n = this.disconnReceiver_(this.conn_);
                    this.tx_ = this.conn_, this.rx_ = this.conn_, this.secondaryConn_ = null, this.isHealthy_ = !1, setTimeout(() => {
                        this.conn_ && this.conn_.open(t, n)
                    }, Math.floor(0));
                    var r = e.healthyTimeout || 0;
                    0 < r && (this.healthyTimeout_ = Ee(() => {
                        this.healthyTimeout_ = null, this.isHealthy_ || (this.conn_ && 102400 < this.conn_.bytesReceived ? (this.log_("Connection exceeded healthy timeout but has received " + this.conn_.bytesReceived + " bytes.  Marking connection healthy."), this.isHealthy_ = !0, this.conn_.markConnectionHealthy()) : this.conn_ && 10240 < this.conn_.bytesSent ? this.log_("Connection exceeded healthy timeout but has sent " + this.conn_.bytesSent + " bytes.  Leaving connection alive.") : (this.log_("Closing unhealthy connection after timeout."), this.close()))
                    }, Math.floor(r)))
                }
                nextTransportId_() {
                    return "c:" + this.id + ":" + this.connectionCount++
                }
                disconnReceiver_(t) {
                    return e => {
                        t === this.conn_ ? this.onConnectionLost_(e) : t === this.secondaryConn_ ? (this.log_("Secondary connection lost."), this.onSecondaryConnectionLost_()) : this.log_("closing an old connection")
                    }
                }
                connReceiver_(t) {
                    return e => {
                        2 !== this.state_ && (t === this.rx_ ? this.onPrimaryMessageReceived_(e) : t === this.secondaryConn_ ? this.onSecondaryMessageReceived_(e) : this.log_("message on old connection"))
                    }
                }
                sendRequest(e) {
                    this.sendData_({
                        t: "d",
                        d: e
                    })
                }
                tryCleanupConnection() {
                    this.tx_ === this.secondaryConn_ && this.rx_ === this.secondaryConn_ && (this.log_("cleaning up and promoting a connection: " + this.secondaryConn_.connId), this.conn_ = this.secondaryConn_, this.secondaryConn_ = null)
                }
                onSecondaryControl_(e) {
                    var t;
                    "t" in e && ("a" === (t = e.t) ? this.upgradeIfSecondaryHealthy_() : "r" === t ? (this.log_("Got a reset on secondary, closing it"), this.secondaryConn_.close(), this.tx_ !== this.secondaryConn_ && this.rx_ !== this.secondaryConn_ || this.close()) : "o" === t && (this.log_("got pong on secondary."), this.secondaryResponsesRequired_--, this.upgradeIfSecondaryHealthy_()))
                }
                onSecondaryMessageReceived_(e) {
                    var t = ce("t", e),
                        n = ce("d", e);
                    if ("c" === t) this.onSecondaryControl_(n);
                    else {
                        if ("d" !== t) throw new Error("Unknown protocol layer: " + t);
                        this.pendingDataMessages.push(n)
                    }
                }
                upgradeIfSecondaryHealthy_() {
                    this.secondaryResponsesRequired_ <= 0 ? (this.log_("Secondary connection is healthy."), this.isHealthy_ = !0, this.secondaryConn_.markConnectionHealthy(), this.proceedWithUpgrade_()) : (this.log_("sending ping on secondary."), this.secondaryConn_.send({
                        t: "c",
                        d: {
                            t: "p",
                            d: {}
                        }
                    }))
                }
                proceedWithUpgrade_() {
                    this.secondaryConn_.start(), this.log_("sending client ack on secondary"), this.secondaryConn_.send({
                        t: "c",
                        d: {
                            t: "a",
                            d: {}
                        }
                    }), this.log_("Ending transmission on primary"), this.conn_.send({
                        t: "c",
                        d: {
                            t: "n",
                            d: {}
                        }
                    }), this.tx_ = this.secondaryConn_, this.tryCleanupConnection()
                }
                onPrimaryMessageReceived_(e) {
                    var t = ce("t", e),
                        n = ce("d", e);
                    "c" === t ? this.onControl_(n) : "d" === t && this.onDataMessage_(n)
                }
                onDataMessage_(e) {
                    this.onPrimaryResponse_(), this.onMessage_(e)
                }
                onPrimaryResponse_() {
                    this.isHealthy_ || (this.primaryResponsesRequired_--, this.primaryResponsesRequired_ <= 0 && (this.log_("Primary connection is healthy."), this.isHealthy_ = !0, this.conn_.markConnectionHealthy()))
                }
                onControl_(e) {
                    var t = ce("t", e);
                    if ("d" in e) {
                        var n = e.d;
                        if ("h" === t) {
                            const r = Object.assign({}, n);
                            this.repoInfo_.isUsingEmulator && (r.h = this.repoInfo_.host), this.onHandshake_(r)
                        } else if ("n" === t) {
                            this.log_("recvd end transmission on primary"), this.rx_ = this.secondaryConn_;
                            for (let e = 0; e < this.pendingDataMessages.length; ++e) this.onDataMessage_(this.pendingDataMessages[e]);
                            this.pendingDataMessages = [], this.tryCleanupConnection()
                        } else "s" === t ? this.onConnectionShutdown_(n) : "r" === t ? this.onReset_(n) : "e" === t ? le("Server Error: " + n) : "o" === t ? (this.log_("got pong on primary."), this.onPrimaryResponse_(), this.sendPingOnPrimaryIfNecessary_()) : le("Unknown control packet command: " + t)
                    }
                }
                onHandshake_(e) {
                    var t = e.ts,
                        n = e.v,
                        r = e.h;
                    this.sessionId = e.s, this.repoInfo_.host = r, 0 === this.state_ && (this.conn_.start(), this.onConnectionEstablished_(this.conn_, t), "5" !== n && ge("Protocol version mismatch detected"), this.tryStartUpgrade_())
                }
                tryStartUpgrade_() {
                    var e = this.transportManager_.upgradeTransport();
                    e && this.startUpgrade_(e)
                }
                startUpgrade_(e) {
                    this.secondaryConn_ = new e(this.nextTransportId_(), this.repoInfo_, this.applicationId_, this.appCheckToken_, this.authToken_, this.sessionId), this.secondaryResponsesRequired_ = e.responsesRequiredToBeHealthy || 0;
                    var t = this.connReceiver_(this.secondaryConn_),
                        n = this.disconnReceiver_(this.secondaryConn_);
                    this.secondaryConn_.open(t, n), Ee(() => {
                        this.secondaryConn_ && (this.log_("Timed out trying to upgrade."), this.secondaryConn_.close())
                    }, Math.floor(6e4))
                }
                onReset_(e) {
                    this.log_("Reset packet received.  New host: " + e), this.repoInfo_.host = e, 1 === this.state_ ? this.close() : (this.closeConnections_(), this.start_())
                }
                onConnectionEstablished_(e, t) {
                    this.log_("Realtime connection established."), this.conn_ = e, this.state_ = 1, this.onReady_ && (this.onReady_(t, this.sessionId), this.onReady_ = null), 0 === this.primaryResponsesRequired_ ? (this.log_("Primary connection is healthy."), this.isHealthy_ = !0) : Ee(() => {
                        this.sendPingOnPrimaryIfNecessary_()
                    }, Math.floor(5e3))
                }
                sendPingOnPrimaryIfNecessary_() {
                    this.isHealthy_ || 1 !== this.state_ || (this.log_("sending ping on primary."), this.sendData_({
                        t: "c",
                        d: {
                            t: "p",
                            d: {}
                        }
                    }))
                }
                onSecondaryConnectionLost_() {
                    var e = this.secondaryConn_;
                    this.secondaryConn_ = null, this.tx_ !== e && this.rx_ !== e || this.close()
                }
                onConnectionLost_(e) {
                    this.conn_ = null, e || 0 !== this.state_ ? 1 === this.state_ && this.log_("Realtime connection lost.") : (this.log_("Realtime connection failed."), this.repoInfo_.isCacheableHost() && (ee.remove("host:" + this.repoInfo_.host), this.repoInfo_.internalHost = this.repoInfo_.host)), this.close()
                }
                onConnectionShutdown_(e) {
                    this.log_("Connection shutdown command received. Shutting down..."), this.onKill_ && (this.onKill_(e), this.onKill_ = null), this.onDisconnect_ = null, this.close()
                }
                sendData_(e) {
                    if (1 !== this.state_) throw "Connection is not connected";
                    this.tx_.send(e)
                }
                close() {
                    2 !== this.state_ && (this.log_("Closing realtime connection."), this.state_ = 2, this.closeConnections_(), this.onDisconnect_ && (this.onDisconnect_(), this.onDisconnect_ = null))
                }
                closeConnections_() {
                    this.log_("Shutting down all connections"), this.conn_ && (this.conn_.close(), this.conn_ = null), this.secondaryConn_ && (this.secondaryConn_.close(), this.secondaryConn_ = null), this.healthyTimeout_ && (clearTimeout(this.healthyTimeout_), this.healthyTimeout_ = null)
                }
            }
            class $e {
                put(e, t, n, r) {}
                merge(e, t, n, r) {}
                refreshAuthToken(e) {}
                refreshAppCheckToken(e) {}
                onDisconnectPut(e, t, n) {}
                onDisconnectMerge(e, t, n) {}
                onDisconnectCancel(e, t) {}
                reportStats(e) {}
            }
            class Ge {
                constructor(e) {
                    this.allowedEvents_ = e, this.listeners_ = {}, p(Array.isArray(e) && 0 < e.length, "Requires a non-empty array")
                }
                trigger(t, ...n) {
                    if (Array.isArray(this.listeners_[t])) {
                        const r = [...this.listeners_[t]];
                        for (let e = 0; e < r.length; e++) r[e].callback.apply(r[e].context, n)
                    }
                }
                on(e, t, n) {
                    this.validateEventType_(e), this.listeners_[e] = this.listeners_[e] || [], this.listeners_[e].push({
                        callback: t,
                        context: n
                    });
                    var r = this.getInitialEvent(e);
                    r && t.apply(n, r)
                }
                off(e, t, n) {
                    this.validateEventType_(e);
                    const r = this.listeners_[e] || [];
                    for (let i = 0; i < r.length; i++)
                        if (r[i].callback === t && (!n || n === r[i].context)) return void r.splice(i, 1)
                }
                validateEventType_(t) {
                    p(this.allowedEvents_.find(e => e === t), "Unknown event: " + t)
                }
            }
            class Je extends Ge {
                constructor() {
                    super(["online"]), this.online_ = !0, "undefined" == typeof window || void 0 === window.addEventListener || f() || (window.addEventListener("online", () => {
                        this.online_ || (this.online_ = !0, this.trigger("online", !0))
                    }, !1), window.addEventListener("offline", () => {
                        this.online_ && (this.online_ = !1, this.trigger("online", !1))
                    }, !1))
                }
                static getInstance() {
                    return new Je
                }
                getInitialEvent(e) {
                    return p("online" === e, "Unknown event type: " + e), [this.online_]
                }
                currentlyOnline() {
                    return this.online_
                }
            }
            class Xe {
                constructor(n, e) {
                    if (void 0 === e) {
                        this.pieces_ = n.split("/");
                        let e = 0;
                        for (let t = 0; t < this.pieces_.length; t++) 0 < this.pieces_[t].length && (this.pieces_[e] = this.pieces_[t], e++);
                        this.pieces_.length = e, this.pieceNum_ = 0
                    } else this.pieces_ = n, this.pieceNum_ = e
                }
                toString() {
                    let e = "";
                    for (let t = this.pieceNum_; t < this.pieces_.length; t++) "" !== this.pieces_[t] && (e += "/" + this.pieces_[t]);
                    return e || "/"
                }
            }

            function Ze() {
                return new Xe("")
            }

            function et(e) {
                return e.pieceNum_ >= e.pieces_.length ? null : e.pieces_[e.pieceNum_]
            }

            function tt(e) {
                return e.pieces_.length - e.pieceNum_
            }

            function nt(e) {
                let t = e.pieceNum_;
                return t < e.pieces_.length && t++, new Xe(e.pieces_, t)
            }

            function rt(e) {
                return e.pieceNum_ < e.pieces_.length ? e.pieces_[e.pieces_.length - 1] : null
            }

            function it(e, t = 0) {
                return e.pieces_.slice(e.pieceNum_ + t)
            }

            function st(e) {
                if (e.pieceNum_ >= e.pieces_.length) return null;
                const t = [];
                for (let n = e.pieceNum_; n < e.pieces_.length - 1; n++) t.push(e.pieces_[n]);
                return new Xe(t, 0)
            }

            function ot(e, t) {
                const n = [];
                for (let i = e.pieceNum_; i < e.pieces_.length; i++) n.push(e.pieces_[i]);
                if (t instanceof Xe)
                    for (let e = t.pieceNum_; e < t.pieces_.length; e++) n.push(t.pieces_[e]);
                else {
                    var r = t.split("/");
                    for (let e = 0; e < r.length; e++) 0 < r[e].length && n.push(r[e])
                }
                return new Xe(n, 0)
            }

            function at(e) {
                return e.pieceNum_ >= e.pieces_.length
            }

            function lt(e, t) {
                var n = et(e),
                    r = et(t);
                if (null === n) return t;
                if (n === r) return lt(nt(e), nt(t));
                throw new Error("INTERNAL ERROR: innerPath (" + t + ") is not within outerPath (" + e + ")")
            }

            function ht(e, t) {
                var n = it(e, 0),
                    r = it(t, 0);
                for (let s = 0; s < n.length && s < r.length; s++) {
                    var i = Ce(n[s], r[s]);
                    if (0 !== i) return i
                }
                return n.length === r.length ? 0 : n.length < r.length ? -1 : 1
            }

            function ct(e, t) {
                if (tt(e) !== tt(t)) return !1;
                for (let n = e.pieceNum_, r = t.pieceNum_; n <= e.pieces_.length; n++, r++)
                    if (e.pieces_[n] !== t.pieces_[r]) return !1;
                return !0
            }

            function ut(e, t) {
                let n = e.pieceNum_,
                    r = t.pieceNum_;
                if (tt(e) > tt(t)) return !1;
                for (; n < e.pieces_.length;) {
                    if (e.pieces_[n] !== t.pieces_[r]) return !1;
                    ++n, ++r
                }
                return !0
            }
            class dt {
                constructor(e, t) {
                    this.errorPrefix_ = t, this.parts_ = it(e, 0), this.byteLength_ = Math.max(1, this.parts_.length);
                    for (let n = 0; n < this.parts_.length; n++) this.byteLength_ += P(this.parts_[n]);
                    _t(this)
                }
            }

            function _t(e) {
                if (768 < e.byteLength_) throw new Error(e.errorPrefix_ + "has a key path longer than 768 bytes (" + e.byteLength_ + ").");
                if (32 < e.parts_.length) throw new Error(e.errorPrefix_ + "path specified exceeds the maximum depth that can be written (32) or object contains a cycle " + pt(e))
            }

            function pt(e) {
                return 0 === e.parts_.length ? "" : "in property '" + e.parts_.join(".") + "'"
            }
            class ft extends Ge {
                constructor() {
                    super(["visible"]);
                    let t, e;
                    "undefined" != typeof document && void 0 !== document.addEventListener && (void 0 !== document.hidden ? (e = "visibilitychange", t = "hidden") : void 0 !== document.mozHidden ? (e = "mozvisibilitychange", t = "mozHidden") : void 0 !== document.msHidden ? (e = "msvisibilitychange", t = "msHidden") : void 0 !== document.webkitHidden && (e = "webkitvisibilitychange", t = "webkitHidden")), this.visible_ = !0, e && document.addEventListener(e, () => {
                        var e = !document[t];
                        e !== this.visible_ && (this.visible_ = e, this.trigger("visible", e))
                    }, !1)
                }
                static getInstance() {
                    return new ft
                }
                getInitialEvent(e) {
                    return p("visible" === e, "Unknown event type: " + e), [this.visible_]
                }
            }
            class gt extends $e {
                constructor(e, t, n, r, i, s, o, a) {
                    if (super(), this.repoInfo_ = e, this.applicationId_ = t, this.onDataUpdate_ = n, this.onConnectStatus_ = r, this.onServerInfoUpdate_ = i, this.authTokenProvider_ = s, this.appCheckTokenProvider_ = o, this.authOverride_ = a, this.id = gt.nextPersistentConnectionId_++, this.log_ = ae("p:" + this.id + ":"), this.interruptReasons_ = {}, this.listens = new Map, this.outstandingPuts_ = [], this.outstandingGets_ = [], this.outstandingPutCount_ = 0, this.outstandingGetCount_ = 0, this.onDisconnectRequestQueue_ = [], this.connected_ = !1, this.reconnectDelay_ = 1e3, this.maxReconnectDelay_ = 3e5, this.securityDebugCallback_ = null, this.lastSessionId = null, this.establishConnectionTimer_ = null, this.visible_ = !1, this.requestCBHash_ = {}, this.requestNumber_ = 0, this.realtime_ = null, this.authToken_ = null, this.appCheckToken_ = null, this.forceTokenRefresh_ = !1, this.invalidAuthTokenCount_ = 0, this.invalidAppCheckTokenCount_ = 0, this.firstConnection_ = !0, this.lastConnectionAttemptTime_ = null, this.lastConnectionEstablishedTime_ = null, a && !g()) throw new Error("Auth override specified in options, but not supported on non Node.js platforms");
                    ft.getInstance().on("visible", this.onVisible_, this), -1 === e.host.indexOf("fblocal") && Je.getInstance().on("online", this.onOnline_, this)
                }
                sendRequest(e, t, n) {
                    var r = ++this.requestNumber_,
                        i = {
                            r: r,
                            a: e,
                            b: t
                        };
                    this.log_(v(i)), p(this.connected_, "sendRequest call when we're not connected not allowed."), this.realtime_.sendRequest(i), n && (this.requestCBHash_[r] = n)
                }
                get(e) {
                    this.initConnection_();
                    const n = new _;
                    var t = {
                        p: e._path.toString(),
                        q: e._queryObject
                    };
                    this.outstandingGets_.push({
                        action: "g",
                        request: t,
                        onComplete: e => {
                            var t = e.d;
                            "ok" === e.s ? n.resolve(t) : n.reject(t)
                        }
                    }), this.outstandingGetCount_++;
                    t = this.outstandingGets_.length - 1;
                    return this.connected_ && this.sendGet_(t), n.promise
                }
                listen(e, t, n, r) {
                    this.initConnection_();
                    var i = e._queryIdentifier,
                        s = e._path.toString();
                    this.log_("Listen called for " + s + " " + i), this.listens.has(s) || this.listens.set(s, new Map), p(e._queryParams.isDefault() || !e._queryParams.loadsAllData(), "listen() called for non-default but complete query"), p(!this.listens.get(s).has(i), "listen() called twice for same path/queryId.");
                    var o = {
                        onComplete: r,
                        hashFn: t,
                        query: e,
                        tag: n
                    };
                    this.listens.get(s).set(i, o), this.connected_ && this.sendListen_(o)
                }
                sendGet_(t) {
                    const n = this.outstandingGets_[t];
                    this.sendRequest("g", n.request, e => {
                        delete this.outstandingGets_[t], this.outstandingGetCount_--, 0 === this.outstandingGetCount_ && (this.outstandingGets_ = []), n.onComplete && n.onComplete(e)
                    })
                }
                sendListen_(r) {
                    const i = r.query,
                        s = i._path.toString(),
                        o = i._queryIdentifier;
                    this.log_("Listen on " + s + " for " + o);
                    const e = {
                        p: s
                    };
                    r.tag && (e.q = i._queryObject, e.t = r.tag), e.h = r.hashFn(), this.sendRequest("q", e, e => {
                        var t = e.d,
                            n = e.s;
                        gt.warnOnListenWarnings_(t, i), (this.listens.get(s) && this.listens.get(s).get(o)) === r && (this.log_("listen response", e), "ok" !== n && this.removeListen_(s, o), r.onComplete && r.onComplete(n, t))
                    })
                }
                static warnOnListenWarnings_(e, t) {
                    if (e && "object" == typeof e && w(e, "w")) {
                        const i = C(e, "w");
                        var n, r;
                        Array.isArray(i) && ~i.indexOf("no_index") && (n = '".indexOn": "' + t._queryParams.getIndex().toString() + '"', r = t._path.toString(), ge("Using an unspecified index. Your data will be downloaded and " + `filtered on the client. Consider adding ${n} at ` + `${r} to your security rules for better performance.`))
                    }
                }
                refreshAuthToken(e) {
                    this.authToken_ = e, this.log_("Auth token refreshed"), this.authToken_ ? this.tryAuth() : this.connected_ && this.sendRequest("unauth", {}, () => {}), this.reduceReconnectDelayIfAdminCredential_(e)
                }
                reduceReconnectDelayIfAdminCredential_(e) {
                    var t;
                    (e && 40 === e.length || (e = e, "object" == typeof(t = y(e).claims) && !0 === t.admin)) && (this.log_("Admin auth credential detected.  Reducing max reconnect time."), this.maxReconnectDelay_ = 3e4)
                }
                refreshAppCheckToken(e) {
                    this.appCheckToken_ = e, this.log_("App check token refreshed"), this.appCheckToken_ ? this.tryAppCheck() : this.connected_ && this.sendRequest("unappeck", {}, () => {})
                }
                tryAuth() {
                    if (this.connected_ && this.authToken_) {
                        const r = this.authToken_;
                        var e = function(e) {
                            const t = y(e),
                                n = t.claims;
                            return !!n && "object" == typeof n && n.hasOwnProperty("iat")
                        }(r) ? "auth" : "gauth";
                        const t = {
                            cred: r
                        };
                        null === this.authOverride_ ? t.noauth = !0 : "object" == typeof this.authOverride_ && (t.authvar = this.authOverride_), this.sendRequest(e, t, e => {
                            var t = e.s,
                                n = e.d || "error";
                            this.authToken_ === r && ("ok" === t ? this.invalidAuthTokenCount_ = 0 : this.onAuthRevoked_(t, n))
                        })
                    }
                }
                tryAppCheck() {
                    this.connected_ && this.appCheckToken_ && this.sendRequest("appcheck", {
                        token: this.appCheckToken_
                    }, e => {
                        var t = e.s,
                            n = e.d || "error";
                        "ok" === t ? this.invalidAppCheckTokenCount_ = 0 : this.onAppCheckRevoked_(t, n)
                    })
                }
                unlisten(e, t) {
                    var n = e._path.toString(),
                        r = e._queryIdentifier;
                    this.log_("Unlisten called for " + n + " " + r), p(e._queryParams.isDefault() || !e._queryParams.loadsAllData(), "unlisten() called for non-default but complete query"), this.removeListen_(n, r) && this.connected_ && this.sendUnlisten_(n, r, e._queryObject, t)
                }
                sendUnlisten_(e, t, n, r) {
                    this.log_("Unlisten on " + e + " for " + t);
                    const i = {
                        p: e
                    };
                    r && (i.q = n, i.t = r), this.sendRequest("n", i)
                }
                onDisconnectPut(e, t, n) {
                    this.initConnection_(), this.connected_ ? this.sendOnDisconnect_("o", e, t, n) : this.onDisconnectRequestQueue_.push({
                        pathString: e,
                        action: "o",
                        data: t,
                        onComplete: n
                    })
                }
                onDisconnectMerge(e, t, n) {
                    this.initConnection_(), this.connected_ ? this.sendOnDisconnect_("om", e, t, n) : this.onDisconnectRequestQueue_.push({
                        pathString: e,
                        action: "om",
                        data: t,
                        onComplete: n
                    })
                }
                onDisconnectCancel(e, t) {
                    this.initConnection_(), this.connected_ ? this.sendOnDisconnect_("oc", e, null, t) : this.onDisconnectRequestQueue_.push({
                        pathString: e,
                        action: "oc",
                        data: null,
                        onComplete: t
                    })
                }
                sendOnDisconnect_(e, t, n, r) {
                    var i = {
                        p: t,
                        d: n
                    };
                    this.log_("onDisconnect " + e, i), this.sendRequest(e, i, e => {
                        r && setTimeout(() => {
                            r(e.s, e.d)
                        }, Math.floor(0))
                    })
                }
                put(e, t, n, r) {
                    this.putInternal("p", e, t, n, r)
                }
                merge(e, t, n, r) {
                    this.putInternal("m", e, t, n, r)
                }
                putInternal(e, t, n, r, i) {
                    this.initConnection_();
                    const s = {
                        p: t,
                        d: n
                    };
                    void 0 !== i && (s.h = i), this.outstandingPuts_.push({
                        action: e,
                        request: s,
                        onComplete: r
                    }), this.outstandingPutCount_++;
                    var o = this.outstandingPuts_.length - 1;
                    this.connected_ ? this.sendPut_(o) : this.log_("Buffering put: " + t)
                }
                sendPut_(t) {
                    const n = this.outstandingPuts_[t].action;
                    var e = this.outstandingPuts_[t].request;
                    const r = this.outstandingPuts_[t].onComplete;
                    this.outstandingPuts_[t].queued = this.connected_, this.sendRequest(n, e, e => {
                        this.log_(n + " response", e), delete this.outstandingPuts_[t], this.outstandingPutCount_--, 0 === this.outstandingPutCount_ && (this.outstandingPuts_ = []), r && r(e.s, e.d)
                    })
                }
                reportStats(e) {
                    var t;
                    this.connected_ && (this.log_("reportStats", t = {
                        c: e
                    }), this.sendRequest("s", t, e => {
                        var t;
                        "ok" !== e.s && (t = e.d, this.log_("reportStats", "Error sending stats: " + t))
                    }))
                }
                onDataMessage_(e) {
                    if ("r" in e) {
                        this.log_("from server: " + v(e));
                        var t = e.r;
                        const n = this.requestCBHash_[t];
                        n && (delete this.requestCBHash_[t], n(e.b))
                    } else {
                        if ("error" in e) throw "A server-side error has occurred: " + e.error;
                        "a" in e && this.onDataPush_(e.a, e.b)
                    }
                }
                onDataPush_(e, t) {
                    this.log_("handleServerMessage", e, t), "d" === e ? this.onDataUpdate_(t.p, t.d, !1, t.t) : "m" === e ? this.onDataUpdate_(t.p, t.d, !0, t.t) : "c" === e ? this.onListenRevoked_(t.p, t.q) : "ac" === e ? this.onAuthRevoked_(t.s, t.d) : "apc" === e ? this.onAppCheckRevoked_(t.s, t.d) : "sd" === e ? this.onSecurityDebugPacket_(t) : le("Unrecognized action received from server: " + v(e) + "\nAre you using the latest client?")
                }
                onReady_(e, t) {
                    this.log_("connection ready"), this.connected_ = !0, this.lastConnectionEstablishedTime_ = (new Date).getTime(), this.handleTimestamp_(e), this.lastSessionId = t, this.firstConnection_ && this.sendConnectStats_(), this.restoreState_(), this.firstConnection_ = !1, this.onConnectStatus_(!0)
                }
                scheduleConnect_(e) {
                    p(!this.realtime_, "Scheduling a connect when we're already connected/ing?"), this.establishConnectionTimer_ && clearTimeout(this.establishConnectionTimer_), this.establishConnectionTimer_ = setTimeout(() => {
                        this.establishConnectionTimer_ = null, this.establishConnection_()
                    }, Math.floor(e))
                }
                initConnection_() {
                    !this.realtime_ && this.firstConnection_ && this.scheduleConnect_(0)
                }
                onVisible_(e) {
                    e && !this.visible_ && this.reconnectDelay_ === this.maxReconnectDelay_ && (this.log_("Window became visible.  Reducing delay."), this.reconnectDelay_ = 1e3, this.realtime_ || this.scheduleConnect_(0)), this.visible_ = e
                }
                onOnline_(e) {
                    e ? (this.log_("Browser went online."), this.reconnectDelay_ = 1e3, this.realtime_ || this.scheduleConnect_(0)) : (this.log_("Browser went offline.  Killing connection."), this.realtime_ && this.realtime_.close())
                }
                onRealtimeDisconnect_() {
                    var e;
                    this.log_("data client disconnected"), this.connected_ = !1, this.realtime_ = null, this.cancelSentTransactions_(), this.requestCBHash_ = {}, this.shouldReconnect_() && (this.visible_ ? this.lastConnectionEstablishedTime_ && (3e4 < (new Date).getTime() - this.lastConnectionEstablishedTime_ && (this.reconnectDelay_ = 1e3), this.lastConnectionEstablishedTime_ = null) : (this.log_("Window isn't visible.  Delaying reconnect."), this.reconnectDelay_ = this.maxReconnectDelay_, this.lastConnectionAttemptTime_ = (new Date).getTime()), e = (new Date).getTime() - this.lastConnectionAttemptTime_, e = Math.max(0, this.reconnectDelay_ - e), e = Math.random() * e, this.log_("Trying to reconnect in " + e + "ms"), this.scheduleConnect_(e), this.reconnectDelay_ = Math.min(this.maxReconnectDelay_, 1.3 * this.reconnectDelay_)), this.onConnectStatus_(!1)
                }
                async establishConnection_() {
                    if (this.shouldReconnect_()) {
                        this.log_("Making a connection attempt"), this.lastConnectionAttemptTime_ = (new Date).getTime(), this.lastConnectionEstablishedTime_ = null;
                        var e = this.onDataMessage_.bind(this),
                            r = this.onReady_.bind(this);
                        const c = this.onRealtimeDisconnect_.bind(this);
                        var i = this.id + ":" + gt.nextConnectionId_++,
                            s = this.lastSessionId;
                        let t = !1,
                            n = null;
                        var o = function() {
                            n ? n.close() : (t = !0, c())
                        };
                        this.realtime_ = {
                            close: o,
                            sendRequest: function(e) {
                                p(n, "sendRequest call when we're not connected not allowed."), n.sendRequest(e)
                            }
                        };
                        var a = this.forceTokenRefresh_;
                        this.forceTokenRefresh_ = !1;
                        try {
                            var [l, h] = await Promise.all([this.authTokenProvider_.getToken(a), this.appCheckTokenProvider_.getToken(a)]);
                            t ? pe("getToken() completed but was canceled") : (pe("getToken() completed. Creating connection."), this.authToken_ = l && l.accessToken, this.appCheckToken_ = h && h.token, n = new Ke(i, this.repoInfo_, this.applicationId_, this.appCheckToken_, this.authToken_, e, r, c, e => {
                                ge(e + " (" + this.repoInfo_.toString() + ")"), this.interrupt("server_kill")
                            }, s))
                        } catch (e) {
                            this.log_("Failed to get token: " + e), t || (this.repoInfo_.nodeAdmin && ge(e), o())
                        }
                    }
                }
                interrupt(e) {
                    pe("Interrupting connection for reason: " + e), this.interruptReasons_[e] = !0, this.realtime_ ? this.realtime_.close() : (this.establishConnectionTimer_ && (clearTimeout(this.establishConnectionTimer_), this.establishConnectionTimer_ = null), this.connected_ && this.onRealtimeDisconnect_())
                }
                resume(e) {
                    pe("Resuming connection for reason: " + e), delete this.interruptReasons_[e], b(this.interruptReasons_) && (this.reconnectDelay_ = 1e3, this.realtime_ || this.scheduleConnect_(0))
                }
                handleTimestamp_(e) {
                    var t = e - (new Date).getTime();
                    this.onServerInfoUpdate_({
                        serverTimeOffset: t
                    })
                }
                cancelSentTransactions_() {
                    for (let e = 0; e < this.outstandingPuts_.length; e++) {
                        const t = this.outstandingPuts_[e];
                        t && "h" in t.request && t.queued && (t.onComplete && t.onComplete("disconnect"), delete this.outstandingPuts_[e], this.outstandingPutCount_--)
                    }
                    0 === this.outstandingPutCount_ && (this.outstandingPuts_ = [])
                }
                onListenRevoked_(e, t) {
                    let n;
                    n = t ? t.map(e => ue(e)).join("$") : "default";
                    const r = this.removeListen_(e, n);
                    r && r.onComplete && r.onComplete("permission_denied")
                }
                removeListen_(e, t) {
                    var n = new Xe(e).toString();
                    let r;
                    if (this.listens.has(n)) {
                        const i = this.listens.get(n);
                        r = i.get(t), i.delete(t), 0 === i.size && this.listens.delete(n)
                    } else r = void 0;
                    return r
                }
                onAuthRevoked_(e, t) {
                    pe("Auth token revoked: " + e + "/" + t), this.authToken_ = null, this.forceTokenRefresh_ = !0, this.realtime_.close(), "invalid_token" !== e && "permission_denied" !== e || (this.invalidAuthTokenCount_++, 3 <= this.invalidAuthTokenCount_ && (this.reconnectDelay_ = 3e4, this.authTokenProvider_.notifyForInvalidToken()))
                }
                onAppCheckRevoked_(e, t) {
                    pe("App check token revoked: " + e + "/" + t), this.appCheckToken_ = null, this.forceTokenRefresh_ = !0, "invalid_token" !== e && "permission_denied" !== e || (this.invalidAppCheckTokenCount_++, 3 <= this.invalidAppCheckTokenCount_ && this.appCheckTokenProvider_.notifyForInvalidToken())
                }
                onSecurityDebugPacket_(e) {
                    this.securityDebugCallback_ ? this.securityDebugCallback_(e) : "msg" in e && console.log("FIREBASE: " + e.msg.replace("\n", "\nFIREBASE: "))
                }
                restoreState_() {
                    this.tryAuth(), this.tryAppCheck();
                    for (const t of this.listens.values())
                        for (const n of t.values()) this.sendListen_(n);
                    for (let r = 0; r < this.outstandingPuts_.length; r++) this.outstandingPuts_[r] && this.sendPut_(r);
                    for (; this.onDisconnectRequestQueue_.length;) {
                        var e = this.onDisconnectRequestQueue_.shift();
                        this.sendOnDisconnect_(e.action, e.pathString, e.data, e.onComplete)
                    }
                    for (let i = 0; i < this.outstandingGets_.length; i++) this.outstandingGets_[i] && this.sendGet_(i)
                }
                sendConnectStats_() {
                    const e = {};
                    e["sdk.js." + B.replace(/\./g, "-")] = 1, f() ? e["framework.cordova"] = 1 : "object" == typeof navigator && "ReactNative" === navigator.product && (e["framework.reactnative"] = 1), this.reportStats(e)
                }
                shouldReconnect_() {
                    var e = Je.getInstance().currentlyOnline();
                    return b(this.interruptReasons_) && e
                }
            }
            gt.nextPersistentConnectionId_ = 0, gt.nextConnectionId_ = 0;
            class mt {
                constructor(e, t) {
                    this.name = e, this.node = t
                }
                static Wrap(e, t) {
                    return new mt(e, t)
                }
            }
            class vt {
                getCompare() {
                    return this.compare.bind(this)
                }
                indexedValueChanged(e, t) {
                    var n = new mt(ye, e),
                        r = new mt(ye, t);
                    return 0 !== this.compare(n, r)
                }
                minPost() {
                    return mt.MIN
                }
            }
            let yt;
            class wt extends vt {
                static get __EMPTY_NODE() {
                    return yt
                }
                static set __EMPTY_NODE(e) {
                    yt = e
                }
                compare(e, t) {
                    return Ce(e.name, t.name)
                }
                isDefinedOn(e) {
                    throw c("KeyIndex.isDefinedOn not expected to be called.")
                }
                indexedValueChanged(e, t) {
                    return !1
                }
                minPost() {
                    return mt.MIN
                }
                maxPost() {
                    return new mt(we, yt)
                }
                makePost(e, t) {
                    return p("string" == typeof e, "KeyIndex indexValue must always be a string."), new mt(e, yt)
                }
                toString() {
                    return ".key"
                }
            }
            const Ct = new wt;
            class bt {
                constructor(e, t, n, r, i = null) {
                    this.isReverse_ = r, this.resultGenerator_ = i, this.nodeStack_ = [];
                    let s = 1;
                    for (; !e.isEmpty();)
                        if (s = t ? n(e.key, t) : 1, r && (s *= -1), s < 0) e = this.isReverse_ ? e.left : e.right;
                        else {
                            if (0 === s) {
                                this.nodeStack_.push(e);
                                break
                            }
                            this.nodeStack_.push(e), e = this.isReverse_ ? e.right : e.left
                        }
                }
                getNext() {
                    if (0 === this.nodeStack_.length) return null;
                    let e = this.nodeStack_.pop(),
                        t;
                    if (t = this.resultGenerator_ ? this.resultGenerator_(e.key, e.value) : {
                            key: e.key,
                            value: e.value
                        }, this.isReverse_)
                        for (e = e.left; !e.isEmpty();) this.nodeStack_.push(e), e = e.right;
                    else
                        for (e = e.right; !e.isEmpty();) this.nodeStack_.push(e), e = e.left;
                    return t
                }
                hasNext() {
                    return 0 < this.nodeStack_.length
                }
                peek() {
                    if (0 === this.nodeStack_.length) return null;
                    var e = this.nodeStack_[this.nodeStack_.length - 1];
                    return this.resultGenerator_ ? this.resultGenerator_(e.key, e.value) : {
                        key: e.key,
                        value: e.value
                    }
                }
            }
            class It {
                constructor(e, t, n, r, i) {
                    this.key = e, this.value = t, this.color = null != n ? n : It.RED, this.left = null != r ? r : Tt.EMPTY_NODE, this.right = null != i ? i : Tt.EMPTY_NODE
                }
                copy(e, t, n, r, i) {
                    return new It(null != e ? e : this.key, null != t ? t : this.value, null != n ? n : this.color, null != r ? r : this.left, null != i ? i : this.right)
                }
                count() {
                    return this.left.count() + 1 + this.right.count()
                }
                isEmpty() {
                    return !1
                }
                inorderTraversal(e) {
                    return this.left.inorderTraversal(e) || !!e(this.key, this.value) || this.right.inorderTraversal(e)
                }
                reverseTraversal(e) {
                    return this.right.reverseTraversal(e) || e(this.key, this.value) || this.left.reverseTraversal(e)
                }
                min_() {
                    return this.left.isEmpty() ? this : this.left.min_()
                }
                minKey() {
                    return this.min_().key
                }
                maxKey() {
                    return this.right.isEmpty() ? this.key : this.right.maxKey()
                }
                insert(e, t, n) {
                    let r = this;
                    var i = n(e, r.key);
                    return r = i < 0 ? r.copy(null, null, null, r.left.insert(e, t, n), null) : 0 === i ? r.copy(null, t, null, null, null) : r.copy(null, null, null, null, r.right.insert(e, t, n)), r.fixUp_()
                }
                removeMin_() {
                    if (this.left.isEmpty()) return Tt.EMPTY_NODE;
                    let e = this;
                    return e.left.isRed_() || e.left.left.isRed_() || (e = e.moveRedLeft_()), e = e.copy(null, null, null, e.left.removeMin_(), null), e.fixUp_()
                }
                remove(e, t) {
                    let n, r;
                    if (n = this, t(e, n.key) < 0) n.left.isEmpty() || n.left.isRed_() || n.left.left.isRed_() || (n = n.moveRedLeft_()), n = n.copy(null, null, null, n.left.remove(e, t), null);
                    else {
                        if (n.left.isRed_() && (n = n.rotateRight_()), n.right.isEmpty() || n.right.isRed_() || n.right.left.isRed_() || (n = n.moveRedRight_()), 0 === t(e, n.key)) {
                            if (n.right.isEmpty()) return Tt.EMPTY_NODE;
                            r = n.right.min_(), n = n.copy(r.key, r.value, null, null, n.right.removeMin_())
                        }
                        n = n.copy(null, null, null, null, n.right.remove(e, t))
                    }
                    return n.fixUp_()
                }
                isRed_() {
                    return this.color
                }
                fixUp_() {
                    let e = this;
                    return e.right.isRed_() && !e.left.isRed_() && (e = e.rotateLeft_()), e.left.isRed_() && e.left.left.isRed_() && (e = e.rotateRight_()), e.left.isRed_() && e.right.isRed_() && (e = e.colorFlip_()), e
                }
                moveRedLeft_() {
                    let e = this.colorFlip_();
                    return e.right.left.isRed_() && (e = e.copy(null, null, null, null, e.right.rotateRight_()), e = e.rotateLeft_(), e = e.colorFlip_()), e
                }
                moveRedRight_() {
                    let e = this.colorFlip_();
                    return e.left.left.isRed_() && (e = e.rotateRight_(), e = e.colorFlip_()), e
                }
                rotateLeft_() {
                    var e = this.copy(null, null, It.RED, null, this.right.left);
                    return this.right.copy(null, null, this.color, e, null)
                }
                rotateRight_() {
                    var e = this.copy(null, null, It.RED, this.left.right, null);
                    return this.left.copy(null, null, this.color, null, e)
                }
                colorFlip_() {
                    var e = this.left.copy(null, null, !this.left.color, null, null),
                        t = this.right.copy(null, null, !this.right.color, null, null);
                    return this.copy(null, null, !this.color, e, t)
                }
                checkMaxDepth_() {
                    var e = this.check_();
                    return Math.pow(2, e) <= this.count() + 1
                }
                check_() {
                    if (this.isRed_() && this.left.isRed_()) throw new Error("Red node has red child(" + this.key + "," + this.value + ")");
                    if (this.right.isRed_()) throw new Error("Right child of (" + this.key + "," + this.value + ") is red");
                    var e = this.left.check_();
                    if (e !== this.right.check_()) throw new Error("Black depths differ");
                    return e + (this.isRed_() ? 0 : 1)
                }
            }
            It.RED = !0, It.BLACK = !1;
            class Tt {
                constructor(e, t = Tt.EMPTY_NODE) {
                    this.comparator_ = e, this.root_ = t
                }
                insert(e, t) {
                    return new Tt(this.comparator_, this.root_.insert(e, t, this.comparator_).copy(null, null, It.BLACK, null, null))
                }
                remove(e) {
                    return new Tt(this.comparator_, this.root_.remove(e, this.comparator_).copy(null, null, It.BLACK, null, null))
                }
                get(e) {
                    var t;
                    let n = this.root_;
                    for (; !n.isEmpty();) {
                        if (0 === (t = this.comparator_(e, n.key))) return n.value;
                        t < 0 ? n = n.left : 0 < t && (n = n.right)
                    }
                    return null
                }
                getPredecessorKey(e) {
                    let t, n = this.root_,
                        r = null;
                    for (; !n.isEmpty();) {
                        if (0 === (t = this.comparator_(e, n.key))) {
                            if (n.left.isEmpty()) return r ? r.key : null;
                            for (n = n.left; !n.right.isEmpty();) n = n.right;
                            return n.key
                        }
                        t < 0 ? n = n.left : 0 < t && (r = n, n = n.right)
                    }
                    throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")
                }
                isEmpty() {
                    return this.root_.isEmpty()
                }
                count() {
                    return this.root_.count()
                }
                minKey() {
                    return this.root_.minKey()
                }
                maxKey() {
                    return this.root_.maxKey()
                }
                inorderTraversal(e) {
                    return this.root_.inorderTraversal(e)
                }
                reverseTraversal(e) {
                    return this.root_.reverseTraversal(e)
                }
                getIterator(e) {
                    return new bt(this.root_, null, this.comparator_, !1, e)
                }
                getIteratorFrom(e, t) {
                    return new bt(this.root_, e, this.comparator_, !1, t)
                }
                getReverseIteratorFrom(e, t) {
                    return new bt(this.root_, e, this.comparator_, !0, t)
                }
                getReverseIterator(e) {
                    return new bt(this.root_, null, this.comparator_, !0, e)
                }
            }

            function Et(e, t) {
                return Ce(e.name, t.name)
            }

            function St(e, t) {
                return Ce(e, t)
            }
            Tt.EMPTY_NODE = new class {
                copy(e, t, n, r, i) {
                    return this
                }
                insert(e, t, n) {
                    return new It(e, t, null)
                }
                remove(e, t) {
                    return this
                }
                count() {
                    return 0
                }
                isEmpty() {
                    return !0
                }
                inorderTraversal(e) {
                    return !1
                }
                reverseTraversal(e) {
                    return !1
                }
                minKey() {
                    return null
                }
                maxKey() {
                    return null
                }
                check_() {
                    return 0
                }
                isRed_() {
                    return !1
                }
            };
            let kt;

            function Nt(e) {
                return "number" == typeof e ? "number:" + Ie(e) : "string:" + e
            }

            function Pt(e) {
                var t;
                e.isLeafNode() ? (t = e.val(), p("string" == typeof t || "number" == typeof t || "object" == typeof t && w(t, ".sv"), "Priority must be a string or number.")) : p(e === kt || e.isEmpty(), "priority of unexpected type."), p(e === kt || e.getPriority().isEmpty(), "Priority nodes can't have a priority of their own.")
            }
            let Rt;
            class xt {
                constructor(e, t = xt.__childrenNodeConstructor.EMPTY_NODE) {
                    this.value_ = e, this.priorityNode_ = t, this.lazyHash_ = null, p(void 0 !== this.value_ && null !== this.value_, "LeafNode shouldn't be created with null/undefined value."), Pt(this.priorityNode_)
                }
                static set __childrenNodeConstructor(e) {
                    Rt = e
                }
                static get __childrenNodeConstructor() {
                    return Rt
                }
                isLeafNode() {
                    return !0
                }
                getPriority() {
                    return this.priorityNode_
                }
                updatePriority(e) {
                    return new xt(this.value_, e)
                }
                getImmediateChild(e) {
                    return ".priority" === e ? this.priorityNode_ : xt.__childrenNodeConstructor.EMPTY_NODE
                }
                getChild(e) {
                    return at(e) ? this : ".priority" === et(e) ? this.priorityNode_ : xt.__childrenNodeConstructor.EMPTY_NODE
                }
                hasChild() {
                    return !1
                }
                getPredecessorChildName(e, t) {
                    return null
                }
                updateImmediateChild(e, t) {
                    return ".priority" === e ? this.updatePriority(t) : t.isEmpty() && ".priority" !== e ? this : xt.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e, t).updatePriority(this.priorityNode_)
                }
                updateChild(e, t) {
                    var n = et(e);
                    return null === n ? t : t.isEmpty() && ".priority" !== n ? this : (p(".priority" !== n || 1 === tt(e), ".priority must be the last token in a path"), this.updateImmediateChild(n, xt.__childrenNodeConstructor.EMPTY_NODE.updateChild(nt(e), t)))
                }
                isEmpty() {
                    return !1
                }
                numChildren() {
                    return 0
                }
                forEachChild(e, t) {
                    return !1
                }
                val(e) {
                    return e && !this.getPriority().isEmpty() ? {
                        ".value": this.getValue(),
                        ".priority": this.getPriority().val()
                    } : this.getValue()
                }
                hash() {
                    if (null === this.lazyHash_) {
                        let e = "";
                        this.priorityNode_.isEmpty() || (e += "priority:" + Nt(this.priorityNode_.val()) + ":");
                        var t = typeof this.value_;
                        e += t + ":", e += "number" == t ? Ie(this.value_) : this.value_, this.lazyHash_ = Z(e)
                    }
                    return this.lazyHash_
                }
                getValue() {
                    return this.value_
                }
                compareTo(e) {
                    return e === xt.__childrenNodeConstructor.EMPTY_NODE ? 1 : e instanceof xt.__childrenNodeConstructor ? -1 : (p(e.isLeafNode(), "Unknown node type"), this.compareToLeafNode_(e))
                }
                compareToLeafNode_(e) {
                    var t = typeof e.value_,
                        n = typeof this.value_,
                        r = xt.VALUE_TYPE_ORDER.indexOf(t),
                        i = xt.VALUE_TYPE_ORDER.indexOf(n);
                    return p(0 <= r, "Unknown leaf type: " + t), p(0 <= i, "Unknown leaf type: " + n), r === i ? "object" == n ? 0 : this.value_ < e.value_ ? -1 : this.value_ === e.value_ ? 0 : 1 : i - r
                }
                withIndex() {
                    return this
                }
                isIndexed() {
                    return !0
                }
                equals(e) {
                    return e === this || !!e.isLeafNode() && (this.value_ === e.value_ && this.priorityNode_.equals(e.priorityNode_))
                }
            }
            xt.VALUE_TYPE_ORDER = ["object", "boolean", "number", "string"];
            let Dt, At;
            const Ot = new class extends vt {
                    compare(e, t) {
                        const n = e.node.getPriority();
                        var r = t.node.getPriority(),
                            r = n.compareTo(r);
                        return 0 === r ? Ce(e.name, t.name) : r
                    }
                    isDefinedOn(e) {
                        return !e.getPriority().isEmpty()
                    }
                    indexedValueChanged(e, t) {
                        return !e.getPriority().equals(t.getPriority())
                    }
                    minPost() {
                        return mt.MIN
                    }
                    maxPost() {
                        return new mt(we, new xt("[PRIORITY-POST]", At))
                    }
                    makePost(e, t) {
                        var n = Dt(e);
                        return new mt(t, new xt("[PRIORITY-POST]", n))
                    }
                    toString() {
                        return ".priority"
                    }
                },
                Lt = Math.log(2);
            class Mt {
                constructor(e) {
                    var t;
                    this.count = (t = e + 1, parseInt(Math.log(t) / Lt, 10)), this.current_ = this.count - 1;
                    var n, r = (n = this.count, parseInt(Array(n + 1).join("1"), 2));
                    this.bits_ = e + 1 & r
                }
                nextBitIsOne() {
                    var e = !(this.bits_ & 1 << this.current_);
                    return this.current_--, e
                }
            }

            function Ft(l, e, h, t) {
                l.sort(e);
                const c = function(e, t) {
                    var n = t - e;
                    let r, i;
                    if (0 == n) return null;
                    if (1 == n) return r = l[e], i = h ? h(r) : r, new It(i, r.node, It.BLACK, null, null);
                    var s = parseInt(n / 2, 10) + e,
                        o = c(e, s),
                        n = c(s + 1, t);
                    return r = l[s], i = h ? h(r) : r, new It(i, r.node, It.BLACK, o, n)
                };
                var n = function(e) {
                    let s = null,
                        o = null,
                        a = l.length;

                    function t(e, t) {
                        var n = a - e,
                            r = a;
                        a -= e;
                        var i = c(1 + n, r),
                            r = l[n],
                            n = h ? h(r) : r;
                        ! function(e) {
                            if (s) {
                                s.left = e;
                                s = e
                            } else {
                                o = e;
                                s = e
                            }
                        }(new It(n, r.node, t, null, i))
                    }
                    for (let i = 0; i < e.count; ++i) {
                        var n = e.nextBitIsOne(),
                            r = Math.pow(2, e.count - (i + 1));
                        n ? t(r, It.BLACK) : (t(r, It.BLACK), t(r, It.RED))
                    }
                    return o
                }(new Mt(l.length));
                return new Tt(t || e, n)
            }
            let qt;
            const Wt = {};
            class Ut {
                constructor(e, t) {
                    this.indexes_ = e, this.indexSet_ = t
                }
                static get Default() {
                    return p((Wt, Ot), "ChildrenNode.ts has not been loaded"), qt = qt || new Ut({
                        ".priority": Wt
                    }, {
                        ".priority": Ot
                    }), qt
                }
                get(e) {
                    var t = C(this.indexes_, e);
                    if (!t) throw new Error("No index defined for " + e);
                    return t instanceof Tt ? t : null
                }
                hasIndex(e) {
                    return w(this.indexSet_, e.toString())
                }
                addIndex(e, t) {
                    p(e !== Ct, "KeyIndex always exists and isn't meant to be added to the IndexMap.");
                    const n = [];
                    let r = !1;
                    const i = t.getIterator(mt.Wrap);
                    let s = i.getNext();
                    for (; s;) r = r || e.isDefinedOn(s.node), n.push(s), s = i.getNext();
                    let o;
                    o = r ? Ft(n, e.getCompare()) : Wt;
                    var a = e.toString();
                    const l = Object.assign({}, this.indexSet_);
                    l[a] = e;
                    const h = Object.assign({}, this.indexes_);
                    return h[a] = o, new Ut(h, l)
                }
                addToIndexes(o, a) {
                    var e = I(this.indexes_, (t, e) => {
                        const n = C(this.indexSet_, e);
                        if (p(n, "Missing index implementation for " + e), t === Wt) {
                            if (n.isDefinedOn(o.node)) {
                                const i = [],
                                    s = a.getIterator(mt.Wrap);
                                let e = s.getNext();
                                for (; e;) e.name !== o.name && i.push(e), e = s.getNext();
                                return i.push(o), Ft(i, n.getCompare())
                            }
                            return Wt
                        } {
                            var r = a.get(o.name);
                            let e = t;
                            return r && (e = e.remove(new mt(o.name, r))), e.insert(o, o.node)
                        }
                    });
                    return new Ut(e, this.indexSet_)
                }
                removeFromIndexes(n, r) {
                    var e = I(this.indexes_, e => {
                        if (e === Wt) return e;
                        var t = r.get(n.name);
                        return t ? e.remove(new mt(n.name, t)) : e
                    });
                    return new Ut(e, this.indexSet_)
                }
            }
            let Bt;
            class jt {
                constructor(e, t, n) {
                    this.children_ = e, this.priorityNode_ = t, this.indexMap_ = n, this.lazyHash_ = null, this.priorityNode_ && Pt(this.priorityNode_), this.children_.isEmpty() && p(!this.priorityNode_ || this.priorityNode_.isEmpty(), "An empty node cannot have a priority")
                }
                static get EMPTY_NODE() {
                    return Bt = Bt || new jt(new Tt(St), null, Ut.Default)
                }
                isLeafNode() {
                    return !1
                }
                getPriority() {
                    return this.priorityNode_ || Bt
                }
                updatePriority(e) {
                    return this.children_.isEmpty() ? this : new jt(this.children_, e, this.indexMap_)
                }
                getImmediateChild(e) {
                    if (".priority" === e) return this.getPriority();
                    var t = this.children_.get(e);
                    return null === t ? Bt : t
                }
                getChild(e) {
                    var t = et(e);
                    return null === t ? this : this.getImmediateChild(t).getChild(nt(e))
                }
                hasChild(e) {
                    return null !== this.children_.get(e)
                }
                updateImmediateChild(n, r) {
                    if (p(r, "We should always be passing snapshot nodes"), ".priority" === n) return this.updatePriority(r); {
                        var i = new mt(n, r);
                        let e, t;
                        t = r.isEmpty() ? (e = this.children_.remove(n), this.indexMap_.removeFromIndexes(i, this.children_)) : (e = this.children_.insert(n, r), this.indexMap_.addToIndexes(i, this.children_));
                        i = e.isEmpty() ? Bt : this.priorityNode_;
                        return new jt(e, i, t)
                    }
                }
                updateChild(e, t) {
                    var n = et(e);
                    if (null === n) return t;
                    p(".priority" !== et(e) || 1 === tt(e), ".priority must be the last token in a path");
                    var r = this.getImmediateChild(n).updateChild(nt(e), t);
                    return this.updateImmediateChild(n, r)
                }
                isEmpty() {
                    return this.children_.isEmpty()
                }
                numChildren() {
                    return this.children_.count()
                }
                val(n) {
                    if (this.isEmpty()) return null;
                    const r = {};
                    let i = 0,
                        s = 0,
                        o = !0;
                    if (this.forEachChild(Ot, (e, t) => {
                            r[e] = t.val(n), i++, o && jt.INTEGER_REGEXP_.test(e) ? s = Math.max(s, Number(e)) : o = !1
                        }), !n && o && s < 2 * i) {
                        const e = [];
                        for (const t in r) e[t] = r[t];
                        return e
                    }
                    return n && !this.getPriority().isEmpty() && (r[".priority"] = this.getPriority().val()), r
                }
                hash() {
                    if (null === this.lazyHash_) {
                        let r = "";
                        this.getPriority().isEmpty() || (r += "priority:" + Nt(this.getPriority().val()) + ":"), this.forEachChild(Ot, (e, t) => {
                            var n = t.hash();
                            "" !== n && (r += ":" + e + ":" + n)
                        }), this.lazyHash_ = "" === r ? "" : Z(r)
                    }
                    return this.lazyHash_
                }
                getPredecessorChildName(e, t, n) {
                    const r = this.resolveIndex_(n);
                    if (r) {
                        var i = r.getPredecessorKey(new mt(e, t));
                        return i ? i.name : null
                    }
                    return this.children_.getPredecessorKey(e)
                }
                getFirstChildName(e) {
                    const t = this.resolveIndex_(e);
                    if (t) {
                        var n = t.minKey();
                        return n && n.name
                    }
                    return this.children_.minKey()
                }
                getFirstChild(e) {
                    var t = this.getFirstChildName(e);
                    return t ? new mt(t, this.children_.get(t)) : null
                }
                getLastChildName(e) {
                    const t = this.resolveIndex_(e);
                    if (t) {
                        var n = t.maxKey();
                        return n && n.name
                    }
                    return this.children_.maxKey()
                }
                getLastChild(e) {
                    var t = this.getLastChildName(e);
                    return t ? new mt(t, this.children_.get(t)) : null
                }
                forEachChild(e, t) {
                    const n = this.resolveIndex_(e);
                    return n ? n.inorderTraversal(e => t(e.name, e.node)) : this.children_.inorderTraversal(t)
                }
                getIterator(e) {
                    return this.getIteratorFrom(e.minPost(), e)
                }
                getIteratorFrom(t, n) {
                    const e = this.resolveIndex_(n);
                    if (e) return e.getIteratorFrom(t, e => e); {
                        const r = this.children_.getIteratorFrom(t.name, mt.Wrap);
                        let e = r.peek();
                        for (; null != e && n.compare(e, t) < 0;) r.getNext(), e = r.peek();
                        return r
                    }
                }
                getReverseIterator(e) {
                    return this.getReverseIteratorFrom(e.maxPost(), e)
                }
                getReverseIteratorFrom(t, n) {
                    const e = this.resolveIndex_(n);
                    if (e) return e.getReverseIteratorFrom(t, e => e); {
                        const r = this.children_.getReverseIteratorFrom(t.name, mt.Wrap);
                        let e = r.peek();
                        for (; null != e && 0 < n.compare(e, t);) r.getNext(), e = r.peek();
                        return r
                    }
                }
                compareTo(e) {
                    return this.isEmpty() ? e.isEmpty() ? 0 : -1 : e.isLeafNode() || e.isEmpty() ? 1 : e === zt ? -1 : 0
                }
                withIndex(e) {
                    if (e === Ct || this.indexMap_.hasIndex(e)) return this;
                    var t = this.indexMap_.addIndex(e, this.children_);
                    return new jt(this.children_, this.priorityNode_, t)
                }
                isIndexed(e) {
                    return e === Ct || this.indexMap_.hasIndex(e)
                }
                equals(e) {
                    if (e === this) return !0;
                    if (e.isLeafNode()) return !1; {
                        const n = e;
                        if (this.getPriority().equals(n.getPriority())) {
                            if (this.children_.count() !== n.children_.count()) return !1; {
                                const r = this.getIterator(Ot),
                                    i = n.getIterator(Ot);
                                let e = r.getNext(),
                                    t = i.getNext();
                                for (; e && t;) {
                                    if (e.name !== t.name || !e.node.equals(t.node)) return !1;
                                    e = r.getNext(), t = i.getNext()
                                }
                                return null === e && null === t
                            }
                        }
                        return !1
                    }
                }
                resolveIndex_(e) {
                    return e === Ct ? null : this.indexMap_.get(e.toString())
                }
            }
            jt.INTEGER_REGEXP_ = /^(0|[1-9]\d*)$/;
            class Vt extends jt {
                constructor() {
                    super(new Tt(St), jt.EMPTY_NODE, Ut.Default)
                }
                compareTo(e) {
                    return e === this ? 0 : 1
                }
                equals(e) {
                    return e === this
                }
                getPriority() {
                    return this
                }
                getImmediateChild(e) {
                    return jt.EMPTY_NODE
                }
                isEmpty() {
                    return !1
                }
            }
            const zt = new Vt;
            Object.defineProperties(mt, {
                MIN: {
                    value: new mt(ye, jt.EMPTY_NODE)
                },
                MAX: {
                    value: new mt(we, zt)
                }
            }), wt.__EMPTY_NODE = jt.EMPTY_NODE, xt.__childrenNodeConstructor = jt, Q = zt, kt = Q, Y = zt, At = Y;
            const Ht = !0;

            function Qt(i, e = null) {
                if (null === i) return jt.EMPTY_NODE;
                if ("object" == typeof i && ".priority" in i && (e = i[".priority"]), p(null === e || "string" == typeof e || "number" == typeof e || "object" == typeof e && ".sv" in e, "Invalid priority type found: " + typeof e), "object" != typeof(i = "object" == typeof i && ".value" in i && null !== i[".value"] ? i[".value"] : i) || ".sv" in i) {
                    var t = i;
                    return new xt(t, Qt(e))
                }
                if (i instanceof Array || !Ht) {
                    let r = jt.EMPTY_NODE;
                    return be(i, (e, t) => {
                        if (w(i, e) && "." !== e.substring(0, 1)) {
                            const n = Qt(t);
                            !n.isLeafNode() && n.isEmpty() || (r = r.updateImmediateChild(e, n))
                        }
                    }), r.updatePriority(Qt(e))
                } {
                    const s = [];
                    let r = !1;
                    if (be(i, (e, t) => {
                            if ("." !== e.substring(0, 1)) {
                                const n = Qt(t);
                                n.isEmpty() || (r = r || !n.getPriority().isEmpty(), s.push(new mt(e, n)))
                            }
                        }), 0 === s.length) return jt.EMPTY_NODE;
                    var n = Ft(s, Et, e => e.name, St);
                    if (r) {
                        t = Ft(s, Ot.getCompare());
                        return new jt(n, Qt(e), new Ut({
                            ".priority": t
                        }, {
                            ".priority": Ot
                        }))
                    }
                    return new jt(n, Qt(e), Ut.Default)
                }
            }
            Dt = Qt;
            class Yt extends vt {
                constructor(e) {
                    super(), this.indexPath_ = e, p(!at(e) && ".priority" !== et(e), "Can't create PathIndex with empty path or .priority key")
                }
                extractChild(e) {
                    return e.getChild(this.indexPath_)
                }
                isDefinedOn(e) {
                    return !e.getChild(this.indexPath_).isEmpty()
                }
                compare(e, t) {
                    const n = this.extractChild(e.node);
                    var r = this.extractChild(t.node),
                        r = n.compareTo(r);
                    return 0 === r ? Ce(e.name, t.name) : r
                }
                makePost(e, t) {
                    var n = Qt(e),
                        n = jt.EMPTY_NODE.updateChild(this.indexPath_, n);
                    return new mt(t, n)
                }
                maxPost() {
                    var e = jt.EMPTY_NODE.updateChild(this.indexPath_, zt);
                    return new mt(we, e)
                }
                toString() {
                    return it(this.indexPath_, 0).join("/")
                }
            }
            const Kt = new class extends vt {
                compare(e, t) {
                    var n = e.node.compareTo(t.node);
                    return 0 === n ? Ce(e.name, t.name) : n
                }
                isDefinedOn(e) {
                    return !0
                }
                indexedValueChanged(e, t) {
                    return !e.equals(t)
                }
                minPost() {
                    return mt.MIN
                }
                maxPost() {
                    return mt.MAX
                }
                makePost(e, t) {
                    var n = Qt(e);
                    return new mt(t, n)
                }
                toString() {
                    return ".value"
                }
            };

            function $t(e) {
                return {
                    type: "value",
                    snapshotNode: e
                }
            }

            function Gt(e, t) {
                return {
                    type: "child_added",
                    snapshotNode: t,
                    childName: e
                }
            }

            function Jt(e, t) {
                return {
                    type: "child_removed",
                    snapshotNode: t,
                    childName: e
                }
            }

            function Xt(e, t, n) {
                return {
                    type: "child_changed",
                    snapshotNode: t,
                    childName: e,
                    oldSnap: n
                }
            }
            class Zt {
                constructor(e) {
                    this.index_ = e
                }
                updateChild(e, t, n, r, i, s) {
                    p(e.isIndexed(this.index_), "A node must be indexed if only a child is updated");
                    const o = e.getImmediateChild(t);
                    return o.getChild(r).equals(n.getChild(r)) && o.isEmpty() === n.isEmpty() ? e : (null != s && (n.isEmpty() ? e.hasChild(t) ? s.trackChildChange(Jt(t, o)) : p(e.isLeafNode(), "A child remove without an old child only makes sense on a leaf node") : o.isEmpty() ? s.trackChildChange(Gt(t, n)) : s.trackChildChange(Xt(t, n, o))), e.isLeafNode() && n.isEmpty() ? e : e.updateImmediateChild(t, n).withIndex(this.index_))
                }
                updateFullNode(r, n, i) {
                    return null != i && (r.isLeafNode() || r.forEachChild(Ot, (e, t) => {
                        n.hasChild(e) || i.trackChildChange(Jt(e, t))
                    }), n.isLeafNode() || n.forEachChild(Ot, (e, t) => {
                        if (r.hasChild(e)) {
                            const n = r.getImmediateChild(e);
                            n.equals(t) || i.trackChildChange(Xt(e, t, n))
                        } else i.trackChildChange(Gt(e, t))
                    })), n.withIndex(this.index_)
                }
                updatePriority(e, t) {
                    return e.isEmpty() ? jt.EMPTY_NODE : e.updatePriority(t)
                }
                filtersNodes() {
                    return !1
                }
                getIndexedFilter() {
                    return this
                }
                getIndex() {
                    return this.index_
                }
            }
            class en {
                constructor(e) {
                    this.indexedFilter_ = new Zt(e.getIndex()), this.index_ = e.getIndex(), this.startPost_ = en.getStartPost_(e), this.endPost_ = en.getEndPost_(e), this.startIsInclusive_ = !e.startAfterSet_, this.endIsInclusive_ = !e.endBeforeSet_
                }
                getStartPost() {
                    return this.startPost_
                }
                getEndPost() {
                    return this.endPost_
                }
                matches(e) {
                    var t = this.startIsInclusive_ ? this.index_.compare(this.getStartPost(), e) <= 0 : this.index_.compare(this.getStartPost(), e) < 0,
                        n = this.endIsInclusive_ ? this.index_.compare(e, this.getEndPost()) <= 0 : this.index_.compare(e, this.getEndPost()) < 0;
                    return t && n
                }
                updateChild(e, t, n, r, i, s) {
                    return this.matches(new mt(t, n)) || (n = jt.EMPTY_NODE), this.indexedFilter_.updateChild(e, t, n, r, i, s)
                }
                updateFullNode(e, t, n) {
                    let r = (t = t.isLeafNode() ? jt.EMPTY_NODE : t).withIndex(this.index_);
                    r = r.updatePriority(jt.EMPTY_NODE);
                    const i = this;
                    return t.forEachChild(Ot, (e, t) => {
                        i.matches(new mt(e, t)) || (r = r.updateImmediateChild(e, jt.EMPTY_NODE))
                    }), this.indexedFilter_.updateFullNode(e, r, n)
                }
                updatePriority(e, t) {
                    return e
                }
                filtersNodes() {
                    return !0
                }
                getIndexedFilter() {
                    return this.indexedFilter_
                }
                getIndex() {
                    return this.index_
                }
                static getStartPost_(e) {
                    if (e.hasStart()) {
                        var t = e.getIndexStartName();
                        return e.getIndex().makePost(e.getIndexStartValue(), t)
                    }
                    return e.getIndex().minPost()
                }
                static getEndPost_(e) {
                    if (e.hasEnd()) {
                        var t = e.getIndexEndName();
                        return e.getIndex().makePost(e.getIndexEndValue(), t)
                    }
                    return e.getIndex().maxPost()
                }
            }
            class tn {
                constructor(e) {
                    this.withinDirectionalStart = e => this.reverse_ ? this.withinEndPost(e) : this.withinStartPost(e), this.withinDirectionalEnd = e => this.reverse_ ? this.withinStartPost(e) : this.withinEndPost(e), this.withinStartPost = e => {
                        var t = this.index_.compare(this.rangedFilter_.getStartPost(), e);
                        return this.startIsInclusive_ ? t <= 0 : t < 0
                    }, this.withinEndPost = e => {
                        var t = this.index_.compare(e, this.rangedFilter_.getEndPost());
                        return this.endIsInclusive_ ? t <= 0 : t < 0
                    }, this.rangedFilter_ = new en(e), this.index_ = e.getIndex(), this.limit_ = e.getLimit(), this.reverse_ = !e.isViewFromLeft(), this.startIsInclusive_ = !e.startAfterSet_, this.endIsInclusive_ = !e.endBeforeSet_
                }
                updateChild(e, t, n, r, i, s) {
                    return this.rangedFilter_.matches(new mt(t, n)) || (n = jt.EMPTY_NODE), e.getImmediateChild(t).equals(n) ? e : e.numChildren() < this.limit_ ? this.rangedFilter_.getIndexedFilter().updateChild(e, t, n, r, i, s) : this.fullLimitUpdateChild_(e, t, n, i, s)
                }
                updateFullNode(e, n, t) {
                    let r;
                    if (n.isLeafNode() || n.isEmpty()) r = jt.EMPTY_NODE.withIndex(this.index_);
                    else if (2 * this.limit_ < n.numChildren() && n.isIndexed(this.index_)) {
                        r = jt.EMPTY_NODE.withIndex(this.index_);
                        let e;
                        e = this.reverse_ ? n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(), this.index_) : n.getIteratorFrom(this.rangedFilter_.getStartPost(), this.index_);
                        let t = 0;
                        for (; e.hasNext() && t < this.limit_;) {
                            var i = e.getNext();
                            if (this.withinDirectionalStart(i)) {
                                if (!this.withinDirectionalEnd(i)) break;
                                r = r.updateImmediateChild(i.name, i.node), t++
                            }
                        }
                    } else {
                        r = n.withIndex(this.index_), r = r.updatePriority(jt.EMPTY_NODE);
                        let e;
                        e = this.reverse_ ? r.getReverseIterator(this.index_) : r.getIterator(this.index_);
                        let t = 0;
                        for (; e.hasNext();) {
                            var s = e.getNext();
                            t < this.limit_ && this.withinDirectionalStart(s) && this.withinDirectionalEnd(s) ? t++ : r = r.updateImmediateChild(s.name, jt.EMPTY_NODE)
                        }
                    }
                    return this.rangedFilter_.getIndexedFilter().updateFullNode(e, r, t)
                }
                updatePriority(e, t) {
                    return e
                }
                filtersNodes() {
                    return !0
                }
                getIndexedFilter() {
                    return this.rangedFilter_.getIndexedFilter()
                }
                getIndex() {
                    return this.index_
                }
                fullLimitUpdateChild_(e, t, n, r, i) {
                    let s;
                    if (this.reverse_) {
                        const d = this.index_.getCompare();
                        s = (e, t) => d(t, e)
                    } else s = this.index_.getCompare();
                    const o = e;
                    p(o.numChildren() === this.limit_, "");
                    var a = new mt(t, n),
                        l = this.reverse_ ? o.getFirstChild(this.index_) : o.getLastChild(this.index_),
                        h = this.rangedFilter_.matches(a);
                    if (o.hasChild(t)) {
                        var c = o.getImmediateChild(t);
                        let e = r.getChildAfterChild(this.index_, l, this.reverse_);
                        for (; null != e && (e.name === t || o.hasChild(e.name));) e = r.getChildAfterChild(this.index_, e, this.reverse_);
                        var u = null == e ? 1 : s(e, a);
                        if (h && !n.isEmpty() && 0 <= u) return null != i && i.trackChildChange(Xt(t, n, c)), o.updateImmediateChild(t, n); {
                            null != i && i.trackChildChange(Jt(t, c));
                            const _ = o.updateImmediateChild(t, jt.EMPTY_NODE);
                            return null != e && this.rangedFilter_.matches(e) ? (null != i && i.trackChildChange(Gt(e.name, e.node)), _.updateImmediateChild(e.name, e.node)) : _
                        }
                    }
                    return !n.isEmpty() && h && 0 <= s(l, a) ? (null != i && (i.trackChildChange(Jt(l.name, l.node)), i.trackChildChange(Gt(t, n))), o.updateImmediateChild(t, n).updateImmediateChild(l.name, jt.EMPTY_NODE)) : e
                }
            }
            class nn {
                constructor() {
                    this.limitSet_ = !1, this.startSet_ = !1, this.startNameSet_ = !1, this.startAfterSet_ = !1, this.endSet_ = !1, this.endNameSet_ = !1, this.endBeforeSet_ = !1, this.limit_ = 0, this.viewFrom_ = "", this.indexStartValue_ = null, this.indexStartName_ = "", this.indexEndValue_ = null, this.indexEndName_ = "", this.index_ = Ot
                }
                hasStart() {
                    return this.startSet_
                }
                isViewFromLeft() {
                    return "" === this.viewFrom_ ? this.startSet_ : "l" === this.viewFrom_
                }
                getIndexStartValue() {
                    return p(this.startSet_, "Only valid if start has been set"), this.indexStartValue_
                }
                getIndexStartName() {
                    return p(this.startSet_, "Only valid if start has been set"), this.startNameSet_ ? this.indexStartName_ : ye
                }
                hasEnd() {
                    return this.endSet_
                }
                getIndexEndValue() {
                    return p(this.endSet_, "Only valid if end has been set"), this.indexEndValue_
                }
                getIndexEndName() {
                    return p(this.endSet_, "Only valid if end has been set"), this.endNameSet_ ? this.indexEndName_ : we
                }
                hasLimit() {
                    return this.limitSet_
                }
                hasAnchoredLimit() {
                    return this.limitSet_ && "" !== this.viewFrom_
                }
                getLimit() {
                    return p(this.limitSet_, "Only valid if limit has been set"), this.limit_
                }
                getIndex() {
                    return this.index_
                }
                loadsAllData() {
                    return !(this.startSet_ || this.endSet_ || this.limitSet_)
                }
                isDefault() {
                    return this.loadsAllData() && this.index_ === Ot
                }
                copy() {
                    const e = new nn;
                    return e.limitSet_ = this.limitSet_, e.limit_ = this.limit_, e.startSet_ = this.startSet_, e.startAfterSet_ = this.startAfterSet_, e.indexStartValue_ = this.indexStartValue_, e.startNameSet_ = this.startNameSet_, e.indexStartName_ = this.indexStartName_, e.endSet_ = this.endSet_, e.endBeforeSet_ = this.endBeforeSet_, e.indexEndValue_ = this.indexEndValue_, e.endNameSet_ = this.endNameSet_, e.indexEndName_ = this.indexEndName_, e.index_ = this.index_, e.viewFrom_ = this.viewFrom_, e
                }
            }

            function rn(e, t, n) {
                const r = e.copy();
                return r.startSet_ = !0, void 0 === t && (t = null), r.indexStartValue_ = t, null != n ? (r.startNameSet_ = !0, r.indexStartName_ = n) : (r.startNameSet_ = !1, r.indexStartName_ = ""), r
            }

            function sn(e, t, n) {
                const r = e.copy();
                return r.endSet_ = !0, void 0 === t && (t = null), r.indexEndValue_ = t, void 0 !== n ? (r.endNameSet_ = !0, r.indexEndName_ = n) : (r.endNameSet_ = !1, r.indexEndName_ = ""), r
            }

            function on(e, t) {
                const n = e.copy();
                return n.index_ = t, n
            }

            function an(e) {
                const t = {};
                if (e.isDefault()) return t;
                let n;
                var r;
                return n = e.index_ === Ot ? "$priority" : e.index_ === Kt ? "$value" : e.index_ === Ct ? "$key" : (p(e.index_ instanceof Yt, "Unrecognized index type!"), e.index_.toString()), t.orderBy = v(n), e.startSet_ && (r = e.startAfterSet_ ? "startAfter" : "startAt", t[r] = v(e.indexStartValue_), e.startNameSet_ && (t[r] += "," + v(e.indexStartName_))), e.endSet_ && (r = e.endBeforeSet_ ? "endBefore" : "endAt", t[r] = v(e.indexEndValue_), e.endNameSet_ && (t[r] += "," + v(e.indexEndName_))), e.limitSet_ && (e.isViewFromLeft() ? t.limitToFirst = e.limit_ : t.limitToLast = e.limit_), t
            }

            function ln(t) {
                const n = {};
                if (t.startSet_ && (n.sp = t.indexStartValue_, t.startNameSet_ && (n.sn = t.indexStartName_), n.sin = !t.startAfterSet_), t.endSet_ && (n.ep = t.indexEndValue_, t.endNameSet_ && (n.en = t.indexEndName_), n.ein = !t.endBeforeSet_), t.limitSet_) {
                    n.l = t.limit_;
                    let e = t.viewFrom_;
                    "" === e && (e = t.isViewFromLeft() ? "l" : "r"), n.vf = e
                }
                return t.index_ !== Ot && (n.i = t.index_.toString()), n
            }
            class hn extends $e {
                constructor(e, t, n, r) {
                    super(), this.repoInfo_ = e, this.onDataUpdate_ = t, this.authTokenProvider_ = n, this.appCheckTokenProvider_ = r, this.log_ = ae("p:rest:"), this.listens_ = {}
                }
                reportStats(e) {
                    throw new Error("Method not implemented.")
                }
                static getListenId_(e, t) {
                    return void 0 !== t ? "tag$" + t : (p(e._queryParams.isDefault(), "should have a tag if it's not a default query."), e._path.toString())
                }
                listen(e, t, r, i) {
                    const s = e._path.toString();
                    this.log_("Listen called for " + s + " " + e._queryIdentifier);
                    const o = hn.getListenId_(e, r),
                        a = {};
                    this.listens_[o] = a;
                    var n = an(e._queryParams);
                    this.restRequest_(s + ".json", n, (t, e) => {
                        let n = e;
                        if (null === (t = 404 === t ? n = null : t) && this.onDataUpdate_(s, n, !1, r), C(this.listens_, o) === a) {
                            let e;
                            e = t ? 401 === t ? "permission_denied" : "rest_error:" + t : "ok", i(e, null)
                        }
                    })
                }
                unlisten(e, t) {
                    var n = hn.getListenId_(e, t);
                    delete this.listens_[n]
                }
                get(e) {
                    var t = an(e._queryParams);
                    const r = e._path.toString(),
                        i = new _;
                    return this.restRequest_(r + ".json", t, (e, t) => {
                        let n = t;
                        null === (e = 404 === e ? n = null : e) ? (this.onDataUpdate_(r, n, !1, null), i.resolve(n)) : i.reject(new Error(n))
                    }), i.promise
                }
                refreshAuthToken(e) {}
                restRequest_(i, s = {}, o) {
                    return s.format = "export", Promise.all([this.authTokenProvider_.getToken(!1), this.appCheckTokenProvider_.getToken(!1)]).then(([e, t]) => {
                        e && e.accessToken && (s.auth = e.accessToken), t && t.token && (s.ac = t.token);
                        const n = (this.repoInfo_.secure ? "https://" : "http://") + this.repoInfo_.host + i + "?ns=" + this.repoInfo_.namespace + function(e) {
                            const t = [];
                            for (const [n, r] of Object.entries(e)) Array.isArray(r) ? r.forEach(e => {
                                t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e))
                            }) : t.push(encodeURIComponent(n) + "=" + encodeURIComponent(r));
                            return t.length ? "&" + t.join("&") : ""
                        }(s);
                        this.log_("Sending REST request for " + n);
                        const r = new XMLHttpRequest;
                        r.onreadystatechange = () => {
                            if (o && 4 === r.readyState) {
                                this.log_("REST Response for " + n + " received. status:", r.status, "response:", r.responseText);
                                let e = null;
                                if (200 <= r.status && r.status < 300) {
                                    try {
                                        e = m(r.responseText)
                                    } catch (e) {
                                        ge("Failed to parse JSON response for " + n + ": " + r.responseText)
                                    }
                                    o(null, e)
                                } else 401 !== r.status && 404 !== r.status && ge("Got unsuccessful REST response for " + n + " Status: " + r.status), o(r.status);
                                o = null
                            }
                        }, r.open("GET", n, !0), r.send()
                    })
                }
            }
            class cn {
                constructor() {
                    this.rootNode_ = jt.EMPTY_NODE
                }
                getNode(e) {
                    return this.rootNode_.getChild(e)
                }
                updateSnapshot(e, t) {
                    this.rootNode_ = this.rootNode_.updateChild(e, t)
                }
            }

            function un() {
                return {
                    value: null,
                    children: new Map
                }
            }

            function dn(e, t, n) {
                var r;
                at(t) ? (e.value = n, e.children.clear()) : null !== e.value ? e.value = e.value.updateChild(t, n) : (r = et(t), e.children.has(r) || e.children.set(r, un()), dn(e.children.get(r), t = nt(t), n))
            }

            function _n(e, n, r) {
                var i;
                null !== e.value ? r(n, e.value) : (i = (e, t) => {
                    _n(t, new Xe(n.toString() + "/" + e), r)
                }, e.children.forEach((e, t) => {
                    i(t, e)
                }))
            }
            class pn {
                constructor(e) {
                    this.collection_ = e, this.last_ = null
                }
                get() {
                    var e = this.collection_.get();
                    const n = Object.assign({}, e);
                    return this.last_ && be(this.last_, (e, t) => {
                        n[e] = n[e] - t
                    }), this.last_ = e, n
                }
            }
            class fn {
                constructor(e, t) {
                    this.server_ = t, this.statsToReport_ = {}, this.statsListener_ = new pn(e);
                    var n = 1e4 + 2e4 * Math.random();
                    Ee(this.reportStats_.bind(this), Math.floor(n))
                }
                reportStats_() {
                    var e = this.statsListener_.get();
                    const n = {};
                    let r = !1;
                    be(e, (e, t) => {
                        0 < t && w(this.statsToReport_, e) && (n[e] = t, r = !0)
                    }), r && this.server_.reportStats(n), Ee(this.reportStats_.bind(this), Math.floor(2 * Math.random() * 3e5))
                }
            }

            function gn() {
                return {
                    fromUser: !0,
                    fromServer: !1,
                    queryId: null,
                    tagged: !1
                }
            }

            function mn() {
                return {
                    fromUser: !1,
                    fromServer: !0,
                    queryId: null,
                    tagged: !1
                }
            }

            function vn(e) {
                return {
                    fromUser: !1,
                    fromServer: !0,
                    queryId: e,
                    tagged: !0
                }
            }($ = K = K || {})[$.OVERWRITE = 0] = "OVERWRITE", $[$.MERGE = 1] = "MERGE", $[$.ACK_USER_WRITE = 2] = "ACK_USER_WRITE", $[$.LISTEN_COMPLETE = 3] = "LISTEN_COMPLETE";
            class yn {
                constructor(e, t, n) {
                    this.path = e, this.affectedTree = t, this.revert = n, this.type = K.ACK_USER_WRITE, this.source = gn()
                }
                operationForChild(e) {
                    if (at(this.path)) {
                        if (null != this.affectedTree.value) return p(this.affectedTree.children.isEmpty(), "affectedTree should not have overlapping affected paths."), this;
                        var t = this.affectedTree.subtree(new Xe(e));
                        return new yn(Ze(), t, this.revert)
                    }
                    return p(et(this.path) === e, "operationForChild called for unrelated child."), new yn(nt(this.path), this.affectedTree, this.revert)
                }
            }
            class wn {
                constructor(e, t) {
                    this.source = e, this.path = t, this.type = K.LISTEN_COMPLETE
                }
                operationForChild(e) {
                    return at(this.path) ? new wn(this.source, Ze()) : new wn(this.source, nt(this.path))
                }
            }
            class Cn {
                constructor(e, t, n) {
                    this.source = e, this.path = t, this.snap = n, this.type = K.OVERWRITE
                }
                operationForChild(e) {
                    return at(this.path) ? new Cn(this.source, Ze(), this.snap.getImmediateChild(e)) : new Cn(this.source, nt(this.path), this.snap)
                }
            }
            class bn {
                constructor(e, t, n) {
                    this.source = e, this.path = t, this.children = n, this.type = K.MERGE
                }
                operationForChild(e) {
                    if (at(this.path)) {
                        const t = this.children.subtree(new Xe(e));
                        return t.isEmpty() ? null : t.value ? new Cn(this.source, Ze(), t.value) : new bn(this.source, Ze(), t)
                    }
                    return p(et(this.path) === e, "Can't get a merge for a child not on the path of the operation"), new bn(this.source, nt(this.path), this.children)
                }
                toString() {
                    return "Operation(" + this.path + ": " + this.source.toString() + " merge: " + this.children.toString() + ")"
                }
            }
            class In {
                constructor(e, t, n) {
                    this.node_ = e, this.fullyInitialized_ = t, this.filtered_ = n
                }
                isFullyInitialized() {
                    return this.fullyInitialized_
                }
                isFiltered() {
                    return this.filtered_
                }
                isCompleteForPath(e) {
                    if (at(e)) return this.isFullyInitialized() && !this.filtered_;
                    var t = et(e);
                    return this.isCompleteForChild(t)
                }
                isCompleteForChild(e) {
                    return this.isFullyInitialized() && !this.filtered_ || this.node_.hasChild(e)
                }
                getNode() {
                    return this.node_
                }
            }
            class Tn {
                constructor(e) {
                    this.query_ = e, this.index_ = this.query_._queryParams.getIndex()
                }
            }

            function En(n, e, t, r) {
                var i = [];
                const s = [];
                return e.forEach(e => {
                    var t;
                    "child_changed" === e.type && n.index_.indexedValueChanged(e.oldSnap, e.snapshotNode) && s.push((t = e.childName, {
                        type: "child_moved",
                        snapshotNode: e.snapshotNode,
                        childName: t
                    }))
                }), Sn(n, i, "child_removed", e, r, t), Sn(n, i, "child_added", e, r, t), Sn(n, i, "child_moved", s, r, t), Sn(n, i, "child_changed", e, r, t), Sn(n, i, "value", e, r, t), i
            }

            function Sn(s, o, t, e, a, l) {
                const n = e.filter(e => e.type === t);
                n.sort((e, t) => function(e, t, n) {
                    if (null == t.childName || null == n.childName) throw c("Should only compare child_ events.");
                    var r = new mt(t.childName, t.snapshotNode),
                        i = new mt(n.childName, n.snapshotNode);
                    return e.index_.compare(r, i)
                }(s, e, t)), n.forEach(t => {
                    const n = (e = s, i = l, "value" === (r = t).type || "child_removed" === r.type || (r.prevName = i.getPredecessorChildName(r.childName, r.snapshotNode, e.index_)), r);
                    var e, r, i;
                    a.forEach(e => {
                        e.respondsTo(t.type) && o.push(e.createEvent(n, s.query_))
                    })
                })
            }

            function kn(e, t) {
                return {
                    eventCache: e,
                    serverCache: t
                }
            }

            function Nn(e, t, n, r) {
                return kn(new In(t, n, r), e.serverCache)
            }

            function Pn(e, t, n, r) {
                return kn(e.eventCache, new In(t, n, r))
            }

            function Rn(e) {
                return e.eventCache.isFullyInitialized() ? e.eventCache.getNode() : null
            }

            function xn(e) {
                return e.serverCache.isFullyInitialized() ? e.serverCache.getNode() : null
            }
            let Dn;
            class An {
                constructor(e, t = (Dn = Dn || new Tt(he), Dn)) {
                    this.value = e, this.children = t
                }
                static fromObject(e) {
                    let n = new An(null);
                    return be(e, (e, t) => {
                        n = n.set(new Xe(e), t)
                    }), n
                }
                isEmpty() {
                    return null === this.value && this.children.isEmpty()
                }
                findRootMostMatchingPathAndValue(e, t) {
                    if (null != this.value && t(this.value)) return {
                        path: Ze(),
                        value: this.value
                    };
                    if (at(e)) return null; {
                        var n = et(e);
                        const i = this.children.get(n);
                        if (null === i) return null;
                        var r = i.findRootMostMatchingPathAndValue(nt(e), t);
                        return null == r ? null : {
                            path: ot(new Xe(n), r.path),
                            value: r.value
                        }
                    }
                }
                findRootMostValueAndPath(e) {
                    return this.findRootMostMatchingPathAndValue(e, () => !0)
                }
                subtree(e) {
                    if (at(e)) return this; {
                        var t = et(e);
                        const n = this.children.get(t);
                        return null !== n ? n.subtree(nt(e)) : new An(null)
                    }
                }
                set(e, t) {
                    if (at(e)) return new An(t, this.children); {
                        var n = et(e);
                        const i = this.children.get(n) || new An(null);
                        var r = i.set(nt(e), t),
                            r = this.children.insert(n, r);
                        return new An(this.value, r)
                    }
                }
                remove(t) {
                    if (at(t)) return this.children.isEmpty() ? new An(null) : new An(null, this.children); {
                        var n = et(t);
                        const r = this.children.get(n);
                        if (r) {
                            const i = r.remove(nt(t));
                            let e;
                            return e = i.isEmpty() ? this.children.remove(n) : this.children.insert(n, i), null === this.value && e.isEmpty() ? new An(null) : new An(this.value, e)
                        }
                        return this
                    }
                }
                get(e) {
                    if (at(e)) return this.value; {
                        var t = et(e);
                        const n = this.children.get(t);
                        return n ? n.get(nt(e)) : null
                    }
                }
                setTree(t, n) {
                    if (at(t)) return n; {
                        var r = et(t);
                        const i = this.children.get(r) || new An(null),
                            s = i.setTree(nt(t), n);
                        let e;
                        return e = s.isEmpty() ? this.children.remove(r) : this.children.insert(r, s), new An(this.value, e)
                    }
                }
                fold(e) {
                    return this.fold_(Ze(), e)
                }
                fold_(n, r) {
                    const i = {};
                    return this.children.inorderTraversal((e, t) => {
                        i[e] = t.fold_(ot(n, e), r)
                    }), r(n, this.value, i)
                }
                findOnPath(e, t) {
                    return this.findOnPath_(e, Ze(), t)
                }
                findOnPath_(e, t, n) {
                    var r = !!this.value && n(t, this.value);
                    if (r) return r;
                    if (at(e)) return null; {
                        r = et(e);
                        const i = this.children.get(r);
                        return i ? i.findOnPath_(nt(e), ot(t, r), n) : null
                    }
                }
                foreachOnPath(e, t) {
                    return this.foreachOnPath_(e, Ze(), t)
                }
                foreachOnPath_(e, t, n) {
                    if (at(e)) return this; {
                        this.value && n(t, this.value);
                        var r = et(e);
                        const i = this.children.get(r);
                        return i ? i.foreachOnPath_(nt(e), ot(t, r), n) : new An(null)
                    }
                }
                foreach(e) {
                    this.foreach_(Ze(), e)
                }
                foreach_(n, r) {
                    this.children.inorderTraversal((e, t) => {
                        t.foreach_(ot(n, e), r)
                    }), this.value && r(n, this.value)
                }
                foreachChild(n) {
                    this.children.inorderTraversal((e, t) => {
                        t.value && n(e, t.value)
                    })
                }
            }
            class On {
                constructor(e) {
                    this.writeTree_ = e
                }
                static empty() {
                    return new On(new An(null))
                }
            }

            function Ln(t, n, r) {
                if (at(n)) return new On(new An(r));
                var i = t.writeTree_.findRootMostValueAndPath(n);
                if (null != i) {
                    var s = i.path;
                    let e = i.value;
                    i = lt(s, n);
                    return e = e.updateChild(i, r), new On(t.writeTree_.set(s, e))
                }
                s = new An(r), s = t.writeTree_.setTree(n, s);
                return new On(s)
            }

            function Mn(e, n, t) {
                let r = e;
                return be(t, (e, t) => {
                    r = Ln(r, ot(n, e), t)
                }), r
            }

            function Fn(e, t) {
                if (at(t)) return On.empty();
                var n = e.writeTree_.setTree(t, new An(null));
                return new On(n)
            }

            function qn(e, t) {
                return null != Wn(e, t)
            }

            function Wn(e, t) {
                var n = e.writeTree_.findRootMostValueAndPath(t);
                return null != n ? e.writeTree_.get(n.path).getChild(lt(n.path, t)) : null
            }

            function Un(e) {
                const n = [],
                    t = e.writeTree_.value;
                return null != t ? t.isLeafNode() || t.forEachChild(Ot, (e, t) => {
                    n.push(new mt(e, t))
                }) : e.writeTree_.children.inorderTraversal((e, t) => {
                    null != t.value && n.push(new mt(e, t.value))
                }), n
            }

            function Bn(e, t) {
                if (at(t)) return e;
                var n = Wn(e, t);
                return null != n ? new On(new An(n)) : new On(e.writeTree_.subtree(t))
            }

            function jn(e) {
                return e.writeTree_.isEmpty()
            }

            function Vn(e, t) {
                return function r(i, e, s) {
                    {
                        if (null != e.value) return s.updateChild(i, e.value); {
                            let n = null;
                            return e.children.inorderTraversal((e, t) => {
                                ".priority" === e ? (p(null !== t.value, "Priority writes must always be leaf nodes"), n = t.value) : s = r(ot(i, e), t, s)
                            }), s = !s.getChild(i).isEmpty() && null !== n ? s.updateChild(ot(i, ".priority"), n) : s
                        }
                    }
                }(Ze(), e.writeTree_, t)
            }

            function zn(e, t) {
                return nr(t, e)
            }

            function Hn(t, n) {
                var e, r = t.allWrites.findIndex(e => e.writeId === n);
                p(0 <= r, "removeWrite called with nonexistent writeId.");
                const i = t.allWrites[r];
                t.allWrites.splice(r, 1);
                let s = i.visible,
                    o = !1,
                    a = t.allWrites.length - 1;
                for (; s && 0 <= a;) {
                    var l = t.allWrites[a];
                    l.visible && (a >= r && function(e, t) {
                        {
                            if (e.snap) return ut(e.path, t);
                            for (const n in e.children)
                                if (e.children.hasOwnProperty(n) && ut(ot(e.path, n), t)) return !0;
                            return !1
                        }
                    }(l, i.path) ? s = !1 : ut(i.path, l.path) && (o = !0)), a--
                }
                return !!s && (o ? ((e = t).visibleWrites = Yn(e.allWrites, Qn, Ze()), 0 < e.allWrites.length ? e.lastWriteId = e.allWrites[e.allWrites.length - 1].writeId : e.lastWriteId = -1) : i.snap ? t.visibleWrites = Fn(t.visibleWrites, i.path) : be(i.children, e => {
                    t.visibleWrites = Fn(t.visibleWrites, ot(i.path, e))
                }), !0)
            }

            function Qn(e) {
                return e.visible
            }

            function Yn(e, t, n) {
                let r = On.empty();
                for (let s = 0; s < e.length; ++s) {
                    const o = e[s];
                    if (t(o)) {
                        var i = o.path;
                        let e;
                        if (o.snap) ut(n, i) ? (e = lt(n, i), r = Ln(r, e, o.snap)) : ut(i, n) && (e = lt(i, n), r = Ln(r, Ze(), o.snap.getChild(e)));
                        else {
                            if (!o.children) throw c("WriteRecord should have .snap or .children");
                            if (ut(n, i)) e = lt(n, i), r = Mn(r, e, o.children);
                            else if (ut(i, n))
                                if (e = lt(i, n), at(e)) r = Mn(r, Ze(), o.children);
                                else {
                                    const a = C(o.children, et(e));
                                    a && (i = a.getChild(nt(e)), r = Ln(r, Ze(), i))
                                }
                        }
                    }
                }
                return r
            }

            function Kn(e, t, n, r, i) {
                if (r || i) {
                    var s = Bn(e.visibleWrites, t);
                    if (!i && jn(s)) return n;
                    if (i || null != n || qn(s, Ze())) return Vn(Yn(e.allWrites, function(e) {
                        return (e.visible || i) && (!r || !~r.indexOf(e.writeId)) && (ut(e.path, t) || ut(t, e.path))
                    }, t), n || jt.EMPTY_NODE);
                    return null
                }
                s = Wn(e.visibleWrites, t);
                if (null != s) return s;
                s = Bn(e.visibleWrites, t);
                return jn(s) ? n : null != n || qn(s, Ze()) ? Vn(s, n || jt.EMPTY_NODE) : null
            }

            function $n(e, t, n, r) {
                return Kn(e.writeTree, e.treePath, t, n, r)
            }

            function Gn(e, t) {
                return function(e, t, n) {
                    let r = jt.EMPTY_NODE;
                    const i = Wn(e.visibleWrites, t);
                    if (i) return i.isLeafNode() || i.forEachChild(Ot, (e, t) => {
                        r = r.updateImmediateChild(e, t)
                    }), r;
                    if (n) {
                        const s = Bn(e.visibleWrites, t);
                        return n.forEachChild(Ot, (e, t) => {
                            var n = Vn(Bn(s, new Xe(e)), t);
                            r = r.updateImmediateChild(e, n)
                        }), Un(s).forEach(e => {
                            r = r.updateImmediateChild(e.name, e.node)
                        }), r
                    }
                    return Un(Bn(e.visibleWrites, t)).forEach(e => {
                        r = r.updateImmediateChild(e.name, e.node)
                    }), r
                }(e.writeTree, e.treePath, t)
            }

            function Jn(e, t, n, r) {
                return function(e, t, n, r, i) {
                    p(r || i, "Either existingEventSnap or existingServerSnap must exist");
                    var s = ot(t, n);
                    return qn(e.visibleWrites, s) ? null : jn(s = Bn(e.visibleWrites, s)) ? i.getChild(n) : Vn(s, i.getChild(n))
                }(e.writeTree, e.treePath, t, n, r)
            }

            function Xn(e, t) {
                return n = e.writeTree, t = ot(e.treePath, t), Wn(n.visibleWrites, t);
                var n
            }

            function Zn(e, t, n, r, i, s) {
                return function(e, t, n, r, i, s, o) {
                    let a;
                    var l = Bn(e.visibleWrites, t),
                        h = Wn(l, Ze());
                    if (null != h) a = h;
                    else {
                        if (null == n) return [];
                        a = Vn(l, n)
                    }
                    if (a = a.withIndex(o), a.isEmpty() || a.isLeafNode()) return []; {
                        const c = [],
                            u = o.getCompare(),
                            d = s ? a.getReverseIteratorFrom(r, o) : a.getIteratorFrom(r, o);
                        let e = d.getNext();
                        for (; e && c.length < i;) 0 !== u(e, r) && c.push(e), e = d.getNext();
                        return c
                    }
                }(e.writeTree, e.treePath, t, n, r, i, s)
            }

            function er(e, t, n) {
                return r = e.writeTree, e = e.treePath, n = n, i = ot(e, t = t), null != (s = Wn(r.visibleWrites, i)) ? s : n.isCompleteForChild(t) ? Vn(Bn(r.visibleWrites, i), n.getNode().getImmediateChild(t)) : null;
                var r, i, s
            }

            function tr(e, t) {
                return nr(ot(e.treePath, t), e.writeTree)
            }

            function nr(e, t) {
                return {
                    treePath: e,
                    writeTree: t
                }
            }
            class rr {
                constructor() {
                    this.changeMap = new Map
                }
                trackChildChange(e) {
                    var t = e.type,
                        n = e.childName;
                    p("child_added" === t || "child_changed" === t || "child_removed" === t, "Only child changes supported for tracking"), p(".priority" !== n, "Only non-priority child changes can be tracked.");
                    var r = this.changeMap.get(n);
                    if (r) {
                        var i = r.type;
                        if ("child_added" === t && "child_removed" === i) this.changeMap.set(n, Xt(n, e.snapshotNode, r.snapshotNode));
                        else if ("child_removed" === t && "child_added" === i) this.changeMap.delete(n);
                        else if ("child_removed" === t && "child_changed" === i) this.changeMap.set(n, Jt(n, r.oldSnap));
                        else if ("child_changed" === t && "child_added" === i) this.changeMap.set(n, Gt(n, e.snapshotNode));
                        else {
                            if ("child_changed" !== t || "child_changed" !== i) throw c("Illegal combination of changes: " + e + " occurred after " + r);
                            this.changeMap.set(n, Xt(n, e.snapshotNode, r.oldSnap))
                        }
                    } else this.changeMap.set(n, e)
                }
                getChanges() {
                    return Array.from(this.changeMap.values())
                }
            }
            const ir = new class {
                getCompleteChild(e) {
                    return null
                }
                getChildAfterChild(e, t, n) {
                    return null
                }
            };
            class sr {
                constructor(e, t, n = null) {
                    this.writes_ = e, this.viewCache_ = t, this.optCompleteServerCache_ = n
                }
                getCompleteChild(e) {
                    const t = this.viewCache_.eventCache;
                    if (t.isCompleteForChild(e)) return t.getNode().getImmediateChild(e);
                    var n = null != this.optCompleteServerCache_ ? new In(this.optCompleteServerCache_, !0, !1) : this.viewCache_.serverCache;
                    return er(this.writes_, e, n)
                }
                getChildAfterChild(e, t, n) {
                    var r = null != this.optCompleteServerCache_ ? this.optCompleteServerCache_ : xn(this.viewCache_),
                        r = Zn(this.writes_, r, t, 1, n, e);
                    return 0 === r.length ? null : r[0]
                }
            }

            function or(e, t, n, r, i) {
                const s = new rr;
                let o, a;
                if (n.type === K.OVERWRITE) {
                    var l = n;
                    o = l.source.fromUser ? hr(e, t, l.path, l.snap, r, i, s) : (p(l.source.fromServer, "Unknown source."), a = l.source.tagged || t.serverCache.isFiltered() && !at(l.path), lr(e, t, l.path, l.snap, r, i, a, s))
                } else if (n.type === K.MERGE) {
                    l = n;
                    o = l.source.fromUser ? function(r, i, s, e, o, a, l) {
                        let h = i;
                        return e.foreach((e, t) => {
                            var n = ot(s, e);
                            cr(i, et(n)) && (h = hr(r, h, n, t, o, a, l))
                        }), e.foreach((e, t) => {
                            var n = ot(s, e);
                            cr(i, et(n)) || (h = hr(r, h, n, t, o, a, l))
                        }), h
                    }(e, t, l.path, l.children, r, i, s) : (p(l.source.fromServer, "Unknown source."), a = l.source.tagged || t.serverCache.isFiltered(), dr(e, t, l.path, l.children, r, i, a, s))
                } else if (n.type === K.ACK_USER_WRITE) {
                    var h = n;
                    o = h.revert ? function(n, r, i, s, e, o) {
                        let a; {
                            if (null != Xn(s, i)) return r; {
                                var l = new sr(s, r, e);
                                const c = r.eventCache.getNode();
                                let t;
                                if (at(i) || ".priority" === et(i)) {
                                    let e;
                                    e = r.serverCache.isFullyInitialized() ? $n(s, xn(r)) : (h = r.serverCache.getNode(), p(h instanceof jt, "serverChildren would be complete if leaf node"), Gn(s, h)), e = e, t = n.filter.updateFullNode(c, e, o)
                                } else {
                                    var h = et(i);
                                    let e = er(s, h, r.serverCache);
                                    null == e && r.serverCache.isCompleteForChild(h) && (e = c.getImmediateChild(h)), t = null != e ? n.filter.updateChild(c, h, e, nt(i), l, o) : r.eventCache.getNode().hasChild(h) ? n.filter.updateChild(c, h, jt.EMPTY_NODE, nt(i), l, o) : c, t.isEmpty() && r.serverCache.isFullyInitialized() && (a = $n(s, xn(r)), a.isLeafNode() && (t = n.filter.updateFullNode(t, a, o)))
                                }
                                return a = r.serverCache.isFullyInitialized() || null != Xn(s, Ze()), Nn(r, t, a, n.filter.filtersNodes())
                            }
                        }
                    }(e, t, h.path, r, i, s) : function(e, t, i, n, s, o, a) {
                        if (null != Xn(s, i)) return t;
                        const l = t.serverCache.isFiltered(),
                            h = t.serverCache; {
                            if (null != n.value) {
                                if (at(i) && h.isFullyInitialized() || h.isCompleteForPath(i)) return lr(e, t, i, h.getNode().getChild(i), s, o, l, a);
                                if (at(i)) {
                                    let n = new An(null);
                                    return h.getNode().forEachChild(Ct, (e, t) => {
                                        n = n.set(new Xe(e), t)
                                    }), dr(e, t, i, n, s, o, l, a)
                                }
                                return t
                            } {
                                let r = new An(null);
                                return n.foreach((e, t) => {
                                    var n = ot(i, e);
                                    h.isCompleteForPath(n) && (r = r.set(e, h.getNode().getChild(n)))
                                }), dr(e, t, i, r, s, o, l, a)
                            }
                        }
                    }(e, t, h.path, h.affectedTree, r, i, s)
                } else {
                    if (n.type !== K.LISTEN_COMPLETE) throw c("Unknown operation type: " + n.type);
                    o = function(e, t, n, r, i) {
                        const s = t.serverCache,
                            o = Pn(t, s.getNode(), s.isFullyInitialized() || at(n), s.isFiltered());
                        return ar(e, o, n, r, ir, i)
                    }(e, t, n.path, r, s)
                }
                h = s.getChanges();
                return function(e, t, n) {
                    const r = t.eventCache;
                    if (r.isFullyInitialized()) {
                        var i = r.getNode().isLeafNode() || r.getNode().isEmpty();
                        const s = Rn(e);
                        (0 < n.length || !e.eventCache.isFullyInitialized() || i && !r.getNode().equals(s) || !r.getNode().getPriority().equals(s.getPriority())) && n.push($t(Rn(t)))
                    }
                }(t, o, h), {
                    viewCache: o,
                    changes: h
                }
            }

            function ar(r, i, s, o, a, l) {
                const h = i.eventCache;
                if (null != Xn(o, s)) return i; {
                    let t, n;
                    if (at(s)) {
                        var e;
                        p(i.serverCache.isFullyInitialized(), "If change path is empty, we must have complete server data"), t = i.serverCache.isFiltered() ? (e = Gn(o, (e = xn(i)) instanceof jt ? e : jt.EMPTY_NODE), r.filter.updateFullNode(i.eventCache.getNode(), e, l)) : (c = $n(o, xn(i)), r.filter.updateFullNode(i.eventCache.getNode(), c, l))
                    } else {
                        var c = et(s);
                        if (".priority" === c) {
                            p(1 === tt(s), "Can't have a priority with additional path components");
                            var u = h.getNode();
                            n = i.serverCache.getNode();
                            var d = Jn(o, s, u, n);
                            t = null != d ? r.filter.updatePriority(u, d) : h.getNode()
                        } else {
                            u = nt(s);
                            let e;
                            e = h.isCompleteForChild(c) ? (n = i.serverCache.getNode(), null != (d = Jn(o, s, h.getNode(), n)) ? h.getNode().getImmediateChild(c).updateChild(u, d) : h.getNode().getImmediateChild(c)) : er(o, c, i.serverCache), t = null != e ? r.filter.updateChild(h.getNode(), c, e, u, a, l) : h.getNode()
                        }
                    }
                    return Nn(i, t, h.isFullyInitialized() || at(s), r.filter.filtersNodes())
                }
            }

            function lr(e, t, n, r, i, s, o, a) {
                const l = t.serverCache;
                let h;
                const c = o ? e.filter : e.filter.getIndexedFilter();
                if (at(n)) h = c.updateFullNode(l.getNode(), r, null);
                else if (c.filtersNodes() && !l.isFiltered()) {
                    var u = l.getNode().updateChild(n, r);
                    h = c.updateFullNode(l.getNode(), u, null)
                } else {
                    var d = et(n);
                    if (!l.isCompleteForPath(n) && 1 < tt(n)) return t;
                    var _ = nt(n);
                    const p = l.getNode().getImmediateChild(d);
                    u = p.updateChild(_, r);
                    h = ".priority" === d ? c.updatePriority(l.getNode(), u) : c.updateChild(l.getNode(), d, u, _, ir, null)
                }
                _ = Pn(t, h, l.isFullyInitialized() || at(n), c.filtersNodes());
                return ar(e, _, n, i, new sr(i, _, s), a)
            }

            function hr(t, n, r, i, e, s, o) {
                const a = n.eventCache;
                let l, h;
                const c = new sr(e, n, s);
                if (at(r)) h = t.filter.updateFullNode(n.eventCache.getNode(), i, o), l = Nn(n, h, !0, t.filter.filtersNodes());
                else {
                    var u = et(r);
                    if (".priority" === u) h = t.filter.updatePriority(n.eventCache.getNode(), i), l = Nn(n, h, a.isFullyInitialized(), a.isFiltered());
                    else {
                        var d = nt(r);
                        const _ = a.getNode().getImmediateChild(u);
                        let e;
                        if (at(d)) e = i;
                        else {
                            const p = c.getCompleteChild(u);
                            e = null != p ? ".priority" === rt(d) && p.getChild(st(d)).isEmpty() ? p : p.updateChild(d, i) : jt.EMPTY_NODE
                        }
                        l = _.equals(e) ? n : Nn(n, t.filter.updateChild(a.getNode(), u, e, d, c, o), a.isFullyInitialized(), t.filter.filtersNodes())
                    }
                }
                return l
            }

            function cr(e, t) {
                return e.eventCache.isCompleteForChild(t)
            }

            function ur(e, n, t) {
                return t.foreach((e, t) => {
                    n = n.updateChild(e, t)
                }), n
            }

            function dr(r, i, e, t, s, o, a, l) {
                if (i.serverCache.getNode().isEmpty() && !i.serverCache.isFullyInitialized()) return i;
                let h = i,
                    n;
                n = at(e) ? t : new An(null).setTree(e, t);
                const c = i.serverCache.getNode();
                return n.children.inorderTraversal((e, t) => {
                    var n;
                    c.hasChild(e) && (n = ur(0, i.serverCache.getNode().getImmediateChild(e), t), h = lr(r, h, new Xe(e), n, s, o, a, l))
                }), n.children.inorderTraversal((e, t) => {
                    var n = !i.serverCache.isCompleteForChild(e) && null === t.value;
                    c.hasChild(e) || n || (n = ur(0, i.serverCache.getNode().getImmediateChild(e), t), h = lr(r, h, new Xe(e), n, s, o, a, l))
                }), h
            }
            class _r {
                constructor(e, t) {
                    this.query_ = e, this.eventRegistrations_ = [];
                    const n = this.query_._queryParams,
                        r = new Zt(n.getIndex()),
                        i = (e = n).loadsAllData() ? new Zt(e.getIndex()) : new(e.hasLimit() ? tn : en)(e);
                    this.processor_ = {
                        filter: i
                    };
                    const s = t.serverCache,
                        o = t.eventCache;
                    var a = r.updateFullNode(jt.EMPTY_NODE, s.getNode(), null),
                        l = i.updateFullNode(jt.EMPTY_NODE, o.getNode(), null),
                        a = new In(a, s.isFullyInitialized(), r.filtersNodes()),
                        l = new In(l, o.isFullyInitialized(), i.filtersNodes());
                    this.viewCache_ = kn(l, a), this.eventGenerator_ = new Tn(this.query_)
                }
                get query() {
                    return this.query_
                }
            }

            function pr(e) {
                return 0 === e.eventRegistrations_.length
            }

            function fr(n, r, i) {
                const s = [];
                if (i) {
                    p(null == r, "A cancel should cancel all event registrations.");
                    const o = n.query._path;
                    n.eventRegistrations_.forEach(e => {
                        var t = e.createCancelEvent(i, o);
                        t && s.push(t)
                    })
                }
                if (r) {
                    let e = [];
                    for (let t = 0; t < n.eventRegistrations_.length; ++t) {
                        const a = n.eventRegistrations_[t];
                        if (a.matches(r)) {
                            if (r.hasAnyCallback()) {
                                e = e.concat(n.eventRegistrations_.slice(t + 1));
                                break
                            }
                        } else e.push(a)
                    }
                    n.eventRegistrations_ = e
                } else n.eventRegistrations_ = [];
                return s
            }

            function gr(e, t, n, r) {
                t.type === K.MERGE && null !== t.source.queryId && (p(xn(e.viewCache_), "We should always have a full cache before handling merges"), p(Rn(e.viewCache_), "Missing event cache, even though we have a server cache"));
                const i = e.viewCache_,
                    s = or(e.processor_, i, t, n, r);
                return n = e.processor_, r = s.viewCache, p(r.eventCache.getNode().isIndexed(n.filter.getIndex()), "Event snap not indexed"), p(r.serverCache.getNode().isIndexed(n.filter.getIndex()), "Server snap not indexed"), p(s.viewCache.serverCache.isFullyInitialized() || !i.serverCache.isFullyInitialized(), "Once a server snap is complete, it should never go back"), e.viewCache_ = s.viewCache, mr(e, s.changes, s.viewCache.eventCache.getNode(), null)
            }

            function mr(e, t, n, r) {
                var i = r ? [r] : e.eventRegistrations_;
                return En(e.eventGenerator_, t, n, i)
            }
            let vr;
            class yr {
                constructor() {
                    this.views = new Map
                }
            }

            function wr(t, n, r, i) {
                var e = n.source.queryId;
                if (null !== e) {
                    e = t.views.get(e);
                    return p(null != e, "SyncTree gave us an op for an invalid query."), gr(e, n, r, i)
                } {
                    let e = [];
                    for (const s of t.views.values()) e = e.concat(gr(s, n, r, i));
                    return e
                }
            }

            function Cr(e, n, r, i, s) {
                var o = n._queryIdentifier,
                    o = e.views.get(o);
                if (o) return o; {
                    let e = $n(r, s ? i : null),
                        t = !1;
                    t = !!e || (e = i instanceof jt ? Gn(r, i) : jt.EMPTY_NODE, !1);
                    o = kn(new In(e, t, !1), new In(i, s, !1));
                    return new _r(n, o)
                }
            }

            function br(e, t, n, r, i, s) {
                var o = Cr(e, t, r, i, s);
                return e.views.has(t._queryIdentifier) || e.views.set(t._queryIdentifier, o), o.eventRegistrations_.push(n),
                    function(e, t) {
                        const n = e.viewCache_.eventCache,
                            r = [];
                        if (!n.getNode().isLeafNode()) {
                            const i = n.getNode();
                            i.forEachChild(Ot, (e, t) => {
                                r.push(Gt(e, t))
                            })
                        }
                        return n.isFullyInitialized() && r.push($t(n.getNode())), mr(e, r, n.getNode(), t)
                    }(o, n)
            }

            function Ir(e, t, n, r) {
                var i = t._queryIdentifier;
                const s = [];
                let o = [];
                var a = Nr(e);
                if ("default" === i)
                    for (var [l, h] of e.views.entries()) o = o.concat(fr(h, n, r)), pr(h) && (e.views.delete(l), h.query._queryParams.loadsAllData() || s.push(h.query));
                else {
                    const c = e.views.get(i);
                    c && (o = o.concat(fr(c, n, r)), pr(c) && (e.views.delete(i), c.query._queryParams.loadsAllData() || s.push(c.query)))
                }
                return a && !Nr(e) && s.push((p(vr, "Reference.ts has not been loaded"), new vr(t._repo, t._path))), {
                    removed: s,
                    events: o
                }
            }

            function Tr(e) {
                const t = [];
                for (const n of e.views.values()) n.query._queryParams.loadsAllData() || t.push(n);
                return t
            }

            function Er(e, t) {
                let n = null;
                for (const r of e.views.values()) n = n || function(e, t) {
                    const n = xn(e.viewCache_);
                    return n && (e.query._queryParams.loadsAllData() || !at(t) && !n.getImmediateChild(et(t)).isEmpty()) ? n.getChild(t) : null
                }(r, t);
                return n
            }

            function Sr(e, t) {
                const n = t._queryParams;
                if (n.loadsAllData()) return Pr(e);
                var r = t._queryIdentifier;
                return e.views.get(r)
            }

            function kr(e, t) {
                return null != Sr(e, t)
            }

            function Nr(e) {
                return null != Pr(e)
            }

            function Pr(e) {
                for (const t of e.views.values())
                    if (t.query._queryParams.loadsAllData()) return t;
                return null
            }
            let Rr;
            let xr = 1;
            class Dr {
                constructor(e) {
                    this.listenProvider_ = e, this.syncPointTree_ = new An(null), this.pendingWriteTree_ = {
                        visibleWrites: On.empty(),
                        allWrites: [],
                        lastWriteId: -1
                    }, this.tagToQueryMap = new Map, this.queryToTagMap = new Map
                }
            }

            function Ar(e, t, n, r, i) {
                var s, o, a, l;
                return s = e.pendingWriteTree_, o = t, a = n, l = r, r = i, p(l > s.lastWriteId, "Stacking an older write on top of newer ones"), s.allWrites.push({
                    path: o,
                    snap: a,
                    writeId: l,
                    visible: r = void 0 === r ? !0 : r
                }), r && (s.visibleWrites = Ln(s.visibleWrites, o, a)), s.lastWriteId = l, i ? jr(e, new Cn(gn(), t, n)) : []
            }

            function Or(e, t, n, r) {
                var i, s, o;
                i = e.pendingWriteTree_, s = t, o = n, r = r, p(r > i.lastWriteId, "Stacking an older merge on top of newer ones"), i.allWrites.push({
                    path: s,
                    children: o,
                    writeId: r,
                    visible: !0
                }), i.visibleWrites = Mn(i.visibleWrites, s, o), i.lastWriteId = r;
                var a = An.fromObject(n);
                return jr(e, new bn(gn(), t, a))
            }

            function Lr(e, t, n = !1) {
                var r = function(e, t) {
                    for (let r = 0; r < e.allWrites.length; r++) {
                        var n = e.allWrites[r];
                        if (n.writeId === t) return n
                    }
                    return null
                }(e.pendingWriteTree_, t);
                if (Hn(e.pendingWriteTree_, t)) {
                    let t = new An(null);
                    return null != r.snap ? t = t.set(Ze(), !0) : be(r.children, e => {
                        t = t.set(new Xe(e), !0)
                    }), jr(e, new yn(r.path, t, n))
                }
                return []
            }

            function Mr(e, t, n) {
                return jr(e, new Cn(mn(), t, n))
            }

            function Fr(n, e, t, r, i = !1) {
                var s = e._path,
                    o = n.syncPointTree_.get(s);
                let a = [];
                if (o && ("default" === e._queryIdentifier || kr(o, e))) {
                    var l = Ir(o, e, t, r);
                    0 === o.views.size && (n.syncPointTree_ = n.syncPointTree_.remove(s));
                    const d = l.removed;
                    if (a = l.events, !i) {
                        o = -1 !== d.findIndex(e => e._queryParams.loadsAllData()), l = n.syncPointTree_.findOnPath(s, (e, t) => Nr(t));
                        if (o && !l) {
                            const _ = n.syncPointTree_.subtree(s);
                            if (!_.isEmpty()) {
                                var h = _.fold((e, t, r) => {
                                    if (t && Nr(t)) return [Pr(t)]; {
                                        let n = [];
                                        return t && (n = Tr(t)), be(r, (e, t) => {
                                            n = n.concat(t)
                                        }), n
                                    }
                                });
                                for (let e = 0; e < h.length; ++e) {
                                    var c = h[e],
                                        u = c.query,
                                        c = zr(n, c);
                                    n.listenProvider_.startListening(Gr(u), Hr(n, u), c.hashFn, c.onComplete)
                                }
                            }
                        }!l && 0 < d.length && !r && (o ? n.listenProvider_.stopListening(Gr(e), null) : d.forEach(e => {
                            var t = n.queryToTagMap.get(Qr(e));
                            n.listenProvider_.stopListening(Gr(e), t)
                        }))
                    }! function(e, t) {
                        for (let i = 0; i < t.length; ++i) {
                            const s = t[i];
                            var n, r;
                            s._queryParams.loadsAllData() || (n = Qr(s), r = e.queryToTagMap.get(n), e.queryToTagMap.delete(n), e.tagToQueryMap.delete(r))
                        }
                    }(n, d)
                }
                return a
            }

            function qr(e, t, n, r) {
                var i = Yr(e, r);
                if (null == i) return [];
                var s = Kr(i),
                    o = s.path,
                    i = s.queryId,
                    s = lt(o, t);
                return $r(e, o, new Cn(vn(i), s, n))
            }

            function Wr(e, t, n, r = !1) {
                const i = t._path;
                let s = null,
                    o = !1;
                e.syncPointTree_.foreachOnPath(i, (e, t) => {
                    var n = lt(e, i);
                    s = s || Er(t, n), o = o || Nr(t)
                });
                let a = e.syncPointTree_.get(i);
                a ? (o = o || Nr(a), s = s || Er(a, Ze())) : (a = new yr, e.syncPointTree_ = e.syncPointTree_.set(i, a));
                let l;
                if (null != s) l = !0;
                else {
                    l = !1, s = jt.EMPTY_NODE;
                    const _ = e.syncPointTree_.subtree(i);
                    _.foreachChild((e, t) => {
                        var n = Er(t, Ze());
                        n && (s = s.updateImmediateChild(e, n))
                    })
                }
                var h, c = kr(a, t);
                c || t._queryParams.loadsAllData() || (u = Qr(t), p(!e.queryToTagMap.has(u), "View does not exist, but we have a tag"), h = xr++, e.queryToTagMap.set(u, h), e.tagToQueryMap.set(h, u));
                var u = zn(e.pendingWriteTree_, i);
                let d = br(a, t, n, u, s, l);
                return c || o || r || (c = Sr(a, t), d = d.concat(function(t, e, n) {
                    const r = e._path,
                        i = Hr(t, e),
                        s = zr(t, n),
                        o = t.listenProvider_.startListening(Gr(e), i, s.hashFn, s.onComplete),
                        a = t.syncPointTree_.subtree(r);
                    if (i) p(!Nr(a.value), "If we're adding a query, it shouldn't be shadowed");
                    else {
                        var l = a.fold((e, t, r) => {
                            if (!at(e) && t && Nr(t)) return [Pr(t).query]; {
                                let n = [];
                                return t && (n = n.concat(Tr(t).map(e => e.query))), be(r, (e, t) => {
                                    n = n.concat(t)
                                }), n
                            }
                        });
                        for (let e = 0; e < l.length; ++e) {
                            var h = l[e];
                            t.listenProvider_.stopListening(Gr(h), Hr(t, h))
                        }
                    }
                    return o
                }(e, t, c))), d
            }

            function Ur(e, r, t) {
                var n = e.pendingWriteTree_,
                    i = e.syncPointTree_.findOnPath(r, (e, t) => {
                        var n = Er(t, lt(e, r));
                        if (n) return n
                    });
                return Kn(n, r, i, t, !0)
            }

            function Br(e, t) {
                const r = t._path;
                let i = null;
                e.syncPointTree_.foreachOnPath(r, (e, t) => {
                    var n = lt(e, r);
                    i = i || Er(t, n)
                });
                let n = e.syncPointTree_.get(r);
                n ? i = i || Er(n, Ze()) : (n = new yr, e.syncPointTree_ = e.syncPointTree_.set(r, n));
                var s = null != i;
                const o = s ? new In(i, !0, !1) : null;
                var a = zn(e.pendingWriteTree_, t._path);
                return Rn(Cr(n, t, a, s ? o.getNode() : jt.EMPTY_NODE, s).viewCache_)
            }

            function jr(e, t) {
                return function t(n, r, i, s) {
                    {
                        if (at(n.path)) return Vr(n, r, i, s); {
                            const o = r.get(Ze());
                            null == i && null != o && (i = Er(o, Ze()));
                            let e = [];
                            const a = et(n.path),
                                l = n.operationForChild(a),
                                h = r.children.get(a);
                            if (h && l) {
                                const c = i ? i.getImmediateChild(a) : null,
                                    u = tr(s, a);
                                e = e.concat(t(l, h, c, u))
                            }
                            return o && (e = e.concat(wr(o, n, s, i))), e
                        }
                    }
                }(t, e.syncPointTree_, null, zn(e.pendingWriteTree_, Ze()))
            }

            function Vr(s, e, o, a) {
                var t = e.get(Ze());
                null == o && null != t && (o = Er(t, Ze()));
                let l = [];
                return e.children.inorderTraversal((e, t) => {
                    var n = o ? o.getImmediateChild(e) : null,
                        r = tr(a, e),
                        i = s.operationForChild(e);
                    i && (l = l.concat(Vr(i, t, n, r)))
                }), t && (l = l.concat(wr(t, s, a, o))), l
            }

            function zr(i, t) {
                const s = t.query,
                    o = Hr(i, s);
                return {
                    hashFn: () => {
                        const e = t.viewCache_.serverCache.getNode() || jt.EMPTY_NODE;
                        return e.hash()
                    },
                    onComplete: e => {
                        if ("ok" === e) return o ? function(e, t, n) {
                            if (s = Yr(e, n)) {
                                var r = Kr(s),
                                    i = r.path,
                                    s = r.queryId,
                                    r = lt(i, t);
                                return $r(e, i, new wn(vn(s), r))
                            }
                            return []
                        }(i, s._path, o) : (t = i, n = s._path, jr(t, new wn(mn(), n)));
                        var t, n, r = function(e, t) {
                            let n = "Unknown Error";
                            "too_big" === e ? n = "The data requested exceeds the maximum size that can be accessed with a single request." : "permission_denied" === e ? n = "Client doesn't have permission to access the desired data." : "unavailable" === e && (n = "The service is unavailable");
                            const r = new Error(e + " at " + t._path.toString() + ": " + n);
                            return r.code = e.toUpperCase(), r
                        }(e, s);
                        return Fr(i, s, null, r)
                    }
                }
            }

            function Hr(e, t) {
                var n = Qr(t);
                return e.queryToTagMap.get(n)
            }

            function Qr(e) {
                return e._path.toString() + "$" + e._queryIdentifier
            }

            function Yr(e, t) {
                return e.tagToQueryMap.get(t)
            }

            function Kr(e) {
                var t = e.indexOf("$");
                return p(-1 !== t && t < e.length - 1, "Bad queryKey."), {
                    queryId: e.substr(t + 1),
                    path: new Xe(e.substr(0, t))
                }
            }

            function $r(e, t, n) {
                var r = e.syncPointTree_.get(t);
                return p(r, "Missing sync point for query tag that we're tracking"), wr(r, n, zn(e.pendingWriteTree_, t), null)
            }

            function Gr(e) {
                return e._queryParams.loadsAllData() && !e._queryParams.isDefault() ? (p(Rr, "Reference.ts has not been loaded"), new Rr(e._repo, e._path)) : e
            }
            class Jr {
                constructor(e) {
                    this.node_ = e
                }
                getImmediateChild(e) {
                    var t = this.node_.getImmediateChild(e);
                    return new Jr(t)
                }
                node() {
                    return this.node_
                }
            }
            class Xr {
                constructor(e, t) {
                    this.syncTree_ = e, this.path_ = t
                }
                getImmediateChild(e) {
                    var t = ot(this.path_, e);
                    return new Xr(this.syncTree_, t)
                }
                node() {
                    return Ur(this.syncTree_, this.path_)
                }
            }

            function Zr(e) {
                return (e = e || {}).timestamp = e.timestamp || (new Date).getTime(), e
            }

            function ei(e, t, n) {
                return e && "object" == typeof e ? (p(".sv" in e, "Unexpected leaf node or priority contents"), "string" == typeof e[".sv"] ? ti(e[".sv"], t, n) : "object" == typeof e[".sv"] ? ni(e[".sv"], t) : void p(!1, "Unexpected server value: " + JSON.stringify(e, null, 2))) : e
            }
            const ti = function(e, t, n) {
                    if ("timestamp" === e) return n.timestamp;
                    p(!1, "Unexpected server value: " + e)
                },
                ni = function(e, t, n) {
                    e.hasOwnProperty("increment") || p(!1, "Unexpected server value: " + JSON.stringify(e, null, 2));
                    var r = e.increment;
                    "number" != typeof r && p(!1, "Unexpected increment value: " + r);
                    const i = t.node();
                    if (p(null !== i && void 0 !== i, "Expected ChildrenNode.EMPTY_NODE for nulls"), !i.isLeafNode()) return r;
                    const s = i;
                    var o = s.getValue();
                    return "number" != typeof o ? r : o + r
                },
                ri = function(e, t, n, r) {
                    return si(t, new Xr(n, e), r)
                },
                ii = function(e, t, n) {
                    return si(e, new Jr(t), n)
                };

            function si(e, r, i) {
                var t = e.getPriority().val(),
                    n = ei(t, r.getImmediateChild(".priority"), i);
                let s;
                if (e.isLeafNode()) {
                    const o = e;
                    t = ei(o.getValue(), r, i);
                    return t !== o.getValue() || n !== o.getPriority().val() ? new xt(t, Qt(n)) : e
                } {
                    const a = e;
                    return s = a, n !== a.getPriority().val() && (s = s.updatePriority(new xt(n))), a.forEachChild(Ot, (e, t) => {
                        var n = si(t, r.getImmediateChild(e), i);
                        n !== t && (s = s.updateImmediateChild(e, n))
                    }), s
                }
            }
            class oi {
                constructor(e = "", t = null, n = {
                    children: {},
                    childCount: 0
                }) {
                    this.name = e, this.parent = t, this.node = n
                }
            }

            function ai(e, t) {
                let n = t instanceof Xe ? t : new Xe(t),
                    r = e,
                    i = et(n);
                for (; null !== i;) {
                    var s = C(r.node.children, i) || {
                        children: {},
                        childCount: 0
                    };
                    r = new oi(i, r, s), n = nt(n), i = et(n)
                }
                return r
            }

            function li(e) {
                return e.node.value
            }

            function hi(e, t) {
                e.node.value = t, _i(e)
            }

            function ci(e) {
                return 0 < e.node.childCount
            }

            function ui(n, r) {
                be(n.node.children, (e, t) => {
                    r(new oi(e, n, t))
                })
            }

            function di(e) {
                return new Xe(null === e.parent ? e.name : di(e.parent) + "/" + e.name)
            }

            function _i(e) {
                var t, n, r, i;
                null !== e.parent && (t = e.parent, n = e.name, r = function(e) {
                    return void 0 === li(e) && !ci(e)
                }(e = e), i = w(t.node.children, n), r && i ? (delete t.node.children[n], t.node.childCount--, _i(t)) : r || i || (t.node.children[n] = e.node, t.node.childCount++, _i(t)))
            }

            function pi(e, t, n, r) {
                r && void 0 === t || ki(S(e, "value"), t, n)
            }

            function fi(e, t, r, n) {
                if (!n || void 0 !== t) {
                    const i = S(e, "values");
                    if (!t || "object" != typeof t || Array.isArray(t)) throw new Error(i + " must be an object containing the children to replace.");
                    const s = [];
                    be(t, (e, t) => {
                            const n = new Xe(e);
                            if (ki(i, t, ot(r, n)), ".priority" === rt(n) && !Si(t)) throw new Error(i + "contains an invalid value for '" + n.toString() + "', which must be a valid Firebase priority (a string, finite number, server value, or null).");
                            s.push(n)
                        }),
                        function(t, n) {
                            let r, i;
                            for (r = 0; r < n.length; r++) {
                                i = n[r];
                                var s = it(i);
                                for (let e = 0; e < s.length; e++)
                                    if ((".priority" !== s[e] || e !== s.length - 1) && !Ii(s[e])) throw new Error(t + "contains an invalid key (" + s[e] + ") in path " + i.toString() + '. Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"')
                            }
                            n.sort(ht);
                            let e = null;
                            for (r = 0; r < n.length; r++) {
                                if (i = n[r], null !== e && ut(e, i)) throw new Error(t + "contains a path " + e.toString() + " that is ancestor of another path " + i.toString());
                                e = i
                            }
                        }(i, s)
                }
            }

            function gi(e, t, n) {
                if (!n || void 0 !== t) {
                    if (ve(t)) throw new Error(S(e, "priority") + "is " + t.toString() + ", but must be a valid Firebase priority (a string, finite number, server value, or null).");
                    if (!Si(t)) throw new Error(S(e, "priority") + "must be a valid Firebase priority (a string, finite number, server value, or null).")
                }
            }

            function mi(e, t, n, r) {
                if (!(r && void 0 === n || Ii(n))) throw new Error(S(e, t) + 'was an invalid key = "' + n + '".  Firebase keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]").')
            }

            function vi(e, t, n, r) {
                n = n && n.replace(/^\/*\.info(\/|$)/, "/"), Ni(e, t, n, r)
            }

            function yi(e, t) {
                if (".info" === et(t)) throw new Error(e + " failed = Can't modify data under /.info/")
            }
            const wi = /[\[\].#$\/\u0000-\u001F\u007F]/,
                Ci = /[\[\].#$\u0000-\u001F\u007F]/,
                bi = 10485760,
                Ii = function(e) {
                    return "string" == typeof e && 0 !== e.length && !wi.test(e)
                },
                Ti = function(e) {
                    return "string" == typeof e && 0 !== e.length && !Ci.test(e)
                },
                Ei = function(e) {
                    return e = e && e.replace(/^\/*\.info(\/|$)/, "/"), Ti(e)
                },
                Si = function(e) {
                    return null === e || "string" == typeof e || "number" == typeof e && !ve(e) || e && "object" == typeof e && w(e, ".sv")
                },
                ki = function(o, e, t) {
                    const a = t instanceof Xe ? new dt(t, o) : t;
                    if (void 0 === e) throw new Error(o + "contains undefined " + pt(a));
                    if ("function" == typeof e) throw new Error(o + "contains a function " + pt(a) + " with contents = " + e.toString());
                    if (ve(e)) throw new Error(o + "contains " + e.toString() + " " + pt(a));
                    if ("string" == typeof e && e.length > bi / 3 && P(e) > bi) throw new Error(o + "contains a string greater than " + bi + " utf8 bytes " + pt(a) + " ('" + e.substring(0, 50) + "...')");
                    if (e && "object" == typeof e) {
                        let i = !1,
                            s = !1;
                        if (be(e, (e, t) => {
                                if (".value" === e) i = !0;
                                else if (".priority" !== e && ".sv" !== e && (s = !0, !Ii(e))) throw new Error(o + " contains an invalid key (" + e + ") " + pt(a) + '.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');
                                var n, r;
                                n = a, e = e, 0 < n.parts_.length && (n.byteLength_ += 1), n.parts_.push(e), n.byteLength_ += P(e), _t(n), ki(o, t, a), t = a, r = t.parts_.pop(), t.byteLength_ -= P(r), 0 < t.parts_.length && --t.byteLength_
                            }), i && s) throw new Error(o + ' contains ".value" child ' + pt(a) + " in addition to actual children.")
                    }
                },
                Ni = function(e, t, n, r) {
                    if (!(r && void 0 === n || Ti(n))) throw new Error(S(e, t) + 'was an invalid path = "' + n + '". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"')
                },
                Pi = function(e, t) {
                    var n = t.path.toString();
                    if ("string" != typeof t.repoInfo.host || 0 === t.repoInfo.host.length || !Ii(t.repoInfo.namespace) && "localhost" !== t.repoInfo.host.split(":")[0] || 0 !== n.length && !Ei(n)) throw new Error(S(e, "url") + 'must be a valid firebase URL and the path can\'t contain ".", "#", "$", "[", or "]".')
                };
            class Ri {
                constructor() {
                    this.eventLists_ = [], this.recursionDepth_ = 0
                }
            }

            function xi(e, t) {
                let n = null;
                for (let i = 0; i < t.length; i++) {
                    const s = t[i];
                    var r = s.getPath();
                    null === n || ct(r, n.path) || (e.eventLists_.push(n), n = null), null === n && (n = {
                        events: [],
                        path: r
                    }), n.events.push(s)
                }
                n && e.eventLists_.push(n)
            }

            function Di(e, t, n) {
                xi(e, n), Oi(e, e => ct(e, t))
            }

            function Ai(e, t, n) {
                xi(e, n), Oi(e, e => ut(e, t) || ut(t, e))
            }

            function Oi(e, t) {
                e.recursionDepth_++;
                let n = !0;
                for (let i = 0; i < e.eventLists_.length; i++) {
                    var r = e.eventLists_[i];
                    r && (t(r.path) ? (function(e) {
                        for (let n = 0; n < e.events.length; n++) {
                            const r = e.events[n];
                            var t;
                            null !== r && (e.events[n] = null, t = r.getEventRunner(), se && pe("event: " + r.toString()), Pe(t))
                        }
                    }(e.eventLists_[i]), e.eventLists_[i] = null) : n = !1)
                }
                n && (e.eventLists_ = []), e.recursionDepth_--
            }
            const Li = "repo_interrupt",
                Mi = 25;
            class Fi {
                constructor(e, t, n, r) {
                    this.repoInfo_ = e, this.forceRestClient_ = t, this.authTokenProvider_ = n, this.appCheckProvider_ = r, this.dataUpdateCount = 0, this.statsListener_ = null, this.eventQueue_ = new Ri, this.nextWriteId_ = 1, this.interceptServerDataCallback_ = null, this.onDisconnect_ = un(), this.transactionQueueTree_ = new oi, this.persistentConnection_ = null, this.key = this.repoInfo_.toURLString()
                }
                toString() {
                    return (this.repoInfo_.secure ? "https://" : "http://") + this.repoInfo_.host
                }
            }

            function qi(o, e, t) {
                if (o.stats_ = Be(o.repoInfo_), o.forceRestClient_ || function() {
                        const e = "object" == typeof window && window.navigator && window.navigator.userAgent || "";
                        return 0 <= e.search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)
                    }()) o.server_ = new hn(o.repoInfo_, (e, t, n, r) => {
                    Bi(o, e, t, n, r)
                }, o.authTokenProvider_, o.appCheckProvider_), setTimeout(() => ji(o, !0), 0);
                else {
                    if (null != t) {
                        if ("object" != typeof t) throw new Error("Only objects are supported for option databaseAuthVariableOverride");
                        try {
                            v(t)
                        } catch (e) {
                            throw new Error("Invalid authOverride provided: " + e)
                        }
                    }
                    o.persistentConnection_ = new gt(o.repoInfo_, e, (e, t, n, r) => {
                        Bi(o, e, t, n, r)
                    }, e => {
                        ji(o, e)
                    }, e => {
                        var n;
                        n = o, be(e, (e, t) => {
                            Vi(n, e, t)
                        })
                    }, o.authTokenProvider_, o.appCheckProvider_, t), o.server_ = o.persistentConnection_
                }
                var n;
                o.authTokenProvider_.addTokenChangeListener(e => {
                    o.server_.refreshAuthToken(e)
                }), o.appCheckProvider_.addTokenChangeListener(e => {
                    o.server_.refreshAppCheckToken(e.token)
                }), o.statsReporter_ = (e = o.repoInfo_, t = () => new fn(o.stats_, o.server_), n = e.toString(), Ue[n] || (Ue[n] = t()), Ue[n]), o.infoData_ = new cn, o.infoSyncTree_ = new Dr({
                    startListening: (e, t, n, r) => {
                        let i = [];
                        const s = o.infoData_.getNode(e._path);
                        return s.isEmpty() || (i = Mr(o.infoSyncTree_, e._path, s), setTimeout(() => {
                            r("ok")
                        }, 0)), i
                    },
                    stopListening: () => {}
                }), Vi(o, "connected", !1), o.serverSyncTree_ = new Dr({
                    startListening: (r, e, t, i) => (o.server_.listen(r, t, e, (e, t) => {
                        var n = i(e, t);
                        Ai(o.eventQueue_, r._path, n)
                    }), []),
                    stopListening: (e, t) => {
                        o.server_.unlisten(e, t)
                    }
                })
            }

            function Wi(e) {
                const t = e.infoData_.getNode(new Xe(".info/serverTimeOffset"));
                var n = t.val() || 0;
                return (new Date).getTime() + n
            }

            function Ui(e) {
                return Zr({
                    timestamp: Wi(e)
                })
            }

            function Bi(e, t, n, r, i) {
                e.dataUpdateCount++;
                var s, o, a = new Xe(t);
                n = e.interceptServerDataCallback_ ? e.interceptServerDataCallback_(t, n) : n;
                let l = [];
                l = i ? r ? (s = I(n, e => Qt(e)), function(e, t, n, r) {
                    if (a = Yr(e, r)) {
                        var i = Kr(a),
                            s = i.path,
                            o = i.queryId,
                            a = lt(s, t),
                            i = An.fromObject(n);
                        return $r(e, s, new bn(vn(o), a, i))
                    }
                    return []
                }(e.serverSyncTree_, a, s, i)) : (s = Qt(n), qr(e.serverSyncTree_, a, s, i)) : r ? (o = I(n, e => Qt(e)), t = e.serverSyncTree_, i = a, r = o, o = An.fromObject(r), jr(t, new bn(mn(), i, o))) : (o = Qt(n), Mr(e.serverSyncTree_, a, o));
                let h = a;
                0 < l.length && (h = es(e, a)), Ai(e.eventQueue_, h, l)
            }

            function ji(e, t) {
                Vi(e, "connected", t), !1 === t && function(r) {
                    Gi(r, "onDisconnectEvents");
                    const i = Ui(r),
                        s = un();
                    _n(r.onDisconnect_, Ze(), (e, t) => {
                        var n = ri(e, t, r.serverSyncTree_, i);
                        dn(s, e, n)
                    });
                    let o = [];
                    _n(s, Ze(), (e, t) => {
                        o = o.concat(Mr(r.serverSyncTree_, e, t));
                        var n = is(r, e);
                        es(r, n)
                    }), r.onDisconnect_ = un(), Ai(r.eventQueue_, Ze(), o)
                }(e)
            }

            function Vi(e, t, n) {
                var r = new Xe("/.info/" + t),
                    i = Qt(n);
                e.infoData_.updateSnapshot(r, i);
                i = Mr(e.infoSyncTree_, r, i);
                Ai(e.eventQueue_, r, i)
            }

            function zi(e) {
                return e.nextWriteId_++
            }

            function Hi(r, i, e, t, s) {
                Gi(r, "set", {
                    path: i.toString(),
                    value: e,
                    priority: t
                });
                var n = Ui(r);
                const o = Qt(e, t);
                var a = Ur(r.serverSyncTree_, i),
                    n = ii(o, a, n);
                const l = zi(r);
                n = Ar(r.serverSyncTree_, i, n, l, !0);
                xi(r.eventQueue_, n), r.server_.put(i.toString(), o.val(!0), (e, t) => {
                    var n = "ok" === e;
                    n || ge("set at " + i + " failed: " + e);
                    n = Lr(r.serverSyncTree_, l, !n);
                    Ai(r.eventQueue_, i, n), Ji(0, s, e, t)
                });
                n = is(r, i);
                es(r, n), Ai(r.eventQueue_, n, [])
            }

            function Qi(n, r, i) {
                n.server_.onDisconnectCancel(r.toString(), (e, t) => {
                    "ok" === e && ! function e(n, t) {
                        if (at(t)) return n.value = null, n.children.clear(), !0;
                        if (null !== n.value) {
                            if (n.value.isLeafNode()) return !1; {
                                const i = n.value;
                                return n.value = null, i.forEachChild(Ot, (e, t) => {
                                    dn(n, new Xe(e), t)
                                }), e(n, t)
                            }
                        }
                        if (0 < n.children.size) {
                            var r = et(t);
                            return t = nt(t), n.children.has(r) && e(n.children.get(r), t) && n.children.delete(r), 0 === n.children.size
                        }
                        return !0
                    }(n.onDisconnect_, r), Ji(0, i, e, t)
                })
            }

            function Yi(n, r, e, i) {
                const s = Qt(e);
                n.server_.onDisconnectPut(r.toString(), s.val(!0), (e, t) => {
                    "ok" === e && dn(n.onDisconnect_, r, s), Ji(0, i, e, t)
                })
            }

            function Ki(e, t, n) {
                let r;
                r = ".info" === et(t._path) ? Fr(e.infoSyncTree_, t, n) : Fr(e.serverSyncTree_, t, n), Di(e.eventQueue_, t._path, r)
            }

            function $i(e) {
                e.persistentConnection_ && e.persistentConnection_.interrupt(Li)
            }

            function Gi(e, ...t) {
                let n = "";
                e.persistentConnection_ && (n = e.persistentConnection_.id + ":"), pe(n, ...t)
            }

            function Ji(e, r, i, s) {
                r && Pe(() => {
                    if ("ok" === i) r(null);
                    else {
                        var t = (i || "error").toUpperCase();
                        let e = t;
                        s && (e += ": " + s);
                        const n = new Error(e);
                        n.code = t, r(n)
                    }
                })
            }

            function Xi(e, t, n) {
                return Ur(e.serverSyncTree_, t, n) || jt.EMPTY_NODE
            }

            function Zi(t, e = t.transactionQueueTree_) {
                if (e || rs(t, e), li(e)) {
                    const n = ns(t, e);
                    p(0 < n.length, "Sending zero length transaction queue"), n.every(e => 0 === e.status) && function(i, s, o) {
                        const e = o.map(e => e.currentWriteId),
                            t = Xi(i, s, e);
                        let n = t;
                        var r = t.hash();
                        for (let c = 0; c < o.length; c++) {
                            const u = o[c];
                            p(0 === u.status, "tryToSendTransactionQueue_: items in queue should all be run."), u.status = 1, u.retryCount++;
                            var a = lt(s, u.path);
                            n = n.updateChild(a, u.currentOutputSnapshotRaw)
                        }
                        const l = n.val(!0),
                            h = s;
                        i.server_.put(h.toString(), l, t => {
                            Gi(i, "transaction put response", {
                                path: h.toString(),
                                status: t
                            });
                            let n = [];
                            if ("ok" === t) {
                                const r = [];
                                for (let e = 0; e < o.length; e++) o[e].status = 2, n = n.concat(Lr(i.serverSyncTree_, o[e].currentWriteId)), o[e].onComplete && r.push(() => o[e].onComplete(null, !0, o[e].currentOutputSnapshotResolved)), o[e].unwatcher();
                                rs(i, ai(i.transactionQueueTree_, s)), Zi(i, i.transactionQueueTree_), Ai(i.eventQueue_, s, n);
                                for (let t = 0; t < r.length; t++) Pe(r[t])
                            } else {
                                if ("datastale" === t)
                                    for (let e = 0; e < o.length; e++) 3 === o[e].status ? o[e].status = 4 : o[e].status = 0;
                                else {
                                    ge("transaction at " + h.toString() + " failed: " + t);
                                    for (let e = 0; e < o.length; e++) o[e].status = 4, o[e].abortReason = t
                                }
                                es(i, s)
                            }
                        }, r)
                    }(t, di(e), n)
                } else ci(e) && ui(e, e => {
                    Zi(t, e)
                })
            }

            function es(e, t) {
                var n = ts(e, t),
                    r = di(n);
                return function(i, s, o) {
                    if (0 !== s.length) {
                        const h = [];
                        let n = [];
                        const t = s.filter(e => 0 === e.status),
                            c = t.map(e => e.currentWriteId);
                        for (let r = 0; r < s.length; r++) {
                            const u = s[r];
                            var a = lt(o, u.path);
                            let e = !1,
                                t;
                            if (p(null !== a, "rerunTransactionsUnderNode_: relativePath should not be null."), 4 === u.status) e = !0, t = u.abortReason, n = n.concat(Lr(i.serverSyncTree_, u.currentWriteId, !0));
                            else if (0 === u.status)
                                if (u.retryCount >= Mi) e = !0, t = "maxretry", n = n.concat(Lr(i.serverSyncTree_, u.currentWriteId, !0));
                                else {
                                    const d = Xi(i, u.path, c);
                                    u.currentInputSnapshot = d;
                                    var l = s[r].update(d.val());
                                    if (void 0 !== l) {
                                        ki("transaction failed: Data returned ", l, u.path);
                                        let e = Qt(l);
                                        "object" == typeof l && null != l && w(l, ".priority") || (e = e.updatePriority(d.getPriority()));
                                        a = u.currentWriteId, l = Ui(i), l = ii(e, d, l);
                                        u.currentOutputSnapshotRaw = e, u.currentOutputSnapshotResolved = l, u.currentWriteId = zi(i), c.splice(c.indexOf(a), 1), n = n.concat(Ar(i.serverSyncTree_, u.path, l, u.currentWriteId, u.applyLocally)), n = n.concat(Lr(i.serverSyncTree_, a, !0))
                                    } else e = !0, t = "nodata", n = n.concat(Lr(i.serverSyncTree_, u.currentWriteId, !0))
                                }
                            Ai(i.eventQueue_, o, n), n = [], e && (s[r].status = 2, function(e) {
                                setTimeout(e, Math.floor(0))
                            }(s[r].unwatcher), s[r].onComplete && ("nodata" === t ? h.push(() => s[r].onComplete(null, !1, s[r].currentInputSnapshot)) : h.push(() => s[r].onComplete(new Error(t), !1, null))))
                        }
                        rs(i, i.transactionQueueTree_);
                        for (let e = 0; e < h.length; e++) Pe(h[e]);
                        Zi(i, i.transactionQueueTree_)
                    }
                }(e, ns(e, n), r), r
            }

            function ts(e, t) {
                let n, r = e.transactionQueueTree_;
                for (n = et(t); null !== n && void 0 === li(r);) r = ai(r, n), t = nt(t), n = et(t);
                return r
            }

            function ns(e, t) {
                const n = [];
                return function t(n, e, r) {
                    const i = li(e);
                    if (i)
                        for (let e = 0; e < i.length; e++) r.push(i[e]);
                    ui(e, e => {
                        t(n, e, r)
                    })
                }(e, t, n), n.sort((e, t) => e.order - t.order), n
            }

            function rs(t, n) {
                const r = li(n);
                if (r) {
                    let e = 0;
                    for (let t = 0; t < r.length; t++) 2 !== r[t].status && (r[e] = r[t], e++);
                    r.length = e, hi(n, 0 < r.length ? r : void 0)
                }
                ui(n, e => {
                    rs(t, e)
                })
            }

            function is(t, e) {
                var n = di(ts(t, e)),
                    r = ai(t.transactionQueueTree_, e);
                return function(e, t, n) {
                        let r = n ? e : e.parent;
                        for (; null !== r;) {
                            if (t(r)) return;
                            r = r.parent
                        }
                    }(r, e => {
                        ss(t, e)
                    }), ss(t, r),
                    function t(e, n, r, i) {
                        r && !i && n(e), ui(e, e => {
                            t(e, n, !0, i)
                        }), r && i && n(e)
                    }(r, e => {
                        ss(t, e)
                    }), n
            }

            function ss(i, s) {
                const o = li(s);
                if (o) {
                    const a = [];
                    let e = [],
                        t = -1;
                    for (let n = 0; n < o.length; n++) 3 === o[n].status || (1 === o[n].status ? (p(t === n - 1, "All SENT items should be at beginning of queue."), t = n, o[n].status = 3, o[n].abortReason = "set") : (p(0 === o[n].status, "Unexpected transaction status in abort"), o[n].unwatcher(), e = e.concat(Lr(i.serverSyncTree_, o[n].currentWriteId, !0)), o[n].onComplete && a.push(o[n].onComplete.bind(null, new Error("set"), !1, null)))); - 1 === t ? hi(s, void 0) : o.length = t + 1, Ai(i.eventQueue_, di(s), e);
                    for (let r = 0; r < a.length; r++) Pe(a[r])
                }
            }
            const os = function(e, t) {
                    var n = as(e),
                        r = n.namespace;
                    "firebase.com" === n.domain && fe(n.host + " is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"), r && "undefined" !== r || "localhost" === n.domain || fe("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"), n.secure || me();
                    var i = "ws" === n.scheme || "wss" === n.scheme;
                    return {
                        repoInfo: new Me(n.host, n.secure, r, i, t, "", r !== n.subdomain),
                        path: new Xe(n.pathString)
                    }
                },
                as = function(r) {
                    let i = "",
                        s = "",
                        o = "",
                        a = "",
                        l = "",
                        h = !0,
                        c = "https",
                        u = 443;
                    if ("string" == typeof r) {
                        let e = r.indexOf("//");
                        0 <= e && (c = r.substring(0, e - 1), r = r.substring(e + 2));
                        let t = r.indexOf("/"); - 1 === t && (t = r.length);
                        let n = r.indexOf("?"); - 1 === n && (n = r.length), i = r.substring(0, Math.min(t, n)), t < n && (a = function(e) {
                            let t = "";
                            var n = e.split("/");
                            for (let r = 0; r < n.length; r++)
                                if (0 < n[r].length) {
                                    let e = n[r];
                                    try {
                                        e = decodeURIComponent(e.replace(/\+/g, " "))
                                    } catch (e) {}
                                    t += "/" + e
                                }
                            return t
                        }(r.substring(t, n)));
                        var d, _ = function(e) {
                            const t = {};
                            for (const r of (e = "?" === e.charAt(0) ? e.substring(1) : e).split("&")) {
                                var n;
                                0 !== r.length && (2 === (n = r.split("=")).length ? t[decodeURIComponent(n[0])] = decodeURIComponent(n[1]) : ge(`Invalid query segment '${r}' in query '${e}'`))
                            }
                            return t
                        }(r.substring(Math.min(r.length, n)));
                        e = i.indexOf(":"), 0 <= e ? (h = "https" === c || "wss" === c, u = parseInt(i.substring(e + 1), 10)) : e = i.length;
                        const p = i.slice(0, e);
                        "localhost" === p.toLowerCase() ? s = "localhost" : p.split(".").length <= 2 ? s = p : (d = i.indexOf("."), o = i.substring(0, d).toLowerCase(), s = i.substring(d + 1), l = o), "ns" in _ && (l = _.ns)
                    }
                    return {
                        host: i,
                        port: u,
                        domain: s,
                        subdomain: o,
                        secure: h,
                        scheme: c,
                        pathString: a,
                        namespace: l
                    }
                },
                ls = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",
                hs = function() {
                    let s = 0;
                    const o = [];
                    return function(e) {
                        var t = e === s;
                        s = e;
                        let n;
                        const r = new Array(8);
                        for (n = 7; 0 <= n; n--) r[n] = ls.charAt(e % 64), e = Math.floor(e / 64);
                        p(0 === e, "Cannot push at time == 0");
                        let i = r.join("");
                        if (t) {
                            for (n = 11; 0 <= n && 63 === o[n]; n--) o[n] = 0;
                            o[n]++
                        } else
                            for (n = 0; n < 12; n++) o[n] = Math.floor(64 * Math.random());
                        for (n = 0; n < 12; n++) i += ls.charAt(o[n]);
                        return p(20 === i.length, "nextPushId: Length should be 20."), i
                    }
                }();
            class cs {
                constructor(e, t, n, r) {
                    this.eventType = e, this.eventRegistration = t, this.snapshot = n, this.prevName = r
                }
                getPath() {
                    var e = this.snapshot.ref;
                    return ("value" === this.eventType ? e : e.parent)._path
                }
                getEventType() {
                    return this.eventType
                }
                getEventRunner() {
                    return this.eventRegistration.getEventRunner(this)
                }
                toString() {
                    return this.getPath().toString() + ":" + this.eventType + ":" + v(this.snapshot.exportVal())
                }
            }
            class us {
                constructor(e, t, n) {
                    this.eventRegistration = e, this.error = t, this.path = n
                }
                getPath() {
                    return this.path
                }
                getEventType() {
                    return "cancel"
                }
                getEventRunner() {
                    return this.eventRegistration.getEventRunner(this)
                }
                toString() {
                    return this.path.toString() + ":cancel"
                }
            }
            class ds {
                constructor(e, t) {
                    this.snapshotCallback = e, this.cancelCallback = t
                }
                onValue(e, t) {
                    this.snapshotCallback.call(null, e, t)
                }
                onCancel(e) {
                    return p(this.hasCancelCallback, "Raising a cancel event on a listener with no cancel callback"), this.cancelCallback.call(null, e)
                }
                get hasCancelCallback() {
                    return !!this.cancelCallback
                }
                matches(e) {
                    return this.snapshotCallback === e.snapshotCallback || void 0 !== this.snapshotCallback.userCallback && this.snapshotCallback.userCallback === e.snapshotCallback.userCallback && this.snapshotCallback.context === e.snapshotCallback.context
                }
            }
            class _s {
                constructor(e, t) {
                    this._repo = e, this._path = t
                }
                cancel() {
                    const e = new _;
                    return Qi(this._repo, this._path, e.wrapCallback(() => {})), e.promise
                }
                remove() {
                    yi("OnDisconnect.remove", this._path);
                    const e = new _;
                    return Yi(this._repo, this._path, null, e.wrapCallback(() => {})), e.promise
                }
                set(e) {
                    yi("OnDisconnect.set", this._path), pi("OnDisconnect.set", e, this._path, !1);
                    const t = new _;
                    return Yi(this._repo, this._path, e, t.wrapCallback(() => {})), t.promise
                }
                setWithPriority(e, t) {
                    yi("OnDisconnect.setWithPriority", this._path), pi("OnDisconnect.setWithPriority", e, this._path, !1), gi("OnDisconnect.setWithPriority", t, !1);
                    const n = new _;
                    return function(n, r, e, t, i) {
                        const s = Qt(e, t);
                        n.server_.onDisconnectPut(r.toString(), s.val(!0), (e, t) => {
                            "ok" === e && dn(n.onDisconnect_, r, s), Ji(0, i, e, t)
                        })
                    }(this._repo, this._path, e, t, n.wrapCallback(() => {})), n.promise
                }
                update(e) {
                    yi("OnDisconnect.update", this._path), fi("OnDisconnect.update", e, this._path, !1);
                    const t = new _;
                    return function(r, i, n, s) {
                        if (b(n)) return pe("onDisconnect().update() called with empty data.  Don't do anything."), Ji(0, s, "ok", void 0);
                        r.server_.onDisconnectMerge(i.toString(), n, (e, t) => {
                            "ok" === e && be(n, (e, t) => {
                                var n = Qt(t);
                                dn(r.onDisconnect_, ot(i, e), n)
                            }), Ji(0, s, e, t)
                        })
                    }(this._repo, this._path, e, t.wrapCallback(() => {})), t.promise
                }
            }
            class ps {
                constructor(e, t, n, r) {
                    this._repo = e, this._path = t, this._queryParams = n, this._orderByCalled = r
                }
                get key() {
                    return at(this._path) ? null : rt(this._path)
                }
                get ref() {
                    return new vs(this._repo, this._path)
                }
                get _queryIdentifier() {
                    var e = ln(this._queryParams),
                        e = ue(e);
                    return "{}" === e ? "default" : e
                }
                get _queryObject() {
                    return ln(this._queryParams)
                }
                isEqual(e) {
                    if (!((e = R(e)) instanceof ps)) return !1;
                    var t = this._repo === e._repo,
                        n = ct(this._path, e._path),
                        r = this._queryIdentifier === e._queryIdentifier;
                    return t && n && r
                }
                toJSON() {
                    return this.toString()
                }
                toString() {
                    return this._repo.toString() + function(e) {
                        let t = "";
                        for (let n = e.pieceNum_; n < e.pieces_.length; n++) "" !== e.pieces_[n] && (t += "/" + encodeURIComponent(String(e.pieces_[n])));
                        return t || "/"
                    }(this._path)
                }
            }

            function fs(e, t) {
                if (!0 === e._orderByCalled) throw new Error(t + ": You can't combine multiple orderBy calls.")
            }

            function gs(e) {
                let t = null,
                    n = null;
                if (e.hasStart() && (t = e.getIndexStartValue()), e.hasEnd() && (n = e.getIndexEndValue()), e.getIndex() === Ct) {
                    var r = "Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().",
                        i = "Query: When ordering by key, the argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() must be a string.";
                    if (e.hasStart()) {
                        if (e.getIndexStartName() !== ye) throw new Error(r);
                        if ("string" != typeof t) throw new Error(i)
                    }
                    if (e.hasEnd()) {
                        if (e.getIndexEndName() !== we) throw new Error(r);
                        if ("string" != typeof n) throw new Error(i)
                    }
                } else if (e.getIndex() === Ot) {
                    if (null != t && !Si(t) || null != n && !Si(n)) throw new Error("Query: When ordering by priority, the first argument passed to startAt(), startAfter() endAt(), endBefore(), or equalTo() must be a valid priority value (null, a number, or a string).")
                } else if (p(e.getIndex() instanceof Yt || e.getIndex() === Kt, "unknown index type."), null != t && "object" == typeof t || null != n && "object" == typeof n) throw new Error("Query: First argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() cannot be an object.")
            }

            function ms(e) {
                if (e.hasStart() && e.hasEnd() && e.hasLimit() && !e.hasAnchoredLimit()) throw new Error("Query: Can't combine startAt(), startAfter(), endAt(), endBefore(), and limit(). Use limitToFirst() or limitToLast() instead.")
            }
            class vs extends ps {
                constructor(e, t) {
                    super(e, t, new nn, !1)
                }
                get parent() {
                    var e = st(this._path);
                    return null === e ? null : new vs(this._repo, e)
                }
                get root() {
                    let e = this;
                    for (; null !== e.parent;) e = e.parent;
                    return e
                }
            }
            class ys {
                constructor(e, t, n) {
                    this._node = e, this.ref = t, this._index = n
                }
                get priority() {
                    return this._node.getPriority().val()
                }
                get key() {
                    return this.ref.key
                }
                get size() {
                    return this._node.numChildren()
                }
                child(e) {
                    var t = new Xe(e),
                        n = bs(this.ref, e);
                    return new ys(this._node.getChild(t), n, Ot)
                }
                exists() {
                    return !this._node.isEmpty()
                }
                exportVal() {
                    return this._node.val(!0)
                }
                forEach(n) {
                    if (this._node.isLeafNode()) return !1;
                    const e = this._node;
                    return !!e.forEachChild(this._index, (e, t) => n(new ys(t, bs(this.ref, e), Ot)))
                }
                hasChild(e) {
                    var t = new Xe(e);
                    return !this._node.getChild(t).isEmpty()
                }
                hasChildren() {
                    return !this._node.isLeafNode() && !this._node.isEmpty()
                }
                toJSON() {
                    return this.exportVal()
                }
                val() {
                    return this._node.val()
                }
            }

            function ws(e, t) {
                return (e = R(e))._checkNotDeleted("ref"), void 0 !== t ? bs(e._root, t) : e._root
            }

            function Cs(e, t) {
                (e = R(e))._checkNotDeleted("refFromURL");
                const n = os(t, e._repo.repoInfo_.nodeAdmin);
                Pi("refFromURL", n);
                var r = n.repoInfo;
                return e._repo.repoInfo_.isCustomHost() || r.host === e._repo.repoInfo_.host || fe("refFromURL: Host name does not match the current database: (found " + r.host + " but expected " + e._repo.repoInfo_.host + ")"), ws(e, n.path.toString())
            }

            function bs(e, t) {
                return (null === et((e = R(e))._path) ? vi : Ni)("child", "path", t, !1), new vs(e._repo, ot(e._path, t))
            }

            function Is(e, t) {
                e = R(e), yi("set", e._path), pi("set", t, e._path, !1);
                const n = new _;
                return Hi(e._repo, e._path, t, null, n.wrapCallback(() => {})), n.promise
            }

            function Ts(e, t) {
                fi("update", t, e._path, !1);
                const n = new _;
                return function(i, s, e, o) {
                    Gi(i, "update", {
                        path: s.toString(),
                        value: e
                    });
                    let n = !0;
                    const r = Ui(i),
                        a = {};
                    if (be(e, (e, t) => {
                            n = !1, a[e] = ri(ot(s, e), Qt(t), i.serverSyncTree_, r)
                        }), n) pe("update() called with empty data.  Don't do anything."), Ji(0, o, "ok", void 0);
                    else {
                        const l = zi(i);
                        var t = Or(i.serverSyncTree_, s, a, l);
                        xi(i.eventQueue_, t), i.server_.merge(s.toString(), e, (e, t) => {
                            var n = "ok" === e;
                            n || ge("update at " + s + " failed: " + e);
                            var r = Lr(i.serverSyncTree_, l, !n),
                                n = 0 < r.length ? es(i, s) : s;
                            Ai(i.eventQueue_, n, r), Ji(0, o, e, t)
                        }), be(e, e => {
                            var t = is(i, ot(s, e));
                            es(i, t)
                        }), Ai(i.eventQueue_, s, [])
                    }
                }(e._repo, e._path, t, n.wrapCallback(() => {})), n.promise
            }

            function Es(t) {
                t = R(t);
                var i, s, o, e = new ds(() => {}),
                    e = new Ss(e);
                return i = t._repo, s = t, o = e, (null != (e = Br(i.serverSyncTree_, s)) ? Promise.resolve(e) : i.server_.get(s).then(e => {
                    var t, n = Qt(e).withIndex(s._queryParams.getIndex());
                    Wr(i.serverSyncTree_, s, o, !0);
                    let r;
                    return r = s._queryParams.loadsAllData() ? Mr(i.serverSyncTree_, s._path, n) : (t = Hr(i.serverSyncTree_, s), qr(i.serverSyncTree_, s._path, n, t)), Ai(i.eventQueue_, s._path, r), Fr(i.serverSyncTree_, s, o, null, !0), n
                }, e => (Gi(i, "get for query " + v(s) + " failed: " + e), Promise.reject(new Error(e))))).then(e => new ys(e, new vs(t._repo, t._path), t._queryParams.getIndex()))
            }
            class Ss {
                constructor(e) {
                    this.callbackContext = e
                }
                respondsTo(e) {
                    return "value" === e
                }
                createEvent(e, t) {
                    var n = t._queryParams.getIndex();
                    return new cs("value", this, new ys(e.snapshotNode, new vs(t._repo, t._path), n))
                }
                getEventRunner(e) {
                    return "cancel" === e.getEventType() ? () => this.callbackContext.onCancel(e.error) : () => this.callbackContext.onValue(e.snapshot, null)
                }
                createCancelEvent(e, t) {
                    return this.callbackContext.hasCancelCallback ? new us(this, e, t) : null
                }
                matches(e) {
                    return e instanceof Ss && (!e.callbackContext || !this.callbackContext || e.callbackContext.matches(this.callbackContext))
                }
                hasAnyCallback() {
                    return null !== this.callbackContext
                }
            }
            class ks {
                constructor(e, t) {
                    this.eventType = e, this.callbackContext = t
                }
                respondsTo(e) {
                    let t = "children_added" === e ? "child_added" : e;
                    return t = "children_removed" === t ? "child_removed" : t, this.eventType === t
                }
                createCancelEvent(e, t) {
                    return this.callbackContext.hasCancelCallback ? new us(this, e, t) : null
                }
                createEvent(e, t) {
                    p(null != e.childName, "Child events should have a childName.");
                    var n = bs(new vs(t._repo, t._path), e.childName),
                        r = t._queryParams.getIndex();
                    return new cs(e.type, this, new ys(e.snapshotNode, n, r), e.prevName)
                }
                getEventRunner(e) {
                    return "cancel" === e.getEventType() ? () => this.callbackContext.onCancel(e.error) : () => this.callbackContext.onValue(e.snapshot, e.prevName)
                }
                matches(e) {
                    return e instanceof ks && (this.eventType === e.eventType && (!this.callbackContext || !e.callbackContext || this.callbackContext.matches(e.callbackContext)))
                }
                hasAnyCallback() {
                    return !!this.callbackContext
                }
            }

            function Ns(n, e, t, r, i) {
                let s;
                if ("object" == typeof r && (s = void 0, i = r), "function" == typeof r && (s = r), i && i.onlyOnce) {
                    const l = t;
                    var o = (e, t) => {
                        Ki(n._repo, n, a), l(e, t)
                    };
                    o.userCallback = t.userCallback, o.context = t.context, t = o
                }
                o = new ds(t, s || void 0);
                const a = "value" === e ? new Ss(o) : new ks(e, o);
                return function(e, t, n) {
                    let r;
                    r = ".info" === et(t._path) ? Wr(e.infoSyncTree_, t, n) : Wr(e.serverSyncTree_, t, n), Di(e.eventQueue_, t._path, r)
                }(n._repo, n, a), () => Ki(n._repo, n, a)
            }

            function Ps(e, t, n, r) {
                return Ns(e, "value", t, n, r)
            }

            function Rs(e, t, n, r) {
                return Ns(e, "child_added", t, n, r)
            }

            function xs(e, t, n, r) {
                return Ns(e, "child_changed", t, n, r)
            }

            function Ds(e, t, n, r) {
                return Ns(e, "child_moved", t, n, r)
            }

            function As(e, t, n, r) {
                return Ns(e, "child_removed", t, n, r)
            }

            function Os(e, t, n) {
                let r = null;
                var i = n ? new ds(n) : null;
                "value" === t ? r = new Ss(i) : t && (r = new ks(t, i)), Ki(e._repo, e, r)
            }
            class Ls {}
            class Ms extends Ls {
                constructor(e, t) {
                    super(), this._value = e, this._key = t
                }
                _apply(e) {
                    pi("endAt", this._value, e._path, !0);
                    var t = sn(e._queryParams, this._value, this._key);
                    if (ms(t), gs(t), e._queryParams.hasEnd()) throw new Error("endAt: Starting point was already set (by another call to endAt, endBefore or equalTo).");
                    return new ps(e._repo, e._path, t, e._orderByCalled)
                }
            }
            class Fs extends Ls {
                constructor(e, t) {
                    super(), this._value = e, this._key = t
                }
                _apply(e) {
                    pi("endBefore", this._value, e._path, !1);
                    var t = function(e, t, n) {
                        let r;
                        return r = e.index_ === Ct || n ? sn(e, t, n) : sn(e, t, ye), r.endBeforeSet_ = !0, r
                    }(e._queryParams, this._value, this._key);
                    if (ms(t), gs(t), e._queryParams.hasEnd()) throw new Error("endBefore: Starting point was already set (by another call to endAt, endBefore or equalTo).");
                    return new ps(e._repo, e._path, t, e._orderByCalled)
                }
            }
            class qs extends Ls {
                constructor(e, t) {
                    super(), this._value = e, this._key = t
                }
                _apply(e) {
                    pi("startAt", this._value, e._path, !0);
                    var t = rn(e._queryParams, this._value, this._key);
                    if (ms(t), gs(t), e._queryParams.hasStart()) throw new Error("startAt: Starting point was already set (by another call to startAt, startBefore or equalTo).");
                    return new ps(e._repo, e._path, t, e._orderByCalled)
                }
            }
            class Ws extends Ls {
                constructor(e, t) {
                    super(), this._value = e, this._key = t
                }
                _apply(e) {
                    pi("startAfter", this._value, e._path, !1);
                    var t = function(e, t, n) {
                        let r;
                        return r = e.index_ === Ct || n ? rn(e, t, n) : rn(e, t, we), r.startAfterSet_ = !0, r
                    }(e._queryParams, this._value, this._key);
                    if (ms(t), gs(t), e._queryParams.hasStart()) throw new Error("startAfter: Starting point was already set (by another call to startAt, startAfter, or equalTo).");
                    return new ps(e._repo, e._path, t, e._orderByCalled)
                }
            }
            class Us extends Ls {
                constructor(e) {
                    super(), this._limit = e
                }
                _apply(e) {
                    if (e._queryParams.hasLimit()) throw new Error("limitToFirst: Limit was already set (by another call to limitToFirst or limitToLast).");
                    return new ps(e._repo, e._path, function(e, t) {
                        const n = e.copy();
                        return n.limitSet_ = !0, n.limit_ = t, n.viewFrom_ = "l", n
                    }(e._queryParams, this._limit), e._orderByCalled)
                }
            }
            class Bs extends Ls {
                constructor(e) {
                    super(), this._limit = e
                }
                _apply(e) {
                    if (e._queryParams.hasLimit()) throw new Error("limitToLast: Limit was already set (by another call to limitToFirst or limitToLast).");
                    return new ps(e._repo, e._path, function(e, t) {
                        const n = e.copy();
                        return n.limitSet_ = !0, n.limit_ = t, n.viewFrom_ = "r", n
                    }(e._queryParams, this._limit), e._orderByCalled)
                }
            }
            class js extends Ls {
                constructor(e) {
                    super(), this._path = e
                }
                _apply(e) {
                    fs(e, "orderByChild");
                    var t = new Xe(this._path);
                    if (at(t)) throw new Error("orderByChild: cannot pass in empty path. Use orderByValue() instead.");
                    t = new Yt(t), t = on(e._queryParams, t);
                    return gs(t), new ps(e._repo, e._path, t, !0)
                }
            }
            class Vs extends Ls {
                _apply(e) {
                    fs(e, "orderByKey");
                    var t = on(e._queryParams, Ct);
                    return gs(t), new ps(e._repo, e._path, t, !0)
                }
            }
            class zs extends Ls {
                _apply(e) {
                    fs(e, "orderByPriority");
                    var t = on(e._queryParams, Ot);
                    return gs(t), new ps(e._repo, e._path, t, !0)
                }
            }
            class Hs extends Ls {
                _apply(e) {
                    fs(e, "orderByValue");
                    var t = on(e._queryParams, Kt);
                    return gs(t), new ps(e._repo, e._path, t, !0)
                }
            }
            class Qs extends Ls {
                constructor(e, t) {
                    super(), this._value = e, this._key = t
                }
                _apply(e) {
                    if (pi("equalTo", this._value, e._path, !1), e._queryParams.hasStart()) throw new Error("equalTo: Starting point was already set (by another call to startAt/startAfter or equalTo).");
                    if (e._queryParams.hasEnd()) throw new Error("equalTo: Ending point was already set (by another call to endAt/endBefore or equalTo).");
                    return new Ms(this._value, this._key)._apply(new qs(this._value, this._key)._apply(e))
                }
            }

            function Ys(e, ...t) {
                let n = R(e);
                for (const r of t) n = r._apply(n);
                return n
            }
            G = vs, p(!vr, "__referenceConstructor has already been defined"), vr = G, J = vs, p(!Rr, "__referenceConstructor has already been defined"), Rr = J;
            const Ks = "FIREBASE_DATABASE_EMULATOR_HOST",
                $s = {};
            let Gs = !1;

            function Js(e, t, n, r, i) {
                let s = r || e.options.databaseURL;
                void 0 === s && (e.options.projectId || fe("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."), pe("Using default host for project ", e.options.projectId), s = `${e.options.projectId}-default-rtdb.firebaseio.com`);
                let o = os(s, i),
                    a = o.repoInfo,
                    l, h = void 0;
                "undefined" != typeof process && process.env && (h = process.env[Ks]), h ? (l = !0, s = `http://${h}?ns=${a.namespace}`, o = os(s, i), a = o.repoInfo) : l = !o.repoInfo.secure;
                var c = i && l ? new De(De.OWNER) : new xe(e.name, e.options, t);
                Pi("Invalid Firebase Database URL", o), at(o.path) || fe("Database URL must point to the root of a Firebase Database (not including a child path).");
                c = function(e, t, n, r) {
                    let i = $s[t.name];
                    i || (i = {}, $s[t.name] = i);
                    var s = i[e.toURLString()];
                    s && fe("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call.");
                    return s = new Fi(e, Gs, n, r), i[e.toURLString()] = s
                }(a, e, c, new Re(e.name, n));
                return new Xs(c, e)
            }
            class Xs {
                constructor(e, t) {
                    this._repoInternal = e, this.app = t, this.type = "database", this._instanceStarted = !1
                }
                get _repo() {
                    return this._instanceStarted || (qi(this._repoInternal, this.app.options.appId, this.app.options.databaseAuthVariableOverride), this._instanceStarted = !0), this._repoInternal
                }
                get _root() {
                    return this._rootInternal || (this._rootInternal = new vs(this._repo, Ze())), this._rootInternal
                }
                _delete() {
                    return null !== this._rootInternal && (function(e, t) {
                        const n = $s[t];
                        n && n[e.key] === e || fe(`Database ${t}(${e.repoInfo_}) has already been deleted.`), $i(e), delete n[e.key]
                    }(this._repo, this.app.name), this._repoInternal = null, this._rootInternal = null), Promise.resolve()
                }
                _checkNotDeleted(e) {
                    null === this._rootInternal && fe("Cannot call " + e + " on a deleted database.")
                }
            }

            function Zs() {
                Ye.IS_TRANSPORT_INITIALIZED && ge("Transport has already been initialized. Please call this function before calling ref or setting up a listener")
            }

            function eo() {
                Zs(), Ve.forceDisallow()
            }

            function to() {
                Zs(), Qe.forceDisallow(), Ve.forceAllow()
            }

            function no(e, t, n, r = {}) {
                (e = R(e))._checkNotDeleted("useEmulator"), e._instanceStarted && fe("Cannot call useEmulator() after instance has already been initialized.");
                var i, s = e._repoInternal;
                let o = void 0;
                s.repoInfo_.nodeAdmin ? (r.mockUserToken && fe('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'), o = new De(De.OWNER)) : r.mockUserToken && (i = "string" == typeof r.mockUserToken ? r.mockUserToken : function(e, t) {
                    if (e.uid) throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');
                    var n = t || "demo-project",
                        r = e.iat || 0,
                        i = e.sub || e.user_id;
                    if (!i) throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");
                    return i = Object.assign({
                        iss: `https://securetoken.google.com/${n}`,
                        aud: n,
                        iat: r,
                        exp: r + 3600,
                        auth_time: r,
                        sub: i,
                        user_id: i,
                        firebase: {
                            sign_in_provider: "custom",
                            identities: {}
                        }
                    }, e), [a(JSON.stringify({
                        alg: "none",
                        type: "JWT"
                    })), a(JSON.stringify(i)), ""].join(".")
                }(r.mockUserToken, e.app.options.projectId), o = new De(i)), r = s, e = t, t = n, n = o, r.repoInfo_ = new Me(`${e}:${t}`, !1, r.repoInfo_.namespace, r.repoInfo_.webSocketOnly, r.repoInfo_.nodeAdmin, r.repoInfo_.persistenceKey, r.repoInfo_.includeNamespaceInQueryParams, !0), n && (r.authTokenProvider_ = n)
            }

            function ro(e) {
                (e = R(e))._checkNotDeleted("goOnline"), (e = e._repo).persistentConnection_ && e.persistentConnection_.resume(Li)
            }

            function io(e, t) {
                _e(e, t)
            }
            const so = {
                ".sv": "timestamp"
            };
            class oo {
                constructor(e, t) {
                    this.committed = e, this.snapshot = t
                }
                toJSON() {
                    return {
                        committed: this.committed,
                        snapshot: this.snapshot.toJSON()
                    }
                }
            }

            function ao(i, e, t) {
                if (i = R(i), yi("Reference.transaction", i._path), ".length" === i.key || ".keys" === i.key) throw "Reference.transaction failed: " + i.key + " is a read-only object.";
                var n = null === (r = null == t ? void 0 : t.applyLocally) || void 0 === r || r;
                const s = new _;
                var r = Ps(i, () => {});
                return function(t, n, e, r, i, s) {
                    Gi(t, "transaction on " + n);
                    const o = {
                            path: n,
                            update: e,
                            onComplete: r,
                            status: null,
                            order: re(),
                            applyLocally: s,
                            retryCount: 0,
                            unwatcher: i,
                            abortReason: null,
                            currentWriteId: null,
                            currentInputSnapshot: null,
                            currentOutputSnapshotRaw: null,
                            currentOutputSnapshotResolved: null
                        },
                        a = Xi(t, n, void 0);
                    o.currentInputSnapshot = a;
                    var l = o.update(a.val());
                    if (void 0 === l) o.unwatcher(), o.currentOutputSnapshotRaw = null, o.currentOutputSnapshotResolved = null, o.onComplete && o.onComplete(null, !1, o.currentInputSnapshot);
                    else {
                        ki("transaction failed: Data returned ", l, o.path), o.status = 0;
                        var h = ai(t.transactionQueueTree_, n);
                        const c = li(h) || [];
                        c.push(o), hi(h, c);
                        let e;
                        if ("object" == typeof l && null !== l && w(l, ".priority")) e = C(l, ".priority"), p(Si(e), "Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.");
                        else {
                            const u = Ur(t.serverSyncTree_, n) || jt.EMPTY_NODE;
                            e = u.getPriority().val()
                        }
                        h = Ui(t), l = Qt(l, e), h = ii(l, a, h);
                        o.currentOutputSnapshotRaw = l, o.currentOutputSnapshotResolved = h, o.currentWriteId = zi(t);
                        h = Ar(t.serverSyncTree_, n, h, o.currentWriteId, o.applyLocally);
                        Ai(t.eventQueue_, n, h), Zi(t, t.transactionQueueTree_)
                    }
                }(i._repo, i._path, e, (e, t, n) => {
                    var r;
                    e ? s.reject(e) : (r = new ys(n, new vs(i._repo, i._path), Ot), s.resolve(new oo(t, r)))
                }, r, n), s.promise
            }
            gt.prototype.simpleListen = function(e, t) {
                this.sendRequest("q", {
                    p: e
                }, t)
            }, gt.prototype.echo = function(e, t) {
                this.sendRequest("echo", {
                    d: e
                }, t)
            }, j(Co.SDK_VERSION), Co._registerComponent(new x("database", (e, {
                instanceIdentifier: t
            }) => {
                return Js(e.getProvider("app").getImmediate(), e.getProvider("auth-internal"), e.getProvider("app-check-internal"), t)
            }, "PUBLIC").setMultipleInstances(!0)), Co.registerVersion(U, "0.14.4", X), Co.registerVersion(U, "0.14.4", "esm2017");

            function lo(e) {
                var t = "FIREBASE WARNING: " + e;
                ho.warn(t)
            }
            const ho = new W("@firebase/database-compat");
            class co {
                constructor(e) {
                    this._delegate = e
                }
                cancel(t) {
                    E("OnDisconnect.cancel", 0, 1, arguments.length), k("OnDisconnect.cancel", "onComplete", t, !0);
                    const e = this._delegate.cancel();
                    return t && e.then(() => t(null), e => t(e)), e
                }
                remove(t) {
                    E("OnDisconnect.remove", 0, 1, arguments.length), k("OnDisconnect.remove", "onComplete", t, !0);
                    const e = this._delegate.remove();
                    return t && e.then(() => t(null), e => t(e)), e
                }
                set(e, t) {
                    E("OnDisconnect.set", 1, 2, arguments.length), k("OnDisconnect.set", "onComplete", t, !0);
                    const n = this._delegate.set(e);
                    return t && n.then(() => t(null), e => t(e)), n
                }
                setWithPriority(e, t, n) {
                    E("OnDisconnect.setWithPriority", 2, 3, arguments.length), k("OnDisconnect.setWithPriority", "onComplete", n, !0);
                    const r = this._delegate.setWithPriority(e, t);
                    return n && r.then(() => n(null), e => n(e)), r
                }
                update(t, n) {
                    if (E("OnDisconnect.update", 1, 2, arguments.length), Array.isArray(t)) {
                        const r = {};
                        for (let e = 0; e < t.length; ++e) r["" + e] = t[e];
                        t = r, lo("Passing an Array to firebase.database.onDisconnect().update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")
                    }
                    k("OnDisconnect.update", "onComplete", n, !0);
                    const e = this._delegate.update(t);
                    return n && e.then(() => n(null), e => n(e)), e
                }
            }
            class uo {
                constructor(e, t) {
                    this.committed = e, this.snapshot = t
                }
                toJSON() {
                    return E("TransactionResult.toJSON", 0, 1, arguments.length), {
                        committed: this.committed,
                        snapshot: this.snapshot.toJSON()
                    }
                }
            }
            class _o {
                constructor(e, t) {
                    this._database = e, this._delegate = t
                }
                val() {
                    return E("DataSnapshot.val", 0, 0, arguments.length), this._delegate.val()
                }
                exportVal() {
                    return E("DataSnapshot.exportVal", 0, 0, arguments.length), this._delegate.exportVal()
                }
                toJSON() {
                    return E("DataSnapshot.toJSON", 0, 1, arguments.length), this._delegate.toJSON()
                }
                exists() {
                    return E("DataSnapshot.exists", 0, 0, arguments.length), this._delegate.exists()
                }
                child(e) {
                    return E("DataSnapshot.child", 0, 1, arguments.length), e = String(e), Ni("DataSnapshot.child", "path", e, !1), new _o(this._database, this._delegate.child(e))
                }
                hasChild(e) {
                    return E("DataSnapshot.hasChild", 1, 1, arguments.length), Ni("DataSnapshot.hasChild", "path", e, !1), this._delegate.hasChild(e)
                }
                getPriority() {
                    return E("DataSnapshot.getPriority", 0, 0, arguments.length), this._delegate.priority
                }
                forEach(t) {
                    return E("DataSnapshot.forEach", 1, 1, arguments.length), k("DataSnapshot.forEach", "action", t, !1), this._delegate.forEach(e => t(new _o(this._database, e)))
                }
                hasChildren() {
                    return E("DataSnapshot.hasChildren", 0, 0, arguments.length), this._delegate.hasChildren()
                }
                get key() {
                    return this._delegate.key
                }
                numChildren() {
                    return E("DataSnapshot.numChildren", 0, 0, arguments.length), this._delegate.size
                }
                getRef() {
                    return E("DataSnapshot.ref", 0, 0, arguments.length), new fo(this._database, this._delegate.ref)
                }
                get ref() {
                    return this.getRef()
                }
            }
            class po {
                constructor(e, t) {
                    this.database = e, this._delegate = t
                }
                on(e, n, t, r) {
                    var i;
                    E("Query.on", 2, 4, arguments.length), k("Query.on", "callback", n, !1);
                    const s = po.getCancelAndContextArgs_("Query.on", t, r);
                    var o = (e, t) => {
                        n.call(s.context, new _o(this.database, e), t)
                    };
                    o.userCallback = n, o.context = s.context;
                    var a = null === (i = s.cancel) || void 0 === i ? void 0 : i.bind(s.context);
                    switch (e) {
                        case "value":
                            return Ps(this._delegate, o, a), n;
                        case "child_added":
                            return Rs(this._delegate, o, a), n;
                        case "child_removed":
                            return As(this._delegate, o, a), n;
                        case "child_changed":
                            return xs(this._delegate, o, a), n;
                        case "child_moved":
                            return Ds(this._delegate, o, a), n;
                        default:
                            throw new Error(S("Query.on", "eventType") + 'must be a valid event type = "value", "child_added", "child_removed", "child_changed", or "child_moved".')
                    }
                }
                off(e, t, n) {
                    var r;
                    E("Query.off", 0, 3, arguments.length),
                        function(e, t, n) {
                            if (!n || void 0 !== t) switch (t) {
                                case "value":
                                case "child_added":
                                case "child_removed":
                                case "child_changed":
                                case "child_moved":
                                    break;
                                default:
                                    throw new Error(S(e, "eventType") + 'must be a valid event type = "value", "child_added", "child_removed", "child_changed", or "child_moved".')
                            }
                        }("Query.off", e, !0), k("Query.off", "callback", t, !0), N("Query.off", "context", n, !0), t ? ((r = () => {}).userCallback = t, r.context = n, Os(this._delegate, e, r)) : Os(this._delegate, e)
                }
                get() {
                    return Es(this._delegate).then(e => new _o(this.database, e))
                }
                once(e, r, t, n) {
                    E("Query.once", 1, 4, arguments.length), k("Query.once", "callback", r, !0);
                    const i = po.getCancelAndContextArgs_("Query.once", t, n),
                        s = new _;
                    var o = (e, t) => {
                        var n = new _o(this.database, e);
                        r && r.call(i.context, n, t), s.resolve(n)
                    };
                    o.userCallback = r, o.context = i.context;
                    var a = e => {
                        i.cancel && i.cancel.call(i.context, e), s.reject(e)
                    };
                    switch (e) {
                        case "value":
                            Ps(this._delegate, o, a, {
                                onlyOnce: !0
                            });
                            break;
                        case "child_added":
                            Rs(this._delegate, o, a, {
                                onlyOnce: !0
                            });
                            break;
                        case "child_removed":
                            As(this._delegate, o, a, {
                                onlyOnce: !0
                            });
                            break;
                        case "child_changed":
                            xs(this._delegate, o, a, {
                                onlyOnce: !0
                            });
                            break;
                        case "child_moved":
                            Ds(this._delegate, o, a, {
                                onlyOnce: !0
                            });
                            break;
                        default:
                            throw new Error(S("Query.once", "eventType") + 'must be a valid event type = "value", "child_added", "child_removed", "child_changed", or "child_moved".')
                    }
                    return s.promise
                }
                limitToFirst(e) {
                    return E("Query.limitToFirst", 1, 1, arguments.length), new po(this.database, Ys(this._delegate, function(e) {
                        if ("number" != typeof e || Math.floor(e) !== e || e <= 0) throw new Error("limitToFirst: First argument must be a positive integer.");
                        return new Us(e)
                    }(e)))
                }
                limitToLast(e) {
                    return E("Query.limitToLast", 1, 1, arguments.length), new po(this.database, Ys(this._delegate, function(e) {
                        if ("number" != typeof e || Math.floor(e) !== e || e <= 0) throw new Error("limitToLast: First argument must be a positive integer.");
                        return new Bs(e)
                    }(e)))
                }
                orderByChild(e) {
                    return E("Query.orderByChild", 1, 1, arguments.length), new po(this.database, Ys(this._delegate, function(e) {
                        if ("$key" === e) throw new Error('orderByChild: "$key" is invalid.  Use orderByKey() instead.');
                        if ("$priority" === e) throw new Error('orderByChild: "$priority" is invalid.  Use orderByPriority() instead.');
                        if ("$value" === e) throw new Error('orderByChild: "$value" is invalid.  Use orderByValue() instead.');
                        return Ni("orderByChild", "path", e, !1), new js(e)
                    }(e)))
                }
                orderByKey() {
                    return E("Query.orderByKey", 0, 0, arguments.length), new po(this.database, Ys(this._delegate, new Vs))
                }
                orderByPriority() {
                    return E("Query.orderByPriority", 0, 0, arguments.length), new po(this.database, Ys(this._delegate, new zs))
                }
                orderByValue() {
                    return E("Query.orderByValue", 0, 0, arguments.length), new po(this.database, Ys(this._delegate, new Hs))
                }
                startAt(e = null, t) {
                    return E("Query.startAt", 0, 2, arguments.length), new po(this.database, Ys(this._delegate, ([e = null, t] = [e, t], mi("startAt", "key", t, !0), new qs(e, t))))
                }
                startAfter(e = null, t) {
                    return E("Query.startAfter", 0, 2, arguments.length), new po(this.database, Ys(this._delegate, (e = e, t = t, mi("startAfter", "key", t, !0), new Ws(e, t))))
                }
                endAt(e = null, t) {
                    return E("Query.endAt", 0, 2, arguments.length), new po(this.database, Ys(this._delegate, (e = e, t = t, mi("endAt", "key", t, !0), new Ms(e, t))))
                }
                endBefore(e = null, t) {
                    return E("Query.endBefore", 0, 2, arguments.length), new po(this.database, Ys(this._delegate, (e = e, t = t, mi("endBefore", "key", t, !0), new Fs(e, t))))
                }
                equalTo(e, t) {
                    return E("Query.equalTo", 1, 2, arguments.length), new po(this.database, Ys(this._delegate, (e = e, t = t, mi("equalTo", "key", t, !0), new Qs(e, t))))
                }
                toString() {
                    return E("Query.toString", 0, 0, arguments.length), this._delegate.toString()
                }
                toJSON() {
                    return E("Query.toJSON", 0, 1, arguments.length), this._delegate.toJSON()
                }
                isEqual(e) {
                    if (E("Query.isEqual", 1, 1, arguments.length), e instanceof po) return this._delegate.isEqual(e._delegate);
                    throw new Error("Query.isEqual failed: First argument must be an instance of firebase.database.Query.")
                }
                static getCancelAndContextArgs_(e, t, n) {
                    const r = {
                        cancel: void 0,
                        context: void 0
                    };
                    if (t && n) r.cancel = t, k(e, "cancel", r.cancel, !0), r.context = n, N(e, "context", r.context, !0);
                    else if (t)
                        if ("object" == typeof t && null !== t) r.context = t;
                        else {
                            if ("function" != typeof t) throw new Error(S(e, "cancelOrContext") + " must either be a cancel callback or a context object.");
                            r.cancel = t
                        }
                    return r
                }
                get ref() {
                    return new fo(this.database, new vs(this._delegate._repo, this._delegate._path))
                }
            }
            class fo extends po {
                constructor(e, t) {
                    super(e, new ps(t._repo, t._path, new nn, !1)), this.database = e, this._delegate = t
                }
                getKey() {
                    return E("Reference.key", 0, 0, arguments.length), this._delegate.key
                }
                child(e) {
                    return E("Reference.child", 1, 1, arguments.length), "number" == typeof e && (e = String(e)), new fo(this.database, bs(this._delegate, e))
                }
                getParent() {
                    E("Reference.parent", 0, 0, arguments.length);
                    var e = this._delegate.parent;
                    return e ? new fo(this.database, e) : null
                }
                getRoot() {
                    return E("Reference.root", 0, 0, arguments.length), new fo(this.database, this._delegate.root)
                }
                set(e, t) {
                    E("Reference.set", 1, 2, arguments.length), k("Reference.set", "onComplete", t, !0);
                    const n = Is(this._delegate, e);
                    return t && n.then(() => t(null), e => t(e)), n
                }
                update(t, n) {
                    if (E("Reference.update", 1, 2, arguments.length), Array.isArray(t)) {
                        const r = {};
                        for (let e = 0; e < t.length; ++e) r["" + e] = t[e];
                        t = r, lo("Passing an Array to Firebase.update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")
                    }
                    yi("Reference.update", this._delegate._path), k("Reference.update", "onComplete", n, !0);
                    const e = Ts(this._delegate, t);
                    return n && e.then(() => n(null), e => n(e)), e
                }
                setWithPriority(e, t, n) {
                    E("Reference.setWithPriority", 2, 3, arguments.length), k("Reference.setWithPriority", "onComplete", n, !0);
                    const r = function(e, t, n) {
                        if (yi("setWithPriority", e._path), pi("setWithPriority", t, e._path, !1), gi("setWithPriority", n, !1), ".length" === e.key || ".keys" === e.key) throw "setWithPriority failed: " + e.key + " is a read-only object.";
                        const r = new _;
                        return Hi(e._repo, e._path, t, n, r.wrapCallback(() => {})), r.promise
                    }(this._delegate, e, t);
                    return n && r.then(() => n(null), e => n(e)), r
                }
                remove(t) {
                    E("Reference.remove", 0, 1, arguments.length), k("Reference.remove", "onComplete", t, !0);
                    const e = (n = this._delegate, yi("remove", n._path), Is(n, null));
                    var n;
                    return t && e.then(() => t(null), e => t(e)), e
                }
                transaction(e, t, n) {
                    E("Reference.transaction", 1, 3, arguments.length), k("Reference.transaction", "transactionUpdate", e, !1), k("Reference.transaction", "onComplete", t, !0),
                        function(e, t, n, r) {
                            if ((!r || void 0 !== n) && "boolean" != typeof n) throw new Error(S(e, t) + "must be a boolean.")
                        }("Reference.transaction", "applyLocally", n, !0);
                    const r = ao(this._delegate, e, {
                        applyLocally: n
                    }).then(e => new uo(e.committed, new _o(this.database, e.snapshot)));
                    return t && r.then(e => t(null, e.committed, e.snapshot), e => t(e, !1, null)), r
                }
                setPriority(e, t) {
                    E("Reference.setPriority", 1, 2, arguments.length), k("Reference.setPriority", "onComplete", t, !0);
                    const n = function(e, t) {
                        e = R(e), yi("setPriority", e._path), gi("setPriority", t, !1);
                        const n = new _;
                        return Hi(e._repo, ot(e._path, ".priority"), t, null, n.wrapCallback(() => {})), n.promise
                    }(this._delegate, e);
                    return t && n.then(() => t(null), e => t(e)), n
                }
                push(e, t) {
                    E("Reference.push", 0, 2, arguments.length), k("Reference.push", "onComplete", t, !0);
                    const n = function(e, t) {
                            e = R(e), yi("push", e._path), pi("push", t, e._path, !0);
                            var n = Wi(e._repo),
                                n = hs(n);
                            const r = bs(e, n),
                                i = bs(e, n);
                            let s;
                            return s = null != t ? Is(i, t).then(() => i) : Promise.resolve(i), r.then = s.then.bind(s), r.catch = s.then.bind(s, void 0), r
                        }(this._delegate, e),
                        r = n.then(e => new fo(this.database, e));
                    t && r.then(() => t(null), e => t(e));
                    const i = new fo(this.database, n);
                    return i.then = r.then.bind(r), i.catch = r.catch.bind(r, void 0), i
                }
                onDisconnect() {
                    return yi("Reference.onDisconnect", this._delegate._path), new co(new _s(this._delegate._repo, this._delegate._path))
                }
                get key() {
                    return this.getKey()
                }
                get parent() {
                    return this.getParent()
                }
                get root() {
                    return this.getRoot()
                }
            }
            class go {
                constructor(e, t) {
                    this._delegate = e, this.app = t, this.INTERNAL = {
                        delete: () => this._delegate._delete(),
                        forceWebSockets: eo,
                        forceLongPolling: to
                    }
                }
                useEmulator(e, t, n = {}) {
                    no(this._delegate, e, t, n)
                }
                ref(e) {
                    if (E("database.ref", 0, 1, arguments.length), e instanceof fo) {
                        var t = Cs(this._delegate, e.toString());
                        return new fo(this, t)
                    }
                    t = ws(this._delegate, e);
                    return new fo(this, t)
                }
                refFromURL(e) {
                    E("database.refFromURL", 1, 1, arguments.length);
                    var t = Cs(this._delegate, e);
                    return new fo(this, t)
                }
                goOffline() {
                    var e;
                    E("database.goOffline", 0, 0, arguments.length), (e = R(e = this._delegate))._checkNotDeleted("goOffline"), $i(e._repo)
                }
                goOnline() {
                    return E("database.goOnline", 0, 0, arguments.length), ro(this._delegate)
                }
            }
            go.ServerValue = {
                TIMESTAMP: so,
                increment: e => ({
                    ".sv": {
                        increment: e
                    }
                })
            };
            var mo, vo = Object.freeze({
                __proto__: null,
                initStandalone: function({
                    app: e,
                    url: t,
                    version: n,
                    customAuthImpl: r,
                    namespace: i,
                    nodeAdmin: s = !1
                }) {
                    j(n);
                    const o = new A("auth-internal", new O("database-standalone"));
                    return o.setComponent(new x("auth-internal", () => r, "PRIVATE")), {
                        instance: new go(Js(e, o, void 0, t, s), e),
                        namespace: i
                    }
                }
            });
            const yo = go.ServerValue;
            (mo = t.default).INTERNAL.registerComponent(new x("database-compat", (e, {
                instanceIdentifier: t
            }) => {
                var n = e.getProvider("app-compat").getImmediate(),
                    r = e.getProvider("database").getImmediate({
                        identifier: t
                    });
                return new go(r, n)
            }, "PUBLIC").setServiceProps({
                Reference: fo,
                Query: po,
                Database: go,
                DataSnapshot: _o,
                enableLogging: io,
                INTERNAL: vo,
                ServerValue: yo
            }).setMultipleInstances(!0)), mo.registerVersion("@firebase/database-compat", "0.3.4")
        }).apply(this, arguments)
    } catch (e) {
        throw console.error(e), new Error("Cannot instantiate firebase-database-compat.js - be sure to load firebase-app.js first.")
    }
});
//# sourceMappingURL=firebase-database-compat.js.map