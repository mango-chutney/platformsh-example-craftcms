// @flow

import * as React from 'react';
import ToastComposer from './ToastComposer';
import ToastComponent from './ToastComponent';
import type { $Props as $ChildProps } from './ToastComposer';

type $Props = {
  ...$ChildProps,
  ToastComponent?: $PropertyType<$ChildProps, 'ToastComponent'>,
};

const Toast = (props: $Props) => (
  <ToastComposer {...{ ToastComponent, ...props }} />
);

export default Toast;
