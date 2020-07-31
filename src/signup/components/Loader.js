import * as React from 'react';
import { Pulse } from 'styled-spinkit';
import styled from 'styled-components';
import * as styles from '../styles';

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`;

const Loader = () => (
  <Wrapper>
    <div>
      <Pulse color={styles.palette.body} size={40} />
    </div>
  </Wrapper>
);

export default Loader;
