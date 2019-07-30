var _dll_axios = (function(e) {
  var t = {};
  function n(r) {
    if (t[r]) return t[r].exports;
    var o = (t[r] = { i: r, l: !1, exports: {} });
    return e[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
  }
  return (
    (n.m = e),
    (n.c = t),
    (n.d = function(e, t, r) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
    }),
    (n.r = function(e) {
      'undefined' !== typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    }),
    (n.t = function(e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && 'object' === typeof e && e && e.__esModule) return e;
      var r = Object.create(null);
      if (
        (n.r(r),
        Object.defineProperty(r, 'default', { enumerable: !0, value: e }),
        2 & t && 'string' != typeof e)
      )
        for (var o in e)
          n.d(
            r,
            o,
            function(t) {
              return e[t];
            }.bind(null, o)
          );
      return r;
    }),
    (n.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return n.d(t, 'a', t), t;
    }),
    (n.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = ''),
    n((n.s = 884))
  );
})({
  115: function(e, t) {
    var n,
      r,
      o = (e.exports = {});
    function i() {
      throw new Error('setTimeout has not been defined');
    }
    function s() {
      throw new Error('clearTimeout has not been defined');
    }
    function u(e) {
      if (n === setTimeout) return setTimeout(e, 0);
      if ((n === i || !n) && setTimeout) return (n = setTimeout), setTimeout(e, 0);
      try {
        return n(e, 0);
      } catch (t) {
        try {
          return n.call(null, e, 0);
        } catch (t) {
          return n.call(this, e, 0);
        }
      }
    }
    !(function() {
      try {
        n = 'function' === typeof setTimeout ? setTimeout : i;
      } catch (e) {
        n = i;
      }
      try {
        r = 'function' === typeof clearTimeout ? clearTimeout : s;
      } catch (e) {
        r = s;
      }
    })();
    var a,
      c = [],
      f = !1,
      p = -1;
    function l() {
      f && a && ((f = !1), a.length ? (c = a.concat(c)) : (p = -1), c.length && d());
    }
    function d() {
      if (!f) {
        var e = u(l);
        f = !0;
        for (var t = c.length; t; ) {
          for (a = c, c = []; ++p < t; ) a && a[p].run();
          (p = -1), (t = c.length);
        }
        (a = null),
          (f = !1),
          (function(e) {
            if (r === clearTimeout) return clearTimeout(e);
            if ((r === s || !r) && clearTimeout) return (r = clearTimeout), clearTimeout(e);
            try {
              r(e);
            } catch (t) {
              try {
                return r.call(null, e);
              } catch (t) {
                return r.call(this, e);
              }
            }
          })(e);
      }
    }
    function h(e, t) {
      (this.fun = e), (this.array = t);
    }
    function m() {}
    (o.nextTick = function(e) {
      var t = new Array(arguments.length - 1);
      if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
      c.push(new h(e, t)), 1 !== c.length || f || u(d);
    }),
      (h.prototype.run = function() {
        this.fun.apply(null, this.array);
      }),
      (o.title = 'browser'),
      (o.browser = !0),
      (o.env = {}),
      (o.argv = []),
      (o.version = ''),
      (o.versions = {}),
      (o.on = m),
      (o.addListener = m),
      (o.once = m),
      (o.off = m),
      (o.removeListener = m),
      (o.removeAllListeners = m),
      (o.emit = m),
      (o.prependListener = m),
      (o.prependOnceListener = m),
      (o.listeners = function(e) {
        return [];
      }),
      (o.binding = function(e) {
        throw new Error('process.binding is not supported');
      }),
      (o.cwd = function() {
        return '/';
      }),
      (o.chdir = function(e) {
        throw new Error('process.chdir is not supported');
      }),
      (o.umask = function() {
        return 0;
      });
  },
  49: function(e, t, n) {
    'use strict';
    var r = n(544),
      o = n(887),
      i = Object.prototype.toString;
    function s(e) {
      return '[object Array]' === i.call(e);
    }
    function u(e) {
      return null !== e && 'object' === typeof e;
    }
    function a(e) {
      return '[object Function]' === i.call(e);
    }
    function c(e, t) {
      if (null !== e && 'undefined' !== typeof e)
        if (('object' !== typeof e && (e = [e]), s(e)))
          for (var n = 0, r = e.length; n < r; n++) t.call(null, e[n], n, e);
        else
          for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.call(null, e[o], o, e);
    }
    e.exports = {
      isArray: s,
      isArrayBuffer: function(e) {
        return '[object ArrayBuffer]' === i.call(e);
      },
      isBuffer: o,
      isFormData: function(e) {
        return 'undefined' !== typeof FormData && e instanceof FormData;
      },
      isArrayBufferView: function(e) {
        return 'undefined' !== typeof ArrayBuffer && ArrayBuffer.isView
          ? ArrayBuffer.isView(e)
          : e && e.buffer && e.buffer instanceof ArrayBuffer;
      },
      isString: function(e) {
        return 'string' === typeof e;
      },
      isNumber: function(e) {
        return 'number' === typeof e;
      },
      isObject: u,
      isUndefined: function(e) {
        return 'undefined' === typeof e;
      },
      isDate: function(e) {
        return '[object Date]' === i.call(e);
      },
      isFile: function(e) {
        return '[object File]' === i.call(e);
      },
      isBlob: function(e) {
        return '[object Blob]' === i.call(e);
      },
      isFunction: a,
      isStream: function(e) {
        return u(e) && a(e.pipe);
      },
      isURLSearchParams: function(e) {
        return 'undefined' !== typeof URLSearchParams && e instanceof URLSearchParams;
      },
      isStandardBrowserEnv: function() {
        return (
          ('undefined' === typeof navigator ||
            ('ReactNative' !== navigator.product &&
              'NativeScript' !== navigator.product &&
              'NS' !== navigator.product)) &&
          'undefined' !== typeof window &&
          'undefined' !== typeof document
        );
      },
      forEach: c,
      merge: function e() {
        var t = {};
        function n(n, r) {
          'object' === typeof t[r] && 'object' === typeof n ? (t[r] = e(t[r], n)) : (t[r] = n);
        }
        for (var r = 0, o = arguments.length; r < o; r++) c(arguments[r], n);
        return t;
      },
      deepMerge: function e() {
        var t = {};
        function n(n, r) {
          'object' === typeof t[r] && 'object' === typeof n
            ? (t[r] = e(t[r], n))
            : (t[r] = 'object' === typeof n ? e({}, n) : n);
        }
        for (var r = 0, o = arguments.length; r < o; r++) c(arguments[r], n);
        return t;
      },
      extend: function(e, t, n) {
        return (
          c(t, function(t, o) {
            e[o] = n && 'function' === typeof t ? r(t, n) : t;
          }),
          e
        );
      },
      trim: function(e) {
        return e.replace(/^\s*/, '').replace(/\s*$/, '');
      }
    };
  },
  544: function(e, t, n) {
    'use strict';
    e.exports = function(e, t) {
      return function() {
        for (var n = new Array(arguments.length), r = 0; r < n.length; r++) n[r] = arguments[r];
        return e.apply(t, n);
      };
    };
  },
  545: function(e, t, n) {
    'use strict';
    var r = n(49);
    function o(e) {
      return encodeURIComponent(e)
        .replace(/%40/gi, '@')
        .replace(/%3A/gi, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/gi, ',')
        .replace(/%20/g, '+')
        .replace(/%5B/gi, '[')
        .replace(/%5D/gi, ']');
    }
    e.exports = function(e, t, n) {
      if (!t) return e;
      var i;
      if (n) i = n(t);
      else if (r.isURLSearchParams(t)) i = t.toString();
      else {
        var s = [];
        r.forEach(t, function(e, t) {
          null !== e &&
            'undefined' !== typeof e &&
            (r.isArray(e) ? (t += '[]') : (e = [e]),
            r.forEach(e, function(e) {
              r.isDate(e) ? (e = e.toISOString()) : r.isObject(e) && (e = JSON.stringify(e)),
                s.push(o(t) + '=' + o(e));
            }));
        }),
          (i = s.join('&'));
      }
      if (i) {
        var u = e.indexOf('#');
        -1 !== u && (e = e.slice(0, u)), (e += (-1 === e.indexOf('?') ? '?' : '&') + i);
      }
      return e;
    };
  },
  546: function(e, t, n) {
    'use strict';
    e.exports = function(e) {
      return !(!e || !e.__CANCEL__);
    };
  },
  547: function(e, t, n) {
    'use strict';
    (function(t) {
      var r = n(49),
        o = n(892),
        i = { 'Content-Type': 'application/x-www-form-urlencoded' };
      function s(e, t) {
        !r.isUndefined(e) && r.isUndefined(e['Content-Type']) && (e['Content-Type'] = t);
      }
      var u = {
        adapter: (function() {
          var e;
          return (
            'undefined' !== typeof t && '[object process]' === Object.prototype.toString.call(t)
              ? (e = n(548))
              : 'undefined' !== typeof XMLHttpRequest && (e = n(548)),
            e
          );
        })(),
        transformRequest: [
          function(e, t) {
            return (
              o(t, 'Accept'),
              o(t, 'Content-Type'),
              r.isFormData(e) ||
              r.isArrayBuffer(e) ||
              r.isBuffer(e) ||
              r.isStream(e) ||
              r.isFile(e) ||
              r.isBlob(e)
                ? e
                : r.isArrayBufferView(e)
                ? e.buffer
                : r.isURLSearchParams(e)
                ? (s(t, 'application/x-www-form-urlencoded;charset=utf-8'), e.toString())
                : r.isObject(e)
                ? (s(t, 'application/json;charset=utf-8'), JSON.stringify(e))
                : e
            );
          }
        ],
        transformResponse: [
          function(e) {
            if ('string' === typeof e)
              try {
                e = JSON.parse(e);
              } catch (t) {}
            return e;
          }
        ],
        timeout: 0,
        xsrfCookieName: 'XSRF-TOKEN',
        xsrfHeaderName: 'X-XSRF-TOKEN',
        maxContentLength: -1,
        validateStatus: function(e) {
          return e >= 200 && e < 300;
        },
        headers: { common: { Accept: 'application/json, text/plain, */*' } }
      };
      r.forEach(['delete', 'get', 'head'], function(e) {
        u.headers[e] = {};
      }),
        r.forEach(['post', 'put', 'patch'], function(e) {
          u.headers[e] = r.merge(i);
        }),
        (e.exports = u);
    }.call(this, n(115)));
  },
  548: function(e, t, n) {
    'use strict';
    var r = n(49),
      o = n(893),
      i = n(545),
      s = n(895),
      u = n(896),
      a = n(549);
    e.exports = function(e) {
      return new Promise(function(t, c) {
        var f = e.data,
          p = e.headers;
        r.isFormData(f) && delete p['Content-Type'];
        var l = new XMLHttpRequest();
        if (e.auth) {
          var d = e.auth.username || '',
            h = e.auth.password || '';
          p.Authorization = 'Basic ' + btoa(d + ':' + h);
        }
        if (
          (l.open(e.method.toUpperCase(), i(e.url, e.params, e.paramsSerializer), !0),
          (l.timeout = e.timeout),
          (l.onreadystatechange = function() {
            if (
              l &&
              4 === l.readyState &&
              (0 !== l.status || (l.responseURL && 0 === l.responseURL.indexOf('file:')))
            ) {
              var n = 'getAllResponseHeaders' in l ? s(l.getAllResponseHeaders()) : null,
                r = {
                  data: e.responseType && 'text' !== e.responseType ? l.response : l.responseText,
                  status: l.status,
                  statusText: l.statusText,
                  headers: n,
                  config: e,
                  request: l
                };
              o(t, c, r), (l = null);
            }
          }),
          (l.onabort = function() {
            l && (c(a('Request aborted', e, 'ECONNABORTED', l)), (l = null));
          }),
          (l.onerror = function() {
            c(a('Network Error', e, null, l)), (l = null);
          }),
          (l.ontimeout = function() {
            c(a('timeout of ' + e.timeout + 'ms exceeded', e, 'ECONNABORTED', l)), (l = null);
          }),
          r.isStandardBrowserEnv())
        ) {
          var m = n(897),
            y =
              (e.withCredentials || u(e.url)) && e.xsrfCookieName
                ? m.read(e.xsrfCookieName)
                : void 0;
          y && (p[e.xsrfHeaderName] = y);
        }
        if (
          ('setRequestHeader' in l &&
            r.forEach(p, function(e, t) {
              'undefined' === typeof f && 'content-type' === t.toLowerCase()
                ? delete p[t]
                : l.setRequestHeader(t, e);
            }),
          e.withCredentials && (l.withCredentials = !0),
          e.responseType)
        )
          try {
            l.responseType = e.responseType;
          } catch (g) {
            if ('json' !== e.responseType) throw g;
          }
        'function' === typeof e.onDownloadProgress &&
          l.addEventListener('progress', e.onDownloadProgress),
          'function' === typeof e.onUploadProgress &&
            l.upload &&
            l.upload.addEventListener('progress', e.onUploadProgress),
          e.cancelToken &&
            e.cancelToken.promise.then(function(e) {
              l && (l.abort(), c(e), (l = null));
            }),
          void 0 === f && (f = null),
          l.send(f);
      });
    };
  },
  549: function(e, t, n) {
    'use strict';
    var r = n(894);
    e.exports = function(e, t, n, o, i) {
      var s = new Error(e);
      return r(s, t, n, o, i);
    };
  },
  550: function(e, t, n) {
    'use strict';
    var r = n(49);
    e.exports = function(e, t) {
      t = t || {};
      var n = {};
      return (
        r.forEach(['url', 'method', 'params', 'data'], function(e) {
          'undefined' !== typeof t[e] && (n[e] = t[e]);
        }),
        r.forEach(['headers', 'auth', 'proxy'], function(o) {
          r.isObject(t[o])
            ? (n[o] = r.deepMerge(e[o], t[o]))
            : 'undefined' !== typeof t[o]
            ? (n[o] = t[o])
            : r.isObject(e[o])
            ? (n[o] = r.deepMerge(e[o]))
            : 'undefined' !== typeof e[o] && (n[o] = e[o]);
        }),
        r.forEach(
          [
            'baseURL',
            'transformRequest',
            'transformResponse',
            'paramsSerializer',
            'timeout',
            'withCredentials',
            'adapter',
            'responseType',
            'xsrfCookieName',
            'xsrfHeaderName',
            'onUploadProgress',
            'onDownloadProgress',
            'maxContentLength',
            'validateStatus',
            'maxRedirects',
            'httpAgent',
            'httpsAgent',
            'cancelToken',
            'socketPath'
          ],
          function(r) {
            'undefined' !== typeof t[r]
              ? (n[r] = t[r])
              : 'undefined' !== typeof e[r] && (n[r] = e[r]);
          }
        ),
        n
      );
    };
  },
  551: function(e, t, n) {
    'use strict';
    function r(e) {
      this.message = e;
    }
    (r.prototype.toString = function() {
      return 'Cancel' + (this.message ? ': ' + this.message : '');
    }),
      (r.prototype.__CANCEL__ = !0),
      (e.exports = r);
  },
  884: function(e, t, n) {
    e.exports = n;
  },
  885: function(e, t, n) {
    e.exports = n(886);
  },
  886: function(e, t, n) {
    'use strict';
    var r = n(49),
      o = n(544),
      i = n(888),
      s = n(550);
    function u(e) {
      var t = new i(e),
        n = o(i.prototype.request, t);
      return r.extend(n, i.prototype, t), r.extend(n, t), n;
    }
    var a = u(n(547));
    (a.Axios = i),
      (a.create = function(e) {
        return u(s(a.defaults, e));
      }),
      (a.Cancel = n(551)),
      (a.CancelToken = n(900)),
      (a.isCancel = n(546)),
      (a.all = function(e) {
        return Promise.all(e);
      }),
      (a.spread = n(901)),
      (e.exports = a),
      (e.exports.default = a);
  },
  887: function(e, t) {
    e.exports = function(e) {
      return (
        null != e &&
        null != e.constructor &&
        'function' === typeof e.constructor.isBuffer &&
        e.constructor.isBuffer(e)
      );
    };
  },
  888: function(e, t, n) {
    'use strict';
    var r = n(49),
      o = n(545),
      i = n(889),
      s = n(890),
      u = n(550);
    function a(e) {
      (this.defaults = e), (this.interceptors = { request: new i(), response: new i() });
    }
    (a.prototype.request = function(e) {
      'string' === typeof e ? ((e = arguments[1] || {}).url = arguments[0]) : (e = e || {}),
        ((e = u(this.defaults, e)).method = e.method ? e.method.toLowerCase() : 'get');
      var t = [s, void 0],
        n = Promise.resolve(e);
      for (
        this.interceptors.request.forEach(function(e) {
          t.unshift(e.fulfilled, e.rejected);
        }),
          this.interceptors.response.forEach(function(e) {
            t.push(e.fulfilled, e.rejected);
          });
        t.length;

      )
        n = n.then(t.shift(), t.shift());
      return n;
    }),
      (a.prototype.getUri = function(e) {
        return (e = u(this.defaults, e)), o(e.url, e.params, e.paramsSerializer).replace(/^\?/, '');
      }),
      r.forEach(['delete', 'get', 'head', 'options'], function(e) {
        a.prototype[e] = function(t, n) {
          return this.request(r.merge(n || {}, { method: e, url: t }));
        };
      }),
      r.forEach(['post', 'put', 'patch'], function(e) {
        a.prototype[e] = function(t, n, o) {
          return this.request(r.merge(o || {}, { method: e, url: t, data: n }));
        };
      }),
      (e.exports = a);
  },
  889: function(e, t, n) {
    'use strict';
    var r = n(49);
    function o() {
      this.handlers = [];
    }
    (o.prototype.use = function(e, t) {
      return this.handlers.push({ fulfilled: e, rejected: t }), this.handlers.length - 1;
    }),
      (o.prototype.eject = function(e) {
        this.handlers[e] && (this.handlers[e] = null);
      }),
      (o.prototype.forEach = function(e) {
        r.forEach(this.handlers, function(t) {
          null !== t && e(t);
        });
      }),
      (e.exports = o);
  },
  890: function(e, t, n) {
    'use strict';
    var r = n(49),
      o = n(891),
      i = n(546),
      s = n(547),
      u = n(898),
      a = n(899);
    function c(e) {
      e.cancelToken && e.cancelToken.throwIfRequested();
    }
    e.exports = function(e) {
      return (
        c(e),
        e.baseURL && !u(e.url) && (e.url = a(e.baseURL, e.url)),
        (e.headers = e.headers || {}),
        (e.data = o(e.data, e.headers, e.transformRequest)),
        (e.headers = r.merge(e.headers.common || {}, e.headers[e.method] || {}, e.headers || {})),
        r.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function(t) {
          delete e.headers[t];
        }),
        (e.adapter || s.adapter)(e).then(
          function(t) {
            return c(e), (t.data = o(t.data, t.headers, e.transformResponse)), t;
          },
          function(t) {
            return (
              i(t) ||
                (c(e),
                t &&
                  t.response &&
                  (t.response.data = o(t.response.data, t.response.headers, e.transformResponse))),
              Promise.reject(t)
            );
          }
        )
      );
    };
  },
  891: function(e, t, n) {
    'use strict';
    var r = n(49);
    e.exports = function(e, t, n) {
      return (
        r.forEach(n, function(n) {
          e = n(e, t);
        }),
        e
      );
    };
  },
  892: function(e, t, n) {
    'use strict';
    var r = n(49);
    e.exports = function(e, t) {
      r.forEach(e, function(n, r) {
        r !== t && r.toUpperCase() === t.toUpperCase() && ((e[t] = n), delete e[r]);
      });
    };
  },
  893: function(e, t, n) {
    'use strict';
    var r = n(549);
    e.exports = function(e, t, n) {
      var o = n.config.validateStatus;
      !o || o(n.status)
        ? e(n)
        : t(r('Request failed with status code ' + n.status, n.config, null, n.request, n));
    };
  },
  894: function(e, t, n) {
    'use strict';
    e.exports = function(e, t, n, r, o) {
      return (
        (e.config = t),
        n && (e.code = n),
        (e.request = r),
        (e.response = o),
        (e.isAxiosError = !0),
        (e.toJSON = function() {
          return {
            message: this.message,
            name: this.name,
            description: this.description,
            number: this.number,
            fileName: this.fileName,
            lineNumber: this.lineNumber,
            columnNumber: this.columnNumber,
            stack: this.stack,
            config: this.config,
            code: this.code
          };
        }),
        e
      );
    };
  },
  895: function(e, t, n) {
    'use strict';
    var r = n(49),
      o = [
        'age',
        'authorization',
        'content-length',
        'content-type',
        'etag',
        'expires',
        'from',
        'host',
        'if-modified-since',
        'if-unmodified-since',
        'last-modified',
        'location',
        'max-forwards',
        'proxy-authorization',
        'referer',
        'retry-after',
        'user-agent'
      ];
    e.exports = function(e) {
      var t,
        n,
        i,
        s = {};
      return e
        ? (r.forEach(e.split('\n'), function(e) {
            if (
              ((i = e.indexOf(':')),
              (t = r.trim(e.substr(0, i)).toLowerCase()),
              (n = r.trim(e.substr(i + 1))),
              t)
            ) {
              if (s[t] && o.indexOf(t) >= 0) return;
              s[t] =
                'set-cookie' === t ? (s[t] ? s[t] : []).concat([n]) : s[t] ? s[t] + ', ' + n : n;
            }
          }),
          s)
        : s;
    };
  },
  896: function(e, t, n) {
    'use strict';
    var r = n(49);
    e.exports = r.isStandardBrowserEnv()
      ? (function() {
          var e,
            t = /(msie|trident)/i.test(navigator.userAgent),
            n = document.createElement('a');
          function o(e) {
            var r = e;
            return (
              t && (n.setAttribute('href', r), (r = n.href)),
              n.setAttribute('href', r),
              {
                href: n.href,
                protocol: n.protocol ? n.protocol.replace(/:$/, '') : '',
                host: n.host,
                search: n.search ? n.search.replace(/^\?/, '') : '',
                hash: n.hash ? n.hash.replace(/^#/, '') : '',
                hostname: n.hostname,
                port: n.port,
                pathname: '/' === n.pathname.charAt(0) ? n.pathname : '/' + n.pathname
              }
            );
          }
          return (
            (e = o(window.location.href)),
            function(t) {
              var n = r.isString(t) ? o(t) : t;
              return n.protocol === e.protocol && n.host === e.host;
            }
          );
        })()
      : function() {
          return !0;
        };
  },
  897: function(e, t, n) {
    'use strict';
    var r = n(49);
    e.exports = r.isStandardBrowserEnv()
      ? {
          write: function(e, t, n, o, i, s) {
            var u = [];
            u.push(e + '=' + encodeURIComponent(t)),
              r.isNumber(n) && u.push('expires=' + new Date(n).toGMTString()),
              r.isString(o) && u.push('path=' + o),
              r.isString(i) && u.push('domain=' + i),
              !0 === s && u.push('secure'),
              (document.cookie = u.join('; '));
          },
          read: function(e) {
            var t = document.cookie.match(new RegExp('(^|;\\s*)(' + e + ')=([^;]*)'));
            return t ? decodeURIComponent(t[3]) : null;
          },
          remove: function(e) {
            this.write(e, '', Date.now() - 864e5);
          }
        }
      : {
          write: function() {},
          read: function() {
            return null;
          },
          remove: function() {}
        };
  },
  898: function(e, t, n) {
    'use strict';
    e.exports = function(e) {
      return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e);
    };
  },
  899: function(e, t, n) {
    'use strict';
    e.exports = function(e, t) {
      return t ? e.replace(/\/+$/, '') + '/' + t.replace(/^\/+/, '') : e;
    };
  },
  900: function(e, t, n) {
    'use strict';
    var r = n(551);
    function o(e) {
      if ('function' !== typeof e) throw new TypeError('executor must be a function.');
      var t;
      this.promise = new Promise(function(e) {
        t = e;
      });
      var n = this;
      e(function(e) {
        n.reason || ((n.reason = new r(e)), t(n.reason));
      });
    }
    (o.prototype.throwIfRequested = function() {
      if (this.reason) throw this.reason;
    }),
      (o.source = function() {
        var e;
        return {
          token: new o(function(t) {
            e = t;
          }),
          cancel: e
        };
      }),
      (e.exports = o);
  },
  901: function(e, t, n) {
    'use strict';
    e.exports = function(e) {
      return function(t) {
        return e.apply(null, t);
      };
    };
  }
});
