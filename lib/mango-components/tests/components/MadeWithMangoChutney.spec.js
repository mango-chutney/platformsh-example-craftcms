// @flow

import 'raf/polyfill';
import 'jest-styled-components';
import React from 'react';
import renderer from 'react-test-renderer';
import { MadeWithMangoChutney } from '../../src';

it('MadeWithMangoChutney component renders correctly', () => {
  const tree = renderer.create(<MadeWithMangoChutney />).toJSON();
  expect(tree).toMatchSnapshot();
});
