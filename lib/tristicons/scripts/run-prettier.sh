#!/bin/sh

set -e

find "$(dirname ${0})/../" \
     \( \
     -name '*.js' \
     -o -name '*.json' \
     -o -name '*.md' \
     -o -name '*.css' \
     \) \
     -not -path "$(dirname ${0})/../src/templates/*" \
     -not -path "$(dirname ${0})/../node_modules/*" \
     -not -path "$(dirname ${0})/../lib/*" \
     -print0 | xargs --null "$(npm bin)/prettier" --write
