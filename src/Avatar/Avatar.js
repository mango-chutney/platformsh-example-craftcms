// @flow

import * as React from 'react';

import AvatarComponent from './AvatarComponent';
import AvatarComposer from './AvatarComposer';
import type { $Props as $ChildProps } from './AvatarComposer';

export type $Props = {
  ...$ChildProps,
  AvatarComponent?: $PropertyType<$ChildProps, 'AvatarComponent'>,
};

const Avatar = (props: $Props) => (
  <AvatarComposer {...{ AvatarComponent, ...props }} />
);

export default Avatar;
