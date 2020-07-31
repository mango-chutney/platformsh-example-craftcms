// @flow

import type { Store as $Store } from 'redux';
import * as form from 'redux-form/es/actionTypes';
import type { $Action, $Dispatch } from '../actions';
import type { $State } from '../reducers';
import { spywareActionCreators } from '../actions';

export default () => (store: $Store<$State, $Action>) => (next: $Dispatch) => (
  action: any,
) => {
  switch (action.type) {
    case form.CHANGE:
    case form.SET_SUBMIT_FAILED:
    case form.SET_SUBMIT_SUCCEEDED: {
      store.dispatch(
        // $FlowFixMe
        spywareActionCreators.makeGoogleAnalyticsRequest(
          spywareActionCreators.googleAnalyticsEventCreators[action.type](
            action.meta.field,
          ),
        ),
      );
      break;
    }

    default: {
      break;
    }
  }

  return next(action);
};
