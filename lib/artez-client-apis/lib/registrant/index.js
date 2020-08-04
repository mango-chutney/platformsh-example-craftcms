"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bind = bind;
Object.defineProperty(exports, "personalizationPost", {
  enumerable: true,
  get: function () {
    return _personalizationPost.default;
  }
});
exports.bindWithBaseURL = void 0;

var _personalizationPost = _interopRequireDefault(require("./personalizationPost"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * registrant/index.js
 *
 * 
 */
function bind(config) {
  return {
    personalizationPost: (...args) => (0, _personalizationPost.default)(config, ...args)
  };
}

const bindWithBaseURL = bind;
exports.bindWithBaseURL = bindWithBaseURL;