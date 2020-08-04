"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _handleFetchErrors = _interopRequireDefault(require("../handleFetchErrors"));

var _paramify = _interopRequireDefault(require("../paramify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = ({
  baseURL,
  fetch,
  headers
}, eventId, teamName = '', captainFirstName = '', captainLastName = '', eventLocationId = 0, eventLocationStartTimeID = 0) => {
  const params = (0, _paramify.default)({
    eventID: eventId,
    teamName,
    captainFirstName,
    captainLastName,
    eventLocationId,
    eventLocationStartTimeID
  });
  return fetch(`${baseURL}/get.asmx/teamSearchReg?${params}`, {
    method: 'GET',
    headers: _objectSpread({
      Accept: 'text/xml; charset=utf-8'
    }, headers)
  }).then(_handleFetchErrors.default).then(response => response.text());
};

exports.default = _default;