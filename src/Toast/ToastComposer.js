// @flow

import * as React from 'react';
import type { $Toast, $TransitionState } from './ToastProviderComposer';

export type $Props = {
  ToastComponent: $Toast,
  dismiss: () => void,
  transitionState: $TransitionState,
};

const ToastComposer = (props: $Props) => {
  const { ToastComponent, transitionState, ...rest } = props;

  return <ToastComponent {...{ ...rest, transitionState }} />;
};

export default ToastComposer;
