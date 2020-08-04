"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.webgetservice = exports.registrant = exports.regapi = exports.default = void 0;

var regapi = _interopRequireWildcard(require("./regapi"));

exports.regapi = regapi;

var registrant = _interopRequireWildcard(require("./registrant"));

exports.registrant = registrant;

var webgetservice = _interopRequireWildcard(require("./webgetservice"));

exports.webgetservice = webgetservice;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * index.js
 *
 * 
 */
var _default = {
  regapi,
  registrant,
  webgetservice
};
exports.default = _default;