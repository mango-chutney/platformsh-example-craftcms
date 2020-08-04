// @flow

import * as React from 'react';
import InputDecoratorComponent from './InputDecoratorComponent';
import LabelComponent from './LabelComponent';
import TextAreaComponent from './TextAreaComponent';
import TextAreaComposer from './TextAreaComposer';
import {
  createLabelProps,
  createInputDecoratorProps,
  createFormControlElementProps,
} from '../Input';
import type { $Props as $ChildProps } from './TextAreaComposer';

export type $Props = {
  ...$ChildProps,
  InputDecoratorComponent: $PropertyType<
    $ChildProps,
    'InputDecoratorComponent',
  >,
  LabelComponent: $PropertyType<$ChildProps, 'LabelComponent'>,
  TextAreaComponent: $PropertyType<$ChildProps, 'TextAreaComponent'>,
  createFormControlElementProps: $PropertyType<
    $ChildProps,
    'createFormControlElementProps',
  >,
  createInputDecoratorProps: $PropertyType<
    $ChildProps,
    'createInputDecoratorProps',
  >,
  createLabelProps: $PropertyType<$ChildProps, 'createLabelProps'>,
};

const TextArea = (props: $Props) => (
  <TextAreaComposer
    {...{
      InputDecoratorComponent,
      TextAreaComponent,
      LabelComponent,
      createLabelProps,
      createInputDecoratorProps,
      createFormControlElementProps,
      ...props,
    }}
  />
);

export default TextArea;
