// @flow

import * as React from 'react';
import { Portal } from 'react-portal';
import ArrowComponent from './ArrowComponent';
import PopperComponent from './PopperComponent';
import UnmanagedTootlipComposer from './UnmanagedTootlipComposer';
import type { $Props as $ChildProps } from './UnmanagedTootlipComposer';

export type $Props = {
  ...$ChildProps,
  PortalComponent?: $PropertyType<$ChildProps, 'PortalComponent'>,
  ArrowComponent?: $PropertyType<$ChildProps, 'ArrowComponent'>,
  PopperComponent?: $PropertyType<$ChildProps, 'PopperComponent'>,
};

const UnmanagedTootlip = (props: $Props) => (
  <UnmanagedTootlipComposer
    {...{ PortalComponent: Portal, ArrowComponent, PopperComponent, ...props }}
  />
);

export default UnmanagedTootlip;
