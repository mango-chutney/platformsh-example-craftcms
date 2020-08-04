// @flow

import 'raf/polyfill';
import 'jest-styled-components';
import React from 'react';
import renderer from 'react-test-renderer';
import { Tristicon } from '../../src';

function ExampleTristicon() {
  return <Tristicon icon="star" />;
}

it('Tristicon component renders correctly', () => {
  const tree = renderer.create(<ExampleTristicon />).toJSON();
  expect(tree).toMatchSnapshot();
});
