// @flow

import * as React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import * as styles from '../styles';
import { TermsAndConditionsModal } from '.';

const Wrapper = styled.div`
  border: 2px solid ${styles.palette.primary};
  border-radius: ${rem(4)};
  color: ${styles.palette.primary};
  font-size: ${rem(14)};
  font-weight: ${styles.fontWeight.semibold};
  margin-bottom: 2rem;
  padding: ${rem(22)};
`;

const Underage = () => (
  <Wrapper>
    IMPORTANT: By agreeing to the{' '}
    <TermsAndConditionsModal color={styles.palette.primary}>
      terms and conditions
    </TermsAndConditionsModal>{' '}
    and clicking &apos;Sign Up&apos; you confirm a parent or guardian has
    granted you permission to participate in World&apos;s Greatest Shave
  </Wrapper>
);

export default Underage;
