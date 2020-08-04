// @flow

import * as React from 'react';
import { Button, AnchorButton } from 'mango-components';
import Layout from '../../../containers/Layout';

const ButtonExample = () => (
  <Layout>
    <h2>Button</h2>
    <Button onClick={() => {}}>Button</Button>
    <h2>AnchorButton</h2>
    <AnchorButton href="/">AnchorButton</AnchorButton>
  </Layout>
);

export default ButtonExample;
