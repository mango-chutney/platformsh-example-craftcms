// @flow

import * as React from 'react';
import ToastPortal from './ToastPortal';
import ToastProviderComposer from './ToastProviderComposer';
import type { $Props as $ChildProps } from './ToastProviderComposer';

export type $Props = {
  ...$ChildProps,
  PortalComponent?: $PropertyType<$ChildProps, 'PortalComponent'>,
};

const ToastProvider = (props: $Props) => (
  <ToastProviderComposer {...{ PortalComponent: ToastPortal, ...props }} />
);

export default ToastProvider;
