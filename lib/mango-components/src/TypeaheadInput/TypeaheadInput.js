// @flow

import * as React from 'react';
import TypeaheadInputComposer from './TypeaheadInputComposer';
import { Input as ComposedInputComponent, createLabelProps } from '../Input';
import InputComponent from './InputComponent';
import ItemComponent from './ItemComponent';
import MenuComponent from './MenuComponent';
import MenuWrapperComponent from './MenuWrapperComponent';
import type { $Props as $ChildProps } from './TypeaheadInputComposer';

type $Props = {
  ...$ChildProps,
  ComposedInputComponent?: $PropertyType<$ChildProps, 'ComposedInputComponent'>,
  InputComponent?: $PropertyType<$ChildProps, 'InputComponent'>,
  ItemComponent?: $PropertyType<$ChildProps, 'ItemComponent'>,
  MenuComponent?: $PropertyType<$ChildProps, 'MenuComponent'>,
  MenuWrapperComponent?: $PropertyType<$ChildProps, 'MenuWrapperComponent'>,
};

const TypeaheadInput = (props: $Props) => (
  <TypeaheadInputComposer
    {...{
      ComposedInputComponent,
      InputComponent,
      ItemComponent,
      MenuComponent,
      MenuWrapperComponent,
      createLabelProps,
      ...props,
    }}
  />
);

export default TypeaheadInput;
