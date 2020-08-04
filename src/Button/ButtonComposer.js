// @flow

import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import defaultsDeep from 'lodash/defaultsDeep';
import defaultTheme from './styles';

export type $Props = {
  ButtonComponent: React.ElementType,
  theme?: any,
};

const ButtonComposer = (props: $Props) => {
  const { ButtonComponent, theme, ...rest } = props;

  return (
    <ThemeProvider theme={defaultsDeep({ ...theme }, defaultTheme)}>
      <ButtonComponent {...rest} />
    </ThemeProvider>
  );
};

export default ButtonComposer;
