// @flow

import styled, { css } from 'styled-components';
import get from 'lodash/get';
import defaultTheme from './styles';

const InputLabelComponent = styled.label`
  color: ${({ theme }) => get(theme, 'label.color')};
  display: block;
  font-size: ${({ theme }) => get(theme, 'label.fontSize')};
  font-weight: ${({ theme }) => get(theme, 'label.fontWeight')};

  ${({ meta }) =>
    meta &&
    meta.error &&
    meta.touched &&
    css`
      color: ${({ theme }) => get(theme, 'label.alertColor')};
    `};
`;

InputLabelComponent.defaultProps = {
  theme: defaultTheme,
};

export default InputLabelComponent;
