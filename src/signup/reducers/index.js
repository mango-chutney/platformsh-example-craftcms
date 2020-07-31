// @flow

import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import kleberReducer, { initialState as initialKleberState } from './kleber';
import type { $State as $KleberState } from './kleber';
import artezReducer, { initialState as initialArtezState } from './artez';
import type { $State as $ArtezState } from './artez';
import appReducer, { initialState as initialAppState } from './app';
import type { $State as $AppState } from './app';
import { formKeys } from '../constants';

export type $State = {
  app: $AppState,
  artez: $ArtezState,
  kleber: $KleberState,
  form: {
    [typeof formKeys]: {
      registeredFields: {
        [string]: { name: string, type: string, count: number },
      },
      submitSucceeded: boolean,
    },
  },
};

export const initialState = {
  app: initialAppState,
  artez: initialArtezState,
  kleber: initialKleberState,
  form: {},
};

export default combineReducers({
  app: appReducer,
  artez: artezReducer,
  form: reduxFormReducer,
  kleber: kleberReducer,
});
