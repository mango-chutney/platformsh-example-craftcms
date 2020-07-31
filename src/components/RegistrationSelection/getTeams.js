// @flow

import fetch from 'unfetch';
import { baseURL } from '../../abstracts/constants';

function getTeams() {
  return fetch(`${baseURL}/resources/data/teams.json`)
    .then(response => response.json())
    .then((response: any) => response.teams.rows);
}

export default getTeams;
