// @flow

import * as React from 'react';
import AnchorButtonComponent from './AnchorButtonComponent';
import ButtonComposer from './ButtonComposer';
import type { $Props as $ComposerProps } from './ButtonComposer';

type $Props = {
  ...$ComposerProps,
  ButtonComponent?: $PropertyType<$ComposerProps, 'ButtonComponent'>,
};

const AnchorButton = (props: $Props) => (
  <ButtonComposer {...{ ButtonComponent: AnchorButtonComponent, ...props }} />
);

export default AnchorButton;
