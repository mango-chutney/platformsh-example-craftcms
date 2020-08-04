/*
 * regapi/index.js
 *
 * @flow
 */

import getConstituents from './getConstituents';
import getCorporateTeams from './getCorporateTeams';
import getLocations from './getLocations';
import getLogins from './getLogins';
import getRegistrations from './getRegistrations';
import getRegistrationTypes from './getRegistrationTypes';
import getTeams from './getTeams';
import getTeamTypes from './getTeamTypes';
import getUDFs from './getUDFs';
import getVanityURL from './getVanityURL';
import postConstituents from './postConstituents';
import postRegistrations from './postRegistrations';
import postTeams from './postTeams';
import postTransactions from './postTransactions';
import putConstituents from './putConstituents';
import putRegistrations from './putRegistrations';
import putTeams from './putTeams';
import putTransactions from './putTransactions';
import putUDFs from './putUDFs';
import recursivelyGetVanityURL from './recursivelyGetVanityURL';
import type { Config } from '../config';

export { getConstituents };
export { getCorporateTeams };
export { getLocations };
export { getLogins };
export { getRegistrations };
export { getRegistrationTypes };
export { getTeamTypes };
export { getTeams };
export { getUDFs };
export { getVanityURL };
export { postConstituents };
export { postRegistrations };
export { postTeams };
export { postTransactions };
export { putConstituents };
export { putRegistrations };
export { putTeams };
export { putTransactions };
export { putUDFs };
export { recursivelyGetVanityURL };

export function bind(config: Config): * {
  return {
    getConstituents: (...args: *) => getConstituents(config, ...args),
    getCorporateTeams: (...args: *) => getCorporateTeams(config, ...args),
    getLocations: (...args: *) => getLocations(config, ...args),
    getLogins: (...args: *) => getLogins(config, ...args),
    getRegistrations: (...args: *) => getRegistrations(config, ...args),
    getRegistrationTypes: (...args: *) => getRegistrationTypes(config, ...args),
    getTeamTypes: (...args: *) => getTeamTypes(config, ...args),
    getTeams: (...args: *) => getTeams(config, ...args),
    getUDFs: (...args: *) => getUDFs(config, ...args),
    getVanityURL: (...args: *) => getVanityURL(config, ...args),
    postConstituents: (...args: *) => postConstituents(config, ...args),
    postRegistrations: (...args: *) => postRegistrations(config, ...args),
    postTeams: (...args: *) => postTeams(config, ...args),
    postTransactions: (...args: *) => postTransactions(config, ...args),
    putConstituents: (...args: *) => putConstituents(config, ...args),
    putRegistrations: (...args: *) => putRegistrations(config, ...args),
    putTeams: (...args: *) => putTeams(config, ...args),
    putTransactions: (...args: *) => putTransactions(config, ...args),
    putUDFs: (...args: *) => putUDFs(config, ...args),
    recursivelyGetVanityURL: (...args: *) =>
      recursivelyGetVanityURL(config, ...args),
  };
}

export const bindWithBaseURL = bind;
