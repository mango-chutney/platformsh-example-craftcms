// @flow

import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { rem } from 'polished';
import { Header } from '../components';
import Form from './Form';
import type { $State as $AppState } from '../reducers';
import * as styles from '../styles';

const StyledWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  min-height: 100vh;

  ${styles.media.lessThan('medium')`
    flex-flow: column;
    width: 100%;
  `};
`;

const FormWrapper = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: safe center;
  margin-left: calc(100vw - 100%);
  margin-right: 0;
  padding: 4rem 1rem;
  width: 100%;

  ${styles.media.lessThan('small')`
    padding: 4rem 0.5rem;
  `};
`;

const FormContainer = styled.div`
  background-color: ${styles.palette.white};
  border-radius: 6px;
  margin: 0 auto;
  max-width: ${rem(780)};
  padding: 3rem 6rem 8rem;
  width: 100%;

  ${styles.media.lessThan('medium')`
    padding: 3rem 4rem 8rem;
    margin: 0 auto;
  `};

  ${styles.media.lessThan('small')`
    padding: 3rem 1.5rem 8rem;
  `};
`;

function Wrapper(props: any) {
  const { joiningTeam, creatingSchoolTeam, ...rest } = props;

  return (
    <StyledWrapper>
      <FormWrapper>
        <FormContainer>
          <Header />
          <Form {...rest} />
        </FormContainer>
      </FormWrapper>
    </StyledWrapper>
  );
}

const mapStateToProps = (state: $AppState) => ({
  joiningTeam: state.app.joiningTeam,
  creatingSchoolTeam: state.app.creatingSchoolTeam,
});

export default connect(mapStateToProps)(Wrapper);
