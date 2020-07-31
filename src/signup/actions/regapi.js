// @flow

import dJSON from 'dirty-json';
import nth from 'lodash/nth';
import fetch from 'unfetch';
import type { $Dispatch, $GetState } from './types';
import * as types from './types';
import { regapi } from '../api';
import {
  baseURL,
  eventId,
  defaultLocationId,
  organizationId,
} from '../constants';

export function getTeams() {
  return (dispatch: $Dispatch) => {
    dispatch({
      type: types.REQUEST_GET_TEAMS,
    });

    return fetch(`${baseURL}/resources/data/teams.json`)
      .then(response => response.json())
      .then(response =>
        dispatch({
          type: types.RECEIVE_GET_TEAMS,
          teams: response.teams,
        }),
      )
      .catch(error =>
        dispatch({
          type: types.REJECT_GET_TEAMS,
          reason: error.message,
        }),
      );
  };
}

export function getLocations() {
  return (dispatch: $Dispatch) => {
    dispatch({
      type: types.REQUEST_GET_LOCATIONS,
    });
    return regapi
      .getLocations(eventId)
      .then(locations =>
        dispatch({
          type: types.RECEIVE_GET_LOCATIONS,
          locations,
        }),
      )
      .catch(error =>
        dispatch({
          type: types.REJECT_GET_LOCATIONS,
          reason: error.message,
        }),
      );
  };
}

export function getEventUDFs() {
  return (dispatch: $Dispatch) => {
    dispatch({
      type: types.REQUEST_GET_EVENT_UDFS,
    });
    return regapi
      .getUDFs({ EventID: eventId })
      .then(eventUDFs =>
        dispatch({
          type: types.RECEIVE_GET_EVENT_UDFS,
          eventUDFs,
        }),
      )
      .catch(error =>
        dispatch({
          type: types.REJECT_GET_EVENT_UDFS,
          reason: error.message,
        }),
      );
  };
}

export function getTeamTypes() {
  return (dispatch: $Dispatch) => {
    dispatch({
      type: types.REQUEST_GET_TEAM_TYPES,
    });
    return regapi
      .getTeamTypes(defaultLocationId)
      .then(teamTypes =>
        dispatch({
          type: types.RECEIVE_GET_TEAM_TYPES,
          teamTypes,
        }),
      )
      .catch(error =>
        dispatch({
          type: types.REJECT_GET_TEAM_TYPES,
          reason: error.message,
        }),
      );
  };
}

export function getLogins(username: string, password: ?string) {
  return (dispatch: $Dispatch) => {
    dispatch({
      type: types.REQUEST_GET_LOGINS,
    });
    return regapi
      .getLogins(username, password)
      .then(logins =>
        dispatch({
          type: types.RECEIVE_GET_LOGINS,
          logins,
        }),
      )
      .catch(error =>
        dispatch({
          type: types.REJECT_GET_LOGINS,
          reason: error.message,
        }),
      );
  };
}

export function getConstituents(constituentId: number | string) {
  return (dispatch: $Dispatch) => {
    dispatch({
      type: types.REQUEST_GET_CONSTITUENTS,
    });
    return regapi
      .getConstituents(constituentId)
      .then(constituents =>
        dispatch({
          type: types.RECEIVE_GET_CONSTITUENTS,
          constituents,
        }),
      )
      .catch(error =>
        dispatch({
          type: types.REJECT_GET_CONSTITUENTS,
          reason: error.message,
        }),
      );
  };
}

export function getRegistrationTypes() {
  return (dispatch: $Dispatch) => {
    dispatch({
      type: types.REQUEST_GET_REGISTRATION_TYPES,
    });
    return regapi
      .getRegistrationTypes(defaultLocationId)
      .then(registrationTypes =>
        dispatch({
          type: types.RECEIVE_GET_REGISTRATION_TYPES,
          registrationTypes,
        }),
      )
      .catch(error =>
        dispatch({
          type: types.REJECT_GET_REGISTRATION_TYPES,
          reason: error.message,
        }),
      );
  };
}

