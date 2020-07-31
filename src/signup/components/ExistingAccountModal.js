// @flow

import * as React from 'react';
import isFunction from 'lodash/isFunction';
import pickBy from 'lodash/pickBy';
import { bindActionCreators } from 'redux';
import { change, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import type { Dispatch as $Dispatch } from 'redux';
import styled from 'styled-components';
import { rem } from 'polished';
import * as actions from '../actions';
import { formKeys, stageOneFormKeys, eventId, artezURL } from '../constants';
import type { $Action } from '../actions';
import type { $State as $AppState } from '../reducers';
import {
  Anchor,
  Button,
  Modal,
  ModalClose,
  ModalFooter,
  ModalHeader,
  Paragraph,
} from './index';
import * as styles from '../styles';

const StyledParagaph = styled(Paragraph)`
  font-weight: ${styles.fontWeight.semibold};
`;

const FakeAnchor = styled.span`
  color: ${styles.palette.primary};
`;

type $Props = {
  dirtyValues: Object,
  existingAccountModalIsOpen: $PropertyType<
    $PropertyType<$AppState, 'app'>,
    'existingAccountModalIsOpen',
  >,
  formChange: (form: string, field: string, value: any) => any,
  setExistingAccountModalOpen: boolean => $Action,
  setStageOneFormIndex: number => $Action,
};

const ExistingAccountModal = (props: $Props) => {
  const {
    setStageOneFormIndex,
    existingAccountModalIsOpen,
    setExistingAccountModalOpen,
    formChange,
    dirtyValues,
  } = props;

  return (
    <Modal
      isOpen={existingAccountModalIsOpen}
      onRequestClose={() => setExistingAccountModalOpen(false)}
      maxWidth={rem(530)}
    >
      <ModalHeader>
        You already have an account
        <ModalClose onClick={() => setExistingAccountModalOpen(false)} />
      </ModalHeader>
      <StyledParagaph>
        The email address <FakeAnchor>{dirtyValues.email}</FakeAnchor> has been
        used to support Leukaemia Foundation before.
      </StyledParagaph>
      <StyledParagaph>
        To continue registering for World’s Greatest Shave please enter the same
        password that you’ve used in the past.
      </StyledParagaph>
      <StyledParagaph>
        <Anchor
          href={`${artezURL}/registrant/ForgetPassword.aspx?eventid=${eventId}`}
          disableBeforeUnload
          target="_blank"
        >
          Forgot your password?
        </Anchor>
      </StyledParagaph>
      <ModalFooter>
        <Button
          type="button"
          buttonType="gray"
          buttonSize="tiny"
          onClick={() => {
            setExistingAccountModalOpen(false);
          }}
        >
          Use a different email
        </Button>
        <Button
          type="button"
          buttonType="primary"
          buttonSize="tiny"
          onClick={() => {
            setExistingAccountModalOpen(false);
            setStageOneFormIndex(stageOneFormKeys.constituent);
            formChange(formKeys.constituentLogin, 'email', dirtyValues.email);
          }}
        >
          Continue with this email
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = (state: $AppState) => {
  const selector = formValueSelector(formKeys.registration);

  return {
    existingAccountModalIsOpen: state.app.existingAccountModalIsOpen,
    dirtyValues: {
      email: selector(state, 'email'),
    },
  };
};

const mapDispatchToProps = (dispatch: $Dispatch<$Action>) => ({
  ...bindActionCreators(
    pickBy(actions.appActionCreators, isFunction),
    dispatch,
  ),

  formChange: (form: string, field: string, value: any) =>
    dispatch(change(form, field, value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExistingAccountModal);
