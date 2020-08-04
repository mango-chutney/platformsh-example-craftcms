"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bind = bind;
Object.defineProperty(exports, "getEventFundraisingTotals", {
  enumerable: true,
  get: function () {
    return _getEventFundraisingTotals.default;
  }
});
Object.defineProperty(exports, "getParticipantScoreBoard", {
  enumerable: true,
  get: function () {
    return _getParticipantScoreBoard.default;
  }
});
Object.defineProperty(exports, "getRegistrant", {
  enumerable: true,
  get: function () {
    return _getRegistrant.default;
  }
});
Object.defineProperty(exports, "getTeamScoreBoard", {
  enumerable: true,
  get: function () {
    return _getTeamScoreBoard.default;
  }
});
Object.defineProperty(exports, "mobileParticipant", {
  enumerable: true,
  get: function () {
    return _mobileParticipant.default;
  }
});
Object.defineProperty(exports, "postMessageBoardMain", {
  enumerable: true,
  get: function () {
    return _postMessageBoardMain.default;
  }
});
Object.defineProperty(exports, "teamByTeamID", {
  enumerable: true,
  get: function () {
    return _teamByTeamID.default;
  }
});
Object.defineProperty(exports, "teamSearchReg", {
  enumerable: true,
  get: function () {
    return _teamSearchReg.default;
  }
});
exports.bindWithBaseURL = void 0;

var _getEventFundraisingTotals = _interopRequireDefault(require("./getEventFundraisingTotals"));

var _getParticipantScoreBoard = _interopRequireDefault(require("./getParticipantScoreBoard"));

var _getRegistrant = _interopRequireDefault(require("./getRegistrant"));

var _getTeamScoreBoard = _interopRequireDefault(require("./getTeamScoreBoard"));

var _mobileParticipant = _interopRequireDefault(require("./mobileParticipant"));

var _postMessageBoardMain = _interopRequireDefault(require("./postMessageBoardMain"));

var _teamByTeamID = _interopRequireDefault(require("./teamByTeamID"));

var _teamSearchReg = _interopRequireDefault(require("./teamSearchReg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * webgetservice/index.js
 *
 * 
 */
function bind(config) {
  const {
    baseURL
  } = config;

  if (baseURL.match(/get[.]asmx\/?$/)) {
    throw new Error('Do not postfix baseURL with get.asmx');
  }

  if (baseURL.match(/mobile[.]asmx\/?$/)) {
    throw new Error('Do not postfix baseURL with mobile.asmx');
  }

  return {
    getEventFundraisingTotals: (...args) => (0, _getEventFundraisingTotals.default)(config, ...args),
    getParticipantScoreBoard: (...args) => (0, _getParticipantScoreBoard.default)(config, ...args),
    getRegistrant: (...args) => (0, _getRegistrant.default)(config, ...args),
    getTeamScoreBoard: (...args) => (0, _getTeamScoreBoard.default)(config, ...args),
    mobileParticipant: (...args) => (0, _mobileParticipant.default)(config, ...args),
    postMessageBoardMain: (...args) => (0, _postMessageBoardMain.default)(config, ...args),
    teamByTeamID: (...args) => (0, _teamByTeamID.default)(config, ...args),
    teamSearchReg: (...args) => (0, _teamSearchReg.default)(config, ...args)
  };
}

const bindWithBaseURL = bind;
exports.bindWithBaseURL = bindWithBaseURL;