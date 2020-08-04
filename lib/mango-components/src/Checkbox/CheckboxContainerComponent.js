// @flow
import styled from 'styled-components';
import get from 'lodash/get';
import defaultTheme from './styles';

const CheckboxContainerComponent = styled.div`
  display: inline-block;
  height: ${({ theme }) => get(theme, 'checkbox.size')};
  margin: 0;
  position: relative;
  width: ${({ theme }) => get(theme, 'checkbox.size')};
`;

CheckboxContainerComponent.defaultProps = {
  theme: defaultTheme,
};

export default CheckboxContainerComponent;
