/*
 * registrant/index.js
 *
 * @flow
 */

import personalizationPost from './personalizationPost';
import type { Config } from '../config';

export { personalizationPost };

export function bind(config: Config): * {
  return {
    personalizationPost: (...args: *) => personalizationPost(config, ...args),
  };
}

export const bindWithBaseURL = bind;
