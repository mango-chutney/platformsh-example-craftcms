// @flow

import * as React from 'react';
import ContentLoader from 'react-content-loader';
import styled from 'styled-components';
import { darken } from 'polished';
import * as styles from '../styles';

const inputWidth = '100%';
const inputHeight = 50;
const inputRadius = 4;
const inputMargin = 16;

const Wrapper = styled.div`
  margin: 6rem 0;

  svg {
    width: 100%;
    height: 500px;
  }
`;

const StyledRect = (props: any) => (
  <rect
    rx={inputRadius}
    ry={inputRadius}
    width={inputWidth}
    height={inputHeight}
    stroke={styles.palette.border}
    {...props}
  />
);

const FormLoader = () => (
  <Wrapper>
    <ContentLoader
      primaryColor={darken(0.025, styles.palette.lightGray)}
      secondaryColor={styles.palette.lightGray}
      height={500}
      width={400}
      preserveAspectRatio="none"
    >
      <StyledRect x="0" y="0" />
      <StyledRect x="0" y={inputHeight + inputMargin} width="48%" />
      <StyledRect x="52%" y={inputHeight + inputMargin} width="48%" />
      <StyledRect x="0" y={(inputHeight + inputMargin) * 2} width="48%" />
      <StyledRect x="52%" y={(inputHeight + inputMargin) * 2} width="48%" />
      <StyledRect x="0" y={(inputHeight + inputMargin) * 3} />
      <StyledRect x="0" y={(inputHeight + inputMargin) * 4} />
    </ContentLoader>
  </Wrapper>
);

export default FormLoader;
