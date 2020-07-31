// @flow

import * as React from 'react';
import { Provider } from 'react-redux';
import type { Store as $Store } from 'redux';
import { createGlobalStyle } from 'styled-components';
import styledNormalize from 'styled-normalize';
import { createTristiconFontFace } from 'mango-components';
import { Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import type { $State } from '../reducers';
import type { $Action } from '../actions';
import Wrapper from './Wrapper';
import * as styles from '../styles';

const GlobalStyle = createGlobalStyle`
  ${styledNormalize}
  ${styles.globalCss}
  ${createTristiconFontFace()};
`;

type $Props = {
  store: $Store<$State, $Action>,
};

class Root extends React.Component<$Props, void> {
  componentDidMount() {
    window.onbeforeunload = () => 'Are you sure you want to leave?';
  }

  render() {
    const { store, ...rest } = this.props;

    return (
      <Provider {...{ ...rest, store }}>
        <Router>
          <React.Fragment>
            <GlobalStyle />
            <Route exact path="/signup" component={Wrapper} />
            <Route exact path="/signup/:teamId" component={Wrapper} />
            <Route exact path="/team/signup" component={Wrapper} />
            <Route exact path="/school/signup" component={Wrapper} />
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default Root;
