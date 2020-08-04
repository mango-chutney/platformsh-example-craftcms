"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

/*
 * handleFetchErrors.js
 *
 * 
 */
function _default(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }

  return response;
}