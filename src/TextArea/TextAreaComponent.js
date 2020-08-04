// @flow

import styled, { withTheme } from 'styled-components';
import { InputComponent } from '../Input';
import defaultTheme from './styles';

const TextAreaComponent = styled(InputComponent.withComponent('textarea'))`
  height: auto;
  padding: 1.25rem 1rem;
  resize: vertical;
`;

TextAreaComponent.defaultProps = {
  theme: defaultTheme,
};

export default withTheme(TextAreaComponent);
