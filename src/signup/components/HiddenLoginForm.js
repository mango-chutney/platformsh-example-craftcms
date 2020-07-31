// @flow

import * as React from 'react';
import { artezURL, eventId } from '../constants';

// $FlowFixMe
const HiddenLoginForm = React.forwardRef((props, ref) => (
  <form
    action={`${artezURL}/registrant/LoginRegister.aspx?eventid=${eventId}`}
    method="post"
    ref={ref}
  >
    <input type="hidden" name="txtUserID" />
    <input type="hidden" name="txtPassword" />
  </form>
));

export default HiddenLoginForm;
