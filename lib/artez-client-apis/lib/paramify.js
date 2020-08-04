"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

/*
 * paramify.js
 *
 * 
 */
function _default(params) {
  return Object.keys(params).filter(key => params[key] !== undefined).map(key => params[key] === undefined ? '' : `${key}=${encodeURIComponent(params[key])}`).join('&');
}