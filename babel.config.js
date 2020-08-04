const presetEnvConfigCommonJs = [
  '@babel/preset-env',
  {
    useBuiltIns: 'usage',
    modules: 'commonjs',
  },
];

const presetEnvConfigEs = [
  '@babel/preset-env',
  {
    useBuiltIns: 'usage',
    modules: false,
    loose: true,
  },
];

const createConfig = extraPresets => ({
  presets: [...extraPresets, '@babel/preset-react', '@babel/preset-flow'],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    ['styled-components', { ssr: true, displayName: false }],
  ],
});

module.exports = api => {
  api.cache(true);

  return {
    env: {
      es: createConfig([presetEnvConfigEs]),
      cjs: createConfig([presetEnvConfigCommonJs]),
    },
    // fallback to something sensible for other environments
    ...createConfig([presetEnvConfigCommonJs]),
  };
};
