// @flow

import 'raf/polyfill';
import 'jest-styled-components';
import React from 'react';
import renderer from 'react-test-renderer';
import { Avatar } from '../../src';

function ExampleAvatar() {
  return (
    <div>
      <Avatar />
      <Avatar name="test" />
      <Avatar backgroundImage="https://placeholdit.imgix.net/~text?txtsize=33&txt=&w=50&h=50" />
      <Avatar width="200px" />
      <Avatar fontSize="40px" />
    </div>
  );
}

it('Avatar component renders correctly', () => {
  const tree = renderer.create(<ExampleAvatar />).toJSON();
  expect(tree).toMatchSnapshot();
});
