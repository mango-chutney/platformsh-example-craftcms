// @flow

import * as React from 'react';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';

const store = configureStore();

// eslint-disable-next-line import/prefer-default-export
export const wrapRootElement = ({ element }: any) => (
  <Provider {...{ store }}>{element}</Provider>
);
