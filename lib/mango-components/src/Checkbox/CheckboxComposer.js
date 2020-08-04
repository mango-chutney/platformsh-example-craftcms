// @flow

import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import defaultsDeep from 'lodash/defaultsDeep';
import type { FieldProps as $FieldProps } from 'redux-form';
import defaultTheme from './styles';

export type $Props = {
  CheckboxContainerComponent: React.ElementType,
  InputComponent: React.ElementType,
  InputDecoratorComponent: React.ElementType,
  label: string | React.ElementConfig<'label'>,
  LabelComponent: React.ElementType,
  theme: any,
  WrapperComponent: React.ElementType,
} & React.ElementConfig<'input'> &
  $FieldProps;

const CheckboxComposer = (props: $Props) => {
  const {
    CheckboxContainerComponent,
    InputComponent,
    InputDecoratorComponent,
    LabelComponent,
    WrapperComponent,
    createFormControlElementProps,
    createInputDecoratorProps,
    createLabelProps,
    label,
    value,
    theme,
    ...rest
  } = props;

  const { children: labelChildren, ...labelProps } = createLabelProps(
    label,
    rest,
  );

  return (
    <ThemeProvider theme={defaultsDeep({ ...theme }, defaultTheme)}>
      <WrapperComponent>
        <CheckboxContainerComponent>
          <InputComponent
            {...{
              ...createFormControlElementProps(rest, {
                type: 'checkbox',
                checked: value,
              }),
              // Pass the classname of input-decorator component to the styled component.
              InputDecoratorComponent,
            }}
          />
          <InputDecoratorComponent {...createInputDecoratorProps(rest)} />
        </CheckboxContainerComponent>
        <LabelComponent {...labelProps}>{labelChildren}</LabelComponent>
      </WrapperComponent>
    </ThemeProvider>
  );
};

export default CheckboxComposer;
