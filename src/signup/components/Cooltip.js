// @flow

import * as React from 'react';
import { Cooltip } from 'mango-components';
import { rem } from 'polished';
import * as styles from '../styles';
import { Input, Select, LabelComponent } from '.';
import { styledTheme as styledInputTheme } from './Input';

const styledTheme = {
  ...styledInputTheme,
  coolChild: {
    activeBackgroundColor: styles.palette.tertiary,
    backgroundColor: styles.palette.white,
    border: styles.palette.border,
    fontSize: rem(16),
  },
  tiptext: {
    fontSize: rem(14),
    fontWeight: styles.fontWeight.semibold,
  },
};

const StyledCooltip = (props: any) => (
  <Cooltip
    {...{
      theme: styledTheme,
      ComposedInputComponent: Input,
      ComposedSelectComponent: Select,
      LabelComponent,
      ...props,
    }}
  />
);

export default StyledCooltip;
