parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"ji7c":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}();function n(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}var t=function(){function t(e,r){n(this,t),this.x=e,this.y=r}return e(t,[{key:"toInt",value:function(){this.x=~~x,this.y=~~y}},{key:"add",value:function(e){return this.x+=e.x,this.y+=e.y,this}}],[{key:"add",value:function(e,n){return new t(e.x+n.x,e.y+n.y)}},{key:"scale",value:function(e,n){return new t(e.x*n,e.y*n)}},{key:"toCartesian",value:function(e,n){return new t(e*Math.cos(n),e*Math.sin(n))}}]),t}();exports.default=t;
},{}],"Yogb":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=function(){function t(t,e){for(var s=0;s<e.length;s++){var i=e[s];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,s,i){return s&&t(e.prototype,s),i&&t(e,i),e}}(),e=require("./vector.js"),s=i(e);function i(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var n=function(){function e(t,s,i,n){o(this,e),this.pos=t,this.vel=s,this.r=i,this.opacity=n}return t(e,[{key:"update",value:function(t,e,i){this.pos.add(s.default.scale(this.vel,t)),this.pos.x<=0&&(this.vel.x*=-1,this.pos.x=0),this.pos.x>=e&&(this.vel.x*=-1,this.pos.x=e),this.pos.y<=0&&(this.vel.y*=-1,this.pos.y=0),this.pos.y>=i&&(this.vel.y*=-1,this.pos.y=i)}},{key:"draw",value:function(t){t.fillStyle="rgba(255, 255, 255, "+this.opacity+")",t.globalAlpha=1,t.beginPath(),t.arc(this.pos.x,this.pos.y,this.r,0,2*Math.PI),t.fill(),t.closePath()}}]),e}();exports.default=n;
},{"./vector.js":"ji7c"}],"YaYI":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=n,exports.dist=u,exports.rand=o,exports.randv=s;var e=require("./vector.js"),t=r(e);function r(e){return e&&e.__esModule?e:{default:e}}function n(){}function u(e,t){var r=e.x-t.x,n=e.y-t.y;return Math.sqrt(r*r+n*n)}function o(e,t){return Math.random()*(t-e)+e}function s(e,r,n,u){return new t.default(o(e,r),o(n,u))}
},{"./vector.js":"ji7c"}],"A2T1":[function(require,module,exports) {
"use strict";var t=function(){function t(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,i,s){return i&&t(e.prototype,i),s&&t(e,s),e}}(),e=require("./vector.js"),i=c(e),s=require("./particle.js"),r=c(s),a=require("./helper.js"),n=h(a);function h(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e.default=t,e}function c(t){return t&&t.__esModule?t:{default:t}}function l(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=40,u=1/o,p=180,d=function(){function e(t){l(this,e),this.particles=[],this.canvas=document.getElementById("canvas"),this.canvas.width=this.width=document.documentElement.clientWidth,this.canvas.height=this.height=document.documentElement.clientHeight,this.c=this.canvas.getContext("2d"),this.c.strokeWeight=2,this.hue=0,this.createParticles(t)}return t(e,[{key:"createParticles",value:function(t){for(var e=0;e<t;e++)this.particles.push(new r.default(n.randv(0,this.width,0,this.height),i.default.toCartesian(n.rand(50,80),n.rand(0,2*Math.PI)),n.rand(1,3),n.rand(.25,1)))}},{key:"loop",value:function(){this.c.fillStyle="hsl("+this.hue+", 70%, 40%)",this.c.fillRect(0,0,this.width,this.height),this.c.strokeStyle="white";for(var t=0;t<this.particles.length;t++){this.particles[t].update(u,this.width,this.height),this.particles[t].draw(this.c);for(var e=void 0,i=t+1;i<this.particles.length;i++)(e=n.dist(this.particles[t].pos,this.particles[i].pos))<p&&(this.c.globalAlpha=(p-e)/p,this.c.beginPath(),this.c.moveTo(this.particles[t].pos.x,this.particles[t].pos.y),this.c.lineTo(this.particles[i].pos.x,this.particles[i].pos.y),this.c.stroke(),this.c.closePath())}this.hue=(this.hue+.2)%360}}]),e}();window.particles&&window.particles.interval&&clearInterval(window.particles.interval),window.particles=new d(60),window.particles.interval=setInterval(window.particles.loop.bind(window.particles),1e3*u);
},{"./vector.js":"ji7c","./particle.js":"Yogb","./helper.js":"YaYI"}]},{},["A2T1"], null)
//# sourceMappingURL=/app.db472242.map