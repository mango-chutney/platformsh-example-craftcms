// @flow

import * as React from 'react';
import type { FieldProps as $FieldProps } from 'redux-form';
import { ThemeProvider } from 'styled-components';
import defaultsDeep from 'lodash/defaultsDeep';
import defaultTheme from './styles';

export type $Props = {
  InputDecoratorComponent: React.ElementType,
  label: string | React.ElementConfig<'label'>,
  LabelComponent: React.ElementType,
  TextAreaComponent: React.ElementType,
  theme?: any,
} & React.ElementConfig<'textarea'> &
  $FieldProps;

const TextAreaComposer = (props: $Props) => {
  const {
    children: inputDecoratorChildren,
    createFormControlElementProps,
    createInputDecoratorProps,
    createLabelProps,
    InputDecoratorComponent,
    label,
    LabelComponent,
    TextAreaComponent,
    theme,
    ...rest
  } = props;

  const { children: labelChildren, ...labelProps } = createLabelProps(
    label,
    rest,
  );

  return (
    <ThemeProvider theme={defaultsDeep({ ...theme }, defaultTheme)}>
      <LabelComponent {...labelProps}>
        {labelChildren}
        <InputDecoratorComponent {...createInputDecoratorProps(rest)}>
          <TextAreaComponent {...createFormControlElementProps(rest)} />
          {inputDecoratorChildren}
        </InputDecoratorComponent>
      </LabelComponent>
    </ThemeProvider>
  );
};

export default TextAreaComposer;
