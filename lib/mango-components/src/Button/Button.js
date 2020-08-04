// @flow

import * as React from 'react';
import ButtonComponent from './ButtonComponent';
import ButtonComposer from './ButtonComposer';
import type { $Props as $ComposerProps } from './ButtonComposer';

type $Props = {
  ...$ComposerProps,
  ButtonComponent?: $PropertyType<$ComposerProps, 'ButtonComponent'>,
};

const Button = (props: $Props) => (
  <ButtonComposer {...{ ButtonComponent, ...props }} />
);

export default Button;
