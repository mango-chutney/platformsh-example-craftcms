// @flow

import styled from 'styled-components';
import defaultTheme from './styles';

const ButtonComponent = styled.button`
  background-color: ${({ theme }) => theme.button.backgroundColor};
  border-radius: 0.25rem;
  border: 0;
  color: ${({ theme }) => theme.button.color};
  cursor: pointer;
  display: ${({ expanded }) => (expanded ? 'block' : 'inline-block')};
  font-family: inherit;
  font-weight: ${({ theme }) => theme.button.fontWeight};
  margin-bottom: 1rem;
  padding: ${({ theme }) => theme.button.padding};
  text-align: center;
  text-decoration: none;
  width: ${({ expanded }) => (expanded ? '100%' : 'auto')};
`;

ButtonComponent.defaultProps = {
  theme: defaultTheme,
};

export default ButtonComponent;
