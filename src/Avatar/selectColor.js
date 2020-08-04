// @flow

const defaultColors = [
  '#00d161',
  '#00b4ff',
  '#ff3add',
  '#ffca00',
  '#8151f3',
  '#ff7741',
];

export default (
  namespace: string,
  colors: Array<string> = defaultColors,
): string => {
  let hash = 0;

  for (let i = 0; i < namespace.length; i += 1) {
    // eslint-disable-next-line no-bitwise
    hash = (hash << 5) - hash + namespace.charCodeAt(i);
    // eslint-disable-next-line no-bitwise
    hash |= 0; // Convert to 32bit integer
  }

  return colors[Math.abs(hash) % colors.length];
};
