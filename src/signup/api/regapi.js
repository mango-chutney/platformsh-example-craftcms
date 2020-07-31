// @flow

import { regapi } from 'artez-client-apis';
import fetch from 'unfetch';
import { baseURL } from '../constants';

export default regapi.bindWithBaseURL({
  baseURL: `${baseURL}/regapi`,
  fetch,
});
