/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./animation-demo.js":
/*!***************************!*\
  !*** ./animation-demo.js ***!
  \***************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animation */ \"./animation.js\");\n/* harmony import */ var _ease__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ease */ \"./ease.js\");\n\n\nvar tl = new _animation__WEBPACK_IMPORTED_MODULE_0__.Timeline();\ntl.start();\ntl.add(new _animation__WEBPACK_IMPORTED_MODULE_0__.Animation(document.querySelector(\"#el\").style, 'transform', 0, 500, 2000, 0, _ease__WEBPACK_IMPORTED_MODULE_1__.easeInOut, function (v) {\n  return \"translateX(\".concat(v, \"px)\");\n}));\ndocument.querySelector('#el2').style.transition = '2s ease-in-out';\ndocument.querySelector('#el2').style.transform = 'translateX(500px)';\ndocument.querySelector('#pause-btn').addEventListener('click', function () {\n  return tl.pause();\n});\ndocument.querySelector('#resume-btn').addEventListener('click', function () {\n  return tl.resume();\n});\n\n//# sourceURL=webpack://jsx/./animation-demo.js?");

/***/ }),

/***/ "./animation.js":
/*!**********************!*\
  !*** ./animation.js ***!
  \**********************/
/*! namespace exports */
/*! export Animation [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Timeline [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Timeline\": () => /* binding */ Timeline,\n/* harmony export */   \"Animation\": () => /* binding */ Animation\n/* harmony export */ });\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar TICK = Symbol(\"tick\");\nvar TICK_HANDLER = Symbol('tick-handler');\nvar ANIMATIONS = Symbol(\"animations\");\nvar START_TIME = Symbol('start-time');\nvar PAUSE_START = Symbol('pause-start');\nvar PAUSE_TIME = Symbol('pause-time');\nvar Timeline = /*#__PURE__*/function () {\n  function Timeline() {\n    _classCallCheck(this, Timeline);\n\n    this.state = \"Inited\";\n    this[ANIMATIONS] = new Set();\n    this[START_TIME] = new Map();\n  }\n\n  _createClass(Timeline, [{\n    key: \"start\",\n    value: function start() {\n      var _this = this;\n\n      if (this.state !== \"Inited\") return;\n      this.state = \"started\";\n      var startTime = Date.now();\n      this[PAUSE_TIME] = 0;\n\n      this[TICK] = function () {\n        var now = Date.now();\n\n        var _iterator = _createForOfIteratorHelper(_this[ANIMATIONS]),\n            _step;\n\n        try {\n          for (_iterator.s(); !(_step = _iterator.n()).done;) {\n            var animation = _step.value;\n            var t = void 0;\n            if (_this[START_TIME].get(animation) < startTime) t = now - startTime - _this[PAUSE_TIME] - animation.delay;else t = now - _this[START_TIME].get(animation) - _this[PAUSE_TIME] - animation.delay;\n\n            if (animation.duration < t) {\n              _this[ANIMATIONS][\"delete\"](animation);\n\n              t = animation.duration;\n            }\n\n            if (t > 0) animation.receive(t);\n          }\n        } catch (err) {\n          _iterator.e(err);\n        } finally {\n          _iterator.f();\n        }\n\n        _this[TICK_HANDLER] = requestAnimationFrame(_this[TICK]);\n      };\n\n      this[TICK]();\n    }\n  }, {\n    key: \"pause\",\n    value: function pause() {\n      if (this.state !== \"started\") return;\n      this.state = \"paused\";\n      this[PAUSE_START] = Date.now();\n      cancelAnimationFrame(this[TICK_HANDLER]);\n    }\n  }, {\n    key: \"resume\",\n    value: function resume() {\n      if (this.state !== \"paused\") return;\n      this.state = \"started\";\n      this[PAUSE_TIME] += Date.now() - this[PAUSE_START];\n      this[TICK]();\n    }\n  }, {\n    key: \"reset\",\n    value: function reset() {\n      this.pause();\n      this.state = \"Inited\";\n      var startTime = Date.now(); // 这样写没有用\n\n      this[PAUSE_TIME] = 0;\n      this[ANIMATIONS] = new Set();\n      this[START_TIME] = new Map();\n      this[PAUSE_START] = 0;\n      this[TICK_HANDLER] = null;\n    }\n  }, {\n    key: \"add\",\n    value: function add(animation, startTime) {\n      if (arguments.length < 2) {\n        startTime = Date.now();\n      }\n\n      this[ANIMATIONS].add(animation);\n      this[START_TIME].set(animation, startTime);\n    }\n  }]);\n\n  return Timeline;\n}();\nvar Animation = /*#__PURE__*/function () {\n  function Animation(object, property, startValue, endValue, duration, delay, timingFunction, template) {\n    _classCallCheck(this, Animation);\n\n    timingFunction = timingFunction || function (v) {\n      return v;\n    };\n\n    template = template || function (v) {\n      return v;\n    };\n\n    this.object = object;\n    this.property = property;\n    this.startValue = startValue;\n    this.endValue = endValue;\n    this.duration = duration;\n    this.delay = delay;\n    this.timingFunction = timingFunction;\n    this.template = template;\n  } // time 可以理解为，当前动画执行到那个时间。    0 < time < this.duration\n\n\n  _createClass(Animation, [{\n    key: \"receive\",\n    value: function receive(time) {\n      console.log('time: ' + time);\n      var range = this.endValue - this.startValue;\n      var progress = this.timingFunction(time / this.duration);\n      this.object[this.property] = this.template(this.startValue + range * progress);\n    }\n  }]);\n\n  return Animation;\n}();\n\n//# sourceURL=webpack://jsx/./animation.js?");

