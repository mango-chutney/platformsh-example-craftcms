// @flow

import styled from 'styled-components';
import { rgba } from 'polished';
import * as styles from '../styles';

const Unbutton = styled.button`
  background: none;
  border: 0;
  color: inherit;
  cursor: pointer;
  display: inline;
  font: inherit;
  margin: 0;
  padding: 0;

  &:focus {
    outline: 1px dotted ${styles.palette.mediumGray};
  }
`;

export const UnbuttonLink = styled(Unbutton)`
  color: ${({ color }) => color || styles.palette.body};
  text-decoration: underline;
  text-decoration-color: ${({ color }) =>
    (color && rgba(color, 0.75)) || rgba(styles.palette.body, 0.75)};
`;

export default Unbutton;
