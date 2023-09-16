! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(require("@firebase/app-compat"), require("@firebase/app")) : "function" == typeof define && define.amd ? define(["@firebase/app-compat", "@firebase/app"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).firebase, e.firebase.INTERNAL.modularAPIs)
}(this, function(bi, ki) {
    "use strict";
    try {
        !(function() {
            function e(e) {
                return e && "object" == typeof e && "default" in e ? e : {
                    default: e
                }
            }
            var i = e(bi);
            const t = {
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
                    for (let u = 0; u < n.length; u += 3) {
                        var s = n[u],
                            a = u + 1 < n.length,
                            o = a ? n[u + 1] : 0,
                            c = u + 2 < n.length,
                            l = c ? n[u + 2] : 0;
                        let e = (15 & o) << 2 | l >> 6,
                            t = 63 & l;
                        c || (t = 64, a || (e = 64)), i.push(r[s >> 2], r[(3 & s) << 4 | o >> 4], r[e], r[t])
                    }
                    return i.join("")
                },
                encodeString(e, t) {
                    return this.HAS_NATIVE_SUPPORT && !t ? btoa(e) : this.encodeByteArray(function(t) {
                        const n = [];
                        let r = 0;
                        for (let i = 0; i < t.length; i++) {
                            let e = t.charCodeAt(i);
                            e < 128 ? n[r++] = e : (e < 2048 ? n[r++] = e >> 6 | 192 : (55296 == (64512 & e) && i + 1 < t.length && 56320 == (64512 & t.charCodeAt(i + 1)) ? (e = 65536 + ((1023 & e) << 10) + (1023 & t.charCodeAt(++i)), n[r++] = e >> 18 | 240, n[r++] = e >> 12 & 63 | 128) : n[r++] = e >> 12 | 224, n[r++] = e >> 6 & 63 | 128), n[r++] = 63 & e | 128)
                        }
                        return n
                    }(e), t)
                },
                decodeString(e, t) {
                    return this.HAS_NATIVE_SUPPORT && !t ? atob(e) : function(e) {
                        const t = [];
                        let n = 0,
                            r = 0;
                        for (; n < e.length;) {
                            var i, s, a = e[n++];
                            a < 128 ? t[r++] = String.fromCharCode(a) : 191 < a && a < 224 ? (i = e[n++], t[r++] = String.fromCharCode((31 & a) << 6 | 63 & i)) : 239 < a && a < 365 ? (s = ((7 & a) << 18 | (63 & e[n++]) << 12 | (63 & e[n++]) << 6 | 63 & e[n++]) - 65536, t[r++] = String.fromCharCode(55296 + (s >> 10)), t[r++] = String.fromCharCode(56320 + (1023 & s))) : (i = e[n++], s = e[n++], t[r++] = String.fromCharCode((15 & a) << 12 | (63 & i) << 6 | 63 & s))
                        }
                        return t.join("")
                    }(this.decodeStringToByteArray(e, t))
                },
                decodeStringToByteArray(e, t) {
                    this.init_();
                    var n = t ? this.charToByteMapWebSafe_ : this.charToByteMap_;
                    const r = [];
                    for (let c = 0; c < e.length;) {
                        var i = n[e.charAt(c++)],
                            s = c < e.length ? n[e.charAt(c)] : 0;
                        ++c;
                        var a = c < e.length ? n[e.charAt(c)] : 64;
                        ++c;
                        var o = c < e.length ? n[e.charAt(c)] : 64;
                        if (++c, null == i || null == s || null == a || null == o) throw new l;
                        r.push(i << 2 | s >> 4), 64 !== a && (r.push(s << 4 & 240 | a >> 2), 64 !== o && r.push(a << 6 & 192 | o))
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
            class l extends Error {
                constructor() {
                    super(...arguments), this.name = "DecodeBase64StringError"
                }
            }
            const s = function(e) {
                try {
                    return t.decodeString(e, !0)
                } catch (e) {
                    console.error("base64Decode failed: ", e)
                }
                return null
            };
            const n = () => function() {
                    if ("undefined" != typeof self) return self;
                    if ("undefined" != typeof window) return window;
                    if ("undefined" != typeof global) return global;
                    throw new Error("Unable to locate global object.")
                }().__FIREBASE_DEFAULTS__,
                r = () => {
                    if ("undefined" != typeof process && void 0 !== process.env) {
                        var e = process.env.__FIREBASE_DEFAULTS__;
                        return e ? JSON.parse(e) : void 0
                    }
                },
                a = () => {
                    if ("undefined" != typeof document) {
                        let e;
                        try {
                            e = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)
                        } catch (e) {
                            return
                        }
                        var t = e && s(e[1]);
                        return t && JSON.parse(t)
                    }
                },
                o = () => {
                    try {
                        return n() || r() || a()
                    } catch (e) {
                        return void console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`)
                    }
                };
            var c, u;

            function d() {
                return "undefined" != typeof navigator && "string" == typeof navigator.userAgent ? navigator.userAgent : ""
            }

            function h() {
                var e = null === (e = o()) || void 0 === e ? void 0 : e.forceEnvironment;
                if ("node" === e) return !0;
                if ("browser" === e) return !1;
                try {
                    return "[object process]" === Object.prototype.toString.call(global.process)
                } catch (e) {
                    return !1
                }
            }

            function p() {
                var e = "object" == typeof chrome ? chrome.runtime : "object" == typeof browser ? browser.runtime : void 0;
                return "object" == typeof e && void 0 !== e.id
            }

            function f() {
                return "object" == typeof navigator && "ReactNative" === navigator.product
            }

            function v() {
                const e = d();
                return 0 <= e.indexOf("MSIE ") || 0 <= e.indexOf("Trident/")
            }

            function g() {
                try {
                    return "object" == typeof indexedDB
                } catch (e) {
                    return !1
                }
            }
            class m extends Error {
                constructor(e, t, n) {
                    super(t), this.code = e, this.customData = n, this.name = "FirebaseError", Object.setPrototypeOf(this, m.prototype), Error.captureStackTrace && Error.captureStackTrace(this, _.prototype.create)
                }
            }
            class _ {
                constructor(e, t, n) {
                    this.service = e, this.serviceName = t, this.errors = n
                }
                create(e, ...t) {
                    var r, n = t[0] || {},
                        i = `${this.service}/${e}`,
                        s = this.errors[e],
                        s = s ? (r = n, s.replace(y, (e, t) => {
                            var n = r[t];
                            return null != n ? String(n) : `<${t}?>`
                        })) : "Error",
                        s = `${this.serviceName}: ${s} (${i}).`;
                    return new m(i, s, n)
                }
            }
            const y = /\{\$([^}]+)}/g;

            function I(e) {
                const t = [];
                for (const [n, r] of Object.entries(e)) Array.isArray(r) ? r.forEach(e => {
                    t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e))
                }) : t.push(encodeURIComponent(n) + "=" + encodeURIComponent(r));
                return t.length ? "&" + t.join("&") : ""
            }

            function w(e) {
                const r = {},
                    t = e.replace(/^\?/, "").split("&");
                return t.forEach(e => {
                    var t, n;
                    e && ([t, n] = e.split("="), r[decodeURIComponent(t)] = decodeURIComponent(n))
                }), r
            }

            function T(e) {
                var t = e.indexOf("?");
                if (!t) return "";
                var n = e.indexOf("#", t);
                return e.substring(t, 0 < n ? n : void 0)
            }
            class b {
                constructor(e, t) {
                    this.observers = [], this.unsubscribes = [], this.observerCount = 0, this.task = Promise.resolve(), this.finalized = !1, this.onNoObservers = t, this.task.then(() => {
                        e(this)
                    }).catch(e => {
                        this.error(e)
                    })
                }
                next(t) {
                    this.forEachObserver(e => {
                        e.next(t)
                    })
                }
                error(t) {
                    this.forEachObserver(e => {
                        e.error(t)
                    }), this.close(t)
                }
                complete() {
                    this.forEachObserver(e => {
                        e.complete()
                    }), this.close()
                }
                subscribe(e, t, n) {
                    let r;
                    if (void 0 === e && void 0 === t && void 0 === n) throw new Error("Missing Observer.");
                    r = function(e, t) {
                        if ("object" != typeof e || null === e) return !1;
                        for (const n of t)
                            if (n in e && "function" == typeof e[n]) return !0;
                        return !1
                    }(e, ["next", "error", "complete"]) ? e : {
                        next: e,
                        error: t,
                        complete: n
                    }, void 0 === r.next && (r.next = k), void 0 === r.error && (r.error = k), void 0 === r.complete && (r.complete = k);
                    var i = this.unsubscribeOne.bind(this, this.observers.length);
                    return this.finalized && this.task.then(() => {
                        try {
                            this.finalError ? r.error(this.finalError) : r.complete()
                        } catch (e) {}
                    }), this.observers.push(r), i
                }
                unsubscribeOne(e) {
                    void 0 !== this.observers && void 0 !== this.observers[e] && (delete this.observers[e], --this.observerCount, 0 === this.observerCount && void 0 !== this.onNoObservers && this.onNoObservers(this))
                }
                forEachObserver(t) {
                    if (!this.finalized)
                        for (let e = 0; e < this.observers.length; e++) this.sendOne(e, t)
                }
                sendOne(e, t) {
                    this.task.then(() => {
                        if (void 0 !== this.observers && void 0 !== this.observers[e]) try {
                            t(this.observers[e])
                        } catch (e) {
                            "undefined" != typeof console && console.error && console.error(e)
                        }
                    })
                }
                close(e) {
                    this.finalized || (this.finalized = !0, void 0 !== e && (this.finalError = e), this.task.then(() => {
                        this.observers = void 0, this.onNoObservers = void 0
                    }))
                }
            }

            function k() {}

            function E(e) {
                return e && e._delegate ? e._delegate : e
            }

            function R(e, t) {
                var n = {};
                for (i in e) Object.prototype.hasOwnProperty.call(e, i) && t.indexOf(i) < 0 && (n[i] = e[i]);
                if (null != e && "function" == typeof Object.getOwnPropertySymbols)
                    for (var r = 0, i = Object.getOwnPropertySymbols(e); r < i.length; r++) t.indexOf(i[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, i[r]) && (n[i[r]] = e[i[r]]);
                return n
            }(u = c = c || {})[u.DEBUG = 0] = "DEBUG", u[u.VERBOSE = 1] = "VERBOSE", u[u.INFO = 2] = "INFO", u[u.WARN = 3] = "WARN", u[u.ERROR = 4] = "ERROR", u[u.SILENT = 5] = "SILENT";
            const A = {
                    debug: c.DEBUG,
                    verbose: c.VERBOSE,
                    info: c.INFO,
                    warn: c.WARN,
                    error: c.ERROR,
                    silent: c.SILENT
                },
                S = c.INFO,
                C = {
                    [c.DEBUG]: "log",
                    [c.VERBOSE]: "log",
                    [c.INFO]: "info",
                    [c.WARN]: "warn",
                    [c.ERROR]: "error"
                },
                P = (e, t, ...n) => {
                    if (!(t < e.logLevel)) {
                        var r = (new Date).toISOString(),
                            i = C[t];
                        if (!i) throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);
                        console[i](`[${r}]  ${e.name}:`, ...n)
                    }
                };
            class N {
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
            const O = {
                    FACEBOOK: "facebook.com",
                    GITHUB: "github.com",
                    GOOGLE: "google.com",
                    PASSWORD: "password",
                    PHONE: "phone",
                    TWITTER: "twitter.com"
                },
                L = {
                    EMAIL_SIGNIN: "EMAIL_SIGNIN",
                    PASSWORD_RESET: "PASSWORD_RESET",
                    RECOVER_EMAIL: "RECOVER_EMAIL",
                    REVERT_SECOND_FACTOR_ADDITION: "REVERT_SECOND_FACTOR_ADDITION",
                    VERIFY_AND_CHANGE_EMAIL: "VERIFY_AND_CHANGE_EMAIL",
                    VERIFY_EMAIL: "VERIFY_EMAIL"
                };

            function D() {
                return {
                    "dependent-sdk-initialized-before-auth": "Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."
                }
            }

            function M() {
                return {
                    "admin-restricted-operation": "This operation is restricted to administrators only.",
                    "argument-error": "",
                    "app-not-authorized": "This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.",
                    "app-not-installed": "The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.",
                    "captcha-check-failed": "The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.",
                    "code-expired": "The SMS code has expired. Please re-send the verification code to try again.",
                    "cordova-not-ready": "Cordova framework is not ready.",
                    "cors-unsupported": "This browser is not supported.",
                    "credential-already-in-use": "This credential is already associated with a different user account.",
                    "custom-token-mismatch": "The custom token corresponds to a different audience.",
                    "requires-recent-login": "This operation is sensitive and requires recent authentication. Log in again before retrying this request.",
                    "dependent-sdk-initialized-before-auth": "Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.",
                    "dynamic-link-not-activated": "Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.",
                    "email-change-needs-verification": "Multi-factor users must always have a verified email.",
                    "email-already-in-use": "The email address is already in use by another account.",
                    "emulator-config-failed": 'Auth instance has already been used to make a network call. Auth can no longer be configured to use the emulator. Try calling "connectAuthEmulator()" sooner.',
                    "expired-action-code": "The action code has expired.",
                    "cancelled-popup-request": "This operation has been cancelled due to another conflicting popup being opened.",
                    "internal-error": "An internal AuthError has occurred.",
                    "invalid-app-credential": "The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.",
                    "invalid-app-id": "The mobile app identifier is not registed for the current project.",
                    "invalid-user-token": "This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.",
                    "invalid-auth-event": "An internal AuthError has occurred.",
                    "invalid-verification-code": "The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure to use the verification code provided by the user.",
                    "invalid-continue-uri": "The continue URL provided in the request is invalid.",
                    "invalid-cordova-configuration": "The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.",
                    "invalid-custom-token": "The custom token format is incorrect. Please check the documentation.",
                    "invalid-dynamic-link-domain": "The provided dynamic link domain is not configured or authorized for the current project.",
                    "invalid-email": "The email address is badly formatted.",
                    "invalid-emulator-scheme": "Emulator URL must start with a valid scheme (http:// or https://).",
                    "invalid-api-key": "Your API key is invalid, please check you have copied it correctly.",
                    "invalid-cert-hash": "The SHA-1 certificate hash provided is invalid.",
                    "invalid-credential": "The supplied auth credential is malformed or has expired.",
                    "invalid-message-payload": "The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.",
                    "invalid-multi-factor-session": "The request does not contain a valid proof of first factor successful sign-in.",
                    "invalid-oauth-provider": "EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.",
                    "invalid-oauth-client-id": "The OAuth client ID provided is either invalid or does not match the specified API key.",
                    "unauthorized-domain": "This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.",
                    "invalid-action-code": "The action code is invalid. This can happen if the code is malformed, expired, or has already been used.",
                    "wrong-password": "The password is invalid or the user does not have a password.",
                    "invalid-persistence-type": "The specified persistence type is invalid. It can only be local, session or none.",
                    "invalid-phone-number": "The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].",
                    "invalid-provider-id": "The specified provider ID is invalid.",
                    "invalid-recipient-email": "The email corresponding to this action failed to send as the provided recipient email address is invalid.",
                    "invalid-sender": "The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.",
                    "invalid-verification-id": "The verification ID used to create the phone auth credential is invalid.",
                    "invalid-tenant-id": "The Auth instance's tenant ID is invalid.",
                    "login-blocked": "Login blocked by user-provided method: {$originalMessage}",
                    "missing-android-pkg-name": "An Android Package Name must be provided if the Android App is required to be installed.",
                    "auth-domain-config-required": "Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.",
                    "missing-app-credential": "The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.",
                    "missing-verification-code": "The phone auth credential was created with an empty SMS verification code.",
                    "missing-continue-uri": "A continue URL must be provided in the request.",
                    "missing-iframe-start": "An internal AuthError has occurred.",
                    "missing-ios-bundle-id": "An iOS Bundle ID must be provided if an App Store ID is provided.",
                    "missing-or-invalid-nonce": "The request does not contain a valid nonce. This can occur if the SHA-256 hash of the provided raw nonce does not match the hashed nonce in the ID token payload.",
                    "missing-password": "A non-empty password must be provided",
                    "missing-multi-factor-info": "No second factor identifier is provided.",
                    "missing-multi-factor-session": "The request is missing proof of first factor successful sign-in.",
                    "missing-phone-number": "To send verification codes, provide a phone number for the recipient.",
                    "missing-verification-id": "The phone auth credential was created with an empty verification ID.",
                    "app-deleted": "This instance of FirebaseApp has been deleted.",
                    "multi-factor-info-not-found": "The user does not have a second factor matching the identifier provided.",
                    "multi-factor-auth-required": "Proof of ownership of a second factor is required to complete sign-in.",
                    "account-exists-with-different-credential": "An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.",
                    "network-request-failed": "A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred.",
                    "no-auth-event": "An internal AuthError has occurred.",
                    "no-such-provider": "User was not linked to an account with the given provider.",
                    "null-user": "A null user object was provided as the argument for an operation which requires a non-null user object.",
                    "operation-not-allowed": "The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.",
                    "operation-not-supported-in-this-environment": 'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',
                    "popup-blocked": "Unable to establish a connection with the popup. It may have been blocked by the browser.",
                    "popup-closed-by-user": "The popup has been closed by the user before finalizing the operation.",
                    "provider-already-linked": "User can only be linked to one identity for the given provider.",
                    "quota-exceeded": "The project's quota for this operation has been exceeded.",
                    "redirect-cancelled-by-user": "The redirect operation has been cancelled by the user before finalizing.",
                    "redirect-operation-pending": "A redirect sign-in operation is already pending.",
                    "rejected-credential": "The request contains malformed or mismatching credentials.",
                    "second-factor-already-in-use": "The second factor is already enrolled on this account.",
                    "maximum-second-factor-count-exceeded": "The maximum allowed number of second factors on a user has been exceeded.",
                    "tenant-id-mismatch": "The provided tenant ID does not match the Auth instance's tenant ID",
                    timeout: "The operation has timed out.",
                    "user-token-expired": "The user's credential is no longer valid. The user must sign in again.",
                    "too-many-requests": "We have blocked all requests from this device due to unusual activity. Try again later.",
                    "unauthorized-continue-uri": "The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.",
                    "unsupported-first-factor": "Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.",
                    "unsupported-persistence-type": "The current environment does not support the specified persistence type.",
                    "unsupported-tenant-operation": "This operation is not supported in a multi-tenant context.",
                    "unverified-email": "The operation requires a verified email.",
                    "user-cancelled": "The user did not grant your application the permissions it requested.",
                    "user-not-found": "There is no user record corresponding to this identifier. The user may have been deleted.",
                    "user-disabled": "The user account has been disabled by an administrator.",
                    "user-mismatch": "The supplied credentials do not correspond to the previously signed in user.",
                    "user-signed-out": "",
                    "weak-password": "The password must be 6 characters long or more.",
                    "web-storage-unsupported": "This browser is not supported or 3rd party cookies and data may be disabled.",
                    "already-initialized": "initializeAuth() has already been called with different options. To avoid this error, call initializeAuth() with the same options as when it was originally called, or call getAuth() to return the already initialized instance.",
                    "missing-recaptcha-token": "The reCAPTCHA token is missing when sending request to the backend.",
                    "invalid-recaptcha-token": "The reCAPTCHA token is invalid when sending request to the backend.",
                    "invalid-recaptcha-action": "The reCAPTCHA action is invalid when sending request to the backend.",
                    "recaptcha-not-enabled": "reCAPTCHA Enterprise integration is not enabled for this project.",
                    "missing-client-type": "The reCAPTCHA client type is missing when sending request to the backend.",
                    "missing-recaptcha-version": "The reCAPTCHA version is missing when sending request to the backend.",
                    "invalid-req-type": "Invalid request parameters.",
                    "invalid-recaptcha-version": "The reCAPTCHA version is invalid when sending request to the backend."
                }
            }
            const U = D,
                F = new _("auth", "Firebase", D()),
                V = new class {
                    constructor(e) {
                        this.name = e, this._logLevel = S, this._logHandler = P, this._userLogHandler = null
                    }
                    get logLevel() {
                        return this._logLevel
                    }
                    set logLevel(e) {
                        if (!(e in c)) throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);
                        this._logLevel = e
                    }
                    setLogLevel(e) {
                        this._logLevel = "string" == typeof e ? A[e] : e
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
                        this._userLogHandler && this._userLogHandler(this, c.DEBUG, ...e), this._logHandler(this, c.DEBUG, ...e)
                    }
                    log(...e) {
                        this._userLogHandler && this._userLogHandler(this, c.VERBOSE, ...e), this._logHandler(this, c.VERBOSE, ...e)
                    }
                    info(...e) {
                        this._userLogHandler && this._userLogHandler(this, c.INFO, ...e), this._logHandler(this, c.INFO, ...e)
                    }
                    warn(...e) {
                        this._userLogHandler && this._userLogHandler(this, c.WARN, ...e), this._logHandler(this, c.WARN, ...e)
                    }
                    error(...e) {
                        this._userLogHandler && this._userLogHandler(this, c.ERROR, ...e), this._logHandler(this, c.ERROR, ...e)
                    }
                }("@firebase/auth");

            function x(e, ...t) {
                V.logLevel <= c.ERROR && V.error(`Auth (${ki.SDK_VERSION}): ${e}`, ...t)
            }

            function j(e, ...t) {
                throw z(e, ...t)
            }

            function H(e, ...t) {
                return z(e, ...t)
            }

            function W(e, t, n) {
                var r = Object.assign(Object.assign({}, U()), {
                    [t]: n
                });
                const i = new _("auth", "Firebase", r);
                return i.create(t, {
                    appName: e.name
                })
            }

            function q(e, t, n) {
                if (!(t instanceof n)) throw n.name !== t.constructor.name && j(e, "argument-error"), W(e, "argument-error", `Type of ${t.constructor.name} does not match expected instance.` + "Did you pass a reference from a different Auth SDK?")
            }

            function z(e, ...t) {
                if ("string" == typeof e) return F.create(e, ...t); {
                    var n = t[0];
                    const r = [...t.slice(1)];
                    return r[0] && (r[0].appName = e.name), e._errorFactory.create(n, ...r)
                }
            }

            function B(e, t, ...n) {
                if (!e) throw z(t, ...n)
            }

            function G(e) {
                var t = "INTERNAL ASSERTION FAILED: " + e;
                throw x(t), new Error(t)
            }

            function K(e, t) {
                e || G(t)
            }

            function $() {
                var e;
                return "undefined" != typeof self && (null === (e = self.location) || void 0 === e ? void 0 : e.href) || ""
            }

            function J() {
                return "http:" === Y() || "https:" === Y()
            }

            function Y() {
                var e;
                return "undefined" != typeof self && (null === (e = self.location) || void 0 === e ? void 0 : e.protocol) || null
            }
            class X {
                constructor(e, t) {
                    K((this.shortDelay = e) < (this.longDelay = t), "Short delay should be less than long delay!"), this.isMobile = "undefined" != typeof window && !!(window.cordova || window.phonegap || window.PhoneGap) && /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(d()) || f()
                }
                get() {
                    return "undefined" != typeof navigator && navigator && "onLine" in navigator && "boolean" == typeof navigator.onLine && (J() || p() || "connection" in navigator) && !navigator.onLine ? Math.min(5e3, this.shortDelay) : this.isMobile ? this.longDelay : this.shortDelay
                }
            }

            function Q(e, t) {
                K(e.emulator, "Emulator should always be set here");
                var n = e.emulator["url"];
                return t ? `${n}${t.startsWith("/")?t.slice(1):t}` : n
            }
            class Z {
                static initialize(e, t, n) {
                    this.fetchImpl = e, t && (this.headersImpl = t), n && (this.responseImpl = n)
                }
                static fetch() {
                    return this.fetchImpl || ("undefined" != typeof self && "fetch" in self ? self.fetch : void G("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill"))
                }
                static headers() {
                    return this.headersImpl || ("undefined" != typeof self && "Headers" in self ? self.Headers : void G("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill"))
                }
                static response() {
                    return this.responseImpl || ("undefined" != typeof self && "Response" in self ? self.Response : void G("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill"))
                }
            }
            const ee = {
                    CREDENTIAL_MISMATCH: "custom-token-mismatch",
                    MISSING_CUSTOM_TOKEN: "internal-error",
                    INVALID_IDENTIFIER: "invalid-email",
                    MISSING_CONTINUE_URI: "internal-error",
                    INVALID_PASSWORD: "wrong-password",
                    MISSING_PASSWORD: "missing-password",
                    EMAIL_EXISTS: "email-already-in-use",
                    PASSWORD_LOGIN_DISABLED: "operation-not-allowed",
                    INVALID_IDP_RESPONSE: "invalid-credential",
                    INVALID_PENDING_TOKEN: "invalid-credential",
                    FEDERATED_USER_ID_ALREADY_LINKED: "credential-already-in-use",
                    MISSING_REQ_TYPE: "internal-error",
                    EMAIL_NOT_FOUND: "user-not-found",
                    RESET_PASSWORD_EXCEED_LIMIT: "too-many-requests",
                    EXPIRED_OOB_CODE: "expired-action-code",
                    INVALID_OOB_CODE: "invalid-action-code",
                    MISSING_OOB_CODE: "internal-error",
                    CREDENTIAL_TOO_OLD_LOGIN_AGAIN: "requires-recent-login",
                    INVALID_ID_TOKEN: "invalid-user-token",
                    TOKEN_EXPIRED: "user-token-expired",
                    USER_NOT_FOUND: "user-token-expired",
                    TOO_MANY_ATTEMPTS_TRY_LATER: "too-many-requests",
                    INVALID_CODE: "invalid-verification-code",
                    INVALID_SESSION_INFO: "invalid-verification-id",
                    INVALID_TEMPORARY_PROOF: "invalid-credential",
                    MISSING_SESSION_INFO: "missing-verification-id",
                    SESSION_EXPIRED: "code-expired",
                    MISSING_ANDROID_PACKAGE_NAME: "missing-android-pkg-name",
                    UNAUTHORIZED_DOMAIN: "unauthorized-continue-uri",
                    INVALID_OAUTH_CLIENT_ID: "invalid-oauth-client-id",
                    ADMIN_ONLY_OPERATION: "admin-restricted-operation",
                    INVALID_MFA_PENDING_CREDENTIAL: "invalid-multi-factor-session",
                    MFA_ENROLLMENT_NOT_FOUND: "multi-factor-info-not-found",
                    MISSING_MFA_ENROLLMENT_ID: "missing-multi-factor-info",
                    MISSING_MFA_PENDING_CREDENTIAL: "missing-multi-factor-session",
                    SECOND_FACTOR_EXISTS: "second-factor-already-in-use",
                    SECOND_FACTOR_LIMIT_EXCEEDED: "maximum-second-factor-count-exceeded",
                    BLOCKING_FUNCTION_ERROR_RESPONSE: "internal-error",
                    RECAPTCHA_NOT_ENABLED: "recaptcha-not-enabled",
                    MISSING_RECAPTCHA_TOKEN: "missing-recaptcha-token",
                    INVALID_RECAPTCHA_TOKEN: "invalid-recaptcha-token",
                    INVALID_RECAPTCHA_ACTION: "invalid-recaptcha-action",
                    MISSING_CLIENT_TYPE: "missing-client-type",
                    MISSING_RECAPTCHA_VERSION: "missing-recaptcha-version",
                    INVALID_RECAPTCHA_VERSION: "invalid-recaptcha-version",
                    INVALID_REQ_TYPE: "invalid-req-type"
                },
                te = new X(3e4, 6e4);

            function ne(e, t) {
                return e.tenantId && !t.tenantId ? Object.assign(Object.assign({}, t), {
                    tenantId: e.tenantId
                }) : t
            }
            async function re(i, s, a, o, e = {}) {
                return ie(i, e, async () => {
                    let e = {},
                        t = {};
                    o && ("GET" === s ? t = o : e = {
                        body: JSON.stringify(o)
                    });
                    var n = I(Object.assign({
                        key: i.config.apiKey
                    }, t)).slice(1);
                    const r = await i._getAdditionalHeaders();
                    return r["Content-Type"] = "application/json", i.languageCode && (r["X-Firebase-Locale"] = i.languageCode), Z.fetch()(ae(i, i.config.apiHost, a, n), Object.assign({
                        method: s,
                        headers: r,
                        referrerPolicy: "no-referrer"
                    }, e))
                })
            }
            async function ie(t, e, n) {
                t._canInitEmulator = !1;
                var r = Object.assign(Object.assign({}, ee), e);
                try {
                    const a = new oe(t),
                        o = await Promise.race([n(), a.promise]);
                    a.clearNetworkTimeout();
                    var i = await o.json();
                    if ("needConfirmation" in i) throw ce(t, "account-exists-with-different-credential", i);
                    if (o.ok && !("errorMessage" in i)) return i; {
                        const c = o.ok ? i.errorMessage : i.error.message,
                            [l, u] = c.split(" : ");
                        if ("FEDERATED_USER_ID_ALREADY_LINKED" === l) throw ce(t, "credential-already-in-use", i);
                        if ("EMAIL_EXISTS" === l) throw ce(t, "email-already-in-use", i);
                        if ("USER_DISABLED" === l) throw ce(t, "user-disabled", i);
                        var s = r[l] || l.toLowerCase().replace(/[_\s]+/g, "-");
                        if (u) throw W(t, s, u);
                        j(t, s)
                    }
                } catch (e) {
                    if (e instanceof m) throw e;
                    j(t, "network-request-failed", {
                        message: String(e)
                    })
                }
            }
            async function se(e, t, n, r, i = {}) {
                var s = await re(e, t, n, r, i);
                return "mfaPendingCredential" in s && j(e, "multi-factor-auth-required", {
                    _serverResponse: s
                }), s
            }

            function ae(e, t, n, r) {
                var i = `${t}${n}?${r}`;
                return e.config.emulator ? Q(e.config, i) : `${e.config.apiScheme}://${i}`
            }
            class oe {
                constructor(e) {
                    this.auth = e, this.timer = null, this.promise = new Promise((e, t) => {
                        this.timer = setTimeout(() => t(H(this.auth, "network-request-failed")), te.get())
                    })
                }
                clearNetworkTimeout() {
                    clearTimeout(this.timer)
                }
            }

            function ce(e, t, n) {
                const r = {
                    appName: e.name
                };
                n.email && (r.email = n.email), n.phoneNumber && (r.phoneNumber = n.phoneNumber);
                const i = H(e, t, r);
                return i.customData._tokenResponse = n, i
            }

            function le(e) {
                if (e) try {
                    const t = new Date(Number(e));
                    if (!isNaN(t.getTime())) return t.toUTCString()
                } catch (e) {}
            }

            function ue(e) {
                return 1e3 * Number(e)
            }

            function de(e) {
                var [t, n, r] = e.split(".");
                if (void 0 === t || void 0 === n || void 0 === r) return x("JWT malformed, contained fewer than 3 sections"), null;
                try {
                    var i = s(n);
                    return i ? JSON.parse(i) : (x("Failed to decode base64 JWT payload"), null)
                } catch (e) {
                    return x("Caught error parsing JWT payload as JSON", null == e ? void 0 : e.toString()), null
                }
            }
            async function he(t, n, e = !1) {
                if (e) return n;
                try {
                    return n
                } catch (e) {
                    throw e instanceof m && (n = [e["code"]][0], "auth/user-disabled" === n || "auth/user-token-expired" === n) && t.auth.currentUser === t && await t.auth.signOut(), e
                }
            }
            class pe {
                constructor(e) {
                    this.user = e, this.isRunning = !1, this.timerId = null, this.errorBackoff = 3e4
                }
                _start() {
                    this.isRunning || (this.isRunning = !0, this.schedule())
                }
                _stop() {
                    this.isRunning && (this.isRunning = !1, null !== this.timerId && clearTimeout(this.timerId))
                }
                getInterval(e) {
                    if (e) {
                        var t = this.errorBackoff;
                        return this.errorBackoff = Math.min(2 * this.errorBackoff, 96e4), t
                    }
                    this.errorBackoff = 3e4;
                    t = (null !== (t = this.user.stsTokenManager.expirationTime) && void 0 !== t ? t : 0) - Date.now() - 3e5;
                    return Math.max(0, t)
                }
                schedule(e = !1) {
                    var t;
                    this.isRunning && (t = this.getInterval(e), this.timerId = setTimeout(async () => {
                        await this.iteration()
                    }, t))
                }
                async iteration() {
                    try {
                        await this.user.getIdToken(!0)
                    } catch (e) {
                        return void("auth/network-request-failed" === (null == e ? void 0 : e.code) && this.schedule(!0))
                    }
                    this.schedule()
                }
            }
            class fe {
                constructor(e, t) {
                    this.createdAt = e, this.lastLoginAt = t, this._initializeTime()
                }
                _initializeTime() {
                    this.lastSignInTime = le(this.lastLoginAt), this.creationTime = le(this.createdAt)
                }
                _copy(e) {
                    this.createdAt = e.createdAt, this.lastLoginAt = e.lastLoginAt, this._initializeTime()
                }
                toJSON() {
                    return {
                        createdAt: this.createdAt,
                        lastLoginAt: this.lastLoginAt
                    }
                }
            }
            async function ve(e) {
                var t = e.auth,
                    n = await e.getIdToken(),
                    r = await he(e, async function(e, t) {
                        return re(e, "POST", "/v1/accounts:lookup", t)
                    }(t, {
                        idToken: n
                    }));
                B(null == r ? void 0 : r.users.length, t, "internal-error");
                var i = r.users[0];
                e._notifyReloadListener(i);
                var s, a, t = null !== (n = i.providerUserInfo) && void 0 !== n && n.length ? i.providerUserInfo.map(e => {
                        var t = e["providerId"],
                            n = R(e, ["providerId"]);
                        return {
                            providerId: t,
                            uid: n.rawId || "",
                            displayName: n.displayName || null,
                            email: n.email || null,
                            phoneNumber: n.phoneNumber || null,
                            photoURL: n.photoUrl || null
                        }
                    }) : [],
                    r = (s = e.providerData, a = t, [...s.filter(t => !a.some(e => e.providerId === t.providerId)), ...a]),
                    n = e.isAnonymous,
                    t = !(e.email && i.passwordHash || null !== r && r.length),
                    t = !!n && t,
                    t = {
                        uid: i.localId,
                        displayName: i.displayName || null,
                        photoURL: i.photoUrl || null,
                        email: i.email || null,
                        emailVerified: i.emailVerified || !1,
                        phoneNumber: i.phoneNumber || null,
                        tenantId: i.tenantId || null,
                        providerData: r,
                        metadata: new fe(i.createdAt, i.lastLoginAt),
                        isAnonymous: t
                    };
                Object.assign(e, t)
            }
            class ge {
                constructor() {
                    this.refreshToken = null, this.accessToken = null, this.expirationTime = null
                }
                get isExpired() {
                    return !this.expirationTime || Date.now() > this.expirationTime - 3e4
                }
                updateFromServerResponse(e) {
                    B(e.idToken, "internal-error"), B(void 0 !== e.idToken, "internal-error"), B(void 0 !== e.refreshToken, "internal-error");
                    var t, n, n = "expiresIn" in e && void 0 !== e.expiresIn ? Number(e.expiresIn) : (t = e.idToken, B(n = de(t), "internal-error"), B(void 0 !== n.exp, "internal-error"), B(void 0 !== n.iat, "internal-error"), Number(n.exp) - Number(n.iat));
                    this.updateTokensAndExpiration(e.idToken, e.refreshToken, n)
                }
                async getToken(e, t = !1) {
                    return B(!this.accessToken || this.refreshToken, e, "user-token-expired"), t || !this.accessToken || this.isExpired ? this.refreshToken ? (await this.refresh(e, this.refreshToken), this.accessToken) : null : this.accessToken
                }
                clearRefreshToken() {
                    this.refreshToken = null
                }
                async refresh(e, t) {
                    var i, s, {
                        accessToken: n,
                        refreshToken: r,
                        expiresIn: a
                    } = (s = t, await {
                        accessToken: (a = await ie(i = e, {}, async () => {
                            var e = I({
                                    grant_type: "refresh_token",
                                    refresh_token: s
                                }).slice(1),
                                {
                                    tokenApiHost: t,
                                    apiKey: n
                                } = i.config,
                                n = ae(i, t, "/v1/token", `key=${n}`);
                            const r = await i._getAdditionalHeaders();
                            return r["Content-Type"] = "application/x-www-form-urlencoded", Z.fetch()(n, {
                                method: "POST",
                                headers: r,
                                body: e
                            })
                        })).access_token,
                        expiresIn: a.expires_in,
                        refreshToken: a.refresh_token
                    });
                    this.updateTokensAndExpiration(n, r, Number(a))
                }
                updateTokensAndExpiration(e, t, n) {
                    this.refreshToken = t || null, this.accessToken = e || null, this.expirationTime = Date.now() + 1e3 * n
                }
                static fromJSON(e, t) {
                    var {
                        refreshToken: n,
                        accessToken: r,
                        expirationTime: i
                    } = t;
                    const s = new ge;
                    return n && (B("string" == typeof n, "internal-error", {
                        appName: e
                    }), s.refreshToken = n), r && (B("string" == typeof r, "internal-error", {
                        appName: e
                    }), s.accessToken = r), i && (B("number" == typeof i, "internal-error", {
                        appName: e
                    }), s.expirationTime = i), s
                }
                toJSON() {
                    return {
                        refreshToken: this.refreshToken,
                        accessToken: this.accessToken,
                        expirationTime: this.expirationTime
                    }
                }
                _assign(e) {
                    this.accessToken = e.accessToken, this.refreshToken = e.refreshToken, this.expirationTime = e.expirationTime
                }
                _clone() {
                    return Object.assign(new ge, this.toJSON())
                }
                _performRefresh() {
                    return G("not implemented")
                }
            }

            function me(e, t) {
                B("string" == typeof e || void 0 === e, "internal-error", {
                    appName: t
                })
            }
            class _e {
                constructor(e) {
                    var {
                        uid: t,
                        auth: n,
                        stsTokenManager: r
                    } = e, i = R(e, ["uid", "auth", "stsTokenManager"]);
                    this.providerId = "firebase", this.proactiveRefresh = new pe(this), this.reloadUserInfo = null, this.reloadListener = null, this.uid = t, this.auth = n, this.stsTokenManager = r, this.accessToken = r.accessToken, this.displayName = i.displayName || null, this.email = i.email || null, this.emailVerified = i.emailVerified || !1, this.phoneNumber = i.phoneNumber || null, this.photoURL = i.photoURL || null, this.isAnonymous = i.isAnonymous || !1, this.tenantId = i.tenantId || null, this.providerData = i.providerData ? [...i.providerData] : [], this.metadata = new fe(i.createdAt || void 0, i.lastLoginAt || void 0)
                }
                async getIdToken(e) {
                    var t = await he(this, this.stsTokenManager.getToken(this.auth, e));
                    return B(t, this.auth, "internal-error"), this.accessToken !== t && (this.accessToken = t, await this.auth._persistUserIfCurrent(this), this.auth._notifyListenersIfCurrent(this)), t
                }
                getIdTokenResult(e) {
                    return async function(e, t = !1) {
                        const n = E(e);
                        var r = await n.getIdToken(t),
                            i = de(r);
                        B(i && i.exp && i.auth_time && i.iat, n.auth, "internal-error");
                        var s = "object" == typeof i.firebase ? i.firebase : void 0,
                            a = null == s ? void 0 : s.sign_in_provider;
                        return {
                            claims: i,
                            token: r,
                            authTime: le(ue(i.auth_time)),
                            issuedAtTime: le(ue(i.iat)),
                            expirationTime: le(ue(i.exp)),
                            signInProvider: a || null,
                            signInSecondFactor: (null == s ? void 0 : s.sign_in_second_factor) || null
                        }
                    }(this, e)
                }
                reload() {
                    return async function(e) {
                        const t = E(e);
                        await ve(t), await t.auth._persistUserIfCurrent(t), t.auth._notifyListenersIfCurrent(t)
                    }(this)
                }
                _assign(e) {
                    this !== e && (B(this.uid === e.uid, this.auth, "internal-error"), this.displayName = e.displayName, this.photoURL = e.photoURL, this.email = e.email, this.emailVerified = e.emailVerified, this.phoneNumber = e.phoneNumber, this.isAnonymous = e.isAnonymous, this.tenantId = e.tenantId, this.providerData = e.providerData.map(e => Object.assign({}, e)), this.metadata._copy(e.metadata), this.stsTokenManager._assign(e.stsTokenManager))
                }
                _clone(e) {
                    const t = new _e(Object.assign(Object.assign({}, this), {
                        auth: e,
                        stsTokenManager: this.stsTokenManager._clone()
                    }));
                    return t.metadata._copy(this.metadata), t
                }
                _onReload(e) {
                    B(!this.reloadListener, this.auth, "internal-error"), this.reloadListener = e, this.reloadUserInfo && (this._notifyReloadListener(this.reloadUserInfo), this.reloadUserInfo = null)
                }
                _notifyReloadListener(e) {
                    this.reloadListener ? this.reloadListener(e) : this.reloadUserInfo = e
                }
                _startProactiveRefresh() {
                    this.proactiveRefresh._start()
                }
                _stopProactiveRefresh() {
                    this.proactiveRefresh._stop()
                }
                async _updateTokensIfNecessary(e, t = !1) {
                    let n = !1;
                    e.idToken && e.idToken !== this.stsTokenManager.accessToken && (this.stsTokenManager.updateFromServerResponse(e), n = !0), t && await ve(this), await this.auth._persistUserIfCurrent(this), n && this.auth._notifyListenersIfCurrent(this)
                }
                async delete() {
                    var e = await this.getIdToken();
                    return await he(this, async function(e, t) {
                        return re(e, "POST", "/v1/accounts:delete", t)
                    }(this.auth, {
                        idToken: e
                    })), this.stsTokenManager.clearRefreshToken(), this.auth.signOut()
                }
                toJSON() {
                    return Object.assign(Object.assign({
                        uid: this.uid,
                        email: this.email || void 0,
                        emailVerified: this.emailVerified,
                        displayName: this.displayName || void 0,
                        isAnonymous: this.isAnonymous,
                        photoURL: this.photoURL || void 0,
                        phoneNumber: this.phoneNumber || void 0,
                        tenantId: this.tenantId || void 0,
                        providerData: this.providerData.map(e => Object.assign({}, e)),
                        stsTokenManager: this.stsTokenManager.toJSON(),
                        _redirectEventId: this._redirectEventId
                    }, this.metadata.toJSON()), {
                        apiKey: this.auth.config.apiKey,
                        appName: this.auth.name
                    })
                }
                get refreshToken() {
                    return this.stsTokenManager.refreshToken || ""
                }
                static _fromJSON(e, t) {
                    var n = null !== (a = t.displayName) && void 0 !== a ? a : void 0,
                        r = null !== (v = t.email) && void 0 !== v ? v : void 0,
                        i = null !== (o = t.phoneNumber) && void 0 !== o ? o : void 0,
                        s = null !== (l = t.photoURL) && void 0 !== l ? l : void 0,
                        a = null !== (c = t.tenantId) && void 0 !== c ? c : void 0,
                        o = null !== (v = t._redirectEventId) && void 0 !== v ? v : void 0,
                        c = null !== (l = t.createdAt) && void 0 !== l ? l : void 0,
                        l = null !== (v = t.lastLoginAt) && void 0 !== v ? v : void 0;
                    const {
                        uid: u,
                        emailVerified: d,
                        isAnonymous: h,
                        providerData: p,
                        stsTokenManager: f
                    } = t;
                    B(u && f, e, "internal-error");
                    var v = ge.fromJSON(this.name, f);
                    B("string" == typeof u, e, "internal-error"), me(n, e.name), me(r, e.name), B("boolean" == typeof d, e, "internal-error"), B("boolean" == typeof h, e, "internal-error"), me(i, e.name), me(s, e.name), me(a, e.name), me(o, e.name), me(c, e.name), me(l, e.name);
                    const g = new _e({
                        uid: u,
                        auth: e,
                        email: r,
                        emailVerified: d,
                        displayName: n,
                        isAnonymous: h,
                        photoURL: s,
                        phoneNumber: i,
                        tenantId: a,
                        stsTokenManager: v,
                        createdAt: c,
                        lastLoginAt: l
                    });
                    return p && Array.isArray(p) && (g.providerData = p.map(e => Object.assign({}, e))), o && (g._redirectEventId = o), g
                }
                static async _fromIdTokenResponse(e, t, n = !1) {
                    const r = new ge;
                    r.updateFromServerResponse(t);
                    var i = new _e({
                        uid: t.localId,
                        auth: e,
                        stsTokenManager: r,
                        isAnonymous: n
                    });
                    return await ve(i), i
                }
            }
            const ye = new Map;

            function Ie(e) {
                K(e instanceof Function, "Expected a class definition");
                let t = ye.get(e);
                return t ? K(t instanceof e, "Instance stored in cache mismatched with class") : (t = new e, ye.set(e, t)), t
            }
            class we {
                constructor() {
                    this.type = "NONE", this.storage = {}
                }
                async _isAvailable() {
                    return !0
                }
                async _set(e, t) {
                    this.storage[e] = t
                }
                async _get(e) {
                    var t = this.storage[e];
                    return void 0 === t ? null : t
                }
                async _remove(e) {
                    delete this.storage[e]
                }
                _addListener(e, t) {}
                _removeListener(e, t) {}
            }
            we.type = "NONE";
            const Te = we;

            function be(e, t, n) {
                return `firebase:${e}:${t}:${n}`
            }
            class ke {
                constructor(e, t, n) {
                    this.persistence = e, this.auth = t, this.userKey = n;
                    var {
                        config: r,
                        name: i
                    } = this.auth;
                    this.fullUserKey = be(this.userKey, r.apiKey, i), this.fullPersistenceKey = be("persistence", r.apiKey, i), this.boundEventHandler = t._onStorageEvent.bind(t), this.persistence._addListener(this.fullUserKey, this.boundEventHandler)
                }
                setCurrentUser(e) {
                    return this.persistence._set(this.fullUserKey, e.toJSON())
                }
                async getCurrentUser() {
                    var e = await this.persistence._get(this.fullUserKey);
                    return e ? _e._fromJSON(this.auth, e) : null
                }
                removeCurrentUser() {
                    return this.persistence._remove(this.fullUserKey)
                }
                savePersistenceForRedirect() {
                    return this.persistence._set(this.fullPersistenceKey, this.persistence.type)
                }
                async setPersistence(e) {
                    if (this.persistence !== e) {
                        var t = await this.getCurrentUser();
                        return await this.removeCurrentUser(), this.persistence = e, t ? this.setCurrentUser(t) : void 0
                    }
                }
                delete() {
                    this.persistence._removeListener(this.fullUserKey, this.boundEventHandler)
                }
                static async create(e, t, n = "authUser") {
                    if (!t.length) return new ke(Ie(Te), e, n);
                    const r = (await Promise.all(t.map(async e => {
                        if (await e._isAvailable()) return e
                    }))).filter(e => e);
                    let i = r[0] || Ie(Te);
                    const s = be(n, e.config.apiKey, e.name);
                    let a = null;
                    for (const u of t) try {
                        var o = await u._get(s);
                        if (o) {
                            var c = _e._fromJSON(e, o);
                            u !== i && (a = c), i = u;
                            break
                        }
                    } catch (e) {}
                    var l = r.filter(e => e._shouldAllowMigration);
                    return i._shouldAllowMigration && l.length && (i = l[0], a && await i._set(s, a.toJSON()), await Promise.all(t.map(async e => {
                        if (e !== i) try {
                            await e._remove(s)
                        } catch (e) {}
                    }))), new ke(i, e, n)
                }
            }

            function Ee(e) {
                const t = e.toLowerCase();
                if (t.includes("opera/") || t.includes("opr/") || t.includes("opios/")) return "Opera";
                if (Ce(t)) return "IEMobile";
                if (t.includes("msie") || t.includes("trident/")) return "IE";
                if (t.includes("edge/")) return "Edge";
                if (Re(t)) return "Firefox";
                if (t.includes("silk/")) return "Silk";
                if (Ne(t)) return "Blackberry";
                if (Oe(t)) return "Webos";
                if (Ae(t)) return "Safari";
                if ((t.includes("chrome/") || Se(t)) && !t.includes("edge/")) return "Chrome";
                if (Pe(t)) return "Android";
                var n = e.match(/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/);
                return 2 === (null == n ? void 0 : n.length) ? n[1] : "Other"
            }

            function Re(e = d()) {
                return /firefox\//i.test(e)
            }

            function Ae(e = d()) {
                const t = e.toLowerCase();
                return t.includes("safari/") && !t.includes("chrome/") && !t.includes("crios/") && !t.includes("android")
            }

            function Se(e = d()) {
                return /crios\//i.test(e)
            }

            function Ce(e = d()) {
                return /iemobile/i.test(e)
            }

            function Pe(e = d()) {
                return /android/i.test(e)
            }

            function Ne(e = d()) {
                return /blackberry/i.test(e)
            }

            function Oe(e = d()) {
                return /webos/i.test(e)
            }

            function Le(e = d()) {
                return /iphone|ipad|ipod/i.test(e) || /macintosh/i.test(e) && /mobile/i.test(e)
            }

            function De(e = d()) {
                return Le(e) || Pe(e) || Oe(e) || Ne(e) || /windows phone/i.test(e) || Ce(e)
            }

            function Me(e, t = []) {
                let n;
                switch (e) {
                    case "Browser":
                        n = Ee(d());
                        break;
                    case "Worker":
                        n = `${Ee(d())}-${e}`;
                        break;
                    default:
                        n = e
                }
                var r = t.length ? t.join(",") : "FirebaseCore-web";
                return `${n}/JsCore/${ki.SDK_VERSION}/${r}`
            }
            async function Ue(e, t) {
                return re(e, "GET", "/v2/recaptchaConfig", ne(e, t))
            }

            function Fe(e) {
                return void 0 !== e && void 0 !== e.getResponse
            }

            function Ve(e) {
                return void 0 !== e && void 0 !== e.enterprise
            }
            class xe {
                constructor(e) {
                    if (this.siteKey = "", this.emailPasswordEnabled = !1, void 0 === e.recaptchaKey) throw new Error("recaptchaKey undefined");
                    this.siteKey = e.recaptchaKey.split("/")[3], this.emailPasswordEnabled = e.recaptchaEnforcementState.some(e => "EMAIL_PASSWORD_PROVIDER" === e.provider && "OFF" !== e.enforcementState)
                }
            }

            function je(i) {
                return new Promise((e, n) => {
                    const t = document.createElement("script");
                    var r;
                    t.setAttribute("src", i), t.onload = e, t.onerror = e => {
                        const t = H("internal-error");
                        t.customData = e, n(t)
                    }, t.type = "text/javascript", t.charset = "UTF-8", (null !== (r = null === (r = document.getElementsByTagName("head")) || void 0 === r ? void 0 : r[0]) && void 0 !== r ? r : document).appendChild(t)
                })
            }

            function He(e) {
                return `__${e}${Math.floor(1e6*Math.random())}`
            }
            class We {
                constructor(e) {
                    this.type = "recaptcha-enterprise", this.auth = Ge(e)
                }
                async verify(i = "verify", r = !1) {
                    function s(e, t, n) {
                        const r = window.grecaptcha;
                        Ve(r) ? r.enterprise.ready(() => {
                            r.enterprise.execute(e, {
                                action: i
                            }).then(e => {
                                t(e)
                            }).catch(() => {
                                t("NO_RECAPTCHA")
                            })
                        }) : n(Error("No reCAPTCHA enterprise script loaded."))
                    }
                    return new Promise((t, n) => {
                        !async function(i) {
                            if (!r) {
                                if (null == i.tenantId && null != i._agentRecaptchaConfig) return i._agentRecaptchaConfig.siteKey;
                                if (null != i.tenantId && void 0 !== i._tenantRecaptchaConfigs[i.tenantId]) return i._tenantRecaptchaConfigs[i.tenantId].siteKey
                            }
                            return new Promise(async (n, r) => {
                                Ue(i, {
                                    clientType: "CLIENT_TYPE_WEB",
                                    version: "RECAPTCHA_ENTERPRISE"
                                }).then(e => {
                                    if (void 0 !== e.recaptchaKey) {
                                        var t = new xe(e);
                                        return null == i.tenantId ? i._agentRecaptchaConfig = t : i._tenantRecaptchaConfigs[i.tenantId] = t, n(t.siteKey)
                                    }
                                    r(new Error("recaptcha Enterprise site key undefined"))
                                }).catch(e => {
                                    r(e)
                                })
                            })
                        }(this.auth).then(e => {
                            !r && Ve(window.grecaptcha) ? s(e, t, n) : "undefined" != typeof window ? je("https://www.google.com/recaptcha/enterprise.js?render=" + e).then(() => {
                                s(e, t, n)
                            }).catch(e => {
                                n(e)
                            }) : n(new Error("RecaptchaVerifier is only supported in browser"))
                        }).catch(e => {
                            n(e)
                        })
                    })
                }
            }
            async function qe(e, t, n, r = !1) {
                const i = new We(e);
                let s;
                try {
                    s = await i.verify(n)
                } catch (e) {
                    s = await i.verify(n, !0)
                }
                var a = Object.assign({}, t);
                return r ? Object.assign(a, {
                    captchaResp: s
                }) : Object.assign(a, {
                    captchaResponse: s
                }), Object.assign(a, {
                    clientType: "CLIENT_TYPE_WEB"
                }), Object.assign(a, {
                    recaptchaVersion: "RECAPTCHA_ENTERPRISE"
                }), a
            }
            class ze {
                constructor(e) {
                    this.auth = e, this.queue = []
                }
                pushCallback(r, e) {
                    var t = n => new Promise((e, t) => {
                        try {
                            e(r(n))
                        } catch (e) {
                            t(e)
                        }
                    });
                    t.onAbort = e, this.queue.push(t);
                    const n = this.queue.length - 1;
                    return () => {
                        this.queue[n] = () => Promise.resolve()
                    }
                }
                async runMiddleware(e) {
                    if (this.auth.currentUser !== e) {
                        const t = [];
                        try {
                            for (const n of this.queue) await n(e), n.onAbort && t.push(n.onAbort)
                        } catch (e) {
                            t.reverse();
                            for (const r of t) try {
                                r()
                            } catch (e) {}
                            throw this.auth._errorFactory.create("login-blocked", {
                                originalMessage: null == e ? void 0 : e.message
                            })
                        }
                    }
                }
            }
            class Be {
                constructor(e, t, n, r) {
                    this.app = e, this.heartbeatServiceProvider = t, this.appCheckServiceProvider = n, this.config = r, this.currentUser = null, this.emulatorConfig = null, this.operations = Promise.resolve(), this.authStateSubscription = new Ke(this), this.idTokenSubscription = new Ke(this), this.beforeStateQueue = new ze(this), this.redirectUser = null, this.isProactiveRefreshEnabled = !1, this._canInitEmulator = !0, this._isInitialized = !1, this._deleted = !1, this._initializationPromise = null, this._popupRedirectResolver = null, this._errorFactory = F, this._agentRecaptchaConfig = null, this._tenantRecaptchaConfigs = {}, this.lastNotifiedUid = void 0, this.languageCode = null, this.tenantId = null, this.settings = {
                        appVerificationDisabledForTesting: !1
                    }, this.frameworks = [], this.name = e.name, this.clientVersion = r.sdkClientVersion
                }
                _initializeWithPersistence(t, n) {
                    return n && (this._popupRedirectResolver = Ie(n)), this._initializationPromise = this.queue(async () => {
                        var e;
                        if (!this._deleted && (this.persistenceManager = await ke.create(this, t), !this._deleted)) {
                            if (null !== (e = this._popupRedirectResolver) && void 0 !== e && e._shouldInitProactively) try {
                                await this._popupRedirectResolver._initialize(this)
                            } catch (e) {}
                            await this.initializeCurrentUser(n), this.lastNotifiedUid = (null === (e = this.currentUser) || void 0 === e ? void 0 : e.uid) || null, this._deleted || (this._isInitialized = !0)
                        }
                    }), this._initializationPromise
                }
                async _onStorageEvent() {
                    if (!this._deleted) {
                        var e = await this.assertedPersistence.getCurrentUser();
                        if (this.currentUser || e) return this.currentUser && e && this.currentUser.uid === e.uid ? (this._currentUser._assign(e), void await this.currentUser.getIdToken()) : void await this._updateCurrentUser(e, !0)
                    }
                }
                async initializeCurrentUser(e) {
                    var t, n, r, i = await this.assertedPersistence.getCurrentUser();
                    let s = i,
                        a = !1;
                    if (e && this.config.authDomain && (await this.getOrInitRedirectPersistenceManager(), t = null === (r = this.redirectUser) || void 0 === r ? void 0 : r._redirectEventId, n = null === s || void 0 === s ? void 0 : s._redirectEventId, r = await this.tryRedirectSignIn(e), t && t !== n || null == r || !r.user || (s = r.user, a = !0)), !s) return this.directlySetCurrentUser(null);
                    if (s._redirectEventId) return B(this._popupRedirectResolver, this, "argument-error"), await this.getOrInitRedirectPersistenceManager(), this.redirectUser && this.redirectUser._redirectEventId === s._redirectEventId ? this.directlySetCurrentUser(s) : this.reloadAndSetCurrentUserOrClear(s);
                    if (a) try {
                        await this.beforeStateQueue.runMiddleware(s)
                    } catch (e) {
                        s = i, this._popupRedirectResolver._overrideRedirectResult(this, () => Promise.reject(e))
                    }
                    return s ? this.reloadAndSetCurrentUserOrClear(s) : this.directlySetCurrentUser(null)
                }
                async tryRedirectSignIn(e) {
                    let t = null;
                    try {
                        t = await this._popupRedirectResolver._completeRedirectFn(this, e, !0)
                    } catch (e) {
                        await this._setRedirectUser(null)
                    }
                    return t
                }
                async reloadAndSetCurrentUserOrClear(e) {
                    try {
                        await ve(e)
                    } catch (e) {
                        if ("auth/network-request-failed" !== (null == e ? void 0 : e.code)) return this.directlySetCurrentUser(null)
                    }
                    return this.directlySetCurrentUser(e)
                }
                useDeviceLanguage() {
                    this.languageCode = function() {
                        if ("undefined" == typeof navigator) return null;
                        var e = navigator;
                        return e.languages && e.languages[0] || e.language || null
                    }()
                }
                async _delete() {
                    this._deleted = !0
                }
                async updateCurrentUser(e) {
                    const t = e ? E(e) : null;
                    return t && B(t.auth.config.apiKey === this.config.apiKey, this, "invalid-user-token"), this._updateCurrentUser(t && t._clone(this))
                }
                async _updateCurrentUser(e, t = !1) {
                    if (!this._deleted) return e && B(this.tenantId === e.tenantId, this, "tenant-id-mismatch"), t || await this.beforeStateQueue.runMiddleware(e), this.queue(async () => {
                        await this.directlySetCurrentUser(e), this.notifyAuthListeners()
                    })
                }
                async signOut() {
                    return await this.beforeStateQueue.runMiddleware(null), (this.redirectPersistenceManager || this._popupRedirectResolver) && await this._setRedirectUser(null), this._updateCurrentUser(null, !0)
                }
                setPersistence(e) {
                    return this.queue(async () => {
                        await this.assertedPersistence.setPersistence(Ie(e))
                    })
                }
                async initializeRecaptchaConfig() {
                    var e = await Ue(this, {
                            clientType: "CLIENT_TYPE_WEB",
                            version: "RECAPTCHA_ENTERPRISE"
                        }),
                        e = new xe(e);
                    if (null == this.tenantId ? this._agentRecaptchaConfig = e : this._tenantRecaptchaConfigs[this.tenantId] = e, e.emailPasswordEnabled) {
                        const t = new We(this);
                        t.verify()
                    }
                }
                _getRecaptchaConfig() {
                    return null == this.tenantId ? this._agentRecaptchaConfig : this._tenantRecaptchaConfigs[this.tenantId]
                }
                _getPersistence() {
                    return this.assertedPersistence.persistence.type
                }
                _updateErrorMap(e) {
                    this._errorFactory = new _("auth", "Firebase", e())
                }
                onAuthStateChanged(e, t, n) {
                    return this.registerStateListener(this.authStateSubscription, e, t, n)
                }
                beforeAuthStateChanged(e, t) {
                    return this.beforeStateQueue.pushCallback(e, t)
                }
                onIdTokenChanged(e, t, n) {
                    return this.registerStateListener(this.idTokenSubscription, e, t, n)
                }
                toJSON() {
                    var e;
                    return {
                        apiKey: this.config.apiKey,
                        authDomain: this.config.authDomain,
                        appName: this.name,
                        currentUser: null === (e = this._currentUser) || void 0 === e ? void 0 : e.toJSON()
                    }
                }
                async _setRedirectUser(e, t) {
                    const n = await this.getOrInitRedirectPersistenceManager(t);
                    return null === e ? n.removeCurrentUser() : n.setCurrentUser(e)
                }
                async getOrInitRedirectPersistenceManager(e) {
                    var t;
                    return this.redirectPersistenceManager || (B(t = e && Ie(e) || this._popupRedirectResolver, this, "argument-error"), this.redirectPersistenceManager = await ke.create(this, [Ie(t._redirectPersistence)], "redirectUser"), this.redirectUser = await this.redirectPersistenceManager.getCurrentUser()), this.redirectPersistenceManager
                }
                async _redirectUserForId(e) {
                    var t;
                    return this._isInitialized && await this.queue(async () => {}), (null === (t = this._currentUser) || void 0 === t ? void 0 : t._redirectEventId) === e ? this._currentUser : (null === (t = this.redirectUser) || void 0 === t ? void 0 : t._redirectEventId) === e ? this.redirectUser : null
                }
                async _persistUserIfCurrent(e) {
                    if (e === this.currentUser) return this.queue(async () => this.directlySetCurrentUser(e))
                }
                _notifyListenersIfCurrent(e) {
                    e === this.currentUser && this.notifyAuthListeners()
                }
                _key() {
                    return `${this.config.authDomain}:${this.config.apiKey}:${this.name}`
                }
                _startProactiveRefresh() {
                    this.isProactiveRefreshEnabled = !0, this.currentUser && this._currentUser._startProactiveRefresh()
                }
                _stopProactiveRefresh() {
                    this.isProactiveRefreshEnabled = !1, this.currentUser && this._currentUser._stopProactiveRefresh()
                }
                get _currentUser() {
                    return this.currentUser
                }
                notifyAuthListeners() {
                    var e;
                    this._isInitialized && (this.idTokenSubscription.next(this.currentUser), e = null !== (e = null === (e = this.currentUser) || void 0 === e ? void 0 : e.uid) && void 0 !== e ? e : null, this.lastNotifiedUid !== e && (this.lastNotifiedUid = e, this.authStateSubscription.next(this.currentUser)))
                }
                registerStateListener(e, t, n, r) {
                    if (this._deleted) return () => {};
                    const i = "function" == typeof t ? t : t.next.bind(t),
                        s = this._isInitialized ? Promise.resolve() : this._initializationPromise;
                    return B(s, this, "internal-error"), s.then(() => i(this.currentUser)), "function" == typeof t ? e.addObserver(t, n, r) : e.addObserver(t)
                }
                async directlySetCurrentUser(e) {
                    this.currentUser && this.currentUser !== e && this._currentUser._stopProactiveRefresh(), e && this.isProactiveRefreshEnabled && e._startProactiveRefresh(), (this.currentUser = e) ? await this.assertedPersistence.setCurrentUser(e) : await this.assertedPersistence.removeCurrentUser()
                }
                queue(e) {
                    return this.operations = this.operations.then(e, e), this.operations
                }
                get assertedPersistence() {
                    return B(this.persistenceManager, this, "internal-error"), this.persistenceManager
                }
                _logFramework(e) {
                    e && !this.frameworks.includes(e) && (this.frameworks.push(e), this.frameworks.sort(), this.clientVersion = Me(this.config.clientPlatform, this._getFrameworks()))
                }
                _getFrameworks() {
                    return this.frameworks
                }
                async _getAdditionalHeaders() {
                    const e = {
                        "X-Client-Version": this.clientVersion
                    };
                    this.app.options.appId && (e["X-Firebase-gmpid"] = this.app.options.appId);
                    var t = await (null === (t = this.heartbeatServiceProvider.getImmediate({
                        optional: !0
                    })) || void 0 === t ? void 0 : t.getHeartbeatsHeader());
                    t && (e["X-Firebase-Client"] = t);
                    t = await this._getAppCheckToken();
                    return t && (e["X-Firebase-AppCheck"] = t), e
                }
                async _getAppCheckToken() {
                    var e, t, n = await (null === (n = this.appCheckServiceProvider.getImmediate({
                        optional: !0
                    })) || void 0 === n ? void 0 : n.getToken());
                    return null != n && n.error && (e = `Error while retrieving App Check token: ${n.error}`, t = [], V.logLevel <= c.WARN && V.warn(`Auth (${ki.SDK_VERSION}): ${e}`, ...t)), null == n ? void 0 : n.token
                }
            }

            function Ge(e) {
                return E(e)
            }
            class Ke {
                constructor(e) {
                    this.auth = e, this.observer = null, this.addObserver = function(e, t) {
                        const n = new b(e, t);
                        return n.subscribe.bind(n)
                    }(e => this.observer = e)
                }
                get next() {
                    return B(this.observer, this.auth, "internal-error"), this.observer.next.bind(this.observer)
                }
            }

            function $e(e, t, n) {
                const r = Ge(e);
                B(r._canInitEmulator, r, "emulator-config-failed"), B(/^https?:\/\//.test(t), r, "invalid-emulator-scheme");
                var i = !(null == n || !n.disableWarnings);
                const s = Je(t);
                var {
                    host: a,
                    port: o
                } = function(e) {
                    const t = Je(e),
                        n = /(\/\/)?([^?#/]+)/.exec(e.substr(t.length));
                    if (!n) return {
                        host: "",
                        port: null
                    };
                    const r = n[2].split("@").pop() || "",
                        i = /^(\[[^\]]+\])(:|$)/.exec(r); {
                        if (i) {
                            var s = i[1];
                            return {
                                host: s,
                                port: Ye(r.substr(s.length + 1))
                            }
                        }
                        var [a, s] = r.split(":");
                        return {
                            host: a,
                            port: Ye(s)
                        }
                    }
                }(t);
                r.config.emulator = {
                    url: `${s}//${a}${null===o?"":`:${o}`}/`
                }, r.settings.appVerificationDisabledForTesting = !0, r.emulatorConfig = Object.freeze({
                    host: a,
                    port: o,
                    protocol: s.replace(":", ""),
                    options: Object.freeze({
                        disableWarnings: i
                    })
                }), i || function() {
                    function e() {
                        const e = document.createElement("p"),
                            t = e.style;
                        e.innerText = "Running in emulator mode. Do not use with production credentials.", t.position = "fixed", t.width = "100%", t.backgroundColor = "#ffffff", t.border = ".1em solid #000000", t.color = "#b50000", t.bottom = "0px", t.left = "0px", t.margin = "0px", t.zIndex = "10000", t.textAlign = "center", e.classList.add("firebase-emulator-warning"), document.body.appendChild(e)
                    }
                    "undefined" != typeof console && "function" == typeof console.info && console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials.");
                    "undefined" != typeof window && "undefined" != typeof document && ("loading" === document.readyState ? window.addEventListener("DOMContentLoaded", e) : e())
                }()
            }

            function Je(e) {
                var t = e.indexOf(":");
                return t < 0 ? "" : e.substr(0, t + 1)
            }

            function Ye(e) {
                if (!e) return null;
                var t = Number(e);
                return isNaN(t) ? null : t
            }
            class Xe {
                constructor(e, t) {
                    this.providerId = e, this.signInMethod = t
                }
                toJSON() {
                    return G("not implemented")
                }
                _getIdTokenResponse(e) {
                    return G("not implemented")
                }
                _linkToIdToken(e, t) {
                    return G("not implemented")
                }
                _getReauthenticationResolver(e) {
                    return G("not implemented")
                }
            }
            async function Qe(e, t) {
                return re(e, "POST", "/v1/accounts:resetPassword", ne(e, t))
            }
            async function Ze(e, t) {
                return re(e, "POST", "/v1/accounts:update", t)
            }
            async function et(e, t) {
                return se(e, "POST", "/v1/accounts:signInWithPassword", ne(e, t))
            }
            async function tt(e, t) {
                return re(e, "POST", "/v1/accounts:sendOobCode", ne(e, t))
            }
            async function nt(e, t) {
                return tt(e, t)
            }
            async function rt(e, t) {
                return tt(e, t)
            }
            class it extends Xe {
                constructor(e, t, n, r = null) {
                    super("password", n), this._email = e, this._password = t, this._tenantId = r
                }
                static _fromEmailAndPassword(e, t) {
                    return new it(e, t, "password")
                }
                static _fromEmailAndCode(e, t, n = null) {
                    return new it(e, t, "emailLink", n)
                }
                toJSON() {
                    return {
                        email: this._email,
                        password: this._password,
                        signInMethod: this.signInMethod,
                        tenantId: this._tenantId
                    }
                }
                static fromJSON(e) {
                    var t = "string" == typeof e ? JSON.parse(e) : e;
                    if (null != t && t.email && null != t && t.password) {
                        if ("password" === t.signInMethod) return this._fromEmailAndPassword(t.email, t.password);
                        if ("emailLink" === t.signInMethod) return this._fromEmailAndCode(t.email, t.password, t.tenantId)
                    }
                    return null
                }
                async _getIdTokenResponse(n) {
                    switch (this.signInMethod) {
                        case "password":
                            const r = {
                                returnSecureToken: !0,
                                email: this._email,
                                password: this._password,
                                clientType: "CLIENT_TYPE_WEB"
                            };
                            if (null !== (e = n._getRecaptchaConfig()) && void 0 !== e && e.emailPasswordEnabled) {
                                var e = await qe(n, r, "signInWithPassword");
                                return et(n, e)
                            }
                            return et(n, r).catch(async e => {
                                if ("auth/missing-recaptcha-token" !== e.code) return Promise.reject(e);
                                console.log("Sign-in with email address and password is protected by reCAPTCHA for this project. Automatically triggering the reCAPTCHA flow and restarting the sign-in flow.");
                                var t = await qe(n, r, "signInWithPassword");
                                return et(n, t)
                            });
                        case "emailLink":
                            return async function(e, t) {
                                return se(e, "POST", "/v1/accounts:signInWithEmailLink", ne(e, t))
                            }(n, {
                                email: this._email,
                                oobCode: this._password
                            });
                        default:
                            j(n, "internal-error")
                    }
                }
                async _linkToIdToken(e, t) {
                    switch (this.signInMethod) {
                        case "password":
                            return Ze(e, {
                                idToken: t,
                                returnSecureToken: !0,
                                email: this._email,
                                password: this._password
                            });
                        case "emailLink":
                            return async function(e, t) {
                                return se(e, "POST", "/v1/accounts:signInWithEmailLink", ne(e, t))
                            }(e, {
                                idToken: t,
                                email: this._email,
                                oobCode: this._password
                            });
                        default:
                            j(e, "internal-error")
                    }
                }
                _getReauthenticationResolver(e) {
                    return this._getIdTokenResponse(e)
                }
            }
            async function st(e, t) {
                return se(e, "POST", "/v1/accounts:signInWithIdp", ne(e, t))
            }
            class at extends Xe {
                constructor() {
                    super(...arguments), this.pendingToken = null
                }
                static _fromParams(e) {
                    const t = new at(e.providerId, e.signInMethod);
                    return e.idToken || e.accessToken ? (e.idToken && (t.idToken = e.idToken), e.accessToken && (t.accessToken = e.accessToken), e.nonce && !e.pendingToken && (t.nonce = e.nonce), e.pendingToken && (t.pendingToken = e.pendingToken)) : e.oauthToken && e.oauthTokenSecret ? (t.accessToken = e.oauthToken, t.secret = e.oauthTokenSecret) : j("argument-error"), t
                }
                toJSON() {
                    return {
                        idToken: this.idToken,
                        accessToken: this.accessToken,
                        secret: this.secret,
                        nonce: this.nonce,
                        pendingToken: this.pendingToken,
                        providerId: this.providerId,
                        signInMethod: this.signInMethod
                    }
                }
                static fromJSON(e) {
                    var t = "string" == typeof e ? JSON.parse(e) : e,
                        {
                            providerId: n,
                            signInMethod: r
                        } = t,
                        t = R(t, ["providerId", "signInMethod"]);
                    if (!n || !r) return null;
                    const i = new at(n, r);
                    return i.idToken = t.idToken || void 0, i.accessToken = t.accessToken || void 0, i.secret = t.secret, i.nonce = t.nonce, i.pendingToken = t.pendingToken || null, i
                }
                _getIdTokenResponse(e) {
                    return st(e, this.buildRequest())
                }
                _linkToIdToken(e, t) {
                    const n = this.buildRequest();
                    return n.idToken = t, st(e, n)
                }
                _getReauthenticationResolver(e) {
                    const t = this.buildRequest();
                    return t.autoCreate = !1, st(e, t)
                }
                buildRequest() {
                    const e = {
                        requestUri: "http://localhost",
                        returnSecureToken: !0
                    };
                    if (this.pendingToken) e.pendingToken = this.pendingToken;
                    else {
                        const t = {};
                        this.idToken && (t.id_token = this.idToken), this.accessToken && (t.access_token = this.accessToken), this.secret && (t.oauth_token_secret = this.secret), t.providerId = this.providerId, this.nonce && !this.pendingToken && (t.nonce = this.nonce), e.postBody = I(t)
                    }
                    return e
                }
            }
            const ot = {
                USER_NOT_FOUND: "user-not-found"
            };
            class ct extends Xe {
                constructor(e) {
                    super("phone", "phone"), this.params = e
                }
                static _fromVerification(e, t) {
                    return new ct({
                        verificationId: e,
                        verificationCode: t
                    })
                }
                static _fromTokenResponse(e, t) {
                    return new ct({
                        phoneNumber: e,
                        temporaryProof: t
                    })
                }
                _getIdTokenResponse(e) {
                    return async function(e, t) {
                        return se(e, "POST", "/v1/accounts:signInWithPhoneNumber", ne(e, t))
                    }(e, this._makeVerificationRequest())
                }
                _linkToIdToken(e, t) {
                    return async function(e, t) {
                        var n = await se(e, "POST", "/v1/accounts:signInWithPhoneNumber", ne(e, t));
                        if (n.temporaryProof) throw ce(e, "account-exists-with-different-credential", n);
                        return n
                    }(e, Object.assign({
                        idToken: t
                    }, this._makeVerificationRequest()))
                }
                _getReauthenticationResolver(e) {
                    return async function(e, t) {
                        return se(e, "POST", "/v1/accounts:signInWithPhoneNumber", ne(e, Object.assign(Object.assign({}, t), {
                            operation: "REAUTH"
                        })), ot)
                    }(e, this._makeVerificationRequest())
                }
                _makeVerificationRequest() {
                    var {
                        temporaryProof: e,
                        phoneNumber: t,
                        verificationId: n,
                        verificationCode: r
                    } = this.params;
                    return e && t ? {
                        temporaryProof: e,
                        phoneNumber: t
                    } : {
                        sessionInfo: n,
                        code: r
                    }
                }
                toJSON() {
                    const e = {
                        providerId: this.providerId
                    };
                    return this.params.phoneNumber && (e.phoneNumber = this.params.phoneNumber), this.params.temporaryProof && (e.temporaryProof = this.params.temporaryProof), this.params.verificationCode && (e.verificationCode = this.params.verificationCode), this.params.verificationId && (e.verificationId = this.params.verificationId), e
                }
                static fromJSON(e) {
                    var {
                        verificationId: t,
                        verificationCode: n,
                        phoneNumber: r,
                        temporaryProof: i
                    } = e = "string" == typeof e ? JSON.parse(e) : e;
                    return n || t || r || i ? new ct({
                        verificationId: t,
                        verificationCode: n,
                        phoneNumber: r,
                        temporaryProof: i
                    }) : null
                }
            }
            class lt {
                constructor(e) {
                    var t = w(T(e)),
                        n = null !== (r = t.apiKey) && void 0 !== r ? r : null,
                        r = null !== (i = t.oobCode) && void 0 !== i ? i : null,
                        i = function(e) {
                            switch (e) {
                                case "recoverEmail":
                                    return "RECOVER_EMAIL";
                                case "resetPassword":
                                    return "PASSWORD_RESET";
                                case "signIn":
                                    return "EMAIL_SIGNIN";
                                case "verifyEmail":
                                    return "VERIFY_EMAIL";
                                case "verifyAndChangeEmail":
                                    return "VERIFY_AND_CHANGE_EMAIL";
                                case "revertSecondFactorAddition":
                                    return "REVERT_SECOND_FACTOR_ADDITION";
                                default:
                                    return null
                            }
                        }(null !== (i = t.mode) && void 0 !== i ? i : null);
                    B(n && r && i, "argument-error"), this.apiKey = n, this.operation = i, this.code = r, this.continueUrl = null !== (r = t.continueUrl) && void 0 !== r ? r : null, this.languageCode = null !== (r = t.languageCode) && void 0 !== r ? r : null, this.tenantId = null !== (t = t.tenantId) && void 0 !== t ? t : null
                }
                static parseLink(e) {
                    var t, n, r, t = (t = w(T(e = e)).link, n = t ? w(T(t)).deep_link_id : null, ((r = w(T(e)).deep_link_id) ? w(T(r)).link : null) || r || n || t || e);
                    try {
                        return new lt(t)
                    } catch (e) {
                        return null
                    }
                }
            }
            class ut {
                constructor() {
                    this.providerId = ut.PROVIDER_ID
                }
                static credential(e, t) {
                    return it._fromEmailAndPassword(e, t)
                }
                static credentialWithLink(e, t) {
                    var n = lt.parseLink(t);
                    return B(n, "argument-error"), it._fromEmailAndCode(e, n.code, n.tenantId)
                }
            }
            ut.PROVIDER_ID = "password", ut.EMAIL_PASSWORD_SIGN_IN_METHOD = "password", ut.EMAIL_LINK_SIGN_IN_METHOD = "emailLink";
            class dt {
                constructor(e) {
                    this.providerId = e, this.defaultLanguageCode = null, this.customParameters = {}
                }
                setDefaultLanguage(e) {
                    this.defaultLanguageCode = e
                }
                setCustomParameters(e) {
                    return this.customParameters = e, this
                }
                getCustomParameters() {
                    return this.customParameters
                }
            }
            class ht extends dt {
                constructor() {
                    super(...arguments), this.scopes = []
                }
                addScope(e) {
                    return this.scopes.includes(e) || this.scopes.push(e), this
                }
                getScopes() {
                    return [...this.scopes]
                }
            }
            class pt extends ht {
                static credentialFromJSON(e) {
                    var t = "string" == typeof e ? JSON.parse(e) : e;
                    return B("providerId" in t && "signInMethod" in t, "argument-error"), at._fromParams(t)
                }
                credential(e) {
                    return this._credential(Object.assign(Object.assign({}, e), {
                        nonce: e.rawNonce
                    }))
                }
                _credential(e) {
                    return B(e.idToken || e.accessToken, "argument-error"), at._fromParams(Object.assign(Object.assign({}, e), {
                        providerId: this.providerId,
                        signInMethod: this.providerId
                    }))
                }
                static credentialFromResult(e) {
                    return pt.oauthCredentialFromTaggedObject(e)
                }
                static credentialFromError(e) {
                    return pt.oauthCredentialFromTaggedObject(e.customData || {})
                }
                static oauthCredentialFromTaggedObject({
                    _tokenResponse: e
                }) {
                    if (!e) return null;
                    var {
                        oauthIdToken: t,
                        oauthAccessToken: n,
                        oauthTokenSecret: r,
                        pendingToken: i,
                        nonce: s,
                        providerId: a
                    } = e;
                    if (!(n || r || t || i)) return null;
                    if (!a) return null;
                    try {
                        return new pt(a)._credential({
                            idToken: t,
                            accessToken: n,
                            nonce: s,
                            pendingToken: i
                        })
                    } catch (e) {
                        return null
                    }
                }
            }
            class ft extends ht {
                constructor() {
                    super("facebook.com")
                }
                static credential(e) {
                    return at._fromParams({
                        providerId: ft.PROVIDER_ID,
                        signInMethod: ft.FACEBOOK_SIGN_IN_METHOD,
                        accessToken: e
                    })
                }
                static credentialFromResult(e) {
                    return ft.credentialFromTaggedObject(e)
                }
                static credentialFromError(e) {
                    return ft.credentialFromTaggedObject(e.customData || {})
                }
                static credentialFromTaggedObject({
                    _tokenResponse: e
                }) {
                    if (!(e && "oauthAccessToken" in e)) return null;
                    if (!e.oauthAccessToken) return null;
                    try {
                        return ft.credential(e.oauthAccessToken)
                    } catch (e) {
                        return null
                    }
                }
            }
            ft.FACEBOOK_SIGN_IN_METHOD = "facebook.com", ft.PROVIDER_ID = "facebook.com";
            class vt extends ht {
                constructor() {
                    super("google.com"), this.addScope("profile")
                }
                static credential(e, t) {
                    return at._fromParams({
                        providerId: vt.PROVIDER_ID,
                        signInMethod: vt.GOOGLE_SIGN_IN_METHOD,
                        idToken: e,
                        accessToken: t
                    })
                }
                static credentialFromResult(e) {
                    return vt.credentialFromTaggedObject(e)
                }
                static credentialFromError(e) {
                    return vt.credentialFromTaggedObject(e.customData || {})
                }
                static credentialFromTaggedObject({
                    _tokenResponse: e
                }) {
                    if (!e) return null;
                    var {
                        oauthIdToken: t,
                        oauthAccessToken: n
                    } = e;
                    if (!t && !n) return null;
                    try {
                        return vt.credential(t, n)
                    } catch (e) {
                        return null
                    }
                }
            }
            vt.GOOGLE_SIGN_IN_METHOD = "google.com", vt.PROVIDER_ID = "google.com";
            class gt extends ht {
                constructor() {
                    super("github.com")
                }
                static credential(e) {
                    return at._fromParams({
                        providerId: gt.PROVIDER_ID,
                        signInMethod: gt.GITHUB_SIGN_IN_METHOD,
                        accessToken: e
                    })
                }
                static credentialFromResult(e) {
                    return gt.credentialFromTaggedObject(e)
                }
                static credentialFromError(e) {
                    return gt.credentialFromTaggedObject(e.customData || {})
                }
                static credentialFromTaggedObject({
                    _tokenResponse: e
                }) {
                    if (!(e && "oauthAccessToken" in e)) return null;
                    if (!e.oauthAccessToken) return null;
                    try {
                        return gt.credential(e.oauthAccessToken)
                    } catch (e) {
                        return null
                    }
                }
            }
            gt.GITHUB_SIGN_IN_METHOD = "github.com", gt.PROVIDER_ID = "github.com";
            class mt extends Xe {
                constructor(e, t) {
                    super(e, e), this.pendingToken = t
                }
                _getIdTokenResponse(e) {
                    return st(e, this.buildRequest())
                }
                _linkToIdToken(e, t) {
                    const n = this.buildRequest();
                    return n.idToken = t, st(e, n)
                }
                _getReauthenticationResolver(e) {
                    const t = this.buildRequest();
                    return t.autoCreate = !1, st(e, t)
                }
                toJSON() {
                    return {
                        signInMethod: this.signInMethod,
                        providerId: this.providerId,
                        pendingToken: this.pendingToken
                    }
                }
                static fromJSON(e) {
                    var {
                        providerId: t,
                        signInMethod: n,
                        pendingToken: r
                    } = "string" == typeof e ? JSON.parse(e) : e;
                    return t && n && r && t === n ? new mt(t, r) : null
                }
                static _create(e, t) {
                    return new mt(e, t)
                }
                buildRequest() {
                    return {
                        requestUri: "http://localhost",
                        returnSecureToken: !0,
                        pendingToken: this.pendingToken
                    }
                }
            }
            class _t extends dt {
                constructor(e) {
                    B(e.startsWith("saml."), "argument-error"), super(e)
                }
                static credentialFromResult(e) {
                    return _t.samlCredentialFromTaggedObject(e)
                }
                static credentialFromError(e) {
                    return _t.samlCredentialFromTaggedObject(e.customData || {})
                }
                static credentialFromJSON(e) {
                    var t = mt.fromJSON(e);
                    return B(t, "argument-error"), t
                }
                static samlCredentialFromTaggedObject({
                    _tokenResponse: e
                }) {
                    if (!e) return null;
                    var {
                        pendingToken: t,
                        providerId: n
                    } = e;
                    if (!t || !n) return null;
                    try {
                        return mt._create(n, t)
                    } catch (e) {
                        return null
                    }
                }
            }
            class yt extends ht {
                constructor() {
                    super("twitter.com")
                }
                static credential(e, t) {
                    return at._fromParams({
                        providerId: yt.PROVIDER_ID,
                        signInMethod: yt.TWITTER_SIGN_IN_METHOD,
                        oauthToken: e,
                        oauthTokenSecret: t
                    })
                }
                static credentialFromResult(e) {
                    return yt.credentialFromTaggedObject(e)
                }
                static credentialFromError(e) {
                    return yt.credentialFromTaggedObject(e.customData || {})
                }
                static credentialFromTaggedObject({
                    _tokenResponse: e
                }) {
                    if (!e) return null;
                    var {
                        oauthAccessToken: t,
                        oauthTokenSecret: n
                    } = e;
                    if (!t || !n) return null;
                    try {
                        return yt.credential(t, n)
                    } catch (e) {
                        return null
                    }
                }
            }
            async function It(e, t) {
                return se(e, "POST", "/v1/accounts:signUp", ne(e, t))
            }
            yt.TWITTER_SIGN_IN_METHOD = "twitter.com", yt.PROVIDER_ID = "twitter.com";
            class wt {
                constructor(e) {
                    this.user = e.user, this.providerId = e.providerId, this._tokenResponse = e._tokenResponse, this.operationType = e.operationType
                }
                static async _fromIdTokenResponse(e, t, n, r = !1) {
                    var i = await _e._fromIdTokenResponse(e, n, r),
                        s = Tt(n);
                    return new wt({
                        user: i,
                        providerId: s,
                        _tokenResponse: n,
                        operationType: t
                    })
                }
                static async _forOperation(e, t, n) {
                    await e._updateTokensIfNecessary(n, !0);
                    var r = Tt(n);
                    return new wt({
                        user: e,
                        providerId: r,
                        _tokenResponse: n,
                        operationType: t
                    })
                }
            }

            function Tt(e) {
                return e.providerId || ("phoneNumber" in e ? "phone" : null)
            }
            class bt extends m {
                constructor(e, t, n, r) {
                    var i;
                    super(t.code, t.message), this.operationType = n, this.user = r, Object.setPrototypeOf(this, bt.prototype), this.customData = {
                        appName: e.name,
                        tenantId: null !== (i = e.tenantId) && void 0 !== i ? i : void 0,
                        _serverResponse: t.customData._serverResponse,
                        operationType: n
                    }
                }
                static _fromErrorAndOperation(e, t, n, r) {
                    return new bt(e, t, n, r)
                }
            }

            function kt(t, n, e, r) {
                const i = "reauthenticate" === n ? e._getReauthenticationResolver(t) : e._getIdTokenResponse(t);
                return i.catch(e => {
                    if ("auth/multi-factor-auth-required" === e.code) throw bt._fromErrorAndOperation(t, e, n, r);
                    throw e
                })
            }

            function Et(e) {
                return new Set(e.map(({
                    providerId: e
                }) => e).filter(e => !!e))
            }
            async function Rt(e, t) {
                const n = E(e);
                await St(!0, n, t);
                var r = (e = n.auth, t = {
                    idToken: await n.getIdToken(),
                    deleteProvider: [t]
                }, await re(e, "POST", "/v1/accounts:update", t))["providerUserInfo"];
                const i = Et(r || []);
                return n.providerData = n.providerData.filter(e => i.has(e.providerId)), i.has("phone") || (n.phoneNumber = null), await n.auth._persistUserIfCurrent(n), n
            }
            async function At(e, t, n = !1) {
                var r = await he(e, t._linkToIdToken(e.auth, await e.getIdToken()), n);
                return wt._forOperation(e, "link", r)
            }
            async function St(e, t, n) {
                await ve(t);
                const r = Et(t.providerData);
                var i = !1 === e ? "provider-already-linked" : "no-such-provider";
                B(r.has(n) === e, t.auth, i)
            }
            async function Ct(e, t, n = !1) {
                var r = e["auth"],
                    i = "reauthenticate";
                try {
                    var s = await he(e, kt(r, i, t, e), n);
                    B(s.idToken, r, "internal-error");
                    var a = de(s.idToken);
                    B(a, r, "internal-error");
                    var o = a["sub"];
                    return B(e.uid === o, r, "user-mismatch"), wt._forOperation(e, i, s)
                } catch (e) {
                    throw "auth/user-not-found" === (null == e ? void 0 : e.code) && j(r, "user-mismatch"), e
                }
            }
            async function Pt(e, t, n = !1) {
                var r = await kt(e, "signIn", t),
                    r = await wt._fromIdTokenResponse(e, "signIn", r);
                return n || await e._updateCurrentUser(r.user), r
            }
            async function Nt(e, t) {
                return Pt(Ge(e), t)
            }
            async function Ot(e, t) {
                var n = E(e);
                return await St(!1, n, t.providerId), At(n, t)
            }
            async function Lt(e, t) {
                return Ct(E(e), t)
            }
            async function Dt(e, t) {
                const n = Ge(e);
                var r = await se(n, "POST", "/v1/accounts:signInWithCustomToken", ne(n, {
                        token: t,
                        returnSecureToken: !0
                    })),
                    r = await wt._fromIdTokenResponse(n, "signIn", r);
                return await n._updateCurrentUser(r.user), r
            }
            class Mt {
                constructor(e, t) {
                    this.factorId = e, this.uid = t.mfaEnrollmentId, this.enrollmentTime = new Date(t.enrolledAt).toUTCString(), this.displayName = t.displayName
                }
                static _fromServerResponse(e, t) {
                    return "phoneInfo" in t ? Ut._fromServerResponse(e, t) : "totpInfo" in t ? Ft._fromServerResponse(e, t) : j(e, "internal-error")
                }
            }
            class Ut extends Mt {
                constructor(e) {
                    super("phone", e), this.phoneNumber = e.phoneInfo
                }
                static _fromServerResponse(e, t) {
                    return new Ut(t)
                }
            }
            class Ft extends Mt {
                constructor(e) {
                    super("totp", e)
                }
                static _fromServerResponse(e, t) {
                    return new Ft(t)
                }
            }

            function Vt(e, t, n) {
                var r;
                B(0 < (null === (r = n.url) || void 0 === r ? void 0 : r.length), e, "invalid-continue-uri"), B(void 0 === n.dynamicLinkDomain || 0 < n.dynamicLinkDomain.length, e, "invalid-dynamic-link-domain"), t.continueUrl = n.url, t.dynamicLinkDomain = n.dynamicLinkDomain, t.canHandleCodeInApp = n.handleCodeInApp, n.iOS && (B(0 < n.iOS.bundleId.length, e, "missing-ios-bundle-id"), t.iOSBundleId = n.iOS.bundleId), n.android && (B(0 < n.android.packageName.length, e, "missing-android-pkg-name"), t.androidInstallApp = n.android.installApp, t.androidMinimumVersionCode = n.android.minimumVersion, t.androidPackageName = n.android.packageName)
            }
            async function xt(e, t) {
                await re(e = E(e), "POST", "/v1/accounts:update", ne(e, {
                    oobCode: t
                }))
            }
            async function jt(e, t) {
                var n = E(e),
                    r = await Qe(n, {
                        oobCode: t
                    }),
                    i = r.requestType;
                switch (B(i, n, "internal-error"), i) {
                    case "EMAIL_SIGNIN":
                        break;
                    case "VERIFY_AND_CHANGE_EMAIL":
                        B(r.newEmail, n, "internal-error");
                        break;
                    case "REVERT_SECOND_FACTOR_ADDITION":
                        B(r.mfaInfo, n, "internal-error");
                    default:
                        B(r.email, n, "internal-error")
                }
                let s = null;
                return r.mfaInfo && (s = Mt._fromServerResponse(Ge(n), r.mfaInfo)), {
                    data: {
                        email: ("VERIFY_AND_CHANGE_EMAIL" === r.requestType ? r.newEmail : r.email) || null,
                        previousEmail: ("VERIFY_AND_CHANGE_EMAIL" === r.requestType ? r.email : r.newEmail) || null,
                        multiFactorInfo: s
                    },
                    operation: i
                }
            }
            async function Ht(e, t) {
                var n = J() ? $() : "http://localhost",
                    n = (await re(e = E(e), "POST", "/v1/accounts:createAuthUri", ne(e, {
                        identifier: t,
                        continueUri: n
                    })))["signinMethods"];
                return n || []
            }
            async function Wt(e, t) {
                var n = E(e),
                    r = {
                        requestType: "VERIFY_EMAIL",
                        idToken: await e.getIdToken()
                    };
                t && Vt(n.auth, r, t);
                var r = (await tt(n.auth, r))["email"];
                r !== e.email && await e.reload()
            }
            async function qt(e, t, n) {
                var r = E(e),
                    i = {
                        requestType: "VERIFY_AND_CHANGE_EMAIL",
                        idToken: await e.getIdToken(),
                        newEmail: t
                    };
                n && Vt(r.auth, i, n);
                var i = (await tt(r.auth, i))["email"];
                i !== e.email && await e.reload()
            }
            async function zt(e, {
                displayName: t,
                photoURL: n
            }) {
                if (void 0 !== t || void 0 !== n) {
                    const i = E(e);
                    var r = await i.getIdToken(),
                        r = await he(i, async function(e, t) {
                            return re(e, "POST", "/v1/accounts:update", t)
                        }(i.auth, {
                            idToken: r,
                            displayName: t,
                            photoUrl: n,
                            returnSecureToken: !0
                        }));
                    i.displayName = r.displayName || null, i.photoURL = r.photoUrl || null;
                    const s = i.providerData.find(({
                        providerId: e
                    }) => "password" === e);
                    s && (s.displayName = i.displayName, s.photoURL = i.photoURL), await i._updateTokensIfNecessary(r)
                }
            }
            async function Bt(e, t, n) {
                var r = e["auth"];
                const i = {
                    idToken: await e.getIdToken(),
                    returnSecureToken: !0
                };
                t && (i.email = t), n && (i.password = n);
                r = await he(e, Ze(r, i));
                await e._updateTokensIfNecessary(r, !0)
            }
            class Gt {
                constructor(e, t, n = {}) {
                    this.isNewUser = e, this.providerId = t, this.profile = n
                }
            }
            class Kt extends Gt {
                constructor(e, t, n, r) {
                    super(e, t, n), this.username = r
                }
            }
            class $t extends Gt {
                constructor(e, t) {
                    super(e, "facebook.com", t)
                }
            }
            class Jt extends Kt {
                constructor(e, t) {
                    super(e, "github.com", t, "string" == typeof(null == t ? void 0 : t.login) ? null == t ? void 0 : t.login : null)
                }
            }
            class Yt extends Gt {
                constructor(e, t) {
                    super(e, "google.com", t)
                }
            }
            class Xt extends Kt {
                constructor(e, t, n) {
                    super(e, "twitter.com", t, n)
                }
            }

            function Qt(e) {
                var {
                    user: t,
                    _tokenResponse: n
                } = e;
                return t.isAnonymous && !n ? {
                    providerId: null,
                    isNewUser: !1,
                    profile: null
                } : function(e) {
                    if (!e) return null;
                    var t = e["providerId"],
                        n = e.rawUserInfo ? JSON.parse(e.rawUserInfo) : {},
                        r = e.isNewUser || "identitytoolkit#SignupNewUserResponse" === e.kind;
                    if (!t && null != e && e.idToken) {
                        var i = null === (i = null === (i = de(e.idToken)) || void 0 === i ? void 0 : i.firebase) || void 0 === i ? void 0 : i.sign_in_provider;
                        if (i) {
                            i = "anonymous" !== i && "custom" !== i ? i : null;
                            return new Gt(r, i)
                        }
                    }
                    if (!t) return null;
                    switch (t) {
                        case "facebook.com":
                            return new $t(r, n);
                        case "github.com":
                            return new Jt(r, n);
                        case "google.com":
                            return new Yt(r, n);
                        case "twitter.com":
                            return new Xt(r, n, e.screenName || null);
                        case "custom":
                        case "anonymous":
                            return new Gt(r, null);
                        default:
                            return new Gt(r, t, n)
                    }
                }(n)
            }
            class Zt {
                constructor(e, t, n) {
                    this.type = e, this.credential = t, this.user = n
                }
                static _fromIdtoken(e, t) {
                    return new Zt("enroll", e, t)
                }
                static _fromMfaPendingCredential(e) {
                    return new Zt("signin", e)
                }
                toJSON() {
                    return {
                        multiFactorSession: {
                            ["enroll" === this.type ? "idToken" : "pendingCredential"]: this.credential
                        }
                    }
                }
                static fromJSON(e) {
                    var t;
                    if (null != e && e.multiFactorSession) {
                        if (null !== (t = e.multiFactorSession) && void 0 !== t && t.pendingCredential) return Zt._fromMfaPendingCredential(e.multiFactorSession.pendingCredential);
                        if (null !== (t = e.multiFactorSession) && void 0 !== t && t.idToken) return Zt._fromIdtoken(e.multiFactorSession.idToken)
                    }
                    return null
                }
            }
            class en {
                constructor(e, t, n) {
                    this.session = e, this.hints = t, this.signInResolver = n
                }
                static _fromError(e, i) {
                    const s = Ge(e),
                        a = i.customData._serverResponse;
                    var t = (a.mfaInfo || []).map(e => Mt._fromServerResponse(s, e));
                    B(a.mfaPendingCredential, s, "internal-error");
                    const o = Zt._fromMfaPendingCredential(a.mfaPendingCredential);
                    return new en(o, t, async e => {
                        var t = await e._process(s, o);
                        delete a.mfaInfo, delete a.mfaPendingCredential;
                        var n = Object.assign(Object.assign({}, a), {
                            idToken: t.idToken,
                            refreshToken: t.refreshToken
                        });
                        switch (i.operationType) {
                            case "signIn":
                                var r = await wt._fromIdTokenResponse(s, i.operationType, n);
                                return await s._updateCurrentUser(r.user), r;
                            case "reauthenticate":
                                return B(i.user, s, "internal-error"), wt._forOperation(i.user, i.operationType, n);
                            default:
                                j(s, "internal-error")
                        }
                    })
                }
                async resolveSignIn(e) {
                    return this.signInResolver(e)
                }
            }
            class tn {
                constructor(t) {
                    this.user = t, this.enrolledFactors = [], t._onReload(e => {
                        e.mfaInfo && (this.enrolledFactors = e.mfaInfo.map(e => Mt._fromServerResponse(t.auth, e)))
                    })
                }
                static _fromUser(e) {
                    return new tn(e)
                }
                async getSession() {
                    return Zt._fromIdtoken(await this.user.getIdToken(), this.user)
                }
                async enroll(e, t) {
                    const n = e;
                    var r = await this.getSession(),
                        r = await he(this.user, n._process(this.user.auth, r, t));
                    return await this.user._updateTokensIfNecessary(r), this.user.reload()
                }
                async unenroll(e) {
                    const t = "string" == typeof e ? e : e.uid;
                    var n, r, i = await this.user.getIdToken();
                    try {
                        var s = await he(this.user, (n = this.user.auth, r = {
                            idToken: i,
                            mfaEnrollmentId: t
                        }, re(n, "POST", "/v2/accounts/mfaEnrollment:withdraw", ne(n, r))));
                        this.enrolledFactors = this.enrolledFactors.filter(({
                            uid: e
                        }) => e !== t), await this.user._updateTokensIfNecessary(s), await this.user.reload()
                    } catch (e) {
                        throw e
                    }
                }
            }
            const nn = new WeakMap;
            const rn = "__sak";
            class sn {
                constructor(e, t) {
                    this.storageRetriever = e, this.type = t
                }
                _isAvailable() {
                    try {
                        return this.storage ? (this.storage.setItem(rn, "1"), this.storage.removeItem(rn), Promise.resolve(!0)) : Promise.resolve(!1)
                    } catch (e) {
                        return Promise.resolve(!1)
                    }
                }
                _set(e, t) {
                    return this.storage.setItem(e, JSON.stringify(t)), Promise.resolve()
                }
                _get(e) {
                    var t = this.storage.getItem(e);
                    return Promise.resolve(t ? JSON.parse(t) : null)
                }
                _remove(e) {
                    return this.storage.removeItem(e), Promise.resolve()
                }
                get storage() {
                    return this.storageRetriever()
                }
            }
            class an extends sn {
                constructor() {
                    var e;
                    super(() => window.localStorage, "LOCAL"), this.boundEventHandler = (e, t) => this.onStorageEvent(e, t), this.listeners = {}, this.localCache = {}, this.pollTimer = null, this.safariLocalStorageNotSynced = (Ae(e = d()) || Le(e)) && function() {
                        try {
                            return !(!window || window === window.top)
                        } catch (e) {
                            return !1
                        }
                    }(), this.fallbackToPolling = De(), this._shouldAllowMigration = !0
                }
                forAllChangedKeys(e) {
                    for (const r of Object.keys(this.listeners)) {
                        var t = this.storage.getItem(r),
                            n = this.localCache[r];
                        t !== n && e(r, n, t)
                    }
                }
                onStorageEvent(e, t = !1) {
                    if (e.key) {
                        const r = e.key;
                        if (t ? this.detachListener() : this.stopPolling(), this.safariLocalStorageNotSynced) {
                            const i = this.storage.getItem(r);
                            if (e.newValue !== i) null !== e.newValue ? this.storage.setItem(r, e.newValue) : this.storage.removeItem(r);
                            else if (this.localCache[r] === e.newValue && !t) return
                        }
                        var n = () => {
                            var e = this.storage.getItem(r);
                            !t && this.localCache[r] === e || this.notifyListeners(r, e)
                        };
                        const i = this.storage.getItem(r);
                        v() && 10 === document.documentMode && i !== e.newValue && e.newValue !== e.oldValue ? setTimeout(n, 10) : n()
                    } else this.forAllChangedKeys((e, t, n) => {
                        this.notifyListeners(e, n)
                    })
                }
                notifyListeners(e, t) {
                    this.localCache[e] = t;
                    var n = this.listeners[e];
                    if (n)
                        for (const r of Array.from(n)) r(t && JSON.parse(t))
                }
                startPolling() {
                    this.stopPolling(), this.pollTimer = setInterval(() => {
                        this.forAllChangedKeys((e, t, n) => {
                            this.onStorageEvent(new StorageEvent("storage", {
                                key: e,
                                oldValue: t,
                                newValue: n
                            }), !0)
                        })
                    }, 1e3)
                }
                stopPolling() {
                    this.pollTimer && (clearInterval(this.pollTimer), this.pollTimer = null)
                }
                attachListener() {
                    window.addEventListener("storage", this.boundEventHandler)
                }
                detachListener() {
                    window.removeEventListener("storage", this.boundEventHandler)
                }
                _addListener(e, t) {
                    0 === Object.keys(this.listeners).length && (this.fallbackToPolling ? this.startPolling() : this.attachListener()), this.listeners[e] || (this.listeners[e] = new Set, this.localCache[e] = this.storage.getItem(e)), this.listeners[e].add(t)
                }
                _removeListener(e, t) {
                    this.listeners[e] && (this.listeners[e].delete(t), 0 === this.listeners[e].size && delete this.listeners[e]), 0 === Object.keys(this.listeners).length && (this.detachListener(), this.stopPolling())
                }
                async _set(e, t) {
                    await super._set(e, t), this.localCache[e] = JSON.stringify(t)
                }
                async _get(e) {
                    var t = await super._get(e);
                    return this.localCache[e] = JSON.stringify(t), t
                }
                async _remove(e) {
                    await super._remove(e), delete this.localCache[e]
                }
            }
            an.type = "LOCAL";
            const on = an;
            class cn extends sn {
                constructor() {
                    super(() => window.sessionStorage, "SESSION")
                }
                _addListener(e, t) {}
                _removeListener(e, t) {}
            }
            cn.type = "SESSION";
            const ln = cn;
            class un {
                constructor(e) {
                    this.eventTarget = e, this.handlersMap = {}, this.boundEventHandler = this.handleEvent.bind(this)
                }
                static _getInstance(t) {
                    var e = this.receivers.find(e => e.isListeningto(t));
                    if (e) return e;
                    e = new un(t);
                    return this.receivers.push(e), e
                }
                isListeningto(e) {
                    return this.eventTarget === e
                }
                async handleEvent(e) {
                    const t = e,
                        {
                            eventId: n,
                            eventType: r,
                            data: i
                        } = t.data;
                    var s = this.handlersMap[r];
                    null != s && s.size && (t.ports[0].postMessage({
                        status: "ack",
                        eventId: n,
                        eventType: r
                    }), s = Array.from(s).map(async e => e(t.origin, i)), s = await Promise.all(s.map(async e => {
                        try {
                            return {
                                fulfilled: !0,
                                value: await e
                            }
                        } catch (e) {
                            return {
                                fulfilled: !1,
                                reason: e
                            }
                        }
                    })), t.ports[0].postMessage({
                        status: "done",
                        eventId: n,
                        eventType: r,
                        response: s
                    }))
                }
                _subscribe(e, t) {
                    0 === Object.keys(this.handlersMap).length && this.eventTarget.addEventListener("message", this.boundEventHandler), this.handlersMap[e] || (this.handlersMap[e] = new Set), this.handlersMap[e].add(t)
                }
                _unsubscribe(e, t) {
                    this.handlersMap[e] && t && this.handlersMap[e].delete(t), t && 0 !== this.handlersMap[e].size || delete this.handlersMap[e], 0 === Object.keys(this.handlersMap).length && this.eventTarget.removeEventListener("message", this.boundEventHandler)
                }
            }

            function dn(e = "", t = 10) {
                let n = "";
                for (let r = 0; r < t; r++) n += Math.floor(10 * Math.random());
                return e + n
            }
            un.receivers = [];
            class hn {
                constructor(e) {
                    this.target = e, this.handlers = new Set
                }
                removeMessageHandler(e) {
                    e.messageChannel && (e.messageChannel.port1.removeEventListener("message", e.onMessage), e.messageChannel.port1.close()), this.handlers.delete(e)
                }
                async _send(e, t, a = 50) {
                    const o = "undefined" != typeof MessageChannel ? new MessageChannel : null;
                    if (!o) throw new Error("connection_unavailable");
                    let c, l;
                    return new Promise((n, r) => {
                        const i = dn("", 20);
                        o.port1.start();
                        const s = setTimeout(() => {
                            r(new Error("unsupported_event"))
                        }, a);
                        l = {
                            messageChannel: o,
                            onMessage(e) {
                                var t = e;
                                if (t.data.eventId === i) switch (t.data.status) {
                                    case "ack":
                                        clearTimeout(s), c = setTimeout(() => {
                                            r(new Error("timeout"))
                                        }, 3e3);
                                        break;
                                    case "done":
                                        clearTimeout(c), n(t.data.response);
                                        break;
                                    default:
                                        clearTimeout(s), clearTimeout(c), r(new Error("invalid_response"))
                                }
                            }
                        }, this.handlers.add(l), o.port1.addEventListener("message", l.onMessage), this.target.postMessage({
                            eventType: e,
                            eventId: i,
                            data: t
                        }, [o.port2])
                    }).finally(() => {
                        l && this.removeMessageHandler(l)
                    })
                }
            }

            function pn() {
                return window
            }

            function fn() {
                return void 0 !== pn().WorkerGlobalScope && "function" == typeof pn().importScripts
            }
            const vn = "firebaseLocalStorageDb",
                gn = "firebaseLocalStorage",
                mn = "fbase_key";
            class _n {
                constructor(e) {
                    this.request = e
                }
                toPromise() {
                    return new Promise((e, t) => {
                        this.request.addEventListener("success", () => {
                            e(this.request.result)
                        }), this.request.addEventListener("error", () => {
                            t(this.request.error)
                        })
                    })
                }
            }

            function yn(e, t) {
                return e.transaction([gn], t ? "readwrite" : "readonly").objectStore(gn)
            }

            function In() {
                const r = indexedDB.open(vn, 1);
                return new Promise((n, t) => {
                    r.addEventListener("error", () => {
                        t(r.error)
                    }), r.addEventListener("upgradeneeded", () => {
                        const e = r.result;
                        try {
                            e.createObjectStore(gn, {
                                keyPath: mn
                            })
                        } catch (e) {
                            t(e)
                        }
                    }), r.addEventListener("success", async () => {
                        const e = r.result;
                        var t;
                        e.objectStoreNames.contains(gn) ? n(e) : (e.close(), t = indexedDB.deleteDatabase(vn), await new _n(t).toPromise(), n(await In()))
                    })
                })
            }
            async function wn(e, t, n) {
                var r = yn(e, !0).put({
                    fbase_key: t,
                    value: n
                });
                return new _n(r).toPromise()
            }

            function Tn(e, t) {
                var n = yn(e, !0).delete(t);
                return new _n(n).toPromise()
            }
            class bn {
                constructor() {
                    this.type = "LOCAL", this._shouldAllowMigration = !0, this.listeners = {}, this.localCache = {}, this.pollTimer = null, this.pendingWrites = 0, this.receiver = null, this.sender = null, this.serviceWorkerReceiverAvailable = !1, this.activeServiceWorker = null, this._workerInitializationPromise = this.initializeServiceWorkerMessaging().then(() => {}, () => {})
                }
                async _openDb() {
                    return this.db || (this.db = await In(), this.db)
                }
                async _withRetries(e) {
                    let t = 0;
                    for (;;) try {
                        return e(await this._openDb())
                    } catch (e) {
                        if (3 < t++) throw e;
                        this.db && (this.db.close(), this.db = void 0)
                    }
                }
                async initializeServiceWorkerMessaging() {
                    return fn() ? this.initializeReceiver() : this.initializeSender()
                }
                async initializeReceiver() {
                    this.receiver = un._getInstance(fn() ? self : null), this.receiver._subscribe("keyChanged", async (e, t) => {
                        const n = await this._poll();
                        return {
                            keyProcessed: n.includes(t.key)
                        }
                    }), this.receiver._subscribe("ping", async (e, t) => ["keyChanged"])
                }
                async initializeSender() {
                    var e, t, n;
                    this.activeServiceWorker = await async function() {
                        if (null === navigator || void 0 === navigator || !navigator.serviceWorker) return null;
                        try {
                            return (await navigator.serviceWorker.ready).active
                        } catch (e) {
                            return null
                        }
                    }(), this.activeServiceWorker && (this.sender = new hn(this.activeServiceWorker), (n = await this.sender._send("ping", {}, 800)) && null !== (e = n[0]) && void 0 !== e && e.fulfilled && null !== (t = n[0]) && void 0 !== t && t.value.includes("keyChanged") && (this.serviceWorkerReceiverAvailable = !0))
                }
                async notifyServiceWorker(e) {
                    var t;
                    if (this.sender && this.activeServiceWorker && ((null === (t = null === navigator || void 0 === navigator ? void 0 : navigator.serviceWorker) || void 0 === t ? void 0 : t.controller) || null) === this.activeServiceWorker) try {
                        await this.sender._send("keyChanged", {
                            key: e
                        }, this.serviceWorkerReceiverAvailable ? 800 : 50)
                    } catch (e) {}
                }
                async _isAvailable() {
                    try {
                        if (!indexedDB) return !1;
                        var e = await In();
                        return await wn(e, rn, "1"), await Tn(e, rn), !0
                    } catch (e) {}
                    return !1
                }
                async _withPendingWrite(e) {
                    this.pendingWrites++;
                    try {
                        await e()
                    } finally {
                        this.pendingWrites--
                    }
                }
                async _set(t, n) {
                    return this._withPendingWrite(async () => (await this._withRetries(e => wn(e, t, n)), this.localCache[t] = n, this.notifyServiceWorker(t)))
                }
                async _get(t) {
                    var e = await this._withRetries(e => async function(e, t) {
                        var n = yn(e, !1).get(t);
                        return void 0 === (n = await new _n(n).toPromise()) ? null : n.value
                    }(e, t));
                    return this.localCache[t] = e
                }
                async _remove(t) {
                    return this._withPendingWrite(async () => (await this._withRetries(e => Tn(e, t)), delete this.localCache[t], this.notifyServiceWorker(t)))
                }
                async _poll() {
                    var e, t, n = await this._withRetries(e => {
                        var t = yn(e, !1).getAll();
                        return new _n(t).toPromise()
                    });
                    if (!n) return [];
                    if (0 !== this.pendingWrites) return [];
                    const r = [],
                        i = new Set;
                    for ({
                            fbase_key: e,
                            value: t
                        } of n) i.add(e), JSON.stringify(this.localCache[e]) !== JSON.stringify(t) && (this.notifyListeners(e, t), r.push(e));
                    for (const s of Object.keys(this.localCache)) this.localCache[s] && !i.has(s) && (this.notifyListeners(s, null), r.push(s));
                    return r
                }
                notifyListeners(e, t) {
                    this.localCache[e] = t;
                    var n = this.listeners[e];
                    if (n)
                        for (const r of Array.from(n)) r(t)
                }
                startPolling() {
                    this.stopPolling(), this.pollTimer = setInterval(async () => this._poll(), 800)
                }
                stopPolling() {
                    this.pollTimer && (clearInterval(this.pollTimer), this.pollTimer = null)
                }
                _addListener(e, t) {
                    0 === Object.keys(this.listeners).length && this.startPolling(), this.listeners[e] || (this.listeners[e] = new Set, this._get(e)), this.listeners[e].add(t)
                }
                _removeListener(e, t) {
                    this.listeners[e] && (this.listeners[e].delete(t), 0 === this.listeners[e].size && delete this.listeners[e]), 0 === Object.keys(this.listeners).length && this.stopPolling()
                }
            }
            bn.type = "LOCAL";
            const kn = bn;
            class En {
                constructor(e) {
                    this.auth = e, this.counter = 1e12, this._widgets = new Map
                }
                render(e, t) {
                    var n = this.counter;
                    return this._widgets.set(n, new Rn(e, this.auth.name, t || {})), this.counter++, n
                }
                reset(e) {
                    var t, n = e || 1e12;
                    null === (t = this._widgets.get(n)) || void 0 === t || t.delete(), this._widgets.delete(n)
                }
                getResponse(e) {
                    var t;
                    return (null === (t = this._widgets.get(e || 1e12)) || void 0 === t ? void 0 : t.getResponse()) || ""
                }
                async execute(e) {
                    var t;
                    return null === (t = this._widgets.get(e || 1e12)) || void 0 === t || t.execute(), ""
                }
            }
            class Rn {
                constructor(e, t, n) {
                    this.params = n, this.timerId = null, this.deleted = !1, this.responseToken = null, this.clickHandler = () => {
                        this.execute()
                    };
                    var r = "string" == typeof e ? document.getElementById(e) : e;
                    B(r, "argument-error", {
                        appName: t
                    }), this.container = r, this.isVisible = "invisible" !== this.params.size, this.isVisible ? this.execute() : this.container.addEventListener("click", this.clickHandler)
                }
                getResponse() {
                    return this.checkIfDeleted(), this.responseToken
                }
                delete() {
                    this.checkIfDeleted(), this.deleted = !0, this.timerId && (clearTimeout(this.timerId), this.timerId = null), this.container.removeEventListener("click", this.clickHandler)
                }
                execute() {
                    this.checkIfDeleted(), this.timerId || (this.timerId = window.setTimeout(() => {
                        this.responseToken = function(e) {
                            const t = [],
                                n = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
                            for (let r = 0; r < e; r++) t.push(n.charAt(Math.floor(Math.random() * n.length)));
                            return t.join("")
                        }(50);
                        const {
                            callback: e,
                            "expired-callback": t
                        } = this.params;
                        if (e) try {
                            e(this.responseToken)
                        } catch (e) {}
                        this.timerId = window.setTimeout(() => {
                            if (this.timerId = null, this.responseToken = null, t) try {
                                t()
                            } catch (e) {}
                            this.isVisible && this.execute()
                        }, 6e4)
                    }, 500))
                }
                checkIfDeleted() {
                    if (this.deleted) throw new Error("reCAPTCHA mock was already deleted!")
                }
            }
            const An = He("rcb"),
                Sn = new X(3e4, 6e4);
            class Cn {
                constructor() {
                    var e;
                    this.hostLanguage = "", this.counter = 0, this.librarySeparatelyLoaded = !(null === (e = pn().grecaptcha) || void 0 === e || !e.render)
                }
                load(s, a = "") {
                    var e;
                    return B((e = a).length <= 6 && /^\s*[a-zA-Z0-9\-]*\s*$/.test(e), s, "argument-error"), this.shouldResolveImmediately(a) && Fe(pn().grecaptcha) ? Promise.resolve(pn().grecaptcha) : new Promise((t, n) => {
                        const i = pn().setTimeout(() => {
                            n(H(s, "network-request-failed"))
                        }, Sn.get());
                        pn()[An] = () => {
                            pn().clearTimeout(i), delete pn()[An];
                            const e = pn().grecaptcha;
                            if (e && Fe(e)) {
                                const r = e.render;
                                e.render = (e, t) => {
                                    var n = r(e, t);
                                    return this.counter++, n
                                }, this.hostLanguage = a, t(e)
                            } else n(H(s, "internal-error"))
                        }, je(`https://www.google.com/recaptcha/api.js??${I({onload:An,render:"explicit",hl:a})}`).catch(() => {
                            clearTimeout(i), n(H(s, "internal-error"))
                        })
                    })
                }
                clearedOneInstance() {
                    this.counter--
                }
                shouldResolveImmediately(e) {
                    var t;
                    return !(null === (t = pn().grecaptcha) || void 0 === t || !t.render) && (e === this.hostLanguage || 0 < this.counter || this.librarySeparatelyLoaded)
                }
            }
            class Pn {
                async load(e) {
                    return new En(e)
                }
                clearedOneInstance() {}
            }
            const Nn = "recaptcha",
                On = {
                    theme: "light",
                    type: "image"
                };
            class Ln {
                constructor(e, t = Object.assign({}, On), n) {
                    this.parameters = t, this.type = Nn, this.destroyed = !1, this.widgetId = null, this.tokenChangeListeners = new Set, this.renderPromise = null, this.recaptcha = null, this.auth = Ge(n), this.isInvisible = "invisible" === this.parameters.size, B("undefined" != typeof document, this.auth, "operation-not-supported-in-this-environment");
                    var r = "string" == typeof e ? document.getElementById(e) : e;
                    B(r, this.auth, "argument-error"), this.container = r, this.parameters.callback = this.makeTokenCallback(this.parameters.callback), this._recaptchaLoader = new(this.auth.settings.appVerificationDisabledForTesting ? Pn : Cn), this.validateStartingState()
                }
                async verify() {
                    this.assertNotDestroyed();
                    const e = await this.render(),
                        r = this.getAssertedRecaptcha();
                    var t = r.getResponse(e);
                    return t || new Promise(t => {
                        const n = e => {
                            e && (this.tokenChangeListeners.delete(n), t(e))
                        };
                        this.tokenChangeListeners.add(n), this.isInvisible && r.execute(e)
                    })
                }
                render() {
                    try {
                        this.assertNotDestroyed()
                    } catch (e) {
                        return Promise.reject(e)
                    }
                    return this.renderPromise || (this.renderPromise = this.makeRenderPromise().catch(e => {
                        throw this.renderPromise = null, e
                    }), this.renderPromise)
                }
                _reset() {
                    this.assertNotDestroyed(), null !== this.widgetId && this.getAssertedRecaptcha().reset(this.widgetId)
                }
                clear() {
                    this.assertNotDestroyed(), this.destroyed = !0, this._recaptchaLoader.clearedOneInstance(), this.isInvisible || this.container.childNodes.forEach(e => {
                        this.container.removeChild(e)
                    })
                }
                validateStartingState() {
                    B(!this.parameters.sitekey, this.auth, "argument-error"), B(this.isInvisible || !this.container.hasChildNodes(), this.auth, "argument-error"), B("undefined" != typeof document, this.auth, "operation-not-supported-in-this-environment")
                }
                makeTokenCallback(n) {
                    return t => {
                        if (this.tokenChangeListeners.forEach(e => e(t)), "function" == typeof n) n(t);
                        else if ("string" == typeof n) {
                            const e = pn()[n];
                            "function" == typeof e && e(t)
                        }
                    }
                }
                assertNotDestroyed() {
                    B(!this.destroyed, this.auth, "internal-error")
                }
                async makeRenderPromise() {
                    if (await this.init(), !this.widgetId) {
                        let e = this.container;
                        var t;
                        this.isInvisible || (t = document.createElement("div"), e.appendChild(t), e = t), this.widgetId = this.getAssertedRecaptcha().render(e, this.parameters)
                    }
                    return this.widgetId
                }
                async init() {
                    B(J() && !fn(), this.auth, "internal-error"), await
                    function() {
                        let t = null;
                        return new Promise(e => {
                            "complete" !== document.readyState ? (t = () => e(), window.addEventListener("load", t)) : e()
                        }).catch(e => {
                            throw t && window.removeEventListener("load", t), e
                        })
                    }(), this.recaptcha = await this._recaptchaLoader.load(this.auth, this.auth.languageCode || void 0);
                    var e = await ((await re(this.auth, "GET", "/v1/recaptchaParams")).recaptchaSiteKey || "");
                    B(e, this.auth, "internal-error"), this.parameters.sitekey = e
                }
                getAssertedRecaptcha() {
                    return B(this.recaptcha, this.auth, "internal-error"), this.recaptcha
                }
            }
            class Dn {
                constructor(e, t) {
                    this.verificationId = e, this.onConfirmation = t
                }
                confirm(e) {
                    var t = ct._fromVerification(this.verificationId, e);
                    return this.onConfirmation(t)
                }
            }
            async function Mn(t, n, r) {
                var i, s, a, o, c, l, u = await r.verify();
                try {
                    B("string" == typeof u, t, "argument-error"), B(r.type === Nn, t, "argument-error");
                    let e;
                    if (e = "string" == typeof n ? {
                            phoneNumber: n
                        } : n, "session" in e) {
                        var d = e.session;
                        if ("phoneNumber" in e) return B("enroll" === d.type, t, "internal-error"), (c = t, l = {
                            idToken: d.credential,
                            phoneEnrollmentInfo: {
                                phoneNumber: e.phoneNumber,
                                recaptchaToken: u
                            }
                        }, await re(c, "POST", "/v2/accounts/mfaEnrollment:start", ne(c, l))).phoneSessionInfo.sessionInfo;
                        B("signin" === d.type, t, "internal-error");
                        var h = (null === (i = e.multiFactorHint) || void 0 === i ? void 0 : i.uid) || e.multiFactorUid;
                        return B(h, t, "missing-multi-factor-info"), (o = {
                            mfaPendingCredential: d.credential,
                            mfaEnrollmentId: h,
                            phoneSignInInfo: {
                                recaptchaToken: u
                            }
                        }, await re(t, "POST", "/v2/accounts/mfaSignIn:start", ne(t, o))).phoneResponseInfo.sessionInfo
                    }
                    var p = (s = t, a = {
                        phoneNumber: e.phoneNumber,
                        recaptchaToken: u
                    }, await re(s, "POST", "/v1/accounts:sendVerificationCode", ne(s, a)))["sessionInfo"];
                    return p
                } finally {
                    r._reset()
                }
            }
            class Un {
                constructor(e) {
                    this.providerId = Un.PROVIDER_ID, this.auth = Ge(e)
                }
                verifyPhoneNumber(e, t) {
                    return Mn(this.auth, e, E(t))
                }
                static credential(e, t) {
                    return ct._fromVerification(e, t)
                }
                static credentialFromResult(e) {
                    var t = e;
                    return Un.credentialFromTaggedObject(t)
                }
                static credentialFromError(e) {
                    return Un.credentialFromTaggedObject(e.customData || {})
                }
                static credentialFromTaggedObject({
                    _tokenResponse: e
                }) {
                    if (!e) return null;
                    var {
                        phoneNumber: t,
                        temporaryProof: n
                    } = e;
                    return t && n ? ct._fromTokenResponse(t, n) : null
                }
            }

            function Fn(e, t) {
                return t ? Ie(t) : (B(e._popupRedirectResolver, e, "argument-error"), e._popupRedirectResolver)
            }
            Un.PROVIDER_ID = "phone", Un.PHONE_SIGN_IN_METHOD = "phone";
            class Vn extends Xe {
                constructor(e) {
                    super("custom", "custom"), this.params = e
                }
                _getIdTokenResponse(e) {
                    return st(e, this._buildIdpRequest())
                }
                _linkToIdToken(e, t) {
                    return st(e, this._buildIdpRequest(t))
                }
                _getReauthenticationResolver(e) {
                    return st(e, this._buildIdpRequest())
                }
                _buildIdpRequest(e) {
                    const t = {
                        requestUri: this.params.requestUri,
                        sessionId: this.params.sessionId,
                        postBody: this.params.postBody,
                        tenantId: this.params.tenantId,
                        pendingToken: this.params.pendingToken,
                        returnSecureToken: !0,
                        returnIdpCredential: !0
                    };
                    return e && (t.idToken = e), t
                }
            }

            function xn(e) {
                return Pt(e.auth, new Vn(e), e.bypassAuthState)
            }

            function jn(e) {
                var {
                    auth: t,
                    user: n
                } = e;
                return B(n, t, "internal-error"), Ct(n, new Vn(e), e.bypassAuthState)
            }
            async function Hn(e) {
                var {
                    auth: t,
                    user: n
                } = e;
                return B(n, t, "internal-error"), At(n, new Vn(e), e.bypassAuthState)
            }
            class Wn {
                constructor(e, t, n, r, i = !1) {
                    this.auth = e, this.resolver = n, this.user = r, this.bypassAuthState = i, this.pendingPromise = null, this.eventManager = null, this.filter = Array.isArray(t) ? t : [t]
                }
                execute() {
                    return new Promise(async (e, t) => {
                        this.pendingPromise = {
                            resolve: e,
                            reject: t
                        };
                        try {
                            this.eventManager = await this.resolver._initialize(this.auth), await this.onExecution(), this.eventManager.registerConsumer(this)
                        } catch (e) {
                            this.reject(e)
                        }
                    })
                }
                async onAuthEvent(e) {
                    var {
                        urlResponse: t,
                        sessionId: n,
                        postBody: r,
                        tenantId: i,
                        error: s,
                        type: a
                    } = e;
                    if (s) this.reject(s);
                    else {
                        r = {
                            auth: this.auth,
                            requestUri: t,
                            sessionId: n,
                            tenantId: i || void 0,
                            postBody: r || void 0,
                            user: this.user,
                            bypassAuthState: this.bypassAuthState
                        };
                        try {
                            this.resolve(await this.getIdpTask(a)(r))
                        } catch (e) {
                            this.reject(e)
                        }
                    }
                }
                onError(e) {
                    this.reject(e)
                }
                getIdpTask(e) {
                    switch (e) {
                        case "signInViaPopup":
                        case "signInViaRedirect":
                            return xn;
                        case "linkViaPopup":
                        case "linkViaRedirect":
                            return Hn;
                        case "reauthViaPopup":
                        case "reauthViaRedirect":
                            return jn;
                        default:
                            j(this.auth, "internal-error")
                    }
                }
                resolve(e) {
                    K(this.pendingPromise, "Pending promise was never set"), this.pendingPromise.resolve(e), this.unregisterAndCleanUp()
                }
                reject(e) {
                    K(this.pendingPromise, "Pending promise was never set"), this.pendingPromise.reject(e), this.unregisterAndCleanUp()
                }
                unregisterAndCleanUp() {
                    this.eventManager && this.eventManager.unregisterConsumer(this), this.pendingPromise = null, this.cleanUp()
                }
            }
            const qn = new X(2e3, 1e4);
            class zn extends Wn {
                constructor(e, t, n, r, i) {
                    super(e, t, r, i), this.provider = n, this.authWindow = null, this.pollId = null, zn.currentPopupAction && zn.currentPopupAction.cancel(), zn.currentPopupAction = this
                }
                async executeNotNull() {
                    var e = await this.execute();
                    return B(e, this.auth, "internal-error"), e
                }
                async onExecution() {
                    K(1 === this.filter.length, "Popup operations only handle one event");
                    var e = dn();
                    this.authWindow = await this.resolver._openPopup(this.auth, this.provider, this.filter[0], e), this.authWindow.associatedEvent = e, this.resolver._originValidation(this.auth).catch(e => {
                        this.reject(e)
                    }), this.resolver._isIframeWebStorageSupported(this.auth, e => {
                        e || this.reject(H(this.auth, "web-storage-unsupported"))
                    }), this.pollUserCancellation()
                }
                get eventId() {
                    var e;
                    return (null === (e = this.authWindow) || void 0 === e ? void 0 : e.associatedEvent) || null
                }
                cancel() {
                    this.reject(H(this.auth, "cancelled-popup-request"))
                }
                cleanUp() {
                    this.authWindow && this.authWindow.close(), this.pollId && window.clearTimeout(this.pollId), this.authWindow = null, this.pollId = null, zn.currentPopupAction = null
                }
                pollUserCancellation() {
                    const t = () => {
                        var e;
                        null !== (e = null === (e = this.authWindow) || void 0 === e ? void 0 : e.window) && void 0 !== e && e.closed ? this.pollId = window.setTimeout(() => {
                            this.pollId = null, this.reject(H(this.auth, "popup-closed-by-user"))
                        }, 8e3) : this.pollId = window.setTimeout(t, qn.get())
                    };
                    t()
                }
            }
            zn.currentPopupAction = null;
            const Bn = "pendingRedirect",
                Gn = new Map;
            class Kn extends Wn {
                constructor(e, t, n = !1) {
                    super(e, ["signInViaRedirect", "linkViaRedirect", "reauthViaRedirect", "unknown"], t, void 0, n), this.eventId = null
                }
                async execute() {
                    let t = Gn.get(this.auth._key());
                    if (!t) {
                        try {
                            const e = await async function(e, t) {
                                const n = Xn(t),
                                    r = Yn(e);
                                if (!await r._isAvailable()) return !1;
                                var i = "true" === await r._get(n);
                                return await r._remove(n), i
                            }(this.resolver, this.auth) ? await super.execute() : null;
                            t = () => Promise.resolve(e)
                        } catch (e) {
                            t = () => Promise.reject(e)
                        }
                        Gn.set(this.auth._key(), t)
                    }
                    return this.bypassAuthState || Gn.set(this.auth._key(), () => Promise.resolve(null)), t()
                }
                async onAuthEvent(e) {
                    if ("signInViaRedirect" === e.type) return super.onAuthEvent(e);
                    if ("unknown" !== e.type) {
                        if (e.eventId) {
                            var t = await this.auth._redirectUserForId(e.eventId);
                            if (t) return this.user = t, super.onAuthEvent(e);
                            this.resolve(null)
                        }
                    } else this.resolve(null)
                }
                async onExecution() {}
                cleanUp() {}
            }
            async function $n(e, t) {
                return Yn(e)._set(Xn(t), "true")
            }

            function Jn(e, t) {
                Gn.set(e._key(), t)
            }

            function Yn(e) {
                return Ie(e._redirectPersistence)
            }

            function Xn(e) {
                return be(Bn, e.config.apiKey, e.name)
            }

            function Qn(e, t, n) {
                return async function(e, t, n) {
                    var r = Ge(e);
                    q(e, t, dt), await r._initializationPromise;
                    const i = Fn(r, n);
                    return await $n(i, r), i._openRedirect(r, t, "signInViaRedirect")
                }(e, t, n)
            }

            function Zn(e, t, n) {
                return async function(e, t, n) {
                    var r = E(e);
                    q(r.auth, t, dt), await r.auth._initializationPromise;
                    const i = Fn(r.auth, n);
                    await $n(i, r.auth);
                    var s = await nr(r);
                    return i._openRedirect(r.auth, t, "reauthViaRedirect", s)
                }(e, t, n)
            }

            function er(e, t, n) {
                return async function(e, t, n) {
                    var r = E(e);
                    q(r.auth, t, dt), await r.auth._initializationPromise;
                    const i = Fn(r.auth, n);
                    await St(!1, r, t.providerId), await $n(i, r.auth);
                    var s = await nr(r);
                    return i._openRedirect(r.auth, t, "linkViaRedirect", s)
                }(e, t, n)
            }
            async function tr(e, t, n = !1) {
                const r = Ge(e);
                var i = Fn(r, t);
                const s = new Kn(r, i, n),
                    a = await s.execute();
                return a && !n && (delete a.user._redirectEventId, await r._persistUserIfCurrent(a.user), await r._setRedirectUser(null, t)), a
            }
            async function nr(e) {
                var t = dn(`${e.uid}:::`);
                return e._redirectEventId = t, await e.auth._setRedirectUser(e), await e.auth._persistUserIfCurrent(e), t
            }
            class rr {
                constructor(e) {
                    this.auth = e, this.cachedEventUids = new Set, this.consumers = new Set, this.queuedRedirectEvent = null, this.hasHandledPotentialRedirect = !1, this.lastProcessedEventTime = Date.now()
                }
                registerConsumer(e) {
                    this.consumers.add(e), this.queuedRedirectEvent && this.isEventForConsumer(this.queuedRedirectEvent, e) && (this.sendToConsumer(this.queuedRedirectEvent, e), this.saveEventToCache(this.queuedRedirectEvent), this.queuedRedirectEvent = null)
                }
                unregisterConsumer(e) {
                    this.consumers.delete(e)
                }
                onEvent(t) {
                    if (this.hasEventBeenHandled(t)) return !1;
                    let n = !1;
                    return this.consumers.forEach(e => {
                        this.isEventForConsumer(t, e) && (n = !0, this.sendToConsumer(t, e), this.saveEventToCache(t))
                    }), this.hasHandledPotentialRedirect || ! function(e) {
                        switch (e.type) {
                            case "signInViaRedirect":
                            case "linkViaRedirect":
                            case "reauthViaRedirect":
                                return !0;
                            case "unknown":
                                return sr(e);
                            default:
                                return !1
                        }
                    }(t) || (this.hasHandledPotentialRedirect = !0, n || (this.queuedRedirectEvent = t, n = !0)), n
                }
                sendToConsumer(e, t) {
                    var n;
                    e.error && !sr(e) ? (n = (null === (n = e.error.code) || void 0 === n ? void 0 : n.split("auth/")[1]) || "internal-error", t.onError(H(this.auth, n))) : t.onAuthEvent(e)
                }
                isEventForConsumer(e, t) {
                    var n = null === t.eventId || !!e.eventId && e.eventId === t.eventId;
                    return t.filter.includes(e.type) && n
                }
                hasEventBeenHandled(e) {
                    return 6e5 <= Date.now() - this.lastProcessedEventTime && this.cachedEventUids.clear(), this.cachedEventUids.has(ir(e))
                }
                saveEventToCache(e) {
                    this.cachedEventUids.add(ir(e)), this.lastProcessedEventTime = Date.now()
                }
            }

            function ir(e) {
                return [e.type, e.eventId, e.sessionId, e.tenantId].filter(e => e).join("-")
            }

            function sr({
                type: e,
                error: t
            }) {
                return "unknown" === e && "auth/no-auth-event" === (null == t ? void 0 : t.code)
            }
            async function ar(e, t = {}) {
                return re(e, "GET", "/v1/projects", t)
            }
            const or = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
                cr = /^https?/;
            async function lr(e) {
                if (!e.config.emulator) {
                    var t = (await ar(e))["authorizedDomains"];
                    for (const n of t) try {
                        if (function(e) {
                                const t = $(),
                                    {
                                        protocol: n,
                                        hostname: r
                                    } = new URL(t);
                                if (e.startsWith("chrome-extension://")) {
                                    var i = new URL(e);
                                    return "" === i.hostname && "" === r ? "chrome-extension:" === n && e.replace("chrome-extension://", "") === t.replace("chrome-extension://", "") : "chrome-extension:" === n && i.hostname === r
                                }
                                if (!cr.test(n)) return !1;
                                if (or.test(e)) return r === e;
                                const s = e.replace(/\./g, "\\."),
                                    a = new RegExp("^(.+\\." + s + "|" + s + ")$", "i");
                                return a.test(r)
                            }(n)) return
                    } catch (e) {}
                    j(e, "unauthorized-domain")
                }
            }
            const ur = new X(3e4, 6e4);

            function dr() {
                const t = pn().___jsl;
                if (null !== t && void 0 !== t && t.H)
                    for (const n of Object.keys(t.H))
                        if (t.H[n].r = t.H[n].r || [], t.H[n].L = t.H[n].L || [], t.H[n].r = [...t.H[n].L], t.CP)
                            for (let e = 0; e < t.CP.length; e++) t.CP[e] = null
            }
            let hr = null;

            function pr(e) {
                var i;
                return hr = hr || (i = e, new Promise((e, t) => {
                    function n() {
                        dr(), gapi.load("gapi.iframes", {
                            callback: () => {
                                e(gapi.iframes.getContext())
                            },
                            ontimeout: () => {
                                dr(), t(H(i, "network-request-failed"))
                            },
                            timeout: ur.get()
                        })
                    }
                    if (null !== (r = null === (r = pn().gapi) || void 0 === r ? void 0 : r.iframes) && void 0 !== r && r.Iframe) e(gapi.iframes.getContext());
                    else {
                        if (null === (r = pn().gapi) || void 0 === r || !r.load) {
                            var r = He("iframefcb");
                            return pn()[r] = () => {
                                gapi.load ? n() : t(H(i, "network-request-failed"))
                            }, je(`https://apis.google.com/js/api.js?onload=${r}`).catch(e => t(e))
                        }
                        n()
                    }
                }).catch(e => {
                    throw hr = null, e
                })), hr
            }
            const fr = new X(5e3, 15e3),
                vr = "__/auth/iframe",
                gr = "emulator/auth/iframe",
                mr = {
                    style: {
                        position: "absolute",
                        top: "-100px",
                        width: "1px",
                        height: "1px"
                    },
                    "aria-hidden": "true",
                    tabindex: "-1"
                },
                _r = new Map([
                    ["identitytoolkit.googleapis.com", "p"],
                    ["staging-identitytoolkit.sandbox.googleapis.com", "s"],
                    ["test-identitytoolkit.sandbox.googleapis.com", "t"]
                ]);
            async function yr(a) {
                const e = await pr(a);
                var t = pn().gapi;
                return B(t, a, "internal-error"), e.open({
                    where: document.body,
                    url: function(e) {
                        var t = e.config;
                        B(t.authDomain, e, "auth-domain-config-required");
                        var n = t.emulator ? Q(t, gr) : `https://${e.config.authDomain}/${vr}`;
                        const r = {
                            apiKey: t.apiKey,
                            appName: e.name,
                            v: ki.SDK_VERSION
                        };
                        (t = _r.get(e.config.apiHost)) && (r.eid = t);
                        const i = e._getFrameworks();
                        return i.length && (r.fw = i.join(",")), `${n}?${I(r).slice(1)}`
                    }(a),
                    messageHandlersFilter: t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,
                    attributes: mr,
                    dontclear: !0
                }, s => new Promise(async (e, t) => {
                    await s.restyle({
                        setHideOnLeave: !1
                    });
                    const n = H(a, "network-request-failed"),
                        r = pn().setTimeout(() => {
                            t(n)
                        }, fr.get());

                    function i() {
                        pn().clearTimeout(r), e(s)
                    }
                    s.ping(i).then(i, () => {
                        t(n)
                    })
                }))
            }
            const Ir = {
                location: "yes",
                resizable: "yes",
                statusbar: "yes",
                toolbar: "no"
            };
            class wr {
                constructor(e) {
                    this.window = e, this.associatedEvent = null
                }
                close() {
                    if (this.window) try {
                        this.window.close()
                    } catch (e) {}
                }
            }

            function Tr(e, t, n, r = 500, i = 600) {
                var s = Math.max((window.screen.availHeight - i) / 2, 0).toString(),
                    a = Math.max((window.screen.availWidth - r) / 2, 0).toString();
                let o = "";
                const c = Object.assign(Object.assign({}, Ir), {
                    width: r.toString(),
                    height: i.toString(),
                    top: s,
                    left: a
                });
                s = d().toLowerCase();
                n && (o = Se(s) ? "_blank" : n), Re(s) && (t = t || "http://localhost", c.scrollbars = "yes");
                var l, a = Object.entries(c).reduce((e, [t, n]) => `${e}${t}=${n},`, "");
                if ([n = d()] = [s], Le(n) && null !== (l = window.navigator) && void 0 !== l && l.standalone && "_self" !== o) return function(e, t) {
                    const n = document.createElement("a");
                    n.href = e, n.target = t;
                    const r = document.createEvent("MouseEvent");
                    r.initMouseEvent("click", !0, !0, window, 1, 0, 0, 0, 0, !1, !1, !1, !1, 1, null), n.dispatchEvent(r)
                }(t || "", o), new wr(null);
                const u = window.open(t || "", o, a);
                B(u, e, "popup-blocked");
                try {
                    u.focus()
                } catch (e) {}
                return new wr(u)
            }
            const br = "__/auth/handler",
                kr = "emulator/auth/handler",
                Er = encodeURIComponent("fac");
            async function Rr(e, t, n, r, i, s) {
                B(e.config.authDomain, e, "auth-domain-config-required"), B(e.config.apiKey, e, "invalid-api-key");
                const a = {
                    apiKey: e.config.apiKey,
                    appName: e.name,
                    authType: n,
                    redirectUrl: r,
                    v: ki.SDK_VERSION,
                    eventId: i
                };
                if (t instanceof dt) {
                    t.setDefaultLanguage(e.languageCode), a.providerId = t.providerId || "",
                        function(e) {
                            for (const t in e)
                                if (Object.prototype.hasOwnProperty.call(e, t)) return;
                            return 1
                        }(t.getCustomParameters()) || (a.customParameters = JSON.stringify(t.getCustomParameters()));
                    for (var [o, c] of Object.entries(s || {})) a[o] = c
                }
                if (t instanceof ht) {
                    const d = t.getScopes().filter(e => "" !== e);
                    0 < d.length && (a.scopes = d.join(","))
                }
                e.tenantId && (a.tid = e.tenantId);
                const l = a;
                for (const h of Object.keys(l)) void 0 === l[h] && delete l[h];
                var u = await e._getAppCheckToken(),
                    u = u ? `#${Er}=${encodeURIComponent(u)}` : "";
                return `${e=[e["config"]][0],e.emulator?Q(e,kr):`https://${e.authDomain}/${br}`}?${I(l).slice(1)}${u}`
            }
            const Ar = "webStorageSupport";
            const Sr = class {
                constructor() {
                    this.eventManagers = {}, this.iframes = {}, this.originValidationPromises = {}, this._redirectPersistence = ln, this._completeRedirectFn = tr, this._overrideRedirectResult = Jn
                }
                async _openPopup(e, t, n, r) {
                    var i;
                    return K(null === (i = this.eventManagers[e._key()]) || void 0 === i ? void 0 : i.manager, "_initialize() not called before _openPopup()"), Tr(e, await Rr(e, t, n, $(), r), dn())
                }
                async _openRedirect(e, t, n, r) {
                    await this._originValidation(e);
                    var i = await Rr(e, t, n, $(), r);
                    return pn().location.href = i, new Promise(() => {})
                }
                _initialize(e) {
                    const t = e._key();
                    if (this.eventManagers[t]) {
                        const {
                            manager: r,
                            promise: n
                        } = this.eventManagers[t];
                        return r ? Promise.resolve(r) : (K(n, "If manager is not set, promise should be"), n)
                    }
                    const n = this.initAndGetManager(e);
                    return this.eventManagers[t] = {
                        promise: n
                    }, n.catch(() => {
                        delete this.eventManagers[t]
                    }), n
                }
                async initAndGetManager(t) {
                    const e = await yr(t),
                        n = new rr(t);
                    return e.register("authEvent", e => {
                        return B(null == e ? void 0 : e.authEvent, t, "invalid-auth-event"), {
                            status: n.onEvent(e.authEvent) ? "ACK" : "ERROR"
                        }
                    }, gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER), this.eventManagers[t._key()] = {
                        manager: n
                    }, this.iframes[t._key()] = e, n
                }
                _isIframeWebStorageSupported(n, r) {
                    const e = this.iframes[n._key()];
                    e.send(Ar, {
                        type: Ar
                    }, e => {
                        var t = null === (t = null == e ? void 0 : e[0]) || void 0 === t ? void 0 : t[Ar];
                        void 0 !== t && r(!!t), j(n, "internal-error")
                    }, gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)
                }
                _originValidation(e) {
                    var t = e._key();
                    return this.originValidationPromises[t] || (this.originValidationPromises[t] = lr(e)), this.originValidationPromises[t]
                }
                get _shouldInitProactively() {
                    return De() || Ae() || Le()
                }
            };
            class Cr extends class {
                constructor(e) {
                    this.factorId = e
                }
                _process(e, t, n) {
                    switch (t.type) {
                        case "enroll":
                            return this._finalizeEnroll(e, t.credential, n);
                        case "signin":
                            return this._finalizeSignIn(e, t.credential);
                        default:
                            return G("unexpected MultiFactorSessionType")
                    }
                }
            } {
                constructor(e) {
                    super("phone"), this.credential = e
                }
                static _fromCredential(e) {
                    return new Cr(e)
                }
                _finalizeEnroll(e, t, n) {
                    return e = e, n = {
                        idToken: t,
                        displayName: n,
                        phoneVerificationInfo: this.credential._makeVerificationRequest()
                    }, re(e, "POST", "/v2/accounts/mfaEnrollment:finalize", ne(e, n))
                }
                _finalizeSignIn(e, t) {
                    return e = e, t = {
                        mfaPendingCredential: t,
                        phoneVerificationInfo: this.credential._makeVerificationRequest()
                    }, re(e, "POST", "/v2/accounts/mfaSignIn:finalize", ne(e, t))
                }
            }
            class Pr {
                constructor() {}
                static assertion(e) {
                    return Cr._fromCredential(e)
                }
            }
            Pr.FACTOR_ID = "phone";
            var Nr = "@firebase/auth";
            class Or {
                constructor(e) {
                    this.auth = e, this.internalListeners = new Map
                }
                getUid() {
                    var e;
                    return this.assertAuthConfigured(), (null === (e = this.auth.currentUser) || void 0 === e ? void 0 : e.uid) || null
                }
                async getToken(e) {
                    return this.assertAuthConfigured(), await this.auth._initializationPromise, this.auth.currentUser ? {
                        accessToken: await this.auth.currentUser.getIdToken(e)
                    } : null
                }
                addAuthTokenListener(t) {
                    var e;
                    this.assertAuthConfigured(), this.internalListeners.has(t) || (e = this.auth.onIdTokenChanged(e => {
                        t((null == e ? void 0 : e.stsTokenManager.accessToken) || null)
                    }), this.internalListeners.set(t, e), this.updateProactiveRefresh())
                }
                removeAuthTokenListener(e) {
                    this.assertAuthConfigured();
                    const t = this.internalListeners.get(e);
                    t && (this.internalListeners.delete(e), t(), this.updateProactiveRefresh())
                }
                assertAuthConfigured() {
                    B(this.auth._initializationPromise, "dependent-sdk-initialized-before-auth")
                }
                updateProactiveRefresh() {
                    0 < this.internalListeners.size ? this.auth._startProactiveRefresh() : this.auth._stopProactiveRefresh()
                }
            }
            var Lr, Dr, Mr;

            function Ur() {
                return window
            }
            Lr = "authIdTokenMaxAge", null === (Dr = o()) || void 0 === Dr || Dr[`_${Lr}`], Mr = "Browser", ki._registerComponent(new N("auth", (e, {
                options: t
            }) => {
                var n = e.getProvider("app").getImmediate(),
                    r = e.getProvider("heartbeat"),
                    i = e.getProvider("app-check-internal");
                const {
                    apiKey: s,
                    authDomain: a
                } = n.options;
                B(s && !s.includes(":"), "invalid-api-key", {
                    appName: n.name
                });
                var o = {
                        apiKey: s,
                        authDomain: a,
                        clientPlatform: Mr,
                        apiHost: "identitytoolkit.googleapis.com",
                        tokenApiHost: "securetoken.googleapis.com",
                        apiScheme: "https",
                        sdkClientVersion: Me(Mr)
                    },
                    o = new Be(n, r, i, o);
                return function(e, t) {
                    const n = (null == t ? void 0 : t.persistence) || [];
                    var r = (Array.isArray(n) ? n : [n]).map(Ie);
                    null != t && t.errorMap && e._updateErrorMap(t.errorMap), e._initializeWithPersistence(r, null == t ? void 0 : t.popupRedirectResolver)
                }(o, t), o
            }, "PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e, t, n) => {
                const r = e.getProvider("auth-internal");
                r.initialize()
            })), ki._registerComponent(new N("auth-internal", e => {
                var t = Ge(e.getProvider("auth").getImmediate());
                return e = t, new Or(e)
            }, "PRIVATE").setInstantiationMode("EXPLICIT")), ki.registerVersion(Nr, "0.23.2", function(e) {
                switch (e) {
                    case "Node":
                        return "node";
                    case "ReactNative":
                        return "rn";
                    case "Worker":
                        return "webworker";
                    case "Cordova":
                        return "cordova";
                    default:
                        return
                }
            }(Mr)), ki.registerVersion(Nr, "0.23.2", "esm2017");
            async function Fr(e, t, n) {
                var r = Ur()["BuildInfo"];
                K(t.sessionId, "AuthEvent did not contain a session ID");
                var i = await async function(e) {
                    const t = function(e) {
                            if (K(/[0-9a-zA-Z]+/.test(e), "Can only convert alpha-numeric strings"), "undefined" != typeof TextEncoder) return (new TextEncoder).encode(e);
                            const t = new ArrayBuffer(e.length),
                                n = new Uint8Array(t);
                            for (let r = 0; r < e.length; r++) n[r] = e.charCodeAt(r);
                            return n
                        }(e),
                        n = await crypto.subtle.digest("SHA-256", t),
                        r = Array.from(new Uint8Array(n));
                    return r.map(e => e.toString(16).padStart(2, "0")).join("")
                }(t.sessionId);
                const s = {};
                return Le() ? s.ibi = r.packageName : Pe() ? s.apn = r.packageName : j(e, "operation-not-supported-in-this-environment"), r.displayName && (s.appDisplayName = r.displayName), s.sessionId = i, Rr(e, n, t.type, void 0, null !== (i = t.eventId) && void 0 !== i ? i : void 0, s)
            }

            function Vr(r) {
                const i = Ur()["cordova"];
                return new Promise(n => {
                    i.plugins.browsertab.isAvailable(e => {
                        let t = null;
                        e ? i.plugins.browsertab.openUrl(r) : t = i.InAppBrowser.open(r, (e = d(), /(iPad|iPhone|iPod).*OS 7_\d/i.test(e) || /(iPad|iPhone|iPod).*OS 8_\d/i.test(e) ? "_blank" : "_system"), "location=yes"), n(t)
                    })
                })
            }
            const xr = 20;
            class jr extends rr {
                constructor() {
                    super(...arguments), this.passiveListeners = new Set, this.initPromise = new Promise(e => {
                        this.resolveInialized = e
                    })
                }
                addPassiveListener(e) {
                    this.passiveListeners.add(e)
                }
                removePassiveListener(e) {
                    this.passiveListeners.delete(e)
                }
                resetRedirect() {
                    this.queuedRedirectEvent = null, this.hasHandledPotentialRedirect = !1
                }
                onEvent(t) {
                    return this.resolveInialized(), this.passiveListeners.forEach(e => e(t)), super.onEvent(t)
                }
                async initialized() {
                    await this.initPromise
                }
            }

            function Hr(e, t, n = null) {
                return {
                    type: t,
                    eventId: n,
                    urlResponse: null,
                    sessionId: function() {
                        const e = [],
                            t = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
                        for (let r = 0; r < xr; r++) {
                            var n = Math.floor(Math.random() * t.length);
                            e.push(t.charAt(n))
                        }
                        return e.join("")
                    }(),
                    postBody: null,
                    tenantId: e.tenantId,
                    error: H(e, "no-auth-event")
                }
            }
            async function Wr(e) {
                var t = await zr()._get(Br(e));
                return t && await zr()._remove(Br(e)), t
            }

            function qr(e, t) {
                var n, r, i;
                const s = (n = Gr(t = t), a = n.link ? decodeURIComponent(n.link) : void 0, r = Gr(a).link, i = n.deep_link_id ? decodeURIComponent(n.deep_link_id) : void 0, (n = Gr(i).link) || i || r || a || t);
                if (s.includes("/__/auth/callback")) {
                    var a = Gr(s),
                        a = a.firebaseError ? function(e) {
                            try {
                                return JSON.parse(e)
                            } catch (e) {
                                return null
                            }
                        }(decodeURIComponent(a.firebaseError)) : null,
                        a = null === (a = null === (a = null == a ? void 0 : a.code) || void 0 === a ? void 0 : a.split("auth/")) || void 0 === a ? void 0 : a[1],
                        a = a ? H(a) : null;
                    return a ? {
                        type: e.type,
                        eventId: e.eventId,
                        tenantId: e.tenantId,
                        error: a,
                        urlResponse: null,
                        sessionId: null,
                        postBody: null
                    } : {
                        type: e.type,
                        eventId: e.eventId,
                        tenantId: e.tenantId,
                        sessionId: e.sessionId,
                        urlResponse: s,
                        postBody: null
                    }
                }
                return null
            }

            function zr() {
                return Ie(on)
            }

            function Br(e) {
                return be("authEvent", e.config.apiKey, e.name)
            }

            function Gr(e) {
                if (null == e || !e.includes("?")) return {};
                const [, ...t] = e.split("?");
                return w(t.join("?"))
            }
            const Kr = class {
                constructor() {
                    this._redirectPersistence = ln, this._shouldInitProactively = !0, this.eventManagers = new Map, this.originValidationPromises = {}, this._completeRedirectFn = tr, this._overrideRedirectResult = Jn
                }
                async _initialize(e) {
                    var t = e._key();
                    let n = this.eventManagers.get(t);
                    return n || (n = new jr(e), this.eventManagers.set(t, n), this.attachCallbackListeners(e, n)), n
                }
                _openPopup(e) {
                    j(e, "operation-not-supported-in-this-environment")
                }
                async _openRedirect(e, t, n, r) {
                    var i, s;
                    i = e, o = Ur(), B("function" == typeof(null === (s = null == o ? void 0 : o.universalLinks) || void 0 === s ? void 0 : s.subscribe), i, "invalid-cordova-configuration", {
                        missingPlugin: "cordova-universal-links-plugin-fix"
                    }), B(void 0 !== (null === (s = null == o ? void 0 : o.BuildInfo) || void 0 === s ? void 0 : s.packageName), i, "invalid-cordova-configuration", {
                        missingPlugin: "cordova-plugin-buildInfo"
                    }), B("function" == typeof(null === (s = null === (s = null === (s = null == o ? void 0 : o.cordova) || void 0 === s ? void 0 : s.plugins) || void 0 === s ? void 0 : s.browsertab) || void 0 === s ? void 0 : s.openUrl), i, "invalid-cordova-configuration", {
                        missingPlugin: "cordova-plugin-browsertab"
                    }), B("function" == typeof(null === (s = null === (s = null === (s = null == o ? void 0 : o.cordova) || void 0 === s ? void 0 : s.plugins) || void 0 === s ? void 0 : s.browsertab) || void 0 === s ? void 0 : s.isAvailable), i, "invalid-cordova-configuration", {
                        missingPlugin: "cordova-plugin-browsertab"
                    }), B("function" == typeof(null === (o = null === (o = null == o ? void 0 : o.cordova) || void 0 === o ? void 0 : o.InAppBrowser) || void 0 === o ? void 0 : o.open), i, "invalid-cordova-configuration", {
                        missingPlugin: "cordova-plugin-inappbrowser"
                    });
                    const a = await this._initialize(e);
                    await a.initialized(), a.resetRedirect(), Gn.clear(), await this._originValidation(e);
                    var o = Hr(e, n, r);
                    n = e, r = o, await zr()._set(Br(n), r);
                    o = await Vr(await Fr(e, o, t));
                    return async function(a, o, c) {
                        const l = Ur()["cordova"];
                        let u = () => {};
                        try {
                            await new Promise((n, e) => {
                                let t = null;

                                function r() {
                                    var e;
                                    n();
                                    const t = null === (e = l.plugins.browsertab) || void 0 === e ? void 0 : e.close;
                                    "function" == typeof t && t(), "function" == typeof(null == c ? void 0 : c.close) && c.close()
                                }

                                function i() {
                                    t = t || window.setTimeout(() => {
                                        e(H(a, "redirect-cancelled-by-user"))
                                    }, 2e3)
                                }

                                function s() {
                                    "visible" === (null === document || void 0 === document ? void 0 : document.visibilityState) && i()
                                }
                                o.addPassiveListener(r), document.addEventListener("resume", i, !1), Pe() && document.addEventListener("visibilitychange", s, !1), u = () => {
                                    o.removePassiveListener(r), document.removeEventListener("resume", i, !1), document.removeEventListener("visibilitychange", s, !1), t && window.clearTimeout(t)
                                }
                            })
                        } finally {
                            u()
                        }
                    }(e, a, o)
                }
                _isIframeWebStorageSupported(e, t) {
                    throw new Error("Method not implemented.")
                }
                _originValidation(e) {
                    var t = e._key();
                    return this.originValidationPromises[t] || (this.originValidationPromises[t] = async function(e) {
                        var t = Ur()["BuildInfo"];
                        const n = {};
                        Le() ? n.iosBundleId = t.packageName : Pe() ? n.androidPackageName = t.packageName : j(e, "operation-not-supported-in-this-environment"), await ar(e, n)
                    }(e)), this.originValidationPromises[t]
                }
                attachCallbackListeners(r, i) {
                    const {
                        universalLinks: e,
                        handleOpenURL: t,
                        BuildInfo: n
                    } = Ur(), s = setTimeout(async () => {
                        await Wr(r), i.onEvent($r())
                    }, 500), a = async e => {
                        clearTimeout(s);
                        var t = await Wr(r);
                        let n = null;
                        t && null != e && e.url && (n = qr(t, e.url)), i.onEvent(n || $r())
                    };
                    void 0 !== e && "function" == typeof e.subscribe && e.subscribe(null, a);
                    const o = t,
                        c = `${n.packageName.toLowerCase()}://`;
                    Ur().handleOpenURL = async e => {
                        if (e.toLowerCase().startsWith(c) && a({
                                url: e
                            }), "function" == typeof o) try {
                            o(e)
                        } catch (e) {
                            console.error(e)
                        }
                    }
                }
            };

            function $r() {
                return {
                    type: "unknown",
                    eventId: null,
                    sessionId: null,
                    urlResponse: null,
                    postBody: null,
                    tenantId: null,
                    error: H("no-auth-event")
                }
            }
            var Jr;

            function Yr() {
                var e;
                return (null === (e = null === self || void 0 === self ? void 0 : self.location) || void 0 === e ? void 0 : e.protocol) || null
            }

            function Xr(e = d()) {
                return !("file:" !== Yr() && "ionic:" !== Yr() && "capacitor:" !== Yr() || !e.toLowerCase().match(/iphone|ipad|ipod|android/))
            }

            function Qr(e = d()) {
                return v() && 11 === (null === document || void 0 === document ? void 0 : document.documentMode) || ([e = d()] = [e], /Edge\/\d+/.test(e))
            }

            function Zr() {
                try {
                    const t = self.localStorage;
                    var e = dn();
                    if (t) return t.setItem(e, "1"), t.removeItem(e), !Qr() || g()
                } catch (e) {
                    return ei() && g()
                }
                return !1
            }

            function ei() {
                return "undefined" != typeof global && "WorkerGlobalScope" in global && "importScripts" in global
            }

            function ti() {
                return ("http:" === Yr() || "https:" === Yr() || p() || Xr()) && !(f() || h()) && Zr() && !ei()
            }

            function ni() {
                return Xr() && "undefined" != typeof document
            }
            const ri = {
                    LOCAL: "local",
                    NONE: "none",
                    SESSION: "session"
                },
                ii = B,
                si = "persistence";
            async function ai(e) {
                await e._initializationPromise;
                const t = oi();
                var n = be(si, e.config.apiKey, e.name);
                t && t.setItem(n, e._getPersistence())
            }

            function oi() {
                var e;
                try {
                    return (null === (e = "undefined" != typeof window ? window : null) ? void 0 : e.sessionStorage) || null
                } catch (e) {
                    return null
                }
            }
            const ci = B;
            class li {
                constructor() {
                    this.browserResolver = Ie(Sr), this.cordovaResolver = Ie(Kr), this.underlyingResolver = null, this._redirectPersistence = ln, this._completeRedirectFn = tr, this._overrideRedirectResult = Jn
                }
                async _initialize(e) {
                    return await this.selectUnderlyingResolver(), this.assertedUnderlyingResolver._initialize(e)
                }
                async _openPopup(e, t, n, r) {
                    return await this.selectUnderlyingResolver(), this.assertedUnderlyingResolver._openPopup(e, t, n, r)
                }
                async _openRedirect(e, t, n, r) {
                    return await this.selectUnderlyingResolver(), this.assertedUnderlyingResolver._openRedirect(e, t, n, r)
                }
                _isIframeWebStorageSupported(e, t) {
                    this.assertedUnderlyingResolver._isIframeWebStorageSupported(e, t)
                }
                _originValidation(e) {
                    return this.assertedUnderlyingResolver._originValidation(e)
                }
                get _shouldInitProactively() {
                    return ni() || this.browserResolver._shouldInitProactively
                }
                get assertedUnderlyingResolver() {
                    return ci(this.underlyingResolver, "internal-error"), this.underlyingResolver
                }
                async selectUnderlyingResolver() {
                    var e;
                    this.underlyingResolver || (e = await (!!ni() && new Promise(e => {
                        const t = setTimeout(() => {
                            e(!1)
                        }, 1e3);
                        document.addEventListener("deviceready", () => {
                            clearTimeout(t), e(!0)
                        })
                    })), this.underlyingResolver = e ? this.cordovaResolver : this.browserResolver)
                }
            }

            function ui(e) {
                return e.unwrap()
            }

            function di(e, t) {
                var n, r, i, s = null === (r = t.customData) || void 0 === r ? void 0 : r._tokenResponse;
                if ("auth/multi-factor-auth-required" === (null == t ? void 0 : t.code)) {
                    const o = t;
                    o.resolver = new vi(e, (n = t, i = E(e), B((a = n).customData.operationType, i, "argument-error"), B(null === (r = a.customData._serverResponse) || void 0 === r ? void 0 : r.mfaPendingCredential, i, "argument-error"), en._fromError(i, a)))
                } else if (s) {
                    var a = hi(t);
                    const c = t;
                    a && (c.credential = a, c.tenantId = s.tenantId || void 0, c.email = s.email || void 0, c.phoneNumber = s.phoneNumber || void 0)
                }
            }

            function hi(e) {
                var t = (e instanceof m ? e.customData : e)["_tokenResponse"];
                if (!t) return null;
                if (!(e instanceof m) && "temporaryProof" in t && "phoneNumber" in t) return Un.credentialFromResult(e);
                const n = t.providerId;
                if (!n || n === O.PASSWORD) return null;
                let r;
                switch (n) {
                    case O.GOOGLE:
                        r = vt;
                        break;
                    case O.FACEBOOK:
                        r = ft;
                        break;
                    case O.GITHUB:
                        r = gt;
                        break;
                    case O.TWITTER:
                        r = yt;
                        break;
                    default:
                        var {
                            oauthIdToken: i,
                            oauthAccessToken: s,
                            oauthTokenSecret: a,
                            pendingToken: o,
                            nonce: c
                        } = t;
                        return s || a || i || o ? o ? n.startsWith("saml.") ? mt._create(n, o) : at._fromParams({
                            providerId: n,
                            signInMethod: n,
                            pendingToken: o,
                            idToken: i,
                            accessToken: s
                        }) : new pt(n).credential({
                            idToken: i,
                            accessToken: s,
                            rawNonce: c
                        }) : null
                }
                return e instanceof m ? r.credentialFromError(e) : r.credentialFromResult(e)
            }

            function pi(t, e) {
                return e.catch(e => {
                    throw e instanceof m && di(t, e), e
                }).then(e => {
                    var t = e.operationType,
                        n = e.user;
                    return {
                        operationType: t,
                        credential: hi(e),
                        additionalUserInfo: Qt(e),
                        user: gi.getOrCreate(n)
                    }
                })
            }
            async function fi(t, e) {
                const n = await e;
                return {
                    verificationId: n.verificationId,
                    confirm: e => pi(t, n.confirm(e))
                }
            }
            class vi {
                constructor(e, t) {
                    this.resolver = t, this.auth = e.wrapped()
                }
                get session() {
                    return this.resolver.session
                }
                get hints() {
                    return this.resolver.hints
                }
                resolveSignIn(e) {
                    return pi(ui(this.auth), this.resolver.resolveSignIn(e))
                }
            }
            class gi {
                constructor(e) {
                    var t;
                    this._delegate = e, this.multiFactor = (t = E(e), nn.has(t) || nn.set(t, tn._fromUser(t)), nn.get(t))
                }
                static getOrCreate(e) {
                    return gi.USER_MAP.has(e) || gi.USER_MAP.set(e, new gi(e)), gi.USER_MAP.get(e)
                }
                delete() {
                    return this._delegate.delete()
                }
                reload() {
                    return this._delegate.reload()
                }
                toJSON() {
                    return this._delegate.toJSON()
                }
                getIdTokenResult(e) {
                    return this._delegate.getIdTokenResult(e)
                }
                getIdToken(e) {
                    return this._delegate.getIdToken(e)
                }
                linkAndRetrieveDataWithCredential(e) {
                    return this.linkWithCredential(e)
                }
                async linkWithCredential(e) {
                    return pi(this.auth, Ot(this._delegate, e))
                }
                async linkWithPhoneNumber(e, t) {
                    return fi(this.auth, async function(e, t, n) {
                        const r = E(e);
                        await St(!1, r, "phone");
                        var i = await Mn(r.auth, t, E(n));
                        return new Dn(i, e => Ot(r, e))
                    }(this._delegate, e, t))
                }
                async linkWithPopup(e) {
                    return pi(this.auth, async function(e, t, n) {
                        var r = E(e);
                        q(r.auth, t, dt);
                        var i = Fn(r.auth, n);
                        const s = new zn(r.auth, "linkViaPopup", t, i, r);
                        return s.executeNotNull()
                    }(this._delegate, e, li))
                }
                async linkWithRedirect(e) {
                    return await ai(Ge(this.auth)), er(this._delegate, e, li)
                }
                reauthenticateAndRetrieveDataWithCredential(e) {
                    return this.reauthenticateWithCredential(e)
                }
                async reauthenticateWithCredential(e) {
                    return pi(this.auth, Lt(this._delegate, e))
                }
                reauthenticateWithPhoneNumber(e, t) {
                    return fi(this.auth, async function(e, t, n) {
                        const r = E(e);
                        var i = await Mn(r.auth, t, E(n));
                        return new Dn(i, e => Lt(r, e))
                    }(this._delegate, e, t))
                }
                reauthenticateWithPopup(e) {
                    return pi(this.auth, async function(e, t, n) {
                        var r = E(e);
                        q(r.auth, t, dt);
                        var i = Fn(r.auth, n);
                        const s = new zn(r.auth, "reauthViaPopup", t, i, r);
                        return s.executeNotNull()
                    }(this._delegate, e, li))
                }
                async reauthenticateWithRedirect(e) {
                    return await ai(Ge(this.auth)), Zn(this._delegate, e, li)
                }
                sendEmailVerification(e) {
                    return Wt(this._delegate, e)
                }
                async unlink(e) {
                    return await Rt(this._delegate, e), this
                }
                updateEmail(e) {
                    return Bt(E(this._delegate), e, null)
                }
                updatePassword(e) {
                    return Bt(E(this._delegate), null, e)
                }
                updatePhoneNumber(e) {
                    return async function(e, t) {
                        await At(E(e), t)
                    }(this._delegate, e)
                }
                updateProfile(e) {
                    return zt(this._delegate, e)
                }
                verifyBeforeUpdateEmail(e, t) {
                    return qt(this._delegate, e, t)
                }
                get emailVerified() {
                    return this._delegate.emailVerified
                }
                get isAnonymous() {
                    return this._delegate.isAnonymous
                }
                get metadata() {
                    return this._delegate.metadata
                }
                get phoneNumber() {
                    return this._delegate.phoneNumber
                }
                get providerData() {
                    return this._delegate.providerData
                }
                get refreshToken() {
                    return this._delegate.refreshToken
                }
                get tenantId() {
                    return this._delegate.tenantId
                }
                get displayName() {
                    return this._delegate.displayName
                }
                get email() {
                    return this._delegate.email
                }
                get photoURL() {
                    return this._delegate.photoURL
                }
                get providerId() {
                    return this._delegate.providerId
                }
                get uid() {
                    return this._delegate.uid
                }
                get auth() {
                    return this._delegate.auth
                }
            }
            gi.USER_MAP = new WeakMap;
            const mi = B;
            class _i {
                constructor(e, t) {
                    if (this.app = e, t.isInitialized()) return this._delegate = t.getImmediate(), void this.linkUnderlyingAuth();
                    var n = e.options["apiKey"];
                    mi(n, "invalid-api-key", {
                        appName: e.name
                    }), mi(n, "invalid-api-key", {
                        appName: e.name
                    });
                    var r = "undefined" != typeof window ? li : void 0;
                    this._delegate = t.initialize({
                        options: {
                            persistence: function(e, t) {
                                const n = function(e, t) {
                                    const n = oi();
                                    if (!n) return [];
                                    var r = be(si, e, t);
                                    switch (n.getItem(r)) {
                                        case ri.NONE:
                                            return [Te];
                                        case ri.LOCAL:
                                            return [kn, ln];
                                        case ri.SESSION:
                                            return [ln];
                                        default:
                                            return []
                                    }
                                }(e, t);
                                "undefined" == typeof self || n.includes(kn) || n.push(kn);
                                if ("undefined" != typeof window)
                                    for (const r of [on, ln]) n.includes(r) || n.push(r);
                                n.includes(Te) || n.push(Te);
                                return n
                            }(n, e.name),
                            popupRedirectResolver: r
                        }
                    }), this._delegate._updateErrorMap(M), this.linkUnderlyingAuth()
                }
                get emulatorConfig() {
                    return this._delegate.emulatorConfig
                }
                get currentUser() {
                    return this._delegate.currentUser ? gi.getOrCreate(this._delegate.currentUser) : null
                }
                get languageCode() {
                    return this._delegate.languageCode
                }
                set languageCode(e) {
                    this._delegate.languageCode = e
                }
                get settings() {
                    return this._delegate.settings
                }
                get tenantId() {
                    return this._delegate.tenantId
                }
                set tenantId(e) {
                    this._delegate.tenantId = e
                }
                useDeviceLanguage() {
                    this._delegate.useDeviceLanguage()
                }
                signOut() {
                    return this._delegate.signOut()
                }
                useEmulator(e, t) {
                    $e(this._delegate, e, t)
                }
                applyActionCode(e) {
                    return xt(this._delegate, e)
                }
                checkActionCode(e) {
                    return jt(this._delegate, e)
                }
                confirmPasswordReset(e, t) {
                    return async function(e, t, n) {
                        await Qe(E(e), {
                            oobCode: t,
                            newPassword: n
                        })
                    }(this._delegate, e, t)
                }
                async createUserWithEmailAndPassword(e, t) {
                    return pi(this._delegate, async function(e, t, n) {
                        var r;
                        const i = Ge(e),
                            s = {
                                returnSecureToken: !0,
                                email: t,
                                password: n,
                                clientType: "CLIENT_TYPE_WEB"
                            };
                        let a;
                        a = null !== (r = i._getRecaptchaConfig()) && void 0 !== r && r.emailPasswordEnabled ? (o = await qe(i, s, "signUpPassword"), It(i, o)) : It(i, s).catch(async e => {
                            if ("auth/missing-recaptcha-token" !== e.code) return Promise.reject(e);
                            console.log("Sign-up is protected by reCAPTCHA for this project. Automatically triggering the reCAPTCHA flow and restarting the sign-up flow.");
                            var t = await qe(i, s, "signUpPassword");
                            return It(i, t)
                        });
                        var o = await a.catch(e => Promise.reject(e)),
                            o = await wt._fromIdTokenResponse(i, "signIn", o);
                        return await i._updateCurrentUser(o.user), o
                    }(this._delegate, e, t))
                }
                fetchProvidersForEmail(e) {
                    return this.fetchSignInMethodsForEmail(e)
                }
                fetchSignInMethodsForEmail(e) {
                    return Ht(this._delegate, e)
                }
                isSignInWithEmailLink(e) {
                    return this._delegate, e = e, "EMAIL_SIGNIN" === (null == (t = lt.parseLink(e)) ? void 0 : t.operation);
                    var t
                }
                async getRedirectResult() {
                    mi(ti(), this._delegate, "operation-not-supported-in-this-environment");
                    var e, t, n = (e = this._delegate, t = li, await Ge(e)._initializationPromise, await tr(e, t, !1));
                    return n ? pi(this._delegate, Promise.resolve(n)) : {
                        credential: null,
                        user: null
                    }
                }
                addFrameworkForLogging(e) {
                    Ge(this._delegate)._logFramework(e)
                }
                onAuthStateChanged(e, t, n) {
                    var {
                        next: r,
                        error: i,
                        complete: s
                    } = yi(e, t, n);
                    return this._delegate.onAuthStateChanged(r, i, s)
                }
                onIdTokenChanged(e, t, n) {
                    var {
                        next: r,
                        error: i,
                        complete: s
                    } = yi(e, t, n);
                    return this._delegate.onIdTokenChanged(r, i, s)
                }
                sendSignInLinkToEmail(e, t) {
                    return async function(e, t, n) {
                        var r;
                        const i = Ge(e),
                            s = {
                                requestType: "EMAIL_SIGNIN",
                                email: t,
                                clientType: "CLIENT_TYPE_WEB"
                            };

                        function a(e, t) {
                            B(t.handleCodeInApp, i, "argument-error"), t && Vt(i, e, t)
                        }
                        null !== (r = i._getRecaptchaConfig()) && void 0 !== r && r.emailPasswordEnabled ? (a(r = await qe(i, s, "getOobCode", !0), n), await rt(i, r)) : (a(s, n), await rt(i, s).catch(async e => {
                            if ("auth/missing-recaptcha-token" !== e.code) return Promise.reject(e);
                            console.log("Email link sign-in is protected by reCAPTCHA for this project. Automatically triggering the reCAPTCHA flow and restarting the sign-in flow.");
                            var t = await qe(i, s, "getOobCode", !0);
                            a(t, n), await rt(i, t)
                        }))
                    }(this._delegate, e, t)
                }
                sendPasswordResetEmail(e, t) {
                    return async function(e, t, n) {
                        var r;
                        const i = Ge(e),
                            s = {
                                requestType: "PASSWORD_RESET",
                                email: t,
                                clientType: "CLIENT_TYPE_WEB"
                            };
                        null !== (r = i._getRecaptchaConfig()) && void 0 !== r && r.emailPasswordEnabled ? (r = await qe(i, s, "getOobCode", !0), n && Vt(i, r, n), await nt(i, r)) : (n && Vt(i, s, n), await nt(i, s).catch(async e => {
                            if ("auth/missing-recaptcha-token" !== e.code) return Promise.reject(e);
                            console.log("Password resets are protected by reCAPTCHA for this project. Automatically triggering the reCAPTCHA flow and restarting the password reset flow.");
                            var t = await qe(i, s, "getOobCode", !0);
                            n && Vt(i, t, n), await nt(i, t)
                        }))
                    }(this._delegate, e, t || void 0)
                }
                async setPersistence(e) {
                    var t, n;
                    t = this._delegate, n = e, ii(Object.values(ri).includes(n), t, "invalid-persistence-type"), f() ? ii(n !== ri.SESSION, t, "unsupported-persistence-type") : h() ? ii(n === ri.NONE, t, "unsupported-persistence-type") : ei() ? ii(n === ri.NONE || n === ri.LOCAL && g(), t, "unsupported-persistence-type") : ii(n === ri.NONE || Zr(), t, "unsupported-persistence-type");
                    let r;
                    switch (e) {
                        case ri.SESSION:
                            r = ln;
                            break;
                        case ri.LOCAL:
                            var i = await Ie(kn)._isAvailable();
                            r = i ? kn : on;
                            break;
                        case ri.NONE:
                            r = Te;
                            break;
                        default:
                            return j("argument-error", {
                                appName: this._delegate.name
                            })
                    }
                    return this._delegate.setPersistence(r)
                }
                signInAndRetrieveDataWithCredential(e) {
                    return this.signInWithCredential(e)
                }
                signInAnonymously() {
                    return pi(this._delegate, async function(e) {
                        const t = Ge(e);
                        if (await t._initializationPromise, null !== (n = t.currentUser) && void 0 !== n && n.isAnonymous) return new wt({
                            user: t.currentUser,
                            providerId: null,
                            operationType: "signIn"
                        });
                        var n = await It(t, {
                                returnSecureToken: !0
                            }),
                            n = await wt._fromIdTokenResponse(t, "signIn", n, !0);
                        return await t._updateCurrentUser(n.user), n
                    }(this._delegate))
                }
                signInWithCredential(e) {
                    return pi(this._delegate, Nt(this._delegate, e))
                }
                signInWithCustomToken(e) {
                    return pi(this._delegate, Dt(this._delegate, e))
                }
                signInWithEmailAndPassword(e, t) {
                    return pi(this._delegate, (n = this._delegate, e = e, t = t, Nt(E(n), ut.credential(e, t))));
                    var n
                }
                signInWithEmailLink(e, t) {
                    return pi(this._delegate, async function(e, t, n) {
                        var r = E(e),
                            i = ut.credentialWithLink(t, n || $());
                        return B(i._tenantId === (r.tenantId || null), r, "tenant-id-mismatch"), Nt(r, i)
                    }(this._delegate, e, t))
                }
                signInWithPhoneNumber(e, t) {
                    return fi(this._delegate, async function(e, t, n) {
                        const r = Ge(e);
                        var i = await Mn(r, t, E(n));
                        return new Dn(i, e => Nt(r, e))
                    }(this._delegate, e, t))
                }
                async signInWithPopup(e) {
                    return mi(ti(), this._delegate, "operation-not-supported-in-this-environment"), pi(this._delegate, async function(e, t, n) {
                        var r = Ge(e);
                        q(e, t, dt);
                        var i = Fn(r, n);
                        const s = new zn(r, "signInViaPopup", t, i);
                        return s.executeNotNull()
                    }(this._delegate, e, li))
                }
                async signInWithRedirect(e) {
                    return mi(ti(), this._delegate, "operation-not-supported-in-this-environment"), await ai(this._delegate), Qn(this._delegate, e, li)
                }
                updateCurrentUser(e) {
                    return this._delegate.updateCurrentUser(e)
                }
                verifyPasswordResetCode(e) {
                    return async function(e, t) {
                        var n = (await jt(E(e), t))["data"];
                        return n.email
                    }(this._delegate, e)
                }
                unwrap() {
                    return this._delegate
                }
                _delete() {
                    return this._delegate._delete()
                }
                linkUnderlyingAuth() {
                    this._delegate.wrapped = () => this
                }
            }

            function yi(e, t, n) {
                let r = e;
                "function" != typeof e && ({
                    next: r,
                    error: t,
                    complete: n
                } = e);
                const i = r;
                return {
                    next: e => i(e && gi.getOrCreate(e)),
                    error: t,
                    complete: n
                }
            }
            _i.Persistence = ri;
            class Ii {
                constructor() {
                    this.providerId = "phone", this._delegate = new Un(ui(i.default.auth()))
                }
                static credential(e, t) {
                    return Un.credential(e, t)
                }
                verifyPhoneNumber(e, t) {
                    return this._delegate.verifyPhoneNumber(e, t)
                }
                unwrap() {
                    return this._delegate
                }
            }
            Ii.PHONE_SIGN_IN_METHOD = Un.PHONE_SIGN_IN_METHOD, Ii.PROVIDER_ID = Un.PROVIDER_ID;
            const wi = B;
            class Ti {
                constructor(e, t, n = i.default.app()) {
                    var r;
                    wi(null === (r = n.options) || void 0 === r ? void 0 : r.apiKey, "invalid-api-key", {
                        appName: n.name
                    }), this._delegate = new Ln(e, t, n.auth()), this.type = this._delegate.type
                }
                clear() {
                    this._delegate.clear()
                }
                render() {
                    return this._delegate.render()
                }
                verify() {
                    return this._delegate.verify()
                }
            }(Jr = i.default).INTERNAL.registerComponent(new N("auth-compat", e => {
                var t = e.getProvider("app-compat").getImmediate(),
                    n = e.getProvider("auth");
                return new _i(t, n)
            }, "PUBLIC").setServiceProps({
                ActionCodeInfo: {
                    Operation: {
                        EMAIL_SIGNIN: L.EMAIL_SIGNIN,
                        PASSWORD_RESET: L.PASSWORD_RESET,
                        RECOVER_EMAIL: L.RECOVER_EMAIL,
                        REVERT_SECOND_FACTOR_ADDITION: L.REVERT_SECOND_FACTOR_ADDITION,
                        VERIFY_AND_CHANGE_EMAIL: L.VERIFY_AND_CHANGE_EMAIL,
                        VERIFY_EMAIL: L.VERIFY_EMAIL
                    }
                },
                EmailAuthProvider: ut,
                FacebookAuthProvider: ft,
                GithubAuthProvider: gt,
                GoogleAuthProvider: vt,
                OAuthProvider: pt,
                SAMLAuthProvider: _t,
                PhoneAuthProvider: Ii,
                PhoneMultiFactorGenerator: Pr,
                RecaptchaVerifier: Ti,
                TwitterAuthProvider: yt,
                Auth: _i,
                AuthCredential: Xe,
                Error: m
            }).setInstantiationMode("LAZY").setMultipleInstances(!1)), Jr.registerVersion("@firebase/auth-compat", "0.4.2")
        }).apply(this, arguments)
    } catch (e) {
        throw console.error(e), new Error("Cannot instantiate firebase-auth-compat.js - be sure to load firebase-app.js first.")
    }
});
//# sourceMappingURL=firebase-auth-compat.js.map