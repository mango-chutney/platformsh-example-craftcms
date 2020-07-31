// @flow

import { createKleberApi } from '../api';
import type { $Dispatch, $GetState } from './types';
import {
  RECEIVE_ADDRESS_DATA,
  REJECT_ADDRESS_DATA,
  REQUEST_ADDRESS_DATA,
  UPDATE_ADDRESS_RECORD_ID,
  MAKE_THROWAWAY_KLEBER_REQUEST,
} from './types';

const kleberApi = createKleberApi();

export function getAddressData(address: string) {
  return (dispatch: $Dispatch, getState: $GetState) => {
    const {
      kleber: { kleberRequestKey },
    } = getState();
    dispatch({
      type: REQUEST_ADDRESS_DATA,
    });
    return kleberApi
      .getAddressData({ address, kleberRequestKey })
      .then(addresses =>
        dispatch({
          type: RECEIVE_ADDRESS_DATA,
          addresses,
        }),
      )
      .catch(error =>
        dispatch({
          type: REJECT_ADDRESS_DATA,
          reason: error.message,
        }),
      );
  };
}

export function makeThrowawayKleberRequest() {
  return (dispatch: $Dispatch, getState: $GetState) => {
    const {
      kleber: { addressRecordId, kleberRequestKey },
    } = getState();
    dispatch({
      type: MAKE_THROWAWAY_KLEBER_REQUEST,
    });
    return kleberApi
      .makeThrowawayKleberRequest({
        recordId: addressRecordId,
        kleberRequestKey,
      })
      .then(() => Promise.resolve())
      .catch(() => Promise.resolve());
  };
}

export function updateAddressRecordId(value: ?string) {
  return { type: UPDATE_ADDRESS_RECORD_ID, value };
}
