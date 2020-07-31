// @flow

import styled from 'styled-components';
import * as styles from '../styles';

const Section = styled.div`
  margin: 3rem 0;

  ${styles.media.lessThan('medium')`
    margin: 2.5rem 0;
  `};

  ${styles.media.lessThan('small')`
    margin: 2rem 0;
  `};
`;

export default Section;
