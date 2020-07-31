// @flow

import styled from 'styled-components';
import { rem } from 'polished';
import * as styles from '../styles';

const Paragraph = styled.p`
  color: ${styles.palette.body};
  font-size: ${rem(14)};
  margin-bottom: 1rem;
`;

export default Paragraph;
