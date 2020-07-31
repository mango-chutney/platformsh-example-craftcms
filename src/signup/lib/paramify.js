// @flow

export default (params: Object): string =>
  Object.keys(params)
    .filter(key => params[key] !== undefined)
    .map(key =>
      params[key] === undefined
        ? ''
        : `${key}=${encodeURIComponent(params[key])}`,
    )
    .join('&');
