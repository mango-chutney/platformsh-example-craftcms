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
  SelectComponent: React.ElementType,
  theme?: any,
} & React.ElementConfig<'select'> &
  $FieldProps;

const SelectComposer = (props: $Props) => {
  const {
    children: selectChildren,
    createFormControlElementProps,
    createInputDecoratorProps,
    createLabelProps,
    InputDecoratorComponent,
    label,
    LabelComponent,
    SelectComponent,
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
          <SelectComponent {...createFormControlElementProps(rest)}>
            {selectChildren}
          </SelectComponent>
        </InputDecoratorComponent>
      </LabelComponent>
    </ThemeProvider>
  );
};

export default SelectComposer;
