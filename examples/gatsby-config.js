// @flow

/* eslint-env node */

const { execSync } = require('child_process');
const systemPath = require('path');
const { name, repository, version } = require('../package.json');

const revision = execSync('git rev-parse HEAD', {
  cwd: systemPath.resolve(__dirname),
})
  .toString()
  .trim();

module.exports = {
  pathPrefix: `/${name}`,
  siteMetadata: {
    title: name,
    name,
    version,
    revision,
    repository,
  },
  plugins: ['gatsby-plugin-react-helmet', 'gatsby-plugin-styled-components'],
};
