// @flow

import actions from '../actions';
import type { $Action } from '../actions';

export type $State = {
  teamTypes: any,
  teams: any,
  locations: any,
  eventUDFs: any,
  constituents: any,
  logins: any,
  registrationTypes: any,
  mobileParticipant: any,
};

export const initialState: $State = {
  teamTypes: [],
  teams: [],
  locations: [],
  eventUDFs: [],
  constituents: null,
  logins: null,
  registrationTypes: [],
  mobileParticipant: null,
};

export default (state: $State = initialState, action: $Action) => {
  switch (action.type) {
    case actions.RECEIVE_GET_TEAMS: {
      return {
        ...state,
        teams: action.teams,
      };
    }

    case actions.RECEIVE_GET_LOCATIONS: {
      return {
        ...state,
        locations: action.locations,
      };
    }

    case actions.RECEIVE_GET_TEAM_TYPES: {
      return {
        ...state,
        teamTypes: action.teamTypes,
      };
    }

    case actions.RECEIVE_GET_EVENT_UDFS: {
      return {
        ...state,
        eventUDFs: action.eventUDFs,
      };
    }

    case actions.RECEIVE_GET_CONSTITUENTS: {
      return {
        ...state,
        constituents: action.constituents,
      };
    }

    case actions.RECEIVE_GET_LOGINS: {
      return {
        ...state,
        logins: action.logins,
      };
    }

    case actions.RECEIVE_GET_REGISTRATION_TYPES: {
      return {
        ...state,
        registrationTypes: action.registrationTypes,
      };
    }

    case actions.RECEIVE_GET_MOBILE_PARTICIPANT: {
      return {
        ...state,
        mobileParticipant: action.mobileParticipant,
      };
    }

    default:
      return state;
  }
};
