// @flow

import * as React from 'react';
import ComposedInputComponent from './ComposedInputComponent';
import DatePickerComposer from './DatePickerComposer';
import OverlayComponent from './OverlayComponent';
import OverlayWrapperComponent from './OverlayWrapperComponent';
import type { $Props as $ChildProps } from './DatePickerComposer';

type $Props = {
  ...$ChildProps,
  ComposedInputComponent: $PropertyType<$ChildProps, 'ComposedInputComponent'>,
  OverlayComponent: $PropertyType<$ChildProps, 'OverlayComponent'>,
  OverlayWrapperComponent: $PropertyType<
    $ChildProps,
    'OverlayWrapperComponent',
  >,
};

const DatePicker = (props: $Props) => (
  <DatePickerComposer
    {...{
      ComposedInputComponent,
      OverlayComponent,
      OverlayWrapperComponent,
      ...props,
    }}
  />
);

export default DatePicker;
