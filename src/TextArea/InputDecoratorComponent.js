// @flow

import styled, { withTheme } from 'styled-components';
import { InputDecoratorComponent as BaseInputDecoratorComponent } from '../Input';
import defaultTheme from './styles';

const InputDecoratorComponent = styled(BaseInputDecoratorComponent)`
  &::after {
    display: none;
  }
`;

InputDecoratorComponent.defaultProps = {
  theme: defaultTheme,
};

// $FlowFixMe
export default withTheme(InputDecoratorComponent);
