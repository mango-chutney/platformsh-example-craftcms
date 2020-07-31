// @flow

/**
 * Turn an object with a properties into an object with object properties with a
 * value. Artez likes this schema for some stuff.
 *
 * @example
 * > valueify({ PersonalMessage: 'kek' })
 * { PersonalMessage: { Value: 'kek' } }
 */
export default (obj: Object) =>
  Object.keys(obj).reduce(
    (prev, next) => ({
      ...prev,
      [next]: { Value: obj[next] },
    }),
    {},
  );
