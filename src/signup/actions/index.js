// @flow

import * as actions from './types';

import * as kleberActionCreators from './kleber';

import * as regapiActionCreators from './regapi';

import * as appActionCreators from './app';

import * as spywareActionCreators from './spyware';

import * as artezActionCreators from './artez';

export * from './types';

export {
  appActionCreators,
  artezActionCreators,
  kleberActionCreators,
  regapiActionCreators,
  spywareActionCreators,
};

export default actions;
