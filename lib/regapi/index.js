"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bind = bind;
Object.defineProperty(exports, "getConstituents", {
  enumerable: true,
  get: function () {
    return _getConstituents.default;
  }
});
Object.defineProperty(exports, "getCorporateTeams", {
  enumerable: true,
  get: function () {
    return _getCorporateTeams.default;
  }
});
Object.defineProperty(exports, "getLocations", {
  enumerable: true,
  get: function () {
    return _getLocations.default;
  }
});
Object.defineProperty(exports, "getLogins", {
  enumerable: true,
  get: function () {
    return _getLogins.default;
  }
});
Object.defineProperty(exports, "getRegistrations", {
  enumerable: true,
  get: function () {
    return _getRegistrations.default;
  }
});
Object.defineProperty(exports, "getRegistrationTypes", {
  enumerable: true,
  get: function () {
    return _getRegistrationTypes.default;
  }
});
Object.defineProperty(exports, "getTeams", {
  enumerable: true,
  get: function () {
    return _getTeams.default;
  }
});
Object.defineProperty(exports, "getTeamTypes", {
  enumerable: true,
  get: function () {
    return _getTeamTypes.default;
  }
});
Object.defineProperty(exports, "getUDFs", {
  enumerable: true,
  get: function () {
    return _getUDFs.default;
  }
});
Object.defineProperty(exports, "getVanityURL", {
  enumerable: true,
  get: function () {
    return _getVanityURL.default;
  }
});
Object.defineProperty(exports, "postConstituents", {
  enumerable: true,
  get: function () {
    return _postConstituents.default;
  }
});
Object.defineProperty(exports, "postRegistrations", {
  enumerable: true,
  get: function () {
    return _postRegistrations.default;
  }
});
Object.defineProperty(exports, "postTeams", {
  enumerable: true,
  get: function () {
    return _postTeams.default;
  }
});
Object.defineProperty(exports, "postTransactions", {
  enumerable: true,
  get: function () {
    return _postTransactions.default;
  }
});
Object.defineProperty(exports, "putConstituents", {
  enumerable: true,
  get: function () {
    return _putConstituents.default;
  }
});
Object.defineProperty(exports, "putRegistrations", {
  enumerable: true,
  get: function () {
    return _putRegistrations.default;
  }
});
Object.defineProperty(exports, "putTeams", {
  enumerable: true,
  get: function () {
    return _putTeams.default;
  }
});
Object.defineProperty(exports, "putTransactions", {
  enumerable: true,
  get: function () {
    return _putTransactions.default;
  }
});
Object.defineProperty(exports, "putUDFs", {
  enumerable: true,
  get: function () {
    return _putUDFs.default;
  }
});
Object.defineProperty(exports, "recursivelyGetVanityURL", {
  enumerable: true,
  get: function () {
    return _recursivelyGetVanityURL.default;
  }
});
exports.bindWithBaseURL = void 0;

var _getConstituents = _interopRequireDefault(require("./getConstituents"));

var _getCorporateTeams = _interopRequireDefault(require("./getCorporateTeams"));

var _getLocations = _interopRequireDefault(require("./getLocations"));

var _getLogins = _interopRequireDefault(require("./getLogins"));

var _getRegistrations = _interopRequireDefault(require("./getRegistrations"));

var _getRegistrationTypes = _interopRequireDefault(require("./getRegistrationTypes"));

var _getTeams = _interopRequireDefault(require("./getTeams"));

var _getTeamTypes = _interopRequireDefault(require("./getTeamTypes"));

var _getUDFs = _interopRequireDefault(require("./getUDFs"));

var _getVanityURL = _interopRequireDefault(require("./getVanityURL"));

var _postConstituents = _interopRequireDefault(require("./postConstituents"));

var _postRegistrations = _interopRequireDefault(require("./postRegistrations"));

var _postTeams = _interopRequireDefault(require("./postTeams"));

var _postTransactions = _interopRequireDefault(require("./postTransactions"));

var _putConstituents = _interopRequireDefault(require("./putConstituents"));

var _putRegistrations = _interopRequireDefault(require("./putRegistrations"));

var _putTeams = _interopRequireDefault(require("./putTeams"));

var _putTransactions = _interopRequireDefault(require("./putTransactions"));

var _putUDFs = _interopRequireDefault(require("./putUDFs"));

var _recursivelyGetVanityURL = _interopRequireDefault(require("./recursivelyGetVanityURL"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * regapi/index.js
 *
 * 
 */
function bind(config) {
  return {
    getConstituents: (...args) => (0, _getConstituents.default)(config, ...args),
    getCorporateTeams: (...args) => (0, _getCorporateTeams.default)(config, ...args),
    getLocations: (...args) => (0, _getLocations.default)(config, ...args),
    getLogins: (...args) => (0, _getLogins.default)(config, ...args),
    getRegistrations: (...args) => (0, _getRegistrations.default)(config, ...args),
    getRegistrationTypes: (...args) => (0, _getRegistrationTypes.default)(config, ...args),
    getTeamTypes: (...args) => (0, _getTeamTypes.default)(config, ...args),
    getTeams: (...args) => (0, _getTeams.default)(config, ...args),
    getUDFs: (...args) => (0, _getUDFs.default)(config, ...args),
    getVanityURL: (...args) => (0, _getVanityURL.default)(config, ...args),
    postConstituents: (...args) => (0, _postConstituents.default)(config, ...args),
    postRegistrations: (...args) => (0, _postRegistrations.default)(config, ...args),
    postTeams: (...args) => (0, _postTeams.default)(config, ...args),
    postTransactions: (...args) => (0, _postTransactions.default)(config, ...args),
    putConstituents: (...args) => (0, _putConstituents.default)(config, ...args),
    putRegistrations: (...args) => (0, _putRegistrations.default)(config, ...args),
    putTeams: (...args) => (0, _putTeams.default)(config, ...args),
    putTransactions: (...args) => (0, _putTransactions.default)(config, ...args),
    putUDFs: (...args) => (0, _putUDFs.default)(config, ...args),
    recursivelyGetVanityURL: (...args) => (0, _recursivelyGetVanityURL.default)(config, ...args)
  };
}

const bindWithBaseURL = bind;
exports.bindWithBaseURL = bindWithBaseURL;