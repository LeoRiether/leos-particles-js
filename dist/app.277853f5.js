// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"vector.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var V = function () {
  function V(x, y) {
    _classCallCheck(this, V);

    this.x = x;
    this.y = y;
  }

  _createClass(V, [{
    key: "toInt",
    value: function toInt() {
      this.x = ~~x;
      this.y = ~~y;
    }
  }, {
    key: "add",
    value: function add(v) {
      this.x += v.x;
      this.y += v.y;
      return this;
    }
  }], [{
    key: "add",
    value: function add(a, b) {
      return new V(a.x + b.x, a.y + b.y);
    }
  }, {
    key: "scale",
    value: function scale(a, k) {
      return new V(a.x * k, a.y * k);
    }
  }, {
    key: "toCartesian",
    value: function toCartesian(r, theta) {
      return new V(r * Math.cos(theta), r * Math.sin(theta));
    }
  }]);

  return V;
}();

exports.default = V;
},{}],"particle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _vector = require("./vector.js");

var _vector2 = _interopRequireDefault(_vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Particle = function () {
  function Particle(pos, vel, radius, opacity) {
    _classCallCheck(this, Particle);

    this.pos = pos;
    this.vel = vel;
    this.r = radius;
    this.opacity = opacity;
  }

  _createClass(Particle, [{
    key: "update",
    value: function update(dt, w, h) {
      this.pos.add(_vector2.default.scale(this.vel, dt));

      // Bounce off the borders
      if (this.pos.x <= 0) {
        this.vel.x *= -1;this.pos.x = 0;
      }
      if (this.pos.x >= w) {
        this.vel.x *= -1;this.pos.x = w;
      }
      if (this.pos.y <= 0) {
        this.vel.y *= -1;this.pos.y = 0;
      }
      if (this.pos.y >= h) {
        this.vel.y *= -1;this.pos.y = h;
      }
    }
  }, {
    key: "draw",
    value: function draw(c) {
      c.fillStyle = "rgba(255, 255, 255, " + this.opacity + ")";
      c.globalAlpha = 1;
      // c.globalAlpha = this.opacity;
      c.beginPath();
      c.arc(this.pos.x, this.pos.y, this.r, 0, 2.0 * Math.PI);
      c.fill();
      c.closePath();
    }
  }]);

  return Particle;
}();

exports.default = Particle;
},{"./vector.js":"vector.js"}],"helper.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = nothing;
exports.dist = dist;
exports.rand = rand;
exports.randv = randv;

var _vector = require("./vector.js");

var _vector2 = _interopRequireDefault(_vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function nothing() {}

function dist(v0, v1) {
  var dx = v0.x - v1.x;
  var dy = v0.y - v1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function randv(minx, maxx, miny, maxy) {
  return new _vector2.default(rand(minx, maxx), rand(miny, maxy));
}
},{"./vector.js":"vector.js"}],"app.js":[function(require,module,exports) {
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _vector = require("./vector.js");

var _vector2 = _interopRequireDefault(_vector);

var _particle = require("./particle.js");

var _particle2 = _interopRequireDefault(_particle);

var _helper = require("./helper.js");

var _ = _interopRequireWildcard(_helper);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fps = 40;
var dt = 1.0 / fps;

var conDist = 180; // Minimum distance for the connection between particles to be shown

var Particles = function () {
  function Particles(n) {
    _classCallCheck(this, Particles);

    this.particles = [];
    this.canvas = document.getElementById('canvas');
    this.canvas.width = this.width = document.documentElement.clientWidth;
    this.canvas.height = this.height = document.documentElement.clientHeight;
    this.c = this.canvas.getContext('2d');
    this.c.strokeWeight = 2;
    this.hue = 0;
    this.createParticles(n);
  }

  _createClass(Particles, [{
    key: "createParticles",
    value: function createParticles(n) {
      for (var i = 0; i < n; i++) {
        this.particles.push(new _particle2.default(_.randv(0, this.width, 0, this.height), // Random Position
        _vector2.default.toCartesian(_.rand(50, 80), _.rand(0, 2 * Math.PI)), // Speed with random angle and intensity
        _.rand(1, 3), // Radius
        _.rand(.25, 1) // Opacity
        ));
      }
    }
  }, {
    key: "loop",
    value: function loop() {
      // this.c.fillStyle = '#124599';
      this.c.fillStyle = "hsl(" + this.hue + ", 70%, 40%)";
      this.c.fillRect(0, 0, this.width, this.height);

      this.c.strokeStyle = 'white';
      for (var i = 0; i < this.particles.length; i++) {
        this.particles[i].update(dt, this.width, this.height);
        this.particles[i].draw(this.c);

        // Draws the connections betweens particles
        // O(n²)... ikr...
        // At least j = i+1 was optimized, right?
        var d = void 0;
        for (var j = i + 1; j < this.particles.length; j++) {
          d = _.dist(this.particles[i].pos, this.particles[j].pos);
          if (d < conDist) {
            this.c.globalAlpha = (conDist - d) / conDist;
            this.c.beginPath();
            this.c.moveTo(this.particles[i].pos.x, this.particles[i].pos.y);
            this.c.lineTo(this.particles[j].pos.x, this.particles[j].pos.y);
            this.c.stroke();
            this.c.closePath();
          }
        }
      }

      this.hue = (this.hue + .2) % 360;
    }
  }]);

  return Particles;
}();

if (window.particles && window.particles.interval) clearInterval(window.particles.interval);

window.particles = new Particles(60);

window.particles.interval = setInterval(window.particles.loop.bind(window.particles), dt * 1000);
},{"./vector.js":"vector.js","./particle.js":"particle.js","./helper.js":"helper.js"}],"..\\..\\AppData\\Roaming\\npm\\node_modules\\parcel-bundler\\src\\builtins\\hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '31199' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["..\\..\\AppData\\Roaming\\npm\\node_modules\\parcel-bundler\\src\\builtins\\hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.277853f5.map