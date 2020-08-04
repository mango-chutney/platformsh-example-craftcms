// @flow

import * as React from 'react';
import RadioComposer from './RadioComposer';
import InputComponent from './InputComponent';
import InputDecoratorComponent from './InputDecoratorComponent';
import LabelComponent from './LabelComponent';
import WrapperComponent from './WrapperComponent';
import type { $Props as $ChildProps } from './RadioComposer';
import {
  createFormControlElementProps,
  createInputDecoratorProps,
  createLabelProps,
} from '../Input';

type $Props = {
  ...$ChildProps,
  LabelComponent: $PropertyType<$ChildProps, 'LabelComponent'>,
  InputComponent: $PropertyType<$ChildProps, 'InputComponent'>,
  InputDecoratorComponent: $PropertyType<
    $ChildProps,
    'InputDecoratorComponent',
  >,
  WrapperComponent: $PropertyType<$ChildProps, 'WrapperComponent'>,
};

const Radio = (props: $Props) => (
  <RadioComposer
    {...{
      LabelComponent,
      InputComponent,
      InputDecoratorComponent,
      WrapperComponent,
      createFormControlElementProps,
      createInputDecoratorProps,
      createLabelProps,
      ...props,
    }}
  />
);

export default Radio;
