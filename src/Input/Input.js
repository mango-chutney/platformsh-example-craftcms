// @flow

import * as React from 'react';
import InputComposer from './InputComposer';
import InputComponent from './InputComponent';
import InputDecoratorComponent from './InputDecoratorComponent';
import InputLabelComponent from './InputLabelComponent';
import createFormControlElementProps from './createFormControlElementProps';
import createInputDecoratorProps from './createInputDecoratorProps';
import createLabelProps from './createLabelProps';
import type { $Props as $ChildProps } from './InputComposer';

export type $Props = {
  ...$ChildProps,
  InputComponent?: $PropertyType<$ChildProps, 'InputComponent'>,
  InputDecoratorComponent?: $PropertyType<
    $ChildProps,
    'InputDecoratorComponent',
  >,
  InputLabelComponent?: $PropertyType<$ChildProps, 'InputLabelComponent'>,
  createFormControlElementProps?: $PropertyType<
    $ChildProps,
    'createFormControlElementProps',
  >,
  createInputDecoratorProps?: $PropertyType<
    $ChildProps,
    'createInputDecoratorProps',
  >,
  createLabelProps?: $PropertyType<$ChildProps, 'createLabelProps'>,
};

const Input = (props: $Props) => (
  <InputComposer
    {...{
      InputComponent,
      InputDecoratorComponent,
      InputLabelComponent,
      createFormControlElementProps,
      createInputDecoratorProps,
      createLabelProps,
      ...props,
    }}
  />
);

export default Input;
