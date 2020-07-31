// @flow

import * as React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import * as styles from '../styles';

const Wrapper = styled.div`
  border: 1px solid ${styles.palette.alert};
  border-radius: ${rem(4)};
  color: ${styles.palette.alert};
  font-size: ${rem(16)};
  font-weight: ${styles.fontWeight.semibold};
  margin-bottom: 1rem;
  padding: ${rem(8)} ${rem(16)};
`;

const ErrorBox = ({ error }: { error: string }) => (
  <Wrapper>{error || 'An error has occurred'}</Wrapper>
);

export default ErrorBox;
