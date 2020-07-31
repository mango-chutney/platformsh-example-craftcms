// @flow

import * as React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import * as styles from '../styles';

const StyledHeader = styled.a`
  background-color: ${styles.palette.primary};
  display: block;
  left: 50%;
  margin: -7rem auto 0;
  padding: 2rem 1rem;
  width: ${rem(210)};

  img {
    width: 100%;
  }

  ${styles.media.lessThan('medium')`
    padding: 2rem 1.75rem 1.5rem;
    width: ${rem(175)};
  `};

  ${styles.media.lessThan('small')`
    padding: 1.75rem 1.25rem 1.25rem;
    width: ${rem(150)};
  `};
`;

function Header(props: any) {
  return (
    <StyledHeader href="/" {...props}>
      <img src="/assets/img/logo.svg" alt="World's Greatest Shave" />
    </StyledHeader>
  );
}

export default Header;
