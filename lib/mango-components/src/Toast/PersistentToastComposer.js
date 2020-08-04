// @flow

import * as React from 'react';
import once from 'lodash/once';
import type { $Props } from './ToastComposer';
import ToastComposer from './ToastComposer';

export type { $Props };

// This is a class for the sake of restricting dimiss to run once.  If this were
// a functional component, each render would create a new `once` bound function,
// so it wouldn't actually limit dismiss from being called more than once.  This
// way, it gets bound when the instance is created only.
//
// More info: https://stackoverflow.com/a/28046731

class PersistentToastComposer extends React.Component<$Props> {
  handleClick = once(() => {
    const { dismiss } = this.props;
    dismiss();
  });

  render() {
    return (
      <ToastComposer
        {...{
          ...this.props,
          onClick: this.handleClick,
        }}
      />
    );
  }
}

export default PersistentToastComposer;
