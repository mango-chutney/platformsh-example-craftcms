#!/bin/sh

set -e

mkdir "$(dirname "${0}")/../cjs"

export BABEL_ENV="cjs"

"$(npm bin)/babel" \
  "./src" \
  --ignore ".tern-port" \
  --copy-files \
  --quiet \
  --out-dir "$(dirname "${0}")/../cjs"

mkdir "$(dirname "${0}")/../es"

export BABEL_ENV="es"

"$(npm bin)/babel" \
  "./src" \
  --ignore ".tern-port" \
  --copy-files \
  --quiet \
  --out-dir "$(dirname "${0}")/../es"
