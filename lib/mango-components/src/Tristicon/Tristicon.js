// @flow

import * as React from 'react';

import TristiconComponent from './TristiconComponent';
import TristiconComposer from './TristiconComposer';
import type { $Props as $ChildProps } from './TristiconComposer';

type $Props = {
  ...$ChildProps,
  TristiconComponent?: $PropertyType<$ChildProps, 'TristiconComponent'>,
};

const Tristicon = (props: $Props) => (
  <TristiconComposer {...{ TristiconComponent, ...props }} />
);

export default Tristicon;
