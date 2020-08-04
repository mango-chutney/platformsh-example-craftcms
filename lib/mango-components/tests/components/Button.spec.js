// @flow

import 'raf/polyfill';
import 'jest-styled-components';
import React from 'react';
import renderer from 'react-test-renderer';
import { Button } from '../../src/Button';

function ExampleButton() {
  return (
    <div>
      <Button onClick={() => {}}>Button</Button>
      <Button onClick={() => {}} expanded>
        Expanded Button
      </Button>
    </div>
  );
}

it('Button component renders correctly', () => {
  const tree = renderer.create(<ExampleButton />).toJSON();
  expect(tree).toMatchSnapshot();
});
