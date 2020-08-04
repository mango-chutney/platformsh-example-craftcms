"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _handleFetchErrors = _interopRequireDefault(require("../handleFetchErrors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = ({
  baseURL,
  fetch,
  headers
}, registrationId, registrant) => fetch(`${baseURL}/Registrations/${registrationId}`, {
  method: 'PUT',
  headers: _objectSpread({
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }, headers),
  body: JSON.stringify(registrant)
}).then(_handleFetchErrors.default).then(response => response.text());

exports.default = _default;