// @flow

import * as types from './types';
import { formKeys } from '../constants';

export function isExistingConstituent(constituentId: ?(number | string)) {
  return {
    type: types.IS_EXISTING_CONSTITUENT,
    constituentId,
  };
}

export function isExistingRegistrant(existingRegistrant: boolean) {
  return {
    type: types.IS_EXISTING_REGISTRANT,
    existingRegistrant,
  };
}

export function isReturningConstituent(returningConstituent: boolean) {
  return {
    type: types.IS_RETURNING_CONSTITUENT,
    returningConstituent,
  };
}

export function isJoiningTeam(joiningTeam: any) {
  return {
    type: types.IS_JOINING_TEAM,
    joiningTeam,
  };
}

export function saveParticipant(participant: any) {
  return {
    type: types.SAVE_PARTICIPANT,
    participant,
  };
}

export function setFormKey(formKey: typeof formKeys) {
  return {
    type: types.SET_FORM_KEY,
    formKey,
  };
}

export function isInternationalRegistrant(internationalRegistrant: boolean) {
  return {
    type: types.IS_INTERNATIONAL_REGISTRANT,
    internationalRegistrant,
  };
}

export function isCreatingTeam(creatingTeam: any) {
  return {
    type: types.IS_CREATING_TEAM,
    creatingTeam,
  };
}

export function isCreatingSchoolTeam(creatingSchoolTeam: boolean) {
  return {
    type: types.IS_CREATING_SCHOOL_TEAM,
    creatingSchoolTeam,
  };
}

export function isValidAddress(validAddress: boolean) {
  return {
    type: types.IS_VALID_ADDRESS,
    validAddress,
  };
}

export function setStageOneFormIndex(stageOneFormIndex: number) {
  return {
    type: types.SET_STAGE_ONE_FORM_INDEX,
    stageOneFormIndex,
  };
}

export function setExistingAccountModalOpen(
  existingAccountModalIsOpen: boolean,
) {
  return {
    type: types.SET_EXISTING_ACCOUNT_MODAL_OPEN,
    existingAccountModalIsOpen,
  };
}
