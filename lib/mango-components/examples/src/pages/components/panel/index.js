// @flow

import * as React from 'react';
import { Panel, PanelHeading, PanelSection } from 'mango-components';
import Layout from '../../../containers/Layout';

const PanelExample = () => (
  <Layout>
    <div>
      <h2>Panel</h2>
      <Panel>
        <PanelHeading>PanelHeading</PanelHeading>
        Lorem ipsum
      </Panel>
      <Panel>
        <PanelHeading>PanelHeading</PanelHeading>
        <PanelSection>PanelSection</PanelSection>
        <PanelSection>PanelSection</PanelSection>
        <PanelSection>PanelSection</PanelSection>
      </Panel>
      <Panel>
        <PanelSection>PanelSection</PanelSection>
        <PanelSection>PanelSection</PanelSection>
        <PanelSection>PanelSection</PanelSection>
      </Panel>
    </div>
  </Layout>
);

export default PanelExample;
