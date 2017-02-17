#!/bin/bash

set -e

case "${TRAVIS_OS_NAME}" in
  osx)
    cd example
    set -o pipefail && npm run build:ios | xcpretty -c -f `xcpretty-travis-formatter`
    npm run test:unit
    npm run test:e2e:ios
  ;;
  linux)
    cd example
    npm run build:android
    npm run test:unit
    npm run test:e2e:android
  ;;
esac
