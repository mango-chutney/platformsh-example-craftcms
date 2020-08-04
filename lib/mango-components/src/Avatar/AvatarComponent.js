// @flow

import styled from 'styled-components';
import { palette, fontWeights } from '../constants';

const AvatarComponent = styled.div`
  background-color: '#00b4ff';
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
  color: ${palette.white};
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${fontWeights.semibold};
  height: ${({ width }) => width};
  line-height: ${({ width }) => width};
  text-align: center;
  text-transform: uppercase;
  width: ${({ width }) => width};
`;

export default AvatarComponent;
