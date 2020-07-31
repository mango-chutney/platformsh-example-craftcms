// @flow

import * as form from 'redux-form/es/actionTypes';
import type { $Dispatch } from './types';
import { MAKE_GOOGLE_ANALYTICS_REQUEST } from './types';

export const didLandOnRegistrationPageEvent = {
  event_category: 'Registration',
  event_action: 'Landed on registration page (browser)',
  event_label: 'Landed',
};

export const googleAnalyticsEventCreators = {
  [form.CHANGE]: (key: string) => ({
    event_category: 'Registration',
    event_action: `Changed field: ${key}`,
    event_label: 'Entered registration data',
  }),
  [form.SET_SUBMIT_SUCCEEDED]: () => ({
    event_category: 'Registration',
    event_action: 'Successfully registered',
    event_label: 'Registered',
  }),
  [form.SET_SUBMIT_FAILED]: () => ({
    event_category: 'Registration',
    event_action: `Form submission rejected due to errors`,
    event_label: 'Submission rejected',
  }),
};

export function makeGoogleAnalyticsRequest(event: {
  event_category: string,
  event_action: string,
  event_label: string,
}) {
  return (dispatch: $Dispatch) => {
    let returned = false;
    const returnGuard = () => {
      if (!returned) {
        returned = true;
        dispatch({ type: MAKE_GOOGLE_ANALYTICS_REQUEST });
      }
    };
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'event', {
        ...event,
        event_callback: returnGuard,
      });
    }
    setTimeout(returnGuard, 3000);
  };
}
