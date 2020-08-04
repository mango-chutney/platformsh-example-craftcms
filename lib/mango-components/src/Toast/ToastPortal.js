// @flow

import * as React from 'react';
import { Portal } from 'react-portal';
import ToastPortalComposer from './ToastPortalComposer';
import ToastContainerComponent from './ToastContainerComponent';
import type { $Props } from './ToastPortalComposer';

const ToastPortal = (props: $Props) => (
  <ToastPortalComposer
    {...{ ToastContainerComponent, PortalComponent: Portal, ...props }}
  />
);

export default ToastPortal;
