// @flow

import '@babel/polyfill';
import * as React from 'react';
import { render } from 'react-dom';
import configureStore from './store';
import Root from './containers/Root';
import { createKleberApi, spyware } from './api';
import { spywareActionCreators } from './actions';

const kleber = createKleberApi();

kleber.getKleberRequestKey().then(kleberRequestKey => {
  const initialState = { kleber: { kleberRequestKey } };

  const store = configureStore(initialState);

  const { dispatch } = store;

  dispatch(
    // $FlowFixMe
    spywareActionCreators.makeGoogleAnalyticsRequest(
      spywareActionCreators.didLandOnRegistrationPageEvent,
    ),
  );

  spyware.makeFloodlightRequestOnDidLandOnRegistrationPageEvent();

  const rootElement = document.getElementById('app');

  if (!rootElement) {
    return;
  }

  render(<Root {...{ store }} />, rootElement);
});