export function getMobileParticipant() {
  return (dispatch: $Dispatch, getState: $GetState) => {
    dispatch({
      type: types.REQUEST_GET_MOBILE_PARTICIPANT,
    });

    const {
      app: { participant },
    } = getState();

    if (!participant) {
      dispatch({
        type: types.REJECT_GET_MOBILE_PARTICIPANT,
      });

      return Promise.reject(new Error('Unable to get participant'));
    }

    const body = JSON.stringify({
      eventId,
      userName: participant.username,
      password: participant.password,
      languageCode: 'en-ca',
    });

    return fetch(`${baseURL}/regapi/mobileParticipant`, {
      method: 'POST',
      body,
    })
      .then(response => response.text())
      .then(response => {
        try {
          const dirtyResponse = nth(
            response.match(
              new RegExp('<string xmlns="http://tempuri.org/">(.*)</string>'),
            ),
            1,
          );

          const sanitizeResponse = dJSON.parse(dirtyResponse);

          return Promise.resolve(sanitizeResponse);
        } catch (error) {
          dispatch({
            type: types.REJECT_GET_MOBILE_PARTICIPANT,
          });

          throw new Error(error);
        }
      })
      .then(mobileParticipant =>
        dispatch({
          type: types.RECEIVE_GET_MOBILE_PARTICIPANT,
          mobileParticipant,
        }),
      )
      .catch(error =>
        dispatch({
          type: types.REJECT_GET_MOBILE_PARTICIPANT,
          reason: error.message,
        }),
      );
  };
}

export function uploadImageItem(attachedFile: any) {
  return (dispatch: $Dispatch, getState: $GetState) => {
    dispatch({
      type: types.REQUEST_UPLOAD_IMAGE_ITEM,
    });

    const {
      artez: { mobileParticipant },
      app: { participant },
    } = getState();

    const {
      personalization: { userToken: token },
      participant: { registrationId: registrantId },
    } = mobileParticipant;

    if (!participant) {
      return Promise.reject(new Error('Unable to get participant'));
    }

    const body = {
      attachedFile,
      eventId,
      languageCode: 'en-ca',
      organizationId,
      pageType: 'registrant',
      password: participant.password,
      registrantId,
      token,
      username: participant.username,
      userType: 'registrant',
    };

    const formData = new FormData();
    Object.keys(body).forEach((key: string) => formData.append(key, body[key]));

    return fetch(`${baseURL}/regapi/uploadImageItem`, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.text())
      .then(response => {
        try {
          const dirtyResponse = nth(
            response.match(new RegExp('[(](.*)[)]')),
            1,
          );
          const sanitizeResponse = dJSON.parse(dirtyResponse);
          return Promise.resolve(sanitizeResponse);
        } catch (error) {
          throw new Error(error);
        }
      })
      .then(({ imageID, thumbnailID }) =>
        dispatch({
          type: types.RECEIVE_UPLOAD_IMAGE_ITEM,
          imageID,
          thumbnailID,
        }),
      )
      .catch(error =>
        dispatch({
          type: types.REJECT_UPLOAD_IMAGE_ITEM,
          reason: error.message,
        }),
      );
  };
}

export function setImageItem({
  imageID,
  thumbnailID,
}: {
  imageID: number | string,
  thumbnailID: number | string,
}) {
  return (dispatch: $Dispatch, getState: $GetState) => {
    dispatch({
      type: types.REQUEST_SET_IMAGE_ITEM,
    });

    const {
      artez: { mobileParticipant },
      app: { participant },
    } = getState();

    const {
      personalization: { userToken: token },
      participant: { registrationId: registrantId },
    } = mobileParticipant;

    if (!participant) {
      return Promise.reject(new Error('Unable to get participant'));
    }

    const body = {
      eventId,
      languageCode: 'en-ca',
      organizationId,
      pageType: 'registrant',
      password: participant.password,
      registrantId,
      token,
      username: participant.username,
      userType: 'registrant',
      mediaTitle: 'artez-base',
      mediaDescription: '',
      mediaPath: '',
      defaultStatus: 'y',
      imageID,
      thumbnailID,
    };

    const formData = new FormData();
    Object.keys(body).forEach((key: string) => formData.append(key, body[key]));

    return fetch(`${baseURL}/regapi/setImageItem`, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.text())
      .then(response => {
        try {
          const dirtyResponse = nth(
            response.match(new RegExp('[(](.*)[)]')),
            1,
          );
          const sanitizeResponse = dJSON.parse(dirtyResponse);
          return Promise.resolve(sanitizeResponse);
        } catch (error) {
          throw new Error(error);
        }
      })
      .then(response =>
        dispatch({
          type: types.RECEIVE_SET_IMAGE_ITEM,
          response,
        }),
      )
      .catch(error =>
        dispatch({
          type: types.REJECT_SET_IMAGE_ITEM,
          reason: error.message,
        }),
      );
  };
}
