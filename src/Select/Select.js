// @flow

import * as React from 'react';
import InputDecoratorComponent from './InputDecoratorComponent';
import LabelComponent from './LabelComponent';
import SelectComponent from './SelectComponent';
import SelectComposer from './SelectComposer';
import {
  createFormControlElementProps,
  createInputDecoratorProps,
  createLabelProps,
} from '../Input';
import type { $Props as $ChildProps } from './SelectComposer';

export type $Props = {
  ...$ChildProps,
  InputDecoratorComponent?: $PropertyType<
    $ChildProps,
    'InputDecoratorComponent',
  >,
  LabelComponent?: $PropertyType<$ChildProps, 'LabelComponent'>,
  SelectComponent?: $PropertyType<$ChildProps, 'SelectComponent'>,
};

const Select = (props: $Props) => (
  <SelectComposer
    {...{
      InputDecoratorComponent,
      LabelComponent,
      SelectComponent,
      createFormControlElementProps,
      createInputDecoratorProps,
      createLabelProps,
      ...props,
    }}
  />
);

export default Select;
