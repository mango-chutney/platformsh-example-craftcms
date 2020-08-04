#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const DIST_DIR = path.resolve(path.join(__dirname, '..', 'dist'));

const representations = Object.entries(
  fs
    .readdirSync(path.resolve(path.join(DIST_DIR, 'fonts')))
    .map(filename => ({
      [path.extname(filename).replace(/^\./, '')]: fs
        .readFileSync(path.resolve(path.join(DIST_DIR, 'fonts', filename)))
        .toString('base64'),
    }))
    .reduce((prev, next) => ({ ...prev, ...next }), {}),
).forEach(([key, value]) => {
  fs.writeFileSync(
    path.resolve(path.join(DIST_DIR, 'json', `base64-${key}.json`)),
    JSON.stringify({ [key]: value }),
  );
});
