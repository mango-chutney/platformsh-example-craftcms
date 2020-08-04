// @flow

import * as React from 'react';

import PersistentToastComposer from './PersistentToastComposer';
import ToastComponent from './ToastComponent';
import type { $Props as $ChildProps } from './PersistentToastComposer';

type $Props = {
  ...$ChildProps,
  ToastComponent?: $PropertyType<$ChildProps, 'ToastComponent'>,
};

const Toast = (props: $Props) => (
  <PersistentToastComposer {...{ ToastComponent, ...props }} />
);

export default Toast;
