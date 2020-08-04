// @flow

import 'raf/polyfill';
import 'jest-styled-components';
import React from 'react';
import renderer from 'react-test-renderer';
import { Panel, PanelHeading, PanelSection } from '../../src';

function ExamplePanel() {
  return (
    <Panel>
      <PanelHeading>Panel Heading</PanelHeading>
      <PanelSection>Panel Section 1</PanelSection>
      <PanelSection>Panel Section 1</PanelSection>
    </Panel>
  );
}

it('Panel components (Panel, PanelHeading, PanelSection) renders correctly', () => {
  const tree = renderer.create(<ExamplePanel />).toJSON();
  expect(tree).toMatchSnapshot();
});
