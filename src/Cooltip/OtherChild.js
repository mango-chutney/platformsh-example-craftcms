// @flow

import * as React from 'react';
import CoolChild from './CoolChild';
import type $Props from './CoolChild';

function OtherChild(props: $Props) {
  const { ...rest } = props;

  return <CoolChild {...rest} />;
}

OtherChild.displayName = 'OtherChild';

export default OtherChild;
