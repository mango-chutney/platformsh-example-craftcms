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
}, personalization) => {
  const formData = new FormData();
  formData.append('languageCode', 'en-CA');
  formData.append('responseType', 'JSON');
  Object.keys(personalization).forEach(key => formData.append(key, personalization[key]));
  return fetch(`${baseURL}/personalizationPost.aspx`, {
    method: 'POST',
    headers: _objectSpread({
      Accept: 'application/json'
    }, headers),
    body: formData,
    credentials: 'same-origin'
  }).then(_handleFetchErrors.default).then(response => response.text());
};

exports.default = _default;