// @flow

import actions from '../actions';
import type { $Action } from '../actions';
import { formKeys, stageOneFormKeys } from '../constants';

export type $State = {
  creatingSchoolTeam: boolean,
  creatingTeam: boolean,
  existingAccountModalIsOpen: boolean,
  existingConstituent: ?(number | string),
  existingRegistrant: boolean,
  formKey: typeof formKeys,
  internationalRegistrant: boolean,
  joiningTeam: ?Array<any>,
  participant: ?{
    registrationId: ?(number | string),
    firstName: ?string,
    lastName: ?string,
    username: ?string,
    password: ?string,
    teamName: ?string,
  },
  returningConstituent: boolean,
  stageOneFormIndex: typeof stageOneFormKeys,
  validAddress: boolean,
};

export const initialState: $State = {
  creatingSchoolTeam: false,
  creatingTeam: false,
  existingAccountModalIsOpen: false,
  existingConstituent: null,
  existingRegistrant: false,
  formKey: formKeys.stageOne,
  internationalRegistrant: false,
  joiningTeam: null,
  participant: null,
  returningConstituent: false,
  stageOneFormIndex: stageOneFormKeys.registration,
  validAddress: true,
};

export default (state: $State = initialState, action: $Action) => {
  switch (action.type) {
    case actions.IS_EXISTING_CONSTITUENT: {
      return {
        ...state,
        existingConstituent: action.constituentId,
      };
    }

    case actions.IS_EXISTING_REGISTRANT: {
      return {
        ...state,
        existingRegistrant: action.existingRegistrant,
      };
    }

    case actions.IS_RETURNING_CONSTITUENT: {
      return {
        ...state,
        returningConstituent: action.returningConstituent,
      };
    }

    case actions.IS_JOINING_TEAM: {
      return {
        ...state,
        joiningTeam: action.joiningTeam,
      };
    }

    case actions.SAVE_PARTICIPANT: {
      return {
        ...state,
        participant: action.participant,
      };
    }

    case actions.SET_FORM_KEY: {
      return {
        ...state,
        formKey: action.formKey,
      };
    }

    case actions.IS_INTERNATIONAL_REGISTRANT: {
      return {
        ...state,
        internationalRegistrant: action.internationalRegistrant,
      };
    }

    case actions.IS_VALID_ADDRESS: {
      return {
        ...state,
        validAddress: action.validAddress,
      };
    }

    case actions.IS_CREATING_TEAM: {
      return {
        ...state,
        creatingTeam: action.creatingTeam,
      };
    }

    case actions.IS_CREATING_SCHOOL_TEAM: {
      return {
        ...state,
        creatingSchoolTeam: action.creatingSchoolTeam,
      };
    }

    case actions.SET_STAGE_ONE_FORM_INDEX: {
      return {
        ...state,
        stageOneFormIndex: action.stageOneFormIndex,
      };
    }

    case actions.SET_EXISTING_ACCOUNT_MODAL_OPEN: {
      return {
        ...state,
        existingAccountModalIsOpen: action.existingAccountModalIsOpen,
      };
    }

    default:
      return state;
  }
};
