// @flow

import { applyMiddleware, createStore } from 'redux';
import type { Store as $Store } from 'redux';
import thunk from 'redux-thunk';
import merge from 'lodash/merge';
import { createLogger } from 'redux-logger';
import rootReducer, { initialState } from '../reducers';
import type { $State } from '../reducers';
import type { $Action } from '../actions';
import createSpywareStoreEnhancer from './createSpywareStoreEnhancer';

const middleware =
  process.env.NODE_ENV === 'development'
    ? [thunk, createLogger()]
    : [thunk, createSpywareStoreEnhancer()];

export default (preloadedState: Object): $Store<$State, $Action> =>
  createStore(
    rootReducer,
    merge({}, initialState, preloadedState),
    // $FlowFixMe
    applyMiddleware(...middleware),
  );
