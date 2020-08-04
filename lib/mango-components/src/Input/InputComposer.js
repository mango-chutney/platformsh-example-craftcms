// @flow

import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import defaultsDeep from 'lodash/defaultsDeep';
import type { FieldProps as $FieldProps } from 'redux-form';
import defaultTheme from './styles';

export type $Props = {
  InputComponent: React.ElementType,
  InputDecoratorComponent: React.ElementType,
  InputLabelComponent: React.ElementType,
  label: string | React.ElementConfig<'label'>,
  theme?: any,
} & React.ElementConfig<'input'> &
  $FieldProps;

const InputComposer = (props: $Props) => {
  const {
    children: inputDecoratorChildren,
    createFormControlElementProps,
    createInputDecoratorProps,
    createLabelProps,
    InputComponent,
    InputDecoratorComponent,
    InputLabelComponent,
    label,
    theme,
    ...rest
  } = props;

  const { children: labelChildren, ...labelProps } = createLabelProps(
    label,
    rest,
  );

  return (
    <ThemeProvider theme={defaultsDeep({ ...theme }, defaultTheme)}>
      <InputLabelComponent {...labelProps}>
        {labelChildren}
        <InputDecoratorComponent {...createInputDecoratorProps(rest)}>
          <InputComponent {...createFormControlElementProps(rest)} />
          {inputDecoratorChildren}
        </InputDecoratorComponent>
      </InputLabelComponent>
    </ThemeProvider>
  );
};

export default InputComposer;
