// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import type { Dispatch as $Dispatch } from 'redux';
import { InputLabelComponent as LabelComponent } from 'mango-components';
import styled from 'styled-components';
import { UnbuttonLink } from '.';
import * as actions from '../actions';
import type { $State as $AppState } from '../reducers';
import type { $Action } from '../actions';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  margin: 2rem 0 1rem;
`;

type $Props = {
  internationalRegistrant: $PropertyType<
    $PropertyType<$AppState, 'app'>,
    'internationalRegistrant',
  >,
  isInternationalRegistrant: boolean => $Action,
};

const InternationalToggle = ({
  internationalRegistrant,
  isInternationalRegistrant,
}: $Props) => (
  <Wrapper>
    {!internationalRegistrant ? (
      <LabelComponent>
        Outside Australia?{' '}
        <UnbuttonLink
          type="button"
          onClick={() => isInternationalRegistrant(true)}
        >
          International sign up.
        </UnbuttonLink>
      </LabelComponent>
    ) : (
      <LabelComponent>
        In Australia?{' '}
        <UnbuttonLink
          type="button"
          onClick={() => isInternationalRegistrant(false)}
        >
          Sign up here.
        </UnbuttonLink>
      </LabelComponent>
    )}
  </Wrapper>
);

const mapStateToProps = (state: $AppState) => ({
  internationalRegistrant: state.app.internationalRegistrant,
});

const mapDispatchToProps = (dispatch: $Dispatch<$Action>) => ({
  isInternationalRegistrant: internationalRegistrant =>
    dispatch(
      actions.appActionCreators.isInternationalRegistrant(
        internationalRegistrant,
      ),
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InternationalToggle);
