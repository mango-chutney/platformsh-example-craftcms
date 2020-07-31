// @flow

import * as React from 'react';
import { DatePicker } from 'mango-components';
import { darken } from 'polished';
import { Input } from '.';
import * as styles from '../styles';

const StyledDatePicker = (props: any) => (
  <DatePicker
    {...{
      ComposedInputComponent: Input,
      theme: {
        datePicker: { disabledColor: darken(0.1, styles.palette.lightGray) },
      },
      ...props,
    }}
  />
);

export default StyledDatePicker;
