// @flow

import * as React from 'react';
import ParentNodePopperManager from './ParentNodePopperManager';
import UnmanagedTootlip from './UnmanagedTootlip';
import type { $Props } from './UnmanagedTootlip';

const Tootlip = (props: $Props) => (
  <ParentNodePopperManager tag="span">
    <UnmanagedTootlip {...props} />
  </ParentNodePopperManager>
);

export default Tootlip;
