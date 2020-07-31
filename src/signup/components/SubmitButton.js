// @flow

import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { rem } from 'polished';
import { Button } from './index';

const loaderAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const StyledSubmitLoader = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;

  img {
    animation: ${loaderAnimation} 2s linear infinite;
    width: ${rem(29)};
    height: ${rem(29)};
  }
`;

const SubmitLoader = () => (
  <StyledSubmitLoader>
    <img src="/assets/img/spinner-01.svg" alt="loading" />
  </StyledSubmitLoader>
);

const SubmitButton = ({ submitting, children, ...rest }: any) => (
  <Button disabled={submitting} {...rest}>
    {submitting ? <SubmitLoader /> : children}
  </Button>
);

export default SubmitButton;
