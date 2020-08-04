// @flow

import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import configureStore from './src/store/configureStore';

// eslint-disable-next-line import/prefer-default-export
export const replaceRenderer = ({
  bodyComponent,
  replaceBodyHTMLString,
  setHeadComponents,
}: any) => {
  const store = configureStore();
  const sheet = new ServerStyleSheet();

  replaceBodyHTMLString(
    renderToString(
      <Provider {...{ store }}>
        <StyleSheetManager sheet={sheet.instance}>
          {bodyComponent}
        </StyleSheetManager>
      </Provider>,
    ),
  );

  setHeadComponents([sheet.getStyleElement()]);
};
