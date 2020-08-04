"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getVanityURL = _interopRequireDefault(require("./getVanityURL"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * regapi/recursivelyGetVanityURL.js
 *
 * 
 */
function recursivelyGetVanityURL({
  baseURL,
  fetch,
  headers
}, vanityURLSlug, count) {
  const __count = count === undefined || count === null ? 0 : count;

  const __vanityURLSlug = count === undefined ? vanityURLSlug.replace(/[\W_]+/g, '') : `${vanityURLSlug}${__count}`.replace(/[\W_]+/g, '');

  return (0, _getVanityURL.default)({
    baseURL,
    fetch,
    headers
  }, __vanityURLSlug).catch(() => recursivelyGetVanityURL({
    baseURL,
    fetch,
    headers
  }, vanityURLSlug, __count + 1));
}

var _default = recursivelyGetVanityURL;
exports.default = _default;