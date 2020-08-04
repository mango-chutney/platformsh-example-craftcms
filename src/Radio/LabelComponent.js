// @flow

import styled, { withTheme } from 'styled-components';
import { InputLabelComponent } from '../Input';
import defaultTheme from './styles';

const LabelComponent = styled(InputLabelComponent)`
  display: inline-block;
  margin-left: 1rem;
`;

LabelComponent.defaultProps = {
  theme: defaultTheme,
};

// $FlowFixMe
export default withTheme(LabelComponent);
