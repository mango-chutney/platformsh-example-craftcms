// @flow

import actions from '../actions';
import type { $Action } from '../actions';

export type $State = {
  addressData: {
    loading: boolean,
    RequestId?: string,
    ResultCount?: string, // like '5'
    ErrorMessage?: string,
    Result?: Array<{
      RecordId: string,
      AddressLine: string,
      Locality: string,
      State: string,
      Postcode: string,
    }>,
  },
  addressRecordId: ?string,
  kleberRequestKey: string,
};

export const initialState: $State = {
  addressData: { loading: false, Result: [] },
  addressRecordId: null,
  kleberRequestKey: '', // will be bootstrapped before the app is rendered
};

export default (state: $State = initialState, action: $Action) => {
  switch (action.type) {
    case actions.REQUEST_ADDRESS_DATA: {
      return {
        ...state,
        addressData: {
          ...state.addressData,
          loading: true,
        },
      };
    }

    case actions.RECEIVE_ADDRESS_DATA: {
      return {
        ...state,
        addressData: {
          loading: false,
          ...action.addresses,
        },
      };
    }

    case actions.UPDATE_ADDRESS_RECORD_ID: {
      return {
        ...state,
        addressRecordId: action.value,
      };
    }

    default:
      return state;
  }
};
