// @flow

import * as React from 'react';
import CheckboxComposer from './CheckboxComposer';
import CheckboxContainerComponent from './CheckboxContainerComponent';
import InputComponent from './InputComponent';
import InputDecoratorComponent from './InputDecoratorComponent';
import LabelComponent from './LabelComponent';
import WrapperComponent from './WrapperComponent';
import type { $Props as $ChildProps } from './CheckboxComposer';
import {
  createFormControlElementProps,
  createInputDecoratorProps,
  createLabelProps,
} from '../Input';

type $Props = {
  ...$ChildProps,
  CheckboxContainerComponent: $PropertyType<
    $ChildProps,
    'CheckboxContainerComponent',
  >,
  InputComponent: $PropertyType<$ChildProps, 'InputComponent'>,
  InputDecoratorComponent: $PropertyType<
    $ChildProps,
    'InputDecoratorComponent',
  >,
  LabelComponent: $PropertyType<$ChildProps, 'LabelComponent'>,
  WrapperComponent: $PropertyType<$ChildProps, 'WrapperComponent'>,
};

const Checkbox = (props: $Props) => (
  <CheckboxComposer
    {...{
      CheckboxContainerComponent,
      InputComponent,
      InputDecoratorComponent,
      LabelComponent,
      WrapperComponent,
      createFormControlElementProps,
      createInputDecoratorProps,
      createLabelProps,
      ...props,
    }}
  />
);

export default Checkbox;
