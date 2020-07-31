// @flow

/* eslint-disable prefer-promise-reject-errors */

import * as actions from '../../../actions';
import type { $Dispatch } from '../../../actions';

export default (
  values: any,
  dispatch: $Dispatch,
  props: Object,
  currentFieldName: ?string,
) =>
  new Promise((resolve, reject) => {
    if (currentFieldName === 'email') {
      return dispatch(actions.regapiActionCreators.getLogins(values.email))
        .then(({ logins }) => {
          if (!logins.Username) {
            return reject({ email: 'Unable to retrieve username' });
          }

          dispatch(
            actions.appActionCreators.isExistingConstituent(
              logins.ConstituentID,
            ),
          );

          dispatch(actions.appActionCreators.setExistingAccountModalOpen(true));

          return reject({ email: 'Email is already in use' });
        })
        .catch(() => {
          // this actually means no constituent exists and it's ok to create a
          // new one
          dispatch(actions.appActionCreators.isExistingConstituent(null));

          return resolve();
        });
    }

    return resolve();
  });