/***/ }),

/***/ "./ease.js":
/*!*****************!*\
  !*** ./ease.js ***!
  \*****************/
/*! namespace exports */
/*! export cubicBezier [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ease [provided] [no usage info] [missing usage info prevents renaming] */
/*! export easeIn [provided] [no usage info] [missing usage info prevents renaming] */
/*! export easeInOut [provided] [no usage info] [missing usage info prevents renaming] */
/*! export easeOut [provided] [no usage info] [missing usage info prevents renaming] */
/*! export linear [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"cubicBezier\": () => /* binding */ cubicBezier,\n/* harmony export */   \"ease\": () => /* binding */ ease,\n/* harmony export */   \"linear\": () => /* binding */ linear,\n/* harmony export */   \"easeIn\": () => /* binding */ easeIn,\n/* harmony export */   \"easeOut\": () => /* binding */ easeOut,\n/* harmony export */   \"easeInOut\": () => /* binding */ easeInOut\n/* harmony export */ });\n// export let linear = v=> v;\n\n/**\n 如果我们使用贝塞尔曲线的直接定义，是没办法直接根据时间来计算出数值的，因此，浏览器中一般都采用了数值算法，其中\n 公认做有效的是牛顿积分，我们可以看下 JavaScript 版本的代码：\n */\nfunction cubicBezier(p1x, p1y, p2x, p2y) {\n  var ZERO_LIMIT = 1e-6; // Calculate the polynomial coefficients,\n  // implicit first and last control points are (0,0) and (1,1).\n\n  var ax = 3 * p1x - 3 * p2x + 1;\n  var bx = 3 * p2x - 6 * p1x;\n  var cx = 3 * p1x;\n  var ay = 3 * p1y - 3 * p2y + 1;\n  var by = 3 * p2y - 6 * p1y;\n  var cy = 3 * p1y;\n\n  function sampleCurveDerivativeX(t) {\n    // `ax t^3 + bx t^2 + cx t' expanded using Horner 's rule.\n    return (3 * ax * t + 2 * bx) * t + cx;\n  }\n\n  function sampleCurveX(t) {\n    return ((ax * t + bx) * t + cx) * t;\n  }\n\n  function sampleCurveY(t) {\n    return ((ay * t + by) * t + cy) * t;\n  } // Given an x value, find a parametric value it came from.\n\n\n  function solveCurveX(x) {\n    var t2 = x;\n    var derivative;\n    var x2; // https://trac.webkit.org/browser/trunk/Source/WebCore/platform/animation\n    // First try a few iterations of Newton's method -- normally very fast.\n    // http://en.wikipedia.org/wiki/Newton's_method\n\n    for (var i = 0; i < 8; i++) {\n      // f(t)-x=0\n      x2 = sampleCurveX(t2) - x;\n\n      if (Math.abs(x2) < ZERO_LIMIT) {\n        return t2;\n      }\n\n      derivative = sampleCurveDerivativeX(t2); // == 0, failure\n\n      /* istanbul ignore if */\n\n      if (Math.abs(derivative) < ZERO_LIMIT) {\n        break;\n      }\n\n      t2 -= x2 / derivative;\n    } // Fall back to the bisection method for reliability.\n    // bisection\n    // http://en.wikipedia.org/wiki/Bisection_method\n\n\n    var t1 = 1;\n    /* istanbul ignore next */\n\n    var t0 = 0;\n    /* istanbul ignore next */\n\n    t2 = x;\n    /* istanbul ignore next */\n\n    while (t1 > t0) {\n      x2 = sampleCurveX(t2) - x;\n\n      if (Math.abs(x2) < ZERO_LIMIT) {\n        return t2;\n      }\n\n      if (x2 > 0) {\n        t1 = t2;\n      } else {\n        t0 = t2;\n      }\n\n      t2 = (t1 + t0) / 2;\n    } // Failure\n\n\n    return t2;\n  }\n\n  function solve(x) {\n    return sampleCurveY(solveCurveX(x));\n  }\n\n  return solve;\n}\nvar ease = cubicBezier(.25, .1, .25, 1);\nvar linear = cubicBezier(0, 0, 1, 1);\nvar easeIn = cubicBezier(.42, 0, 1, 1);\nvar easeOut = cubicBezier(0, 0, .58, 1);\nvar easeInOut = cubicBezier(.42, 0, .58, 1);\n\n//# sourceURL=webpack://jsx/./ease.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./animation-demo.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;